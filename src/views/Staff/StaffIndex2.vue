<template>
    <div class="layoutR-main">

        <el-tabs v-model="activeName" class="vip-tabBox pubWidth" id="staffPay-tabBox">

            <!--tab1 员工工资-->
            <el-tab-pane :lazy='tabLazy' label="员工工资" name="StaffSalary">

            </el-tab-pane>

            <!--tab2 提成设置-->
            <el-tab-pane :lazy='tabLazy' label="提成设置" name="StaffRoyalty" class="pub-table">
                <div class="vip-tabBox">
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


                </div>
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


        <!--提成 设置 弹出-->
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



    </div>
</template>

<script>
    export default {
        name: "StaffIndex2",
        data() {
            return {
                activeName: 'StaffRoyalty', //StaffSalary StaffRoyalty StaffReward
                tabLazy: true,

                /* tab2 提成设置 */
                royaltyType:this.GLOBAL.royaltyType,
                dialogRoyalty:false,   //提成名称 设置 弹窗
                setupRoyalty: {
                    name:'',
                    royaltyType:''
                },
                tableRoyalty:[
                    {id:1, name:'教练提成',type:'1'},
                    {id:2, name:'教练提2',type:'2'},
                ],


                formLabelWidth: '120px',
            }
        },
        methods: {

            /* === tab2  提成设置 ==*/
            /*添加提成 弹窗*/
            btnAddRoyalty(){
                this.dialogRoyalty = true;
            },

            /*提成 详情 设置*/
            EditRoyalty(index, row){
                console.log(index, row);
            },

            /*编辑*/
            handleEdit(index, row) {
                console.log(index, row);
                console.log(row);
                this.editForm = row;
                this.EditListForm = true;
            },

            /*编辑确定*/
            sureDialogRoyalty(){
                console.log(this.setupRoyalty);
                console.log(this.setupRoyalty.name);

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
    @import "@/assets/css/staff.scss";

</style>