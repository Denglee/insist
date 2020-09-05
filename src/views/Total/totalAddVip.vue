<template>
    <div class="layoutR-contain animated fadeIn">
        <div class="bgWhite-public">

            <header class="index-item-title">新增会员</header>
            <div class="bgWhite-padd20">
                <div class="pt-screen">

                    <el-select  filterable v-model="searchForm.classes" placeholder="获客来源" class="ptScreen-select">
                        <el-option v-for="(item, index ) in staffClassesArr" :key="index" :label="item.name"  :value=item.value></el-option>
                    </el-select>
                </div>

                <ul class="totalAddVip-infoUl">
                    <li v-for="( item , index ) in addVipList" class="flex-between" :style="{backgroundColor: bgCcolor[index]}">
                        <div>{{item.name}}</div>
                        <div>{{item.value}}</div>
                    </li>
                </ul>

                <el-table class="pub-table" :data="tableAddVip" border>
                    <el-table-column type="index" width="55"></el-table-column>
                    <el-table-column prop="day" label="day"></el-table-column>
                    <el-table-column prop="name" label="name"></el-table-column>
                    <el-table-column prop="vip" label="vip"></el-table-column>
                    <el-table-column prop="form" label="form"></el-table-column>
                </el-table>

            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "totalAddVip",
		data() {
			return {
				staffClassesArr:[
                    {value:1, name:'传单'},
                    {value:2, name:'网诺'},
                ],

				addVipList:[
					{name:'新增会员', value:'148',},
					{name:'线上', value:'52',},
					{name:'转介绍', value:'23',},
					{name:'第三方平台', value:'23',},
					{name:'新增会员', value:'148',},
					{name:'线上', value:'52',},
					{name:'转介绍', value:'23',},
					{name:'第三方平台', value:'23',},
                ],
				tableAddVip:[
                    { day:'0920', name:'木子', vip:'vip', form:'网络', },
                    { day:'0920', name:'木子', vip:'vip', form:'网络', },
                ],

                searchForm:{
	                classes:'',
                },

				bgCcolor:['#ff8a7e','#005ad4','#00a0e9','#8763ce','#1eaaa1','#4ccbeb','#5b5ec7','#ffbe00','#ff8a7e','#005ad4','#00a0e9','#8763ce','#1eaaa1','#4ccbeb','#5b5ec7','#ffbe00'],
            }
		},
		methods: {

        },
		created() {

		},
	}
</script>
<style lang="scss">
    .totalAddVip-infoUl{
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        li{
            margin-top: 10px;
            width: 120px;
            color: #fff;
            margin-right: 10px;
            padding:6px 10px;
            border-radius: 4px;
        }
    }
</style>