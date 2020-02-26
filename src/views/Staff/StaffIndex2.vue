<template>
    <div class="layoutR-main">
        <el-tabs v-model="activeName" class="vip-tabBox pubWidth staff-tabBox">

            <el-tab-pane :lazy='tabLazy' label="员工工资" name="StaffSalary">

            </el-tab-pane>

            <el-tab-pane :lazy='tabLazy' label="提成设置" name="StaffRoyalty">

            </el-tab-pane>

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