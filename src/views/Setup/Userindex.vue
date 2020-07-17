<template>
    <div class="layoutR-contain animated fadeIn">
        <!--右边iframe-->
        <!--<publicIframe/>-->

        <div class="btnNav-contain">
            <navRefush :btnBack="btnLoad.btnBack" class="btnNav-left" @SecondBack="BtnSecondBack"></navRefush>
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
            <header class="index-item-title">后台管理</header>
            <div class="bgWhite-padd20">

                <!--表格-->
                <el-table class="pub-table edit-table" :data="gMemberTable" border>
                    <el-table-column type="index" label="序号" width="50px"></el-table-column>
                    <el-table-column prop="id" label="用户ID"></el-table-column>
                    <el-table-column prop="city_name" label="企业名称" ></el-table-column>
                    <el-table-column prop="remark" label="用户名"></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="phone" label="电话"></el-table-column>
                    <el-table-column prop="getGroupName" label="所属角色"></el-table-column>
                    <el-table-column prop="last_time" label="上次登录"></el-table-column>
                    <el-table-column prop="last_ip" label="登录IP"></el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template slot-scope="scope">
                            <div v-if="scope.row.status == 0 " class="ptContract-status1">正常</div>
                            <div v-if="scope.row.status == 1 " class="ptContract-status2">禁用</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button size="mini" class="btn-noBor" @click="editGroup(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" class="btn-noBor" @click="changePassword(scope.$index, scope.row)">修改密码</el-button>

                            <el-button size="mini" class="btn-noBor" @click="deleteGMember(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>


                <!--tab2 添加弹窗-->
              <!--  <el-dialog  :append-to-body="true" :title="diaGroupTitle" :visible.sync="showState.diaGroupAdd" width="600px" >
                    <el-form :model="setupGroupAdd" class="dia-form" :label-width="formLabelWidth" ref="addProForm">
                        <el-form-item label="是否启用" >
                            <el-select  filterable v-model="setupGroupEdit.status" placeholder="是否启用" class="dia-inp">
                                <el-option v-for="item in groupStatus" :key="item.index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属企业" >
                            <el-input v-model="setupGroupAdd.city_name" placeholder="所属企业" class="dia-inp" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="所属角色" >
                            <el-input v-model="setupGroupAdd.group_id" placeholder="所属角色" class="dia-inp" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="用户名" prop="username" :rules="{ required: true, message: '用户名不能为空', trigger: 'blur' }">
                            <el-input v-model="setupGroupAdd.username" placeholder="用户名" class="dia-inp" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码"  prop="password" :rules="{ required: true, message: '密码不能为空', trigger: 'blur' }">
                            <el-input v-model="setupGroupAdd.password" placeholder="密码" class="dia-inp" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名"  prop="name" :rules="{ required: true, message: '姓名不能为空', trigger: 'blur' }">
                            <el-input v-model="setupGroupAdd.name" placeholder="姓名" class="dia-inp" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="电话"  prop="phone" :rules="{ required: true, message: '电话不能为空', trigger: 'blur' }">
                            <el-input v-model="setupGroupAdd.phone" placeholder="电话" class="dia-inp" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input v-model="setupGroupAdd.remark" placeholder="备注" class="dia-inp" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="showState.diaGroupAdd = false" plain>取 消</el-button>
                        <el-button type="primary" @click="sureAddDiaGroup()" :loading="btnLoad.btnSureAddGroup">确 定</el-button>
                    </div>
                </el-dialog>-->

                <!--tab2 编辑弹窗-->
                <el-dialog  :append-to-body="true" :title="diaGroupTitle" :visible.sync="showState.diaGroupEdit" width="600px" >
                    <el-form :model="gMemberTable" class="dia-form" :label-width="formLabelWidth" ref="editProForm">
                      <!--  <el-form-item label="所属角色" >
                            <el-input v-model="setupGroupEdit.group_id" placeholder="setupGroup" class="dia-inp" autocomplete="off"></el-input>
                        </el-form-item>-->
                        <el-form-item label="用户名" >
                            <el-input v-model="gMemberTable.city_name" placeholder="用户名" class="dia-inp" autocomplete="off"></el-input>
                        </el-form-item>
                       <!-- <el-form-item label="姓名"  prop="name" :rules="{ required: true, message: '姓名不能为空', trigger: 'blur' }">
                            <el-input v-model="setupGroupEdit.name" placeholder="姓名" class="dia-inp" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="电话"  prop="phone" :rules="{ required: true, message: '电话不能为空', trigger: 'blur' }">
                            <el-input v-model="setupGroupEdit.phone" placeholder="电话" class="dia-inp" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" >
                            <el-input v-model="setupGroupEdit.remark" placeholder="备注" class="dia-inp" autocomplete="off"></el-input>
                        </el-form-item>-->
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="showState.diaGroupEdit = false" plain>取 消</el-button>
                        <el-button type="primary" @click="sureEditDiaGroup()" :loading="btnLoad.btnSureEditGroup">确 定</el-button>
                    </div>
                </el-dialog>

            </div>
        </div>

    </div>
