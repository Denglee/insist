<template>
    <div>
        顾问跟进
        {{followVipInfo}}
    </div>
</template>

<script>
    export default {
        name: "followAdviser",   //顾问跟进
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
