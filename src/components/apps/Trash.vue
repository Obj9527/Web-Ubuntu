<template>
    <Window :window="this.meta">
        <template slot="content">
            <div class="bg-ub-cool-grey w-full h-full flex flex-col">
                <div class="w-full h-full flex flex-row justify-start">
                    <div v-for="item in this.items" :key="item.name" class="flex flex-col items-center m-4">
                        <img :src="folderImg" class="w-16"/>
                        <div class="text-sm text-ubt-grey text-center">{{item.name}}</div>
                        <!--TODO: file system-->
                    </div>
                </div>
            </div>
        </template>
    </Window>
</template>

<script>
    import Window from "../window/Window";
    export default {
        name: "Trash",
        components: {Window},
        props: {
            meta: {
                type: Object,
                required: true,
            }
        },
        data(){
            return {
                folderImg: './themes/Yaru/system/folder.png',
                items: [
                    {
                        name: 'MilfyCity'
                    },
                    {
                        name: 'Java 从入门到入土'
                    },
                    {
                        name: '21天精通Spring'
                    }
                ]
            }
        },
    }
</script>

<style scoped>

</style>
