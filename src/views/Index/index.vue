<template>
    <div class="contain-public index-box">

        <!--现有会员  新增会员 在场人数 -->
        <el-row :gutter="20" class="index-row">
            <!--现有会员-->
            <el-col :md="12" :lg="8">
                <div class="index-item">
                    <header class="index-item-title">
                        <div class="title">现有会员</div>
                    </header>
                    <div class="total-box">
                        <div class="total-left">
                            <div class="chart">
                                <ve-pie :data="chartVip"
                                        :legend-visible="false"
                                        :colors="VipColor"
                                        :style="picStyle"
                                        :extend = 'firstPieEctend'
                                        :settings="picSettings"></ve-pie>
                            </div>
                        </div>
                        <ul class="total-right"  v-if="chartVip.rows.length >0">
                            <li><i class="iconfont icon-huiyuan1-01 color-Pink"></i>潜在会员：
                                <span class="color-Pink">{{chartVip.rows[0].value}}</span></li>
                            <li><i class="iconfont icon-huiyuan1-01 color-LigntBlue"></i>正式会员：
                                <span class="color-LigntBlue">{{chartVip.rows[1].value}}</span></li>
                            <li><i class="iconfont icon-huiyuan1-01 color-MediumBlue"></i>私教会员：
                                <span class="color-MediumBlue">{{chartVip.rows[2].value}}</span></li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :md="12" :lg="8">
                <div class="index-item">
                    <header class="index-item-title">
                        <div class="title">今日新增会员</div>
                    </header>
                    <div class="total-box">
                        <div class="total-left">
                            <ve-pie :data="addVip"
                                    :legend-visible="false"
                                    :colors="VipColor"
                                    :style="picStyle"
                                    :settings="picSettings"/>
                        </div>
                        <ul class="total-right" v-if="addVip.rows.length >0">
                            <li><i class="iconfont icon-huiyuan1-01 color-Pink"></i>潜在会员：
                                <span class="color-Pink">{{addVip.rows[0].value}}</span></li>
                            <li><i class="iconfont icon-huiyuan1-01 color-LigntBlue"></i>正式会员：
                                <span class="color-LigntBlue">{{addVip.rows[1].value}}</span></li>
                            <li><i class="iconfont icon-huiyuan1-01 color-MediumBlue"></i>私教会员：
                                <span class="color-MediumBlue">{{addVip.rows[2].value}}</span></li>
                        </ul>
                    </div>
                </div>
            </el-col>


            <!--在场人数-->
            <el-col :md="12" :lg="8">
                <div class="index-item" >
                    <div class="flex-between present-box">
                        <div class="present-top present-TopL">
                            <p class="title">在场人数</p>
                            <p class="num">
                                {{presentNo}}
                            </p>
                        </div>
                        <div class="present-top present-TopR">
                            <p class="title">客流人数</p>
                            <p class="num">{{customerNo}}</p>
                        </div>
                    </div>
                    <div class="line-present">
                        <ve-line
                                :color="presentColor"
                                :data="presentNum"
                                :legend-visible="false"
                                :style="LineStyle"
                                :extend = 'lineExtend'
                        ></ve-line>
                    </div>
                </div>
            </el-col>

            <!--更衣室使用情况-->
            <el-col :md="12" :lg="8">
                <div class="index-item indexItem-hei250">
                    <header class="index-item-title">
                        <div class="title">更衣室使用情况</div>
                    </header>
                    <div class="lockerRoom-box flex-between">
                        <ul class="index-item-tipUl">
                            <li><span class="addVip-tagB"></span>男更 {{roomMan[0].total}}</li>
                            <li><span class="addVip-tagY"></span>女更 {{roomWoman[0].total}}</li>
                        </ul>
                        <ul class="lockerRoom-main">
                            <li class="lockerRoom-item">
                                <el-progress :percentage="roomMan[2].ratio" :text-inside="true" :stroke-width="16"
                                           :stroke-linecap="progerssStroke" :color="progressColorMan" ></el-progress>
                                <div class="flex-between">
                                    <div class="used-room">占用{{roomMan[1].use}}</div>
                                    <div class="surplus-roomM">剩余{{roomMan[3].left}}</div>
                                </div>
                            </li>
                            <li class="lockerRoom-item">
                                <el-progress :percentage="roomWoman[2].ratio" :text-inside="true" :stroke-width="16"
                                          :stroke-linecap="progerssStroke"  :color="progressColorFeman"></el-progress>
                                <div class="flex-between">
                                    <div class="used-room">占用{{roomWoman[1].use}}</div>
                                    <div class="surplus-roomF">剩余{{roomWoman[3].left}}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>

            <!--课程分析-->
            <el-col :md="24" :lg="16" >
                <div class="index-item indexItem-hei250">
                    <header class="index-item-title flex-between">
                        <div class="title">课程分析</div>
                    </header>
                    <div class="lesson-main lesson-borR">
                        <!--<h4 class="lesson-main-title">团课</h4>-->
                        <div class="lesson-item">
                            <ve-pie :data="lessonGroup"
                                    :legend-visible="false"
                                    :colors="lessonGroupColor"
                                    :style="PTpicStyle"
                                    :settings="picSettings2"/>
                            <ul class="total-right"  v-if="lessonGroup.rows.length >0">
                                <li>团课上课节数： <span class="vipTipB">{{lessonGroup.rows[0].value}}</span></li>
                                <li>团课预约节数： <span class="vipTipG">{{lessonGroup.rows[1].value}}</span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="lesson-main">
                        <!--<h4 class="lesson-main-title">私教课</h4>-->
                        <div class="lesson-item">
                            <ve-pie :data="lessonTrainer"
                                    :legend-visible="false"
                                    :colors="lessonTrainerColor"
                                    :style="PTpicStyle"
                                    :settings="picSettings2"/>
                            <ul class="total-right" v-if="lessonTrainer.rows.length >0">
                                <li>私教课上课节数： <span class="vipTipYellow">{{lessonTrainer.rows[0].value}}</span></li>
                                <li>私教课预约节数： <span class="vipTipY">{{lessonTrainer.rows[1].value}}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>

        <!--收支统计-->
        <div class="index-item income-container clearfix">
            <header class="index-item-title flex-between">
                <div class="title">收支统计</div>
            </header>
            <div class="income-total">
                <div class="income-borR">
                    <div class='price'>￥{{incomeTotal}}</div>
                    <div>总收入</div>
                </div>
            </div>
            <div class="income-box">
                <ul class="flex-between">
                    <li class="income-item" v-for="(item,index) in incomeArr" :key="index">
                        <el-progress type="circle" :percentage="item.ratio" :stroke-width="16"
                         :stroke-linecap="progerssStroke" :color="item.color"></el-progress>
                        <div :class="item.class">￥{{item.price}}</div>
                        <div class="income-type">{{item.name}}</div>
                    </li>
                </ul>
            </div>
        </div>

        <!--收入趋势-->
        <div class="index-item comein-main" style="width: 100%">
            <header class="index-item-title flex-between">
                <div class="title">收入趋势</div>
            </header>
            <ul class="index-item-tipUl">
                <li><img src="~@/assets/icon/icon_comeinHJ.png" alt="">会籍营收</li>
                <li><img src="~@/assets/icon/icon_comeinSJ.png" alt="">私教营收</li>
                <li><img src="~@/assets/icon/icon_comeinTK.png" alt="">其他营收</li>
            </ul>
            <div class="line-comeIn">
                <ve-line
                        :color="comeInColor"
                        :data="comeIn"
                        :legend-visible="false"
                        :style="ComeInLineStyle"
                        :extend = 'lineExtend'
                ></ve-line>
            </div>

        </div>

    </div>
