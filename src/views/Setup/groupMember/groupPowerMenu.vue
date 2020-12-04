<template>
    <div>
        <el-tabs :tab-position="tabPosition" style="min-height: 200px;" class="tab-power">
            <!--<el-tab-pane label="配置管理">

                <el-tree
                        :data="data"
                        show-checkbox
                        default-expand-all
                        node-key="id"
                        ref="tree"
                        highlight-current
                        :props="defaultProps">
                </el-tree>

            </el-tab-pane>-->
            <el-tab-pane v-for="(item,index) in TreeData" :label="item.label" :key="index">

                <div v-for="(firstItem, firIndex) in item.firstchild" :key="firIndex" class="power-container power-one" >
                    <div v-if="firstItem.secendchild">
                        <h4 class="power-title">er - {{firstItem.label}}</h4>

                        <ul class="power-box  power-two-box">

                            <li v-for="(secItem, secIndex) in firstItem.secendchild" :key="secIndex" class="power-container power-two">
                                <h4 class="power-title  power-two-title">san - {{secItem.label}}</h4>


                                <ol class="power-box power-three-box">
                                    <li v-for="(thirdItem, thirdIndex) in secItem.thirdchild" :key="thirdIndex" class="power-container power-three"
                                        v-if="thirdItem.fourthchild">
                                        <h4 class="power-title  power-three-title">si - {{thirdItem.label}}</h4>

                                        <ul class="power-box power-four-box">
                                            <li v-for="(fourthItem, fourthIndex) in thirdItem.fourthchild" :key="fourthIndex"
                                                class="power-container power-four" v-if="fourthItem.fivechild">

                                                <h4 class="power-title  power-five-title">wu - {{fourthItem.label}}</h4>

                                                <ul class="power-box power-five-box">
                                                    <li v-for="(fiveItem, fiveIndex) in fourthItem.fivechild" :key="fiveIndex"
                                                        class="power-container" v-if="fourthItem.fivechild">
                                                        <el-checkbox-group v-model="formAddNew.consume_type" class="inpStaffTel">
                                                            <el-checkbox name="consumeType" v-for="(item,index) in consumeType" :label="item.id" :key="index">
                                                                {{item.name}}
                                                            </el-checkbox>
                                                        </el-checkbox-group>
                                                    </li>
                                                    <li v-else>
                                                        <!--{{fourthItem}}-->
                                                        <el-checkbox-group v-model="formAddNew.consume_type" class="inpStaffTel">
                                                            <el-checkbox name="consumeType" v-for="(item,index) in consumeType" :label="item.id" :key="index">
                                                                {{item.name}}
                                                            </el-checkbox>
                                                        </el-checkbox-group>
                                                    </li>
                                                </ul>

                                            </li>
                                            <li v-else class="power-container power-three">
                                                <!--{{thirdItem}}-->
                                                <h4 class="power-title  power-five-title">wu - {{fourthItem.label}}</h4>
                                                <div>
                                                    <el-checkbox-group v-model="formAddNew.consume_type" class="inpStaffTel">
                                                        <el-checkbox name="consumeType" v-for="(item,index) in consumeType" :label="item.id" :key="index">
                                                            {{item.name}}
                                                        </el-checkbox>
                                                    </el-checkbox-group>
                                                </div>

                                            </li>
                                        </ul>

                                    </li>
                                    <li v-else class="power-container power-three">
                                        <!--{{secItem}}-->
                                        <h4 class="power-title  power-three-title">si - {{thirdItem.label}}</h4>
                                        <el-checkbox-group v-model="formAddNew.consume_type" class="inpStaffTel">
                                            <el-checkbox name="consumeType" v-for="(item,index) in consumeType" :label="item.id" :key="index">
                                                {{item.name}}
                                            </el-checkbox>
                                        </el-checkbox-group>
                                    </li>
                                </ol>

                            </li>
                            <li class="power-container power-two">
                                <!-- {{firstItem}}-->
                                <h4 class="power-title  power-three-title">si - {{firstItem.label}}</h4>
                                <el-checkbox-group v-model="formAddNew.consume_type" class="inpStaffTel">
                                    <el-checkbox name="consumeType" v-for="(item,index) in consumeType" :label="item.id" :key="index">
                                        {{item.name}}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </li>
                        </ul>
                    </div>
                    <div v-else class="power-container power-one">
                        {{item}}
                    </div>
                </div>

            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "groupPowerMenu",   //菜单权限
        data() {
            return {
                formAddNew:{
                    consume_type:[],
                },
                consumeType:[
                    {id:'1', name:'私教'},
                    {id:'2', name:'会籍'},
                    {id:'3', name:'次卡'},
                    {id:'4', name:'期限'},
                ],

                tabPosition: 'left',

                TreeData: [
                    {
                        id: 1,
                        label: '一级 1',
                        firstchild: [
                            {
                                id: 11,
                                label: '二级 1-1',
                                secendchild: [
                                    {
                                        id: 111,
                                        label: '三级 1-1-1',
                                        thirdchild: [
                                            {
                                                id: 1111,
                                                label: '四级 4-1-1',
                                                fourthchild: [
                                                    {
                                                        id: 11111,
                                                        label: '五级 5-1-1',
                                                        fivechild: [
                                                            {
                                                                id: 11111,
                                                                label: '六级 5-1-1'
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        id: 11112,
                                                        label: '五级 5-1-2',
                                                        fivechild: [
                                                            {
                                                                id: 11111,
                                                                label: '六级 5-1-1'
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        id: 11112,
                                                        label: '五级 5-1-3'
                                                    },
                                                    {
                                                        id: 11113,
                                                        label: '五级 5-1-4'
                                                    }
                                                ],

                                            },
                                            {
                                                id: 1112,
                                                label: '四级 4-1-2',
                                                fourthchild: [
                                                    {
                                                        id: 11121,
                                                        label: '五级 5-2-1',
                                                        fivechild: [
                                                            {
                                                                id: 11111,
                                                                label: '六级 5-1-1'
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        id: 11122,
                                                        label: '五级 5-2-2'
                                                    },

                                                ],
                                            }
                                        ]
                                    },
                                    {
                                        id: 111,
                                        label: '三级 1-1-1',
                                        thirdchild: [
                                            {
                                                id: 1111,
                                                label: '四级 4-1-1',
                                                // fourthchild: [
                                                //     {
                                                //         id: 11111,
                                                //         label: '五级 5-1-1'
                                                //     },
                                                //     {
                                                //         id: 11112,
                                                //         label: '五级 5-1-2'
                                                //     },
                                                //     {
                                                //         id: 11112,
                                                //         label: '五级 5-1-3'
                                                //     },
                                                //     {
                                                //         id: 11113,
                                                //         label: '五级 5-1-4'
                                                //     }
                                                // ],

                                            },
                                            {
                                                id: 1112,
                                                label: '四级 4-1-2',
                                                fourthchild: [
                                                    {
                                                        id: 11121,
                                                        label: '五级 5-2-1'
                                                    },
                                                    {
                                                        id: 11122,
                                                        label: '五级 5-2-2'
                                                    },

                                                ],
                                            }
                                        ]
                                    },
                                ],
                            },
                            {
                                id: 11,
                                label: '二级 1-1',
                                secendchild: [
                                    {
                                        id: 111,
                                        label: '三级 1-1-1',
                                        thirdchild: [
                                            {
                                                id: 1111,
                                                label: '四级 4-1-1',
                                                fourthchild: [
                                                    {
                                                        id: 11111,
                                                        label: '五级 5-1-1'
                                                    },
                                                    {
                                                        id: 11112,
                                                        label: '五级 5-1-2'
                                                    },
                                                    {
                                                        id: 11112,
                                                        label: '五级 5-1-3'
                                                    },
                                                    {
                                                        id: 11113,
                                                        label: '五级 5-1-4'
                                                    }
                                                ],

                                            },
                                            {
                                                id: 1112,
                                                label: '四级 4-1-2',
                                                fourthchild: [
                                                    {
                                                        id: 11121,
                                                        label: '五级 5-2-1'
                                                    },
                                                    {
                                                        id: 11122,
                                                        label: '五级 5-2-2'
                                                    },

                                                ],
                                            }
                                        ]
                                    },
                                    {
                                        id: 10,
                                        label: '三级 1-1-2',
                                        thirdchild: [
                                            {
                                                id: 1111,
                                                label: '四级 4-1-1',
                                                // fourthchild: [
                                                //     {
                                                //         id: 11111,
                                                //         label: '五级 5-1-1'
                                                //     },
                                                //     {
                                                //         id: 11112,
                                                //         label: '五级 5-1-2'
                                                //     },
                                                //     {
                                                //         id: 11112,
                                                //         label: '五级 5-1-3'
                                                //     },
                                                //     {
                                                //         id: 11113,
                                                //         label: '五级 5-1-4'
                                                //     }
                                                // ],

                                            },
                                            {
                                                id: 1112,
                                                label: '四级 4-1-2',
                                                // fourthchild: [
                                                //     {
                                                //         id: 11121,
                                                //         label: '五级 5-2-1'
                                                //     },
                                                //     {
                                                //         id: 11122,
                                                //         label: '五级 5-2-2'
                                                //     },
                                                //
                                                // ],
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                    },


                    // {
                    //     id: 2,
                    //     label: '一级 2',
                    //     child: [
                    //         {
                    //             id: 5,
                    //             label: '二级 2-1'
                    //         }, {
                    //             id: 6,
                    //             label: '二级 2-2'
                    //         }
                    //     ]
                    // },
                    // {
                    //     id: 3,
                    //     label: '一级 3',
                    //     child: [
                    //         {
                    //             id: 7,
                    //             label: '二级 3-1'
                    //         }, {
                    //             id: 8,
                    //             label: '二级 3-2'
                    //         }
                    //     ]
                    // }
                ],

            }
        },
        methods: {},
        created() {

        },
    }
</script>
