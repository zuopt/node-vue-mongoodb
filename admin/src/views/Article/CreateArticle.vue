<template>
    <el-form @submit.native.prevent="onSubmit" ref="form" :model="article" label-width="80px">
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
          <el-button type="primary" native-type="submit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>
  <script>
  import { VueEditor } from 'vue2-editor'
    export default {
      components:{
        VueEditor
      },
      data() {
        return {
            article:{
                icon:'',
                body:''
            }
        }
      },
      methods: {
        onSubmit() {
            this.$http.post('articles',this.article).then(res => {
                console.log(res.data)
                this.$message({
                    type:'success',
                    message:'新建成功！'
                })
                this.$router.push('/articles/index')
            })
        },
        afterUpload(res){
          this.article.icon = res.url;
          console.log(this.article.icon)
        },
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
          console.log("上传")
          const formData = new FormData();
          formData.append("file", file);
          const res = await this.$http.post("upload", formData);
          Editor.insertEmbed(cursorLocation, "image", res.data.url);   
          resetUploader();
        },
      }
    }
  </script>

  <style>
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
  </style>