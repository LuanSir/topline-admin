<template>
  <el-row class="app-header">
    <el-col :span="14">江苏传智播客教育科技股份有限公司</el-col>
    <el-col :span="10" :offset="10">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img width="30px" :src="userinfo.photo">
          {{ userinfo.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item divided>退出</el-dropdown-item>
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
      userinfo: {}
    }
  },
  // 调用生命周期函数，在进入该路由组件的时候就获取到用户信息并显示出来
  // 调用JSON.parse方法，将json字符串转换成对象
  created () {
    this.userinfo = JSON.parse(window.localStorage.getItem('user_info'))
    // console.log(this.userinfo)
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
