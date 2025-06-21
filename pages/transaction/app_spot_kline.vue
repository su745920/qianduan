<template>
  <view style="background: #000000;">



    <!-- 一些数据 -->
    <view class="d-flex-between-center p-30" style="height: 152rpx;">

      <view class="">
        <text class="d-block font-size-40 font-weight-bold"
              :style="{color:$utils.getColor(symbolQuotation1.change)}">{{Number(symbolQuotation1.close).toFixed(4)}}</text>
        <view class="d-flex align-items-baseline mt-10">

          <text class="font-size-22 text-white"  v-if="lang=='zh' ">≈&nbsp;{{(symbolQuotation1.close * cnyusdt).toFixed(2)}}&nbsp;CNY</text>
          <text class="font-size-22 text-white"  v-else>≈&nbsp;{{symbolQuotation1.close.toFixed(2)}}&nbsp;USD</text>

          <text class="font-size-22 ml-12"
                :style="{color:$utils.getColor(symbolQuotation1.change)}">{{symbolQuotation1.change}}%</text>
        </view>
      </view>
      <view class="">
        <view class="d-flex">
          <text class="d-block opacity-30 text-white font-size-22">{{i18n.dayHigh}}</text>
          <text class="d-block font-size-22 opacity-80 text-white ml-20">{{symbolQuotation1.high}}</text>
        </view>
        <view class="d-flex mt-8">
          <text class="d-block opacity-30 text-white font-size-22">{{i18n.dayLow}}</text>
          <text class="d-block font-size-22 opacity-80 text-white ml-20">{{symbolQuotation1.low}}</text>
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
            <text  style="flex: 1;text-align: center;color: #60B584;" v-if="itemC.isBuyerMaker">{{$t('transaction.buy')}}</text>
            <text  style="flex: 1;text-align: center;color: #DE4a56" v-else>{{$t('transaction.sell')}}</text>
            <text  style="flex: 1;text-align: center;">{{Number(itemC.price).toFixed(2)}}</text>
            <text  style="flex: 1;text-align: right;">{{itemC.qty}}</text>
          </view>
        </view>



      </view>

    </view>








  </view>
</template>
<script>

