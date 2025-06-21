<template>
  <view style="background: #000000;">
	<l-common-navbar :isCustomBack="true" @back="$utils.jump('/pages/fund/assets','switchTab')" />
    <view style="background: #000000;margin:0px;">
      <u-popup v-model="showFromList" mode="bottom" length="44%" contentBackgroundColor="#000000"
               :mask-custom-style="{background: 'rgba(0, 0, 0, 0.6)'}" :border-radius="10">
        <view class="popup-list" style="background: #222222;margin-top:0px;padding-top: 20px;">
          <view style="text-align: center;margin-top:-29px;">
            <image src="/static/icon_slide_handle.png"
                   style="width:30px;height:4px;margin-top: 0px;padding-top: 0px;"></image>
          </view>
          <view style="display: flex;justify-content: space-between;margin: 20px;">
            <view style="color: #ffffff;font-weight: 700;font-size: 18px;">{{$t('flash_from')}}</view>
            <view>
              <image src="/static/uzx/icon_wrong_mark_white_24.png" @click="showFromList=false"
                     style="width: 30px;height: 30px;margin:0px;"></image>
            </view>
          </view>
          <view class="popup-list-item" v-for="(item,index) in transferCurrency" :key="item.name">
            <view style="display: flex;justify-content: space-between;margin: 14px;" @click="setFromCoinFn(item)">
              <view style="display: flex;flex-direction: row;flex: 1;">
                <view style="height: 30px;line-height: 30px;">
                  <image :src="item.logo" style="width:30px;height:30px;"></image>
                </view>
                <view style="height: 30px;line-height: 30px;">
                  <text style="color: #ffffff;height: 20px;line-height:20px;margin-left: 8px;margin-top: 10px;">
                    {{ item.name }}
                  </text>
                </view>
              </view>
              <view style="width: 30px;height: 30px;margin:0px;">
                <image src="/static/uzx/icon_coin_select_yes.png" v-if="item.name===fromCoin"
                       style="width: 30px;height: 30px;margin:0px;position: absolute;right:20px;"></image>
                <image src="/static/uzx/icon_coin_select_no.png" v-else
                       style="width: 30px;height: 30px;margin:0px;position: absolute;right:20px;"></image>
              </view>
            </view>
          </view>
          <view style="background: #222222;height: 34px;width: 100%;"></view>
        </view>
      </u-popup>
      <u-popup v-model="showToList" mode="bottom" length="44%" contentBackgroundColor="#000000"
               :mask-custom-style="{background: 'rgba(0, 0, 0, 0.6)'}" :border-radius="10">
        <view class="popup-list" style="background: #222222;margin-top:0px;padding-top: 20px;">
          <view style="text-align: center;margin-top:-29px;">
            <image src="/static/icon_slide_handle.png"
                   style="width:30px;height:4px;margin-top: 0px;padding-top: 0px;"></image>
          </view>
          <view style="display: flex;justify-content: space-between;margin: 20px;">
            <view style="color: #ffffff;font-weight: 700;font-size: 18px;">{{$t('flash_to')}}</view>
            <view>
              <image src="/static/uzx/icon_wrong_mark_white_24.png"  @click="showToList=false"
                     style="width: 30px;height: 30px;margin:0px;"></image>
            </view>
          </view>
          <view class="popup-list-item" v-for="(item,index) in transferCurrency" :key="item.name">
            <view style="display: flex;justify-content: space-between;margin: 14px;" @click="setToCoinFn(item)">
              <view style="display: flex;flex-direction: row;flex: 1;">
                <view style="height: 30px;line-height: 30px;">
                  <image :src="item.logo" style="width:30px;height:30px;"></image>
                </view>
                <view style="height: 30px;line-height: 30px;">
                  <text style="color: #ffffff;height: 20px;line-height:20px;margin-left: 8px;margin-top: 10px;">
                    {{ item.name }}
                  </text>
                </view>
              </view>
              <view style="width: 30px;height: 30px;margin:0px;">
                <image src="/static/uzx/icon_coin_select_yes.png" v-if="item.name===toCoin"
                       style="width: 30px;height: 30px;margin:0px;position: absolute;right:20px;"></image>
                <image src="/static/uzx/icon_coin_select_no.png" v-else
                       style="width: 30px;height: 30px;margin:0px;position: absolute;right:20px;"></image>
              </view>
            </view>
          </view>
          <view style="background: #222222;height: 34px;width: 100%;"></view>
        </view>
      </u-popup>
      <view style="display: flex;margin-top: 30px;">
        <view style="color: #ffffff;font-size: 30px;font-weight: 700;margin-left: 20px;flex: 1;text-align: left;">
          {{ $t("flash_exchange") }}
        </view>
       <!-- <view>
          <image src="/static/icon_to_all.png" style="width: 25px;height: 25px;margin:10px;"></image>
          <image src="/static/uzx/icon_book.png" style="width: 25px;height: 25px;margin:10px;margin-right: 20px;"></image>
        </view> -->
      </view>
      <view style="color: #939393;margin-left: 20px;">{{$t("exchange_tip")}}</view>


      <view class="text-white mt-80" style="background: #000000;border-bottom: none;margin:20px;">
        <view style="display: flex;justify-content: space-between;">
          <view style="color: #ffffff;">{{$t('flash_from')}}</view>
          <view style="color: #939393;">{{$t('fund.available')}}:{{availableCoin}} {{fromCoin}}</view>
        </view>

        <view class="d-flex-between-center pb-30" style="display: flex;">

          <view style="display: flex;flex: 1;">

            <view style="width: 30px;height: 30px;">
              <image :src="fromLogo" style="width: 30px;height: 30px;"></image>
            </view>
            <view class="" @click="showFromList=true"  style="display: flex;">
              <text class="font-weight-bold font-size-32 mr-10" style="color: #ffffff;height: 30px;line-height: 30px;margin-left: 10px;">{{fromCoin}}</text>
              <view>
                <image class="iconfont font-size-70" src="/static/uzx/abc_spinner.png" style="width: 18px;height:24px;margin-top:4px;"></image>
              </view>
            </view>
          </view>
          <view style="flex: 1.3;justify-content: flex-end;text-align: right;display: flex;align-items: center;">
            <input type="digit" v-model="fromAmount" class="input" @input="fromNumberChange" @blur="fromNumberBlur"
                   style="color: #ffffff;font-size: 36rpx;font-weight: 700;margin-right: 0px;" placeholder-style="color:#939393;font-size: 36rpx;font-weight: 700;" placeholder="0.00000"
                   @focus="fromNumberFocus">
			<view @click="fromAmount = availableCoin" style="font-size: 32rpx;color: #00e7ee;min-width: 70rpx;height: 60rpx;line-height: 60rpx;">{{$t('transaction.all')}}</view>
          </view>
        </view>
      </view>
      <view class="text-center my-30">
        <image class="iconfont font-size-70" src="/static/uzx/icon_flash_exchange.png" style="width: 42px;height: 42px;"
               @click="exchange"></image>
      </view>
      <view class="text-white  mt-0" style="background: #000000;border-bottom: none;margin:20px;">
        <view style="color: #ffffff;">{{$t('flash_to')}}</view>
        <view class="d-flex-between-center pb-30" style="display: flex;">
          <view style="display: flex;flex: 1;">
            <view style="width: 30px;height: 30px;">
              <image :src="toLogo" style="width: 30px;height: 30px;"></image>
            </view>
            <view class="" @click="showToList=true"  style="display: flex;">
              <text class="font-weight-bold font-size-32 mr-10" style="color: #ffffff;height: 30px;line-height: 30px;margin-left: 10px;">{{toCoin}}</text>
              <view>
                <image class="iconfont font-size-70" src="/static/uzx/abc_spinner.png" style="width: 18px;height:24px;margin-top:4px;"></image>
              </view>

            </view>
          </view>

          <view style="flex: 1;justify-content: flex-end;text-align: right">
            <input type="digit" disabled v-model="toAmount" class="input" @input="fromNumberChange" @blur="fromNumberBlur"
                   style="color: #ffffff;font-size: 28px;font-weight: 700;" placeholder-style="color:#939393;font-size: 28px;font-weight: 700;" placeholder="0.00000"
                   @focus="fromNumberFocus">
          </view>
        </view>

      </view>

      <view style="display: flex;text-align: center;justify-content: center;align-items: center">
        {{hlTip}}
      </view>
      <button class="warning-button mt-40 connect_btn"
              style="color: #000000;margin-left: 15%;margin-right: 15%;border-radius: 24px;height: 40px;line-height: 40px;"
              @click="submit">{{ this.$t("exchange_now") }}
      </button>
    </view>
  </view>
