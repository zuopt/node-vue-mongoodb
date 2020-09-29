<template>
    <div>
        <StandardTable
            :data="model"
            :loading="pageLoading"
            :total="pageTotal"
            :pageNumber.sync="pageQuery.pageNumber"
            :pageSize.sync="pageQuery.pageSize"
            @pagination="paginationSearch"
        >
            <el-table-column prop="title" label="标题" width="140"></el-table-column>
            <el-table-column label="图标" width="120">
                <template slot-scope="{row}">
                    <el-image
                        :src="row.icon"
                    ></el-image>
                </template>
            </el-table-column>

            <el-table-column prop="des" label="描述" width="120">
            </el-table-column>

            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row._id)" type='text' size="small">编辑</el-button>
                    <el-button @click="remove(scope.row._id)" type='text' size="small">删除</el-button>
                </template>
            </el-table-column>
        </StandardTable>
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
                model: [],
                pageLoading:false,
                pageTotal:0,
                pageQuery:{
                    pageNumber:1,
                    pageSize:10
                }
            };
        },
        created() {
            this.fetch()
        },
        methods:{
            fetch(){
                this.$http.get('articles',{params: this.pageQuery}).then(res => {
                    this.model = res.data.content
                    this.pageTotal = Number(res.data.totalElements)
                    this.pageQuery.pageNumber = res.data.pageNumber
                    this.pageQuery.pageSize = res.data.pageSize
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
            },
            paginationSearch(data){
                this.fetch(data)
            }
        }
    };
</script>