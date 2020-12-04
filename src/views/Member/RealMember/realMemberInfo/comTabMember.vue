<template>
    <el-tabs v-model="recptionTab.activeTabName" @tab-click="btnTab"
             class="vip-tabBox pubWidth tab-header tabHeight" id="staffPay-tabBox">

        <el-tab-pane :lazy='recptionTab.tabLazy' label="会员分析" name="recptionVip">
            <el-row :gutter="20" class="tabRecept-row">
                <el-col :span="8" class="tabRecept-left">
                    <ul>
                        <li>
                            <div>近30天入场频率</div>
                            <div class="color-MediumBlue"><span>20</span>天</div>
                        </li>
                        <li>
                            <div>近30天私教上课次数</div>
                            <div class="color-Pink"><span>20</span>次</div>
                        </li>
                        <li>
                            <div>近30天团课上课次数</div>
                            <div class="color-LigntBlue"><span>20</span>次</div>
                        </li>
                    </ul>
                </el-col>
                <el-col :span="7">
                    <div class="tabRevenue-center">
                        <ul class="">
                            <li v-for="(item,index) in pieChartData.rows">
                                <div>
                                    <span :style="{background:companyColor[index],}" class="tag"></span>
                                    <span>{{item.name}}</span>
                                </div>
                                <div>
                                    <span :style="{color:companyColor[index],}" class="num">￥{{item.value}}</span>
                                    <!--<i class=""></i>-->
                                </div>
                            </li>
                        </ul>
                        <div class="pie-tabRevenue">
                            <ve-ring :data="pieChartData" :extend="pieSettings" :colors="companyColor"></ve-ring>
                        </div>
                    </div>
                </el-col>
                <el-col :span="9">
                    <div class="tabRevenue-bottom">
                        <el-calendar v-model="calendarTime"></el-calendar>
                    </div>
                </el-col>

            </el-row>
        </el-tab-pane>

        <el-tab-pane :lazy='recptionTab.tabLazy' label="更衣柜记录" name="recptionLocker">
            更衣柜记录
        </el-tab-pane>

        <el-tab-pane :lazy='recptionTab.tabLazy' label="出入场记录" name="recptionCome">
            出入场记录
        </el-tab-pane>

        <el-tab-pane :lazy='recptionTab.tabLazy' label="预约记录" name="recptionOrder">
            预约记录
        </el-tab-pane>

        <el-tab-pane :lazy='recptionTab.tabLazy' label="上课记录" name="recptionClass">
            上课记录
        </el-tab-pane>

        <el-tab-pane :lazy='recptionTab.tabLazy' label="跟进记录" name="recptionFollow">
            跟进记录
        </el-tab-pane>

        <el-tab-pane :lazy='recptionTab.tabLazy' label="充值消费" name="recptionRecharge">
            充值消费
        </el-tab-pane>

    </el-tabs>
</template>

<script>

	export default {

		name: "comTabMember",
		data() {
			this.companyColor = ['#ff8a7e','#005ad4','#00a0e9','#8763ce','#1eaaa1','#4ccbeb','#5b5ec7','#ffbe00'];
			this.pieSettings = {
				legend: {
					show: false,
				},

				tooltip: {
					trigger: 'item',
					position: 'right'
				},
				series:{
					tooltip: {
						trigger: 'item',
						position: 'right'
					},
					// offsetY: 100,
					// offsetX: 100,
					// radius: 70,
					radius: ['55%','75%'],  //大小
					center: ['50%', '50%'], // 位置
					label: {   //去掉指引线
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
				}


				// series:{
				// 	label: {   //去掉指引线
				// 		normal: {
				// 			position: 'inner',
				// 			show: false,
				// 		}
				// 	},
				// 	labelLine: {
				// 		normal: {
				// 			show: false
				// 		}
				// 	},
				// }
			};
			return {
				recptionTab:{
					activeTabName:"recptionVip",
					tabLazy: true,
				},

				calendarTime:new Date(),

				pieChartData: {
					columns: ['name','value'],
					rows: [
						{name:'入场合同', value:'1099.05'},
						{name:'私教合同', value:'2099.05'},
						{name:'游泳合同', value:'899.05'},
						{name:'租柜合同', value:'1499.05'},
						{name:'储值合同', value:'1999.05'},
					]
				},

            }
		},
		methods: {
			/* 零、 tab切换  */
			btnTab(tab, event) {
				console.log(tab.label);
			},

		},
		created() {
			
		},
	}
</script>
<style lang="scss">
    .tabRecept-row{
        .el-col{
            /*background-color: #f4f4f4;*/
        }
        .tabRecept-left{
            li{
                background: #FBFCFD;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 60px;
                padding: 0 16px;
                margin-bottom: 10px;
                border-radius: 10px;
                span{
                    font-size: 20px;
                    margin-right: 2px;
                }
            }
        }
        .tabRevenue-center{
            border-radius: 10px;
            background: #FBFCFD;
            padding-top: 16px;
            li{
                margin-bottom: 10px;
                padding: 0 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .tag{
                height: 14px;
                display: inline-block;
                width: 14px;
                vertical-align: middle;
                margin-right: 4px;
                margin-top: -2px;
                border-radius: 4px;
            }
            .num{
                font-size: 16px;
            }
        }

        .tabRevenue-bottom{
            background: #FBFCFD;
            .el-calendar{
                background: none;
            }
        }
        .pie-tabRevenue{
            .ve-ring{
                height: 200px !important;
                > div:first-child{
                    height: 200px !important;
                }
            }
        }
    }
</style>