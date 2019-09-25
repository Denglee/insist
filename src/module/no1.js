const state={
    stateName:"",  //默认值
};
const getters={
    gettersName(state){
        return  state.stateName;
    },
};
const mutations={
    mutationsName(state,name){
        state.stateName=name;
    },
};
const  actions={
    actionsName({commit},name){
        return commit ('mutationsName',name);
    },
};
export default ({
    namespaced:true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions
});