<template>
    <div class="vip-tabBox">
        <el-form :model="addStaffForm" class="addForm-box" :rules="addRules" ref="addStaffForm">

            <el-form-item label="员工头像" :label-width="formLabelWidth">
                <div class="img-header" v-if="addStaffForm.userimage">
                    <img :src=' addStaffForm.userimage | imgBase(localUrl)'  ref="singleImg">
                    <!--<span @click="staffCardPreview" class="imgHeader-big">放大</span>-->
                </div>
                <el-upload
                        class="btn-header"
                        action="#"
                        list-type="picture-card"
                        :on-change='changeUpload'
                        :show-file-list="false"
                        :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                </el-upload>

                <!--弹出放大效果-->
                <el-dialog  :append-to-body="true" :visible.sync="diaVisible">
                    <img width="100%" :src="addStaffForm.userimage" alt="">
                </el-dialog>
            </el-form-item>

            <el-form-item label="职位" :label-width="formLabelWidth" prop="user_type">
                <el-select  filterable v-model="addStaffForm.user_type" placeholder="请选择职位" class="inpStaffTel">
                    <el-option v-for="( item, index ) in userTypeList" :key="item.id" :label="item.catname" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="部门" :label-width="formLabelWidth" prop="group_id">
                <el-select  filterable v-model="addStaffForm.group_id" placeholder="请选择部门" class="inpStaffTel">
                    <el-option v-for="( item, index ) in staffGroup" :key="item.value" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                <el-input v-model="addStaffForm.name" autocomplete="off" placeholder="请输入姓名" class="inpStaffTel" clearable></el-input>
            </el-form-item>

            <el-form-item label="编号" :label-width="formLabelWidth" prop="user_no">
                <el-input v-model="addStaffForm.user_no" autocomplete="off" placeholder="请输入编号" clearable class="inpStaffTel"></el-input>
                <div class="colorGray"><i class="el-icon-warning"></i>请输入编号，如：小惠，编号写：xh,便于后期快速查询</div>
            </el-form-item>

            <el-form-item label="性别" :label-width="formLabelWidth">
                <el-radio-group v-model="addStaffForm.sex" class="inpStaffName">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="状态" :label-width="formLabelWidth">
                <el-radio-group v-model="addStaffForm.lock" class="inpStaffName">
                    <el-radio label="0">在职</el-radio>
                    <el-radio label="1">离职</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="addStaffForm.phone" autocomplete="off" placeholder="请输入电话"  clearable class="inpStaffTel"></el-input>
            </el-form-item>

            <el-form-item label="班次" :label-width="formLabelWidth">
                <el-select  filterable v-model="addStaffForm.classes" placeholder="请选择班次" class="inpStaffTel"
                            @visible-change="selectClasses">
                    <el-option v-for="( item, index ) in classesType" :key="item.value" :label="item.value" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="价格模式" :label-width="formLabelWidth">
                <el-select  filterable v-model="addStaffForm.price_type" placeholder="请选择价格模式" class="inpStaffTel">
                    <!--@change="selPriceType"-->
                    <el-option v-for="( item, index ) in priceType" :key="item.value" :label="item.value" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <!--分阶段价格模式-->
            <div v-if="addStaffForm.price_type == 2">
                <el-form-item :label="priceType[1].value+1" :label-width="formLabelWidth">
                    <el-time-picker v-model="addStaffForm.eprice_s"  key="addStaffForm.eprice_s"
                                    class="inpStaffTime"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    placeholder="时段1开始时间">
                    </el-time-picker>
                    <el-time-picker v-model="addStaffForm.eprice_e"  key="addStaffForm.eprice_e"
                                    class="inpStaffTime"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    placeholder="时段1结束时间">
                    </el-time-picker>
                   <el-input v-model="addStaffForm.eprice" placeholder="时段1价格" autocomplete="off" clearable class="inpStaffTime"></el-input>
                </el-form-item>
                <el-form-item :label="priceType[1].value+2" :label-width="formLabelWidth">
                    <el-time-picker v-model="addStaffForm.eprice2_s"
                                    class="inpStaffTime"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    placeholder="时段2开始时间">
                    </el-time-picker>
                    <el-time-picker v-model="addStaffForm.eprice2_e"
                                    class="inpStaffTime"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    placeholder="时段2结束时间">
                    </el-time-picker>
                    <el-input v-model="addStaffForm.eprice2" placeholder="时段2价格" autocomplete="off" clearable class="inpStaffTime"></el-input>
                </el-form-item>
                <el-form-item :label="priceType[1].value+3" :label-width="formLabelWidth">
                    <el-time-picker v-model="addStaffForm.eprice3_s"
                                    class="inpStaffTime"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    placeholder="时段3开始时间">
                    </el-time-picker>
                    <el-time-picker v-model="addStaffForm.eprice3_e"
                                    class="inpStaffTime"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    placeholder="时段3结束时间">
                    </el-time-picker>
                    <el-input v-model="addStaffForm.eprice3" placeholder="时段3价格" autocomplete="off" clearable class="inpStaffTime"></el-input>

                </el-form-item>
            </div>
            <div v-else>
                <el-form-item  :label="priceType[0].value"  :label-width="formLabelWidth">
                    <el-input v-model="addStaffForm.eprice"  placeholder="请输入价格" autocomplete="off" clearable class="inpStaffTel"></el-input>
                </el-form-item>
            </div>

            <el-form-item label="基本工资" :label-width="formLabelWidth">
                <el-input v-model="addStaffForm.salary" autocomplete="off"  placeholder="请输入基本工资" class="inpStaffTel"></el-input>
            </el-form-item>

            <el-form-item label="提成方式" :label-width="formLabelWidth">

                <div v-if="!deductionType" style="color: #606266;">暂无提成方式，请先添加</div>

                <el-checkbox-group v-else v-model="addStaffForm.deduction_type" @change="CheckedtcType" class="inpStaffTel">
                    <el-checkbox name="DeductionType" v-for="(item,index) in deductionType" :label="item.id" :key="index">{{item.deduction_name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="教练介绍" :label-width="formLabelWidth">
                <tinymce ref="editor"
                         style="max-width: 80%;"
                         v-model="addStaffForm.user_des"
                        :disabled="disabled"
                        @onClick="onClick">
                </tinymce>
                <!--<button @click="clear">清空内容</button>
                <button @click="disabled = true">禁用</button>-->

                <!--<el-input v-model="addStaffForm.user_des" autocomplete="off" class="inpStaffTel"></el-input>-->
            </el-form-item>

            <el-form-item :label-width="formLabelWidth">
                <el-button  type="primary" @click="postStaffAdd('addStaffForm')">提交</el-button>
            </el-form-item>
        </el-form>

        <!--tab2 排班弹窗-->
        <el-dialog :close-on-click-modal="false" :append-to-body="true" :title="diaGroupTitle" :visible.sync="showState.diaGroupEdit"  width="80%"
                   custom-class="sched-dialog">
            <Scheduling @closeClassesDia = 'closeClassesDia' ref="childSchedu"></Scheduling>
        </el-dialog>

    </div>
</template>

<script>
    import navBread from '@/components/navBread/navBread'
    import tinymce from '@/components/tinymce/tinymce'
    import Scheduling from "./Scheduling";   //排班组件
    import {staffAdd,staffDeduct,staffGroup} from '@/assets/js/api' /*引用 员工 接口*/
    export default {
        name: "addStaff",
        inject:['reLoad'], //注入依赖 App 中的reLoad方法
        props: {
            editStaffMark: {
                type: String,
            },

            /*父组件传过来的表单数据*/
            'editStaff':{},
        },
        data() {
            return {
                staffId:'',
                diaGroupTitle:'排班设置',
                showState:{
                    diaGroupEdit:false,   //排版 弹窗 显隐
                },


                /* == 添加员工 ==*/
                formLabelWidth:'120px',
                diaHeadImgUrl: '',  //头像放大 url
                diaVisible: false, //弹出方法头像
                diaImgVisi: false,  //弹出方法头像
                imgUrl:'',   //头像 上传路径
                addStaffForm:{
                    id:'',
                    information:'2',
                    zmtek_ver : 2,
                    type : 1,
                    userimage:'', //头像
                    user_type:'',//员工类型  职位
                    name:'', //名字
                    sex:'1', // 性别
                    lock:'0', // 状态 离职 在职
                    user_no:'', //编号
                    phone:'', //电话
                    classes:'', //班次 1 = 正常 2 = 早 3 = 中 4 = 晚 5 自定义
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
                    {id:'1',value:'全天统一 '},
                    {id:'2',value:'分时段'},
                ],
                userTypeList:this.GLOBAL.userTypeList,  //职位
                staffGroup:[],  //部门
                deductionType:[], //提成方式
                classesType:[
                    {id:'1',value:'正班 '},
                    {id:'2',value:'早班'},
                    {id:'3',value:'中班'},
                    {id:'4',value:'晚班'},
                    {id:'5',value:'排班'},
                ], //班次

                addRules: {
                    name: [{ required: true, message: '请输入姓名', trigger: 'blur' },],
                    user_no: [{ required: true, message: '请输入编号', trigger: 'blur' },],
                    phone: [{ required: true, message: '请输入姓名', trigger: 'blur' },],
                    user_type: [{ required: true, message: '请选择职位', trigger: 'change' },],
                    group_id  : [{ required: true, message: '请选择部门', trigger: 'change' },],
                },

                localUrl:this.GLOBAL.localUrl,

                disabled: false

            }
        },
        filters:{
            'imgBase'(value,options){
                console.log(value);
                if(value.indexOf('data:image')>-1){
                    // console.log('base64');      // base64 图片操作
                    return  value
                }else{
                    // console.log('path');         //path 图片操作
                    return  options +"/"+ value
                }
            }
        },

        methods: {
            closeClassesDia(){
                this.showState.diaGroupEdit = false;
            },

            // 班次选择 时间
            selectClasses(val){
                let that =this;
                if(val == false){
                    if(this.addStaffForm.classes == 5){
                        that.showState.diaGroupEdit = true;
                        that.$nextTick(()=>{
                            this.$refs.childSchedu.FnGetCheduling();
                        });
                    }
                }
            },

            // 鼠标单击的事件
            onClick (e, editor) {
                console.log('Element clicked');
                console.log(e);
                console.log(editor)
            },
            // 清空内容
            clear () {
                this.$refs.editor.clear()
            },

            /*3.1、头像 上传 选中*/
            changeUpload(file){
                console.log(file);
                this.addStaffForm.userimage = '';
                this.GLOBAL.getEleBase64(file.raw).then(res => {
                    console.log(res);
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

            //编辑
            getStaffFrom() {
                if(this.editStaffMark  == '员工编辑'){
                    // this.addStaffForm.information = 2;
                    this.addStaffForm = this.editStaff;
                    console.log(this.editStaff);
                }
                console.log(this.addStaffForm);
            },
            /*提交 biaoge */
            postStaffAdd(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let formArr = this.addStaffForm;
                        console.log(formArr);

                        this.addStaffForm.zmtek_ver = 2;
                        this.addStaffForm.information = 2;

                        staffAdd(formArr).then(res => {
                            if(res.status == 1){
                                console.log(res.data);
                                this.$message.success(res.info);
                                setTimeout(()=>{
                                    this.reLoad();
                                },1000);
                            }else {
                                this.$message.error(res.info);
                            }

                            // this.reLoad();
                        }).catch(res => {
                            console.log(res);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
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
                // console.log(val);
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

            let staffId = this.editStaff.id;
            console.log(staffId);
            if(staffId){
                sessionStorage.setItem('staffId',staffId);
            }


            /*调用 获取 部门*/
            this.getStaffGroup();

            /*调用 获取 提成方式*/
            this.getStaffDeduct();

            /*编辑时候*/
            this.getStaffFrom();

        },
        components:{
            navBread,
            tinymce,

            Scheduling
        }
    }
</script>

