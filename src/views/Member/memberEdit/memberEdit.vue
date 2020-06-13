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

        <!--tab2 部门 添加 弹窗-->
        <el-dialog  :append-to-body="true" title="相见时难别亦难" :visible.sync="diaChange" width="600px" >
            <div>东风无力百花残</div>
        </el-dialog>
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
                    { name:"修改状态", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberChange' ,pageName:'memberChange'},
                ],

                diaChange:false,
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
                if (methodsName == 'memberChange') {
                    /*首页 页面显影*/
                    console.log('修改状态');
                    this.diaChange = true;
                    // this.$emit('changePageShow',pageName,'memberEdit');
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
