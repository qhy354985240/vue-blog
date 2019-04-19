<template>
  <div>
    <div class="search">
      <add-article-input ref="addTicleRef" :filter="filter" />
    </div>
    <List :filter="filter"/>
  </div>
</template>

<script>
  import List from '@view/articleManage/components/list.vue'
  import AddArticleInput from '@/components/add-article-input.vue'

  export default {
    components: { List, AddArticleInput },

    data () {
      return {
        filter: {
          articleOwner: '',
          articleTitle: '',
          articleGrade: '',
          articleType: []
        },
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
