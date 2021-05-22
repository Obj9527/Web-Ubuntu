<template>
    <div>
        <span class="mx-1.5 rounded-full flex justify-center mt-1 h-5 w-5 items-center"
              :class="[this.button.bgColor,this.button.bgOpacity,this.button.bgHoverOpacity]">
            <img
                :src="button.img"
                :alt="button.alt"
                class="inline"
            />
        </span>
    </div>
</template>

<script>
    export default {
        name: "WindowHeaderButton",
        props: {
            button: {
                type: Object,
                required: true,
            }
        }
    }
</script>
