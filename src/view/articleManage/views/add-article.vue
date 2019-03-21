<template>
  <div>
    <div class="search">
      <add-article-input/>
    </div>
    <mavon-editor
      v-model="value"
      placeholder="ヾﾉ≧∀≦)o来啊，快活啊!"
      @change="dataChange"
      @save="saveData"
      :code-style="codeStyle"
      :box-shadow="false"/>
    <dialog-view ref="dialogViewRef"/>
  </div>
</template>

<script>
  import DialogView from '@view/articleManage/components/dialog-view.vue'
  import AddArticleInput from '@/components/add-article-input.vue'

  export default {
    components: { DialogView, AddArticleInput },
    data () {
      return {
        codeStyle: 'atom-one-dark',
        value: '',
        htmlValue: ''

      }
    },
    created () {

    },

    methods: {
      dataChange (markdownValue, htmlValue) {
        this.htmlValue = htmlValue
        console.log(htmlValue)
      },
      saveData (markdownValue, htmlValue) {

      },
      open () {
        this.$refs.dialogViewRef.openDialog(this.htmlValue)
      }
    }
  }
</script>
<style scoped>
.markdown-body {
  min-height: 540px;
}

</style>
