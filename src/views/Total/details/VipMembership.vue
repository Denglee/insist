<template>
    <div>
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
                <el-button class="btn-ptMore" @click="btnTotalMore('vSalesD')">更多</el-button>
            </header>
            <div class="ptTable-assist">

            </div>
        </div>

        <!-- C3 会籍数量查询-->
        <div class="index-item pt-sales">
            <header class="index-item-title flex-between">
                <div class="title">会籍数量查询</div>
                <el-button class="btn-ptMore" @click="btnTotalMore('vNumD')">查看更多</el-button>
            </header>
            <div class="ptTable-assist">

            </div>
        </div>

        <!-- C4 会员上课详情-->
        <div class="index-item pt-sales">
            <vipLessonDetails  :ptSalesPage="5" @btnTotalMore="btnTotalMore('vLessonD')"></vipLessonDetails>
        </div>
    </div>
</template>

<script>
    import vipLessonDetails from '@/components/details/vipLessonDetails'  // 详情组件
    import {VipMemberTkClass, VipSalerStatis,} from '@/assets/js/api' /*引用 会员总览 接口*/

    export default {
        inject:['reLoad'], //注入依赖 App 中的reLoad方法
        name: "VipMembership",  //会员总览
        data() {
            this.totalColor = ['#4CCBEB', '#005AD4']; //会员总览 潜在会员 自定义的颜色
            this.OverdueColor = ['#FFBE00', '#FF8A7E', '#4CCBEB', '#005AD4'];
            this.followColor=['#FF8A7E', '#005AD4'];

            return {
                /*私教1、私教统计 */
                tabPaneState: true,    //tab 显隐
                ptSalesD: false,  //销售查询表格 显隐
                ptNumD: false,
                ptLessonD: false,
                vSalesD: false,
                vNumD: false,
                vLessonD: false,

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
            /*搜索*/
            searchPT() {
                console.log(this.input3);
            },

            /* 查看更多 */
            btnTotalMore(e1) {
                console.log('查看更多 e1'+e1);
                this.$emit('showState',e1)
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

        },
        created() {
            this.getVipMemberTkClass();
            this.getVipSalerStatis();
        },

        components: {
            vipLessonDetails,
        },
    }
</script>

<style lang="scss">

</style>