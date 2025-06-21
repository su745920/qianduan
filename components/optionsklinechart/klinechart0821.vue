<template>
  <view>
    <view class="options">
      <view class="item overflow-hidden">
        <scroll-view :scroll-x="true" style="white-space: nowrap;">
          <text class="mx-10" v-for="(item,index) in intervals"
                :class=" index == currentIntervalIndex ? 'text-primary font-weight-bold' : '' "
                @click="changeInterval(index)">{{item.name}}</text>
        </scroll-view>
      </view>
      <!-- <view class="item overflow-hidden">
        <scroll-view :scroll-x="true" style="white-space: nowrap;">
          <text class="mx-10" v-for="(item,index) in chartTypes" :class=" index == currentChartTypeIndex ? 'text-primary font-weight-bold' : '' " @click="changeChartType(index)">{{item.name}}</text>
        </scroll-view>
      </view> -->
      <!-- <view class="item overflow-hidden">
        <scroll-view :scroll-x="true" style="white-space: nowrap;">
          <text class="mx-10" v-for="(item,index) in shapes" @click="createShape(item.value)">{{item.name}}</text>
        </scroll-view>
      </view> -->
    </view>

    <view id="renderKlinechart" :prop="chartData" :change:prop="renderKlinechart.getData" class="content">

    </view>

  </view>
</template>

