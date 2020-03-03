<template>
    <div class="layoutR-main">
        <!--右边iframe-->
        <!--<publicIframe/>-->

        <div v-show="staffListState">

            <div class="clearfix">
                <el-button type="primary" class="btn-add fr btn-search" @click="btnAddStaff">添加员工</el-button>
            </div>

            <!--员工列表-->
            <div class="staffList-box vip-tabBox pubWidth">

                <!--员工列表 筛选-->
                <div class="pt-screen">
                    <!--在职-->
                    <el-select v-model="value" placeholder="在职" class="pt-screen-item ptSel-section">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                    <!--部门-->
                    <el-select v-model="value" placeholder="全部" class="pt-screen-item ptSel-section">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                    <el-input placeholder="请输入内容" v-model="input3" class="pt-screen-item pt-screen-input"></el-input>

                    <!--搜索-->
                    <el-button icon="el-icon-search" @click="" class="btn-search">搜索</el-button>

                    <div class="fr">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                            <el-button icon="el-icon-search" @click="change()" class="btn-search"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                            <el-button icon="el-icon-delete"  @click="delete2()" class="btn-search"></el-button>
                        </el-tooltip>
                    </div>

                </div>

                <!--员工列表 表格-->
                <el-table
                        class="pt-table"
                        :data="PTNumTable2"
                        border
                        @selection-change="checkedStaff">

                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>

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
                </el-table>

                <div class="ptTable-assist">
                    <el-pagination
                            background
                            layout="prev, pager, next,total,jumper"
                            :total="20">
                    </el-pagination>
                </div>
            </div>
        </div>

        <!--提成 编辑弹出-->
        <el-dialog title="员工编辑" :visible.sync="EditListForm">
            <el-form :model="staffSelection[0]">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="staffSelection.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="staffSelection.sex" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="职位" :label-width="formLabelWidth">
                    <el-input v-model="staffSelection.position" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="电话号码" :label-width="formLabelWidth">
                    <el-input v-model="staffSelection.tel" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="编号" :label-width="formLabelWidth">
                    <el-input v-model="staffSelection.jobId" autocomplete="off"></el-input>
                    <div>请输入编号，如：小惠，编号写：xh,便于后期快速查询</div>
                </el-form-item>

                <el-form-item label="提成方式" :label-width="formLabelWidth">
                    <!--     <el-select v-model="editForm.Royalty" placeholder="请选择">
                             <el-option
                                     v-for="item in RoyaltyOptions"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                             </el-option>
                         </el-select>-->
                    <!--                    <el-input v-model="editForm.Royalty" autocomplete="off"></el-input>-->
                </el-form-item>

                <el-form-item label="创建时间" :label-width="formLabelWidth">
                    <el-date-picker
                            v-model="staffSelection.time"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="状态" :label-width="formLabelWidth">
                    <template>
                        <el-radio v-model="staffSelection.state" label="0">离职</el-radio>
                        <el-radio v-model="staffSelection.state" label="1">在职</el-radio>
                    </template>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureEdit()">确 定</el-button>
            </div>
        </el-dialog>

        <!--添加员工-->
        <div v-show="addStaffState" class="vip-tabBox">
            <navBread @GoBack="goBack('staffListState','addStaffState')" breadTitle="员工列表"
                      breadContent1="添加员工"></navBread>
            <el-form :model="editForm" class="addForm-box">
                <el-form-item label="员工头像" :label-width="formLabelWidth">

                </el-form-item>

                <el-form-item label="职位" :label-width="formLabelWidth">
                    <el-select v-model="editForm.jobId" placeholder="请选择活动区域" class="inpStaffTel">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="editForm.position" autocomplete="off" class="inpStaffName" clearable></el-input>
                </el-form-item>

                <el-form-item label="编号" :label-width="formLabelWidth">
                    <el-input v-model="editForm.tel" autocomplete="off" clearable class="inpStaffName"></el-input>
                </el-form-item>

                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio-group v-model="editForm.jobId" class="inpStaffName">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="editForm.jobId" autocomplete="off" clearable class="inpStaffTel"></el-input>
                </el-form-item>

                <el-form-item label="班次" :label-width="formLabelWidth">
                    <el-select v-model="editForm.jobId" placeholder="请选择活动区域" class="inpStaffTel">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="价格模式" :label-width="formLabelWidth">
                    <el-select v-model="editForm.jobId" placeholder="请选择活动区域" class="inpStaffTel">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="基本工资" :label-width="formLabelWidth">
                    <el-input v-model="editForm.jobId" autocomplete="off" class="inpStaffTel"></el-input>
                </el-form-item>

                <el-form-item label="提成方式1" :label-width="formLabelWidth">
                    <el-select v-model="editForm.jobId" placeholder="请选择活动区域" class="inpStaffTel">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="备注" :label-width="formLabelWidth">
                    <!--                    <el-input v-model="editForm.jobId" autocomplete="off"></el-input>-->



                </el-form-item>

                <el-form-item :label-width="formLabelWidth">


                </el-form-item>
            </el-form>


        </div>

    </div>
