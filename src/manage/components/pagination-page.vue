<!-- 分页 -->
<template>
  <el-pagination
    :background='background'
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagination.pageCurrent"
    :page-sizes="pagination.pageSizeList"
    :page-size="pagination.pageSize"
    :layout="layout"
    :total="pagination.total"/>
</template>

<script>

  export default {
    name: 'Pagination',
    props: {
      data: {
        type: Object,
        default () {
          return {
            pageSize: 10,
            pageCurrent: 1,
            pageSizeList: [10, 20, 50, 100],
            total: 0
          }
        }
      },
      layout: {
        type: String,
        default: 'total, prev, pager, next, sizes'
      },
      background: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
      }
    },
    computed: {
      pagination () {
        return this.data
      }
    },

    methods: {

      handleSizeChange (val) {
        this.pagination.pageSize = val
        this.$emit('updated:data', this.pagination)
        this.$emit('refresh')
      },

      handleCurrentChange (val) {
        this.pagination.pageCurrent = val
        this.$emit('updated:data', this.pagination)
        this.$emit('refresh')
      }
    }
  }
</script>
