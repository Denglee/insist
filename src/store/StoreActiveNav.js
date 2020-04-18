const state = {
    // 是否要缓存页面，默认不缓存
    cachePage: true,

    // 已经打开的页面
    openedPageList: [],

    // 缓存的页面
    cachedPageName: []
}

const mutations = {
    addTagNav(state, data){
        // console.log(data);
        if (state.openedPageList.some(v => v.path === data.path)) return;
        if(state.cachedPageName.includes(data.name)){  //includes() 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false
            console.error(`${data.name} 组件出现命名重复，请检查组件中的name字段。当前组件所在的路由地址为：${data.path}`);
            return
        }
        state.openedPageList.push(data);
        state.cachedPageName.push(data)

    },
    removeTagNav(state, data){
        if(data){
            for(let [i, v] of state.openedPageList.entries()){
                if(v.path === data.path){
                    state.openedPageList.splice(i, 1);
                    //splice(i,v) 方法向/从数组中添加/删除项目，然后返回被删除的项目。
                    //i 必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。  删除的位置
                    //必需。要删除的项目数量。如果设置为 0，则不会删除项目。       删除的数量
                }
            }

            if(state.cachePage){
                let index = state.cachedPageName.indexOf(data.name);
                if(index >= 0){
                    state.cachedPageName.splice(index, 1);
                }
            }
        } else{
            state.openedPageList = [];
            state.cachedPageName = []
        }
    }
}


export default {
    namespaced: true,  //所属的模块名
    state,
    mutations
}