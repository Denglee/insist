<template>
    <div id="memberInfo">
        <div class="btnNav-contain">
            <navRefush class="btnNav-left"  @SecondBack="SecondBackBtn"></navRefush>
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

        <el-row class="memInfo-price" :gutter="20">
            <el-col :span="8" class="color-MediumBlue">
                <span>剩余定金金额</span>
                <div><span>￥</span><span class="num">50</span>元</div>
            </el-col>
            <el-col :span="8"  class="color-Pink">
                <span>剩余充值金额</span>
                <div><span>￥</span><span class="num">50</span>元</div>
            </el-col>
            <el-col :span="8"  class="color-MediumBlue2">
                <span>最后跟进时间</span>
                <div><span class="num">2019-09-24</span></div>
            </el-col>
        </el-row>


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
    export default {
        name: "memberInfo",   //潜在会员信息

        data() {
            return {

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
                    { name:"会员充值", type:'if',  iconClass:'icon-chongzhi-',  methodsName:'menberRecharge' ,pageName:'menberRecharge'},
                    { name:"修改余额", type:'if',  iconClass:'bgcMediumBlue2 icon-jiaolian', methodsName:'btnAssign', pageName:'addNewVip'},
                    { name:"定金收取", type:'if',  iconClass:'bgcPink icon-chongzhi', methodsName:'btnDelVip', pageName:'addNewVip'},
                ],

                // 购卡
                btnCard:[
                    { name:"购买入会", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'memberJoin' ,pageName:'memberJoin'},
                    { name:"购滑雪卡", type:'if',  iconClass:'bgcMediumBlue2 icon-huaxue', methodsName:'btnAssign', pageName:'addNewVip'},
                    { name:"购私教卡", type:'if',  iconClass:'bgcPink icon-jiaolian', methodsName:'btnDelVip', pageName:'addNewVip'},
                    { name:"特殊次卡", type:'if',  iconClass:'bgcPink icon-jiaolian', methodsName:'btnDelVip', pageName:'addNewVip'},
                ],

                // 积分
                btnIntegral:[
                    { name:"积分赠送", type:'if',  iconClass:'icon-zengsong',  methodsName:'menberRecharge' ,pageName:'menberRecharge'},
                    { name:"跟进详情", type:'if',  iconClass:'bgcMediumBlue2 icon-genjinkehu11', methodsName:'btnAssign', pageName:'addNewVip'},
                 ],

            }
        },
        methods: {


	        /*会员充值 弹窗 确定 提交*/
	        btnDiaRechargeSure(){

	        },

            // 返回上一页
            SecondBackBtn(){
                console.log('二级导航返回点击事件');

                this.$emit('GoBack','memberIndex','memberInfo');
                sessionStorage.removeItem('followPageName');
                sessionStorage.removeItem('followVipInfo');
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
                    console.log('会员充值');
                    this.dialogFormVisible.diaRecharge = true;
                   /* this.$emit('changePageShow',pageName,'memberInfo');*/
                }

	            // 会员入会
	            if (methodsName == 'memberJoin') {
		            /*首页 页面显影*/
		            this.$emit('changePageShow',pageName,'memberJoin');
	            }

            },
        },
        created() {

        },
        components:{

        },
    }
</script>
