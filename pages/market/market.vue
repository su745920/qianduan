<template>
  <view class="wrapper" style="background: #000000;">
	  <view 
	        style="margin-top:0px;display: flex;position: fixed;z-index: 9998;width: 100%;height: 50px;background: #000000;">
	  
	    <navigator :url="iURL">
	      <image src="/static/bib/icon_home_menu.png"
	             style="width: 28px;height: 28px;position: fixed;left: 10px;top: 12px;z-index: 9999;"></image>
	    </navigator>
	  
		</view>
	<view class="" style="padding: 0 30rpx;box-sizing: border-box;">
		<image src="@/static/bib/image_home_top_login_yes.png" style="width: 100%;height:420px;text-align: center;"></image>
	</view>
    <view style="background: #000000;">
    <view class="status_bar" style="background: #000000;"></view>
      <view style="position: sticky;top: 50px;left: 0;z-index: 10;background: #000000;width: 100%;">
        <view class="d-flex-between-center" style="background: #000000;">
          <div style="display: flex;width:80%;margin: 12px;background: #000000;">
            <div style="font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;"
                 @click="changeTab(0)">
              <span :class="currentNav==0 ?'activeTab':'normalTab' "  v-if="lang === 'zh' ">{{ $t('market.favorites') }}</span>
              <span :class="currentNav==0 ?'activeTab':'normalTab' "  style="width: 100px;" v-else>{{ $t('market.favorites') }}</span>
            </div>
            <div style="font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;margin-left: 30px;"
                 @click="changeTab(1)">
              <span :class="currentNav==1 ?'activeTab':'normalTab' ">{{ $t('market.tabA1') }}</span>
            </div>
            <div style="font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;margin-left: 30px;"
                 @click="changeTab(2)">
              <span :class="currentNav==2 ?'activeTab':'normalTab' ">{{ $t('market.tabA2') }}</span>
            </div>
          </div>
          <image src="/static/icon_search_white_26.png" style="width: 30px;height: 30px;margin: 10px;" @click="$utils.jump('/pages/market/search')"></image>
        </view>

        <view  v-if="currentNav > 0">
          <swiper style="height:60px;" :acceleration="true" :display-multiple-items="5" :indicator-dots="false"
                  @change="gupiaoSwiperChange" indicator-color="rgba(255, 255, 255, 0.6)"
                  indicator-active-color="rgba(7, 193, 96, 0.7)" :autoplay="false" :circular="false">
            <swiper-item v-for="(item,index) in tabList" class="swiper-item8">

              <view class="text-left pl-30 text-white" style="margin-top:30rpx;background: #000000"  @click="changeTabFn(item.id)">

                <view style="display: flex;" :class=" currentTab == item.id ? 'currentTab':'normalTab2024' ">
                  <text class="font-size-26 d-block " v-if="item.name=='FanTokens' "
                        style="flex:1;height: 20px;line-height: 20px;font-weight: 700;text-align: center;">
                    {{ item.name}}
                  </text>
                  <text class="font-size-26 d-block " v-else
                        style="flex: 1;height: 20px;line-height: 20px;font-weight: 700;text-align: center;">
                    {{ item.name}}
                  </text>

                </view>

              </view>

            </swiper-item>
          </swiper>
        </view>
      </view>



      <view class="m-30 market text-white" style="background: #000000;">
      <view class="mt-22" v-show="currentNav == 0"  style="background: #000000;">

        <view class="title d-grid" style="grid-template-columns:1.1fr 1fr 1fr;display: flex;">



          <text style="color: #929292;font-weight: 300;font-size: 12px;text-align: left;flex: 3;"
          >{{quotationNav[0].name}}</text>

          <text style="color: #929292;font-weight: 300;font-size: 12px;text-align: right;flex: 2;justify-content: right;"
          >{{quotationNav[1].name}}</text>

          <text style="color: #929292;font-weight: 300;font-size: 12px;text-align: right;flex: 2;justify-content: right;"
          >{{quotationNav[2].name}}</text>





        </view>
        <view v-for="item in optionalList">
          <navigator class="market-item"  open-type="reLaunch"
                     style="display: flex;margin-top: 60px;"
                     v-if="item.currencyName!='SHIB'&&item.currencyName!='BICN'&&item.currencyName!='LPQ'&&item.currencyName!='AOQ' "
                     :url="`/pages/transaction/spot_kline?from=market&currency_name=${item.currencyName}&legal_name=USDT&currency_id=${item.id}`">


            <view class="left"  style="flex: 3;">
              <text class="d-block">
                <text class="font-size-32 font-weight-bold" style="color: #ffffff;">{{item.currencyName}}</text>
                <text class="font-size-22" style="color: #939393">/USDT</text>
              </text>
              <text class="d-block font-size-22" style="color: #939393">24H: {{Number(item.volume) | setPrecision(item.precision_length)}}</text>
            </view>
            <view class="text-center" style="flex: 2;justify-content: right;text-align: right;">
              <text class="d-block font-size-32 font-weight-bold"
                    :style="{color:$utils.getColor(item.change)}">{{Number(item.close)  | setPrecision(item.precision_length)}}</text>
              <text class="d-block font-size-22" v-if="$store.state.fiat.currency_code != 'USD'">
                {{(item.now_price * $store.state.fiat.rate)  | setPrecision(item.precision_length) }} {{$store.state.fiat.currency_code}}
              </text>
            </view>
            <view class=""  style="flex: 2;">
              <view class="right" :style="{backgroundColor:$utils.getColor(item.change)}">
                <span style="color: #ffffff;" v-if="item.change>0">+</span>{{Number(item.change).toFixed(2)}}%
              </view>
            </view>



          </navigator>
        </view>



      </view>

      <view class="mt-22" v-show="currentNav == 1"  style="background: #000000;"> <!-- 现货 -->
        <view class="title d-grid" style="grid-template-columns:1.1fr 1fr 1fr;display: flex;margin-top: 20px;">
          <text style="color: #929292;font-weight: 300;font-size: 12px;text-align: left;flex: 3;"
          >{{quotationNav[0].name}}</text>

          <text style="color: #929292;font-weight: 300;font-size: 12px;text-align: right;flex: 2;justify-content: right;"
          >{{quotationNav[1].name}}</text>

          <text style="color: #929292;font-weight: 300;font-size: 12px;text-align: right;flex: 2;justify-content: right;"
          >{{quotationNav[2].name}}</text>






        </view>

        <view v-for="item in quotation">
          <navigator class="market-item"
                     style="display: flex;"
                     open-type="reLaunch"
                     v-if="item.currencyName!='SHIB'&&item.currencyName!='BICN'&&item.currencyName!='LPQ'&&item.currencyName!='AOQ' "
                     :url="`/pages/transaction/spot_kline?from=market&currency_name=${item.currencyName}&legal_name=USDT&currency_id=${item.id}`">



            <view class="left"  style="flex: 3;">
              <text class="d-block">
                <text class="font-size-32 font-weight-bold" style="color: #ffffff;">{{item.currencyName}}</text>
                <text class="font-size-22" style="color: #939393">/USDT</text>
              </text>
              <text class="d-block font-size-22" style="color: #939393">24H: {{Number(item.volume) | setPrecision(item.precision_length)}}</text>
            </view>
            <view class="text-center" style="flex: 2;justify-content: right;text-align: right;">
              <text class="d-block font-size-32 font-weight-bold"
                    :style="{color:$utils.getColor(item.change)}">{{Number(item.close)  | setPrecision(item.precision_length)}}</text>
              <text class="d-block font-size-22" v-if="$store.state.fiat.currency_code != 'USD'">
                {{(item.now_price * $store.state.fiat.rate)  | setPrecision(item.precision_length) }} {{$store.state.fiat.currency_code}}
              </text>
            </view>
            <view class=""  style="flex: 2;">
              <view class="right" :style="{backgroundColor:$utils.getColor(item.change)}">
                <span style="color: #ffffff;" v-if="item.change>0">+</span>{{Number(item.change).toFixed(2)}}%
              </view>
            </view>



          </navigator>
        </view>

      </view>

      <view class="mt-22" v-show="currentNav == 2"  style="background: #000000;"><!--合约-->
        <view class="title d-grid" style="grid-template-columns:1.1fr 1fr 1fr;display: flex;margin-top: 20px;">



          <text style="color: #929292;font-weight: 300;font-size: 12px;text-align: left;flex: 3;"
          >{{quotationNav[0].name}}</text>

          <text style="color: #929292;font-weight: 300;font-size: 12px;text-align: right;flex: 2;justify-content: right;"
          >{{quotationNav[1].name}}</text>

          <text style="color: #929292;font-weight: 300;font-size: 12px;text-align: right;flex: 2;justify-content: right;"
          >{{quotationNav[2].name}}</text>





        </view>

        <view  v-for="item in quotation">
          <navigator class="market-item"
                     open-type="reLaunch"
                     style="display: flex;"
                     v-if="item.currencyName!='SHIB'&&item.currencyName!='BICN'&&item.currencyName!='LPQ'&&item.currencyName!='AOQ' "
                     :url="`/pages/transaction/contract_kline?from=market&currency_name=${item.currencyName}&legal_name=USDT&currency_id=${item.id}`">
            <view class="left" style="flex: 3;">
              <view class="d-block" style="display: flex;flex-direction: row;width:160px;">
                <text class="font-size-32 font-weight-bold" style="color: #ffffff;">{{item.currencyName}}USDT</text>
                <view style="background:transparent;width: 30px;height: 20px;margin-left: 3px;border-radius: 2px;">
                  <text style="color: #ffffff;font-size: 10px;text-align: center;margin-left: 3px;">{{$t('perp')}}</text>
                </view>
              </view>
              <text class="d-block font-size-22 opacity-50">24H: {{Number(item.volume) | setPrecision(item.precision_length)}}</text>
            </view>
            <view class="text-center" style="flex: 2;justify-content: right;text-align: right;">
              <text class="d-block font-size-32 font-weight-bold"
                    :style="{color:$utils.getColor(item.change)}">{{Number(item.close)  | setPrecision(item.precision_length)}}</text>
              <text class="d-block font-size-22" v-if="$store.state.fiat.currency_code != 'USD'">
                {{(item.now_price * $store.state.fiat.rate)  | setPrecision(item.precision_length) }} {{$store.state.fiat.currency_code}}
              </text>
            </view>
            <view class="" style="flex: 2;">
              <view class="right" :style="{backgroundColor:$utils.getColor(item.change)}">
                <span style="color: #ffffff;" v-if="item.change>0">+</span>{{Number(item.change).toFixed(2)}}%
              </view>
            </view>
          </navigator>
        </view>



      </view>


    </view>
    </view>

  </view>
