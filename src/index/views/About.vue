<template>
  <main class="about">
    <div class="bg_img" :style='"background-image:url("+bg_url+");"'>
      <div class="box">
        <p class="bg_img_title">About Me</p>
        <hr>
        <p class="bg_img_dest">像一名士卒，既然不能退缩，那就大步向前！</p>
      </div>
    </div>
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
    components: {CommentBox},
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
    font-size: 16px;
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
    h1 {
      position: relative;
      color: #242f35;
      padding: 5px 0 5px 16px;
      margin: 10px 0;
      font-weight: 400;
      height: 20px;
      line-height: 20px;
      font-size: 18px;
      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 4px;
        height: 100%;
        top: 0;
        left: 0;
        z-index: -1;
        background: #1a1818;
        background: linear-gradient(to bottom,#1a1818 35%,#353030 100%) left center no-repeat;
        background-size: 100%;
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
