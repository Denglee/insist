<template>
    <div class="total-vipBox">
        <!--会员卡记录-->
        <!--<publicIframe/>-->

        <!--选项卡-->
        <el-tabs v-model="activeTabName" @tab-click="tabTotal" class="vip-tabBox pubWidth" v-show="tabPaneState">
            <!--  tabItem1 会员总览 -->
            <el-tab-pane :lazy='tabLazy' label="会员总览" name="VipTotal">
                <!-- A1  会员数量-->
                <el-row :gutter="30" class="total-row">
                    <!--会员数量-->
                    <el-col :md="16" :lg="16">
                        <div class="index-item">
                            <header class="index-item-title">
                                <div class="title">会员数量</div>
                            </header>
                            <el-row>
                                <!--潜在会员-->
                                <el-col :md="12" class="vip-item-num">
                                    <ul class="index-item-tipUl">
                                        <li><img src="~@/assets/icon/vipTotal/vipT-potential.png" alt="">潜在会员</li>
                                        <li><img src="~@/assets/icon/vipTotal/vipT-formal.png" alt="">正式会员</li>
                                    </ul>
                                    <div class="flex-between">

                                        <div style="width: 400px;height: 400px">
                                            <ve-pie :data="totalVipNum" :settings="vPieSetup" :legend-visible="false" :colors="totalColor"></ve-pie>
                                        </div>


                                        <ul class="vipNum">
                                            <li>潜在会员： <span class="vipTipG">{{totalVipNum.rows[0].value}}</span></li>
                                            <li>正式会员： <span class="vipTipB">{{totalVipNum.rows[0].value}}</span></li>
                                        </ul>
                                    </div>
                                </el-col>

                            </el-row>
                        </div>
                    </el-col>

                </el-row>


            </el-tab-pane>


        </el-tabs>



    </div>
</template>

