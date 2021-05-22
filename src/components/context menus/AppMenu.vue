<template>
    <div id="app-menu" class="w-52 bg-ub-context-menu border text-left border-gray-900 rounded text-white py-4 absolute z-50 text-sm flex flex-col items-start"
            :class="this.$store.state.showAppMenu ? 'block':'hidden'">
        <a rel="noreferrer noopener" href="https://github.com/obj9527/obj9527.github.io" target="_blank" class="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5">
            <span class="ml-5">🌟</span> <span class="ml-2">Star this Project</span>
        </a>
        <a rel="noreferrer noopener" href="https://github.com/vivek9patel/vivek9patel.github.io/issues" target="_blank" class="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5">
            <span class="ml-7">❗</span> <span class="ml-3">Report bugs</span>
        </a>
        <a rel="noreferrer noopener" href="https://zzjbhack.com" target="_blank" class="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5">
            <span class="ml-5">🙋‍♂️</span> <span class="ml-2">Follow on <strong>Blog</strong></span>
        </a>
        <a rel="noreferrer noopener" href="https://github.com/obj9527" target="_blank" class="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5">
            <span class="ml-5">🤝</span> <span class="ml-2">Follow on <strong>Github</strong></span>
        </a>
        <a rel="noreferrer noopener" href="1213699301@qq.com" target="_blank" class="w-full block cursor-default py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5">
            <span class="ml-5">📥</span> <span class="ml-2">Contact Me</span>
        </a>
    </div>
</template>

<script>
    export default {
        name: "AppMenu"
    }
</script>
