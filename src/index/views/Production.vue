<template>
  <main class="prduction">
    <HeaderTop/>

    <div class="page_container">
      <PrduItem v-for="(item,index) in work_list" :key="index"
                :item=item />
    </div>
  </main>
</template>

<script>
  import PrduItem from '@index/components/Prod_item'
  import HeaderTop from '@index/components/header-top'

  export default {
    metaInfo () {
      return {
        title: "作品 | PAWNs'blog",
        mate: [{
          name: 'keywords',
          content: 'Pawn的博客 李昌义的博客 前端 前端学习 前端交流'
        }]
      }
    },
    components: {PrduItem, HeaderTop},
    async created () {
      let res = await this.$store.dispatch('get_work_api')
      this.work_list = res
    },
    data () {
      return {
        work_list: []
      }
    },
    computed: {
      bg_url () {
        let img_url = this.$store.state.setting.data[0]
        return img_url == null ? '' : img_url.website_cover.production
      }
    }
  }
</script>

<style lang="scss">
.prduction {
  .page_container {
    overflow: hidden;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
    width: 1300px;
    position: relative;
    min-height: 300px;
  }
}
</style>
