<template>
    <div>
        <navRefush  :pageName="pageName"  @SecondBack="SecondBackBtn"></navRefush>
        <el-form :model="formAddNew" class="form-followTrainer" :rules="addRules"
                 ref="addStaffForm" :label-width="formLabelWidth">
            <div class="bgWhite-public">
                <header class="index-item-title">新增会员</header>
                <div class="bgWhite-padd20">

                    <el-form-item label="会员人脸id："  prop="headimg" class="face-item">
                        <el-image
                                class="face-img"
                                :src="formAddNew.headimg[0]"
                                :preview-src-list="formAddNew.headimg">
                        </el-image>
                        <trackFace @getFace="getFace" class="btn-addface"></trackFace>
                    </el-form-item>

                    <el-form-item label="会员姓名："  prop="true_name">
                        <el-input clearable  v-model="formAddNew.true_name" class="follow-itemInp"></el-input>
                    </el-form-item>

                    <el-form-item label="性别："  prop="sex">
                        <el-radio-group v-model="formAddNew.sex">
                            <el-radio  v-for="(item, index) in sexArr" :key="index" :label="item.id">
                                {{item.name}}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="电话："  prop="phone">
                        <el-input clearable type="number" v-model="formAddNew.phone" class="follow-itemInp"></el-input>
                    </el-form-item>

                    <el-form-item label="身份证："  prop="identify_no">
                        <el-input clearable  v-model="formAddNew.identify_no" class="follow-itemInp"></el-input>
                    </el-form-item>

                    <el-form-item label="生日：" prop="birthday">
                        <el-date-picker
                                v-model="formAddNew.birthday"
                                type="date"
                                value-format="yyyy-MM-DD"
                                placeholder="日期">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="体重："  prop="weight">
                        <el-input clearable  v-model="formAddNew.weight" class="follow-itemInp">
                            <template slot="append">kg</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="地址："  prop="address">
                        <el-input clearable  v-model="formAddNew.address" class="follow-itemInp"></el-input>
                    </el-form-item>

                </div>
            </div>
            <div class="bgWhite-public">
                <div class="bgWhite-padd20">

                    <el-form-item label="开始体验：" prop="experience_start">
                        <el-date-picker
                                v-model="formAddNew.experience_start"
                                type="date"
                                value-format="yyyy-MM-DD"
                                placeholder="开始体验">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="体验天数："  prop="test_day">
                        <el-input type="number" max="30" clearable  v-model="formAddNew.test_day" class="follow-itemInp">
                            <template slot="append">天</template>
                        </el-input>
                        <div class="tip-data">温馨提示：最大体验天数不能超过30天</div>
                    </el-form-item>

                    <el-form-item label="会员卡id："  prop="card_sn">
                        <el-input clearable  v-model="formAddNew.card_sn" class="follow-itemInp"></el-input>
                    </el-form-item>

                    <el-form-item label="会员卡号："  prop="card_no">
                        <el-input clearable  v-model="formAddNew.card_no" class="follow-itemInp"></el-input>
                    </el-form-item>

                    <el-form-item label="会籍顾问："  prop="staffSuggest">
                        <el-select  filterable v-model="formAddNew.staffSuggest" placeholder="请选择会籍顾问" class="follow-itemInp">
                            <el-option v-for="(item, index) in getChannel" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="source_channel" label="获取渠道：">
                        <el-select  filterable v-model="formAddNew.source_channel" placeholder="请选择获取渠道" class="follow-itemInp">
                            <el-option v-for="(item, index) in getChannel" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="channel_property" label="渠道属性：">
                        <el-select  filterable v-model="formAddNew.channel_property" placeholder="请选择渠道属性" class="follow-itemInp">
                            <el-option v-for="(item, index) in channelArr" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="follow_level" label="跟进等级：">
                        <el-select  filterable v-model="formAddNew.follow_level" placeholder="请选择跟进等级" class="follow-itemInp">
                            <el-option v-for="(item, index) in followLevel" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="customer_classified" label="客户分类：">
                        <el-select  filterable v-model="formAddNew.customer_classified" placeholder="请选择客户分类" class="follow-itemInp">
                            <el-option v-for="(item, index) in customerType" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="remark" label="备注：">
                        <el-input type="textarea" clearable  v-model="formAddNew.remark" class="follow-itemInp"></el-input>
                    </el-form-item>

                    <el-form-item :label-width="formLabelWidth">
                        <el-button  type="primary" @click="postStaffAdd('addStaffForm')">提交</el-button>
                        <el-button @click="resetForm('addStaffForm')">重置</el-button>
                    </el-form-item>

                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    import trackFace from "@/components/trackFace/trackFace";

    export default {
        name: "addNewVip",  //新增会员
        data() {

            // 体验天数验证
            let checkTestDay = (rule, value, callback) => {
                if(value > 30){
                    callback(new Error('最大体验天数30天！'));
                }
            };
            return {
                pageName:'addNewVip',
                formLabelWidth:'120px',

                formAddNew:{
                    headimg:['https://spt.zmtek.net/statics/image/2018/03/5aa5e1db59d15.png'],  // 人脸
                    true_name:'',
                    sex:'',
                    phone:'',
                    identify_no:'',
                    birthday:'',
                    address:'',
                    weight:'',
                    experience_start:'',
                    card_sn:'',
                    card_no:'',
                    test_day:'',
                    staffSuggest:'',
                    source_channel:'',
                    channel_property:'',
                    follow_level:'',
                    customer_classified:'',
                    remark:'',
                },


                /*验证*/
                addRules: {
                    true_name: [{ required: true, message: '姓名不能为空', trigger: 'blur' },],
                    phone: [{ required: true, message: '电话不能为空', trigger: 'blur' },],
                    sex: [{ required: true, message: '请选择性别', trigger: 'blur' },],
                    test_day:[{ validator: checkTestDay, trigger: 'blur' }],
                },

                sexArr:[
                    {id:'1', name:'男' },
                    {id:'2', name:'女' },
                ],

                // 获取渠道
                getChannel:this.GLOBAL.getChannel,

                // 渠道属性
                channelArr:this.GLOBAL.channelArr,

                // 跟进等级
                followLevel:this.GLOBAL.followLevel,

                // 客户分类
                customerType:this.GLOBAL.customerType,
            }
        },
        methods: {
            // 返回上一级
            SecondBackBtn(){
                console.log('二级导航返回点击事件');
                this.$emit('GoBack');
            },

            // 人脸提交
            getFace(data){
                console.log(data);
                this.formAddNew.faceImg = [];  //先清空 再添加
                this.formAddNew.faceImg.push(data);
            },

            // 提交
            postStaffAdd(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let formArr = this.formAddNew;
                        console.log(formArr);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            // 重置
            resetForm(formName = 'addStaffForm') {
                this.$refs[formName].resetFields();
            },
        },
        created() {

        },
        components:{

            trackFace,
        },
    }
</script>

<style lang="scss">
    .face-item{
        .el-form-item__content{
            display: flex;
            align-items: center;
        }
        .face-img{
            width: 100px;
            height: 100px;
            border-radius: 6px;
        }
        .btn-addface{
            align-self: flex-end;
            margin-left: 10px;
        }
    }
</style>