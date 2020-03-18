<template>
    <div class="time-box">
        <div class="time-val flex-between">
            {{monthScreen.monthText}}
            <i class="el-icon-caret-bottom"></i>
        </div>

        <el-date-picker
                class="time-sel"
                v-model="monthScreen.monthVal"
                type="month"
                placeholder="选择月"
                value-format="yyyy年MM月"
                @change="monthSel"
                :picker-options="pickerOptions2">
        </el-date-picker>


    </div>
</template>

<script>
    export default {
        name: "monthSceen",
        data() {
            const that = this;
            return {
                monthScreen:{
                    monthVal:'',
                    monthText:'过去30天',
                    time:'30',
                    day:'',
                },
                pickerOptions2: {
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {

                                that.monthScreen = {
                                    monthVal:'',
                                    monthText:'今天',
                                    time:'2',
                                    day:'',
                                };
                                that.$emit('getMonthScreen',that.monthScreen);

                                picker.$emit("pick",[new Date(), new Date()]);
                            }
                        }, {
                            text: '昨天',
                            onClick(picker) {
                                picker.$emit("pick");
                                that.monthScreen = {
                                    monthVal:'',
                                    monthText:'昨天',
                                    time:'1',
                                    day:'',
                                };
                                that.$emit('getMonthScreen',that.monthScreen);

                            }
                        },{
                            text: '过去七天',
                            onClick(picker) {
                                that.$nextTick(() =>{
                                    picker.$emit("pick");
                                    that.monthScreen = {
                                        monthVal:'',
                                        monthText:'过去七天',
                                        time:'7',
                                        day:'',
                                    };
                                });
                                console.log(that.monthScreen);
                            }
                        }, {
                            text: '过去30天',
                            onClick(picker) {
                                picker.$emit("pick");
                                that.monthScreen = {
                                    monthVal:'',
                                    monthText:'过去30天',
                                    time:'30',
                                    day:'',
                                };
                                console.log(that.monthScreen);
                            }
                        }
                    ]
                },
            }
        },
        methods: {
           /* 月份     day:'2020-03'
            昨天     time:'1'
            今天     time:'2'
            过去7天  time:'7'
            过去30天 time:'30'*/
            monthSel(val){
                let monthVal = this.monthScreen.monthVal;
                console.log(monthVal);
                if(monthVal){
                    this.monthScreen = {
                        monthVal:val,
                        monthText:val,
                        time:'',
                        day:val,
                    };
                    this.$emit('getMonthScreen',this.monthScreen);
                }

            },
        },
        created() {

        },
    }
</script>

<style scoped lang="scss">

</style>