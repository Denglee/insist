<template>
    <div class="total-vipBox">
        <!--会员卡记录-->
        <!--<publicIframe/>-->

        <!--选项卡-->
        <el-tabs v-model="activeName" @tab-click="handleClick" class="vip-tabBox pubWidth" v-show="tabPaneState">

            <!--  tabItem1 会员总览 -->
            <el-tab-pane :lazy='tabLazy' label="会员总览" name="VipTotal">

                <!-- A1  会员数量-->
                <el-row :gutter="30" class="index-row">

                    <!--会员数量-->
                    <el-col :md="16" :lg="16">
                        <div class="index-item">
                            <header class="index-item-title">
                                <div class="title">会员数量</div>
                            </header>

                            <el-row>
                                <!--潜在会员-->
                                <el-col :md="12" class="vip-item-num">
                                    <ul class="index-item-tipUl">
                                        <li><img src="~@/assets/icon/vipTotal/vipT-potential.png" alt="">潜在会员</li>
                                        <li><img src="~@/assets/icon/vipTotal/vipT-formal.png" alt="">正式会员</li>
                                    </ul>
                                    <div class="flex-between">
                                        <eCharts :eChartObj="totalVipNum" :style="styleVip"></eCharts>
                                        <ul class="vipNum">
                                            <li>潜在会员： <span
                                                    class="vipTipG">{{totalVipNum.series[0].data[0].value}}</span></li>
                                            <li>正式会员： <span
                                                    class="vipTipB">{{totalVipNum.series[0].data[1].value}}</span></li>
                                        </ul>
                                    </div>
                                </el-col>

                                <!--有效会员-->
                                <el-col :md="12" class="vip-item-num">
                                    <ul class="index-item-tipUl">
                                        <li><img src="~@/assets/icon/vipTotal/vipT-effective.png" alt="">有效会员</li>
                                        <li><img src="~@/assets/icon/vipTotal/vipT-overdue.png" alt="">过期会员</li>
                                    </ul>
                                    <div class="flex-between">
                                        <eCharts :eChartObj="totalVipOverdue" :style="styleVip"></eCharts>
                                        <ul class="vipNum">
                                            <li>有效会员： <span class="colorYellow">{{totalVipOverdue.series[0].data[0].value}}</span>
                                            </li>
                                            <li>过期会员： <span
                                                    class="colorRed">{{totalVipOverdue.series[0].data[1].value}}</span>
                                            </li>
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
                                <span class="num">{{totalVipPT}}</span>
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
                    <eCharts :eChartObj="totalNewAdd" :style="styleComeIN"></eCharts>
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
                    <eCharts :eChartObj="totalConsumeTrend" :style="styleComeIN"></eCharts>
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
                    <eCharts :eChartObj="totalRefundTrend" :style="styleComeIN"></eCharts>
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
                    <eCharts :eChartObj="totalPassengerTrend" :style="styleComeIN"></eCharts>
                </div>

            </el-tab-pane>

            <!-- tabItem2 私教 -->
            <el-tab-pane :lazy='tabLazy' label="私教" name="VipPT">

                <!--B1 私教统计-->
                <div class="index-item">
                    <header class="index-item-title">
                        <div class="title">私教统计</div>
                    </header>
                    <el-row>
                        <!--B11 私教上课-->
                        <el-col :md="8" class="vip-item-num">
                            <ul class="index-item-tipUl">
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-haslesson.png" alt="">已上课
                                </li>
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-haslesson.png" alt="">未上课
                                </li>
                            </ul>
                            <div class="flex-between">
                                <eCharts :eChartObj="PTLesson" :style="styleVip"></eCharts>
                                <ul class="vipNum">
                                    <li>已上课节数： <span class="vipTipG">{{PTLesson.series[0].data[0].value}}</span></li>
                                    <li>未上课节数： <span class="vipTipB">{{PTLesson.series[0].data[1].value}}</span></li>
                                </ul>
                            </div>
                        </el-col>

                        <!-- B12 私教新增 -->
                        <el-col :md="8" class="vip-item-num">
                            <ul class="index-item-tipUl">
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-newAdd.png" alt="">新增私教
                                </li>
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-hasAdd.png" alt="">续课
                                </li>
                            </ul>
                            <div class="flex-between">
                                <eCharts :eChartObj="PTAdd" :style="styleVip"></eCharts>
                                <ul class="vipNum">
                                    <li>新增私教： <span class="colorYellow">{{PTAdd.series[0].data[0].value}}</span></li>
                                    <li>续课： <span class="colorRed">{{PTAdd.series[0].data[1].value}}</span></li>
                                </ul>
                            </div>
                        </el-col>

                        <!--B13  私教已跟进-->
                        <el-col :md="8" class="vip-item-num">
                            <ul class="index-item-tipUl">
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-hasAdd.png" alt="">已跟进
                                </li>
                                <li><img class="icon-PTtotal" src="~@/assets/icon/vipTotal/vipT-haslesson.png" alt="">未跟进
                                </li>
                            </ul>
                            <div class="flex-between">
                                <eCharts :eChartObj="PTFollow" :style="stylePTFollow" class="echart-ptFpllow"></eCharts>
                                <ul class="vipNum">
                                    <li>已跟进： <span class="colorRed">{{PTFollow.series[0].data[0].value}}</span></li>
                                    <li>未跟进： <span class="colorBlue">{{PTFollow.series[0].data[1].value}}</span></li>
                                </ul>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <!-- B2 私教销售额查询 -->
                <div class="index-item pt-sales">
                    <header class="index-item-title">
                        <div class="title">销售额查询</div>
                    </header>

                    <!--私教销售额筛选-->
                    <div class="pt-screen">
                        <!--部门-->
                        <el-select v-model="value" placeholder="请选择部门" class="pt-screen-item"
                                   style="width: 150px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                        <!--私教教练-->
                        <el-select v-model="value" placeholder="请选择教练" class="pt-screen-item"
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
                                class="pt-screen-item"
                                v-model="value1"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>

                        <!--搜索-->
                        <el-input placeholder="请输入内容" v-model="input3" class="pt-screen-item pt-screen-input">
                            <el-button slot="append" icon="el-icon-search" @click="searchPT"></el-button>
                        </el-input>

                    </div>

                    <!--销售额表格-->
                    <el-table
                            class="pt-table"
                            border
                            :data="PTtable">
                        <el-table-column
                                prop="department"
                                label="部门">
                        </el-table-column>
                        <el-table-column
                                prop="pt"
                                label="教练">
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

                    <div class="ptTable-assist">
                        <el-pagination
                                background
                                layout="prev, pager, next,total"
                                :total="20">
                        </el-pagination>

                        <el-button class="btn-ptMore" @click="btnTotalMore('tabPaneState','ptSalesD')">查看更多</el-button>
                    </div>

                </div>

                <!-- B3 私教数量查询-->
                <div class="index-item pt-sales">
                    <header class="index-item-title">
                        <div class="title">私教数量查询</div>
                    </header>

                    <!-- 私教数量查询 筛选-->
                    <div class="pt-screen">
                        <!--部门-->
                        <el-select v-model="value" placeholder="请选择部门" class="pt-screen-item"
                                   style="width: 150px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                        <!--教练-->
                        <el-select v-model="value" placeholder="请选择教练" class="pt-screen-item"
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
                                class="pt-screen-item"
                                v-model="value1"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>

                        <!--搜索-->
                        <el-input placeholder="请输入内容" v-model="input3" class="pt-screen-item pt-screen-input">
                            <el-button slot="append" icon="el-icon-search" @click="searchPT"></el-button>
                        </el-input>

                    </div>

                    <!--私教数量查询 表格-->
                    <el-table
                            class="pt-table"
                            :data="PTNumTable"
                            border>
                        <el-table-column
                                prop="department"
                                label="部门">
                        </el-table-column>
                        <el-table-column
                                prop="pt"
                                label="教练">
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

                    <div class="ptTable-assist">
                        <el-pagination
                                background
                                layout="prev, pager, next,total"
                                :total="20">
                        </el-pagination>


                        <el-button class="btn-ptMore" @click="btnTotalMore('tabPaneState','ptNumD')">查看更多</el-button>

                    </div>

                </div>

                <!-- B4 私教上课查询-->
                <div class="index-item pt-sales">
                    <header class="index-item-title">
                        <div class="title">上课查询</div>
                    </header>

                    <eCharts :eChartObj="comeIn" :style="styleComeIN"></eCharts>

                    <eCharts :eChartObj="comeIn" :style="styleComeIN"></eCharts>

                </div>

                <!-- B5 私教会员上课详情-->
                <div class="index-item pt-sales">
                    <header class="index-item-title">
                        <div class="title">会员上课详情</div>
                    </header>
                    <!-- 私教会员上课详情 筛选-->
                    <div class="pt-screen flex-between">
                        <!--搜索-->
                        <el-input placeholder="请输入内容" v-model="input3"
                                  class="pt-screen-item pt-screen-input">
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
                            class="pt-table"
                            :data="PTVipTable"
                            border>
                        <el-table-column
                                prop="vipName"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="tel"
                                label="电话">
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

                    <div class="ptTable-assist">
                        <el-pagination
                                background
                                layout="prev, pager, next,total"
                                :total="20">
                        </el-pagination>


                        <el-button class="btn-ptMore" @click="btnTotalMore('tabPaneState','ptLessonD')">查看更多</el-button>

                    </div>

                </div>

            </el-tab-pane>


        </el-tabs>

        <!--私教销售额查询 表格 详情-->
        <div v-show="ptSalesD">
            <navBread @GoBack="goBack('VipPT','ptSalesD')" breadTitle="私教" breadContent1="销售额查询详情"></navBread>
            <div class="ptTable-detail vip-tabBox pubWidth">
                <!-- B2 销售额查询 -->
                <div class="index-item ">
                    <header class="index-item-title">
                        <div class="title">私教销售额查询</div>
                    </header>
                    <!--销售额筛选-->
                    <div class="pt-screen">
                        <!--部门-->
                        <el-select v-model="value" placeholder="请选择部门"
                                   class="pt-screen-item"
                                   style="width: 150px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <!--教练-->
                        <el-select v-model="value" placeholder="请选择教练"
                                   class="pt-screen-item"
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
                                class="pt-screen-item"
                                v-model="value1"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                        <!--搜索-->
                        <el-input placeholder="请输入内容" v-model="input3" class="pt-screen-item pt-screen-input">
                            <el-button slot="append" icon="el-icon-search" @click="searchPT"></el-button>
                        </el-input>
                    </div>
                    <!--销售额表格-->
                    <el-table
                            class="pt-table"
                            :data="PTtable"
                            border>
                        <el-table-column
                                prop="department"
                                label="部门">
                        </el-table-column>
                        <el-table-column
                                prop="pt"
                                label="教练">
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
                    <div class="ptTable-assist">
                        <el-pagination
                                background
                                layout="prev, pager, next,total"
                                :total="20">
                        </el-pagination>
                        <!--<router-link to="/Reception/table">走吧</router-link>-->
                    </div>

                </div>
            </div>
        </div>

        <!--私教数量查询 表格 详情-->
        <div v-show="ptNumD">
            <navBread @GoBack="goBack('VipPT','ptNumD')" breadTitle="私教" breadContent1="销售数量查询"></navBread>
            <div class="ptTable-detail vip-tabBox pubWidth">
                私教数量查询
            </div>
        </div>

        <!--私教会员上课详情 表格 详情-->
        <div v-show="ptLessonD">
            <navBread @GoBack="goBack('VipPT','ptLessonD')" breadTitle="私教" breadContent1="会员上课详情"></navBread>
            <div class="ptTable-detail vip-tabBox pubWidth">
                私教会员上课
            </div>
        </div>

        <!--会籍销售额查询 表格 详情-->
        <div v-show="vSalesD">
            <navBread @GoBack="goBack('VipMembership','vSalesD')" breadTitle="会籍" breadContent1="销售额查询详情"></navBread>
            <div class="ptTable-detail vip-tabBox pubWidth">
                <!-- B2 销售额查询 -->
                <div class="index-item ">
                    <header class="index-item-title">
                        <div class="title">会籍销售额查询</div>
                    </header>
                    <!--销售额筛选-->
                    <div class="pt-screen">
                        <!--部门-->
                        <el-select v-model="value" placeholder="请选择部门" class="pt-screen-item"
                                   style="width: 150px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <!--教练-->
                        <el-select v-model="value" placeholder="请选择教练" class="pt-screen-item"
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
                                class="pt-screen-item"
                                v-model="value1"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                        <!--搜索-->
                        <el-input placeholder="请输入内容" v-model="input3" class="pt-screen-item pt-screen-input">
                            <el-button slot="append" icon="el-icon-search" @click="searchPT"></el-button>
                        </el-input>
                    </div>
                    <!--销售额表格-->
                    <el-table
                            class="pt-table"
                            :data="PTtable"
                            border>
                        <el-table-column
                                prop="department"
                                label="部门">
                        </el-table-column>
                        <el-table-column
                                prop="pt"
                                label="教练">
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
                    <div class="ptTable-assist">
                        <el-pagination
                                background
                                layout="prev, pager, next,total"
                                :total="20">
                        </el-pagination>
                        <!--<router-link to="/Reception/table">走吧</router-link>-->
                    </div>

                </div>
            </div>
        </div>

        <!--会籍数量查询 表格 详情-->
        <div v-show="vNumD">
            <navBread @GoBack="goBack('VipMembership','vNumD')" breadTitle="会籍" breadContent1="数量查询"></navBread>
            <div class="ptTable-detail vip-tabBox pubWidth">
                会籍数量查询
            </div>
        </div>

        <!--会籍会员上课详情 表格 详情-->
        <div v-show="vLessonD">
            <navBread @GoBack="goBack('VipMembership','vLessonD')" breadTitle="会籍" breadContent1="会员上课详情"></navBread>
            <div class="ptTable-detail vip-tabBox pubWidth">
                会籍会员上课
            </div>
        </div>


    </div>

