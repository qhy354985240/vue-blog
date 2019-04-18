<template>
  <div>
    <el-table
      v-loading='loading'
      :show-header="false"
      @selection-change="handleSelectionChange"
      :data="articleList"
      ref="tableRef"
      style="width: 100%">
      <el-table-column :reserve-selection="true" type="selection" width="55" />
      <el-table-column>
        <template slot-scope="scope">
          <el-row class='row-title'>
            <el-col :span="12" class="row-name">
              <p>
                <!-- <router-link :to="{ path: '/'}"> -->
                <span class='task-title bright-color'>{{ scope.row.articleTitle }}</span>
                <!-- </router-link> -->
                <span class="inline-block">
                  <i :class="{ 'icon': true, 'circle-icon': true, 'green-bg-color': scope.row.status == '已审核', 'gray-bg-color': scope.row.status == '未审核' }" />
                </span>
              </p>
            </el-col>
            <el-col :span="12" class='right'>
              <el-button
                type="text"
                size="mini"
                @click="open(scope.$index)"
                class='operate-button'>
                <i class='icon-btn el-icon-view' /> 预览
              </el-button>
              <el-button
                v-if="isManager || scope.row.articleAuthor == userName"
                type="text"
                size="mini"
                :disabled="scope.row.articleStatus === '已审核'"
                @click="editArticle(scope.row)"
                class='operate-button'>
                <i class='icon-btn el-icon-edit' /> 编辑
              </el-button>
              <el-button type="text" size="mini" class='operate-button' @click="deleteArticle('single',scope.row)" v-if="isManager || scope.row.articleAuthor == userName">
                <i class='icon-btn el-icon-delete' /> 删除
              </el-button>

            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <span class='block light-color'>归属类别</span>
              <span class='bright-color'>{{ scope.row.articleType[scope.row.articleType.length-1] }} </span>
            </el-col>
            <el-col :span="4">
              <span class='block light-color'>作者</span>
              <span class='bright-color'>{{ scope.row.articleOwner }}</span>
            </el-col>
            <el-col :span="4">
              <span class='block light-color'>阅读权限</span>
              <span class='bright-color'>{{ scope.row.articleGrade =='common'?'普通用户':'管理员' }}&nbsp;</span>
            </el-col>
            <el-col :span="4">
              <span class='block light-color'>发表时间</span>
              <span class='bright-color'>{{ scope.row.createTime }}</span>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom-button">
      <el-checkbox label='all' v-model="checkAll" @change="allCheckEvent" class="all-check">
        全选</el-checkbox>
      <el-button
        size="mini"
        icon="el-icon-delete"
        @click="deleteArticle">批量删除</el-button>
      <el-button
        size="mini"
        icon="el-icon-refresh"
        @click="getArticleList()">刷新</el-button>
    </div>
    <div class="pagination">
      <pagination-page :data.sync=pagination @refesh="getArticleList"/>
    </div>
    <dialog-view ref="dialogViewRef"/>
    <dialog-edit ref="dialogEditRef"/>

  </div>
</template>

<script>
  import PaginationPage from '@/components/pagination-page.vue'
  import DialogView from '@view/articleManage/components/dialog-view.vue'
  import DialogEdit from '@view/articleManage/components/dialog-edit.vue'

  import api from '@/api/axios.js'

  export default {
    components: {
      PaginationPage,
      DialogView,
      DialogEdit
    },
    props: {
      filter: {
        type: Object,
        default: null
      }
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
        articleList: [],
        multipleSelection: [],
        userName: this.$store.state.userName
      }
    },
    created () {
      this.getArticleList()
    },
    computed: {
      isManager () {
        return this.$store.getters.isManager
      }
    },
    watch: {
      'filter': {
        deep: true,
        handler () {
          this.query()
        }
      }
    },
    methods: {
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      allCheckEvent () {
        this.$refs.tableRef.toggleAllSelection()
      },
      getArticleList () {
        this.loading = true
        api.getArticle({
          pageSize: this.pagination.pageSize,
          pageCurrent: this.pagination.pageCurrent,
          filter: this.filter
        }).then((res) => {
          this.loading = false
          if (res.success) {
            this.articleList = res.result
            this.pagination.total = res.total
          }
        }).catch(res => {
          this.loading = false
        })
      },

      // 编辑
      editArticle (row) {
        this.$refs.dialogEditRef.openDialog(row)
      },
      // 预览
      open (index) {
        this.$refs.dialogViewRef.title = this.articleList[index].articleTitle
        this.$refs.dialogViewRef.openDialog(this.articleList[index].articleContent)
      },
      // 删除文章单个
      handleDelete (row) {
        api.delArticle({
          _id: row._id
        }).then((res) => {
          if (res.success) {
            this.$message.success('删除成功')
            this.getArticleList()
          }
        })
      },

      // 删除文章多个
      handleDeleteMany () {
        let selection = []
        this.multipleSelection.map(item => {
          selection.push(item._id)
        })
        api.delArticles({
          selection: selection
        }).then((res) => {
          if (res.success) {
            this.$message.success('删除成功')
            this.getArticleList()
          }
        })
      },

      deleteArticle (type, row) {
        this.$confirm('此操作将永久删除所选文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (type === 'single') {
            if (this.multipleSelection.length < 2) {
              this.handleDelete(row)
            } else {
              this.$message.warning('选择多篇文章后请使用批量删除操作')
            }
          } else {
            if (this.multipleSelection.length < 1) {
              this.$message.warning('请选择至少一篇文章进行此操作')
            } else {
              this.handleDeleteMany()
            }
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
        this.getArticleList()
      }
    }
  }
</script>
<style scoped>
.operate-button {
  cursor: pointer;
  padding: 0;
  color: #727785;
  font-weight: normal;
}
.operate-button:hover {
  color: #409EFF;
}
.operate-button.is-disabled {
  color: #c0c4cc;
  }

/* .el-button:hover .icon-btn{
    color: #fc8845;
} */
</style>
