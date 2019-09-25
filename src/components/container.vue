<template>
    <div class="aside">
        <div class="box cl Flex">
            <!-- 侧边栏导航 -->
            <aside class="cl">
                <!--我的信息-->
                <div class='wisdom' v-bind:class="!isCollapse ? 'between' : 'center'">
                    <p v-bind:class="isCollapse ? 'center' : 'none'">MES</p>
                    <P v-bind:class="!isCollapse ? 'between' : 'center'" v-if="!isCollapse" class='zhihuiguanli'>后台管理系统</P>
                </div>
                <div
                        class="demo-basic--circle Flex"
                        v-bind:class="!isCollapse ? 'between' : 'center'"
                        style="padding:0.05rem 2%;">
                    <div class="block">
                        <el-avatar :size="40" :src="circleUrl"></el-avatar>
                    </div>
                    <div style v-if="!isCollapse">
                        <p class="name">{{Person.name}}</p>
                        <p>
                            <i class="el-fontzhongduanzaixianguanli icon iconfont"></i>
                            <span>{{Person.condition}}</span>
                        </p>
                    </div>
                </div>
                <!--侧边导航-->
                <el-menu
                    v-bind:default-active="asideDefaultSelected"
                    class="el-menu-vertical-demo  navigation"
                    background-color="#5BC2AD"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    @open="handleOpen"
                    @close="handleClose"
                    :collapse="isCollapse"
                >
                    <div
                            :menuData="onemenu"
                            :icon="onemenu.icon"
                            :default-active='activeIndex'
                            :totalKey="index"
                            v-for="(onemenu, index) in asideData"
                            :key="onemenu.value"
                            :to="onemenu.path"
                            @addAside="addAside"
                    >
                        {{onemenu.title}}
                    </div>
                </el-menu>
            </aside>
            <section class=" w1">
                <!-- 横向导航 -->
                <header class="cl Flex between">
                    <div class="trans" style="">
                        <el-radio-group v-model="isCollapse" style="">
                            <el-radio-button :label="false" v-show='isCollapse'><i class='el-icon-s-unfold'></i></el-radio-button>
                            <el-radio-button :label="true" v-show='!isCollapse'><i class='el-icon-s-fold'></i></el-radio-button>
                        </el-radio-group>
                    </div>
                    <!-- 消息提示 -->
                </header>
                <nav class="Flex ">
                    <div class="Flex w1">
                        <div class="add addindex">
                            <router-link to="home">默认首页</router-link>
                        </div>
                        <div class="nowrap w1">
                            <div
                                    class="add wome "
                                    v-for="(aside, key) in headerData"
                                    :key="aside.value"
                                    v-bind:class="headerSelected == aside.title ? 'selected' : ''"
                                    @click="selectedAsideMenu(aside)"
                            >
                                {{ aside.title }}
                                <i class="el-icon-close" @click="deleteAside(key)"></i>
                            </div>
                        </div>
                    </div>
                    <!-- 页签操作 -->
                </nav>
                <!-- 中间内容 -->
                <router-view></router-view>
            </section>
        </div>
    </div>
</template>



<script>

    export default {
        name: "navLeft",
        data() {
            return {
                isCollapse: true,
                circleUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                activeIndex: "1",
                // 个人信息
                Person:{
                    name: '犬夜叉',
                    date: '12',
                    condition: '在线'
                },
                // 菜单栏默认选中
                asideDefaultSelected: "0-0-1",
                //  添加导航
                asideData: [
                    {
                        title: "实时监控",
                        icon:"el-icon-data-line",
                        children: [
                            {
                                title: '模型版本',
                                icon: '',
                                children:[
                                    {
                                        title: '模型版本——1',
                                        icon: '',
                                        path: '/home'
                                    },
                                    {
                                        title: '模型版本——2',
                                        icon: '',
                                        path: '/home'
                                    },
                                ]
                            },
                            {
                                title: "我的试验系统系统",
                                icon: '',
                                path: '/home',
                            },
                        ]
                    },
                    {
                        title: "我们",
                        path: '/home',
                    },
                ],
                // 存放空的数组
                headerData: [],
                // 存放选中的数组
                headerSelected: "",
            }
        },

        methods: {
// 点击侧边栏菜单 添加到头部
            addAside(data, key) {
                // 判断添加的是否存在如果不存在添加
                const has = this.headerData.find(item => item.title == data.title);
                if (!has) {
                    data.key = key;
                    this.headerData.push(data);
                }
                this.headerSelected = data.title;
            },
            // 新增加的数组删除
            deleteAside(key) {
                this.headerData.splice(key, 1);
            },
            // 点击头部菜单 反向选中 侧边栏menu
            selectedAsideMenu(selected) {
                this.asideDefaultSelected = selected.key
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },

        }
    };
</script>

<style scoped lang="scss">
    @import "../assets/css/nav.scss";
</style>