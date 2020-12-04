<template>
    <div>
        <div class="btnNav-contain">
            <navRefush class="btnNav-left"  @SecondBack="SecondBackBtn"></navRefush>
        </div>

        <div class="bgWhite-public">
            <div class="bgWhite-padd20">
                会员充值
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name: "menberRecharge",     //会员充值
        data() {
            return {}
        },
        methods: {
            // 返回上一页
            SecondBackBtn(){
                this.$emit('GoBack','memberInfo','memberInfo');
            },
        },
        created() {

        },
        components:{

        },
    }
</script>