<script>

    import eCharts from '@/components/Echarts/Echarts'
    import navBread from '@/components/Echarts/navBread'
    import {
        PTprivateMember, totalMember_number, totalMember_trend, totalPassenger_trend, totalRefund_trend, totalSub_card_trend,
        PTClassRanking, PTMemberClass,
        VipMemberTkClass, VipSalerStatis,} from '@/assets/js/api' /*引用 会员总览 接口*/

    export default {
        inject:['reLoad'], //注入依赖 App 中的reLoad方法
        name: "StatisIndex",  //会员总览

        data() {
            this.totalColor = ['#FFBE00', '#FF8A7E', '#4CCBEB', '#005AD4'], //自定义的颜色
            this.vPieSetup = {
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
            };

            return {
                activeTabName: 'VipTotal', //VipTotal VipPT VipMembership

                tabLazy: true,
                tabPaneState: true,    //tab 显隐



                totalVipNum: {
                    columns: ['name', 'value'],
                    rows: [
                        {name:'',value:0},
                        {name:'',value:0}
                    ],
                },
            }
        },
        methods: {

            btnRefush(){
                //销售额表格
                 this.PTtable=[{
                    department: '市场部1',
                    pt: '王小虎11',
                    tel: '17688829466',
                    money: '574889',
                    day: '2020-02-14',
                },
                ];
                /*强制刷新 div*/
                this.$forceUpdate();
                // this.reLoad();
            },

            /*tab切换*/
            tabTotal(tab, event) {
                let tabName = tab.name;
                this.callTabApi(tabName);
            },

            /* ==== 会员总览 ==== 接口1 获取数量 totalMember_number*/
            getTotalMember_number() {
                totalMember_number().then(res => {

                    /*潜在 与 正式 会员*/
                    let MemberNum = [];
                    let MemberNum1 = res[0];
                    let MemberNum2 = res[1];
                    MemberNum.push(MemberNum1, MemberNum2);
                    console.log(MemberNum);

                    this.totalVipNum.rows = MemberNum;
                    console.log(this.totalVipNum.rows[0].value);

                    return false;

                    /*有效 与 过期 会员*/
                    let OverdueNum = [];
                    let OverdueNum1 = res[2];
                    let OverdueNum2 = res[3];
                    OverdueNum.push(OverdueNum1, OverdueNum2);
                    this.totalVipOverdue.rows = OverdueNum;

                    /*私教会员*/
                    console.log(OverdueNum);
                    this.totalVipPT.series[0].data = OverdueNum;
                    // this.totalVipPT = res[4].value;

                }).catch(res => {
                    console.log(res);
                });
            },

            /*会员总览 接口2 新增会员走势 totalMember_trend*/
            getTotalMember_trend() {
                totalMember_trend().then(res => {
                    // console.log(res);

                    this.totalNewAdd.xAxis.data = res[0].value.split(',');
                    this.totalNewAdd.series[0].name = res[1].name;
                    this.totalNewAdd.series[0].data = res[1].value.split(',');

                    this.totalNewAdd.series[1].name = res[2].name;
                    this.totalNewAdd.series[1].data = res[2].value.split(',');

                    // let conmArr11 = '100,200,400,100,255,700,800,688,454,1547,145,448,859,664,771,954,147,548,1974,1475,1457,114,784,800,688,454,1547,145,448,859';
                    // let conmArr12 = '744,1445,100,200,400,100,255,700,800,688,454,1547,145,448,859,664,771,954,147,548,1974,1475,1457,800,688,454,1547,145,448,859';
                    // let conmArr1 = conmArr11.split(',');
                    // let conmArr2 = conmArr12.split(',');


                }).catch(res => {
                    console.log(res);
                });
            },

            /*会员总览 接口3 消耗趋势 totalSub_card_trend*/
            getTotalSub_card_trend() {
                totalSub_card_trend().then(res => {
                    // console.log(res);

                    this.totalConsumeTrend.xAxis.data = res[0].value.split(',');
                    this.totalConsumeTrend.series[0].name = res[1].name;
                    this.totalConsumeTrend.series[0].data = res[1].value.split(',');

                    this.totalConsumeTrend.series[1].name = res[2].name;
                    this.totalConsumeTrend.series[1].data = res[2].value.split(',');

                }).catch(res => {
                    console.log(res);
                });
            },

            /*会员总览 接口4 退款,转让走势  totalRefund_trend*/
            getTotalRefund_trend() {
                totalRefund_trend().then(res => {
                    // console.log(res);
                    this.totalRefundTrend.xAxis.data = res[0].value.split(',');
                    this.totalRefundTrend.series[0].name = res[1].name;
                    this.totalRefundTrend.series[0].data = res[1].value.split(',');

                    this.totalRefundTrend.series[1].name = res[2].name;
                    this.totalRefundTrend.series[1].data = res[2].value.split(',');

                    this.totalRefundTrend.series[2].name = res[3].name;
                    this.totalRefundTrend.series[2].data = res[3].value.split(',');

                    this.totalRefundTrend.series[3].name = res[4].name;
                    this.totalRefundTrend.series[3].data = res[4].value.split(',');

                }).catch(res => {
                    console.log(res);
                });
            },

            /*会员总览 接口5 客流走势 totalPassenger_trend*/
            getTotalPassenger_trend() {
                totalPassenger_trend().then(res => {
                    // console.log(res);

                    this.totalPassengerTrend.xAxis.data = res[0].value.split(',');
                    this.totalPassengerTrend.series[0].name = res[1].name;
                    this.totalPassengerTrend.series[0].data = res[1].value.split(',');

                }).catch(res => {
                    console.log(res);
                });
            },


            /* ==== 私教 接口1 私教统计 ==== */
            getPTprivateMember() {
                PTprivateMember().then(res => {
                    // console.log(res);

                    /* 已上课 与 未上课 */
                    let ptLesson = [];
                    let ptHasLesson = res[0];
                    let ptNoLesson = res[1];
                    ptLesson.push(ptHasLesson, ptNoLesson);
                    // console.log(ptLesson);
                    this.PTLesson.series[0].data = ptLesson;

                    /*新增私教 与 续课*/
                    let ptAdd = [];
                    let ptNewAdd1 = res[2];
                    let ptContinue = res[3];
                    ptAdd.push(ptNewAdd1, ptContinue);
                    // console.log(ptLesson);
                    this.PTAdd.series[0].data = ptLesson;

                    /*已跟进 与 未跟进*/
                    let ptFollow = [];
                    let ptHaveFollow = res[4];
                    let ptNoFollow = res[5];
                    ptFollow.push(ptHaveFollow, ptNoFollow);
                    // console.log(ptFollow);
                    this.PTFollow.series[0].data = ptFollow;

                }).catch(res => {
                    console.log(res);
                });
            },
            getPTClassRanking() {
                PTClassRanking().then(res => {
                    let xAata = [];
                    let yAata = [];
                    for(let i=0;i<res.length;i++){
                        xAata.push(res[i].name);
                        yAata.push(res[i].value);
                    }
                    this.PTclass.series[0].data = yAata;
                    this.PTclass.xAxis.data = xAata;
                }).catch(res => {
                    console.log(res);
                });
            },
            getPTMemberClass() {
                PTMemberClass({
                    curpage:1,
                    pageSize:5,
                }).then(res => {
                    console.log(res);
                    this.PTVipTable =res.data;
                }).catch(err => {
                    console.log(err);
                });
            },


            /*搜索*/
            searchPT() {
                console.log(this.input3);
            },

            /* 查看更多 */
            btnTotalMore(e1, e2) {
                console.log(e1);
                this[e1] = false;    //tab隐藏
                this[e2] = true;  //表格显示
            },

            /* 返回上一页 */
            goBack(e1, e2) {
                console.log(e1);

                this[e2] = false;   //隐藏当前 表格详情
                this.tabPaneState = true; //显示对应tab
                this.activeName = e1; //VipTotal VipPT VipMembership
            },

            /* ==== 会籍 接口1 销售额查询 ==== */
            getVipSalerStatis(){
                VipSalerStatis().then(res => {
                    console.log(res);
                    /* 已上课 与 未上课 */
                    let ptLesson = [];
                    let ptHasLesson = res[0];
                    let ptNoLesson = res[1];
                    ptLesson.push(ptHasLesson, ptNoLesson);
                    // console.log(ptLesson);
                    this.VipLesson.series[0].data = ptLesson;

                    /*新增私教 与 续课*/
                    let ptAdd = [];
                    let ptNewAdd1 = res[2];
                    let ptContinue = res[3];
                    ptAdd.push(ptNewAdd1, ptContinue);
                    // console.log(ptLesson);
                    this.VipAdd.series[0].data = ptLesson;

                    /*已跟进 与 未跟进*/
                    let ptFollow = [];
                    let ptHaveFollow = res[4];
                    let ptNoFollow = res[5];
                    ptFollow.push(ptHaveFollow, ptNoFollow);
                    // console.log(ptFollow);
                    this.VipFollow.series[0].data = ptFollow;
                }).catch(res => {
                    console.log(res);
                });
            },

            getVipMemberTkClass() {
                VipMemberTkClass({
                    curpage:1,
                    pageSize:5,
                }).then(res => {
                    console.log(res);
                }).catch(res => {
                    console.log(res);
                });
            },


            /*接口调用*/
            callTabApi(tabName){
                console.log(tabName);
                if(tabName == 'VipTotal'){
                    /*调用 ==== 会员总览1 ==== 会员数量*/
                    this.getTotalMember_number();
                    // /*调用 会员总览2 新增会员走势*/
                    // this.getTotalMember_trend();
                    // /*调用 会员总览3 消耗趋势*/
                    // this.getTotalSub_card_trend();
                    // /*调用 会员总览4 退款,转让走势*/
                    // this.getTotalRefund_trend();
                    // /*调用 会员总览5 客流走势*/
                    // this.getTotalPassenger_trend();
                };
                if(tabName == 'VipPT'){
                    /*调用 ==== 私教1 ==== 私教统计*/
                    this.getPTprivateMember();
                    this.getPTMemberClass();
                    this.getPTClassRanking();
                };
                if(tabName == 'VipMembership'){
                    this.getVipMemberTkClass();
                    this.getVipSalerStatis();
                };
            },
        },
        created() {
            let tabName =this.activeTabName;
            this.callTabApi(tabName);
        },

        components: {
            eCharts,
            navBread,
        },
    }
</script>


<style lang="scss">
    /*引用css*/
    @import "@/assets/css/totalVip.scss";
    /*.vip-tabBox{*/
    /*    display: none;*/
    /*}*/

</style>