<template>
    <div class="layoutR-main">

        <el-tabs v-model="activeTabName" @tab-click="tabTotal" class="vip-tabBox pubWidth" id="staffPay-tabBox" v-show="tabStaffSalary">

            <!--tab1 员工工资-->
            <el-tab-pane :lazy='tabLazy' label="员工工资" name="StaffSalary">
                <div class="">
                    <!--员工工资 筛选-->
                    <div class="pt-screen">
                        <!--在职-->
                        <el-select v-model="lockStateVal" placeholder="是否在职" class="inp-mar14 ptSel-section">
                            <el-option v-for="item in lockState" :key="item.index" :label="item.value" :value="item.lock"></el-option>
                        </el-select>
                        <!--部门-->
                        <el-select v-model="userTypeListVal" placeholder="请选择职位" class="inp-mar14 ptSel-section">
                            <el-option v-for="item in userTypeList" :key="item.index" :label="item.catname" :value="item.id"></el-option>
                        </el-select>
                        <el-input placeholder="请输入姓名或电话号码" v-model="staffInpVal" class="inp-mar14 pt-screen-input" clearable></el-input>
                        <!--搜索-->
                        <el-button icon="el-icon-search" @click="btnSeaStaff" class="btn-search">搜索</el-button>
                    </div>

                    <!--员工工资 表格-->
                    <el-table class="pub-table" :data="tableStaff" border @selection-change="checkedStaff">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="name" label="姓名"></el-table-column>
                        <el-table-column prop="sex" label="性别">
                            <template slot-scope="scope">
                                <div v-if="scope.row.sex == 0 " class="status-connect">未知</div>
                                <div v-if="scope.row.sex == 1 " class="status-break">男</div>
                                <div v-if="scope.row.sex == 2 " class="status-break">女</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="user_type" label="职位">
                            <template slot-scope="scope">
                                <div v-if="scope.row.user_type == 0 " class="status-connect">全部职位</div>
                                <div v-if="scope.row.user_type == 1 " class="status-connect">店长</div>
                                <div v-if="scope.row.user_type == 2 " class="status-connect">顾问</div>
                                <div v-if="scope.row.user_type == 3 " class="status-connect">教练</div>
                                <div v-if="scope.row.user_type == 4 " class="status-connect">操课</div>
                                <div v-if="scope.row.user_type == 5 " class="status-connect">财务</div>
                                <div v-if="scope.row.user_type == 6 " class="status-connect">前台</div>
                                <div v-if="scope.row.user_type == 7 " class="status-connect">保洁员</div>
                                <div v-if="scope.row.user_type == 8 " class="status-connect">后勤</div>
                                <div v-if="scope.row.user_type == 100 " class="status-connect">教练经理</div>
                                <div v-if="scope.row.user_type == 200 " class="status-connect">顾问经理</div>
                                <div v-if="scope.row.user_type == 9 " class="status-connect">boss</div>
                                <div v-if="scope.row.user_type == 10 " class="status-connect">行政</div>
                                <!--<div v-else>{{scope.row.user_type}}</div>-->
                            </template>
                        </el-table-column>
                        <el-table-column prop="phone" label="电话" width="120px"></el-table-column>
                        <el-table-column prop="user_no" label="工号"></el-table-column>
                        <el-table-column prop="Royalty" label="提成方式"></el-table-column>
                        <el-table-column prop="register_time" label="创建时间" >
                            <template slot-scope="scope">
                                <div class="status-connect">{{scope.row.register_time | dateFormat}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="lock" label="状态">
                            <template slot-scope="scope">
                                <div v-if="scope.row.lock == 0 " class="status-connect">在职</div>
                                <div v-if="scope.row.lock == 1 " class="status-break">离职</div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            background
                            layout="prev, pager, next,total,jumper"
                            :total="pageTotalRows"
                            :page-size ="pageListRows"
                            @current-change="PageCurrent">
                    </el-pagination>
                </div>
            </el-tab-pane>

            <!--tab2 提成设置-->
            <el-tab-pane :lazy='tabLazy' label="提成设置" name="StaffRoyalty">
                <div class="clearfix">
                    <el-button type="primary" class="fr btn-search" @click="btnAddRoyalty">添加提成</el-button>
                    <el-button type="primary" class="fr btn-search" @click="btnAddRoyalty">提成设置</el-button>
                </div>

                <el-table class="pub-table" :data="tableRoyalty" border>
                    <el-table-column type="index" width="100px"></el-table-column>
                    <el-table-column prop="deduction_name" label="名称"></el-table-column>
                    <el-table-column prop="deduction_type" label="性别">
                        <template slot-scope="scope">
                            <div v-if="scope.row.deduction_type == 1 " class="status-connect">个人销售比</div>
                            <div v-if="scope.row.deduction_type == 2 " class="status-break">部门销售比</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="详情">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="EditGroup(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" @click="deleteGroup(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>

            <!--tab3 奖惩设置-->
            <el-tab-pane :lazy='tabLazy' label="奖惩设置" name="StaffReward">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content">
                            超额完成任务奖励方式
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            全勤奖励
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            为完成任务处罚
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            缺勤处罚
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>


        </el-tabs>

        <!--提成 添加 弹窗-->
        <el-dialog :title="deductInfo.RoyaltyTitle" :visible.sync="dialogRoyalty" width="600px">
            <el-form :model="deductInfo" :label-width="formLabelRoyalty" class="dia-form">
                <el-form-item label="提成名称" >
                    <el-input v-model="deductInfo.deduction_name" autocomplete="off" class="dia-inp"></el-input>
                </el-form-item>
                <el-form-item label="提成类型" >
                    <el-select v-model="deductInfo.deductionType"  class="dia-inp" placeholder="请选择提成类型">
                        <el-option v-for="item in deductInfo.deduction_type" :key="item.index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogRoyalty = false" plain>取 消</el-button>
                <el-button type="primary" @click="sureDiaRoyalty()">确 定</el-button>
            </div>
        </el-dialog>


        <!--提成 设置 编辑-->
        <div v-show="setStaffRoyalty">
            <navBread @GoBack="goBack('tabStaffSalary','setStaffRoyalty')" breadTitle="提成设置"
                      breadContent1="提成编辑"></navBread>
            <div class="addForm-box">
                <div class="clearfix">
                    <el-button type="primary" class="fr btn-search"  @click="btnAddSetRoyalty">添加设置</el-button>
                </div>
                <el-table class="pub-table" :data="setTableRoyalty" border>
                    <el-table-column type="index" label="序号" width="200px"></el-table-column>
                    <el-table-column label="下限">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.down"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="上限">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.up"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="百分比">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.bili"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="clearfix">
                    <el-button type="primary" class="fr btn-search" @click="btnSaveSetRoyalty">保存</el-button>
                </div>
             </div>
        </div>

    </div>
</template>

<script>
    import navBread from '@/components/Echarts/navBread'

    import {staffDeduct} from '@/assets/js/api'

    export default {
        inject:['reLoad'], //注入依赖 App 中的reLoad方法
        name: "StaffReword",
        data() {
            return {
                activeTabName: 'StaffRoyalty', //StaffSalary StaffRoyalty StaffReward
                tabLazy: true,

                /*tab1 员工工资*/
                /* 筛选 在职状态*/
                lockState:[
                    {lock:0,value:'在职'},
                    {lock:1,value:'离职'},
                ],
                lockStateVal:0,

                /*筛选 职位*/
                userTypeList:this.GLOBAL.userTypeList,
                userTypeListVal:10000, /* 职位 选中值*/

                staffInpVal:'',

                tableStaff: [], //员工列表数组
                pageTotalRows:0,  /*分页总数*/
                pageListRows:0,  /*分页 每页数*/
                staffPage:1,     /*分页 页码*/

                /* tab2 提成添加 */
                dialogRoyalty:false,   //提成名称 设置 弹窗
                formLabelWidth: '120px',

                deductInfo:{
                    RoyaltyTitle:'',  //弹窗名称
                    zmtek_ver:2,
                    type:1,     //1 = 获取组列表信息 2 = 添加组信息 3 = 修改组信息 4 = 删除
                    deduction_name:'',      //添加必传
                    deductionType:1,
                    deduction_type:[
                        {id:1,name:'个人销售比'},
                        {id:2,name:'部门销售比'},
                        // {id:3,name:'上课节数'},
                    ],      //添加必传
                    id : '',        //删除必传
                },


                /*提成设置*/
                formLabelRoyalty:'90px',
                tableRoyalty:[],
                tabStaffSalary:true,
                setStaffRoyalty:false,  //设置页面显隐
                setTableRoyalty:[
                    {id:1, down:'0',up:'10000',bili:1},
                    {id:2, down:'10000',up:'20000',bili:2},
                ],
            }
        },
        methods: {
            /* 0、tab切换*/
            tabTotal(tab, event) {
                let tabName = tab.name;
                this.callTabApi(tabName);
            },

            /*1、员工工资 列表*/
            btnSeaStaff(){

            },
            /*列表选择*/
            checkedStaff(){

            },

            /*分页*/
            PageCurrent(){

            },

            /* === tab2  提成设置 ==*/
            getStaffDeduct(){
                staffDeduct({
                    zmtek_ver : this.deductInfo.zmtek_ver,
                    type : this.deductInfo.type,
                    deduction_name : this.deductInfo.deduction_name,
                    deduction_type : this.deductInfo.deductionType,
                    id : this.deductInfo.id,
                }).then(res => {
                    console.log(res.data);
                    let type = this.deductInfo.type;
                    console.log(type);

                    if(res.status ==1){
                        if(type == 1){
                            this.tableRoyalty = res.data;
                        }else {
                            this.$message.success(res.info);
                            setTimeout(()=>{
                                this.dialogRoyalty = false;

                                this.reLoad();
                            },1000);
                        }
                    }
                    if(res.status == 0){
                        console.log(res.info);
                    }
                }).catch(res => {
                    console.log(res);
                });
            },

            /*添加提成 弹窗*/
            btnAddRoyalty(){
                this.deductInfo.RoyaltyTitle = '添加提成';
                this.deductInfo.type = 2;
                console.log( this.deductInfo);
                this.dialogRoyalty = true;
            },

            /*添加提成 确定*/
            sureDiaRoyalty(){
                console.log( this.deductInfo);
                let groupName = this.deductInfo.deduction_name;
                console.log(groupName);
                if(groupName == ''){
                    this.$message.error('提成名称 不能为空')
                } else {
                    let groupId = this.deductInfo.id;
                    this.getStaffDeduct();
                }
            },

            /*提成编辑*/
            EditGroup(index, row){
                console.log(index, row);
                this.deductInfo.id = row.id;
                this.deductInfo.deduction_name = row. deduction_name;
                this.deductInfo.RoyaltyTitle = '部门编辑';
                this.deductInfo.type = 3;

                this.dialogRoyalty = true;
            },

            /*删除提成*/
            deleteGroup(index, row){
                this.$confirm('确定删除该提成方式？？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row.id);
                    this.deductInfo.type = 4;
                    this.deductInfo.id = row.id;
                    this.getStaffDeduct();
                }).catch(() => {});
            },



            /*0 返回上一页 */
            goBack(e1, e2) {
                console.log(e1);
                this[e1] = true;   //显示 tab 列表
                this[e2] = false;   //隐藏当前 二级页
            },

            /* 0 接口调用*/
            callTabApi(tabName){
                console.log(tabName);
                if(tabName == 'StaffSalary'){

                };
                if(tabName == 'StaffRoyalty'){
                    this.getStaffDeduct();
                };
                if(tabName == 'StaffReward'){

                };

            },

        },
        created() {
            let tabName =this.activeTabName;
            this.callTabApi(tabName);
        },
        components: {
            navBread,
        },
    }
</script>

<style lang="scss" >
    @import "@/assets/css/staff.scss";

</style>