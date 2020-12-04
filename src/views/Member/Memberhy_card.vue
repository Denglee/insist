<template>
    <div class="layoutR-contain animated fadeIn">
        <!--右边iframe-->
        <!--<publicIframe/>-->
        <!--<iframe :src="localSrc" frameborder="0" id="iframe"></iframe>-->

        <div class="btnNav-contain">
            <navRefush :btnBack="btnState.btnBack" class="btnNav-left"></navRefush>
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
            <header class="index-item-title">期限合同</header>
            <div class="bgWhite-padd20">
                <div class="pt-screen">
                    <el-input v-model="searchForm.keywords" autocomplete="off" placeholder="会员姓名,电话,合同编号" class="ptScreen-input" clearable></el-input>
                    <el-input v-model="searchForm.salerSuggest" autocomplete="off" placeholder="顾问编号,姓名,电话" class="ptScreen-input" clearable></el-input>
                    <el-select  filterable v-model="searchForm.card_status" placeholder="合同状态" class="ptScreen-select">
                        <el-option v-for="( item, index ) in card_status_Arr" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select  filterable v-model="searchForm.card_status_detail" placeholder="合同详细状态" class="ptScreen-select">
                        <el-option v-for="( item, index ) in card_status_Detail_Arr" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select  filterable multiple  v-model="searchForm.membership_id"  placeholder="卡名称" class="ptScreen-select">
                        <el-option v-for="( item, index ) in card_status_Detail_Arr" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select  filterable v-model="searchForm.contract_status" placeholder="合同号是否为空" class="ptScreen-select">
                        <el-option v-for="( item, index ) in shipCard" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select  filterable v-model="searchForm.postpone" placeholder="延期状态" class="ptScreen-select">
                        <el-option v-for="( item, index ) in shipCard" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-button icon="el-icon-search" @click="btnSeaStaff" :loading="btnState.searchLoad" class="btn-public">搜索</el-button>
                </div>

                <el-table class="pub-table staffList-table" :data="orderPTable" border
                          @selection-change="checkedStaff"
                          ref="multipleTable" @row-click="handleRowClick">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="day" label="课程时间"></el-table-column>
                    <el-table-column prop="user_name" label="姓名"></el-table-column>
                    <el-table-column prop="user_sex" label="性别"></el-table-column>
                    <el-table-column prop="user_phone" label="电话"></el-table-column>
                    <el-table-column prop="course_name" label="课程名称"></el-table-column>
                    <el-table-column prop="name" label="跟进教练"></el-table-column>
                    <el-table-column prop="sj_coach_name" label="实际上课教练"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column prop="card_no" label="合同号"></el-table-column>
                    <el-table-column prop="left_number" label="原剩余节数"></el-table-column>
                    <el-table-column prop="dec_price" label="单课价值"></el-table-column>
                    <el-table-column prop="give_number" label="赠送课时"></el-table-column>
                    <el-table-column prop="seat_no" label="房间号"></el-table-column>
                    <el-table-column prop="time" label="预约时间"></el-table-column>
                    <el-table-column prop="check_time" label="签到时间"></el-table-column>
                    <el-table-column prop="user_name" label="签到人"></el-table-column>
                </el-table>

                <!--tab2 修改 顾问 弹窗-->
                <el-dialog  :append-to-body="true" title="修改顾问" :visible.sync="showState.diaChangePT" width="600px" >
                    <el-form :model="diaChangePTForm" class="dia-form" label-width="120px">
                        <el-form-item label="部门名称" >
                            <el-input v-model="diaChangePTForm.name" placeholder="请输入部门名字" class="dia-inp" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="showState.diaChangePT = false" plain>取 消</el-button>
                        <el-button type="primary" @click="sureDiaChangePT()" :loading="btnState.btnSureGroup">确 定</el-button>
                    </div>
                </el-dialog>

            </div>
        </div>

        <!--打印 合同的 内容  -->
        <section ref="print" id="print">
    　　　　<span>合同打印</span>
    　　　　<div class="no-print">不要打印我</div>
    　　</section>

    </div>
</template>

