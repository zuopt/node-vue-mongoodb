<template>
    <el-form @submit.native.prevent="onSubmit" ref="form" :model="model" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="model.telephone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="model.address"></el-input>
        </el-form-item>
        <el-form-item label="头像">
            <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false" :on-success="afterUpload">
                <img v-if="model.avatar" :src="model.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="说明">
          <el-input type="textarea" v-model="model.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">立即添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>
  <script>
    export default {
      data() {
        return {
            model:{
                avatar:''
            }
        }
      },
      methods: {
        onSubmit() {
            this.$http.post('employee',this.model).then(res => {
                console.log(res.data)
                this.$message({
                    type:'success',
                    message:'添加成功！'
                })
                this.$router.push('/employee/list')
            })
        },
        afterUpload(res){
            this.model.avatar = res.url;
            console.log(this.model.avatar)
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
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
  </style>