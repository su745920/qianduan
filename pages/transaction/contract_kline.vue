<template>
  <view style="background: #000000;">
	  <u-navbar showback="true" :customBack="onBack">
		  <view class="d-flex align-items-center font-weight-bold" @click="showSelectCoin=true">
		    <text class="font-size-40 mx-10"  style="color: #ffffff;">{{currency_name + '/' + legal_name}}</text>
		    <text v-if="symbolQuotation.change" class="tag"
		          :class="symbolQuotation.change > 0 ? 'tag-success' : 'tag-error'">{{symbolQuotation.change}}%</text>
		    <image src="/static/icon_triangle_down_white_16.png" style="width:20px;height:20px;margin-left:2px;"></image>
		  </view>
		  <view class="d-flex align-items-center">
		    <!-- 合约订单 -->
		    <u-icon name="order"  size="42"  :color="$baseColor" class="mr-20" @click="$utils.jump(`/pages/transaction/contract_order?currency_id=${symbolQuotation.currency_id}&legal_id=${symbolQuotation.legal_id}`,'redirectTo')" v-if="currentNav == 0 && symbolQuotation.id"></u-icon>
		    <!-- 秒合约订单 -->
		    <u-icon name="order"  size="42"  :color="$baseColor" class="mr-20" @click="$utils.jump('/pages/transaction/seconds_order?match_id='+symbolQuotation.id,'redirectTo')" v-else-if="currentNav == 1 && symbolQuotation.id"></u-icon>
		    <!-- 币币订单 -->
		    <u-icon name="order"  size="42"  :color="$baseColor" class="mr-20" @click="$utils.jump('/pages/transaction/currency_order','redirectTo')" v-else-if="currentNav == 2 && symbolQuotation.id"></u-icon>
		  </view>
		  <view class="d-flex" slot="right">
		  	<image src="/static/icon_collect_yes.png"  v-if="optionalId" @click="delOptional"  style="width: 20px;height: 20px;"></image>
		  	<image src="/static/icon_collect_no.png"  v-if="!optionalId" @click="addOptional" style="width: 20px;height: 20px;"></image>
		  	<image src="@/static/bib/icon_home_menu.png"  size="42" @click="goHome"
		  	style="width: 20px;height:20px;margin-left: 20px;margin-right: 10px;"></image>
		  </view>
	  </u-navbar>
    <!-- 所有行情列表 -->
    <u-popup v-model="showSelectCoin" mode="bottom" length="780" contentBackgroundColor="#000000"
             :mask-custom-style="{background: 'rgba(0, 0, 0, 0.3)'}" :border-radius="0">
      <view class="status_bar"></view>
      <view class="px-30 market"  style="background: #111111;margin-top: 20px;">
        <view style="height: 10px;"></view>
        <view class="search d-flex align-items-center py-20" style="background: #242424;height: 32px;border-radius: 12px;line-height: 32px;">
          <image src="/static/bib/icon_common_search.png" style="width: 15px;height: 15px;margin-left: 10px;margin-top:2px;">
            <input type="text" class="input" :placeholder="$t('common.search')" confirm-type="search" placeholder-style="font-size:13px;"
                   @input="filterQuotation">
        </view>
        <view class="d-grid py-20" style="grid-template-columns:1.1fr 1fr 1fr;">
          <view class="d-flex align-items-center font-size-22 opacity-50" v-for="(item,index) in quotationNav"
                :class="item.align">
            <text>{{item.name}}</text>
          </view>
        </view>
        <scroll-view scroll-y="true" style="height: 600rpx;">
          <view class="market-item" v-for="item in quotation"
                @click="jump(item.currencyName,32,item.currency_id)">
            <view class="left">
              <text class="d-block">
                <text class="font-size-28 font-weight-bold">{{ item.currencyName }}</text>
                <text class="font-size-22 opacity-50">/USDT</text>
              </text>
              <text class="d-block font-size-22 opacity-50">24H:
                {{ Number(item.volume) | setPrecision(2) }}
              </text>
            </view>
            <view class="text-center">
              <text class="d-block font-size-30 font-weight-bold">
                {{ item.close | setPrecision(2) }}
              </text>
            </view>
            <view class="">
              <view class="right" :style="{backgroundColor:$utils.getColor(item.change)}">
                {{ item.change + '%' }}
              </view>
            </view>
          </view>
        </scroll-view>

      </view>
    </u-popup>
    <!-- 一些数据 -->
    <view class="d-flex-between-center p-30" style="height: 152rpx;">

        <view class="">
          <text class="d-block font-size-40 font-weight-bold"
                :style="{color:$utils.getColor(symbolQuotation1.change)}">{{Number(symbolQuotation1.close).toFixed(4)}}</text>
          <view class="d-flex align-items-baseline mt-10">
           <!-- <text class="font-size-22 text-white"  v-if="lang=='zh' ">≈&nbsp;{{(symbolQuotation1.close * cnyusdt).toFixed(2)}}&nbsp;CNY</text>
            <text class="font-size-22 text-white"  v-else>≈&nbsp;{{symbolQuotation1.close.toFixed(2)}}&nbsp;USD</text> -->
			<text class="font-size-22 text-white">≈&nbsp;{{(symbolQuotation1.close*0.99).toFixed(2)}}&nbsp;USD</text>
            <text class="font-size-22 ml-12"
                  :style="{color:$utils.getColor(symbolQuotation1.change)}">{{symbolQuotation1.change}}%</text>
          </view>
        </view>
        <view class="">
          <view class="d-flex">
            <text class="d-block opacity-60 text-white font-size-22">{{i18n.dayHigh}}</text>
            <text class="d-block font-size-22 text-white ml-20">{{symbolQuotation1.high}}</text>
          </view>
          <view class="d-flex mt-8">
            <text class="d-block opacity-60 text-white font-size-22">{{i18n.dayLow}}</text>
            <text class="d-block font-size-22 text-white ml-20">{{symbolQuotation1.low}}</text>
          </view>
        </view>

    </view>
    <!-- k线图 -->
    <klinechart :currency_name="currency_name" :legal_name="legal_name" @getSocketData="getSocketData" :precision="symbolQuotation.precision_length">
    </klinechart>

    <!-- 委托挂单 -->
    <!-- <u-gap height="20" bg-color="#333333"></u-gap> -->
    <view class="px-30" style="padding-bottom: 100px;">

      <div style="display: flex;width:100%;background: #000000;padding-bottom: 8px;justify-content: left;margin-left: 10px;">
        <div style="font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;"
             @click="changeTab(0)">
          <span :class="currentTab==0 ?'activeTab':'normalTab' " >{{i18n.entrustPendingOrder}}</span>

          <view v-if="currentTab==0" style="height: 2px;margin-top: 4px;" class="connect_btn"></view>
        </div>

        <div style="font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;margin-left:50px;" :style="{marginLeft:mx+'px'}"
             @click="changeTab(1)">
          <span :class="currentTab==1 ?'activeTab':'normalTab' ">{{i18n.completeOrder}}</span>
          <view v-if="currentTab==1" style="height: 2px;margin-top: 4px;" class="connect_btn"></view>
        </div>

      </div>
      <view style="display: flex;width: 100%;margin-top: 10px;" v-if="currentTab ==0 ">
        <view style="text-align: left;font-size: 12px;color: #939393;">{{i18n.buy}}</view>
        <view  style="text-align: left;font-size: 12px;color: #000000;">{{i18n.buyDown}}</view>
        <view  style="text-align: center;flex: 1;font-size: 12px;color: #939393;">{{$t('transaction.sell')}}(USDT)</view>
        <view  style="text-align: right;font-size: 12px;color: #000000;">{{i18n.sell}}</view>
        <view  style="text-align: right;font-size: 12px;color: #000000;">{{i18n.buyDown}}</view>
      </view>
      <view class="d-flex overflow-hidden" v-if="currentTab ==0 ">

        <view class="text-white w-50">
          <view class="d-flex-between-center px-10 py-16 position-relative font-size-22" v-for="item in buyList">
            <text class="opacity-75">{{item[1]}}</text>
            <text  :style="{color:$downColor}">{{item[0]}}</text>
            <view class="position-absolute opacity-20" style="top: 0;bottom: 0;right: 0;" :style="{background:$downColor,width:(item[1]/buyListCount*100*10+'%')}"></view>
          </view>
        </view>
        <view class="text-white w-50">

          <view class="d-flex-between-center px-10 py-16 position-relative font-size-22" v-for="item in sellList">
            <text  :style="{color:$upColor}">{{item[0]}}</text>
            <text class="opacity-75" >{{item[1]}}</text>
            <view class="position-absolute opacity-20" style="top: 0;bottom: 0;left: 0;" :style="{background:$upColor,width:(item[1]/sellListCount*100*10+'%')}"></view>
          </view>
        </view>
      </view>

      <view v-if="currentTab ==1 ">


        <view  class="d-flex-between-center px-10 py-16 position-relative"  style="display: flex;flex-direction: row;width: 100%;height: 100%;">
          <text style="flex: 1;color: #939393;font-size: 12px;">{{$t('transaction.time')}}</text>
          <text  style="flex: 1;text-align: center;color: #939393;font-size: 12px;">{{$t('transaction.direction')}}</text>

          <text  style="flex: 1;text-align: center;color: #939393;font-size: 12px;">{{$t('transaction.price')}}</text>
          <text  style="flex: 1;text-align: right;color: #939393;font-size: 12px;">{{$t('transaction.amount')}}</text>
        </view>
        <view class="d-flex-between-center px-10 py-16 position-relative font-size-22"   style="display: flex;flex-direction: column;width: 100%;justify-content: center;align-items: center;" v-for="itemC in tradeList">
          <view style="display: flex;flex-direction: row;width: 100%;height: 100%;">
            <text style="flex: 1;color: #999999">{{ itemC.time}}</text>
            <text  style="flex: 1;text-align: center;color: #60B584;" v-if="itemC.isBuyerMaker">买入</text>
            <text  style="flex: 1;text-align: center;color: #DE4a56" v-else>卖出</text>
            <text  style="flex: 1;text-align: center;">{{Number(itemC.price).toFixed(2)}}</text>
            <text  style="flex: 1;text-align: right;">{{itemC.qty}}</text>
          </view>
        </view>



      </view>

    </view>

    <!-- 合约 -->
    <block>
      <view class="footer font-size-28"  style="background: #1b1b1b;display: none;">

        <view class="btn btn1 connect_btn" style="border-radius: 26px;font-size: 16px;height: 40px;margin:10px;"
              @click="$utils.jump(`/pages/transaction/contract?currency_name=${currency_name}&legal_name=${legal_name}&currency_id=${currency_id}&buy_direction=0`,'reLaunch')">
          <text class="d-block" style="color: #000000;">{{ $t("nav[2]") }}</text>
        </view>

        <view style="display: flex;flex-direction: column;">
          <!--          <view style="justify-content: center;align-items: center;display: flex;text-align: center">-->
          <!--            <image src="/static/uzx/icon_type_b.png" style="width: 20px;height: 20px;"></image>-->
          <!--          </view>-->
          <!--          <view style="color: #939393;text-align: center;font-size: 13px;margin-top: 3px;">-->
          <!--            币本位-->
          <!--          </view>-->
        </view>

        <view style="display: flex;flex-direction: column;"
              @click="$utils.jump(`/pages/transaction/currency?currency_name=${currency_name}&legal_name=${legal_name}&currency_id=${currency_id}&buy_direction=0`,'reLaunch')">
          <view style="justify-content: center;align-items: center;display: flex;text-align: center">
            <image src="/static/uzx/icon_type_u.png" style="width: 20px;height: 20px;text-align: center;"></image>
          </view>
          <view style="color: #939393;text-align: center;font-size: 13px;margin-top: 3px;">
            {{$t("transaction.spot")}}
          </view>
        </view>



        <view style="display: flex;flex-direction: column;margin-right: 20px;"  @click="$utils.jump('/pages/setting/preferencesetting')">
          <view style="justify-content: center;align-items: center;display: flex;text-align: center">
            <image src="/static/uzx/icon_type_more.png" style="width: 20px;height: 20px;"></image>
          </view>
          <view style="color: #939393;text-align: center;font-size: 13px;margin-top: 3px;">
            {{$t("common.more")}}
          </view>
        </view>

      </view>
    </block>


  </view>
