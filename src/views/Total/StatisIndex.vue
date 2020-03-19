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
                        <div class="index-item index-item2">
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

            </el-tab-pane>

            <!-- tabItem2 私教 -->
            <el-tab-pane :lazy='tabLazy' label="私教" name="VipPT">

                <!--B1 私教统计-->
                <div class="index-item">
                    <header class="index-item-title">
                        <div class="title">私教统计</div>
                    </header>
                    <el-row>
                        <!--B11 私教上课-->
                        <el-col :md="8" class="vip-item-num">
                            <ul class="index-item-tipUl">
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-haslesson.png" alt="">已上课</li>
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-haslesson.png" alt="">未上课</li>
                            </ul>
                            <div class="flex-between">
                                <ve-pie :data="PTLesson"
                                        :legend-visible="false"
                                        :colors="totalColor"
                                        :style="picStyle"
                                        :settings="picSettings"></ve-pie>
                                <ul class="vipNum">
                                    <li>已上课节数： <span class="vipTipG">{{PTLesson.rows[0].value}}</span></li>
                                    <li>未上课节数： <span class="vipTipB">{{PTLesson.rows[1].value}}</span></li>
                                </ul>
                            </div>
                        </el-col>

                        <!-- B12 私教新增 -->
                        <el-col :md="8" class="vip-item-num">
                            <ul class="index-item-tipUl">
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-newAdd.png" alt="">新增私教</li>
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-hasAdd.png" alt="">续课</li>
                            </ul>
                            <div class="flex-between">
                                <ve-pie :data="PTAdd"
                                        :legend-visible="false"
                                        :colors="OverdueColor"
                                        :style="picStyle"
                                        :settings="picSettings"></ve-pie>
                                <ul class="vipNum">
                                    <li>新增私教： <span class="colorYellow">{{PTAdd.rows[0].value}}</span></li>
                                    <li>续课： <span class="colorRed">{{PTAdd.rows[1].value}}</span></li>
                                </ul>
                            </div>
                        </el-col>

                        <!--B13  私教已跟进-->
                        <el-col :md="8" class="vip-item-num">
                            <ul class="index-item-tipUl">
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-hasAdd.png" alt="">已跟进
                                </li>
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-haslesson.png" alt="">未跟进
                                </li>
                            </ul>
                            <div class="flex-between">
                                <ve-ring :data="PTFollow"
                                         :legend-visible="false"
                                         :colors="followColor"
                                         :style="picStyle"
                                         :settings="ringSettings"></ve-ring>
                                <ul class="vipNum">
                                    <li>已跟进： <span class="colorRed">{{PTFollow.rows[0].value}}</span></li>
                                    <li>未跟进： <span class="colorBlue">{{PTFollow.rows[1].value}}</span></li>
                                </ul>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <!-- B2 私教销售额查询 -->
                <div class="index-item pt-sales">
                    <statisDetails :ptSalesPage="5" @btnTotalMore="btnTotalMore('tabPaneState','ptSalesD')"></statisDetails>
                </div>

                <!-- B3 私教数量查询-->
                <div class="index-item pt-sales">
                    <header class="index-item-title flex-between">
                        <div class="title">私教数量查询</div>
                        <div class="vipNav-btnBox">
                            <el-button class="btn-ptMore" @click="btnTotalMore('tabPaneState','ptNumD')">更多</el-button>
                        </div>
                    </header>
                    <div class="ptTable-assist">

                    </div>
                </div>

                <!-- B4 私教上课查询-->
                <div class="index-item pt-sales comein-main">
                    <header class="index-item-title">
                        <div class="title">上课查询</div>
                    </header>
                    <ve-line
                            :data="PTclass"
                            :legend-visible="false"
                            :colors="totalColor"
                            :style="LineStyle"
                            :extend = 'lineExtend'
                    ></ve-line>
                </div>

                <!-- B5 私教会员上课详情-->
                <div class="index-item pt-sales">
                    <header class="index-item-title flex-between">
                        <div class="title">会员上课详情</div>
                    </header>
                    <div class="ptTable-assist">


                    </div>
                </div>
            </el-tab-pane>

            <!-- tabItem3 会籍 -->
            <el-tab-pane :lazy='tabLazy' label="会籍" name="VipMembership">
                <!--C2 会籍统计-->
                <div class="index-item">
                    <header class="index-item-title">
                        <div class="title">会籍统计</div>
                    </header>
                    <el-row >
                        <!--新增会员-->
                        <el-col :md="8" class="vip-item-num">
                            <ul class="index-item-tipUl">
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-haslesson.png" alt="">潜在会员</li>
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-haslesson.png" alt="">正式会员</li>
                            </ul>
                            <div class="flex-between">
                                <ve-pie :data="VipLesson"
                                        :legend-visible="false"
                                        :colors="totalColor"
                                        :style="picStyle"
                                        :settings="picSettings"></ve-pie>
                                <ul class="vipNum">
                                    <li>潜在会员： <span class="vipTipG">{{VipLesson.rows[0].value}}</span></li>
                                    <li>正式会员： <span class="vipTipB">{{VipLesson.rows[1].value}}</span></li>
                                </ul>
                            </div>
                        </el-col>
                        <!--会籍 -->
                        <el-col :md="8"  class="vip-item-num">
                            <ul class="index-item-tipUl">
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-newAdd.png" alt="">期限卡</li>
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-hasAdd.png" alt="">次卡</li>
                            </ul>
                            <div class="flex-between">
                                <ve-pie :data="VipAdd"
                                        :legend-visible="false"
                                        :colors="OverdueColor"
                                        :style="picStyle"
                                        :settings="picSettings"></ve-pie>
                                <ul class="vipNum">
                                    <li>期限卡： <span class="colorYellow">{{VipAdd.rows[0].value}}</span></li>
                                    <li>次卡： <span class="colorRed">{{VipAdd.rows[1].value}}</span></li>
                                </ul>
                            </div>
                        </el-col>
                        <!--已跟进-->
                        <el-col :md="8"  class="vip-item-num">
                            <ul class="index-item-tipUl">
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-hasAdd.png" alt="">已跟进</li>
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-hasAdd.png" alt="">未跟进</li>
                            </ul>
                            <div class="flex-between">
                                <ve-ring :data="VipFollow"
                                        :legend-visible="false"
                                        :colors="followColor"
                                        :style="picStyle"
                                        :settings="ringSettings"></ve-ring>
                                <ul class="vipNum">
                                    <li>已跟进： <span class="colorRed">{{VipFollow.rows[0].value}}</span></li>
                                    <li>未跟进： <span class="colorBlue">{{VipFollow.rows[1].value}}</span></li>
                                </ul>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <!-- C1 会籍销售额查询-->
                <div class="index-item pt-sales">
                    <header class="index-item-title flex-between">
                        <div class="title">会籍销售额查询</div>
                        <el-button class="btn-ptMore" @click="btnTotalMore('tabPaneState','vSalesD')">更多</el-button>
                    </header>
                    <div class="ptTable-assist">

                    </div>

                </div>

                <!-- C3 会籍数量查询-->
                <div class="index-item pt-sales">
                    <header class="index-item-title flex-between">
                        <div class="title">会籍数量查询</div>
                        <el-button class="btn-ptMore" @click="btnTotalMore('tabPaneState','vNumD')">查看更多</el-button>
                    </header>
                    <div class="ptTable-assist">

                    </div>
                </div>

                <!-- C4 会员上课详情-->
                <div class="index-item pt-sales">
                    <header class="index-item-title flex-between">
                        <div class="title">会员上课详情</div>
                        <el-button class="btn-ptMore" @click="btnTotalMore('tabPaneState','vLessonD')">查看更多</el-button>
                    </header>
                    <div class="ptTable-assist">

                     </div>
                </div>
            </el-tab-pane>

        </el-tabs>

        <!--私教销售额查询 表格 详情-->
        <div v-show="ptSalesD">
            <navBread @GoBack="goBack('VipPT','ptSalesD')" breadTitle="私教" breadContent1="销售额查询详情"></navBread>
            <statisDetails :ptSalesPage="10"></statisDetails>
        </div>

    </div>
