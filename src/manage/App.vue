<template>
  <div id="app">
    <!-- <object type="application/x-shockwave-flash" style="outline:none;" data="http://cdn.abowman.com/widgets/fish/fish.swf?up_fishColor4=F45540&up_fishColor9=F45540&up_fishColor6=E7FA11&up_fishColor5=F45540&up_fishColor10=F440E8&up_foodColor=FCB347&up_fishColor3=1F0906&up_fishColor1=5BF440&up_backgroundImage=http://&up_fishColor2=F5B2A9&up_fishName=Fish&up_numFish=10&up_fishColor7=F45540&up_fishColor8=F45540&up_backgroundColor=f6f8fa&" width="100%" height="100%"><param name="movie" value="http://cdn.abowman.com/widgets/fish/fish.swf?up_fishColor4=F45540&up_fishColor9=F45540&up_fishColor6=E7FA11&up_fishColor5=F45540&up_fishColor10=F440E8&up_foodColor=FCB347&up_fishColor3=1F0906&up_fishColor1=5BF440&up_backgroundImage=http://&up_fishColor2=F5B2A9&up_fishName=Fish&up_numFish=10&up_fishColor7=F45540&up_fishColor8=F45540&up_backgroundColor=FFFFFF&"></param><param name="AllowScriptAccess" value="always"></param><param name="wmode" value="opaque"></param><param name="scale" value="noscale"><param name="salign" value="tl"></object>    <List/> -->

    <router-view/>
  </div>
</template>

<script>
  import api from '@/api/axios.js'
  export default {
    name: 'App',
    created () {
      this.checkLogin()
    },
    methods: {
      // 判断是否登录
    //   加注释
    // 再加一层
      checkLogin () {
        api.isLogin().then(res => {
        }).catch(res => {
          this.$store.dispatch('UserLogout')
          this.$router.push({path: '/login'})
        })
      }
    }
  }
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  min-width: 1300px;
  color: #2c3e50;
  /* position: relative; */
}
</style>
