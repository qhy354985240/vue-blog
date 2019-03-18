<template>
<el-container class='wrapper'>
  <el-header class="header">Header</el-header>
  <el-container>
    <el-aside width="220px" class="left-menu">
      <left-menu/>
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
import LeftMenu from '@/components/left-menu.vue'

export default {
  name: 'Home',
  components: { LeftMenu },
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
