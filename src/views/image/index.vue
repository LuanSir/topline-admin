<template>
  <el-card class="image-card">
    <div slot="header">
      <span>图片管理</span>
    </div>
    <div class="action">
      <el-button-group v-model="active">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-button-group>
      <el-button type="primary">上传图片</el-button>
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
            <el-button type="primary" icon="el-icon-delete" circle plain></el-button>
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
      active: '全部',
      images: []
    }
  },
  created () {
    this.loadImages()
  },
  methods: {
    loadImages () {
      this.$http({
        method: 'GET',
        url: '/user/images'
      }).then(data => {
        console.log(data)
        this.images = data.results
      })
    },
    handleCollected (item) {
      const collect = !item.is_collected
      this.$http({
        method: 'PUT',
        // item本身有id
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(data => {
        item.is_collected = collect
        this.$message({
          type: 'success',
          message: `${collect ? '' : '取消'}收藏成功`
        })
      }).catch(err => {
        console.log(err)
        this.$message.error(`${collect ? '' : '取消'}收藏失败`)
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
