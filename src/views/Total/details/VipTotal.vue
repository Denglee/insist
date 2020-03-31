<template>
    <div>
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
                                <div class="pic-content">
                                    <ve-pie :data="totalVipNum"
                                            :legend-visible="false"
                                            :colors="totalColor"
                                            :style="picStyle"
                                            :settings="picSettings"></ve-pie>
                                </div>
                                <ul class="vipNum">
                                    <li>潜在会员： <span class="vipTipG">{{totalVipNum.rows[0].value}}</span></li>
                                    <li>正式会员： <span class="vipTipB">{{totalVipNum.rows[1].value}}</span></li>
                                </ul>
                            </div>
                        </el-col>

                        <!--有效会员-->
                        <el-col :md="12" class="vip-item-num vip-item-num2">
                            <ul class="index-item-tipUl">
                                <li><img src="~@/assets/icon/vipTotal/vipT-effective.png" alt="">有效会员</li>
                                <li><img src="~@/assets/icon/vipTotal/vipT-overdue.png" alt="">过期会员</li>
                            </ul>
                            <div class="flex-between">
                                <div class="pic-content">
                                    <ve-pie :data="totalVipOverdue"
                                            :legend-visible="false"
                                            :colors="OverdueColor"
                                            :style="picStyle"
                                            :settings="picSettings"></ve-pie>
                                </div>
                                <ul class="vipNum">
                                    <li>有效会员： <span class="colorYellow">{{totalVipOverdue.rows[0].value}}</span></li>
                                    <li>过期会员： <span class="colorRed">{{totalVipOverdue.rows[1].value}}</span></li>
                                </ul>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <!--私教会员-->
            <el-col :md="8" :lg="8">
                <div class="index-item">
                    <header class="index-item-title">
                        <div class="title">私教会员</div>
                    </header>
                    <ul class="index-item-tipUl">
                        <li><img src="~@/assets/icon/vipTotal/vipT-effective.png" alt="">私教会员</li>
                        <li><img src="~@/assets/icon/vipTotal/vipT-overdue.png" alt="">过期会员</li>
                    </ul>
                    <div class="flex-between">
                        <div class="pic-content">
                            <ve-ring :data="totalVipPT"
                                     :legend-visible="false"
                                     :colors="totalColor"
                                     :style="picStyle"
                                     :settings="ringSettings"></ve-ring>
                        </div>
                        <ul class="vipNum">
                            <li>私教会员： <span class="colorYellow">{{totalVipPT.rows[0].value}}</span></li>
                            <li>过期会员： <span class="colorRed">{{totalVipPT.rows[1].value}}</span></li>
                        </ul>
                    </div>
                </div>
            </el-col>
        </el-row>

        <!-- A2 新增会员走势-->
        <div class="index-item comein-main">
            <header class="index-item-title flex-between">
                <div class="title">新增会员走势</div>
            </header>
            <ul class="index-item-tipUl">
                <li><img src="~@/assets/icon/vipTotal/vipT-addCard.png" alt="" class="vipT-addCard">办卡人数</li>
                <li><img src="~@/assets/icon/vipTotal/vipT-addPT.png" alt="">私教人数</li>
            </ul>
            <ve-line
                    :data="totalNewAdd"
                    :legend-visible="false"
                    :colors="AddVipColor"
                    :style="LineStyle"
                    :extend = 'lineExtend'
            ></ve-line>
        </div>

        <!--A3 消耗趋势-->
        <div class="index-item comein-main">
            <header class="index-item-title flex-between">
                <div class="title">消耗趋势</div>
            </header>
            <ul class="index-item-tipUl">
                <li><img src="~@/assets/icon/vipTotal/vipT-xhOnce.png" alt="">次卡</li>
                <li><img src="~@/assets/icon/vipTotal/vipT-xhPT.png" class="vipT-addCard" alt="">私教</li>
            </ul>
            <ve-line
                    :data="totalConsumeTrend"
                    :legend-visible="false"
                    :colors="totalColor"
                    :style="LineStyle"
                    :extend = 'lineExtend'
            ></ve-line>
        </div>

        <!--A4 转卡退款人数走势-->
        <div class="index-item comein-main">
            <header class="index-item-title flex-between">
                <div class="title">转卡退款人数走势</div>
            </header>
            <ul class="index-item-tipUl">
                <li><img src="~@/assets/icon/vipTotal/vipT-xhOnce.png" alt="">会籍退款</li>
                <li><img class="vipT-addCard" src="~@/assets/icon/vipTotal/vipT-xhPT.png" alt="">会籍转卡</li>
                <li><img class="vipT-addCard" src="~@/assets/icon/vipTotal/vipT-addCard.png" alt="">私教退款</li>
                <li><img class="vipT-addCard" src="~@/assets/icon/vipTotal/vipT-zkPT.png" alt="">私教转卡</li>
            </ul>
            <ve-line
                    :data="totalRefundTrend"
                    :legend-visible="false"
                    :colors="AddRefund"
                    :style="LineStyle"
                    :extend = 'lineExtend'
            ></ve-line>
        </div>

        <!--A5 每日客流走势-->
        <div class="index-item comein-main">
            <header class="index-item-title flex-between">
                <div class="title">每日客流走势</div>
            </header>
            <ve-line
                    :data="totalPassengerTrend"
                    :legend-visible="false"
                    :colors="totalColor"
                    :style="LineStyle"
                    :extend = 'lineExtend'
            ></ve-line>
        </div>
    </div>
