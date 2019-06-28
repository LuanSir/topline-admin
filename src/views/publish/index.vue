<template>
  <el-card class="publish-card">
    <div slot="header" class="header">
      <span>发布文章</span>
      <div>
        <!-- 传入参数true或者false，表示是否存为草稿 -->
        <el-button type="success" @click="handlePulish(false)">发布</el-button>
        <el-button type="primary" @click="handlePulish(true)">存入草稿</el-button>
      </div>
    </div>
    <el-form>
      <el-form-item label="标题">
        <el-input type="text" v-model="articleForm.title"></el-input>
      </el-form-item>
      <el-form-item type="textarea" label="内容">
        <el-input type="textarea" v-model="articleForm.content"></el-input>
      </el-form-item>
      <el-form-item label="封面">
      </el-form-item>
      <el-form-item label="频道">
        <!--
          利用组件通信，传递数据，父传子：Props Down,
                                子传父：Events Up
          这里value是向article-channel组件传值，
          $event 在这是事件参数
         -->
        <!-- <article-channel
         :value="articleForm.channel_id"
         @input="articleForm.channel_id = $event"
        ></article-channel> -->
        <!--
          v-model="articleForm.channel_id"
           在这就是:value="articleForm.channel_id"
                  @input="articleForm.channel_id = $event"
          的简写
         -->
        <article-channel
         v-model="articleForm.channel_id"
        ></article-channel>
        <!-- <el-select v-model="articleForm.channel_id" placeholder="请选择频道">
          <el-option label="频道一" value="shanghai"></el-option>
        </el-select> -->
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import ArticleChannel from '@/components/article-channel'
export default {
  name: 'publish',
  components: {
    ArticleChannel
  },
  data () {
    return {
      articleForm: {
        title: '', // 标题
        content: '', // 内容
        cover: { // 封面
          type: 0, // 封面类型-1:自动，0-无图，1-1张，3-3张
          images: [] // 图片链接
        },
        channel_id: 3 // 频道
      }
    }
  },
  methods: {
    // 给个默认值，防止不传参
    handlePulish (draft = false) {
      // console.log(this.articleForm)
      this.$http({
        method: 'POST',
        url: '/articles',
        data: this.articleForm, // body参数，写到data中
        params: { // query参数写到params中传参
          draft
        }
      }).then(data => {
        this.$message({
          type: 'success',
          message: '发布成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('发布失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.publish-card {
  min-height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
