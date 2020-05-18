<template>
    <div class="layoutR-contain animated fadeIn">
        <!--右边iframe-->
        <!--<publicIframe/>-->

        <el-tabs v-model="activeTabName" @tab-click="tabTotal"  v-show="staffListState" class="vip-tabBox pubWidth tab-header" id="staffPay-tabBox">

            <!--tab1 员工列表-->
            <el-tab-pane :lazy='tabLazy' label="员工列表" name="StaffSalary">
                <!--<div class="clearfix">
                    <el-button type="primary" class="btn-add fr btn-public" @click="btnAddStaff">添加员工</el-button>
                </div>-->
                <!--员工列表-->
                <div class="vip-tabBox clearfix">
                    <!--员工列表 筛选-->
                    <div class="pt-screen">
                        <!--在职-->
                        <el-select  filterable v-model="lockStateVal" placeholder="是否在职" class="ptScreen-select">
                            <el-option v-for="item in lockState" :key="item.index" :label="item.value" :value="item.lock"></el-option>
                        </el-select>
                        <!--职位-->
                        <el-select  filterable v-model="userTypeListVal" placeholder="请选择岗位" class="ptScreen-select">
                            <el-option v-for="item in userTypeList" :key="item.index" :label="item.catname" :value="item.id"></el-option>
                        </el-select>
                        <!--部门-->
                        <el-select  filterable v-model="group_id" placeholder="请选择部门" class="ptScreen-select">
                            <el-option v-for="item in groupArr" :key="item.index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                        <!--班次-->
                        <el-select  filterable v-model="classes" placeholder="请选择班次" class="ptScreen-select">
                            <el-option v-for="item in staffClassesArr" :key="item.index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                        <el-input placeholder="请输入姓名或电话号码" v-model="staffInpVal" class="ptScreen-input" clearable></el-input>
                        <!--搜索-->
                        <el-button icon="el-icon-search" @click="btnSeaStaff" :loading="loadState.searchLoad" class="btn-public">搜索</el-button>
                        <div class="fr" >
                            <el-tooltip class="item" effect="dark" content="删除" placement="bottom"
                                        popper-class="poper-del">
                                <el-button icon="el-icon-delete"  @click="deleteStaff()" class="btn-public btn-delete">员工删除</el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                                <el-button @click="changeStaff()" class="btn-public btn-edit"><i class="iconfont icon-bianjixiantiaoyangshi"></i>员工编辑</el-button>
                            </el-tooltip>
                            <el-button type="primary" class="btn-public btn-edit" @click="btnAddStaff">
                                <i class="icon-add el-icon-circle-plus-outline"></i>添加员工</el-button>
                        </div>
                    </div>
                    <!--员工列表 表格-->
                    <el-table class="pub-table staffList-table" :data="tableStaff" border @selection-change="checkedStaff"
                              ref="multipleTable" @row-click="handleRowClick">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="name" label="姓名"></el-table-column>
                        <el-table-column prop="user_no" label="工号"></el-table-column>
                        <el-table-column prop="sex" label="性别">
                            <template slot-scope="scope">
                                <div v-if="scope.row.sex == 0 ">未知</div>
                                <div v-if="scope.row.sex == 1 ">男</div>
                                <div v-if="scope.row.sex == 2 ">女</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="phone" label="电话"></el-table-column>
                        <el-table-column prop="user_type" label="岗位">
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
                        <el-table-column label="部门" prop="group_name"></el-table-column>
                        <el-table-column label="班次" prop="classes">
                            <template slot-scope="scope">
                                <div v-if="scope.row.classes == 1">正班</div>
                                <div v-if="scope.row.classes == 2">早班</div>
                                <div v-if="scope.row.classes == 3">中班</div>
                                <div v-if="scope.row.classes == 4">晚班</div>
                            </template>
                        </el-table-column>

                        <el-table-column prop="deduction_type" label="提成方式">
                            <template slot-scope="scope">
                                <div v-for="(item,index) in scope.row.deduction_name" class="royalty-td">{{item}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="lock" label="状态">
                            <template slot-scope="scope">
                                <div v-if="scope.row.lock == 0 " class="status-connect">在职</div>
                                <div v-if="scope.row.lock == 1 " class="status-break">离职</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="register_time" label="创建时间">
                            <template slot-scope="scope">
                                <div class="status-connect">{{scope.row.register_time | dateFormat}}</div>
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

            <!--tab2 部门-->
            <el-tab-pane :lazy='tabLazy' label="部门" name="StaffRoyalty">
                <div class="clearfix">
                    <el-button type="primary" class="btn-add fr btn-public" @click="btnAddGroup()">
                        <i class="icon-add el-icon-circle-plus-outline"></i>添加部门</el-button>
                </div>
                <el-table class="pub-table edit-table" :data="groupArr" border>
                    <el-table-column type="index" width="50px" label="序号"></el-table-column>
                    <el-table-column prop="name" label="部门"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button class="btn-noBor" size="mini" @click="EditGroup(scope.$index, scope.row)">
                                <i class="iconfont icon-bianjitianchong"></i>
                            </el-button>
                            <el-button class="btn-noBor" size="mini" @click="deleteGroup(scope.$index, scope.row)">
                                <i class="iconfont icon-shanchutianchong"></i>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>

        </el-tabs>

        <!-- tab1 添加员工-->
        <div v-if="addStaffState" class="vip-tabBox">
            <navBread @GoBack="goBack('staffListState','addStaffState')" breadTitle="员工列表"
                      :breadContent1="editStaffMark"></navBread>

            <addStaff :editStaffMark="editStaffMark" :editStaff = 'editStaff'></addStaff>
        </div>


        <!--tab2 部门 添加 弹窗-->
        <el-dialog :title="diaGroupTitle" :visible.sync="diaGroup" width="600px">
            <el-form :model="setupGroup" class="dia-form" :label-width="formLabelRoyalty">
                <el-form-item label="部门名称" >
                    <el-input v-model="setupGroup.name" placeholder="请输入部门名字" class="dia-inp" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="diaGroup = false" plain>取 消</el-button>
                <el-button type="primary" @click="sureDiaGropu()" :loading="btnSureGroup">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {mapState,mapActions, mapGetters} from 'vuex'
    import addStaff from '@/views/Staff/addStaff'
    import navBread from '@/components/navBread/navBread'
    import {staffAdd, staffDel, staffIndex,staffGroup,staffDeduct} from '@/assets/js/api' /*引用 员工 接口*/

    export default {
        inject:['reLoad'], //注入依赖 App 中的reLoad方法

        name: "StaffIndex",  //员工列表
        data() {
            return {
                activeTabName: 'StaffSalary', //StaffSalary StaffRoyalty
                tabLazy: true,
                loadState: {  //按钮状态
                    searchLoad:false
                },

                /*  == 员工 筛选 ==*/
                lockState:[
                    {lock:0,value:'在职'},
                    {lock:1,value:'离职'},
                ],
                lockStateVal:0, // 1.0、在职状态
                userTypeList:this.GLOBAL.userTypeList,    // 1.2、 职位
                userTypeListVal:'10000', /* 职位 岗位 选中值*/
                group_id:'',  //部门id 
                classes:'', //班次
                staffInpVal:'', // 1.3、输入
                userTypeGroupVal:'', //1.4 部门
                staffClasses:'', //班次

                staffClassesArr:[//班次数组
                    {id:1,name:'正班'},
                    {id:2,name:'早班'},
                    {id:3,name:'中班'},
                    {id:4,name:'晚班'},
                ],

                staffDeductArr:[], //提成

                tableStaff: [], //员工列表数组
                pageTotalRows:0,  /*分页总数*/
                pageListRows:0,  /*分页 每页数*/
                staffPage:1,     /*分页 页码*/
                formLabelWidth: '120px',
                EditListForm: false, //员工编辑 块 显示状态
                staffListState: true,//tab 显示状态

                /* == 添加员工 ==*/
                addStaffState: false, //添加员工 块 显示状态
                addTitle:'添加员工',

                /*2.1员工操作*/
                checkedRows: [],  //选中的值
                staffSelection: [], //修改表单值
                editStaffMark:'',
                editStaff : [],


                /* tab2 部门 */
                // 2.1 部门添加
                formLabelRoyalty:'90px',
                diaGroup:false,
                btnSureGroup:false,
                diaGroupTitle:'',
                groupType:1,   //# 1 = 获取组列表信息 2 = 添加组信息 3 = 修改组信息 4 = 删除
                setupGroup: {
                    name:'',
                    id:'',
                },
                groupArr:[],  /*部门信息*/

            }
        },

        methods: {

            /* 0、tab切换*/
            tabTotal(tab, event) {
                let tabName = tab.name;
                this.callTabApi(tabName);

                sessionStorage.setItem('StaffIndexTabName',tabName);
            },

            /*员工列表*/
            /*1.2员工列表 接口*/
            getStaffIndex(){
                staffIndex({
                    p:this.staffPage,
                    zmtek_ver:2,
                    user_type:this.userTypeListVal,
                    phone:this.staffInpVal,
                    lock:this.lockStateVal,
                    group_id:this.group_id,
                    classes:this.classes,
                }).then(res => {
                    console.log(res.data.list);
                    if(res.status ==1){
                        this.tableStaff = res.data.list;
                        this.pageTotalRows = Number(res.data.totalRows);
                        this.pageListRows = res.data.listRows;
                    }
                }).catch(res => {
                    console.log(res);
                });
            },

            /*分页*/
            PageCurrent(page){
                this.staffPage = page;
                this.getStaffIndex();
            },

            /*1.1、筛选 员工*/
            btnSeaStaff(){
                this.GLOBAL.btnStateChange(this,'loadState','searchLoad');
                this.staffPage = 1;
                this.getStaffIndex();
            },

            /* 1.10、 编辑选中 */
            checkedStaff(val) {
                console.log(val);
                this.checkedRows = val;
            },

            //点击行触发，选中或不选中复选框
            handleRowClick(row, column, event){
                this.$refs.multipleTable.toggleRowSelection(row);
            },

            /*1.3删除员工*/
            deleteStaff(val){
                let checkedRows =  this.checkedRows;
                console.log(checkedRows);
                console.log(checkedRows.length);
                if(checkedRows.length == 0){
                    this.$message.error('至少选一个操作对象');
                } else if(checkedRows.length == 1){
                    console.log(checkedRows[0].id);
                    staffDel({
                        id:checkedRows[0].id,
                        zmtek_ver:2,
                    }).then(res => {
                        if( res.status == 0){
                            this.$prompt(res.info, '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                            }).then(({ value }) => {
                                console.log(value);
                                // vikily#8322  +city_id
                                staffDel({
                                    id:checkedRows[0].id,
                                    zmtek_ver:2,
                                    pwd:value,
                                }).then(res => {
                                    console.log(res);
                                    if(res.status == 1){
                                        this.$message.success(res.info);
                                        setTimeout(()=>{
                                            this.reLoad();
                                        },1000);
                                    }
                                    if(res.status == 0){
                                        this.$message.error(res.info);
                                    }
                                }).catch(res => {console.log(res)});
                            }).catch(() => {console.log('取消')});
                        }
                        // console.log(res);
                        // this.$message.success(res.info);
                        // setTimeout(()=>{
                        //     this.reLoad();
                        // },1000);
                    }).catch(res => {
                        console.log(res);
                    });
                }else{
                    this.$message.error('只能选一个');
                }
            },

            /*1.2 表格操作 员工编辑*/
            changeStaff(){
                let checkedRows =  this.checkedRows;
                console.log(checkedRows);
                console.log(checkedRows.length);
                if(checkedRows.length == 0){
                    this.$message.error('至少选一个操作对象');
                } else if(checkedRows.length == 1){
                    console.log(checkedRows[0]);
                    this.editStaffMark = '员工编辑';
                    this.editStaff = checkedRows[0];
                    this.staffListState = false;
                    this.addStaffState = true;
                }else{
                    this.$message.error('只能选一个');
                }
            },

            /*获取 提成 */
            getStaffDeduct(){
                staffDeduct({
                    zmtek_ver : 2,
                    type :1,
                    deduction_name :'',
                    deduction_type : '',
                    id : '',
                }).then(res => {
                    console.log(res.data);
                    this.staffDeductArr = res.data;
                }).catch(res => {
                    console.log(res);
                });
            },


            /*  ======= // 3  添加员工 开始 ====== =*/
            /* 3.1 去添加页面*/
            btnAddStaff() {
                this.editStaffMark = '添加员工';
                this.editStaff = [];
                this.staffListState = false;
                this.addStaffState = true;
            },

            /* 3.1 返回上一页 添加员工 =》 员工列表 */
            goBack(e1, e2) {
                console.log(e1);
                this[e1] = true;   //显示 列表
                this[e2] = false;   //隐藏当前
            },


            /*   ================== 部门 开始 ==============*/
            getStaffGroup(groupName,groupId){
                staffGroup({
                    zmtek_ver:2,
                    type:this.groupType,     //1 = 获取组列表信息 2 = 添加组信息 3 = 修改组信息 4 = 删除
                    name:groupName || '',      //添加必传
                    id:groupId || '',        //删除必传
                }).then(res => {
                    console.log(res.data);
                    console.log(this.groupType);

                    setTimeout(()=>{
                        this.btnSureGroup = false;
                    },1000);
                    if(res.status ==1){
                        if(this.groupType == 1){
                            this.groupArr = res.data;
                        }else {
                            this.$message.success(res.info);
                            setTimeout(()=>{
                                this.diaGroup = false;
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

            /*部门 弹窗 确定*/
            sureDiaGropu(){
                let groupName = this.setupGroup.name;
                console.log(groupName);
                if(groupName == ''){
                    this.$message.error('部门名称 不能为空')
                }else {
                    let groupId = this.setupGroup.id;
                    this.btnSureGroup = true;
                    this.getStaffGroup(groupName,groupId);
                }
            },

            /*添加部门*/
            btnAddGroup(){
                this.diaGroupTitle = '添加部门';
                this.groupType = 2;
                this.diaGroup = true;
            },

            /*部门编辑*/
            EditGroup(index, row){
                console.log(index, row);
                this.setupGroup.id = row.id;
                this.setupGroup.name = row.name;
                this.diaGroupTitle = '部门编辑';
                this.groupType = 3;

                this.diaGroup = true;
            },

            /*删除部门*/
            deleteGroup(index, row){
                this.$confirm('确定删除该部门？？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.groupType = 4;
                    let groupId = row.id;
                    console.log(groupId);
                    this.getStaffGroup('',groupId);
                }).catch(() => {});
            },



            /* 0 接口调用*/
            callTabApi(tabName){
                console.log(tabName);

                if(tabName == 'StaffSalary'){
                    console.log(this.getStaffClasses.lock);
                    this.staffPage = this.getStaffClasses.lock;
                    this.getStaffIndex();

                    this.getStaffGroup();
                    this.getStaffDeduct();
                }
                if(tabName == 'StaffRoyalty'){
                    this.getStaffGroup();
                }

            },

        },
        created() {
            let tabName = sessionStorage.getItem('StaffIndexTabName');
            if(tabName == null){
                tabName = this.activeTabName;
            }else {
                this.activeTabName = tabName;
            }
            this.callTabApi(tabName);


            console.log('GetStaffClasses:'+this.getStaffClasses)
        },

        computed:{
            //获取 store 中 StoreTagNav。js 的 gState 页面通过{{gState}}直接用
            ...mapGetters({
                getStaffClasses: "StoreTagNav/GetStaffClasses",
            }),
        },
        components: {
            addStaff,
            navBread
        },
    }
</script>

<style lang="scss">
    /*@import "@/assets/css/totalVip.scss";*/
    @import "@/assets/css/staff.scss";
</style>