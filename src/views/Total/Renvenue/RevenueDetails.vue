<template>
    <div>
        <navBread @GoBack="goBack('revenueListD','revenueDetails')" breadTitle="营收详细"
                  :breadContent1="RevenueData.name+'营收详情'"></navBread>
        <div class="PTdetail-main">
            <div class="detail-box" style="padding: 20px;">
                <!--saler 筛选-->
                <div class="pt-screen">
                    <el-date-picker
                            value-format="yyyy-MM"
                            class="month-inp"
                            v-model="searchVal.date"
                            type="month"
                            placeholder="选择月">
                    </el-date-picker>
                    <el-button icon="el-icon-search" @click="btnSeaSaler" class="btn-public" :loading="loadState.searchLoad">搜索</el-button>
                </div>

                <!--表格-->
                <el-table class="pub-table" :data="revenueDetails" border>
                    <el-table-column prop="true_name" label="会员名"></el-table-column>
                    <el-table-column prop="sex" label="性别">
                        <template slot-scope="scope">
                            <div v-if="scope.row.sex == 0 ">未知</div>
                            <div v-if="scope.row.sex == 1 ">男</div>
                            <div v-if="scope.row.sex == 2 ">女</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone" label="电话"></el-table-column>
                    <el-table-column prop="order_name" label="名称"></el-table-column>
                    <el-table-column prop="real_price" label="金额"></el-table-column>
                    <el-table-column prop="order_time" label="时间">
                        <template slot-scope="scope">
                            <div class="status-connect">{{scope.row.order_time | dateFormat}}</div>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                        background
                        layout="prev, pager, next,total,jumper"
                        :total="pageTotal"
                        :page-size ="searchVal.total"
                        @current-change="PageCurrent">
                </el-pagination>

            </div>
        </div>
    </div>
</template>

<script>
    import {revenueDetails} from '@/assets/js/api' /*引用 营收总览 接口*/
    import navBread from '@/components/navBread/navBread'
    export default {
        name: "RevenueDetails",
        props:{
            RevenueData:{
                type:Object,
            }
        },
        data() {
            return {
                loadState:{
                    searchLoad:false,  //搜索按钮状态
                },

                revenueDetails:[],  //详情 数组

                pageTotal: 10 ,
                searchVal:{   //请求参数数组
                    zmtek_ver:2,
                    id:this.RevenueData.id,
                    date:'',
                    total:10,   //页面显示数
                    p:1,       //页码
                }
            }
        },
        methods: {
            /*获取详情接口*/
            getRevenueDetails() {
                revenueDetails(this.searchVal).then(res => {
                    console.log(res);
                    this.pageTotal = Number(res.data.totalRows);
                    this.searchVal.total = Number(res.data.listRows);
                    this.revenueDetails = res.data.list;
                }).catch(res => {
                    console.log(res);
                });
            },

            /*搜索筛选*/
            btnSeaSaler(e){
                if(!this.searchVal.date){
                    this.$message.warning('请选择月份');
                    this.GLOBAL.btnStateChange(this,'loadState','searchLoad',false);
                    return
                }
                this.GLOBAL.btnStateChange(this,'loadState','searchLoad');
                // this.searchVal.personal_id = '';//教练id 为空
                this.getRevenueDetails();
            },

            /*返回上一页*/
            goBack(){
                this.$emit('GoBack');
            },

            /*分页*/
            PageCurrent(page) {
                console.log(page);
                this.searchVal.p = page;
                this.getRevenueDetails();
            },
        },
        created() {
            this.getRevenueDetails();
        },
        components: {
            navBread
        },
    }
</script>
