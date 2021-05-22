<template>
    <div class="flex justify-center items-center">
        <span class="mx-1.5">
            <img
                src="../../../public/themes/Yaru/status/network-wireless-signal-good-symbolic.svg"
                alt="ubuntu wifi"
                class="inline status-symbol"
            />
        </span>
        <span class="mx-1.5">
            <img
                src="../../../public/themes/Yaru/status/audio-volume-medium-symbolic.svg"
                alt="ubuntu sound"
                class="inline status-symbol"
            />
        </span>
        <span class="mx-1.5">
        <img
            src="../../../public/themes/Yaru/status/battery-good-symbolic.svg"
            alt="ubuntu battry"
            class="inline status-symbol"
        />
        </span>
        <span class="mx-1">
            <SmallArrow angle="down"/>
        </span>
    </div>
</template>

<script>
    import SmallArrow from "./SmallArrow";
    export default {
        name: "Statusbar",
        components: {SmallArrow},
    }
</script>
