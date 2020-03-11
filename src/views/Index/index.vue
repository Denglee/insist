<template>
    <div class="index-container">

        <!--现有会员  新增会员 在场人数 -->
        <el-row :gutter="20" class="index-row">
            <!--现有会员-->
            <el-col :md="12" :lg="8">
                <div class="index-item">
                    <header class="index-item-title">
                        <div class="title">现有会员</div>
                    </header>
                    <ul class="index-item-tipUl">
                        <li><img src="~@/assets/icon/icon_indexVipG.png" alt="">潜在会员</li>
                        <li><img src="~@/assets/icon/icon_indexVipB.png" alt="">正式会员</li>
                        <li><img src="~@/assets/icon/icon_indexVipY.png" alt="">私教会员</li>
                    </ul>
                    <div class="flex-between">
                        <eCharts :eChartObj="chartVip" :style="styleVip"></eCharts>
                        <ul class="vipNum">
                            <li>潜在会员： <span class="vipTipG">{{chartVip.series[0].data[0].value}}</span></li>
                            <li>正式会员： <span class="vipTipB">{{chartVip.series[0].data[1].value}}</span></li>
                            <li>私教会员： <span class="vipTipY">{{chartVip.series[0].data[2].value}}</span></li>
                        </ul>
                    </div>
                </div>
            </el-col>

            <!--今日新增会员-->
            <el-col :md="12" :lg="8">
                <div class="index-item">
                    <header class="index-item-title">
                        <div class="title">今日新增会员</div>
                    </header>
                    <ul class="index-item-tipUl">
                        <li><span class="addVip-tagG"></span>潜在会员</li>
                        <li><span class="addVip-tagB"></span>正式会员</li>
                        <li><span class="addVip-tagY"></span>私教会员</li>
                    </ul>
                    <div class="flex-between">
                        <eCharts :eChartObj="addVip" :style="styleAddVip"></eCharts>
                        <ul class="vipNum">
                            <li>潜在会员： <span class="vipTipG">{{addVip.series[0].data[0].value}}</span></li>
                            <li>正式会员： <span class="vipTipB">{{addVip.series[0].data[1].value}}</span></li>
                            <li>私教会员： <span class="vipTipY">{{addVip.series[0].data[2].value}}</span></li>
                        </ul>
                    </div>
                </div>
            </el-col>

            <!--在场人数-->
            <el-col :md="12" :lg="8">
                <div class="index-item">
                    <div class="flex-between present-box">
                        <div class="present-top present-TopL">
                            <p class="title">在场人数</p>
                            <p class="num">
                                <!--{{presentNo}}-->
                            </p>
                        </div>
                        <div class="present-top present-TopR">
                            <p class="title">客流人数</p>
                            <p class="num">0   <!--{{customerNo}}--></p>
                        </div>
                    </div>

                    <!--<div class="present-time">
                        <el-date-picker
                                @change="truePresent"
                                v-model="datePresent"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>-->

                    <div class="flex-between">
                        <eCharts :eChartObj="presentNum" :style="stylePresent"></eCharts>
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
            <el-col :md="24" :lg="16">
                <div class="index-item indexItem-hei250">
                    <header class="index-item-title flex-between">
                        <div class="title">课程分析</div>
                        <!--<el-date-picker
                                @change="trueLesson"
                                v-model="dateLesson"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                format="yyyy 年 MM 月 dd 日">
                        </el-date-picker>-->
                    </header>
                    <div class="lesson-main lesson-borR">
                        <h4 class="lesson-main-title">团课</h4>
                        <div class="lesson-item">
                            <eCharts :eChartObj="lessonGroup" :style="styleLesson"></eCharts>
                            <ul class="vipNum">
                                <li>上课人数： <span class="vipTipG">{{lessonGroup.series[0].data[0].value}}</span></li>
                                <li>预约人数： <span class="vipTipB">{{lessonGroup.series[0].data[1].value}}</span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="lesson-main">
                        <h4 class="lesson-main-title">私教课</h4>
                        <div class="lesson-item">
                            <eCharts :eChartObj="lessonTrainer" :style="styleLesson"></eCharts>
                            <ul class="vipNum">
                                <li>上课人数： <span class="vipTipY">{{lessonTrainer.series[0].data[0].value}}</span></li>
                                <li>预约人数： <span class="vipTipYellow">{{lessonTrainer.series[0].data[1].value}}</span></li>
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
               <!-- <div>
                    <el-date-picker
                            @change="trueComeinTotal"
                            v-model="dateComeinTotal"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            format="yyyy年MM月dd日">
                    </el-date-picker>
                </div>-->
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
        <div class="index-item comein-main">
            <header class="index-item-title flex-between">
                <div class="title">收入趋势</div>
                <!--<div>
                    <span class="comeIn-title">日期筛选</span>
                    <el-date-picker
                            @change="trueComein"
                            v-model="dateComein"
                            type="daterange"
                            align="right"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00', '08:00:00']">
                    </el-date-picker>
                </div>-->
            </header>
            <ul class="index-item-tipUl">
                <li><img src="~@/assets/icon/icon_comeinTK.png" alt="">会籍营收</li>
                <li><img src="~@/assets/icon/icon_comeinSJ.png" alt="">私教营收</li>
                <li><img src="~@/assets/icon/icon_comeinHJ.png" alt="">其他营收</li>
            </ul>
            <eCharts :eChartObj="comeIn" :style="styleComeIN"></eCharts>
        </div>

    </div>
