<template>
    <div class="layoutR-main">
        <!--右边iframe-->
        <!--<publicIframe/>-->

        <div v-show="staffListState">

            <div class="clearfix">
                <el-button type="primary" class="btn-add fr btn-search" @click="btnAddStaff">添加员工</el-button>
            </div>

            <!--员工列表-->
            <div class="staffList-box vip-tabBox pubWidth">

                    <!--员工列表 筛选-->
                   <!-- <div class="pt-screen">
                        &lt;!&ndash;在职&ndash;&gt;
                        <el-select v-model="value" placeholder="在职" class="pt-screen-item"
                                   style="width: 150px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                        &lt;!&ndash;部门&ndash;&gt;
                        <el-select v-model="value" placeholder="全部" class="pt-screen-item"
                                   style="width: 150px;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>

                        <el-input placeholder="请输入内容" v-model="input3" class="pt-screen-item pt-screen-input"></el-input>

                        &lt;!&ndash;搜索&ndash;&gt;
                        <el-button icon="el-icon-search" @click="searchPT" class="btn-search">搜索</el-button>

                    </div>-->

                    <!--员工列表 表格-->
                    <el-table
                            class="pt-table"
                            :data="PTNumTable2"
                            border>
                        <el-table-column
                                prop="name"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="sex"
                                label="性别">
                        </el-table-column>
                        <el-table-column
                                prop="position"
                                label="职位">
                        </el-table-column>
                        <el-table-column
                                prop="tel"
                                label="电话"
                                width="120px">
                        </el-table-column>
                        <el-table-column
                                prop="jobId"
                                label="工号">
                        </el-table-column>
                        <el-table-column
                                prop="Royalty"
                                label="提成方式">
                        </el-table-column>
                        <el-table-column
                                prop="time"
                                label="创建时间">
                        </el-table-column>
                        <el-table-column
                                prop="state"
                                label="状态">
                            <template slot-scope="scope">
                                <div v-if="scope.row.state == 1 " class="status-connect">在职</div>
                                <div v-if="scope.row.state == 0 " class="status-break">离职</div>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="操作"
                                width="200">
                            <template slot-scope="scope">
                                <div class="flex-between">
                                    <el-button @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit"></el-button>
                                    <el-button type="danger" @click="handleDelete(scope.$index, scope.row,PTNumTable2)" icon="el-icon-delete"></el-button>
                                </div>

                            </template>
                        </el-table-column>

                    </el-table>

                    <div class="ptTable-assist">
                        <el-pagination
                                background
                                layout="prev, pager, next,total,jumper"
                                :total="20">
                        </el-pagination>
                    </div>
                </div>
        </div>

        <!--提成 编辑弹出-->
        <el-dialog title="员工编辑" :visible.sync="EditListForm">
            <el-form :model="editForm">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="editForm.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="editForm.sex" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="职位" :label-width="formLabelWidth">
                    <el-input v-model="editForm.position" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="电话号码" :label-width="formLabelWidth">
                    <el-input v-model="editForm.tel" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="编号" :label-width="formLabelWidth">
                    <el-input v-model="editForm.jobId" autocomplete="off"></el-input>
                    <div>请输入编号，如：小惠，编号写：xh,便于后期快速查询</div>
                </el-form-item>

                <el-form-item label="提成方式" :label-width="formLabelWidth">
               <!--     <el-select v-model="editForm.Royalty" placeholder="请选择">
                        <el-option
                                v-for="item in RoyaltyOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>-->
                    <!--                    <el-input v-model="editForm.Royalty" autocomplete="off"></el-input>-->
                </el-form-item>

                <el-form-item label="创建时间" :label-width="formLabelWidth">
                    <el-date-picker
                            v-model="editForm.time"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="状态" :label-width="formLabelWidth">
                    <template>
                        <el-radio v-model="editForm.state" label="0">离职</el-radio>
                        <el-radio v-model="editForm.state" label="1">在职</el-radio>
                    </template>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureEdit()">确 定</el-button>
            </div>
        </el-dialog>

        <!--添加员工-->
        <div v-show="addStaffState" class="vip-tabBox">
            <navBread @GoBack="goBack('staffListState','addStaffState')" breadTitle="员工列表" breadContent1="添加员工"></navBread>
            <el-form :model="editForm" class="addForm-box">
                <el-form-item label="员工头像" :label-width="formLabelWidth">
                    <div>
                        <!-- 多图片上传 -->
                        <el-upload v-if="multiple" action='string' list-type="picture-card" accept="image/*" :on-preview="handlePreview"
                                   :auto-upload="false" :on-remove="handleRemove"
                                   :http-request="upload" :on-change="consoleFL" :file-list="uploadList">
                            <i class="el-icon-plus"></i>
                        </el-upload>

                        <!-- 单图片上传 -->
                        <el-upload v-else class="avatar-uploader" action="'string'" :auto-upload="false" :show-file-list="false" :on-change="handleCrop"
                                   :http-request="upload" list-type="picture">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" ref="singleImg" @mouseenter="mouseEnter" @mouseleave="mouseLeave" >
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>

                            <!-- 单图片上传状态显示 -->
                            <div id="uploadIcon" v-if="imageUrl" ref="reupload" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
                                <i class="el-icon-zoom-in" @click.stop="handlePreviewSingle"></i>
                                <i class="el-icon-upload"></i>
                            </div>
                            <div class="reupload" ref="uploading" >上传中..</div>
                            <div class="reupload" ref="failUpload" >上传失败</div>
                        </el-upload>

                        <!-- 多图片预览弹窗 -->
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>

                        <!-- 剪裁组件弹窗 -->
                        <el-dialog :visible.sync="cropperModel" width="1100px" :before-close="beforeClose">
                            <Cropper :img-file="file" ref="vueCropper" :fixedNumber="fixedNumber" @upload="upload">
                            </Cropper>
                        </el-dialog>
                    </div>
                </el-form-item>

                <el-form-item label="职位" :label-width="formLabelWidth">
                    <el-select v-model="editForm.jobId" placeholder="请选择活动区域"  class="inpStaffTel">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="editForm.position" autocomplete="off"  class="inpStaffName" clearable></el-input>
                </el-form-item>

                <el-form-item label="编号" :label-width="formLabelWidth">
                    <el-input v-model="editForm.tel" autocomplete="off" clearable class="inpStaffName"></el-input>
                </el-form-item>

                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio-group v-model="editForm.jobId" class="inpStaffName">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="editForm.jobId" autocomplete="off" clearable class="inpStaffTel"></el-input>
                </el-form-item>

                <el-form-item label="班次" :label-width="formLabelWidth">
                    <el-select v-model="editForm.jobId" placeholder="请选择活动区域"  class="inpStaffTel">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="价格模式" :label-width="formLabelWidth">
                    <el-select v-model="editForm.jobId" placeholder="请选择活动区域"  class="inpStaffTel">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="基本工资" :label-width="formLabelWidth">
                    <el-input v-model="editForm.jobId" autocomplete="off" class="inpStaffTel"></el-input>
                </el-form-item>

                <el-form-item label="提成方式1" :label-width="formLabelWidth" >
                    <el-select v-model="editForm.jobId" placeholder="请选择活动区域" class="inpStaffTel">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="备注" :label-width="formLabelWidth">