</template>

<script>

    import {
         totalMember_number, totalMember_trend, totalPassenger_trend, totalRefund_trend, totalSub_card_trend,
    } from '@/assets/js/api' /*引用 会员总览 接口*/


    import {lineExtendConfig} from '@/assets/js/vChartsConfig/vChartsConfig'   //vcharts配置

    export default {
        name: "VipTotal",
        data() {
            this.totalColor = ['#4CCBEB', '#005AD4']; //会员总览 潜在会员 自定义的颜色
            this.OverdueColor = ['#FFBE00', '#FF8A7E', '#4CCBEB', '#005AD4'];
            this.AddVipColor = ['#FF8A7E', '#005AD4', '#4CCBEB']; //会员总览2 新增会员走势
            this.AddRefund = ['#4CCBEB', '#005AD4', '#FF8A7E', '#FFBE00']; //会员总览2 新增会员走势
            this.lineExtend = lineExtendConfig;

            return {

                /* == 会员总览 eCharts 对应宽高 == */
                picStyle: {
                    height: '180px',
                    width: '180px',
                },
                ringSettings : {
                    offsetY: 100,
                    offsetX: 10,
                    radius: ['55%', '75%'],
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
                    },
                },
                picSettings : {
                    offsetY: 100,
                    offsetX: 10,
                    radius: 70,
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
                    },
                },

                LineStyle:{
                    height: '240px',
                    width: '100%',
                },

                /*会员总览1  会员数量 潜在 正式*/
                totalVipNum: {
                    columns: ['name', 'value'],
                    rows: [
                        {name:'',value:0},
                        {name:'',value:0}],
                },
                totalVipOverdue: {
                    columns: ['name', 'value'],
                    rows: [
                        {name:'',value:0},
                        {name:'',value:0}],
                },
                totalVipPT: {
                    columns: ['name', 'value'],
                    rows: [
                        {name:'',value:0},
                        {name:'',value:0}],
                },

                /*会员总览2 新增会员走势*/
                totalNewAdd: {
                    columns: ['日期', '新增会籍', '新增私教'],
                    rows: [],
                },

                /*会员总览3 消耗趋势*/
                totalConsumeTrend: {
                    columns: ['日期', '次卡', '私教'],
                    rows: [],
                },

                /*会员总览4 转卡退款人数走势*/
                totalRefundTrend: {
                    columns: ['日期', '会籍退款', '会籍转卡', '私教退款', '私教转卡'],
                    rows: [],
                },

                /*会员总览5 每日客流走势*/
                totalPassengerTrend: {
                    columns: ['日期', '每日客流走势'],
                    rows: [],
                },

            }
        },
        methods: {
            /* ==== 会员总览 ==== 接口1 获取数量 totalMember_number*/
            getTotalMember_number() {
                totalMember_number().then(res => {
                    /*潜在 与 正式 会员*/
                    let MemberNum = [];
                    let MemberNum1 = res[0];
                    let MemberNum2 = res[1];
                    MemberNum.push(MemberNum1, MemberNum2);
                    this.totalVipNum.rows = MemberNum;

                    /*有效 与 过期 会员*/
                    let OverdueNum = [];
                    let OverdueNum1 = res[2];
                    let OverdueNum2 = res[3];
                    OverdueNum.push(OverdueNum1, OverdueNum2);
                    this.totalVipOverdue.rows = OverdueNum;

                    /*私教会员*/
                    let totalPt =[];
                    let totalPt1 = res[4];
                    let totalPt2 = res[5];
                    // let totalPt1 =   {name:'过期会员',value:100};
                    totalPt.push(totalPt1,totalPt2);
                    this.totalVipPT.rows = totalPt;
                }).catch(res => {
                    console.log(res);
                });
            },

            /*会员总览 接口2 新增会员走势 totalMember_trend*/
            getTotalMember_trend() {
                totalMember_trend().then(res => {
                    // console.log(res);
                    this.totalNewAdd.rows= [];
                    let addTime = res[0].value.split(',');
                    let addVip = res[1].value.split(',');
                    let addPT = res[2].value.split(',');
                    for(let i=0;i < addTime.length;i++){
                        this.totalNewAdd.rows.push({
                            '日期' : addTime[i],
                            '新增会籍' : addVip[i],
                            '新增私教' : addPT[i],
                        })
                    }

                }).catch(res => {
                    console.log(res);
                });
            },

            /*会员总览 接口3 消耗趋势 totalSub_card_trend*/
            getTotalSub_card_trend() {
                totalSub_card_trend().then(res => {
                    this.totalConsumeTrend.rows= [];
                    let addTime = res[0].value.split(',');
                    let addVip = res[1].value.split(',');
                    let addPT = res[2].value.split(',');
                    for(let i=0;i < addTime.length;i++){
                        this.totalConsumeTrend.rows.push({
                            '日期' : addTime[i],
                            '次卡' : addVip[i],
                            '私教' : addPT[i],
                        })
                    }
                }).catch(res => {
                    console.log(res);
                });
            },

            /*会员总览 接口4 退款,转让走势  totalRefund_trend*/
            getTotalRefund_trend() {
                totalRefund_trend().then(res => {
                    this.totalRefundTrend.rows= [];
                    let addTime = res[0].value.split(',');
                    let addVip = res[1].value.split(',');
                    let addPT = res[2].value.split(',');
                    let ptTrend = res[3].value.split(',');
                    let ptChange = res[4].value.split(',');
                    for(let i=0;i < addTime.length;i++){
                        this.totalRefundTrend.rows.push({
                            '日期' : addTime[i],
                            '会籍退款' : addVip[i],
                            '会籍转卡' : addPT[i],
                            '私教退款' : ptTrend[i],
                            '私教转卡' : ptChange[i],
                        })
                    }

                }).catch(res => {
                    console.log(res);
                });
            },

            /*会员总览 接口5 客流走势 totalPassenger_trend*/
            getTotalPassenger_trend() {
                totalPassenger_trend().then(res => {
                    this.totalPassengerTrend.rows= [];
                    let addTime = res[0].value.split(',');
                    let addVip = res[1].value.split(',');
                    /*console.log(addTime);
                    console.log(addVip);*/
                    for(let i = 0; i < addTime.length; i++){
                        this.totalPassengerTrend.rows.push({
                            '日期' : addTime[i],
                            '每日客流走势' : addVip[i],
                        })
                    }


                }).catch(res => {
                    console.log(res);
                });
            },

        },
        created() {
            /*调用 ==== 会员总览1 ==== 会员数量*/
            this.getTotalMember_number();
            /*调用 会员总览2 新增会员走势*/
            this.getTotalMember_trend();
            /*调用 会员总览3 消耗趋势*/
            this.getTotalSub_card_trend();
            /*调用 会员总览4 退款,转让走势*/
            this.getTotalRefund_trend();
            /*调用 会员总览5 客流走势*/
            this.getTotalPassenger_trend();
        },
    }
</script>

<style lang="scss">

</style>