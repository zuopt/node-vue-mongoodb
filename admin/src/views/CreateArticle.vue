<template>
    <el-form @submit.native.prevent="onSubmit" ref="form" :model="article" label-width="80px">
        <el-form-item label="文章标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="封面图">
            <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false" :on-success="afterUpload">
                <img v-if="model.icon" :src="model.icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="文章内容">
          <el-input type="textarea" v-model="article.body"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>
  <script>
    export default {
      data() {
        return {
            article:{
                
            },
            model:{
                icon:''
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
            this.model.icon = res.url;
            console.log(this.model.icon)
        }
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