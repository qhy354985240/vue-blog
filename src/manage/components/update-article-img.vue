
<template>
  <Dialog
    :title="title"
    ref="dialogRef"
    width='700px'
    :visible="visableDialog"
    :confirm="onEnter"
    :disable="disabled"
    :cancel="hideDialog">
    <div class="update-content">
      <el-upload
        ref="uploadRef"
        action="http://localhost:3004/api/user/upload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-change="fileChange"
        :auto-upload=false
        :limit=1>
        <i class="el-icon-plus"/>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </dialog>
</template>

<script>
  import Dialog from '@/components/dialog.vue'
  export default {
    components: {
      Dialog
    },
    props: {
      title: {
        type: String,
        default: '更换头像'
      }
    },
    data () {
      return {
        imgURL: '',
        visableDialog: false,
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        file: null
      }
    },
    methods: {
      openDialog () {
        this.visableDialog = true
      },
      // 确认
      onEnter () {
        if (this.file) {
          this.$emit('enter', this.file) // 返回链接
          this.$refs.uploadRef.clearFiles()
        } else {
          this.$message('请上传图片', 'error')
        }
      },
      // 取消
      hideDialog () {
        this.visableDialog = false
        this.$refs.uploadRef.clearFiles()
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      fileChange (file, fileList) {
        this.file = file.raw
      }
    }
  }
</script>

<style scoped>
.update-content {
  position: relative;
}

</style>
