<template>
  <Dialog
    :title="title"
    :visible="visableDialog"
    :confirm="confirmFun"
    :showFooter=true
    width="100"
    :cancel="hideDialog">
    <div class="dialog-view">
      <el-input
        size="small"
        placeholder=""
        v-model="value"/>
  </div></Dialog>
</template>

<script>
  import Dialog from '@/components/dialog.vue'

  export default {
    components: { Dialog },
    data () {
      return {
        title: '',
        visableDialog: false,
        value: '',
        data6: [],
        initvalue: '',
        value1: ''
      }
    },
    created () {

    },

    methods: {
      openDialog (item, type, data5) {
        this.title = type === 'add' ? '新增' : '编辑'
        this.data6 = data5
        if (type === 'edit') {
          this.initvalue = item.value
          this.value = item.value
        } else {
          this.value1 = item.value
        }
        this.visableDialog = true
      },

      confirmFun () {
        if (this.title === '编辑') {
          this.$parent.updateId(this.initvalue, this.data6, this.value)
          this.$message.success('修改成功')
        } else {
          this.$parent.insertId(this.value1, this.data6, this.value)
          this.$message.success('新增成功')
        }
        this.hideDialog()
        // console.log(this.$parent.updateId(this.value, this.data6, this.initvalue))
      },
      hideDialog () {
        this.value = ''
        this.visableDialog = false
      },
      submit (data) {

      }

    }
  }
</script>
<style scoped>
.dialog-view>>> img {
  max-width: 100%;
  box-sizing: content-box;
}
</style>
