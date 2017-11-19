<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 视频管理</el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="confirmAllDel">批量删除</el-button>
            <!-- <el-select v-model="select_cate" placeholder="choose type" clearable class="handle-select mr10"
                        style="width:30%" @change="selectTypeData">
                 <el-option v-for="(item,index) in select_data" :key="index" :label="item.label"
                            :value="item.label"></el-option>

             </el-select>-->
            <el-cascader
                placeholder="选择科目"
                :options="select_data"
                filterable
                v-model="selectedOptions"
                @change="handleChange"
                change-on-select
            ></el-cascader>
            <el-input v-model="searchData" placeholder="筛选 | 用户名" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
            <el-button type="primary" icon="plus" @click="add">添加</el-button>
        </div>

        <el-table :data="videoData"
                  border style="width: 100%"
                  ref="multipleTable"
                  @selection-change="handleSelectionChange"
                  @sort-change="sortChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <!-- <el-table-column prop="_id" label="id" sortable width="150">
             </el-table-column>-->
            <el-table-column prop="name" label="标题" width="150">
            </el-table-column>
            <el-table-column prop="url" label="地址">
            </el-table-column>
            <el-table-column prop="type" label="科目" width="70">
            </el-table-column>
            <el-table-column prop="knowledgePoint" label="知识点" width="100">
            </el-table-column>
            <el-table-column prop="date" label="时间" width="180" sortable="custom">
            </el-table-column>
            <!--  <el-table-column prop="date" label="date">
              </el-table-column>-->
            <el-table-column label="操作" width="140">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="small" type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change="handlePage"
            layout="prev, pager, next"
            :page-size="limit"
            :total="totalPage">
        </el-pagination>
        <update-video ref="updateDialog" @updateTableData=updateData></update-video>
        <add-video ref="addDialog" @updateTable="selectTypeData([1])"></add-video>
    </div>
</template>

<script>
    import {subjectDataArrDetail} from '../../../mockData.js'
    import UpdateVideo from './UpdateVideo.vue'
    import AddVideo  from './AddVideo.vue'
    export default {
        data() {
            return {
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_data: subjectDataArrDetail,
                select_cate: '',
                selectedOptions: [],
                select_word: '',
                del_list: [],
                searchData: '',
                is_search: false,
                videoData: [],
                title_page: 1,
                totalPage: 100,
                limit: 9,
                sortIndex:-1
            }
        },
        created(){
            this.selectTypeData([this.sortIndex])
        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function (d) {
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if (d.name === self.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(self.select_cate) > -1 &&
                            (d.name.indexOf(self.select_word) > -1 ||
                            d.address.indexOf(self.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            // 分页
            handlePage(val){
                let arr = [];
                this.title_page = val;
                if(this.selectedOptions.length===0){
                    arr = [this.sortIndex]
                }else {
                    arr = this.buildSerachCondition();
                }
                this.selectTypeData(arr)
            },


            // 查询
            search(){
                if (!this.searchData) {
                    this.$message({
                        message: '请输入查询内容',
                        type: 'warning'
                    });
                    return;
                }
                this.$axios.get(`/video/search?video=${this.searchData}`).then(res => {
                    this.totalPage = 10;
                    this.videoData = res.data
                })
            },

            // 编辑
            handleEdit(index, row) {
                this.$refs.updateDialog.showDialog(row._id)
            },

            //单个删除
            handleDelete(index, row) { this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let deleteId = {id: [row._id]};
                this.deleteItem(deleteId);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

            },

            // 确认是否删除
            confirmAllDel(){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delAll();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            // 删除所有
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                let arr = [];
                this.del_list.forEach(item => {
                    arr.push(item._id)
                });
                let deleteData = {id: arr};
                this.deleteItem(deleteData);
            },

            deleteItem (deleteData) {
                    this.$axios.post('/video/deleteVideos', deleteData).then(res => {
                        if (res.data.result) {
                            this.$message.success('删除成功');
                        } else {
                            this.$message.error('删除失败');
                        }
                        this.sortIndex = -1;
                        this.selectTypeData([this.sortIndex])
                    });


            },

            // 全选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            // 按类查询
            selectTypeData(val){
                let searchCon = {page: this.title_page, limit: this.limit, type: val};
                this.$axios.post('/video/typeVideos', searchCon).then(res => {
                    this.videoData = res.data.data;
                    this.totalPage = res.data.count;
                })
            },

            // 更新
            updateData (data) {
                this.videoData = this.videoData.map((item) => {
                    if (item._id === data._id) {
                        return data
                    }
                    return item
                })
            },

            add() {
                this.$refs.addDialog.showDialog()
            },
            handleChange() {
                let arr = this.buildSerachCondition();
                this.selectTypeData(arr)
            },
            sortChange(item) {
                let arr =[this.sortIndex ,...this.selectedOptions];
                if (item.order === 'descending') {
                    this.sortIndex = 1;

                    this.selectTypeData(arr)

                }else{
                    this.sortIndex = -1;
                    this.selectTypeData(arr)
                }
            },
            buildSerachCondition() {
                let arr =[];
                arr.push(this.sortIndex);
                arr.push(this.selectedOptions[0]);
                if(this.selectedOptions.length>1) arr.push(this.selectedOptions[1]);
                return arr;
            }

        },

        components: {UpdateVideo, AddVideo}
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
</style>
