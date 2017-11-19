<template>
    <el-dialog
        title="更改用户信息"
        :visible.sync="dialogVisible">
        <div class="form-box">
            <el-form ref="form" :model="form" style="" label-width="100px">
                <el-form-item style="width: 100%" label="用户名">
                    <el-input style="width: 100%" v-model="form.userName"></el-input>
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
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="update">确 定</el-button>
  </span>
    </el-dialog>
</template>
<script>
    import {userType} from '../../../mockData.js'
    export default {
        data: function () {
            return {
                dialogVisible: false,
                type: userType,
                form: {
                    userName: '',
                    password: '',
                    phone:'',
                    grade:'',
                    subject:'',
                    school:'',
                    limitTime:5,
                },
            }
        },
        methods: {
            findOneVideo (id) {
                this.$axios.get(`/user/oneUser?id=${id}`).then(res => {
                    this.form = res.data;
                })
            },
            showDialog(id) {
                this.dialogVisible = true;
                this.findOneVideo(id);
            },
            update(){
                this.$axios.put(`/user/updateUser`, this.form).then(res => {
                    if (res.data.result) {
                        this.$emit('updateTableData',this.form);
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
<style scoped>
    div.el-dialog{
        width: 40%;
    }
    div.form-box{
        width: 100%!important;
    }
</style>
