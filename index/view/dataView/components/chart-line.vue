<template>
  <div>
    <div class="chartbox" :id="randomId" v-if="isOptionAbnormal" />
    <div v-else>
      暂无数据
    </div>
  </div>
</template>

<script>
  import echarts from '@/assets/js/echarts.js'
  import isValidOption from '@/util/checkOption.js'

  export default {
    components: { },
    props: {
      option: {
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        randomId: 'echarts-dom' + Date.now() + Math.random(),
        isOptionAbnormal: true

      }
    },
    mounted () {
      this.mychart = echarts.init(document.getElementById(this.randomId))
      this.checkAndSetOption()
      window.onresize = () => {
        this.mychart.resize()
      }
    },
    methods: {
      // 检测option合不合法
      checkAndSetOption () {
        let option = this.option
        if (isValidOption(option)) {
          this.mychart.setOption(option)
          this.isOptionAbnormal = true
        } else {
          this.isOptionAbnormal = false
        }
      },
      init () {

      }
    }
  }
</script>
<style scoped>
.chartbox { height: 300px; }
</style>
