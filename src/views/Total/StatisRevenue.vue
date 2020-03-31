<template>
    <div class="layoutR-main">
        <el-tabs v-model="tabInfo.activeTabName" @tab-click="tabTotal" class="vip-tabBox pubWidth" id="staffPay-tabBox" v-show="showState.tabRevenueState">
            <!--营收总览-->
            <el-tab-pane :lazy='tabInfo.tabLazy' label="营收总览" name="revenueTotal">
                <el-row :gutter="20">
                    <el-col :md="8" :lg="8">
                        <div class="index-item revenue-item">
                            <header class="index-item-title">
                                <div class="title">总收入</div>
                            </header>
                            <ul class="index-item-tipUl">
                                <li><span class="addVip-tagB"></span>上月</li>
                                <li><span class="addVip-tagY"></span>本月</li>

                            </ul>
                            <div class="flex-between revenueRatio-tip clearfix chart">
                                <ve-pie :data="revenueTotal"
                                        :legend-visible="false"
                                        :colors="totalColor"
                                        :style="picStyle"
                                        :extend="picExtend"
                                ></ve-pie>
                                <ul class="vipNum">
                                    <li>上月：<span class="vipTipY">{{revenueTotal.rows[0].value}}</span>
                                        <span v-if="revenueRatio.lastMonth > 0" class="vipTipG revenue-tip">
                                            <i class="el-icon-top"></i>
                                            {{revenueRatio.lastMonth}}
                                        </span>
                                        <span v-else class="vipTipY revenue-tip">
                                              <i class="el-icon-bottom"></i>{{revenueRatio.lastMonth | mathFloor}}
                                        </span>
                                    </li>
                                    <li>本月：<span class="vipTipB">{{revenueTotal.rows[1].value}}</span>
                                        <span v-if="revenueRatio.nowMonth > 0" class="vipTipB revenue-tip">
                                             <i class="el-icon-top"></i>{{revenueRatio.nowMonth}}
                                        </span>
                                        <span v-else class="vipTipB revenue-tip">
                                             <i class="el-icon-bottom"></i>{{revenueRatio.nowMonth | mathFloor}}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </el-col>
                    <el-col :md="8" :lg="8">
                        <div class="index-item revenue-item">
                            <header class="index-item-title" @click="changeData($event)">
                                <div class="title">项目营收排名</div>
                            </header>
                            <ul class="index-item-tipUl">
                                <li v-for="(item,index) in revenueRanking.rows" :key="index">
                                  <span class="revenueRanking-span" :class ='item.class'></span> {{item.name}}</li>
                            </ul>
                            <div class="chartRevenue">
                                <ve-histogram :data="revenueRanking"
                                        :legend-visible="false"
                                        :colors="revenueRankingColor"
                                        :style="histogramStyle"
                                        :extend="histogramExtend"></ve-histogram>
                            </div>
                        </div>
                    </el-col>
                    <el-col :md="8" :lg="8">
                        <div class="index-item revenue-item" style="padding-bottom: 0">
                            <header class="index-item-title" @click="changeData($event)">
                                <div class="title">支付方式排名</div>
                            </header>
                            <div class="chartRevenue">
                                <ve-bar :data="revenuePayMethods"
                                        :legend-visible="false"
                                        :colors="totalColor"
                                        :style="barStyle"
                                        :extend="barExtend"
                                ></ve-bar>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>

            <!--营收详细-->
            <el-tab-pane :lazy='tabInfo.tabLazy' label="营收详细" name="revenueDetails">
                <RevenueDetails></RevenueDetails>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

    import navBread from '@/components/navBread/navBread'

    import RevenueDetails from '@/views/Total/details/StatisRevenueDetails'  //营收详情组件
    import {revenueTotal,revenueRanking,revenuePayMethod,
        revenueContract} from '@/assets/js/api' /*引用 营收总览 接口*/

    import {lineExtendConfig,histogramExtendConfig,picExtendConfig,barExtendConfig} from '@/assets/js/vChartsConfig/vChartsConfig'   //vcharts配置

    export default {
        name: "StatisRevenue",
        data() {
            this.revenueRankingColor=['#84CCC9','#AA89BD','#F19EC2','#FF8A7E','#00A0E9','#0000FF','#FFBE00','#00B7EE']
            this.totalColor = ['#005AD4', '#FF8A7E']; //会员总览 潜在会员 自定义的颜色
            this.OverdueColor = ['#FFBE00', '#FF8A7E', '#4CCBEB', '#005AD4'];
            this.vipPtColor=['#FFBE00', '#FF8A7E','#1EAAA1', '#4CCBEB'];

            this.histogramExtend = histogramExtendConfig;
            this.picExtend = picExtendConfig;
            this.barExtend = barExtendConfig;

            return {

                revenueRankingClass: [
                    {class: "colorBgGreenLignt", color: '#84CCC9',},
                    {class: "colorBgViolet", color: '#AA89BD',},
                    {class: "colorBgPink", color: '#F19EC2',},
                    {class: "colorBgRed", color: '#FF8A7E',},
                    {class: "colorBgGreen", color: '#00A0E9',},
                    {class: "colorBgBlueDark", color: '#0000FF',},
                    {class: "colorBgYellow", color: '#FFBE00',},
                    {class: "colorBgBlueGreen", color: '#00B7EE',},
                ],

                tabInfo:{
                    activeTabName: 'revenueTotal', //revenueTotal revenueDetails
                    tabLazy: true,
                },

                /*显隐状态  集合*/
                showState:{
                    tabRevenueState:true,  //tab 显隐
                },
                hasAxios:{  //是否调用接口状态
                    revenueTotal:false,
                    revenueDetails:false,
                },

                histogramStyle:{
                    height: '180px',
                    width: '100%',
                },
                barStyle:{
                    height: '240px',
                    width: '98%',
                },
                picStyle: {
                    height: '180px',
                    width: '180px',
                },

                lineStyle:{
                    height: '180px',
                    width: '100%',
                },

                /*A、营收总览*/
                /*1.0 、总收入*/
                revenueTotal: {
                    columns: ['name', 'value'],
                    rows: [
                        {name:'',value:0},
                        {name:'',value:0}],
                },
                revenueRatio:{
                    lastMonth:0.00,   //上月增长比例
                    nowMonth:0.00,    //本月增长比例
                },

                revenueRanking: {
                    columns: ['name', 'value'],
                    rows: [],
                },
                revenuePayMethods: {
                    columns: ['name','value'],
                    rows: [],
                },

            }
        },
        methods: {

            /* 零、 tab切换*/
            tabTotal(tab, event) {
                let tabName = tab.name;
                this.callTabApi(tabName);
                sessionStorage.setItem('StatisRevenueTabName',tabName);
            },

            /* 一、营收总览 */
            /*1.1、总收入*/
            getRevenueTotal() {
                revenueTotal().then(res => {
                    console.log(res);
                    let MemberNum = [];
                    let MemberNum1 = res[1];
                    let MemberNum2 = res[2];

                    MemberNum.push(MemberNum1, MemberNum2);
                    this.revenueTotal.rows = MemberNum;

                    let lastMonth2 = res[0].value;
                    let lastMonth = res[1].value;
                    let nowtMonth = res[2].value;
                    let RatioLast = lastMonth - lastMonth2;
                    let RatioNow  = nowtMonth - lastMonth;

                    this.revenueRatio.lastMonth = RatioLast;
                    this.revenueRatio.nowMonth = RatioNow;

                    this.hasAxios.revenueTotal =true;  //是否调用接口状态

                }).catch(res => {
                    console.log(res);
                });
            },

            /*1.2、项目营收排名*/
            getRevenueRanking() {
                revenueRanking().then(res => {
                    console.log(res);

                    let incomeData = res;
                    incomeData = incomeData.map((item, index) => {
                        return {...item, ...this.revenueRankingClass[index]};
                    });
                    this.revenueRanking.rows = incomeData;

                }).catch(res => {
                    console.log(res);
                });
            },

            /*1.3、支付方式 排名*/
            getRevenuePayMethod() {
                revenuePayMethod().then(res => {
                    this.revenuePayMethods.rows =res;
                }).catch(res => {
                    console.log(res);
                });
            },


            /*三、接口调用*/
            callTabApi(tabName){
                console.log(tabName);
                if(tabName == 'revenueTotal'){
                    if(this.hasAxios.revenueTotal  == false){
                        this.getRevenueTotal();      //总收入
                        this.getRevenueRanking();    //项目营收排名
                        this.getRevenuePayMethod();  //支付方式
                    }
                }
                if(tabName == 'revenueDetails'){
                    if(this.hasAxios.revenueDetails  == false){
                        /*this.getRevenueContract();  //详情*/
                    }
                }
            },
        },
        created() {
            let tabName = sessionStorage.getItem('StatisRevenueTabName');
            if(tabName == null){
                tabName = this.tabInfo.activeTabName;
            }else {
                this.tabInfo.activeTabName = tabName;
            }
            this.callTabApi(tabName);
        },

        components: {
            navBread,
            RevenueDetails,
        },
    }
</script>

<style lang="scss" >

    /*营收总览*/
    /*.chartRevenue{*/
    /*    .ve-histogram{*/
    /*        > div{*/
    /*            height: 200px !important;*/
    /*        }*/
    /*    }*/
    /*}*/

    .revenue-item{
        .index-item-tipUl li{
            margin-right: 2px;
            span{
                margin-right: 6px;
            }
        }
    }

</style>