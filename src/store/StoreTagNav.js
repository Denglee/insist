import {loginApi, recRegister} from "@/assets/js/api"

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
        state.name = StateUserName
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

    actName({commit}, name) {
        return commit('mutSetName', name);
    },

    // 获取该用户的菜单列表  获取左侧路由导航
    actNavList({commit}) {
        return new Promise((resolve) => {
            recRegister().then((res) => {
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
    aLogin({commit}) {
        return new Promise((resolve) => {
            loginApi().then((res) => {
                if (res.login) {
                    // commit('setToken', res.token)
                    commit('mutSetName', res.name);
                    commit("mutSetLoginStatus");
                }
                resolve(res)
            })
        })
    },

    // 登出
    logout({commit}) {
        return new Promise((resolve) => {
            commit('setToken', '');
            commit('user/setName', '', {root: true});
            commit('tagNav/removeTagNav', '', {root: true});
            resolve()
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