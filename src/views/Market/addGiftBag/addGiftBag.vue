<template>
    <div>
        <el-form :model="formAddNew" class="form-followTrainer"
                 ref="addGiftForm" :label-width="formLabelWidth">
            <div class="bgWhite-public">
                <header class="index-item-title">新增礼包</header>
                <div class="bgWhite-padd20">

                    <el-form-item label="标题："  prop="title">
                        <el-input clearable  v-model="formAddNew.title" class="follow-itemInp"></el-input>
                    </el-form-item>

                    <el-form-item label="内容："  prop="content">
                        <el-input clearable  v-model="formAddNew.content" class="follow-itemInp"></el-input>
                    </el-form-item>

                    <el-form-item label="使用模式" prop="scene">
                        <el-select  filterable v-model="formAddNew.scene" placeholder="请选择模式" class="inpStaffTel">
                            <el-option v-for="(item,index) in sceneType" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="抵券金额："  prop="price">
                        <el-input clearable  v-model="formAddNew.price" class="follow-itemInp"></el-input>
                    </el-form-item>

                    <el-form-item label="消费门槛："  prop="threshold">
                        <el-input clearable  v-model="formAddNew.threshold" class="follow-itemInp"></el-input>
                    </el-form-item>

                    <el-form-item label="是否限制" prop="astrict">
                        <el-radio-group v-model="formAddNew.astrict" class="inpStaffName">
                            <el-radio label="1">不限制</el-radio>
                            <el-radio label="2">限制</el-radio>
                        </el-radio-group>
                    </el-form-item>


                    <el-form-item label="限制类型" prop="consume_type" v-if="formAddNew.astrict == 2">

                        <el-checkbox-group v-model="formAddNew.consume_type" class="inpStaffTel">
                            <el-checkbox name="consumeType" v-for="(item,index) in consumeType" :label="item.id" :key="index">
                                {{item.name}}
                            </el-checkbox>
                        </el-checkbox-group>

                    </el-form-item>


                    <el-form-item label="开始时间：" prop="start_time">
                        <el-date-picker
                                v-model="formAddNew.start_time"
                                type="date"
                                value-format="timestamp"
                                placeholder="日期">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="结束时间：" prop="end_time">
                        <el-date-picker
                                v-model="formAddNew.end_time"
                                type="date"
                                value-format="timestamp"
                                placeholder="日期"
                       >
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="礼包类型" prop="type">
                        <el-select  filterable v-model="formAddNew.type" placeholder="请选择礼包类型" class="inpStaffTel">
                            <el-option v-for="(item,index) in giftType" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item :label-width="formLabelWidth">
                        <el-button  type="primary" @click="postGiftAdd('addGiftForm')"
                                    :loading="btnLoad.submit">提交</el-button>
                        <el-button @click="backNext">返回</el-button>
                    </el-form-item>

                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    import navRefush from '@/components/navRefush/navRefush'
    import {addGiftBagApi} from '../../../assets/js/api'
    export default {
        name: "addGiftBag",
        inject:['reLoad'],
        props: {

            /*父组件传过来的表单数据*/
            editGift:{},
            giftEditType:{
                type: String,
            }
        },
        data() {
            return {
                formLabelWidth:'100px',
                btnLoad:{
                    submit:false
                },

                formAddNew:{
                    zmtek_ver:2,
                    operation:'1',  //增删改 操作类型
                    title:'',  //标题
                    content:'',  //内容
                    scene:'',  //1 = 线上 2 = 线下
                    astrict:'',
                    consume_type:[],  //消费限制，逗号间隔 1 私教 2 会籍 3 次卡 4 期限 5 不限
                    price:'',   //金额
                    threshold:'',  //消费门槛
                    start_time:'',  //
                    end_time:'',  //
                    type:'',  //类型 1 = 注册礼包 2 = 分享礼包
                    id:'',  //id
                },

                sceneType:[
                    {id:'1', name:'线上'},
                    {id:'2', name:'线下'},
                ],
                consumeType:[
                    {id:'1', name:'私教'},
                    {id:'2', name:'会籍'},
                    {id:'3', name:'次卡'},
                    {id:'4', name:'期限'},
                ],
                giftType:[
                    {id:'1', name:'注册礼包'},
                    {id:'2', name:'分享礼包'},
                ],

            }
        },
        methods: {

            formatTime2(dataStr, pattern = 'YYYY-MM-DD'){
                let resTime =this.$moment(dataStr).format(pattern);
                return resTime;
            },

            // 提交
            postGiftAdd(formName){
                this.GLOBAL.btnStateChange(this,'btnLoad','submit');

                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        let startTime = this.formatTime2(this.formAddNew.start_time);
                        let endTime = this.formatTime2(this.formAddNew.end_time);
                        this.formAddNew.start_time = startTime;
                        this.formAddNew.end_time = endTime;

                        console.log(this.formAddNew)

                        addGiftBagApi(this.formAddNew).then(res=>{
                            if(res.status == 1){
                                console.log(res.data);
                                this.$message.success(res.info);
                                setTimeout(()=>{
                                    this.reLoad();
                                },1000);
                            }else {
                                this.$message.error(res.info);
                            }
                        }).catch(res=>{
                            console.log(res)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },


            /*返回上一页*/
            backNext(){
                this.$emit('backNext');
            },

        },
        created() {
            let giftEditType = this.giftEditType;
            console.log(giftEditType);
            if(giftEditType == 2){
                this.formAddNew =  this.editGift;
                this.formAddNew.operation = giftEditType;
            }
        },
        components:{
            navRefush,
        },
    }
</script>

<style lang="scss">
    .follow-itemInp,
    .inpStaffTel{
        width: 360px;
    }
</style>
