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
        mobile: '',
        code: ''
      },
      captchaObj: null
    }
  },
  methods: {
    handleLogin () {
      axios({
        method: 'POST',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/authorizations`,
        data: this.loginForm // POST请求数据放到data中
      })
        .then(res => {
          // >=200 && <400 的状态码都会进入到这里
          // console.log(res.data)
          // Element 提供的消息提示组件
          // 这也是组件调用的一种形式
          this.$message({
            message: '恭喜你，登录成功',
            type: 'success'
          })
          // 登录成功，跳转到主页，建议路由跳转都是用 name 去跳转，路由传参非常方便
          this.$router.push({
            name: 'home'
          })
        })
        .catch(err => {
          // >=400 的状态码都会进入catch 中
          if (err.response.status === 400) {
            this.$message.error('登录失败，手机号或验证码错误')
          }
        })
    },
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
                // console.log(captchaObj.getValidate())
                const result = captchaObj.getValidate()
                const challenge = result.geetest_challenge
                const validate = result.geetest_validate
                const seccode = result.geetest_seccode

                // 调用获取短信验证码接口，发送短信，上面是给接口所需要的参数赋值
                axios({
                  method: 'GET',
                  url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
                  params: {
                    // 专门用来传递query查询字符串参数
                    challenge,
                    validate,
                    seccode
                  }
                }).then(res => {
                  // console.log(res.data)
                })
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
