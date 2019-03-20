<template>
  <div>
    <el-table
      :show-header="false"
      @selection-change="handleSelectionChange"
      :data="articleList"
      style="width: 100%">
      <el-table-column :reserve-selection="true" type="selection" width="55" />
      <el-table-column>
        <template slot-scope="scope">
          <el-row class='row-title'>
            <el-col :span="12" class="row-name">
              <p>
                <router-link :to="{ path: '/'}">
                <span class='task-title bright-color'>{{ scope.row.articleTitle }}</span></router-link>
                <span class="inline-block">
                  <i :class="{ 'icon': true, 'circle-icon': true, 'green-bg-color': scope.row.status == '已审核', 'gray-bg-color': scope.row.status == '未审核' }" />
                </span>
              </p>
            </el-col>
            <el-col :span="12" class='right'>
              <el-button
                type="text"
                size="mini"
                class='operate-button'>
                <i class='icon-btn el-icon-view' /> 预览
              </el-button>
              <el-button
                type="text"
                size="mini"
                :disabled="scope.row.articleStatus === '已审核'"
                class='operate-button'>
                <i class='icon-btn el-icon-edit' /> 编辑
              </el-button>
              <el-button type="text" size="mini" class='operate-button '>
                <i class='icon-btn el-icon-delete' /> 删除
              </el-button>

            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <span class='block light-color'>归属类别</span>
              <span class='bright-color'>{{ scope.row.articleType }} </span>
            </el-col>
            <el-col :span="4">
              <span class='block light-color'>作者</span>
              <span class='bright-color'>{{ scope.row.articleOwner }}</span>
            </el-col>
            <el-col :span="4">
              <span class='block light-color'>阅读权限</span>
              <span class='bright-color'>{{ scope.row.articleAuth }}&nbsp;</span>
            </el-col>
            <el-col :span="4">
              <span class='block light-color'>发表时间</span>
              <span class='bright-color'>{{ scope.row.creatTime }}</span>
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
        checkAll: false,
        pagination: {
          pageSize: 10,
          pageCurrent: 1,
          pageSizeList: [10, 20, 50, 100],
          total: 0
        },
        articleList: [
          {articleTitle: '哈市大家都哈酒的',
           articleStatus: '已审核',
           articleType: 'Node',
           articleOwner: 'qhy',
           articleAuth: '管理员',
           creatTime: '2019-1-24'},
          {articleTitle: '哈市大家都哈酒的',
           articleStatus: '已审核',
           articleType: 'Node',
           articleOwner: 'qhy',
           articleAuth: '管理员',
           creatTime: '2019-1-24'}
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
