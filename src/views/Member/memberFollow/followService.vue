<template>
    <div>
        {{followVipInfo}}
    </div>
</template>

<script>
    export default {
        name: "followService",    //客服跟进
        props:{
            followVipInfo:{
                type:Array,
            }
        },
        data() {
            return {}
        },
        methods: {},
        created() {

        },
    }
</script>
