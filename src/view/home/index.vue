<template>
  <el-container class='wrapper'>
    <el-header class="header">Header</el-header>
    <el-container>
      <el-aside width="220px" class="left-menu">
        <left-menu/>
      </el-aside>
      <el-main class="home">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item,key) in breadList" :key="key">
            <span @click="jump(item)" :class="{isJump: item.path != ''}" class="bread"> {{ item.name }} </span>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import LeftMenu from '@view/home/left-menu.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: { LeftMenu },
    data () {
      return {}
    },
    computed: {
      ...mapGetters([
        'breadList'
      ])
    },

    methods: {
      jump (item) {
        this.$router.push({path: item.path})
      }
    }
  }
</script>
