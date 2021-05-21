<template>
    <div >
       <vchar-line :data="  chartData" :settings="chartSettings">

       </vchar-line>
    </div>
</template>

<script>
    import VcharLine from "v-charts/lib/line.common";
    export default {
        name: "Echarts",
        components:{
            VcharLine
        },
        data(){
            this.chartSettings={
                labelMap:{
                    PV: '访问用户',
                        Order: '下单用户'
                }
            }
            return {
                chartData: {
                    columns: ['日期', 'PV', 'Order'],
                    rows: [
                        { '日期': this.$moment(new Date()).add(-15, 'days').format("YYYY-MM-DD"), 'PV':  Math.round(Math.random()*1000)+1000, 'Order':   Math.round(Math.random()*1000) },
                        { '日期': this.$moment(new Date()).add(-14, 'days').format("YYYY-MM-DD"), 'PV':  Math.round(Math.random()*1000)+1000, 'Order':   Math.round(Math.random()*1000) },
                        { '日期': this.$moment(new Date()).add(-13, 'days').format("YYYY-MM-DD"), 'PV':  Math.round(Math.random()*1000)+1000, 'Order':   Math.round(Math.random()*1000) },
                        { '日期': this.$moment(new Date()).add(-12, 'days').format("YYYY-MM-DD"), 'PV':  Math.round(Math.random()*1000)+1000, 'Order':   Math.round(Math.random()*1000) },
                        { '日期': this.$moment(new Date()).add(-11, 'days').format("YYYY-MM-DD"), 'PV':  Math.round(Math.random()*1000)+1000, 'Order':   Math.round(Math.random()*1000) },
                        { '日期': this.$moment(new Date()).add(-10, 'days').format("YYYY-MM-DD"), 'PV':  Math.round(Math.random()*1000)+1000, 'Order':   Math.round(Math.random()*1000) },
                        { '日期': this.$moment(new Date()).add(-9, 'days').format("YYYY-MM-DD"), 'PV':  Math.round(Math.random()*1000)+1000, 'Order':   Math.round(Math.random()*1000) },
                        { '日期': this.$moment(new Date()).add(-8, 'days').format("YYYY-MM-DD"),'PV':  Math.round(Math.random()*1000)+1000, 'Order':   Math.round(Math.random()*1000) },
                        { '日期': this.$moment(new Date()).add(-7, 'days').format("YYYY-MM-DD"),'PV':  Math.round(Math.random()*1000)+1000, 'Order':   Math.round(Math.random()*1000) },
                        { '日期': this.$moment(new Date()).add(-6, 'days').format("YYYY-MM-DD"),'PV':  Math.round(Math.random()*1000)+1000, 'Order':   Math.round(Math.random()*1000) },
                        { '日期': this.$moment(new Date()).add(-5, 'days').format("YYYY-MM-DD"),'PV':  Math.round(Math.random()*1000)+1000, 'Order':   Math.round(Math.random()*1000) },
                        { '日期': this.$moment(new Date()).add(-4, 'days').format("YYYY-MM-DD"),'PV':  Math.round(Math.random()*1000)+1000, 'Order':   Math.round(Math.random()*1000) },
                        { '日期': this.$moment(new Date()).add(-3, 'days').format("YYYY-MM-DD"),'PV':  Math.round(Math.random()*1000)+1000, 'Order':   Math.round(Math.random()*1000) },
                        { '日期': this.$moment(new Date()).add(-2, 'days').format("YYYY-MM-DD"),'PV':  Math.round(Math.random()*1000)+1000, 'Order':   Math.round(Math.random()*1000) },
                        { '日期': this.$moment(new Date()).add(-1, 'days').format("YYYY-MM-DD"),'PV':  Math.round(Math.random()*1000)+1000, 'Order':   Math.round(Math.random()*1000) },
                        { '日期': this.$moment(new Date()).add(0, 'days').format("YYYY-MM-DD"), 'PV':  Math.round(Math.random()*1000)+1000, 'Order':   Math.round(Math.random()*1000) },

                    ]
                },

            }
        },
        created() {
            console.log(this.$moment(new Date()).add(1, 'days').format("YYYY-MM-DD"))
        }
    }
</script>

<style scoped>

</style>