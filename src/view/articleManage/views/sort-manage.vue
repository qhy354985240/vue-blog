<template>
  <div>
    sort manage
    <router-view/>
  </div>
</template>

<script>
  import Tabs from '@/components/tabs.vue'

  export default {
    components: { Tabs },
    data () {
      return {
        tabsList: [
          {label: '文章列表', name: 'articleList', class: 'el-icon-date'},
          {label: '分类管理', name: 'sortManage', class: 'el-icon-date'},
          {label: '添加文章', name: 'addArticle', class: 'el-icon-date'}
        ]
      }
    },
    created () {

    },

    methods: {

    }
  }
</script>
