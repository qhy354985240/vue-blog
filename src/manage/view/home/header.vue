<template>
  <nav>
    <div class="header-icon">
      <atom-spinner
        :animation-duration="1000"
        :size="40"
        :color="'#333'"
      />
    </div>
    <ul class="header-menu">
      <li>
        <a href="http://localhost:8081">博客首页</a>
      </li>

    </ul>
    <div class="self-account">
      <div class="self-face">
        <img src="@/assets/img/bgone.jpg" class="face" v-if="imgUrl==''">
        <img :src="imgUrl" class="face" v-else>
      </div>
      <div class="self-panel">
        <div class="panel-userinfo">
          <b>拉钩不上吊</b>
        </div>
        <div class="panel-operate">
          <el-col :span="12">
            <i class="icon-qhy--shangchuantouxiang"/>
            <span @click="changeImg">更换头像</span>
          </el-col>
        </div>
        <div class="panel-bottom">
          <el-button type="text" class="operate-button" @click="logout">退出</el-button>
        </div>
      </div>
    </div>
    <update-img ref="updateRef" @enter="updateImg" />

  </nav>
</template>

<script>
  import UpdateImg from '@/components/update-img.vue'
  import api from '@/api/axios.js'
  import {AtomSpinner} from 'epic-spinners'

  export default {
    components: { UpdateImg, AtomSpinner },
    data () {
      return {
        defaultActive: '',
        imgUrl: window.localStorage.getItem('userPath')
      }
    },
    created () {

    },
    methods: {
      logout () {
        // 清除token
        this.$store.dispatch('UserLogout')
        if (!this.$store.state.token) {
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '登出成功'
          })
        } else {
          this.$message({
            type: 'info',
            message: '登出失败'
          })
        }
      },
      changeImg () {
        this.$refs.updateRef.openDialog()
      },
      updateImg (val) {
        let formData = new FormData()
        formData.append('file', val)
        api.upLoad(formData).then(res => {
          if (res.success) {
            this.imgUrl = res.fullPath
            window.localStorage.setItem('userPath', this.imgUrl)
            this.updateUser()
            this.$refs.updateRef.hideDialog()
          }
        })
      },
      updateUser () {
        api.updateUser({
          userName: this.$store.state.userName,
          imgUrl: this.imgUrl
        }).then(res => {
          if (res.success) {
            this.$message.success('头像更换成功')
          }
        }).catch(res => {
          this.$message.error(res.message)
        })
      }
    }
  }
</script>
<style scoped>
.header-menu * {
  transition:all .5s .1s;
  -moz-transition:all .5s .1s;
  -ms-transition:all .5s .1s;
  -o-transition:all .5s .1s;
  -webkit-transition:all .5s .1s;
}
a, a:hover {
  color:#FFF;
  text-decoration:none;
}
nav {
  /* background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%); */
  background-image: linear-gradient(to top, #a7a6cb 0%, #8989ba 52%, #8989ba 100%);
  height: 60px;
  border-radius: 5px;

}
nav ul {
  /* display:table; */
  margin:0 auto;
  display: inline-block;
}
nav ul li {
  float:left;
  position:relative;
  list-style:none;
  line-height:16px;
  font-size:16px;
  font-weight:bold;
}
nav ul li:first-of-type {
  border-left: none;
}
nav ul li:last-of-type {
  border-right:none;
}
 nav ul li a {
  display:block;
  padding:16px 15px;
}
 nav ul li>a {
  display:block;
  padding:22px 15px;
}
nav>ul>li>a:before {
  content:"\00BB \0020";
  display:block;
  float:left;
  font-size:20px;
  width:20px;
  height:14px;
  text-align:center;
  line-height:14px;
  transform:rotate(90deg);
  -moz-transform:rotate(90deg);
  -ms-transform:rotate(90deg);
  -o-transform:rotate(90deg);
  -webkit-transform:rotate(90deg);
}
nav>ul>li:first-of-type>a {
  border-radius:5px 0 0 0;
}
nav>ul>li:last-of-type>a {
  border-radius:0 5px 0 0;
}
nav>ul>li:hover>a:before {
  margin:0 3px 0 -3px;
  -moz-transform:rotate(-90deg);
  -ms-transform:rotate(-90deg);
  -o-transform:rotate(-90deg);
  -webkit-transform:rotate(-90deg);
}
 nav>ul>li:hover>a {
  background-color:#8ECB8D;
  display:block;
  padding:22px 15px;
}
nav ul li ul {
  display:block;
  position:absolute;
  border:none;
  left:0;
  z-index: 999;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
  top:200%;
  opacity:0;
  width:150%;
  border-radius:0 0 5px 5px;
  background-color:#8ECB8D;
}
nav ul li:last-of-type ul {
  left:auto;
  right:0;
}
nav ul li ul li {
  height:0;
  padding:0;
  font-size:12px;
  float:none;
  border:none;
  overflow:hidden;

}
 nav ul li ul li a {
  text-indent:-50%;
  opacity:0;
}
nav ul li:hover ul {
  opacity:1;
  top:60px;
  padding:5px 0;

}
 nav ul li:hover ul li {
  height:40px;
}
nav ul li:hover ul li a {
  text-indent: 0;
  /* opacity:1; */
  opacity: 1;
}
 nav ul li:hover ul li:hover a {
   background-color: #8ECB8D;
}
 p {
  position:fixed;
  right:0;
  bottom:0;
  font-size:11px;
  color:#FFF;
  display:block;
  padding:5px;
}
.self-account {
    float: right;
    text-align: center;
    display: inline-block;
    height: 60px;
    width: 72px;
    right: 10%;
    position: relative;
    /* background-color: hsla(0,0%,100%,0); */
    /* background-color: red; */
}
.self-face {
    position: absolute;
    z-index: 20;
    width: 42px;
    height: 42px;
    left: 0;
    top: 9px;
    transition: .3s;
    cursor: pointer;
}
.face {
    border: 0 solid #fff;
    width: 100%;
    height: 100%;
    z-index: 999;
    border-radius: 50%;
    vertical-align: middle;
}

.self-account:hover .face {
    border: 2px solid #fff;

}
.self-account:hover .self-face {
  top:29px;
  left: -14px;
  height: 72px;
  width: 72px;
}
.self-account:hover .self-panel {
  visibility: visible;
  top: 60px;
}
.self-panel {
  visibility: hidden;
  position: absolute;
  z-index: 9;
  left: 50%;
  margin-left: -140px;
  width: 260px;
  padding: 50px 0 0;
  top: 76px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,.16);
  border-radius: 0 0 4px 4px;
  line-height: normal;
  transition: top .5s !important;
}
.panel-userinfo {
  font-size: 12px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e5e9ef;
  display: none;
}
.self-account:hover .panel-bottom {
  display: block;
}
.self-account:hover .panel-userinfo {
  display: block;
}
.self-account:hover .panel-operate {
  display: block;
}
.panel-operate{
  font-size: 12px;
  width: 100%;
  overflow: hidden;
  padding: 10px 0;
  display: none;
}
.panel-operate span {
  cursor: pointer;
  user-select: none;
  color: #222;
}
.panel-bottom {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: #f4f5f7;
  border-radius: 0 0 4px 4px;
  display: none;
}
.header-icon {
  display: inline-block;
  position: relative;
  bottom: 8px;
  left: 40px;
  margin-right: 60px;
  cursor: default;
}

</style>
