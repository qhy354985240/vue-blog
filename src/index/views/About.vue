<template>
  <main class="about">
    <HeaderTop/>

    <div class="page_container">
      <div class="avatar">
        <img src="/static/img/avatar.jpg" alt="avatar">
      </div>
      <div class="myInfo" v-html="page_html"/>
      <CommentBox
        :direct="direct"/>
    </div>
  </main>
</template>

<script>
  import CommentBox from '@index/components/Comment_box'
  import markdown from '@index/plugins/marked'
  import HeaderTop from '@index/components/header-top'

  export default {
    metaInfo () {
      return {
        title: "关于我 | PAWNs'blog",
        mate: [{
          name: 'keywords',
          content: 'Pawn的博客 李昌义的博客 前端 前端学习 前端交流'
        }, {
          name: 'description',
          content: this.about_me_page
        }]
      }
    },
    components: {CommentBox, HeaderTop},
    async created () {
      let res = await this.$store.dispatch('get_setting_api')
      this.about_me_page = res[0].myInfo.about_me_page
    },
    data () {
      return {
        about_me_page: '',
        direct: true

      }
    },
    computed: {
      page_html () {
        return markdown(this.about_me_page, false, true).html
      },
      bg_url () {
        let imgUrl = this.$store.state.setting.data[0]
        return imgUrl == null ? '' : imgUrl.website_cover.about
      }
    }
  }
</script>

<style lang="scss">
  .about {
    .page_container {
      padding: 0 10px;
      box-sizing: border-box;
    }
    .avatar {
      text-align: center;
      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }
    }
    .myInfo p{
      font-size: 16px;
      text-indent: 2em;
      line-height: 30px;
    }
    .myInfo {
      a {
        color: red;
        &:hover {
          font-weight: bold;
        }
      }
    }
  }
</style>
