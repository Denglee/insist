<template>
    <div>
        <navBread @GoBack="goBack('staffListState','addStaffState')" breadTitle="员工列表"
                  breadContent1="添加员工"></navBread>
        <el-form :model="addStaffForm" class="addForm-box">

            <el-form-item label="员工头像" :label-width="formLabelWidth">
                <el-upload
                        action="#"
                        :on-change='changeUpload'
                        list-type="picture"
                        :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail"
                             :src="file.url" alt="">
                        <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="staffCardPreview(file)">
                                    <i class="el-icon-zoom-in"></i>
                                </span>
                                <span v-if="!diaImgVisi" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                  <i class="el-icon-delete"></i>
                                </span>
                              </span>
                    </div>
                </el-upload>
                <!--弹出放大效果-->
                <el-dialog :visible.sync="diaVisible">
                    <img width="100%" :src="diaHeadImgUrl" alt="">
                </el-dialog>
            </el-form-item>

            <el-form-item label="职位" :label-width="formLabelWidth">
                <el-select v-model="addStaffForm.user_type" placeholder="请选择">
                    <el-option v-for="item in userTypeList" :key="item.value" :label="item.catname" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="部门" :label-width="formLabelWidth">
                <el-select v-model="addStaffForm.group_id" placeholder="请选择">
                    <el-option v-for="item in staffGroup" :key="item.value" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="addStaffForm.name" autocomplete="off" class="inpStaffName" clearable></el-input>
            </el-form-item>

            <el-form-item label="编号" :label-width="formLabelWidth">
                <el-input v-model="addStaffForm.user_no" autocomplete="off" clearable class="inpStaffName"></el-input>
            </el-form-item>

            <el-form-item label="性别" :label-width="formLabelWidth">
                <el-radio-group v-model="addStaffForm.sex" class="inpStaffName">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="addStaffForm.phone" autocomplete="off" clearable class="inpStaffTel"></el-input>
            </el-form-item>

            <el-form-item label="班次" :label-width="formLabelWidth">
                <el-select v-model="addStaffForm.classes" placeholder="请选择">
                    <el-option v-for="item in classesType" :key="item.value" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="价格模式" :label-width="formLabelWidth">
                <el-select v-model="addStaffForm.price_type" placeholder="请选择">
                    <!--@change="selPriceType"-->
                    <el-option v-for="item in priceType" :key="item.value" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <!--分阶段价格模式-->
            <div v-if="addStaffForm.price_type == 2">
                <el-form-item :label="priceType[1].name+1" :label-width="formLabelWidth">
                    <el-time-picker v-model="addStaffForm.eprice_s"  key="addStaffForm.eprice_s"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    placeholder="时段1开始时间">
                    </el-time-picker>
                    <el-time-picker v-model="addStaffForm.eprice_e"  key="addStaffForm.eprice_s"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    placeholder="时段1结束时间">
                    </el-time-picker>
                   <el-input v-model="addStaffForm.eprice" placeholder="时段1价格" autocomplete="off" clearable class="inpStaffTel"></el-input>
                </el-form-item>
                <el-form-item :label="priceType[1].name+2" :label-width="formLabelWidth">
                    <el-time-picker v-model="addStaffForm.eprice2_s"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    placeholder="时段2开始时间">
                    </el-time-picker>
                    <el-time-picker v-model="addStaffForm.eprice2_e"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    placeholder="时段2结束时间">
                    </el-time-picker>
                    <el-input v-model="addStaffForm.eprice2" placeholder="时段2价格" autocomplete="off" clearable class="inpStaffTel"></el-input>
                </el-form-item>
                <el-form-item :label="priceType[1].name+3" :label-width="formLabelWidth">
                    <el-time-picker v-model="addStaffForm.eprice3_s"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    placeholder="时段3开始时间">
                    </el-time-picker>
                    <el-time-picker v-model="addStaffForm.eprice3_e"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    placeholder="时段3结束时间">
                    </el-time-picker>
                    <el-input v-model="addStaffForm.eprice3" placeholder="时段3价格" autocomplete="off" clearable class="inpStaffTel"></el-input>

                </el-form-item>
            </div>
            <div v-else>
                <el-form-item  :label="priceType[0].name"  :label-width="formLabelWidth">
                    <el-input v-model="addStaffForm.eprice"  placeholder="请输入价格" autocomplete="off" clearable class="inpStaffTel"></el-input>
                </el-form-item>
            </div>

            <el-form-item label="基本工资" :label-width="formLabelWidth">
                <el-input v-model="addStaffForm.salary" autocomplete="off" class="inpStaffTel"></el-input>
            </el-form-item>

            <el-form-item label="提成方式" :label-width="formLabelWidth">
                <el-checkbox-group class="checkGroup" v-model="addStaffForm.deduction_type" @change="CheckedtcType">
                    <el-checkbox name="DeductionType" v-for="(item,index) in deductionType" :label="item.id" :key="index">{{item.deduction_name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="教练介绍" :label-width="formLabelWidth">
                <el-input v-model="addStaffForm.user_des" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item :label-width="formLabelWidth">
                <el-button @click="postStaffAdd()">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import navBread from '@/components/Echarts/navBread'
    import {staffAdd,staffDeduct,staffGroup} from '@/assets/js/api' /*引用 员工 接口*/
    export default {
        name: "addStaff",
        data() {
            return {
                /* == 添加员工 ==*/
                formLabelWidth:'120px',
                diaHeadImgUrl: '',  //头像放大 url
                diaVisible: false, //弹出方法头像
                diaImgVisi: false,  //弹出方法头像
                imgUrl:'',   //头像 上传路径
                addStaffForm:{
                    zmtek_ver : 2,
                    type : 1,
                    userimage:'', //头像
                    user_type:'',//员工类型  职位
                    name:'', //名字
                    sex:'', // 性别
                    user_no:'', //编号
                    phone:'', //电话
                    classes:'', //班次 1 = 正常 2 = 早 3 = 中 4 = 晚
                    group_id:'', //部门id
                    salary:'',//基本工资
                    deduction_type:[], //提成方式
                    user_des:'', //练介绍
                    price_type:'', //价格模式 1 = 全天统一 2 = 分时段
                    eprice_s:'', //价格一开始时间
                    eprice_e:'', //价格一结束时间
                    eprice:'', //价格
                    eprice2_s:'', //
                    eprice2_e:'', //
                    eprice2:'', //
                    eprice3_s:'', //
                    eprice3_e:'', //
                    eprice3:'', //
                }, /*表单*/
                priceType:[
                    {id:1,name:'全天统一 '},
                    {id:2,name:'分时段'},
                ],
                userTypeList:this.GLOBAL.userTypeList,  //职位
                staffGroup:[],  //部门
                deductionType:[], //提成方式
                classesType:[
                    {id:1,name:'正班 '},
                    {id:2,name:'早班'},
                    {id:3,name:'中班'},
                    {id:4,name:'晚班'},
                ], //班次

            }
        },
        methods: {
            /*3.1、头像 上传 选中*/
            changeUpload(file){
                console.log(file);
                this.GLOBAL.getEleBase64(file.raw).then(res => {
                    console.log(res);
                    this.imgUrl = res;
                    this.addStaffForm.userimage = res;
                });
            },
            /*3.1、头像上传 删除*/
            handleRemove(file) {
                console.log(file);
            },
            /*1. 1、头像 放大*/
            staffCardPreview(file) {
                this.diaHeadImgUrl = file.url;
                this.diaVisible = true;
            },

            /*提交*/
            postStaffAdd(){
                let formArr = this.addStaffForm;
                console.log(formArr);
                // return false;
                staffAdd(formArr).then(res => {
                    console.log(res.data);
                }).catch(res => {
                    console.log(res);
                });
            },

            /*获取 部门*/
            getStaffGroup(){
                staffGroup({
                    zmtek_ver : 2,
                    type : 1,
                }).then(res => {
                    console.log(res.data);
                    this.staffGroup = res.data;
                }).catch(res => {
                    console.log(res);
                });
            },

            // /*价格模式 选择事件*/
            // selPriceType(val){
            //     console.log(val);
            //     if(val == 2){
            //         this.addStaffForm.eprice_s='';
            //         this.addStaffForm.eprice_e='';
            //         this.addStaffForm.eprice='' ;
            //         this.addStaffForm.eprice2_s='';
            //         this.addStaffForm.eprice2_e='';
            //         this.addStaffForm.eprice2='';
            //         this.addStaffForm.eprice3_s='';
            //         this.addStaffForm.eprice3_e='';
            //         this.addStaffForm.eprice3='';
            //     }
            // },

            /*选择提成方式*/
            CheckedtcType(val){
                console.log(val);
            },

            /*获取提成方式*/
            getStaffDeduct(){
                staffDeduct({
                    zmtek_ver : 2,
                    type : 1,
                }).then(res => {
                    console.log(res.data);
                    this.deductionType = res.data;
                }).catch(res => {
                    console.log(res);
                });
            },

        },
        created() {
            this.getStaffGroup();
            this.getStaffDeduct();
        },
        components:{
            navBread,
        }
    }
</script>

<style scoped lang="scss">

</style>