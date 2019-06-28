<template>
  <!-- 把父组件传递的值传到子组件的value值，实现单向数据绑定，同步数据
       change 事件，当选中项发生改变被触发，回调参数就是选中项的value
   -->
  <el-select :value="value" clearable @change="handleChange">
    <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ArticleChannel',
  // 父组件向子组件传值，子组件在props里接收
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      channels: []
    }
  },
  created () {
    // 加载频道列表
    this.loadChannels()
  },
  methods: {
    handleChange (val) {
    //   console.log(val)
      this.$emit('input', val)
    },
    loadChannels () {
      this.$http({
        method: 'GET',
        url: '/channels'
      })
        .then(data => {
          // console.log(data)
          this.channels = data.channels
        })
        .catch(err => {
          console.log(err)
          this.$message.error('加载频道列表失败')
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
