import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import "./assets/style.css";
import filters from "./utils/filter";

Vue.config.productionTip = false;

// 注册过滤器
for (const key in filters) {
  Vue.filter(key, filters[key]);
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
