import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import "./assets/style.css";
import markdownit from "markdown-it";

Vue.config.productionTip = false;

window.markdownit = markdownit;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