<script>
    export default {
        name: "Memberhy_card", //期限合同
        data() {
            return {
                localUrl:this.GLOBAL.localUrl,
                localSrc:"",
	            btnState:{
		            searchLoad:false,
		            btnBack:false,  //返回按钮是否显示

		            btnSureChangePT:false,
	            },
                showState:{
	                diaChangePT:false,    //修改顾问
                },

	            /*修改顾问 弹窗 表单 */
	            diaChangePTForm:{
		            name:'',
                },

	            searchForm:{
		            keywords:'',
		            salerSuggest:'',
		            card_status:'',
		            card_status_detail:'',
		            membership_id:'',
		            contract_status:'',
		            postpone:'',
		            card_type:'',
	            },

	            card_status_Arr:[
                    {id:-1, name:'合同状态'},
                    {id:0, name:'等待支付'},
                    {id:1, name:'预备'},
                    {id:2, name:'有效'},
                    {id:3, name:'冻结'},
                    {id:4, name:'过期'},
                    {id:5, name:'无效'},
                ],
	            card_status_Detail_Arr:[
		            {id:0, name:'默认'},
		            {id:1, name:'退款失效'},
		            {id:2, name:'录入问题'},
		            {id:3, name:'已升级'},
		            {id:4, name:'已转让'},
		            {id:5, name:'冻结'},
                ],

	            checkedRows:[],
	            orderPTable:[
		            {day:'202-09-05', user_name:'答咔',user_sex:'1', user_phone:'17544415414', course_name:'瑜伽', name:'跟进教练',
			            sj_coach_name:'上课教练', status:'2', card_no:'vx2007151769',left_number:'1',dec_price:'150.00', give_numb2er:'0',
			            seat_no:'0', time:'2020-05-17',check_time:'暂无', }
	            ],

	            // 导航按钮组
	            btnVip:[
		            { name:"小票打印", type:'if',  iconClass:'icon-weibiaoti-1yihuifu-02',  methodsName:'cardPrint' ,pageName:'add3NewMember3'},
		            { name:"合同打印", type:'if',  iconClass:'bgcPink icon-weibiaoti-1yihuifu-02', methodsName:'btnDelVip', pageName:'addNewMember'},
		            { name:"合同赠送", type:'if',  iconClass:'bgcMediumBlue2 icon-jiaolian', methodsName:'btnAssign', pageName:'addNewMember'},
		            { name:"修改顾问", type:'if',  iconClass:'bgcMediumBlue2 icon-jiaolian', methodsName:'btnChangePT', pageName:'addNewMember'},
		            { name:"移入历史库", type:'if',  iconClass:'bgcMediumBlue2 icon-jiaolian', methodsName:'btnAssign', pageName:'addNewMember'},
		            { name:"操作记录", type:'if',  iconClass:'bgcMediumBlue2 icon-jiaolian', methodsName:'btnAssign', pageName:'addNewMember'},
		            { name:"合同导出", type:'if',  iconClass:'bgcMediumBlue2 icon-jiaolian', methodsName:'btnAssign', pageName:'addNewMember'},
		            { name:"延期", type:'if',  iconClass:'bgcMediumBlue2 icon-jiaolian', methodsName:'btnAssign', pageName:'addNewMember'},
	            ],
	            shipCard:[
                    {id:1, name:'卡1'},
                    {id:2, name:'卡2'},
                ],
            }
        },
        methods: {


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
		        let checkedRows =  this.checkedRows;
                if(methodsName == 'cardPrint'){
	                /*打印 */
                    this.$print(this.$refs.print,{'no-print':'.no-print'}) // 使用
                }

                /*修改顾问*/
                if(methodsName == 'btnChangePT'){
	                if(checkedRows.length == 0){
		                this.$message.error('请至少选择一个操作对象');
	                } else if(checkedRows.length == 1){
		                this.showState.diaChangePT = true;
		                console.log(checkedRows[0].card_no);
	                }else{
		                this.$message.error('只能选一个');
	                }
                }


	        },

	        /*1.1、筛选  搜索*/
	        btnSeaStaff(){
	        	console.log(this.searchForm);
		        this.GLOBAL.btnStateChange(this,'btnState','searchLoad');
	        },

            /*确定 修改 顾问*/
	        sureDiaChangePT(){
		        this.GLOBAL.btnStateChange(this,'btnState','btnSureChangePT');
            },

        },
        created() {
            /*let nextUrl = this.localUrl + '/Admin' + this.$route.fullPath+'?course_type=2';
            console.log(nextUrl);*/
            // this.localSrc = nextUrl;
        },
    }
</script>

<style lang="scss">
    #print{
        display: none;
    }
    @media print {
        #print{
            display: block;
        }
    }
</style>
