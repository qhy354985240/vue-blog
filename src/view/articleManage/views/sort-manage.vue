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
        <el-button
          size="small"
          icon="el-icon-delete"
          @click="() => remove(node, data)">
          批量删除
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
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      draggable
      :allow-drag="allowDrag">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span class="float-r">
          <el-button
            type="text"
            size="small"
            @click="() => append(data)"
            class='operate-button'>
            <i class='icon-btn el-icon-circle-plus-outline' /> 添加
          </el-button>
          <el-button
            type="text"
            size="small"
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
    <div class="pagination">
      <pagination-page :data.sync=pagination @refesh="refeshList"/>
    </div>
  </div>
</template>

<script>
  import PaginationPage from '@/components/pagination-page.vue'

  export default {
    components: { PaginationPage },
    data () {
      const data = [{
        id: 1,
        label: '前端',
        children: [{
          id: 4,
          disabled: true,
          label: 'JavaScript',
          children: [{
            id: 9,
            label: 'Node.js'
          }, {
            id: 10,
            label: 'flux.js'
          }]
        }]
      }, {
        id: 2,
        label: '后端',
        children: [{
          id: 5,
          label: 'Java'
        }, {
          id: 6,
          label: 'Python'
        }]
      }, {
        id: 3,
        label: '体育',
        children: [{
          id: 7,
          label: '篮球'
        }, {
          id: 8,
          label: '足球'
        }]
      }]
      return {
        data4: JSON.parse(JSON.stringify(data)),
        data5: JSON.parse(JSON.stringify(data)),
        filterText: '',
        pagination: {
          pageSize: 10,
          pageCurrent: 1,
          pageSizeList: [10, 20, 50, 100],
          total: 0
        }
      }
    },
    created () {

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
        console.log(this.data5)
        // 移动完后发起请求
      },
      allowDrag (draggingNode) {
        // 如果不是超管则返回为false
        return true
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
