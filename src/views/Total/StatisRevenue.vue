<template>
    <div>
        <ve-line
                :data="totalNewAdd"
                :legend-visible="false"
                :colors="totalColor"
                :style="lineStyle"
                :extend = 'extend'
               ></ve-line>
    </div>
</template>

<script>
    import eCharts from '@/components/Echarts/Echarts'
    import navBread from '@/components/Echarts/navBread'
    import {
        PTprivateMember, totalMember_number, totalMember_trend, totalPassenger_trend, totalRefund_trend, totalSub_card_trend,
        PTClassRanking, PTMemberClass,
        VipMemberTkClass, VipSalerStatis,} from '@/assets/js/api' /*引用 会员总览 接口*/
    export default {
        name: "StatisRevenue",
        data() {
            this.totalColor = ['#4CCBEB', '#005AD4']; //会员总览 潜在会员 自定义的颜色
            this.OverdueColor = ['#FFBE00', '#FF8A7E', '#4CCBEB', '#005AD4'];
            this.vipPtColor=['#FFBE00', '#FF8A7E','#1EAAA1', '#4CCBEB'];
            this.extend = {
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        fontSize:12,
                    },
                    // formatter : function (params) {
                    //
                    //     var rec = '';
                    //     for(var i = 0;i < params.length;i++){
                    //         var rea = '<div style="margin:2px 0 0 4px;color:#f7f8f9;">' +
                    //             ''+ params[i].axisValue + '</div>';
                    //         var reb = '<div style="margin: 4px">'+
                    //             '<span style="display:inline-block;margin-right:2px;border-radius:8px;width:8px;height:8px;background-color:' + params[i].color +';"></span>' +
                    //             '<span style="display:inline-block;margin:2px 4px;">'+ params[i].seriesName+'</span>:  '+params[i].data+'' +
                    //             '</div>';
                    //         rec= rec + reb;
                    //     }
                    //     return rea + rec;
                    // },
                },

                grid: {
                    // show:true,//是否显示直角坐标系网格。[ default: false ]
                    // borderColor:"#c45455",//网格的边框颜色
                    top: "30px",
                    left: "80px",
                    right: "60px",
                    bottom: "40px",
                    width: "90%", //图例宽度
                    height: "80%", //图例高度
                },

                xAxis: {
                    axisTick: {
                        alignWithLabel: true
                    },
                    type: 'category',
                    axisLine: {
                        lineStyle: {
                            color: '#8E8E8E',
                        }
                    },
                    //设置字体倾斜
                    axisLabel: {
                        // interval:0,
                        // rotate:10,//倾斜度 -90 至 90 默认为0
                        margin:15,
                        textStyle: {
                            color: "#8E8E8E"
                        }
                    },
                },

                yAxis: {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#8E8E8E',
                        }
                    },
                },
                series: {
                    type: 'line',
                    symbolSize: 9,   //设定实心点的大小
                    lineStyle: {
                        normal: {
                            type: 'dashed',
                        }
                    },
                }
            }

            this.lineGrid = {
                show:true,//是否显示直角坐标系网格。[ default: false ]
                // borderColor:"#c45455",//网格的边框颜色
                top: "30px",
                left: "80px",
                right: "60px",
                bottom: "40px",
                width: "90%", //图例宽度
                height: "80%", //图例高度
            }


            this.linexAxis= {
                axisTick: {
                    alignWithLabel: true
                },
                type: 'category',
                data: [],
                axisLine: {
                    lineStyle: {
                        color: '#8E8E8E',
                    }
                },
                //设置字体倾斜
                axisLabel: {
                    // interval:0,
                    // rotate:10,//倾斜度 -90 至 90 默认为0
                    margin:15,
                    textStyle: {
                        color: "#8E8E8E"
                    }
                },
            }

            this.lineyAxis= {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#8E8E8E',
                    }
                },
            }

            return {
                picStyle: {
                    height: '180px',
                    width: '180px',
                },
                picSettings : {
                    offsetY: 80,
                    offsetX: 10,
                    radius: 70,
                    label: {
                        normal: {
                            position: 'inner',
                            show: false,
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                },



                lineStyle:{
                    height: '180px',
                    width: '100%',
                },
                // lineTool:{
                //     // trigger: 'axis',
                //     // textStyle: {
                //     //     fontSize:12,
                //     // },
                //     formatter : function (params) {
                //
                //         var rec = '';
                //         for(var i = 0;i < params.length;i++){
                //             var rea = '<div style="margin:2px 0 0 4px;color:#f7f8f9;">' +
                //                 ''+ params[i].axisValue + '</div>';
                //             var reb = '<div style="margin: 4px">'+
                //                 '<span style="display:inline-block;margin-right:2px;border-radius:8px;width:8px;height:8px;background-color:' + params[i].color +';"></span>' +
                //                 '<span style="display:inline-block;margin:2px 4px;">'+ params[i].seriesName+'</span>:  '+params[i].data+'' +
                //                 '</div>';
                //             rec= rec + reb;
                //         }
                //         return rea + rec;
                //     },
                // },


                judgeWidth:true,

                activeTabName: 'VipTotal', //VipTotal VipPT VipMembership

                tabLazy: true,
                tabPaneState: true,    //tab 显隐

                totalVipNum: {
                    columns: ['name', 'value'],
                    rows: [
                        {name:'',value:0},
                        {name:'',value:0}],
                },
                totalVipOverdue: {
                    columns: ['name', 'value'],
                    rows: [
                        {name:'',value:0},
                        {name:'',value:0}],
                },
                totalVipPT: {
                    columns: ['name', 'value'],
                    rows: [
                        {name:'',value:0},
                        {name:'',value:0}],
                },

                totalNewAdd: {
                    columns: ['dayTime', 'user1', 'user2'],
                    rows: [],
                },

            }
        },
        methods: {

            btnRefush(){
                //销售额表格
                this.PTtable=[{
                    department: '市场部1',
                    pt: '王小虎11',
                    tel: '17688829466',
                    money: '574889',
                    day: '2020-02-14',
                },
                ];
                /*强制刷新 div*/
                this.$forceUpdate();
                // this.reLoad();
            },

            /*tab切换*/
            tabTotal(tab, event) {
                let tabName = tab.name;
                this.callTabApi(tabName);
            },

            /* ==== 会员总览 ==== 接口1 获取数量 totalMember_number*/
            getTotalMember_number() {
                totalMember_number().then(res => {

                    console.log(res)

                    /*潜在 与 正式 会员*/
                    let MemberNum = [];
                    let MemberNum1 = res[0];
                    let MemberNum2 = res[1];
                    MemberNum.push(MemberNum1, MemberNum2);
                    this.totalVipNum.rows = MemberNum;


                    /*有效 与 过期 会员*/
                    let OverdueNum = [];
                    let OverdueNum1 = res[2];
                    let OverdueNum2 = res[3];
                    OverdueNum.push(OverdueNum1, OverdueNum2);
                    this.totalVipOverdue.rows = OverdueNum;



                    /*私教会员*/
                    let totalPt =[];
                    let totalPt1 = res[4];
                    let totalPt2 = res[5];
                    // let totalPt1 =   {name:'过期会员',value:100};
                    // let totalPt2 =   {name:'过期会员',value:80};
                    totalPt.push(totalPt1,totalPt2);
                    this.totalVipPT.rows = totalPt;

                }).catch(res => {
                    console.log(res);
                });
            },

            /*会员总览 接口2 新增会员走势 totalMember_trend*/
            getTotalMember_trend() {
                totalMember_trend().then(res => {
                    console.log(res);

                    // this.totalNewAdd.xAxis.data = res[0].value.split(',');
                    var t = this;
                    //折线1
                    console.log(res[0].value.split(','));
                    console.log(res[1].value.split(','));
                    console.log(res[2].value.split(','));

                    let time = res[0].value.split(',');
                    let user1 = res[1].value.split(',');
                    let zOldChannel1 = res[2].value.split(',');

                    for(let i=0;i < time.length;i++){
                        this.totalNewAdd.rows.push({
                            'dayTime':time[i],
                            'user1':user1[i],
                            'user2':zOldChannel1[i],
                        })
                    }


                    console.log(this.totalNewAdd.rows);
                }).catch(res => {
                    console.log(res);
                });
            },



            /*接口调用*/
            callTabApi(tabName){
                console.log(tabName);
                if(tabName == 'VipTotal'){
                    /*调用 ==== 会员总览1 ==== 会员数量*/
                    this.getTotalMember_number();
                    /*调用 会员总览2 新增会员走势*/
                    this.getTotalMember_trend();
                };
            },
        },
        created() {
            let tabName =this.activeTabName;
            this.callTabApi(tabName);
        },

        components: {
            eCharts,
            navBread,
        },
    }
</script>

<style scoped lang="scss">

</style>