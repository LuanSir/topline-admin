<template>
  <!--
    el-menu
        default-active 指定默认激活的菜单项
        background-color  背景色
        @open  @close  展示和收起菜单时会触发
        text-color  字体颜色
        active-text-color 激活时的高亮颜色
    el-submenu
    index 导航标识，可以用做路由导航路径，必须唯一
  -->
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="/">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>内容管理</span>
      </template>
      <el-menu-item-group>
        <!-- <template slot="title">分组一</template> -->
        <el-menu-item index="/publish">发布文章</el-menu-item>
        <el-menu-item index="/article">文章列表</el-menu-item>
      </el-menu-item-group>
      <!-- <el-menu-item-group title="分组2"> -->
        <el-menu-item index="/comments">评论列表</el-menu-item>
      <!-- </el-menu-item-group> -->
      <el-submenu index="2-4">
        <template slot="title">素材管理</template>
        <!-- <el-menu-item index="2-4-1">选项1</el-menu-item> -->
      </el-submenu>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>粉丝管理</span>
      </template>
      <el-menu-item-group>
        <!-- <template slot="title">分组一</template> -->
        <el-menu-item index="3-1">图文数据</el-menu-item>
        <el-menu-item index="3-2">粉丝概况</el-menu-item>
      </el-menu-item-group>
      <!-- <el-menu-item-group title="分组2"> -->
        <el-menu-item index="3-3">粉丝画像</el-menu-item>
      <!-- </el-menu-item-group> -->
      <el-submenu index="3-4">
        <template slot="title">粉丝列表</template>
        <!-- <el-menu-item index="3-4-1">选项1</el-menu-item> -->
      </el-submenu>
    </el-submenu>
    <el-menu-item index="4">
      <i class="el-icon-menu"></i>
      <span slot="title">账户信息</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Appside',
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
}
</style>
