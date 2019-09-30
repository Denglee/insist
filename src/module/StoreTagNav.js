import {recRegister} from "@/assets/js/api"

const state = {
    name:1,
    navList: [],  //路由集合
};

const getters={
    gState(state,name){
        return state.name
    },
    gNavList(state,navList){
        return state.navList
    },
};


const mutations = {
    mName(state,name){
      state.stateName=name;
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
                console.log(res);
                commit("mSetNavList", res);
                resolve (res);
            })
        })


        // return new Promise((resolve) =>{
        //     axios({
        //         url: '/user/navlist',
        //         methods: 'post',
        //         data: {}
        //     }).then((res) => {
        //         console.log(res);
        //         commit("setNavList", res)
        //         resolve(res)
        //     })
        // })
    },
}




export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}