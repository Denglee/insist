<template>
    <div class="totalOffice-box">
        <header class="index-item-title flex-between">总店</header>
        <div class="detail-box detail-padding">

            <!--筛选-->
            <div class="pt-screen">
                <el-input placeholder="请输入姓名或电话号码" v-model="searchVal.search" class="ptScreen-input" clearable></el-input>

                <el-date-picker
                        v-model="dayTrend"
                        type="daterange"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        calss="ptScreen-select">
                </el-date-picker>

                <el-button icon="el-icon-search" @click="btnSeaSaler" class="btn-public" :loading="loadState.searchLoad">搜索</el-button>

            </div>

            <el-table
                    class="pub-table"
                    :data="total"
                    style="width: 100%">
                <el-table-column
                        prop="time"
                        label="时间">
                </el-table-column>

                <el-table-column
                        prop="name"
                        label="门店">
                </el-table-column>

                <el-table-column
                        prop="personNnm"
                        label="入场人数">
                </el-table-column>

                <el-table-column label="团课" style="text-align: center;">
                    <el-table-column
                            prop="lessonNum"
                            label="上课节数">
                    </el-table-column>
                    <el-table-column
                            prop="orderNum"
                            label="签约人数">
                    </el-table-column>
                    <el-table-column
                            prop="signNum"
                            label="签到人数">
                    </el-table-column>
                    <el-table-column
                            prop="trainerNum"
                            label="上课教练数">
                    </el-table-column>
                </el-table-column>

                <el-table-column label="私教">
                    <el-table-column
                            prop="orderNum2"
                            label="预约人数">
                    </el-table-column>
                    <el-table-column
                            prop="lessonNum2"
                            label="预约节">
                    </el-table-column>
                    <el-table-column
                            prop="signNum2"
                            label="签到人数">
                    </el-table-column>
                    <el-table-column
                            prop="signNum2"
                            label="签到节数">
                    </el-table-column>
                    <el-table-column
                            prop="trainerNum2"
                            label="上课教练数">
                    </el-table-column>
                </el-table-column>

            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        inject:['reLoad'], //注入依赖 App 中的reLoad方法

        name: "totalOffice",  //客流走势详情
        data() {
            return {



                num:0,
                data:"xiangduole",

                total:[
                    { time:'2020-05-26', name:"汇金店", personNnm:223, lessonNum:0, orderNum:0, signNum:0, trainerNum:10, orderNum2:0, lessonNum2:0, signNum2:10, trainerNum2:0},
                    { time:'2020-05-26', name:"汇金店", personNnm:223, lessonNum:0, orderNum:0, signNum:0, trainerNum:10, orderNum2:0, lessonNum2:0, signNum2:10, trainerNum2:0},
                    { time:'2020-05-26', name:"汇金店", personNnm:223, lessonNum:0, orderNum:0, signNum:0, trainerNum:10, orderNum2:0, lessonNum2:0, signNum2:10, trainerNum2:0},
                    { time:'2020-05-26', name:"汇金店", personNnm:223, lessonNum:0, orderNum:0, signNum:0, trainerNum:10, orderNum2:0, lessonNum2:0, signNum2:10, trainerNum2:0},
                    { time:'2020-05-27', name:"现代美居广场店", personNnm:223, lessonNum:10, orderNum:0, signNum:10, trainerNum:0, orderNum2:10, lessonNum2:0, signNum2:10, trainerNum2:0},
                ],

                loadState:{
                    searchLoad:false,  //搜索按钮 load 状态
                },

                dayTrend:'',  //日期选择
                pageTotal:10,   //总条目数
                searchVal:{   //销售额参数数组
                    zmtek_ver:2,
                    day:4,  //1 = 今天 2 = 昨天  3 = 过去七天  4 = 过去三十天
                    date:'',
                    group:'',
                    total:this.ptSalesPage,   //页面显示数
                    p:1,       //页码
                    search:'',


                }
            }
        },
        methods: {
            btnRefush(){
                this.reLoad();
            },

            btnSeaSaler(){
                console.log(this.dayTrend);
            },



        },
        destroyed(){
            // sessionStorage.removeItem('statisShowDetail');
        },
        created() {

        },
    }
</script>

