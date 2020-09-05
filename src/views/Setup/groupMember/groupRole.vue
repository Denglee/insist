<template>
    <div class="layoutR-contain animated fadeIn">
        <!--右边iframe-->
        <!--<publicIframe/>-->

<!--        <div v-show="showState.showGroupIndex">-->

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

                <header class="index-item-title">角色管理</header>
                <div class="bgWhite-padd20">

                    <!--表格-->
                    <el-table class="pub-table edit-table" :data="roleTable" border>
                        <el-table-column type="index" label="序号" width="50px"></el-table-column>
                        <el-table-column prop="id" label="ID"></el-table-column>
                        <el-table-column prop="name" label="名称" ></el-table-column>

                        <!--<el-table-column prop="title" label="角色名称" ></el-table-column>
                        <el-table-column prop="describe" label="角色描述"></el-table-column>
                        <el-table-column prop="city_name" label="所属企业"></el-table-column>
                        <el-table-column prop="status" label="状态">
                            <template slot-scope="scope">
                                <div v-if="scope.row.status == 0 " class="ptContract-status1">显示</div>
                                <div v-if="scope.row.status == 1 " class="ptContract-status2">不显示</div>
                            </template>
                        </el-table-column>-->

                        <el-table-column label="操作" width="300">
                            <template slot-scope="scope">
                                <el-button size="mini" class="btn-noBor" @click="btnSetPower(scope.$index, scope.row)">权限设置</el-button>
                                <el-button size="mini" class="btn-noBor" @click="btnGroupMember(scope.$index, scope.row)">成员管理</el-button>
                                <el-button size="mini" class="btn-noBor" @click="editGroup(scope.$index, scope.row)">编辑</el-button>
                                <el-button size="mini" class="btn-noBor" @click="deleteGroup(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>


                    <!--tab2 部门 添加 弹窗-->
                    <el-dialog  :append-to-body="true" :title="diaTitle.diaGroupTitle" :visible.sync="showState.diaGroup" width="600px" >
                        <el-form :model="setupGroup" class="dia-form" :label-width="formLabelWidth">
                            <el-form-item label="是否启用" >
                                <el-select  filterable v-model="setupGroup.status" placeholder="是否启用" class="dia-inp">
                                    <el-option v-for="item in groupStatus" :key="item.index" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="角色名称" >
                                <el-input v-model="setupGroup.title" placeholder="角色名称" class="dia-inp" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="角色描述" >
                                <el-input v-model="setupGroup.describe" placeholder="角色描述" class="dia-inp" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="showState.diaGroup = false" plain>取 消</el-button>
                            <el-button type="primary" @click="sureDiaGroup()" :loading="btnLoad.btnSureGroup">确 定</el-button>
                        </div>
                    </el-dialog>

                </div>
            </div>
