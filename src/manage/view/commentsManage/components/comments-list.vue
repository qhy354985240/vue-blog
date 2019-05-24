
<template>
  <div class="comments-list">
    <el-table ref="tableRef"
              :data="articleList"
              stripe
              @selection-change="handleSelectionChange"
              v-loading="loading">
      <el-table-column :reserve-selection="true" type="selection" width="55"/>
      <el-table-column type="expand" >
        <template slot-scope="scope" >
          <comments-detail v-if="scope.row.detail" :data="scope.row.detail" />
        </template>
      </el-table-column>
      <el-table-column prop="articleTitle" label="留言归属" align="left" show-overflow-tooltip />
      <el-table-column prop="articleOwner" label="用户名" align="left" width="160" show-overflow-tooltip />
      <el-table-column prop="message" label="留言" show-overflow-tooltip align="left"/>
      <el-table-column prop="creatTime" label="时间" width="160" show-overflow-tooltip align="left"/>
      <el-table-column label="操作" align="center" width='200'>
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="viewDetail(scope.row)"
            class='operate-button'>
            <i class='icon-btn el-icon-view' /> 详情
          </el-button>
          <el-button
            type="text"
            size="mini"
            class='operate-button'>
            <i class='icon-btn el-icon-edit-outline' /> 回复
          </el-button>
          <el-button type="text" size="mini" class='operate-button ' @click="deleteOne">
            <i class='icon-btn el-icon-delete' /> 删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="bottom-button">
      <!-- <el-checkbox label='all' v-model="checkAll" @change="allCheckEvent" class="all-check">
        全选</el-checkbox>
      <el-button
        size="mini"
        icon="el-icon-delete"
        @click="handleDelete(scope.$index, scope.row)">批量删除</el-button> -->
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
  import CommentsDetail from '@view/commentsManage/components/comments-detail.vue'

  export default {
    components: {
      PaginationPage,
      CommentsDetail
    },

    data () {
      return {
        checkAll: false,
        loading: false,
        pagination: {
          pageSize: 10,
          pageCurrent: 1,
          pageSizeList: [10, 20, 50, 100],
          total: 0
        },
        articleList: [
          {articleTitle: '留言',
           articleStatus: '已审核',
           articleType: 'Node',
           message: '更新 Github',
           articleOwner: 'manager',
           detail: {
             userName: 'manager',
             userComments: '更新 Github',
             creatTime: '2018-05-13 20:46',
             comments: [{
               userName: 'super',
               userComments: 'good',
               creatTime: '2018-05-13 20:49'
             }, {
               userName: 'manager',
               userComments: 'test success',
               creatTime: '2018-05-13 20:51'
             }]
           },
           creatTime: '2018-05-13 20:46'},
          {articleTitle: '留言',
           message: '升级',
           articleStatus: '已审核',
           articleType: 'Node',
           articleOwner: 'manager',
           articleAuth: '管理员',
           creatTime: '2018-05-13 20:52'},
          {articleTitle: '留言',
           message: '修复bug',
           articleStatus: '已审核',
           articleType: 'Node',
           articleOwner: 'manager',
           articleAuth: '管理员',
           creatTime: '2018-05-14 13:52'}
        ]
      }
    },
    methods: {
      handleSelectionChange () {

      },
      handleDelete () {

      },
      allCheckEvent () {

      },
      refeshList () {

      },
      viewDetail (row) {
        this.$refs.tableRef.toggleRowExpansion(row)
      },
      deleteOne () {
        this.$confirm('此操作将永久删除所选留言, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.articleList.splice(2, 1)
          this.$message.success('删除成功')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>
