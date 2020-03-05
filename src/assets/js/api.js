/*** api接口统一管理 */
import { get, post } from './axios';
import HeaderTop from "../../components/layout/HeaderTop";

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
* =======================正式
* */
/*获取侧边栏 nav*/
export const ApiLayoutNav = params => get('admin/Web/indexMenu', params);

/*登录*/
export const ApiloginIn = params => post('admin/Web/login', params);

/*退出*/
export const ApiloginOut = params => post('admin/Web/login_out', params);

/*修改密码*/
export const ApiChangePass = params => post('admin/Web/update_password', params);

/*HeaderTop 头部搜索*/
export const ApiTopSearch = params => post('admin/Member/getMemberInfo', params);


/* ==-- 首页 --== */
/*1、首页数据*/
export const IndexTotal_membership = params => post('admin/Web/total_membership', params);      /*现有会员*/
export const IndexNew_membership   = params => post('admin/Web/new_membership', params);        /*新增会员*/
export const IndexStatistics       = params => post('admin/Web/statistics', params);            /*客流 在场人数*/
export const IndexDrawer           = params => post('admin/Web/drawer', params);                /*更衣柜使用*/
export const IndexCurriculum       = params => post('admin/Web/curriculum', params);            /*预约上课 课程分析*/
export const IndexPerformance      = params => post('admin/Web/performance', params);           /*营收业绩 收支统计*/
export const IndexRevenue_trend    = params => post('admin/Web/revenue_trend', params);         /*收支趋势*/


/* ==-- 统计 会员总览 --== */
/*1、会员总览*/
export const totalMember_number   = params => post('admin/statis/member_number', params);         /* 会员数量*/
export const totalMember_trend    = params => post('admin/statis/member_trend', params);          /* 新增会员走势*/
export const totalSub_card_trend  = params => post('admin/statis/sub_card_trend', params);        /* 消耗趋势*/
export const totalRefund_trend    = params => post('admin/statis/refund_transfer_trend', params); /* 退款,转让走势*/
export const totalPassenger_trend = params => post('admin/statis/passenger_trend', params);       /* 客流走势*/


/* 2、私教 */
export const PTprivateMember   = params => post('admin/statis/private_member_statis', params);         /* 会员数量*/
export const PTClassRanking   = params => post('admin/statis/class_ranking', params);         /* 教练上课排名*/

/*员工*/
export const staffIndex   = params => get('admin/staff/index', params);         /* 员工列表*/
export const staffAdd   = params => post('admin/staff/add', params);         /* 添加员工*/

export const staffSignin   = params => get('admin/staff/signin', params);         /* 考勤 列表*/
export const staffSigninExcel   = params => get('admin/staff/excel_sign', params);         /* 考勤 导出*/





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