</template>

<script>
    import eCharts from '@/components/Echarts/Echarts'
    import {IndexTotal_membership,IndexNew_membership,IndexStatistics,IndexDrawer,IndexCurriculum,IndexPerformance,IndexRevenue_trend} from '@/assets/js/api'   /*引用 首页 接口*/
    export default {
        name: "index",
        inject: ['reLoad'],

        data() {
            return {

                progerssStroke:'square',  /*progress*/
                presentNo:'20',  /*在场人数*/
                customerNo:'20',  /*客流人数*/

                datePresent: '',        /*在场人数 时间选择*/
                dateLesson: '',        /*课程分析 时间选择*/
                dateComeinTotal: '',   /*收入统计 时间选择*/
                dateComein: '',        /*收入趋势 时间选择*/

                /*收入统计 样式 */
                incomeArr: [
                    {
                        class: "colorRed",
                        color: '#FF8A7E',

                    },
                    {
                        class: "colorBlue",
                        color: '#005AD4',
                    },
                    {
                        class: "colorYellow",
                        color: '#FFBE00',
                    },
                    {
                        class: "colorBlueL",
                        color: '#4CCBEB',
                    },
                    {
                        class: "colorGreen",
                        color: '#1EAAA1',
                    },
                    {
                        class: "colorViolet",
                        color: '#B6A2DE',
                    },
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


                /*eCharts 对应宽高*/
                styleVip: {
                    height: '220px',
                    width: '220px',
                },
                styleAddVip: {
                    height: '220px',
                    width: '60%',
                },
                stylePresent: {
                    height: '180px',
                    width: '100%',
                },
                styleLesson: {
                    height: '180px',
                    width: '220px',
                },
                styleComeIN: {
                    height: '310px',
                    width: '100%',
                },

                /*现有会员*/
                chartVip: {
                    color: ['#FF8A7E', '#4CCBEB', '#005AD4'], //自定义的颜色
                    tooltip: {
                        trigger: 'item',
                    },
                    series: [{
                        // name: '现有会员',
                        height: '90%',
                        width: '90%',
                        left: '10%',
                        top: 0,
                        type: 'pie',
                        data: [
                            {value:'',name:""},
                            {value:'',name:""},
                            {value:'',name:""},
                        ],
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
                        }
                    }],
                },

                /*今日新增会员*/
                addVip: {
                    color: ['#FF8A7E', '#4CCBEB', '#005AD4'], //自定义的颜色
                    tooltip: {
                        trigger: 'item',
                    },
                    series: [
                        {
                            type: 'funnel',
                            left: '10%',
                            width: '60%',
                            height: '60%',
                            top: '20%',
                            label: {
                                normal: {
                                    show: false,
                                },
                                emphasis: {
                                    show: false,
                                }
                            },
                            itemStyle : {
                                normal : {
                                    label : {
                                        show : false
                                    },
                                    labelLine : {
                                        show : false
                                    }
                                },

                            },

                            data: [
                                {name: "", value: ""},
                                {name: "", value: ""},
                                {name: "", value: ""},
                            ]
                        }
                    ]
                },

                /*在场与客流人数*/
                presentNum: {
                    color: ['#FF8A7E', '#4CCBEB', '#005AD4'], //自定义的颜色
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data:[],
                        //设置坐标轴字体颜色和宽度
                        axisLine: {
                            lineStyle: {
                                color: '#8E8E8E',
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#f4f4f4',
                                width: 1
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name: '客流趋势',   // y轴名称
                        axisLine: {
                            lineStyle: {
                                color: '#8E8E8E',
                            }
                        },
                    },
                    grid: {
                        top: "40px",
                        left: "60px",
                        right: "40px",
                        bottom: "20px",
                        width: "auto", //图例宽度
                        height: "auto", //图例高度

                    },
                    series: [
                        {

                            name: '客流趋势',
                            type: 'line',
                            data: [],
                            symbolSize: 8,   //设定实心点的大小
                        },
                        {
                            name: '在场人数',
                            type: 'line',
                            data: [],
                            symbolSize: 8,   //设定实心点的大小
                        }
                    ]
                },

                /*课程分析 团课*/
                lessonGroup: {
                    tooltip: {
                        trigger: 'item',
                    },
                    color: ['#4CCBEB', '#005AD4'], //自定义的颜色
                    series: [
                        {
                            left: '20%',
                            width: '90%',
                            height: '90%',
                            top: '0%',

                            /*name: '课程分析',*/
                            type: 'pie',
                            radius: ['43%', '57%'],

                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '14',
                                        // fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false,
                                }
                            },

                            data:[
                                {name: "团课预约", value: ''},
                                {name: "团课上课", value: ''},
                            ],
                        }
                    ]
                },

                /*课程分析 私教课*/
                lessonTrainer: {
                    tooltip: {
                        trigger: 'item',
                    },
                    color: ['#FF8A7E', '#FFBE00'], //自定义的颜色
                    series: [
                        {
                            left: '20%',
                            width: '90%',
                            height: '90%',
                            top: '0%',

                            /*name: '课程分析',*/
                            type: 'pie',
                            radius: ['43%', '57%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '14',
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false,
                                }
                            },

                            data:[
                                {name: "私教预约", value: ''},
                                {name: "私教上课", value: ''},
                            ],
                        },
                    ]
                },

                /*收入趋势*/
                comeIn: {
                    color: ['#FF8A7E', '#005AD4', '#4CCBEB'], //自定义的颜色
                    tooltip: {
                        trigger: 'axis',
                    },

                    xAxis: {
                        type: 'category',
                        data: [],
                        axisLine: {
                            lineStyle: {
                                color: '#8E8E8E',
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

                    grid: {
                        top: "30px",
                        left: "80px",
                        right: "60px",
                        bottom: "40px",
                        width: "auto", //图例宽度
                        height: "80%", //图例高度

                    },
                    series: [

                        {
                            name: '团课营收',
                            type: 'line',
                            data: [],
                            symbolSize: 12,   //设定实心点的大小
                            lineStyle: {
                                normal: {
                                    type: 'dashed',
                                }
                            },
                        },
                        {
                            name: '私教营收',
                            type: 'line',
                            symbolSize: 12,   //设定实心点的大小
                            data: [],
                        },
                        {
                            name: '会籍营收',
                            symbolSize: 12,   //设定实心点的大小
                            type: 'line',
                            data: [],
                        }
                    ]
                },

            }
        },

        methods: {

            /*获取  现有会员 数据*/
            getTotal(){
                IndexTotal_membership().then(res => {
                    // console.log(res);
                    this.chartVip.series[0].data = res;
                }).catch(res =>{
                    console.log(res);
                });
            },

            /*获取 今日新增会员 数据*/
            getNewMenber(){
                IndexNew_membership().then(res => {
                    // console.log(res);
                    this.addVip.series[0].data[0].value = res[0].potential_members;
                    this.addVip.series[0].data[0].name = res[0].name;
                    this.addVip.series[0].data[1].value = res[1].official_members;
                    this.addVip.series[0].data[1].name = res[1].name;
                    this.addVip.series[0].data[2].value = res[2].personal_members;
                    this.addVip.series[0].data[2].name = res[2].name;
                }).catch(res =>{
                    console.log(res);
                });
            },

            /*获取  在场人数 数据*/
            getStatistics(){
                IndexStatistics().then(res => {
                    // console.log(res);
                    let xArr= res.date.split(',');
                    this.presentNum.xAxis.data = xArr;

                    let staData=  res.data.split(',')
                    this.presentNum.series[1].data = staData;
                }).catch(res =>{
                    console.log(res);
                });
            },

            /*获取  更衣柜使用 数据*/
            getDrawer(){
                IndexDrawer().then(res => {
                    // console.log(res);
                    this.roomMan = res.man;
                    this.roomManRatio = res.man[2].ratio;
                    this.roomWoman = res.woman;
                    this.roomWomanRatio = res.woman[2].ratio;
                }).catch(res =>{
                    console.log(res);
                });
            },

            /*获取  课程分析 数据*/
            getCurriculum(){
                IndexCurriculum().then(res => {
                    // console.log(res);

                    /*团课*/
                    this.lessonGroup.series[0].data[0].name = res.league[0].name;
                    this.lessonGroup.series[0].data[0].value = res.league[0].make;
                    this.lessonGroup.series[0].data[1].name = res.league[1].name;
                    this.lessonGroup.series[0].data[1].value = res.league[1].attend;

                    /*私教*/
                    this.lessonTrainer.series[0].data[0].name = res.league[0].name;
                    this.lessonTrainer.series[0].data[0].value = res.league[0].make;
                    this.lessonTrainer.series[0].data[1].name = res.league[1].name;
                    this.lessonTrainer.series[0].data[1].value = res.league[1].attend;
                }).catch(res =>{
                    console.log(res);
                });
            },

            /*获取  营收业绩 收支统计 数据*/
            getPerformance(){
                IndexPerformance().then(res => {
                    // console.log(res);
                    // let add =
                    let incomeData = res;
                    this.incomeTotal = res[6].price;
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
                    // console.log(res);
                    let xArr= res[0].value.split(',');
                    this.comeIn.xAxis.data = xArr;

                    let conmArr1 = res[1].value.split(',');
                    let conmArr2 = res[2].value.split(',');
                    let conmArr3 = res[3].value.split(',');

                    this.comeIn.series[0].name = res[1].name;
                    this.comeIn.series[0].data = conmArr1;
                    this.comeIn.series[1].name = res[2].name;
                    this.comeIn.series[1].data = conmArr2;
                    this.comeIn.series[2].name = res[3].name;
                    this.comeIn.series[2].data = conmArr3;

                }).catch(res =>{
                    console.log(res);
                });
            },



            /*修改数据*/
            changeData(e) {
                console.log('11');
            },
            /*在场人数 时间选中*/
            truePresent() {
                console.log(this.datePresent);
            },
            /*课程分析 时间选中*/
            trueLesson() {
                console.log(this.dateLesson);
            },
            /*收入趋势 时间选中*/
            trueComeinTotal() {
                console.log(this.dateComeinTotal);
            },
            /*收入趋势 时间选中*/
            trueComein() {
                console.log(this.dateComein[0]);
                console.log(this.dateComein[1]);
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
        components: {
            eCharts
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

<style scoped lang="scss">
    @import "@/assets/css/index.scss";
    iframe {
        width: 100%;
        min-height: 100vh;
    }
</style>

