<template>
  <div class="login-wrap">
    <div class="login-form-wrap">
      <div class="login-head">
        <!-- ./一定要有 -->
        <img src="./logo_index.png" alt="黑马头条">
      </div>
      <div class="login-form">
        <el-form :model="loginForm">
          <el-form-item>
            <el-input v-model="loginForm.mobile" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <!-- 支持栅格布局， 一共24列 -->
            <el-col :span="12">
              <el-input v-model="loginForm.code" placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-button @click="handleSend">获取验证码</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <!-- 给组件加class，会作用到根元素 -->
            <el-button class="btn-login" type="primary" @click="handleLogin">登录</el-button>
            <!-- <el-button>取消</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AppLogin',
  data () {
    return {
      loginForm: {
        mobile: '15639395581',
        code: ''
      }
    }
  },
  methods: {
    handleLogin () {},
    handleSend () {
      // console.log('快给我验证码')
      const { mobile } = this.loginForm
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        // console.log(res.data)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrap {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
  background-image: url(./login_bg.jpg);
  background-size: cover;
  .login-form-wrap {
    background-color: #fff;
    padding: 50px;
    .login-head {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
      img {
        width: 200px;
      }
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>
