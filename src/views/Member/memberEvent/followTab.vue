<template>
    <div>
        <navRefush @SecondBack="SecondBackBtn"></navRefush>
        <div class="bgWhite-public">
            <header class="index-item-title">会员跟进</header>
            <div class="bgWhite-padd20">

                <el-radio-group v-model="radioFollow"  @change="changeFollow">
                    <el-radio label="radioTrainer">
                        <i class="iconfont icon-jiaolian"></i>教练跟进
                    </el-radio>
                    <el-radio label="radioAdviser">
                        <i class="iconfont icon-zixunguwen"></i>顾问跟进
                    </el-radio>
                    <el-radio label="radioReception">
                        <i class="iconfont icon-zixunguwen"></i>前台跟进
                    </el-radio>
                    <el-radio label="radioService">
                        <i class="iconfont icon-kefu"></i>客服跟进
                    </el-radio>
                </el-radio-group>

                <!--教练跟进-->
                <div v-if="radioFollow == 'radioTrainer'">
                    <followTrainer :followVipInfo="followVipInfo" :followType="followType.followTrainer" ref="childTAb"></followTrainer>
                </div>

                <!--顾问跟进-->
                <div v-if="radioFollow == 'radioAdviser'">
                    <followTrainer :followVipInfo="followVipInfo" :followType="followType.followAdviser" ref="childTAb"></followTrainer>
                </div>

                <!--前台跟进-->
                <div v-if="radioFollow == 'radioReception'">
                    <followTrainer :followVipInfo="followVipInfo" :followType="followType.followReception" ref="childTAb"></followTrainer>
                </div>

                <!--客服跟进-->
                <div v-if="radioFollow == 'radioService'">
                    <followTrainer :followVipInfo="followVipInfo" :followType="followType.followService" ref="childTAb"></followTrainer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import navRefush from '@/components/navRefush/navRefush';
    import followTrainer from "../memberFollow/followTrainer";  /*教练跟进*/
    export default {
        name: "followTab",  //教练跟进
        data() {
            return {
                radioFollow: 'radioTrainer',
                followVipInfo:[], //预备会员信息
                followType:{
                    followTrainer:'followTrainer',
                    followAdviser:'followAdviser',
                    followReception:'followReception',
                    followService:'followService',
                }
            }
        },
        methods: {
            SecondBackBtn(){
                console.log('二级导航返回点击事件');
                this.$emit('GoBack');
                sessionStorage.removeItem('followPageName');
                sessionStorage.removeItem('followVipInfo');
            },

            /*radio change事件*/
            changeFollow(val){
                sessionStorage.setItem('followPageName', val);
                this.$refs.childTAb.resetForm();
            },

        },
        created() {
            /*获取页面信息*/
            let followPageName = sessionStorage.getItem('followPageName');
            if(followPageName){
                console.log(`当前页面followPageName： ${followPageName}`);
                this.radioFollow = followPageName;
            }

            /*获取预备会员信息*/
            let followVipInfo =JSON.parse(sessionStorage.getItem('followVipInfo'));
            if(followVipInfo){
                console.log(`当前页面followVipInfo： ${followVipInfo}`);
                this.followVipInfo = followVipInfo;
            }
        },
        components:{
            navRefush,
            followTrainer,
        },
    }
</script>
