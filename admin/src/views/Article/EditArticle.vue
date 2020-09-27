<template>
    <div>
        <h2></h2>
        <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">
            <el-form-item label="文章标题">
                <el-input v-model="article.title"></el-input>
            </el-form-item>
            <el-form-item label="封面图">
            <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false" :on-success="afterUpload">
                <img v-if="article.icon" :src="article.icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-form-item>
            <el-form-item label="文章内容">
                <el-input type="textarea" v-model="article.body"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                article: {

                }
            }
        },
        created() {
            this.fetch()
        },
        methods: {
            fetch() {
                this.$http.get(`articles/${this.$route.params.id}`).then(res => {
                    this.article = res.data
                })
            },
            saveArticle() {
                this.$http.put(`articles/${this.$route.params.id}`, this.article).then(res => {
                    console.log(res.data)
                    this.$message({
                        type: 'success',
                        message: '编辑成功！'
                    })
                    this.$router.push('/articles/index')
                })
            }
        }
    }
</script>