</template>

<script>

    import navBread from '@/components/Echarts/navBread'  //面包屑导航 组件
    import monthSceen from '@/components/monthSceen/monthSceen'  //7天时间筛选组件
    import statisDetails from '@/components/details/statisDetails'  // 详情组件

    import {
        PTprivateMember, totalMember_number, totalMember_trend, totalPassenger_trend, totalRefund_trend,
        totalSub_card_trend, PTClassRanking, PTMemberClass,
        VipMemberTkClass, VipSalerStatis,
        staffIndex
    } from '@/assets/js/api' /*引用 会员总览 接口*/

    export default {
        inject:['reLoad'], //注入依赖 App 中的reLoad方法
        name: "StatisIndex",  //会员总览
        data() {
                   this.totalColor = ['#4CCBEB', '#005AD4']; //会员总览 潜在会员 自定义的颜色
            this.OverdueColor = ['#FFBE00', '#FF8A7E', '#4CCBEB', '#005AD4'];
            this.vipPtColor=['#FFBE00', '#FF8A7E','#1EAAA1', '#4CCBEB'];

            this.AddVipColor = ['#FF8A7E', '#005AD4', '#4CCBEB']; //会员总览2 新增会员走势
            this.AddRefund = ['#4CCBEB', '#005AD4', '#FF8A7E', '#FFBE00']; //会员总览2 新增会员走势
            this.followColor=['#FF8A7E', '#005AD4'];
            this.lineExtend = {
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
                    left: "4%",
                    right: "4%",
                    bottom: "4%",
                    width: "92%", //图例宽度
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
            };

            return {
                activeTabName: 'VipPT', //VipTotal VipPT VipMembership
                hasAxios:{  //是否调用接口状态
                    VipTotal:false,
                    VipPT:false,
                    VipMembership:false,
                },

                tabLazy: true,
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


                /*私教1、私教统计 */
                tabPaneState: false,    //tab 显隐
                ptSalesD: true,  //销售查询表格 显隐
                ptNumD: false,
                ptLessonD: false,
                vSalesD: false,
                vNumD: false,
                vLessonD: false,


                PTLesson: {
                    columns: ['name', 'value'],
                    rows: [
                        {name:'',value:0},
                        {name:'',value:0}],
                },
                PTAdd: {
                    columns: ['name', 'value'],
                    rows: [
                        {name:'',value:0},
                        {name:'',value:0}],
                },
                PTFollow: {
                    columns: ['name', 'value'],
                    rows: [
                        {name:'',value:0},
                        {name:'',value:0}],
                },



                /*  == 私教 == */


                //销售额表格
                PTtable: [],

                PTNumTable: [],
                PTVipTable: [],  /*私教上课详情*/


                /*私教上课查询*/
                PTclass: {
                    columns: ['姓名', '上课节数'],
                    rows: [],
                },


                /*  == 会籍 == */
                VipLesson: {
                    columns: ['name', 'value'],
                    rows: [
                        {name:'',value:0},
                        {name:'',value:0}],
                },
                VipAdd: {
                    columns: ['name', 'value'],
                    rows: [
                        {name:'',value:0},
                        {name:'',value:0}],
                },
                VipFollow: {
                    columns: ['name', 'value'],
                    rows: [
                        {name:'',value:0},
                        {name:'',value:0}],
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

                    this.hasAxios.VipTotal = true; //阻止接口重复调用

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
                    console.log(addTime);
                    console.log(addVip);
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
                    this.PTLesson.rows = ptLesson;

                    /*新增私教 与 续课*/
                    let ptAdd = [];
                    let ptNewAdd1 = res[2];
                    let ptContinue = res[3];
                    ptAdd.push(ptNewAdd1, ptContinue);
                    this.PTAdd.rows = ptAdd;

                    /*已跟进 与 未跟进*/
                    let ptFollow = [];
                    let ptHaveFollow = res[4];
                    let ptNoFollow = res[5];
                    ptFollow.push(ptHaveFollow, ptNoFollow);
                    this.PTFollow.rows = ptFollow;

                    this.hasAxios.VipPT = true; //阻止接口重复调用

                }).catch(res => {
                    console.log(res);
                });
            },

            getPTClassRanking() {
                PTClassRanking().then(res => {
                    this.PTclass.rows = [];
                    res.forEach((item,i)=>{
                        this.PTclass.rows.push({
                            '姓名' : item.name,
                            '上课节数' : item.value,
                        })
                    })

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
                    this.VipLesson.rows = ptLesson;

                    /*新增私教 与 续课*/
                    let ptAdd = [];
                    let ptNewAdd1 = res[2];
                    let ptContinue = res[3];
                    ptAdd.push(ptNewAdd1, ptContinue);
                    this.VipAdd.rows = ptAdd;

                    /*已跟进 与 未跟进*/
                    let ptFollow = [];
                    let ptHaveFollow = res[4];
                    let ptNoFollow = res[5];
                    ptFollow.push(ptHaveFollow, ptNoFollow);
                    this.VipFollow.rows = ptFollow;
                    
                    this.hasAxios.VipMembership = true; //阻止接口重复调用

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
                    if(this.hasAxios.VipTotal == false ){
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
                    }
                };
                if(tabName == 'VipPT'){
                    if(this.hasAxios.VipPT == false ){
                        /*调用 ==== 私教1 ==== 私教统计*/
                        this.getPTprivateMember();
                        this.getPTMemberClass();
                        this.getPTClassRanking();
                    }
                };
                if(tabName == 'VipMembership'){
                    if(this.hasAxios.VipMembership == false ) {
                        this.getVipMemberTkClass();
                        this.getVipSalerStatis();
                    }
                };
            },
        },
        created() {

            let tabName =this.activeTabName;
            this.callTabApi(tabName);


        },

        components: {
            navBread,
            monthSceen,
            statisDetails
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