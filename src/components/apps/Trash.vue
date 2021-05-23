<template>
    <Window :window="this.meta">
        <template slot="content">
            <div class="bg-ub-cool-grey w-full h-full flex text-sm text-ubt-grey">
                <div class="w-1/4 h-full bg-ub-grey">
                    <div v-for="dir in dirs" :key="dir"
                         class="hover:bg-white hover:bg-opacity-10 py-2 px-2 flex"
                         :class="dir.name === 'trash'?'bg-ub-orange bg-opacity-100 hover:bg-ub-orange hover:bg-opacity-90':''">
                        <img :src="dir.icon" class="w-5"/>
                        <span class="ml-2">{{ dir.name }}</span>
                    </div>
                </div>
                <div class="w-3/4 h-full flex">
                    <div v-for="item in this.items" :key="item.name" class="flex flex-col items-center mx-4 my-4 w-16">
                        <img :src="folderImg" class="w-12"/>
                        <div>{{ item.name }}</div>
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
    data() {
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
            ],
            dirs: [
                {
                    name: "books",
                    icon: "./themes/Yaru/status/education.svg"
                },
                {
                    name: "projects",
                    icon: "./themes/Yaru/status/projects.svg"
                },
                {
                    name: "downloads",
                    icon: "./themes/Yaru/status/download.svg"
                },
                {
                    name: "skills",
                    icon: "./themes/Yaru/status/skills.svg"
                },
                {
                    name: "languages",
                    icon: "./themes/Yaru/status/experience.svg"
                },
                /*{
                    name: "interests",
                    icon: "./themes/Yaru/status/user-trash-symbolic.svg"
                },*/
                {
                    name: "trash",
                    icon: "./themes/Yaru/status/trash-2-128.png"
                }
            ],
        }
    },
}
</script>

<style scoped>

</style>