</template>
<script>
	import { mapState } from 'vuex'
export default {
  data() {
    return {
      cnyusdt:7.21,
      lang:localStorage.getItem("lang")||"en",
      mx:30,
      tradeList:[],
      currentTab: 0,
      currency_name: '',
      legal_name: '',
      currency_id:0,
      showSelectCoin: false,
      originalQuotation: [],
      quotation: [],
      symbolQuotation: {},
      symbolQuotation1:{close:0,change:0},
      // 交易数据
      buyList:[],
      sellList:[],
      buyListCount:0,
      sellListCount:0,
      optionalId:0,
      //买张买跌,
      showBuyConfirm:false,
      buyDirection:1, // 1买涨，2：买跌
      timers:[],
      currentTimer:0, //当前选择的时间
      number:'', // 数量,
      microInsurance:0,//秒合约账户余额,
      //倒计时
      showCountDown:false,
      actualPL: null, // 實際盈虧，為null時顯示倒計時
      buyInfo:{},
      countDown:null, //倒计时的interval
      countDownTime:0, //倒计时的总时间,
      showNav:true,
      currentNav:1,
      from:"index"
    };
  },
  onLoad(options) {
    const {
      from,
      currency_name,
      legal_name,
      currency_id
    } = options
    this.from = from || ''
    this.currency_name = currency_name || "BTC"
    this.legal_name = legal_name || "USDT"
    this.currency_id = currency_id || 32

  },
  onShow() {
    uni.hideTabBar()
    this.showNav = false
    setTimeout(() => {
      this.showNav = true
    }, 100)

    //获取秒合约的秒数
    // this.getSecondsSeconds()

    this.getQuotation()
    setTimeout(() => {
    	this.getTradeData()
    },1200)
    //查看是否已添加自选
    this.checkOptional()

    //获取易购列表和余额
    this.getPayable()

    // uni.request({
    // 	url:'https://nftcc.hujinsuo06.vip/all-seller'
    // })
	this.okxWS()
	this.onMessage()

  },
  methods: {
	  onBack() {
	  	this.$utils.jump('/pages/transaction/contract')
	  },
	  goHome() {
	  	uni.reLaunch({
	  		url: '/pages/setting/left_menu'
	  	})
	  },
    changeTab(val) {
      this.currentTab = val;
    },
	okxWS() {
	  // 订阅k
	  let currencyName = this.currency_name.toUpperCase()
	  this.$store.dispatch('onWebScoketSub',[`kline.${currencyName}/USDT`])
	  // 订阅一天
	  this.$store.dispatch('onWebScoketSub',['daymarket'])
	  // 订阅深度的
	  this.$store.dispatch('onWebScoketSub',[`market_depth.${currencyName}/USDT`])
	},
	getTradeData() {
		let coin = this.currency_name.toUpperCase() + '-USDT';
		this.$https.initData({
			url: 'getHbHistoryTrade?coin=' + coin + '&size=50',
			type: 'GET'
		}, (res, msg) => {
			let list = res
			for (let po of list) {
				let timestamp = po.ts;
				let dateObj = new Date(timestamp);
				let hours = dateObj.getHours(); // 小时
				let minutes = dateObj.getMinutes(); // 分钟
				let seconds = dateObj.getSeconds(); // 秒钟
				po.time = hours + ":" + minutes + ":" + seconds;
				po.qty = po.data[0].quantity
				po.price = po.data[0].price
				po.isBuyerMaker = po.data[0].direction === 'buy' ? true : false
			}
			this.tradeList = list;
		})
	},
    //获取秒合约的秒数
    getSecondsSeconds(){
      this.$u.api.market.getSecondsSeconds().then(res => {
        this.timers = res.message.map(item => item.seconds)
        this.currentTimer = this.timers[0]
      })
    },
    // 获取所有行情
    getQuotation() {
		this.$https.initData({
			url: 'getHbList',
			type: 'GET'
		}, (res, msg) => {
			let quotationList = res
			for (let i = 0; i < quotationList.length; i++) {
				quotationList[i].precision_length = 4;
				quotationList[i].change = Number(quotationList[i].change).toFixed(2)
				quotationList[i].currencyName = quotationList[i].currency_name
			}
			this.originalQuotation = quotationList;
			this.quotation = quotationList;
		})
	},
    getSocketData(data) {
      let change = data.change;
      
      change = Number(change).toFixed(2);
      
      this.symbolQuotation1 = data;
      this.symbolQuotation1.change = change;
      
      let low = data.low;
      let high = data.high;
      this.symbolQuotation1.high = high;
      this.symbolQuotation1.low = low;
    },

    filterQuotation(e) {
      let val = e.detail.value
      if (!val) {
        this.quotation = this.originalQuotation
      } else {
        this.quotation = this.originalQuotation.filter(el => {
          val = val.toLowerCase()
          let currency_name = el.currencyName.toLowerCase()
          //let legal_name = el.legal_name.toLowerCase()
          if (currency_name.indexOf(val) > -1) {
            return el
          }
        })
      }
    },
    // 跳转
    jump(currency_name, legal_name,currency_id) {
      if (currency_name === this.currency_name && legal_name === this.legal_name && currency_id === this.currency_id) this.showSelectCoin = false
      const url = `/pages/transaction/contract_kline?currency_name=${currency_name}&legal_name=USDT&currency_id=${currency_id}`
	  this.showSelectCoin = false
      uni.redirectTo({
      	url: url
      })
    },
	onMessage() {
		let coin = this.currency_name.toUpperCase() + '/USDT'
		this.$store.state.webScoket?.onMessage(evt => {
			 let k = JSON.parse(evt.data)
			 if(k.symbol?.toUpperCase() === coin && k.type === 'market_depth') {
				 let inData = k.bids;
				 let outData = k.asks.reverse();
				   let[inlist,outList] = [inData,outData];
				   for (let i in inData) {
					 inlist[i].price = inlist[i][0];
					 inlist[i].number = inlist[i][1];
				   }
				   this.buyList = inlist.slice(0,10);
				   for (let i in outList) {
					 outList[i].price = outList[i][0];
					 outList[i].number = outList[i][1];
				   }
				   this.sellList = outList.slice(0,10);
				   this.buyListCount = this.buyList.reduce((total, item) => {
					 return total + item[1] * 1
				   }, 0);
				   this.sellListCount = this.sellList.reduce((total, item) => {
					 return total + item[1] * 1
				   }, 0);
			 }
		})
	},
    //查看是否已添加自选
    async checkOptional(){
		const token = this.$store.state.token
		if(!token) return
		this.$https.initDataToken({
			url: 'optional/list',
			type: 'GET'
		}, (res, msg) => {
			const item = res.find(item => item.currency_id === this.currency_id)
			if(item){
			  this.optionalId = item.id
			}
		})
    },
    //添加自选
    addOptional() {
      this.$u.throttle(()=>{
        const {
          currency_id,
          i18n
        } = this
        this.$u.api.market.addOptional(currency_id).then(res => {
          this.optionalId = res.message.id
          this.$utils.showToast(i18n.addOptionalSuccess)
        })
      },1200)
    },
    // 删除自选
    delOptional() {
      this.$u.throttle(()=>{
        const {
          optionalId,
          i18n
        } = this
        this.$u.api.market.delOptional(optionalId).then(res => {
          this.optionalId = 0
          this.$utils.showToast(i18n.delOptionalSuccess)
        })
      },1200)
    },
    // 获取已购买的秒合约列表和余额
    getPayable(){
		return
      const token = this.$store.state.token
      if(!token) return
      this.$u.api.market.getPayable().then(res=>{
        const data = res.message.find(item=>item.id === this.currency_id)
        //this.microInsurance = data.user_wallet.micro_with_insurance
      })
    },
    //提交购买
    submit(){
      this.actualPL = null;
      this.$u.throttle(()=>{
        const {buyDirection,symbolQuotation,currentTimer,number,i18n} = this
        // match_id,currency_id,type,seconds,number
        const {id,legal_id} = symbolQuotation
        if(!number || !this.$u.test.amount(number)){
          this.$utils.showToast(i18n.plsIptCrtNumber)
          return false
        }

        this.$u.api.market.buySeconds(id,legal_id,buyDirection,currentTimer,number).then(res=>{
          this.buyInfo = res.message
          this.showCountDown = true

          this.countDownTime = Number(this.buyInfo.seconds)
          if(this.countDown) clearInterval(this.countDown)
          this.countDown = setInterval(()=>{

            if(this.countDownTime >= 1){
              this.countDownTime--
            }else{
              this.countDownTime = 0;
              clearInterval(this.countDown)
              this.countDown = null
              // 獲取交易結果
              this.$u.api.market.getResult(this.buyInfo.id).then((res) => {
                let _data = res.message;
                this.actualPL = Number(_data.fact_profits)

              });
              // this.continueTrade()
            }
          },1000)
        })
      },1200)

    },
    //接收seconds信息
    getSecondsList(data){

    },
    //继续交易
    continueTrade(){
      // 关闭所有弹窗
      this.showBuyConfirm = false
      this.showCountDown = false
    },
    //返回
    back(){
      const from = this.from || 'index'
      const url = `/pages/${from}/${from}`
      uni.navigateBack()

    }
  },
  computed: {
	  ...mapState(['isConnect']),
    i18n() {
      return this.$t("transaction")
    },
    symbol() {
      return this.currency_name + '/' + this.legal_name
    },
    nav() {
      const i18n = this.$t("transaction")
      return [{
        name: i18n.futures
      }, {
        name: i18n.seconds
      }, {
        name: i18n.coins
      }]
    },
    quotationNav(){
      const i18n = this.$t("transaction")
      return [{
        name: i18n.tradingPair,
        align: ''
      },
        {
          name: i18n.lastPrice,
          align: 'justify-content-center'
        },
        {
          name: i18n.todayChange,
          align: 'justify-content-end'
        }]
    },
    //预计盈亏，
    expectedPL(){
      // 计算方法
      // open_price 购买时的价格，newprice实时价格

      const {symbolQuotation,buyInfo,countDownTime} = this
      const open_price = buyInfo.open_price ? Number(buyInfo.open_price) : 0
      //如果countDownTime==0，就不用计算了
      //如果还没下单，也不用计算
      if(!open_price || !countDownTime) return 0

      const newprice = Number(symbolQuotation.close)
      const buyDirection = Number(buyInfo.type)

      // open_price == newprice ，盈亏为0
      if(open_price === newprice) return 0

      // 如果购买方向和当前涨跌情况相同,则计算结果为 (number * profit_ratio) / 100
      const number = Number(buyInfo.number)
      const profit_ratio = Number(buyInfo.profit_ratio)
      if((buyDirection === 1 && newprice > open_price) || (buyDirection === 2 && open_price > newprice)){
        return parseFloat(((number * profit_ratio) / 100).toFixed(4))
      }

      // 如果购买方向和当前涨跌情况相反,则计算结果为 - number
      return parseFloat((number * -1).toFixed(4))

    }
  },
  watch: {
  	isConnect(val) {
  	  if(val) {
  		  this.onMessage()
  	  }
  	},
  },
  onHide(){
    // 取消订阅
    this.$store.dispatch('onWebScoketUnSub',[])
  },
  onUnload() {

  }

}
</script>

