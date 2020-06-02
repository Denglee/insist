<template>
    <div>
        <div class="btnNav-contain">
            <navRefush class="btnNav-left"  @SecondBack="SecondBackBtn"></navRefush>
            <ul>
                <li class="btnNav-flex btnNav-vip">
                    <button class="btnNav-box" v-for="(item,index) in btnVip" :key="index" @click="btnMethods(item.methodsName,item.pageName)">
                        <i class="iconfont" :class="item.iconClass"></i>
                        <span>{{item.name}}</span>
                    </button>
                </li>
            </ul>
        </div>
        <div class="bgWhite-public">
            <div class="bgWhite-padd20">
                会员操作
            </div>
        </div>

    </div>
</template>

<script>
    import navRefush from '@/components/navRefush/navRefush';
    export default {
        name: "memberEdit",   //三级首页 会员操作

        data() {
            return {
                // 新增会员按钮组
                btnVip:[
                    { name:"操作记录", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberHistory' ,pageName:'memberHistory'},
                ],
            }
        },
        methods: {
            // 返回上一页
            SecondBackBtn(){
                console.log('二级导航返回点击事件');
                this.$emit('GoBack','memberInfo','memberEdit');
                sessionStorage.removeItem('followPageName');
                sessionStorage.removeItem('followVipInfo');
            },


            // 按钮组 点击事件
            btnMethods(methodsName,pageName) {
                // 会员新增
                if (methodsName == 'memberHistory') {
                    console.log('btnEdit');

                    /*首页 页面显影*/
                    this.$emit('changePageShow',pageName,'memberEdit');
                }

                // 会员新增
                if (methodsName == 'menberRecharge') {
                    /*首页 页面显影*/
                    this.$emit('changePageShow',pageName,'memberEdit');
                }

            },
        },
        created() {

        },
        components:{
            navRefush,
        },
    }
</script>
