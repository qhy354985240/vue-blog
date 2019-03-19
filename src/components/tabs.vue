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
      this.activeName = this.list.length > 0 ? this.list[0].name : ''
    },
    methods: {
      handleClick (tab, event) {
        let url = this.router + tab.name
        this.$router.push({path: url})
        console.log(tab, event)
      }
    }
  }
</script>
