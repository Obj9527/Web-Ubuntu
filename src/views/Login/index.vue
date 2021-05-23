<template>
    <div class="relative duration-500 select-none flex flex-col justify-around items-center top-0 right-0 overflow-hidden m-0 p-0 h-screen w-screen bg-ub-violet">
        <img class="md:w-1/4 w-1/2" :src="this.icons.cofOrangeHex" alt="Ubuntu Logo"/>
        <div class="w-10 h-10 flex justify-center items-center rounded-full outline-none cursor-pointer" @click="turnOn">
            <div class="rounded-full flex justify-center items-center w-10 h-10 hover:bg-gray-300" :class="isBoot ? 'bg-ub-violet':'bg-white'">
                <img v-if="!isBoot" class="w-8" :src="this.icons.powerButton" alt="Power Button">
                <img v-if="isBoot" :class="this.isBoot ? 'animate-spin':''" class="w-10" :src="this.icons.processSymbol" alt="Ubuntu Process Symbol" />
            </div>
        </div>
        <img class="md:w-1/5 w-1/2" :src="this.icons.ubuntuWhiteHex" alt="Ubuntu Name"/>
        <div class="text-white mb-4">
            <a class="underline" href="https://zzjbhack.com" rel="noreferrer noopener"
               target="_blank">Blog</a>
            <span class="font-bold mx-1">|</span>
            <a href="https://github.com/obj9527/obj9527.github.io" rel="noreferrer noopener" target="_blank"
               class="underline">github</a>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Login',
        data() {
            return {
                icons: {
                    cofOrangeHex: './themes/Yaru/status/cof_orange_hex.svg',
                    ubuntuWhiteHex: './themes/Yaru/status/ubuntu_white_hex.svg',
                    powerButton: './themes/Yaru/status/power-button.svg',
                    processSymbol: './themes/Yaru/status/process-working-symbolic.svg',
                },
                isBoot: false,
            }
        },
        methods: {
            turnOn() {
                this.isBoot = true
                setTimeout(() => {
                    this.fullScreen()
                    this.$router.push('/desktop')
                }, 2000)
            },
            fullScreen() {
                let element = document.documentElement;
                if (element.requestFullscreen) {
                    element.requestFullscreen()
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen()
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen()
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen()
                }
            }
        }
    }
</script>
