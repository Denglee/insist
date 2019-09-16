<template>
    <div class="user-box">
        <!--头部-->
        <topTabbar :title="title"/>

        <div class="link-box">
            <div class="user-link" v-for="(item,index) in linkArr" :key="index">
                <router-link :to="item.routerName" class="link-item">
                    <img fit="imgFit" :src="item.iconUrl" alt="" />
                    <p>{{item.text}}</p>
                </router-link>
                <img src="../../assets/icon/ic_more.png" alt="" class="img-more">
            </div>
        </div>

        <bomBar/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: "userCenter",
        data(){
            return{
                title:'个人中心',

                // 个人中心导航
                linkArr:[
                    {
                        routerName:{name:'userEdit',},
                        iconUrl:require('../../assets/icon/mine_ic_edit.png'),
                        text:'已编辑模板',
                        id:"0",
                    },
                    // {
                    //     routerName:{name:'/userCenter',},
                    //     iconUrl:require('../../assets/icon/mine_ic_collect.png'),
                    //     text:'收藏模板',
                    //     id:"1",
                    // },
                    // {
                    //     routerName:{name:'/userCenter',},
                    //     iconUrl:require('../../assets/icon/mine_ic_consumption.png'),
                    //     text:'消费记录',
                    //     id:"2",
                    // },
                    // {
                    //     routerName:{name:'/userCenter',},
                    //     iconUrl:require('../../assets/icon/mine_ic_recharge.png'),
                    //     text:'充值记录',
                    //     id:"0",
                    // },
                    {
                        routerName:{name:'userPurchased',},
                        iconUrl:require('../../assets/icon/mine_ic_purchased.png'),
                        text:'已购模板',
                        id:"3",
                    }
                ]
            }
        },

        created(){
           let num=this.$store.state.stateNum;
           console.log(num);
        },

        computed: {
            ...mapGetters(['gettersName']),
        }
    }
</script>

<style scoped>

</style>