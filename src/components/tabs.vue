<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for="(item,key) in list" :key="key" :name="item.name">
      <span slot="label">
      <i :class="item.class" class="tabs-icon"/>{{ item.label }}</span>
    </el-tab-pane>
  </el-tabs>
</template>

<script>

  export default {
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      },
      router: {
        type: [String, RegExp],
        default: ''
      }
    },
    data () {
      return {
        activeName: ''
      }
    },
    created () {
      this.activeName = this.$route.path.slice(15)
    },
    watch: {
      '$route.path' () {
        this.activeName = this.$route.path.slice(15)
      }
    },
    methods: {
      handleClick (tab, event) {
        // console.log(tab, 'tab')
        // console.log(this.$route.path)
        let url = this.router + tab.name
        this.$router.push({path: url})
      }
    }
  }
</script>
