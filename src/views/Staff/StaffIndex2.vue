<template>
    <div class="layoutR-main">

        <div class="staffList-box pubWidth">

            <!--员工列表筛选-->
            <div class="pt-screen">
                <!--在职-->
                <el-select v-model="value" placeholder="在职" class="pt-screen-item"
                           style="width: 150px;">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>

                <!--部门-->
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

                <!--搜索-->
                <el-button icon="el-icon-search" @click="searchPT" class="btn-search">搜索</el-button>

            </div>

            <!--私教数量查询 表格-->
            <el-table
                    class="pt-table"
                    :data="PTNumTable"
                    border>
                <el-table-column
                        prop="department"
                        label="部门">
                </el-table-column>
                <el-table-column
                        prop="pt"
                        label="教练">
                </el-table-column>
                <el-table-column
                        prop="ptContinuation"
                        label="续课">
                </el-table-column>
                <el-table-column
                        prop="ptTransfer"
                        label="转课">
                    <!--<template slot-scope="scope"><span class='price'>￥</span>{{ scope.row.money }}</template>-->
                </el-table-column>
                <el-table-column
                        prop="ptRefund"
                        label="退款">
                </el-table-column>
                <el-table-column
                        prop="ptOverdue"
                        label="过期">
                </el-table-column>
                <el-table-column
                        prop="ptFollow"
                        label="跟进">
                </el-table-column>
                <el-table-column
                        prop="ptNoFollow"
                        label="未跟进">
                </el-table-column>
                <el-table-column
                        prop="ptNewAdd"
                        label="新增私教">
                </el-table-column>
                <el-table-column
                        prop="ptTotal"
                        label="总会员数">
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




        <el-tabs v-model="activeName" class="vip-tabBox pubWidth" id="staff-tabBox" style="display: none;">

            <!--tab1 员工工资-->
            <el-tab-pane :lazy='tabLazy' label="员工工资" name="StaffSalary">
                <!--员工工资筛选-->
                <div class="pt-screen">

                    <el-input placeholder="请输入内容" v-model="input3" class="pt-screen-item pt-screen-input"></el-input>

                    <!--日期选择-->
                    <el-date-picker
                            class="pt-screen-item"
                            v-model="value1"
                            type="date">
                    </el-date-picker>

                    <!--搜索-->
                    <el-button icon="el-icon-search" @click="searchPT" class="btn-search">搜索</el-button>

                </div>


                <!--私教数量查询 表格-->
                <el-table
                        class="pt-table"
                        :data="PTNumTable"
                        border>
                    <el-table-column
                            prop="department"
                            label="部门">
                    </el-table-column>
                    <el-table-column
                            prop="pt"
                            label="教练">
                    </el-table-column>
                    <el-table-column
                            prop="ptContinuation"
                            label="续课">
                    </el-table-column>
                    <el-table-column
                            prop="ptTransfer"
                            label="转课">
                        <!--<template slot-scope="scope"><span class='price'>￥</span>{{ scope.row.money }}</template>-->
                    </el-table-column>
                    <el-table-column
                            prop="ptRefund"
                            label="退款">
                    </el-table-column>
                    <el-table-column
                            prop="ptOverdue"
                            label="过期">
                    </el-table-column>
                    <el-table-column
                            prop="ptFollow"
                            label="跟进">
                    </el-table-column>
                    <el-table-column
                            prop="ptNoFollow"
                            label="未跟进">
                    </el-table-column>
                    <el-table-column
                            prop="ptNewAdd"
                            label="新增私教">
                    </el-table-column>
                    <el-table-column
                            prop="ptTotal"
                            label="总会员数">
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

            <!--tab2 提成设置-->
            <el-tab-pane :lazy='tabLazy' label="提成设置" name="StaffRoyalty">

            </el-tab-pane>

            <!--tab3 奖惩设置-->
            <el-tab-pane :lazy='tabLazy' label="奖惩设置" name="StaffReward ">

            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "StaffIndex2",
        data() {
            return {
                activeName: 'StaffSalary', //StaffSalary StaffRoyalty StaffReward
                tabLazy: true,

                PTNumTable: [{
                    name:"李登",
                    sex:"男",
                    position:"教练",
                    tel:"17688888444",
                    jobId:"20136",
                    Royalty: '教练提成',
                    time: '2020-02-27',
                    state: "在职",
                    caozuo: '操作',
                }
                ],
            }
        },
        methods: {},
        created() {

        },
    }
</script>

<style lang="scss" >
    @import "@/assets/css/totalVip.scss";
    @import "@/assets/css/staff.scss";
</style>