<template>
    <div class="relative bg-ub-window-title border-t-2 border-white border-opacity-5 py-1.5 px-3 text-white w-full select-none"
        :class="this.maximized ? 'duration-300 rounded-none':'rounded-lg rounded-b-none'">
        <div class="flex justify-center items-center text-sm font-bold">
            {{title}}
        </div>
        <div class="absolute select-none right-0 top-0 mt-1 mr-1 flex justify-center items-center">
            <WindowHeaderButton :button="this.buttons.minButton" @click.native.stop="$emit('minimize')" @mousedown.native.stop/>
            <WindowHeaderButton :button="this.buttons.restoreButton" v-if="!this.isVisible" @click.native.stop="restoreButtonClick" @mousedown.native.stop/>
            <WindowHeaderButton :button="this.buttons.maxButton" v-if="this.isVisible" @click.native.stop="maxButtonClick" @mousedown.native.stop/>
            <WindowHeaderButton :button="this.buttons.closeButton" @click.native.stop="$emit('close')" @mousedown.native.stop/>
        </div>
    </div>
</template>

<script>
    import WindowHeaderButton from "./WindowHeaderButton";
    export default {
        name: "WindowHeader",
        components: {WindowHeaderButton},
        props: {
            id: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                buttons: {
                    minButton: {
                        img: './themes/Yaru/window/window-minimize-symbolic.svg',
                        alt: 'ubuntu window minimize',
                        bgColor: 'bg-white',
                        bgOpacity: 'bg-opacity-0',
                        bgHoverOpacity: 'hover:bg-opacity-10',
                    },
                    restoreButton: {
                        img: './themes/Yaru/window/window-restore-symbolic.svg',
                        alt: 'ubuntu window restore',
                        bgColor: 'bg-white',
                        bgOpacity: 'bg-opacity-0',
                        bgHoverOpacity: 'hover:bg-opacity-10',
                    },
                    maxButton: {
                        img: './themes/Yaru/window/window-maximize-symbolic.svg',
                        alt: 'ubuntu window maximize',
                        bgColor: 'bg-white',
                        bgOpacity: 'bg-opacity-0',
                        bgHoverOpacity: 'hover:bg-opacity-10',
                    },
                    closeButton: {
                        img: './themes/Yaru/window/window-close-symbolic.svg',
                        alt: 'ubuntu window close',
                        bgColor: 'bg-ub-orange',
                        bgOpacity: 'bg-opacity-90',
                        bgHoverOpacity: 'hover:bg-opacity-100',
                    },
                },
                isVisible: true,
            }
        },
        computed: {
            maximized() {
                return !(this.$store.state.maximizedWindowList.indexOf(this.id) === -1)
            },
        },
        methods: {
            restoreButtonClick() {
                this.isVisible = true
                this.$emit('restore')
            },
            maxButtonClick() {
                this.isVisible = false
                this.$emit('maximize')
            }
        }
    }
</script>
