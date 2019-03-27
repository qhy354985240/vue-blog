<template>
  <div>
    <div class="search">
      <article-filter/>
    </div>
    <List/>
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
