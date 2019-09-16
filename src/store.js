import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //声明全局维护的状态
  state: {
    stateName:"开始状态=statename",  //默认值
    stateNum:1,
  },

  //实时监听state值的变化(最新状态)
  getters: {
    gettersName(state){
      return  state.stateName;
    },

    gettersNumber(state){
      return  state.stateNum;
    }
    // gettersName = state => state.stateName
  },

  //执行同步操作改变state  提交 mutations是更改Vuex状态的唯一合法方法
  mutations: {
    // 点击更换
    mutationsName(state,name){
      state.stateName=name;
    },

    mutationsName2(state,name){
      state.stateName=name;
    },

    mutationsNum(state){
      state.stateNum++;
    },

    // mutationsName=(state, name) => {
    //   state.stateName = name
    // },
  },

  // 进行异步操作 给action注册事件处理函数。当这个函数被触发时候，将状态提交到mutations中处理
  actions: {
    // dispatch：含有异步操作，
    // 存储:this.$store.dispatch('setTargetUser',friend);
    // 取值: this.$store.getters.targetUser;
    // commit：同步操作，
    // 存储:this.$store.commit('setTargetUser',friend);
    // 取值:this.$store.state.setTargetUser

    actionsName({commit},name){
      return commit ('mutationsName',name);
    },

    actionsName2({commit},name){
      return commit ('mutationsName2',name);
    },

    actionsNum({commit}){
      return commit('mutationsNum');
    },

    // ES6精简写法
    //actionsName = ({commit},name) => commit('mutationsName', name)

  }
})

/*
如果我们不喜欢这种在页面上使用
“this.$store.state.count”
和“this.$store.dispatch('funName')”这种很长的写法，
那么我们可以使用mapState、mapGetters、mapActions就不会这么麻烦了；
*/
