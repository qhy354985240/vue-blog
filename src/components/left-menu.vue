<template>
  <el-col>
    <h5 class="left-bar-title">自定义颜色</h5>
    <el-menu
      router
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      text-color="#2c3e50"
      active-text-color="#b6773f">
      <el-menu-item index="/usermanage" >
        <i class="el-icon-news"/>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/articlemanage" >
        <i class="el-icon-document"/>
        <span slot="title">文章管理</span>
      </el-menu-item>
      <el-menu-item index="3" disabled >
        <i class="el-icon-upload"/>
        <span slot="title">上传管理</span>
      </el-menu-item>
      <el-menu-item index="4">
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
        defaultActive: this.$router.currentRoute.path
      }
    },
    created () {

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
