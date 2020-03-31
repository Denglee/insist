<template>
    <div>
        <div class="vip-tabBox">
            <!--营收详细 筛选-->
            <div class="pt-screen">
                <el-select v-model="revenueDetails.projectChoose" placeholder="项目" class="inp-mar14 ptSel-section">
                    <el-option v-for="item in revenueProject" :key="item.index" :label="item.catname" :value="item.id"></el-option>
                </el-select>
                <el-date-picker
                        class="inp-mar14 month-inp"
                        v-model="revenueDetails.year"
                        type="year"
                        value-format="yyyy"
                        placeholder="选择年">
                </el-date-picker>
                <el-date-picker
                        value-format="yyyy-MM"
                        class="inp-mar14 month-inp"
                        v-model="revenueDetails.month"
                        type="month"
                        placeholder="选择月">
                </el-date-picker>
                <!--搜索-->
                <el-button icon="el-icon-search" @click="btnSeaDetail" class="btn-search" :loading="btnLoad.search">搜索</el-button>
            </div>
            <!--营收详细 表格-->
            <el-table class="pub-table" :data="detailList" border>
                <el-table-column prop="name" label="项目"></el-table-column>
                <el-table-column prop="total_number" label="数量"></el-table-column>
                <el-table-column prop="income" label="收入"></el-table-column>
                <el-table-column prop="refund_price" label="退款"></el-table-column>
                <el-table-column prop="total_price" label="合计"></el-table-column>

                <!--card_type   卡类型  1=期限卡 2=私教卡 3=游泳卡 4=滑雪储值卡-->
                <!--<el-table-column prop="lock" label="卡类型">
                    <template slot-scope="scope">
                        <div v-if="scope.row.lock == 0 " class="status-connect">在职</div>
                        <div v-if="scope.row.lock == 1 " class="status-break">离职</div>
                    </template>
                </el-table-column>-->
                <el-table-column label="流水">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="lookDetail(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--<el-pagination
                    background
                    layout="prev, pager, next,total,jumper"
                    :total="revenuePage.pageTotal"
                    :page-size ="revenuePage.pageSize"
                    @current-change="PageCurrent">
            </el-pagination>-->
        </div>
    </div>
</template>

<script>
    import {revenueTotal,revenueRanking,revenuePayMethod,
        revenueContract} from '@/assets/js/api' /*引用 营收总览 接口*/
    export default {

        inject:['reLoad'],
        name: "StatisRevenueDetails",
        data() {
            return {
                btnLoad:{
                  search:false,
                },

                /*营收详情 */
                revenueProject : [],
                revenueDetails:{
                    projectChoose:'',  //项目筛选
                    month:'',    //月份筛选
                    year:'',     //年筛选
                },
                detailList:[], //详情table数据
            }
        },
        methods: {
            /*二、营收详情*/
            getRevenueContract() {
                revenueContract({
                    type:this.revenueDetails.projectChoose,
                }).then(res => {
                    console.log(res);
                    this.detailList = res.data;   //项目
                    this.revenueProject = res.list;  //表格数据

                    // this.hasAxios.revenueDetails = true;  //是否调用接口状态
                }).catch(res => {
                    console.log(res);
                });
            },

            /*2.12、查看流水*/
            lookDetail(index, row){
                console.log(index);
                console.log(row);
            },

            /*2.2 搜索 筛选*/
            btnSeaDetail(){
                this.btnLoad.search = true;
                console.log(this.revenueDetails);
                setTimeout(()=>{
                    this.btnLoad.search = false;
                },1500);
               /* this.getRevenueContract();*/
            },



            /*2.3 分页*/
            /*PageCurrent(page){
                console.log(page);
            },*/

        },
        created() {
            this.getRevenueContract();
        },
    }
</script>

<style lang="scss">

</style>