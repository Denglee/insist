<template>
    <div class="box">
        <router-view></router-view>

        <button @click="refresh()">刷新</button>
    </div>
</template>

<script>
    // import {recRegister} from '@/assets/js/api'
    export default {
        name: "registerRec",
        data(){
            return{

            }
        },

        methods:{

        },
        created() {
            // recRegister().then(res=>{
            //     console.log(res);
            // });
            // recRegister().then(res=>{
            //     console.log(res);
            // })
        }
    }
</script>

<style scoped>

</style>