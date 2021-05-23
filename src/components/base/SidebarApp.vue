<template>
    <div class="relative w-auto h-auto m-1 p-2 transition duration-300 hover:bg-white hover:bg-opacity-10 rounded"
         :class="this.showSelected ? 'bg-white bg-opacity-10':''"
         @mouseenter="showTitle" @mouseleave="closeTitle">
        <div>
            <img class="w-8" :src="this.app.icon" alt="Ubuntu App"/>
        </div>
        <div class="w-1 h-1 absolute left-0 top-1/2 bg-ub-orange rounded-sm transform -translate-y-1/2"
             :class="this.isClosed ? 'invisible':'visible'"></div>
        <div
            class="w-max absolute left-full top-1 py-0.5 px-1.5 ml-3 m-1 text-ubt-grey text-opacity-90 text-sm bg-ub-grey bg-opacity-70 border-gray-400 border border-opacity-40 rounded-md"
            v-if="this.isShowTitle">{{ app.title }}
        </div>
    </div>
</template>

<script>
export default {
    name: "SidebarApp",
    props: {
        app: {
            type: Object,
        }
    },
    data() {
        return {
            isShowTitle: false,
            focused: false,
        }
    },
    computed: {
        isClosed() {
            return this.$store.state.windowList.indexOf(this.app) === -1
        },
        showSelected() {
            if (this.$store.state.focusedWindow === this.app.id && !this.isClosed) {
                return true
            } else {
                return false
            }
        },
    },
    methods: {
        showTitle() {
            this.isShowTitle = true
        },
        closeTitle() {
            this.isShowTitle = false
        }
    }
}
</script>
