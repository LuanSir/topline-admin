<template>
  <el-row class="app-header">
    <el-col :span="14">江苏传智播客教育科技股份有限公司</el-col>
    <el-col :span="10" :offset="10">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img width="30px" src="http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi">
          15639395581
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
    return {}
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
