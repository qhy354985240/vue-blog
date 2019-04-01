<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
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
        label="用户类型"
        align="left"
        width="120">
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
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom-button">
      <el-button
        size="mini"
        icon="el-icon-delete"
        @click="handleDelete(scope.$index, scope.row)">批量删除</el-button>
      <el-button
        size="mini"
        icon="el-icon-refresh"
        @click="getUsers">刷新</el-button>
    </div>
    <div class="pagination">
      <pagination-page :data.sync=pagination @refresh="refeshList"/>
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
    methods: {
      getUsers () {
        api.getUser({
          pageSize: this.pagination.pageSize,
          pageCurrent: this.pagination.pageCurrent
        }).then((res) => {
          if (res.success) {
            this.tableData = res.result
            this.pagination.total = res.total
          }
        }).catch(res => {
          console.log(res.message)
        })
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      refeshList () {
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
