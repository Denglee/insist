<template>
    <div class="layoutR-contain animated fadeIn">

        <el-tabs v-model="activeName" class="vip-tabBox pubWidth  tab-header" id="staffPay-tabBox" @tab-click="tabTotal">
            <!--tab1 打卡记录-->
            <el-tab-pane :lazy='tabLazy' label="打卡记录" name="StaffSalary">
                <!--打卡记录筛选-->
                <form class="pt-screen">
                    <el-input placeholder="请输入会员姓名、电话" v-model="staffName" class="ptScreen-input"
                              clearable></el-input>
                    <el-date-picker placeholder="请选择月份" class="month-picker" v-model="staffMonth" type="month"
                                    value-format="yyyy-MM"></el-date-picker>
                    <el-button icon="el-icon-search" @click="btnSeaStaffSignin" :loading="loadState.searchLoad" class="btn-public">搜索</el-button>

                    <el-button icon="el-icon-notebook-1" @click="signExport" class="btn-public fr">导出</el-button>
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
                                    <!--sign-up  class  先注释-->
                                    <div class="cell"><i class="iconfont icon-shangban"></i>上班：{{item.up}}天</div>
                                    <!--sign-rest class  先注释-->
                                    <div class="cell"><i class="iconfont icon-daka1"></i>休息：{{item.rest}}天</div>
                                    <div class="cell sign-warn"><i class="el-icon-warning"></i>异常：{{item.abnormal}}天</div>
                                </td>
                            </tr>
                            <tr v-for="(item,index) in signStaffDate" :key="index">
                                <td>
                                    <div class="cell">{{item.day}}</div>
                                </td>
                                <td v-for="(item2,index2) in item.check" :key="index2">
                                    <div v-if="item2.clockin == '未到时' && item2.clockout == '未到时'">
                                        <div class="cell clock-in">
                                            /
                                        </div>
                                    </div>

                                    <div v-else>
                                        <div class="cell clock-in" v-if="item2.clockin == '上班:未打卡'">{{item2.clockin}}</div>
                                        <div class="cell clock-in" v-else-if="item2.clockin == '未到时'">/</div>
                                        <div class="cell clock-out" v-else>{{item2.clockin}}</div>

                                        <!--clock-out-->
                                        <div class="cell clock-in" v-if="item2.clockout == '下班:未打卡'">{{item2.clockout}}</div>
                                        <div class="cell clock-in" v-else-if="item2.clockout == '未到时'">/</div>
                                        <div class="cell clock-out" v-else>{{item2.clockout}}</div>
                                    </div>

                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="page-assist">
                        <el-pagination
                                background
                                layout="prev, pager, next,total,jumper"
                                :total="pageTotalRows"
                                :page-size="pageListRows"
                                @current-change="PageCurrent">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>

            <!--tab2 班次设置-->
            <el-tab-pane :lazy='tabLazy' label="班次设置" name="StaffRoyalty">
                <div class="clearfix">
                    <el-button type="primary" class="fr btn-public" @click="btnSetTime">
                        <i class="el-icon-setting"></i>设置
                    </el-button>
                </div>

                <table class="staffClass-table edit-table">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>班次</th>
                            <th>上班时间</th>
                            <th>下班时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>正班</td>
                            <td>{{calssTimeForm.start_time}}</td>
                            <td>{{calssTimeForm.end_time}} </td>
                            <td><el-button class="btn-noBor" size="mini" @click="goStaffIndex('1')">查看此班人员</el-button></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>早班</td>
                            <td>{{calssTimeForm.start_time_m}}</td>
                            <td>{{calssTimeForm.end_time_m}}</td>
                            <td><el-button  class="btn-noBor" size="mini" @click="goStaffIndex('2')">查看此班人员</el-button></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>中班</td>
                            <td>{{calssTimeForm.start_time_a}}</td>
                            <td>{{calssTimeForm.end_time_a}}</td>
                            <td><el-button class="btn-noBor"  size="mini" @click="goStaffIndex('3')">查看此班人员</el-button></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>晚班</td>
                            <td>{{calssTimeForm.start_time_e}} </td>
                            <td>{{calssTimeForm.end_time_e}} </td>
                            <td><el-button class="btn-noBor" size="mini" @click="goStaffIndex('4')">查看此班人员</el-button></td>
                        </tr>
                    </tbody>
                </table>

            </el-tab-pane>
        </el-tabs>

        <!--时间设置 弹出-->
        <el-dialog  :append-to-body="true" title="班次设置" :visible.sync="EditTimeForm">
            <el-form v-model="calssTimeForm" :label-width="formLabelWidth" class="class-time">
                <el-form-item label="正班">
                    <el-time-picker
                            v-model="calssTimeForm.start_time"
                            placeholder="选择时间"
                            value-format="HH:mm"
                            format="HH:mm"
                            >
                    </el-time-picker>
                    <el-time-picker
                            v-model="calssTimeForm.end_time"
                            placeholder="选择时间"
                            value-format="HH:mm"
                            format="HH:mm"
                    >
                    </el-time-picker>
                </el-form-item>
                <el-form-item label="早班">
                    <el-time-picker
                            v-model="calssTimeForm.start_time_m"
                            placeholder="选择时间"
                            value-format="HH:mm"
                            format="HH:mm"
                    >
                    </el-time-picker>
                    <el-time-picker
                            v-model="calssTimeForm.end_time_m"
                            placeholder="选择时间"
                            value-format="HH:mm"
                            format="HH:mm"
                    >
                    </el-time-picker>
                </el-form-item>
                <el-form-item label="正班">
                    <el-time-picker
                            v-model="calssTimeForm.start_time_a"
                            placeholder="选择时间"
                            value-format="HH:mm"
                            format="HH:mm"
                    >
                    </el-time-picker>
                    <el-time-picker
                            v-model="calssTimeForm.end_time_a"
                            placeholder="选择时间"
                            value-format="HH:mm"
                            format="HH:mm"
                    >
                    </el-time-picker>
                </el-form-item>
                <el-form-item label="正班">
                    <el-time-picker
                            v-model="calssTimeForm.start_time_e"
                            placeholder="选择时间"
                            value-format="HH:mm"
                            format="HH:mm"
                    >
                    </el-time-picker>
                    <el-time-picker
                            v-model="calssTimeForm.end_time_e"
                            placeholder="选择时间"
                            value-format="HH:mm"
                            format="HH:mm"
                    >
                    </el-time-picker>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="EditTimeForm = false">取 消</el-button>
                <el-button type="primary" @click="sureDialogTIme()" :loading="sureDiaTime">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {staffSetcommutertime, staffSignin} from '@/assets/js/api' /*引用 考勤 接口*/
    export default {
        inject: ['reLoad'], //注入依赖 App 中的reLoad方法
        name: "Staffsignin",
        data() {
            return {
                activeName: 'StaffSalary', //StaffSalary StaffRoyalty
                tabLazy: true,
                formLabelWidth: '120px',
                loadState: {    //按钮状态
                    searchLoad:false
                },
                signStaffList: [],  //签到 员工  列表
                signStaffDate: [],  //签到 日期

                /*筛选*/
                staffName: "",  //名字
                staffMonth: "",  //月份

                pageTotalRows: 0,  /*分页总数*/
                pageListRows: 0,  /*分页 每页数*/
                staffPage: 1,     /*分页 页码*/

                EditTimeForm: false,  /*编辑弹出*/
                sureDiaTime:false,
                calssTimeForm:{
                    zmtek_ver:2,
                    type:2,  //1 修改 2是查看
                    start_time:'',
                    end_time:'',
                    start_time_m:'',
                    end_time_m:'',
                    start_time_a:'',
                    end_time_a:'',
                    start_time_e:'',
                    end_time_e:'',
                }

            }
        },
        methods: {

            ...mapActions({
                ActSaveStaffClasses: 'StoreTagNav/ActSaveStaffClasses',
            }),

            /* 0、tab切换*/
            tabTotal(tab, event) {
                let tabName = tab.name;
                sessionStorage.setItem('StaffSignTabName', tabName);
            },

            /*考勤*/
            getStaffSignin() {
                staffSignin({
                    zmtek_ver: 2,
                    p: this.staffPage,
                    keywords: this.staffName,
                    starttime: this.staffMonth,
                }).then(res => {
                    if (res.status == 1) {
                        console.log(res);
                        this.signStaffList = res.data.staff.list;
                        this.signStaffDate = res.data.date;
                        this.pageTotalRows = Number(res.data.staff.totalRows);  /*分页总数*/
                        this.pageListRows = res.data.staff.listRows;  /*分页 每页数*/
                    }
                }).catch(res => {
                    console.log(res);
                });
            },

            /*考勤 搜索*/
            btnSeaStaffSignin() {
                this.GLOBAL.btnStateChange(this,'loadState','searchLoad');
                this.staffPage = 1;
                this.getStaffSignin();
            },
            /*分页*/
            PageCurrent(page) {
                this.staffPage = page;
                this.getStaffSignin();
            },
            /*考勤 导出*/
            signExport() {
                let localUrl = this.GLOBAL.localUrl;
                let page = this.staffPage;
                let keywords = this.staffName;
                let staffMonth = this.staffMonth;
                if (staffMonth == '') {
                    staffMonth = this.$moment().format('YYYY-MM');
                }
                // http://vikily.f3322.net:20000/staff/excel_sign.html?starttime=2020-03-01&keywords=&user_type=10000&p=1
                let downUrl = localUrl + '/staff/excel_sign.html?zmtek_ver=2&p=' + page + '&keywords=' + keywords + '&starttime=' + staffMonth;
                console.log(downUrl);
                window.location.href = downUrl;
            },

            /*班次设置*/
            staffSetcommutertime() {
                staffSetcommutertime(this.calssTimeForm).then(res => {
                    if (res.status == 1) {
                        console.log(res);
                        if(this.calssTimeForm.type == 2){
                            this.calssTimeForm.start_time = res.data.commuterup_time;
                            this.calssTimeForm.end_time= res.data.commuterdn_time;
                            this.calssTimeForm.start_time_m= res.data.commuterup_time_m;
                            this.calssTimeForm.end_time_m= res.data.commuterdn_time_m;
                            this.calssTimeForm.start_time_a= res.data.commuterup_time_a;
                            this.calssTimeForm.end_time_a= res.data.commuterdn_time_a;
                            this.calssTimeForm.start_time_e= res.data.commuterup_time_e;
                            this.calssTimeForm.end_time_e= res.data.commuterdn_time_e;
                        }
                        if(this.calssTimeForm.type == 1){
                            this.$message.success(res.info);
                            setTimeout(()=>{
                                this.EditTimeForm = false;
                            },1000);
                        }
                    }else {
                        this.$message.error(res.info);
                    }

                }).catch(res => {
                    console.log(res);
                });
            },

            /*弹出时间设置*/
            btnSetTime() {
                this.EditTimeForm = true;
            },

            /*弹出时间设置 确定*/
            sureDialogTIme() {
                this.sureDiaTime = true;
                this.calssTimeForm.type = 1;
                this.staffSetcommutertime();
                setTimeout(()=>{
                    this.sureDiaTime = false;
                },1000);
            },

            /*去员工页面*/
            goStaffIndex(val) {
                sessionStorage.setItem('StaffIndexTabName','StaffSalary');
                this.$router.push({
                    path: '/Staff/index',
                });

                let data = val;
                console.log(val);
                this.ActSaveStaffClasses(data);
            },
        },
        created() {
            this.getStaffSignin();
            let tabName = sessionStorage.getItem('StaffSignTabName');
            if (tabName == null) {
                tabName = this.activeName;
            } else {
                this.activeName = tabName;
            }

            this.staffSetcommutertime();
        },
    }
</script>

<style lang="scss">
    @import "@/assets/css/staff.scss";
</style>