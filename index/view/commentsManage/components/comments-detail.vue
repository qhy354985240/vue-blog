
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="14" :offset="2"><span class="text-label">昵称：</span>{{ data.userName }}</el-col>
      <el-col :span="14" :offset="2"><span class="text-label">留言：</span>{{ data.userComments }}</el-col>
      <el-col :span="14" :offset="2"><span class="text-label">时间：</span>{{ data.creatTime }}</el-col>
    </el-row>
    <el-row :gutter="20" v-for="(item, key) in data.comments" :key="key">
      <el-col :span="16" class="el-padding" :offset="2">{{ item.userName }}：<span class="text-label">回复</span> {{ data.userName }}：{{ item.userComments }}</el-col>
      <el-col :span="6"><span class="text-label">时间：</span>{{ item.creatTime }}&nbsp;&nbsp;&nbsp;<el-button type="text" class='operate-button' icon="el-icon-delete"/></el-col>
    </el-row>
  </div>
</template>

<script>

  export default {
    components: {
    },
    props: {
      data: {
        type: [Object],
        default () {
          return null
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
      handleSelectionChange () {

      },
      handleDelete () {

      },
      allCheckEvent () {

      },
      refeshList () {

      },
      viewDetail (row) {
        console.log(row)
        this.$refs.tableRef.toggleRowExpansion(row)
      }
    }
  }
</script>
