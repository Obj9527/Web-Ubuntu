<template>
    <div class="absolute top-9 right-3 py-4 bg-ub-cool-grey rounded-md shadow border-black border border-opacity-20 status-card"
         :class="isShow ? 'visible': 'invisible'">
        <div class="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20">
            <div class="w-8">
                <img :src="this.images.ubuntuHeadPhone" alt="ubuntu headphone">
            </div>
            <input type="range" class="ubuntu-slider w-2/3" name="headphone_range" min="0" max="100" step="1"
                   value="75">
        </div>
        <div class="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20">
            <div class="w-8">
                <img :src="this.images.ubuntuBrightness" alt="ubuntu brightness"/>
            </div>
            <input type="range" class="ubuntu-slider w-2/3" name="brightness_range" min="0" max="100"
                   value="80" step="1"/>
        </div>
        <div class="w-64 flex content-center justify-center">
            <div class="w-2/4 border-black border-opacity-50 border-b my-2 border-solid"></div>
        </div>
        <div class="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20">
            <div class="w-8"><img :src="this.images.ubuntuWifi"
                                  alt="ubuntu wifi"></div>
            <div class="w-2/3 flex items-center justify-between text-gray-400"><span>iPhone XR</span>
                <div class=" arrow-custom-right"></div>
            </div>
        </div>
        <div class="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20">
            <div class="w-8"><img :src="this.images.ubuntuBluetooth" alt="ubuntu bluetooth"></div>
            <div class="w-2/3 flex items-center justify-between text-gray-400"><span>Off</span>
                <div class=" arrow-custom-right"></div>
            </div>
        </div>
        <div class="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20">
            <div class="w-8"><img :src="this.images.ubuntuBattery" alt="ubuntu battery"></div>
            <div class="w-2/3 flex items-center justify-between text-gray-400"><span>2:40 Remaining (75%)</span>
                <div class=" arrow-custom-right"></div>
            </div>
        </div>
        <div class="w-64 flex content-center justify-center">
            <div class="w-2/4 border-black border-opacity-50 border-b my-2 border-solid"></div>
        </div>
        <div id="open-settings"
             class="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20">
            <div class="w-8"><img :src="this.images.ubuntuSettings" alt="ubuntu settings"></div>
            <div class="w-2/3 flex items-center justify-between"><span>Settings</span></div>
        </div>
        <div class="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20">
            <div class="w-8"><img :src="this.images.ubuntuLock" alt="ubuntu lock"></div>
            <div class="w-2/3 flex items-center justify-between"><span>Lock</span></div>
        </div>
        <div class="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20">
            <div class="w-8"><img :src="this.images.ubuntuPower" alt="ubuntu power"></div>
            <div class="w-2/3 flex items-center justify-between" @mousedown="logout"><span>Power Off / Log Out</span>
                <div class=" arrow-custom-right"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ControlPanel",
        props: {
            isShow: {
                type: Boolean
            }
        },
        data() {
            return {
                images: {
                    ubuntuHeadPhone: './themes/Yaru/status/audio-headphones-symbolic.svg',
                    ubuntuBrightness: './themes/Yaru/status/display-brightness-symbolic.svg',
                    ubuntuWifi: './themes/Yaru/status/network-wireless-signal-good-symbolic.svg',
                    ubuntuBluetooth: './themes/Yaru/status/bluetooth-symbolic.svg',
                    ubuntuBattery: './themes/Yaru/status/battery-good-symbolic.svg',
                    ubuntuSettings: './themes/Yaru/status/emblem-system-symbolic.svg',
                    ubuntuLock: './themes/Yaru/status/changes-prevent-symbolic.svg',
                    ubuntuPower: './themes/Yaru/status/system-shutdown-symbolic.svg',
                }
            }
        },
        methods:{
            logout() {
                this.$router.push('/login')
            }
        }
    }
</script>
