import axios from 'axios';
import Qs from 'qs';  //post 的 序列化
import { Message, Loading } from 'element-ui'; // 消息提示框组件


// /*第一层if判断生产环境和开发环境*/
if (process.env.NODE_ENV === 'production') {
      /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
      if (process.env.VUE_APP_FLAG === 'pro') { //production 生产环境发布 地址  .env

        // axios.defaults.baseURL = 'http://www.gddcdz.cn:10009/';//路径
        // axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5d5bb688d3464d21642b18e0/ld.com';//路径
        axios.defaults.baseURL = 'https://spt.zmtek.net';//路径

      } else {//test 测试环境  .env.text
        // axios.defaults.baseURL = 'http://vikily.f3322.net:10007';//路径
        config.optimization.minimize(false);  //代码最小化 没有错误提示
      }
} else {
      // dev 开发环境 本地 /api
      axios.defaults.baseURL = '/api';
}


// 设置请求超时时间
axios.defaults.timeout = 10000;

// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截
axios.interceptors.request.use( config => {
    // 在发送请求之前做些什么 验证token之类的

    // Loading.service(true);
    return config;
}, error => {
    // 对请求错误做些什么
    return Promise.error(error);
});

// 响应拦截
axios.interceptors.response.use( response => {
    // 对响应数据做点什么
    // console.log(response.data.status);
    if(response.data.status == 3){
        console.log('重新授权');
    }
    return response;
}, error => {
    // 对响应错误做点什么
    console.log(error);
    return Promise.reject(error);
});


// 封装get方法和post方法
/**
 *出处： https://www.cnblogs.com/hs610/p/10842866.html
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
            Loading.service(true).close();
            //  Message({message: '请求成功', type: 'success'});
        }).catch(err => {
            reject(err.data);
            Loading.service(true).close();
            Message({message: '加载失败', type: 'error'});
        })
    });}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, Qs.stringify(params))
            .then(res => {
                resolve(res.data);
                Loading.service(true).close();
                //  Message({message: '请求成功', type: 'success'});
            })
            .catch(err => {
                reject(err.data);
                Loading.service(true).close();
                Message({message: '加载失败', type: 'error'});
            })
    });}