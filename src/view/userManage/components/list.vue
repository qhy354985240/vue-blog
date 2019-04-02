<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading='loading'
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        align="left"
        label="用户名">
        <template slot-scope="scope">
          {{ scope.row.nickName }}
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        label="账号">
        <template slot-scope="scope">
          <i class="icon-qhy-yonghu"/>
          <span style="margin-left: 2px">{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        label="邮箱">
        <template slot-scope="scope">
          <i class="el-icon-message"/>
          <span style="margin-left: 2px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="left"
        width="120">
        <template slot="header" slot-scope="scope">
          <el-tooltip class="tooltip" placement="top">
            <div>
              用户类型
              <i class="el-icon-question"/>
            </div>
            <div slot="content">
              普通用户：不具有操作用户和审核文章的功能<br>
              管理员：具有一切操作权限
            </div>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <el-tag type="info">{{ scope.row.userType == 'common' ? '普通用户' : '管理员' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="注册时间"
        align="left"
        width="140">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span style="margin-left: 2px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            :disabled="!isManager"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteUser('single', scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom-button">
      <el-button
        size="mini"
        icon="el-icon-delete"
        @click="deleteUser">批量删除</el-button>
      <el-button
        size="mini"
        icon="el-icon-refresh"
        @click="getUsers">刷新</el-button>
    </div>
    <div class="pagination">
      <pagination-page :data.sync=pagination @refresh="getUsers"/>
    </div>
  </div>
</template>

<script>
  import PaginationPage from '@/components/pagination-page.vue'
  import api from '@/api/axios.js'

  export default {
    components: {
      PaginationPage
    },
    data () {
      return {
        loading: false,
        tableData: [],
        multipleSelection: [],
        pagination: {
          pageSize: 10,
          pageCurrent: 1,
          pageSizeList: [10, 20, 50, 100],
          total: 0
        }
      }
    },
    created () {
      this.getUsers()
    },
    computed: {
      isManager () {
        return this.$store.getters.isManager
      }
    },
    methods: {
      getUsers () {
        this.loading = true
        api.getUser({
          pageSize: this.pagination.pageSize,
          pageCurrent: this.pagination.pageCurrent
        }).then((res) => {
          this.loading = false
          if (res.success) {
            this.tableData = res.result
            this.pagination.total = res.total
          }
        }).catch(res => {
          this.loading = false
          console.log(res.message)
        })
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
      // 删除单个用户
      handleDelete (row) {
        api.delUser({
          userName: row.userName
        }).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.query()
          } else {
            this.$message.error('删除失败')
          }
        }).catch(res => {
          this.loading = false
          console.log(res.message)
        })
      },
      // 删除多个用户
      handleDeleteMany () {
        let data = []
        this.multipleSelection.map(item => {
          data.push(item)
        })
      },

      handleSelectionChange (val) {
        this.multipleSelection = val
      },

      deleteUser (type, row) {
        this.$confirm('此操作将永久删除所选用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (type === 'single') {
            this.handleDelete(row)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      query () {
        this.pagination.pageCurrent = 1
        this.getUsers()
      }
    }
  }
</script>
<style scoped>
i{
  font-size: 14px;
}

</style>
