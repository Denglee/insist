<template>
    <div :class="ptSalesPage == 10 ? 'PTdetail-main' : '' ">
        <div class="detail-box">
            <header class="index-item-title flex-between">
                <div class="title">私教数量查询</div>
                <div class="vipNav-rBox">
                    <monthSceen  @getMonthScreen="getMonthScreen"></monthSceen>
                    <el-button v-show="ptSalesPage == 5" class="btn-ptMore" @click="btnTotalMore('tabPaneState','ptNumD')">
                        更多 <i class="el-icon-arrow-right"></i>
                    </el-button>
                </div>
            </header>
            <div class="ptTable-assist">

                <!--saler 筛选-->
                <div class="pt-screen">
                    <!--部门-->
                    <el-select v-model="searchVal.group" placeholder="请选择部门" class="ptSel-section">
                        <el-option v-for="item in salerGropu" :key="item.index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-input placeholder="请输入姓名或电话号码" v-model="searchVal.search" class="pt-screen-input" clearable></el-input>
                    <el-button icon="el-icon-search" @click="btnSeaSaler" class="btn-public" :loading="searchLoad">搜索</el-button>
                </div>

                <!--表格-->
                <el-table class="pub-table" :data="salerInfo" border>
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="gname" label="部门" ></el-table-column>
                    <el-table-column prop="mem_count" label="会员数"></el-table-column>
                    <el-table-column prop="ufo_count" label="跟进"></el-table-column>
                    <el-table-column prop="dfo_count" label="未跟进"></el-table-column>
                    <el-table-column prop="ren_count" label="续课"></el-table-column>
                    <el-table-column prop="tra_count" label="转让"></el-table-column>
                    <el-table-column prop="ref_count" label="退款"></el-table-column>
                    <el-table-column prop="pas_count" label="过期"></el-table-column>
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
    import {PTclassNumber} from '@/assets/js/api' /*引用  接口*/
    export default {
        name: "ptClassNumber",  //私教数量查询
        props:{
            ptSalesPage:{
                type:Number,
            },
            salerGropu:{
                type:Array,
            }
        },
        data() {
            return {
                searchLoad:false,  //搜索按钮 load 状态
                salerInfo: [], //销售额数组

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
            /*数量详情*/
            getPTSaleroom(){
                PTclassNumber(this.searchVal).then(res => {
                    console.log(res.data);
                    if(res.status ==1){
                        this.salerInfo = res.data.list;
                        this.searchVal.total = Number(res.data.listRows);
                        this.pageTotal = Number(res.data.totalRows);
                    }
                    this.searchLoad = false;
                }).catch(res => {
                    console.log(res);
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
