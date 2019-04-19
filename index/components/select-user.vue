<!-- 模糊搜索全部员工 -->
<template>
  <el-select
    class="input-width"
    v-model="curUsers"
    filterable
    remote
    :placeholder="placeholder"
    :style="{width: width}"
    :size="size"
    :multiple="multiple"
    :loading="loading"
    value-key="userName"
    :remote-method="remoteMethod"
    :allow-create="true"
    @change="userChange">
    <el-option
      v-for="(item, index) in userOptions"
      :key="index"
      :label="item.userName"
      :value="item.account">
      {{ item.userName }} ( {{ item.account }} )
    </el-option>
  </el-select>
</template>
<script>
  import { searchAllUserUsingGET } from '@sdpp/api'
  export default {
    props: {
      accountCode: {
        type: [String, Array],
        default () {
          return []
        }
      },
      size: {
        type: String,
        default () {
          return 'medium'
        }
      },
      multiple: {
        type: Boolean,
        default () {
          return false
        }
      },
      width: {
        type: String,
        default: ''
      },
      userlist: {
        type: Array,
        default () {
          return []
        }
      },
      placeholder: {
        type: String,
        default: ''
      }
    },

    data () {
      return {
        loading: false,
        userOptions: [],
        curUsers: this.accountCode,
        timer: null
      }
    },

    watch: {
      accountCode (value) {
        this.curUsers = value
      }
    },

    created () {
      this.userOptions = this.userlist
    },

    methods: {
      userChange (value) {
        this.curUsers = value
        this.$emit('update:accountCode', value)
        this.$emit('on-result-change', value)
      },

      remoteMethod: function (query) {
        if (query === '') return false
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          searchAllUserUsingGET({
            name: query,
            limit: 10
          }).then(
            res => {
              this.userOptions = res.data
            },
            res => {
              this.$message.error(`${this.$t('Failed_to_get_user_list_interface_request')}：${res.message}`)
            }
          )
        }, 200)
      }
    }
  }
</script>

<style>
</style>
