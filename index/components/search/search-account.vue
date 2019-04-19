<template>
  <el-select
    v-model="userName"
    size='small'
    filterable
    remote
    reserve-keyword
    placeholder="请输入账号"
    :remote-method="remoteMethod"
    @change="nameChange"
    :loading="loading">
    <el-option
      v-for="item in userList"
      :key="item.value"
      :label="item.value"
      :value="item.value">
      <span v-if="item.type=='common'"><i class="icon-qhy-user-s"/>&nbsp;{{ item.value }}</span>
      <span v-else><i class="icon-qhy-guanliyuan"/>&nbsp;{{ item.value }}</span>
    </el-option>
  </el-select>
</template>

<script>
  import api from '@/api/axios.js'
  export default {
    data () {
      return {
        userList: [],
        loading: false,
        timer: null,
        userName: ''
      }
    },

    methods: {
      remoteMethod (query) {
        if (query === '') return false
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.loading = true
        this.timer = setTimeout(() => {
          api.searchUser({
            query,
            type: 'userName'
          }).then(res => {
            this.loading = false
            if (res.success) {
              this.userList = res.result
            }
          }).catch(res => {
            this.loading = false
          })
        }, 200)
      },
      nameChange (value) {
        this.$emit('update:userName', value)
        this.$emit('result-change')
      }
    }
  }
</script>
