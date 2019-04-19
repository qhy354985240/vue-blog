<template>
  <Dialog
    :title="title"
    :visible="visableDialog"
    :confirm="confirmFun"
    :showFooter=false
    width="80%"
    :cancel="hideDialog">
    <div class="dialog-view">
      <add-article-input @submitData="submit" :add=true btn="保存" ref="addTicleRefs" :dialog-data="inputData" />
      <mavon-editor
        v-model="value"
        placeholder="ヾﾉ≧∀≦)o来啊，快活啊!"
        @change="dataChange"
        :code-style="codeStyle"
        :box-shadow="false"/>
    </div>
  </Dialog>
</template>

<script>
  import Dialog from '@/components/dialog.vue'
  import AddArticleInput from '@/components/add-article-input.vue'
  import api from '@/api/axios.js'

  export default {
    components: { Dialog, AddArticleInput },
    data () {
      return {
        title: '编辑',
        codeStyle: 'atom-one-dark',
        visableDialog: false,
        value: '',
        formData: null,
        inputData: {
          articleTitle: '',
          articleGrade: '',
          articleType: []
        }
      }
    },
    created () {

    },

    methods: {
      openDialog (item) {
        console.log(item)
        this.visableDialog = true
        this.value = item.articleValue
        this.inputData.articleTitle = item.articleTitle
        this.inputData.articleGrade = item.articleGrade
        this.inputData.articleType = item.articleType
        this.htmlValue = item.articleContent
      },
      dataChange (markdownValue, htmlValue) {
        this.htmlValue = htmlValue
      },
      confirmFun (content) {
        console.log(content)
      },
      hideDialog () {
        this.visableDialog = false
      },
      submit (data) {
        if (this.htmlValue === '') {
          this.$message.error('内容不能为空')
        } else {
          this.formData = data
          this.formData['articleContent'] = this.htmlValue
          this.formData['articleAuthor'] = this.userName
          this.formData['articleOwner'] = this.nickName
          this.formData['articleValue'] = this.value
          api.submitArticle(this.formData).then(res => {
            if (res.success) {
              this.$message.success('发布成功')
              this.$refs.addTicleRef.pageFilter.articleTitle = ''
              this.$refs.addTicleRef.pageFilter.articleGrade = ''
              this.$refs.addTicleRef.pageFilter.articleType = []
              this.htmlValue = ''
              this.value = ''
              window.localStorage.removeItem('articleData')
            } else {
              this.$message.success('发布失败')
            }
          })
        }
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
