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
                    <el-select v-model="lockStateVal" placeholder="在职" class="pt-screen-item ptSel-section">
                        <el-option v-for="item in lockState" :key="item.index" :label="item.value" :value="item.lock"></el-option>
                    </el-select>

                    <!--部门-->
                    <el-select v-model="userTypeListVal" placeholder="职位" class="pt-screen-item ptSel-section">
                        <el-option v-for="item in userTypeList" :key="item.index" :label="item.catname" :value="item.id"></el-option>
                    </el-select>

                    <el-input placeholder="请输入姓名或电话号码" v-model="staffInpVal" class="pt-screen-item pt-screen-input"></el-input>

                    <!--搜索-->
                    <el-button icon="el-icon-search" @click="btnSeaStaff" class="btn-search">搜索</el-button>

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
                <el-table class="pt-table" :data="tableStaff" border @selection-change="checkedStaff">
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
                            <div v-if="scope.row.user_type == 0 " class="status-connect">未知</div>
                            <div v-else>{{scope.row.user_type}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone" label="电话" width="120px"></el-table-column>
                    <el-table-column prop="user_no" label="工号"></el-table-column>
                    <el-table-column prop="Royalty" label="提成方式"></el-table-column>
                    <el-table-column prop="register_time" label="创建时间"></el-table-column>
                    <el-table-column prop="lock" label="状态">
                        <template slot-scope="scope">
                            <div v-if="scope.row.lock == 0 " class="status-connect">在职</div>
                            <div v-if="scope.row.lock == 1 " class="status-break">离职</div>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="ptTable-assist">
                    <el-pagination
                            background
                            layout="prev, pager, next,total,jumper"
                            :total="pageTotalRows"
                            :page-size ="pageListRows"
                            @current-change="PageCurrent">
                    </el-pagination>
                </div>
            </div>
        </div>

        <!--提成 编辑弹出-->
       <!-- <el-dialog title="员工编辑" :visible.sync="EditListForm">
            <el-form :model="staffSelection[0]">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="staffSelection.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="staffSelection.sex" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="职位" :label-width="formLabelWidth">
                    <el-input v-model="staffSelection.user_type" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="电话号码" :label-width="formLabelWidth">
                    <el-input v-model="staffSelection.phone" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="编号" :label-width="formLabelWidth">
                    <el-input v-model="staffSelection.user_no" autocomplete="off"></el-input>
                    <div>请输入编号，如：小惠，编号写：xh,便于后期快速查询</div>
                </el-form-item>

                <el-form-item label="提成方式" :label-width="formLabelWidth">

                </el-form-item>

                <el-form-item label="创建时间" :label-width="formLabelWidth">
                    <el-date-picker
                            v-model="staffSelection.register_time"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="状态" :label-width="formLabelWidth">
                    <template>
                        <el-radio v-model="staffSelection.lock" label="0">在职</el-radio>
                        <el-radio v-model="staffSelection.lock" label="1">离职</el-radio>
                    </template>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureEdit()">确 定</el-button>
            </div>
        </el-dialog>-->

        <!--添加员工-->
        <!--<div v-show="addStaffState" class="vip-tabBox">
            <navBread @GoBack="goBack('staffListState','addStaffState')" breadTitle="员工列表"
                      breadContent1="添加员工"></navBread>
            <el-form :model="editForm" class="addForm-box">

                <el-form-item label="员工头像" :label-width="formLabelWidth">
                    <el-upload
                            action="#"
                            :on-change='changeUpload'
                            list-type="picture-card"
                            :auto-upload="false">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img class="el-upload-list__item-thumbnail"
                                    :src="file.url" alt="">
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="staffCardPreview(file)">
                                    <i class="el-icon-zoom-in"></i>
                                </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                  <i class="el-icon-delete"></i>
                                </span>
                              </span>
                        </div>
                    </el-upload>
                    &lt;!&ndash;弹出放大效果&ndash;&gt;
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
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
                    &lt;!&ndash;                    <el-input v-model="editForm.jobId" autocomplete="off"></el-input>&ndash;&gt;



                </el-form-item>

                <el-form-item :label-width="formLabelWidth">

                    <el-button @click="postStaffAdd()">提交</el-button>

                </el-form-item>
            </el-form>

        </div>-->



    </div>
</template>

<script>
    import Cropper from '@/components/cropper/cropper';
    import Editor from '@/components/wangEnduit/wangEnduit'
    import navBread from '@/components/Echarts/navBread'

    import {staffAdd, staffIndex,} from '@/assets/js/api' /*引用 员工 接口*/
    export default {
        name: "StaffIndex",  //员工列表

        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                imgUrl:'',   //头像路径
            /*    seaFormStaff:[

                ],*/
                /* 筛选 在职状态*/
                lockState:[
                    {lock:0,value:'在职'},
                    {lock:1,value:'离职'},
                ],
                lockStateVal:'',

                /*筛选 职位*/
                userTypeList:this.GLOBAL.userTypeList,
                userTypeListVal:'', /* 职位 选中值*/

                staffInpVal:'',


                tableStaff: [], //员工列表数组
                pageTotalRows:0,  /*分页总数*/
                pageListRows:0,  /*分页 每页数*/
                staffPage:1,     /*分页 页码*/

                formLabelWidth: '120px',
                EditListForm: false, //员工编辑 块 显示状态


                staffListState: true,//员工列表 块 显示状态

                /*添加员工*/
                addStaffState: false, //添加员工 块 显示状态

                checkedRows: [],  //选中的值
                staffSelection: [], //修改表单值

                editForm:[],
            }
        },

        methods: {

            open() {
                this.$alert("     <div class='alertTip-box'>\n" +
                    "            <div>疫情无情人有情，公司决定对所有用户延时一个季度的系统使用权，智迈科技与您一起共克艰难</div>\n" +
                    "            <div class='alertTip-sub'>系统合同到期后，免费使用三个月。时间以合同到期日为准</div>\n" +
                    "        </div>", {
                    confirmButtonText: '加油',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
                });
            },

            /*筛选 员工*/
            btnSeaStaff(){
              console.log(this.staffInpVal);
              console.log(this.userTypeListVal);
              console.log(this.lockStateVal);

            },
            /*员工列表 接口*/
            getStaffIndex(page){
                staffIndex({
                    p:page,
                    zmtek_ver:2,
                }).then(res => {
                    console.log(res.data.list);
                    this.tableStaff = res.data.list;
                    this.pageTotalRows = Number(res.data.totalRows);
                    this.pageListRows = res.data.listRows;
                }).catch(res => {
                    console.log(res);
                });
            },
            /*分页*/
            PageCurrent(page){
                this.staffPage = page;
                this.getStaffIndex(this.staffPage);
            },
            // pagePrev(){
            //     this.staffPage = this.staffPage-1;
            //     console.log(this.staffPage);
            //     this.getStaffIndex(this.staffPage);
            // },
            // pageNext(){
            //     this.staffPage = this.staffPage+1;
            //     console.log(this.staffPage);
            //     this.getStaffIndex(this.staffPage);
            // },

            /*上传 选中*/
            changeUpload(file){
                console.log(file);
                this.GLOBAL.getEleBase64(file.raw).then(res => {
                    console.log(res);
                    this.imgUrl = res;
                });
            },


            /*添加员工*/
            postStaffAdd(){
                let userimage = this.imgUrl;
                console.log(userimage);
                staffAdd({
                    userimage:userimage,
                    information:2,
                    zmtek_ver:2,
                }).then(res => {
                    console.log(res);
                }).catch(res => {
                    console.log(res);
                });
            },

            /*头像上传 删除*/
            handleRemove(file) {
                console.log(file);
            },
            /*放大*/
            staffCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            /*table 操作*/
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
            // this.open();
            this.getStaffIndex(this.staffPage);
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