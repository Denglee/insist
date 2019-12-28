<!--<template>-->
<!--    <div class="layoutR-main">-->
<!--        &lt;!&ndash;<iframe src="http://spt.zmtek.net/admin/index/home.html" frameborder="0"></iframe>&ndash;&gt;-->

<!--        <div id="circleCenter" ref="main" class="circleCenter" ></div>-->

<!--    </div>-->
<!--</template>-->

<!--<script>-->

<!--    export default {-->
<!--        name: "index",-->
<!--        data() {-->
<!--            return {-->
<!--                charts: '',-->
<!--                opinion:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],-->
<!--                opinionData:[-->
<!--                    {value:335, name:'直接访问'},-->
<!--                    {value:310, name:'邮件营销'},-->
<!--                    {value:234, name:'联盟广告'},-->
<!--                    {value:135, name:'视频广告'},-->
<!--                    {value:1548, name:'搜索引擎'}-->
<!--                ],-->
<!--            }-->
<!--        },-->

<!--        methods: {-->
<!--            getIndex() {-->
<!--                // recRegister({-->
<!--                //-->
<!--                // }).then((res) =>{-->
<!--                //     console.log(res);-->
<!--                // })-->
<!--            },-->

<!--            draw(){-->
<!--                // 基于准备好的dom，初始化echarts实例-->
<!--                let myChart = this.$echarts.init(this.$refs.main);-->

<!--                // 绘制图表-->
<!--                myChart.setOption(-->
<!--                    {-->
<!--                        color: ['#3398DB'],-->
<!--                        tooltip : {-->
<!--                            trigger: 'axis',-->
<!--                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效-->
<!--                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'-->
<!--                            }-->
<!--                        },-->
<!--                        grid: {-->
<!--                            left: '3%',-->
<!--                            right: '4%',-->
<!--                            bottom: '3%',-->
<!--                            containLabel: true-->
<!--                        },-->
<!--                        xAxis : [-->
<!--                            {-->
<!--                                type : 'category',-->
<!--                                data : ['7月1日', '7月2日', '7月3日', '7月4日', '7月5日', '7月6日', '7月7日', '7月8日', '7月9日'],-->
<!--                                axisTick: {-->
<!--                                    alignWithLabel: true-->
<!--                                }-->
<!--                            }-->
<!--                        ],-->
<!--                        yAxis : [-->
<!--                            {-->
<!--                                type : 'value'-->
<!--                            }-->
<!--                        ],-->
<!--                        series : [-->
<!--                            {-->
<!--                                name:'直接访问',-->
<!--                                type:'bar',-->
<!--                                barWidth: '10%',-->
<!--                                data: [10, 52, 200, 334, 390, 330, 220, 300, 800]-->
<!--                            }-->
<!--                        ]-->
<!--                    }-->
<!--                );-->
<!--            },-->

<!--        },-->
<!--        created() {-->
<!--            this.getIndex();-->
<!--        },-->

<!--        // 注意，必须mounted后绘制-->
<!--        mounted(){-->
<!--            this.$nextTick(function() {-->
<!--                this.draw();-->
<!--            })-->
<!--        },-->
<!--        computed: {}-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--    iframe {-->
<!--        width: 100%;-->
<!--        min-height: 100vh;-->
<!--    }-->
<!--</style>-->

<!--

<template>
    <div>
        &lt;!&ndash;<div id="main" style="width: 600px;height:400px;"></div>&ndash;&gt;
        <Chart id="test"/>
&lt;!&ndash;        <Echarts id="test" :option="option"></Echarts>&ndash;&gt;
    </div>
</template>
<script>

    import Echarts from "@/components/Echarts/echarsIndex"
    import Chart  from "@/components/Echarts/Chart"
    export default {
        name: "app",
        data(){
            return {
                Pic:[5, 20, 36, 10, 10, 20],

                chartData: {
                    xData: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
                    sData: [5, 20, 36, 10, 10, 70]
                },
                option: {
                    title: {
                        text: "vue-Echarts"
                    },
                    legend: {
                        data: ["销量"]
                    },
                    xAxis: {
                        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子", "tuoxie"]
                    },
                    series: [
                        {
                            name: "销量",
                            type: "line",
                            data: [5, 20, 36, 10, 10, 70]
                        }
                    ]
                },

            }
        },
        methods: {
            /*drawChart() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById("main"));
                // 指定图表的配置项和数据
                let option = {
                    title: {
                        text: "ECharts 入门示例"
                    },
                    tooltip: {},
                    legend: {
                        data: ["销量"]
                    },
                    xAxis: {
                        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                    },
                    yAxis: {},
                    series: [
                        {
                            name: "销量",
                            type: "bar",
                            data: this.Pic,
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }*/

            //添加refreshData方法进行自动设置数据
            // refreshData() {
            //     //横轴数据
            //     let xData = this.chartData.xData,
            //         //系列值
            //         sData = this.chartData.sData;
            //     for (let i = 0; i < xData.length; i++) {
            //         //此处使用let是关键，也可以使用闭包。原理不再赘述
            //         setTimeout(() => {
            //             this.option.xAxis.data.push(xData[i]);
            //             this.option.series[0].data.push(sData[i]);
            //         }, 1000*i)//此处要理解为什么是1000*i
            //     }
            // }

        },
        mounted() {
            /*this.drawChart();*/

            // this.refreshData();
        },

        components: {
            Echarts,
            Chart
        }
    };
</script>
-->
