<template>
  <el-col>
    <el-menu
      router
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      text-color="#2c3e50"
      active-text-color="#b6773f">
      <el-menu-item index="/dataview" >
        <i class="el-icon-bell"/>
        <span slot="title">数据概览</span>
      </el-menu-item>
      <el-menu-item index="/usermanage" >
        <i class="el-icon-news"/>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/articlemanage" >
        <i class="el-icon-document"/>
        <span slot="title">文章管理</span>
      </el-menu-item>
      <el-menu-item index="/commentsManage">
        <i class="el-icon-edit-outline"/>
        <span slot="title">评论、留言管理</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>

  export default {
    components: { },
    data () {
      return {
        defaultActive: ''
      }
    },
    created () {
      this.defaultActive = this.$router.currentRoute.path.indexOf('/', 1) !== -1 ? this.$router.currentRoute.path.slice(0, this.$router.currentRoute.path.indexOf('/', 1)) : this.$router.currentRoute.path
    },

    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
