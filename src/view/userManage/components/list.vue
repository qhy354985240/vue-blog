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
        align="center"
        label="用户名">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="账号">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="邮箱">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户类型"
        align="center"
        width="120">
        <template slot-scope="scope">
          <el-tag type="info">{{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="注册时间"
        align="center"
        width="140">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
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
        @click="handleDelete(scope.$index, scope.row)">刷新</el-button>
    </div>
    <div class="pagination">
      <pagination-page :data.sync=pagination @refesh="refeshList"/>
    </div>
  </div>
</template>

<script>
  import PaginationPage from '@/components/pagination-page.vue'

  export default {
    components: {
      PaginationPage
    },
    data () {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          type: '普通用户'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          type: '普通用户'

        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          type: '普通用户'

        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          type: '普通用户'

        }],
        multipleSelection: [],
        pagination: {
          pageSize: 10,
          pageCurrent: 1,
          pageSizeList: [10, 20, 50, 100],
          total: 0
        }
      }
    },
    methods: {
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

      }
    }
  }
</script>