</template>

<script>

    import {IndexTotal_membership,IndexNew_membership,IndexStatistics,IndexDrawer,IndexCurriculum,IndexPerformance,IndexRevenue_trend} from '@/assets/js/api'   /*引用 首页 接口*/
    import {lineExtendConfig,histogramExtendConfig} from '@/assets/js/vChartsConfig/vChartsConfig'   //vcharts配置

    export default {
        name: "index",
        inject: ['reLoad'],

        data() {

            this.VipColor = ['#ff8a7e','#4ccbeb','#005ad4']; // 自定义的颜色
            this.addVipColor =  ['#4ccbeb', '#5b5ec7','#ffbe00' ]; // 自定义的颜色
            this.presentColor = ['#FF8A7E', '#4CCBEB', '#005AD4']; //自定义的颜色
            this.lessonGroupColor =  ['#4CCBEB', '#005AD4']; // 自定义的颜色
            this.lessonTrainerColor =  ['#FF8A7E', '#FFBE00']; //自定义的颜色
            this.comeInColor = ['#FF8A7E', '#4CCBEB', '#005AD4']; // 自定义的颜色

            this.lineExtend = lineExtendConfig;

            return {
                LineStyle:{
                    height: '180px',
                    width: '100%',
                },
                ComeInLineStyle:{
                    height: '340px',
                    width: '100%',
                },

                picSettings2 : {
                    offsetY: 100,
                    offsetX: 50,
                    radius: 50,
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
                firstPieEctend:{
                    tooltip: {
                        trigger: 'item',
                        position: 'right'
                    },
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
                picStyle: {
                    height: '180px',
                    width: '200px',
                },
                PTpicStyle: {
                    height: '120px',
                    width: '200px',
                },

                progerssStroke:'square',  /*progress*/
                presentNo:0,  /*在场人数*/
                customerNo:0,  /*客流人数*/

                datePresent: '',        /*在场人数 时间选择*/
                dateLesson: '',        /*课程分析 时间选择*/
                dateComeinTotal: '',   /*收入统计 时间选择*/
                dateComein: '',        /*收入趋势 时间选择*/

                /*收入统计 样式 */
                incomeArr: [
                    {class: "colorRed", color: '#FF8A7E',},
                    {class: "colorBlue", color: '#005AD4',},
                    {class: "colorYellow", color: '#FFBE00',},
                    {class: "colorBlueL", color: '#4CCBEB',},
                    {class: "colorGreen", color: '#1EAAA1',},
                    {class: "colorViolet", color: '#B6A2DE',},
                ],
                incomeTotal:'',

                /*更衣室数据*/
                progressColorMan: '#005AD4', /*男更进度条 颜色*/
                progressColorFeman: '#FF8A7E', /*女更进度条 颜色*/
                roomMan:[
                    {name: "总数", total: 0},
                    {name: "使用数", use: 0},
                    {name: "使用比例", ratio:0 },
                    {name: "剩余数", left: 0},
                ],
                roomWoman:[
                    {name: "总数", total: 0},
                    {name: "使用数", use: 0},
                    {name: "使用比例", ratio:0 },
                    {name: "剩余数", left: 0},
                ],


                /*现有会员*/
                chartVip: {
                    columns: ['name', 'value'],
                    rows: [  {name:'',value:0},
                        {name:'',value:0},
                        {name:'',value:0},],
                },

                /*今日新增会员*/
                addVip: {
                    columns: ['name', 'value'],
                    rows: [
                        {name:'',value:0},
                        {name:'',value:0},
                        {name:'',value:0},
                    ],
                },

                /*在场与客流人数*/
                presentNum: {
                    columns: ['日期', '在场人数'],
                    rows: [],
                },

                /*课程分析 团课*/
                lessonGroup: {
                    columns: ['name', 'value'],
                    rows: [],
                },

                /*课程分析 私教课*/
                lessonTrainer: {
                    columns: ['name', 'value'],
                    rows: [],
                },

                /*收入趋势*/
                comeIn: {
                    columns: ['日期', '会籍','私教', '其他'],
                    rows: [],
                },

            }
        },

        methods: {

            /*获取  现有会员 数据*/
            getTotal(){
                IndexTotal_membership().then(res => {
                    // console.log(res);
                    this.chartVip.rows = res.data;
                }).catch(res =>{
                    console.log(res);
                });
            },

            /*获取 今日新增会员 数据*/
            getNewMenber(){
                IndexNew_membership().then(res => {
                    // console.log(res);
                    this.addVip.rows = res.data;
                }).catch(res =>{
                    console.log(res);
                });
            },

            /*获取  在场人数 数据*/
            getStatistics(){
                IndexStatistics().then(res => {
                    // console.log(res.data.today);
                    this.customerNo = res.data.current;
                    this.presentNo = res.data.today;
                    let addTime = res.data.date.split(',');
                    let addData = res.data.data.split(',');

                    for(let i = 0;i < addTime.length;i++){
                        this.presentNum.rows.push({
                            '日期' : addTime[i],
                            '在场人数' : addData[i],
                        })
                    }

                }).catch(res =>{
                    console.log(res);
                });
            },

            /*获取  更衣柜使用 数据*/
            getDrawer(){
                IndexDrawer().then(res => {
                    console.log(res);
                    this.roomMan = res.data.man;
                    this.roomWoman = res.data.woman;
                    // this.roomManRatio = res.man[2].ratio;
                }).catch(res =>{
                    console.log(res);
                });
            },

            /*获取  课程分析 数据*/
            getCurriculum(){
                IndexCurriculum().then(res => {
                    /*团课*/
                    this.lessonGroup.rows = res.data.league;

                    /*私教*/
                    this.lessonTrainer.rows = res.data.personal;

                }).catch(res =>{
                    console.log(res);
                });
            },

            /*获取  营收业绩 收支统计 数据*/
            getPerformance(){
                IndexPerformance().then(res => {
                    console.log(res);
                    let incomeData = res.data;
                    this.incomeTotal = res.data[6].price;
                    this.incomeArr = this.incomeArr.map((item, index) => {
                        return {...item, ...incomeData[index]};
                    });

                }).catch(res =>{
                    console.log(res);
                });
            },

            /*获取  营收走势 收入趋势 数据*/
            getRevenue_trend(){
                IndexRevenue_trend().then(res => {
                    let comeTime = res.data[0].value.split(',');
                    let comeVip = res.data[1].value.split(',');
                    let comePT = res.data[2].value.split(',');
                    let comeOther = res.data[3].value.split(',');
                    this.comeIn.rows = [];
                    for(let i=0;i < comeTime.length;i++){
                        this.comeIn.rows.push({
                            '日期' : comeTime[i],
                            '会籍' : comeVip[i],
                            '私教' : comePT[i],
                            '其他' : comeOther[i],
                        })
                    }
                }).catch(res =>{
                    console.log(res);
                });
            },

        },

        created() {

            /*调用 现有会员 数据接口 方法*/
            this.getTotal();

            /*调用 今日新增 方法*/
            this.getNewMenber();

            /*在场人数  调用*/
            this.getStatistics();

            /*更衣室   调用*/
            this.getDrawer();

            /*课程分析 团课 调用*/
            this.getCurriculum();

            /*收支统计 调用*/
            this.getPerformance();

            /*收入趋势 调用*/
            this.getRevenue_trend();

        },


        /*页面刷新*/
        beforeRouteEnter(to, from, next) {
            console.log(to);
            console.log(from);
            if (from.name == 'login') {
                console.log('我从登陆页过来的 正在刷新……');
                next(vm => {
                    window.location.reload();
                })
            } else {
                next()
            }
        },

    }
</script>

<style lang="scss">
    @import "@/assets/css/index.scss";
    iframe {
        width: 100%;
        min-height: 100vh;
    }
</style>

