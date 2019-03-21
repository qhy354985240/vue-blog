
<template>
  <el-form :model='filter' label-width="90px">
    <el-row>
      <el-col :span='6'>
        <el-form-item label="文章标题">
          <el-input
            size='small'
            class=""
            v-model='filter.userName'
            @keyup.enter.native="query" />
        </el-form-item>
      </el-col>
      <el-col :span='6'>
        <el-form-item label="阅读权限">
          <el-input
            size='small'
            class=""
            v-model='filter.email'
            @keyup.enter.native="query" />
        </el-form-item>
      </el-col>
      <el-col :span='6'>
        <el-form-item label="类型">
          <el-input
            size='small'
            class=""
            v-model='filter.userType'
            @keyup.enter.native="query" />
        </el-form-item>
      </el-col>
      <el-col :span="6" class="vertical-middle right">
        <el-button
          size="mini"
          icon="el-icon-share">发布</el-button>

      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  import Tabs from '@/components/tabs.vue'

  export default {
    components: { Tabs },
    data () {
      return {
        filter: {
          email: '',
          account: '',
          userName: '',
          userType: ''
        }
      }
    },
    created () {

    },

    methods: {

    }
  }
</script>
<style scoped>
.vertical-middle>>> .el-button {
  margin-top: 6px !important;
}
</style>
