<template>
  <view>
    <view class="options">
      <view class="item">
        <scroll-view :scroll-x="true" style="width: 100%;">
          <text class="mx-10" v-for="(item,index) in intervals2"
                :class=" index == currentIntervalIndex ? 'text-primary font-weight-bold connect_btn' : 'normal_k' "
                @click="changeInterval(index)">{{item.name}}</text>
        </scroll-view>
      </view>
<!--     <view class="item overflow-hidden">-->
<!--        <scroll-view :scroll-x="true" style="white-space: nowrap;">-->
<!--          <text class="mx-10" v-for="(item,index) in chartTypes" :class=" index == currentChartTypeIndex ? 'text-primary font-weight-bold' : '' " @click="changeChartType(index)">-->
<!--            {{item.name}}</text>-->
<!--        </scroll-view>-->
<!--      </view>-->
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
import { mapState,mapMutations } from 'vuex'
export default {
  name: "klinechart",
  props: {
    tVal: {
      type: Number,
      default:0
    },
    openVal: {
      type: Number,
      default:0
    },
    closeVal: {
      type: Number,
      default:0
    },

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
      intervals2: [{
        name: this.$t("fenshi"),
        value: '1min',
        time: 1 //天
      },
        {
          name: '1'+this.$t("min"),
          value: '1min',
          time: 1
        },
        {
          name: '15'+this.$t("min"),
          value: '15min',
          time: 15
        },
        {
          name: '30'+this.$t("min"),
          value: '30min',
          time: 30
        },
        {
          name: '1'+this.$t("h"),
          value: '60min',
          time: 60
        },
        {
          name: '1'+this.$t("day"),
          value: '1D',
          time: 360
        },
        {
          name: '1'+this.$t("week"),
          value: '1W',
          time: 1800
        },
        {
          name: '1'+this.$t("mon"),
          value: '1M',
          time: 10800
        },
      ],
      //分时
      intervals,
      currentIntervalIndex:1,
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
      dataList:new Array(200),
      pushUUID: "",
    }
  },
  watch: {
  	  isConnect(val) {
  		  if(val) {
  			  this.onMessage()
  		  }
  	  }
  },
  mounted() {
    //获取历史数据列表
    let that = this;
    that.getHistoryDataV2();
	this.onMessage()
  },
  methods:{
	  ...mapMutations(['getFloatPrice']),
    updateKlineData(data){
      let that = this;
      //console.log("父组件数据==>"+JSON.stringify(data));

      const lastData = that.dataList[that.dataList - 1];
      //klinechart.vue:110 that.chartData.updateData=>{"id":1692568800000,"timestamp":1692568800000,"open":26176.85,"high":26225.19,"low":26176.85,"close":26211.83,"volume":405.30378,"change":"0.13"}
      //spot_kline.vue:259 change更新顶部数据0.13362952379680215
      that.$emit('getSocketData', data);
      //that.chartData.updateData.close=data.close;
      if (lastData != null && (data.id > lastData.id)) {
        that.dataList = that.dataList.sort((a, b) => a.id - b.id);
        that.dataList[that.dataList - 1] = data;
        that.chartData.updateData = data;
      } else {
        that.chartData.updateData = data;
      }
      that.dataList = that.dataList.sort((a, b) => a.id - b.id);


    },
	onMessage() {
		let coin = this.currency_name.toUpperCase() + '/USDT'
		this.$store.state.webScoket?.onMessage(evt => {
			 let k = JSON.parse(evt.data)
			 if(k.type === 'message'){
				 if(k.currency_name?.toUpperCase() === this.currency_name.toUpperCase()){
					 let arr = this.floatPriceList.filter(item => item.currency_name === this.currency_name.toUpperCase())
					 // 不存在这获取最新的浮动价格列表获取存在不相等
					 if(arr.length === 0 || k.float_price !== arr[0].float_price){
						 console.log('获取k线图')
						 this.$store.dispatch('getFloatPriceList')
						 this.getHistoryDataV2()
					 }
				 }
			 }
			 if(k.symbol?.toUpperCase() === coin && k.type === 'kline' && k.self === 1) {
				  let period = this.intervals[this.currentIntervalIndex].value
				  if(period == k.period) {
					 const data = {
					   id: Number(k.time),
					   timestamp: Number(k.time),
					   open: Number(k.open),
					   high:Number(k.high),
					   low: Number(k.low),
					   close: Number(k.close),
					   volume:Number(k.volume)
					 }
					 const lastData = this.dataList[this.dataList.length - 1];
					 if(lastData && data.timestamp > lastData.timestamp){
					   this.dataList.push({
						   ...data,
						   close: Number(k.close) // 防止被一天的污染
					   })
					   this.chartData.updateData = this.dataList[this.dataList.length - 1]
					 }
				  }
			 }
			 if(k.symbol?.toUpperCase() === coin && k.type === 'daymarket' && k.self === 1) {
				  this.$emit('getSocketData',k)
				  let lastData = this.dataList[this.dataList.length - 1]
				  if(lastData) {
				    lastData.close = Number(k.close)
				    this.chartData.updateData = lastData
				  }
			 }
			 
		})
	},
    getHistoryDataV2(){

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

      let that = this;
      let symbolStr = symbol.replace("/","-");
      symbolStr= symbolStr.toUpperCase();
	  
	  this.$https.initData({
		  url: `getHbHistoryKline?coin=${symbolStr}&period=${period}`,
		  type: 'GET',
	  },(res,msg) => {
		  let data = res.sort((a, b) => a.id - b.id)
		  if (data && data.length > 0) {
			data.forEach((item, i) => {
			  let time = Number(item.id) * 1000;
			  item.id = time
			  item.timestamp = time
			  item.open = Number(item.open)
			  item.close = Number(item.close)
			  item.high = Number(item.high)
			  item.low = Number(item.low)
			  item.volume = Number(item.vol)
			})
		  }
		  setTimeout(() => {
		    that.chartData.historyData = data
		    that.chartData.precision = that.precision
		    uni.hideLoading()
		  }, 200)
		  
		  that.dataList = data;
		  that.chartData.historyData = data
		  
		  const lastData = that.dataList[that.dataList.length - 1];
		  that.$emit('getSocketData', lastData);
		  
		  that.chartData.updateData = lastData;
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
      if (index===0){
        this.chartData.chartType="area";
      }else{
        this.chartData.chartType="candle_solid";
      }
      this.currentIntervalIndex = index
      this.getHistoryDataV2()
    },
    //修改图标类型
    changeChartType(index){
      //this.chartData.chartType = this.chartTypes[index].value
      this.chartData.chartType = "area";
      this.currentChartTypeIndex = index

    },
    //创建图形
    createShape(shape){
      this.chartData.createShapeName = shape
    }
  },
  computed: {
	  ...mapState(['isConnect','floatPriceList']),
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
      //修改时区为纽约 Asia/Shanghai 
      this.chart.setTimezone("America/New_York")
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
        if(this.chart!=null){
          this.chart.clearData()
        }
        if(this.chart!=null){
          this.chart.applyNewData(newValue.historyData)
        }
      }
      //更新实时数据
      if(newValue.updateData){
        if(this.chart!=null){
         this.chart.updateData(newValue.updateData)
        }
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
      this.chart?.setPriceVolumePrecision(newValue.precision,newValue.precision)
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
  background-color: #ca3f64;
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
  border-top: 0rpx solid #333;
  border-bottom: 2rpx solid #121212;
  // display: grid;
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
  background: #333;
  color: #ffffff;
  padding: 2px;
  border-radius: 4px;

  //border-bottom: 2px solid $uni-color-primary;//时间段选择 黄鼠狼
}
.connect_btn{
  background: -webkit-gradient(linear, left top, right top, color-stop(10%, #1FA2FF), color-stop(55.21%, #12D8FA), to(#A6FFCB));
  background: -webkit-linear-gradient(left, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
  background: -o-linear-gradient(left, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
  background: linear-gradient(90deg, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
  color: #000000;
  padding: 2px;
  //-webkit-background-clip: text;
  //-webkit-text-fill-color: transparent;
  //background-clip: text;
  //text-fill-color: transparent;
  //text-align: center;
}
.normal_k{
  color: #939393;
}
</style>
