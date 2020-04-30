<template>
    <div class="total-vipBox">

        <!--选项卡-->
        <el-tabs v-model="activeTabName" @tab-click="tabTotal" class="vip-tabBox pubWidth tab-header" v-show="showStateArr.tabPaneState">

            <!--  tabItem1 会员总览 -->
            <el-tab-pane :lazy='tabLazy' label="会员总览" name="VipTotal" >
              <VipTotal @showState="showState(e1)"></VipTotal>
            </el-tab-pane>

            <!-- tabItem2 私教 -->
            <el-tab-pane :lazy='tabLazy' label="私教" name="VipPT">
                <VipPT  @showState="showState($event)"  :salerGropu="salerGropu"></VipPT>
            </el-tab-pane>

            <!-- tabItem3 会籍 -->
            <el-tab-pane :lazy='tabLazy' label="会籍" name="VipMembership">
                <VipMembership @showState="showState($event)" :salerGropu="salerGropu"></VipMembership>
            </el-tab-pane>
        </el-tabs>

        <ul>
            <!--私教销售额查询 表格 详情-->
            <li v-if="showStateArr.ptSalesD">
                <navBread @GoBack="goBack('VipPT','ptSalesD')" breadTitle="私教" breadContent1="私教销售额详情"></navBread>
                <ptSaleroom :ptSalesPage="10" :salerGropu="salerGropu"></ptSaleroom>
            </li>

            <!--私教数量 详情-->
            <li v-if="showStateArr.ptNumD">
                <navBread @GoBack="goBack('VipPT','ptNumD')" breadTitle="私教" breadContent1="私教数量详情"></navBread>
                <ptClassNumber :ptSalesPage="10"  :salerGropu="salerGropu"></ptClassNumber>
            </li>

            <!--私教 上课 表格 详情-->
            <li v-if="showStateArr.ptLessonD">
                <navBread @GoBack="goBack('VipPT','ptLessonD')" breadTitle="私教" breadContent1="私教上课详情"></navBread>
                <ptLessonDetails :ptSalesPage="10"></ptLessonDetails>
            </li>

            <!--私教 私教到期提醒 详情-->
            <li v-if="showStateArr.ptExpireD">
                <navBread @GoBack="goBack('VipPT','ptExpireD')" breadTitle="私教" breadContent1="私教到期提醒"></navBread>
                <ptExpireCoach :ptSalesPage="10"></ptExpireCoach>
            </li>
        </ul>

        <ul>
            <!--会籍销售额查询 表格 详情-->
            <li v-if="showStateArr.vSalesD">
                <navBread @GoBack="goBack('VipPT','vSalesD')" breadTitle="会籍" breadContent1="会籍销售额详情"></navBread>
                <MBSaleroom :ptSalesPage="10" :salerGropu="salerGropu"></MBSaleroom>
            </li>

            <!--会员 数量查询 详情-->
            <li v-if="showStateArr.vNumD">
                <navBread @GoBack="goBack('VipMembership','vNumD')" breadTitle="会籍" breadContent1="会籍数量详情"></navBread>
                <MBClassNumber :ptSalesPage="10" :salerGropu="salerGropu"></MBClassNumber>
            </li>

            <!--次卡到期提醒-->
            <li v-if="showStateArr.onceExpireD">
                <navBread @GoBack="goBack('VipMembership','onceExpireD')" breadTitle="会籍" breadContent1="次卡提醒"></navBread>
                <MBexpireOnce :ptSalesPage="10" :salerGropu="salerGropu"></MBexpireOnce>
            </li>

            <!--期限卡到期提醒-->
            <li v-if="showStateArr.termExpireD">
                <navBread @GoBack="goBack('VipMembership','termExpireD')" breadTitle="会籍" breadContent1="期限提醒"></navBread>
                <MBexpireTerm :ptSalesPage="10" :salerGropu="salerGropu"></MBexpireTerm>
            </li>

            <!--懒惰提醒-->
            <li v-if="showStateArr.laztExpireD">
                <navBread @GoBack="goBack('VipMembership','laztExpireD')" breadTitle="会籍" breadContent1="懒惰提醒"></navBread>
                <MBexpireLazy :ptSalesPage="10" :salerGropu="salerGropu"></MBexpireLazy>
            </li>

            <!--滑雪提醒-->
            <li v-if="showStateArr.skiExpireD">
                <navBread @GoBack="goBack('VipMembership','skiExpireD')" breadTitle="会籍" breadContent1="滑雪提醒"></navBread>
                <MBexpireSki :ptSalesPage="10" :salerGropu="salerGropu"></MBexpireSki>
            </li>
        </ul>

    </div>
