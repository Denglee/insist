<template>
    <div class="layoutR-contain animated fadeIn">
        <!--右边iframe-->
        <!--<publicIframe/>-->
        <!--<iframe :src="localSrc" frameborder="0" id="iframe"></iframe>-->

        <div class="btnNav-contain">
            <navRefush :btnBack="btnState.btnBack" class="btnNav-left"></navRefush>
            <ul>
                <li class="btnNav-flex btnNav-vip">
                    <button class="btnNav-box" v-for="(item,index) in btnVip" :key="index"
                            @click="btnMethods(item.methodsName,item.pageName)">
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
                    <el-select filterable v-model="searchForm.ship_id" placeholder="请选择卡种" class="ptScreen-select">
                        <el-option v-for="item in shipCard" :key="index" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                    <el-input v-model="searchForm.name" autocomplete="off" placeholder="请输入姓名" class="ptScreen-input"
                              clearable></el-input>
                    <el-date-picker placeholder="请选择月份" class="month-picker" v-model="searchForm.time" type="month"
                                    value-format="yyyy-MM"></el-date-picker>

                    <el-button icon="el-icon-search" @click="btnSeaStaff" :loading="btnState.searchLoad"
                               class="btn-public">搜索
                    </el-button>
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
        </div>

        <!-- 打印 合同的 内容 -->
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
				localUrl: this.GLOBAL.localUrl,
				localSrc: "",

				searchForm: {
					name: '',
					time: '',
					ship_id: '',
				},
				checkedRows: [],
				orderPTable: [
					{
						day: '202-09-05',
						user_name: '答咔',
						user_sex: '1',
						user_phone: '17544415414',
						course_name: '瑜伽',
						name: '跟进教练',
						sj_coach_name: '上课教练',
						status: '2',
						card_no: 'vx2007151769',
						left_number: '1',
						dec_price: '150.00',
						give_number: '0',
						seat_no: '0',
						time: '2020-05-17',
						check_time: '暂无',
					}
				],

				// 导航按钮组
				btnVip: [
					{
						name: "小票打印",
						type: 'if',
						iconClass: 'icon-weibiaoti-1yihuifu-02',
						methodsName: 'cardPrint',
						pageName: 'addNewMember'
					},
					{
						name: "合同打印",
						type: 'if',
						iconClass: 'bgcPink icon-weibiaoti-1yihuifu-02',
						methodsName: 'btnDelVip',
						pageName: 'addNewMember'
					},
					{
						name: "合同赠送",
						type: 'if',
						iconClass: 'bgcMediumBlue2 icon-jiaolian',
						methodsName: 'btnAssign',
						pageName: 'addNewMember'
					},
				],
				shipCard: [
					{id: 1, name: '卡1'},
					{id: 2, name: '卡2'},
				],

				btnState: {
					searchLoad: false,
					btnBack: false,  //返回按钮是否显示
				},
			}
		},
		methods: {
			checkedStaff(val) {
				console.log(val);
				this.checkedRows = val;
			},

			//点击行触发，选中或不选中复选框
			handleRowClick(row, column, event) {
				this.$refs.multipleTable.toggleRowSelection(row);
			},

			// 按钮组 点击事件
			btnMethods(methodsName, pageName) {
				if (methodsName == 'cardPrint') {
					/*打印*/
					this.$print(this.$refs.print, {'no-print': '.no-print'}) // 使用
				}


			},

			/*1.1、筛选  搜索*/
			btnSeaStaff() {
				this.GLOBAL.btnStateChange(this, 'btnState', 'searchLoad');
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
    #print {
        display: none;
    }

    @media print {
        #print {
            display: block;
        }
    }
</style>
