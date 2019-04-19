// import echarts from 'echarts/lib/echarts'

// 没有babel-plugin-equire插件的话就这样导入

// import 'echarts/lib/chart/bar'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/chart/pie'
// import 'echarts/lib/component/legend'
// import 'echarts/lib/component/title'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/dataZoom'
// import 'echarts/lib/component/markLine'
// import 'echarts/lib/component/markPoint'

const echarts = equire([
  'bar',
  'line',
  'pie',
  'legend',
  'title',
  'tooltip',
  'dataZoom',
  'markLine',
  'markPoint',
  'toolbox'
])

export default echarts
