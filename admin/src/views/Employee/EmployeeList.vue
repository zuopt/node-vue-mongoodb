<template>
    <div>
        <el-table :data="model">
            <el-table-column label="头像" width="120">
                <template slot-scope="{row}">
                    <el-avatar shape="square" size="large" :src="row.avatar"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="140">
            </el-table-column>
            <el-table-column prop="telephone" label="电话" width="140">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="140">
            </el-table-column>
            <el-table-column prop="description" label="说明" width="120">
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row._id)" type='text' size="small">编辑</el-button>
                    <el-button @click="remove(scope.row._id)" type='text' size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                model: []
            };
        },
        created() {
            this.fetch()
        },
        methods:{
            fetch(){
                this.$http.get('employees').then(res => {
                    console.log(res)
                    this.model = res.data
                })
            },
            edit(id){
                this.$router.push(`/employee/${id}/edit`)
            },
            remove(id){
                console.log(id)
                this.$http.delete(`employee/${id}`).then((res) => {
                    this.$message({
                        type:'success',
                        message:`员工${res.data.name}删除成功！`
                    })
                    this.fetch()
                })
            }
        }
    };
</script>