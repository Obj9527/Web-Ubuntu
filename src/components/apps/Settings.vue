<template>
    <Window :window="this.meta">
        <template slot="content">
            <div class="w-full h-full flex flex-col flex-grow overflow-y-auto select-none bg-ub-cool-grey window-main-screen">
                <div class="md:px-40 md:py-24 md:mx-auto md:my-4 mx-auto px-14 py-10 outline-none border-0"
                     style="background-size:cover;background-repeat:no-repeat;background-position:center;"
                     :style="{backgroundImage: `url(${choosedWallpaper})`}">
                </div>
                <div class="flex flex-wrap justify-center items-center border-t border-gray-900">
                    <div v-for="wallpaper in wallpapers"
                         :key="wallpaper"
                         class="md:px-28 md:py-20 md:m-4 m-2 px-14 py-10 outline-none border-4 bg-ub-cool-grey"
                         :class="choosedWallpaper === wallpaper ? 'border-yellow-700 border-opacity-80':'border-opacity-0'"
                         style="background-size: cover;background-repeat: no-repeat;background-position: center"
                         :style="{backgroundImage: `url(${wallpaper})`}"
                         @click.stop="changeBackgroundImage(wallpaper)" @mouseenter.stop="changeCursorToClick" @mouseleave.stop="changeCursorToDefault">
                    </div>
                </div>
            </div>
        </template>
    </Window>
</template>

<script>
    import Window from "../window/Window";

    export default {
        name: "Settings",
        components: {Window},
        props: {
            meta: {
                type: Object,
                required: true,
            }
        },
        data() {
            return {
                wallpapers: {
                    'wall-1': "./images/wallpapers/minified/wall-1.jpg",
                    'wall-2': "./images/wallpapers/minified/wall-2.jpeg",
                    'wall-3': "./images/wallpapers/minified/wall-3.jpg",
                    'wall-4': "./images/wallpapers/minified/wall-4.jpg",
                    'wall-5': "./images/wallpapers/minified/wall-5.jpg",
                    'wall-6': "./images/wallpapers/minified/wall-6.jpeg",
                    'wall-7': "./images/wallpapers/minified/wall-7.jpeg",
                    'wall-8': "./images/wallpapers/minified/wall-8.jpg",
                },
                selectedWallPaper: '',
            }
        },
        computed: {
            choosedWallpaper() {
                if (this.$store.state.wallpaper === '') {
                    return this.selectedWallPaper
                }else {
                    console.log(this.wallpapers[this.$store.state.wallpaper])
                    return this.wallpapers[this.$store.state.wallpaper]
                }
            }
        },
        methods: {
            changeBackgroundImage(wallpaper) {
                this.selectedWallPaper = wallpaper
                let wpId = wallpaper.substring(wallpaper.indexOf('wall-'), wallpaper.indexOf('wall-') + 6)
                console.log(wpId)
                localStorage.setItem('wallpaper', wpId)
                this.$store.commit('changeBackground', wpId)
            },
            changeCursorToClick() {
                let app = document.getElementById(this.meta.id)
                app.style.cursor = 'pointer'
            },
            changeCursorToDefault() {
                let app = document.getElementById(this.meta.id)
                app.style.cursor = 'default'
            },
        }
    }
</script>
