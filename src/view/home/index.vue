<template>
  <el-container class='wrapper'>
    <el-header class="header">Header</el-header>
    <el-container>
      <el-aside width="220px" class="left-menu">
        <left-menu/>
      </el-aside>
      <el-main class="home">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>{{ 'qhy' }} {{ 'xxxx' }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ 'qhy' }} {{ 'xxxx' }}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import LeftMenu from '@/components/left-menu.vue'

  export default {
    components: { LeftMenu },
    data () {
      return {

      }
    },
    created () {

    },

    methods: {
      jump () {
        console.log(0)
        this.$router.push({path: '/usermanage'})
      }
    }
  }
</script>
