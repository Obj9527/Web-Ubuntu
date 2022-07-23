<template>
  <div
    id="app-menu"
    class="w-52 bg-ub-context-menu border text-left border-gray-900 rounded text-white py-4 absolute z-50 text-sm flex flex-col items-start"
    :class="this.$store.state.showAppMenu ? 'block' : 'hidden'"
  >
    <a
      rel="noreferrer noopener"
      href="https://github.com/Obj9527/Web-Ubuntu"
      target="_blank"
      class="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5"
    >
      <div class="menu-item">
        <span class="ml-5">🌟</span> <span class="ml-2">Star this Project</span>
      </div>
    </a>
    <a
      rel="noreferrer noopener"
      href="https://github.com/Obj9527/Web-Ubuntu/issues"
      target="_blank"
      class="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5"
    >
      <div class="menu-item">
        <span class="ml-5">❗</span> <span class="ml-2">Report bugs</span>
      </div>
    </a>
    <a
      rel="noreferrer noopener"
      href="https://zzjbhack.com"
      target="_blank"
      class="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5"
    >
      <div class="menu-item">
        <span class="ml-5">🙋‍♂️</span>
        <span class="ml-2">Follow on <strong>Blog</strong></span>
      </div>
    </a>
    <a
      rel="noreferrer noopener"
      href="https://github.com/obj9527"
      target="_blank"
      class="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5"
    >
      <div class="menu-item">
        <span class="ml-5">🤝</span>
        <span class="ml-2">Follow on <strong>Github</strong></span>
      </div>
    </a>
    <a
      rel="noreferrer noopener"
      href="mailto:1213699301@qq.com"
      target="_blank"
      class="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5"
    >
      <div class="menu-item">
        <span class="ml-5">📥</span> <span class="ml-2">Contact Me</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "AppMenu",
};
</script>

<style scoped>
.menu-item {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
</style>
