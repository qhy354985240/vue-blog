<template>
  <div class="tree-block">
    <el-row>
      <el-col :span="8">
        <el-input
          size="small"
          placeholder="输入关键字进行筛选"
          v-model="filterText"/>
      </el-col>
      <el-col :span="16" class="right">
        <el-button
          size="small"
          icon="el-icon-circle-plus-outline"
          @click="() => append(data)">
          新增类别
        </el-button>

      </el-col>
    </el-row>
    <el-tree
      ref="treeRef"
      :data="data5"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      @node-drop="handleDrop"
      draggable
      :allow-drag="allowDrag">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span class="float-r">
          <el-button
            type="text"
            size="small"
            @click="() => openDial(data,'add')"
            class='operate-button'>
            <i class='icon-btn el-icon-circle-plus-outline' /> 添加
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="openDial(data,'edit')"
            class='operate-button'>
            <i class='icon-btn el-icon-edit' /> 编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="() => remove(node, data)"
            class='operate-button '>
            <i class='icon-btn el-icon-delete' /> 删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <DialogSort ref="dialogSort"/>
    <div class="pagination">
      <!-- <pagination-page :data.sync=pagination @refesh="refeshList"/> -->
    </div>
  </div>
</template>

<script>
  import PaginationPage from '@/components/pagination-page.vue'
  import DialogSort from '@view/articleManage/components/dialog-sort.vue'

  export default {
    components: { PaginationPage, DialogSort },
    data () {
      return {
        data5: [],
        filterText: '',
        pagination: {
          pageSize: 10,
          pageCurrent: 1,
          pageSizeList: [10, 20, 50, 100],
          total: 0
        },
        breadList: [{ path: '/articlemanage/articlelist', name: '文章管理' },
                    { path: '', name: '分类管理' }]
      }
    },
    created () {
      this.$store.commit('breadList', this.breadList)
      this.data5 = JSON.parse(window.localStorage.getItem('tag'))
      this.setId(this.data5)
    },
    watch: {
      filterText (val) {
        this.$refs.treeRef.filter(val)
      }
    },
    methods: {
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleDrop (draggingNode, dropNode, dropType, ev) {
        // 移动完后发起请求
      },
      allowDrag (draggingNode) {
        // 如果不是超管则返回为false
        return true
      },
      refeshList () {

      },
      openDial (data, type) {
        if (type === 'add') {
          this.$refs.dialogSort.openDialog(data, type, this.data5)
        } else {
          this.$refs.dialogSort.openDialog(data, type, this.data5)
        }
      },
      insertId (value, array, upvalue) {
        console.log(array)
        for (let i = 0; i < array.length; i++) {
          console.log(1111)
          if (array[i].value === value) {
            array.push({'value': upvalue, 'label': upvalue})
            console.log(array)
          } else if (array[i]['children']) {
            this.insertId(value, array[i]['children'], upvalue)
          }
        }
        window.localStorage.setItem('tag', JSON.stringify(this.data5))
      },
      updateId (value, array, upvalue) {
        for (let i = 0; i < array.length; i++) {
          if (array[i].value === value) {
            array[i].value = upvalue
            array[i].label = upvalue
          } else if (array[i]['children']) {
            this.updateId(value, array[i]['children'], upvalue)
          }
        }
        window.localStorage.setItem('tag', JSON.stringify(this.data5))
      },
      remove (node, data) {
        this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.removeId(data.label, this.data5)

          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      removeId (value, array) {
        for (let i = 0; i < array.length; i++) {
          if (array[i].value === value) {
            array.splice(i, 1)
          } else if (array[i]['children']) {
            this.removeId(value, array[i]['children'])
          }
        }
        window.localStorage.setItem('tag', JSON.stringify(this.data5))
      },
      setId (array) {
        for (let i = 0; i < array.length; i++) {
          array[i]['id'] = i
          if (array['children']) {
            this.setId(array[i]['children'])
          }
        }
      }
    }
  }
</script>
<style scoped>
.tree-block>>> .el-tree {
  margin: 20px 0;
}
.tree-block>>> .el-tree-node__content {
  padding: 10px;
  font-size: 16px;
  border-bottom: 1px solid rgb(128,128,128, .1);
  position: relative;
}
.float-r {
  position: absolute;
  right: 0;
  margin: -4px 10px 0 10px;
}
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
</style>
