<template>
    <div :id="'border-' + this.direction + '-' + this.id" :class="this.classStyle"></div>
</template>

<script>
    export default {
        name: "WindowSidebar",
        props: {
            id: {
              type: String,
              required: true
            },
            direction: {
                type: String,
                required: true,
            }
        },
        computed: {
            classStyle() {
                if (this.direction === 'left') {
                    return 'absolute left-0 w-1 h-full transform -translate-x-1/2'
                }else if (this.direction === 'right') {
                    return 'absolute right-0 w-1 h-full transform translate-x-1/2'
                }else {
                    return 'absolute bottom-0 h-1 w-full transform translate-y-1/2'
                }
            }
        },
    }
</script>
