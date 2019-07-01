<template>
  <el-card class="image-card">
    <div slot="header">
      <span>图片管理</span>
    </div>
    <div class="action">
      <el-radio-group v-model="radio">
        <el-radio-button label="全部" @click.native="loadImages(false)"></el-radio-button>
        <el-radio-button label="收藏" @click.native="loadImages(true)"></el-radio-button>
      </el-radio-group>
      <!-- <el-button type="primary">上传图片</el-button> -->
      <!--
          on-success 是一个 props 参数
          props 绑定的数据是一个表达式，它会将表达式的计算结果绑定到这里
          {{ 函数 }}
          {{ 函数() }}
          v-bind 中的语法和 {{ }} 中的一致
          action，上传的地址
          multiple 多文件上传，需要接口支持
      -->
      <!-- <el-upload
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="{}"
        :show-file-list="false"
        :before-upload="handleUpload"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>-->
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :before-upload="handleUpload"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <!-- :gutter="20" 间隔20像素 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in images" :key="item.id">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.url" style="max-width: 100%;" />
          <div style="padding: 10px; display: flex; justify-content: center;">
            <el-button
              type="primary"
              :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
              circle
              plain
              @click="handleCollected(item)"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-delete"
              circle
              plain
              @click="handleDelete(item)"
            ></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'ImageList',
  data () {
    return {
      radio: '全部',
      images: [],
      token: `Bearer ${
        JSON.parse(window.localStorage.getItem('user_info')).token
      }`
    }
  },
  created () {
    this.loadImages()
  },
  methods: {
    // 加载列表页
    // 给它一个默认值false, 一开始加载全部
    async loadImages (collect = false) {
      this.$http({
        method: 'GET',
        url: '/user/images',
        params: {
          collect // true：收藏图片，false：全部图片
        }
      }).then(data => {
        console.log(data)
        this.images = data.results
      })
    },
    // 收藏功能
    handleCollected (item) {
      const collect = !item.is_collected
      this.$http({
        method: 'PUT',
        // item本身有id
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      })
        .then(data => {
          item.is_collected = collect
          this.$message({
            type: 'success',
            message: `${collect ? '' : '取消'}收藏成功`
          })
        })
        .catch(err => {
          console.log(err)
          this.$message.error(`${collect ? '' : '取消'}收藏失败`)
        })
    },
    // 删除
    handleDelete (item) {
      this.$http({
        method: 'DELETE',
        url: `/user/images/${item.id}`
      })
        .then(data => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          // 删除之后刷新素材列表
          this.loadImages()
        })
        .catch(err => {
          console.log(err)
          this.$message.error('删除失败')
        })
    },
    // 添加素材
    handleUpload (uploadConfig) {
      // console.log(uploadConfig);
      // axios上传文件
      // 1. 构建一个FormData表单对象
      //    将文件对象添加到FormData中
      // 2. 将FormData配置到请求体data中
      const formData = new FormData()
      formData.append('image', uploadConfig)
      this.$http({
        method: 'POST',
        url: '/user/images',
        data: formData
      })
        .then(data => {
          console.log(data)
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          // 上传成功，调用方法重新加载
          this.loadImages()
        })
        .catch(err => {
          console.log(err)
          this.$message.error('添加失败')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.image-card {
  .action {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