</template>

<script>
import UImage from "../../uview-ui/components/u-image/u-image.vue";

export default {
  components: {UImage},
  data() {
    return {
      hl:0,
      availableCoin:0,
      hlTip:"",
      fromAmount:"",
      fromCoin: "USDT",
      fromLogo: "/static/uzx/usdt.png",
      toCoin: "BTC",
      toLogo: "/static/uzx/btc.png",
      transferType: 0,//0 资金=》币币..  1:币币到资金
      currentNav: 1,
      nav: [{
        name: this.$t("fund.transfer")
      }, {
        name: this.$t("fund.fundTransfer")
      }],
      from: 0,
      wallet: {},
      transferCurrency: [],
      fromCurrency: {},
      accounts: [],
      fromAccount: {},
      toAccount: {},
      showFromList: false,
      showToList: false,
      showCurrencyList: false,
      balance: 0,
      fromAccounts: [],
      toAccounts: []
    };
  },
  onLoad() {
    this.getPrice();
  },
  onShow() {
    let assetsType = [
      {
        id: 1,
        name: 'legal',
        type: this.$t('assets.fundingAccount'),
      },
      {
        id: 2,
        name: 'change',
        type: this.$t('assets.spotAccount'),
      }, {
        id: 3,
        name: 'lever',
        type: this.$t('assets.futuresAccount'),
      }, {
        id: 4,
        name: 'micro',
        type: this.$t('assets.optionsAccount'),
      },

      {
        id: 5,
        name: 'earn',
        type: this.$t('assets.earnAccount'),
      },
    ]

    this.accounts = assetsType.map(item => {
      item.text = item.type
      return item
    })
    console.log("this.accounts==>" + JSON.stringify(this.accounts));
    this.getUserCurrencyList();

    // 获取币币划转的可用列表
    this.getInitFn();




  },
  methods: {
    async getPrice(){
      let that = this;
	  let fromCoin = this.fromCoin.toLowerCase()
	  let toCoin = this.toCoin.toLowerCase()
	  let close1 = null
	  let close2 = null
	  if(fromCoin === 'usdt' || fromCoin === 'usdc') {
		  close1 = 1
	  }else {
		  close1 = await this.getClose(fromCoin)
	  }
	  if(toCoin === 'usdt' || toCoin === 'usdc') {
		  close2 = 1
	  }else {
		  close2 = await this.getClose(toCoin)
	  }
	  
	  
	  let rate = Number(close1/close2).toFixed(8)
	  this.hlTip = "1 " + this.fromCoin + " =" + rate + " " + this.toCoin;
	  this.hl= rate;
	  return
      // uni.request({
      //   url: 'https://api0912.myshop0816.shop/market/convert/getPrice?fromUnit='+this.fromCoin+'&toUnit='+this.toCoin,
      //   type: 'POST',
      //   success: function (res) {
      //     console.log("价格汇率==>" + JSON.stringify(res));
      //     //1 BTC = 52000 USDT
      //     that.hlTip = "1 " + that.fromCoin + " =" + res.data.data + " " + that
      //         .toCoin;
      //     that.hl=Number(res.data.data);
      //   }

      // });
    },
	getClose(name) {
		return new Promise((resolve,reject) => {
			this.$https.initData({
			  url: 'getHbDetail?coin=' + name.toUpperCase(),
			  type: 'GET'
			},(res,msg)=> {
				let close= Number(res.close);
				resolve(close)
			})
		})
	},
    setFromCoinFn(item) {
      this.fromCoin = item.name;
      this.fromLogo = item.logo;
      this.showFromList = false;
      this.getPrice();

      for (let i=0;i<this.wallet.length;i++){
        let item=this.wallet[i];
        let currencyId=item.currency;
        let legal_balance=item.legal_balance;
        let  currency_name=item.currency_name;
        if (this.fromCoin==currency_name){
          if (this.fromCoin=="USDT"){
            this.availableCoin=Number(legal_balance).toFixed(2);
          }else{
            this.availableCoin=legal_balance;
          }

        }
      }
    },
    setToCoinFn(item) {
      this.toCoin = item.name;
      this.toLogo = item.logo;
      this.showToList = false;

      this.getPrice();
    },

    backFn(){
      // alert(1);
      // uni.switchTab({
      //   url: '/pages/index/index'
      // })

      let back = getCurrentPages();
      if(back && back.length > 1) {
        uni.navigateBack({
          delta: 1
        });
      } else {
        history.back();
      }

    },
    getUserCurrencyList() {
      //getUserCurrencyList: () => vm.$u.get("/currency/user_currency_list"),
      //this.$u.api.wallet.getUserCurrencyList().then(res => {
      this.transferCurrency = [
        {name: "USDT", logo: "/static/uzx/usdt.png"},
        {name: "BTC", logo: "/static/uzx/btc.png"},
        {name: "ETH", logo: "/static/uzx/eth.png"},
        {name: "USDC", logo: "/static/uzx/usdc.png"},
        // {name: "UZX", logo: "/static/uzx/uzx.png"},
      ];


      this.fromCurrency = this.transferCurrency[0]

      this.checkAccount()

    },
    checkAccount() {
      const {fromCurrency, accounts} = this


      this.fromAccounts = this.accounts;
      this.toAccounts = this.accounts;

      if (this.fromAccount.length) {
        this.fromAccount = this.accounts[0]
        if (this.toAccounts.length > 1) {
          this.toAccount = this.accounts[1]
        } else {
          this.toAccount = this.accounts[0]
        }
      }
      this.calcBalance()
    },
    calcBalance() {
      const {fromCurrency, fromAccount} = this
      // if(fromAccount.name == 'legal'){
      // 	this.balance = fromCurrency.wallet.legal_balance
      // }else
      console.log("从哪个帐户==>" + fromAccount.name);



      this.balance = this.availableCoin;



    },

    clickFromActionSheet(i) {

      const {fromAccounts, toAccount} = this
      if (fromAccounts[i].id == toAccount.id) {
        this.exchange()
      } else {
        this.fromAccount = fromAccounts[i]
      }
      this.calcBalance()
      console.log("this.fromAccounts" + JSON.stringify(this.fromAccounts));
    },

    clickToActionSheet(i) {
      const {fromAccount, toAccounts} = this
      if (toAccounts[i].id == fromAccount.id) {
        this.exchange()
      } else {
        this.toAccount = toAccounts[i]
      }
    },
    exchange() {
      let that = this;
      let tmp = that.fromCoin;
      that.fromCoin = that.toCoin;
      that.toCoin = tmp;
      //
      let tmpLogo=that.fromLogo;
      that.fromLogo= that.toLogo;
      that.toLogo= tmpLogo;



      //
      that.getPrice();
      //this.calcBalance();

      for (let i=0;i<that.wallet.length;i++){
        let item=that.wallet[i];
        let currencyId=item.currency;
        let legal_balance=item.legal_balance;
        let  currency_name=item.currency_name;
        if (that.fromCoin==currency_name){
          if (that.fromCoin=="USDT"){
            that.availableCoin=Number(legal_balance).toFixed(2);
          }else{
            that.availableCoin=legal_balance;
          }

        }
      }

    },
    tabsChange(index) {
      if (index != this.currentNav) {
        let lang = uni.getStorageSync('lang') || 'en';
        if (lang === "en") {
          uni.redirectTo({
            url: '/pages/fund/legal_convert_en_u'
          })
        } else {
          uni.redirectTo({
            url: '/pages/fund/legal_convert_u'
          })

        }


      }
    },
    fromNumberChange(e) {
      const {
        balance
      } = this
      const value = Number(e.detail.value)
      if (value > Number(balance)) {
        this.from = Number(balance)
        //return this.$utils.showToast(this.$t("fund.insufficientBalance"))
      }
    },
    fromNumberFocus(e) {
      const value = Number(e.detail.value)
      if (!value) {
        this.from = null
      }
    },
    fromNumberBlur(e) {
      const value = Number(e.detail.value)
      if (!value) {
        this.from = 0
      }
    },
    clickCurrencyActionSheet(index) {
      this.fromCurrency = this.transferCurrency[index]
      this.balance = this.wallet.find(item => item.currency_name === this.fromCoin)
      this.checkAccount()
      setTimeout(() => {
        this.showCurrencyList = false
      }, 500)
    },
    getInitFn(){
      let that = this;
      that.$https.initDataToken({
        url: 'user/getTransferList',
        type: 'POST',
      }, (res, msg) => {
        that.wallet = res.wallet;
        //console.log("this.wallet==>" + JSON.stringify(this.wallet));
        for (let i=0;i<that.wallet.length;i++){
          let item=that.wallet[i];
          let currencyId=item.currency;
          let legal_balance=item.legal_balance;
          let  currency_name=item.currency_name;
          if (that.fromCoin==currency_name){
            if (that.fromCoin=="USDT"){
              that.availableCoin=Number(legal_balance).toFixed(2);
            }else{
              that.availableCoin=legal_balance;
            }

          }
        }

      })
    },
    submit() {
      this.$u.throttle(async () => {
        const {from, fromCoin, toCoin, fromAmount, availableCoin} = this
		if(fromCoin == toCoin) return
        if (!fromAmount || !this.$u.test.amount(fromAmount)) {
          return this.$utils.showToast(this.$t("fund.plsIptCrtNumber"))
        }

        if (Number(fromAmount) > availableCoin) {
          return this.$utils.showToast(this.$t("fund.insufficientBalance"))
        }

        console.log("fromAmount==>"+fromAmount+"  availableCoin=>"+availableCoin);

        const ret = await this.$utils.showModal(this.$t("common.hint"), this.$t("fund.c_transfer"))
        if (!ret) return
        //fundTransfer: (currency_id,number,from_field,to_field) => vm.$u.post("/wallet/change2",{currency_id,number,from_field,to_field}),
        //this.$u.api.wallet.fundTransfer(fromCurrency.id,from,fromAccount.name,toAccount.name).then(res=>{
        let data = {
          fromCoin: fromCoin,
          lang: uni.getStorageSync("lang"),
          toCoin: toCoin,
          fromAmount:fromAmount
        };
        this.$https.initDataToken({
          url: 'ex_v2',
          type: 'POST',
          data
        }, (res, msg) => {
          console.log("兑换结果=="+JSON.stringify(res));
          this.$utils.showToast(res.msg);
          ///pages/fund/assets

          this.getInitFn();

          this.fromAmount="";
          this.toAmount="";


          // setTimeout(() => {
          //   uni.reLaunch({
          //     url: "/pages/index/index"
          //   })
          // }, 1200)



        })

      }, 1000)
    },
  },
  computed: {
    toAmount(){
      if (this.hl>0){
        return (Number(this.fromAmount)*Number(this.hl)).toFixed(6);
      }
      return 0;

    },
    i18n() {
      return this.$t("fund")
    },
    i18ncommon() {
      return this.$t("common")
    }
  },
  watch: {},
  onHide() {

  }
}
</script>

