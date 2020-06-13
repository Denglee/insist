/*** api接口统一管理 */
import { get, post } from './axios';

/**
 *
 * @param {string} params
 * 我们定义了一个index方法
 * 这个方法有一个参数params
 * params是我们请求接口时携带的参数对象
 * 而后调用了我们封装的post方法
 * post方法的第一个参数是我们的接口地址
 * 第二个参数是topics的params参数
 * 即请求接口时携带的参数对象
 * 最后通过export导出topics。
 */

/*
A、登录 + 侧边栏
* */

export const ApiLayoutNav = params => get('admin/Web/indexMenu', params); /*获取侧边栏 nav*/
export const ApiloginIn = params => post('admin/Web/login', params); /*登录*/
export const ApiloginOut = params => post('admin/Web/login_out', params); /*退出*/
export const ApiChangePass = params => post('admin/Web/update_password', params); /*修改密码*/
export const ApiTopSearch = params => post('admin/Member/getMemberInfo', params); /*HeaderTop 头部搜索*/


/* ==-- B、首页 --== */
/*1、首页数据*/
export const IndexTotal_membership = params => post('admin/Web/total_membership', params);      /*现有会员*/
export const IndexNew_membership   = params => post('admin/Web/new_membership', params);        /*新增会员*/
export const IndexStatistics       = params => post('admin/Web/statistics', params);            /*客流 在场人数*/
export const IndexDrawer           = params => post('admin/Web/drawer', params);                /*更衣柜使用*/
export const IndexCurriculum       = params => post('admin/Web/curriculum', params);            /*预约上课 课程分析*/
export const IndexPerformance      = params => post('admin/Web/performance', params);           /*营收业绩 收支统计*/
export const IndexRevenue_trend    = params => post('admin/Web/revenue_trend', params);         /*收支趋势*/

/* ==-- B22、前台 --== */
/*1、登记*/
export const checkFaceApi    = params => post('admin/Web/match', params);         /*收支趋势*/



/* ==-- C、统计 会员总览 --== */
/*1、会员总览*/
export const totalMember_number   = params => post('admin/statis/member_number', params);         /* 会员数量*/
export const totalMember_trend    = params => post('admin/statis/member_trend', params);          /* 新增会员走势*/
export const totalSub_card_trend  = params => post('admin/statis/sub_card_trend', params);        /* 消耗趋势*/
export const totalRefund_trend    = params => post('admin/statis/refund_transfer_trend', params); /* 退款,转让走势*/
export const totalPassenger_trend = params => post('admin/statis/passenger_trend', params);       /* 客流走势*/

/* 2、私教 */
export const PTprivateMember   = params => post('admin/statis/private_member_statis', params);         /* 私教 统计 会员数量*/
export const PTClassRanking   = params => post('admin/statis/class_ranking', params);         /* 教练上课排名*/
export const PTMemberClass  = params => post('Admin/Statis/member_class', params);         /* 上课详情*/
export const PTSaleroom  = params => get('Admin/Statis/saleroom', params);         /* 私教销售额 */
export const PTclassNumber  = params => get('Admin/Statis/classNumber', params);         /* 私教数量 */
export const PTperNumPri  = params => get('Admin/Statis/perNumPri', params);         /* 私教上课列表 */
export const PTperNumPriparticulars  = params => get('Admin/Statis/perNumPriparticulars', params); /* 私教上课 详情 */

//2.1  到期提醒
export const PTexpireSki    = params => get('Admin/statis/expire_ski', params);         /* 到期滑雪 详情 */
export const PTexpireCoach  = params => get('Admin/statis/expire_coach', params);         /* 到期私教 详情 */
export const PTexpireReminder  = params => get('Admin/statis/expire_reminder', params);         /* 期限到期 详情 */
export const PTexpireNum    = params => get('Admin/statis/expire_num', params);         /* 到期次卡 详情 */
export const PTexpireLazy   = params => get('Admin/statis/lazy', params);         /* 懒惰提醒 详情 */

/*3、会籍*/
export const VipMemberTkClass   = params => post('Admin/Statis/member_tk_class', params);         /* 教练上课排名*/
export const VipSalerStatis  = params => post('Admin/Statis/saler_statis', params);         /* 会籍统计*/
export const VipMemberClass  = params => post('Admin/Statis/member_tk_class', params);         /* 上课详情*/
export const MBSaleroom  = params => get('Admin/Statis/counselorsaleroom', params);         /* 会籍销售额查询*/
export const MBclassNumber  = params => get('Admin/Statis/counselorclassNumber', params);         /* 会籍数量查询*/


/*==== D、员工===*/
export const staffIndex   = params => get('admin/staff/index', params);         /* 员工列表*/
export const staffAdd   = params => post('admin/staff/add', params);         /* 添加员工*/
export const staffDel   = params => post('admin/staff/del', params);         /* 删除员工*/

export const staffSalaryMenuid  = params => get('admin/staff/salary/menuid', params);         /* 员工工资列表*/
export const staffRewardPunish   = params => get('admin/staff/reward_punish', params);         /* 员工奖惩*/

export const staffGroup   = params => get('admin/staff/staff_group', params);         /* 部门*/
export const staffDeduct   = params => get('admin/staff/deduct', params);         /* 提成 列表*/
export const staffPhases   = params => get('admin/staff/phases', params);         /* 提成 设置*/

export const staffSignin   = params => get('admin/staff/signin', params);         /* 考勤 列表*/
export const staffSetcommutertime   = params => get('admin/Staff/setcommutertime', params);         /* 考勤 列表*/


/*  === E、营收 ==*/
export const revenueTotal   = params => get('Admin/Statis/total_revenue', params);         /* 总收入 */
export const revenueRanking   = params => get('Admin/Statis/project_revenue_ranking', params);          /* 项目营收排名*/
export const revenuePayMethod   = params => get('Admin/Statis/pay_method_ranking', params);          /* 支付方式 排名*/
export const revenueWater   = params => get('Admin/stat/water', params);          /* 营收流水*/
export const revenueUppay   = params => post('Admin/stat/uppay', params);          /* 营收流水 修改支付方式*/
export const revenuePrintApi   = params => post('Admin/stat/printcontrace', params);          /* 营收流水 打印*/

export const analyzeApi   = params => post('Admin/stat/analyze', params);          /* 业绩分析*/


export const revenueContract   = params => get('Admin/Statis/contract_statis', params);          /* 营收详情*/
export const revenueDetails   = params => get('Admin/Statis/revenueDetails', params);          /* 营收分类详情*/


/*礼包*/
export const giftBag   = params => get('Admin/server/giftbag', params);          /* 获取礼包列表*/
export const addGiftBagApi   = params => post('Admin/server/addgiftbag', params);          /* 添加礼包*/

/*
staffAdd({
    userimage:userimage,
    information:2,
    zmtek_ver:2,
}).then(res => {
   console.log(res)
    if(res.status ==1){

    }
}).catch(res => {
    console.log(res);
});*/
