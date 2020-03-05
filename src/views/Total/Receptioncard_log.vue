<template>
    <div class="layoutR-main layoutR-box">
        <!--会员卡记录-->
        <publicIframe/>

        <!--选项卡-->
        <el-tabs v-model="activeName" @tab-click="handleClick" class="vip-tabBox" style="display: none;">

            <!--  tabItem1 会员总览 -->
            <el-tab-pane label="会员总览" name="VipTotal">

                <!-- A1  会员数量-->
                <el-row :gutter="30" class="index-row">

                        <!--会员数量-->
                        <el-col :md="16" :lg="16">
                            <div class="index-item">
                                <header class="index-item-title">
                                    <div class="title">会员数量</div>
                                </header>

                                <el-row >
                                    <!--潜在会员-->
                                    <el-col :md="12" class="vip-item-num">
                                        <ul class="index-item-tipUl">
                                            <li><img src="~@/assets/icon/vipTotal/vipT-potential.png" alt="">潜在会员</li>
                                            <li><img src="~@/assets/icon/vipTotal/vipT-formal.png" alt="">正式会员</li>
                                        </ul>
                                        <div class="flex-between">
                                            <eCharts :eChartObj="chartVip" :style="styleVip"></eCharts>
                                            <ul class="vipNum">
                                                <li>潜在会员： <span class="vipTipG">{{chartVip.series[0].data[0].value}}</span></li>
                                                <li>正式会员： <span class="vipTipB">{{chartVip.series[0].data[1].value}}</span></li>
                                            </ul>
                                        </div>
                                    </el-col>

                                    <!--有效会员-->
                                    <el-col :md="12"  class="vip-item-num">
                                        <ul class="index-item-tipUl">
                                            <li><img src="~@/assets/icon/vipTotal/vipT-effective.png" alt="">有效会员</li>
                                            <li><img src="~@/assets/icon/vipTotal/vipT-overdue.png" alt="">过期会员</li>
                                        </ul>
                                        <div class="flex-between">
                                            <eCharts :eChartObj="chartVip" :style="styleVip"></eCharts>
                                            <ul class="vipNum">
                                                <li>有效会员： <span class="colorRed">{{chartVip.series[0].data[0].value}}</span></li>
                                                <li>过期会员： <span class="colorYellow">{{chartVip.series[0].data[1].value}}</span></li>
                                            </ul>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>

                        <!--私教会员-->
                        <el-col :md="8" :lg="8">
                            <div class="index-item">
                                <header class="index-item-title">
                                    <div class="title">私教会员</div>
                                </header>

                                <div class="vip-pt-num">
                                    <span class="num">59</span>
                                    <img src="" alt="">
                                </div>
                            </div>
                        </el-col>
                    </el-row>

                <!-- A2 新增会员走势-->
                <div class="index-item comein-main">
                    <header class="index-item-title flex-between">
                        <div class="title">新增会员走势</div>