</template>

<script>
import io from '@/js_sdk/hyoga-uni-socket_io/uni-socket.io.js';
import $ from '@/static/jquery.js'
export default {
  data() {
    return {
	  hasChange: false,
	  iURL:'',
      currentTab:0,
      lang: '',
      currentNav: 2,

      quotation: [],
      quotationOriginal: [],
      socket: null,
      optionalList:[],//添加自选
      pushUUID: "",
      tabList:[
        {name:this.$t('market.all'),id:0},
        {name:this.$t('market.top'),id:1},
        {name:'Meme',id:2},
        {name:'PoW',id:3},
        {name:this.$t('market.hk'),id:4},
        {name:'GameFi',id:5},

        {name:'layer 1',id:6},
        {name:'layer 2',id:7},
        {name:'PoS',id:9},
        {name:'Defi',id:10},
        {name:this.$t('market.fan_tokens'),id:11},
        {name:this.$t('market.nft'),id:12},

        {name:'SocialFi',id:13},
        {name:'AI',id:14},
        {name:this.$t('market.meta_verse'),id:15},
        {name:'Web3',id:16},
        {name:'DAO',id:17},
        {name:this.$t('market.stablecoins'),id:18},
      ]
    };
  },
  onLoad() {
    const _this = this
    uni.setNavigationBarTitle({
      title:_this.$t("home.market")
    });
    this.getQuotation();
  },
  onShow() {
    let token=uni.getStorageSync("token");
    if (token==null||token.length<10){
      uni.redirectTo({
        url:'/pages/setting/left_menu'
      })
    }else {

      this.lang = this.$store.state.lang || 'en'

      let pushUUID = uni.getStorageSync("pushUUID");
      if (pushUUID == null || pushUUID.length < 10) {
        pushUUID = this.uuid();

        uni.setStorageSync('pushUUID', pushUUID)
      }
      this.pushUUID = pushUUID;

      this.okxWS();
	  
      let token=uni.getStorageSync("token");
	  token=uni.getStorageSync("token");
	  if (!token||token.length<10){
	    this.iURL="/pages/setting/left_menu"
	  }else{
	    this.iURL="/pages/setting/left_menu"
	  }
      if (token&&token.length>10) {
        this.$https.initDataToken({
          url: 'setOnline',
          type: 'POST',
        }, (res, msg) => {
          console.log("设置在线" + JSON.stringify(res));
        });
      }
    }

  },
  methods: {
    changeTabFn(itemId){
      this.currentTab= itemId;
      if (itemId<=0) {
        this.quotation = this.quotationOriginal;
      }else {
        this.quotation=[];
        for (let i=0;i<this.quotationOriginal.length;i++){
          let po=this.quotationOriginal[i];

          if (itemId==1) {
            if (i % 3 == 1) {
              this.quotation.push(po);
            }
          }
          if (itemId==2) {
            if (i % 4 == 1) {
              this.quotation.push(po);
            }
          }
          if (itemId==3) {
            if (i % 4 == 2) {
              this.quotation.push(po);
            }
          }
          if (itemId==4) {
            if (i % 5 == 2) {
              this.quotation.push(po);
            }
          }
          if (itemId==5) {
            if (i % 6 == 2) {
              this.quotation.push(po);
            }
          }
          if (itemId==6) {
            if (i % 7 == 2) {
              this.quotation.push(po);
            }
          }
          if (itemId==7) {
            if (i % 8 == 2) {
              this.quotation.push(po);
            }
          }
          if (itemId==8) {
            if (i % 8 == 3) {
              this.quotation.push(po);
            }
          }
          if (itemId==9) {
            if (i % 8 == 4) {
              this.quotation.push(po);
            }
          }
          if (itemId==10) {
            if (i % 10 == 0) {
              this.quotation.push(po);
            }
          }
          if (itemId==11) {
            if (i % 3 == 0) {
              this.quotation.push(po);
            }
          }
          if (itemId==12) {
            if (i % 3 == 1) {
              this.quotation.push(po);
            }
          }
          if (itemId==13) {
            if (i % 3 == 2) {
              this.quotation.push(po);
            }
          }
          if (itemId==14) {
            if (i % 4 == 3) {
              this.quotation.push(po);
            }
          }
          if (itemId==15) {
            if (i % 5 == 3) {
              this.quotation.push(po);
            }
          }

          if (itemId==16) {
            if (i % 3 == 2) {
              this.quotation.push(po);
            }
          }
          if (itemId==17) {
            if (i % 4 == 3) {
              this.quotation.push(po);
            }
          }
          if (itemId==18) {
            if (i % 5 == 3) {
              this.quotation.push(po);
            }
          }

        }
      }

    },
    uuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      return uuid;
    },

    okxWS() {
      let that = this;
      let userId = that.pushUUID;
      let url = 'wss://api.coinonebtc.xyz/market/websocket2/' + userId;
      console.log("URL==>" + url);
      uni.connectSocket({
        url: url
      });

      uni.onSocketOpen(function (res) {
        console.log('WebSocket连接已打开！');
        that.socketOpen = true;
      });

      uni.onSocketError(function (res) {
        console.log('WebSocket连接打开失败，请检查！');
      });
      uni.onSocketMessage(function (res) {
        try {
          let data = res.data;

          data = JSON.parse(data);
          let coin = data.coin;

          let msgTxt = data.msgTxt;

          msgTxt = JSON.parse(msgTxt);
          let e = msgTxt.e;
          if (e === "kline") {
            let k = msgTxt.k;

            let change=data.change;//0619修改

            //console.log('收到服务器内容data00000==>' + JSON.stringify(k));
            if (that.quotation != null && that.quotation.length > 0) {
              for (let i = 0; i < that.quotation.length; i++) {
                let jo = that.quotation[i];
                let symbol = jo.currencyName;

                symbol = symbol.toLowerCase();
                let close = k.c;
                let high = k.h;
                let vol = k.v;
                let low = k.l;
                let open = k.o;
                let symbolStr = symbol + "USDT";
                if (symbol == coin) {
                  close = Number(close).toFixed(2);
                  jo.price = close;
                  jo.close = close;
                  jo.high = high;
                  jo.low = low;
                  jo.volume = vol;
                  jo.usdRate = close;

                  jo.change = change.toFixed(2);//0619修改


                }


              }
            }
          }
        }catch (e){
          console.log(e);
        }



      });

    },
    changeTab(tab) {
      this.currentNav=tab;
      if (tab==0){
        this.favListFn();
      }
    },
    navChangeFunc(val) {
      this.currentNav = val
    },

    getQuotation() {
      // const ret = this.$u.api.market.getOptionalList();
        // const optionalList = ret.message;
      const optionalList = [];
        let that = this;
      uni.request({
        url: "https://api.coinonebtc.xyz/market/binance/redis/getLatestQuotations",
        type: "GET",
        dataType: "json",
        success: function (response) {

          let quotationList = response.data.data;
          that.quotationOriginal=quotationList;


          if (optionalList&&optionalList.length>0) {
            let optional = []
            optionalList.forEach(item => {
              const has = that.quotationOriginal.find(el => item.id == el.currency_id)
              if (has) optional.push(has)
            })
            that.optionalList = optional
          } else {
            that.currentNav = 2;
            that.optionalList = []
          }



            that.setData(that.quotationOriginal);

          uni.setStorageSync('quotation', this.quotation);

          //   that.$u.api.market.getOptionalList().then(async res => {
          //
          //   });




        }

      });

    },

    setData(list){
      this.quotation = list;

    },

    favListFn() {
      let that = this;
      that.token=uni.getStorageSync("token");
      if (!that.token||that.token.length<10){
        uni.redirectTo({
          url:'/pages/setting/left_menu'
        })
      }else {
        let newFavList = [];
        this.$https.initDataToken({
          url: 'optional/list',
          type: 'GET'
        }, (data, msg) => {
          if (data) {
            let favList = data;//自选List=>[{"id":13,"symbol":"BTC/USDT","memberId":600840,"addTime":"2024-02-18 16:56:23"}]
            if (favList && favList.length > 0) {

              for (let i = 0; i < favList.length; i++) {
                let item = favList[i];
                let currency_id = item.currency_id;
                //console.log("currency_id=>" + currency_id);
                let newItem = that.getRealCoin(currency_id);
                if (newItem) {
                  newFavList.push(newItem);
                }
              }
              that.optionalList = newFavList;//currencyName
            }
            //console.log("自选List=>" + JSON.stringify(that.optionalList));
          }

          //
        })
      }
    },

    getRealCoin(favCoinID){
      for (let i=0;i<this.quotationOriginal.length;i++){
        let item=this.quotationOriginal[i];
        let currencyID=item.id;
        if (currencyID === favCoinID){
          return item;
        }
      }
      return null;
    },


    sort(index = 0) {
      const {quotationNav} = this
      let navItem = quotationNav[index]
      let sort
      if(navItem.sort == 'none'){
        sort = 'up'
        navItem.sort  = 'up'
      }else if(navItem.sort == 'up'){
        sort = 'down'
        navItem.sort  = 'down'
      }else{
        sort = 'none'
        navItem.sort  = 'none'
      }
      this.quotationNav.splice(index,1,navItem)

      let sortMethod = null
      if (sort == 'none') {
        this.quotation = this.quotationOriginal
      }else{
        if (index == 0) {
          //对交易对做排序
          if (sort == 'up') {
            sortMethod = (a, b) => (a.currency_name + '').localeCompare(b.currency_name + '')
          } else {
            sortMethod = (a, b) => (b.currency_name + '').localeCompare(a.currency_name + '')
          }
        } else if (index == 1) {
          if (sort == 'up') {
            sortMethod = (a, b) => Number(a.now_price) - Number(b.now_price)
          } else {
            sortMethod = (a, b) => Number(b.now_price) - Number(a.now_price)
          }
        } else if (index == 2) {
          if (sort == 'up') {
            sortMethod = (a, b) => Number(a.change) - Number(b.change)
          } else {
            sortMethod = (a, b) => Number(b.change) - Number(a.change)
          }
        }
        this.quotation = this.quotation.sort(sortMethod)
      }
    },


  },
  computed: {
    i18n() {
      return this.$t("transaction")
    },
    navs: [],
    navs(){
      const i18n = this.$t("transaction")
      return [{
        name: i18n.favorites
      }, {
        name: "USDT"
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
  },
  onHide(){

  },
  onUnload() {

  }

}
</script>

<style lang="scss">
page{
  background: #000000;
}
.wrapper{
  // position: relative;
  // z-index: 10;
  &::after{
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom:0;
    background: #ffffff;
    background-size: contain;
    background-position:center 30vh;
    background-repeat: no-repeat;
    background-attachment: fixed;
    z-index: -1;
  }
}
.market {
  .market-item {
    overflow: hidden;
    padding: 32rpx 0;
    //border-bottom: 1px solid rgba(0,0,0,.022);
    align-items: center;
    display: grid;
    grid-template-columns:1.1fr 1fr 1fr;

    .right {
      margin-left: auto;
      width: 150rpx;
      height: 50rpx;
      line-height:50rpx;
      text-align: center;
      border-radius: 10rpx;
      background-color: #15be97;
      color: #fff;
      font-size: 30rpx;
    }
  }
}
.activeTab {
  color: #ffffff;
  width: 100px;
  border-width: 12px;
  padding-bottom: 8px;
  font-size: 16px;
  font-weight: 700;
}

.normalTab {
  width: 100px;
  border-width: 12px;
  padding-bottom: 8px;
  color: #999999;
  font-size: 16px;
  font-weight: 700;
}
.swiper-container {
  overflow: visible;
}

.swiper-wrapper {
  /* 通过改变animation-timing-function 制作弹性切换效果 */
  transition: .2s cubic-bezier(0.68, -0.2, 0.27, 1.34) .05s;
}
.swiper-item8:hover {
  background: transparent;
}
.currentTab{
  background: #ffffff;
  padding-left: 3px;
  padding-right: 3px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 16px;
  color: #000000;
}
.normalTab2024{
  background: #1f1f1f;
  color: #fffff;
  padding-left: 3px;
  padding-right: 3px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 16px;
}
</style>
