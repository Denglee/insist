const Layout = () => import( '@/components/layout/Layout')

const staticRoute = [
    {
        path: '/',
        redirect: '/index',
        component: Layout,
    },
    {
        name: '首页',
        path: '/index',
        icon: "icon-home",
        component: Layout,
        children:[
            {
                path: '',
                component: () => import( '@/views/index/index')
            },
        ]
    },
    {
        name:'前台',
        path: '/reception',
        component: Layout,
        children: [
            {
                path: 'registerRec',
                component: () => import( '@/views/reception/registerRec')
            },
            {
                path: 'examineRec',
                component: () => import( '@/views/reception/examineRec')
            },
            {
                path: 'queryRec',
                component: () => import( '@/views/reception/queryRec')
            },

        ]
    },
    {
        name:'会员',
        path: '/vip',
        component: Layout,
        children: [
            {
                path: 'potentialVip',
                component: () => import( '@/views/vip/potentialVip')
            },
            {
                path: 'formalVip',
                component: () => import( '@/views/vip/formalVip')
            },
            {
                path: 'queryVip',
                component: () => import( '@/views/vip/queryVip')
            },

        ]
    },
    {
        name:'课程',
        path: '/course',
        component: Layout,
        children: [
            {
                path: 'trainerCourse',
                component: () => import( '@/views/course/trainerCourse')
            },
            {
                path: 'groupCourse',
                component: () => import( '@/views/course/groupCourse')
            },
            {
                path: 'campCourse',
                component: () => import( '@/views/course/campCourse')
            },
            {
                path: 'trainCourse',
                component: () => import( '@/views/course/trainCourse')
            },
            {
                path: 'evaluateCourse',
                component: () => import( '@/views/course/evaluateCourse')
            },

        ]
    },
    {
        name:'合同',
        path: '/contract',
        component: Layout,
        children: [
            {
                path: 'termContract',
                component: () => import( '@/views/contract/termContract')
            },
        ]
    },
    {
        name:'员工',
        path: '/staff',
        component: Layout,
        children: [
            {
                path: 'staffList',
                component: () => import( '@/views/staff/staffList')
            },
        ]
    },
    {
        name:'统计',
        path: '/statistics',
        component: Layout,
        children: [
            {
                path: 'vipCardSta',
                component: () => import( '@/views/statistics/vipCardSta')
            },
            {
                path: 'flowSta',
                component: () => import( '@/views/statistics/flowSta')
            },
            {
                path: 'trainerSta',
                component: () => import( '@/views/statistics/trainerSta')
            },
            {
                path: 'vipSta',
                component: () => import( '@/views/statistics/vipSta')
            },
        ]
    },
    {
        path: '/error',
        component: () => import(/* webpackChunkName: 'error' */ '@/views/error'),
        children: [
            {
                path: '401',
                component: () => import(/* webpackChunkName: 'error' */ '@/views/error/401')
            },
            {
                path: '403',
                component: () => import(/* webpackChunkName: 'error' */ '@/views/error/403')
            },
            {
                path: '404',
                component: () => import(/* webpackChunkName: 'error' */ '@/views/error/404')
            },
            {
                path: '500',
                component: () => import(/* webpackChunkName: 'error' */ '@/views/error/500')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/login')
    },
    {
        path: '*',
        redirect: '/error/404'
    }
]

export default staticRoute
