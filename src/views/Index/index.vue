<template>
    <div class="layoutR-main index-container">
        <!--        <iframe src="https://swim.zmtek.net/admin/index/home.html" frameborder="0"></iframe>-->
        <!--         <iframe src="http://192.168.0.133:20000" frameborder="0"></iframe>-->

        <!--现有会员  新增会员 在场人数 -->
        <el-row :gutter="20" class="index-row">
            <!--现有会员-->
            <el-col :md="12" :lg="8">
                <div class="index-item">
                    <header class="index-item-title" @click="changeData($event)">
                        <div class="title">现有会员</div>
                    </header>
                    <ul class="index-item-tipUl">
                        <li><img src="~@/assets/icon/icon_indexVipG.png" alt="">潜在会员</li>
                        <li><img src="~@/assets/icon/icon_indexVipB.png" alt="">正式会员</li>
                        <li><img src="~@/assets/icon/icon_indexVipY.png" alt="">私教会员</li>
                    </ul>
                    <div class="flex-between">
                        <eCharts :eChartObj="chartVip" :style="styleVip"></eCharts>
                        <ul class="vipNum">
                            <li>潜在会员： <span class="vipTipG">{{chartVipData[0].value}}</span></li>
                            <li>正式会员： <span class="vipTipG">{{chartVipData[1].value}}</span></li>
<!--                            <li>私教会员： <span class="vipTipG">{{chartVipData.data[2].personal_members}}</span></li>-->
<!--                            <li>正式会员： <span class="vipTipB">{{chartVip.series[0].data[1].value}}</span></li>-->
<!--                            <li>私教会员： <span class="vipTipY">{{chartVip.series[0].data[2].value}}</span></li>-->
                        </ul>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import eCharts from '@/components/Echarts/Echarts'
    import {IndexTotal_membership,IndexNew_membership,IndexStatistics,IndexDrawer,IndexCurriculum,IndexPerformance,IndexRevenue_trend} from '@/assets/js/api'   /*引用 首页 接口*/
    export default {
        name: "index",
        inject: ['reLoad'],

        data() {
            return {

                chartVipData:[],
                progerssStroke:'square',  /*progress*/
                presentNo:'20',  /*在场人数*/
                customerNo:'20',  /*客流人数*/

                datePresent: '',        /*在场人数 时间选择*/
                dateLesson: '',        /*课程分析 时间选择*/
                dateComeinTotal: '',   /*收入统计 时间选择*/
                dateComein: '',        /*收入趋势 时间选择*/

                roomFeman: "",
                /*eCharts 对应宽高*/
                styleVip: {
                    height: '220px',
                    width: '220px',
                },


                /*现有会员*/
                chartVip: {
                    color: ['#FF8A7E', '#4CCBEB', '#005AD4'], //自定义的颜色
                    tooltip: {
                        trigger: 'item',
                    },
                    series: [{
                        // name: '现有会员',
                        height: '90%',
                        width: '90%',
                        left: '10%',
                        top: 0,
                        type: 'pie',

                        data: [],
                        label: {
                            normal: {
                                position: 'inner',
                                show: false,
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        }
                    }],
                },

            }
        },

        methods: {
            /*获取  数据*/
            getTotal(){
                let that = this;
                IndexTotal_membership().then(res => {
                    console.log(res);
                    /*现有会员  数据*/
                    // this.$nextTick(()=>{
                        this.chartVipData = res;
                        console.log(that.chartVipData[0].value);
                        console.log(that.chartVipData[1].value);
                    // });
                }).catch(res =>{
                   console.log(res);
                });
            },

        },
        mounted(){
            /*调用 获取收数据接口 方法*/
            // this.getTotal();
        },
        created() {

            let that =this;

            /*调用 获取收数据接口 方法*/
            this.getTotal();

            this.chartVip.series[0].data = [
                // {value: 335, name: '直接访问'},
                // {value: 310, name: '邮件营销'},
                // {value: 234, name: '联盟广告'},
                {
                    name:'1',
                    value:'20',
                },{
                    name:'2',
                    value:'10',
                }
            ];

            /*新增会员  数据*/
            // that.addVip.series[0].data = [
            //     {value: 0, name: '潜在会员'},
            //     {value: 0, name: '正式会员'},
            //     {value: 0, name: '私教会员'},
            // ];


        },
        components: {
            eCharts
        },

        /*页面刷新*/
        beforeRouteEnter(to, from, next) {
            console.log(to);
            console.log(from);
            if (from.name == 'login') {
                console.log('我从登陆页过来的 正在刷新……');
                next(vm => {
                    window.location.reload();
                })
            } else {
                next()
            }
        },

    }
</script>

<style scoped lang="scss">
    iframe {
        width: 100%;
        min-height: 100vh;
    }

    .layoutR-main {
        padding: 20px;
    }
</style>

