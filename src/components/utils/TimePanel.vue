<template>
    <div class="relative" @mousedown="showTimePanel">
        <time>{{this.time}}</time>
        <div class="absolute top-8 left-1/2 transform -translate-x-1/2 bg-ub-cool-grey text-sm text-white rounded-lg flex"
             style="width: 600px;height: 350px"
             v-if="showed">
            <div class="w-3/5"></div>
            <div class="flex items-center">
                <div class="border-r border-gray-900 h-5/6">
                </div>
            </div>
            <div class="w-2/5 flex flex-col">
                <div class="w-full flex flex-col justify-start items-start pl-6 pt-4 pb-2">
                    <div class="text-sm">{{ week }}</div>
                    <div class="text-lg font-bold">{{this.date}}</div>
                </div>
                <div class="border border-gray-900 rounded-md w-11/12 h-full mx-auto mb-4 flex justify-center items-center">
                    <div class="text-2xl font-bold">
                        Keep Doing ...
                        <!-- TODO: Calender component -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TimePanel",
    data(){
        return {
            time: '',
            date: '',
            week: '',
            showed: false,
            options: {
                showHeader: true,
                beginDate: "2018-07-30",
                endDate: "2018-08-12",
                currentDate: "2018-08-03"
            }
        }
    },
    mounted() {
        this.updateTime()
    },
    components: {
    },
    methods: {
        updateTime() {
            setInterval(() => {
                let dateObj = new Date()
                this.date = dateObj.getFullYear() + '-' + (dateObj.getMonth()+1) + '-' + dateObj.getDate()
                this.week = this.parseWeek(dateObj.getDay())
                this.time = dateObj.toString().substring(16, 24)
            }, 1000)
        },
        showTimePanel() {
            this.showed = !this.showed
        },
        parseWeek(day) {
            switch (day) {
                case 0: {
                    return '星期日'
                }
                case 1: {
                    return '星期一'
                }
                case 2: {
                    return '星期二'
                }
                case 3: {
                    return '星期三'
                }
                case 4: {
                    return '星期四'
                }
                case 5: {
                    return '星期五'
                }
                case 6: {
                    return '星期六'
                }
                default: {
                    return '未知星期'
                }
            }
        }
    }
}
</script>