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
                                        :settings = "picSettings"
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
                </el-row>
                <el-row :gutter="20">
                    <el-col :md="12" :lg="12">
                        <div class="index-item revenue-item">
                            <header class="index-item-title" @click="changeData($event)">
                                <div class="title">项目营收排名</div>
                            </header>
                            <ul class="index-item-tipUl">
                                <li v-for="(item,index) in revenueRanking.rows" :key="index">
                                  <span class="revenueRanking-span" :class ='item.class'></span> {{item.name}}</li>
                            </ul>
                            <div class="chart">
                                <ve-histogram :data="revenueRanking"
                                        :legend-visible="false"
                                        :colors="revenueRankingColor"
                                        :style="histogramStyle"
                                        :extend="histogramExtend"></ve-histogram>
                            </div>
                        </div>
                    </el-col>

                    <el-col :md="12" :lg="12">
                        <div class="index-item revenue-item">
                            <header class="index-item-title" @click="changeData($event)">
                                <div class="title">支付方式排名</div>
                            </header>
                            <ul class="index-item-tipUl">
                                <li><img src="~@/assets/icon/icon_indexVipG.png" alt="">潜在会员</li>
                                <li><img src="~@/assets/icon/icon_indexVipB.png" alt="">正式会员</li>
                                <li><img src="~@/assets/icon/icon_indexVipY.png" alt="">私教会员</li>
                            </ul>
                            <div class="chart">
                                <ve-histogram :data="revenuePayMethods"
                                              :legend-visible="false"
                                              :colors="totalColor"
                                              :style="histogramStyle"
                                              :extend="histogramExtend"
                                              :judge-width="true"
                                ></ve-histogram>
                            </div>
                        </div>
                    </el-col>

                </el-row>
            </el-tab-pane>

            <!--营收详细-->
            <el-tab-pane :lazy='tabInfo.tabLazy' label="营收详细" name="revenueDetails">
                <div class="vip-tabBox">
                    <!--营收详细 筛选-->
                    <div class="pt-screen">
                        <el-select v-model="revenueDetails.projectChoose" placeholder="项目" class="inp-mar14 ptSel-section">
                            <el-option v-for="item in revenueProject" :key="item.index" :label="item.catname" :value="item.id"></el-option>
                        </el-select>
                        <el-date-picker
                                class="inp-mar14 month-inp"
                                v-model="revenueDetails.year"
                                type="year"
                                value-format="yyyy"
                                placeholder="选择年">
                        </el-date-picker>
                        <el-date-picker
                                value-format="yyyy-MM"
                                class="inp-mar14 month-inp"
                                v-model="revenueDetails.month"
                                type="month"
                                placeholder="选择月">
                        </el-date-picker>
                        <!--搜索-->
                        <el-button icon="el-icon-search" @click="btnSeaDetail" class="btn-search">搜索</el-button>
                    </div>
                    <!--营收详细 表格-->
                    <el-table class="pub-table" :data="detailList" border>
                        <el-table-column prop="name" label="项目"></el-table-column>
                        <el-table-column prop="total_number" label="数量"></el-table-column>
                        <el-table-column prop="income" label="收入"></el-table-column>
                        <el-table-column prop="refund_price" label="退款"></el-table-column>
                        <el-table-column prop="total_price" label="合计"></el-table-column>

                        <!--card_type   卡类型  1=期限卡 2=私教卡 3=游泳卡 4=滑雪储值卡-->
                        <!--<el-table-column prop="lock" label="卡类型">
                            <template slot-scope="scope">
                                <div v-if="scope.row.lock == 0 " class="status-connect">在职</div>
                                <div v-if="scope.row.lock == 1 " class="status-break">离职</div>
                            </template>
                        </el-table-column>-->
                        <el-table-column label="流水">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="lookDetail(scope.$index, scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!--<el-pagination
                            background
                            layout="prev, pager, next,total,jumper"
                            :total="revenuePage.pageTotal"
                            :page-size ="revenuePage.pageSize"
                            @current-change="PageCurrent">
                    </el-pagination>-->
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

    import navBread from '@/components/navBread/navBread'
    import {revenueTotal,revenueRanking,revenuePayMethod,
        revenueContract} from '@/assets/js/api' /*引用 营收总览 接口*/
    export default {
        name: "StatisRevenue",
        data() {
            this.revenueRankingColor=['#84CCC9','#AA89BD','#F19EC2','#FF8A7E','#00A0E9','#0000FF','#FFBE00','#00B7EE']
            this.totalColor = ['#005AD4', '#FF8A7E']; //会员总览 潜在会员 自定义的颜色
            this.OverdueColor = ['#FFBE00', '#FF8A7E', '#4CCBEB', '#005AD4'];
            this.vipPtColor=['#FFBE00', '#FF8A7E','#1EAAA1', '#4CCBEB'];

            this.histogramExtend ={
                grid: {
                    // show:true,//是否显示直角坐标系网格。[ default: false ]
                    // borderColor:"#DADFE8",//网格的边框颜色
                    top: "30px",
                    left: "10px",
                    right: "20px",
                    bottom: "10px",
                },
                series: {
                    barWidth: 30
                },
                xAxis: {
                    axisTick: {
                        alignWithLabel: true
                    },
                    type: 'category',
                    axisLine: {
                        lineStyle: {
                            color: '#8E8E8E',
                        }
                    },
                    //设置字体倾斜
                    axisLabel: {
                        // interval:0,
                        // rotate:10,//倾斜度 -90 至 90 默认为0
                        margin:15,
                        textStyle: {
                            color: "#8E8E8E"
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#8E8E8E',
                        }
                    },
                },
            };

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
                    height: '250px',
                    width: '100%',
                },
                picStyle: {
                    height: '180px',
                    width: '180px',
                },
                picSettings : {
                    offsetY: 100,
                    offsetX: 100,
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
                    columns: ['name', 'value'],
                    rows: [],
                },

                /*营收详情 */
                revenueProject : [],
                revenueDetails:{
                    projectChoose:'',  //项目筛选
                    month:'',    //月份筛选
                    year:'',     //年筛选
                },
                detailList:[], //详情table数据
            }
        },
        methods: {

            /* 零、 tab切换*/
            tabTotal(tab, event) {
                let tabName = tab.name;
                this.callTabApi(tabName);
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

            /*二、营收详情*/
            getRevenueContract() {
                revenueContract({
                    type:this.revenueDetails.projectChoose,
                }).then(res => {
                    console.log(res);
                    this.detailList = res.data;
                    this.revenueProject = res.list;

                    this.hasAxios.revenueDetails = true;  //是否调用接口状态
                }).catch(res => {
                    console.log(res);
                });
            },

            /*2.12、查看流水*/
            lookDetail(index, row){
                console.log(index);
                console.log(row);
            },

            /*2.2 搜索 筛选*/
            btnSeaDetail(){
                console.log(this.revenueDetails);
                this.getRevenueContract();
            },

            /*2.3 分页*/
            /*PageCurrent(page){
                console.log(page);
            },*/


            /*三、接口调用*/
            callTabApi(tabName){
                console.log(tabName);
                if(tabName == 'revenueTotal'){
                    if(this.hasAxios.revenueTotal  == false){
                        this.getRevenueTotal();      //总收入
                        this.getRevenueRanking();    //项目营收排名
                        this.getRevenuePayMethod();  //支付方式
                    }
                };
                if(tabName == 'revenueDetails'){
                    if(this.hasAxios.revenueDetails  == false){
                        this.getRevenueContract();  //详情
                    }
                };
            },
        },
        created() {
            let tabName =this.tabInfo.activeTabName;
            this.callTabApi(tabName);
        },

        components: {
            // eCharts,
            navBread,
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

</style>