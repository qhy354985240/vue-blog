<template>
  <main class="article_box">
    <div class="bg_img" :style='"background-image:url("+article.articleUrl+");"'>
      <div class="box">
        <h1>{{ article.articleTitle }}</h1>
        <hr>
        <p class="bg_img_dest">{{ article.articleOwner }}</p>
      </div>
    </div>
    <div class="page_container">
      <div class="markdown-body" id="articleContent" v-html="articleContent" v-click/>
      <div class="toc" id="toc" v-scroll v-jump v-close_toc_box>
        <div class="wrap">
          <p class="toc_title">目录</p>
          <ul v-html="article_toc"/>
        </div>
      </div>
      <CommentBox
        :show=false
        :article="article"/>
    </div>
    <div id="ok"/>
    <div class="imgShow" v-close>
      <img src="" alt="原图加载失败！">
    </div>
  </main>
</template>

<script>
  import markdown from '@index/plugins/marked.js'
  import CommentBox from '@index/components/Comment_box'
  import {throttle, offsetTop, slowRoll} from '@index/plugins/utils'

  export default {
    components: {CommentBox},
    data () {
      return {
        article: null
      }
    },
    created () {
      this.article = JSON.parse(this.$route.query.article)
    },
    computed: {
      articleContent () {
        return markdown(this.article.articleValue, false, true).html
      },
      article_toc () {
        let tochtml = ''
        let tocArr = markdown(this.article.articleValue, false, true).toc
        if (tocArr == null) return
        tocArr.forEach(item => {
          tochtml += `<li data-id=${item.anchor}><i class="iconfont icon-line"></i>`
          for (let i = 0; i < item.level; i++) {
            tochtml += '<i class="iconfont icon-shuxian-copy-copy"></i>'
          }
          tochtml += ' ' + item.text + '</li>'
        })
        return tochtml
      },
      meta_keywords () {
        let str = ''
        let tag = this.$store.state.article.current_display.article_tags
        if (tag != null) {
          for (let i = 0, len = tag.length; i < len; i++) {
            str += `${tag[i].tags_name} ${tag[i].tags_desc}`
          }
        }
        return str
      }
    },
    directives: {
      click: {
        inserted (el) {
          el.addEventListener('click', function () {
            let e = e || event
            let obj = e.target
            if (obj.tagName === 'IMG') {
              let imgShow = document.getElementsByClassName('imgShow')[0]
              let img = imgShow.getElementsByTagName('img')[0]
              img.src = obj.getAttribute('data-src')
              imgShow.style.display = 'block'
            }
          })
        }
      },
      close: {
        inserted (el) {
          el.onclick = function () {
            this.style.display = 'none'
          }
        }
      },
      scroll: {
        inserted (el) {
          let page_container = document.getElementsByClassName('page_container')[0]
          window.addEventListener('scroll', throttle(function () {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
            let right_val = document.defaultView.getComputedStyle(page_container, null)['margin-right']
            if (scrollTop >= 330) {
              el.classList.add('toc_fixed')
              el.style.right = right_val
            } else {
              el.classList.remove('toc_fixed')
              el.style.right = 0
            }
          }, 200))
        }
      },
      jump: {
        inserted (el) {
          el.onclick = function (e) {
            let obj = e.target
            if (obj.tagName !== 'LI') return
            let name = obj.getAttribute('data-id').replace('#', '')
            let tem = document.getElementById(name)
            let top = offsetTop(tem)
            slowRoll(top - 200)
          }
        }
      },
      close_toc_box: {
        inserted (el) {
          el.addEventListener('click', () => {
            let toc = document.getElementById('toc')
            toc.classList.remove('toc_min')
          })
        }
      }
    }
  }
</script>

<style src="../assets/css/markdown.css"></style>

<style lang="scss">
.article_box {
  .page_container {
    // padding: 0 24px;
    box-sizing: border-box;
    position: relative;
    .markdown-body {
      box-sizing: border-box;
      overflow: hidden;
      margin-right: 320px;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .toc {
      position: absolute;
      top: 0px;
      right: 0;
      width: 290px;
      border: 1px dotted #d8e5f3;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      .toc_title {
        font-size: 18px;
        border-bottom: 1px dotted #d8e5f3;
        text-align:center;
        padding: 5px 0;
      }
      ul {
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        list-style: none;
      }
      ul li {
        font-size: 16px;
        cursor: pointer;
        color: #666;
        padding: 12px 0;
        transition: color .6s;
        &:hover {
          color: #242f35;
        }
      }
    }
    .toc_fixed {
      position: fixed;
      top: 60px;
    }
    .toc_min {
      background-color: rgba(0,0,0,0.6);
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      right: 0;
      z-index: 10001;
      .wrap {
        background: #f4f7f6;
        width: 300px;
        height: 100%;
        overflow-y: auto;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
  .imgShow {
    display: none;
    width: 100%;
    height: 100%;
    overflow: auto;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.6);
    z-index: 10001;
    img {
      // width: 100%;
      display: block;
      margin: 50px auto;
      cursor: zoom-out;
    }
  }
  @media screen and (max-width: 950px){
    .toc {
      display: none;
    }
    .markdown-body {
      padding-right: 0 !important;
    }
    .page_container {
      padding: 0 24px;
    }
    .toc_min {
      display: block;
    }
  }
}
.box h1 {
      font-size: 42px;
    font-weight: 700;
}
</style>
