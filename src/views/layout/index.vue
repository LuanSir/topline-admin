<template>
  <el-container>
    <el-aside width="200px">
        <Appside></Appside>
    </el-aside>
    <el-container>
      <el-header>
          <Appheader></Appheader>
      </el-header>
      <el-main>
        <!-- layout组件的路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Appside from './component/Appside'
import Appheader from './component/Appheader'
export default {
  name: 'Appindex',
  components: {
    Appside,
    Appheader
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.el-container {
    height: 100%;
}
.el-aside {
    background-color: #d0dce7;
}
.el-header {
    background-color: #aec0d1;
}
</style>
