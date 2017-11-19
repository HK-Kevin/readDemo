<template>
    <el-dialog
        title="添加用户"
        :visible.sync="dialogVisible"
        width="40%">
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="标题">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                   <!-- <el-radio-group v-model="form.type">
                        <el-radio v-for="(item,index) in type" :key="index" :label="item" name="type"></el-radio>
                    </el-radio-group>-->
                    <el-cascader
                        placeholder="选择科目"
                        :options="type"
                        filterable
                        v-model="selectedOptions"
                        @change="handleChange"
                        change-on-select
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
 </span>
    </el-dialog>
</template>

<script>
    import {subjectDataArrDetail} from '../../../mockData.js'

    export default {
        components: {}, data: function () {
            return {
                selectedOptions:[],
                dialogVisible:false,
                type: subjectDataArrDetail,
                form: {
                    name: '',
                    type: '',
                    knowledgePoint:'',
                    url:'',
                    click:0,
                }
            }
        },
        methods: {
            submit(){
                 this.$message.success('提交成功！');
                this.$http({
                    url: '/video/add',
                    method: 'post',
                    data: this.form
                }).then(res => {
                    this.$emit('updateTable');
                    this.dialogVisible = false;
                    this.$message.success('提交成功！');
                })

            },
            showDialog () {
                this.dialogVisible = true

            },
            handleChange() {
                this.form.type = this.selectedOptions[0];
                this.form.knowledgePoint = this.selectedOptions[1]
            }
        },

    }
</script>

<style scoped>
    .editor-btn {
        margin-top: 20px;
    }
</style>
