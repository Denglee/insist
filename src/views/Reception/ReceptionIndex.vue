<template>
    <div class="layoutR-contain animated fadeIn">
        <div id="memberInfo">
            <div class="btnNav-contain">
                <navRefush class="btnNav-left"  :btnBack="btnState.btnBack" ></navRefush>
                <ul>
                    <!--充值-->
                    <li class="btnNav-flex btnNav-vip">
                        <button class="btnNav-box" v-for="(item,index) in btnRecharge" :key="index" @click="btnMethods(item.methodsName,item.pageName)">
                            <i class="iconfont" :class="item.iconClass"></i>
                            <span>{{item.name}}</span>
                        </button>
                    </li>

                    <!--购卡-->
                    <li class="btnNav-flex btnNav-vip">
                        <button class="btnNav-box" v-for="(item,index) in btnCard" :key="index" @click="btnMethods(item.methodsName,item.pageName)">
                            <i class="iconfont" :class="item.iconClass"></i>
                            <span>{{item.name}}</span>
                        </button>
                    </li>

                    <!--积分-->
                    <li class="btnNav-flex btnNav-vip">
                        <button class="btnNav-box" v-for="(item,index) in btnIntegral" :key="index" @click="btnMethods(item.methodsName,item.pageName)">
                            <i class="iconfont" :class="item.iconClass"></i>
                            <span>{{item.name}}</span>
                        </button>
                    </li>
                </ul>
            </div>

            <div class="bgWhite-public">
                <header class="index-item-title">会员信息</header>
                <el-row class="bgWhite-padd20 memInfo-info">
                    <el-col :span="4">
                        <el-image :src="memberHeader" class="memberInfo-header"></el-image>
                    </el-col>
                    <el-col :span="7">
                        <div><span class="fontGray">会员姓名：</span><span>杨鹏</span></div>
                        <div><span class="fontGray">身份证号：</span><span>36242519940191454</span></div>
                        <div><span class="fontGray">会员类型：</span><span>潜在会员</span></div>
                        <div><span class="fontGray">人工备注：</span><span>好人</span></div>
                    </el-col>
                    <el-col :span="7">
                        <div><span class="fontGray">会员性别：</span><span>男</span></div>
                        <div><span class="fontGray">出生年月：</span><span>1994-04-19</span></div>
                        <div><span class="fontGray">会籍顾问：</span><span>蔡其</span></div>
                    </el-col>
                    <el-col :span="6">
                        <div><span class="fontGray">会员电话：</span><span>176888454544</span></div>
                        <div><span class="fontGray">顾客来源：</span><span>线下</span></div>
                        <div><span class="fontGray">私人教练：</span><span>杨鹏</span></div>
                    </el-col>

                    <!--<el-button  type="primary" @click="btnMethods('btnEdit','memberEdit')">操作</el-button>-->
                </el-row>
            </div>

            <comTabMember></comTabMember>

        </div>
    </div>
</template>

<script>
    import comTabMember from "../Member/RealMember/realMemberInfo/comTabMember";

	export default {
		name: "ReceptionIndex",   //会员登记

		data() {

			return {

				memberHeader:'http://vikily.f3322.net:20000/d/image/boy.png',

				btnState:{
					btnBack:false,
				},

                recptionTab:{
	                activeTabName:"recptionVip",
	                tabLazy: true,
                },
				checkedRows:[],

				// 充值
				btnRecharge:[
					{ name:"会员充值", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'menberRecharge' ,pageName:'menberRecharge'},
					{ name:"修改余额", type:'if',  iconClass:'bgcMediumBlue2 icon-jiaolian', methodsName:'btnAssign', pageName:'addNewVip'},
					{ name:"定金收取", type:'if',  iconClass:'bgcPink icon-shanchuxiantiao', methodsName:'btnDelVip', pageName:'addNewVip'},
				],

				// 购卡
				btnCard:[
					{ name:"购买入会", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'menberRecharge' ,pageName:'menberRecharge'},
					{ name:"购滑雪卡", type:'if',  iconClass:'bgcMediumBlue2 icon-jiaolian', methodsName:'btnAssign', pageName:'addNewVip'},
					{ name:"购私教卡", type:'if',  iconClass:'bgcPink icon-shanchuxiantiao', methodsName:'btnDelVip', pageName:'addNewVip'},
					{ name:"特殊次卡", type:'if',  iconClass:'bgcPink icon-shanchuxiantiao', methodsName:'btnDelVip', pageName:'addNewVip'},
				],

				// 积分
				btnIntegral:[
					{ name:"积分赠送", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'menberRecharge' ,pageName:'menberRecharge'},
					{ name:"跟进详情", type:'if',  iconClass:'bgcMediumBlue2 icon-jiaolian', methodsName:'btnAssign', pageName:'addNewVip'},
				],

			}
		},
		methods: {

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

			// 按钮组 点击事件
			btnMethods(methodsName,pageName) {

				// 会员新增
				if (methodsName == 'btnEdit') {
					/*首页 页面显影*/
					console.log(pageName);
					this.$emit('changePageShow',pageName,'memberInfo');
				}

				// 会员充值
				if (methodsName == 'menberRecharge') {
					/*首页 页面显影*/
					this.$emit('changePageShow',pageName,'memberInfo');
				}

			},
		},
		created() {

		},
		components:{
			comTabMember,
		},
	}
</script>
<style lang="scss">
    @import "~@/assets/css/member.scss";
</style>
