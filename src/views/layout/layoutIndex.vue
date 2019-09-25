<template>
<div></div>
</template>

<script>
    import {navIndex} from "../../assets/js/api"


    export default {
        name: "layoutIndex",
        data() {
            return {
                navSubActive:0,  //控制子导航显示的值 index

                // 导航集合
                navArr:[
                    {
                        sub_items: [
                            {
                                can_read: true,
                                description: "首页1",
                                for_admin: true,
                                for_other: false,
                                has_permission: true,
                                key: "manage_members",
                                module_type: 1,
                                name: "一的子导航1",
                                path: "/firstItem",
                                icon: "icon-home"
                            },
                            {
                                can_read: true,
                                description: "首页2",
                                for_admin: true,
                                for_other: false,
                                has_permission: true,
                                key: "manage_members",
                                module_type: 1,
                                name: "一的子导航2",
                                path: "/firstItem",
                                icon: "icon-home"
                            }
                        ],
                        title: "首页",
                        icon: "icon-home"
                    },
                    {
                        sub_items: [
                            {
                                can_read: true,
                                description: "查看会员列表",
                                for_admin: true,
                                for_other: false,
                                has_permission: true,
                                key: "manage_members",
                                module_type: 2,
                                name: "健身服务子导航1",
                                path: "/secondMain",
                                icon: "icon-user"
                            },
                        ],
                        title: "健身服务",
                        icon: "icon-user"
                    },
                    {
                        sub_items: [
                            {
                                can_read: true,
                                description: "查看会员列表",
                                for_admin: true,
                                for_other: false,
                                has_permission: true,
                                key: "manage_members",
                                module_type: 3,
                                name: "系统设置子导航",
                                path: "/thirdIndex",
                                icon: "icon-user"
                            },
                        ],
                        title: "系统设置",
                        icon: "icon-home"
                    }
                ]
            };
        },

        methods: {

            // 鼠标移入 相应二级导航显示
            navSubIn(index){
                let that = this;
                console.log(index);
                that.navSubActive=index;
            },

            // 鼠标移出，隐藏二级导航
            navSubOut(){
                let that = this;
                setTimeout(function(){
                    that.navSubActive=-1;
                },1000);
            },
        },
        created() {
            // navIndex().then( res=> {
            //     console.log(res)   // 成功回调
            // });

        }
    }
</script>

<style scoped lang="scss">

    .navActive{
        color: #ffa300;
    }

</style>