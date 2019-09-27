<template>
    <div class="box">
        <button @click="refresh()">刷新</button>
    </div>
</template>

<script>
    // import {recRegister} from "../../assets/js/api"
    export default {
        name: "query",
        inject:['reload'],
        data(){
            return{

            }
        },
        methods:{
            refresh(){
                this.reload();
            },
        },
        created() {
            recRegister().then(res=>{
                console.log(res);
            });
            recRegister().then(res=>{
                console.log(res);
            });
        }

    }
</script>

<style scoped>
    .box{
        width: 100%;
        height: 100vh;
        background-color: red;
    }
</style>