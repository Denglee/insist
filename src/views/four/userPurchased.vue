<template>
    <div class="userEdit-box">
        <topTabbar :title="title"/>
<!--        <div>-->
<!--            <P class="titleName">名称：{{gettersName}}</P>-->
<!--            <div>-->
<!--                &lt;!&ndash; 点击修改 为 A 餐馆 &ndash;&gt;-->
<!--                <button class="btn" @click="actionsName2(title2)">已经购买</button>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "userPurchased",
        data(){
            return{
                title:"已购买模板",
                title2:"已购买状态=statename"
            }
        },
        methods:{
            ...mapActions( // 语法糖
                ['actionsName2'] // 相当于this.$store.dispatch('actionsName'),提交这个方法
            ),

            // 获取 已编辑 数据
            getEditCode(eaditVal){
                this.$axios.get('/index.php?c=scene&a=my',{
                    params: {
                        showData: '',
                        pageNo: 1,
                        pageSize: 12,
                        user: '',
                        name: '',
                        groupId: '',
                    }
                })
                .then(res =>{
                    console.log(res.data);
                })
                .catch(error=>{
                    console.log("二级导航分类:" + error)
                })
            },
        },

        computed: {
            ...mapGetters(['gettersName']) // 动态计算属性，相当于this.$store.getters.gettersName
        }
    }
</script>

<style scoped lang="scss">

</style>