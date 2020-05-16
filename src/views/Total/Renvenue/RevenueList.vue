<template>
    <div>
        <div class="revenue-listTop">
            <!--营收详细 筛选-->
            <div class="pt-screen">

                <el-select  v-model="projectChoose" multiple   collapse-tags
                        :popper-class="RevenSelCheckbox"   @change = 'chooseProject($event)' class="inp-mar14">
                    <el-option v-for="(item, index) in revenueProjectTotal"
                               :key="item.index"
                               :value="item.id"
                               :label="item.name">
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
                              :legend-visible="false"
                              :colors="revenueRankingColor"
                              :style="histogramStyle"
                              :extend="histogramExtend">
                </ve-histogram>
            </div>
        </div>

        <!--营收详细 列表-->
        <div class="index-row revenue-box">

            <el-row :gutter="20" v-for="(tItem,index1) in revenueType" :key="index1" class="index-item reItem-box"
                    :class="'reItem-box_'+index1">
                <header class="index-item-title">
                    <div class="title">{{tItem.name}}</div>
                </header>
                <el-col :md="8" :lg="6" v-for="(item,index2) in projectChoose" :key="index2">
                    <div v-for="(proItem,proIndex) in revenueProject" :key="proIndex" v-if = "item == proItem.id && tItem.id == proItem.gather_id"
                         @click="goRenDetai('revenueDetails',proItem)" class="index-item revenue-item">

                        <!--余额-->
                        <div class="revenue-list" v-if="proItem.id == 20">
                            <div class="revenLiest-title flex-between">
                                <div>{{proItem.name}}</div>
                                <div>查看详情</div>
                            </div>
                            <ul class="revenue-listUl">
                                <li>
                                    <div class="revenList-icon"><i class="iconfont icon-chongzhi-"></i></div>
                                    <div class="revenList">充值金额</div>
                                    <div class="revenList-totalNum">{{proItem.up_price}}</div>
                                </li>
                                <li>
                                    <div class="revenList-icon"><i class="iconfont icon-zengsong"></i></div>
                                    <div class="revenList">赠送金额</div>
                                    <div class="revenList-totalNum">{{proItem.give_price}}</div>
                                </li>
                                <li>
                                    <div class="revenList-icon"><i class="iconfont icon-shiyong"></i></div>
                                    <div class="revenList">使用金额</div>
                                    <div class="revenList-totalNum">{{proItem.use_price}}</div>
                                </li>
                                <li>
                                    <div class="revenList-icon"><i class="iconfont icon-shengyujine"></i></div>
                                    <div class="revenList">剩余金额</div>
                                    <div class="revenList-totalNum">{{proItem.left_price}}</div>
                                </li>
                            </ul>
                        </div>

                        <!--定金-->
                        <div class="revenue-list" v-else-if="proItem.id == 22">
                            <div class="revenLiest-title flex-between">
                                <div>{{proItem.name}}</div>
                                <div>查看详情</div>
                            </div>
                            <ul class="revenue-listUl">
                                <li>
                                    <div class="revenList-icon"><i class="iconfont icon-shuliang"></i></div>
                                    <div class="revenList">总数量</div>
                                    <div class="revenList-totalNum">{{proItem.total_number}}</div>
                                </li>
                                <li>
                                    <div class="revenList-icon"><i class="iconfont icon-jine"></i></div>
                                    <div class="revenList">缴定金</div>
                                    <div class="revenList-totalNum">{{proItem.up_price}}</div>
                                </li>
                                <li>
                                    <div class="revenList-icon"><i class="iconfont icon-shiyong"></i></div>
                                    <div class="revenList">使用定金</div>
                                    <div class="revenList-totalNum">{{proItem.use_price}}</div>
                                </li>

                                <li>
                                    <div class="revenList-icon"><i class="iconfont icon-shengyujine"></i></div>
                                    <div class="revenList">剩余金额</div>
                                    <div class="revenList-totalNum">{{proItem.left_price}}</div>
                                </li>
                            </ul>
                        </div>

                        <!--会籍卡1-->
                        <div class="revenue-list" v-else>
                            <div class="revenLiest-title flex-between">
                                <div>{{proItem.name}}</div>
                                <div>查看详情</div>
                            </div>
                            <ul class="revenue-listUl">
                                <li>
                                    <div class="revenList-icon"><i class="iconfont icon-shuliang"></i></div>
                                    <div class="revenList">总数量</div>
                                    <div class="revenList-totalNum">{{proItem.total_number}}</div>
                                </li>
                                <li>
                                    <div class="revenList-icon"><i class="iconfont icon-jine"></i></div>
                                    <div class="revenList">销售金额</div>
                                    <div class="revenList-totalNum">{{proItem.income}}</div>
                                </li>
                                <li>
                                    <div class="revenList-icon"><i class="iconfont icon-tuikuan"></i></div>
                                    <div class="revenList">退款金额</div>
                                    <div class="revenList-totalNum">{{proItem.refund_price}}</div>
                                </li>

                                <li>
                                    <div class="revenList-icon"><i class="iconfont icon-heji"></i></div>
                                    <div class="revenList">合计金额</div>
                                    <div class="revenList-totalNum">{{proItem.total_price}}</div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </el-col>
            </el-row>
        </div>
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

                RevenSelCheckbox:'RevenSel-checkbox',
                btnLoad:{
                  search:false,  //搜索按钮
                },

                /*营收详情 */
                revenueType:[], //分类
                revenueProjectTotal : [],  //全部数据
                revenueProject : [],     //显示数据
                totalVipOverdue: {
                    columns: ['名称','总数量','销售金额','退款金额','合计金额'],
                    rows: [],
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
                    console.log(res.gather);
                    let projectTotal = res.data.data;
                    this.revenueProjectTotal = projectTotal; //全部
                    let gatherArr = res.data.gather;
                    this.revenueType  = gatherArr;


                    let choosePro = JSON.parse(sessionStorage.getItem('choosePro')) ;  //选中的item 对应显隐
                    if (choosePro != null){   //如果不为空 则获取这里的值
                        this.projectChoose = choosePro;
                        let revenueProjectNow = this.toName(projectTotal,choosePro); //当先选中

                        this.totalVipOverdue.rows = [];    //图表清空 再添加数据
                        revenueProjectNow.forEach((item,index)=>{
                            this.totalVipOverdue.rows.push({
                                '名称':item.name,
                                '总数量':item.total_number,
                                '销售金额':item.income,
                                '退款金额':item.refund_price,
                                '合计金额':item.total_price,
                            });
                        })
                        // console.log(revenueProjectNow.income);

                        this.revenueProject = revenueProjectNow;    //所有选项赋值

                    } else {
                        this.totalVipOverdue.rows = [];
                        projectTotal.forEach((item,i)=>{
                            this.projectChoose.push(item.id);

                            this.totalVipOverdue.rows.push({
                                '名称':item.name,
                                '总数量':item.total_number,
                                '销售金额':item.income,
                                '退款金额':item.refund_price,
                                '合计金额':item.total_price,
                            });
                        });
                        this.revenueProject = projectTotal;

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
                    this.GLOBAL.btnStateChange(this,'btnLoad','search',false);
                    return
                }
                this.GLOBAL.btnStateChange(this,'btnLoad','search');

                this.getRevenueContract();
            },

            chooseProject(val){
                console.log(val);

                let projectTotal = this.revenueProjectTotal;
                this.projectChoose = val;
                let revenueProjectNow = this.toName(projectTotal,val)
                console.log(revenueProjectNow);
                this.totalVipOverdue.rows = [];
                revenueProjectNow.forEach((item,index)=>{
                    console.log(item);
                    this.totalVipOverdue.rows.push({
                        '名称':item.name,
                        '总数量':item.total_number,
                        '销售金额':item.income,
                        '退款金额':item.refund_price,
                        '合计金额':item.total_price,
                    });
                })

                this.revenueProject = revenueProjectNow;

                sessionStorage.setItem('choosePro', JSON.stringify(val));
            },

            /*去详情页*/
            goRenDetai(val,val2){
                // console.log(val);
                // console.log(val2);
                this.$emit('showState1','revenueDetails',val2);
                sessionStorage.setItem('StatisRevenueList',JSON.stringify(val2));
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
    @import "@/assets/css/totalVip.scss";
</style>