<style lang="scss" scoped>
page {
  background: #000000;
}

.transfer-input-group {

  .input {
    @extend .font-size-60;
    font-weight: bold;
    height: 100 rpx;
    line-height: 100 rpx;
    background-color: transparent;
    border: 1px solid #242424;
    padding: 0 30 rpx;
  }

  .fixed-currency {
    @extend .font-size-32;
    font-weight: bold;
    position: absolute;
    right: 30 rpx;
    bottom: 30 rpx;
  }
}

.popup-list {
  padding-bottom: 50 rpx;

  .popup-list-item {
    height: 96 rpx;
    line-height: 96 rpx;
    padding: 0 30 rpx;
    font-size: 32 rpx;
    position: relative;
    display: flex;
    align-items: center;

    &:before {
      content: "";
      position: absolute;
      left: 30 rpx;
      right: 30 rpx;
      bottom: 0;
      height: 2 rpx;
      //background-color: #efefef;
    }

    &.active {
      //background-color: #f2f6ff;
      &:after {
        content: "";
        width: 36 rpx;
        height: 20 rpx;
        //background-image: url('../../static/image/icon/setting-icon-20.png');
        background-size: cover;
        position: absolute;
        right: 80 rpx;
        top: 50%;
        margin-top: -10rpx;
      }
    }
  }
}
.uni-input-input{
  font-weight: 700;
  font-size: 28px;
}
.connect_btn {
  background: -webkit-gradient(linear, left top, right top, color-stop(10%, #1FA2FF), color-stop(55.21%, #12D8FA), to(#A6FFCB));
  background: -webkit-linear-gradient(left, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
  background: -o-linear-gradient(left, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
  background: linear-gradient(90deg, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);

  //-webkit-background-clip: text;
  //-webkit-text-fill-color: transparent;
  //background-clip: text;
  //text-fill-color: transparent;
  //text-align: center;
}
</style>
