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
                潜在会员信息

                <el-button  type="primary" @click="btnMethods('btnEdit','memberEdit')">操作</el-button>
            </div>
        </div>

    </div>
</template>

<script>
    import navRefush from '@/components/navRefush/navRefush';
    export default {
        name: "memberInfo",   //潜在会员信息

        data() {
            return {
                // 新增会员按钮组
                btnVip:[
                    { name:"会员充值", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'menberRecharge' ,pageName:'menberRecharge'},
                    { name:"教练跟进", type:'if',  iconClass:'bgcMediumBlue2 icon-jiaolian', methodsName:'btnAssign', pageName:'addNewVip'},
                    { name:"定金收取", type:'if',  iconClass:'bgcPink icon-shanchuxiantiao', methodsName:'btnDelVip', pageName:'addNewVip'},
                ],
            }
        },
        methods: {
            // 返回上一页
            SecondBackBtn(){
                console.log('二级导航返回点击事件');

                this.$emit('GoBack','memberIndex','memberInfo');
                sessionStorage.removeItem('followPageName');
                sessionStorage.removeItem('followVipInfo');
            },


            // 按钮组 点击事件
            btnMethods(methodsName,pageName) {

                // 会员新增
                if (methodsName == 'btnEdit') {
                    /*首页 页面显影*/
                    console.log(pageName);
                    this.$emit('changePageShow',pageName,'memberInfo');
                }

                // 会员充值
                if (methodsName == 'menberRecharge') {
                    /*首页 页面显影*/
                    this.$emit('changePageShow',pageName,'memberInfo');
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