</template>

<script>
    import Cropper from '@/components/cropper/cropper';
    import Editor from '@/components/wangEnduit/wangEnduit'
    import navBread from '@/components/Echarts/navBread'

    export default {
        name: "Staffindex",  //员工列表

        data() {
            return {


                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }],
                value:'',
                input3:'',

                PTNumTable2: [{
                    id:"11",
                    name: "李登",
                    sex: "男",
                    position: "教练",
                    tel: "17688888444",
                    jobId: "20136",
                    Royalty: '教练提成',
                    time: '2020-02-27',
                    state: "1",
                }, {
                    id:"12",
                    name: "小丽",
                    sex: "女",
                    position: "前台",
                    tel: "17688888544",
                    jobId: "20137",
                    Royalty: '前台提成',
                    time: '2020-01-27',
                    state: "0",
                    // caozuo: '操作',
                }
                ],


                formLabelWidth: '120px',
                EditListForm: false,
                editForm: {
                    name: "",
                    sex: "",
                    position: "",
                    tel: "",
                    jobId: "",
                    Royalty: '',
                    time: '',
                    state: "",
                },

                staffListState: true,

                /*添加员工*/
                addStaffState: false,

                checkedRows: [],  //选中的值
                staffSelection: [], //修改表单值
            }
        },


        methods: {

            change(){
                let checkedRows =  this.checkedRows;
                console.log(checkedRows);
                console.log(checkedRows.length);
                if(checkedRows.length == 0){
                    this.$message.error('至少选一个操作对象');
                } else if(checkedRows.length == 1){
                    this.staffSelection = checkedRows[0];
                    this.EditListForm = true;
                }else{
                    this.$message.error('只能选一个');
                }

            },


            delete2(){


            },

            checkedStaff(val) {
                console.log(val);
                this.checkedRows = val;
            },

            /*添加员工显示*/
            btnAddStaff() {
                this.staffListState = false;
                this.addStaffState = true;
            },

            /*编辑*/
            handleEdit(index, row) {
                console.log(index, row);
                console.log(row);
                // this.editForm = row;
                this.EditListForm = true;
            },

            /*编辑确定*/
            sureEdit() {
                // console.log(this.editForm);

                this.$message({
                    type: 'success',
                    duration: '1500',
                    message: '更新成功'
                });

                this.EditListForm = false;
            },

            /*删除*/
            handleDelete(index, row, rows) {
                console.log(index);
                console.log(row);

                rows.splice(index, 1);

            },

            /* 返回上一页 */
            goBack(e1, e2) {
                console.log(e1);
                this[e1] = true;   //显示 列表
                this[e2] = false;   //隐藏当前
            },
        },
        created() {

        },
        components: {
            navBread,
            Editor,
            Cropper,
        },
    }
</script>

<style lang="scss">
    @import "@/assets/css/totalVip.scss";
    @import "@/assets/css/staff.scss";
</style>