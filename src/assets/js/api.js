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




/*获取侧边栏 nav*/
export  const layoutNav = params => get('admin/Test/indexMenu', params);

/*登录*/
export  const ApiloginIn = params => post('admin/Test/login', params);

/*退出*/
export  const ApiloginOut = params => post('admin/Test/login_out', params);


