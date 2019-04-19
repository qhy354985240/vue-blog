<template>
  <div>
    <el-row >
      <el-col :span="8" class="card charts-card-top">
        <chart-line :option="optionOne"/>
      </el-col>
      <el-col :span="15" :offset="1" class="card charts-card-top">
        <chart-line :option="optionTwo"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="card charts-card-bottom">
        <chart-line :option="optionThree"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ChartLine from '@view/dataView/components/chart-line.vue'

  export default {
    components: { ChartLine },
    data () {
      return {
        breadList: [{
          path: '/dataview', name: '概览'
        }],
        optionOne: {
          title: {
            text: '文章总量',
            subtext: 'Totoro',
            x: 'center',
            textStyle: {
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'item',
            confine: true,
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['体育', '生活', '娱乐', '技术', '冷知识']
          },
          series: [
            {
              name: '类别',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 12, name: '体育'},
                {value: 4, name: '生活'},
                {value: 3, name: '娱乐'},
                {value: 18, name: '技术'},
                {value: 1, name: '冷知识'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        },
        optionTwo: {
          title: {
            text: '文章发布',
            subtext: 'Totoro',
            textStyle: {
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'axis',
            confine: true,
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          legend: {
            data: ['体育', '生活', '娱乐', '技术', '冷知识']
          },
          toolbox: {
            feature: {
              magicType: {
                type: ['stack', 'tiled']
              },
              restore: {show: true},
              dataView: {},
              saveAsImage: {
                pixelRatio: 2
              }
            }
          },
          xAxis: {
            data: ['3.23', '3.24', '3.25', '3.26', '3.27', '3.28', '3.29'],
            axisTick: {
              alignWithLabel: true
            }
          },
          yAxis: {},
          dataZoom: [ { type: 'inside' } ],
          series: [{
                     name: '体育',
                     type: 'bar',
                     stack: '总量',
                     label: {
                       normal: {
                         show: true,
                         position: 'insideRight'
                       }
                     },
                     data: [11, 12, 15, 22, 33, 12, 44],
                     animationDelay: function (idx) {
                       return idx * 10 + 10
                     }
                   },
                   {
                     name: '娱乐',
                     type: 'bar',
                     stack: '总量',
                     label: {
                       normal: {
                         show: true,
                         position: 'insideRight'
                       }
                     },
                     data: [20, 33, 44, 22, 66, 12, 22],
                     animationDelay: function (idx) {
                       return idx * 10 + 100
                     }
                   },
                   {
                     name: '生活',
                     type: 'bar',
                     stack: '总量',
                     label: {
                       normal: {
                         show: true,
                         position: 'insideRight'
                       }
                     },
                     data: [20, 11, 51, 13, 5, 12, 42],
                     animationDelay: function (idx) {
                       return idx * 10 + 100
                     }
                   },
                   {
                     name: '技术',
                     type: 'bar',
                     stack: '总量',
                     label: {
                       normal: {
                         show: true,
                         position: 'insideRight'
                       }
                     },
                     data: [20, 33, 13, 3, 7, 11, 44],
                     animationDelay: function (idx) {
                       return idx * 10 + 100
                   }},
                   {
                     name: '冷知识',
                     type: 'bar',
                     stack: '总量',
                     label: {
                       normal: {
                         show: true,
                         position: 'insideRight'
                       }
                     },
                     data: [20, 33, 13, 3, 7, 12, 44],
                     animationDelay: function (idx) {
                       return idx * 10 + 100
          }} ],
          animationEasing: 'elasticOut',
          animationDelayUpdate: function (idx) {
            return idx * 5
          }
        },
        optionThree: {
          title: {
            text: '用户访问',
            subtext: 'Totoro',
            textStyle: {
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['访问量']
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['3.23', '3.24', '3.25', '3.26', '3.27', '3.28', '3.29']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} 人'
            }
          },
          series: [
            {
              name: '访问人数',
              type: 'line',
              data: [11, 11, 15, 13, 12, 13, 10],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }
          ]
        }
      }
    },
    created () {
      this.$store.commit('breadList', this.breadList)
    },

    methods: {

    }
  }
</script>
