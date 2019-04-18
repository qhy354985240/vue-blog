<template>
  <el-select
    v-model="nickName"
    size='small'
    filterable
    remote
    reserve-keyword
    placeholder="请输入用户名"
    :remote-method="remoteMethod"
    @change="nameChange"
    :loading="loading">
    <el-option
      v-for="item in userList"
      :key="item.value"
      :label="item.label"
      :value="item.label">
      <span v-if="item.type=='common'"><i class="icon-qhy-user-s"/>&nbsp;{{ item.label }}</span>
      <span v-else><i class="icon-qhy-guanliyuan"/>&nbsp;{{ item.label }}</span>
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
        nickName: ''
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
            type: 'nickName'
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
        this.$emit('update:nickName', value)
        this.$emit('result-change')
      }
    }
  }
</script>
