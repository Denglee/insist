<template>
    <div class="layoutR-contain animated fadeIn">
        <!--<iframe :src="localSrc" frameborder="0" id="iframe"></iframe>-->

        <el-tabs v-model="bespeakTab.activeTabName" @tab-click="FnBtnTab"
                 class="vip-tabBox pubWidth tab-header tabHeight" id="staffPay-tabBox" >

            <el-tab-pane :lazy='bespeakTab.tabLazy' label="私教预约" name="pt_order">
                <pt_order></pt_order>
            </el-tab-pane>

            <el-tab-pane :lazy='bespeakTab.tabLazy' label="课程设置" name="pt_setup_lesson">
                <pt_setup_lesson v-show = "lessonState.lessonPt" @goAddPtLesson="goAddPtLesson()"></pt_setup_lesson>
                <add_pt_lesson v-show = "lessonState.addPtLesson" @GoBack="goBack('lessonPt')"></add_pt_lesson>
            </el-tab-pane>


            <el-tab-pane :lazy='bespeakTab.tabLazy' label="预约时间" name="pt_order_time">
                预约时间
            </el-tab-pane>

            <el-tab-pane :lazy='bespeakTab.tabLazy' label="上课记录" name="pt_lesson_history">
                上课记录
            </el-tab-pane>

            <el-tab-pane :lazy='bespeakTab.tabLazy' label="滑雪预约" name="pt_order_skiing">
                滑雪预约
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
    import pt_order from "./bespeakIndex/pt_order";
    import pt_setup_lesson from "./bespeakIndex/pt_setup_lesson";
    import add_pt_lesson from "./bespeakIndex/add_pt_lesson";
    export default {
        name: "BespeakIndex",  //私教
        data() {
            return {
	            lessonState:{
		            lessonPt:false,
		            addPtLesson:true,
                },

                localUrl:this.GLOBAL.localUrl,
                localSrc:"",

	            orderSearchForm:{
		            orderTime:'',
                	name:'',
                },
	            checkedRows:[],

                orderPTable:[
                    {day:'202-09-05', user_name:'答咔',user_sex:'1', user_phone:'17544415414', course_name:'瑜伽', name:'跟进教练',
                        sj_coach_name:'上课教练', status:'2', card_no:'vx2007151769',left_number:'1',dec_price:'150.00', give_number:'0',
                        seat_no:'0', time:'2020-05-17',check_time:'暂无', }
                ],

	            btnState:{
                	searchLoad:false
                },

	            bespeakTab:{
		            activeTabName:'pt_order',
                },

	            // 私教预约按钮组
	            btnRecharge:[
		            { name:"选择签到", type:'if',  iconClass:'icon-chongzhi-',  methodsName:'menberRecharge' ,pageName:'menberRecharge'},
		            { name:"预约取消", type:'if',  iconClass:'bgcMediumBlue2 icon-jiaolian', methodsName:'btnAssign', pageName:'addNewVip'},
		            { name:"预约签到", type:'if',  iconClass:'bgcPink icon-chongzhi', methodsName:'btnDelVip', pageName:'addNewVip'},
		            { name:"小票打印", type:'if',  iconClass:'bgcPink icon-chongzhi', methodsName:'btnDelVip', pageName:'addNewVip'},
		            { name:"修改教练", type:'if',  iconClass:'bgcPink icon-chongzhi', methodsName:'btnDelVip', pageName:'addNewVip'},
		            { name:"导出", type:'if',  iconClass:'bgcPink icon-chongzhi', methodsName:'btnDelVip', pageName:'addNewVip'},
	            ],

            }
        },
        methods: {
        	/*进入私教课 添加*/
	        goAddPtLesson(){
                console.log('bespeak index');
		        this.lessonState.lessonPt = false;
		        this.lessonState.addPtLesson = true;
            },

	        // 返回上一页 并清空
	        goBack(previousPage, indexPage){
		        console.log(previousPage);
		        this.lessonState.lessonPt = true;
		        this.lessonState.addPtLesson = false;
	        },

	        /* 零、 tab切换  */
	        FnBtnTab(tab, event) {
		        console.log(tab.name);

		        sessionStorage.setItem('bespeakIndexTab', tab.name);
	        },

	        /* 1.10、 编辑选中 */
	        checkedStaff(val) {
		        console.log(val);
		        this.checkedRows = val;
	        },

	        //点击行触发，选中或不选中复选框
	        handleRowClick(row, column, event){
		        this.$refs.multipleTable.toggleRowSelection(row);
	        },

	        // 按钮组 点击事件
	        btnMethods(methodsName,pageName) {

            },

	        /*1.1、筛选 搜索*/
	        btnSeaStaff(){
		        this.GLOBAL.btnStateChange(this,'btnState','searchLoad');
	        },

        },
        created() {

	        let tabName = sessionStorage.getItem('bespeakIndexTab');
	        if(tabName){
		        this.bespeakTab.activeTabName = tabName;
            }


            /*let nextUrl = this.localUrl + '/Admin' + this.$route.fullPath+'?course_type=2';
            console.log(nextUrl);
            this.localSrc = nextUrl;*/
        },
        components:{
	        add_pt_lesson,
        	pt_order,
	        pt_setup_lesson,
        }
    }
</script>

