<template>
  <div class="comment_box" id="commentBox">
    <p class="comment_title">留言</p>
    <div id="comment-talk">
      <div >
        <VueEmoji @input="onInput" :value="myText" />
        <div class="clearfix">
          <el-button size="small" @click="submitComment">留言</el-button>
        </div>
      </div>
      <div class="block">
        <el-timeline>
          <el-timeline-item
            hide-timestamp
            v-for="(item,index,key) in list"
            :key="key">
            <el-card>
              <div>
                <span class="comment-name">{{ item.nickName }}</span>
                <span class="comment-time"><i class="el-icon-time"/> {{ item.creatTime }}</span>
              </div>
              <p class="comment-content">{{ item.content }}</p>
              <span class="reply" @click="reply(item,'first')">回复</span><el-badge :value="item.reply.length" class="item" type="warning"/>
              <div class="card">
                <el-card shadow="never" :body-style="cardStyle" v-if="item.reply.length >0">
                  <div v-for="(itemReply,index,key) in item.reply" :key="key" class="reply-item">
                    <div>
                      <span class="comment-name">{{ itemReply.nickName }}</span>
                      <span v-if="itemReply.replyType=='second'">回复&nbsp;</span>
                      <span class="comment-name">{{ itemReply.replyName }}</span>
                      <span class="comment-time"><i class="el-icon-time"/> {{ itemReply.creatTime }}</span>
                    </div>
                    <p class="comment-content">{{ itemReply.content }}</p>
                    <span class="reply reply-second" @click="reply(itemReply,'second')">回复</span>
                  </div>
                </el-card>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
  import VueEmoji from 'emoji-vue'
  import moment from 'moment'

  export default {
    components: {
      VueEmoji
    },
    props: {
      artivle: {
        type: Object,
        default: null
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        cardStyle: {
          background: '#f9f9f9',
          margin: '0 20px',
          border: 'none'

        },
        myText: '',
        myReply: '',
        list: [{pid: 0,
                replyId: 0,
                content: '更新 Github',
                creatTime: '2018-05-13 20:46',
                nickName: 'manager',
                reply: [
                  {pid: 0,
                   replyId: 1,
                   replyType: 'first',
                   content: 'good',
                   replyName: '',
                   creatTime: '2018-05-13 20:49',
                   nickName: 'super',
                   reply: []},
                  {pid: 0,
                   replyId: 1,
                   replyType: 'second',
                   content: 'test success',
                   replyName: 'super',
                   creatTime: '2018-05-13 20:51',
                   nickName: 'manager',
                   reply: []}
                ]},
               { pid: 0, replyId: 0, content: '升级', creatTime: '2018-05-13 20:52', nickName: 'manager', reply: [] }
        ]
      }
    },
    mounted () {
      if (!this.show) {
        this.list = []
      }
    },
    methods: {
      onInput (event) {
        this.myReply = event.data
      },
      submitComment () {
        this.list.push({pid: 0, replyId: 0, content: this.myReply, creatTime: moment().format('YYYY-MM-DD HH:mm:ss'), nickName: window.localStorage.getItem('nickName'), reply: []})
        console.log(this.list)
      }
    }

  }
</script>

<style lang="scss">
.comment_box {
  position: relative;
  z-index: 999;
  background-color: #fff;
  .comment_title {
    font-size: 22px;
    margin: 40px 0 10px;
    border-bottom: 1px solid #ccc;
    padding: 5px 0;
    color: #462c2c;
  }
  .comment-name {
    color: #61b400;
    font-size: 18px;
  }
  .comment-time {
    color: #888;
    margin-left: 8px;
    font-size: 12px;
  }
  .comment-content {
    margin: 10px 6px;
  }
  .emoji-picker-container {
    width: 100% !important;
  }
  .emoji-vue-textarea {
    resize: none;
    overflow-y: none;
    outline: none;
    font-size: 14px;
    padding: 10px;
    border: none;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100% !important;
    height: 100px !important;
    margin-top: 10px;
    -webkit-box-shadow: 0 0 8px rgba(0,0,0,.4);
    box-shadow: 0 0 8px rgba(0,0,0,.4);
    margin-bottom: 10px;
    }
    .block {
      margin-top: 20px;
    }
    button {
      float: right;
    }
    .clearfix {
      clear: both;
      overflow: hidden;
    }
    .reply {
      cursor: pointer;
      margin-left: 6px;
      color: #4183c4;
    }
    .reply:hover {
      color: #BE4F8D;
    }
    .card {
      margin-top: 8px;
      .el-card {
        border: none;
      }
    }
    .reply-second {
      font-size: 13px;
    }
    .reply-item {
      border-bottom: 1px dashed #ddd;
      padding-bottom: 6px;
    }
}
</style>
