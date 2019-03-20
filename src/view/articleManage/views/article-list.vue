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

      }
    },
    created () {

    },

    methods: {

    }
  }
</script>
