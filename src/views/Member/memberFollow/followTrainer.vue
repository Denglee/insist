<template>
    <div>
        <el-form :model="formFollowT" class="form-followTrainer" :rules="addRules"
                 ref="addStaffForm" :label-width="formLabelWidth">
            <el-form-item label="会员姓名："  prop="true_name">
                <el-input v-model="formFollowT.true_name" class="follow-itemInp" disabled="disabled"></el-input>
            </el-form-item>

            <el-form-item label="会员电话："  prop="phone">
                <el-input v-model="formFollowT.phone" class="follow-itemInp" ></el-input>
            </el-form-item>

            <el-form-item label="跟进人："  prop="saler_id">
                <el-select  filterable v-model="formFollowT.saler_id" placeholder="请选择跟进人" class="follow-itemInp">
                    <el-option v-for="(item, index) in salerArr" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="通讯目的："  prop="contact_purpose" v-if=" followType == 'followTrainer' ">
                <el-radio-group v-model="formFollowT.contact_purpose">
                    <el-radio  v-for="(item, index) in contactGoal" :key="index" :label="item.id">
                        {{item.name}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="通讯目的："  prop="contact_purpose" v-else>
                <el-radio-group v-model="formFollowT.contact_purpose">
                    <el-radio  v-for="(item, index) in contactGoal2" :key="index" :label="item.id">
                        {{item.name}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="服务方式："  prop="service_type">
                <el-radio-group v-model="formFollowT.service_type">
                    <el-radio  v-for="(item, index) in serviceWay" :key="index" :label="item.id">
                        {{item.name}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="通讯状态："  prop="contact_status">
                <el-select  filterable v-model="formFollowT.contact_status" placeholder="请选择跟进人" class="follow-itemInp">
                    <el-option v-for="(item, index) in contactArr" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="通讯结果：" prop="contact_result" v-if=" followType == 'followTrainer' ">
                <el-radio-group v-model="formFollowT.contact_result">
                    <el-radio  v-for="(item, index) in contactResult" :key="index" :label="item.id">
                        {{item.name}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="通讯结果：" prop="contact_result" v-else>
                <el-radio-group v-model="formFollowT.contact_result">
                    <el-radio  v-for="(item, index) in contactResult2" :key="index" :label="item.id">
                        {{item.name}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="未成功原因："  prop="contact_result_type">
                <el-select  filterable v-model="formFollowT.contact_result_type" placeholder="请选择跟进人" class="follow-itemInp">
                    <el-option v-for="(item, index) in contactFail" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <!--除了销售跟进-->
            <el-form-item label="预约会籍销售："  prop="staffSuggest" v-if="followType != 'followTrainer' ">
                <el-select  filterable v-model="formFollowT.staffSuggest" placeholder="请选择预约会籍销售" class="follow-itemInp">
                    <el-option v-for="(item, index) in salerArr" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <!--只有教练跟进才有-->
            <el-form-item label="预约教练："  prop="personalSuggest" v-if=" followType == 'followTrainer' ">
                <el-select  filterable v-model="formFollowT.personalSuggest" placeholder="请选择预约教练" class="follow-itemInp">
                    <el-option v-for="(item, index) in salerArr" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="课程名称："  prop="course_id">
                <el-select  filterable v-model="formFollowT.course_id" placeholder="请选择课程名称" class="follow-itemInp">
                    <el-option v-for="(item, index) in salerArr" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="预约课时："  prop="course_number">
                <el-input v-model="formFollowT.course_number" class="follow-itemInp" placeholder="请选择预约课时">
                    <template slot="append">节</template>
                </el-input>
            </el-form-item>

            <el-form-item label="预约时间："  prop="order_time">
                <el-date-picker
                        v-model="formFollowT.order_time"
                        type="datetime"
                        value-format="yyyy-MM-DD hh:mm:ss"
                        placeholder="请选择预约时间">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="通话内容："  prop="remark">
                <el-input clearable type="textarea"  v-model="formFollowT.remark" class="follow-itemInp" placeholder="请输入通话内容"></el-input>
            </el-form-item>

            <el-form-item label="下次联系时间："  prop="next_time">
                <el-date-picker
                        v-model="formFollowT.next_time"
                        type="datetime"
                        value-format="yyyy-MM-DD hh:mm:ss"
                        placeholder="请选择下次联系时间">
                </el-date-picker>
            </el-form-item>

            <el-form-item :label-width="formLabelWidth">
                <el-button  type="primary" @click="postStaffAdd('addStaffForm')">提交</el-button>
                <el-button @click="resetForm('addStaffForm')">重置</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>

<script>
    export default {
        name: "followTrainer",     /*教练跟进*/
        props:{
            followVipInfo:{
                type:Array,
            },
            followType:{
                type:String,
            }
        },
        data() {
            return {
                formLabelWidth:'124px',

                /*验证*/
                addRules: {
                    saler_id: [{ required: true, message: '请选择跟进人', trigger: 'blur' },],
                    personalSuggest: [{ required: true, message: '请选择预约教练', trigger: 'blur' },],
                    staffSuggest: [{ required: true, message: '请选择会籍销售', trigger: 'blur' },],
                },

                // 跟进人
                salerArr:[
                    {id:'1300', name:'蔡其' },
                ],

                // 通讯目的  教练
                contactGoal:[
                    {id:'0', name:'其他' },
                    {id:'1', name:'免费课联系' },
                    {id:'2', name:'体测' },
                ],

                // 通讯目的  教练以外
                contactGoal2:[
                    {id:'0', name:'其他' },
                    {id:'1', name:'销售跟进' },
                    {id:'2', name:'TI回电' },
                ],

                // 服务方式
                serviceWay:[
                    {id:'0', name:'电话跟进' },
                    {id:'1', name:'信函 \\ 短信跟进' },
                    {id:'2', name:'见面跟进' },
                    {id:'3', name:'Email跟进' },
                ],

                // 通讯状态
                contactArr:[
                    {id:'0', name:'无人接听' },
                    {id:'1', name:'接通' },
                    {id:'2', name:'电话忙' },
                    {id:'3', name:'空号' },
                    {id:'4', name:'关机' },
                    {id:'5', name:'挂断' },
                    {id:'6', name:'停机' },
                ],

                // 通讯结果  教练
                contactResult:[
                    {id:'1', name:'预约成功' },
                    {id:'2', name:'未预约成功' },
                    {id:'3', name:'免费课程预约' },
                    {id:'4', name:'已购买课程预约' },
                ],

                // 通讯结果  教练以外
                contactResult2:[
                    {id:'1', name:'预约成功' },
                    {id:'2', name:'未预约成功' },
                    {id:'3', name:'会籍预约' },
                    {id:'4', name:'团课预约' },
                ],

                // 未成功原因
                contactFail:[
                    {id:'0', name:'无人接听' },
                    {id:'1', name:'问候电话' },
                    {id:'2', name:'最近没时间' },
                    {id:'3', name:'不感兴趣' },
                    {id:'4', name:'对俱乐部硬件有意见' },
                    {id:'5', name:'对服务有意见' },
                    {id:'6', name:'对团课有意见' },
                    {id:'7', name:'对教练有意见' },
                    {id:'8', name:'价格' },
                    {id:'9', name:'没有效果' },
                    {id:'10', name:'其他' },
                ],

                formFollowT:{
                    true_name:'', //会员姓名
                    phone:'', //会员电话
                    saler_id:'', //跟进人
                    contact_purpose:'', //通讯目的
                    service_type:'', //服务方式
                    contact_status:'', //通讯状态
                    contact_result:'', //通讯结果
                    contact_result_type:'', //未预约成功原因
                    staffSuggest:'', //预约会籍销售
                    personalSuggest:'', //预约教练
                    course_id:'', //课程名称
                    course_number:'', //预约课时
                    order_time:'', //预约时间
                    remark:'', //通话内容
                    next_time:'', //下次预约时间
                },
            }
        },
        methods: {
            // 提交
            postStaffAdd(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let formArr = this.formFollowT;
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

            // 初始化data
            tabClear(){
                console.log(this.formFollowT);
                Object.assign(this.$data, this.$options.data())
            },

        },
        created() {
            let true_name = this.followVipInfo[0].true_name;
            this.formFollowT.true_name = true_name
        },
    }
</script>
<style lang="scss">
    .form-followTrainer{
        margin: 20px 0;
        .el-date-editor{
            width:400px !important;
        }
        .el-input-group__append{
            background-color: #fff;

        }
    }
    
   .follow-itemInp{
       width: 400px;
   }


</style>
