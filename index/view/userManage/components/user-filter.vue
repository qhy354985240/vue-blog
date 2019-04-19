
<template>
  <el-form :model='pageFilter' label-width="90px" class="hive-tbl-filter">
    <el-row>
      <el-col :span='6'>
        <el-form-item label="用户名">
          <search-user :nick-name.sync="pageFilter.nickName" @result-change="nickChange" />
        </el-form-item>
      </el-col>
      <el-col :span='6'>
        <el-form-item label="账号">
          <search-account :user-name.sync="pageFilter.userName" @result-change="accountChange" />
        </el-form-item>
      </el-col>
      <el-col :span='6'>
        <el-form-item label="邮箱">
          <search-email :email.sync="pageFilter.email" @result-change="emailChange" />
        </el-form-item>
      </el-col>
      <el-col :span='6'>
        <el-form-item label="类型">
          <select-usertype :user-type.sync="pageFilter.userType" @result-change="typeChange" />
        </el-form-item>
      </el-col>

    </el-row>
  </el-form>
</template>

<script>
  import SearchUser from '@/components/search/search-user.vue'
  import SearchAccount from '@/components/search/search-account.vue'
  import SearchEmail from '@/components/search/search-email.vue'
  import SelectUsertype from '@/components/search/select-usertype.vue'

  export default {
    components: { SearchUser, SearchAccount, SearchEmail, SelectUsertype },
    props: {
      filter: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        pageFilter: {
          email: '',
          account: '',
          nickName: '',
          userType: '',
          userName: ''
        }
      }
    },

    methods: {
      nickChange () {
        this.filter.nickName = this.pageFilter.nickName
      },
      accountChange () {
        this.filter.userName = this.pageFilter.userName
      },
      emailChange () {
        this.filter.email = this.pageFilter.email
      },
      typeChange () {
        this.filter.userType = this.pageFilter.userType
      }
    }
  }
</script>