<style>
page{
  padding-bottom: 120rpx;
}
</style>
<style lang="scss" scoped>
page,
body,
html {
  padding-bottom: 120rpx;

}

.actualPL {
  width: 200rpx;
  height: 200rpx;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  font-size: 66rpx;
  color: #fff;
  border-radius: 50%;
  &.green {
    background: #35AD7A!important;
  }
  &.red {
    background: #FF5c51!important;
  }
}

.market {
  color: rgba(255, 255, 255, .7);

  .search {
    border-bottom: 2rpx solid rgba(255, 255, 255, .1);

    .input {
      height: 38rpx;
      flex: 1;

      .input-placeholder {
        color: #fff;
      }
    }
  }

  .market-item {
    overflow: hidden;
    padding: 20rpx 0;
    border-top: 2rpx solid rgba(255, 255, 255, .1);
    align-items: center;
    display: grid;
    grid-template-columns: 1.1fr 1fr 1fr;

    .right {
      margin-left: auto;
      width: 120rpx;
      height: 50rpx;
      line-height: 50rpx;
      text-align: center;
      border-radius: 10rpx;
      background-color: #15be97;
      color: #fff;
      font-size: 24rpx;
    }
  }
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  border-radius: 20rpx 20rpx 0 0;
  padding: 20rpx 30rpx;
  color: rgba(255, 255, 255, .5);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .btn {
    color: rgba(255, 255, 255, .9);
    text-align: center;
    width: 49.8%;
    background-size: 100% 100%;
    height: 80rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.btn1 {
      //background-image: url('../../static/image/icon/k-icon-1.png');

    }

    &.btn2 {
      //background-image: url('../../static/image/icon/k-icon-2.png');
      position: relative;
      //left: -20rpx;
    }
  }
}

.trade-input{
  border: 2rpx solid #eee;
  border-radius: 10rpx;
  display: block;
  padding: 14rpx 20rpx;
  font-weight: bold;
  .input-placeholder{
    color: rgba(51, 51, 51, 0.4);
    font-weight: normal;
  }
}

.count-down{
  width: 200rpx;
  height: 200rpx;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  font-size: 66rpx;
  color: #fff;
  border-radius: 50%;
}

.fixed-count-down{
  position: fixed;
  right: 30rpx;
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  bottom: 10vh;
  z-index: 10;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-direction: column;
}
.connect_btn {
  background: -webkit-gradient(linear, left top, right top, color-stop(10%, #1FA2FF), color-stop(55.21%, #12D8FA), to(#A6FFCB));
  background: -webkit-linear-gradient(left, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
  background: -o-linear-gradient(left, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
  background: linear-gradient(90deg, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
}
.activeTab {
  color: #ffffff;
  width: 30px;
  border-width: 12px;
  padding-bottom: 8px;
  font-weight: 700;


}

.normalTab {
  width: 30px;
  border-width: 12px;
  padding-bottom: 8px;
  color: #939393;
  font-weight: 700;
}
</style>
