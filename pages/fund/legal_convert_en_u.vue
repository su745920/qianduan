<template>
  <view class="pb-50">
    <u-navbar :title="$t('home.transfer')" showback="true">
      <u-icon name="order" slot="right" size="38"  style="color: #2A64FB"
              @click="$utils.jump('/pages/fund/transfer_history')">
      </u-icon>
    </u-navbar>

    <view class="mx-36 py-20">


      <u-subsection :list="nav" :current="currentNav" @change="tabsChange"
                    :button-color="$upColor"  bg-color="#f7f7f7"></u-subsection>

      <u-action-sheet :list="coinsB" v-model="showSelectB"
                      @click="confirmSelect" :cancelText="i18ncommon.cancel"></u-action-sheet>

      <!-- 转账数量 -->
      <view class="u-border-bottom  pb-16 withdraw-input-wrap pb-16 pt-28 ">
        <view class="d-flex-between-center" v-if="fromCNY">
          <text class="d-block font-size-32" style="color: #666;">{{$t('fund.transferNumber')}}</text>
          <text style="color: #666;">{{i18n.canUse}} {{legal_balance}}</text>
          <view class="select-coin" @click="showSelectB=true">
            <view class="d-flex align-items-center">
              <text class="font-size-32" style="color: #000;">{{selectCoin.text}}</text>
            </view>
            <view class="">
              <text class="iconfont icon-xiala text-ddd font-size-22 ml-16" style="color: #666;"></text>
            </view>
          </view>

        </view>
        <view class="d-flex-between-center" v-else>
          <text class="d-block font-size-32" style="color: #666;">{{$t('fund.transferNumber')}}</text>
          <text style="color: #666;">{{i18n.canUse}} {{usdt_balance}}&nbsp;USDT</text>
        </view>


        <view class="input-group">
          <input type="digit" v-model="number" class="input" :placeholder="$t('convert_hint')"  style="color: #000;"
                 placeholder-style="color:#929292"
                 @blur="checkNumber">
          <text class="absolute-text"  style="color: #2A64FB;"  v-if="fromCNY"
                @click="number=legal_balance;">{{i18n.all}}</text>
          <text class="absolute-text"  style="color: #2A64FB;"  v-else
                @click="number=usdt_balance;">{{i18n.all}}</text>
        </view>
      </view>

      <view class="text-center my-30">
        <text class="iconfont icon-zhuanhuan1 text-warning font-size-70" @click="exchange"></text>
      </view>

      <!-- 到账数量 -->
      <view class="u-border-bottom  pb-16 withdraw-input-wrap pb-16 pt-28 ">
        <view class="d-flex-between-center">
          <text class="d-block font-size-32" style="color: #666;">{{i18n.canGetNumber}}</text>
        </view>

        <view class="input-group" v-if="fromCNY">
          <input type="text" class="input" disabled :value="canGetNumber" style="color: #000;font-weight: 700;">
          <text class="absolute-text"  style="color: #000;">USDT</text>
        </view>
        <view class="input-group d-flex-between-center" v-else>
          <input type="text" class="input" disabled :value="canGetNumber" style="color: #000;font-weight: 700;">

          <view class="select-coin" v-if="lang === 'en' "
                @click="showSelectB=true">
            <view class="d-flex align-items-center">
              <text class="font-size-32" style="color: #000;">{{selectCoin.text}}</text>
            </view>
            <view class="">
              <text class="iconfont icon-xiala text-ddd font-size-22 ml-16" style="color: #666;"></text>
            </view>
          </view>

          <text class="absolute-text"  style="color: #000;"  v-if=" lang==='vi' ">VND</text>
          <text class="absolute-text"  style="color: #000;"  v-if=" lang==='id' ">IDR</text>
          <text class="absolute-text"  style="color: #000;"  v-if=" lang==='th' ">THB</text>
          <text class="absolute-text"  style="color: #000;"  v-if=" lang==='zh' ">CNY</text>



        </view>

      </view>

      <button class="warning-button mt-70"  style="color: #FFFFFF;"
              @click="legalConvert2USDT">{{$t("common.confirm")}}</button>




    </view>
  </view>
