<template>
    <div>
        <div style="padding-bottom:20px">
            <el-button type="primary" @click="addUser">新增</el-button>
        </div>
         <StandardTable
            :data="model"
            :loading="pageLoading"
            :total="pageTotal"
            :pageNumber.sync="pageQuery.pageNumber"
            :pageSize.sync="pageQuery.pageSize"
            @pagination="fetch"
        >
            <el-table-column prop="username" label="用户名" width="140">
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row._id)" type='text' size="small">编辑</el-button>
                    <el-button @click="remove(scope.row)" type='text' size="small">删除</el-button>
                </template>
            </el-table-column>
        </StandardTable>
        <el-dialog :title="isAdd ? '新增管理员':'编辑管理员'" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="user">
                <el-form-item label="用户名" label-width="80px">
                    <el-input v-model="user.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="80px">
                    <el-input v-model="user.password" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="createUser">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import StandardTable from '@/components/StandardTable'
    export default {
        components:{
            StandardTable
        },
        data() {
            return {
                dialogFormVisible:false,
                model: [],
                user:{username:''},
                pageLoading:false,
                pageTotal:0,
                pageQuery:{
                    pageNumber:1,
                    pageSize:10
                },
                isAdd:true,
                editId:''
            };
        },
        created() {
            this.fetch()
        },
        methods:{
            fetch(){
                this.$http.get('userlist',{params:this.pageQuery}).then(res => {
                    this.model = res.data.content
                    this.pageTotal = Number(res.data.totalElements)
                    this.pageQuery.pageNumber = res.data.pageNumber
                    this.pageQuery.pageSize = res.data.pageSize
                })
            },
            edit(id){
              this.isAdd = false
              this.dialogFormVisible = true
              this.editId = id
              this.$http.get(`/user/${id}`).then(res => {
                this.user.username = res.data.username
              })
            },
            async remove(row){
                this.$confirm(`此操作将删除管理员${row.username}, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let user = await this.$http.delete(`user/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.fetch()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                });
            },
            async createUser(){
              if(this.isAdd){
                let user = await this.$http.post('register',this.user)
                if(!user) return
                this.$message({
                    type:'success',
                    message:'添加成功！'
                })
                this.dialogFormVisible = false
                this.fetch()
              }else {
                let user = await this.$http.put(`user/${this.editId}`,this.user)
                if(!user) return
                this.$message({
                    type:'success',
                    message:'更新成功！'
                })
                this.dialogFormVisible = false
                this.fetch()
              }
            },
            addUser(){
              this.isAdd = true
              this.dialogFormVisible = true
            }
        }
    };
</script>