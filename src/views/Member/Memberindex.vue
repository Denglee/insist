<template>
    <div class="layoutR-main">
        <!--右边iframe-->
        <!--<publicIframe/>-->
    </div>
</template>

<script>
    export default {
        name: "Memberindex",
        data() {
            return {}
        },
        methods: {},
        created() {
            let userId=this.$route.params.user_id;
            console.log(userId);
        },
    }
</script>

<style lang="scss" scoped>

</style>