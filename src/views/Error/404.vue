<template>
    <div class="lostPage-box">
        <div class="title-404">很抱歉，页面丢失了，请及时联系管理员！</div>
        <el-button class="btn-backIndex" @click="backIndex">返回主页</el-button>
        <el-button class="btn-back" @click="back">返回上页</el-button>
    </div>
</template>

<script>
    export default {
        methods: {
            backIndex(){
                this.$router.push({
                    path:'/index'
                })
            },
            back() {
                this.$router.go(-1)
            }
        }
    }
</script>
