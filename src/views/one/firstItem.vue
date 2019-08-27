<template>
    <div>
        sdfsad
    </div>
</template>

<script>
    export default {
        name: "first",
        data(){
            return {

            }
        },
        created() {
            this.$axios.post('/index')
            .then(res =>{
                console.log(res.data);
            })
            .catch(error=>{
                console.log("index:" + error)
            })
        }
    }
</script>

<style scoped>

</style>