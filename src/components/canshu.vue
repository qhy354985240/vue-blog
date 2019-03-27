<template>
  <div class="error">
    <div class="error-operate">
      <el-button type="text" class='error-btn' @click="goBack">返回上一页</el-button>
    </div>
    <div class="error-page">
      很遗憾，你访问的页面找不到了！
    </div>
    <div>
      <object type="application/x-shockwave-flash" style="outline:none;" data="http://cdn.abowman.com/widgets/hamster/hamster.swf" width="100%" height="500">
        <param name="movie" value="http://cdn.abowman.com/widgets/hamster/hamster.swf"></param>
        <param name="AllowScriptAccess" value="always"></param>
        <param name="wmode" value="opaque"></param>
        <embed src="http://cdn.abowman.com/widgets/hamster/hamster.swf" type="application/x-shockwave-flash" width="100%" height="500">
        <p>你的浏览器不支持Flash或Flash被浏览器阻止运行。</p>
        <br >
        <p>请使用支持Flash的浏览器或解除安全阻止.</p>
      </object>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      goBack () {
        this.$router.go(-1)// 返回上一层
      }
    }
  }
</script>

<style scoped>

</style>
