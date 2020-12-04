<template>
    <div class="">
        <div>
            <el-radio-group v-model="sortRadioMonth" @change="FnSortRadioChange">
                <el-radio  :label="1">{{sortClasses.year}} - {{radioMonth}}</el-radio>
                <el-radio  :label="2">下个月</el-radio>
            </el-radio-group>
        </div>
        <ul class="schedu-ul">
            <li v-for="(item,index) in updateClassesParam.data" v-if="index != 0">
                <div class="schedu-day"> 日期：{{sortClasses.month}} -{{item.day}} </div>
                <div>
                    <span class="schedu-type">课次：{{item.type}}</span>
                    <div v-if="item.is_update == false" class="schedu-classes">
                        <span v-if=" item.classes == '2' ">早班</span>
                        <span v-if=" item.classes == '3' ">中班</span>
                        <span v-if=" item.classes == '4' ">晚班</span>
                    </div>

                    <!-- 班次 -->
                    <el-select  filterable v-model="item.classes" placeholder="请选择班次" class="ptScreen-select" v-else>
                        <el-option v-for="( item, index ) in staffClassesArr" :key="item.id" :label="item.name"  :value=item.id></el-option>
                    </el-select>

                </div>
            </li>
        </ul>
        <div class="schedu-button">
            <el-button @click="closeClasses">取消</el-button>
            <el-button @click="subClasses" type="primary">提交</el-button>
        </div>

    </div>
</template>

<script>
    import {getChedulingApi, updateChedulingApi} from '../../assets/js/api'
    export default {
        name: "Scheduling",  //排班
        data() {
            return {
                sortRadioMonth:1,

                staffClassesArr:[//班次数组
                    {id:2, name:'早班'},
                    {id:3, name:'中班'},
                    {id:4, name:'晚班'},
                ],

                // 排版 数组
                sortClasses:{},

                // 获取 排版 字段
                getCheduParam:{
                    staff_id:'',
                    month:"",
                    year:"",
                },
                radioMonth:'',

                // 更新字段
                updateClassesParam: {
                    id:'',
                    data:[],
                },
             
            }
        },
        methods: {
            // api1 获取排班信息
            FnGetCheduling(){
                getChedulingApi(this.getCheduParam).then(res=>{
                    if(res.status ==1){
                        let sortData =  res.data;
                        console.log(res);
                        this.sortClasses =sortData;

                        let intData= res.data.data;
                        let arr = [
                            {},
                        ];
                        // console.log(intData);
                        for( let key  in intData){
                            arr.push({
                                classes:parseInt(intData[key].classes),
                                day:intData[key].day,
                                is_update:intData[key].is_update,
                            })
                        }
                        this.updateClassesParam = {
                            id : sortData.id,
                            data : arr,
                        }
                    }
                    if(res.status ==0){
                        this.$message({
                            message: res.info,
                            type: 'warning',
                            duration: 1500,
                            offset: 100,
                        });
                    }
                }).catch(res=>{
                    console.log(res);
                })
            },

            // api2 更新排班
            FnUpdateCheduling(){
                updateChedulingApi(this.updateClassesParam).then(res=>{
                    console.log(res);
                    if(res.status ==1){
                        this.$message({
                            message: res.info,
                            type: 'success',
                            duration: 1500,
                            offset: 100,
                        });

                        this.$emit('closeClassesDia');

                    }
                    if(res.status ==0){
                        this.$message({
                            message: res.info,
                            type: 'warning',
                            duration: 1500,
                            offset: 100,
                        });
                    }

                }).catch(res=>{
                    console.log(res);
                })
            },

            // 月份 单选时间
            FnSortRadioChange(val){
                let nowMonth = parseInt(this.$moment().format("MM"));
                let nowYear =  parseInt(this.$moment().format("YYYY"));
                if(val == 2){
                    if(nowMonth == '12'){
                        nowMonth = '01';
                        nowYear = nowYear + 1;
                    } else {
                        nowMonth ='0'+ (nowMonth + 1)  ;
                    }
                } else {
                    nowMonth ='0' +nowMonth;
                }
                console.log(nowMonth);
                console.log(nowYear);
                this.getCheduParam.month = nowMonth;
                this.getCheduParam.year = nowYear;
                this.FnGetCheduling();
            },

            // 关闭弹窗
            closeClasses(){
                this.$emit('closeClassesDia');
            },

            // 更新提交
            subClasses(){
                console.log(this.updateClassesParam);
                this.FnUpdateCheduling();
            },
        },
        created() {
            let staffId = sessionStorage.getItem('staffId')
            console.log(staffId);
            this.getCheduParam.staff_id =staffId;

            let nowMonth = parseInt(this.$moment().format("MM"));
            this.radioMonth = nowMonth;

        },
    }
</script>
