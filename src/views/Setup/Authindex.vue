<template>
    <div class="layoutR-contain animated fadeIn">
        <!--右边iframe-->
        <!--<publicIframe/>-->
        <div class="btnNav-contain">
            <navRefush :btnBack="btnLoad.btnBack" class="btnNav-left"></navRefush>
            <ul>
                <li class="btnNav-flex btnNav-vip">
                   <button class="btnNav-box" v-for="(item,index) in btnAuth" :key="index" @click="btnMethods(item.methodsName,item.pageName)">
                       <i class="iconfont" :class="item.iconClass"></i>
                       <span>{{item.name}}</span>
                   </button>
                </li>
            </ul>
        </div>

        <div class="bgWhite-public">

            <header class="index-item-title">权限组</header>
            <div class="bgWhite-padd20">

                <!--表格-->
                <el-table class="pub-table edit-table" :data="authTable" border>
                    <el-table-column prop="id" label="ID" width="50px"></el-table-column>
                    <el-table-column prop="name" label="规则描述"></el-table-column>
                    <el-table-column prop="value" label="规则标识"></el-table-column>
                    <el-table-column prop="is_default" label="是否默认">
                        <template slot-scope="scope">
                            <div v-if="scope.row.is_default == 0 " class="auth-isShow0">否</div>
                            <div v-if="scope.row.is_default == 1 " class="auth-isShow1">是</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_default" label="是否菜单">
                        <template slot-scope="scope">
                            <div v-if="scope.row.is_menu == 0 " class="auth-isShow0">否</div>
                            <div v-if="scope.row.is_menu == 1 " class="auth-isShow1">是</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_default" label="是否登录">
                        <template slot-scope="scope">
                            <div v-if="scope.row.is_check == 0 " class="auth-isShow0">否</div>
                            <div v-if="scope.row.is_check == 1 " class="auth-isShow1">是</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_show" label="状态">
                        <template slot-scope="scope">
                            <div v-if="scope.row.is_show == 0 " class="fontGray" @click="changeAuthShow(1, scope.row)">不显示</div>
                            <div v-if="scope.row.is_show == 1 " class="color-Pink" @click="changeAuthShow(0, scope.row)">显示</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button size="mini" class="btn-noBor" @click="btnChangeAuth(scope.$index, scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!--tab2 权限 添加 弹窗-->
        <el-dialog  :append-to-body="true" :title="diaInfoArr.diaAuthTitle" :visible.sync="showState.diaAddAuth" width="600px"
        @close = 'closeAuthForm'>
            <el-form :model="authParams" class="dia-form" :label-width="formLabelWidth" ref="addAuthForm" :rules="addProRules">
                <el-form-item label="是否启用" >
                    <el-radio-group v-model="authParams.is_show">
                        <el-radio name="is_check" v-for="item in authStatus" :key="item.index" :label="item.id">{{item.name}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="所属权限组" >
                    <el-select  filterable v-model="authParams.pid"  class="dia-inp">
                        <el-option v-for="item in authMenuArr" :key="item.index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <div class="auth-form-tip">默认一级权限组，请选择自定义权限所属功能，便于权限分配</div>
                </el-form-item>
                <el-form-item label="规则名称" prop="name" :rules="{ required: true, message: '规则名称不能为空', trigger: 'blur' }">
                    <el-input v-model="authParams.name" placeholder="用以区分规则" class="dia-inp" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="规则标识" >
                    <el-input v-model="authParams.value" placeholder="规则标识" class="dia-inp" autocomplete="off"></el-input>
                    <div class="fontGray font-size12">示例：Admin/Index/home</div>
                </el-form-item>
                <el-form-item label="是否默认" >
                    <el-radio-group v-model="authParams.is_default">
                        <el-radio name="is_check" v-for="item in authIsDefault" :key="item.index" :label="item.id">{{item.name}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否菜单" >
                    <el-radio-group v-model="authParams.is_menu">
                        <el-radio name="is_check" v-for="item in authIsMenu" :key="item.index" :label="item.id">{{item.name}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否登录" >
                    <el-radio-group v-model="authParams.is_check">
                        <el-radio name="is_check" v-for="item in authIsCheck" :key="item.index" :label="item.id">{{item.name}}</el-radio>
                    </el-radio-group>
                </el-form-item>

                <!--<el-form-item label="附加条件" >
                    <el-input v-model="addAuthForm.title" placeholder="按钮、积分" class="dia-inp" autocomplete="off"></el-input>
                    <div>示例：{score}>50 and {score}<200</div>
                </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showState.diaAddAuth = false" plain>取 消</el-button>
                <el-button type="primary" @click="sureDiaAddAuth()" :loading="btnLoad.btnSureAddAuth">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {AllPromiseApi,UpdataPromiseRoleApi, AddPromiseRoleApi} from '../../assets/js/api'
    import navRefush from '@/components/navRefush/navRefush' /*按钮组件  */
    export default {
        name: "Authindex",  //权限管理
        inject:['reLoad'], //注入依赖 App 中的reLoad方法
        data() {
            return {

                //验证规则
                addProRules: {},
                btnLoad: {
                    btnBack:false,
                    btnSureAddAuth:false,
                },
                // 导航操作按钮组
                btnAuth:[
                    { name:"添加权限", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'FnDiaAddAuth' ,pageName:'addAuth'},
                ],
                formLabelWidth:'90px',

                diaInfoArr:{
                    diaAuthTitle:'',
                    diaType:'add',
                },

                showState:{
                    diaAddAuth:false,  // 添加 / 编辑 权限 弹窗
                },

                // 启用状态 is_show
                authStatus:[
                    {id:0,name:'禁用'},
                    {id:1,name:'启用'},
                ],

                // 是否默认 is_default
                authIsDefault:[
                    {id:0,name:'否'},
                    {id:1,name:'是'},
                ],

                // 是否菜单 is_menu
                authIsMenu:[
                    {id:0,name:'否'},
                    {id:1,name:'是'},
                ],

                // 菜单 is_menu
                authMenuArr:[],

                // 是否登录 is_check
                authIsCheck:[
                    {id:0,name:'否'},
                    {id:1,name:'是'},
                ],

                // 获取 权限 参数  //修改 添加
                authParams:{
                    id:0,
                    name:'',
                    value:'',
                    is_show:'',      //是否显示  1是  0不是
                    is_check:'',     //是否需要登录  1是  0不是
                    is_default:'',    //是否默认  1是  0不是
                    is_menu:'',      //是否菜单  1是  0不是
                },

                authTable:[],
            }
        },
        methods: {
            /* api 1 : 获取 基础 列表权限 */
            FnGetAllPromise(menuType){
                AllPromiseApi({
                    is_menu:menuType,
                }).then(res=>{
                    // console.log(res);
                    if(res.status == 1){
                        let arr2 = [];
                        let sortList = res.data;
                        console.log(sortList);
                        this.authTable = sortList;

                        /*is_menu 菜单数组*/
                        sortList.forEach(function (item, index) {
                            if(item.is_menu == 1){
                                arr2.push(item);
                            }
                        });
                        console.log(arr2);
                        this.authMenuArr = arr2;
                    } else {
                        this.$message.error(res.info);
                    }
                }).catch(res=>{
                    console.log(res);
                })
            },


            /* api 2 : 添加 基础 列表权限 */
            FnAddPromiseRole(){
                AddPromiseRoleApi(this.authParams).then(res=>{
                    console.log(res);
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
                    console.log(res);
                })
            },

            /* api 3 : 修改基础权限 */
            FnUpdataPromiseRole(){
                UpdataPromiseRoleApi(this.authParams).then(res=>{
                    console.log(res);
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
                    console.log(res);
                })
            },

            /* 修改 显隐状态 事件 */
            changeAuthShow(index,val){
                console.log(index);
                console.log(val);
                this.authParams = val;
                this.authParams.is_show = index;
                this.FnUpdataPromiseRole();
            },

            /* 添加 权限 */
            btnMethods(){
                this.showState.diaAddAuth = true;
                this.authParams = {};
                // this.authParams.id='';
                this.diaInfoArr.diaType = 'add';
            },

            /* 权限 编辑 */
            btnChangeAuth(index,val){
                console.log(val);
                this.showState.diaAddAuth = true;
                this.authParams= val;
                this.diaInfoArr.diaType = 'edit';
            },

            /* 关闭弹窗 清楚验证*/
            closeAuthForm(){
                this.$refs['addAuthForm'].clearValidate();
            },

            /* 添加 确定 点击 事件*/
            sureDiaAddAuth(){
                this.GLOBAL.btnStateChange(this,'btnLoad','btnSureAddAuth');
                let diaType =  this.diaInfoArr.diaType;
                console.log(diaType);
                let that = this;
                that.$refs["addAuthForm"].validate((valid) => {
                    this.GLOBAL.btnStateChange(this, 'btnLoad', 'diaAddAuth');
                    if (valid) {
                        if(diaType == 'add'){
                            this.FnAddPromiseRole();
                        } else {
                            this.FnUpdataPromiseRole();
                        }
                    } else {
                        this.$message({
                            message: '提交失败，请核对',
                            type: 'error',
                            duration: 1500,
                            offset: 40,
                        });
                        return false;
                    }
                });
            },
        },
        created() {
            this.FnGetAllPromise();
        },
        components:{
            navRefush,
        },
    }
</script>
