<template>
    <div class="PTdetail-main">
        <div class="detail-box detail-padding">
            <div>
                <el-button icon="el-icon-search"  @click="$emit('GoBack')" class="btn-public" :loading="btnState.refushLoad">返回</el-button>
                <el-button icon="el-icon-search" @click="btnRefush" class="btn-public" :loading="btnState.refushLoad">刷新</el-button>
            </div>

            <div>
                <el-date-picker
                        class="month-picker"
                        v-model="dayTrend"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期时间">
                </el-date-picker>
            </div>

            <div>
                {{num}}
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        inject:['reLoad'], //注入依赖 App 中的reLoad方法

        name: "totalTrend",  //客流走势详情
        data() {
            return {
                btnState:{
                    refushLoad:false,
                },
                dayTrend:'',  //日期选择

                num:0,
                data:"xiangduole",
            }
        },
        methods: {
            btnRefush(){
                this.reLoad();
            },
            btnSub(){
              console.log(this.dayTrend);
            },

        },
        destroyed(){
            // sessionStorage.removeItem('statisShowDetail');
        },
        created() {

        },
    }
</script>
