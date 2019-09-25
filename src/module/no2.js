const state={
    stateNum:100,  //默认值
};
const getters={
    gettersNum(state){
        return  state.stateNum;
    },
};
const mutations={
    mutationsNum(state){
        state.stateNum++;
    },

    mutationsNum2(state){
        state.stateNum--;
    },
};
const  actions={
    actionsNum({commit}){
        return commit('mutationsNum');
    },

    actionsNum2({commit}){
        return commit('mutationsNum2');
    },
};
export default ({
    namespaced:true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions
});