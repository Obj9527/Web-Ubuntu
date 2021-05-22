<template>
    <Window :window="this.meta">
        <template slot="content">
            <iframe src="https://github1s.com/Obj9527/obj9527.github.io" class="border-0 w-full h-full"></iframe>
        </template>
    </Window>
</template>

<script>
    import Window from "../window/Window";
    export default {
        name: "VScode",
        components: {Window},
        props: {
            meta: {
                type: Object,
                required: true,
            }
        }
    }
</script>

<style scoped>

</style>
