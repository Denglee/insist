<template>
    <div class="layoutR-main">

        <el-tabs v-model="activeTabName" @tab-click="tabTotal" class="vip-tabBox pubWidth" id="staffPay-tabBox" v-show="tabStaffSalary">

            <!--tab1 员工工资-->
            <el-tab-pane :lazy='tabLazy' label="员工工资" name="StaffSalary">
                <div class="vip-tabBox">
                    <div class="pt-screen">
                        <el-input placeholder="请输入姓名或电话号码" v-model="rewordParameter.phone" class="pt-screen-input" clearable></el-input>
                        <el-select v-model="rewordParameter.user_type" placeholder="请选择岗位" class="ptSel-section">
                            <el-option v-for="item in userTypeList" :key="item.index" :label="item.catname" :value="item.id"></el-option>
                        </el-select>

                        <el-date-picker
                                class="ptSel-section"
                                v-model="rewordParameter.date"
                                type="month"
                                placeholder="请选择月份"
                                value-format="yyyy-MM"
                                format="yyyy年MM月"
                                @change="monthSel">
                        </el-date-picker>
                        <el-button icon="el-icon-search" @click="btnSeaReword" class="btn-public">查询</el-button>
                    </div>

                    <el-table class="pub-table" :data="rewardList" border>
                        <el-table-column type="index" width="55" label="序号"></el-table-column>
                        <el-table-column prop="name" label="姓名"></el-table-column>
                        <!--<el-table-column prop="user_no" label="工号"></el-table-column>
                        <el-table-column prop="group_id" label="部门"></el-table-column>-->
                        <el-table-column prop="user_type" label="岗位">
                            <template slot-scope="scope">
                                <div v-if="scope.row.user_type == 0 " class="status-connect">全部职位</div>
                                <div v-if="scope.row.user_type == 1 " class="status-connect">店长</div>
                                <div v-if="scope.row.user_type == 2 " class="status-connect">顾问</div>
                                <div v-if="scope.row.user_type == 3 " class="status-connect">教练</div>
                                <div v-if="scope.row.user_type == 4 " class="status-connect">操课</div>
                                <div v-if="scope.row.user_type == 5 " class="status-connect">财务</div>
                                <div v-if="scope.row.user_type == 6 " class="status-connect">前台</div>
                                <div v-if="scope.row.user_type == 7 " class="status-connect">保洁员</div>
                                <div v-if="scope.row.user_type == 8 " class="status-connect">后勤</div>
                                <div v-if="scope.row.user_type == 100 " class="status-connect">教练经理</div>
                                <div v-if="scope.row.user_type == 200 " class="status-connect">顾问经理</div>
                                <div v-if="scope.row.user_type == 9 " class="status-connect">boss</div>
                                <div v-if="scope.row.user_type == 10 " class="status-connect">行政</div>
                                <!--<div v-else>{{scope.row.user_type}}</div>-->
                            </template>
                        </el-table-column>
                        <el-table-column prop="salary" label="基本工资"></el-table-column>
                        <el-table-column prop="deduct" label="提成额">
                            <template slot-scope="scope">
                                <div v-for="(index,item) in scope.row.deduct">{{index.name}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="deductNum" label="提成方式">
                            <template slot-scope="scope">
                                <div v-for="(index,item) in scope.row.deduct">{{index.price}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="punishReward" label="奖惩"></el-table-column>
                        <el-table-column prop="total" label="合计" class="total">
                            <template slot-scope="scope">
                                <div style="font-size: 15px;font-weight: 500;">{{scope.row.total}}</div>
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-pagination
                            background
                            layout="prev, pager, next,total,jumper"
                            :total="rewaroPage.total"
                            :page-size ="rewaroPage.limit"
                            @current-change="PageCurrent">
                    </el-pagination>
                </div>
            </el-tab-pane>

            <!--tab2 提成设置 主页 -->
            <el-tab-pane :lazy='tabLazy' label="提成设置" name="StaffRoyalty">
                <div class="clearfix">
                    <el-button type="primary" class="fr btn-public" @click="btnAddRoyalty">添加提成</el-button>
                </div>

                <el-table class="pub-table" :data="tableRoyalty" border>
                    <el-table-column type="index" width="100px" label="序号"></el-table-column>
                    <el-table-column prop="deduction_name" label="名称"></el-table-column>
                    <el-table-column prop="deduction_type" label="性别">
                        <template slot-scope="scope">
                            <div v-if="scope.row.deduction_type == 1 " class="status-connect">个人销售比</div>
                            <div v-if="scope.row.deduction_type == 2 " class="status-break">部门销售比</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="详情">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="EditGroup(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini"  type="primary" @click="btnGoRoyalty(scope.$index, scope.row)">设置</el-button>
                            <el-button size="mini" @click="deleteGroup(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>

            <!--tab3 奖惩设置-->
            <el-tab-pane :lazy='tabLazy' label="奖惩设置" name="StaffReward">
                <!--<el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content">
                            超额完成任务奖励方式
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            全勤奖励
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            为完成任务处罚
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content">
                            缺勤处罚
                        </div>
                    </el-col>
                </el-row>-->
                <el-table class="pub-table" :data="staffPunishList" border>
                    <el-table-column type="index" width="200" label="序号"></el-table-column>
                    <el-table-column  label="内容" prop="name"></el-table-column>
                    <el-table-column  label="详情" prop="value">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.value" @blur="changePunish(scope.$index, scope.row)"></el-input>
                        </template>

                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <!--提成 名称 种类 添加 弹窗-->
        <el-dialog :title="deductInfo.RoyaltyTitle" :visible.sync="dialogRoyalty" width="600px">
            <el-form :model="deductInfo" :label-width="formLabelRoyalty" class="dia-form">
                <el-form-item label="提成名称" >
                    <el-input v-model="deductInfo.deduction_name" placeholder="请输入提成名称" autocomplete="off" class="dia-inp"></el-input>
                </el-form-item>
                <el-form-item label="提成类型" prop="deductionType">
                    <el-select v-model="deductInfo.deductionType"  class="dia-inp" placeholder="请选择提成类型">
                        <el-option v-for="item in deduction_type2" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogRoyalty = false" plain>取 消</el-button>
                <el-button type="primary" @click="sureDiaRoyalty()" :loading="btnLoad.state">{{btnLoad.text}}</el-button>
            </div>
        </el-dialog>

        <!--提成 上限 设置 编辑-->
        <div v-show="setStaffRoyalty">
            <navBread @GoBack="goBack('tabStaffSalary','setStaffRoyalty')" breadTitle="提成设置"
                      breadContent1="提成编辑"></navBread>
            <div class="addForm-box">
                <div class="clearfix">
                    <el-button type="primary" class="fr btn-public"  @click="btnAddSetRoyalty">添加设置</el-button>
                </div>
                <el-table class="pub-table" :data="setTableRoyalty" border>
                    <el-table-column type="index" label="序号" width="200px"></el-table-column>
                    <el-table-column prop="dn" label="下限"></el-table-column>
                    <el-table-column prop="up" label="上限"></el-table-column>
                    <el-table-column prop="ratio" label="百分比"></el-table-column>
                    <el-table-column label="详情">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="EditSetUp(scope.$index, scope.row)">编辑</el-button>
                           <el-button size="mini" @click="deleteSetUp(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
             </div>
        </div>

        <!--提成 上线  添加 弹窗-->
        <el-dialog :title="setRoyalty.setTitle" :visible.sync="dialogSetRoyalty" width="600px">
            <el-form :model="setRoyalty" :label-width="formLabelRoyalty" class="dia-form" :rules="setRules" ref="setRoyalty1">
                <el-form-item label="提成下限" prop="dn">
                    <el-input v-model="setRoyalty.dn" placeholder="请输入提成下限" autocomplete="off" class="dia-inp"></el-input>
                </el-form-item>
                <el-form-item label="提成上限" prop="up">
                    <el-input v-model="setRoyalty.up" placeholder="请输入提成上限" autocomplete="off" class="dia-inp"></el-input>
                </el-form-item>
                <el-form-item label="提成比例" prop="ratio">
                    <el-input v-model="setRoyalty.ratio" placeholder="请输入提成比例" autocomplete="off" class="dia-inp"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogSetRoyalty = false" plain>取 消</el-button>
                    <el-button type="primary" @click="sureDiaSetUp('setRoyalty1')" :loading="btnLoad.state">{{btnLoad.text}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
    import navBread from '@/components/navBread/navBread'

    import {staffDeduct,staffPhases,
        staffSalaryMenuid,staffRewardPunish} from '@/assets/js/api'

    export default {
        inject:['reLoad'], //注入依赖 App 中的reLoad方法
        name: "StaffReword",
        data() {
            return {

                activeTabName: 'StaffSalary', //StaffSalary StaffRoyalty StaffReward
                tabLazy: true,
                hasAxios:{  //是否调用接口状态
                    StaffSalary:false,
                    StaffRoyalty:false,
                    StaffReward:false,
                },
                /*一、 员工工资*/
                rewordParameter:{
                    zmtek_ver:2,
                    user_type:'10000',  //部门
                    phone:'',  //手机号码
                    p:1,    //页码
                    date:'', //月份
                },

                userTypeList:this.GLOBAL.userTypeList,   //职位 岗位
                rewardList:[],   //工资列表

                rewaroPage:{   //工资分页
                    total:0,
                    limit:0
                },

                /* 二、 tab2 提成添加 种类 */
                dialogRoyalty:false,   //提成名称 设置 弹窗
                btnLoad:{
                    state:false,
                    text:'确定',
                },
                formLabelWidth: '120px',
                deductInfo:{
                    RoyaltyTitle:'',  //弹窗名称
                    zmtek_ver:2,
                    type:1,     //1 = 获取组列表信息 2 = 添加组信息 3 = 修改组信息 4 = 删除
                    deduction_name:'',      //添加必传
                    deductionType:'',
                    id : '',        //删除必传
                },
                deduction_type2:[
                    {id:'1',name:'个人销售比'},
                    {id:'2',name:'部门销售比'},
                    // {id:3,name:'上课节数'},
                ],      //添加必传
                tableRoyalty:[],
                formLabelRoyalty:'90px',

                /* 2.1 提成 上限 设置*/
                tabStaffSalary:true,
                setStaffRoyalty:false,  //设置页面显隐
                dialogSetRoyalty:false,  //设置弹窗显隐
                setTableRoyalty:[],   //上限 表格

                setRoyalty:{
                    setTitle:'',  //弹窗名称
                    zmtek_ver:2,
                    type:1, //类型 1 = 获取列表 2 = 添加 3 = 修改 4 = 删除
                    ratio_id: '',  //提成id 获取列表 添加 必填
                    id:'',   //修改 删除必填
                    up:'',   //上限 添加修改必填
                    dn:'',   //下限
                    ratio:'', //提成比 添加修改必填
                },
                setRules: {
                    up: [{ required: true, message: '提成上限不能为空', trigger: 'blur' },],
                    dn: [{ required: true, message: '提成下限不能为空', trigger: 'blur' }],
                    ratio: [{ required: true, message: '提成比例不能为空', trigger: 'blur' }],
                },

                /*三、 奖惩*/
                staffPunish:{
                    zmtek_ver:2,
                    reward:'',  //奖
                    punish:'',  //惩
                    type:1,    //1获取 2修改
                },
                staffPunishList:[
                    {id:1,name:'奖励',value:""},
                    {id:2,name:'惩罚',value:""},
                ],

            }
        },
        methods: {

            /* 0、tab切换*/
            tabTotal(tab, event) {
                let tabName = tab.name;
                sessionStorage.setItem('tabName',tabName);
                this.callTabApi(tabName);
            },

            /* ============= 一、员工工资 列表*/
            getStaffSalaryMenuid(){   // 工资列表接口
                staffSalaryMenuid(this.rewordParameter).then(res=>{
                    console.log(res.data);
                    let listArr = res.data.list;  //最开始的数组
                    let punishRewardArr = [];    //添加奖惩
                    listArr.forEach((item,index)=>{

                        console.log(item.deduct);
                        // if( item.deduct.length <=0){  //说明是空的  。 空数组
                        //     item.deduct.push({
                        //         'price':0,
                        //     });
                        // };
                        //
                        // for(var i=0;i< item.deduct.length;i++){
                        //     console.log(i);
                        //     console.log(item.deduct[i]);
                        // }


                        item.deduct.forEach((item2,index)=>{
                            console.log(item2);
                        })

                        let punish = Number(item.punish);
                        let reward = Number(item.reward);
                        let punishReward = reward - punish;
                        punishRewardArr.push({
                            'punishReward':punishReward,
                        });
                    });

                    let incomeArr3 = listArr.map((item, index) => {
                        return {...item, ...punishRewardArr[index]};
                    });

                    console.log(incomeArr3);
                    this.rewardList = incomeArr3;

                    this.rewaroPage = {   //工资分页
                        total:Number(res.data.totalRows),
                        limit:res.data.listRows,
                    };
                    this.hasAxios.StaffSalary = true;

                }).catch(res =>{
                   console.log(res);
                });
            },

            //1-2 工资 筛选
            btnSeaReword(){
                this.rewordParameter.p = 1;
                this.getStaffSalaryMenuid();
            },

            /*月份选择*/
            monthSel(val){
              console.log(val);
              this.rewordParameter.date = val;
            },

            // 工资 列表 分页
            PageCurrent(page){
                this.rewordParameter.p = page;
                this.getStaffSalaryMenuid();
            },


            /* ============== 二  tab  提成设置 ==*/
            getStaffDeduct(){
                staffDeduct({
                    zmtek_ver : this.deductInfo.zmtek_ver,
                    type : this.deductInfo.type,
                    deduction_name : this.deductInfo.deduction_name,
                    deduction_type : this.deductInfo.deductionType,
                    id : this.deductInfo.id,
                }).then(res => {
                    console.log(res.data);
                    let type = this.deductInfo.type;
                    console.log(type);
                    setTimeout(()=>{
                        this.btnLoad = {
                            state:false,
                            text:'确定',
                        };
                    },1500)

                    if(res.status ==1){
                        if(type == 1){
                            this.tableRoyalty = res.data;
                        }else {
                            this.$message.success(res.info);
                            setTimeout(()=>{
                                this.dialogRoyalty = false;

                                this.reLoad();
                            },1000);
                        }
                    }
                    if(res.status == 0){
                        console.log(res.info);
                    }

                    this.hasAxios.StaffRoyalty = true;
                }).catch(res => {
                    console.log(res);
                });
            },



            /* 2.1添加提成名称 种类 弹窗*/
            btnAddRoyalty(){
                this.deductInfo.RoyaltyTitle = '添加提成';
                this.deductInfo.type = 2;

                this.deductInfo.deduction_name = '';
                this.deductInfo.deductionType = '';

                console.log( this.deductInfo);
                this.dialogRoyalty = true;
            },

            /* 2.2添加提成名称 确定*/
            sureDiaRoyalty(){
                console.log( this.deductInfo);
                let groupName = this.deductInfo.deduction_name;
                console.log(groupName);
                if(groupName == ''){
                    this.$message.error('提成名称 不能为空')
                } else {
                    this.btnLoad = {
                        state:true,
                        text:'提交中',
                    };
                    let groupId = this.deductInfo.id;

                    this.getStaffDeduct();
                }
            },

            /* 2.3 提成 名称 编辑*/
            EditGroup(index, row){
                console.log(index, row);

                this.deductInfo.id = row.id;
                this.deductInfo.deductionType = row.deduction_type;
                this.deductInfo.deduction_name = row. deduction_name;
                this.deductInfo.RoyaltyTitle = '提成编辑';
                this.deductInfo.type = 3;
                this.dialogRoyalty = true;
            },

            /* 2.4删除提成种类*/
            deleteGroup(index, row){
                this.$confirm('确定删除该提成方式？？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row.id);
                    this.deductInfo.type = 4;
                    this.deductInfo.id = row.id;
                    this.getStaffDeduct();
                }).catch(() => {});
            },


            /* ================ C、提成上限 下线设置*/
            /*  3.1 去 提成 上限 页面*/
            btnGoRoyalty(index, row){
                let setId = row.id;
                console.log('ratio_id'+setId);
                this.setRoyalty.ratio_id = setId;
                this.setRoyalty.type = 1;
                this.setTableRoyalty = [];
                this.getStaffPhases();

                /*存储 是否在编辑页面 状态*/
                sessionStorage.setItem('sessionSetRoyalty', true);
                sessionStorage.setItem('Royaltyratio_id', setId);
                this.tabStaffSalary = false;
                this.setStaffRoyalty = true;
            },

            /*  3.2 提成 上线 设置接口*/
            getStaffPhases(){
                staffPhases({
                    zmtek_ver : this.setRoyalty.zmtek_ver,
                    type : this.setRoyalty.type, //类型 1 = 获取列表 2 = 添加 3 = 修改 4 = 删除
                    ratio_id : this.setRoyalty.ratio_id,  //提成id 获取列表 添加 必填
                    id : this.setRoyalty.id,   //修改 删除必填
                    up : this.setRoyalty.up,   //上限 添加修改必填
                    dn : this.setRoyalty.dn,   //下限
                    ratio : this.setRoyalty.ratio, //提成比 添加修改必填
                }).then(res =>{
                    console.log(res.data);
                    let type = this.setRoyalty.type;
                    console.log('当前状态： '+type);

                    this.btnLoad = {
                      state:false,
                      text:"确定",
                    };

                    if(res.status ==1){
                        if(type == 1){
                            this.setTableRoyalty = res.data;
                        }else {
                            this.$message.success(res.info);
                            setTimeout(()=>{
                                this.dialogSetRoyalty = false;
                                this.reLoad();
                            },1000);
                        }
                    }
                    if(res.status == 0){
                        console.log(res.info);
                    }
                }).catch(res =>{
                    console.log(res);
                })
            },

            /* 3.22 添加提成 上限 设置  弹出*/
            btnAddSetRoyalty(){
                this.setRoyalty.RoyaltyTitle = '提成设置';

                this.setRoyalty.type = 2;
                this.setRoyalty.ratio = '';
                this.setRoyalty.up = '';
                this.setRoyalty.dn = '';
                console.log( this.deductInfo);
                this.dialogSetRoyalty = true;
            },

            /* 3.22 添加提成上限  确定*/
            sureDiaSetUp(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.btnLoad = {
                            state:true,
                            text:'确定',
                        };
                        this.getStaffPhases();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            /* 3.3 编辑 上限 设置*/
            EditSetUp(index, row){
                // console.log(index, row);
                this.setRoyalty = row;
                this.setRoyalty.setTitle = '编辑提成';
                this.setRoyalty.type = 3;
                this.dialogSetRoyalty = true;
            },

            /*  3.4 删除 上限 设置*/
            deleteSetUp(index, row){
                this.$confirm('确定删除？？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // console.log(row.id);
                    this.setRoyalty.type = 4;
                    this.setRoyalty.id = row.id;
                    this.getStaffPhases();
                }).catch(() => {});
            },


            /*0 返回上一页 */
            goBack(e1, e2) {
                console.log(e1);
                this[e1] = true;   //显示 tab 列表
                this[e2] = false;   //隐藏当前 二级页

                sessionStorage.setItem('sessionSetRoyalty', false);
            },


            /*三、奖惩*/
            getStaffRewardPunish(){    // 3.1奖惩列表接口
                staffRewardPunish(this.staffPunish).then(res=>{
                    console.log(res.data);
                    if(this.staffPunish.type == 2){
                        this.$message.success(res.info);
                        setTimeout(()=>{
                            this.reLoad();
                        },1000)
                    }else {
                        this.staffPunishList[0].value = res.data.reward;
                        this.staffPunishList[1].value = res.data.punish;
                    }
                    this.hasAxios.StaffReward = true;
                }).catch(res =>{
                    console.log(res);
                });
            },

            changePunish(index,rows){
                if(rows.id == 1){
                    this.staffPunish = {
                        zmtek_ver:2,
                        reward:rows.value,  //奖
                        punish:this.staffPunishList[1].value,  //惩
                        type:2,    //1获取 2修改
                    }
                }
                if(rows.id == 2){
                    this.staffPunish = {
                        zmtek_ver:2,
                        reward:this.staffPunishList[0].value ,  //奖
                        punish:rows.value,  //惩
                        type:2,    //1获取 2修改
                    }
                }

                this.getStaffRewardPunish();
            },

            /* 0 接口调用*/
            callTabApi(tabName){
                console.log('当前tab：'+tabName);
                if(tabName == 'StaffSalary'){
                    if(this.hasAxios.StaffSalary == false){
                        this.getStaffSalaryMenuid();
                    }
                }
                if(tabName == 'StaffRoyalty'){
                    if(this.hasAxios.StaffRoyalty == false){
                        this.getStaffDeduct();
                    }
                }
                if(tabName == 'StaffReward'){
                    if(this.hasAxios.StaffReward == false){
                        this.getStaffRewardPunish();
                    }
                }

            },

        },
        created() {

            let tabName = sessionStorage.getItem('tabName');
            console.log(tabName);
            if(!tabName){
                tabName = this.activeTabName;
            }else{
                this.activeTabName = tabName;   //有session
            }
            this.callTabApi(tabName);

            /*是否在提成设置页面*/
            let sessionSetRoyalty = window.sessionStorage.getItem('sessionSetRoyalty');
            console.log(sessionSetRoyalty);
            if(sessionSetRoyalty == 'true'){
                let Royaltyratio_id = sessionStorage.getItem('Royaltyratio_id');
                console.log('reaID '+ Royaltyratio_id);
                this.setRoyalty.ratio_id = Royaltyratio_id;
                this.getStaffPhases();

                this.tabStaffSalary = false;
                this.setStaffRoyalty = true;
            }else{
                this.tabStaffSalary = true;
                this.setStaffRoyalty = false;
            }
        },
        mounted() {

        },
        components: {
            navBread,
        },
    }
</script>

<style lang="scss" >
    @import "@/assets/css/staff.scss";
</style>