<template>
  <div>
    <!-- 筛选区 -->
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>筛选条件</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <el-form ref="form" :model="filterParams" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="filterParams.status">
            <el-radio label="全部" value=""></el-radio>
            <el-radio
            v-for="(item, index) in statTypes"
            :key="item.label"
            :label="index + ''" >
            {{ item.label }}
            </el-radio>
            <!-- <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>-->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <article-channel v-model="filterParams.channel_id"></article-channel>
          <!-- 用下拉列表组件替换这里写的下拉列表 -->
          <!-- <el-select v-model="filterParams.channel_id" placeholder="请选择频道">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="begin_end_pubdate"
              @change="handleDataChange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button :loading="articleLoading" type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 列表区 -->
    <el-card class="list-card">
      <div slot="header" class="clearfix">
        <span>共找到 <strong>{{ totalCount }}</strong> 条符合条件的内容</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <!-- table表格是个组件，不需要手动创建遍历只需要把数据给el-table的data属性就行了
          然后配置el-table-column展示需要的数据字段即可
      -->
      <!-- element提供了自定义属性v-loading，用在表格里，换页、加载时禁用，
      配合分页禁用一起使用，和分页禁用的属性值同步-->
      <el-table class="list-table" v-loading="articleLoading" :data="articles" style="width: 100%">
        <el-table-column prop="cover.images[0]" label="封面" width="180">
          <!-- 表格列默认只能输出文本，如果需要自定义里面的内容，则需要 -->
          <!-- slot-scope是插槽作用域，值scope是起的名字，scope中有个成员叫row
             也就是scope.row就是当前遍历项对象
             自定义列模板，el-table-column 的 prop 就没有意义了
          -->
          <template slot-scope="scope">
            <img width="30" :src="scope.row.cover.images[0]" alt>
          </template>
        </el-table-column>

        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="pubdate" label="发布日期" width="180"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- 显示状态使用了tag组件 -->
            <el-tag :type="statTypes[scope.row.status].type">{{ statTypes[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" plain>修改</el-button>
            <!-- scope.row是数据项 -->
            <el-button type="danger" plain @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- -、分多少页
              每页多大，默认十条/页，我们接口若无指定也是10条
              有多少条数据
           二：页面改变加载对应的页码数据
      -->
      <!-- @current-change分页组件的自定义事件，页码改变事件 -->
      <!-- current-page是分页组件的一个属性，用来控制分页页码高亮用的，表示当前页码，也就是高亮的那个页码
            total是总记录数
      -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :disabled="articleLoading"
        :current-page="page"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
// 获取本地储存用户登录信息
// 调用JSON.parse（）方法是把JSON字符串转换成对象
// const userinfo = JSON.parse(window.localStorage.getItem('user_info'))
import ArticleChannel from '@/components/article-channel'
export default {
  name: 'ArticleList',
  components: {
    ArticleChannel
  },
  data () {
    return {
      articles: [],
      totalCount: 0, // 统计多少条数据
      articleLoading: false, // 分页组件禁用属性disabled的默认值false,控制文章加载中的loading
      page: 1, // 当前页码
      statTypes: [ // 文章状态
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: '',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ],
      // channels: [],
      filterParams: { // 用来过滤查询文章列表的参数
        status: '', // 文章状态
        channel_id: '', // 频道id
        begin_pubdate: '', // 开始时间
        end_pubdate: '' // 结束时间
      },
      begin_end_pubdate: [] // 存储日期选择器同步的[开始时间，结束时间]，这个字段没啥用，只是日期选择器必须v-modle绑定一个数据才会触发change
    }
  },

  // 使用生命周期钩子，在文章列表页打开的时候直接发送请求，显示文章
  // 除了登录相关页面，其他的页面都需要授权，使用token,把token放到请求头中
  // token说明:在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格
  // token在本地储存的user_info中，所以要先拿到本地存储
  created () {
    // 加载文章列表
    this.loadArticles()
    // // 加载频道列表
    // this.loadChannels()
  },
  methods: {
    // 请求文章
    loadArticles (page = 1) {
      // 当发送请求的时候，分页组件禁用，disabled属性为true
      this.articleLoading = true

      // 过滤出有效的查询条件字段
      const filterData = {}
      for (let key in this.filterParams) {
        if (this.filterParams[key]) {
          filterData[key] = this.filterParams[key]
        }
      }

      // 参数默认值
      this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          // query查询数据写到这里传输
          page, // 请求数据的页码，不传默认为1
          per_page: 10, // 请求数据的每页大小，不传默认为0
          // 将对象混入当前对象，就是对象拷贝
          // ...this.filterParams
          ...filterData
        }
        // headers: { // 自定义发送请求头,字段名必须叫Authorization,
        //   Authorization: `Bearer ${userinfo.token}`
        // }
      }).then(data => {
        // console.log(data);
        this.articles = data.results // 列表数据
        this.totalCount = data.total_count // 总记录数
        this.articleLoading = false // 当请求完成，分页组件解禁，disabled属性值为false
      })
    },
    handleCurrentChange (page) {
      // 绑定数据
      this.page = page
      // console.log(page)
      // 当页码发生改变的时候，请求改页码对应的数据
      this.loadArticles(page)
    },
    // 删除
    handleDelete (article) {
      console.log(article)
      this.$confirm('确认删除么？', '删除提示', {
        $confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 确定执行,发送删除请求
          this.$http({
            method: 'DELETE',
            url: `/articles/${article.id}` // 不是query参数，所以要在路径后拼接，query参数可以写到params中
          }).then(data => {
            // 提示删除成功
            this.$message({
              type: 'success',
              message: '删除成功'
            })

            // 重新加载数据列表
            this.loadArticles(this.page)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            messagee: '已取消删除'
          })
        })
    },
    // 频道列表
    // loadChannels () {
    //   this.$http({
    //     method: 'GET',
    //     url: '/channels'
    //   }).then(data => {
    //     // console.log(data)
    //     this.channels = data.channels
    //   })
    // },
    // 日期选择组件改变事件
    handleDataChange (value) {
      this.filterParams.begin_pubdate = value[0]
      this.filterParams.end_pubdate = value[1]
    },
    onSubmit () {
      // console.log('submit!')
      this.page = 1 // 让分页组件的页码回到第一页
      this.loadArticles() // 加载第一页的数据
    }
  }
}
</script>

<style lang="less" scoped>
.filter-card {
  margin-bottom: 20px;
}
.list-table {
  margin-bottom: 30px;
}
</style>

