<template>
    <el-dialog
        title="更改视频"
        :visible.sync="dialogVisible"
        width="20%">
        <el-upload
            class="upload-demo"
            accept="excel"
            :data="{'name':'excel'}"
            drag
            :action="importUrl">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传Excl文件</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirm">确 定</el-button>
  </span>
    </el-dialog>
</template>
<script>
    import {userType,rootUrl} from '../../../mockData.js'
    export default {
        data: function () {
            return {
                fileList:[],
                dialogVisible: false,
            }
        },
       computed:{
           importUrl(){
               return rootUrl + '/user/importUserExcel'
           },
       },
        methods: {
            findOneVideo (id) {
                this.$axios.get(`/user/oneUser?id=${id}`).then(res => {
                    this.form = res.data;
                })
            },
            showDialog() {
                this.dialogVisible = true;
            },
            confirm() {
                this.dialogVisible = false;
                this.$emit('updateTable')
           }
        }
    }

</script>

<style scoped>
</style>
