<template>
    <div >
        <!--C1 会籍统计-->
        <div class="index-item total-row">
            <header class="index-item-title">
                <div class="title">会籍统计</div>
            </header>
            <el-row >
                <el-col :md="8" class="total-box">
                    <div class="total-left">
                        <ve-pie :data="VipLesson"
                                :legend-visible="false"
                                :colors="totalColor"
                                :style="picStyle"
                                :extend = 'firstPieEctend'
                                :settings="picSettings">
                        </ve-pie>
                    </div>
                    <ul class="total-right" v-if="VipLesson.rows.length >0">
                        <li>
                            <i class="iconfont icon-huiyuan1-01 color-LigntBlue"></i>{{VipLesson.rows[0].name}}：
                            <span class="color-LigntBlue">{{VipLesson.rows[0].value}}</span>
                        </li>
                        <li>
                            <i class="iconfont icon-huiyuan1-01 color-MediumBlue"></i>{{VipLesson.rows[1].name}}：
                            <span class="color-MediumBlue">{{VipLesson.rows[1].value}}</span>
                        </li>
                    </ul>
                </el-col>


                <el-col :md="8" class="total-box">
                    <div class="total-left">
                        <ve-pie :data="VipAdd"
                                :legend-visible="false"
                                :colors="OverdueColor"
                                :style="picStyle"
                                :settings="picSettings"></ve-pie>
                    </div>
                    <ul class="total-right" v-if="VipAdd.rows.length >0">
                        <li>
                            <i class="iconfont icon-qixianka color-Pink"></i>{{VipAdd.rows[0].name}}：
                            <span class="color-Pink">{{VipAdd.rows[0].value}}</span>
                        </li>
                        <li>
                            <i class="iconfont icon-cika color-Yellow"></i>{{VipAdd.rows[1].name}}：
                            <span class="color-Yellow">{{VipAdd.rows[1].value}}</span>
                        </li>
                    </ul>
                </el-col>

                <el-col :md="8" class="total-box">
                    <div class="total-left">
                        <ve-ring :data="VipFollow"
                                 :legend-visible="false"
                                 :colors="followColor"
                                 :style="picStyle"
                                 :settings="ringSettings"></ve-ring>
                    </div>
                    <ul class="total-right" v-if="VipFollow.rows.length >0">
                        <li>
                            <i class="iconfont icon-genjin1 color-Pink"></i>{{VipFollow.rows[0].name}}：
                            <span class="color-Pink">{{VipFollow.rows[0].value}}</span>
                        </li>
                        <li>
                            <i class="iconfont icon-genjin1 color-MediumBlue"></i>{{VipFollow.rows[1].name}}：
                            <span class="color-MediumBlue">{{VipFollow.rows[1].value}}</span>
                        </li>
                    </ul>
                </el-col>
            </el-row>
        </div>

        <!-- C2 会籍销售额查询-->
        <div class="index-item pt-sales">
            <MBSaleroom :ptSalesPage="5" @btnTotalMore="btnTotalMore('vSalesD')" :salerGropu="salerGropu"></MBSaleroom>
        </div>

        <!-- C3 会籍数量查询-->
        <div class="index-item pt-sales">
            <MBClassNumber :ptSalesPage="5" @btnTotalMore="btnTotalMore('vNumD')" :salerGropu="salerGropu"></MBClassNumber>
        </div>

        <!-- 次卡到期提醒-->
        <div class="index-item pt-sales">
            <MBexpireOnce :ptSalesPage="5" @btnTotalMore="btnTotalMore('onceExpireD')" :salerGropu="salerGropu"></MBexpireOnce>
        </div>

        <!-- 期限到期提醒-->
        <div class="index-item pt-sales">
            <MBexpireTerm :ptSalesPage="5" @btnTotalMore="btnTotalMore('termExpireD')" :salerGropu="salerGropu"></MBexpireTerm>
        </div>

        <!-- 懒惰提醒-->
        <div class="index-item pt-sales">
            <MBexpireLazy :ptSalesPage="5" @btnTotalMore="btnTotalMore('laztExpireD')" :salerGropu="salerGropu"></MBexpireLazy>
        </div>

        <!-- 滑雪到期提醒-->
        <div class="index-item pt-sales">
            <MBexpireSki :ptSalesPage="5" @btnTotalMore="btnTotalMore('skiExpireD')" :salerGropu="salerGropu"></MBexpireSki>
        </div>

    </div>
