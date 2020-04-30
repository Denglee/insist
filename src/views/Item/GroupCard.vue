<template>
    <div class="contain-public">
        <div class="ptTable-assist bgWhite">

            <!--saler 筛选-->
            <div class="pt-screen">
                <!--部门-->
                <el-select  filterable v-model="searchVal.group" placeholder="请选择部门" class="ptScreen-select">
                    <el-option v-for="item in salerGropu" :key="item.index" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-input placeholder="请输入姓名或电话号码" v-model="searchVal.search" class="ptScreen-input" clearable></el-input>
                <el-button icon="el-icon-search" @click="btnSeaSaler" class="btn-public" :loading="btnState.searchLoad">搜索</el-button>
            </div>

            <!-- 表格-->
            <el-table class="pub-table" :data="saleRoomInfo" border>
                <el-table-column type="index" label="序号" width="50px"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="gname" label="部门" ></el-table-column>
                <el-table-column prop="phone" label="电话"></el-table-column>
                <el-table-column prop="price" label="销售额"></el-table-column>
                <el-table-column prop="register_time" label="时间"></el-table-column>
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
</template>

<script>

    import {PTperNumPriparticulars} from '@/assets/js/api' /*引用  接口*/

    export default {
        name: "ItemGroupCard",  //健身工厂 团购卡
        data() {
            return {
                pageTotal:10,   //总条目数
                btnState:{
                    searchLoad:false,
                },
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

        },
    }
</script>
