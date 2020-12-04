<template>
    <div :class="ptSalesPage == 10 ? 'PTdetail-main' : '' ">
        <div class="detail-box">
            <header class="index-item-title flex-between">
                <div class="title">期限提醒</div>
                <div class="vipNav-rBox">
                    <el-button v-show="ptSalesPage == 5" class="btn-ptMore"
                               @click="btnTotalMore('tabPaneState','termExpireD')">
                        更多 <i class="el-icon-arrow-right"></i>
                    </el-button>
                </div>
            </header>
            <div class="ptTable-assist">

                <!--saler 筛选-->
                <div class="pt-screen">
                    <!--部门-->
                    <el-select  filterable v-model="searchVal.ship_id" placeholder="请选择卡种" class="ptScreen-select">
                        <el-option v-for="( item, index ) in shipCard" :key="index" :label="item.name" :value="item.ship_id"></el-option>
                    </el-select>
                    <el-input placeholder="剩余多少次过期" v-model="searchVal.keywords" class="ptScreen-input"
                              clearable></el-input>
                    <el-button icon="el-icon-search" @click="btnSeaSaler" class="btn-public"
                               :loading="btnState.searchLoad">搜索
                    </el-button>
                </div>

                <!-- 表格-->
                <el-table class="pub-table" :data="saleRoomInfo" border>
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column prop="true_name" label="会员信息"></el-table-column>
                    <el-table-column prop="phone" label="手机号"></el-table-column>
                    <el-table-column prop="card_name" label="卡种名称"></el-table-column>
                    <el-table-column prop="card_status" label="合同状态">
                        <!--合同状态 1=预备，2=有效，3=冻结，4=过期 ，5=无效-->
                        <template slot-scope="scope">
                            <div v-if="scope.row.card_status == 1 " class="ptContract-status1">预备</div>
                            <div v-if="scope.row.card_status == 2 " class="ptContract-status2">有效</div>
                            <div v-if="scope.row.card_status == 3 " class="ptContract-status3">冻结</div>
                            <div v-if="scope.row.card_status == 4 " class="ptContract-status4">过期</div>
                            <div v-if="scope.row.card_status == 5 " class="ptContract-status5">无效</div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="contract_number" label="合同编号"></el-table-column>
                    <el-table-column prop="card_time" label="签约日期">
                        <template slot-scope="scope">
                            <div class="status-connect">{{scope.row.card_time | dateFormat}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="activation_time" label="开始日期">
                        <template slot-scope="scope">
                            <div class="status-connect">{{scope.row.activation_time | dateFormat}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="limit_time" label="结束日期">
                        <template slot-scope="scope">
                            <div class="status-connect">{{scope.row.limit_time | dateFormat}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="diff" label="剩余天数">
                        <template slot-scope="scope">
                            <div class="ptContract-diff">{{scope.row.day}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operator" label="录入人"></el-table-column>
                </el-table>

                <el-pagination
                        background
                        layout="prev, pager, next,total,jumper"
                        :total="pageTotal"
                        :page-size="searchVal.total"
                        @current-change="PageCurrent">
                </el-pagination>

            </div>
        </div>
    </div>
</template>

<script>
    import {PTexpireReminder} from '@/assets/js/api' /*引用  接口*/
    export default {
        name: "MBexpireTerm",  //期限到期提醒
        props: {
            ptSalesPage: {
                type: Number,
            },
            salerGropu: {
                type: Array,
            }
        },
        data() {
            return {
                btnState: {
                    searchLoad: false,  //搜索按钮 load 状态
                },

                saleRoomInfo: [], //销售额数组

                shipCard:[],  //卡数组
                pageTotal: 10,   //总条目数
                searchVal: {   //销售额参数数组
                    zmtek_ver: 2,
                    total: this.ptSalesPage,   //页面显示数
                    p: 1,       //页码
                    keywords: '',  //用户输入
                    ship_id: '',   //卡id
                }
            }
        },
        methods: {
            /*销售额查询*/
            getPTSaleroom() {
                PTexpireReminder(this.searchVal).then(res => {
                    console.log(res.data);
                    if (res.status == 1) {
                        this.saleRoomInfo = res.data.list;
                        this.shipCard = res.data.shiplist;
                        this.searchVal.total = Number(res.data.listRows);
                        this.pageTotal = Number(res.data.totalRows);
                    }
                }).catch(res => {
                    console.log(res);
                    if (res.status == 1) {
                        console.log(res.data);
                    }
                });
            },

            /*七天 日期筛选*/
            getMonthScreen(val) {
                console.log(val);
                if (val.time) {
                    console.log(val.time);
                    this.searchVal.day = val.time;
                    this.searchVal.date = '';

                }
                if (val.day) {    //传月份
                    console.log(val.day);
                    this.searchVal.day = '';
                    this.searchVal.date = val.day;
                }
                this.getPTSaleroom();
            },

            /*查看更多*/
            btnTotalMore() {
                this.$emit('btnTotalMore');
            },

            /*搜索筛选*/
            btnSeaSaler() {
                this.GLOBAL.btnStateChange(this, 'btnState', 'searchLoad')
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
    }
</script>
