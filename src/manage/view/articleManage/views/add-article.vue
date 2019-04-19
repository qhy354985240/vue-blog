<template>
  <div>
    <div class="search">
      <add-article-input @submitData="submit" :add=true ref="addTicleRef" />
    </div>
    <mavon-editor
      v-model="value"
      placeholder="ヾﾉ≧∀≦)o来啊，快活啊!"
      @change="dataChange"
      @save="saveData"
      :code-style="codeStyle"
      :box-shadow="false"/>
  </div>
</template>

<script>
  import AddArticleInput from '@/components/add-article-input.vue'
  import api from '@/api/axios'

  export default {
    components: { AddArticleInput },
    data () {
      return {
        codeStyle: 'atom-one-dark',
        value: '',
        htmlValue: '',
        breadList: [{ path: '/articlemanage/articlelist', name: '文章管理' },
                    { path: '', name: '添加文章' }],
        formData: null,
        userName: this.$store.state.userName,
        nickName: this.$store.state.nickName
      }
    },
    created () {
      this.$store.commit('breadList', this.breadList)
      this.value = window.localStorage.getItem('articleData') || ''
    },

    methods: {
      dataChange (markdownValue, htmlValue) {
        this.htmlValue = htmlValue
      },
      saveData (markdownValue, htmlValue) {
        window.localStorage.setItem('articleData', this.value)
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
.markdown-body {
  min-height: 540px;
}

</style>
