<template>
  <div class="w-screen h-screen overflow-hidden relative select-none">
    <BackgroundImage :wallpaper="wallpaper" />
    <Sidebar :apps="apps" @appClick="openWindow" />
    <DesktopMenu />
    <AppMenu />
    <Navbar />
    <DesktopAppArray :apps="apps" @appDoubleClick="openWindow" />
    <div v-for="window in windowList" :key="window.id">
      <component
        :is="window.component"
        :meta="window"
        :ref="window.id"
      ></component>
    </div>
  </div>
</template>

<script>
import BackgroundImage from "../../components/base/BackgroundImage";
import Sidebar from "../../components/base/Sidebar";
import Navbar from "../../components/base/Navbar";
import Firefox from "../../components/apps/Firefox";
import VSCode from "../../components/apps/VScode";
import ToDoList from "../../components/apps/ToDoList";
import Settings from "../../components/apps/Settings";
import DesktopMenu from "../../components/context menus/DesktopMenu";
import AppMenu from "../../components/context menus/AppMenu";
import DesktopAppArray from "../../components/base/DesktopAppArray";
import AboutObj9527 from "../../components/apps/AboutObj9527";
import Terminal from "../../components/apps/Terminal";
import Gedit from "../../components/apps/Gedit";
import Trash from "../../components/apps/Trash";
import Music from "../../components/apps/Music";
import MarkdownEditor from "../../components/apps/MarkdownEditor";
import Blog from "@/components/apps/Blog";
import apps from "@/apps.js";

export default {
  name: "index",
  computed: {
    windowList() {
      return this.$store.state.windowList;
    },
    wallpaper() {
      return this.$store.state.wallpaper;
    },
  },
  data() {
    return {
      apps,
    };
  },
  mounted() {
    this.$store.state.fullWidth = document.documentElement.clientWidth;
    this.$store.state.fullHeight = document.documentElement.clientHeight;
    let wallpaper = localStorage.getItem("wallpaper");
    if (wallpaper) {
      this.$store.commit("changeBackground", wallpaper);
    } else {
      this.$store.commit("changeBackground", "wall-2");
    }
    window.onresize = this.onResizeHandler;
    window.oncontextmenu = () => {
      return false;
    };
    window.onmousedown = this.onMouseDownHandler;
  },
  components: {
    MarkdownEditor,
    Music,
    Trash,
    Gedit,
    Terminal,
    AboutObj9527,
    DesktopAppArray,
    AppMenu,
    DesktopMenu,
    Settings,
    ToDoList,
    VSCode,
    Firefox,
    Navbar,
    BackgroundImage,
    Sidebar,
    Blog,
  },
  methods: {
    openWindow(id) {
      for (let i = 0; i < this.$store.state.windowList.length; i++) {
        if (this.$store.state.windowList[i].id === id) {
          let meta = this.$store.state.windowList[i].meta;
          let window = document.getElementById(id);
          if (meta.maximized === true) {
            window.style.width = this.$store.state.fullWidth + "px";
            window.style.height = this.$store.state.fullHeight - 30 + "px";
            window.style.top = 30 + "px";
            window.style.left = 0 + "px";
          }
          window.style.transform = null;
          this.$store.commit("restoreWindow", id);
          this.$store.commit("refreshWindowFocused", id);
          return;
        }
      }
      for (let app of this.apps) {
        if (app.id === id) {
          app.meta.maximized = true;
          this.$store.commit("openWindow", app);
          this.$store.commit("refreshWindowFocused", app.id);
          return;
        }
      }
    },
    onResizeHandler() {
      let h = document.documentElement.clientHeight;
      let w = document.documentElement.clientWidth;
      this.$store.commit("refreshFullWindowSize", { h: h, w: w });
      if (
        this.$store.state.maximizedWindowList.indexOf(
          this.$store.state.focusedWindow
        ) !== -1
      ) {
        let window = document.getElementById(this.$store.state.focusedWindow);
        window.style.width = this.$store.state.fullWidth + "px";
        window.style.height = this.$store.state.fullHeight - 30 + "px";
        window.style.top = 30 + "px";
        window.style.left = 0 + "px";
        window.style.transform = null;
      }
    },
    onMouseDownHandler(e) {
      if (e.button === 2) {
        let downX = e.clientX;
        let downY = e.clientY;
        let dm = document.getElementById("desktop-menu");
        dm.style.left = downX + "px";
        dm.style.top = downY + "px";
        this.$store.commit("changeShowDesktopMenu", true);
        window.onclick = () => {
          this.$store.commit("changeShowDesktopMenu", false);
          window.onclick = null;
        };
      }
    },
  },
};
</script>

<style scoped></style>