<!--                        <div>-->
<!--                            <el-date-picker-->
<!--                                    v-model="value2"-->
<!--                                    align="right"-->
<!--                                    type="date"-->
<!--                                    placeholder="选择日期"-->
<!--                                    :picker-options="pickerOptions">-->
<!--                            </el-date-picker>-->
<!--                        </div>-->
                    </header>
                    <ul class="index-item-tipUl">
                        <li><img src="~@/assets/icon/vipTotal/vipT-addCard.png" alt="" class="vipT-addCard">办卡人数</li>
                        <li><img src="~@/assets/icon/vipTotal/vipT-addPT.png" alt="">私教人数</li>
                    </ul>
                    <eCharts :eChartObj="comeIn" :style="styleComeIN"></eCharts>
                </div>

                <!--A3 消耗趋势-->
                <div class="index-item comein-main">
                    <header class="index-item-title flex-between">
                        <div class="title">消耗趋势</div>
                        <!--<div>
                            <span class="comeIn-title">日期筛选</span>
                            <el-date-picker
                                    @change="trueComein"
                                    v-model="dateComein"
                                    type="daterange"
                                    align="right"
                                    value-format="yyyy-MM-dd"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-time="['12:00:00', '08:00:00']">
                            </el-date-picker>
                        </div>-->
                    </header>
                    <ul class="index-item-tipUl">
                        <li><img src="~@/assets/icon/vipTotal/vipT-xhOnce.png" alt="">次卡</li>
                        <li><img src="~@/assets/icon/vipTotal/vipT-xhPT.png" class="vipT-addCard" alt="">私教</li>
                    </ul>
                    <eCharts :eChartObj="comeIn" :style="styleComeIN"></eCharts>
                </div>

                <!--A4 转卡退款人数走势-->
                <div class="index-item comein-main">
                    <header class="index-item-title flex-between">
                        <div class="title">转卡退款人数走势</div>
                        <!--<div>
                            <span class="comeIn-title">日期筛选</span>
                            <el-date-picker
                                    @change="trueComein"
                                    v-model="dateComein"
                                    type="daterange"
                                    align="right"
                                    value-format="yyyy-MM-dd"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-time="['12:00:00', '08:00:00']">
                            </el-date-picker>
                        </div>-->
                    </header>
                    <ul class="index-item-tipUl">
                        <li><img src="~@/assets/icon/vipTotal/vipT-xhOnce.png" alt="">会籍退款</li>
                        <li><img class="vipT-addCard" src="~@/assets/icon/vipTotal/vipT-xhPT.png" alt="">会籍转卡</li>
                        <li><img class="vipT-addCard" src="~@/assets/icon/vipTotal/vipT-addCard.png" alt="">私教退款</li>
                        <li><img class="vipT-addCard" src="~@/assets/icon/vipTotal/vipT-zkPT.png" alt="">私教转卡</li>
                    </ul>
                    <eCharts :eChartObj="comeIn" :style="styleComeIN"></eCharts>
                </div>

                <!--A5 每日客流走势-->
                <div class="index-item comein-main">
                    <header class="index-item-title flex-between">
                        <div class="title">每日客流走势</div>
                        <!--<div>
                            <span class="comeIn-title">日期筛选</span>
                            <el-date-picker
                                    @change="trueComein"
                                    v-model="dateComein"
                                    type="daterange"
                                    align="right"
                                    value-format="yyyy-MM-dd"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-time="['12:00:00', '08:00:00']">
                            </el-date-picker>
                        </div>-->
                    </header>
                    <!--<ul class="index-item-tipUl">
                        <li><img src="~@/assets/icon/icon_comeinTK.png" alt="">办卡人数</li>
                        <li><img src="~@/assets/icon/icon_comeinSJ.png" alt="">私教人数</li>
                    </ul>-->
                    <eCharts :eChartObj="comeIn" :style="styleComeIN"></eCharts>
                </div>

            </el-tab-pane>

            <!-- tabItem2 私教 -->
            <el-tab-pane label="私教" name="VipPT">

                <!--B1 私教统计-->
                <div class="index-item">
                    <header class="index-item-title">
                        <div class="title">私教统计</div>
                    </header>

                    <el-row >
                        <!--B11 上课-->
                        <el-col :md="8" class="vip-item-num">
                            <ul class="index-item-tipUl">
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-haslesson.png" alt="">已上课</li>
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-haslesson.png" alt="">未上课</li>
                            </ul>
                            <div class="flex-between">
                                <eCharts :eChartObj="chartVip" :style="styleVip"></eCharts>
                                <ul class="vipNum">
                                    <li>已上课节数： <span class="vipTipG">{{chartVip.series[0].data[0].value}}</span></li>
                                    <li>未上课节数： <span class="vipTipB">{{chartVip.series[0].data[1].value}}</span></li>
                                </ul>
                            </div>
                        </el-col>

                        <!-- B12 新增 -->
                        <el-col :md="8"  class="vip-item-num">
                            <ul class="index-item-tipUl">
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-newAdd.png" alt="">新增私教</li>
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-hasAdd.png" alt="">续课</li>
                            </ul>
                            <div class="flex-between">
                                <eCharts :eChartObj="chartVip" :style="styleVip"></eCharts>
                                <ul class="vipNum">
                                    <li>新增私教： <span class="colorYellow">{{chartVip.series[0].data[0].value}}</span></li>
                                    <li>续课： <span class="colorRed">{{chartVip.series[0].data[1].value}}</span></li>
                                </ul>
                            </div>
                        </el-col>

                        <!--B13  已跟进-->
                        <el-col :md="8"  class="vip-item-num">
                            <ul class="index-item-tipUl">
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-hasAdd.png" alt="">已跟进</li>
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-hasAdd.png" alt="">未跟进</li>
                            </ul>
                            <div class="flex-between">
                                <eCharts :eChartObj="chartVip" :style="styleVip"></eCharts>
                                <ul class="vipNum">
                                    <li>有效会员： <span class="colorRed">{{chartVip.series[0].data[0].value}}</span></li>
                                    <li>过期会员： <span class="colorBlue">{{chartVip.series[0].data[1].value}}</span></li>
                                </ul>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <!-- B2 销售额查询 -->
                <div class="index-item pt-sales">
                    <header class="index-item-title">
                        <div class="title">销售额查询</div>
                    </header>

                    <!--销售额筛选-->
                    <div class="pt-screen">
                        <!--部门-->
                        <el-select v-model="value" placeholder="请选择部门" class="inp-mar14"
                            style="width: 150px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                        <!--教练-->
                        <el-select v-model="value" placeholder="请选择教练"  class="inp-mar14"
                                   style="width: 130px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                        <!--日期选择-->
                        <el-date-picker
                                class="inp-mar14"
                                v-model="value1"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>

                        <!--搜索-->
                        <el-input placeholder="请输入内容" v-model="input3" class="inp-mar14 pt-screen-input">
                            <el-button slot="append" icon="el-icon-search" @click="searchPT"></el-button>
                        </el-input>

                    </div>

                    <!--销售额表格-->
                    <el-table
                            class="pub-table"
                            :data="PTtable"
                            border
                            :header-cell-style="tableHeaderColor">>
                        <el-table-column
                                prop="department"
                                label="部门"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="pt"
                                label="教练"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="tel"
                                label="电话">
                        </el-table-column>
                        <el-table-column
                                prop="money"
                                label="金额">
                            <template slot-scope="scope">￥{{ scope.row.money }}</template>
                        </el-table-column>
                        <el-table-column
                                prop="day"
                                label="日期">
                        </el-table-column>
                    </el-table>

                    <router-link to='/Reception/table'>
                        <el-button  class="btn-ptMore">查看更多</el-button>
                    </router-link>

                </div>

                <!-- B3 私教数量查询-->
                <div class="index-item pt-sales">
                    <header class="index-item-title">
                        <div class="title">私教数量查询</div>
                    </header>

                    <!-- 私教数量查询 筛选-->
                    <div class="pt-screen">
                        <!--部门-->
                        <el-select v-model="value" placeholder="请选择部门" class="inp-mar14"
                                   style="width: 150px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                        <!--教练-->
                        <el-select v-model="value" placeholder="请选择教练"  class="inp-mar14"
                                   style="width: 130px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                        <!--日期选择-->
                        <el-date-picker
                                class="inp-mar14"
                                v-model="value1"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>

                        <!--搜索-->
                        <el-input placeholder="请输入内容" v-model="input3" class="inp-mar14 pt-screen-input">
                            <el-button slot="append" icon="el-icon-search" @click="searchPT"></el-button>
                        </el-input>

                    </div>

                    <!--私教数量查询 表格-->
                    <el-table
                            class="pub-table"
                            :data="PTNumTable"
                            border
                            :header-cell-style="tableHeaderColor">
                        <el-table-column
                                prop="department"
                                label="部门"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="pt"
                                label="教练"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="ptContinuation"
                                label="续课">
                        </el-table-column>
                        <el-table-column
                                prop="ptTransfer"
                                label="转课">
                            <!--<template slot-scope="scope">￥{{ scope.row.money }}</template>-->
                        </el-table-column>
                        <el-table-column
                                prop="ptRefund"
                                label="退款">
                        </el-table-column>
                        <el-table-column
                                prop="ptOverdue"
                                label="过期">
                        </el-table-column>
                        <el-table-column
                                prop="ptFollow"
                                label="跟进">
                        </el-table-column>
                        <el-table-column
                                prop="ptNoFollow"
                                label="未跟进">
                        </el-table-column>
                        <el-table-column
                                prop="ptNewAdd"
                                label="新增私教">
                        </el-table-column>
                        <el-table-column
                                prop="ptTotal"
                                label="总会员数">
                        </el-table-column>
                    </el-table>

                    <router-link to='/Reception/table'>
                        <el-button  class="btn-ptMore">查看更多</el-button>
                    </router-link>

                </div>

                <!-- B4 PT上课查询-->
                <div class="index-item pt-sales">
                    <header class="index-item-title">
                        <div class="title">上课查询</div>
                    </header>

                    <eCharts :eChartObj="comeIn" :style="styleComeIN"></eCharts>

                    <eCharts :eChartObj="comeIn" :style="styleComeIN"></eCharts>

                </div>

                <!-- B5 PT会员上课详情-->
                <div class="index-item pt-sales">
                    <header class="index-item-title">
                        <div class="title">会员上课详情</div>
                    </header>

                    <!-- PT会员上课详情 筛选-->
                    <div class="pt-screen flex-between">

                        <!--搜索-->
                        <el-input placeholder="请输入内容" v-model="input3" class="inp-mar14 pt-screen-input">
                            <el-button slot="append" icon="el-icon-search" @click="searchPT"></el-button>
                        </el-input>

                        <!--日期选择-->
                        <el-date-picker
                                class=""
                                v-model="value1"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>

                    </div>

                    <!-- PT会员上课详情 表格-->
                    <el-table
                            class="pub-table"
                            :data="PptVipTable"
                            border
                            :header-cell-style="tableHeaderColor">>
                        <el-table-column
                                prop="vipName"
                                label="姓名"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="tel"
                                label="电话"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="tel"
                                label="电话">
                        </el-table-column>
                        <el-table-column
                                prop="lessonName"
                                label="课程名称">
                        </el-table-column>
                        <el-table-column
                                prop="lessonTotal"
                                label="总上课节数">
                        </el-table-column>
                        <el-table-column
                                prop="PT"
                                label="教练">
                        </el-table-column>
                        <el-table-column
                                prop="vipSex"
                                label="性别">
                        </el-table-column>
                    </el-table>

                    <router-link to='/Reception/table'>
                        <el-button  class="btn-ptMore">查看更多</el-button>
                    </router-link>

                </div>

            </el-tab-pane>

            <!-- tabItem3 会籍 -->
            <el-tab-pane label="会籍" name="VipMembership">

                <!-- C1 会籍销售额查询-->
                <div class="index-item pt-sales">
                    <header class="index-item-title">
                        <div class="title">会籍销售额查询</div>
                    </header>

                    <!--销售额筛选-->
                    <div class="pt-screen">
                        <!--部门-->
                        <el-select v-model="value" placeholder="请选择部门" class="inp-mar14"
                                   style="width: 150px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                        <!--教练-->
                        <el-select v-model="value" placeholder="请选择教练"  class="inp-mar14"
                                   style="width: 130px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                        <!--日期选择-->
                        <el-date-picker
                                class="inp-mar14"
                                v-model="value1"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>

                        <!--搜索-->
                        <el-input placeholder="请输入内容" v-model="input3" class="inp-mar14 pt-screen-input">
                            <el-button slot="append" icon="el-icon-search" @click="searchPT"></el-button>
                        </el-input>

                    </div>

                    <!--销售额表格-->
                    <el-table
                            class="pub-table"
                            :data="PTtable"
                            border
                            :header-cell-style="tableHeaderColor">>
                        <el-table-column
                                prop="department"
                                label="部门"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="pt"
                                label="教练"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="tel"
                                label="电话">
                        </el-table-column>
                        <el-table-column
                                prop="money"
                                label="金额">
                            <template slot-scope="scope">￥{{ scope.row.money }}</template>
                        </el-table-column>
                        <el-table-column
                                prop="day"
                                label="日期">
                        </el-table-column>
                    </el-table>

                    <router-link to='/Reception/table'>
                        <el-button  class="btn-ptMore">查看更多</el-button>
                    </router-link>

                </div>

                <!--C2 会籍统计-->
                <div class="index-item">
                    <header class="index-item-title">
                        <div class="title">会籍统计</div>
                    </header>

                    <el-row >
                        <!--B11 上课-->
                        <el-col :md="8" class="vip-item-num">
                            <ul class="index-item-tipUl">
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-haslesson.png" alt="">已上课</li>
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-haslesson.png" alt="">未上课</li>
                            </ul>
                            <div class="flex-between">
                                <eCharts :eChartObj="chartVip" :style="styleVip"></eCharts>
                                <ul class="vipNum">
                                    <li>已上课节数： <span class="vipTipG">{{chartVip.series[0].data[0].value}}</span></li>
                                    <li>未上课节数： <span class="vipTipB">{{chartVip.series[0].data[1].value}}</span></li>
                                </ul>
                            </div>
                        </el-col>

                        <!-- B12 新增 -->
                        <el-col :md="8"  class="vip-item-num">
                            <ul class="index-item-tipUl">
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-newAdd.png" alt="">新增私教</li>
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-hasAdd.png" alt="">续课</li>
                            </ul>
                            <div class="flex-between">
                                <eCharts :eChartObj="chartVip" :style="styleVip"></eCharts>
                                <ul class="vipNum">
                                    <li>新增私教： <span class="colorYellow">{{chartVip.series[0].data[0].value}}</span></li>
                                    <li>续课： <span class="colorRed">{{chartVip.series[0].data[1].value}}</span></li>
                                </ul>
                            </div>
                        </el-col>

                        <!--B13  已跟进-->
                        <el-col :md="8"  class="vip-item-num">
                            <ul class="index-item-tipUl">
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-hasAdd.png" alt="">已跟进</li>
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-hasAdd.png" alt="">未跟进</li>
                            </ul>
                            <div class="flex-between">
                                <eCharts :eChartObj="chartVip" :style="styleVip"></eCharts>
                                <ul class="vipNum">
                                    <li>有效会员： <span class="colorRed">{{chartVip.series[0].data[0].value}}</span></li>
                                    <li>过期会员： <span class="colorBlue">{{chartVip.series[0].data[1].value}}</span></li>
                                </ul>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <!-- C3 会籍数量查询-->
                <div class="index-item pt-sales">
                    <header class="index-item-title">
                        <div class="title">会籍数量查询</div>
                    </header>

                    <!-- C3会籍数量查询 筛选-->
                    <div class="pt-screen">
                        <!--部门-->
                        <el-select v-model="value" placeholder="请选择部门" class="inp-mar14"
                                   style="width: 150px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                        <!--教练-->
                        <el-select v-model="value" placeholder="请选择教练"  class="inp-mar14"
                                   style="width: 130px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                        <!--日期选择-->
                        <el-date-picker
                                class="inp-mar14"
                                v-model="value1"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>

                        <!--搜索-->
                        <el-input placeholder="请输入内容" v-model="input3" class="inp-mar14 pt-screen-input">
                            <el-button slot="append" icon="el-icon-search" @click="searchPT"></el-button>
                        </el-input>

                    </div>

                    <!--  C3会籍数量查询 表格-->
                    <el-table
                            class="pub-table"
                            :data="PTNumTable"
                            border
                            :header-cell-style="tableHeaderColor">
                        <el-table-column
                                prop="department"
                                label="部门"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="pt"
                                label="教练"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="ptContinuation"
                                label="续课">
                        </el-table-column>
                        <el-table-column
                                prop="ptTransfer"
                                label="转课">
                            <!--<template slot-scope="scope">￥{{ scope.row.money }}</template>-->
                        </el-table-column>
                        <el-table-column
                                prop="ptRefund"
                                label="退款">
                        </el-table-column>
                        <el-table-column
                                prop="ptOverdue"
                                label="过期">
                        </el-table-column>
                        <el-table-column
                                prop="ptFollow"
                                label="跟进">
                        </el-table-column>
                        <el-table-column
                                prop="ptNoFollow"
                                label="未跟进">
                        </el-table-column>
                        <el-table-column
                                prop="ptNewAdd"
                                label="新增私教">
                        </el-table-column>
                        <el-table-column
                                prop="ptTotal"
                                label="总会员数">
                        </el-table-column>
                    </el-table>

                    <router-link to='/Reception/table'>
                        <el-button  class="btn-ptMore">查看更多</el-button>
                    </router-link>

                </div>

                <!-- C4 会员上课详情-->
                <div class="index-item pt-sales">
                    <header class="index-item-title">
                        <div class="title">会员上课详情</div>
                    </header>

                    <!-- C4 会员上课详情 筛选-->
                    <div class="pt-screen flex-between">

                        <!--搜索-->
                        <el-input placeholder="请输入内容" v-model="input3" class="inp-mar14 pt-screen-input">
                            <el-button slot="append" icon="el-icon-search" @click="searchPT"></el-button>
                        </el-input>

                        <!--日期选择-->
                        <el-date-picker
                                class=""
                                v-model="value1"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>

                    </div>

                    <!-- C4 会员上课详情 表格-->
                    <el-table
                            class="pub-table"
                            :data="PptVipTable"
                            border
                            :header-cell-style="tableHeaderColor">>
                        <el-table-column
                                prop="vipName"
                                label="姓名"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="tel"
                                label="电话"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="tel"
                                label="电话">
                        </el-table-column>
                        <el-table-column
                                prop="lessonName"
                                label="课程名称">
                        </el-table-column>
                        <el-table-column
                                prop="lessonTotal"
                                label="总上课节数">
                        </el-table-column>
                        <el-table-column
                                prop="PT"
                                label="教练">
                        </el-table-column>
                        <el-table-column
                                prop="vipSex"
                                label="性别">
                        </el-table-column>
                    </el-table>

                    <router-link to='/Reception/table'>
                        <el-button  class="btn-ptMore">查看更多</el-button>
                    </router-link>

                </div>

            </el-tab-pane>

        </el-tabs>


    </div>