<script>
import {intervals,chartTypes,shapes} from './params'
import $ from '@/static/jquery.js'
export default {
  name: "klinechart",
  props: {
    currency_name: {
      type: String,
      default: "BTC"
    },
    legal_name: {
      type: String,
      default: "USDT"
    },
    row: {
      type: String,
      default: '40'
    },
    //精度
    precision:{
      type:Number,
      default:2
    },
  },
  data(){
    return {
      //分时
      intervals,
      currentIntervalIndex:3,
      //图标类型
      chartTypes,
      currentChartTypeIndex:0,
      //画图的类型
      shapes,
      //传输给renderjs的数据
      chartData:{
        precision:2,
        historyData:[],//历史数据
        updateData:{},//更新的实时数据
        chartType:null,//更新图表类型
        createShapeName:null
      },
      period:'',
      dataList:[]
    }
  },
  mounted() {
    //获取历史数据列表

    this.getHistoryDataV2();
    this.subMarket();


  },
  methods:{
    subMarket() {
      let that = this;
      var socket = new SockJS('https://go2023.shop/market/market-ws');
      let stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/bibi/kline/btcusdt', function (msg) {
          var resp = JSON.parse(msg.body);
          //console.log(JSON.stringify(resp));
          let candlestick=resp.candlestick;

          const data = {
            id: Number(candlestick.id)*1000,
            timestamp: Number(candlestick.id)*1000,
            open: Number(candlestick.open),
            high: Number(candlestick.high),
            low: Number(candlestick.low),
            close: Number(candlestick.close),
            volume: Number(candlestick.volume),
          }
          const lastData = that.dataList[that.dataList.length - 1];
          //console.log("data=>"+JSON.stringify(data));


          that.$emit('getSocketData',data);

          if (data.timestamp > lastData.timestamp) {
            that.dataList.push(data)
            that.chartData.updateData = data;
          }else{
            that.chartData.updateData = data;
          }


          //{"id":1692544200,"amount":18.271458640896466,"count":3676,"open":25993.76,"high":26055.5,"low":25993.75,"close":26055.49,"vol":475512.96719144535}


          // if (that.lastBar != null && resp.length > 0) {
          //   var price = resp[resp.length - 1].price;
          //   that.lastBar.close = price;
          //   if (price > that.lastBar.high) {
          //     that.lastBar.high = price;
          //   }
          //   if (price < that.lastBar.low) {
          //     that.lastBar.low = price;
          //   }
          //   onRealtimeCallback(that.lastBar);
          // }
        });
      });




    },

    okxWS() {
      let url = "wss://ws.okx.com:8443/ws/v5/public";
      let ws = new WebSocket(url);
      let currencyName=this.currency_name;
      currencyName=currencyName.toUpperCase();
      ws.onopen = function(evt) {
        //console.log("Connection open ...");
        let param = {
          "op": "subscribe",
          "args": [{
            "channel": "tickers",
            "instId": currencyName+"-USDT",
            "instType": "SPOT"
          }
          ]
        };
        ws.send(JSON.stringify(param));
      };
      let that = this;

      ws.onmessage = function(evt) {
        let blob = evt.data;

        if (blob.indexOf("event") == -1) {
          blob = JSON.parse(blob);
          let data = blob.data;
          //console.log("欧意返回实际="+JSON.stringify(data));
          //欧意返回实际=[{"instType":"SPOT","instId":"LTC-USDT","last":"97.62","lastSz":"0.901116","askPx":"97.62","askSz":"11.733404","bidPx":"97.6","bidSz":"34.130769","open24h":"103.18","high24h":"105.95","low24h":"96.05","sodUtc0":"102.55","sodUtc8":"100.08","volCcy24h":"90154097.75835732","vol24h":"887091.656632","ts":"1688653544503"}]

          let resultVO = data[0];
          let instId = resultVO.instId;
          let close = resultVO.last;
          let high = resultVO.high24h;
          let low = resultVO.low24h;
          let vol = resultVO.vol24h;

          let open = resultVO.open24h;
          let chg = (close - open) / open;
          chg = parseFloat(chg);

          //console.log("最新价===>"+close);


          let symbol = currencyName;

          symbol = symbol.toLowerCase() + "usdt";
          let instIdStr = instId
          instIdStr = instIdStr.replace("-", "");
          instIdStr = instIdStr.toLowerCase();






          //setInterval(function () { //每5秒刷新一次图表
          //需要执行的代码写在这里
          const lastData = that.dataList[that.dataList.length - 1];
          lastData.close=close;

          //that.dataList[that.dataList.length - 1].close=close;
          that.$emit('getSocketData',lastData);



          that.chartData.updateData = lastData

          //}, 10000);

          //

        }

      }
      ws.onclose = function(evt) {
        //console.log("Connection closed.");
        ws.open();
      };

    },
    getHistoryDataV2(){
      //console.log("==调用K线==");
      let {currentIntervalIndex,intervals,row,symbol} = this
      //获取历史K线数据中的，开始时间时间戳，秒级
      const from = Date.parse(new Date()) / 1000 - intervals[currentIntervalIndex].time * 24 * 60 * 60
      //获取历史K线数据中的，结束时间时间戳，秒级
      const to = Date.parse(new Date()) / 1000
      //当前显示的时间的事件名称
      let period = intervals[currentIntervalIndex].value
      this.period = period
      //uni.showLoading()
      //请求接口获取数据 from=>1687100791  to=>1689692791  symbol=>BTC/USDT period=>30min

      let that=this;
      symbol=symbol.replace("/","");
      symbol=symbol.toLowerCase();
      let url="https://https://admin.coinbmex.com/api/currency/new_timeshar_v5?period="+period+"&size=200&symbol="+symbol;
      let data=[];
      this.$u.api.market.getHistoryDataV2(200,symbol,period).then(response => {
        //console.log(JSON.stringify(response));
        let message=response.message;
        data = message.data;
        data = data.sort((a, b) => a.id - b.id)
        if (data && data.length > 0) {


          data.forEach((item, i) => {
            let time = item.id + "000";
            item.timestamp = parseInt(time);
            item.open = Number(item.open)
            item.close = Number(item.close)
            item.high = Number(item.high)
            item.low = Number(item.low)
            item.volume = Number(item.vol)
          })
          //console.log("jq返回==>"+JSON.stringify(data));

          //显示历史数据
          setTimeout(()=>{
            that.chartData.historyData = data
            that.chartData.precision = this.precision
            uni.hideLoading()
          },200)

          that.dataList = data

          const lastData = that.dataList[that.dataList.length - 1];
          that.$emit('getSocketData',lastData);

          this.chartData.updateData = lastData;

          //获取实时数据
          //that.startSocket()

        }



      })




    },







    startSocket(){
      const { currency_name, legal_name, period ,currentIntervalIndex,intervals} = this
      //新增下一时间段的数据
      this.$store.state.socket.on('kline', res => {
        if (res.currency_name == currency_name && res.legal_name == legal_name && res.period == period ) {
          const data = {
            timestamp: Number(res.time),
            open: Number(res.open),
            high:Number(res.high),
            low: Number(res.low),
            close: Number(res.close),
            volume:Number(res.volume),
          }
          const lastData = this.dataList[this.dataList.length - 1];
          //console.log("lastData=>"+JSON.stringify(lastData));

          if(data.timestamp > lastData.timestamp){
            this.dataList.push(data)
            this.chartData.updateData = lastData
          }
        }
      });

      //更新实时数据
      this.$store.state.socket.on('daymarket', res => {
        this.$emit('getSokcetData',res)
        if (res.currency_name == currency_name && res.legal_name == legal_name ) {
          let lastData = this.dataList[this.dataList.length - 1]
          lastData.close = Number(res.now_price)
          this.chartData.updateData = lastData
        }
      });
    },
    //切换时间
    changeInterval(index){
      //停止监听
      this.$store.state.socket.removeListener('kline')
      this.currentIntervalIndex = index
      this.getHistoryDataV2()
    },
    //修改图标类型
    changeChartType(index){
      this.chartData.chartType = this.chartTypes[index].value
      this.currentChartTypeIndex = index

    },
    //创建图形
    createShape(shape){
      this.chartData.createShapeName = shape
    }
  },
  computed: {
    symbol() {
      return this.currency_name + '/' + this.legal_name
    }
  },
}
</script>
<script module="renderKlinechart" lang="renderjs">
import {init,dispose} from './klinecharts.min.js'
import theme from './theme.js'
import {rect,circle} from './params'
export default {
  data(){
    return{
      chart:null,
      macd:null
    }
  },
  mounted(){
    this.initChart()
  },
  methods:{
    //初始化图表
    initChart(){
      dispose('renderKlinechart')
      this.chart = init('renderKlinechart')
      //设置黑色主题
      this.chart.setStyleOptions(theme('dark'))
      //在主图上显示MA折线
      this.chart.createTechnicalIndicator({
        name: 'MA',
        calcParams:[5, 10,30],
      }, false, {
        id: 'candle_pane'
      })
      //显示总量图
      this.chart.createTechnicalIndicator({
        name: 'VOL',
        calcParams:[20, 30],
      }, false, {
        height: 100,
        dragEnabled: false
      })
      //显示MACD图
      this.macd = this.chart.createTechnicalIndicator('MACD', false, {
        height: 100,
        dragEnabled: false
      })
       this.chart.overrideTechnicalIndicator({
        name:'MACD',
      })

    },
    getData(newValue, oldValue){

      //设置历史数据
      if(newValue.historyData){
        this.chart.clearData()
        this.chart.applyNewData(newValue.historyData)
      }
      //更新实时数据
      if(newValue.updateData){
        this.chart.updateData(newValue.updateData)
      }
      //修改图表类型
      if(newValue.chartType){
        this.chart.setStyleOptions({
          candle: {
            type:newValue.chartType
          }
        })
      }
      //设置精度
      newValue.precision=4;
      this.chart.setPriceVolumePrecision(newValue.precision,newValue.precision)
    }
  },
  beforeDestroy() {
    // if(this.chart){

    // 	dispose('renderKlinechart')
    // }
  }


}
</script>


