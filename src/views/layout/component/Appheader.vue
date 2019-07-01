<template>
  <el-row class="app-header">
    <el-col :span="14">江苏传智播客教育科技股份有限公司</el-col>
    <el-col :span="10" :offset="10">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img width="30px" :src="$store.state.user.photo">
          {{ $store.state.user.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <!-- <el-dropdown-item divided>退出</el-dropdown-item> -->
          <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
          <!--

          -->
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'APPheader',
  data () {
    return {
      // userinfo: {}
    }
  },
  // 调用生命周期函数，在进入该路由组件的时候就获取到用户信息并显示出来
  // 调用JSON.parse方法，将json字符串转换成对象
  created () {
    // this.userinfo = JSON.parse(window.localStorage.getItem('user_info'))
    // console.log(this.userinfo)
  },
  methods: {
    // 注册退出
    handleLogout () {
      // console.log(123)
      this.$confirm('确认退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除本地登录信息
          window.localStorage.removeItem('user_info')
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          // 跳转到登录页
          this.$router.push({
            name: 'login'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.app-header {
  height: 60px;
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
  }
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
