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


/*export const index = params => post('/Applet/make/index/', params); // 首页
export const index2 = params => post('http://www.gddcdz.cn:10009/index.php?c=eqs&a=search', {
    name:'留夫鸭',
})*/

// export const navIndex = params => post('http://www.gddcdz.cn:10009/index.php?c=eqs&a=search', params); // 导航首页


// reception: 前台
// export  const recRegister =params => get('/user/navlist', params);

// 获取nav
export  const recRegister = params => get('/user/navlist', params);


// 登录
export  const loginApi = params => get('/login', params);

// 健身首页
// 我感觉我要跑路了 我还以为我们的接口 可以在vue里面用，然后用来做面试项目
export const jianshen = params => post('/Applet/Index/index', params); // 导航首页
export const jianshen2 = params => post('/Applet/Index/make/course', params); // 导航首页
