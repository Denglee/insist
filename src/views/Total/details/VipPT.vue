<template>
    <div>
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
        <div class="index-item pt-sales">
            <ptLessonDetails :ptSalesPage="5" @btnTotalMore="btnTotalMore('ptLessonD')"></ptLessonDetails>
        </div>

    </div>
</template>

<script>

    import statisDetails from '@/components/details/statisDetails'  // 详情组件
    import ptLessonDetails from '@/components/details/ptLessonDetails'  // 详情组件

    import {PTprivateMember, PTClassRanking,} from '@/assets/js/api' /*引用 会员总览 接口*/

    import {histogramExtendConfig} from '@/assets/js/vChartsConfig/vChartsConfig'   //vcharts配置

    export default {
        inject:['reLoad'], //注入依赖 App 中的reLoad方法
        name: "VipPT",  //会员总览
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
                this.$emit('showState',e1)
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
            statisDetails,
            ptLessonDetails,
        },
    }
</script>

<style lang="scss">

</style>