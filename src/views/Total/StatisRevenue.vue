<template>
    <div class="layoutR-main">
        <el-tabs v-model="activeTabName" @tab-click="tabTotal" class="vip-tabBox pubWidth" id="staffPay-tabBox" v-show="showState.tabRevenueState">
            <!--营收总览-->
            <el-tab-pane :lazy='tabLazy' label="营收总览" name="revenueTotal">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="index-item revenue-item">
                            <header class="index-item-title">
                                <div class="title">总收入</div>
                            </header>
                            <ul class="index-item-tipUl">
                                <li><span class="addVip-tagB"></span>上月</li>
                                <li><span class="addVip-tagY"></span>本月</li>

                            </ul>
                            <div class="flex-between revenueRatio-tip clearfix">
                                <ve-pie :data="revenueTotal"
                                        :legend-visible="false"
                                        :colors="totalColor"
                                        :style="picStyle"
                                        :settings="picSettings"></ve-pie>
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
                    <el-col :span="8">
                        <div class="index-item revenue-item">
                            <header class="index-item-title" @click="changeData($event)">
                                <div class="title">现有会员</div>
                            </header>
                            <ul class="index-item-tipUl">
                                <li><img src="~@/assets/icon/icon_indexVipG.png" alt="">潜在会员</li>
                                <li><img src="~@/assets/icon/icon_indexVipB.png" alt="">正式会员</li>
                                <li><img src="~@/assets/icon/icon_indexVipY.png" alt="">私教会员</li>
                            </ul>
                            <div class="flex-between">
                                <ve-bar :data="revenueRanking"
                                        :legend-visible="false"
                                        :colors="totalColor"
                                        :style="picStyle"
                                        :settings="picSettings"></ve-bar>
                                <ul class="vipNum">
                                    <li>潜在会员： <span class="vipTipG"></span></li>
                                    <li>正式会员： <span class="vipTipB"></span></li>
                                </ul>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="index-item revenue-item">
                            <header class="index-item-title" @click="changeData($event)">
                                <div class="title">现有会员</div>
                            </header>
                            <ul class="index-item-tipUl">
                                <li><img src="~@/assets/icon/icon_indexVipG.png" alt="">潜在会员</li>
                                <li><img src="~@/assets/icon/icon_indexVipB.png" alt="">正式会员</li>
                                <li><img src="~@/assets/icon/icon_indexVipY.png" alt="">私教会员</li>
                            </ul>
                            <div class="flex-between">
                                <ul class="vipNum">
                                    <li>潜在会员： <span class="vipTipG"></span></li>
                                    <li>正式会员： <span class="vipTipB"></span></li>
                                </ul>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>

            <!--营收详细-->
            <el-tab-pane :lazy='tabLazy' label="营收详细" name="revenueDetails">

            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import eCharts from '@/components/Echarts/Echarts'
    import navBread from '@/components/Echarts/navBread'
    import {revenueTota,revenueRankingl} from '@/assets/js/api' /*引用 营收总览 接口*/
    export default {
        name: "StatisRevenue",
        data() {


            this.totalColor = ['#005AD4', '#FF8A7E']; //会员总览 潜在会员 自定义的颜色
            this.OverdueColor = ['#FFBE00', '#FF8A7E', '#4CCBEB', '#005AD4'];
            this.vipPtColor=['#FFBE00', '#FF8A7E','#1EAAA1', '#4CCBEB'];
            this.extend = {
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        fontSize:12,
                    },
                    // formatter : function (params) {
                    //
                    //     var rec = '';
                    //     for(var i = 0;i < params.length;i++){
                    //         var rea = '<div style="margin:2px 0 0 4px;color:#f7f8f9;">' +
                    //             ''+ params[i].axisValue + '</div>';
                    //         var reb = '<div style="margin: 4px">'+
                    //             '<span style="display:inline-block;margin-right:2px;border-radius:8px;width:8px;height:8px;background-color:' + params[i].color +';"></span>' +
                    //             '<span style="display:inline-block;margin:2px 4px;">'+ params[i].seriesName+'</span>:  '+params[i].data+'' +
                    //             '</div>';
                    //         rec= rec + reb;
                    //     }
                    //     return rea + rec;
                    // },
                },
                grid: {
                    // show:true,//是否显示直角坐标系网格。[ default: false ]
                    // borderColor:"#c45455",//网格的边框颜色
                    top: "30px",
                    left: "80px",
                    right: "60px",
                    bottom: "40px",
                    width: "90%", //图例宽度
                    height: "80%", //图例高度
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
                series: {
                    type: 'line',
                    symbolSize: 9,   //设定实心点的大小
                    lineStyle: {
                        normal: {
                            type: 'dashed',
                        }
                    },
                }
            }

            this.lineGrid = {
                show:true,//是否显示直角坐标系网格。[ default: false ]
                // borderColor:"#c45455",//网格的边框颜色
                top: "30px",
                left: "80px",
                right: "60px",
                bottom: "40px",
                width: "90%", //图例宽度
                height: "80%", //图例高度
            };

            return {
                activeTabName: 'revenueTotal', //revenueTotal revenueDetails
                tabLazy: true,

                /*显影状态  集合*/
                showState:{
                    tabRevenueState:true,  //tab 显影
                },

                picStyle: {
                    height: '180px',
                    width: '180px',
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
                    rows: [
                        {name:'',value:0},
                        {name:'',value:0}],
                },
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
                    console.log((lastMonth));
                    console.log((lastMonth2));
                    console.log((nowtMonth));


                    let RatioLast = lastMonth - lastMonth2;
                    let RatioNow  = nowtMonth - lastMonth;
                    console.log(RatioLast);
                    console.log(RatioNow);
                    this.revenueRatio.lastMonth = RatioLast;
                    this.revenueRatio.nowMonth = RatioNow;

                }).catch(res => {
                    console.log(res);
                });
            },

            /*项目营收排名*/
            getRevenueRanking() {
                revenueRanking().then(res => {
                    console.log(res);
                    // let MemberNum = [];
                    // let MemberNum1 = res[1];
                    // let MemberNum2 = res[2];
                    // MemberNum.push(MemberNum1, MemberNum2);
                    // this.revenueTotal.rows = MemberNum;


                }).catch(res => {
                    console.log(res);
                });
            },

            /*接口调用*/
            callTabApi(tabName){
                console.log(tabName);
                if(tabName == 'revenueTotal'){
                    this.getRevenueTotal();   //总收入
                };
                if(tabName == 'revenueDetails'){

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

</style>