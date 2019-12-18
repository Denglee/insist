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
        children: [
            {
                path: '',
                component: () => import( '@/views/Index/index')
            },
        ]
    },
    {
        name: '前台',
        path: '/Reception',
        component: Layout,
        children: [
            {
                path: 'index',   //会员登记
                name: '会员登记',
                component: () => import( '@/views/Reception/Receptionindex'),
                meta:{
                    title: '会员登记'
                },
            },
            {
                path: 'entrance', //入场查询
                name: '入场查询',
                component: () => import( '@/views/Reception/Receptionentrance'),
                meta:{
                    title: '入场查询'
                },
            },

        ]
    },
    {
        name: '会员',
        path: '/Member',
        component: Layout,
        children: [
            {
                path: 'check_card',  //审核卡信息
                name: '审核卡信息',
                component: () => import( '@/views/Reception/Membercheck_card'),
                meta:{
                    title: '审核卡信息'
                },
            },
            {
                path: 'index',   //潜在会员
                name: '潜在会员',
                component: () => import( '@/views/Member/Memberindex')
            },
            {
                path: 'real_member', //正式会员
                name: '正式会员',
                component: () => import( '@/views/Member/Memberreal_member')
            },
            {
                path: 'follow_log',  //跟进记录
                name:'跟进记录',
                component: () => import( '@/views/Member/Memberfollow_log')
            },
        ]
    },
    {
        name: '课程',
        path: '/Course',
        component: Layout,
        children: [
            {
                path: '/Bespeakindex',  //私教
                name: 'Bespeakindex',
                component: () => import( '@/views/Course/Bespeakindex')
            },
            {
                path: '/Courseindex',  //团课
                name: 'Courseindex',
                component: () => import( '@/views/Course/Courseindex')
            },
            {
                path: 'train_camp', //训练营
                name: 'Coursetrain_camp',
                component: () => import( '@/views/Course/Coursetrain_camp')
            },
            {
                path: 'train_course',  //培训课程
                name: 'Coursetrain_course',
                component: () => import( '@/views/Course/Coursetrain_course')
            },
            {
                path: 'appraise',  //评价管理
                name: 'Bespeakappraise',
                component: () => import( '@/views/Course/Bespeakappraise')
            },
        ]
    },
    {
        name: '合同',
        path: '/Member',
        component: Layout,
        children: [
            {
                path: '/hy_card',   //期限合同 /次卡合同
                name: 'Memberhy_card',
                component: () => import( '@/views/Member/Memberhy_card')
            },
            {
                path: '/Memberhy_card1', //次卡合同
                name:'Memberhy_card1',
                component: () => import( '@/views/Member/Memberhy_card1')
            },
            {
                path: '/hy_card2',  //私教合同
                name: 'Memberhy_card2',
                component: () => import( '@/views/Member/Memberhy_card2')
            },
            {
                path: '/shipindex',  //会籍卡设置
                name: 'Membershipindex',
                component: () => import( '@/views/Member/Membershipindex')
            },
            {
                path: '/contract_list',  //定金合同
                name: 'Membercontract_list',
                component: () => import( '@/views/Member/Membercontract_list')
            },
            {
                path: '/history_card',  //历史合同
                name: 'Memberhistory_card',
                component: () => import( '@/views/Member/Memberhistory_card')
            },
            {
                path: 'ya_money',   //押金合同
                name: 'Memberya_money',
                component: () => import( '@/views/Member/Memberya_money')
            },
            {
                path: 'hy_card4',   //滑雪合同
                name: 'Memberhy_card4',
                component: () => import( '@/views/Member/Memberhy_card4')
            },
            {
                path: 'rent_cabinet',   //租柜合同
                name: 'Memberrent_cabinet',
                component: () => import( '@/views/Member/Memberrent_cabinet')
            },
            {
                path: 'cabinet_deposit',   //租柜押金
                name: 'Membercabinet_deposit',
                component: () => import( '@/views/Member/Membercabinet_deposit')
            },
        ]
    },
    {
        name: '员工',
        path: '/Staff',
        component: Layout,
        children: [
            {
                path: '/Staffindex',   //员工列表
                name: 'Staffindex',
                component: () => import( '@/views/Staff/Staffindex')
            },
            {
                path: '/Staffsignin',   //员工签到
                name: 'Staffsignin',
                component: () => import( '@/views/Staff/Staffsignin')
            },
            {
                path: '/Receptionentrance_staff',   //员工签到
                name: 'Receptionentrance_staff',
                component: () => import( '@/views/Staff/Receptionentrance_staff')
            },
        ]
    },
    {
        name: '统计',
        path: '/Total',
        component: Layout,
        children: [
            {
                path: '/card_log',  //会员卡记录
                name: 'Receptioncard_log',
                component: () => import( '@/views/Total/Receptioncard_log')
            },
            {
                path: '/Statshop',  //客流
                name: 'Statshop',
                component: () => import( '@/views/Total/Statshop')
            },
            {
                path: '/Statwater',  //营收流水
                name: 'Statwater',
                component: () => import( '@/views/Total/Statwater')
            },
            {
                path: '/Statachievement',  //私教业绩
                name: 'Statachievement',
                component: () => import( '@/views/Total/Statachievement')
            },
            // {
            //     path: '/Statachievement',  //会籍业绩
            //     name:'Statachievement',
            //     component: () => import( '@/views/Total/Statachievement')
            // },
            {
                path: '/Statcontract_stat',  //合同张数统计
                name: 'Statcontract_stat',
                component: () => import( '@/views/Total/Statcontract_stat')
            },
            {
                path: '/Statcikawater',  //次卡流水
                name: 'Statcikawater',
                component: () => import( '@/views/Total/Statcikawater')
            },
            {
                path: '/Statsijiaowater',  //私教卡流水
                name: 'Statsijiaowater',
                component: () => import( '@/views/Total/Statsijiaowater')
            },
            {
                path: '/Statachievement_log',  //会籍业绩流水报表
                name: 'Statachievement_log',
                component: () => import( '@/views/Total/Statachievement_log')
            },
            {
                path: '/Statsj_achievement_log',  //私教业绩流水报表
                name: 'Statsj_achievement_log',
                component: () => import( '@/views/Total/Statsj_achievement_log')
            },
            {
                path: '/Cardcard_list',  //卡号设置
                name: 'Cardcard_list',
                component: () => import( '@/views/Total/Cardcard_list')
            },
            {
                path: '/Statentrance_info',  //客流详情
                name: 'Statentrance_info',
                component: () => import( '@/views/Total/Statentrance_info')
            },
            {
                path: '/Statpay_type',  //支付统计
                name: 'Statpay_type',
                component: () => import( '@/views/Total/Statpay_type')
            },
            {
                path: '/Memberstatistics',  //会员详情
                name: 'Memberstatistics',
                component: () => import( '@/views/Total/Memberstatistics')
            },
            {
                path: '/Statcoach_count',  //教练上私教课统计
                name: 'Statcoach_count',
                component: () => import( '@/views/Total/Statcoach_count')
            },
            {
                path: '/Stathxwater',  //储值卡流水
                name: 'Stathxwater',
                component: () => import( '@/views/Total/Stathxwater')
            },
            {
                path: '/Memberexpire_reminder',  //到期提醒
                name: 'Memberexpire_reminder',
                component: () => import( '@/views/Total/Memberexpire_reminder')
            },
            {
                path: '/Statlazy',  //懒惰提醒
                name: 'Statlazy',
                component: () => import( '@/views/Total/Statlazy')
            },
            {
                path: '/Eigenmemstime',  //运动时长排名
                name: 'Eigenmemstime',
                component: () => import( '@/views/Total/Eigenmemstime')
            },
            {
                path: '/Statanalyze',  //业绩分析
                name: 'Statanalyze',
                component: () => import( '@/views/Total/Statanalyze')
            },
        ]
    },
    {
        name: '设置',
        path: '/Setup',
        icon: "icon-home",
        component: Layout,
        children: [
            {
                path: '/Groupindex',  //角色管理
                name: 'Groupindex',
                component: () => import( '@/views/Setup/Groupindex')
            },
            {
                path: '/Userindex',  //后台管理员
                name: 'Userindex',
                component: () => import( '@/views/Setup/Userindex')
            },
            {
                path: '/Citymanageindex',  //企业信息
                name: 'Citymanageindex',
                component: () => import( '@/views/Setup/Citymanageindex')
            },
            {
                path: '/Menuindex',  //系统菜单
                name: 'Menuindex',
                component: () => import( '@/views/Setup/Menuindex')
            },
            {
                path: '/Configsite',  //站点配置
                name: 'Configsite',
                component: () => import( '@/views/Setup/Configsite')
            },
            {
                path: '/Systemoperation',  //操作日志
                name: 'Systemoperation',
                component: () => import( '@/views/Setup/Systemoperation')
            },
            {
                path: '/Systemloginlog',  //登陆日志
                name: 'Systemloginlog',
                component: () => import( '@/views/Setup/Systemloginlog')
            },
            {
                path: '/Authindex',  //权限管理
                name: 'Authindex',
                component: () => import( '@/views/Setup/Authindex')
            },
            {
                path: '/IndexclearCache',  //更新缓存
                name: 'IndexclearCache',
                component: () => import( '@/views/Setup/IndexclearCache')
            },
            {
                path: '/Systemimport',  //数据导入
                name: 'Systemimport',
                component: () => import( '@/views/Setup/Systemimport')
            },
            {
                path: '/Eigentemp_list',  //模板设置
                name: 'Eigentemp_list',
                component: () => import( '@/views/Setup/Eigentemp_list')
            },
            {
                path: '/Citymanagemarketing',  //企业设置
                name: 'Citymanagemarketing',
                component: () => import( '@/views/Setup/Citymanagemarketing')
            },
            {
                path: '/Memberthrough_card',  //审核冻结卡申请
                name: 'Memberthrough_card',
                component: () => import( '@/views/Setup/Memberthrough_card')
            },
            {
                path: '/Locationindex',  //区域对照表
                name: 'Locationindex',
                component: () => import( '@/views/Setup/Locationindex')
            },
            {
                path: '/Eigenexplain',  //文档编辑
                name: 'Eigenexplain',
                component: () => import( '@/views/Setup/Eigenexplain')
            },
            {
                path: '/Explainindex',  //操作说明
                name: 'Explainindex',
                component: () => import( '@/views/Setup/Explainindex')
            },
            {
                path: '/Citymanagewxpush',  //微信推送
                name: 'Citymanagewxpush',
                component: () => import( '@/views/Setup/Citymanagewxpush')
            },
            {
                path: '/Citymanagerenew',  //企业合同
                name: 'Citymanagerenew',
                component: () => import( '@/views/Setup/Citymanagerenew')
            },
            {
                path: '/Citymanagefeedback',  //场馆留言
                name: 'Citymanagefeedback',
                component: () => import( '@/views/Setup/Citymanagefeedback')
            },
        ]
    },
    {
        name: '终端',
        path: '/Equipment',
        icon: "icon-home",
        component: Layout,
        children: [
            {
                path: '/anageterminal', //前台一体机
                name: 'Devicemanageterminal',
                component: () => import( '@/views/Equipment/anageterminal')
            },
            {
                path: '/managewardrobe',  //更衣柜
                name: 'Devicemanagewardrobe',
                component: () => import( '@/views/Equipment/managewardrobe')
            },
            {
                path: '/managegatelist',  //闸机
                name: 'Devicemanagegatelist',
                component: () => import( '@/views/Equipment/managegatelist')
            },
            {
                path: '/manageentrance_guard',   //门禁
                name: 'Devicemanageentrance_guard',
                component: () => import( '@/views/Equipment/manageentrance_guard')
            },
            {
                path: '/manageswitching',   //智能开关
                name: 'Devicemanageswitching',
                component: () => import( '@/views/Equipment/manageswitching')
            },
            {
                path: '/managewater',   //智能水控
                name: 'Devicemanagewater',
                component: () => import( '@/views/Equipment/managewater')
            },
            {
                path: '/Devicemanageai',   //AI数据中心
                name: 'Devicemanageai',
                component: () => import( '@/views/Equipment/Devicemanageai')
            },
            {
                path: '/managebracelet',   //手环终端
                name: 'Devicemanagebracelet',
                component: () => import( '@/views/Equipment/managebracelet')
            },
        ]
    },
    {
        name: '项目',
        path: '/project',
        icon: "icon-home",
        component: Layout,
        children: [
            {
                path: '/Xbproject', //项目列表
                name: 'Xbproject',
                component: () => import( '@/views/Project/Xbproject')
            },
        ]
    },
    // {
    //     name: '会员',
    //     path: '/Menber',
    //     icon: "icon-home",
    //     component: Layout,
    //     children: [
    //         {
    //             path: '/Xbmember',  //会员管理
    //             name: 'Xbmember',
    //             component: () => import( '@/views/Menber/Xbmember')
    //         },
    //     ]
    // },
    {
        name: '个人',
        path: '/Personal',
        icon: "icon-home",
        component: Layout,
        children: [
            {
                path: '/PersonalIndex',  //个人
                name: 'PersonalIndex',
                component: () => import( '@/views/Personal/PersonalIndex')
            },
        ]
    },
    {
        name: '消费',
        path: '/Consume',
        icon: "icon-home",
        component: Layout,
        children: [
            {
                path: '/Xbconsume', //会员消费
                name: 'Xbconsume',
                component: () => import( '@/views/Consume/Xbconsume')
            },
            {
                path: '/Xbwater', //营收流水
                name: 'Xbwater',
                component: () => import( '@/views/Consume/Xbwater')
            },
        ]
    },
    {
        name: '商品',
        path: '/Goods',
        icon: "icon-home",
        component: Layout,
        children: [
            {
                path: '/Goodsmanageindex', //商品列表
                name: 'Goodsmanageindex',
                component: () => import( '@/views/Goods/Goodsmanageindex')
            },
            {
                path: '/Shopcateindex', //商品分类
                name: 'Shopcateindex',
                component: () => import( '@/views/Goods/Shopcateindex')
            },
            {
                path: '/Goodsmanageoorder', //商城订单
                name: 'Goodsmanageoorder',
                component: () => import( '@/views/Goods/Goodsmanageoorder')
            },
            {
                path: '/Goodsmanagecomplaint', //用户有话
                name: 'Goodsmanagecomplaint',
                component: () => import( '@/views/Goods/Goodsmanagecomplaint')
            },

        ]
    },
    {
        name: '收款',
        path: '/Receivables',
        icon: "icon-home",
        component: Layout,
        children: [
            {
                path: '/ReceivablesIndex',  //收款
                name: 'ReceivablesIndex',
                component: () => import( '@/views/Receivables/ReceivablesIndex')
            },
        ]
    },

    {
        name: '服务',
        path: '/Server',
        icon: "icon-home",
        component: Layout,
        children: [
            {
                path: '/Serverindex',  //节日祝福
                name: 'Serverindex',
                component: () => import( '@/views/Service/Serverindex')
            },
            {
                path: '/Questionnaireindex',  //市场调查
                name: 'Questionnaireindex',
                component: () => import( '@/views/Service/Questionnaireindex')
            },
        ]
    },

    {
        name: '营销',
        path: '/Market',
        icon: "icon-home",
        component: Layout,
        children: [
            {
                path: '/Membermarketing', //会籍分销
                name: 'Membermarketing',
                component: () => import( '@/views/Market/Membermarketing')
            },
            {
                path: '/Membermarketing2', //会员营销排行
                name: 'Membermarketing2',
                component: () => import( '@/views/Market/Membermarketing2')
            },
            {
                path: '/Eigenstaffreferrer', //员工营销排行
                name: 'Eigenstaffreferrer',
                component: () => import( '@/views/Market/Eigenstaffreferrer')
            },
            {
                path: '/Lotterybanner', //抽奖管理
                name: 'Lotterybanner',
                component: () => import( '@/views/Market/Lotterybanner')
            },
            {
                path: '/Lotteryprize_list', //中奖名单
                name: 'Lotteryprize_list',
                component: () => import( '@/views/Market/Lotteryprize_list')
            },
        ]
    },
    {
        name: '识别',
        path: '/Eigen',
        icon: "icon-home",
        component: Layout,
        children: [
            {
                path: '/Eigenface', //人脸识别数据
                name: 'Eigenface',
                component: () => import( '@/views/Eigen/Eigenface')
            },
            {
                path: '/Eigenfinger', //指静脉识别数据
                name: 'Eigenfinger',
                component: () => import( '@/views/Eigen/Eigenfinger')
            },
        ]
    },
    {
        name: '场馆',
        path: '/Venue',
        icon: "icon-home",
        component: Layout,
        children: [
            {
                path: '/Venueindex',  //场馆设置
                name: 'Venueindex',
                component: () => import( '@/views/Venue/Venueindex')
            },
        ]
    },

    {
        path: '/Error',
        component: () => import(/* webpackChunkName: 'Error' */ '@/views/Error'),
        children: [
            {
                path: '401',
                component: () => import(/* webpackChunkName: 'Error' */ '@/views/Error/401')
            },
            {
                path: '403',
                component: () => import(/* webpackChunkName: 'Error' */ '@/views/Error/403')
            },
            {
                path: '404',
                component: () => import(/* webpackChunkName: 'Error' */ '@/views/Error/404')
            },
            {
                path: '500',
                component: () => import(/* webpackChunkName: 'Error' */ '@/views/Error/500')
            }
        ]
    },
    {
        path: '/login',  //登录
        component: () => import('@/views/Login/Login')
    },
    {
        path: '/register', //注册
        component: () => import('@/views/Login/Register')
    },
    {
        path: '*',
        redirect: '/error/404'
    }
]

export default staticRoute
