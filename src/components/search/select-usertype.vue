<template>
  <el-select
    v-model="userType"
    size='small'
    filterable
    clearable
    placeholder="请选择类型"
    @change="typeChange">
    <el-option
      v-for="item in typeList"
      :key="item.value"
      :label="item.label"
      :value="item.value"/>
  </el-select>
</template>

<script>
  import { userType } from '@/constants'
  export default {
    data () {
      return {
        userType: '',
        typeList: []
      }
    },
    created () {
      this.typeList = userType
    },
    methods: {
      typeChange (value) {
        this.$emit('update:userType', value)
        this.$emit('result-change')
      }
    }
  }
</script>
