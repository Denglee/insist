<template>
    <div :class="ptSalesPage == 10 ? 'layoutR-main' : '' ">
        <div class="detail-box">
            <header class="index-item-title flex-between">
                <div class="title">销售额查询 {{ptSalesPage}}</div>
                <div class="vipNav-rBox">
                    <monthSceen  @getMonthScreen="getMonthScreen"></monthSceen>
                    <el-button v-show="ptSalesPage == 5" class="btn-ptMore" @click="btnTotalMore('tabPaneState','ptSalesD')">
                        更多 <i class="el-icon-arrow-right"></i>
                    </el-button>
                </div>
            </header>
            <div class="ptTable-assist">

                <!--员工列表 筛选-->
                <div class="pt-screen">
                    <!--在职-->
                    <el-select v-model="tableStaff.sex"  placeholder="是否在职" class="inp-mar14 ptSel-section">

                    </el-select>

                </div>


                <!--员工列表 表格-->
                <el-table class="pub-table" :data="tableStaff" border>
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="sex" label="性别">
                        <template slot-scope="scope">
                            <div v-if="scope.row.sex == 0 " class="status-connect">未知</div>
                            <div v-if="scope.row.sex == 1 " class="status-break">男</div>
                            <div v-if="scope.row.sex == 2 " class="status-break">女</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="部门" prop="group_name"></el-table-column>
                    <el-table-column label="班次" prop="classes">
                        <template slot-scope="scope">
                            <div v-if="scope.row.classes == 1">正班</div>
                            <div v-if="scope.row.classes == 2">早班</div>
                            <div v-if="scope.row.classes == 3">中班</div>
                            <div v-if="scope.row.classes == 4">晚班</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone" label="电话"></el-table-column>
                    <el-table-column prop="user_no" label="工号"></el-table-column>
                    <el-table-column prop="deduction_type" label="提成方式"></el-table-column>
                    <el-table-column prop="register_time" label="创建时间">
                        <template slot-scope="scope">
                            <div class="status-connect">{{scope.row.register_time | dateFormat}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lock" label="状态">
                        <template slot-scope="scope">
                            <div v-if="scope.row.lock == 0 " class="status-connect">在职</div>
                            <div v-if="scope.row.lock == 1 " class="status-break">离职</div>
                        </template>
                    </el-table-column>
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
    import {staffIndex} from '@/assets/js/api' /*引用 会员总览 接口*/
    export default {
        name: "statisDetails",
        props:{
            ptSalesPage:{
                type:Number,
            },
        },
        data() {
            return {
                tableStaff: [], //员工列表数组
            }
        },
        methods: {
            /*员工列表接口*/
            getStaffIndex(){
                staffIndex({
                    p:1,
                    zmtek_ver:2,
                    user_type:'10000',
                    phone:'',
                    lock:1,
                }).then(res => {
                    console.log(res.data.list);
                    if(res.status ==1){
                        this.tableStaff = res.data.list;
                        this.pageTotalRows = Number(res.data.totalRows);
                        this.pageListRows = res.data.listRows;
                    }
                }).catch(res => {
                    console.log(res);
                });
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
            this.getStaffIndex();
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