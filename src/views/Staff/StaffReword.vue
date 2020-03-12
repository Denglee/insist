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

            <!--tab2 提成设置 主页 -->
            <el-tab-pane :lazy='tabLazy' label="提成设置" name="StaffRoyalty">
                <div class="clearfix">
                    <el-button type="primary" class="fr btn-search" @click="btnAddRoyalty">添加提成</el-button>
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
                            <el-button size="mini"  type="primary" @click="btnGoRoyalty(scope.$index, scope.row)">设置</el-button>
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

        <!--提成 名称 种类 添加 弹窗-->
        <el-dialog :title="deductInfo.RoyaltyTitle" :visible.sync="dialogRoyalty" width="600px">
            <el-form :model="deductInfo" :label-width="formLabelRoyalty" class="dia-form">
                <el-form-item label="提成名称" >
                    <el-input v-model="deductInfo.deduction_name" placeholder="请输入提成名称" autocomplete="off" class="dia-inp"></el-input>
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

        <!--提成 上限 设置 编辑-->
        <div v-show="setStaffRoyalty">
            <navBread @GoBack="goBack('tabStaffSalary','setStaffRoyalty')" breadTitle="提成设置"
                      breadContent1="提成编辑"></navBread>
            <div class="addForm-box" v-if="isReloadData">
                <div class="clearfix">
                    <el-button type="primary" class="fr btn-search"  @click="btnAddSetRoyalty">添加设置</el-button>
                </div>
                <el-table class="pub-table" :data="setTableRoyalty" border>
                    <el-table-column type="index" label="序号" width="200px"></el-table-column>
                    <el-table-column prop="dn" label="下限"></el-table-column>
                    <el-table-column prop="up" label="上限"></el-table-column>
                    <el-table-column prop="ratio" label="百分比"></el-table-column>
                    <el-table-column label="详情">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="EditSetUp(scope.$index, scope.row)">编辑</el-button>
                           <el-button size="mini" @click="deleteSetUp(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
             </div>
        </div>

        <!--提成 上线  添加 弹窗-->
        <el-dialog :title="setRoyalty.setTitle" :visible.sync="dialogSetRoyalty" width="600px">
            <el-form :model="setRoyalty" :label-width="formLabelRoyalty" class="dia-form" :rules="setRules" ref="setRoyalty1">
                <el-form-item label="提成下限" prop="dn">
                    <el-input v-model="setRoyalty.dn" placeholder="请输入提成下限" autocomplete="off" class="dia-inp"></el-input>
                </el-form-item>
                <el-form-item label="提成上限" prop="up">
                    <el-input v-model="setRoyalty.up" placeholder="请输入提成上限" autocomplete="off" class="dia-inp"></el-input>
                </el-form-item>
                <el-form-item label="提成比例" prop="ratio">
                    <el-input v-model="setRoyalty.ratio" placeholder="请输入提成比例" autocomplete="off" class="dia-inp"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogSetRoyalty = false" plain>取 消</el-button>
                    <el-button type="primary" @click="sureDiaSetUp('setRoyalty1')">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
    import navBread from '@/components/Echarts/navBread'

    import {staffDeduct,staffPhases} from '@/assets/js/api'

    export default {
        inject:['reLoad'], //注入依赖 App 中的reLoad方法
        name: "StaffReword",
        data() {
            return {
                isReloadData: true,  //刷新标示
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

                /* tab2 提成添加 种类 */
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
                tableRoyalty:[],
                formLabelRoyalty:'90px',

                /* 2.1 提成 上限 设置*/
                tabStaffSalary:true,
                setStaffRoyalty:false,  //设置页面显隐
                dialogSetRoyalty:false,  //设置弹窗显隐
                setTableRoyalty:[],   //上限 表格

                setRoyalty:{
                    setTitle:'',  //弹窗名称
                    zmtek_ver:2,
                    type:1, //类型 1 = 获取列表 2 = 添加 3 = 修改 4 = 删除
                    ratio_id: 1,  //提成id 获取列表 添加 必填
                    id:'',   //修改 删除必填
                    up:'',   //上限 添加修改必填
                    dn:'',   //下限
                    ratio:'', //提成比 添加修改必填
                },
                setRules: {
                    up: [{ required: true, message: '提成上限不能为空', trigger: 'blur' },],
                    dn: [{ required: true, message: '提成下限不能为空', trigger: 'blur' }],
                    ratio: [{ required: true, message: '提成比例不能为空', trigger: 'blur' }],
                }
            }
        },
        methods: {
            reload2 () {
                console.log('你好像没什么用 ');
                this.isReloadData = false;
                this.$nextTick(() => {
                    this.isReloadData = true
                })
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            /* 0、tab切换*/
            tabTotal(tab, event) {
                let tabName = tab.name;
                this.callTabApi(tabName);
            },

            /* ============= 1、员工工资 列表*/
            btnSeaStaff(){

            },
            /*列表选择*/
            checkedStaff(){

            },

            /*分页*/
            PageCurrent(){

            },

            /* ============== tab2  提成设置 ==*/
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

            /* 2.1添加提成名称 种类 弹窗*/
            btnAddRoyalty(){
                this.deductInfo.RoyaltyTitle = '添加提成';
                this.deductInfo.type = 2;
                console.log( this.deductInfo);
                this.dialogRoyalty = true;
            },

            /* 2.2添加提成名称 确定*/
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

            /* 2.3 提成 名称 编辑*/
            EditGroup(index, row){
                console.log(index, row);
                this.deductInfo.id = row.id;
                this.deductInfo.deduction_name = row. deduction_name;
                this.deductInfo.RoyaltyTitle = '提成编辑';
                this.deductInfo.type = 3;
                this.dialogRoyalty = true;
            },

            /* 2.4删除提成种类*/
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


            /* ================ C、提成上限 下线设置*/
            /*  3.1 去 提成 上限 页面*/
            btnGoRoyalty(index, row){
                let setId = row.id;
                console.log('ratio_id'+setId);
                this.setRoyalty.ratio_id = setId;
                this.setRoyalty.type = 1;
                this.setTableRoyalty = [];
                this.getStaffPhases();

                /*存储 是否在编辑页面 状态*/
                sessionStorage.setItem('sessionSetRoyalty', true);
                this.tabStaffSalary = false;
                this.setStaffRoyalty = true;
            },

            /*  3.2 提成 上线 设置接口*/
            getStaffPhases(){
                staffPhases({
                    zmtek_ver : this.setRoyalty.zmtek_ver,
                    type : this.setRoyalty.type, //类型 1 = 获取列表 2 = 添加 3 = 修改 4 = 删除
                    ratio_id : this.setRoyalty.ratio_id,  //提成id 获取列表 添加 必填
                    id : this.setRoyalty.id,   //修改 删除必填
                    up : this.setRoyalty.up,   //上限 添加修改必填
                    dn : this.setRoyalty.dn,   //下限
                    ratio : this.setRoyalty.ratio, //提成比 添加修改必填
                }).then(res =>{
                    console.log(res.data);
                    let type = this.setRoyalty.type;
                    console.log('当前状态： '+type);

                    if(res.status ==1){
                        if(type == 1){
                            this.setTableRoyalty = res.data;
                        }else {
                            this.$message.success(res.info);
                            setTimeout(()=>{
                                this.dialogSetRoyalty = false;
                                this.reLoad();
                            },1000);
                        }
                    }
                    if(res.status == 0){
                        console.log(res.info);
                    }
                }).catch(res =>{
                    console.log(res);
                })
            },

            /* 3.22 添加提成上限  弹出*/
            btnAddSetRoyalty(){
                this.setRoyalty.RoyaltyTitle = '提成设置';
                this.setRoyalty= [];
                this.setRoyalty.type = 2;
                console.log( this.deductInfo);
                this.dialogSetRoyalty = true;
            },

            /* 3.22 添加提成上限  确定*/
            sureDiaSetUp(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.getStaffPhases();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            /* 3.3 编辑 上限 设置*/
            EditSetUp(index, row){
                // console.log(index, row);
                this.setRoyalty = row;
                this.setRoyalty.setTitle = '编辑提成';
                this.setRoyalty.type = 3;
                this.dialogSetRoyalty = true;
            },

            /*  3.4 删除 上限 设置*/
            deleteSetUp(index, row){
                this.$confirm('确定删除？？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // console.log(row.id);
                    this.setRoyalty.type = 4;
                    this.setRoyalty.id = row.id;
                    this.getStaffPhases();
                }).catch(() => {});
            },


            /*0 返回上一页 */
            goBack(e1, e2) {
                console.log(e1);
                this[e1] = true;   //显示 tab 列表
                this[e2] = false;   //隐藏当前 二级页

                sessionStorage.setItem('sessionSetRoyalty', false);
            },

            /* 0 接口调用*/
            callTabApi(tabName){
                console.log('当前tab：'+tabName);
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
            this.getStaffPhases();

            /*是否在提成设置页面*/
            let sessionSetRoyalty =window.sessionStorage.getItem('sessionSetRoyalty');
            console.log(sessionSetRoyalty);
            if(sessionSetRoyalty == 'true'){
                this.tabStaffSalary = false;
                this.setStaffRoyalty = true;
            }else{
                this.tabStaffSalary = true;
                this.setStaffRoyalty = false;
            }
        },
        mounted() {
            this.getStaffPhases();
        },
        components: {
            navBread,
        },
    }
</script>

<style lang="scss" >
    @import "@/assets/css/staff.scss";

</style>