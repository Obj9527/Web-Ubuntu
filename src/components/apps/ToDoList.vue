<template>
    <Window :window="this.meta">
        <template slot="content">
            <iframe src="https://todoist.com/showProject?id=220474322" title="ToDoList" class="h-full w-full border-0"></iframe>
        </template>
    </Window>
</template>

<script>
    import Window from "../window/Window";
    export default {
        name: "ToDoList",
        components: {Window},
        props: {
            meta: {
                type: Object,
                required: true,
            }
        },
    }
</script>

<style scoped>

</style>
