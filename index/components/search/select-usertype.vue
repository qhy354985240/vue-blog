<template>
  <el-select
    v-model="userType"
    size='small'
    filterable
    :placeholder="placeholder"
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
    props: {
      placeholder: {
        type: String,
        default: '请选择类型'
      },
      type: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        userType: '',
        typeList: []
      }
    },
    watch: {
      type () {
        this.userType = this.type
      }
    },
    created () {
      this.typeList = userType
    },
    methods: {
      typeChange (value) {
        this.$emit('update:articleGrade', value)
        this.$emit('result-change')
      }
    }
  }
</script>
