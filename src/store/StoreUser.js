const state = {
    // 用户名
    name: ''
}

const mutations = {
    setName: (state, data) => {
        if(data){
            localStorage.setItem('userName')
        } else {
            localStorage.removeItem('userName');
        }
        state.name = data
    }
}

const actions = {
    // 登录
    aLogin({ commit }, userInfo) {
        return new Promise((resolve) => {
            axios({
                url: '/login',
                method: 'post',
                data: {
                    ...userInfo
                }
            }).then(res => {
                if(res.login){
                    commit('setToken', res.token)
                    commit('user/setName', res.name, { root: true })
                }
                resolve(res)
            })
        });
    },

    // 登出
    logout({commit}) {
        return new Promise((resolve) => {
            commit('setToken', '')
            commit('user/setName', '', { root: true })
            commit('tagNav/removeTagNav', '', {root: true})
            resolve()
        })
    },

    // 重新获取用户信息及Token
    // TODO: 这里不需要提供用户名和密码，实际中请根据接口自行修改
    relogin({dispatch, commit, state}){
        return new Promise((resolve) => {
            // 根据Token进行重新登录
            let token = Cookies.get('token'),
                userName = Cookies.get('userName')

            // 重新登录时校验Token是否存在，若不存在则获取
            if(!token){
                dispatch("getNewToken").then(() => {
                    commit('setToken', state.token)
                })
            } else {
                commit('setToken', token)
            }
            // 刷新/关闭浏览器再进入时获取用户名
            commit('user/setName', decodeURIComponent(userName), { root: true })
            resolve()
        })
    },

    // 获取新Token
    getNewToken({commit, state}){
        return new Promise((resolve) => {
            axios({
                url: '/getToken',
                method: 'get',
                param: {
                    token: state.token
                }
            }).then((res) =>{
                commit("setToken", res.token)
                resolve()
            })
        })
    },

    // 获取该用户的菜单列表
    getNavList({commit}){
        return new Promise((resolve) =>{
            axios({
                url: '/user/navlist',
                methods: 'post',
                data: {}
            }).then((res) => {
                console.log(res);
                console.log('getNavList');
                commit("setNavList", res)
                resolve(res)
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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}