</template>
<script>
// 收款
export default {
  data() {
    return {

      lang:'',
      nav: [{
        name: this.$t("fund.legalTransfer")
      }, {
        name: this.$t("fund.fundTransfer")
      }],
      currentNav:0,
      coinsB: [
        {
          id:100,
          text:'USD'
        },{
          id:101,
          text:'EUR'
        },{
          id:102,
          text:'GBP'
        }
      ],
      coins: [
        {
          id:0,
          text:'Select Currency'
        },
        {
          id:23,
          text:'USDT'
        },{
          id:32,
          text:'BTC'
        },{
          id:35,
          text:'ETH'
        }],
      selectCoin:{},
      showSelect:false,
      showSelectB:false,
      min_number:0, //最低提现金额
      legal_balance:0,//余额
      huilv:0,//汇率,
      number:null,
      showSelectAddress:false,
      originWalletAddress:[],
      walletAddress:[],
      selectAddress:{},
      type:0, //0地址，1银行卡,
      card:{},
      card_international: {},
      usdt_balance:0,
      fromCNY:true,
    };
  },
  onLoad() {
    this.selectCoin = this.coinsB[0]
  },
  onShow(){
    this.lang = uni.getStorageSync('lang') || 'en';
    this.getLegalValFn()
  },
  methods: {
    exchange(){
      if (this.fromCNY===true){
        this.fromCNY=false;
      }else{
        this.fromCNY=true;
      }
      this.number='';
      this.canGetNumber='';
    },

    tabsChange(index) {
      if(index != this.currentNav){
        uni.redirectTo({
          url:'/pages/fund/transfer2'
        })
      }
    },
    confirmSelect(index){
      this.selectCoin = this.coinsB[index];
      //console.log("选中的币种==>"+JSON.stringify(this.selectCoin));
      //
      this.getLegalValFn();


    },
    getWalletInfo(){
      const {id:currency} = this.selectCoin
      if (currency>0) {
        let data={lang:uni.getStorageSync("lang")||"en"};
        this.$https.initDataToken({
          url: 'wallet/get_info',
          type: 'POST',
          data
        }, (res, msg) => {

          this.legal_balance = Number(res.legal_balance)
          this.min_number = Number(res.min_number)
          this.rate = Number(res.rate)

        })
      }


    },
    checkNumber(e){
      const {i18n,min_number,selectCoin} = this
      const value = Number(e.detail.value)

      if(value < min_number && value != 0){
        // this.number = min_number
        return this.$utils.showToast(i18n.leastNumber + min_number + selectCoin.text)
      }
    },
    getLegalValFn(){
      let that=this;
      let str=this.selectCoin.text;
      let currency=100;
      if (str=== "USD"){

      }
      if (str=== "EUR"){
        currency=101;
      }
      if (str=== "GBP"){
        currency=102;
      }

      //that.$u.api.wallet.getEnLegalVal(currency).then(res=>{
      //getEnLegalVal: (currency) => vm.$u.post("/wallet/getEnLegalVal?currency="+currency),
      let data={currency:currency,
        lang:uni.getStorageSync("lang")||"en"
      }
      this.$https.initDataToken({
        url: 'wallet/getEnLegalVal',
        data,
        type: 'POST'
      }, (res, msg) => {
        //console.log(JSON.stringify(res));
        let data=res;
        that.legal_balance = Number(data.legal_balance);
        that.huilv=Number(data.huilv);
        that.usdt_balance=Number(data.usdt_balance);
      })
    },
    selectAddressFunc(item){
      this.selectAddress = item
      setTimeout(()=>{
        this.showSelectAddress=false
      },300);
    },
    legalConvert2USDT(){
      let that=this;
      if(!that.number){
        //没有金额
        return this.$utils.showToast(i18n.plsIptWithdrawNumber)
      }
      let str=this.selectCoin.text;
      let currency=100;
      if (str==="USD"){

      }
      if (str==="EUR"){
        currency=101;
      }
      if (str==="GBP"){
        currency=102;
      }
      if (that.fromCNY){

        let data={currency:currency,
          number:that.number,
          lang:uni.getStorageSync("lang")||"en"
        };
        this.$https.initDataToken({
          url: 'wallet/legalConvertEn2USDT',
          data,
          type: 'POST'
        }, (res, msg) => {
          that.$utils.showToast(res)
          that.number = 0;
          setTimeout(() => {
            uni.reLaunch({
              url: "/pages/index/index"
            })
          }, 1200)
        })
      }else{
        let data={currency:currency,
          number:that.number,
          lang:uni.getStorageSync("lang")||"en"
        };
          this.$https.initDataToken({
            url: 'wallet/legalConvertEn2GBP',
            data,
            type: 'POST'
          }, (res, msg) => {
          that.$utils.showToast(res)
          that.number = 0;
          setTimeout(() => {
            uni.reLaunch({
              url: "/pages/index/index"
            })
          }, 1200)
        })
      }


    },
    getCard(){
      let data={lang:uni.getStorageSync("lang")||"en"};
      this.$https.initDataToken({
        url: 'user/cash_info',
        type: 'POST',
        data

      }, (res, msg) => {
        this.card = res;
      })
    },
    getCardInternational(){
      this.$https.initDataToken({
        url: 'user/cash_info_international',
        type: 'POST',
      }, (res, msg) => {
        this.card_international = res
      })
    }
  },
  computed: {
    i18n() {
      return this.$t("fund")
    },
    i18ncommon() {
      return this.$t("common")
    },
    canGetNumber(){
      //console.log("fromCNY="+this.fromCNY);
      if (this.fromCNY) {
        let value = Number(this.number) / Number(this.huilv);
        value = Number(value).toFixed(2);
        if (value > 0) return value
        return 0
      }else {
        let value = Number(this.number)*Number(this.huilv);
        value = Number(value).toFixed(2);
        if (value > 0) return value
        return 0
      }
    }
  },
  watch:{
    'selectCoin.id'(){
      this.getWalletInfo()
      this.walletAddress = this.originWalletAddress.filter(item=>item.currency == this.selectCoin.id)
      this.selectAddress = this.walletAddress.length ? this.walletAddress[0] : {}
    },
  },
}
</script>
<style lang="scss" scoped>
.select-coin {
  @extend .d-flex,
  .align-items-center,
  .justify-content-between;
  border-bottom: 1px solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }

  .type {
    background-color: $uni-color-success;
    border-radius: 22rpx;
    color: #fff;
    padding: 6rpx 18rpx;
    font-size: 20rpx;
  }

  &.cannot {
    view {
      opacity: .3;
    }

    .type {
      background-color: #d6d6d6;
    }
  }
}

