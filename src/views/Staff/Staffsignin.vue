<template>
    <div class="layoutR-main">

        <el-tabs v-model="activeName" class="vip-tabBox pubWidth" id="staff-tabBox">

            <!--tab1 打卡记录-->
            <el-tab-pane :lazy='tabLazy' label="打卡记录" name="StaffSalary">
                <!--打卡记录筛选-->
                <!--<div class="pt-screen">

                    <el-input placeholder="请输入会员姓名、电话" v-model="input3" class="pt-screen-item pt-screen-input"></el-input>

                    &lt;!&ndash;日期选择&ndash;&gt;
                    <el-date-picker
                            class="pt-screen-item"
                            v-model="value1"
                            type="date">
                    </el-date-picker>

                    &lt;!&ndash;搜索&ndash;&gt;
                    <el-button icon="el-icon-search" @click="searchPT" class="btn-search">搜索</el-button>

                </div>-->

              <!--  <table>
                    <thead>
                        <th v-for="(index,item) in tableName" :key="index">
                            {{item.name}}
                        </th>
                    </thead>
                </table>-->

                <!--打卡记录 表格-->
                <el-table
                        :data="tableData"
                        style="width: 100%">

                    <el-table-column
                            prop="date"
                            label="统计"
                            width="100%">
                    </el-table-column>

                    <el-table-column
                            prop="date"
                            label="统计"
                            width="100%">
                    </el-table-column>

                </el-table>



                <el-table
                        style="display: none;"
                        class="pt-table"
                        :data="PTNumTable"
                        border>

                    <template slot="header" slot-scope="scope">
                        <el-input
                                v-model="search"
                                size="mini"
                                placeholder="输入关键字搜索"/>
                    </template>

                    <el-table-column>
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入关键字搜索"/>
                        </template>
                    </el-table-column>


                    <el-table-column
                            prop="department"
                            label="序号">
                    </el-table-column>
                    <el-table-column
                            prop="pt"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            prop="ptContinuation"
                            label="工号">
                    </el-table-column>
                    <el-table-column
                            prop="ptTransfer"
                            label="岗位">
                        <!--<template slot-scope="scope"><span class='price'>￥</span>{{ scope.row.money }}</template>-->
                    </el-table-column>
                    <el-table-column
                            prop="ptRefund"
                            label="基本工资">
                    </el-table-column>
                    <el-table-column
                            prop="ptOverdue"
                            label="提成">
                    </el-table-column>
                    <el-table-column
                            prop="ptFollow"
                            label="经理提成">
                    </el-table-column>
                    <el-table-column
                            prop="ptNoFollow"
                            label="总监提成">
                    </el-table-column>
                    <el-table-column
                            prop="ptNewAdd"
                            label="超额奖励">
                    </el-table-column>
                    <el-table-column
                            prop="ptTotal"
                            label="未完成处罚">
                    </el-table-column>
                    <el-table-column
                            prop="ptTotal"
                            label="全勤奖励">
                    </el-table-column>
                    <el-table-column
                            prop="ptTotal"
                            label="缺勤处罚">
                    </el-table-column>
                    <el-table-column
                            prop="ptTotal"
                            label="其他">
                    </el-table-column>
                    <el-table-column
                            prop="ptTotal"
                            label="合计">
                    </el-table-column>
                </el-table>

                <div class="ptTable-assist">
                    <el-pagination
                            background
                            layout="prev, pager, next,total,jumper"
                            :total="20">
                    </el-pagination>
                </div>

            </el-tab-pane>

            <!--tab2 班次设置-->
            <el-tab-pane :lazy='tabLazy' label="班次设置" name="StaffRoyalty">
                <div class="staffList-box vip-tabBox">

                    <!--班次设置筛选-->
                    <!--<div class="pt-screen">
                        &lt;!&ndash;在职&ndash;&gt;
                        <el-select v-model="value" placeholder="在职" class="pt-screen-item"
                                   style="width: 150px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                        &lt;!&ndash;部门&ndash;&gt;
                        <el-select v-model="value" placeholder="全部" class="pt-screen-item"
                                   style="width: 150px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                        <el-input placeholder="请输入内容" v-model="input3" class="pt-screen-item pt-screen-input"></el-input>

                        &lt;!&ndash;搜索&ndash;&gt;
                        <el-button icon="el-icon-search" @click="searchPT" class="btn-search">搜索</el-button>

                    </div>-->

                    <!--班次设置 表格-->
                    <el-table
                            class="pt-table"
                            :data="PTNumTable2"
                            border>
                        <el-table-column
                                prop="name"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="sex"
                                label="性别">
                        </el-table-column>
                        <el-table-column
                                prop="position"
                                label="职位">
                        </el-table-column>
                        <el-table-column
                                prop="tel"
                                label="电话"
                                width="120px">
                        </el-table-column>
                        <el-table-column
                                prop="jobId"
                                label="工号">
                        </el-table-column>
                        <el-table-column
                                prop="Royalty"
                                label="提成方式">
                        </el-table-column>
                        <el-table-column
                                prop="time"
                                label="创建时间">
                        </el-table-column>
                        <el-table-column
                                prop="state"
                                label="状态">
                            <template slot-scope="scope">
                                <div v-if="scope.row.state == 1 " class="status-connect">在职</div>
                                <div v-if="scope.row.state == 0 " class="status-break">离职</div>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="操作"
                                width="200">
                            <template slot-scope="scope">
                                <div class="flex-between">
                                    <el-button @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit"></el-button>
                                    <el-button type="danger" @click="handleDelete(scope.$index, scope.row,PTNumTable2)" icon="el-icon-delete"></el-button>
                                </div>

                            </template>
                        </el-table-column>

                    </el-table>

                    <div class="ptTable-assist">
                        <el-pagination
                                background
                                layout="prev, pager, next,total,jumper"
                                :total="20">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>

        </el-tabs>




        <!--提成 编辑弹出-->
        <el-dialog title="员工编辑" :visible.sync="EditListForm">
            <el-form :model="editForm">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="editForm.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="editForm.sex" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="职位" :label-width="formLabelWidth">
                    <el-input v-model="editForm.position" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="电话号码" :label-width="formLabelWidth">
                    <el-input v-model="editForm.tel" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="编号" :label-width="formLabelWidth">
                    <el-input v-model="editForm.jobId" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="提成方式" :label-width="formLabelWidth">
                    <el-select v-model="editForm.Royalty" placeholder="请选择">
                        <el-option
                                v-for="item in RoyaltyOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <!--                    <el-input v-model="editForm.Royalty" autocomplete="off"></el-input>-->
                </el-form-item>

                <el-form-item label="创建时间" :label-width="formLabelWidth">
                    <el-date-picker
                            v-model="editForm.time"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="状态" :label-width="formLabelWidth">
                    <template>
                        <el-radio v-model="editForm.state" label="0">离职</el-radio>
                        <el-radio v-model="editForm.state" label="1">在职</el-radio>
                    </template>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureEdit()">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    export default {
        name: "Staffsignin",
        data() {
            return {
                activeName: 'StaffSalary', //StaffSalary StaffRoyalty StaffReward
                tabLazy: true,
                formLabelWidth: '120px',
                EditListForm:false,

                tableName:[
                    {
                        id:1,
                        name:'lideng'
                    },
                    {
                        id:2,
                        name:'liden'
                    },
                    {
                        id:3,
                        name:'liden'
                    },

                ],


                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                },],

                    editForm:{
                    name:"",
                    sex:"",
                    position:"",
                    tel:"",
                    jobId:"",
                    Royalty: '',
                    time: '',
                    state: "",
                },
                RoyaltyOptions: [{
                    value: '教练1',
                    label: '方式1教练'
                }, {
                    value: '销售2',
                    label: '方式2销售2'
                }, {
                    value: '前台3',
                    label: '方式3前台3'
                }],
                PTNumTable: [
                    {
                        department: '市场部',
                        pt: '王小虎',
                        ptContinuation: "1",
                        ptTransfer: '1',
                        ptRefund: '1',
                        ptOverdue: '8',
                        ptFollow: '3',
                        ptNoFollow: '8',
                        ptNewAdd: '0',
                        ptTotal: '2',
                    },
                    {
                        department: '市场部',
                        pt: '王小虎',
                        ptContinuation: "1",
                        ptTransfer: '1',
                        ptRefund: '1',
                        ptOverdue: '8',
                        ptFollow: '3',
                        ptNoFollow: '8',
                        ptNewAdd: '0',
                        ptTotal: '2',
                    },
                ],
                PTNumTable2: [{
                    name:"李登",
                    sex:"男",
                    position:"教练",
                    tel:"17688888444",
                    jobId:"20136",
                    Royalty: '教练提成',
                    time: '2020-02-27',
                    state: "1",
                    // caozuo: '操作',
                },{
                    name:"小丽",
                    sex:"女",
                    position:"前台",
                    tel:"17688888544",
                    jobId:"20137",
                    Royalty: '前台提成',
                    time: '2020-01-27',
                    state: "0",
                    // caozuo: '操作',
                }
                ],
            }
        },
        methods: {
            /*编辑*/
            handleEdit(index, row) {
                console.log(index, row);
                console.log(row);
                this.editForm = row;
                this.EditListForm = true;
            },

            /*编辑确定*/
            sureEdit(){
                console.log(this.editForm);

                this.$message({
                    type:'success',
                    duration:'1500',
                    message:'更新成功'
                });

                this.EditListForm = false;
            },

            /*删除*/
            handleDelete(index,row, rows) {
                console.log(index);
                console.log(row);

                rows.splice(index, 1);

            },
        },
        created() {

        },
    }
</script>

<style lang="scss" >
    @import "@/assets/css/totalVip.scss";
    @import "@/assets/css/staff.scss";
</style>