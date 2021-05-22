<template>
    <Window :window="this.meta">
        <template slot="content">
            <!--TODO: markdown editor-->
        </template>
    </Window>
</template>

<script>
    import Window from "../window/Window";

    export default {
        name: "MarkdownEditor",
        props: {
            meta: {
                type: Object,
                required: true,
            }
        },
        components: {Window}
    }
</script>

<style scoped>

</style>
