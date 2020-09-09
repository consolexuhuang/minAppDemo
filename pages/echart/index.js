import * as echarts from '../../component/ec-canvas/echarts';
const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#FF9F7F"],
    // tooltip: {
    //   trigger: 'axis',
    //   padding: 10,
    //   formatter: function (params) {
    //     var data = '';
    //     $.each(params, function (index, item) {
    //       data += item.name + ':' + item.value + '&nbsp; ' + '<br/>';
    //     });
    //     return params[0].indicator + '<br/>' + data;
    //   }
    // },
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      // shape: 'circle',
      indicator: [{
        name: '食品',
        max: 500
      },
      {
        name: '玩具',
        max: 500
      },
      {
        name: '服饰',
        max: 500
      },
      {
        name: '绘本',
        max: 500
      },
      {
        name: '医疗',
        max: 500
      },
      {
        name: '门票',
        max: 500
      }
      ]
    },
    series: [{
      name: '预算 vs 开销',
      type: 'radar',
      data: [{
        value: [430, 340, 500, 300, 490, 400],
        name: '预算'
      },
      // {
      //   value: [300, 430, 150, 300, 420, 250],
      //   name: '开销'
      // }
      ],
      color: "#f00",
      areaStyle: {
        type: 'default',
        opacity: 0.8, // 图表中各个图区域的透明度
        color: "#f00" // 图表中各个图区域的颜色
      }
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
  }
});

