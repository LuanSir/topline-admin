<template>
  <el-card class="box-card">
    <div slot="header">
      <span>账户设置</span>
    </div>
    <el-row>
      <el-col :span="8">
        <el-form>
          <el-form-item label="媒体名称">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体简介">
            <el-input v-model="userInfo.intro"></el-input>
          </el-form-item>
          <el-form-item label="头条号ID">
            <el-input disabled :value="userInfo.id"></el-input>
          </el-form-item>
          <el-form-item label="绑定手机">
            <el-input disabled :value="userInfo.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input disabled :value="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleUpdata">保存更新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4" :offset="2">
        <!--
              el-upload 上传组件,他会自动将用户选择的图片请求上传，我要需要配置一下
              action 请求地址
              由于它使用的的事自己内部的请求，不是使用axios发送请求，所以不经过请求拦截器，我们需要手动配置token
              它也不支持自定义方法，它只支持GET请求，我们的接口是PATCH，所以不能使用
              用http-request，覆盖默认的请求方式，自己定义，手动发送请求  这个方法有一个参数
              因为需要自己发送请求，所以headers、name不需要了,但是组件要求action必须要有
        -->
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :http-request="handleUpload"
        >
          <!-- 获取到的用户信息中就包含用户头像 -->
          <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'Accountsetting',
  data () {
    return {
      userInfo: {},
      token: `Bearer ${
        JSON.parse(window.localStorage.getItem('user_info')).token
      }`
    }
  },
  created () {
    this.loadUserinFo()
  },
  methods: {
    loadUserinFo () {
      this.$http({
        method: 'GET',
        url: '/user/profile'
      }).then(data => {
        this.userInfo = data
      })
    },
    handleUpdata () {
      const { name, intro } = this.userInfo
      this.$http({
        method: 'PATCH',
        url: '/user/profile',
        data: {
          name,
          intro
        }
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '更新数据成功'
          })
        })
        .catch(err => {
          console.log(err)
          this.$message.error('更新数据失败')
        })
    },
    handleAvatarSuccess () {},
    beforeAvatarUpload () {},
    handleUpload (uploadConfig) {
      // console.log(uploadConfig)
      // axios 上传文件
      // 1. 构建一个FormData表单对象
      //   将文件对象添加到FormData中
      // 2. 将FormData配置到请求体data中
      const formData = new FormData()
      formData.append('photo', uploadConfig.file)
      this.$http({
        method: 'PATCH',
        url: '/user/photo',
        data: formData
      })
        .then((data) => {
          this.userInfo.photo = data.photo
          this.$message({
            type: 'success',
            message: '上传成功'
          })
        })
        .catch(err => {
          console.log(err)
          this.$message.error('上传失败')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
