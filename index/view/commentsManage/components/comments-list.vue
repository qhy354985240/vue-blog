
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
      <el-table-column prop="articleTitle" label="用户名" align="left" width="160" show-overflow-tooltip />
      <el-table-column prop="articleTitle" label="留言" show-overflow-tooltip align="left"/>
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
            :disabled="scope.row.articleStatus === '已审核'"
            class='operate-button'>
            <i class='icon-btn el-icon-edit-outline' /> 回复
          </el-button>
          <el-button type="text" size="mini" class='operate-button '>
            <i class='icon-btn el-icon-delete' /> 删除
          </el-button>
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
          {articleTitle: '哈市大家啊啊啊啊啊啊啊啊都哈酒的',
           articleStatus: '已审核',
           articleType: 'Node',
           articleOwner: 'qhy',
           detail: {
             userName: '1111111',
             userComments: 'hello world',
             creatTime: '2019-01-24 03:24',
             comments: [{
               userName: '222222222',
               userComments: 'no thanks哈市大家啊啊啊啊啊啊啊啊都哈酒的哈市大家啊啊啊啊啊啊啊啊都哈酒的哈市大家啊啊啊啊啊啊啊啊都哈酒的哈市大家啊啊啊啊啊啊啊啊都哈酒的哈市大家啊啊啊啊啊啊啊啊都哈酒的哈市大家啊啊啊啊啊啊啊啊都哈酒的哈市大家啊啊啊啊啊啊啊啊都哈酒的哈市大家啊啊啊啊啊啊啊啊都哈酒的哈市大家啊啊啊啊啊啊啊啊都哈酒的哈市大家啊啊啊啊啊啊啊啊都哈酒的哈市大家啊啊啊啊啊啊啊啊都哈酒的',
               creatTime: '2019-02-24 04:24'
             }, {
               userName: '222222222',
               userComments: 'no thanks',
               creatTime: '2019-02-24 04:24'
             }, {
               userName: '222222222',
               userComments: 'no thanks',
               creatTime: '2019-02-24 04:24'
             }, {
               userName: '222222222',
               userComments: 'no thanks',
               creatTime: '2019-02-24 04:24'
             }]
           },
           creatTime: '2019-01-24 03:24'},
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

      },
      viewDetail (row) {
        this.$refs.tableRef.toggleRowExpansion(row)
      }
    }
  }
</script>
