<template>
    <div>
        <div class="btnNav-contain">
            <navRefush class="btnNav-left"  @SecondBack="SecondBackBtn"></navRefush>
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
            <header class="index-item-title">会员信息</header>
            <el-row class="bgWhite-padd20 memInfo-info">
                <el-col :span="4">
                    <el-image :src="memberHeader" class="memberInfo-header"></el-image>
                </el-col>
                <el-col :span="7">
                    <div><span class="fontGray">合同编号：</span><span>btjs15150</span></div>
                    <div><span class="fontGray">购买数量：</span><span>1</span></div>
                    <div><span class="fontGray">合同状态：</span><span>有效</span></div>
                    <div><span class="fontGray">营收金额：</span><span>0.01</span></div>
                    <div><span class="fontGray">签约日期：</span><span>2020-05-19</span></div>
                    <div><span class="fontGray">合同天数：</span><span>365</span></div>
                    <div><span class="fontGray">主副卡：</span><span>--</span></div>
                    <div><span class="color-Pink">自动停卡次数：</span><span>0</span></div>
                </el-col>
                <el-col :span="7">
                    <div><span class="fontGray">会员卡号：</span><span>男</span></div>
                    <div><span class="fontGray">总次数：</span><span>1994-04-19</span></div>
                    <div><span class="fontGray">操作状态：</span><span>默认</span></div>
                    <div><span class="fontGray">实收金额：</span><span>0.01</span></div>
                    <div><span class="fontGray">开始日期：</span><span>2020-05-19</span></div>
                    <div><span class="fontGray">会籍顾问：</span><span class="color-Pink">李福文</span></div>
                    <div><span class="fontGray">冻结开始时间：</span><span></span></div>
                    <div><span class="fontGray">自助停卡时长：</span><span class="color-Pink">0天</span></div>
                </el-col>
                <el-col :span="6">
                    <div><span class="fontGray">卡名称：</span><span>vip次卡</span></div>
                    <div><span class="fontGray">剩余次数：</span><span>2</span></div>
                    <div><span class="fontGray">原合同：</span><span></span></div>
                    <div><span class="fontGray">会籍押金：</span><span>0</span></div>
                    <div><span class="fontGray">结束日期：</span><span>2021-05-19</span></div>
                    <div><span class="fontGray">录入人：</span><span></span></div>
                    <div><span class="fontGray">冻结结束时间：</span><span></span></div>
                    <div><span class="fontGray">已自助停用次数：</span><span class="color-Pink">0次</span></div>
                </el-col>

            </el-row>
        </div>

        <!-- tab2  冻结合同 弹窗  -->
        <el-dialog  :append-to-body="true" title="冻结合同" :visible.sync="dialogFormVisible.diaRecharge" width="600px" >
            <el-form :model="rechargeForm" label-width="90px" >
                <el-form-item label="充值金额">
                    <el-input v-model="rechargeForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="赠送金额">
                    <el-input v-model="rechargeForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="channel_property" label="支付方式：">
                    <el-select  filterable v-model="rechargeForm.pay_type" placeholder="支付方式">
                        <el-option v-for="(item, index) in payWayArr" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible.diaRecharge = false">取 消</el-button>
                <el-button type="primary" @click="btnDiaRechargeSure">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>

	export default {
		name: "realMember_cardIndex",   //三级首页 会员操作

		data() {
			return {
				memberHeader:'http://vikily.f3322.net:20000/d/image/boy.png',

				dialogFormVisible:{
					diaRecharge:false,
				},

				rechargeForm:{
					name:'',
					payWay:'',
					pay_type:'',

				},

				// 新增会员按钮组
				btnVip:[
					{ name:"小票打印", type:'if',  iconClass:'icon-weibiaoti-1yihuifu-02',  methodsName:'memberHistory' ,pageName:'memberHistory'},
					{ name:"合同打印", type:'if',  iconClass:'icon-weibiaoti-1yihuifu-02',  methodsName:'memberChange' ,pageName:'memberChange'},
					{ name:"冻结合同", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberFrozen' ,pageName:'memberChange'},
					{ name:"取消冻结", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberChange' ,pageName:'memberChange'},
					{ name:"升级合同", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberChange' ,pageName:'memberChange'},
					{ name:"转让合同", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberChange' ,pageName:'memberChange'},
					{ name:"合同赠送", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberChange' ,pageName:'memberChange'},
					{ name:"业绩拆分", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberChange' ,pageName:'memberChange'},
					{ name:"修改顾问", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberChange' ,pageName:'memberChange'},
					{ name:"更换卡号", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberChange' ,pageName:'memberChange'},
					{ name:"会员补卡", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberChange' ,pageName:'memberChange'},
					{ name:"修改次数", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberChange' ,pageName:'memberChange'},
					{ name:"修改合同号", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberChange' ,pageName:'memberChange'},
					{ name:"移入历史库", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberChange' ,pageName:'memberChange'},
					{ name:"修改有效期", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberChange' ,pageName:'memberChange'},
					{ name:"操作记录", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberChange' ,pageName:'memberChange'},
					{ name:"合同退款", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberChange' ,pageName:'memberChange'},
					{ name:"次卡流水", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberChange' ,pageName:'memberChange'},
					{ name:"自动停卡修改", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberChange' ,pageName:'memberChange'},
					{ name:"冻结时间修改", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberChange' ,pageName:'memberChange'},
				],

				diaChange:false,
			}
		},
		methods: {

			// 返回上一页
			SecondBackBtn(){
				console.log('二级导航返回点击事件');
				this.$emit('GoBack','realMemberInfo','realMemberInfo');
				sessionStorage.removeItem('followPageName');
				sessionStorage.removeItem('followVipInfo');
			},

			// 按钮组 点击事件
			btnMethods(methodsName,pageName) {
				// 会员新增
				if (methodsName == 'memberHistory') {
					console.log('btnEdit');
					/*首页 页面显影 */
					// this.$emit('changePageShow',pageName,'memberEdit');
				}

				// 冻结合同
				if (methodsName == 'memberFrozen') {
					/*首页 页面显影  */
					console.log('修改状态');
					this.dialogFormVisible.diaRecharge = true;
					// this.$emit('changePageShow',pageName,'memberEdit');
				}

			},

			/* 弹窗 确定 提交*/
			btnDiaRechargeSure(){

			},
		},
		created() {

		},
		components:{

		},
	}
</script>