.chain {
  margin-top: 16rpx;

  .item {
    font-size: 28rpx;
    height: 46rpx;
    line-height: 46rpx;
    padding: 0 30rpx;
    border-radius: 24rpx;
    border: 1px solid #333;
    color: #333;
    opacity: .5;
    margin-right: 18rpx;

    &.active {
      opacity: 1;
      color: $uni-color-success;
      border-color: $uni-color-success;
      background-color: #e5f8f2;
    }
  }
}

.withdraw-input-wrap {
  .input-group {
    position: relative;

    .input {
      height: 80rpx;
      line-height: 80rpx;
      font-size: 28rpx;
      background: none;
      padding: 0;
    }

    .absolute-btn {
      position: absolute;
      font-size: 22rpx;
      height: 42rpx;
      line-height: 42rpx;
      color: #9fa3ab;
      border-radius: 22rpx;
      background-color: #f2f5fc;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }

    .absolute-text {
      position: absolute;
      font-size: 28rpx;
      color: #296acf;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.withdraw-alert{
  font-size: 22rpx !important;
  padding: 22rpx  34rpx;
  background-color: #4D4D4D;
  margin-top: 54rpx;
  border-radius: 10rpx;
  position: relative;
  &::after{
    content: "";
    display: block;
    width: 28rpx;
    height: 18rpx;
    background: url("/static/image/icon/withdraw-icon-1.png");
    background-size: cover;
    position: absolute;
    top: -18rpx;
    left: 80rpx;
  }
  text{
    line-height: 32rpx;
    display: block;
    color: #ccc !important;
  }
}

.withdraw_type{
  .item{
    position: relative;
    padding-bottom: 8rpx;
    &:after{
      display: block;
      position: absolute;
      content: "";
      left: 30%;
      bottom: 0;
      right: 30%;
      height: 4rpx;
      border-radius: 6rpx;
      background-color: $uni-color-333;
    }
    &.active:after{
      background-color: $uni-color-warning;
    }
  }
}

</style>
