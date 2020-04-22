<template>
    <div :class="ptSalesPage == 10 ? 'PTdetail-main' : '' ">
        <div class="detail-box">
            <header class="index-item-title flex-between">
                <div class="title">私教上课信息</div>
                <div class="vipNav-rBox">
                    <monthSceen  @getMonthScreen="getMonthScreen"></monthSceen>
                    <!--<el-button v-show="ptSalesPage == 5" class="btn-ptMore" @click="btnTotalMore('tabPaneState','ptLessonD')">
                        更多 <i class="el-icon-arrow-right"></i>
                    </el-button>-->
                </div>
            </header>
            <div class="ptTable-assist">

                <!--saler 筛选-->
                <div class="pt-screen">
                    <el-input placeholder="请输入姓名或电话号码" v-model="searchVal.search" class="pt-screen-input" clearable></el-input>
                    <el-button icon="el-icon-search" @click="btnSeaSaler" class="btn-public" :loading="searchLoad">搜索</el-button>
                </div>

                <!--表格-->
                <el-table class="pub-table edit-table" :data="salerLessonInfo" border>
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="count_num" label="上课数" ></el-table-column>
                    <el-table-column prop="sum_price" label="产生金额"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini"
                                    @click="lookPT(scope.$index, scope.row)">查看详情</el-button>
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
    import monthSceen from '@/components/monthSceen/monthSceen'  //7天时间筛选组件
    import {PTperNumPri} from '@/assets/js/api' /*引用  接口*/
    export default {
        name: "ptLessonTable",  //私教课程列表
        props:{
            ptSalesPage:{
                type:Number,
            },
        },
        data() {
            return {

                searchLoad:false,  //搜索按钮 load 状态
                salerLessonInfo: [], //销售额数组
                salerGropu:[], //部门

                pageTotal:10,   //总条目数
                searchVal:{   //销售额参数数组
                    zmtek_ver:2,
                    day:4,  //1 = 今天 2 = 昨天  3 = 过去七天  4 = 过去三十天
                    date:'2020-03',
                    group:'',
                    total:this.ptSalesPage,   //页面显示数
                    p:1,       //页码
                    search:'',
                }
            }
        },
        methods: {
            /*上课查询*/
            getPTSaleroom(){
                PTperNumPri(this.searchVal).then(res => {
                    console.log(res.data);
                    if(res.status ==1){
                        this.salerLessonInfo = res.data.list;
                        this.searchVal.total = Number(res.data.listRows);
                        this.pageTotal = Number(res.data.totalRows);
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

            /*查看详情*/
            lookPT(index,val){
                console.log(val.personal_id);
                sessionStorage.setItem('personalId',val.personal_id)
                this.$emit('btnTotalMore',('tabPaneState','ptLessonD'));
            },

            /*搜索筛选*/
            btnSeaSaler(){
                this.searchLoad = true;
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
            this.getPTSaleroom();
        },
        components: {
            monthSceen,
        },
    }
</script>
