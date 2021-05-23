<template>
    <div class="flex justify-center">
        <div class="border-t py-1 w-2/5" :class="'border-' + this.color"></div>
    </div>
</template>

<script>
export default {
    name: "Separator",
    props: {
        color: {
            type: String,
            default: 'gray-900',
        }
    }
}
</script>