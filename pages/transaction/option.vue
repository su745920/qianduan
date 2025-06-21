<template>
  <view class="text-white" style="background: #FFFFFF">
    <u-navbar showback="true" :custom-back="backFn" style="background: #FFFFFF">
      <view class="d-flex font-weight-bold" @click="showSelectCoin=true" style="text-align: left">
        <u-icon name="list-dot" size="40" class="position-relative" style="top: 2rpx;color: #000;"></u-icon>
        <text class="font-size-36 mx-10" style="color: #000;">{{currency_name + '/' + legal_name}}</text>
      </view>
      <!--
			<u-icon name="order" slot="right" size="42"  @click="$utils.jump(`/pages/transaction/contract_order?currency_id=${symbolQuotation.currency_id}&legal_id=${symbolQuotation.legal_id}&from=1`)">
			-->
      <image src="/static/image/white/k2.png" slot="right" size="42" style="width: 30px;height: 30px;"
             @click="$utils.jump(`/pages/transaction/kline?currency_name=${currency_name}&currency_id=${currency_id}&legal_name=USDT`)"></image>

      </u-icon>
    </u-navbar>

    <view class="px-20 py-30">
      <view class="d-flex-between-center">
        <view class="">
          <view class="d-flex align-items-center font-weight-bold">
            <text class="d-block font-size-48 mr-12 font-weight-bold"
                  :style="{color:$utils.getColor(symbolQuotation.change)}">{{symbolQuotation.now_price | setPrecision(symbolQuotation.precision_length)}}</text>
            <text v-if="symbolQuotation.change" class="tag"
                  :class="symbolQuotation.change > 0 ? 'tag-success' : 'tag-error'">{{symbolQuotation.change}}%</text>
          </view>
          <text class="d-block opacity-75" style="color: #000">{{(symbolQuotation.now_price * $store.state.fiat.rate).toFixed(2)}} {{$store.state.fiat.currency_code}}</text>
        </view>

        <view class="d-flex align-items-center">
          <!-- <text class="iconfont icon-tubiao font-size-36 mr-20" @click="$utils.jump(1,'navigateBack')"></text> -->

          <u-icon name="order" size="42"  style="color: #000;"
                  @click="$utils.jump(`/pages/transaction/contract_order?currency_id=${symbolQuotation.currency_id}&legal_id=${symbolQuotation.legal_id}&from=1`)">
          </u-icon>
          <u-icon name="star-fill" size="42" :color="$downColor" v-if="optionalId" @click="delOptional" style="margin-left: 10px;"></u-icon>
          <u-icon name="star" size="42" v-else @click="addOptional" style="color: #777777;margin-left: 10px;"></u-icon>
        </view>
      </view>
      <!-- 所有行情列表 -->
      <u-popup v-model="showSelectCoin" mode="top" length="780" contentBackgroundColor="#ffffff"
               :mask-custom-style="{background: '#ffffff'}" :border-radius="0">
        <view class="status_bar"></view>
        <view class="px-30 market">
          <view class="search d-flex align-items-center py-20">
            <u-icon name="search" size="38"></u-icon>
            <input type="text" class="input" :placeholder="$t('common.search')" confirm-type="search" placeholder-style="color:#929292"
                   style="color: #000;"
                   @input="filterQuotation">
          </view>
          <view class="d-grid py-20" style="grid-template-columns:1.1fr 1fr 1fr;">
            <view class="d-flex align-items-center font-size-22 opacity-50" v-for="(item,index) in quotationNav"
                  :class="item.align">
              <text style="color: #000;">{{item.name}}</text>
            </view>
          </view>
          <scroll-view scroll-y="true" style="height: 600rpx;">
            <view class="market-item" v-for="item in quotation"
                  @click="jump(item.currency_name,item.legal_name,item.currency_id)">
              <view class="left">
                <text class="d-block">
                  <text class="font-size-28 font-weight-bold" style="color: #000;">{{item.currency_name}}</text>
                  <text class="font-size-22 opacity-50" style="color: #666;">/{{item.legal_name}}</text>
                </text>
                <text class="d-block font-size-22 opacity-50" style="color: #000;">24H: {{Number(item.volume) | setPrecision(item.precision_length)}}</text>
              </view>
              <view class="text-center">
                <text class="d-block font-size-30 font-weight-bold" style="color: #000;">{{item.now_price | setPrecision(item.precision_length)}}</text>
              </view>
              <view class="">
                <view class="right" :style="{backgroundColor:$utils.getColor(item.change)}">
                  {{item.change + '%'}}
                </view>
              </view>
            </view>
          </scroll-view>

        </view>
      </u-popup>

      <!-- 买入卖出和实时买卖 -->
      <view class="d-grid mt-20 align-items-center" style="grid-template-columns:2fr 1.2fr ">
        <!-- 买入卖出 -->
        <view class="pr-20 position-relative opacity-90" style="height: 780rpx;">
          <view class="d-grid-columns-2">
            <view class="btn btn1" :class="buyDirection == 0 ? 'active' : ''" @click="buyDirection=0">
              <text class="d-block">{{i18n.buy}}</text>
            </view>
            <view class="btn btn2" :class="buyDirection == 1 ? 'active' : ''" @click="buyDirection=1">
              <text class="d-block">{{i18n.sell}}</text>
            </view>
          </view>
          <text class="d-block"  style="color: #666666;margin-top: 10px;">{{$t('transaction.jye')}}</text>
          <view class="mt-20">
            <input type="number" v-model="leverOrder.share" class="trade-input mt-10 " :placeholder="$t('iesan.zuidi')+minnumber"  style="color: #000;">
          </view>

          <view class="mt-46">
            <text class="d-block"  style="color: #666666;">{{$t('time_start')}}</text>
            <view class="d-flex mt-16" v-if="buyDirection==0">
              <view class="" v-for="(item,indexa) in second">
                <text class="tag  mr-16 px-20 font-size-30" :class="secondindex == indexa ? 'tag-success' : 'tag-plain-success'"
                      @click="secondtap(indexa)">{{item.seconds}}s</text>
              </view>
            </view>
            <view class="d-flex mt-16" v-else>
              <view class="" v-for="(item,indexa) in second">
                <text class="tag  mr-16 px-20 font-size-30" :class="secondindex == item ? 'tag-error' : 'tag-plain-error'" @click="secondtap(indexa)">{{item.seconds}}s</text>
              </view>
            </view>
          </view>
          <view class="mt-26 d-flex-between-center">
            <text class="d-block" style="color: #666666;">{{$t('trade_yinlil')}}</text>
            <text style="color: #000;">{{profit_ratio}}%</text>
          </view>
          <view class="mt-12 d-flex-between-center">
            <text class="d-block" style="color: #666666;">{{i18n.handlingFee}}</text>
            <text style="color: #000;">{{handlingFee}}</text>
          </view>
          <view class="mt-12 d-flex-between-center">
            <text class="d-block" style="color: #666666;">{{i18n.balance}}</text>
            <view class="d-flex align-items-center">
              <text style="color: #000;">{{user_lever}}USDT</text>
            </view>
          </view>

          <!-- <number-box :precision="4"></number-box> -->

          <view class="position-absolute" style="left: 0;right: 20rpx;bottom: 0;">
            <button class="success-button mt-60 py-0 font-size-28" v-if="buyDirection == 0" @click="submits" style="height: 70rpx;line-height: 70rpx;">{{i18n.buy + '/' + i18n.long}}</button>
            <button class="error-button mt-60 py-0 font-size-28" v-else @click="submits" style="height: 70rpx;line-height: 70rpx;">{{i18n.sell + '/' + i18n.short}}</button>
          </view>
        </view>
        <!-- 实时购买 -->
        <view class="overflow-hidden" style="height: 780rpx;" v-if="buyList.length">
          <view class="d-flex-between-center font-size-22 opacity-50 py-10">
            <text  style="color: #666666;">{{i18n.price}}({{currency_name}})</text>
            <text style="color: #666666;">{{i18n.amount}}({{legal_name}})</text>
          </view>
          <view class="">
            <view class="d-flex-between-center px-10 py-6 position-relative font-size-22"
                  v-for="item in buyList.slice(0,10)">
              <text :style="{color:$downColor}">{{item[0]}}</text>
              <text class="opacity-75">{{item[1]}}</text>

              <view class="position-absolute opacity-20" style="top: 0;bottom: 0;right: 0;"
                    :style="{background:$downColor,width:(item[1]/buyListCount*100*10+'%')}"></view>
            </view>
          </view>
          <view class="">
            <view class="d-flex-between-center px-10 py-6 position-relative font-size-22"
                  v-for="item in sellList.slice(0,10)">
              <text :style="{color:$upColor}">{{item[0]}}</text>
              <text class="opacity-75">{{item[1]}}</text>
              <view class="position-absolute opacity-20" style="top: 0;bottom: 0;right: 0;"
                    :style="{background:$upColor,width:(item[1]/sellListCount*100*10+'%')}"></view>
            </view>
          </view>
        </view>
        <view v-else class="text-center w-100 d-flex align-items-center justify-content-center" style="height: 804rpx;">
          <u-loading class="mx-auto" mode="flower" color="rgba(255,255,255,.8)" size="50"></u-loading>
        </view>

      </view>


      <u-popup v-model="showModal" border-radius="10" length="90%">
        <view class="p-30">
          <text class="d-block font-size-30 font-weight-bold" style="color: #000;">{{ title }}{{buyDirection ? i18n.sell : i18n.buy}}</text>
          <view class="d-flex-between-center border-bottom-white py-16">
            <text class="opacity-50" style="color: #000;">{{i18n.tradingPair}}</text>
            <text class="font-weight-bold">{{currency_name + '/' + legal_name}}</text>
          </view>
          <view class="d-flex-between-center border-bottom-white py-16">
            <text class="opacity-50" style="color: #000;">{{i18n.direction}}</text>
            <text class="font-weight-bold" :class="buyDirection ? 'text-error' : 'text-success'">{{buyDirection ? i18n.sell : i18n.buy}}</text>
          </view>
          <view class="d-flex-between-center border-bottom-white py-16">
            <text class="opacity-50" style="color: #000;">{{i18n.number}}</text>
            <text class="font-weight-bold" style="color: #000;">{{number}}</text>
          </view>
          <view class="d-flex-between-center border-bottom-white py-16">
            <text class="opacity-50" style="color: #000;">{{i18n.multiple}}</text>
            <text class="font-weight-bold" style="color: #000;">{{multiple}}</text>
          </view>
          <view class="d-flex-between-center border-bottom-white py-16">
            <text class="opacity-50" style="color: #000;">{{i18n.handlingFee}}</text>
            <text class="font-weight-bold" style="color: #000;">{{handlingFee}}</text>
          </view>
          <view class="d-flex-between-center border-bottom-white py-16">
            <text class="opacity-50" style="color: #000;">{{i18n.margin}}</text>
            <text class="font-weight-bold" style="color: #000;">{{margin}}</text>
          </view>
          <view class="d-flex-between-center mt-30">
            <button class="secondary-button font-size-28 w-48 py-0" @click="showModal = false">{{$t("common.cancel")}}</button>
            <button class="w-48 font-size-28 py-0" @click="confirmBtn"  :class="buyDirection ? 'error-button' : 'success-button'">{{$t("common.confirm")}}</button>
          </view>
        </view>
      </u-popup>



    </view>
    <!-- 持仓列表 -->
    <u-gap height="16" class="mt-20" bg-color="#f7f7f7"></u-gap>
    <view class="">
      <view class="d-grid py-20 font-size-22 opacity-50" style="grid-template-columns:1fr 1fr 1.4fr .7fr 1.2fr;">
        <text class="d-block text-center" style="color: #666666;">{{i18n.type}}</text>
        <text class="d-block text-center" style="color: #666666;">{{i18n.time}}</text>
        <text class="d-block text-center" style="color: #666666;">{{i18n.price}}</text>
        <text class="d-block text-center" style="color: #666666;">{{i18n.number}}</text>
        <text class="d-block text-center" style="color: #666666;">{{i18n.operation}}</text>
      </view>
      <block v-if="orderList.length">
        <view class="d-grid py-20 text-center align-items-center border-bottom" style="grid-template-columns:1fr 1fr 1.4fr .7fr 1.2fr;" v-for="item in orderList">
          <text class="d-block text-center" :class="item.type == 1 ? 'text-success' : 'text-error'">{{item.type == 1 ? i18n.buy : i18n.sell}}</text>
          <view class="font-size-22 opacity-90">
            <text class="d-block" style="color: #000;">{{item.transaction_time.slice(0,10)}}</text>
            <text class="d-block" style="color: #000;">{{item.transaction_time.slice(10,20)}}</text>
          </view>
          <text class="font-weight-bold opacity-90" style="color: #000;">{{Number(item.price).toFixed(4)}}</text>
          <text class="opacity-90" style="color: #000;">{{item.share}}</text>
          <view class="w-50 mx-auto">
            <text class="tag tag-success" v-if="item.order_type == 2" @click="selfHold(item.id)">{{i18n.transSelfHold}}</text>
            <text class="tag tag-primary " v-else @click="cover(item.id)">{{i18n.cover}}</text>

          </view>
        </view>
      </block>
      <default-page v-else></default-page>
    </view>
  </view>
