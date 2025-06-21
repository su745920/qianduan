<template>
  <div style="width:100%">
    <v-chart :options="polar" :style="'width: '+width+';height:'+height+';'"/>
  </div>
</template>
<script>
import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue
import echarts from 'echarts'

export default {
  props: {
    symbol: {
      type: String,
      default: ''
    },
    peorid: {
      type: String,
      default: '1day'
    },
    count: {
      type: Number,
      default: 7
    },
    color: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '150px'
    },
    height: {
      type: String,
      default: '50px'
    }
  },
  name: "ChartBox",
  data() {

    return {
      books: ["book0", "book1"],
      msg: 'this is BookList',
      polar: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          splitLine: false,
          show: false,
        },
        yAxis: {
          type: 'value',
          splitLine: false,
          show: false
        },
        series: [{
          data: [0, 0, 0, 0, 0, 0, 0],
          type: 'line',
          symbol: "none",
          smooth: true,
          areaStyle: {
            normal: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [{
                  offset: 0,
                  color: this.color == 'up' ? "#25A750" : '#ca3f64' // 0% 处的颜色
                }, {
                  offset: 0.7,
                  color: this.color == 'up' ? "rgba(53,182,90,.0)" : 'rgba(255,73,74,0)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            }
          },
          itemStyle: {
            normal: {
              color: this.color == 'up' ? "#25A750" : "#ca3f64",//折线点的颜色
              lineStyle: {
                color: this.color == 'up' ? "#25A750" : "#ca3f64",//折线的颜色
                width: 1
              }
            }
          }
        }]
      }

    };
  },
  components: {
    'v-chart': ECharts
  },
  methods: {},
  watch: {
    color(val) {
      this.polar.series[0].itemStyle.normal.color = val == 'up' ? '#25A750' : '#ca3f64';
      this.polar.series[0].itemStyle.normal.lineStyle.color = val == 'up' ? '#25A750' : '#ca3f64';

      this.polar.series[0].areaStyle.normal.color.colorStops[0].color = this.color == 'up' ? "rgba(53,182,90,.9)" : 'rgba(255,73,74,.9)'
      this.polar.series[0].areaStyle.normal.color.colorStops[1].color = this.color == 'up' ? "rgba(53,182,90,.0)" : 'rgba(255,73,74,0)'
    }
  },
  mounted() {

    let that = this;
    let now = parseInt((new Date()).valueOf() / 1000);
    let start = now - (3600 * 24 * 7);
    let symbolStr=this.symbol;
    symbolStr=symbolStr.toLowerCase();
    let url="https://api.coinonebtc.xyz/market/binance/history/kline?limit=10&period=1D&coin="+symbolStr+"usdt"
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",  //指定服务器返回的数据类型
      //jsonpCallback: "showData",  //指定回调函数名称
      success: function (response) {
        let dataList = response.data;
        dataList=JSON.parse(dataList);

        dataList = dataList.sort((a, b) => a[0] - b[0]);

        if (dataList && dataList.length > 0) {
          dataList.forEach((item, i) => {
            let time = item[0];
            item.period="1min";
            item.time = parseInt(time);
            item.open = Number(item[1])
            item.close = Number(item[4])
            item.high = Number(item[2])
            item.low = Number(item[3])
            item.volume = Number(item[5])
            item.amount = Number(item[5])
          });


          //
          let invoke = (dataList.reverse().slice(0, this.count)).reverse();
          let data = [];
          let data1 = [];
          invoke.forEach(x => {
            data.push(x.id);
            data1.push(x.close);
          });
          let min = Math.min.apply(null, data1);

          for (let i = 0; i < data1.length; i++) {
            data1[i] = data1[i] - min;
          }
          that.polar.xAxis.data = data;
          that.polar.series[0].data = data1;


        }

      }

    });


    // this.$http.get('/api/currency/new_timeshar_v2', {
    //   params: {
    //     'symbol': this.symbol + '/USDT',
    //     from: start,
    //     to: parseInt((new Date()).valueOf() / 1000),
    //     period: this.peorid
    //   }
    // }).then(res => {
    //   let rsp = res.data;
    //   let invoke = (rsp.data.reverse().slice(0, this.count)).reverse();
    //   let data = [];
    //   let data1 = [];
    //   invoke.forEach(x => {
    //     data.push(x.id);
    //     data1.push(x.close);
    //   });
    //   let min = Math.min.apply(null, data1);

    //   for (let i = 0; i < data1.length; i++) {
    //     data1[i] = data1[i] - min;
    //   }
    //   that.polar.xAxis.data = data;
    //   that.polar.series[0].data = data1;
    //
    // });


  }

}
</script>
