<template>
    <div class="headerTop-box">
        <div class="headerTop-user">


            <!--头部用户信息+退出+更换密码-->
            <div class="headerTop-userInfo">
                <img class="userHeader" :src="UserInfo.logo" alt="">
                <img class="userHeader"  alt="">
                <el-dropdown>
                    <div class="el-dropdown-link">
                        <div class="userName">
                            {{UserInfo.username}}
                            <i class="el-icon-caret-bottom"></i>
                        </div>
                    </div>
                </el-dropdown>
            </div>
        </div>

    </div>
</template>

<script>

    import {ApiloginOut,ApiChangePass} from '@/assets/js/api'

    import {mapState,mapActions, mapGetters} from 'vuex'

    export default {
        name: "HeaderTop",
        data() {

            return {
                SearchVal:"",  //搜索框值
                dialogFormVisible: true,   //修改密码弹出框状态

                imgLOgo:'',
                formLabelWidth: '80px',
            }
        },
        methods: {

        },
        created() {
          // this.userInfo();
          // this.getlocalUserInfo();
          console.log(this.UserInfo);
        },
        computed: {
            ...mapGetters({
                UserInfo:'StoreTagNav/getsUserInfo'
            })
        },
    }
</script>
