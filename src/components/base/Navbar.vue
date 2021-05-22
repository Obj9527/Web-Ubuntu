<template>
    <div class="absolute left-0 top-0 w-full h-30px shadow-lg flex flex-nowrap justify-between items-center bg-ub-grey text-ubt-grey text-sm select-none z-50">
        <div tabindex="0" class="px-3 py-1 transition duration-100 ease-in-out border-b-2 border-transparent focus:border-ubb-orange outline-none">
            Activities
        </div>
        <div tabindex="1"
             class="px-2 py-1 text-xs md:text-sm transition duration-100 ease-in-out border-b-2 border-transparent focus:border-ubb-orange outline-none">
            Time
        </div>
        <div tabindex="2"
             class="relative px-3 py-1 transition duration-100 ease-in-out border-b-2 border-transparent focus:border-ubb-orange outline-none" @click="showControlPanel">
            <Statusbar/>
            <ControlPanel :is-show="this.$store.state.showControlPanel"/>
        </div>
    </div>
</template>

<script>
    import Statusbar from "../utils/Statusbar";
    import ControlPanel from "../utils/ControlPanel";
    export default {
        name: "Navbar",
        components: {ControlPanel, Statusbar},
        methods: {
            showControlPanel() {
                this.$store.commit('changeShowControlPanel', !this.$store.state.showControlPanel)
            }
        }
    }
</script>

<style scoped>
    .h-30px {
        height: 30px;
    }
</style>