export default {
  data() {
    return {
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
      from:"index",
      cnyusdt:7.21
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
    this.getMarketDepthData()

    const _this = this
    // uni.setNavigationBarTitle({
    //   title:_this.$t("home.market")
    // });

    this.getLeverDeal(this.currency_id,23);

    let that = this;
    uni.request({
      url: "https://api.coinonebtc.xyz/market/binance/spot/trades?symbol="+that.currency_name+"USDT&limit=20",
      type: "GET",
      dataType: "json",
      success: function (response) {
        that.tradeList = JSON.parse(response.data.data);
        for (let po of that.tradeList){
          //console.log("time===>"+JSON.stringify(po));
          let timestamp=po.time;
          let dateObj = new Date(timestamp);

          let hours = dateObj.getHours(); // 小时
          let minutes = dateObj.getMinutes(); // 分钟
          let seconds = dateObj.getSeconds(); // 秒钟

          po.time=hours+":"+minutes+":"+seconds;

        }

        console.log("tradeList==>"+that.tradeList);
        console.log("成交===>"+that.tradeList.length);
      }
    });
    //

    uni.request({
      url: url,
      method: "GET",
      dataType: "json",  //指定服务器返回的数据类型
      //jsonpCallback: "showData",  //指定回调函数名称
      success: function (response) {

        this.cnyusdt=Number(response.data.message);

      }
    });

  },
  onShow() {
    uni.hideTabBar()
    this.showNav = false
    setTimeout(() => {
      this.showNav = true
    }, 100)

    //获取秒合约的秒数
    //this.getSecondsSeconds()

    this.getQuotation()
    //查看是否已添加自选
    this.checkOptional()

    //获取易购列表和余额
    //this.getPayable()


  },
  methods: {
    changeTab(val) {
      this.currentTab = val;
    },
    subMarketDepth() {
      let that = this;
      let  currencyName=that.currency_name.toLowerCase();
      if (currencyName==="aoq"||currencyName==="bicn"||currencyName==="lpq"||currencyName===""){
        currencyName="BTC";
      }
      currencyName=currencyName.toLowerCase();

      var socket = new SockJS('https://api.coinonebtc.xyz/market/market-ws');
      let stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/binance/depth/'+currencyName+'usdt', function (response) {
          let msg = JSON.parse(response.body);
          //深度===>{"lastUpdateId":38481359483,"bids":[["26028.00000000","12.03892000"],["26027.98000000","0.14174000"],["26027.94000000","0.19237000"],["26027.93000000","0.00048000"],["26027.75000000","0.00095000"]],"asks":[["26028.01000000","10.12051000"],["26028.59000000","0.00039000"],["26029.04000000","0.00701000"],["26029.08000000","0.03000000"],["26029.10000000","0.20000000"]]}

          let inData = msg.bids;
          let outData = msg.asks.reverse();
          //let outData = msg.asks;
          if (true) {
            let[inlist,outList] = [inData,outData];
            let [max, max1] = [0, 0];
            for (let i in inData) {

              inlist[i].price = inlist[i][0];
              inlist[i].number = inlist[i][1];
              //inlist[i].all = that.getRandom;
              max = inlist[i].number > max ? inlist[i].number : max;
            }

            that.inMaxValue = max;
            that.buyList = inlist.slice(0,10);

            for (let i in outList) {
              outList[i].price = outList[i][0];
              outList[i].number = outList[i][1];
              max1 = outList[i].number > max1 ? outList[i].number : max;
              that.sellMaxValue = outList[i].number;
              //outList[i].all = that.getRandom;
            }
            that.sellMaxValue = max1;
            that.sellList = outList.slice(0,10);

            that.buyListCount = that.buyList.reduce((total, item) => {
              return total + item[1] * 1
            }, 0);

            that.sellListCount = that.sellList.reduce((total, item) => {
              return total + item[1] * 1
            }, 0);


          }
        });
      });


    },

    //获取杠杆的一些信息和持仓列表
    getLeverDeal(currency_id,legal_id){
      this.$u.api.market.getLeverDeal(currency_id,legal_id).then(res=>{
        let user_lever = res.message.user_lever || 0
        //this.user_lever = Number(user_lever).toFixed(4)
        this.microInsurance = Number(user_lever).toFixed(4)
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
      const optionalList = [];
      let that = this;
      uni.request({
        url: "https://api.coinonebtc.xyz/market/binance/redis/getLatestQuotations",
        type: "GET",
        dataType: "json",
        success: function (response) {

          let quotationList = response.data.data;


          that.quotation = quotationList.map(item => {
            item.precision_length = 4;
            let change= Number(100*(item.close - item.open)/item.open);
            change=change.toFixed(2);
            item.change=change;
            if (item.currencyName==="SHIB"){
              item.change="0.52";
            }
            if (item.currencyName==="DOGE"){
              item.change="-0.67";
            }
            if (item.currencyName==="TESLA"){
              item.change="0.1";
            }

            return item
          })

          if (optionalList.length) {
            let optional = []
            optionalList.forEach(item => {
              const has = that.quotation.find(el => item.id === el.currency_id)
              if (has) optional.push(has)
            })
            that.optionalList = optional
          } else {
            that.currentNav = 1
            that.optionalList = []
          }

          that.originalQuotation = that.quotation;

          uni.setStorageSync('quotation', this.quotation);





        }

      });
    },
    getSocketData(data) {



      let  change=100*(data.close-data.open)/data.open;
      //console.log("change更新顶部数据"+change);
      change=Number(change).toFixed(2);

      this.symbolQuotation1=data;
      this.symbolQuotation1.change=change;





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
      const url = `/pages/transaction/spot_kline?currency_name=${currency_name}&legal_name=USDT&currency_id=${currency_id}`
      uni.reLaunch({
        url
      })
    },
    //接受市场数据
    getMarketDepthData() {
      this.subMarketDepth();
    },
    //查看是否已添加自选
    checkOptional(){
      let token=uni.getStorageSync("token");
      if (token&&token.length>10) {
        let that = this;
        that.$https.initDataToken({
          url: 'optional/list',
          type: 'GET',
        }, (res, msg) => {
          console.log("收藏列表==>"+JSON.stringify(res)+" that.currency_id=>"+that.currency_id);
          //const item = res.find(item => item.currency_id === that.currency_id)
          for(let i=0;i<res.length;i++) {
            let item=res[i];
            console.log("item.currency_id="+item.currency_id+"that.currency_id=>"+that.currency_id);
            if (item.currency_id == that.currency_id) {
              that.optionalId = item.id;
            }
          }
          //alert("收藏" + that.optionalId);
          //this.optionalId = res.message.id
          //that.$utils.showToast(that.$t("transaction.addOptionalSuccess"));
        });
      }

    },
    //添加自选
    addOptional() {
      let token=uni.getStorageSync("token");
      if (token&&token.length>10) {
        let that = this;
        that.$https.initDataToken({
          url: 'optional/add?currency_id='+that.currency_id,
          type: 'POST',
        }, (res, msg) => {
          that.optionalId=res.id;
          that.$utils.showToast(that.$t("transaction.addOptionalSuccess"));
        });
      }

    },
    // 删除自选
    delOptional() {
      let token=uni.getStorageSync("token");
      if (token&&token.length>10) {
        let that = this;
        that.$https.initDataToken({
          url: 'optional/del?id='+that.optionalId,
          type: 'POST',
        }, (res, msg) => {
          //alert("收藏" + JSON.stringify(res));
          that.optionalId=0;
          that.$utils.showToast(that.$t("transaction.delOptionalSuccess"));
        });
      }
    },
    // 获取已购买的秒合约列表和余额
    getPayable(){
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
      uni.reLaunch({
        url
      })

    }
  },
  computed: {
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
  onHide(){
    // if(this.countDown){
    // 	clearInterval(this.countDown)
    // }
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
