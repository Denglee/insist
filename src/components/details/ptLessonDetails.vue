<template>
    <div :class="ptSalesPage == 10 ? 'layoutR-main' : '' ">
        <div class="detail-box">
            <header class="index-item-title flex-between">
                <div class="title">私教会员上课详情 {{ptSalesPage}}</div>
                <div class="vipNav-rBox">
                    <monthSceen  @getMonthScreen="getMonthScreen"></monthSceen>
                    <el-button v-show="ptSalesPage == 5" class="btn-ptMore" @click="btnTotalMore('tabPaneState','ptLessonD')">
                        更多 <i class="el-icon-arrow-right"></i>
                    </el-button>
                </div>
            </header>
            <div class="ptTable-assist">

                <!--筛选-->
                <div class="pt-screen">
                    <el-input placeholder="请输入姓名或电话号码" v-model="staffInpVal" class="inp-mar14 pt-screen-input" clearable></el-input>
                    <!--搜索-->
                    <el-button icon="el-icon-search" @click="btnSeaStaff" class="btn-search">搜索</el-button>
                </div>

                <!-- 表格-->
                <el-table class="pub-table" :data="PTVipTable" border>
                    <el-table-column type="index"></el-table-column>
                    <el-table-column prop="user_name" label="姓名"></el-table-column>
                    <el-table-column prop="user_sex" label="性别">
                        <template slot-scope="scope">
                            <div v-if="scope.row.user_sex == 0 " class="status-connect">未知</div>
                            <div v-if="scope.row.user_sex == 1 " class="status-break">男</div>
                            <div v-if="scope.row.user_sex == 2 " class="status-break">女</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="user_phone" label="电话"></el-table-column>
                    <el-table-column prop="course_name" label="课程"></el-table-column>
                    <el-table-column prop="staff_name" label="教练"></el-table-column>
                </el-table>

                <el-pagination
                        background
                        layout="prev, pager, next,total,jumper"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import monthSceen from '@/components/monthSceen/monthSceen'  //7天时间筛选组件
    import {PTMemberClass} from '@/assets/js/api' /*引用 会员总览 接口*/
    export default {
        name: "statisDetails",
        props:{
            ptSalesPage:{
                type:Number,
            },
        },
        data() {
            return {
                PTVipTable: [], //员工列表数组
                staffInpVal:'',
            }
        },
        methods: {

            /*私教上课详情*/
            getPTMemberClass() {
                PTMemberClass({
                    curpage:1,
                    pageSize:5,
                }).then(res => {
                    console.log(res.data);
                    for(let i in res.data){
                        this.PTVipTable.push(res.data[i]);
                    }

                }).catch(err => {
                    console.log(err);
                });
            },

            btnSeaStaff(){
                console.log(this.staffInpVal);
            },

            /*七天 日期筛选*/
            getMonthScreen(data){
                console.log(data);
            },

            btnTotalMore(){
                this.$emit('btnTotalMore');
            },

        },

        created() {
            this.getPTMemberClass();
        },
        components: {
            monthSceen,
        },
    }
</script>
@import "@/assets/css/totalVip.scss";
<style lang="scss" scoped>
    .layoutR-main{
        .detail-box{
            background-color: #fff;
            min-height: 60vh;
            width: calc(100% - 40px);
            margin: 20px auto;
            border-radius: 20px;
            padding-bottom: 20px;
        }
    }
</style>