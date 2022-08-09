<template>
  <window :window="meta">
    <template slot="content">
      <div class="flex w-full h-full blog-wrapper">
        <div
          class="w-1/4 h-full text-sm overflow-y-auto border-r border-black flex flex-col justify-start items-center bg-ub-grey"
        >
          <div class="w-full">
            <select v-model="sortKey" class="w-full custom-select">
              <option
                v-for="item in options"
                :key="item.id"
                :label="item.text"
                :value="item.id"
              ></option>
            </select>
          </div>
          <div
            v-for="article in sortedArticles"
            :key="article.id"
            class="w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"
            :class="
              focusedItem === article.id
                ? 'bg-ub-orange bg-opacity-100 hover:bg-opacity-90'
                : 'hover:bg-opacity-5 hover:bg-gray-50'
            "
            @click="changeFocused(article.id)"
          >
            <div class="ml-1 md:ml-2 text-gray-50">
              {{ article.id }}
            </div>
          </div>
        </div>
        <div class="w-3/4 markdown-wrapper">
          <div v-html="result" class="markdown-wrapper"></div>
        </div>
      </div>
    </template>
  </window>
</template>

<script>
import Window from "@/components/window/Window";
import axios from "axios";
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";
import markdownit from "markdown-it";

export default {
  name: "Blog",
  props: {
    blogs: {
      type: Array,
      default: () => {
        return [];
      },
    },
    meta: {
      type: Object,
      required: true,
    },
  },
  components: { Window },
  data() {
    return {
      md: null,
      result: null,
      articleContentList: [],
      sortKey: "time",
      articles: [],
      sortedArticles: [],
      focusedItem: "",
      options: [
        {
          id: "time",
          text: "时间",
        },
        {
          id: "name",
          text: "名称",
        },
      ],
    };
  },
  watch: {
    sortKey: {
      handler: function (val) {
        if (!this.sortedArticles) return;
        if (val === "time") {
          console.log(this.sortedArticles);
          this.sortedArticles.sort((a, b) => {
            if (a.createdTime <= b.createdTime) {
              return 1;
            }
            if (a.createdTime === b.createdTime) {
              return 0;
            } else {
              return -1;
            }
          });
          console.log(this.sortedArticles);
        }
        if (val === "name") {
          this.sortedArticles.sort((a, b) => {
            if (a.id > b.id) {
              return 1;
            }
            if (a.id === b.id) {
              return 0;
            } else {
              return -1;
            }
          });
        }
      },
    },
  },
  methods: {
    changeFocused(id) {
      this.focusedItem = id;
      for (let i = 0; i < this.sortedArticles.length; i++) {
        if (id === this.sortedArticles[i].id) {
          this.result = this.articleContentList[i];
          break;
        }
      }
    },
    initMarkDownIt() {
      let md = markdownit({
        html: false, // Enable HTML tags in source
        xhtmlOut: false, // Use '/' to close single tags (<br />).
        // This is only for full CommonMark compatibility.
        breaks: false, // Convert '\n' in paragraphs into <br>
        langPrefix: "language-", // CSS language prefix for fenced blocks. Can be
        // useful for external highlighters.
        linkify: true, // Autoconvert URL-like text to links
        typographer: true,
        quotes: "“”‘’",
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return (
                '<pre class="hljs overflow-auto"><code>' +
                hljs.highlight(str, {
                  language: lang,
                  ignoreIllegals: true,
                }).value +
                "</code></pre>"
              );
            } catch (e) {
              console.error(e);
            }
          }

          return (
            '<pre class="hljs overflow-auto"><code>' +
            md.utils.escapeHtml(str) +
            "</code></pre>"
          );
        },
      });
      // 自定义code_inline渲染
      md.renderer.rules.code_inline = (
        tokens,
        idx /*, options, env, self*/
      ) => {
        return `<code style="color: #f92672">${tokens[idx].content}</code>`;
      };
      // 自定义url渲染
      md.renderer.rules.link_open = (tokens, idx /*, options, env, self*/) => {
        return `<a href="${tokens[idx].attrs[0][1]}" style="color: #FF5733" target="_blank" rel='noreferrer noopener'>`;
      };
      return md;
    },
    async getBlog() {
      await this.getMDFilesAddress();
      let urls = this.sortedArticles.map((item) => {
        return axios.get(item.url);
      });
      await Promise.all(urls).then((responseList) => {
        this.articleContentList = responseList.map((res) => {
          return this.md.render(res.data);
        });
        console.log(this.articleContentList);
      });
      this.changeFocused(this.sortedArticles[0].id);
    },
    async getMDFilesAddress() {
      await axios.get("./files/mdFilesAddress.json").then((res) => {
        const { articles } = res.data || {};
        this.articles = articles;
        this.sortedArticles = [...this.articles];
      });
    },
  },
  mounted() {
    this.md = this.initMarkDownIt();
    this.getBlog();
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/color.scss";

.blog-wrapper {
  .markdown-wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
    background: white;
    word-wrap: break-word;
  }
  .custom-select:focus {
    outline: none;
  }
}
</style>
