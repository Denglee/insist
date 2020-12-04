<template>
    <div>
        <div class="btnNav-contain">
            <navRefush class="btnNav-left"  @SecondBack="SecondBackBtn"></navRefush>
        </div>
        <div class="bgWhite-public">
            <div class="bgWhite-padd20">
                历史记录
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "memberhistory",   //三级首页 会员操作

        data() {
            return {
                // 新增会员按钮组
                btnVip:[
                    { name:"操作记录", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'editHistory' ,pageName:'editHistory'},
                ],
            }
        },
        methods: {
            // 返回上一页
            SecondBackBtn(){
                console.log('二级导航返回点击事件');
                this.$emit('GoBack','memberEdit','memberEdit');
            },


            // 按钮组 点击事件
            // btnMethods(methodsName,pageName) {
            //     // 会员新增
            //     if (methodsName == 'editHistory') {
            //         console.log('btnEdit');
            //         /*首页 页面显影*/
            //         // this.$emit('changePageShow','memberEdit');
            //     }
            //
            //     // 会员新增
            //     if (methodsName == 'menberRecharge') {
            //         /*首页 页面显影*/
            //         this.$emit('changePageShow',pageName);
            //     }
            // },

        },
        created() {

        },
        components:{

        },
    }
</script>
