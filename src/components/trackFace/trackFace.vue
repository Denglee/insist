<template>
    <div class="testTracking">

        <el-button type="button" @click="stateArr.diaTrack = true">拍照</el-button>

        <el-dialog  :append-to-body="true" title="人脸识别" :visible.sync="stateArr.diaTrack" @open="checkFace" @close="stopCheck"
                   custom-class="face-dialog" :close-on-click-modal="false">
            <div class="demo-container">
                <video id="videoFace" width="640" height="480" preload autoplay loop muted class="face-video" ref="videoRef"></video>
                <canvas id="canvasFace" width="640" height="480" class="face-canvas" ref="canvasRef"></canvas>
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
                stateArr:{
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
                this.$message('chenggong',1500);
                return false

                let that = this;
                this.stateArr.diaTrack = true;  //弹窗显示
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
                                isChecked = '已经有值';
                                let userBase = that.getBase64();       //获取到的图片转bese64，传后台
                                that.matchArr.userbase = userBase;
                                checkFaceApi( that.matchArr).then(res=>{
                                    console.log(res);
                                    if(res.status == 1){      //比对成功
                                        setTimeout(function () {
                                            that.stateArr.diaTrack = false;
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
    .testTracking .face-dialog{
        padding:0 30px 30px;
        width: 700px;
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
    }



</style>



