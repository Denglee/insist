import {ApiloginIn,ApiloginOut, layoutNav} from "@/assets/js/api"
import { Message } from 'element-ui';
import router from '../router'

const state = {
    StateUserName: '', //用户名

    StateNavList: [],  //路由集合
};

const getters = {

    // 获取用户名
    getUserName(state, StateUserName) {
        return state.StateUserName
    },

    // 获取 导航列表
    getNavList(state, StateNavList) {
        return state.StateNavList
    },
};


const mutations = {

    // 保存用户名
    mutSetName(state, name) {
        if (name) {
            localStorage.setItem('userName', name);
        } else {
            localStorage.removeItem('userName');
        }
        state.StateUserName = name;
    },

    //登录状态
    mutSetLoginStatus(state, name) {
        localStorage.setItem('isLogin', true);
    },

    // 插入路由 获取左侧路由导航
    mutNavList: (state, data) => {
        console.log(data);
        state.StateNavList = data
    },
};

const actions = {

    ACTName({commit}, name) {
        return commit('mutSetName', name);
    },

    // 获取该用户的菜单列表  获取左侧路由导航
    actNavList({commit}) {
        return new Promise((resolve) => {
            layoutNav().then((res) => {
                console.log(res);
                commit("mutNavList", res);
                resolve(res);
            })
        })
    },

    // 将菜单列表扁平化形成权限列表
    getPermissionList({state}) {
        return new Promise((resolve) => {
            let permissionList = []

            // 将菜单数据扁平化为一级
            function flatNavList(arr) {
                console.log(arr);
                for (let v of arr) {
                    console.log(arr);
                    if (v.child && v.child.length) {
                        flatNavList(v.child)
                    } else {
                        permissionList.push(v)
                    }
                }
            }

            flatNavList(state.StateNavList);

            resolve(permissionList)  //Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象
        })
    },

    // 登录
    ACTLogin({commit},dataLogin) {
        let name='lideng';
        return commit('mutSetName', name);

        // return new Promise((resolve) => {
        //     ApiloginIn(dataLogin).then((res) => {
        //         console.log(res);
        //         if (res.status == 1) {
        //             let resName='lideng';
        //             // commit('setToken', res.token)
        //             commit('mutSetName', resName);
        //             commit("mutSetLoginStatus");
        //
        //             Message({
        //                 message: '登录成功',
        //                 type: 'success',
        //                 duration:1500,
        //             });
        //             let that = this;
        //             setTimeout(()=>{
        //                 this.$router.push({path:'/index'});
        //             },1500)
        //         }
        //         resolve(res)
        //     })
        // })
    },

    // 登出
    ACTlogout({commit}) {
        return new Promise((resolve) => {
             // commit('setToken', '');
             // commit('user/setName', '', {root: true});
             // commit('tagNav/removeTagNav', '', {root: true});
             // resolve();
        })
    },
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}


