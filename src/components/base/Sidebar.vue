<template>
    <div
        class="absolute left-0 top-0 h-full w-auto pt-8 flex flex-col items-center justify-start border-black border-opacity-75 bg-black bg-opacity-50"
        :class="this.$store.state.hidedSidebar ? 'hide-sidebar':'show-sidebar'">
        <div v-for="app in apps" :key="app.id">
            <SidebarApp :app="app" v-if="app.favourite" :id="'sidebar-' + app.id" @click.native="appClick(app.id)"/>
        </div>
        <SidebarApp style="position: absolute;bottom: 0;" :app="this.showAppsButton"/>
    </div>
</template>

<script>
import SidebarApp from "./SidebarApp";

export default {
    name: 'Sidebar',
    props: {
        apps: {
            type: Array
        }
    },
    data() {
        return {
            showAppsButton: {
                id: "show-apps",
                title: "Show All Apps",
                icon: './themes/Yaru/system/view-app-grid-symbolic.svg',
                disabled: false,
                favourite: true,
                desktop_shortcut: false,
                meta: {}
            },
        }
    },
    components: {
        SidebarApp,
    },
    methods: {
        appClick(id) {
            //console.log(`appClick: id - ${id}`)
            this.$emit('appClick', id)
        }
    }
}
</script>
