<template>
  <window :window="meta">
    <template slot="content">
      <div class="flex w-full h-full">
        <div
          class="w-1/4 h-full text-sm overflow-y-auto border-r border-black flex flex-col justify-start items-center bg-ub-grey"
        >
          <div
            v-for="p in filterdPapers"
            :key="p"
            class="w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"
            :class="
              focusedItem === p
                ? 'bg-ub-orange bg-opacity-100 hover:bg-opacity-90'
                : 'hover:bg-opacity-5 hover:bg-gray-50'
            "
            @focusin="changeFocused(p)"
          >
            <span class="ml-1 md:ml-2 text-gray-50">{{ p }}</span>
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
      papers: [],
      focusedItem: "",
    };
  },
  computed: {
    filterdPapers() {
      return this.papers.map((item) => {
        let tempArray = item.addr.split("/");
        return tempArray[tempArray.length - 1];
      });
    },
  },
  methods: {
    changeFocused(id) {
      debugger;
      this.focusedItem = id;
      console.log(this.focusedItem);
    },
    initMarkDownIt() {
      let md = window.markdownit({
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
                hljs.highlight(str, { language: lang, ignoreIllegals: true })
                  .value +
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
      return md;
    },
    getBlog() {
      axios.get("./files/mdFilesAddress.json").then((res) => {
        const { addrs } = res.data || {};
        this.papers = addrs;
        console.log(this.papers[0].addr.split("/")[-1]);
        axios.get(addrs[0].addr).then((res) => {
          this.result = res.data;
          this.result = this.md.render(this.result);
          console.log("result", this.result);
        });
      });
    },
  },
  mounted() {
    this.md = this.initMarkDownIt();
    this.getBlog();
  },
};
</script>

<style scoped>
.markdown-wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: white;
  word-wrap: break-word;
}
</style>
