<template>
    <div class="box">
        <button @click="refresh()">刷新</button>
    </div>
</template>

<script>
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
            console.log('s');
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