<template>
    <div class="layoutR-contain animated fadeIn">
        <!--右边iframe-->
        <!--<publicIframe/>-->

        <!--<div>潜在会员</div>-->
        <!--<iframe :src="localSrc" frameborder="0" id="iframe"></iframe>-->

        <div v-show="pageState.memberIndex">
            <div class="btnNav-contain">
                <navRefush :btnBack="btnLoad.btnBack" class="btnNav-left"></navRefush>
                <ul>
                    <li class="btnNav-flex btnNav-vip">
                        <button class="btnNav-box" v-for="(item,index) in btnVip" :key="index" @click="btnMethods(item.methodsName,item.pageName)">
                            <i class="iconfont" :class="item.iconClass"></i>
                            <span>{{item.name}}</span>
                        </button>
                    </li>
                    <li class="btnNav-flex btnNav-vip">
                        <button class="btnNav-box" v-for="(item,index) in btnFollow" :key="index" @click="btnMethods(item.methodsName,item.pageName)">
                            <i class="iconfont" :class="item.iconClass"></i>
                            <span>{{item.name}}</span>
                        </button>
                    </li>
                    <li class="btnNav-flex btnNav-vip">
                        <button class="btnNav-box" v-for="(item,index) in btnExport" :key="index" @click="btnMethods(item.methodsName, item.pageName)">
                            <i class="iconfont" :class="item.iconClass"></i>
                            <span>{{item.name}}</span>
                        </button>
                    </li>
                </ul>
            </div>

            <div class="bgWhite-public">

                <header class="index-item-title">会籍统计</header>
                <div class="bgWhite-padd20">
                    <!--saler 筛选-->
                    <div class="pt-screen">
                        <el-input placeholder="请输入姓名或电话号码" v-model="searchVal.keywords" class="ptScreen-input" clearable></el-input>


                        <el-select  filterable v-model="searchVal.salerSuggest"
                                    multiple filterable
                                    placeholder="顾问" class="ptScreen-select">
                            <el-option v-for="item in ArrFpsaler" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>

                        <el-select  filterable v-model="searchVal.fpsaler" placeholder="分配类型" class="ptScreen-select">
                            <el-option v-for="item in ArrFpsaler" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>

                        <el-select  filterable v-model="searchVal.follow_level" placeholder="跟进等级" class="ptScreen-select">
                            <el-option v-for="item in followLevel" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>

                        <el-select  filterable v-model="searchVal.source" placeholder="获取渠道" class="ptScreen-select">
                            <el-option v-for="item in getChannel" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>

                        <el-date-picker
                                v-model="timeVip"
                                type="daterange"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd"
                                calss="ptScreen-select">
                        </el-date-picker>
                        <button type="button" class="el-button btn-public" @click="btnSearch" :loading="btnLoad.search">
                            <i class="el-icon-search"></i><span>搜索</span>
                        </button>
                     </div>

                    <!-- 表格-->
                    <el-table class="pub-table" border
                              :data="saleRoomInfo"
                              @selection-change="checkedStaff"
                              ref="multipleTable"
                              @row-click="handleRowClick">
                        <el-table-column type="selection" width="55"
                                         :reserve-selection="true"></el-table-column>
                        <el-table-column prop="sex" label="头像">
                            <template slot-scope="scope">
                                <div v-if="scope.row.sex == 0 ">未知</div>
                                <div v-if="scope.row.sex == 1 " class="bgcMediumBlue icon_man">
                                    <i class="iconfont icon-6-01"></i>
                                </div>
                                <div v-if="scope.row.sex == 2 " class="bgcPink icon_man">
                                    <i class="iconfont icon-nan-01"></i>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="true_name" label="姓名" class="className">
                            <template slot-scope="scope">
                                <div class="color-MediumBlue member-name" @click.stop="goVipInfo">{{scope.row.true_name}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sex" label="性别">
                            <template slot-scope="scope">
                                <div v-if="scope.row.sex == 0 ">未知</div>
                                <div v-if="scope.row.sex == 1 ">男</div>
                                <div v-if="scope.row.sex == 2 ">女</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="phone" label="电话"></el-table-column>
                        <el-table-column prop="birthday" label="生日"></el-table-column>
                        <el-table-column prop="identify_no" label="身份证"></el-table-column>
                        <el-table-column prop="member_time" label="录入日期">
                            <template slot-scope="scope">
                                <div class="status-connect">{{scope.row.member_time | dateFormat}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="saler_name" label="会籍顾问"></el-table-column>
                        <el-table-column prop="last_follow_time" label="跟进状态">
                            <template slot-scope="scope">
                                <div v-if="scope.row.last_follow_time == 0 ">未跟进</div>
                                <div v-else>已跟进</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="last_follow_time" label="跟进时间">
                            <template slot-scope="scope">
                                <div v-if="scope.row.last_follow_time == 0 ">无</div>
                                <div v-else>{{scope.row.last_follow_time | dateFormat}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="surplus" label="账户余额">
                            <template slot-scope="scope">
                                <div class="color-MediumBlue {">{{scope.row.surplus}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="source_channel" label="获取渠道">
                            <template slot-scope="scope">
                                <div v-for='(item,index) in getChannel' :key="index">
                                    <span v-if="scope.row.source_channel == item.id">{{item.name}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="channel_property" label="渠道属性">
                            <template slot-scope="scope">
                                <div v-for='(item,index) in channelArr' :key="index">
                                    <span v-if="scope.row.channel_property == item.id">{{item.name}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="follow_level" label="跟进等级">
                            <template slot-scope="scope">
                                <div v-for='(item,index) in followLevel' :key="index">
                                    <span v-if="scope.row.follow_level == item.id">{{item.name}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="customer_classified" label="客户分类">
                            <template slot-scope="scope">
                                <div v-for='(item,index) in customerType' :key="index">
                                    <span v-if="scope.row.customer_classified == item.id">{{item.name}}</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-pagination
                            background
                            layout="prev, pager, next,total,jumper"
                            :total="pages.pageTotal"
                            :page-size ="searchVal.total"
                            @current-change="PageCurrent">
                    </el-pagination>
                </div>

            </div>
        </div>


        <addNewMember v-if="pageState.addNewMember" @GoBack="goBack('addNewMember')"></addNewMember>

        <followTab v-if="pageState.followTab" @GoBack="goBack('followTab')"></followTab>

        <!--二级 会员信息-->
        <memberInfo v-if="pageState.memberInfo" @GoBack="goBack(arguments,'memberIndex')"
                    @changePageShow="changePageShow(arguments, 'memberInfo')"></memberInfo>

        <!--会员信息 =》会员充值-->
        <menberRecharge v-if="pageState.menberRecharge" @GoBack="goBack(arguments,'memberInfo')"
                        @changePageShow="changePageShow(arguments,'memberInfo')"></menberRecharge>

        <!--三级 会员操作-->
        <memberEdit  v-if="pageState.memberEdit" @GoBack="goBack(arguments,'memberInfo')"
                     @changePageShow="changePageShow(arguments,'memberEdit')"></memberEdit>

        <memberHistory v-if="pageState.memberHistory" @GoBack="goBack(arguments,'memberEdit')"
                       @changePageShow="changePageShow(arguments,'memberEdit')"></memberHistory>
    </div>
</template>


<script>
    import navRefush from '@/components/navRefush/navRefush'  /*按钮组件*/
    import addNewMember from "./memberIndex/addNewMember";  /*会员新增*/
    import followTab from "./memberIndex/followTab";  /*教练跟进*/

    import memberInfo from "./memberInfo/memberInfo";  /*会员信息 二级首页*/
    import menberRecharge from "./memberInfo/menberRecharge";  /*会员充值*/

    import memberEdit from "./memberEdit/memberEdit";  /*会员编辑 三级首页*/
    import memberHistory from './memberEdit/membeHistory'

    export default {
        name: "Memberindex",
        inject:['reLoad'], //注入依赖 App 中的reLoad方法
        data() {
            return {

                localUrl:this.GLOBAL.localUrl,
                localSrc:"",

                // 按钮点击状态
                btnLoad:{
                    btnBack:false,  //返回按钮是否显示
                    search:false,   //搜索按钮点击状态
                },

                // 页面显影
                pageState:{
                    memberIndex:false,     //首页
                    addNewMember:false,   //会员新增
                    followTab:false,      //教练跟进

                    memberInfo:false,  //潜在会员信息 二级首页
                    menberRecharge:false,  //会员充值

                    memberEdit:false,   //信息操作 三级首页 操作
                    memberHistory:false,

                },

                // 新增会员按钮组
                btnVip:[
                    { name:"会员新增", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'addNewMember' ,pageName:'addNewMember'},
                    { name:"删除会员", type:'if',  iconClass:'bgcPink icon-shanchuxiantiao', methodsName:'btnDelVip', pageName:'addNewMember'},
                    { name:"分配顾问", type:'if',  iconClass:'bgcMediumBlue2 icon-jiaolian', methodsName:'btnAssign', pageName:'addNewMember'},
                ],

                // 跟进按钮组
                btnFollow:[
                    { name:"教练跟进", type:'if',  iconClass:'bgcYellow icon-jianshenfang1', methodsName:'followTab', pageName:'radioTrainer'},
                    { name:"顾问跟进", type:'if',  iconClass:'bgcLigntBlue icon-huijigenjin',  methodsName:'followTab', pageName:'radioAdviser'},
                    { name:"前台跟进", type:'if',  iconClass:'bgcViolet icon-zixunguwen',  methodsName:'followTab', pageName:'radioReception'},
                    { name:"客服跟进", type:'if',  iconClass:'bgcLigntBlue2 icon-kefu',  methodsName:'followTab', pageName:'radioService'},
                ],

                // 导出按钮组
                btnExport:[
                    { name:"导出", type:'if',  iconClass:'bgcGreenBlue icon-jianshenfang1',  methodsName:'btnAddVip', pageName:'btnAddVip'},
                ],

                // 分配情况
                ArrFpsaler:[
                    {id:0, name:'公海海员'},
                    {id:1, name:'已分配'},
                    {id:3, name:'分配类型'},
                ],

                // 获取渠道
                getChannel:this.GLOBAL.getChannel,

                // 渠道属性
                channelArr:this.GLOBAL.channelArr,

                // 跟进等级
                followLevel:this.GLOBAL.followLevel,

                // 客户分类
                customerType:this.GLOBAL.customerType,

                // 页码
                pages:{
                    pageTotal:10,
                },

                // 搜索
                timeVip:"",
                searchVal:{
                    total:10,
                    keywords:'',  //会员姓名、电话、生日
                    salerSuggest:'',  // 顾问编号、姓名、电话
                    fpsaler:'',   //分配类型
                    follow_level:'',   //跟进等级
                    source:'',    // 获取渠道
                    st_time:'',  //开始时间
                    end_time:'', //结束时间
                },

                // table 数据
                saleRoomInfo:[
                    {
                        true_name:'木子',  //姓名
                        sex:'1', //性别
                        phone:'17688824544',  //电话
                        birthday:'1994-04-19',  //生日
                        identify_no:'',  //身份证
                        member_time:'2020-05-22 09:22:41',  //录入日期
                        saler_name:'',  //会籍顾问
                        last_follow_time:'2020-05-22',  //跟进状态  0 跟进时间
                        surplus:'0.00',  //账户余额
                        source_channel:'2',  //获取渠道
                        channel_property:'1',  //渠道属性
                        follow_level:'1',  //跟进等级
                        customer_classified:'1',  //客户分类
                        id:1,
                    },
                    {
                        true_name:'英子',  //姓名
                        sex:'2', //性别
                        phone:'17688824544',  //电话
                        birthday:'1994-04-19',  //生日
                        identify_no:'',  //身份证
                        member_time:'2020-05-22 09:22:41',  //录入日期
                        saler_name:'',  //会籍顾问
                        last_follow_time:'0',  //跟进状态  0 跟进时间
                        surplus:'0.00',  //账户余额
                        source_channel:'5',  //获取渠道
                        channel_property:'5',  //渠道属性
                        follow_level:'5',  //跟进等级
                        customer_classified:'5',  //客户分类
                        id:2,
                    },
                    {
                        true_name:'英子',  //姓名
                        sex:'2', //性别
                        phone:'17688824544',  //电话
                        birthday:'1994-04-19',  //生日
                        identify_no:'',  //身份证
                        member_time:'2020-05-22 09:22:41',  //录入日期
                        saler_name:'',  //会籍顾问
                        last_follow_time:'0',  //跟进状态  0 跟进时间
                        surplus:'0.00',  //账户余额
                        source_channel:'5',  //获取渠道
                        channel_property:'5',  //渠道属性
                        follow_level:'5',  //跟进等级
                        customer_classified:'5',  //客户分类
                        id:3,
                    }
                ],

                checkedRows: [],  //选中的值
            }
        },
        methods: {
            // 去会员详情页
            goVipInfo(){
                this.changePageShow('memberInfo','memberInfo');
            },

            /*存储页面*/
            sessionNowPage(NowPage,indexPage){
                let memberNowPage = {
                    NowPage:NowPage,
                    indexPage:indexPage,
                }
                sessionStorage.setItem('memberNowPage', JSON.stringify(memberNowPage));

                /*清空 状态  复制初始化data 为了方便 按钮显隐   方便 返回上一页 隐藏上一页*/
                let pageData =this.$options.data.call(this).pageState;
                this.pageState = pageData;
            },

            // 隐藏第一页 显示二级页面 并存储
            changePageShow(nowPage, indexPage='memberIndex'){
                /*说明：nowPage=当前页        indexPage=归属页
                 用法： this.$emit('changePageShow',pageName,'memberEdit'); */
                if(typeof (nowPage) =='object' ){
                    nowPage  = nowPage[0];
                }
                console.log(nowPage);

                this.sessionNowPage(nowPage,indexPage);
                this.pageState[nowPage] = true;        //nowPage =》 当前页面 显示

               /* /!*一级 首页会员列表 *!/
                if(indexPage == 'memberIndex'){
                    this.sessionNowPage(nowPage,indexPage);
                    this.pageState[nowPage] = true;        //nowPage =》 二级页面
                }

                /!*二级 会员信息*!/
                if(indexPage == 'memberInfo'){
                    this.sessionNowPage(nowPage,indexPage);
                    this.pageState[nowPage] = true;       //nowPage =》 二级页面
                    // if(nowPage != 'memberInfo'){
                    //     this.pageState.memberInfo = false;    //indexPage => index页面
                    // }
                }

                /!*三级 操作会员*!/
                if(indexPage == 'memberEdit'){
                    this.sessionNowPage(nowPage,indexPage);
                    this.pageState[nowPage] = true;       //nowPage =》 二级页面
                    // if(nowPage != 'memberEdit'){
                    //     this.pageState.memberEdit = false;    //indexPage => index页面
                    // }
                }*/

            },


            // 返回上一页 并清空
            goBack(previousPage, indexPage = 'memberIndex'){
                /*说明：previousPage=上一页        indexPage=归属页
                  用法：this.$emit('GoBack','memberInfo','memberEdit'); */
                if(typeof (previousPage) =='object' ){
                    previousPage  = previousPage[0];
                }
                console.log(previousPage);

              /*  /!*返回三级 首页*!/
                if(indexPage == 'memberEdit'){
                    this.sessionNowPage(previousPage,indexPage);
                    this.pageState[indexPage] = true;
                }
                /!*返回子级 首页*!/
                if(indexPage == 'memberInfo'){
                    this.sessionNowPage(previousPage,indexPage);
                    this.pageState[indexPage] = true;
                }*/

                /*返回一级首页*/
                if(indexPage == 'memberIndex'){
                    sessionStorage.removeItem('memberNowPage');
                    this.pageState =this.$options.data.call(this).pageState;
                    // this.pageState[indexPage] = true; //显示首页
                }else{
                    this.sessionNowPage(previousPage,indexPage);
                }
                this.pageState[indexPage] = true; //显示首页
            },

            // 选择判断
            checkedRowsFunc(onlyOne = 1){
                let checkedRows =  this.checkedRows;
                if(checkedRows.length == 0){
                    this.$message.error('至少选择一个操作对象');
                } else {
                    if(onlyOne == '2' ){
                        this.$message.error('只能选择一个');
                    }else{
                        return checkedRows;
                    }
                }
            },

            // 按钮组 点击事件
            btnMethods(methodsName,pageName){
                console.log(`点击事件类别：  ${methodsName}`);   //事件分类

                // 会员新增
                if(methodsName == 'addNewMember'){
                    this.changePageShow('addNewMember');
                }

                // 教练跟进
                if(methodsName == 'followTab'){
                    console.log(methodsName);
                    console.log(pageName);
                    this.changePageShow('followTab');

                    let followVipInfo =  JSON.stringify(this.checkedRows);
                    sessionStorage.setItem('followVipInfo', followVipInfo);   /*存储预备会员信息*/
                    sessionStorage.setItem('followPageName', pageName);    /*存储切换选中的跟随页面名字*/
                }

            },

            // 选中
            checkedStaff(val) {
                console.log(val);
                this.checkedRows = val;
            },

            //点击行触发，选中或不选中复选框
            handleRowClick(row, column, event){
                // let list = this.saleRoomInfo;
                // list.forEach(function(row) {
                //     vm.$refs.multipleTable.toggleRowSelection(row,true)
                //
                // });
                this.$refs.multipleTable.toggleRowSelection(row);
            },

            // 搜索
            btnSearch(){
                this.GLOBAL.btnStateChange(this,'btnLoad','search');
                this.searchVal.st_time = this.timeVip[0];
                this.searchVal.end_time = this.timeVip[1];
                console.log(this.searchVal);
            },

            /*分页*/
            PageCurrent(page) {
                console.log(page);
                this.searchVal.p = page;
                this.getPTSaleroom();
                // this.staffPage = page;
            },
        },
        created() {
            /*详情 显影*/
            let memberNowPage = JSON.parse(sessionStorage.getItem('memberNowPage'));
            if(memberNowPage != null){
                console.log(memberNowPage);
                this.changePageShow(memberNowPage.NowPage,memberNowPage.indexPage);
            } else {
                this.pageState.memberIndex = true;
            }


            let userId=this.$route.params.user_id;
            // console.log(userId);
            if(!userId){
                userId = '';
            }
            let iframeUrl = this.localUrl + '/Admin' + this.$route.fullPath+'/user_id/'+userId+'.html';
            console.log(iframeUrl);

            this.localSrc = iframeUrl;
        },
        components:{
            navRefush,

            addNewMember,
            followTab,
            memberInfo,

            menberRecharge,  //会员充值

            memberEdit,
            memberHistory,
        }

    }
</script>

<style lang="scss">
    @import "../../assets/css/member";
</style>
