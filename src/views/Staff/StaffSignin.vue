<template>
    <div class="layoutR-main">

        <el-tabs v-model="activeName" class="vip-tabBox pubWidth" id="staffPay-tabBox">
            <!--tab1 打卡记录-->
            <el-tab-pane :lazy='tabLazy' label="打卡记录" name="StaffSalary">
                <!--打卡记录筛选-->
                <form class="pt-screen">
                    <el-input placeholder="请输入会员姓名、电话" v-model="staffName" class="inp-mar14 pt-screen-input" clearable></el-input>
                    <el-date-picker placeholder="请选择月份" class="inp-mar14 month-inp" v-model="staffMonth" type="month" value-format="yyyy-MM"></el-date-picker>
                    <el-button icon="el-icon-search" @click="btnSeaStaffSignin" class="btn-search">搜索</el-button>

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

            <!--tab2 班次设置-->
            <el-tab-pane :lazy='tabLazy' label="班次设置" name="StaffRoyalty">
                <div class="clearfix">
                    <el-button type="primary" class="fr btn-search" @click="btnSetTime">设置</el-button>
                </div>
                <el-table class="pub-table" :data="tableClassTime" border>
                    <el-table-column type="index"></el-table-column>
                    <el-table-column prop="name" label="班次"></el-table-column>
                    <el-table-column label="上班时间">
                        <template slot-scope="scope">
                            <div>{{scope.row.FormalTime[0] }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="下班时间">
                        <template slot-scope="scope">
                            <div>{{scope.row.FormalTime[1] }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="查看">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="goStaffIndex(scope.$index, scope.row)">此班人员</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!--时间设置 弹出-->
        <el-dialog title="班次编辑" :visible.sync="EditTimeForm">
            <el-form :model="tableClassTime[0]" :label-width="formLabelWidth">
                <el-form-item label="正班" >
                    <el-time-picker
                            is-range
                            format = "HH：mm"
                            value-format = "HH:mm"
                            v-model = "tableClassTime[0].FormalTime"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
                    </el-time-picker>
                </el-form-item>
                <el-form-item label="早班" >
                    <el-time-picker
                            is-range
                            format = "HH：mm"
                            value-format = "HH:mm"
                            v-model="tableClassTime[1].FormalTime"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
                    </el-time-picker>
                </el-form-item>
                <el-form-item label="中班" >
                    <el-time-picker
                            is-range
                            format = "HH：mm"
                            value-format = "HH:mm"
                            v-model="tableClassTime[2].FormalTime"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
                    </el-time-picker>
                </el-form-item>
                <el-form-item label="晚班" >
                    <el-time-picker
                            is-range
                            format = "HH：mm"
                            value-format = "HH:mm"
                            v-model="tableClassTime[3].FormalTime"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
                    </el-time-picker>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="EditTimeForm = false">取 消</el-button>
                <el-button type="primary" @click="sureDialogTIme()">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {mapState,mapActions, mapGetters} from 'vuex'
    import {staffSignin} from '@/assets/js/api' /*引用 考勤 接口*/
    export default {
        name: "Staffsignin",
        data() {
            return {
                activeName: 'StaffRoyalty', //StaffSalary StaffRoyalty
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

                EditTimeForm:false,  /*编辑弹出*/
                tableClassTime:[    /*班次 时间*/
                    {lock:0,name:'正班', FormalTime:['09:00', '18:00']},
                    {lock:2,name:'早班', FormalTime:['09:00', '18:00']},
                    {lock:3,name:'中班', FormalTime:['13:30', '18:00']},
                    {lock:4,name:'晚班', FormalTime:['18:00', '22:00']},
                ],

            }
        },
        methods: {

            ...mapActions({
                ActSaveStaffClasses:'StoreTagNav/ActSaveStaffClasses',
            }),



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

            /*班次设置*/
            /*弹出时间设置*/
            btnSetTime(){
                this.EditTimeForm = true;
            },

            /*弹出时间设置 确定*/
            sureDialogTIme(){
                this.EditTimeForm = false;
            },

            /*去员工页面*/
            goStaffIndex(index,row){
                this.$router.push({
                    path:'/Staff/index'
                });

                let data = row;
                this.ActSaveStaffClasses(data);
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