<template>
  <div
    class="absolute right-0 w-auto h-auto flex flex-col justify-start items-center"
    style="top: 30px"
  >
    <DesktopApp
      v-for="app in desktopApps"
      :key="app.id"
      :app="app"
      @dblclick.native="openApp(app)"
    />
  </div>
</template>

<script>
import DesktopApp from "./DesktopApp";
export default {
  name: "DesktopAppArray",
  props: {
    apps: {
      type: Array,
      required: true,
    },
  },
  components: {
    DesktopApp,
  },
  computed: {
    desktopApps() {
      return this.apps.filter((app) => {
        return app.desktop_shortcut;
      });
    },
  },
  methods: {
    openApp(app) {
      this.$emit("appDoubleClick", app.id);
    },
  },
};
</script>
