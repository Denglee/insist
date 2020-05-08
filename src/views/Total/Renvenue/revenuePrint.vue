<template>
    <div id="printTest">
        <div class="print-box">
            <div style="text-align: center;">
                <div>***********************************************</div>
                <div class="print-title">结账单</div>
                <div>***********************************************</div>
            </div>
            <ul class="item-ul">
                <li class="print-userName">
                    <div>姓名：<span> {{printArr.true_name}} </span></div>
                    <div>电话：<span>{{printArr.phone}}</span></div>
                </li>
                <li>下单时间：<span>{{printArr.pay_time}}</span></li>
                <li>订单编号：<span></span>{{printArr.order_number}}</li>
                <li>门店名称：<span></span>{{printArr.city_name}}</li>
            </ul>
            <ul class="item-ul type-four borDash">
                <li>
                    <div>消费类型</div>
                    <div>单价</div>
                    <div>数量</div>
                    <div>小计</div>
                </li>
                <li>
                    <div>{{printArr.order_type}}</div>
                    <div>{{printArr.dec_price}}</div>
                    <div>{{printArr.buy_number}}</div>
                    <div>{{printArr.dec_price}}</div>
                </li>
                <li>
                    <div></div>
                    <div>合计</div>
                    <div>{{printArr.buy_number}}</div>
                    <div>{{printArr.real_price}}</div>
                </li>
            </ul>
            <ul class="item-ul type-four">
                <li>
                    <div></div>
                    <div>标准金额</div>
                    <div></div>
                    <div>{{printArr.order_price}}</div>

                </li>
                <li>
                    <div></div>
                    <div>实收金额</div>
                    <div></div>
                    <div>{{printArr.real_price}}</div>
                </li>
            </ul>
            <div>备注：{{printArr.remark}}</div>

            <div class="welcome">*****谢谢惠顾，欢迎下次光临*****</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            printArr: {
                type: Object,
            },

        },
        name: "revenuePrint",
        data() {
            return {}
        },
        methods: {},
        created() {

        },
    }
</script>

<style lang="scss" scoped>
    #printTest {
        display: none;
    }

    @media print {
        @page {
            margin: 15mm 3mm; /* this affects the margin in the printer settings */
            color: #000000;
        }
        #printTest {
            font-family: 'Microsoft Yahei', "微软雅黑" !important;
            display: block;
            font-weight: 400;
            font-size: 16px;
            color: #000;
        }
        .print-title {
            text-align: center;
            font-size: 20px;
            margin: 14px 0;
        }
        .print-box {
            width: 94%;
            margin: 0 auto;
        }
        .print-title {
            text-align: center;
        }
        .print-userName {
            display: inline-flex;

            > div:nth-child(2) {
                margin-left: 30px;
            }
        }
        .type-four {
            width: 100%;

            div {
                display: inline-flex;
                width: 25%;
            }
        }
        .item-ul {
            padding: 10px 0;

            li {
                margin-bottom: 6px;
            }
        }
        .borDash {
            border-top: dashed 2px #000;
            border-bottom: dashed 2px #000;
        }
        .welcome {
            text-align: center;
            margin: 10px 0;

        }
    }
</style>