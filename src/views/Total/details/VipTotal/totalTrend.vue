<template>
    <div class="PTdetail-main">
        <div class="detail-box detail-padding">
            <div>
                <el-button icon="el-icon-search"  @click="$emit('GoBack')" class="btn-public" :loading="btnState.refushLoad">返回</el-button>
                <el-button icon="el-icon-search" @click="btnRefush" class="btn-public" :loading="btnState.refushLoad">刷新</el-button>
            </div>

            <el-table
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

        name: "totalTrend",  //客流走势详情
        data() {
            return {
                btnState:{
                    refushLoad:false,
                },
                dayTrend:'',  //日期选择

                num:0,
                data:"xiangduole",

                total:[
                    { time:'2020-05-26', name:"汇金店", personNnm:223, lessonNum:0, orderNum:0, signNum:0, trainerNum:10, orderNum2:0, lessonNum2:0, signNum2:10, trainerNum2:0},
                    { time:'2020-05-27', name:"现代美居广场店", personNnm:223, lessonNum:10, orderNum:0, signNum:10, trainerNum:0, orderNum2:10, lessonNum2:0, signNum2:10, trainerNum2:0},
                ],
            }
        },
        methods: {
            btnRefush(){
                this.reLoad();
            },
            btnSub(){
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
