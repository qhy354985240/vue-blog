<template>
  <el-select
    v-model="email"
    size='small'
    filterable
    remote
    reserve-keyword
    placeholder="请输入账号"
    :remote-method="remoteMethod"
    @change="emailChange"
    :loading="loading">
    <el-option
      v-for="item in emailList"
      :key="item.label"
      :label="item.value"
      :value="item.value"/>
  </el-select>
</template>

<script>
  import api from '@/api/axios.js'
  export default {
    data () {
      return {
        emailList: [],
        loading: false,
        timer: null,
        email: ''
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
            type: 'email'
          }).then(res => {
            this.loading = false
            if (res.success) {
              this.emailList = res.result
            }
          }).catch(res => {
            this.loading = false
          })
        }, 200)
      },
      emailChange (value) {
        this.$emit('update:email', value)
        this.$emit('result-change')
      }
    }
  }
</script>
