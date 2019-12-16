import {recRegister,loginApi} from "@/assets/js/api"

const state = {
    name:'', //用户名
    navList: [],  //路由集合
};

const getters={
    // 获取用户名
    gState(state,name){
        return state.name
    },

    // 获取 导航列表
    gNavList(state,navList){
        return state.navList
    },
};


const mutations = {

    // 保存用户名
    mSetName(state,name){
        if(name){
            localStorage.setItem('userName',name);
        } else {
            localStorage.removeItem('userName');
        }
        state.name = name
    },

    //登录状态
  mSetLoginStatus(state,name){
      localStorage.setItem('isLogin',true);
  },


    // 插入路由
    mSetNavList: (state, data) => {
        state.navList = data
    },
};

const actions={
    aName({commit},name){
      return commit ('mName',name);
    },

    // 获取该用户的菜单列表
    getNavList({commit}){
        return new Promise((resolve) =>{
            recRegister().then((res) =>{
                commit("mSetNavList", res);
                resolve (res);
            })
        })
    },

    // 将菜单列表扁平化形成权限列表
    getPermissionList({state}){

        return new Promise((resolve) =>{
            let permissionList = []
            // 将菜单数据扁平化为一级
            function flatNavList(arr){
                for(let v of arr){
                    console.log(arr);
                    if(v.child && v.child.length){
                        flatNavList(v.child)
                    } else{
                        permissionList.push(v)
                    }
                }
            }

            flatNavList(state.navList);

            resolve(permissionList)  //Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象
        })
    },

    // 登录
    aLogin({ commit }) {
        return new Promise((resolve) =>{
            loginApi().then((res) =>{
                if(res.login){
                    // commit('setToken', res.token)
                    commit('mSetName', res.name);
                    commit("mSetLoginStatus");
                }
                resolve(res)
            })
        })
    },

    // 登出
    logout({commit}) {
        return new Promise((resolve) => {
            commit('setToken', '');
            commit('user/setName', '', { root: true });
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