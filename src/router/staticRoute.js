const Layout = () => import(/* webpackChunkName: "Layout" */ '../components/layout/Layout')

const staticRoute = [
    {
        path: '/',
        redirect: '/index',
    },
    {
        path: '/index',
        component: Layout,
        children: [
            {
                path: '',
                name:'index',
                component: () => import(/* webpackChunkName: "index" */ '../views/Index/index'),
                meta: {title: '首页'}
            },
        ]
    },
    {
        path: '/',
        component: Layout,
        children: [
            
            /*前台*/
            {
                path: 'Reception/index',   //会员登记
                name: 'ReceptionIndex',
                component: () => import(/* webpackChunkName: "ReceptionIndex" */ '../views/Reception/ReceptionIndex'),
                meta: {title: '会员登记',keepAlive: true},
            },
            {
                path: 'Reception/entrance', //入场查询
                name: 'Receptionentrance',
                component: () => import(/* webpackChunkName: "Receptionentrance" */ '../views/Reception/Receptionentrance'),
                meta: {title: '入场查询',keepAlive: true},
            },
            {
                path: 'Member/check_card',  //审核卡信息
                name: 'Membercheck_card',
                component: () => import(/* webpackChunkName: "Membercheck_card" */ '../views/Reception/Membercheck_card'),
                meta: {title: '审核卡信息'},
            },
            {
                path: 'Alipay/index',  //口碑码管理
                name: 'Alipayindex',
                component: () => import(/* webpackChunkName: "Alipayindex" */ '../views/Reception/Alipayindex'),
                meta: {title: '口碑码管理'},
            },
            {
                path: 'Reception/bracelet_info',   //手环消费信息
                name: 'ReceptionBracelet_info',
                component: () => import(/* webpackChunkName: "ReceptionBracelet_info" */ '../views/Reception/ReceptionBracelet_info'),
                meta: {title: '手环消费信息'},
            },
            {
                path: 'Reception/auto_bracelet_log',   //自动手环机记录
                name: 'ReceptionAuto_bracelet_log',
                component: () => import(/* webpackChunkName: "ReceptionAuto_bracelet_log" */ '../views/Reception/ReceptionAuto_bracelet_log'),
                meta: {title: '自动手环机记录'},
            },
            
            /*会员*/
            {
                path: 'Member/index',   //潜在会员
                name: 'MemberIndex',
                component: () => import(/* webpackChunkName: "MemberIndex" */ '../views/Member/PotentialMembers/memberIndex/MemberIndex'),
                meta: {title: '潜在会员'},
            },
            {
                path: 'Member/real_member', //正式会员
                name: 'Member_real_member',
                component: () => import(/* webpackChunkName: "Member_real_member" */ '../views/Member/RealMember/realMemberIndex/Member_real_member'),
                meta: {title: '正式会员'},
            },
            {
                path: 'Member/follow_log',  //跟进记录
                name: 'Memberfollow_log',
                component: () => import(/* webpackChunkName: "Memberfollow_log" */ '../views/Member/Memberfollow_log'),
                meta: {title: '跟进记录'},
            },

            /*课程*/
            {
                path: 'Bespeak/index',  //私教
                name: 'BespeakIndex',
                component: () => import(/* webpackChunkName: "BespeakIndex" */ '../views/Course/BespeakIndex'),
                meta: {title: '私教'},
            },
            {
                path: 'Course/index',  //团课
                name: 'Courseindex',
                component: () => import(/* webpackChunkName: "Courseindex" */ '../views/Course/Courseindex'),
                meta: {title: '团课'},
            },
            {
                path: 'Course/train_camp', //训练营
                name: 'Coursetrain_camp',
                component: () => import(/* webpackChunkName: "Coursetrain_camp" */ '../views/Course/Coursetrain_camp'),
                meta: {title: '训练营'},
            },
            {
                path: 'Course/train_course',  //培训课程
                name: 'Coursetrain_course',
                component: () => import(/* webpackChunkName: "Coursetrain_course" */ '../views/Course/Coursetrain_course'),
                meta: {title: '培训课程'},
            },
            {
                path: 'Bespeak/appraise',  //评价管理
                name: 'Bespeakappraise',
                component: () => import(/* webpackChunkName: "Bespeakappraise" */ '../views/Course/Bespeakappraise'),
                meta: {title: '评价管理'},
            },

            /*合同*/
            {
                path: 'Member/hy_card',   //期限合同 /次卡合同
                name: 'Memberhy_card',
                component: () => import(/* webpackChunkName: "Memberhy_card" */ '../views/Member/Memberhy_card'),
                meta: {title: '期限合同'},
            },
            {
                path: 'Member/hy_card1', //次卡合同
                name: 'Memberhy_card1',
                component: () => import(/* webpackChunkName: "Memberhy_card1" */ '../views/Member/Memberhy_card1'),
                meta: {title: '次卡合同'},
            },
            {
                path: 'Member/hy_card2',  //私教合同
                name: 'Memberhy_card2',
                component: () => import(/* webpackChunkName: "Memberhy_card2" */ '../views/Member/Memberhy_card2'),
                meta: {title: '私教合同'},
            },
            {
                path: 'Membership/index',  //会籍卡设置
                name: 'Membershipindex',
                component: () => import(/* webpackChunkName: "Membershipindex" */ '../views/Member/Membershipindex'),
                meta: {title: '会籍卡设置'},
            },
            {
                path: 'Member/contract_list',  //定金合同
                name: 'Membercontract_list',
                component: () => import(/* webpackChunkName: "Membercontract_list" */ '../views/Member/Membercontract_list'),
                meta: {title: '定金合同'},
            },
            {
                path: 'Member/history_card',  //历史合同
                name: 'Memberhistory_card',
                component: () => import(/* webpackChunkName: "Memberhistory_card" */ '../views/Member/Memberhistory_card'),
                meta: {title: '历史合同'},
            },
            {
                path: 'Member/ya_money',   //押金合同
                name: 'Memberya_money',
                component: () => import(/* webpackChunkName: "Memberya_money" */ '../views/Member/Memberya_money'),
                meta: {title: '押金合同'},
            },
            {
                path: 'Member/hy_card4',   //滑雪合同
                name: 'Memberhy_card4',
                component: () => import(/* webpackChunkName: "Memberhy_card4" */ '../views/Member/Memberhy_card4'),
                meta: {title: '滑雪合同'},
            },
            {
                path: 'Member/rent_cabinet',   //租柜合同
                name: 'Memberrent_cabinet',
                component: () => import(/* webpackChunkName: "Memberrent_cabinet" */ '../views/Member/Memberrent_cabinet'),
                meta: {title: '租柜合同'},
            },
            {
                path: 'Member/cabinet_deposit',   //租柜押金
                name: 'Membercabinet_deposit',
                component: () => import(/* webpackChunkName: "Membercabinet_deposit" */ '../views/Member/Membercabinet_deposit'),
                meta: {title: '租柜押金'},
            },

            {
                path: 'Recharge/index',   //充值卡合同
                name: 'RechargeIndex',
                component: () => import(/* webpackChunkName: "RechargeIndex" */ '../views/Member/RechargeIndex'),
                meta: {title: '充值卡合同'},
            },

            {
                path: 'Item/group_card',   //团购卡
                name: 'ItemGroupCard',
                component: () => import(/* webpackChunkName: "ItemGroupCard" */ '../views/Item/GroupCard'),
                meta: {title: '团购卡'},
            },

            /*员工*/
            {
                path: 'Staff/index',   //员工列表
                name: 'StaffIndex',
                component: () => import(/* webpackChunkName: "StaffIndex" */ '../views/Staff/StaffIndex'),
                meta: {title: '员工列表'},
            },
            // Staff/group
            // {
            //     path: 'Staff/index',   //员工列表
            //     name: 'StaffIndex',
            //     component: () => import(/* webpackChunkName: "StaffIndex" */ '../views/Staff/StaffIndex'),
            //     meta: {title: '员工列表'},
            // },
            {
                path: 'Staff/salary',   //员工工资
                name: 'StaffReword',
                component: () => import(/* webpackChunkName: "StaffReword" */ '../views/Staff/StaffReword'),
                meta: {title: '员工工资'},
            },
            {
                path: 'Staff/signin',   //员工签到
                name: 'StaffSignin',
                component: () => import(/* webpackChunkName: "StaffSignin" */ '../views/Staff/StaffSignin'),
                meta: {title: '员工签到'},
            },
            {
                path: 'Reception/entrance_staff',   //入场查询
                name: 'ReceptionEntrance_staff',
                component: () => import(/* webpackChunkName: "ReceptionEntrance_staff" */ '../views/Staff/ReceptionEntrance_staff'),
                meta: {title: '入场查询'},
            },
            

            /*统计*/
            
            {
                path: 'Total/totalAddVip',  //新增会员统计
                name: 'totalAddVip',
                component: () => import(/* webpackChunkName: "totalAddVip" */ '../views/Total/totalAddVip'),
                meta: {title: '新增会员统计'},
            },
            {
                path: 'Statis/index',  //会员总览
                name: 'StatisIndex',
                component: () => import(/* webpackChunkName: "StatisIndex" */ '../views/Total/StatisIndex'),
                meta: {title: '会员总览'},
            },
            {
                path: 'Stat/revenue_statis',  //营收总览
                name: 'StatRevenue',
                component: () => import(/* webpackChunkName: "StatRevenue" */ '../views/Total/StatRevenue'),
                meta: {title: '营收总览'},
            },
            {
                path: 'Reception/card_log',  //会员卡记录
                name: 'Receptioncard_log',
                component: () => import(/* webpackChunkName: "Receptioncard_log" */ '../views/Total/Receptioncard_log'),
                meta: {title: '会员卡记录'},
            },
            // {
            //     path: 'Stat/shop',  //客流
            //     name: 'Statshop',
            //     component: () => import(/* webpackChunkName: "Statshop" */ '../views/Total/Statshop'),
            //     meta: {title: '客流'},
            // },
            // {
            //     path: 'Stat/water',  //营收流水
            //     name: 'Statwater',
            //     component: () => import(/* webpackChunkName: "Statwater" */ '../views/Total/Statwater'),
            //     meta: {title: '营收流水'},
            // },
            // {
            //     path: 'Stat/achievement',  //私教业绩
            //     name: 'Statachievement',
            //     component: () => import(/* webpackChunkName: "Statachievement" */ '../views/Total/Statachievement'),
            //     meta: {title: '私教业绩'},
            // },
            // {
            //     path: 'Stat/achievement',  //会籍业绩
            //     name:'Statachievement1',
            //     component: () => import(/* webpackChunkName: "Statachievement1" */ '../views/Total/Statachievement'),
            //     meta:{title: '会籍业绩'},
            // },
            // {
            //     path: 'Stat/contract_stat',  //合同张数统计
            //     name: 'Statcontract_stat',
            //     component: () => import(/* webpackChunkName: "contract_stat" */ '../views/Total/Statcontract_stat'),
            //     meta: {title: '合同张数统计'},
            // },
            // {
            //     path: 'Stat/cikawater',  //次卡流水
            //     name: 'Statcikawater',
            //     component: () => import(/* webpackChunkName: "Statcikawater" */ '../views/Total/Statcikawater'),
            //     meta: {title: '次卡流水'},
            // },
            // {
            //     path: 'Stat/sijiaowater',  //私教卡流水
            //     name: 'Statsijiaowater',
            //     component: () => import(/* webpackChunkName: "Statsijiaowater" */ '../views/Total/Statsijiaowater'),
            //     meta: {title: '私教卡流水'},
            // },
            // {
            //     path: 'Stat/achievement_log',  //会籍业绩流水报表
            //     name: 'Statachievement_log',
            //     component: () => import(/* webpackChunkName: "Statachievement_log" */ '../views/Total/Statachievement_log'),
            //     meta: {title: '会籍业绩流水报表'},
            // },
            // {
            //     path: 'Stat/sj_achievement_log',  //私教业绩流水报表
            //     name: 'Statsj_achievement_log',
            //     component: () => import(/* webpackChunkName: "Statsj_achievement_log" */ '../views/Total/Statsj_achievement_log'),
            //     meta: {title: '私教业绩流水报表'},
            // },
            {
                path: 'Card/card_list',  //卡号设置
                name: 'Cardcard_list',
                component: () => import(/* webpackChunkName: "Cardcard_list" */ '../views/Total/Cardcard_list'),
                meta: {title: '卡号设置'},
            },
            // {
            //     path: 'Stat/entrance_info',  //客流详情
            //     name: 'Statentrance_info',
            //     component: () => import(/* webpackChunkName: "Statentrance_info" */ '../views/Total/Statentrance_info'),
            //     meta: {title: '客流详情'},
            // },
            // {
            //     path: 'Stat/pay_type',  //支付统计
            //     name: 'Statpay_type',
            //     component: () => import(/* webpackChunkName: "Statpay_type" */ '../views/Total/Statpay_type'),
            //     meta: {title: '支付统计'},
            // },
            // {
            //     path: 'Member/statistics',  //会员详情
            //     name: 'Memberstatistics',
            //     component: () => import(/* webpackChunkName: "Memberstatistics" */ '../views/Total/Memberstatistics'),
            //     meta: {title: '会员详情'},
            // },
            // {
            //     path: 'Stat/coach_count',  //教练上私教课统计
            //     name: 'Statcoach_count',
            //     component: () => import(/* webpackChunkName: "Statcoach_count" */ '../views/Total/Statcoach_count'),
            //     meta: {title: '教练上私教课统计'},
            // },
            // {
            //     path: 'Stat/hxwater',  //储值卡流水
            //     name: 'Stathxwater',
            //     component: () => import(/* webpackChunkName: "Stathxwater" */ '../views/Total/Stathxwater'),
            //     meta: {title: '储值卡流水'},
            // },
            // {
            //     path: 'Member/expire_reminder',  //到期提醒
            //     name: 'Memberexpire_reminder',
            //     component: () => import(/* webpackChunkName: "Memberexpire_reminder" */ '../views/Total/Memberexpire_reminder'),
            //     meta: {title: '到期提醒'},
            // },
            // {
            //     path: 'Stat/lazy',  //懒惰提醒
            //     name: 'Statlazy',
            //     component: () => import(/* webpackChunkName: "Statlazy" */ '../views/Total/Statlazy'),
            //     meta: {title: '懒惰提醒'},
            // },
            {
                path: 'Eigen/memstime',  //运动时长排名
                name: 'Eigenmemstime',
                component: () => import(/* webpackChunkName: "Eigenmemstime" */ '../views/Total/Eigenmemstime'),
                meta: {title: '运动时长排名'},
            },
            {
                path: 'Stat/analyze',  //业绩分析
                name: 'Statanalyze',
                component: () => import(/* webpackChunkName: "Statanalyze" */ '../views/Total/Statanalyze'),
                meta: {title: '业绩分析'},
            },
            {
                path: 'Stat/show_code',  //入场预约
                name: 'StatShowCode',
                component: () => import(/* webpackChunkName: "StatShowCode" */ '../views/Total/StatShowCode'),
                meta: {title: '入场预约'},
            },


            /*设置*/
            {
                path: 'Group/index',  //角色管理
                name: 'Groupindex',
                component: () => import(/* webpackChunkName: "Groupindex" */ '../views/Setup/Groupindex'),
                meta: {title: "角色管理"},
            },
            {
                path: 'User/index',  //后台管理员
                name: 'Userindex',
                component: () => import(/* webpackChunkName: "Userindex" */ '../views/Setup/Userindex'),
                meta: {title: "后台管理员"},
            },
            {
                path: 'Citymanage/index',  //企业信息
                name: 'Citymanageindex',
                component: () => import(/* webpackChunkName: "Citymanageindex" */ '../views/Setup/Citymanageindex'),
                meta: {title: "企业信息"},
            },
            {
                path: 'Menu/index',  //系统菜单
                name: 'Menuindex',
                component: () => import(/* webpackChunkName: "Menuindex" */ '../views/Setup/Menuindex'),
                meta: {title: "系统菜单"},
            },
            {
                path: 'Config/site',  //站点配置
                name: 'Configsite',
                component: () => import(/* webpackChunkName: "Configsite" */ '../views/Setup/Configsite'),
                meta: {title: "站点配置"},
            },
            {
                path: 'System/operation',  //操作日志
                name: 'Systemoperation',
                component: () => import(/* webpackChunkName: "Systemoperation" */ '../views/Setup/Systemoperation'),
                meta: {title: "操作日志"},
            },
            {
                path: 'System/loginlog',  //登陆日志
                name: 'Systemloginlog',
                component: () => import(/* webpackChunkName: "Systemloginlog" */ '../views/Setup/Systemloginlog'),
                meta: {title: "登陆日志"},
            },
            {
                path: 'Auth/index',  //权限管理
                name: 'Authindex',
                component: () => import(/* webpackChunkName: "Authindex" */ '../views/Setup/Authindex'),
                meta: {title: "权限管理"},
            },
            {
                path: 'Index/clearCache',  //更新缓存
                name: 'IndexclearCache',
                component: () => import(/* webpackChunkName: "IndexclearCache" */ '../views/Setup/IndexclearCache'),
                meta: {title: "更新缓存"},
            },
            {
                path: 'System/import',  //数据导入
                name: 'Systemimport',
                component: () => import(/* webpackChunkName: "Systemimport" */ '../views/Setup/Systemimport'),
                meta: {title: "数据导入"},
            },
            {
                path: 'Eigen/temp_list',  //模板设置
                name: 'Eigentemp_list',
                component: () => import(/* webpackChunkName: "Eigentemp_list" */ '../views/Setup/Eigentemp_list'),
                meta: {title: "模板设置"},
            },
            {
                path: 'Citymanage/marketing',  //企业设置
                name: 'Citymanagemarketing',
                component: () => import(/* webpackChunkName: "Citymanagemarketing" */ '../views/Setup/Citymanagemarketing'),
                meta: {title: "企业设置"},
            },
            {
                path: 'Member/through_card',  //审核冻结卡申请
                name: 'Memberthrough_card',
                component: () => import(/* webpackChunkName: "Memberthrough_card" */ '../views/Setup/Memberthrough_card'),
                meta: {title: "审核冻结卡申请"},
            },
            {
                path: 'Location/index',  //区域对照表
                name: 'Locationindex',
                component: () => import(/* webpackChunkName: "Locationindex" */ '../views/Setup/Locationindex'),
                meta: {title: "区域对照表"},
            },
            {
                path: 'Eigen/explain',  //文档编辑
                name: 'Eigenexplain',
                component: () => import( /* webpackChunkName: "Eigenexplain"*/ '../views/Setup/Eigenexplain'),
                meta: {title: "文档编辑"},
            },
            {
                path: 'Explain/index',  //操作说明
                name: 'Explainindex',
                component: () => import(/* webpackChunkName: "Explainindex" */ '../views/Setup/Explainindex'),
                meta: {title: "操作说明"},
            },
            {
                path: 'Citymanage/wxpush',  //微信推送
                name: 'Citymanagewxpush',
                component: () => import(/* webpackChunkName: "Citymanagewxpush" */ '../views/Setup/Citymanagewxpush'),
                meta: {title: "微信推送"},
            },
            {
                path: 'Citymanage/renew',  //企业合同
                name: 'Citymanagerenew',
                component: () => import(/* webpackChunkName: "Citymanagerenew" */ '../views/Setup/Citymanagerenew'),
                meta: {title: "企业合同"},
            },
            {
                path: 'Citymanage/feedback',  //场馆留言
                name: 'Citymanagefeedback',
                component: () => import(/* webpackChunkName: "Citymanagefeedback" */ '../views/Setup/Citymanagefeedback'),
                meta: {title: "场馆留言"},
            },
            {
                path: 'Membership/device_koubei',  //口碑终端
                name: 'Membershipdevice_koubei',
                component: () => import(/* webpackChunkName: "Membershipdevice_koubei" */ '../views/Setup/Membershipdevice_koubei'),
                meta: {title: "口碑终端"},
            },
            /*终端*/
            {
                path: 'Devicemanage/terminal', //前台一体机
                name: 'Devicemanageterminal',
                component: () => import(/* webpackChunkName: "Devicemanageterminal" */ '../views/Equipment/anageterminal'),
                meta: {title: '前台一体机'},
            },
            {
                path: 'Devicemanage/wardrobe',  //更衣柜
                name: 'Devicemanagewardrobe',
                component: () => import(/* webpackChunkName: "Devicemanagewardrobe" */ '../views/Equipment/managewardrobe'),
                meta: {title: '更衣柜'},
            },
            {
                path: 'Devicemanage/gatelist',  //闸机
                name: 'Devicemanagegatelist',
                component: () => import(/* webpackChunkName: "Devicemanagegatelist" */ '../views/Equipment/managegatelist'),
                meta: {title: '闸机'},
            },
            {
                path: 'Devicemanage/entrance_guard',   //门禁
                name: 'Devicemanageentrance_guard',
                component: () => import(/* webpackChunkName: "Devicemanageentrance_guard" */ '../views/Equipment/manageentrance_guard'),
                meta: {title: '门禁'},
            },
            {
                path: 'Devicemanage/switching',   //智能开关
                name: 'Devicemanageswitching',
                component: () => import(/* webpackChunkName: "Devicemanageswitching" */ '../views/Equipment/manageswitching'),
                meta: {title: '智能开关'},
            },
            {
                path: 'Devicemanage/water',   //智能水控
                name: 'Devicemanagewater',
                component: () => import(/* webpackChunkName: "Devicemanagewater" */ '../views/Equipment/managewater'),
                meta: {title: '智能水控'},
            },
            {
                path: 'Devicemanage/ai',   //AI数据中心
                name: 'Devicemanageai',
                component: () => import(/* webpackChunkName: "Devicemanageai" */ '../views/Equipment/Devicemanageai'),
                meta: {title: 'AI数据中心'},
            },
            {
                path: 'Devicemanage/bracelet',   //手环终端
                name: 'Devicemanagebracelet',
                component: () => import(/* webpackChunkName: "Devicemanagebracelet" */ '../views/Equipment/managebracelet'),
                meta: {title: '手环终端'},
            },
            {
                path: 'Devicemanage/relay',   //中继
                name: 'DevicemanageRelay',
                component: () => import(/* webpackChunkName: "DevicemanageRelay" */ '../views/Equipment/DevicemanageRelay'),
                meta: {title: '中继'},
            },
            {
                path: 'Sports/centerc',   //运动器材
                name: 'SportsIndex',
                component: () => import(/* webpackChunkName: "SportsIndex" */ '../views/Equipment/SportsIndex'),
                meta: {title: '运动器材'},
            },
            {
                path: 'Autodevice/index',   //自动手环发放机
                name: 'AutodeviceIndex',
                component: () => import(/* webpackChunkName: "AutodeviceIndex" */ '../views/Equipment/AutodeviceIndex'),
                meta: {title: '自动手环发放机'},
            },
            {
                path: 'Bracelet/index',   //智能手环
                name: 'BraceletIndex',
                component: () => import(/* webpackChunkName: "BraceletIndex" */ '../views/Equipment/BraceletIndex'),
                meta: {title: '智能手环'},
            },
    
            {
                path: 'Sports/centerc',   //智能中控
                name: 'SportsCenterc',
                component: () => import(/* webpackChunkName: "SportsCenterc" */ '../views/Equipment/SportsCenterc'),
                meta: {title: '智能中控'},
            },
            

            {
                path: 'Xb/project', //项目列表
                name: 'Xbproject',
                component: () => import(/* webpackChunkName: "Xbproject" */ '../views/Project/Xbproject'),
                meta: {title: '项目列表'},
            },
            {
                path: 'Xb/examine_give', //项目列表
                name: 'XbExamine_give',
                component: () => import(/* webpackChunkName: "XbExamine_give" */ '../views/Project/XbExamine_give'),
                meta: {title: '赠送审核'},
            },
            {
                path: 'Xb/member', //会员管理
                name: 'XbMember',
                component: () => import(/* webpackChunkName: "XbMember" */ '../views/Project/XbMember'),
                meta: {title: '会员管理'},
            },

            /*个人*/
            {
                path: 'PersonalIndex',  //个人
                name: 'PersonalIndex',
                component: () => import(/* webpackChunkName: "PersonalIndex" */ '../views/Personal/PersonalIndex'),
                meta: {title: '个人'},
            },

            /*消费*/
            {
                path: 'Xb/consume', //会员消费
                name: 'Xbconsume',
                component: () => import(/* webpackChunkName: "Xbconsume" */ '../views/Consume/Xbconsume'),
                meta: {title: '会员消费'},
            },
            {
                path: 'Xb/water', //营收流水
                name: 'Xbwater',
                component: () => import(/* webpackChunkName: "Xbwater" */ '../views/Consume/Xbwater'),
                meta: {title: '营收流水'},
            },

            /*商品*/
            {
                path: 'Goodsmanage/index', //商品列表
                name: 'Goodsmanageindex',
                component: () => import(/* webpackChunkName: "Goodsmanageindex" */ '../views/Goods/Goodsmanageindex'),
                meta: {title: '商品列表'},
            },
            {
                path: 'Shopcate/index', //商品分类
                name: 'Shopcateindex',
                component: () => import(/* webpackChunkName: "Shopcateindex" */ '../views/Goods/Shopcateindex'),
                meta: {title: '商品分类'},
            },
            {
                path: 'Goodsmanage/oorder', //商城订单
                name: 'Goodsmanageoorder',
                component: () => import(/* webpackChunkName: "Goodsmanageoorder" */ '../views/Goods/Goodsmanageoorder'),
                meta: {title: '商城订单'},
            },
            {
                path: 'Goodsmanage/complaint', //用户有话
                name: 'Goodsmanagecomplaint',
                component: () => import(/* webpackChunkName: "Goodsmanagecomplaint" */ '../views/Goods/Goodsmanagecomplaint'),
                meta: {title: '用户有话'},
            },

            /*收款*/
            {
                path: 'Receivables/Index',  //收款
                name: 'ReceivablesIndex',
                component: () => import(/* webpackChunkName: "ReceivablesIndex" */ '../views/Receivables/ReceivablesIndex'),
                meta: {title: '收款'},
            },

            /*服务 */
            {
                path: 'Server/index',  //节日祝福
                name: 'Serverindex',
                component: () => import(/* webpackChunkName: "Serverindex" */ '../views/Service/Serverindex'),
                meta: {title: '节日祝福'},
            },
            {
                path: 'Questionnaire/index',  //市场调查
                name: 'Questionnaireindex',
                component: () => import(/* webpackChunkName: "Questionnaireindex" */ '../views/Service/Questionnaireindex'),
                meta: {title: '市场调查'},
            },

            /*营销*/
            {
                path: 'Market/giftbag', //
                name: 'MarketGiftBag',
                component: () => import(/* webpackChunkName: "MarketGiftBag" */ '../views/Market/giftBag'),
                meta: {title: '礼包'},
            },
            {
                path: 'Member/marketing', //会籍分销
                name: 'Membermarketing',
                component: () => import(/* webpackChunkName: "Membermarketing" */ '../views/Market/Membermarketing'),
                meta: {title: '会籍分销'},
            },
            {
                path: 'Member/marketing2', //会员营销排行
                name: 'Membermarketing2',
                component: () => import(/* webpackChunkName: "Membermarketing2" */ '../views/Market/Membermarketing2'),
                meta: {title: '会员营销排行'},
            },
            {
                path: 'Eigen/staffreferrer', //员工营销排行
                name: 'Eigenstaffreferrer',
                component: () => import(/* webpackChunkName: "Eigenstaffreferrer" */ '../views/Market/Eigenstaffreferrer'),
                meta: {title: '员工营销排行'},
            },
            {
                path: 'Lottery/banner', //抽奖管理
                name: 'Lotterybanner',
                component: () => import(/* webpackChunkName: "Lotterybanner" */ '../views/Market/Lotterybanner'),
                meta: {title: '抽奖管理'},
            },
            {
                path: 'Lottery/prize_list', //中奖名单
                name: 'Lotteryprize_list',
                component: () => import(/* webpackChunkName: "Lotteryprize_list" */ '../views/Market/Lotteryprize_list'),
                meta: {title: '中奖名单'},
            },
            {
                path: 'Server/giftbag', //礼包
                name: 'giftBag',
                component: () => import(/* webpackChunkName: "giftBag" */ '../views/Market/giftBag'),
                meta: {title: '礼包'},
            },
            {
                path: 'Item/enroll', //活动报名
                name: 'ItemEnroll',
                // component: () => import(/* webpackChunkName: "ItemEnroll" */ '../views/Market/ItemEnroll'),  //正式
                component: () => import(/* webpackChunkName: "ItemEnroll" */ '../views/Item/ItemEnroll'),       //为了编辑页面
                meta: {title: '活动报名'},
            },

            /*识别*/
            {
                path: 'Eigen/face', //人脸识别数据
                name: 'Eigenface',
                component: () => import(/* webpackChunkName: "Eigenface" */ '../views/Eigen/Eigenface'),
                meta: {title: '人脸识别数据'},
            },
            {
                path: 'Eigen/finger', //指静脉识别数据
                name: 'Eigenfinger',
                component: () => import(/* webpackChunkName: "Eigenfinger" */ '../views/Eigen/Eigenfinger'),
                meta: {title: '指静脉识别数据'},
            },


            /*场馆*/
            {
                path: 'Venue/index',  //场馆设置
                name: 'Venueindex',
                component: () => import(/* webpackChunkName: "Venueindex" */ '../views/Venue/Venueindex'),
                meta: {title: '场馆设置'},
            },

            {
                path: 'Item/index',  //场馆售票
                name: 'Itemindex',
                component: () => import(/* webpackChunkName: "Itemindex" */ '../views/Venue/Itemindex'),
                meta: {title: '场馆售票'},
            },



            /*场馆*/
            {
                path: 'edit/index',  //场馆设置
                name: 'editIndex',
                component: () => import(/* webpackChunkName: "editIndex" */ '../views/Staff/editIndex'),
                meta: {title: '场馆设置'},
            },

        ]
    },


    {
        name: 'Error',
        path: '/error',
        component: () => import( /* webpackChunkName: "error" */ '../views/Error'),
        children: [
            {
                path: '401',
                component: () => import(/* webpackChunkName: "401" */ '../views/Error/401'),
            },
            {
                path: '403',
                component: () => import(/* webpackChunkName: "403" */ '../views/Error/403'),
            },
            {
                path: '404',
                component: () => import(/* webpackChunkName: "404" */ '../views/Error/404'),
            },
            {
                path: '500',
                component: () => import(/* webpackChunkName: "500" */ '../views/Error/500'),
            },
        ]
    },
    // {
    //     name: 'redirect',  //空白页面
    //     path: '/redirect',
    //     component: () => import(/* webpackChunkName: "redirect" */ '../components/redirect/redirect'),
    // },
    
    {
        name: 'login',  //登录
        path: '/login',
        // component: () => import(/* webpackChunkName: "Login" */ '../views/Login/Login')
        component: () => import(/* webpackChunkName: "Login" */ '../views/Login/LoginSys'),
    },
    {
        name: 'register', //注册
        path: '/register',
        component: () => import(/* webpackChunkName: "Register" */ '../views/Login/Register'),
    },
    {
        name: '*',
        path: '*',
        redirect: '/error/404'
    }

];

export default staticRoute

/*
200422 => 统计删除 缩减 合并
Statshop  客流
Statwater 营收流水
Statachievement 私教业绩
Statachievement 会籍业绩
Statcontract_stat 合同张数统计
Statcikawater  次卡流水
Statsijiaowater 私教卡流水
Statachievement_log   会籍业绩流水报表
Statsj_achievement_log  私教业绩流水报表
Statentrance_info  客流详情
Statpay_type 支付统计
Memberstatistics  会员 详情
Statcoach_count 教练上私教课统计
Stathxwater 储值卡流水
*/