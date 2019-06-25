<template>
  <div class="login-wrap">
    <div class="login-form-wrap">
      <div class="login-head">
        <!-- ./一定要有 -->
        <img src="./logo_index.png" alt="黑马头条">
      </div>
      <div class="login-form">
        <!--
          表单验证
          rules 配置验证规则
          将需要验证的字段通过prop属性配置到 el-form-item 组件上
          ref  获取表单组件，可以手动调用表单组件的验证方法
        -->
        <!-- ref后的名字是自己随便起的 -->
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <!-- 支持栅格布局， 一共24列 -->
            <el-col :span="12">
              <el-input v-model="loginForm.code" placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-button @click="handleSend" :disabled="disabled">{{ text }}</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="loginForm.agree"></el-checkbox>
            <span>
              我已阅读并同意
              <a href="#">用户协议</a>和
              <a href="#">隐私条款</a>
            </span>
          </el-form-item>
          <el-form-item>
            <!-- 给组件加class，会作用到根元素 -->
            <el-button
              class="btn-login"
              type="primary"
              @click="handleLogin"
              :loading="loginLoading"
            >登录</el-button>
            <!-- <el-button>取消</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// 我们建议把没有提供npm包的第三方包都放到项目的src/vendor目录中
// gt.js会提供一个全局函数 initGeetest
import '@/vendor/gt.js'
export default {
  name: 'AppLogin',
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        agree: ''
      },

      loginLoading: false, // 登录按钮的loading 状态
      rules: {
        // 表单验证规则
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度11个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度在6个字符', trigger: 'blur' }
        ],
        agree: [
          { required: true, message: '请同意用户协议', trigger: 'change' },
          { pattern: /true/, message: '请同意用户协议', trigger: 'change' }
        ]
      },
      captchaObj: null, // 通过initGeetest 得到的极验验证码对象
      text: '发送验证码', // 按钮的文字
      flag: 60, // 定时器的默认倒计时时间
      disabled: false,
      sendMobile: '' // 保存初始化验证码之后发送短信的手机号
    }
  },
  methods: {
    handleLogin () {
      // 表单组件有一个方法，validate 可以用于获取当前表单的验证状态
      this.$refs['loginForm'].validate(valid => {
        if (!valid) {
          return
        }
        // 验证通过，调用发送请求登录的方法
        this.sunmitLogin()
      })
    },
    // 为了代码优化美观，把发请求登陆的操作封装到一个方法中，可以调用
    sunmitLogin () {
      // 发送登录请求，登录按钮显示登陆中
      this.loginLoading = true
      this.$http({
        method: 'POST',
        url: `/authorizations`,
        data: this.loginForm // POST请求数据放到data中
      })
        .then(data => {
          // 登录成功，将接口返回的用户信息储存到本地
          // 本地存储只能储存字符串，所以调用JSON.stringify（）方法把数据转换成json字符串
          window.localStorage.setItem('user_info', JSON.stringify(data))

          // >=200 && <400 的状态码都会进入到这里
          // console.log(res.data)
          // Element 提供的消息提示组件
          // 这也是组件调用的一种形式
          this.$message({
            message: '恭喜你，登录成功',
            type: 'success'
          })
          // 登录成功，登录按钮加载中不再显示，登录按钮可以点击
          this.loginLoading = false
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
          // 登录失败，登录按钮重新放开，可点击
          this.loginLoading = false
        })
    },
    handleSend () {
      // console.log('快给我验证码')
      this.$refs['loginForm'].validateField('mobile', errorMessage => {
        if (errorMessage.trim().length > 0) {
          return
        }
        // 验证手机号通过，校验是否有验证码插件对象
        if (this.captchaObj) {
          // 手机号有效，初始化验证码插件
          // this.showGeetest()
          // 如果用户输入的手机号和之前初始化的验证码手机号不一致，就基于当前手机号码重新初始化
          // 否则，直接verify显示
          if (this.loginForm.mobile !== this.sendMobile) {
            // 删除上一个手机号留下的DOM节点
            document.body.removeChild(document.querySelector('.geetest_panel'))

            // 重新初始化验证码插件
            this.showGeetest()
          } else {
            // 一致，直接verify
            this.captchaObj.verify()
          }
        } else {
          // 如果没有，执行发送请求，直接初始化
          this.showGeetest()
        }
      })
    },
    showGeetest () {
      // const { mobile } = this.loginForm
      // 如果已经初始化过了，直接调用captchaObj对象的verify()方法，captchaObj对象只有初始化之后才会有
      // 如果没有初始化再执行后面的请求代码，这样防止每次不管验证成不成功都发送请求

      this.$http({
        method: 'GET',
        // 调用this.loginForm.mobile，获取每次输入的最近的手机号
        url: `/captchas/${
          this.loginForm.mobile
        }`
      }).then(data => {
        // console.log(res.data)
        // 因为在响应拦截器已经拿到data了，所以这里就不需要了
        // const data = res.data.data
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
              .onReady(() => {
                // 验证码ready之后才能调用verify方法显示验证码
                this.sendMobile = this.loginForm.mobile
                captchaObj.verify() // 现实验证码
              })
              .onSuccess(() => {
                // var result = captchaObj.getValidate()
                // console.log(captchaObj.getValidate())
                // 图形验证成功之后，发送验证码按钮开始倒计时
                // 图形验证成功，给disabled赋值为true，按钮禁用
                this.disabled = true
                this.text = `${this.flag}秒后重新发送`
                // console.log(this.text, this.flag);
                let flag2 = window.setInterval(() => {
                  // 启动定时器
                  this.text = `${--this.flag}秒后重新发送`
                  if (this.flag === 0) {
                    // console.log (123)
                    window.clearInterval(flag2)
                    this.text = '重新发送'
                    // 定时器时间结束，解禁按钮
                    this.disabled = false
                    this.flag = 60
                  }
                }, 1000)

                const result = captchaObj.getValidate()
                const challenge = result.geetest_challenge
                const validate = result.geetest_validate
                const seccode = result.geetest_seccode

                // 调用获取短信验证码接口，发送短信，上面是给接口所需要的参数赋值
                this.$http({
                  method: 'GET',
                  // 调用this.loginForm.mobile，获取每次输入的最近的手机号
                  url: `/sms/codes/${
                    this.loginForm.mobile
                  }`,
                  params: {
                    // 专门用来传递query查询字符串参数
                    challenge,
                    validate,
                    seccode
                  }
                }).then(data => {
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
