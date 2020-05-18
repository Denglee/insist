<template>
    <div>
        <navBread @GoBack="goBack('revenueListD','revenueDetails')" breadTitle="营收详细"
                  :breadContent1="RevenueData.name+'营收详情'"></navBread>
        <div class="PTdetail-main">
            <div class="detail-box" style="padding: 20px;">
                <!--saler 筛选-->
                <div class="pt-screen">
                    <el-date-picker
                            value-format="yyyy-MM"
                            class="month-picker"
                            v-model="searchVal.date"
                            type="month"
                            placeholder="选择月">
                    </el-date-picker>
                    <el-button icon="el-icon-search" @click="btnSeaSaler" class="btn-public" :loading="loadState.searchLoad">搜索</el-button>
                </div>

                <!--表格-->
                <el-table class="pub-table" :data="revenueDetails" border>
                    <el-table-column prop="true_name" label="会员名"></el-table-column>
                    <el-table-column prop="sex" label="性别">
                        <template slot-scope="scope">
                            <div v-if="scope.row.sex == 0 ">未知</div>
                            <div v-if="scope.row.sex == 1 ">男</div>
                            <div v-if="scope.row.sex == 2 ">女</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone" label="电话"></el-table-column>
                    <el-table-column prop="order_name" label="名称"></el-table-column>
                    <el-table-column prop="real_price" label="金额"></el-table-column>
                    <el-table-column prop="order_time" label="时间">
                        <template slot-scope="scope">
                            <div class="status-connect">{{scope.row.order_time | dateFormat}}</div>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                        background
                        layout="prev, pager, next,total,jumper"
                        :total="pageTotal"
                        :page-size ="searchVal.total"
                        @current-change="PageCurrent">
                </el-pagination>

            </div>
        </div>
    </div>
</template>

<script>
    import {revenueDetails} from '@/assets/js/api' /*引用 营收总览 接口*/
    import navBread from '@/components/navBread/navBread'
    export default {
        name: "RevenueDetails",
        // props:{
        //     RevenueData:{
        //         type:Object,
        //     }
        // },
        data() {
            return {
                loadState:{
                    searchLoad:false,  //搜索按钮状态
                },

                revenueDetails:[],  //详情 数组
                RevenueData:[],

                pageTotal: 10 ,
                searchVal:{   //请求参数数组
                    zmtek_ver:2,
                    id:'',
                    date:'',
                    total:10,   //页面显示数
                    p:1,       //页码
                }

            }
        },
        methods: {
            /*获取详情接口*/
            getRevenueDetails() {
                revenueDetails(this.searchVal).then(res => {
                    console.log(res);
                    this.pageTotal = Number(res.data.totalRows);
                    this.searchVal.total = Number(res.data.listRows);
                    this.revenueDetails = res.data.list;
                }).catch(res => {
                    console.log(res);
                });
            },

            /*搜索筛选*/
            btnSeaSaler(e){
                if(!this.searchVal.date){
                    this.$message.warning('请选择月份');
                    this.GLOBAL.btnStateChange(this,'loadState','searchLoad',false);
                    return
                }
                this.GLOBAL.btnStateChange(this,'loadState','searchLoad');
                // this.searchVal.personal_id = '';//教练id 为空
                this.getRevenueDetails();
            },

            /*返回上一页*/
            goBack(){
                this.$emit('GoBack');
                sessionStorage.removeItem('StatisRevenueList');
            },

            backHis(){
                let that = this;
                that.pushHistory();
                window.addEventListener("popstate", function(e) {
                    console.log('点击返回');
                    that.goBack();
                }, false);

                // onunload
            },

            rufush(){
                console.log('kaishi');
                window.onbeforeunload = function(e) {
                    console.log('监听刷新');
                    // window.location.reload();
                    // if ( e && e.stopPropagation ){
                    //     e.stopPropagation();
                    // } else{
                    //     window.event.cancelBubble = true;
                    // }

                    // return false;

                    // var dialogText = 'CSDN 吴小迪';
                    // e.returnValue = dialogText;
                    // return dialogText;

                    // var dialogText = 'Dialog text here';
                    // e.returnValue = dialogText;
                    // return dialogText;

                    //鼠标相对于用户屏幕的水平位置 - 窗口左上角相对于屏幕左上角的水平位置 = 鼠标在当前窗口上的水平位置
                    // var n = window.event.screenX - window.screenLeft;
                    // //鼠标在当前窗口内时，n<m，b为false；鼠标在当前窗口外时，n>m，b为true。20这个值是指关闭按钮的宽度
                    // var b = n > document.documentElement.scrollWidth-20;
                    // //鼠标在客户区内时，window.event.clientY>0；鼠标在客户区外时，window.event.clientY<0
                    // if(b && window.event.clientY < 0 || window.event.altKey || window.event.ctrlKey){
                    //     //关闭浏览器时你想做的事
                    //     alert("关闭");
                    // }else if(event.clientY > document.body.clientHeight || event.altKey){
                    //     //刷新浏览器时你想做的事
                    //     alert("刷新");
                    // }
                }
            },

            pushHistory() {
                // let path ='';
                console.log(this.GLOBAL.localUrl);   //http://vikily.f3322.net:20000
                let localUrl = this.GLOBAL.localUrl;
                let path ='#'+this.$route.path;
                console.log(path);
                let state = {
                    title: "title",
                    url:path,
                };
                window.history.pushState(state, "title", path);
            },


            /*分页*/
            PageCurrent(page) {
                console.log(page);
                this.searchVal.p = page;
                this.getRevenueDetails();
            },
        },
        created() {
            this.getRevenueDetails();

            let choosePro = JSON.parse(sessionStorage.getItem('StatisRevenueList')) ;  //选中的item 对应显隐
            if (choosePro != null){   //如果不为空 则获取这里的值
                console.log(choosePro);
                this.RevenueData = choosePro;
                this.searchVal.id =choosePro.id;
            }

            this.backHis();

            this.rufush();
        },
        components: {
            navBread
        },
    }
</script>