<style lang="scss">
.content {
  height: 1100rpx;
}

body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #F2F3F5;
}

div,
p {
  box-sizing: border-box;
}

p {
  margin: 0;
}

.app {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 15px;
}

.k-line-chart-container {
  display: flex;
  flex-direction: column;
  margin: 15px;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .3);
  background-color: #FFFFFF;
  width: 620px;
  height: 440px;
  padding: 16px 6px 16px 16px;
}

.k-line-chart-title {
  margin: 0;
  color: #252525;
  padding-bottom: 10px;
}

.k-line-chart {
  display: flex;
  flex: 1;
}

.k-line-chart-menu-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  font-size: 12px;
  color: #606060;
}

.k-line-chart-menu-container button {
  cursor: pointer;
  background-color: red;
  border-radius: 2px;
  margin-right: 8px;
  height: 24px;
  line-height: 26px;
  padding: 0 6px;
  font-size: 12px;
  color: #fff;
  border: none;
  outline: none;
}

.options{
  border-top: 2rpx solid #333;
  border-bottom: 2rpx solid #333;
  display: grid;
  grid-template-columns:repeat(2,1fr);
  color: #999;
  .item{
    position: relative;
    padding:16rpx 0;
    line-height: 40rpx;
    &::after{
      display: block;
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 2rpx;
      background: #333;
    }

  }
}

.text-primary{
  color: #ffffff;
  border-bottom: 2px solid $uni-color-primary;//时间段选择 黄鼠狼
}


</style>
