<template>
  <main class="archives">
    <HeaderTop/>

    <div class="page_container">
      <ArchItem v-for="(item,key,index) in list"
                :key=index
                :title=key
                :list=item />
    </div>
  </main>
</template>

<script>
  import ArchItem from '@index/components/Arch_item'
  import HeaderTop from '@index/components/header-top'

  export default {

    components: {ArchItem, HeaderTop},
    data () {
      return {
        article_list: [],
        paginations: {
          pageSize: 100,
          pageCurrent: 1,
          total: 0
        },
        filter: {
          articleOwner: '',
          articleTitle: '',
          articleGrade: '',
          articleType: []
        }
      }
    },
    computed: {
      list () {
        let json = {}
        this.article_list.forEach(item => {
          let time = item.createTime.substring(0, 7)
          if (json[time] == null) {
            json[time] = []
          }
          json[time].push(item)
        })
        console.log(json)
        return json
      }
    },
    created () {
      this.getArticle()
      console.log('xx')
    },
    methods: {
      getArticle () {
        this.$http.api_get_article_list({
          pageSize: this.paginations.pageSize,
          pageCurrent: this.paginations.pageCurrent,
          filter: this.filter
        }).then(res => {
          if (res.success) {
            this.article_list = res.result
          }
        })
      }
    }
  }
</script>

<style lang="scss">
.archives {
  .page_container {
    padding: 0 10px;
    box-sizing: border-box;
  }
}

</style>
