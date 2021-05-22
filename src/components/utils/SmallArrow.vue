<template>
    <div :class="'arrow-custom-' + this.angle"></div>
</template>

<script>
    export default {
        name: "SmallArrow",
        props: {
            angle: {
                type: String
            }
        }
    }
</script>
