<template>
    <div>
        <div class="revenue-listTop">
            <!--营收详细 筛选-->
            <div class="pt-screen">
                <el-select v-model="projectChoose" multiple   collapse-tags  @change = 'chooseProject($event)'
                class="inp-mar14">
                    <el-option v-for="(item, index) in revenueProjectTotal"
                               :key="item.index"
                               :value="item.id"
                               :label="item.name"
                    >
                        <span class="check"></span>
                        <span style="margin-left: 8px">{{item.name}}</span>
                    </el-option>
                </el-select>
                <el-date-picker
                        value-format="yyyy-MM"
                        class="month-inp"
                        v-model="revenueDetails.month"
                        type="month"
                        placeholder="选择月">
                </el-date-picker>
                <!--搜索-->
                <el-button icon="el-icon-search" @click="btnSeaDetail" class="btn-public" :loading="btnLoad.search">搜索</el-button>
            </div>

            <div class="reveue-listPie">
                <ve-histogram :data="totalVipOverdue"
                              :colors="revenueRankingColor"
                              :style="histogramStyle"
                              :extend="histogramExtend">
                </ve-histogram>
            </div>
        </div>

        <!--营收详细 列表-->
        <el-row :gutter="20" class="index-row revenue-box">
            <el-col :md="8" :lg="6" v-for="(item,index) in projectChoose" :key="index">
                <div v-for="(proItem,proIndex) in revenueProject" :key="proIndex" v-if = "item == proItem.id">
                    <div class="index-item"  @click="goRenDetai('revenueDetails',proItem)">
                        <header class="index-item-title">
                            <div class="title">{{proItem.name}}</div>
                        </header>
                        <ul class="revenue-list">
                            <li class="flex-between">
                                <div><i class="el-icon-price-tag"></i>总收入</div>
                                <div>{{proItem.income}}</div>
                            </li>
                            <li class="flex-between">
                                <div><i class="el-icon-discount"></i>总价格</div>
                                <div>{{proItem.total_price}}</div>
                            </li>
                            <li class="flex-between" style="color: red;">
                                <div><i class="el-icon-coin"></i>总金额</div>
                                <div>{{proItem.total_number}}</div>
                            </li>
                            <li class="flex-between" style="color: green;">
                                <div><i class="el-icon-refresh-left"></i>退款金额</div>
                                <div>{{proItem.refund_price}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
        </el-row>

    </div>

</template>

<script>
    import {revenueContract} from '@/assets/js/api' /*引用 营收总览 接口*/
    import {hisRevenueExtendConfig} from '@/assets/js/vChartsConfig/vChartsConfig'   //vcharts配置

    export default {

        inject:['reLoad'],
        name: "StatisRevenueDetails",
        data() {
            this.revenueRankingColor=['#84CCC9','#AA89BD','#F19EC2','#FF8A7E','#00A0E9','#0000FF','#FFBE00','#00B7EE'];
            this.histogramExtend = hisRevenueExtendConfig;
            return {
                histogramStyle:{
                    height: '300px',
                    width: '100%',
                },

                btnLoad:{
                  search:false,  //搜索按钮
                },

                /*营收详情 */
                revenueProjectTotal : [],
                revenueProject : [],
                totalVipOverdue: {
                    // columns: ['总价格','总收入','总数量','退回'],
                    columns: ['name','income','total_price','total_number','refund_price'],
                    rows: [
                        // {'总收入':'income','总收入':'total_price','总数量':'total_number','退回':'refund_price'},
                    ],
                },
                projectChoose:[],
                revenueDetails:{
                    month:'',    //月份筛选
                },

            }
        },
        methods: {
            /*二、营收详情*/
            getRevenueContract() {
                revenueContract({
                    date:this.revenueDetails.month,
                }).then(res => {
                    console.log(res);
                    let projectTotal = res.data;
                    this.revenueProjectTotal = projectTotal; //全部

                    let choosePro = JSON.parse(sessionStorage.getItem('choosePro')) ;  //选中的item 对应显隐
                    if (choosePro != null){
                        this.projectChoose = choosePro;
                        let revenueProjectNow = this.toName(projectTotal,choosePro)
                        console.log(revenueProjectNow);

                        this.totalVipOverdue.rows = revenueProjectNow;
                        this.revenueProject = revenueProjectNow;

                    } else {
                        projectTotal.forEach((item,i)=>{
                            this.projectChoose.push(item.id);
                        });
                        this.revenueProject = projectTotal;
                        this.totalVipOverdue.rows = projectTotal;
                        sessionStorage.setItem('choosePro', JSON.stringify(this.projectChoose));
                    }

                    // this.hasAxios.revenueDetails = true;  //是否调用接口状态
                }).catch(res => {
                    console.log(res);
                });
            },

            toName(ids, arr){
                let a = [];
                for (let i = 0, length = arr.length; i < length; i++) {
                    for (let j = 0, l = ids.length; j < l; j++) {
                        if (ids[j].id == arr[i]) {
                            a.push(ids[j])
                        }
                    }
                }
                return a;
            },

            /*2.12、查看流水*/
            lookDetail(index, row){
                console.log(index);
                console.log(row);
            },

            /*2.2 搜索 筛选*/
            btnSeaDetail(){
                if(!this.revenueDetails.month){
                    this.$message.warning('请选择月份');
                    this.GLOBAL.btnStateChange(this,'btnLoad','search','搜索','搜索');
                    return
                }
                this.GLOBAL.btnStateChange(this,'btnLoad','search','搜索中','搜索',true);

                this.getRevenueContract();
            },

            chooseProject(val){
                console.log(val);

                let projectTotal = this.revenueProjectTotal;
                this.projectChoose = val;
                let revenueProjectNow = this.toName(projectTotal,val)
                console.log(revenueProjectNow);

                this.totalVipOverdue.rows = revenueProjectNow;
                this.revenueProject = revenueProjectNow;

                sessionStorage.setItem('choosePro', JSON.stringify(val));
            },

            /*去详情页*/
            goRenDetai(val,val2){
                // console.log(val);
                this.$emit('showState1','revenueDetails',val2);
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

    /*selecet 模拟 checkbox*/
    .el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after{
        content: "";
    }
    .el-select-dropdown.is-multiple .el-select-dropdown__item.selected .check{
        background-color:#005ad4;
        border-color:#005ad4;
    }
    .el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
        span{
            font-weight: 400;
        }
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

    .revenue-listTop{
        box-shadow: -1px 2px 12px 0px rgba(219,219,219,.79);
        border-radius: 20px;
        padding: 20px;
        .pt-screen{
            margin-bottom: 20px;
        }
    }
    .revenue-box {
        margin-top: 30px;
        .index-item{
            min-height: 140px;
            box-shadow:-1px 2px 12px 0px rgba(219,219,219,0.79);
            margin-bottom: 20px;
            padding: 0 20px 20px 20px;
        }
        .index-item-title{
            padding: 0;
        }
        .revenue-list{
            margin-top: 16px;
            li{
                cursor: pointer;
                margin-top: 6px;
                font-size: 15px;
                i{
                    color: #005AD4;
                    font-weight:bold ;
                    margin-right: 4px;
                }
            }
        }
    }
</style>