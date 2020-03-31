<template>
    <div class="total-vipBox">

        <!--选项卡-->
        <el-tabs v-model="activeTabName" @tab-click="tabTotal" class="vip-tabBox pubWidth" v-show="showStateArr.tabPaneState">

            <!--  tabItem1 会员总览 -->
            <el-tab-pane :lazy='tabLazy' label="会员总览" name="VipTotal" >
              <VipTotal @showState="showState(e1)"></VipTotal>
            </el-tab-pane>

            <!-- tabItem2 私教 -->
            <el-tab-pane :lazy='tabLazy' label="私教" name="VipPT">
                <VipPT  @showState="showState($event)"></VipPT>
            </el-tab-pane>

            <!-- tabItem3 会籍 -->
            <el-tab-pane :lazy='tabLazy' label="会籍" name="VipMembership">
                <VipMembership @showState="showState($event)"></VipMembership>
            </el-tab-pane>

        </el-tabs>

        <ul>
            <!--私教销售额查询 表格 详情-->
            <li v-if="showStateArr.ptSalesD">
                <navBread @GoBack="goBack('VipPT','ptSalesD')" breadTitle="私教" breadContent1="销售额查询详情"></navBread>
                <statisDetails :ptSalesPage="10"></statisDetails>
            </li>

            <!--私教 上课 表格 详情-->
            <li v-if="showStateArr.ptLessonD">
                <navBread @GoBack="goBack('VipPT','ptLessonD')" breadTitle="私教" breadContent1="私教上课详情"></navBread>
                <ptLessonDetails :ptSalesPage="10"></ptLessonDetails>
            </li>
        </ul>

        <ul>
            <!--会员 上课 表格 详情-->
            <li v-if="showStateArr.vLessonD">
                <navBread @GoBack="goBack('VipPT','vLessonD')" breadTitle="会籍" breadContent1="会籍上课详情"></navBread>
                <vipLessonDetails :ptSalesPage="10"></vipLessonDetails>
            </li>
        </ul>

    </div>
</template>

<script>
    import navBread from '@/components/navBread/navBread'  //面包屑导航 组件
    import monthSceen from '@/components/monthSceen/monthSceen'  //7天时间筛选组件

    import statisDetails from '@/components/details/statisDetails'  // 详情组件
    import ptLessonDetails from '@/components/details/ptLessonDetails'  // 详情组件

    import VipTotal from '@/views/Total/details/VipTotal'  //会员总览 tab
    import VipPT from '@/views/Total/details/VipPT'  // 私教 tab
    import VipMembership from '@/views/Total/details/VipMembership'  //会籍 tab

    export default {
        inject:['reLoad'], //注入依赖 App 中的reLoad方法
        name: "StatisIndex",  //会员总览
        data() {
            return {
                activeTabName: 'VipPT', //VipTotal VipPT VipMembership
                tabLazy: true,


                showStateArr:{
                    tabPaneState: true,    //tab 显隐
                    ptSalesD: false,  //销售查询表格 显隐
                    ptNumD: false,
                    vSalesD: false,
                    vNumD: false,
                    vLessonD: false,
                },

            }
        },
        methods: {
            /*tab切换*/
            tabTotal(tab, event) {
                let tabName = tab.name;
                sessionStorage.setItem('StatiSIndexTabName',tabName)
                /*this.callTabApi(tabName);*/
            },

            /*查看更多*/
            showState(e1){
                this.showStateArr.tabPaneState = false;
                this.showStateArr[e1] = true;  //表格显示
            },

            /* 返回上一页 */
            goBack(e1, e2) {
                console.log(e1);
                console.log(e2);

                this.showStateArr[e2] = false;   //隐藏当前 表格详情
                this.showStateArr.tabPaneState = true; //显示对应tab
                this.activeName = e1; //VipTotal VipPT VipMembership
            },

            /*接口调用*/
            callTabApi(tabName){
                console.log(tabName);
                if(tabName == 'VipTotal'){
                    if(this.hasAxios.VipTotal == false ){

                    }
                }

                if(tabName == 'VipPT'){
                    if(this.hasAxios.VipPT == false ){
                        /*调用 ==== 私教1 ==== 私教统计*/

                    }
                }

                if(tabName == 'VipMembership'){
                    if(this.hasAxios.VipMembership == false ) {

                    }
                }

                /*created 调用*/
                /*let tabName =this.activeTabName;
                this.callTabApi(tabName);*/
            },
        },
        created() {
            let tabName = sessionStorage.getItem('StatiSIndexTabName');
            if(tabName == null){
                tabName = this.activeTabName;
            }else {
                this.activeTabName = tabName;
            }
        },

        components: {
            navBread,
            monthSceen,
            VipTotal,
            VipPT,
            VipMembership,

            statisDetails,
            ptLessonDetails,
        },
    }
</script>


<style lang="scss">
    /*引用css*/
    @import "@/assets/css/totalVip.scss";
    /*.vip-tabBox{*/
    /*    display: none;*/
    /*}*/

</style>