<!--        </div>-->

        <!--<groupMember v-show="showState.showGroupMember"  @GoBack="goBack(arguments)"></groupMember>-->

        <el-dialog  :append-to-body="true" :title="diaTitle.diaPowerTitle" :visible.sync="showState.diaPower" width="80%" >

            <el-tabs v-model="activeName">
                <el-tab-pane label="菜单权限" name="first">
                    <groupPowerMenu></groupPowerMenu>
                </el-tab-pane>
                <el-tab-pane label="按钮权限" name="second">按钮权限</el-tab-pane>
            </el-tabs>

            <div slot="footer" class="dialog-footer">
                <el-button @click="showState.diaPower = false" plain>取 消</el-button>
                <el-button type="primary" @click="sureDiaPower()" :loading="btnLoad.btnSurePower">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { AllPromiseApi, AllPromiseGroupApi, AllPromiseRoleApi, AddPromiseGroupApi} from '../../../assets/js/api'
    import navRefush from '@/components/navRefush/navRefush' /*按钮组件  */
    /*import groupMember from "./groupMember/groupMember";  */
    import groupPowerMenu from "./groupPowerMenu";

    export default {
        name: "groupRole",   //角色管理 所有角色 。
        data() {
            return {
                activeName:'first',

                defaultProps: {
                    child: 'child',
                    label: 'label'
                },

                setNavLeftOne:[
                    {
                        id:1 ,
                        value:'前台',
                        firstItem:[
                            {
                                id:'fir1',
                                value:'团课',
                                secItem:[
                                    {
                                        id:'sec2' ,
                                        value:'员工',
                                        thItem:[
                                            {
                                                id:'sec2' ,
                                                value:'员工',
                                            }
                                        ]
                                    },
                                ]
                            },
                            {id:'fir2', value:'私教'},
                        ]
                    },
                    {id:2 , value:'员工'},
                    {id:3 , value:'个人'},
                ],

                //A1 弹窗
                formLabelWidth:'90px',

                diaTitle:{
                    diaGroupTitle:'',
                    diaPowerTitle:'',
                },

                // 弹窗数据
                setupGroup: {
                    status:'',
                    title:"",
                    describe:'',
                },

                //  显隐状态
                showState:{
                    showGroupIndex:true,  //角色管理
                    showGroupMember:false,  //系统用户

                    diaGroup:false,  //添加角色弹窗
                    diaPower:false,  //权限弹窗
                },

                // 按钮点击状态
                btnLoad:{
                    btnBack:true,  //返回按钮是否显示
                    search:false,   //搜索按钮点击状态
                    btnSureGroup:false,

                    btnSurePower:false,  //权限确定
                },

                // 导航操作按钮组
                btnVip:[
                    { name:"添加角色", type:'if',  iconClass:'icon-xinzengyonghu',  methodsName:'diaGroup' ,pageName:'addNewMember'},
                ],

                // 启用状态
                groupStatus:[
                    /*{id:2,name:'全部'},*/
                    {id:1,name:'禁用'},
                    {id:0,name:'启用'},
                ],

                // table数据
                roleTable:[],
              /*  groupTable: [
                    {id:444, title:'前台', describe:'前台', city_name:'智迈科技', status:1}
                ],*/

            }
        },
        methods: {
            /* api1 - 获取所有权限*/
            FnGetAllPromise(){
                AllPromiseApi().then(res=>{
                    console.log(res);
                }).catch(res=>{

                })
            },
            /* api2 - 获取所有权限组*/
            FnGetAllPromiseGroup(){
                AllPromiseGroupApi().then(res=>{
                    console.log(res);
                }).catch(res=>{

                })
            },
            /* api3 - 获取所有角色*/
            FnGetAllPromiseRole(){
                AllPromiseRoleApi().then(res=>{
                    console.log(res);
                    this.roleTable = res.data;
                }).catch(res=>{

                })
            },
            /* api4 - 添加权限组*/
            FnAddPromiseGroup(){
                AddPromiseGroupApi().then(res=>{
                    console.log(res);
                }).catch(res=>{

                })
            },

            // Z1 返回上一页
            BtnSecondBack(){
                console.log('返回点击事件');
                this.$emit('GoBack','showGroupRole');
            },

            //A1 权限设置
            btnSetPower(){
                this.showState.diaPower = true;
            },

            // A2
            sureDiaPower(){
                this.GLOBAL.btnStateChange(this,'btnLoad','btnSurePower');
                console.log('ad');
            },

            // B1
            deleteGroup(){

            },

            //C1 编辑
            editGroup(index,val){
                console.log(val);
                this.showState.diaGroup = true;
                this.setupGroup = val;
            },

            //D1 添加角色
            btnMethods(methodsName){
                if(methodsName == 'diaGroup'){
                    this.showState.diaGroup = true;
                }
            },

            //E1 弹窗确定
            sureDiaGroup(){
                this.GLOBAL.btnStateChange(this,'btnLoad','btnSureGroup');
                console.log(this.setupGroup);
            },

            // Z1
            goBack(val){
                console.log(val[0]);
                let indexPage = val[0];
                this.pageShow('showGroupIndex',indexPage,);
                sessionStorage.removeItem('groupNowPage');
            },

            //G1 进入系统用户页面 成员管理
            btnGroupMember(){
                // this.pageShow('showGroupMember','showGroupIndex')
                // sessionStorage.setItem('groupNowPage','showGroupMember');

                this.$router.push({
                    path:'/User/index'
                })
            },

            //H1 页面显影方法
            pageShow(nowPage,indexPage){
                this.showState[indexPage] = false;
                this.showState[nowPage] = true;
            }

        },
        created() {
            /*页面 显影  存储*/
            let groupNowPage = sessionStorage.getItem('groupNowPage');
            if(groupNowPage != null){
                console.log(groupNowPage);
                this.pageShow(groupNowPage, 'showGroupIndex')
            } else {
                this.showState.showGroupIndex = true;
            }

            // 调用获取所有权限 api
            this.FnGetAllPromise();
            this.FnGetAllPromiseGroup();
            this.FnGetAllPromiseRole();
            this.FnAddPromiseGroup();


        },
        components:{
            navRefush,

            /*groupMember*/

            groupPowerMenu,
        }
    }
</script>

<style lang="scss">
    @import "../../../assets/css/setUp";
</style>