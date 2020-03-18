<template>
    <div>
        <!--员工列表 筛选-->
        <div class="pt-screen">
            <!--在职-->
            <!--                            <el-select v-model="lockStateVal" placeholder="是否在职" class="inp-mar14 ptSel-section">-->
            <!--                                <el-option v-for="item in lockState" :key="item.index" :label="item.value" :value="item.lock"></el-option>-->
            <!--                            </el-select>-->
            <!--职位-->
            <!--                            <el-select v-model="userTypeListVal" placeholder="请选择职位" class="inp-mar14 ptSel-section">-->
            <!--                                <el-option v-for="item in userTypeList" :key="item.index" :label="item.catname" :value="item.id"></el-option>-->
            <!--                            </el-select>-->
            <!--部门-->
            <!--<el-select v-model="userTypeListVal" placeholder="请选择部门" class="inp-mar14 ptSel-section">
                <el-option v-for="item in userTypeList" :key="item.index" :label="item.catname" :value="item.id"></el-option>
            </el-select>-->
            <!--班次-->
            <!--<el-select v-model="userTypeListVal" placeholder="请选择班次" class="inp-mar14 ptSel-section">
                <el-option v-for="item in userTypeList" :key="item.index" :label="item.catname" :value="item.id"></el-option>
            </el-select>-->
            <!--                            <el-input placeholder="请输入姓名或电话号码" v-model="staffInpVal" class="inp-mar14 pt-screen-input" clearable></el-input>-->
            <!--                            &lt;!&ndash;搜索&ndash;&gt;-->
            <!--&lt;!&ndash;                            <el-button icon="el-icon-search" @click="btnSeaStaff" class="btn-search">搜索</el-button>&ndash;&gt;-->
            <!--                            <div class="fr">-->
            <!--                                <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">-->
            <!--                                    <el-button icon="el-icon-edit" @click="changeStaff()" class="btn-search"></el-button>-->
            <!--                                </el-tooltip>-->
            <!--                                <el-tooltip class="item" effect="dark" content="删除" placement="bottom">-->
            <!--                                    <el-button icon="el-icon-delete"  @click="deleteStaff()" class="btn-search"></el-button>-->
            <!--                                </el-tooltip>-->
            <!--                            </div>-->
        </div>
        <!--员工列表 表格-->
        <el-table class="pub-table" :data="tableStaff" border>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="sex" label="性别">
                <template slot-scope="scope">
                    <div v-if="scope.row.sex == 0 " class="status-connect">未知</div>
                    <div v-if="scope.row.sex == 1 " class="status-break">男</div>
                    <div v-if="scope.row.sex == 2 " class="status-break">女</div>
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
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="user_no" label="工号"></el-table-column>
            <el-table-column prop="deduction_type" label="提成方式"></el-table-column>
            <el-table-column prop="register_time" label="创建时间">
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
        >
        </el-pagination>
    </div>
</template>

<script>
    import {staffIndex} from '@/assets/js/api' /*引用 会员总览 接口*/
    export default {
        name: "statisDetails",
        data() {
            return {
                tableStaff: [], //员工列表数组
            }
        },
        methods: {
            /*员工列表接口*/
            getStaffIndex(){
                staffIndex({
                    p:1,
                    zmtek_ver:2,
                    user_type:'10000',
                    phone:'',
                    lock:1,
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
        },
        created() {
            this.getStaffIndex();
        },
    }
</script>

<style lang="scss">
    @import "@/assets/css/totalVip.scss";
</style>