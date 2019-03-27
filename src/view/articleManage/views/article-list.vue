<template>
  <div>
    <div class="search">
      <article-filter/>
    </div>
    <List/>

    <!-- <object type="application/x-shockwave-flash" style="outline:none;" data="http://cdn.abowman.com/widgets/hamster/hamster.swf" width="210" height="150">
      <param name="movie" value="http://cdn.abowman.com/widgets/hamster/hamster.swf"></param>
      <param name="AllowScriptAccess" value="always"></param>
      <param name="wmode" value="opaque"></param>
      <embed src="http://cdn.abowman.com/widgets/hamster/hamster.swf" type="application/x-shockwave-flash" width="210" height="150">
      如果用戶的瀏覽器不支持 Flash
    <p>你的浏览器不支持Flash或Flash被浏览器阻止运行。</p>
    <br >
    <p>请使用支持Flash的浏览器或解除安全阻止.</p>
    </object> -->
  </div>
</template>

<script>
  import List from '@view/articleManage/components/list.vue'
  import ArticleFilter from '@view/articleManage/components/article-filter.vue'

  export default {
    components: { List, ArticleFilter },
    data () {
      return {
        breadList: [{ path: '/articlemanage', name: '文章管理' },
                    { path: '', name: '文章列表' }]
      }
    },
    created () {
      this.$store.commit('breadList', this.breadList)
    },

    methods: {

    }
  }
</script>
