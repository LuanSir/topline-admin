<template>
  <div class="box-wrap">
    <p>点击选择图片</p>
    <i style="margin-top: 20px;
      font-size: 90px; color: #eee;"
      class="iconfont icon-image_upload"
    ></i>
    <!-- <img width="120" src="http://toutiao.meiduo.site/FvGUrO7Ru_T2ToQwn_OznfwKnjoL"> -->
  </div>
</template>

<script>
export default {
  name: 'UploadImage',
  data () {
    return {}
  }
}
</script>

<style lang="less">
.box-wrap {
  width: 200px;
  height: 200px;
  border: 1px solid #eee;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
