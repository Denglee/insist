<template>
    <div class="userEdit-box">
        <topTabbar :title="title"/>

        <div class="">
            <!--分类数据-->
            <ul class="shop-box userEdit-box clearfix">
                <li v-if="classifySecondCode == ''">此分类下暂无场景</li>
                <li class="shop-item" v-for="(item,index) in classifySecondCode" :key="index" v-else>
                    <div class="content">
                        <div v-show="!item.publishTime" class="no-release">未发布</div>
                        <img lazy-load fit="imgFit" class="img-fluid"  :src="nowUrl+'/Uploads/'+item.cover" alt="">
                        <div class="ellipsis list-name">{{item.name}}</div>
                    </div>
                    <div class="btn-group">
                        <a v-bind:href="[nowUrl+'/v/'+item.code]" class="btn-look">
                            查看
                        </a>
                        <a v-bind:href="[nowUrl+'/#/scene/create/'+item.id+'?pageId=1']" class="btn-edit">
                            编辑
                        </a>
                        <!--<button type="button">500金币</button>-->
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "userEdit",
        data(){
            return {
                title: "已编辑模板",
                title2: "已编辑状态=statename",
                price: 60,
                priceTotal: 0,

                nowUrl: 'http://www.gddcdz.cn:10009',
                // 已编辑模板数据
                classifySecondCode: [
                    {
                        "id": 8831349,
                        "name": "鞋子",
                        "createUser": "1",
                        "createTime": 1423645519000,
                        "type": 105,
                        "pageMode": 3,
                        "cover": "syspic/pageimg/yq0KA1UCmZeAes1-AABJ7PGgE8Y960.jpg",
                        "image": {
                            "bgAudio": {
                                "url": "",
                                "type": "3"
                            },
                            "imgSrc": "syspic/pageimg/yq0KA1UCmZeAes1-AABJ7PGgE8Y960.jpg",
                            "hideEqAd": 0,
                            "isAdvancedUser": 0
                        },
                        "isTpl": 0,
                        "isPromotion": 0,
                        "status": 1,
                        "openLimit": 0,
                        "submitLimit": 0,
                        "startDate": null,
                        "endDate": null,
                        "accessCode": null,
                        "thirdCode": null,
                        "updateTime": null,
                        "publishTime": 1566210303,
                        "applyTemplate": 0,
                        "applyPromotion": 0,
                        "sourceId": 1225273,
                        "code": "U1008174QS532",
                        "description": "",
                        "sort": 0,
                        "pageCount": 0,
                        "dataCount": 0,
                        "showCount": 2,
                        "userLoginName": null,
                        "userName": null
                    },
                    {
                        "id": 8831309,
                        "name": "",
                        "createUser": "1",
                        "createTime": 1423645519000,
                        "type": 103,
                        "pageMode": 2,
                        "cover": "default_thum.jpg",
                        "image": {
                            "bgAudio": {
                                "url": "",
                                "type": "3"
                            },
                            "imgSrc": "default_thum.jpg",
                            "hideEqAd": 0,
                            "isAdvancedUser": 0
                        },
                        "isTpl": 0,
                        "isPromotion": 0,
                        "status": 1,
                        "openLimit": 0,
                        "submitLimit": 0,
                        "startDate": null,
                        "endDate": null,
                        "accessCode": null,
                        "thirdCode": null,
                        "updateTime": null,
                        "publishTime": null,
                        "applyTemplate": 0,
                        "applyPromotion": 0,
                        "sourceId": 1225273,
                        "code": "U1008ERK8M2",
                        "description": "",
                        "sort": 0,
                        "pageCount": 0,
                        "dataCount": 0,
                        "showCount": 0,
                        "userLoginName": null,
                        "userName": null
                    },
                ],
            }
        },
        methods:{
            ...mapActions( // 语法糖
                ['actionsName','actionsNum'] // 相当于this.$store.dispatch('actionsName'),提交这个方法
            ),
            add(){
                let price=this.price,
                    priceTotal=this.priceTotal,
                    num=this.$store.state.stateNum;
                priceTotal=price * num;
                console.log(num,priceTotal,price,typeof(priceTotal),typeof(num),typeof(price));
                this.priceTotal=priceTotal;
            },

            // 获取 已编辑 数据
            getEditCode(eaditVal){
                this.$axios.get('/index.php?c=scene&a=my',{
                    params: {
                        showData: '',
                        pageNo: 1,
                        pageSize: 12,
                        user: '',
                        name: '',
                        groupId: '',
                    }
                })
                .then(res =>{
                    console.log(res.data);
                    this.classifySecondCode = res.data.list;
                })
                .catch(error=>{
                    console.log("二级导航分类:" + error)
                })
            },
        },

        created(){
            this.getEditCode();
        },
        computed: {
            ...mapGetters(['gettersName','gettersNumber']) // 动态计算属性，相当于this.$store.getters.gettersName
        }
    }
</script>

<style scoped lang="scss">

</style>