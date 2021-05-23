<template>
    <div class="w-screen h-screen overflow-hidden relative select-none">
        <BackgroundImage :wallpaper="this.wallpaper"/>
        <Sidebar :apps="this.apps" @appClick="openWindow"/>
        <DesktopMenu/>
        <AppMenu/>
        <Navbar/>
        <DesktopAppArray :apps="this.apps"/>
        <div v-for="window in this.windowList" :key="window.id">
            <Chrome v-if="window.id === 'firefox'" :meta="window"/>
            <VScode v-if="window.id === 'vscode'" :meta="window"/>
            <ToDoList v-if="window.id === 'todo-ist'" :meta="window"/>
            <Settings v-if="window.id === 'settings'" :meta="window"/>
            <AboutObj9527 v-if="window.id === 'about-obj9527'" :meta="window"/>
            <Terminal v-if="window.id === 'terminal'" :meta="window"/>
            <Gedit v-if="window.id === 'gedit'" :meta="window"/>
            <Trash v-if="window.id === 'trash'" :meta="window"/>
            <CloudMusic v-if="window.id === 'music'" :meta="window"/>
            <MarkdownEditor v-if="window.id === 'markdown-editor'" :meta="window"/>
        </div>
    </div>
</template>

<script>
    import BackgroundImage from "../../components/base/BackgroundImage";
    import Sidebar from "../../components/base/Sidebar";
    import Navbar from "../../components/base/Navbar";
    import Chrome from "../../components/apps/Chrome";
    import VScode from "../../components/apps/VScode";
    import ToDoList from "../../components/apps/ToDoList";
    import Settings from "../../components/apps/Settings";
    import DesktopMenu from "../../components/context menus/DesktopMenu";
    import AppMenu from "../../components/context menus/AppMenu";
    import DesktopAppArray from "../../components/base/DesktopAppArray";
    import AboutObj9527 from "../../components/apps/AboutObj9527";
    import Terminal from "../../components/apps/Terminal";
    import Gedit from "../../components/apps/Gedit";
    import Trash from "../../components/apps/Trash";
    import CloudMusic from "../../components/apps/Music";
    import MarkdownEditor from "../../components/apps/MarkdownEditor";
    import apps from '@/apps.js'

    export default {
        name: "index",
        computed: {
            windowList(){
                //console.log(this.$store.state.windowList)
                return this.$store.state.windowList
            },
            wallpaper() {
                return this.$store.state.wallpaper
            }
        },
        data() {
          return {
              apps
          }
        },
        mounted() {
            this.$store.state.fullWidth = document.documentElement.clientWidth
            this.$store.state.fullHeight = document.documentElement.clientHeight
            let wallpaper = localStorage.getItem('wallpaper')
            if (wallpaper) {
                this.$store.commit('changeBackground', wallpaper)
            }else {
                this.$store.commit('changeBackground', 'wall-2')
            }
            window.onresize = this.onResizeHandler
            window.oncontextmenu = () => {
                return false;
            }
            window.onmousedown = this.onMouseDownHandler
        },
        components: {
            MarkdownEditor,
            CloudMusic,
            Trash,
            Gedit,
            Terminal,
            AboutObj9527,
            DesktopAppArray,
            AppMenu,
            DesktopMenu,
            Settings,
            ToDoList,
            VScode,
            Chrome,
            Navbar,
            BackgroundImage,
            Sidebar,
        },
        methods: {
            openWindow(id) {
                //console.log(`openWindow: id - ${id}`)
                for (let i = 0; i < this.$store.state.windowList.length; i++) {
                    if (this.$store.state.windowList[i].id === id) {
                        let meta = this.$store.state.windowList[i].meta
                        let window = document.getElementById(id)
                        if(meta.maximized === true) {
                            window.style.width = this.$store.state.fullWidth + 'px'
                            window.style.height = (this.$store.state.fullHeight - 30) + 'px'
                            window.style.top = 30 + 'px'
                            window.style.left = 0 + 'px'
                            window.style.transform = null
                        }else {
                            window.style.width = meta.width
                            window.style.height = meta.height
                            window.style.top = meta.y
                            window.style.left = meta.x
                            window.style.transform = null
                        }
                        this.$store.commit('restoreWindow', id)
                        this.$store.commit('refreshWindowFocused', id)
                        return
                    }
                }
                for (let app of this.apps) {
                    //console.log(`appId - ${app.id}, id - ${id}`)
                    if (app.id === id) {
                        //console.log(`commit: ${id}`)
                        this.$store.commit('openWindow', app)
                        this.$store.commit('refreshWindowFocused', app.id)
                        return
                    }
                }
            },
            onResizeHandler() {
                let h = document.documentElement.clientHeight
                let w = document.documentElement.clientWidth
                console.log('resize: h - ', h, 'w - ', w)
                this.$store.commit('refreshFullWindowSize', {h: h, w: w})
                if (this.$store.state.maximizedWindowList.indexOf(this.$store.state.focusedWindow) !== -1) {
                    let window = document.getElementById(this.$store.state.focusedWindow)
                    window.style.width = this.$store.state.fullWidth + 'px'
                    window.style.height = (this.$store.state.fullHeight - 30) + 'px'
                    window.style.top = 30 + 'px'
                    window.style.left = 0 + 'px'
                    window.style.transform = null
                }
            },
            onMouseDownHandler(e) {
                if (e.button === 2) {
                    let downX = e.clientX
                    let downY = e.clientY
                    let dm = document.getElementById('desktop-menu')
                    dm.style.left = downX + 'px'
                    dm.style.top = downY + 'px'
                    //console.log('left: ', dm.style.left, 'top: ', dm.style.top)
                    this.$store.commit('changeShowDesktopMenu', true)
                    window.onclick = () => {
                        this.$store.commit('changeShowDesktopMenu', false)
                        window.onclick = null
                    }
                }
            },
        }
    }
</script>

<style scoped>

</style>
