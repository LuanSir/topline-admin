<template>
  <el-card class="box-card">
    <div slot="header">
      <span>评论管理</span>
    </div>
    <el-table :data="articles" style="width: 100%">
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <!-- <el-table-column prop="comment_status" label="评论状态" width="180"></el-table-column> -->
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <!-- disabled,禁用属性 -->
          <el-switch
            :disabled="scope.row.changeLoading"
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @click.native="handleChangeCommentStatus(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'ArticleComment',
  data () {
    return {
      articles: []
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    loadArticle () {
      this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(data => {
        // 遍历返回的数据，给返回的数据添加属性，用于给按钮添加禁用使用
        data.results.forEach(item => {
          item.changeLoading = false
        })
        this.articles = data.results
      })
    },
    handleChangeCommentStatus (item) {
      // console.log(item)
      item.changeLoading = true // 禁用开关开启
      this.$http({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: item.id.toString()
        },
        data: {
          allow_comment: item.comment_status
        }
      }).then(() => {
        console.log(123)
        this.$message({
          type: 'success',
          message: `${item.comment_status ? '启用' : '关闭'}评论状态成功`
        })
        item.changeLoading = false // 禁用开关关闭
      }).catch(err => {
        console.log(err)
        item.changeLoading = false
        this.$message.error('修改评论状态失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
