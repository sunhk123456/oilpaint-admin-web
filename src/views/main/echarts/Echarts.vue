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
                        { '日期': '2018-05-22', 'PV': 32371, 'Order': 19810 },
                        { '日期': '2018-05-23', 'PV': 12328, 'Order': 4398 },
                        { '日期': '2018-05-24', 'PV': 92381, 'Order': 52910 }
                    ]
                },

            }
        }
    }
</script>

<style scoped>

</style>