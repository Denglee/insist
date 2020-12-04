<template>
    <div class="layoutR-contain animated fadeIn">
        <navRefush  :pageName="pageName"  @SecondBack="SecondBackBtn"></navRefush>
        <div class="bgWhite-public">
            <header class="index-item-title">会员入会</header>

            <el-form :model="formJoin" class="form-member-join" ref="addForm" label-width="120px">

                <el-form-item label="性别："  prop="card">
                    <el-radio-group v-model="formJoin.card">
                        <el-radio  v-for="(item, index) in cardArr" :key="index" :label="item.id">
                            {{item.name}}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="会员姓名："  prop="true_name">
                    <el-input clearable  v-model="formJoin.true_name"></el-input>
                </el-form-item>

                <el-form-item prop="source_channel" label="获取渠道：" :rules="{ required: true, message: '获取渠道不能为空', trigger: 'change' }">
                    <el-select  filterable v-model="formJoin.source_channel" placeholder="请选择获取渠道">
                        <el-option v-for="(item, index) in getChannel" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop="channel_property" label="渠道属性：">
                    <el-select  filterable v-model="formJoin.channel_property" placeholder="请选择渠道属性">
                        <el-option v-for="(item, index) in channelArr" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <ul class="form-inline-box">
                    <li class="form-inline-li">
                        <el-form-item label="购买数量："  prop="buyNum">
                            <el-input clearable  v-model="formJoin.true_name"></el-input>
                        </el-form-item>
                    </li>
                    <li class="form-inline-li">
                        <el-form-item label="赠送天数："  prop="giveDay" >
                            <el-input clearable  v-model="formJoin.true_name"></el-input>
                        </el-form-item>
                    </li>
                </ul>


                <el-form-item>
                    <el-button  type="primary" @click="btnSubmit('addForm')">提交</el-button>
                    <el-button @click="resetForm('addForm')">重置</el-button>
                </el-form-item>


            </el-form>
        </div>

    </div>
</template>

<script>
	export default {
		name: "memberJoin",  //会员入会
		data() {
			return {
				pageName:'addNewVip',

				formJoin:{
					card:1,
					source_channel:'',
					channel_property:'',
					true_name:'',
					buyNum:'',
					giveDay:'',
                },

				// addRules:{},
				cardArr:[
                    {id:1, name:'个人购卡'},
                    {id:2, name:'情侣卡'},
                    {id:3, name:'家庭卡'},
                ],

				// 获取渠道
				getChannel:this.GLOBAL.getChannel,

				// 渠道属性
				channelArr:this.GLOBAL.channelArr,
            }
		},
		methods: {

			// 购买入会 提交
			btnSubmit(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let formArr = this.formJoin;
						console.log(formArr);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},

			// 购买入会 重置
			resetForm(formName = 'addStaffForm') {
				this.$refs[formName].resetFields();
			},

			// 返回上一级
			SecondBackBtn(){
				console.log('二级导航返回点击事件');
				this.$emit('GoBack', 'memberInfo','memberJoin');
			},

        },

		created() {
			
		},

        components:{

        },

	}
</script>

<style lang="scss">
    .form-member-join{
        width: 80%;
        padding: 20px ;
        .el-select{
            width: 100%;
        }
    }
    .form-inline-box{
        display: flex;
        .form-inline-li{
            width: 50%;
        }
    }
</style>
