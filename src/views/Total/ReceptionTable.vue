<template>
    <div class="table vip-tabBox">
        <!--面包屑-->
        <el-breadcrumb separator="/" style="margin-bottom: 30px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/Reception/card_log' }">私教</el-breadcrumb-item>
            <el-breadcrumb-item>私教数量查询</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- B3 私教数量查询-->
        <div class="index-item pt-sales">
            <header class="index-item-title">
                <div class="title">私教数量查询</div>
            </header>

            <!-- 私教数量查询 筛选-->
            <div class="pt-screen">
                <!--部门-->
                <el-select v-model="value" placeholder="请选择部门" class="pt-screen-item"
                           style="width: 150px;">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>

                <!--教练-->
                <el-select v-model="value" placeholder="请选择教练"  class="pt-screen-item"
                           style="width: 130px;">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>

                <!--日期选择-->
                <el-date-picker
                        class="pt-screen-item"
                        v-model="value1"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>

                <!--搜索-->
                <el-input placeholder="请输入内容" v-model="input3" class="pt-screen-item pt-screen-input">
                    <el-button slot="append" icon="el-icon-search" @click="searchPT"></el-button>
                </el-input>

            </div>

            <!--私教数量查询 表格-->
            <el-table
                    class="pt-table"
                    :data="PTNumTable"
                    border
                    :header-cell-style="tableHeaderColor">
                <el-table-column
                        prop="department"
                        label="部门"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="pt"
                        label="教练"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="ptContinuation"
                        label="续课">
                </el-table-column>
                <el-table-column
                        prop="ptTransfer"
                        label="转课">
                    <!--<template slot-scope="scope">￥{{ scope.row.money }}</template>-->
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

            <router-link to='/Reception/table'>
                <el-button  class="btn-ptMore">查看更多</el-button>
            </router-link>

        </div>
    </div>
</template>

<script>
    export default {
        name: "ReceptionTable",
        data() {
            return {}
        },
        methods: {},
        created() {

        },
    }
</script>

<style scoped lang="scss">
    @import "@/assets/css/totalVip.scss";
    .table{
        padding: 20px;
        background-color: #efeef5;
        min-height:100vh;
    }
</style>