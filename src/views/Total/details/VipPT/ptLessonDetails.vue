<template>
    <div :class="ptSalesPage == 10 ? 'PTdetail-main' : '' ">
        <div class="detail-box">
            <header class="index-item-title flex-between">
                <div class="title">私教上课详情</div>
                <div class="vipNav-rBox">
                    <monthSceen  @getMonthScreen="getMonthScreen"></monthSceen>
                    <!--<el-button v-show="ptSalesPage == 5" class="btn-ptMore" @click="btnTotalMore('tabPaneState','ptLessonD')">
                        更多 <i class="el-icon-arrow-right"></i>
                    </el-button>-->
                </div>
            </header>
            <div class="ptTable-assist">

                <!--saler 筛选-->
                <!--<div class="pt-screen">
                    <el-input placeholder="请输入姓名或电话号码" v-model="searchVal.search" class="pt-screen-input" clearable></el-input>
                    <el-button icon="el-icon-search" @click="btnSeaSaler" class="btn-public" :loading="searchLoad">搜索</el-button>
                </div>-->

                <!--表格-->
                <el-table class="pub-table" :data="salerDetInfo" border>
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column prop="true_name" label="会员" ></el-table-column>
                    <el-table-column prop="sex" label="性别">
                        <template slot-scope="scope">
                            <div v-if="scope.row.sex == 0 ">未知</div>
                            <div v-if="scope.row.sex == 1 ">男</div>
                            <div v-if="scope.row.sex == 2 ">女</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone" label="电话" ></el-table-column>
                    <el-table-column prop="card_name" label="会员卡"></el-table-column>
                    <el-table-column prop="dec_price" label="价格"></el-table-column>
                    <el-table-column prop="name" label="教练"></el-table-column>
                    <el-table-column prop="control_time" label="时间">
                        <template slot-scope="scope">
                            <div class="status-connect">{{scope.row.control_time | dateFormat}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="record" label="备注"></el-table-column>
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
    import monthSceen from '@/components/monthSceen/monthSceen'  //7天时间筛选组件
    import {PTperNumPriparticulars} from '@/assets/js/api' /*引用  接口*/
    export default {
        name: "ptLessonDetails",  //私教课程详情
        props:{
            ptSalesPage:{
                type:Number,
            },
        },
        data() {
            return {
                searchLoad:false,  //搜索按钮 load 状态
                salerDetInfo: [], //销售额数组
                salerGropu:[], //部门

                pageTotal:10,   //总条目数
                searchVal:{   //销售额参数数组
                    zmtek_ver:2,
                    day:4,  //1 = 今天 2 = 昨天  3 = 过去七天  4 = 过去三十天
                    date:'',
                    personal_id:'',
                    total:this.ptSalesPage,   //页面显示数
                    p:1,       //页码
                    search:'',
                }
            }
        },
        methods: {
            /*上课查询*/
            getPTSaleroom(){
                PTperNumPriparticulars(this.searchVal).then(res => {
                    console.log(res.data);
                    if(res.status ==1){
                        this.salerDetInfo = res.data.list;
                        this.searchVal.total = Number(res.data.listRows);
                        this.pageTotal = Number(res.data.totalRows);
                    }
                    if(res.status ==0){
                        this.$message({
                            message: res.info,
                            type: 'warning',
                            duration: 1500,
                            offset: 100,
                        });
                    }
                    this.searchLoad = false;
                }).catch(res => {
                    console.log(res);
                    if(res.status ==1){
                        console.log(res.data);
                    }
                });
            },


            /*七天 日期筛选*/
            getMonthScreen(val){
                console.log(val);
                if(val.time){
                    console.log(val.time);
                    this.searchVal.day =val.time;
                    this.searchVal.date = '';
                }
                if(val.day){    //传月份
                    console.log(val.day);
                    this.searchVal.day = '';
                    this.searchVal.date = val.day;
                }
                this.getPTSaleroom();
            },

            /*查看更多*/
            btnTotalMore(){
                this.$emit('btnTotalMore');
            },


            /*搜索筛选*/
            btnSeaSaler(){
                this.searchLoad = true;
                // this.searchVal.personal_id = '';//教练id 为空
                this.getPTSaleroom();
            },

            /*分页*/
            PageCurrent(page) {
                console.log(page);
                this.searchVal.p = page;
                this.getPTSaleroom();
                // this.staffPage = page;
            },

        },

        created() {
            let personal_id = sessionStorage.getItem('personalId');
            this.searchVal.personal_id = personal_id;

            this.getPTSaleroom();
        },
        components: {
            monthSceen,
        },
    }
</script>
