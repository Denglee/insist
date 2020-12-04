<template>
    <div id="realMemberInfo">
        <div class="btnNav-contain">
            <navRefush class="btnNav-left"  @SecondBack="SecondBackBtn"></navRefush>
            <ul>
                <!--充值-->
                <li class="btnNav-flex btnNav-vip">
                    <button class="btnNav-box" v-for="(item,index) in btnRecharge" :key="index" @click="btnMethods(item.methodsName,item.pageName)"
                    >
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

        <div class="bgWhite-public" style="min-height: auto;">
            <header class="index-item-title">会员信息</header>
            <el-row class="bgWhite-padd20 memInfo-info">
                <el-col :span="4">
                    <el-image :src="memberHeader" class="realMemberInfo-header"></el-image>
                </el-col>
                <el-col :span="7">
                    <div><span class="fontGray">会员姓名：</span><span>答咔</span></div>
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
                    <div><span class="fontGray">私人教练：</span><span>答咔</span></div>
                </el-col>

             </el-row>
        </div>

        <div class="bgWhite-public" style="min-height: auto;">
            <header class="index-item-title">会员卡信息</header>
            <div class="bgWhite-padd20">
                <el-table class="pub-table" border
                          :data="saleRoomInfo"
                          @selection-change="checkedStaff"
                          ref="multipleTable"
                          @row-click="handleRowClick">
                    <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
                    <el-table-column prop="true_name" label="姓名">
                        <template slot-scope="scope">
                            <div class="color-MediumBlue member-name" @click.stop="goVipInfo">{{scope.row.true_name}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sex" label="性别"></el-table-column>
                    <el-table-column prop="phone" label="电话"></el-table-column>
                    <el-table-column prop="birthday" label="生日"></el-table-column>
                    <el-table-column prop="identify_no" label="身份证"></el-table-column>
                    <el-table-column prop="member_time" label="录入日期"></el-table-column>
                </el-table>
            </div>
        </div>

        <!--切换块-->
        <comTabMember></comTabMember>

        <!--弹窗 -->
        <el-dialog title="会员充值" :visible.sync="dialogFormVisible.diaRecharge" :append-to-body="true">
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
    import comTabMember from "./comTabMember";
    export default {
        name: "realMemberInfo",   //潜在会员信息

        data() {
            return {
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
                ],

	            dialogFormVisible:{
		            diaRecharge:false,
	            },
	            rechargeForm:{
		            name:'',
		            payWay:'',
		            pay_type:'',

	            },
	            payWayArr:[
                    {id:0, name:'微信支付'},
                    {id:1, name:'支付宝'},
                    {id:2, name:'现金'},
                    {id:3, name:'刷卡'},
                    {id:4, name:'转账'},
                    {id:9, name:'平安'},
                ],

                memberHeader:'http://vikily.f3322.net:20000/d/image/boy.png',

                // 充值
                btnRecharge:[
                    { name:"绑定手环", type:'if',  iconClass:'icon-chongzhi-',  methodsName:'menberRecharge' ,pageName:'menberRecharge'},
                    { name:"信息编辑", type:'if',  iconClass:'bgcMediumBlue2 icon-jiaolian', methodsName:'btnAssign', pageName:'addNewVip'},
                    { name:"会员续费", type:'if',  iconClass:'bgcPink icon-chongzhi', methodsName:'btnDelVip', pageName:'addNewVip'},
                ],

                // 购卡
                btnCard:[
                    { name:"购私教卡", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberJoin' ,pageName:'memberJoin'},
                    { name:"购滑雪卡", type:'if',  iconClass:'bgcMediumBlue2 icon-huaxue', methodsName:'btnAssign', pageName:'addNewVip'},
                    { name:"特殊次卡", type:'if',  iconClass:'bgcPink icon-jiaolian', methodsName:'btnDelVip', pageName:'addNewVip'},
                ],

                // 会员
                btnIntegral:[
                    { name:"会员充值", type:'if',  iconClass:'icon-zengsong',  methodsName:'menberRecharge' ,pageName:'menberRecharge'},
                    { name:"会员充值", type:'if',  iconClass:'bgcMediumBlue2 icon-genjinkehu11', methodsName:'btnAssign', pageName:'addNewVip'},
                    { name:"定金收取", type:'if',  iconClass:'bgcMediumBlue2 icon-genjinkehu11', methodsName:'btnAssign', pageName:'addNewVip'},
                    { name:"租柜合同", type:'if',  iconClass:'bgcMediumBlue2 icon-genjinkehu11', methodsName:'btnAssign', pageName:'addNewVip'},
                    { name:"修改余额", type:'if',  iconClass:'bgcMediumBlue2 icon-genjinkehu11', methodsName:'btnAssign', pageName:'addNewVip'},
                    { name:"积分兑余额", type:'if',  iconClass:'bgcMediumBlue2 icon-genjinkehu11', methodsName:'btnAssign', pageName:'addNewVip'},
                    { name:"积分赠送", type:'if',  iconClass:'bgcMediumBlue2 icon-genjinkehu11', methodsName:'btnAssign', pageName:'addNewVip'},
                    { name:"新增附属人", type:'if',  iconClass:'bgcMediumBlue2 icon-genjinkehu11', methodsName:'btnAssign', pageName:'addNewVip'},
                 ],

            }
        },
        methods: {
	        // 去会员详情页
	        goVipInfo(){
		        this.$emit('changePageShow','realMember_cardIndex','memberInfo');
		        // this.changePageShow('realMemberInfo','realMemberInfo');
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

	        /*会员充值 弹窗 确定 提交*/
	        btnDiaRechargeSure(){

	        },

            // 返回上一页
            SecondBackBtn(){
                console.log('二级导航返回点击事件');

                this.$emit('GoBack','memberIndex','realMemberInfo');
                sessionStorage.removeItem('followPageName');
                sessionStorage.removeItem('followVipInfo');
            },


            // 按钮组 点击事件
            btnMethods(methodsName,pageName) {

                // 会员新增
                if (methodsName == 'btnEdit') {
                    /*首页 页面显影*/
                    console.log(pageName);
                    this.$emit('changePageShow',pageName,'realMemberInfo');
                }

                if (methodsName == 'menberRecharge') {
                    /*首页 页面显影*/
                    console.log('会员充值');
                    this.dialogFormVisible.diaRecharge = true;
                   /* this.$emit('changePageShow',pageName,'realMemberInfo');*/
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
