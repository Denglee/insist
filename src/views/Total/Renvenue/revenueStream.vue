<template>
    <div ref="printRef" class="revenue-Stream">
    　　<div class="no-print">
            <!--saler 筛选-->
            <div class="pt-screen">
                <el-input placeholder="顾问编号、姓名、手机" v-model="searchVal.salerSuggest" class="ptScreen-input" clearable></el-input>

                <el-select  filterable v-model="searchVal.saler_id" placeholder="请选择顾问" class="ptScreen-select">
                    <el-option label="全部顾问" value=""></el-option>
                    <el-option v-for="item in dataArr.staffTypeArr" :key="item.index" :label="item.name" :value="item.id"></el-option>
                </el-select>

                <el-select  filterable v-model="searchVal.card_type" placeholder="请选择合同类型" class="ptScreen-select">
                    <el-option label="全部类型" value="100"></el-option>
                    <el-option v-for="item in dataArr.cardTypeArr" :key="item.index" :label="item.catname" :value="item.id"></el-option>
                </el-select>

                <el-select  filterable v-model="searchVal.order_type" placeholder="请选择操作类型" class="ptScreen-select">
                    <el-option label="全部操作类型" value="100"></el-option>
                    <el-option v-for="item in dataArr.orderTypeArr" :key="item.index" :label="item.catname" :value="item.id"></el-option>
                </el-select>

                <el-select  filterable v-model="searchVal.pay_type_list" placeholder="请选择支付方式" class="ptScreen-select">
                    <el-option label="全部支付方式" value="100"></el-option>
                    <el-option v-for="item in dataArr.payTypeArr" :key="item.index" :label="item.catname" :value="item.id"></el-option>
                </el-select>

                <el-date-picker
                        v-model="timeTotal"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        calss="ptScreen-select">
                </el-date-picker>

                <el-button icon="el-icon-search" @click="btnSeaSaler" class="btn-public" :loading="btnState.searchLoad">搜索</el-button>


               <div class="fr">
                   <el-tooltip class="item" effect="dark" content="修改支付方式" placement="bottom">
                       <el-button @click="btnChangePay()" class="btn-public">
                           <i class="iconfont icon-zhifufangshi"></i>修改
                       </el-button>
                   </el-tooltip>

                   <el-tooltip class="item" effect="dark" content="小票打印" placement="bottom">
                       <el-button @click="btnPrint()" class="btn-public">
                           <i class="iconfont icon-weibiaoti-1yihuifu-02"></i>打印
                       </el-button>
                   </el-tooltip>


                   <el-tooltip class="item" effect="dark" content="导出" placement="bottom">
                       <el-button @click="streamExport()" class="btn-public">
                           <i class="el-icon-notebook-1"></i>导出
                       </el-button>
                   </el-tooltip>
               </div>

            </div>

            <!-- 表格-->
            <el-table class="pub-table" :data="dataArr.waterArr" border  ref="multipleTable"
                      @selection-change="checkedStaff"  @row-click="handleRowClick">
                <el-table-column type="selection" label="序号" width="50px"></el-table-column>
                <el-table-column prop="true_name" label="会员"></el-table-column>
                <el-table-column prop="phone" label="手机号" width="110px"></el-table-column>
                <el-table-column prop="contract_number" label="合同编号" width="150px"></el-table-column>
                <el-table-column prop="contract_type" label="合同类型"></el-table-column>
                <el-table-column prop="order_type" label="操作类型">
                    <template slot-scope="scope">
                        <div v-for="(item,index) in dataArr.orderTypeArr" :key = index>
                            <div  v-if="item.id == scope.row.order_type">
                                {{item.catname}}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="order_name" label="卡服务"></el-table-column>
                <el-table-column prop="pay_type" label="支付方式">
                    <template slot-scope="scope">
                        <div v-for="(item,index) in dataArr.payTypeArr" :key = index>
                            <div  v-if="item.id == scope.row.pay_type">
                                {{item.catname}}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="order_status" label="状态">
                    <template slot-scope="scope">
                        <div v-if="scope.row.order_status == 0 ">等待</div>
                        <div v-if="scope.row.order_status == 1 ">成功</div>
                        <div v-if="scope.row.order_status == 2 ">退款申请</div>
                        <div v-if="scope.row.order_status == 3 ">退款成功</div>
                    </template>
                </el-table-column>
                <el-table-column prop="order_price" label="应收金额"></el-table-column>
                <el-table-column prop="real_price" label="本次流水">
                    <template slot-scope="scope">
                        <div class="color-Pink">{{scope.row.real_price}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="saler_name" label="销售人"></el-table-column>
                <el-table-column prop="cashier" label="收银人"></el-table-column>
                <el-table-column prop="order_time" label="时间">
                    <template slot-scope="scope">
                        <div class="status-connect">{{scope.row.order_time | minuteFormat}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" width="220px"></el-table-column>
            </el-table>

            <el-pagination
                    background
                    layout="prev, pager, next,total,jumper"
                    :total="pageTotal"
                    :page-size ="searchVal.total"
                    @current-change="PageCurrent">
            </el-pagination>

        </div>

        <!--打印-->
        <revenuePrint :printArr="printArr" ref="sonPrint"></revenuePrint>

        <!--tab2 部门 添加 弹窗-->
        <el-dialog  :append-to-body="true" title="修改支付方式" :visible.sync="btnState.diaChangePay" width="400px">
            <el-form :model="changePayArr" class="dia-form" label-width="60">
                <el-select  filterable v-model="changePayArr.pay_type" placeholder="请选择支付方式" style="width: 100%">
                    <el-option v-for="item in dataArr.payTypeArr" :key="item.index" :label="item.catname" :value="item.id"></el-option>
                </el-select>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="btnState.diaChangePay = false" plain>取 消</el-button>
                <el-button type="primary" @click="sureDiaChangePay()" :loading="btnState.btnSurePay">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>

    import {revenueWater,revenueUppay,revenuePrintApi} from '@/assets/js/api' /*引用  接口*/
    import revenuePrint from '@/views/Total/Renvenue/revenuePrint'  // 营收流水 详情组件
    export default {
        inject:['reLoad'], //注入依赖 App 中的reLoad方法
        name: "revenueStream",  //营收流水
        data() {
            return {
                printArr: {},  ////打印数组

                checkedRows:[], //选中的值

                btnState:{  //按钮状态
                    printBox:false, /*打印框 显示*/
                    diaChangePay:false, /*支付方式弹窗*/
                    searchLoad:false,   /*查找提交*/
                    btnSurePay:false,   //修改支付方式 按钮
                },

                dataArr:{  //数据数组
                    waterArr:[],  //table数组
                    staffTypeArr:[], // 顾问数组  salerSuggest
                    cardTypeArr:[{
                        id:100,catname:'全部合同类型'}], //合同类型  card_type
                    orderTypeArr:[], //操作类型  order_type
                    payTypeArr:[], //支付方式  pay_type_list
                },

                timeTotal:'',   //时间
                pageTotal:10,   //总条目数
                searchVal:{   //提交数组
                    zmtek_ver:2,
                    saler_id:'', // 销售id
                    salerSuggest:'', // 销售下拉
                    st:'',   //开始时间
                    et:'',   //介绍时间
                    card_type:'100', //合同类型
                    order_type:'100', //操作类型
                    pay_type_list:'100',  //支付方式
                    total:1,
                },

                changePayArr:{  //修改支付方式
                    orderID:'',
                    pay_type:'',
                },
            }
        },
        methods: {
            /*1.2 表格操作 修改支付方式 */
            btnChangePay(){
                let checkedRows =  this.checkedRows;
                if(checkedRows.length == 0){
                    this.$message.error('至少选一个操作对象');
                    return
                }

                let idArr=[];
                checkedRows.forEach((item,i)=>{
                    idArr.push(item.id)
                });

                let idString = idArr.join(",");   //数组转字符串

                this.changePayArr= {  /*赋值*/
                    pay_type : checkedRows[0].pay_type,
                    orderID : idString,
                }

                this.btnState.diaChangePay = true;  /*弹窗*/

            },

            /*修改支付方式 确定*/
            sureDiaChangePay(){
                this.GLOBAL.btnStateChange(this,'btnState','btnSurePay');
                console.log(this.changePayArr);
                revenueUppay(this.changePayArr).then(res => {
                    console.log(res.data);
                    if(res.status ==1){
                        this.$message.success(res.info);
                        setTimeout(()=>{
                            this.btnState.diaChangePay = false;
                            this.reLoad();
                        },1000);
                    }
                    if(res.status ==0){
                        this.$message({
                            message: res.info,
                            type: 'warning',
                            duration: 1500,
                            offset: 100,
                        });
                    }
                }).catch(res => {
                    console.log(res);
                });
            },


            /* 1.10、 编辑选中 */
            checkedStaff(val) {
                this.checkedRows = val;
            },

            //点击行触发，选中或不选中复选框
            handleRowClick(row, column, event){
                this.$refs.multipleTable.toggleRowSelection(row);
            },

            /*打印事件 */
            btnPrint(){
                let checkedRows =  this.checkedRows;
                console.log(checkedRows);
                console.log(checkedRows.length);
                if(checkedRows.length == 0){
                    this.$message.error('至少选一个操作对象');
                }else if(checkedRows.length == 1){
                    let orderID = checkedRows[0].id;
                    console.log(orderID);
                    this.childPirint(orderID);
                }else {
                    this.$message.error('只能选一个');
                }
                return false
            },

            /*打印接口*/
            childPirint(orderID){
                revenuePrintApi({order_id: orderID}).then(res => {
                    console.log(res.data);
                    if(res.status ==1){
                        this.printArr = res.data;
                        setTimeout(()=>{
                            this.$print(this.$refs.printRef,{'no-print':'.no-print'});
                        },500)
                    }
                    if(res.status ==0){
                        this.$message({
                            message: res.info,
                            type: 'warning',
                            duration: 1500,
                            offset: 100,
                        });
                    }
                }).catch(res => {
                    console.log(res);
                });
            },

            /*导出*/
            streamExport(){
                let localUrl = this.GLOBAL.localUrl;
                let saler_id = this.searchVal.saler_id;
                let salerSuggest = this.searchVal.salerSuggest;
                let card_type = this.searchVal.card_type;
                let order_type = this.searchVal.order_type;
                let pay_type_list = this.searchVal.pay_type_list;
                let st = this.searchVal.st;
                let et = this.searchVal.et;

                // /stat/waterexlexport_1.html?saler_id=&salerSuggest=&card_type=100&order_type=100&pay_type_list=100&st=2020-04-01&et=2020-04-30
                let downUrl = localUrl + '/stat/waterexlexport_1.html?zmtek_ver=2&saler_id=' + saler_id + '&salerSuggest=' + salerSuggest +
                    '&card_type=' + card_type+ '&order_type=' + order_type+ '&pay_type_list=' + pay_type_list+ '&st=' + st+ '&et=' + et;
                console.log(downUrl);
                window.location.href = downUrl;
            },

            /*流水查询*/
            getPTSaleroom(){
                revenueWater(this.searchVal).then(res => {
                    console.log(res.data);

                    if(res.status ==1){
                        let payType = this.searchVal.pay_type_list;
                        if(payType == 7){
                            this.dataArr = {  //数据数组
                                waterArr : res.data.list2,  //table数组
                                staffTypeArr : res.data.staff, // 顾问数组  salerSuggest
                                cardTypeArr : res.data.card_type_list, //合同类型  card_type
                                orderTypeArr : res.data.order_type_list, //操作类型  order_type
                                payTypeArr : res.data.pay_type_list, //支付方式  pay_type_list
                            };
                        }else{
                            this.dataArr = {  //数据数组
                                waterArr : res.data.list,  //table数组
                                staffTypeArr : res.data.staff, // 顾问数组  salerSuggest
                                cardTypeArr : res.data.card_type_list, //合同类型  card_type
                                orderTypeArr : res.data.order_type_list, //操作类型  order_type
                                payTypeArr : res.data.pay_type_list, //支付方式  pay_type_list
                            };
                        }

                        this.searchVal.total = Number(res.data.listRows);
                        this.pageTotal = Number(res.data.totalRows);
                    }
                    if(res.status ==0){
                        this.$message({
                            message: res.info,
                            type: 'warning',
                            duration: 1500,
                            offset: 100,
                        });
                    }
                }).catch(res => {
                    console.log(res);
                });
            },


            /*搜索筛选*/
            btnSeaSaler(){
                this.searchVal.st = this.timeTotal[0];
                this.searchVal.et = this.timeTotal[1];
                this.GLOBAL.btnStateChange(this,'btnState','searchLoad');
                this.getPTSaleroom();
            },

            /*分页*/
            PageCurrent(page) {
                console.log(page);
                this.searchVal.p = page;
                this.getPTSaleroom();
            },

        },
        mounted() {
            this.getPTSaleroom();
        },
        components:{
            revenuePrint,
        }
    }
</script>

