<template>
  <main class="home">
    <HeaderTop/>
    <div class="page_container">
      <div class="box">
        <p class="search_some">{{ search_some }}</p>
        <div class="article_list">
          <ArticleItem v-for="(item,index) in article_list" :key="index"
                       :article=item
                       @search_tag="search_tag"/>
          <p class="msg" v-show="article_list.length==0">没有找到文章～～</p>
        </div>
      </div>
      <Aside class="page_aside"
             @search_keyword=search_keyword
             @search_tag=search_tag />
    </div>
  </main>
</template>

<script>
  import Aside from '@index/components/Aside'
  import ArticleItem from '@index/components/Article_item'
  import HeaderTop from '@index/components/header-top'

  export default {
    name: 'Home',
    components: {Aside, ArticleItem, HeaderTop},
    created () {
      if (this.$route.query.reset === '1') {
        this.$router.push('/')
      }
      this.$store.dispatch('get_tag_api')
      this.get_article()
    },

    data () {
      return {
        pagination: {
          current_page: 1,
          page_size: 6,
          keyword: '',
          tag: '',
          total: ''
        },
        article_list: []
      }
    },
    methods: {
      async get_article () {
        let res = await this.$http.api_get_article_list(this.pagination)
        let {code, data = []} = res.data
        if (code === 200) {
          this.pagination.total = data.pagination.total
          this.article_list = data.list
        }
      },
      search_keyword (val) {
        this.pagination.keyword = val
        this.pagination.current_page = 1
        this.get_article()
      },
      search_tag (val) {
        this.pagination.tag = val
        this.pagination.current_page = 1
        this.get_article()
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.query.reset === '1') {
          this.$router.push('/')
          this.pagination.keyword = ''
          this.pagination.tag = ''
          this.get_article()
        }
      }
    },
    computed: {
      search_some () {
        let text = '全部文章'
        if (this.pagination.tag !== '' || this.pagination.keyword !== '') {
          text = '搜索 =>'
        }
        if (this.pagination.tag !== '') {
          let item = this.$store.state.tag.data.find(item => {
            return item._id == this.pagination.tag
          })
          text += ` 标签: ${item.tags_name}`
        }
        if (this.pagination.keyword != '') {
          text += ` 关键字: ${this.pagination.keyword}`
        }
        return text
      },
      bg_url () {
        let img_url = this.$store.state.setting.data[0]
        return img_url == null ? '' : img_url.website_cover.home
      }
    }
  }
</script>

<style scope>
  .home {
    font-size: 0.4rem;
  }
    .page_container {
      display: flex;
      box-sizing: border-box;
    }
    .box{
      flex: 1;
    }
    .article_list {
      margin-bottom: 20px;
      overflow: hidden;
    }
    .page_aside {
      width: 300px;
    }
    .search_some {
    font-size: 22px;
    font-weight: 700;
    margin: 20px 0 10px;
    }
    .msg {
      padding-left: 20px;
      margin-top: 30px;
      font-size: 1rem;
    }

</style>
