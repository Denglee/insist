
var data = [

    {
        path: '/home',
        name: '首页',
        icon: "icon-home"
    },
    {
        name: '前台',
        icon: "icon-home",
        child: [
            {
                name: '会员登记',
                path: '/reception/register'
            },
            {
                name: '入场查询',
                path: '/reception/query',
                // child: [
                //     {
                //         path: '/components/permission',
                //         name: '详细鉴权'
                //     },
                //     {
                //         path: '/components/pageTable',
                //         name: '表格分页'
                //     }
                // ]
            },
           /* {
                name: '会员',
                icon: "icon-vip2",
                path: '/reception/register',
                // child: [
                //     {
                //         path: '/components/pageTitle',
                //         name: '页面标题'
                //     },
                //     {
                //         path: '/components/pageSection',
                //         name: '子区域'
                //     },
                //     {
                //         path: '/components/pageSearch',
                //         name: '搜索条'
                //     },
                //     {
                //         path: '/components/pageToolbar',
                //         name: '工具条'
                //     }
                // ]
            },
            {
                name: '辅助类',
                path: '/components/pageNotes',
                // child: [
                //     {
                //         path: '/components/pageNotes',
                //         name: '引用说明'
                //     }
                // ]
            }*/
        ]
    },
    {
        name: '会员',
        icon: "icon-vip2",
        child: [
            {
                path: '/vip/officialVip',
                name: '正式会员',
                permission: ['edit']
            },
            {
                path: '/example/charts',
                name: '图表页面'
            },
            {
                path: '/example/map',
                name: '地图页面'
            }
        ]
    },
    {
        path: '/course/trainer',
        name: '课程',
        icon: "icon-news_icon",
    },
    // {
    //     path: '/theme',
    //     name: '主题切换'
    // }
]

export default [{
    path: '/user/navlist',
    data: data
}]
