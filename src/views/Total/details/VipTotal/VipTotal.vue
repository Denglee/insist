<template>
    <div >
        <!-- A1  会员数量-->
        <el-row :gutter="30" class="total-row">
            <!--会员数量-->
            <el-col :md="8" :lg="8" >
                <div class="index-item">
                    <header class="index-item-title">
                        <div class="title">会员数量</div>
                    </header>
                    <div class="total-box totalBorder">
                        <div class="total-left">
                            <div class="pic-content">
                                <ve-ring :data="totalVipPT"
                                         :legend-visible="false"
                                         :colors="totalVip"
                                         :style="picStyle"
                                         :extend = 'firstPieEctend'
                                         :settings="ringSettings">
                                </ve-ring>
                            </div>
                        </div>
                        <ul class="total-right" v-if="totalVipPT.rows.length >0">
                            <li>
                                <i class="iconfont icon-huiyuan1-01 color-MediumBlue2"></i>{{totalVipPT.rows[0].name}}：
                                <span class="color-MediumBlue2">{{totalVipPT.rows[0].value}}</span>
                            </li>
                            <li>
                                <i class="iconfont icon-huiyuan1-01 color-MediumBlue"></i>{{totalVipPT.rows[1].name}}：
                                <span class="color-MediumBlue">{{totalVipPT.rows[1].value}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <!--私教会员-->
            <el-col :md="8" :lg="8">
                <div class="index-item">
                    <header class="index-item-title">
                        <div class="title">私教</div>
                    </header>
                    <el-row>
                        <!--有效会员-->
                        <el-col :md="24">
                            <div class="total-box">
                                <div class="total-left">
                                    <div class="pic-content">
                                        <ve-pie :data="totalVipOverdue"
                                                :legend-visible="false"
                                                :colors="OverdueColor"
                                                :style="picStyle"
                                                :settings="picSettings"></ve-pie>
                                    </div>
                                </div>
                                <ul class="total-right" v-if="totalVipOverdue.rows.length >0">
                                    <li>
                                        <i class="iconfont icon-qixianka color-Pink"></i>{{totalVipOverdue.rows[0].name}}：
                                        <span class="color-Pink">{{totalVipOverdue.rows[0].value}}</span>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-qixianka color-LigntBlue"></i>{{totalVipOverdue.rows[1].name}}：
                                        <span class="color-LigntBlue">{{totalVipOverdue.rows[1].value}}</span>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-qixianka color-MediumBlue"></i>{{totalVipOverdue.rows[2].name}}：
                                        <span class="color-MediumBlue">{{totalVipOverdue.rows[2].value}}</span>
                                    </li>
                                </ul>
                            </div>
                        </el-col>
                        <!--潜在会员-->
                        <el-col :md="12" style="display: none;">
                            <div class="total-box">
                                <div class="total-left">
                                    <div class="pic-content">
                                        <ve-pie :data="totalVipNum"
                                                :legend-visible="false"
                                                :colors="totalVipQz"
                                                :style="picStyle"
                                                :settings="picSettings"></ve-pie>
                                    </div>
                                </div>
                                <ul class="total-right" v-if="totalVipNum.rows.length >0">
                                    <li>
                                        <i class="iconfont icon-qixianka color-Pink"></i>{{totalVipNum.rows[0].name}}：
                                        <span class="color-Pink">{{totalVipNum.rows[0].value}}</span>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-qixianka color-LigntBlue"></i>{{totalVipNum.rows[1].name}}：
                                        <span class="color-LigntBlue">{{totalVipNum.rows[1].value}}</span>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-qixianka color-MediumBlue"></i>{{totalVipNum.rows[2].name}}：
                                        <span class="color-MediumBlue">{{totalVipNum.rows[2].value}}</span>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-qixianka color-Yellow"></i>{{totalVipNum.rows[3].name}}：
                                        <span class="color-Yellow">{{totalVipNum.rows[3].value}}</span>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-qixianka color-MediumBlue2"></i>{{totalVipNum.rows[4].name}}：
                                        <span class="color-MediumBlue2">{{totalVipNum.rows[4].value}}</span>
                                    </li>
                                </ul>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>

            <el-col :md="8" :lg="8">
                <div class="index-item">
                    <header class="index-item-title">
                        <div class="title">会籍</div>
                    </header>
                    <el-row>
                        <!--有效会员-->
                        <el-col :md="12" style="display: none;">
                            <div class="total-box">
                                <div class="total-left">
                                    <div class="pic-content">
                                        <ve-pie :data="totalVipOverdue"
                                                :legend-visible="false"
                                                :colors="OverdueColor"
                                                :style="picStyle"
                                                :settings="picSettings"></ve-pie>
                                    </div>
                                </div>
                                <ul class="total-right" v-if="totalVipOverdue.rows.length >0">
                                    <li>
                                        <i class="iconfont icon-qixianka color-Pink"></i>{{totalVipOverdue.rows[0].name}}：
                                        <span class="color-Pink">{{totalVipOverdue.rows[0].value}}</span>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-qixianka color-LigntBlue"></i>{{totalVipOverdue.rows[1].name}}：
                                        <span class="color-LigntBlue">{{totalVipOverdue.rows[1].value}}</span>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-qixianka color-MediumBlue"></i>{{totalVipOverdue.rows[2].name}}：
                                        <span class="color-MediumBlue">{{totalVipOverdue.rows[2].value}}</span>
                                    </li>
                                </ul>
                            </div>
                        </el-col>
                        <!--潜在会员-->
                        <el-col :md="24">
                            <div class="total-box">
                                <div class="total-left">
                                    <div class="pic-content">
                                        <ve-pie :data="totalVipNum"
                                                :legend-visible="false"
                                                :colors="totalVipQz"
                                                :style="picStyle"
                                                :settings="picSettings"></ve-pie>
                                    </div>
                                </div>
                                <ul class="total-right" v-if="totalVipNum.rows.length >0">
                                    <li>
                                        <i class="iconfont icon-qixianka color-Pink"></i>{{totalVipNum.rows[0].name}}：
                                        <span class="color-Pink">{{totalVipNum.rows[0].value}}</span>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-qixianka color-LigntBlue"></i>{{totalVipNum.rows[1].name}}：
                                        <span class="color-LigntBlue">{{totalVipNum.rows[1].value}}</span>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-qixianka color-MediumBlue"></i>{{totalVipNum.rows[2].name}}：
                                        <span class="color-MediumBlue">{{totalVipNum.rows[2].value}}</span>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-qixianka color-Yellow"></i>{{totalVipNum.rows[3].name}}：
                                        <span class="color-Yellow">{{totalVipNum.rows[3].value}}</span>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-qixianka color-MediumBlue2"></i>{{totalVipNum.rows[4].name}}：
                                        <span class="color-MediumBlue2">{{totalVipNum.rows[4].value}}</span>
                                    </li>
                                </ul>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>

        <totalOffice></totalOffice>

        <!-- A2 会员办卡走势-->
        <div class="index-item comein-main">
            <header class="index-item-title flex-between">
                <div class="title">
                    <span>会员办卡走势</span>
                    <div class="total-subTotal">
                        <div class="total-subTotalName color-Pink">
                            <i class="iconfont icon-xiaoshoutongji"></i>会籍卡:100张;
                        </div>

                        <div class="total-subTotalName color-MediumBlue">
                            <i class="iconfont icon-xiaoshoutongji"></i>私教卡:200张;
                        </div>

                        <div class="total-subTotalName color-MediumBlue">
                            <i class="iconfont icon-xiaoshoutongji"></i>私教卡:200张;
                        </div>

                        <div class="total-subTotalName color-MediumBlue">
                            <i class="iconfont icon-xiaoshoutongji"></i>私教卡:200张;
                        </div>

                        <div class="total-subTotalName color-MediumBlue">
                            <i class="iconfont icon-xiaoshoutongji"></i>私教卡:200张;
                        </div>

                        <div class="total-subTotalName color-MediumBlue">
                            <i class="iconfont icon-xiaoshoutongji"></i>私教卡:200张。
                        </div>

                    </div>
                </div>

                <div class="vipNav-rBox">
                    <monthSceen  @getMonthScreen="timeNewAdd"></monthSceen>
                </div>
            </header>
            <ul class="index-item-tipUl">
                <li><img src="~@/assets/icon/vipTotal/vipT-addCard.png" alt="" class="vipT-addCard">会籍卡</li>
                <li><img src="~@/assets/icon/vipTotal/vipT-addPT.png" alt="">私教卡</li>
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
                <div class="vipNav-rBox">
                    <monthSceen  @getMonthScreen="timeConsumeTrend"></monthSceen>
                </div>
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
                <div class="vipNav-rBox">
                    <monthSceen  @getMonthScreen="timeRefundTrend"></monthSceen>
                </div>
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

                <div class="vipNav-rBox">
                    <!--<monthSceen  @getMonthScreen="getMonthScreen"></monthSceen>-->
<!--                    <el-button class="btn-ptMore" @click="btnTotalMore('totalTrend')">-->
<!--                        更多 <i class="el-icon-arrow-right"></i>-->
<!--                    </el-button>-->
                </div>
            </header>
            <ve-line
                    :data="totalPassengerTrend"
                    :legend-visible="false"
                    :colors="totalColor"
                    :style="LineStyle"
                    :extend = 'lineExtend'
            ></ve-line>
        </div>

        <!-- A6  每日客流人数 男女占比-->
       <!-- <el-row :gutter="30" class="total-row">
            &lt;!&ndash;会员数量&ndash;&gt;
            <el-col :md="16" :lg="16" >
                <div class="index-item">
                    <header class="index-item-title">
                        <div class="title">每日客流人数男女占比</div>
                    </header>
                    <el-row>
                        <el-col :md="12">
                            <div class="total-box totalBorder">
                                <div class="total-left">
                                    <div class="pic-content">
                                        <ve-ring :data="totalVipPT"
                                                 :legend-visible="false"
                                                 :colors="totalVip"
                                                 :style="picStyle"
                                                 :extend = 'firstPieEctend'
                                                 :settings="ringSettings">
                                        </ve-ring>
                                    </div>
                                </div>
                                <ul class="total-right" v-if="totalVipPT.rows.length >0">
                                    <li>
                                        <i class="iconfont icon-huiyuan1-01 color-MediumBlue2"></i>{{totalVipPT.rows[0].name}}：
                                        <span class="color-MediumBlue2">{{totalVipPT.rows[0].value}}</span>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-huiyuan1-01 color-MediumBlue"></i>{{totalVipPT.rows[1].name}}：
                                        <span class="color-MediumBlue">{{totalVipPT.rows[1].value}}</span>
                                    </li>
                                </ul>
                            </div>
                        </el-col>
                        <el-col :md="12">
                            <div class="total-box">
                                <div class="total-left">
                                    <div class="pic-content">
                                        <ve-pie :data="totalVipNum"
                                                :legend-visible="false"
                                                :colors="totalVipQz"
                                                :style="picStyle"
                                                :settings="picSettings"></ve-pie>
                                    </div>
                                </div>
                                <ul class="total-right" v-if="totalVipNum.rows.length >0">
                                    <li>
                                        <i class="iconfont icon-qixianka color-Pink"></i>{{totalVipNum.rows[0].name}}：
                                        <span class="color-Pink">{{totalVipNum.rows[0].value}}</span>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-qixianka color-LigntBlue"></i>{{totalVipNum.rows[1].name}}：
                                        <span class="color-LigntBlue">{{totalVipNum.rows[1].value}}</span>
                                    </li>
                                </ul>
                            </div>
                        </el-col>
                    </el-row>
                </div>

            </el-col>

            <el-col :md="8" :lg="8">
                <div class="index-item">
                    <header class="index-item-title">
                        <div class="title">每月客流人数男女占比</div>
                    </header>
                    <el-row>
                        &lt;!&ndash;潜在会员&ndash;&gt;
                        <el-col :md="24">
                            <div class="total-box">
                                <div class="total-left">
                                    <div class="pic-content">
                                        <ve-pie :data="totalVipNum"
                                                :legend-visible="false"
                                                :colors="totalVipQz"
                                                :style="picStyle"
                                                :settings="picSettings"></ve-pie>
                                    </div>
                                </div>
                                <ul class="total-right" v-if="totalVipNum.rows.length >0">
                                    <li>
                                        <i class="iconfont icon-qixianka color-Pink"></i>{{totalVipNum.rows[0].name}}：
                                        <span class="color-Pink">{{totalVipNum.rows[0].value}}</span>
                                    </li>
                                    <li>
                                        <i class="iconfont icon-qixianka color-LigntBlue"></i>{{totalVipNum.rows[1].name}}：
                                        <span class="color-LigntBlue">{{totalVipNum.rows[1].value}}</span>
                                    </li>
                                </ul>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>-->
    </div>
</template>

<script>

    import {totalMember_number, totalMember_trend, totalPassenger_trend, totalRefund_trend, totalSub_card_trend,} from '@/assets/js/api' /*引用 会员总览 接口*/

    import {lineExtendConfig} from '@/assets/js/vChartsConfig/vChartsConfig'   //vcharts配置
    import monthSceen from '@/components/monthSceen/monthSceen'  //7天时间筛选组件

    import totalOffice from "./totalOffice";
    export default {
        name: "VipTotal",
        data() {
            this.totalVip = ['#00a0e9','#005ad4'],
            this.totalVipQz = ['#ff8a7e','#4ccbeb','#005ad4','#FFBE00','#00a0e9'],
            this.totalColor = ['#4CCBEB', '#005AD4','#FFBE00', '#FF8A7E','#B6A2DE']; //会员总览 潜在会员 自定义的颜色
            this.OverdueColor = ['#ff8a7e','#4ccbeb','#005ad4'];
            this.AddVipColor = ['#FF8A7E', '#005AD4', '#4CCBEB']; //会员总览2 会员办卡走势
            this.AddRefund = ['#4CCBEB', '#005AD4', '#FF8A7E', '#FFBE00']; //会员总览2 会员办卡走势
            this.lineExtend = lineExtendConfig;

            return {

                total:[
                    { time:'2020-05-26', name:"汇金店", personNnm:223, lessonNum:0, orderNum:0, signNum:0, trainerNum:10, orderNum2:0, lessonNum2:0, signNum2:10, trainerNum2:0},
                    { time:'2020-05-27', name:"现代美居广场店", personNnm:223, lessonNum:10, orderNum:0, signNum:10, trainerNum:0, orderNum2:10, lessonNum2:0, signNum2:10, trainerNum2:0},
                ],

                /* == 会员总览 eCharts 对应宽高 == */
                picStyle: {
                    height: '180px',
                    width: '180px',
                },

                firstPieEctend:{
                    tooltip: {
                        trigger: 'item',
                        position: 'right'
                    },
                },
                ringSettings : {
                    tooltip: {
                        trigger: 'item',
                        position:'top',
                    },
                    offsetY: 95,
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
                    offsetY: 95,
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
                    rows: [],
                },
                totalVipOverdue: {
                    columns: ['name', 'value'],
                    rows: [],
                },
                totalVipPT: {
                    columns: ['name', 'value'],
                    rows: [],
                },

                /*会员总览2 会员办卡走势*/
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
                    this.totalVipNum.rows = res.data.card_status;

                    /*有效 与 过期 会员*/
                    this.totalVipOverdue.rows = res.data.card_type;

                    /*私教会员*/
                    this.totalVipPT.rows = res.data.member;

                }).catch(res => {
                    console.log(res);
                });
            },

            /*会员总览 接口2 会员办卡走势 totalMember_trend*/
            getTotalMember_trend() {
                totalMember_trend().then(res => {
                    // console.log(res);
                    this.totalNewAdd.rows= [];
                    let addTime = res.data[0].value.split(',');
                    let addVip = res.data[1].value.split(',');
                    let addPT = res.data[2].value.split(',');
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
            // 消耗趋势 七天 日期筛选
            timeNewAdd(val){
                console.log(val);
                if(val.time){
                    console.log(val.time);
                    // this.searchVal.day =val.time;
                    // this.searchVal.date = '';

                }
                if(val.day){    //传月份
                    console.log(val.day);
                    // this.searchVal.day = '';
                    // this.searchVal.date = val.day;
                }

            },

            /*会员总览 接口3 消耗趋势 totalSub_card_trend*/
            getTotalSub_card_trend() {
                totalSub_card_trend().then(res => {
                    this.totalConsumeTrend.rows= [];
                    let addTime = res.data[0].value.split(',');
                    let addVip = res.data[1].value.split(',');
                    let addPT = res.data[2].value.split(',');
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
            // 消耗趋势 七天 日期筛选
            timeConsumeTrend(val){
                console.log(val);
                if(val.time){
                    console.log(val.time);
                    // this.searchVal.day =val.time;
                    // this.searchVal.date = '';

                }
                if(val.day){    //传月份
                    console.log(val.day);
                    // this.searchVal.day = '';
                    // this.searchVal.date = val.day;
                }

            },

            /*会员总览 接口4 退款,转让走势  totalRefund_trend*/
            getTotalRefund_trend() {
                totalRefund_trend().then(res => {
                    this.totalRefundTrend.rows= [];
                    let addTime = res.data[0].value.split(',');
                    let addVip = res.data[1].value.split(',');
                    let addPT = res.data[2].value.split(',');
                    let ptTrend = res.data[3].value.split(',');
                    let ptChange = res.data[4].value.split(',');
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
            // 转让走势 七天 日期筛选
            timeRefundTrend(val){
                console.log(val);
                if(val.time){
                    console.log(val.time);
                    // this.searchVal.day =val.time;
                    // this.searchVal.date = '';

                }
                if(val.day){    //传月份
                    console.log(val.day);
                    // this.searchVal.day = '';
                    // this.searchVal.date = val.day;
                }

            },

            /*会员总览 接口5 客流走势 totalPassenger_trend*/
            getTotalPassenger_trend() {
                totalPassenger_trend().then(res => {
                    this.totalPassengerTrend.rows= [];
                    let addTime = res.data[0].value.split(',');
                    let addVip = res.data[1].value.split(',');
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



            /*查看更多*/
            btnTotalMore(el){
                console.log(el);
                this.$emit('showState',el);
                window.sessionStorage.setItem('statisShowDetail',el);
            },

        },
        created() {
            /*调用 ==== 会员总览1 ==== 会员数量*/
            this.getTotalMember_number();
            /*调用 会员总览2 会员办卡走势*/
            this.getTotalMember_trend();
            /*调用 会员总览3 消耗趋势*/
            this.getTotalSub_card_trend();
            /*调用 会员总览4 退款,转让走势*/
            this.getTotalRefund_trend();
            /*调用 会员总览5 客流走势*/
            this.getTotalPassenger_trend();
        },
        components: {
            monthSceen,
            totalOffice,
        },
    }
</script>