</template>

<script>

    import eCharts from '@/components/Echarts/Echarts'
    import {IndexTotal_membership,IndexNew_membership,IndexStatistics,IndexDrawer,IndexCurriculum,IndexPerformance,IndexRevenue_trend} from '@/assets/js/api'   /*引用 首页 接口*/

    export default {
        name: "Receptioncard_log",  //会员总览
        data() {
            return {
                activeName: 'VipMembership', //VipTotal VipPT VipMembership

                /* == 会员总览 == */
                /*eCharts 对应宽高*/
                styleVip: {
                    height: '220px',
                    width: '220px',
                },
                styleComeIN: {
                    height: '310px',
                    width: '100%',
                },

                /*现有会员*/
                chartVip: {
                    color: ['#FF8A7E', '#4CCBEB', '#005AD4'], //自定义的颜色
                    tooltip: {
                        trigger: 'item',
                    },
                    series: [{
                        // name: '现有会员',
                        height: '90%',
                        width: '90%',
                        left: '10%',
                        top: 0,
                        type: 'pie',
                        data: [
                            {value:'',name:""},
                            {value:'',name:""},
                            {value:'',name:""},
                        ],
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
                        }
                    }],
                },

                /*新增会员走势*/
                comeIn: {
                    color: ['#FF8A7E', '#005AD4', '#4CCBEB'], //自定义的颜色
                    tooltip: {
                        trigger: 'axis',
                    },

                    xAxis: {
                        type: 'category',
                        data: [],
                        axisLine: {
                            lineStyle: {
                                color: '#8E8E8E',
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

                    grid: {
                        top: "30px",
                        left: "80px",
                        right: "60px",
                        bottom: "40px",
                        width: "auto", //图例宽度
                        height: "80%", //图例高度

                    },
                    series: [

                        {
                            name: '团课营收',
                            type: 'line',
                            data: [],
                            symbolSize: 12,   //设定实心点的大小
                            lineStyle: {
                                normal: {
                                    type: 'dashed',
                                }
                            },
                        },
                        {
                            name: '私教营收',
                            type: 'line',
                            symbolSize: 12,   //设定实心点的大小
                            data: [],
                        },
                        {
                            name: '会籍营收',
                            symbolSize: 12,   //设定实心点的大小
                            type: 'line',
                            data: [],
                        }
                    ]
                },

                /*  == 私教 == */
                value:'',
                value1:"",
                input3:'',

                //销售额表格
                PTtable: [{
                    department: '市场部',
                    pt: '王小虎',
                    tel: '17688829466',
                    money:'574889',
                    day:'2020-02-14',
                },
                //     {
                //     department: '市场部',
                //     pt: '王小虎',
                //     tel: '17688829466',
                //     money:'574889',
                //     day:'2020-02-14',
                // }, {
                //     department: '市场部',
                //     pt: '王小虎',
                //     tel: '17688829466',
                //     money:'574889',
                //     day:'2020-02-14',
                // }, {
                //     department: '市场部',
                //     pt: '王小虎',
                //     tel: '17688829466',
                //     money:'574889',
                //     day:'2020-02-14',
                // },
                ],

                PTNumTable:[{
                    department: '市场部',
                    pt: '王小虎',
                    ptContinuation:"1",
                    ptTransfer :'1',
                    ptRefund:'1',
                    ptOverdue:'8',
                    ptFollow:'3',
                    ptNoFollow:'8',
                    ptNewAdd:'0',
                    ptTotal:'2',
                },],
                PptVipTable:[{
                    vipName: '王小虎',
                    tel:"176888294666",
                    lessonName :'1',
                    lessonTotal:'1',
                    PT:'8',
                    vipSex:'3',
                },],

                /*  == 会籍 == */

            }
        },
        methods: {

            /*tab切换*/
            handleClick(tab, event) {
                console.log(tab, event);
            },

            /*获取  现有会员 数据*/
            getTotal(){
                IndexTotal_membership().then(res => {
                    // console.log(res);
                    this.chartVip.series[0].data = res;
                }).catch(res =>{
                    console.log(res);
                });
            },

            /*获取  营收走势 新增会员走势 数据*/
            getRevenue_trend(){
                IndexRevenue_trend().then(res => {
                    // console.log(res);
                    let xArr= res[0].value.split(',');
                    this.comeIn.xAxis.data = xArr;

                    let conmArr1 = res[1].value.split(',');
                    let conmArr2 = res[2].value.split(',');
                    let conmArr3 = res[3].value.split(',');

                    this.comeIn.series[0].name = res[1].name;
                    this.comeIn.series[0].data = conmArr1;
                    this.comeIn.series[1].name = res[2].name;
                    this.comeIn.series[1].data = conmArr2;
                    this.comeIn.series[2].name = res[3].name;
                    this.comeIn.series[2].data = conmArr3;

                }).catch(res =>{
                    console.log(res);
                });
            },

            searchPT(){
              console.log(this.input3);
            },
        },
        created() {

            /*调用 现有会员 数据接口 方法*/
            this.getTotal();

            /*新增会员走势 调用*/
            this.getRevenue_trend();

        },

        components: {
            eCharts
        },
    }
</script>


<style lang="scss">
    /*引用外部css*/
    @import "@/assets/css/totalVip.scss";
    /*.vip-tabBox{*/
    /*    display: none;*/
    /*}*/
</style>