</template>

<script>

    import eCharts from '@/components/Echarts/Echarts'
    import navBread from '@/components/Echarts/navBread'
    import {
        PTprivateMember,
        totalMember_number,
        totalMember_trend,
        totalPassenger_trend,
        totalRefund_trend,
        totalSub_card_trend
    } from '@/assets/js/api' /*引用 会员总览 接口*/ /*引用 会员总览 接口*/

    export default {
        name: "Receptionoverview",  //会员总览
        data() {
            return {
                activeName: 'VipPT', //VipTotal VipPT VipMembership

                tabLazy: true,
                /* == 会员总览 eCharts 对应宽高 == */
                styleVip: {
                    height: '180px',
                    width: '180px',
                },
                stylePTFollow: {
                    height: '130px',
                    width: '130px',
                },
                styleComeIN: {
                    height: '310px',
                    width: '100%',
                },

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
                            {value: '', name: ""},
                            {value: '', name: ""},
                            {value: '', name: ""},
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

                /*会员总览1  会员数量 潜在 正式*/
                totalVipNum: {
                    color: ['#4CCBEB', '#005AD4'], //自定义的颜色
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
                            {value: '', name: ""},
                            {value: '', name: ""},
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

                /*会员总览1  会员数量 有效  过期*/
                totalVipOverdue: {
                    color: ['#FFBE00', '#FF8A7E', '#4CCBEB', '#005AD4'], //自定义的颜色
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
                            {value: '', name: ""},
                            {value: '', name: ""},
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
                totalVipPT: 0,

                /*会员总览2 新增会员走势*/
                totalNewAdd: {
                    color: ['#FF8A7E', '#005AD4', '#4CCBEB'], //自定义的颜色
                    tooltip: {
                        trigger: 'axis',
                    },
                    grid: {
                        // show:true,//是否显示直角坐标系网格。[ default: false ]
                        // borderColor:"#c45455",//网格的边框颜色
                        top: "30px",
                        left: "80px",
                        right: "60px",
                        bottom: "40px",
                        width: "auto", //图例宽度
                        height: "80%", //图例高度
                    },

                    xAxis: {
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
                            // margin:15,
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

                    series: [
                        {
                            name: '办卡人数',
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
                            name: '私教人数',
                            type: 'line',
                            symbolSize: 12,   //设定实心点的大小
                            data: [],
                        },

                    ]
                },

                /*会员总览3 消耗趋势*/
                totalConsumeTrend: {
                    color: ['#4CCBEB', '#005AD4'], //自定义的颜色
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
                            name: '次卡',
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
                            name: '私教',
                            type: 'line',
                            symbolSize: 12,   //设定实心点的大小
                            data: [],
                        },

                    ]
                },

                /*会员总览4 转卡退款人数走势*/
                totalRefundTrend: {
                    color: ['#4CCBEB', '#005AD4', '#FF8A7E', '#FFBE00'], //自定义的颜色
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },

                    xAxis: {
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
                            // margin:15,
                            textStyle: {
                                color: "#000000"
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
                            name: '会籍退款',
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
                            name: '会籍转卡',
                            type: 'line',
                            symbolSize: 12,   //设定实心点的大小
                            data: [],
                        },
                        {
                            name: '私教退款',
                            symbolSize: 12,   //设定实心点的大小
                            type: 'line',
                            data: [],
                        },
                        {
                            name: '私教转卡',
                            symbolSize: 12,   //设定实心点的大小
                            type: 'line',
                            data: [],
                        },
                    ]
                },

                /*会员总览5 每日客流走势*/
                totalPassengerTrend: {
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
                            name: '客流趋势',
                            type: 'line',
                            data: [],
                            symbolSize: 12,   //设定实心点的大小
                            lineStyle: {
                                normal: {
                                    type: 'dashed',
                                }
                            },
                        },
                    ]
                },

                /*私教1、私教统计 */
                tabPaneState: true,    //tab 显隐
                ptSalesD: false,  //销售查询表格 显隐
                ptNumD: false,
                ptLessonD: false,
                vSalesD: false,
                vNumD: false,
                vLessonD: false,

                PTLesson: {
                    color: ['#4CCBEB', '#005AD4'], //自定义的颜色
                    tooltip: {
                        trigger: 'item',
                    },
                    series: [{
                        // name: '现有会员',
                        height: '100%',
                        width: '100%',
                        left: '0%',
                        top: '0%',
                        type: 'pie',
                        data: [
                            {value: '', name: ""},
                            {value: '', name: ""},
                            {value: '', name: ""},
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

                PTAdd: {
                    color: ['#FFBE00', '#FF8A7E', '#4CCBEB', '#005AD4'], //自定义的颜色
                    tooltip: {
                        trigger: 'item',
                    },
                    series: [{
                        // name: '现有会员',
                        height: '100%',
                        width: '100%',
                        left: '0%',
                        top: '0%',
                        type: 'pie',
                        data: [
                            {value: '', name: ""},
                            {value: '', name: ""},
                            {value: '', name: ""},
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

                PTFollow: {
                    color: ['#FF8A7E', '#005AD4',], //自定义的颜色
                    tooltip: {
                        trigger: 'item',
                    },
                    series: [{
                        // name: '现有会员',
                        height: '100%',
                        width: '100%',
                        left: '0%',
                        top: '0%',
                        radius: ['100%', '80%'],
                        type: 'pie',
                        data: [
                            {value: '', name: ""},
                            {value: '', name: ""},
                            {value: '', name: ""},
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
                value: '',
                value1: "",
                input3: '',

                //销售额表格
                PTtable: [{
                    department: '市场部',
                    pt: '王小虎',
                    tel: '17688829466',
                    money: '574889',
                    day: '2020-02-14',
                },
                ],

                PTNumTable: [{
                    department: '市场部',
                    pt: '王小虎',
                    ptContinuation: "1",
                    ptTransfer: '1',
                    ptRefund: '1',
                    ptOverdue: '8',
                    ptFollow: '3',
                    ptNoFollow: '8',
                    ptNewAdd: '0',
                    ptTotal: '2',
                },],
                PTVipTable: [{
                    vipName: '王小虎',
                    tel: "176888294666",
                    lessonName: '1',
                    lessonTotal: '1',
                    PT: '8',
                    vipSex: '3',
                },],

                options: [],
                value: '',

                /*  == 会籍 == */

            }
        },
        methods: {

            /*tab切换*/
            handleClick(tab, event) {
                // console.log(tab, event);
            },

            /* ==== 会员总览 ==== 接口1 获取数量 totalMember_number*/
            getTotalMember_number() {
                totalMember_number().then(res => {

                    /*潜在 与 正式 会员*/
                    let MemberNum = [];
                    let MemberNum1 = res[0];
                    let MemberNum2 = res[1];
                    MemberNum.push(MemberNum1, MemberNum2);
                    // console.log(MemberNum);
                    this.totalVipNum.series[0].data = MemberNum;

                    /*有效 与 过期 会员*/
                    let OverdueNum = [];
                    let OverdueNum1 = res[2];
                    let OverdueNum2 = res[3];
                    OverdueNum.push(OverdueNum1, OverdueNum2);
                    this.totalVipOverdue.series[0].data = OverdueNum;

                    /*私教会员*/
                    this.totalVipPT = res[4].value;

                }).catch(res => {
                    console.log(res);
                });
            },

            /*会员总览 接口2 新增会员走势 totalMember_trend*/
            getTotalMember_trend() {
                totalMember_trend().then(res => {
                    // console.log(res);

                    this.totalNewAdd.xAxis.data = res[0].value.split(',');
                    this.totalNewAdd.series[0].name = res[1].name;
                    this.totalNewAdd.series[0].data = res[1].value.split(',');

                    this.totalNewAdd.series[1].name = res[2].name;
                    this.totalNewAdd.series[1].data = res[2].value.split(',');

                    // let conmArr11 = '100,200,400,100,255,700,800,688,454,1547,145,448,859,664,771,954,147,548,1974,1475,1457,114,784,800,688,454,1547,145,448,859';
                    // let conmArr12 = '744,1445,100,200,400,100,255,700,800,688,454,1547,145,448,859,664,771,954,147,548,1974,1475,1457,800,688,454,1547,145,448,859';
                    // let conmArr1 = conmArr11.split(',');
                    // let conmArr2 = conmArr12.split(',');


                }).catch(res => {
                    console.log(res);
                });
            },

            /*会员总览 接口3 消耗趋势 totalSub_card_trend*/
            getTotalSub_card_trend() {
                totalSub_card_trend().then(res => {
                    // console.log(res);

                    this.totalConsumeTrend.xAxis.data = res[0].value.split(',');
                    this.totalConsumeTrend.series[0].name = res[1].name;
                    this.totalConsumeTrend.series[0].data = res[1].value.split(',');

                    this.totalConsumeTrend.series[1].name = res[2].name;
                    this.totalConsumeTrend.series[1].data = res[2].value.split(',');

                }).catch(res => {
                    console.log(res);
                });
            },

            /*会员总览 接口4 退款,转让走势  totalRefund_trend*/
            getTotalRefund_trend() {
                totalRefund_trend().then(res => {
                    // console.log(res);
                    this.totalRefundTrend.xAxis.data = res[0].value.split(',');
                    this.totalRefundTrend.series[0].name = res[1].name;
                    this.totalRefundTrend.series[0].data = res[1].value.split(',');

                    this.totalRefundTrend.series[1].name = res[2].name;
                    this.totalRefundTrend.series[1].data = res[2].value.split(',');

                    this.totalRefundTrend.series[2].name = res[3].name;
                    this.totalRefundTrend.series[2].data = res[3].value.split(',');

                    this.totalRefundTrend.series[3].name = res[4].name;
                    this.totalRefundTrend.series[3].data = res[4].value.split(',');

                }).catch(res => {
                    console.log(res);
                });
            },

            /*会员总览 接口5 客流走势 totalPassenger_trend*/
            getTotalPassenger_trend() {
                totalPassenger_trend().then(res => {
                    // console.log(res);

                    this.totalPassengerTrend.xAxis.data = res[0].value.split(',');
                    this.totalPassengerTrend.series[0].name = res[1].name;
                    this.totalPassengerTrend.series[0].data = res[1].value.split(',');

                }).catch(res => {
                    console.log(res);
                });
            },


            /* ==== 私教 接口1 私教统计 ==== */
            getPTprivateMember() {
                PTprivateMember().then(res => {
                    // console.log(res);

                    /* 已上课 与 未上课 */
                    let ptLesson = [];
                    let ptHasLesson = res[0];
                    let ptNoLesson = res[1];
                    ptLesson.push(ptHasLesson, ptNoLesson);
                    // console.log(ptLesson);
                    this.PTLesson.series[0].data = ptLesson;

                    /*新增私教 与 续课*/
                    let ptAdd = [];
                    let ptNewAdd1 = res[2];
                    let ptContinue = res[3];
                    ptAdd.push(ptNewAdd1, ptContinue);
                    // console.log(ptLesson);
                    this.PTAdd.series[0].data = ptLesson;

                    /*已跟进 与 未跟进*/
                    let ptFollow = [];
                    let ptHaveFollow = res[4];
                    let ptNoFollow = res[5];
                    ptFollow.push(ptHaveFollow, ptNoFollow);
                    // console.log(ptFollow);
                    this.PTFollow.series[0].data = ptFollow;


                }).catch(res => {
                    console.log(res);
                });
            },

            /*搜索*/
            searchPT() {
                console.log(this.input3);
            },

            /* 查看更多 */
            btnTotalMore(e1, e2) {
                console.log(e1);

                this[e1] = false;    //tab隐藏
                this[e2] = true;  //表格显示
            },

            /* 返回上一页 */
            goBack(e1, e2) {
                console.log(e1);

                this[e2] = false;   //隐藏当前 表格详情
                this.tabPaneState = true; //显示对应tab
                this.activeName = e1; //VipTotal VipPT VipMembership
            },

            /* ==== 会籍 接口1 销售额查询 ==== */


        },
        created() {
            /*调用 ==== 会员总览1 ==== 会员数量*/
            this.getTotalMember_number();

            /*调用 会员总览2 新增会员走势*/
            this.getTotalMember_trend();

            /*调用 会员总览3 消耗趋势*/
            this.getTotalSub_card_trend();

            /*调用 会员总览4 退款,转让走势*/
            this.getTotalRefund_trend();

            /*调用 会员总览5 客流走势*/
            this.getTotalPassenger_trend();


            /*调用 ==== 私教1 ==== 私教统计*/
            this.getPTprivateMember();


            /* /!*调用 现有会员 数据接口 方法*!/
             this.getTotal();

             /!*新增会员走势 调用*!/
             this.getRevenue_trend();*/

        },

        components: {
            eCharts,
            navBread,
        },
    }
</script>


<style lang="scss">
    /*引用外部css*/
    @import "@/assets/css/totalVip.scss";
    /*.vip-tabBox{*/
    /*    display: none;*/
    /*}*/
    /*表格详情 查看更多*/
    .ptTable-detail {
        padding: 20px;
        background-color: #efeef5;
        min-height: calc(100vh - 200px);
        border-radius: 20px;
        margin-top: 2px;

        .el-page-header {
            margin-bottom: 20px;
        }

        .pt-sales {
            padding: 20px;
        }
    }

    @media all and (max-width: 1440px) {
        .vip-tabBox {
            .pt-screen-item {
                width: 300px;
            }

            .pt-screen-input {
                width: 260px;
            }
        }
    }

</style>