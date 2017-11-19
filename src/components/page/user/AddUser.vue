<template>
    <el-dialog
        title="添加用户"
        :visible.sync="dialogVisible"
        width="40%">
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="用户名">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="年级">
                    <el-radio-group v-model="form.grade">
                        <el-radio v-for="(item,index) in type" :key="index" :label="item" name="type"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="学校">
                    <el-input v-model="form.school"></el-input>
                </el-form-item>
                <el-form-item label="薄弱科目">
                    <el-input v-model="form.subject"></el-input>
                </el-form-item>
                <el-form-item label="时长">
                    <el-input placeholder="请输入时间" v-model="form.limitTime">
                        <template slot="append">小时</template>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
 </span>
    </el-dialog>
</template>

<script>
    import {userType} from '../../../mockData.js'
    export default {
        components: {}, data: function () {
            return {
                dialogVisible: false,
                type: userType,
                form: {
                    userName: '',
                    password: 'allwin',
                    phone:'',
                    grade:'',
                    subject:'',
                    school:'',
                    limitTime:5,
                },
            }
        },
        methods: {
            showDialog(id) {
                this.dialogVisible = true;
            },
            submit(){
                 this.$http({
                    url: '/user/add',
                    method: 'post',
                    data: this.form
                }).then(res => {
                     if(res.data.result){
                         this.$emit('updateTable');
                         this.dialogVisible = false;
                         this.$message.success(res.data.msg);
                     }else{
                         this.$message.info(res.data.msg);
                     }

                 })
            }
        }
    }
</script>

