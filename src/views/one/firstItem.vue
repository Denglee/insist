<template>
    <div>

        <el-button type="primary" :disabled="isDisable" @click="buttonClicked($event)">主要按钮</el-button>

    </div>
</template>

<script>

    import { index,index2 } from '@/assets/js/api.js'; // 导入接口

    export default {
        name: "first",
        data(){
            return {
                isDisable:false,
            }
        },
        methods: {
            // 获取数据
            onLoad() {
                index({
                    city_id:17,
                    use_type:'2'
                    // day:'2019-09-16',
                }).then( res=> {
                    console.log(res)   // 成功回调
                });
                index2().then( res=> {
                    console.log(res)   // 成功回调
                });
            },

            buttonClicked(e){
                that.utils.buttonClicked(e);
            }
        },
        created() {
            this.onLoad();
        }
    }
</script>

<style scoped>

</style>