</template>

<script>

import uniDrawer from '@/components/uni-drawer.vue';
import uniIcon from '../../components/uni-icon.vue';
import uniPopup from '@/components/uni-popup.vue';
import popup from '@/components/popup.vue';
import MescrollBodyDiy from "@/uni_modules/mescroll-uni/components/mescroll-diy/ifc/mescroll-uni.vue";
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";

export default {
  components: {
    uniDrawer,
    uniIcon,
    uniPopup,
    popup,
    MescrollBodyDiy
  },
  mixins: [MescrollMixin],
  data() {
    return {
      orderList: [],
      legalName:'',
      currencyName:'',
      langs: '',
      title: this.$t('trade.confrim_order'),
      tipbtnShow: true,
      showModal: false,
      minnumber: '',
      minnumber: '',
      isdatashow: '',
      second: [],
      leverOrder: {
        shareNUm: 0,
        mult: 0,
        share: '',
        fee: '',
        spread: '',
        fees: '',
        bonds: '',
        passwords: '',
        marketPrice: ''
      },
      profit_ratio: '',
      secondindex: 0,
      timer: '',
      timers:[],
      currentTimer:0, //当前选择的时间
      leverTradeType: 'buy',
      contract_fee:2,
      currency_name: 'BTC',
      legal_name: 'USDT',
      currency_id: 32,
      symbolQuotation: {},
      // 交易数据
      buyList: [],
      sellList: [],
      buyListCount: 0,
      sellListCount: 0,
      optionalId: 0,
      showSelectCoin: false,
      //行情
      originalQuotation: [],
      quotation: [],
      buyDirection: 0, //0买入，1卖出
      number: 1, //交易手数,
      buyType: 0, //0市价，1限价,
      multiple:100, //倍数
      balance:0,//余额
      margin:0,//保证金
      handlingFee:0,//手续费,
      user_lever:0,// 个人的资金
      showConfirmPop:false,
      price:'',
      positionList:[],
      muit:[100,150,200], //倍数,
      set: null,
      match_id: '',
      currencyId: 32,
      CountDown: '',
    };
  },
  onLoad(options) {
    let {
      currency_name,
      legal_name,
      currency_id,
      buy_direction
    } = options
    this.currency_name = currency_name || 'BTC'
    this.legal_name = legal_name || 'USDT'
    this.currency_id = currency_id ||32
    buy_direction = buy_direction || 0
    this.buyDirection = Number(buy_direction)

    const _this = this
    // uni.setNavigationBarTitle({
    //   title:_this.$t("home.futures")
    // })
  },
  onShow() {
    this.langs = uni.getStorageSync('lang') || 'en';
    this.isdatashow = 1;
    //uni.showTabBar();
    //this.getSecondsSeconds();
    this.init();
    this.startSocket()
    //查看是否已添加自选
    this.checkOptional()

    this.getQuotation();

  },
  methods: {
	  backFn() {
		  uni.navigateBack()
	  },
    // // 订单倒计时
    countDown(val, indexs, seconds, relSeconds, ids) {
      var that = this;
      that.secods = relSeconds;
      var timeValue = '';
      var process = 100 / Number(seconds);
      var endItem = val; //获取列表传的截止时间
      var nowItem = new Date().getTime(); //获取当前时间
      var timeSpace = Number(endItem) - Number(nowItem); //截止时间减去当前时间
      var seconds = '';
      if (timeSpace > 0) {
        seconds = that.iTofixed(timeSpace / 1000, 0);
        return seconds;
      } else if (timeSpace <= 0) {
        that.orderList.forEach(function(item, index) {
          if (ids == item.id) {
            that.orderList.splice(index, 1)
          }
        })
        that.fnbalance();
        return 0.0;
      }
    },
    init() {
      var that = this;
      clearTimeout(that.set);
      clearInterval(that.sets);
      if (!that.linkStatus) {
        if (uni.getStorageSync('leverOrder')) {
          var leverOrderData = uni.getStorageSync('leverOrder');
          if (typeof leverOrderData != 'object') {
            leverOrderData = JSON.parse(leverOrderData);
          }
          //console.log("lever is "+leverOrderData.legalName+"/"+leverOrderData.currencyName)
          that.legalId = leverOrderData.legalId;
          that.currencyId = leverOrderData.currencyId;
          that.legal_name = leverOrderData.legalName;
          that.currency_name = leverOrderData.currencyName;
        }
      }
      let storedbuysell = uni.getStorageSync(that.currency_name + '/' + that.legal_name );
      if(storedbuysell){
        that.buyList = storedbuysell.buyList;
        that.sellList = storedbuysell.sellList;
        this.processbar(that);
      }
      this.$u.api.market.getSecondsSeconds().then(res => {
          that.second = res.message;
          //console.log(JSON.stringify(res.message));
          that.minnumber = that.second[0].min_amount;
          // that.leverOrder.share = that.second[0].min_amount;
          that.profit_ratio = that.second[0].profit_ratio
        })
      this.$u.api.index.getMicroQuotation().then(res => {

        //that.mescroll.endSuccess();
        res=res.message;
        //console.log("初始化----->>>"+JSON.stringify(res));

        if (res.length > 0) {
          var datas = res.filter(function(item, index) {
            return item.is_display == 1 && item.is_lever == 1;
          });

          that.quotationList = datas;
          if (that.legalId) {
            that.legalIds = that.legalId;
            datas.forEach(function(item, index) {
              if (that.legalId == item.id) {
                that.legal_name = item.name;
                that.legalIndex = index;
                var data1 = item.quotationsimple;
                var lists = data1.filter(function(items, index) {
                  return items.is_display == 1;
                });
                if (lists.length > 0) {
                  lists.forEach(function(itm, inx) {
                    if (that.currencyId == itm.currency_id) {
                      that.currencyIndex = inx;
                      that.currencyName = itm.currency_name;
                      that.leverOrder.shareNUm = itm.lever_share_num;
                      that.leverOrder.spread = itm.spread;
                      that.match_id = itm.id;
                      that.leverOrder.fee = itm.lever_trade_fee;
                      //that.handicap();
                      that.deals();
                      that.lists();
                      return false;
                    }
                  });
                }
              }
            });
          } else {
            var list = datas[0].quotationsimple.filter(function(item, index) {
              return item.is_display == 1;
            });
            that.legal_name = datas[0].name;
            that.legalId = datas[0].id;
            that.currencyId = list[0].currency_id;
            that.currencyName = list[0].currency_name;
            that.match_id = list[0].id;
            that.leverOrder.shareNUm = list[0].lever_share_num;
            that.leverOrder.spread = list[0].spread;
            that.leverOrder.fee = list[0].lever_trade_fee;
            that.legalIds = datas[0].id;
            //that.handicap();
            //that.lists();
            //that.deals();
          }
          that.maxmin();
        }
        that.fnbalance();


      });
      //that.handicap();
    },


    deals() {
      var that = this;
      that.$utils.initDataToken({
        url: 'lever/deal',
        type: 'POST',
        data: {
          legal_id: that.legalId,
          currency_id: that.currencyId
        }
      }, res => {
        that.multShare = res.multiple;
        that.buyList = [
          ['--', '--'],
          ['--', '--'],
          ['--', '--'],
          ['--', '--'],
          ['--', '--']
        ];
        that.sellList = [
          ['--', '--'],
          ['--', '--'],
          ['--', '--'],
          ['--', '--'],
          ['--', '--']
        ];
        let storedbuysell = uni.getStorageSync(that.currencyName + '/' + that.legalName );
        if(storedbuysell){
          that.buyList = storedbuysell.buyList;
          that.sellList = storedbuysell.sellList;
          this.processbar(that);
        }

        // that.minShare = res.lever_share_limit.min;
        // that.maxShare = res.lever_share_limit.max;
        that.cny = res.ExRate;
        // that.newPrice = res.last_price;
        if (res.multiple.muit.length > 0) {
          that.leverOrder.mult = res.multiple.muit[0].value;
        }
        if (res.multiple.share.length > 0) {
          // that.leverOrder.share = res.multiple.share[0].value;
          // console.log(that.leverOrder.share)
        }
        // that.orderList = res.my_transaction;
        that.leverBalance = res.user_lever;
      });
    },
    lists() {
      var that = this;
      var arr = [];
      that.orderList = [];
      clearTimeout(that.set);
      clearInterval(that.sets);
      let status= that.buyDirection == '0' ? 1 : 2;
      this.$u.api.market.getSecondsList(that.match_id, status, 1).then(res => {
        res=res.message;
        arr = res.data;
        if (arr.length > 0) {
          var nowTime = new Date().getTime();
          for (var i = 0; i < arr.length; i++) {
            arr[i].endTime = (nowTime - 0) + (arr[i].remain_milli_seconds - 0);
          }
          that.orderList = arr;
          that.Djs_time();
          that.set = setTimeout(that.countDown, 200);
        }
      });
    },
    getTime() {
      var that = this;
      that.timer = new Date().getTime();
      that.timers = new Date().getTime() + 1000;
      // that.langs = uni.getStorageSync('lang') || 'hk';
    },
    submits() {
      var that = this;
      // if (!that.leverOrder.mult) {
      // 	that.$utils.showLayer(this.$t('trade.p_mtimes'));
      // 	return false;
      // }

      if(parseFloat(this.leverOrder.share) < parseFloat(this.second[this.secondindex].min_amount)){
        that.$utils.showLayer(this.$t('iesan.levermin') + this.second[this.secondindex].min_amount);
        return false;
      }
      if (!that.leverOrder.share) {
        that.$utils.showLayer(this.$t('trade.p_hands'));
        return false;
      }
      // if (that.leverOrder.share < that.minShare) {
      // 	that.$utils.showLayer(this.$t('trade.p_notless') + that.minShare);
      // 	return false;
      // }
      // if (that.leverOrder.share > that.maxShare) {
      // 	that.$utils.showLayer(this.$t('trade.p_notmore') + that.maxShare);
      // 	return false;
      // }
      // if (that.priceStatus == 0) {
      // 	if (!that.priceValue) {
      // 		that.$utils.showLayer(this.$t('trade.p_delprice'));
      // 		return false;
      // 	} else {
      // 		that.calculation(that.priceValue);
      // 	}
      // } else {
      // 	that.calculation(that.newPrice);
      // }

      that.showModal = true;
      that.shows = false;
      that.title = this.$t('trade.confrim_order');
      that.getTime();
      // that.leverOrder.passwords = '';
    },
    calc(){
      const {symbolQuotation,buyDirection,multiple,number} = this
      let spread = Number(symbolQuotation.spread);
      spread=0;
      const lever_share_num = Number(symbolQuotation.lever_share_num)
      const lever_trade_fee = Number(symbolQuotation.lever_trade_fee)
      const prices  = Number(symbolQuotation.now_price)

      let spreadPrices = parseFloat((prices * spread) / 100);

      let pricesTotal = 0;
      if (buyDirection == 0) {
        // 如果方向是买
        pricesTotal = parseFloat(prices + spreadPrices);
      } else {
        pricesTotal = parseFloat(prices - spreadPrices);
      }

      let totalPrice = parseFloat(pricesTotal * lever_share_num * number);
      this.margin = (totalPrice / multiple).toFixed(4);
      //this.handlingFee = parseFloat((totalPrice * lever_trade_fee) / 100).toFixed(4);
      this.handlingFee = parseFloat((this.margin * this.contract_fee) / 100).toFixed(4);//2023-05-15 19:57修改
      console.log("this.handlingFee==>"+this.handlingFee);

    },
    secondtap(e) {
      this.secondindex = e;
      this.leverOrder.share = '';
      console.log("点击=>"+JSON.stringify(this.second[this.secondindex]));
      this.minnumber = this.second[this.secondindex].min_amount;
      this.profit_ratio = this.second[this.secondindex].profit_ratio;

    },
    //获取秒合约的秒数

    // 获取所有行情
    getQuotation() {
      this.$u.api.index.getQuotation().then(res => {
        this.originalQuotation = res.message[0].quotation.map(item=>{
          item.precision_length = this.$utils.getPrecisionLength(item.now_price)
          return item
        })
        this.quotation = this.originalQuotation

        const has = this.originalQuotation.find(item => item.currency_id == this.currency_id)
        if(has){
          this.symbolQuotation = has
          this.price = has.now_price
          //获取杠杆的一些信息和获取持仓列表
          this.getLeverDeal(has.currency_id,has.legal_id)
        }
      })
    },
    //获取杠杆的一些信息和持仓列表
    getLeverDeal(currency_id,legal_id){
      this.$u.api.market.getLeverDeal(currency_id,legal_id).then(res=>{
        let user_lever = res.message.user_lever || 0
        this.user_lever = Number(user_lever).toFixed(4)
        this.muit = res.message.multiple.muit.map(item => Number(item.value))
        const list = res.message.my_transaction || []
        this.positionList = list;
        this.contract_fee=res.message.contract_fee;
      })
    },
    startSocket() {
      const _this = this
      const {
        currency_id,
      } = this

      this.$store.state.socket.on('daymarket', res => {
        let data = res
        const has = this.originalQuotation.findIndex(item => item.currency_name == data
            .currency_name && item
            .legal_name == data.legal_name)
        if (has > -1) {
          let obj = {
            ...this.originalQuotation[has],
            ...data,
          }
          this.originalQuotation.splice(has, 1, obj)
        }

        if (this.currency_name == res.currency_name && this.legal_name == res.legal_name) {
          this.symbolQuotation = {
            ...this.symbolQuotation,
            ...res
          }
        }
      });
      this.$store.state.socket.on('market_depth', res => {
        this.getMarketDepthData(res)
      });
    },
    filterQuotation(e) {
      let val = e.detail.value
      if (!val) {
        this.quotation = this.originalQuotation
      } else {
        this.quotation = this.originalQuotation.filter(el => {
          val = val.toLowerCase()
          let currency_name = el.currency_name.toLowerCase()
          let legal_name = el.legal_name.toLowerCase()
          if (currency_name.indexOf(val) > -1 || legal_name.indexOf(val) > -1) {
            return el
          }
        })
      }
    },
    //接受市场数据
    getMarketDepthData(data) {
      if (this.currency_name == data.currency_name && this.legal_name == data.legal_name) {
        if (typeof(data.bids) == 'string') {
          this.buyList = JSON.parse(data.bids);
          this.sellList = JSON.parse(data.asks).reverse();
        } else {
          this.buyList = data.bids;
          this.sellList = data.asks.reverse();
        }

        this.buyListCount = this.buyList.reduce((total, item) => {
          return total + item[1] * 1
        }, 0);

        this.sellListCount = this.sellList.reduce((total, item) => {
          return total + item[1] * 1
        }, 0);
      }
    },
    //查看是否已添加自选
    async checkOptional() {
      const ret = await this.$u.api.market.getOptionalList()
      const item = ret.message.find(item => item.currency_id == this.currency_id)
      if (item) {
        this.optionalId = item.id
      }
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
    // 跳转
    jump(currency_name, legal_name, currency_id) {
      if (currency_name == this.currency_name && legal_name == this.legal_name && currency_id == this
          .currency_id) this.showSelectCoin = false
      const url =
          `/pages/transaction/option?currency_name=${currency_name}&legal_name=${legal_name}&currency_id=${currency_id}`
      uni.reLaunch({
        url,
      })
    },
    confirm(){
      var that = this;
      // if (!that.leverOrder.mult) {
      // 	that.$utils.showLayer(this.$t('trade.p_mtimes'));
      // 	return false;
      // }

      if(parseFloat(this.leverOrder.share) < parseFloat(this.second[this.secondindex].min_amount)){
        that.$utils.showLayer(this.$t('iesan.levermin') + this.second[this.secondindex].min_amount);
        return false;
      }
      if (!that.leverOrder.share) {
        that.$utils.showLayer(this.$t('trade.p_hands'));
        return false;
      }
      // if (that.leverOrder.share < that.minShare) {
      // 	that.$utils.showLayer(this.$t('trade.p_notless') + that.minShare);
      // 	return false;
      // }
      // if (that.leverOrder.share > that.maxShare) {
      // 	that.$utils.showLayer(this.$t('trade.p_notmore') + that.maxShare);
      // 	return false;
      // }
      // if (that.priceStatus == 0) {
      // 	if (!that.priceValue) {
      // 		that.$utils.showLayer(this.$t('trade.p_delprice'));
      // 		return false;
      // 	} else {
      // 		that.calculation(that.priceValue);
      // 	}
      // } else {
      // 	that.calculation(that.newPrice);
      // }

      that.showModal = true;
      that.shows = false;
      that.title = this.$t('trade.confrim_order');
      that.getTime();
    },

    fnbalance() {
      let that = this;
      this.$u.api.market.getPayable().then(res=>{
        if (res.length > 0) {
          res.forEach(function(item) {
            if (23 == item.id) {
              that.balance = item.user_wallet.micro_balance;
            }
          })
        }
      })

    },

    // 确定下单
    confirmBtn() {
      const {symbolQuotation} = this
      const {currency_id,legal_id} = symbolQuotation;
      console.log("提交订单.currency_id==>"+currency_id);


      var that = this;
      // if (!that.leverOrder.passwords) {
      // 	that.$utils.showLayer(this.$t('login.e_pdeal'));
      // 	return false;
      // }
      that.showModal = false;
      // http://www.abubn.com/api/microtrade/submit
      // type 1买涨 2 买跌
      // currency_id 币种名称
      // seconds 秒数
      // number 购买数量
      // match_id 行情id
      let type = that.leverTradeType == 'buy' ? 1 : 2;

          let seconds = that.second[that.secondindex].seconds;
          let number = that.leverOrder.share;
         let  match_id = that.match_id;
      this.$u.api.market.submitOption(type,currency_id,seconds,number,match_id).then(res=>{
            clearTimeout(that.set);
            clearInterval(that.sets);
            that.lists();
            if (res.id) {

              uni.showToast({
                icon: 'none',
                title: con,
                // duration:10000
              });

            } else {
              //that.$utils.showLayer(res);
              uni.showToast({
                icon: 'none',
                title: res,
                // duration:10000
              });
            }
            that.fnbalance();
            that.lists();
            that.modalName = "DialogModal1";
            that.Direction = res.type_name;
            that.quantity = res.number;
            that.Purchase = res.open_price;
            that.inbtc = res.symbol_name;
            that.numtatus = res.status;
            that.numpen_price = res.open_price;
            that.numype = res.type;
            that.numrofit_ratio = res.profit_ratio;
            that.loss_ratio = res.loss_ratio;
            that.numumber = res.number;
            that.secon = res.seconds;
            that.inid = res.id;
            that.fact_profits = null;
            that.profit_result = '';
            that.fn(res.seconds);
            // if (res.status == 1 && (res.open_price - 0) == (that.newprice - 0)) {
            // 	that.gains = 0;
            // } else if (res.status == 1 && res.type == 1 && (res.open_price - 0) > (that.newprice - 0)) {
            // 	that.gains = "-" + res.number * that.newprice;
            // } else if (res.status == 1 && res.type == 1 && (res.open_price - 0) < (that.newprice - 0)) {
            // 	that.gains = (res.number * res.profit_ratio * res.open_price - 0) / 100;
            // } else if (res.status == 1 && res.type == 2 && (res.open_price - 0) > (that.newprice - 0)) {
            // 	(res.number * res.profit_ratio * res.open_price - 0) / 100
            // } else if (res.status == 1 && res.type == 2 && (res.open_price - 0) < (that.newprice - 0)) {
            // 	that.gains = "-" + (res.number * res.open_price - 0);
            // }
            // watch:{
            // 	sellList:function(val){
            // 		console.log(val)
            // 		console.log(1)
            // 		var that = this;
            // 		if (that.numtatus == 1 && (that.numpen_price - 0) == (that.newprice - 0)) {
            // 			that.gains = 0;
            // 			console.log(1,that.newprice,that.numpen_price)
            // 		} else if (that.numtatus == 1 && that.numype == 1 && (that.numpen_price - 0) > (that.newprice - 0)) {
            // 			that.gains = "-" + that.numumber * that.newprice;
            // 			console.log(2,that.newprice,that.numpen_price)
            // 		} else if (that.numtatus == 1 && that.numype == 1 && (that.numpen_price - 0) < (that.newprice - 0)) {
            // 			that.gains = (that.numumber * that.numrofit_ratio * that.numpen_price - 0) / 100;
            // 			console.log(3,that.newprice,that.numpen_price)
            // 		} else if (that.numtatus == 1 && that.numype == 2 && (that.numpen_price - 0) > (that.newprice - 0)) {
            // 			(that.numumber * that.numrofit_ratio * that.numpen_price - 0) / 100
            // 			console.log(4,that.newprice,that.numpen_price)
            // 		} else if (that.numtatus == 1 && that.numype == 2 && (that.numpen_price - 0) < (that.newprice - 0)) {
            // 			that.gains = "-" + (that.numumber * that.numpen_price - 0);
            // 			console.log(5,that.newprice,that.numpen_price)
            // 		}
            // 	}
            // },
          }
      );
    },
    Djs_time() {
      this.sets = setInterval(() => {
        var presentTime = new Date().getTime();
        this.CountDown = presentTime;
      }, 200);
    },
    fn(data) {
      var that = this;
      // setTimeout(() => {
      // 	that.percent = 0;
      // }, 1000)
      // setTimeout(() => {
      // 	that.percent = 100;
      // }, 1000)
      // that.intiem = setInterval(() => {
      // 	setTimeout(() => {
      // 		that.percent = 0;
      // 	}, 1000)
      // 	setTimeout(() => {
      // 		that.percent = 100;
      // 	}, 1000)
      // }, 2000)
      that.entiem = setInterval(() => {
        that.secon -= 1;
        // that.percent = that.secon - that.secon * 0.01
        if (that.secon <= 0) {
          // clearInterval(that.intiem);
          clearInterval(that.entiem);
          that.stattiem = setInterval(() => {
            that.$utils.initDataToken({
                  url: 'microtrade/getOrder',
                  type: 'GET',
                  data: {
                    id: that.inid
                  }
                },
                res => {
                  if (res[0].status == 3) {
                    clearInterval(that.stattiem);
                    that.altup = res[0].type; //type
                    that.fact_profits = res[0].fact_profits;
                    that.profit_result = res[0].profit_result;
                    that.altstatus = res[0].status;
                  }
                });
          }, 1000)
        }
      }, 1000)
    },


  },
  computed: {
    lockming() {
      return lockming
    },
    i18n() {
      return this.$t("transaction")
    },
    symbol() {
      return this.currency_name + '/' + this.legal_name
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

  },
  watch:{
    multiple(){
      this.calc()
    },
    number(){
      this.calc()
    },
    'symbolQuotation.now_price'(){
      this.calc()
    }
  },
  onHide(){

  },
  onUnload() {

  }
}
</script>

<style lang="scss" scoped>
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
    border-top: 2rpx solid rgba(0, 0, 0, .04);
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

.btn {

  text-align: center;
  padding: 14rpx 0;
  background-size: 100% 100%;
  color: rgba(255, 255, 255, .9);
  border-radius: 8rpx;

  &.btn1 {
    background-image: url('../../static/image/icon/k-icon-1-none.png');

    &.active {
      background-image: url('../../static/image/icon/k-icon-1.png');
    }
  }

  &.btn2 {
    background-image: url('../../static/image/icon/k-icon-2-none.png');

    &.active {
      background-image: url('../../static/image/icon/k-icon-2.png');
    }
  }
}


.buy-type {
  .item {
    &::after {
      display: block;
      content: "";
      width: 70%;
      background-color: #ffffff;
      margin: 0 auto;
      height: 4rpx;
      border-radius: 6rpx;
      margin-top: 4rpx;
      transition: all .3s ease 0s;
    }

    &.active {
      &::after {
        background-color: #2A64FB;

      }
    }
  }
}

.slide-button{
  width: 33rpx;
  height: 46rpx;
  border: 2rpx solid rgba(51,51,51,.2);
  background-color: #fff;
  border-radius: 6rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  text{
    display: block;
    width: 2rpx;
    height: 60%;
    margin: 0 2rpx;
    background-color: rgba(51,51,51,.2);
  }
}

.trade-input{
  border: 2rpx solid #eee;
  border-radius: 10rpx;
  display: block;
  padding: 10rpx 20rpx;
  font-weight: bold;
  .input-placeholder{
    color: rgba(51, 51, 51, 0.4);
    font-weight: normal;
  }
}
.activeTab{
  color: #2A64FB;
}
.inActiveTab{
  color: #000;
}
</style>
