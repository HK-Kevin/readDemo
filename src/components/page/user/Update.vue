<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 用户管理</el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="confirmAllDel">批量删除</el-button>
            <el-select v-model="select_cate" clearable placeholder="选择年级"
                       class="handle-select mr10" style="width:30%" @change="handleChange">
                <el-option v-for="(item,index) in select_data" :key="index" :label="item"
                           :value="item"></el-option>

            </el-select>
            <el-input v-model="searchData" placeholder="筛选姓名" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
            <el-button type="primary" icon="plus" @click="add">添加</el-button>
            <el-button type="primary" icon="arrow-down" @click="importExl">导入</el-button>
            <el-button type="primary" icon="upload2" @click="exportExl">
                <a :href="exportUrl" style="color: white">导出</a>
            </el-button>
        </div>
        <el-table :data="userData"
                  border style="width: 100%"
                  ref="multipleTable"
                  @selection-change="handleSelectionChange"
                  @sort-change="sortChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="userName" label="姓名" width="80">
            </el-table-column>
            <el-table-column prop="grade" label="年级" width="80">
            </el-table-column>
            <el-table-column prop="phone" label="电话(唯一ID)">
            </el-table-column>
            <el-table-column prop="school" label="学校">
            </el-table-column>
            <el-table-column prop="subject" label="薄弱科目">
            </el-table-column>
            <el-table-column prop="limitTime" label="时长(h)" width="100">
            </el-table-column>
            <el-table-column prop="date" label="日期" sortable="custom">
            </el-table-column>
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
        <AddUser ref="addDialog" @updateTable= "selectTypeData([-1])"></AddUser>
        <Upload ref="uploadDialog" @updateTable="selectTypeData([-1])"></Upload>
        <UpdateUser ref="updateDialog" @updateTableData=updateData></UpdateUser>
    </div>
</template>

<script>
    import {userType, rootUrl} from '../../../mockData.js'
    import UpdateUser from './UpdateUser.vue'
    import Upload from './Upload.vue'
    import AddUser from './AddUser.vue'
    export default {
        data() {
            return {
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_data: userType,
                select_cate: '',
                select_word: '',
                del_list: [],
                searchData: '',
                is_search: false,
                userData: [],
                title_page: 1,
                totalPage: 100,
                limit: 7,
                sortIndex:-1
            }
        },
        created(){
            this.selectTypeData([this.sortIndex])
        },
        computed: {
            exportUrl(){
                return rootUrl + '/user/exportUserExcel'
            },
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
                arr = this.select_cate === '' ? [this.sortIndex] :[this.sortIndex , this.select_cate];
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
                this.$axios.get(`/user/search?user=${this.searchData}`).then(res => {
                    this.userData = res.data
                })
            },

            // 编辑
            handleEdit(index, row) {
                this.$refs.updateDialog.showDialog(row._id)
            },

            //单个删除
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
            // 删除功能
            deleteItem (deleteData) {

                    this.$axios.post('/user/deleteUsers', deleteData).then(res => {
                        if (res.data.result) {
                            this.$message.success('删除成功');
                        } else {
                            this.$message.error('删除失败');
                        }
                        this.sortIndex = -1;
                        this.selectTypeData([[this.sortIndex]])
                    });


            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            // 按类查询
            selectTypeData(val){
                let searchCon = {page: this.title_page, limit: this.limit, type: val};
                this.$axios.post('/user/typeUsers', searchCon).then(res => {
                    this.userData = res.data.data;
                    this.totalPage = res.data.count;
                })
            },

            // 更新
            updateData (data) {
                this.userData = this.userData.map((item) => {
                    if (item._id === data._id) {
                        return data
                    }
                    return item
                })
            },

            // 导出exl
            exportExl() {
            },

            // 导入exl
            importExl(){
                this.$refs.uploadDialog.showDialog()
            },

            add() {
                this.$refs.addDialog.showDialog()
            },
            handleChange() {
                let arr = [this.sortIndex]
                if(this.select_cate != ''){
                   arr.push(this.select_cate)
                }
                this.selectTypeData(arr)
            },
            sortChange(item) {
                let arr = [this.sortIndex];
               if(this.select_cate != ''){
                   arr.push(this.select_cate)
               }
                if (item.order === 'descending') {
                    this.sortIndex = 1;
                    this.selectTypeData(arr)

                }else{
                    this.sortIndex = -1;
                    this.selectTypeData(arr)
                }
            },
        },
        components: {UpdateUser, Upload, AddUser}
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 200px;
    }

    .handle-input {
        width: 200px;
        display: inline-block;
    }
</style>
