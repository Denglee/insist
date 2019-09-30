
var data = [

    {
        name: '前台',
        path: '/index',
        icon: "icon-home"
    },
    {
        name: '前台',
        icon: "icon-home",
        child: [
            {
                name: '会员登记',
                path: '/reception/registerRec'
            },
            {
                name: '审核卡信息',
                path: '/reception/examineRec'
            },
            {
                name: '入场查询',
                path: '/reception/queryRec',
            },
        ]
    },
    {
        name: '会员',
        icon: "icon-vip",
        child: [
            {
                name: '潜在会员',
                path: '/vip/potentialVip'
            },
            {
                name: '正式会员',
                path: '/vip/formalVip'
            },
            {
                name: '更近记录',
                path: '/vip/queryVip',
            },
        ]
    },
    {
        name: '课程',
        icon: "icon-lesson",
        child: [
            {
                name: '私教',
                path: '/course/trainerCourse'
            },
            {
                name: '团课',
                path: '/course/groupCourse'
            },
            {
                name: '训练营',
                path: '/course/campCourse',
            },
            {
                name: '培训课程',
                path: '/reception/trainCourse'
            },
            {
                name: '评价管理',
                path: '/reception/evaluateCourse',
            },
        ]
    },
    {
        name:"合同",
        icon:"icon_staff",
        child:[
            {
                name:'期限合同',
                path:'/contract/termContract'
            }
        ]
    },
    {
        name:"员工",
        icon:"icon_staff",
        child:[
            {
                name:'员工列表',
                path:'/staff/staffList'
            }
        ]
    },
    {
        name: '统计',
        icon: "icon-statistics",
        child: [
            {
                name: '会员卡记录',
                path: '/statistics/vipCardSta'
            },
            {
                name: '客流',
                path: '/statistics/flowSta',
            },
            {
                name: '私教业绩',
                path: '/statistics/trainerSta'
            },
            {
                name: '会籍业绩',
                path: '/statistics/vipSta',
            },
        ]
    },


]

export default [{
    path: '/user/navlist',
    data: data
}]
