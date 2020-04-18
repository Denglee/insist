import {staffGroup} from '@/assets/js/api' /*引用  接口*/

function getDepartment(){
    return new Promise((resolve, reject) => {
        staffGroup({
            zmtek_ver:2,
            type:1,     //1 = 获取组列表信息 2 = 添加组信息 3 = 修改组信息 4 = 删除
            name: '',      //添加必传
            id: '',        //删除必传
        }).then(res => {
            if(res.status ==1){
                resolve(res.data);
            }
            if(res.status == 0){
                console.log(res);
                resolve(res.data);
            }
        }).catch(res => {
            console.log(res);
            reject (res)
        });
    });
};

/*使用方法
1.引用：
    import {getDepartment} from '@/assets/js/globalApi' /!*引用 员工部门 接口*!/
2.created调用:
    getDepartment().then(res => {
        console.log(res);
        //this.salerGropu = res;
    });
*/

export  {
    getDepartment,   //获取部门接口
}