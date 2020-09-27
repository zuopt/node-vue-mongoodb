<template>
    <div>
        <el-table :data="articles">
            <el-table-column prop="title" label="标题" width="140">
            </el-table-column>
            <el-table-column label="图标" width="120">
                <template slot-scope="{row}">
                     <el-image
                        style="width: 100px; height: 100px"
                        :src="row.icon"
                    ></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="body" label="内容" width="120">
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
                articles: []
            };
        },
        created() {
            this.fetch()
        },
        methods:{
            fetch(){
                this.$http.get('articles').then(res => {
                    console.log(res)
                    this.articles = res.data
                })
            },
            edit(id){
                this.$router.push(`/articles/${id}/edit`)
            },
            remove(id){
                console.log(id)
                this.$http.delete(`articles/${id}`).then(() => {
                    this.$message({
                        type:'success',
                        message:'文章删除成功！'
                    })
                    this.fetch()
                })
            }
        }
    };
</script>