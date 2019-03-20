<template>
  <div class="tabs-card">
    <!-- <dd-tabmenu :router="/project/" :datas="menulist"/> -->
    <tabs :list="tabsList" :router="/articlemanage/"/>
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
          {label: '文章列表', name: 'articlelist', class: 'el-icon-tickets'},
          {label: '分类管理', name: 'sortmanage', class: 'el-icon-menu'},
          {label: '添加文章', name: 'addarticle', class: 'el-icon-edit-outline'}
        ]
      }
    },
    created () {

    },

    methods: {

    }
  }
</script>
