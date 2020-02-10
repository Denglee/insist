<template>
    <div>

        <el-button type="primary" :disabled="isDisable" @click="buttonClicked($event)">主要按钮</el-button>

        <i class="iconfont icon-home"></i>主要按钮

<!--        <svg class="icon" aria-hidden="true">-->
<!--            <use xlink:href="#icon-home"></use>-->
<!--        </svg>-->

        <el-button :plain="true" @click="open">
            打开消息提示
        </el-button>

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
                    city_id:'17',
                    day:'2019-09-16',
                }).then( res=> {
                    console.log(res)   // 成功回调
                });
                // index2().then( res=> {
                //     console.log(res)   // 成功回调
                // });
            },

            buttonClicked(e){

              this.isDisable=true;
              setTimeout(()=>{
                  this.isDisable=false;
              },1000)
            },

            open() {
                this.$message('这是一条消息提示');
            },

        },
        created() {
            this.onLoad();
            console.log('sd');
        }
    }
</script>

<style scoped>

</style>