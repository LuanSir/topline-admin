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
    <el-form v-loading="$route.name === 'publish-edit' && editLoading">
      <el-form-item label="标题">
        <el-input type="text" v-model="articleForm.title"></el-input>
      </el-form-item>
      <el-form-item type="textarea" label="内容">
        <!-- <el-input type="textarea" v-model="articleForm.content"></el-input> -->
      </el-form-item>
      <!-- bidirectional data binding（双向数据绑定） -->
      <quill-editor
        v-model="articleForm.content"
        ref="myQuillEditor"
        :options="editorOption"
      ></quill-editor>
      <el-form-item label="封面">
        <el-radio-group v-model="articleForm.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <template>
        <el-row>
          <el-col :span="6">
            <UploadImage></UploadImage>
          </el-col>
        </el-row>
      </template>
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
        ></article-channel>-->
        <!--
          v-model="articleForm.channel_id"
           在这就是:value="articleForm.channel_id"
                  @input="articleForm.channel_id = $event"
          的简写
        -->
        <article-channel v-model="articleForm.channel_id"></article-channel>
        <!-- <el-select v-model="articleForm.channel_id" placeholder="请选择频道">
          <el-option label="频道一" value="shanghai"></el-option>
        </el-select>-->
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import ArticleChannel from '@/components/article-channel'
import UploadImage from './components/upload-image'
// 加载富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'publish',
  components: {
    ArticleChannel,
    quillEditor,
    UploadImage
  },
  data () {
    return {
      articleForm: {
        title: '', // 标题
        content: '', // 内容
        cover: {
          // 封面
          type: 0, // 封面类型-1:自动，0-无图，1-1张，3-3张
          images: [] // 图片链接
        },
        channel_id: 3 // 频道
      },
      editorOption: { // 富文本编辑器相关参数选项
        // some quill options
      },
      editLoading: false
    }
  },
  // 计算属性
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted () {
    console.log('this is current quill instance object', this.editor)
  },
  created () {
    // console.log(this.$router)
    if (this.$route.name === 'publish-editor') {
      this.loadArticle()
    }
  },
  methods: {
    loadArticle () {
      this.editLoading = true
      this.$http({
        method: 'GET',
        url: `/articles/${this.$route.params.id}`
      }).then(data => {
        this.articleForm = data
        this.editLoading = false
      }).catch(() => {
        // console.log(err)
        this.$message.error('加载文章详情失败')
      })
    },
    // 给个默认值，防止不传参
    handlePulish (draft = false) {
      // console.log(this.articleForm)
      this.$http({
        method: 'POST',
        url: '/articles',
        data: this.articleForm, // body参数，写到data中
        params: {
          // query参数写到params中传参
          draft
        }
      })
        .then(data => {
          this.$message({
            type: 'success',
            message: '发布成功'
          })
        })
        .catch(err => {
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
