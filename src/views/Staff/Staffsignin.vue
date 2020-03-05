<template>
    <div class="layoutR-main">

        <el-tabs v-model="activeName" class="vip-tabBox pubWidth" id="staffPay-tabBox">
            <!--tab2 班次设置-->
            <el-tab-pane :lazy='tabLazy' label="班次设置" name="StaffRoyalty">

            </el-tab-pane>

            <!--tab1 打卡记录-->
            <el-tab-pane :lazy='tabLazy' label="打卡记录" name="StaffSalary">

                <!--打卡记录筛选-->
                <form class="pt-screen">
                    <el-input placeholder="请输入会员姓名、电话" v-model="staffName" class="inp-mar14 pt-screen-input" clearable></el-input>
                    <el-date-picker placeholder="请选择月份" class="inp-mar14 month-inp" v-model="staffMonth" type="month" value-format="yyyy-MM"></el-date-picker>
                    <el-button icon="el-icon-search" @click="btnSeaStaffSignin" class="btn-search">搜索</el-button>

                    <a href=""></a>
                    <el-button icon="el-icon-notebook-1" @click="singExport" class="btn-search fr">导出</el-button>
                </form>

                <!--打卡记录 表格-->
                <div class="">
                    <table class="staffSign-table">
                        <thead>
                            <tr class="thead">
                                <th class="cell">姓名</th>
                                <th v-for="(item,index) in signStaffList" :key="index">
                                    <div class="cell">{{item.name}}</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="cell">统计</td>
                                <td v-for="(item,index) in signStaffList" :key="index">
                                    <div class="cell sign-up">上班：{{item.up}}天</div>
                                    <div class="cell sign-rest">休息：{{item.rest}}天</div>
                                    <div class="cell sign-warn"><i class="el-icon-warning"></i>异常：{{item.abnormal}}天</div>
                                </td>
                            </tr>
                            <tr v-for="(item,index) in signStaffDate" :key="index">
                                <td >
                                    <div class="cell">{{item.day}}</div>
                                </td>
                                <td v-for="(item2,index2) in item.check" :key="index2">
                                    <div class="cell clock-in">{{item2.clockin}}</div>
                                    <div class="cell clock-out">{{item2.clockout}}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="page-assist">
                        <el-pagination
                                background
                                layout="prev, pager, next,total,jumper"
                                :total="pageTotalRows"
                                :page-size ="pageListRows"
                                @current-change="PageCurrent">
                        </el-pagination>
                    </div>
                </div>

            </el-tab-pane>

        </el-tabs>

    </div>
</template>

<script>
    import {staffSignin,staffSigninExcel} from '@/assets/js/api' /*引用 考勤 接口*/
    export default {
        name: "Staffsignin",
        data() {
            return {
                activeName: 'StaffSalary', //StaffSalary StaffRoyalty
                tabLazy: true,
                formLabelWidth: '120px',

                signStaffList:[],  //签到 员工  列表
                signStaffDate:[],  //签到 日期

                /*筛选*/
                staffName:"",  //名字
                staffMonth:"",  //月份

                pageTotalRows:0,  /*分页总数*/
                pageListRows:0,  /*分页 每页数*/
                staffPage:1,     /*分页 页码*/

            }
        },
        methods: {

            /*考勤*/
            getStaffSignin(){
                staffSignin({
                    zmtek_ver:2,
                    p:this.staffPage,
                    keywords:this.staffName,
                    starttime:this.staffMonth,
                }).then(res => {
                    if(res.status ==1){
                        console.log(res);
                        this.signStaffList = res.data.staff.list;
                        this.signStaffDate = res.data.date;
                        this.pageTotalRows = Number(res.data.staff.totalRows);  /*分页总数*/
                        this. pageListRows= res.data.staff.listRows;  /*分页 每页数*/
                    }
                }).catch(res => {
                    console.log(res);
                });
            },

            /*考勤 搜索*/
            btnSeaStaffSignin(){
                this.staffPage = 1;
                this.getStaffSignin();
            },
            /*分页*/
            PageCurrent(page){
                this.staffPage = page;
                this.getStaffSignin();
            },
            /*考勤 导出*/
            singExport(){
                let localUrl = this.GLOBAL.localUrl;
                let page = this.staffPage;
                let keywords = this.staffName;
                let staffMonth = this.staffMonth;
                if( staffMonth ==''){
                    staffMonth = this.$moment().format('YYYY-MM');
                }
                // http://vikily.f3322.net:20000/staff/excel_sign.html?starttime=2020-03-01&keywords=&user_type=10000&p=1
                let downUrl = localUrl + '/staff/excel_sign.html?zmtek_ver=2&p='+page+'&keywords='+keywords+'&starttime='+staffMonth;
                console.log(downUrl);
                window.location.href =downUrl;
            },
        },
        created() {
            this.getStaffSignin();
        },
    }
</script>

<style lang="scss" >
    @import "@/assets/css/staff.scss";


</style>