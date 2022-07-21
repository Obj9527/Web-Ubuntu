<template>
  <Window :window="this.meta">
    <template v-slot:content>
      <div
        class="h-full w-full flex flex-col bg-ub-cool-grey window-main-screen"
      >
        <div
          class="w-full pt-0.5 pb-1 flex justify-start items-center text-white text-sm border-b border-gray-900"
        >
          <div
            @click="refreshChrome"
            class="ml-2 mr-1 flex justify-center items-center rounded-full bg-gray-50 bg-opacity-0 hover:bg-opacity-10"
          >
            <img
              class="w-5"
              :src="icons.chromeRefresh"
              alt="Ubuntu Chrome Refresh"
            />
          </div>
          <div
            @click="goToHome"
            class="mr-2 ml-1 flex justify-center items-center rounded-full bg-gray-50 bg-opacity-0 hover:bg-opacity-10"
          >
            <img class="w-5" :src="icons.chromeHome" alt="Ubuntu Chrome Home" />
          </div>
          <input
            @keydown.enter="checkKey"
            v-model.trim="displayUrl"
            id="chrome-url-bar"
            class="outline-none bg-ub-grey rounded-full pl-3 py-0.5 mr-3 w-5/6 text-gray-300 focus:text-white"
            type="url"
            spellcheck="false"
            autoComplete="off"
          />
        </div>
        <iframe
          :src="url"
          class="flex-grow border-0"
          id="chrome-screen"
          title="Ubuntu Chrome Url"
        ></iframe>
      </div>
    </template>
  </Window>
</template>

<script>
import Window from "../window/Window";
export default {
  name: "Firefox",
  props: {
    meta: {
      type: Object,
      required: true,
    },
  },
  components: { Window },
  data() {
    return {
      icons: {
        chromeRefresh: "./themes/Yaru/status/chrome_refresh.svg",
        chromeHome: "./themes/Yaru/status/chrome_home.svg",
      },
      homeUrl: "https://www.google.com",
      displayUrl: "https://www.google.com",
      url: "https://www.google.com/webhp?igu=1",
    };
  },
  methods: {
    refreshChrome() {
      document.getElementById("chrome-screen").src += "";
    },
    goToHome() {
      this.displayUrl = this.homeUrl;
      document.getElementById("chrome-screen").src = this.url;
    },
    checkKey() {
      let url = this.displayUrl;
      if (url.length === 0) return;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }
      document.getElementById("chrome-screen").src = url;
      this.displayUrl = url;
    },
    storeVisitedUrl() {
      localStorage.setItem("url", this.url);
      localStorage.setItem("displayUrl", this.displayUrl);
    },
  },
};
</script>
