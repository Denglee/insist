<template>
    <div class="vitPt">
        <!--B1 私教统计-->
        <div class="index-item total-row">
            <header class="index-item-title">
                <div class="title">私教统计</div>
            </header>
            <el-row>
                <!--B11 私教上课-->
                <el-col :md="8" class="vip-item-num">
                    <ul class="index-item-tipUl">
                        <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-haslesson.png" alt="">{{PTLesson.rows[0].name}}</li>
                        <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-haslesson.png" alt="">{{PTLesson.rows[1].name}}</li>
                    </ul>
                    <div class="flex totalVip">
                        <ve-pie :data="PTLesson"
                                :legend-visible="false"
                                :colors="totalColor"
                                :style="picStyle"
                                :settings="picSettings"></ve-pie>
                        <ul class="vipNum">
                            <li>{{PTLesson.rows[0].name}}： <span class="vipTipG">{{PTLesson.rows[0].value}}</span></li>
                            <li>{{PTLesson.rows[1].name}}： <span class="vipTipB">{{PTLesson.rows[1].value}}</span></li>
                        </ul>
                    </div>
                </el-col>

                <!-- B12 私教新增 -->
                <el-col :md="8" class="vip-item-num">
                    <ul class="index-item-tipUl">
                        <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-newAdd.png" alt="">{{PTAdd.rows[0].name}}</li>
                        <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-hasAdd.png" alt="">{{PTAdd.rows[1].name}}</li>
                        <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-hasAdd.png" alt="">{{PTAdd.rows[2].name}}</li>
                        <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-hasAdd.png" alt="">{{PTAdd.rows[3].name}}</li>
                        <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-hasAdd.png" alt="">{{PTAdd.rows[4].name}}</li>
                    </ul>
                    <div class="flex totalVip">
                        <ve-pie :data="PTAdd"
                                :legend-visible="false"
                                :colors="OverdueColor"
                                :style="picStyle"
                                :settings="picSettings"></ve-pie>
                        <ul class="vipNum vipT-BomUl">
                            <li>{{PTAdd.rows[0].name}}： <span class="colorYellow">{{PTAdd.rows[0].value}}</span></li>
                            <li>{{PTAdd.rows[1].name}}： <span class="colorRed">{{PTAdd.rows[1].value}}</span></li>
                            <li>{{PTAdd.rows[2].name}}： <span class="colorRed">{{PTAdd.rows[2].value}}</span></li>
                            <li>{{PTAdd.rows[3].name}}： <span class="colorRed">{{PTAdd.rows[3].value}}</span></li>
                            <li>{{PTAdd.rows[4].name}}： <span class="colorRed">{{PTAdd.rows[4].value}}</span></li>
                        </ul>
                    </div>
                </el-col>

                <!--B13  私教已跟进-->
                <el-col :md="8" class="vip-item-num">
                    <ul class="index-item-tipUl">
                        <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-hasAdd.png" alt="">{{PTFollow.rows[0].name}}
                        </li>
                        <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-haslesson.png" alt="">{{PTFollow.rows[1].name}}
                        </li>
                    </ul>
                    <div class="flex totalVip">
                        <ve-ring :data="PTFollow"
                                 :legend-visible="false"
                                 :colors="followColor"
                                 :style="picStyle"
                                 :settings="ringSettings"></ve-ring>
                        <ul class="vipNum">
                            <li>{{PTFollow.rows[0].name}}： <span class="colorRed">{{PTFollow.rows[0].value}}</span></li>
                            <li>{{PTFollow.rows[1].name}}： <span class="colorBlue">{{PTFollow.rows[1].value}}</span></li>
                        </ul>
                    </div>
                </el-col>

            </el-row>
        </div>

        <!-- B2 私教销售额查询 -->
        <div class="index-item pt-sales">
            <ptSaleroom :ptSalesPage="5" @btnTotalMore="btnTotalMore('ptSalesD')" :salerGropu="salerGropu"></ptSaleroom>
        </div>

        <!-- B3 私教数量查询-->
        <div class="index-item pt-sales">
            <ptClassNumber :ptSalesPage="5" @btnTotalMore="btnTotalMore('ptNumD')" :salerGropu="salerGropu"></ptClassNumber>
        </div>

        <!-- B4 私教上课查询-->
        <div class="index-item pt-sales comein-main">
            <header class="index-item-title">
                <div class="title">私教上课查询</div>
            </header>
            <div class="chart">
                <ve-histogram
                        :data="PTclass"
                        :legend-visible="false"
                        :colors="totalColor"
                        :style="LineStyle"
                        :extend="histogramExtend"
                ></ve-histogram>
            </div>
        </div>

        <!-- B5 私教会员上课详情-->
        <!--<div class="index-item pt-sales">
            <ptLessonTable :ptSalesPage="5" @btnTotalMore="btnTotalMore('ptLessonD')"></ptLessonTable>
        </div>-->

    </div>
