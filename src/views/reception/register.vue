<template>
    <div>

    </div>
</template>

<script>
    import {recRegister} from '@/assets/js/api'
    export default {
        name: "register",
        data(){
            return{

            }
        },

        methods:{

        },
        created() {
            recRegister().then(res=>{
                console.log(res);
            });
            recRegister().then(res=>{
                console.log(res);
            })
        }
    }
</script>

<style scoped>

</style>