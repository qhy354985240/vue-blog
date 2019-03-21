<template>
  <Dialog
    :title="title"
    :visible="visableDialog"
    :confirm="confirmFun"
    :cancel="hideDialog">
    <div v-html="content" class="dialog-view">
      {{ content }}
    </div>
  </Dialog>
</template>

<script>
  import Dialog from '@/components/dialog.vue'

  export default {
    components: { Dialog },
    data () {
      return {
        title: '预览',
        visableDialog: false,
        content: ''
      }
    },
    created () {

    },

    methods: {
      openDialog (item) {
        this.visableDialog = true
        this.content = item
      },
      confirmFun (content) {
        console.log(content)
      },
      hideDialog () {
        this.visableDialog = false
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