</template>

<script>

    import ptSaleroom from '@/views/Total/details/VipPT/ptSaleroom'  // 私教销售额查询 详情组件
    import ptClassNumber from '@/views/Total/details/VipPT/ptClassNumber'  // 私教 数量 详情组件
    import ptLessonTable from '@/views/Total/details/VipPT/ptLessonTable'  // 私教课程 详情组件

    import {PTprivateMember, PTClassRanking,} from '@/assets/js/api' /*引用 会员总览 接口*/

    import {histogramExtendConfig} from '@/assets/js/vChartsConfig/vChartsConfig'   //vcharts配置

    export default {
        inject:['reLoad'], //注入依赖 App 中的reLoad方法
        name: "VipPT",  //会员总览
        props:{
            salerGropu:{
                type:Array,
            }
        },
        data() {
            this.totalColor = ['#4CCBEB', '#005AD4']; //会员总览 潜在会员 自定义的颜色
            this.OverdueColor = ['#FFBE00', '#FF8A7E', '#4CCBEB', '#005AD4'];
            this.followColor=['#FF8A7E', '#005AD4'];
            this.histogramExtend = histogramExtendConfig;
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

                PTLesson: {
                    columns: ['name', 'value'],
                    rows: [
                        {name:'',value:0},
                        {name:'',value:0},
                        ],
                },
                PTAdd: {
                    columns: ['name', 'value'],
                    rows: [
                        {name:'',value:0},
                        {name:'',value:0},
                        {name:'',value:0},
                        {name:'',value:0},
                        {name:'',value:0},
                    ],
                },
                PTFollow: {
                    columns: ['name', 'value'],
                    rows: [
                        {name:'',value:0},
                        {name:'',value:0}],
                },

                //销售额表格
                PTtable: [],

                PTNumTable: [],
                PTVipTable: [],  /*私教上课详情*/

                /*私教上课查询*/
                PTclass: {
                    columns: ['姓名', '上课节数'],
                    rows: [],
                },

            }
        },
        methods: {
            btnTotalMore(e1) {
                console.log('查看更多 e1'+e1);
                this.$emit('showState',e1);
            },

            /* ==== 私教 接口1 私教统计 ==== */
            getPTprivateMember() {
                PTprivateMember().then(res => {
                    console.log(res.data);

                    /* 已上课 与 未上课 */
                    this.PTLesson.rows = res.data.course;

                    /*新增私教 与 续课*/
                    this.PTAdd.rows = res.data.personal_card;

                    /*已跟进 与 未跟进*/
                    this.PTFollow.rows = res.data.member_follow;

                }).catch(res => {
                    console.log(res);
                });
            },

            /*私教上课排名*/
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

        },
        created() {
            this.getPTprivateMember();
            this.getPTClassRanking();
        },

        components: {
            ptSaleroom,
            ptLessonTable,
            ptClassNumber,
        },
    }
</script>