</template>

<script>
    import navBread from '@/components/navBread/navBread'  //面包屑导航 组件
    import monthSceen from '@/components/monthSceen/monthSceen'  //7天时间筛选组件

    import ptSaleroom from '@/views/Total/details/VipPT/ptSaleroom'  //私教销售额 组件
    import ptClassNumber from '@/views/Total/details/VipPT/ptClassNumber'  // 私教 数量 详情组件
    import ptLessonDetails from '@/views/Total/details/VipPT/ptLessonDetails'  // 私教课程详情组件

    import ptExpireCoach from '@/views/Total/details/VipPT/ptExpireCoach'  // 私教到期提醒
    import MBexpireOnce from '@/views/Total/details/VipMembership/MBexpireOnce'  // 次卡到期提醒
    import MBexpireTerm from '@/views/Total/details/VipMembership/MBexpireTerm'  // 期限卡到期提醒
    import MBexpireLazy from '@/views/Total/details/VipMembership/MBexpireLazy'  // 懒惰提醒
    import MBexpireSki from '@/views/Total/details/VipMembership/MBexpireSki'  // 滑雪到期提醒

    import VipTotal from '@/views/Total/details/VipTotal/VipTotal'  //会员总览 tab
    import VipPT from '@/views/Total/details/VipPT/VipPT'  // 私教 tab
    import VipMembership from '@/views/Total/details/VipMembership/VipMembership'  //会籍 tab

    import MBSaleroom from '@/views/Total/details/VipMembership/MBSaleroom'  // 会籍 销售额 详情组件
    import MBClassNumber from '@/views/Total/details/VipMembership/MBClassNumber'  // 会籍 数量 详情组件

    import {getDepartment} from '@/assets/js/globalApi'

    export default {
        inject:['reLoad'], //注入依赖 App 中的reLoad方法
        name: "StatisIndex",  //会员总览
        data() {
            return {
                activeTabName: 'VipTotal', //VipTotal VipPT VipMembership
                tabLazy: true,

                salerGropu:[],  //部门

                showStateArr:{
                    tabPaneState: true,    //tab 显隐
                    ptSalesD: false,  //销售查询表格 显隐
                    ptNumD: false,     //数量
                    ptLessonD: false,  //课程列表

                    ptExpireD: false,  //私教到期提醒
                    onceExpireD: false,  //次卡到期提醒
                    termExpireD: false,  //期限到期提醒
                    laztExpireD: false,  //懒惰到期提醒
                    skiExpireD: false,  //滑雪到期提醒

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
                console.log(e1);
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

            let localParment = JSON.parse(sessionStorage.getItem('localParment'));//这里是去判断 sessionStorage有没有值
            console.log(localParment);
            if(localParment == null){  //如果没有  就去请求接口
                getDepartment().then(res => {   //这是请求接口
                    console.log(res);
                    this.salerGropu = res;   //接口返回的值 赋值给定义的数组
                    sessionStorage.setItem('localParment',JSON.stringify(res));  //sessionStorage存储值
                });
            } else {
                this.salerGropu = localParment;   //有值 就直接使用 就不用请求接口
            }
        },

        components: {
            navBread,
            monthSceen,
            VipTotal,
            VipPT,
            VipMembership,

            ptSaleroom,
            ptClassNumber,
            ptLessonDetails,
            ptExpireCoach,  //私教到期

            MBexpireOnce,  //次卡
            MBexpireTerm,  //期限
            MBexpireLazy,
            MBexpireSki,

            MBSaleroom,
            MBClassNumber,
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