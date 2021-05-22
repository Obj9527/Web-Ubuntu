<template>
    <div :id="'desktop-' + this.app.id" tabindex="0" class="p-1 m-px z-10 bg-white bg-opacity-0 hover:bg-opacity-20 focus:bg-ub-orange focus:bg-opacity-50 focus:border-yellow-700 focus:border-opacity-100 border border-transparent outline-none rounded select-none w-24 h-20 flex flex-col justify-start items-center text-center text-xs font-normal text-white">
        <img class="mb-1 w-10" :src="this.app.icon" :alt="this.app.title">
        <div>{{this.app.title}}</div>
    </div>
</template>

<script>
    export default {
        name: "DesktopApp",
        props: {
            app: {
                type: Object,
                required: true,
            }
        }
    }
</script>
