<template>
    <div class="box">
        <div>{{ gettersNum }}</div>

        <button @click="actionsNum()">增加</button>
        <button @click="actionsNum2()">减少</button>

        <div>{{gettersName}}</div>
        <input type="text" v-model="title2">
        <button @click="actionsName(title2)">改变state的值</button>


        <div>
            <div>{{userInfo}}</div>
            <input type="text" v-model="loginVal">
            <button @click="aLogin(loginVal)">login</button>
            <button @click="aLogout(loginVal)">loginOut</button>
        </div>

    </div>
</template>

<script>
    import {mapState,mapActions, mapGetters} from 'vuex'
    export default {
        name: "second",
        data(){
            return {
                title2: "",
                price: 60,
                priceTotal: 0,
                loginVal:"",
            }
        },
        methods: {
      /*      ...mapActions('collection',[ //collection是指modules文件夹下的collection.js
                'actionsName'  //collection.js文件中的actions里的方法，在上面的@click中执行并传入实参
            ]),
            ...mapActions('footerStatus',[ //collection是指modules文件夹下的collection.js
                'actionsNum',  //collection.js文件中的actions里的方法，在上面的@click中执行并传入实参
                'actionsNum2'
            ]),*/
            ...mapActions( // 语法糖
                ['actionsName', 'actionsNum','actionsNum2','aLogin','aLogout'] // 相当于this.$store.dispatch('actionsName'),提交这个方法
            ),
            // actionsName(title){
            //     this.$store.commit('mutationsName',title);
            // },
            add() {
                let price = this.price,
                    priceTotal = this.priceTotal,
                    num = this.$store.state.stateNum;
                priceTotal = price * num;
                console.log(num, priceTotal, price, typeof (priceTotal), typeof (num), typeof (price));
                this.priceTotal = priceTotal;
            },
            // bian(){
            //   console.log('a');
            //   let that=this;
            //     this.$store.mutationsName(state,that.title2)
            // },
        },
        computed: {
 /*           ...mapGetters('collection',[ //用mapGetters来获取collection.js里面的getters
                'gettersName',
            ]),
            ...mapGetters('footerStatus',[ //用mapGetters来获取collection.js里面的getters
                'gettersNum',
            ]),*/

            ...mapGetters(['gettersName','gettersNum','userInfo']) // 动态计算属性，相当于this.$store.getters.gettersName
        }
    }
</script>

<style scoped>
    .box > *{
        padding:10px 20px ;
        margin: 10px;
    }
</style>