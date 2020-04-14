<template>
    <div>
        <el-table class="pub-table" :data="detailList" border style="height: 0;">
            <el-table-column prop="name" label="项目"></el-table-column>
            <el-table-column prop="total_number" label="数量"></el-table-column>
            <el-table-column prop="income" label="收入"></el-table-column>
            <el-table-column prop="refund_price" label="退款"></el-table-column>
            <el-table-column prop="total_price" label="合计"></el-table-column>

            <!--card_type   卡类型  1=期限卡 2=私教卡 3=游泳卡 4=滑雪储值卡-->
            <!--<el-table-column prop="lock" label="卡类型">
                <template slot-scope="scope">
                    <div v-if="scope.row.lock == 0 " class="status-connect">在职</div>
                    <div v-if="scope.row.lock == 1 " class="status-break">离职</div>
                </template>
            </el-table-column>-->
            <el-table-column label="流水">
                <template slot-scope="scope">
                    <el-button size="mini" @click="lookDetail(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--营收详细 筛选-->
        <div class="pt-screen">
            <el-select v-model="revenueDetails.projectChoose" multiple   collapse-tags  @change = 'chooseProject($event)'
            class="inp-mar14">
                <el-option v-for="(item, index) in revenueProject"
                           :key="item.index"
                           :value="item.id"
                           :label="item.catname"

                >
                    <span class="check"></span>
                    <span style="margin-left: 8px">{{item.catname}}</span>
                </el-option>
            </el-select>
            <el-date-picker
                    class="inp-mar14 month-inp"
                    v-model="revenueDetails.year"
                    type="year"
                    value-format="yyyy"
                    placeholder="选择年">
            </el-date-picker>
            <el-date-picker
                    value-format="yyyy-MM"
                    class="inp-mar14 month-inp"
                    v-model="revenueDetails.month"
                    type="month"
                    placeholder="选择月">
            </el-date-picker>
            <!--搜索-->
            <el-button icon="el-icon-search" @click="btnSeaDetail" class="btn-search" :loading="btnLoad.search">搜索</el-button>
        </div>

        <!--营收详细 列表-->
        <el-row :gutter="20" class="index-row revenue-box">
            <el-col :md="8" :lg="6" v-for="(item,index) in revenueDetails.projectChoose">
                <div v-for="(proItem,proIndex) in revenueProject" :key="proIndex" v-if = "item == proItem.id">
                    <div class="index-item"  @click="goRenDetai(proItem)">{{item}} {{proItem.catname}}</div>
                </div>
            </el-col>
        </el-row>

    </div>

</template>

<script>
    import {revenueTotal,revenueRanking,revenuePayMethod,
        revenueContract} from '@/assets/js/api' /*引用 营收总览 接口*/
    export default {

        inject:['reLoad'],
        name: "StatisRevenueDetails",
        data() {
            return {
                btnLoad:{
                  search:false,  //搜索按钮
                },

                /*营收详情 */
                revenueProject : [],
                revenueDetails:{
                    projectChoose:[],
                    month:'',    //月份筛选
                    year:'',     //年筛选
                },
                detailList:[], //详情table数据

            }
        },
        methods: {
            /*二、营收详情*/
            getRevenueContract() {
                revenueContract({
                    type:this.revenueDetails.projectChoose,
                }).then(res => {
                    console.log(res);
                    let projectArr = res.list;
                    this.detailList = projectArr ;   //项目
                    this.revenueProject = res.list;  //表格数据

                    let choosePro = sessionStorage.getItem('choosePro');
                    if(choosePro != null){
                        this.revenueDetails.projectChoose = choosePro.split(',');
                    }else {
                        projectArr.forEach((item,i)=>{
                            this.revenueDetails.projectChoose.push(item.id);
                        });
                        sessionStorage.setItem('choosePro', this.revenueDetails.projectChoose);
                    }

                    // this.hasAxios.revenueDetails = true;  //是否调用接口状态
                }).catch(res => {
                    console.log(res);
                });
            },

            /*2.12、查看流水*/
            lookDetail(index, row){
                console.log(index);
                console.log(row);
            },

            /*2.2 搜索 筛选*/
            btnSeaDetail(){

                this.btnLoad.search = true;
                console.log(this.revenueDetails);
                setTimeout(()=>{
                    this.btnLoad.search = false;
                },1500);
               /* this.getRevenueContract();*/
            },

            chooseProject(val){
                console.log(val);
                sessionStorage.setItem('choosePro',val);
            },

            /*去详情页*/
            goRenDetai(val){
                console.log(val);
            },


            /*2.3 分页*/
            /*PageCurrent(page){
                console.log(page);
            },*/

        },


        created() {
            this.getRevenueContract();
        },
    }
</script>

<style lang="scss">
    ///*.reveue-list {*/
    ///*    .el-col{*/
    ///*        height: 200px;*/
    ///*        border: solid 1px red;*/
    ///*    }*/
    ///*}*/




    .el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after{
        content: "";
    }

    .el-select-dropdown.is-multiple .el-select-dropdown__item.selected .check{
        background-color: #409eff;
        border-color: #409eff;
    }

    .el-select-dropdown.is-multiple .el-select-dropdown__item.selected .check:after{
        transform: rotate(45deg) scaleY(1);
    }

    .el-select-dropdown.is-multiple .el-select-dropdown__item .check::after{
        box-sizing: content-box;
        content: "";
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 7px;
        left: 4px;
        position: absolute;
        top: 1px;
        transform: rotate(45deg) scaleY(0);
        width: 3px;
        transition: transform .15s ease-in .05s;
        transform-origin: center;
    }

    .el-select-dropdown.is-multiple .el-select-dropdown__item .check{
        display: inline-block;
        position: relative;
        top:2px;
        border: 1px solid #dcdfe6;
        border-radius: 2px;
        box-sizing: border-box;
        width: 14px;
        height: 14px;
        background-color: #fff;
        z-index: 1;
        transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
    }



    .revenue-box {
        margin-top: 30px;
        .index-item{
            min-height: 140px;
            border: solid 1px #ddd;
            margin-bottom: 20px;
            padding: 20px;
        }
        .revenue-item{
            border: solid 1px red;
        }
    }
</style>