</template>

<script>
    import navRefush from '@/components/navRefush/navRefush'  /*按钮组件*/

    export default {
        name: "userIndex", //后台管理员
        data() {
            return {

                // 按钮点击状态
                btnLoad:{
                    btnBack:false,  //返回按钮是否显示
                    search:false,   //搜索按钮点击状态
                    btnSureAddGroup:false,
                    btnSureEditGroup:false,
                },

                /*弹窗*/
                formLabelWidth:'90px',
                diaGroupTitle:'',

                // 启用状态
                groupStatus:[
                    /*{id:2,name:'全部'},*/
                    {id:1,name:'禁用'},
                    {id:0,name:'启用'},
                ],

                //  显隐状态
                showState:{
                    diaGroupAdd:false,  //添加角色弹窗
                    diaGroupEdit:false,  //编辑角色弹窗

                    showGroupIndex:true,  //角色管理
                    showGroupMember:false,  //系统用户
                },


                // 新增弹窗数据
                setupGroupAdd: {
                    status:'',
                    city_name:'',
                    group_id:'',
                    username:'',
                    password:'',
                    name:'',
                    phone:'',
                    remark:'',
                },

                // 编辑弹窗数据
                setupGroupEdit: {
                    group_id:'',
                    username:'',
                    name:'',
                    phone:'',
                    remark:'',
                },

                gMemberTable: {id:1, city_name:'智迈科技',
                    remark:'智迈科技',name:'智迈科技',
                    phone:'176****9466',getGroupName:'前台', last_time:'2020',last_ip:'192.168.0.11',status:'1' },


                // 导航操作按钮组
                btnVip:[
                    { name:"添加系统用户", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'AddDiaGroup' ,pageName:'addNewMember'},
                ],
            }
        },
        methods: {


            // Z1 返回上一页
            BtnSecondBack(){
                console.log('返回点击事件');
                this.$emit('GoBack','showGroupMember');
            },

            //A1 添加角色
            btnMethods(methodsName){
                if(methodsName == 'AddDiaGroup'){
                    this.showState.diaGroupAdd = true;
                }
            },
            //A2 添加弹窗确定
            sureAddDiaGroup(){
                let that = this;
                that.$refs['addProForm'].validate((valid) => {
                    this.GLOBAL.btnStateChange(this,'btnLoad','btnSureAddGroup');
                    if (valid) {
                        console.log(this.setupGroup);
                    }
                })
            },

            //B1 编辑
            editGroup(index,val){
                console.log(val);
                this.showState.diaGroupEdit = true;
                this.setupGroup = val;
            },
            //B2 编辑确定
            sureEditDiaGroup(){

                let that = this;
                that.$refs['editProForm'].validate((valid) => {
                    this.GLOBAL.btnStateChange(this,'btnLoad','btnSureEditGroup');
                    if (valid) {
                        console.log(this.setupGroup);
                    }
                })
            },

            // // 添加系统用户
            // btnGroupMember(){
            //     this.showState.diaGroupAdd = true;
            //     // this.pageShow('showGroupMember','showGroupIndex')
            //     // sessionStorage.setItem('groupNowPage','showGroupMember');
            // },

            // 页面显影方法
            pageShow(nowPage,indexPage){
                this.showState[indexPage] = false;
                this.showState[nowPage] = true;
            },

            // C1
            deleteGMember(){

            },

            // D1
            changePassword(){

            },


        },
        created() {

        },
        components:{
            navRefush,

        }
    }
</script>
