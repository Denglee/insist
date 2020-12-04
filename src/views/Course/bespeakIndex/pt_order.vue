<template>
    <div>
        <ul class="bespeak-navUl">
            <li class="btnNav-flex btnNav-vip">
                <button class="btnNav-box" v-for="(item,index) in btnRecharge" :key="index" @click="btnMethods(item.methodsName,item.pageName)">
                    <i class="iconfont" :class="item.iconClass"></i>
                    <span>{{item.name}}</span>
                </button>
            </li>
        </ul>

        <div class="pt-screen">
            <el-input v-model="orderSearchForm.name" autocomplete="off" placeholder="请输入姓名" class="ptScreen-input" clearable></el-input>
            <el-date-picker
                    v-model="orderSearchForm.orderTime"
                    type="daterange"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    value-format="yyyy-MM-dd"
                    calss="ptScreen-select">
            </el-date-picker>

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
    </div>
</template>

<script>
	export default {
		name: "pt_order",
		data() {
			return {
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

				recptionTab:{
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
			
		},
	}
</script>
