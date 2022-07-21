<template>
  <window :window="meta">
    <template slot="content">
      <div v-html="result" class="iframe-wrapper"></div>
    </template>
  </window>
</template>

<script>
import Window from "@/components/window/Window";
import axios from "axios";

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
      result: null,
    };
  },
  methods: {
    getBlog() {
      axios.get("./files/xx.md").then((res) => {
        this.result = res.data;
        let md = window.markdownit({
          html: false, // Enable HTML tags in source
          xhtmlOut: false, // Use '/' to close single tags (<br />).
          // This is only for full CommonMark compatibility.
          breaks: false, // Convert '\n' in paragraphs into <br>
          langPrefix: "language-", // CSS language prefix for fenced blocks. Can be
          // useful for external highlighters.
          linkify: true, // Autoconvert URL-like text to links

          // Enable some language-neutral replacement + quotes beautification
          typographer: true,

          // Double + single quotes replacement pairs, when typographer enabled,
          // and smartquotes on. Could be either a String or an Array.
          //
          // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
          // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
          quotes: "“”‘’",

          // Highlighter function. Should return escaped HTML,
          // or '' if the source string is not changed and should be escaped externaly.
          // If result starts with <pre... internal wrapper is skipped.
          highlight: function (/*str, lang*/) {
            return "";
          },
        });
        this.result = md.render(this.result);
        console.log("result", this.result);
      });
    },
  },
  mounted() {
    this.getBlog();
  },
};
</script>

<style scoped>
.iframe-wrapper {
  width: 100%;
  height: 100%;
  background: white;
  overflow-x: auto;
  overflow-y: auto;
  word-wrap: break-word;
  word-break: break-all;
}
</style>
