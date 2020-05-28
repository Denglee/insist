<template>
    <div class="testTracking">

        <el-button type="button" @click="stateShow.diaTrack = true">拍照</el-button>

        <el-dialog  :append-to-body="true" title="人脸识别" :visible.sync="stateShow.diaTrack" @open="checkFace" @close="stopCheck"
                   custom-class="face-dialog" :close-on-click-modal="false">
            <div class="demo-container">
                <div v-if="!matchArr.userbase">
                    <video id="videoFace" width="640" height="480" preload autoplay loop muted class="face-video" ref="videoRef"></video>
                    <canvas id="canvasFace" width="640" height="480" class="face-canvas" ref="canvasRef"></canvas>
                </div>
                <div v-else>
                    <img :src="matchArr.userbase" alt="">
                    <el-button @click="sendFace" class="btn-sendFace">确定</el-button>
                </div>
                <el-button @click="restraCheck" class="btn-restart">重新拍照</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import tracking from '@/assets/track/tracking-min.js'
    import '@/assets/track/face-min.js'
    import '@/assets/track/eye-min.js'
    import '@/assets/track/mouth-min.js'

    import {checkFaceApi} from '@/assets/js/api'
    export default {
        name:'trackFace',  //人脸识别

        data(){
            return {
                stateShow:{
                    diaTrack:false,   //识别框 弹出状态
                },

                trackArr:{
                    trackerTask: null,
                    trackering: null,
                    mediaStreamTrack: null
                },

                matchArr:{
                    userbase: '',   // 传到后台的base64
                    city_id : 66 ,       //city_id 后续可能要改,暂时先写死
                }
            }
        },
        methods:{
            /*监测人脸*/
            checkFace() {
                // this.$message('chenggong',1500);
                // return false

                let that = this;
                this.stateShow.diaTrack = true;  //弹窗显示
                this.matchArr.userbase = '';
                this.$nextTick(function () { //dom已更新
                    const video = this.trackArr.mediaStreamTrack = document.getElementById('videoFace');
                    const canvas = document.getElementById('canvasFace');
                    const context = canvas.getContext('2d');
                    let tracker = new window.tracking.ObjectTracker(['face', 'eye', 'mouth']);
                    this.trackArr.trackerTask = window.tracking.track('#videoFace', tracker, {camera: true});
                    let isChecked = '';   //有值 则开始axios

                    /*开始检测*/
                    tracker.on('track', function (event) {
                        if (!isChecked) {
                            if (event.data.length === 0) {
                                console.log('当前画面没有人脸');
                            } else {
                                console.log('jiancedaole');
                                isChecked = '已经有值';
                                let userBase = that.getBase64();       //获取到的图片转bese64，传后台
                                that.matchArr.userbase = userBase;

                                that.stopCheck();

                                return false

                                checkFaceApi( that.matchArr).then(res=>{
                                    console.log(res);
                                    if(res.status == 1){      //比对成功
                                        setTimeout(function () {
                                            that.stateShow.diaTrack = false;
                                            that.stopCheck();
                                        },800)
                                        that.$message({
                                            message: res.msg,
                                            type: 'success',
                                            duration: 1500,
                                            offset: 100,
                                        });

                                        console.log('chenggong'+res)
                                    }
                                    if(res.status == 0){     //比对失败
                                        setTimeout(function(){
                                            isChecked = '';
                                        },1500)
                                        that.$message({
                                            message: res.msg,
                                            type: 'error',
                                            duration: 3000,
                                            offset: 40,
                                        });
                                    }
                                }).catch(res=>{
                                    console.log(res);
                                })

                            }
                        }
                    });
                });
            },

            // face传给外面fowm
            sendFace() {
                 this.stateShow.diaTrack = false;
                 this.$emit('getFace', this.matchArr.userbase);
            },

            // 重新监测
            restraCheck(){
                this.checkFace();
            },

            /*转base64*/
            getBase64() {
                let canvas = document.getElementById('canvasFace');
                let video = document.getElementById('videoFace');
                let context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, 640, 480);      //（对象,x起点,y起点，宽，高 ）
                video.setAttribute("crossOrigin",'Anonymous');
                let dataURL = canvas.toDataURL("image/jpeg", 0.8);   //(图片类型:png?jpg , 情绪度：0-1)
                return dataURL;
            },

            // 停止监测
            stopCheck(){
                if(!this.trackArr.mediaStreamTrack){
                    return
                }
                // 关闭摄像头和侦测
                this.trackArr.mediaStreamTrack.srcObject.getTracks()[0].stop();
                this.trackArr.trackerTask.stop();
            },
        },

        destroyed () {
            this.stopCheck();
        },
        mounted(){
            // this.checkFace();
        },
        created() {

        },
    }

</script>

<style lang="scss">
    .face-dialog{
        padding:0 30px 30px;
        width: 700px;
        /*height: 20vh;*/
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -ms-box-sizing: border-box;
        box-sizing: border-box;
        .el-dialog__close{
            border: solid 1px #909399;
            border-radius: 50%;
            height: 20px;
            width: 20px;
            line-height: 20px;
            text-align: center;
            &:hover{
                border: solid 1px #005ad4;
                background-color:#005ad4 ;
                color: #fff;
            }
        }
        .el-dialog__header{
            padding: 20px 0;
        }
        .el-dialog__body{
            padding: 0;
        }
        .demo-container {
            width: 640px;
            height: 480px;
            position: relative;
            top: 0;
            left: 0;
            background: #eee;
            overflow: hidden;
            border-radius: 10px;
        }

        .face-video {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 11;
        }

        .face-canvas {
            opacity: 0;
            display: none;
            position: absolute;
            top: 10px;
            left: 0;
        }
        .btn-sendFace{
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 111;
        }
        .btn-restart{
            position: absolute;
            bottom: 0;
            left: 200px;
            z-index: 111;
        }
    }



</style>