<!--                    <el-input v-model="editForm.jobId" autocomplete="off"></el-input>-->

                    <Editor  v-model="detail" :isClear="isClear" @change="change"></Editor>

                </el-form-item>

                <el-form-item :label-width="formLabelWidth">
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>

                </el-form-item>
            </el-form>





        </div>

    </div>
</template>

<script>
    import Cropper from '@/components/cropper/cropper';
    import Editor from '@/components/wangEnduit/wangEnduit'
    import navBread from '@/components/Echarts/navBread'

    export default {
        name: "Staffindex",  //员工列表

        props: {
            targetUrl: {
                // 上传地址
                type: String,
                // default: '/storage/upload'
                default: `${process.env.API_ROOT}/sys/oss/upload`
            },
            multiple: {
                // 多图开关
                type: Boolean,
                default: false
            },
            initUrl: {
                // 初始图片链接
                default: ''
            },
            fixedNumber: {
                // 剪裁框比例设置
                default: function () {
                    return [1.5, 1];
                }
            },
            width: {
                // 单图剪裁框宽度
                type: Number,
                default: 178
            },
            height: {
                // 单图剪裁框高度
                type: Number,
                default: 178
            }
        },
        data() {
            return {

                file: '', // 当前被选择的图片文件
                imageUrl: '', // 单图情况框内图片链接
                dialogImageUrl: '', // 多图情况弹窗内图片链接
                uploadList: [], // 上传图片列表
                reupload: true, // 控制"重新上传"开关
                dialogVisible: false, // 展示弹窗开关
                cropperModel: false, // 剪裁组件弹窗开关
                reuploadWidth: this.height * 0.7, // 动态改变”重新上传“大小

                isClear: false,
                detail:"",

                PTNumTable2: [{
                    name:"李登",
                    sex:"男",
                    position:"教练",
                    tel:"17688888444",
                    jobId:"20136",
                    Royalty: '教练提成',
                    time: '2020-02-27',
                    state: "1",
                    // caozuo: '操作',
                },{
                    name:"小丽",
                    sex:"女",
                    position:"前台",
                    tel:"17688888544",
                    jobId:"20137",
                    Royalty: '前台提成',
                    time: '2020-01-27',
                    state: "0",
                    // caozuo: '操作',
                }
                ],

                formLabelWidth: '120px',
                EditListForm:false,
                editForm:{
                    name:"",
                    sex:"",
                    position:"",
                    tel:"",
                    jobId:"",
                    Royalty: '',
                    time: '',
                    state: "",
                },

                staffListState:false,

                /*添加员工*/
                addStaffState:true,

            }
        },

        updated () {
            if (this.$refs.vueCropper) {
                this.$refs.vueCropper.Update();
            }
        },
        watch: {
            initUrl: function (val) {
                console.log(val);
                // 监听传入初始化图片
                // console.info('watch');
                if (val) {
                    if (typeof this.initUrl === 'string') {
                        this.imageUrl = val;
                    } else {
                        this.uploadList = this.formatImgArr(val);
                        // this.$emit('imgupload', this.uploadList);
                    }
                }
            }
        },
        mounted () {
            if (typeof this.initUrl === 'string') {
                this.imageUrl = this.initUrl;
            } else {
                this.uploadList = this.formatImgArr(this.initUrl);
            }
        },

        methods: {

            /** **************************** multiple多图情况 **************************************/
            handlePreview (file) {
                console.log(file);
                // 点击进行图片展示
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleRemove (file, fileList) {
                // 删除图片后更新图片文件列表并通知父级变化
                this.uploadList = fileList;
                this.$emit('imgupload', this.uploadList);
                // this.$emit('imgupload', this.formatImgArr(this.uploadList));
            },
            consoleFL (file, fileList) {
                console.log(file);
                // 弹出剪裁框，将当前文件设置为文件
                this.cropperModel = true;
                this.file = file;
                // this.uploadList = fileList;
            },
            /************************************************************************************/

            /** **************************** single单图情况 **************************************/
            handlePreviewSingle (file) { // 点击进行图片展示
                console.log(file);
                this.dialogImageUrl = this.file.url;
                this.dialogVisible = true;
            },
            mouseEnter () { // 鼠标划入显示“重新上传”
                this.$refs.reupload.style.display = 'block';
                if (this.$refs.failUpload.style.display === 'block') {
                    this.$refs.failUpload.style.display = 'none';
                }
                this.$refs.singleImg.style.opacity = '0.6';
            },
            mouseLeave () {
                // 鼠标划出隐藏“重新上传”
                this.$refs.reupload.style.display = 'none';
                this.$refs.singleImg.style.opacity = '1';
            },
            handleCrop (file, files) {
                console.log(file);
                // 点击弹出剪裁框
                this.cropperModel = true;
                this.file = file;
                // this.imageUrl = file.url
            },
            /************************************************************************************/

            async upload (data) {
                // 自定义upload事件
                if (!this.multiple) {
                    // 如果单图，则显示正在上传
                    this.$refs.uploading.style.display = 'block';
                }
                let img = new Image();
                img.src = data;
                img.onload = async () => {
                    // let _data = this.compress(img);
                    let blob = this.dataURItoBlob(data);
                    let formData = new FormData();
                    formData.append('file', blob, this.file.name); // 有的后台需要传文件名，不然会报错
                    this.imgUpload(formData);
                };
            },
            async imgUpload(formData) {
                const res = await this.$http({
                    url: 'sys/oss/upload',
                    method: 'post',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (!this.multiple) {
                    // 上传完成后隐藏正在上传
                    this.$refs.uploading.style.display = 'none';
                }
                if (res.data.code === 0) {
                    // 上传成功将照片传回父组件
                    const currentPic = res.data.url;
                    if (this.multiple) {
                        this.uploadList.push({
                            url: currentPic,
                            uid: '111'
                        });
                        this.$emit('imgupload', this.uploadList);// 根据自己实际项目需要将照片返回给父组件
                        // this.uploadList.pop();
                        // this.$emit('imgupload', this.formatImgArr(this.uploadList));
                    } else {
                        this.$emit('imgupload', currentPic);
                    }
                    this.$refs.vueCropper.isDisabled = false;
                } else {
                    // 上传失败则显示上传失败，如多图则从图片列表删除图片
                    if (!this.multiple) {
                        this.$refs.failUpload.style.display = 'block';
                    } else {
                        this.uploadList.pop();
                    }
                    this.$refs.vueCropper.isDisabled = false;
                }
                this.cropperModel = false;
            },

            formatImgArr (arr) {
                const result = arr.map((item, index) => {
                    if (typeof item === 'string') {
                        return {
                            url: item,
                            uid: `index${index}`
                        };
                    } else {
                        return item.url;
                    }
                });
                return result;
            },

            beforeClose () {
                // this.uploadList.pop();
                console.log(this.uploadList);
                this.cropperModel = false;
            },

            // 压缩图片
            compress(img) {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                // let initSize = img.src.length;
                let width = img.width;
                let height = img.height;
                canvas.width = width;
                canvas.height = height;
                // 铺底色
                ctx.fillStyle = '#fff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, width, height);
                // 进行压缩
                let ndata = canvas.toDataURL('image/jpeg', 0.8);
                return ndata;
            },

            // base64转成bolb对象
            dataURItoBlob(base64Data) {
                let byteString;
                if (base64Data.split(',')[0].indexOf('base64') >= 0) { byteString = atob(base64Data.split(',')[1]); } else { byteString = unescape(base64Data.split(',')[1]); }
                let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
                let ia = new Uint8Array(byteString.length);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                return new Blob([ia], { type: mimeString });
            },

            change(val) {
                console.log(val)
            },

            /*添加员工显示*/
            btnAddStaff(){
                this.staffListState = false;
                this.addStaffState = true;
            },

            /*编辑*/
            handleEdit(index, row) {
                console.log(index, row);
                console.log(row);
                this.editForm = row;
                this.EditListForm = true;
            },

            /*编辑确定*/
            sureEdit(){
                console.log(this.editForm);

                this.$message({
                    type:'success',
                    duration:'1500',
                    message:'更新成功'
                });

                this.EditListForm = false;
            },

            /*删除*/
            handleDelete(index,row, rows) {
                console.log(index);
                console.log(row);

                rows.splice(index, 1);

            },

            /* 返回上一页 */
            goBack(e1, e2) {
                console.log(e1);
                this[e1] = true;   //显示 列表
                this[e2] = false;   //隐藏当前
            },
        },
        created() {

        },
        components: {
            navBread,
            Editor,
            Cropper,
        },
    }
</script>

<style lang="scss">
    @import "@/assets/css/totalVip.scss";
    @import "@/assets/css/staff.scss";
</style>