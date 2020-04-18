<template>
    <div class="layoutR-main">
        <el-tabs v-model="tabInfo.activeTabName" @tab-click="tabTotal" class="vip-tabBox pubWidth"
                 id="staffPay-tabBox" v-show="showState.tabRevenueState">
            <!--营收总览-->
            <el-tab-pane :lazy='tabInfo.tabLazy' label="营收总览" name="revenueTotal">
                <el-row :gutter="30">
                    <el-col :md="9">
                        <div class="index-item revenue-item revenue-pie">
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
                                    <li>上月：<span class="vipTipB">{{revenueTotal.rows[0].value}}</span>
                                        <span v-if="revenueRatio.lastMonth > 0" class="vipTipB revenue-tip">
                                            <i class="el-icon-top"></i>{{revenueRatio.lastMonth}}
                                        </span>
                                        <span v-else class="vipTipB revenue-tip">
                                            <i class="el-icon-bottom"></i>{{revenueRatio.lastMonth | mathFloor}}
                                        </span>
                                    </li>
                                    <li>本月：<span class="vipTipY">{{revenueTotal.rows[1].value}}</span>
                                        <span v-if="revenueRatio.nowMonth > 0" class="vipTipB revenue-tip">
                                             <i class="el-icon-top"></i>{{revenueRatio.nowMonth}}
                                        </span>
                                        <span v-else class="vipTipY revenue-tip">
                                             <i class="el-icon-bottom"></i>{{revenueRatio.nowMonth | mathFloor}}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </el-col>
                    <el-col :md="15">
                        <div class="index-item revenue-item">
                            <header class="index-item-title" @click="changeData($event)">
                                <div class="title">项目营收排名</div>
                            </header>
                            <ul class="index-item-tipUl">
                                <li v-for="(item,index) in revenueRanking.rows" :key="index">
                                  <span class="revenueRanking-span" :class ='item.class'></span>{{item.name}}</li>
                            </ul>
                            <div class="chartRevenue-histpgram">
                                <ve-histogram :data="revenueRanking"
                                        :legend-visible="false"
                                        :colors="revenueRankingColor"
                                        :style="histogramStyle"
                                        :extend="histogramExtend"></ve-histogram>
                            </div>
                        </div>
                    </el-col>
                </el-row>

                <!-- A2 支付方式排名-->
                <el-row :gutter="30">
                    <el-col :md="12">
                        <div class="index-item revenue-item" style="padding-bottom: 0">
                            <header class="index-item-title" @click="changeData($event)">
                                <div class="title">支付方式排名</div>
                            </header>
                            <div class="chartRevenue-bar">
                                <ve-bar :data="revenuePayMethods"
                                        :legend-visible="false"
                                        :colors="totalColor"
                                        :style="barStyle"
                                        :extend="barExtend"
                                ></ve-bar>
                            </div>
                        </div>
                    </el-col>

                    <el-col :md="12">
                        <div class="index-item pt-sales revenue-ptLesson">
                            <ptLessonTable :ptSalesPage="5" @btnTotalMore="btnTotalMore('ptLessonD')"></ptLessonTable>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>

            <!--营收详细-->
            <el-tab-pane :lazy='tabInfo.tabLazy' label="营收详细" name="revenueListD">
                <RevenueList @showState1 ="showState1(arguments)"></RevenueList>
            </el-tab-pane>
        </el-tabs>

        <!--私教 上课 表格 详情-->
        <div v-if="showState.ptLessonD">
            <navBread @GoBack="goBack('revenueTotal','ptLessonD')" breadTitle="营收总览" breadContent1="私教上课详情"></navBread>
            <ptLessonDetails :ptSalesPage="10"></ptLessonDetails>
        </div>

        <div v-if="showState.revenueDetails">
            <RevenueDetails :ptSalesPage="10" :RevenueData="RevenueData" @GoBack="goBack('revenueListD','revenueDetails')"></RevenueDetails>
        </div>

    </div>
</template>

<script>

    import navBread from '@/components/navBread/navBread'

    import RevenueList from '@/views/Total/Statis/RevenueList'  //营收详情组件

    import {revenueTotal,revenueRanking,revenuePayMethod,
        revenueContract} from '@/assets/js/api' /*引用 营收总览 接口*/

    import {lineExtendConfig,hisRevenueExtendConfig,picExtendConfig,barExtendConfig} from '@/assets/js/vChartsConfig/vChartsConfig'   //vcharts配置

    import ptLessonTable from '@/views/Total/details/VipPT/ptLessonTable'  // 私教课程 详情组件
    import ptLessonDetails from '@/views/Total/details/VipPT/ptLessonDetails'  // 私教课程详情组件
    import RevenueDetails from '@/views/Total/Statis/RevenueDetails'  // 私教课程详情组件

    export default {
        name: "StatisRevenue",
        data() {
            this.revenueRankingColor = ['#ff8a7e','#005ad4','#00a0e9','#8763ce','#1eaaa1','#4ccbeb','#5b5ec7','#ffbe00']; //总收入
            this.totalColor = ['#ff8a7e', '#005ad4', '#00a0e9', '#8763ce', '#1eaaa1']; //会员总览 潜在会员 自定义的颜色

            this.histogramExtend = hisRevenueExtendConfig;
            this.picExtend = picExtendConfig;
            this.barExtend = barExtendConfig;

            return {
                revenueRankingClass: [
                    {class: "colorBgGreenLignt", color: '#ff8a7e',},
                    {class: "colorBgViolet", color: '#005ad4',},
                    {class: "colorBgPink", color: '#00a0e9',},
                    {class: "colorBgRed", color: '#8763ce',},
                    {class: "colorBgGreen", color: '#1eaaa1',},
                    {class: "colorBgBlueDark", color: '#4ccbeb',},
                    {class: "colorBgYellow", color: '#5b5ec7',},
                    {class: "colorBgBlueGreen", color: '#ffbe00',},
                ],

                tabInfo:{
                    activeTabName: 'revenueTotal', //revenueTotal revenueListD
                    tabLazy: true,
                },

                /*显隐状态  集合*/
                showState:{
                    tabRevenueState:true,  //tab 显隐
                    ptLessonD:false,
                    revenueDetails:false,
                },
                hasAxios:{  //是否调用接口状态
                    revenueTotal:false,
                    revenueDetails:false,
                },

                histogramStyle:{
                    height: '220px',
                    width: '100%',
                },
                barStyle:{
                    height: '320px',
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

                RevenueData:[], //传递给详情的 包含 id
            }
        },
        methods: {
            // showState:{
            //     tabRevenueState:true,  //tab 显隐
            //     ptLessonD:false,
            // },

            /*显示教练上课详情*/
            btnTotalMore(e1){
                console.log(e1);
                this.showState.tabRevenueState = false;
                this.showState[e1] = true;  //表格显示
            },

            showState1(e1){
                console.log(e1);
                let showSon = e1[0]
                this.showState.tabRevenueState = false;
                this.RevenueData = e1[1];
                this.showState[showSon] = true;  //表格显示
            },

            /* 返回上一页 */
            goBack(e1, e2) {
                console.log(e1);
                console.log(e2);
                this.showState[e2] = false;   //隐藏当前 表格详情
                this.showState.tabRevenueState = true; //显示对应tab
                this.tabInfo.activeTabName = e1; //VipTotal VipPT VipMembership
            },

            /* 零、 tab切换  */
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
                // console.log(tabName);
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
            RevenueList,

            ptLessonTable,
            ptLessonDetails,
            RevenueDetails,
        },
    }
</script>

<style lang="scss">
    @import "@/assets/css/totalVip.scss";

</style>