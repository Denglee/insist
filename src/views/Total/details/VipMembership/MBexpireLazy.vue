<template>
    <div :class="ptSalesPage == 10 ? 'PTdetail-main' : '' ">
        <div class="detail-box">
            <header class="index-item-title flex-between">
                <div class="title">懒惰提醒</div>
                <div class="vipNav-rBox">
                    <el-button v-show="ptSalesPage == 5" class="btn-ptMore"
                               @click="btnTotalMore('tabPaneState','laztExpireD')">
                        更多 <i class="el-icon-arrow-right"></i>
                    </el-button>
                </div>
            </header>
            <div class="ptTable-assist">

                <!--saler 筛选-->
                <div class="pt-screen">
                    <el-input placeholder="会员姓名、电话" v-model="searchVal.keywords" class="pt-screen-input"
                              clearable></el-input>
                    <el-input placeholder="多少天未到场" v-model="searchVal.day" class="pt-screen-input"
                              clearable></el-input>
                    <el-button icon="el-icon-search" @click="btnSeaSaler" class="btn-public"
                               :loading="loadState.searchLoad">搜索
                    </el-button>
                </div>

                <!-- 表格-->
                <el-table class="pub-table" :data="saleRoomInfo" border>
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column prop="true_name" label="会员信息"></el-table-column>
                    <el-table-column prop="sex" label="性别">
                        <template slot-scope="scope">
                            <div v-if="scope.row.sex == 0 ">未知</div>
                            <div v-if="scope.row.sex == 1 ">男</div>
                            <div v-if="scope.row.sex == 2 ">女</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone" label="手机号"></el-table-column>
                    <el-table-column prop="card_status" label="会员状态">
                        <!--合同状态 1=预备，2=有效，3=冻结，4=过期 ，5=无效-->
                        <template slot-scope="scope">
                            <div v-if="scope.row.card_status == 1 " class="ptContract-status1">预备</div>
                            <div v-if="scope.row.card_status == 2 " class="ptContract-status2">有效</div>
                            <div v-if="scope.row.card_status == 3 " class="ptContract-status3">冻结</div>
                            <div v-if="scope.row.card_status == 4 " class="ptContract-status4">过期</div>
                            <div v-if="scope.row.card_status == 5 " class="ptContract-status5">无效</div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="saler_name" label="顾问"></el-table-column>
                    <el-table-column prop="personal_name" label="教练"></el-table-column>
                    <el-table-column prop="member_time" label="录入日期">
                        <template slot-scope="scope">
                            <div class="status-connect">{{scope.row.member_time | minuteFormat}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="day" label="多久未到场"></el-table-column>
                    <el-table-column prop="happen_time" label="最后入场时间">
                        <template slot-scope="scope">
                            <div class="status-connect">{{scope.row.happen_time | minuteFormat}}</div>
                        </template>
                    </el-table-column>
<!--                    <el-table-column prop="limit_time" label="结束日期">-->
<!--                        <template slot-scope="scope">-->
<!--                            <div class="status-connect">{{scope.row.limit_time | dateFormat}}</div>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
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
    import {PTexpireLazy} from '@/assets/js/api' /*引用  接口*/
    export default {
        name: "MBexpireLazy",  //懒惰到期提醒
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
                loadState: {
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
                    day: '',   //天数
                }
            }
        },
        methods: {
            /*销售额查询*/
            getPTSaleroom() {
                PTexpireLazy(this.searchVal).then(res => {
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
                this.GLOBAL.btnStateChange(this, 'loadState', 'searchLoad')
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
