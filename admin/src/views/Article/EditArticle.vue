<template>
    <div>
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
            <el-form-item label="文章描述">
                <el-input type="textarea" v-model="article.des" />
            </el-form-item>
            <el-form-item label="文章内容">
                <vue-editor v-model="article.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import { VueEditor } from 'vue2-editor'
    export default {
        components:{
            VueEditor
        },
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
            },
            afterUpload(res){
                this.article.icon = res.url;
                console.log(this.article.icon)
            },
            async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
                const formData = new FormData();
                formData.append("file", file);
                const res = await this.$http.post("upload", formData);
                Editor.insertEmbed(cursorLocation, "image", res.data.url);
                resetUploader();
            },
        }
    }
</script>