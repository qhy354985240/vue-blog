
<template>
  <el-form :model='filter' label-width="90px" class="hive-tbl-filter">
    <el-row>
      <el-col :span='6'>
        <el-form-item label="用户名">
          <el-input
            size='small'
            class=""
            v-model='filter.userName'
            @keyup.enter.native="query" />
        </el-form-item>
      </el-col>
      <el-col :span='6'>
        <el-form-item label="账号">
          <el-input
            size='small'
            class=""
            v-model='filter.account'
            @keyup.enter.native="query" />
            <!-- <select-user
            size="small"
            class="input-width-90p"
            @on-change="query"/> -->
        </el-form-item>
      </el-col>
      <el-col :span='6'>
        <el-form-item label="邮箱">
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
