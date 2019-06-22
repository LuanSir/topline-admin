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
// 我们建议把没有提供npm包的第三方包都放到项目的src/vendor目录中
// gt.js会提供一个全局函数 initGeetest
import '@/vendor/gt.js'
export default {
  name: 'AppLogin',
  data () {
    return {
      loginForm: {
        mobile: '15639395581',
        code: ''
      },
      captchaObj: null
    }
  },
  methods: {
    handleLogin () {},
    handleSend () {
      // console.log('快给我验证码')
      const { mobile } = this.loginForm
      // 如果已经初始化过了，直接调用captchaObj对象的verify()方法，captchaObj对象只有初始化之后才会有
      // 如果没有初始化再执行后面的请求代码，这样防止每次不管验证成不成功都发送请求
      if (this.captchaObj) {
        return this.captchaObj.verify() // 调用verify()方法才会弹出验证码
      }

      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        // console.log(res.data)
        const data = res.data.data
        window.initGeetest(
          // 加上window 前缀表示initGeetest是全局成员
          {
            // 以下配置参数来自服务端 SDK
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: data.new_captcha,
            product: 'bind' // 隐藏按钮式
          },
          captchaObj => {
            // 这里可以调用验证实例 captchaObj 的实例方法
            // console.log(captchaObj)
            this.captchaObj = captchaObj
            captchaObj
              .onReady(function () {
                // 验证码ready之后才能调用verify方法显示验证码
                captchaObj.verify() // 现实验证码
              })
              .onSuccess(function () {
                // var result = captchaObj.getValidate()
              })
          }
        )
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
