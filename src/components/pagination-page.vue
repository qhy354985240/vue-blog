<!-- 分页 -->
<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagination.pageCurrent"
    :page-sizes="pagination.pageSizeList"
    :page-size="pagination.pageSize"
    layout="total, prev, pager, next, sizes"
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
        this.$emit('refresh-list')
      },

      handleCurrentChange (val) {
        this.pagination.pageCurrent = val
        this.$emit('updated:data', this.pagination)
        this.$emit('refresh-list')
      }
    }
  }
</script>
