<template>
    <el-dialog
        title="更改视频"
        :visible.sync="dialogVisible"
        width="40%">
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="40px">
                <el-form-item label="标题">
                    <el-input v-model="form.name" style="width: 80%"></el-input>
                </el-form-item>
                <el-form-item label="类型" style="width: 80%">
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
                    <el-input v-model="form.url" style="width: 80%"></el-input>
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
    import {subjectDataArrDetail} from '../../../mockData.js'
    export default {
        data: function () {
            return {
                selectedOptions:[],
                dialogVisible: false,
                type: subjectDataArrDetail,
                form: {
                    _id: '',
                    name: '',
                    type: '',
                    knowledgePoint:'',
                    url:'',
                    click:0,
                },
            }
        },
        created(){
        },
        watch: {},
        methods: {
            findOneVideo (id) {
                this.$axios.get(`/video/oneVideo?id=${id}`).then(res => {
                    this.form = res.data;

                    if(res.data.knowledgePoint === undefined){
                        res.data.knowledgePoint =''
                    }
                    this.selectedOptions =[res.data.type,res.data.knowledgePoint];
                    console.log(this.selectedOptions)

                })
            },
            showDialog(id) {
                this.dialogVisible = true;
                this.findOneVideo(id);
            },
            update(){
                this.dialogVisible = false;
                this.$axios.put(`/video/updateVideo`, this.form).then(res => {
                    if (res.data.result) {
                        this.$emit('updateTableData',this.form);
                        this.$message.success('更新成功！');
                    }
                })

            },
            handleChange() {
                this.form.type = this.selectedOptions[0];
                this.form.knowledgePoint = this.selectedOptions[1]
            }
        }
    }

</script>

<style scoped>
</style>
