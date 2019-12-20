<template>
    <div class="layoutR-main">
        这是首页
    </div>
</template>

<script>

    export default {
        name: "index",
        data() {
            return {}
        },
        methods: {
            getIndex() {
                // recRegister({
                //
                // }).then((res) =>{
                //     console.log(res);
                // })
            }
        },
        created() {
            this.getIndex();
        },
        computed: {}
    }
</script>

<style scoped>
    iframe {
        width: 100%;
        min-height: 100vh;
    }
</style>