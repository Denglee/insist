<template>
    <div class="layoutR-main">

        <el-tabs v-model="activeName" class="vip-tabBox pubWidth" id="staffPay-tabBox" v-show="tabStaffSalary">

            <!--tab1 员工工资-->
            <el-tab-pane :lazy='tabLazy' label="员工工资" name="StaffSalary">
                <div class="">
                    <!--员工列表 筛选-->
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

                    <!--员工列表 表格-->
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
                </div>
                <el-table class="pub-table" :data="tableRoyalty" border>
                    <el-table-column type="index"></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="sex" label="性别">
                        <template slot-scope="scope">
                            <div v-if="scope.row.type == 1 " class="status-connect">销售额百分比</div>
                            <div v-if="scope.row.type == 2 " class="status-break">上课节数百分比</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="详情">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="EditRoyalty(scope.$index, scope.row)">设置</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>

            <!--tab3 奖惩设置-->
            <el-tab-pane :lazy='tabLazy' label="奖惩设置" name="StaffReward">
                <el-row gutter="20">
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
        <el-dialog title="添加提成" :visible.sync="dialogRoyalty">
            <el-form :model="setupRoyalty" :label-width="formLabelWidth">
                <el-form-item label="提成名称" >
                    <el-input v-model="setupRoyalty.name" autocomplete="off" class="month-inp"></el-input>
                </el-form-item>
                <el-form-item label="提成类型" >
                    <el-select v-model="setupRoyalty.royaltyType" placeholder="请选择提成类型" class="month-inp">
                        <el-option v-for="item in royaltyType" :key="item.index" :label="item.catname" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogRoyalty = false" plain>取 消</el-button>
                <el-button type="primary" @click="sureDialogRoyalty()">确 定</el-button>
            </div>
        </el-dialog>


        <!--提成 设置 编辑-->
        <div v-show="setStaffRoyalty">
            <navBread @GoBack="goBack('tabStaffSalary','setStaffRoyalty')" breadTitle="提成设置"
                      breadContent1="提成编辑"></navBread>
            <div class="addForm-box">
                <div class="clearfix">
                    <el-button type="primary" class="fr btn-search" @click="btnAddSetRoyalty">添加设置</el-button>
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
    export default {
        name: "StaffReword",
        data() {
            return {
                activeName: 'StaffSalary', //StaffSalary StaffRoyalty StaffReward
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
                royaltyType:this.GLOBAL.royaltyType,
                dialogRoyalty:false,   //提成名称 设置 弹窗
                formLabelWidth: '120px',
                setupRoyalty: {
                    name:'',
                    royaltyType:''
                },
                tableRoyalty:[
                    {id:1, name:'教练提成',type:'1'},
                    {id:2, name:'教练提2',type:'2'},
                ],

                /*提成设置*/
                tabStaffSalary:true,
                setStaffRoyalty:false,  //设置页面显隐
                setTableRoyalty:[
                    {id:1, down:'0',up:'10000',bili:1},
                    {id:2, down:'10000',up:'20000',bili:2},
                ],
            }
        },
        methods: {

            /* === tab2  提成设置 ==*/
            /*添加提成 弹窗*/
            btnAddRoyalty(){
                this.dialogRoyalty = true;
            },
            /*添加提成 编辑确定*/
            sureDialogRoyalty(){
                console.log(this.setupRoyalty);
                console.log(this.setupRoyalty.name);
            },

            /*提成设置*/
            EditRoyalty(index, row){
                console.log(index, row);
                this.tabStaffSalary=false;
                this.setStaffRoyalty=true;
            },

            /*添加设置*/
            btnAddSetRoyalty(){
                var list = {down:'0',up:'0',bili:1};
                this.setTableRoyalty.push(list)
            },

            /*保存设置*/
            btnSaveSetRoyalty(){
                console.log(this.setTableRoyalty);
            },

            /* 返回上一页 */
            goBack(e1, e2) {
                console.log(e1);
                this[e1] = true;   //显示 tab 列表
                this[e2] = false;   //隐藏当前 二级页
            },

        },
        created() {

        },
        components: {
            navBread,
        },
    }
</script>

<style lang="scss" >
    @import "@/assets/css/staff.scss";

</style>