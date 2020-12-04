<template>
    <div class="layoutR-contain animated fadeIn">
        <div class="bgWhite-public" v-show="giftShow.giftIndex">
            <div class="bgWhite-padd20">

                <nav class="pt-screen">

                    <el-select  filterable v-model="giftArr.scene" placeholder="模式" class="ptScreen-select">
                        <el-option v-for="( item, index ) in sceneType" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>

                    <el-select  filterable v-model="giftArr.type" placeholder="类型" class="ptScreen-select">
                        <el-option v-for="( item, index ) in giftType" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>

                    <el-button icon="el-icon-search" @click="btnSeaGift" :loading="btnState.search" class="btn-public">搜索</el-button>

                    <div class="fr" >

                        <el-button icon="el-icon-delete"  @click="deleteGift()" class="btn-public btn-delete" :loading="btnState.delete">删除礼包</el-button>
                        <el-button @click="changeGift()" class="btn-public btn-edit" :loading="btnState.edit"><i class="iconfont icon-bianjixiantiaoyangshi"></i>编辑礼包</el-button>

                        <el-button type="primary" class="btn-public btn-edit" @click="btnAddGift">
                            <i class="icon-add el-icon-circle-plus-outline"></i>添加礼包</el-button>
                    </div>
                </nav>

                <el-table class="pub-table GiftList-table" :data="tableGift" border @selection-change="checkedGift"
                          ref="multipleTable" @row-click="handleRowClick">
                    <el-table-column type="selection" width="55"></el-table-column>

                    <el-table-column prop="title" label="标题"></el-table-column>
                    <el-table-column prop="content" label="内容"></el-table-column>
                    <el-table-column prop="scene" label="状态">
                        <template slot-scope="scope">
                            <div v-if="scope.row.scene == 1 ">线上</div>
                            <div v-if="scope.row.scene == 2 ">线下</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="astrict" label="是否限制">
                        <template slot-scope="scope">
                            <div v-if="scope.row.astrict == 1 ">不限制</div>
                            <div v-if="scope.row.astrict == 2 ">限制</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="consume_type" label="消费类型">
                        <template slot-scope="scope">
                            <span v-for="(item,index) in scope.row.consume_type">
                                <span v-if="item == 1">私教，</span>
                                <span v-if="item == 2">会籍，</span>
                                <span v-if="item == 3">次卡，</span>
                                <span v-if="item == 4">期限，</span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="金额"></el-table-column>
                    <el-table-column prop="threshold" label="消费门槛"></el-table-column>

                    <el-table-column prop="start_time" label="开始时间">
                        <template slot-scope="scope">
                            <div class="status-connect">{{scope.row.start_time | dateFormat}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="end_time" label="结束时间">
                        <template slot-scope="scope">
                            <div class="status-connect">{{scope.row.end_time | dateFormat}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="add_time" label="创建时间">
                        <template slot-scope="scope">
                            <div class="status-connect">{{scope.row.add_time | dateFormat}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="类型">
                        <template slot-scope="scope">
                            <div v-if="scope.row.type == 1 ">注册礼包</div>
                            <div v-if="scope.row.type == 2 ">分享礼包</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="是否有效">
                        <template slot-scope="scope">
                            <div v-if="scope.row.status == 1 ">有效</div>
                            <div v-if="scope.row.status == 2 ">无效</div>
                        </template>
                    </el-table-column>

                </el-table>

            </div>
        </div>

        <addGiftBag v-if="giftShow.addGift" :editGift="editGift" :giftEditType = 'giftEditType'
        @backNext = 'backNext'></addGiftBag>
    </div>
</template>

<script>
    import addGiftBag from './addGiftBag/addGiftBag'
    import {giftBag, addGiftBagApi} from '../../assets/js/api'
    export default {
        name: "giftBag",
        inject:['reLoad'],
        data() {
            return {
                giftShow:{
                    giftIndex:true,
                    addGift:false,
                },

                giftArr:{
                    zmtek_ver:2,
                    scene:'',
                    type:'',
                },
                giftEditType:'1', //操作类型
                tableGift:[], //表格数据
                checkedRows:[], //选中数据
                editGift:[],  //


                sceneType:[
                    {id:'', name:'全部模式'},
                    {id:'1', name:'线上'},
                    {id:'2', name:'线下'},
                ],
                giftType:[
                    {id:'', name:'全部类型'},
                    {id:'1', name:'注册礼包'},
                    {id:'2', name:'分享礼包'},
                ],

                btnState:{
                    search:false,
                    delete:false,
                    edit:false,
                },

            }
        },
        methods: {
            // 返回上一页
            backNext(){
                this.giftShow = {
                    giftIndex:true,
                    addGift:false,
                };
            },

            // 获取列表
            getGiftBag(){
                giftBag(this.giftArr).then(res=>{
                    console.log(res);
                    this.tableGift = res.data.list;
                }).catch(res=>{
                    console.log(res);
                })
            },


            /*搜索*/
            btnSeaGift(){
                console.log(this.giftArr);
                this.GLOBAL.btnStateChange(this,'btnState','search');
                this.getGiftBag();
            },

            // 修改
            changeGift(){
                this.GLOBAL.btnStateChange(this,'btnState','edit');
                let giftArr = this.checkedRows;
                console.log(giftArr);

                if(giftArr.length == 0){
                    this.$message.error('至少选一个操作对象');
                } else if(giftArr.length == 1){
                    this.giftEditType = '2';   // 2 修改
                    this.editGift = giftArr[0];
                    console.log(this.editGift);

                    this.editGift.end_time = this.editGift.end_time*1000;
                    this.editGift.start_time = this.editGift.start_time*1000;
                    this.giftShow={
                        giftIndex:false,
                        addGift:true,
                    };
                }else{
                    this.$message.error('只能选一个');
                }
            },

            // 删除
            deleteGift(){
                this.GLOBAL.btnStateChange(this,'btnState','delete');

                let giftArr = this.checkedRows;
                console.log(giftArr);

                if(giftArr.length == 0){
                    this.$message.error('至少选一个操作对象');
                } else if(giftArr.length == 1){
                    addGiftBagApi({
                        id: giftArr[0].id,
                        operation:3,
                    }).then(res=>{
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
                }else{
                    this.$message.error('只能选一个');
                }
            },
            
            // 添加
            btnAddGift(){
                this.giftShow = {
                    giftIndex:false,
                    addGift:true,
                };
            },

            /* 1.10、 编辑选中 */
            checkedGift(val) {
                console.log(val);
                this.checkedRows = val;
            },

            //点击行触发，选中或不选中复选框
            handleRowClick(row, column, event){
                this.$refs.multipleTable.toggleRowSelection(row);
            },


        },
        created() {
            this.getGiftBag();
        },
        
        components:{
            addGiftBag,
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>