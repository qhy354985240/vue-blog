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
    async created () {
      // = await this.$store.dispatch('get_archives_api')
      let articleList = [{article_create_time: '2019年1月3月',
                          article_state: 'true',
                          article_title: '我们都是',
                          article_update_time: '2019 8.22'}]
      articleList.map(item => {
        this.article_list.push({
          _id: item._id,
          article_create_time: item.article_create_time,
          article_state: item.article_state,
          article_title: item.article_title,
          article_update_time: item.article_update_time
        })
      })
    },
    data () {
      return {
        article_list: []
      }
    },
    computed: {
      list () {
        let json = {}
        this.article_list.forEach(item => {
          let time = item.article_create_time.substring(0, 7)
          if (json[time] == null) {
            json[time] = []
          }
          json[time].push(item)
        })
        return json
      },
      meta_description () {
        let str = ''
        this.article_list.forEach(item => {
          str += `${item.article_title} `
        })
        return str
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