</template>

<script>
    import {VipMemberTkClass, VipSalerStatis,} from '@/assets/js/api' /*引用 会员总览 接口*/

    import MBClassNumber from '@/views/Total/details/VipMembership/MBClassNumber'  // 会籍 数量 详情组件
    import MBSaleroom from '@/views/Total/details/VipMembership/MBSaleroom'  // 会籍 数量 详情组件

    import MBexpireOnce from '@/views/Total/details/VipMembership/MBexpireOnce'  // 次卡到期提醒
    import MBexpireTerm from '@/views/Total/details/VipMembership/MBexpireTerm'  // 期限卡到期提醒
    import MBexpireLazy from '@/views/Total/details/VipMembership/MBexpireLazy'  // 懒惰提醒
    import MBexpireSki from '@/views/Total/details/VipMembership/MBexpireSki'  // 滑雪到期提醒

    export default {
        inject:['reLoad'], //注入依赖 App 中的reLoad方法
        name: "VipMembership",  //会籍
        props:{
            salerGropu:{
                type:Array,
            }
        },
        data() {
            this.totalColor = ['#4CCBEB', '#005AD4']; //会员总览 潜在会员 自定义的颜色
            this.OverdueColor = ['#FFBE00', '#FF8A7E', '#4CCBEB', '#005AD4'];
            this.followColor=['#FF8A7E', '#005AD4'];

            return {

                /*私教1、私教统计 */
                // tabPaneState: true,    //tab 显隐
                // ptSalesD: false,  //销售查询表格 显隐
                // ptNumD: false,
                // ptLessonD: false,
                // vSalesD: false,
                // vNumD: false,
                // vLessonD: false,

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
                    offsetY: 90,
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
                    offsetY: 90,
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
                    rows: [],
                },
                VipAdd: {
                    columns: ['name', 'value'],
                    rows: [],
                },
                VipFollow: {
                    columns: ['name', 'value'],
                    rows: [],
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
                window.sessionStorage.setItem('statisShowDetail',e1);
                console.log('查看更多 e1'+e1);
                this.$emit('showState',e1)
            },


            /* ==== 会籍 接口1 统计 ==== */
            getVipSalerStatis(){
                VipSalerStatis().then(res => {
                    console.log(res);
                    /* 已上课 与 未上课 */
                    let ptLesson = [];
                    let ptHasLesson = res.data[0];
                    let ptNoLesson = res.data[1];
                    ptLesson.push(ptHasLesson, ptNoLesson);
                    // console.log(ptLesson);
                    this.VipLesson.rows = ptLesson;

                    /*新增私教 与 续课*/
                    let ptAdd = [];
                    let ptNewAdd1 = res.data[2];
                    let ptContinue = res.data[3];
                    ptAdd.push(ptNewAdd1, ptContinue);
                    this.VipAdd.rows = ptAdd;

                    /*已跟进 与 未跟进*/
                    let ptFollow = [];
                    let ptHaveFollow = res.data[4];
                    let ptNoFollow = res.data[5];
                    ptFollow.push(ptHaveFollow, ptNoFollow);
                    this.VipFollow.rows = ptFollow;

                }).catch(res => {
                    console.log(res);
                });
            },

            /*上课排名*/
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
            // this.getVipMemberTkClass();

            this.getVipSalerStatis();
        },

        components: {
            MBClassNumber,
            MBSaleroom,

            MBexpireOnce,  //次卡
            MBexpireTerm,  //期限
            MBexpireLazy,
            MBexpireSki,
        },
    }
</script>
