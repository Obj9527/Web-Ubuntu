<template>
    <div id="desktop-menu"
         class="w-52 bg-ub-context-menu border text-left font-light border-gray-900 rounded text-white py-4 absolute z-50 text-sm"
         :class="this.$store.state.showDesktopMenu ? 'block':'hidden'">
        <div @click="addNewFolder" class="w-full py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5 text-gray-400">
            <span class="ml-5">New Folder</span>
        </div>
        <Separator/>
        <div class="w-full py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5 text-gray-400">
            <span class="ml-5">Paste</span>
        </div>
        <Separator/>
        <div class="w-full py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5 text-gray-400">
            <span class="ml-5">Show Desktop in Files</span>
        </div>
        <div @click="openTerminal" class="w-full py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5">
            <span class="ml-5">Open in Terminal</span>
        </div>
        <Separator/>
        <div @click="openSettings" class="w-full py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5">
            <span class="ml-5">Change Background...</span>
        </div>
        <Separator/>
        <div class="w-full py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5 text-gray-400">
            <span class="ml-5">Display Settings</span>
        </div>
        <div @click="this.openSettings" class="w-full py-0.5 hover:bg-ub-warm-grey hover:bg-opacity-20 mb-1.5">
            <span class="ml-5">Settings</span>
        </div>
    </div>
</template>

<script>
    import apps from "../../apps";
    import Separator from "@/components/utils/Separator";

    export default {
        name: "DesktopMenu",
        components: {Separator},
        data() {
            return {
                apps
            }
        },
        methods: {
            addNewFolder() {
            },
            openTerminal() {
                setTimeout(() => {
                    this.$store.commit('openWindow', this.apps[4])
                    this.$store.commit('refreshWindowFocused', this.apps[4].id)
                }, 400)
            },
            openSettings() {
                setTimeout(() => {
                    this.$store.commit('openWindow', this.apps[6])
                    this.$store.commit('refreshWindowFocused', this.apps[6].id)
                }, 400)
            },
        }
    }
</script>
