const Layout = () => import( '../components/layout/Layout')

const staticRoute = [
    {
        path: '/',
        redirect: '/index',
        component: Layout,
    },
    {
        path: '/index',
        name: '首页',
        icon: "icon-home",
        component: Layout,
    },

    {
        name: '前台',
        icon: "icon-home",
        path:'reception',
        component: Layout,
        child: [
            {
                name: '会员登记1',
                path: '/reception/register',
                component:() => import('@/views/reception/register.vue'),
            },
            {
                name: '入场查询',
                path: '/reception/query',
                component:() => import('@/views/reception/query.vue'),
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
 /*   {
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
    },*/
    //
    // {
    //     path: '/error',
    //     component: () => import(/* webpackChunkName: 'error' */ '@/views/error'),
    //     children: [
    //         {
    //             path: '401',
    //             component: () => import(/* webpackChunkName: 'error' */ '@/views/error/401')
    //         },
    //         {
    //             path: '403',
    //             component: () => import(/* webpackChunkName: 'error' */ '@/views/error/403')
    //         },
    //         {
    //             path: '404',
    //             component: () => import(/* webpackChunkName: 'error' */ '@/views/error/404')
    //         },
    //         {
    //             path: '500',
    //             component: () => import(/* webpackChunkName: 'error' */ '@/views/error/500')
    //         }
    //     ]
    // },
    // {
    //     path: '/login',
    //     component: () => import(/* webpackChunkName: 'login' */ '@/views/login')
    // },
    // {
    //     path: '/home',
    //     component: Layout,
    //
    // },
    // {
    //     path: '/components',
    //     component: Layout,
    //     children: [
    //         {
    //             path: '',
    //             component: () => import(/* webpackChunkName: 'components' */ '@/views/components')
    //         },
    //         {
    //             path: 'pageNotes',
    //             component: () => import(/* webpackChunkName: 'components' */ '@/views/components/assist/pageNotes')
    //         },
    //         {
    //             path: 'permission',
    //             component: () => import(/* webpackChunkName: 'components' */ '@/views/components/function/permission')
    //         },
    //         {
    //             path: 'pageTable',
    //             component: () => import(/* webpackChunkName: 'components' */ '@/views/components/function/pageTable')
    //         },
    //         {
    //             path: 'pageSearch',
    //             component: () => import(/* webpackChunkName: 'components' */ '@/views/components/ui/pageSearch')
    //         },
    //         {
    //             path: 'pageSection',
    //             component: () => import(/* webpackChunkName: 'components' */ '@/views/components/ui/pageSection')
    //         },
    //         {
    //             path: 'pageTitle',
    //             component: () => import(/* webpackChunkName: 'components' */ '@/views/components/ui/pageTitle')
    //         },
    //         {
    //             path: 'pageToolbar',
    //             component: () => import(/* webpackChunkName: 'components' */ '@/views/components/ui/pageToolbar')
    //         }
    //     ]
    // },
    // {
    //     // path: '/example',
    //     component: Layout,
    //     children: [
    //         {
    //             path: '/reception/query',
    //             component: () => import(/* webpackChunkName: 'example' */ '@/views/reception/query')
    //         },
    //         {
    //             path: 'charts',
    //             component: () => import(/* webpackChunkName: 'example' */ '@/views/example/charts')
    //         },
    //         {
    //             path: 'map',
    //             component: () => import(/* webpackChunkName: 'example' */ '@/views/example/map')
    //         }
    //     ]
    // },
    // {
    //     path: '/i18n',
    //     component: Layout,
    //     children: [
    //         {
    //             path: '',
    //             component: () => import(/* webpackChunkName: 'i18n' */ '@/views/i18n')
    //         }
    //     ]
    // },
    // {
    //     path: '/theme',
    //     component: Layout,
    //     children: [
    //         {
    //             path: '',
    //             component: () => import(/* webpackChunkName: 'themeChange' */ '@/views/themeChange')
    //         }
    //     ]
    // },
    // {
    //     path: '*',
    //     redirect: '/error/404'
    // }
]

export default staticRoute
