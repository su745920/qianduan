<template>
  <view class="pb-50">
    <u-navbar :title="$t('home.transfer')" showback="true"  :custom-back="goBackFn">
      <image src="/static/icon_to_all.png" slot="right"
             @click="$utils.jump('/pages/fund/transfer_history')"
             style="width:20px;height:20px;text-align: right;"></image>
    </u-navbar>
    <view class="m-30">
<!--      <u-subsection :list="nav" :current="currentNav" @change="tabsChange"-->
<!--                    :button-color="$upColor"  bg-color="#242424"></u-subsection>-->

      <u-popup v-model="showCurrencyList" mode="bottom" length="60%" :title="i18n.selectCurrency">
        <view class="popup-list">
          <view class="popup-list-item" v-for="(item,index) in transferCurrency" :key="item.text" :class="{active : fromCurrency.id == item.id}" @click="clickCurrencyActionSheet(index)"  >
            <text>{{item.text}}</text>
          </view>
        </view>
      </u-popup>
      <view class="bg-black text-white border-radius-10 p-30 mt-30">
        <view class="d-flex-between-center pb-30"  style="border-bottom: 1px solid #242424;">
          <text class="font-size-32"  style="color: #939393;">{{i18n.from}}</text>
          <view class="" @click="showFromList=true">
            <text class="font-weight-bold font-size-32 mr-10" style="color: #ffffff;">{{fromAccount.text}}</text>
            <u-icon name="arrow-down" size="32" style="color: #939393;"></u-icon>
          </view>
        </view>
        <u-action-sheet :list="fromAccounts" v-model="showFromList" @click="clickFromActionSheet"
                        :cancelText="i18ncommon.cancel">
        </u-action-sheet>
        <view class="mt-30 transfer-input-group" v-if="false">
          <text class="d-block opacity-75 font-size-28"  style="color: #939393;">{{i18n.transferNumber}}</text>
          <view class="position-relative mt-20">
            <input type="digit" v-model="from" class="input" @input="fromNumberChange" @blur="fromNumberBlur" style="color: #000;"
                   @focus="fromNumberFocus">
            <text class="fixed-currency"  style="color: #ffffff;">{{fromCurrency.name}}</text>
          </view>
        </view>
      </view>
      <view class="text-center my-30">

        <image class="iconfont font-size-70" src="/static/icon_transition.png" style="width: 32px;height: 32px;"  @click="exchange"></image>
      </view>
      <view class="bg-black text-white border-radius-10 p-30 mt-30">
        <view class="d-flex-between-center pb-30" style="border-bottom: 1px solid #242424;">
          <text class="font-size-32" style="color: #939393;">{{i18n.to}}</text>
          <view class="" @click="showToList=true">
            <text class="font-weight-bold font-size-32 mr-10"  style="color: #ffffff;">{{toAccount.text}}</text>
            <u-icon name="arrow-down" size="32"  style="color: #939393;"></u-icon>
          </view>
        </view>
        <u-action-sheet :list="toAccounts" v-model="showToList" @click="clickToActionSheet" :cancelText="i18ncommon.cancel">
        </u-action-sheet>
      </view>
      <view class="bg-black text-white border-radius-10 p-30 mt-30 d-flex-between-center">
        <text class="font-size-22" style="color: #000;">{{i18n.selectCurrency}}</text>
        <view class="" @click="showCurrencyList=true">
          <text class="font-weight-bold font-size-32 mr-10"  style="color: #ffffff;">{{fromCurrency.name}}</text>
          <u-icon name="arrow-down" size="32" style="color: #929292"></u-icon>
        </view>
      </view>
      <view class="bg-black text-white p-30 mt-0">
        <view class="mt-30 transfer-input-group">

          <view style="display: flex;" class="d-flex-between-center">
            <text class="d-block font-size-28"  style="color: #939393;">{{i18n.transferNumber}}</text>
            <view class="d-flex align-items-center">
				<view @click="from = balance" style="font-size: 32rpx;color: #00e7ee;min-width: 70rpx;height: 60rpx;line-height: 60rpx;">{{$t('transaction.all')}}</view>
              <text class="font-size-22" style="color: #939393;">{{i18n.availableQuota}}:</text>
              <text class="font-weight-bold font-size-28" style="color: #ffffff;margin-left: 3px;">{{Number(balance)}}</text>
            </view>
          </view>
          <view class="position-relative mt-20" style="background: #000000;">
            <input type="digit" v-model="from" class="input" @input="fromNumberChange" @blur="fromNumberBlur" style="color: #ffffff;"
                   @focus="fromNumberFocus">
            <text class="fixed-currency"  style="color: #ffffff;">{{fromCurrency.name}}</text>
          </view>
        </view>
      </view>
      <button class="warning-button mt-50 connect_btn"  style="color: #000000;"
              @click="submit">{{this.$t("common.confirm")}}</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      transferType:0,//0 资金=》币币..  1:币币到资金
      currentNav:1,
      nav: [{
        name: this.$t("fund.transfer")
      }, {
        name: this.$t("fund.fundTransfer")
      }],
      from:0,
      wallet:{},
      transferCurrency:[],
      fromCurrency:{},
      accounts:[],
      fromAccount:{},
      toAccount:{},
      showFromList:false,
      showToList:false,
      showCurrencyList:false,
      balance:0,
      fromAccounts:[],
      toAccounts:[]
    };
  },
  onLoad() {

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

    this.accounts = assetsType.map(item=>{
      item.text = item.type
      return item
    })
    this.getUserCurrencyList();

    // 获取币币划转的可用列表

    this.$https.initDataToken({
      url: 'user/getTransferList',
      type: 'POST',

    }, (res, msg) => {
      this.wallet  = res.wallet;
    })
  },
  methods: {
    goBackFn(){
      uni.switchTab({
        url: "/pages/fund/assets"
      })
    },
    getUserCurrencyList(){
      //getUserCurrencyList: () => vm.$u.get("/currency/user_currency_list"),
      //this.$u.api.wallet.getUserCurrencyList().then(res => {
      this.$https.initDataToken({
        url: 'currency/user_currency_list',
        type: 'GET',
      }, (res, msg) => {
        let _transferCurrency = res.map(item=>{
          item.text = item.name
          return item
        });
        this.transferCurrency=[];
        for(let i=0;i<_transferCurrency.length;i++){
          let item=_transferCurrency[i];
          //if (item.name === "USDT"||item.name === "BTC" ||item.name === "ETH"){
            this.transferCurrency.push(item);
          //}
        }
        this.fromCurrency = this.transferCurrency[0]

        this.checkAccount()
      })
    },
    checkAccount(){
      const {fromCurrency,accounts} = this
      this.fromAccounts = this.accounts;
      this.toAccounts = this.accounts;

      if(this.fromAccount.length){
        this.fromAccount = this.accounts[0]
        if(this.toAccounts.length > 1){
          this.toAccount = this.accounts[1]
        }else{
          this.toAccount = this.accounts[0]
        }
      }
      this.calcBalance()
    },
    calcBalance(){
      const {fromCurrency,fromAccount} = this
      // if(fromAccount.name == 'legal'){
      // 	this.balance = fromCurrency.wallet.legal_balance
      // }else
      console.log("从哪个帐户==>"+fromAccount.name);
      if(fromAccount.name == 'lever'){
        this.balance = fromCurrency.wallet.lever_balance;
        if (this.balance==null||this.balance=="null"){
          this.balance=0;
        }
      }
      if(fromAccount.name == 'change'){
        this.balance = fromCurrency.wallet.change_balance;
        if (this.balance==null){
          this.balance=0;
        }
      }
      if(fromAccount.name == 'legal'){
        this.balance = fromCurrency.wallet.legal_balance
      }
      if(fromAccount.name == 'micro'){
        this.balance = fromCurrency.wallet.micro_balance
      }
      if(fromAccount.name == 'earn'){
        this.balance = fromCurrency.wallet.earn_balance;
        if (this.balance==null||this.balance=="null"){
          this.balance=0;
        }
      }

    },

    clickFromActionSheet(i){

      const {fromAccounts,toAccount} = this
      if(fromAccounts[i].id == toAccount.id){
        this.exchange()
      }else{
        this.fromAccount = fromAccounts[i]
      }
      this.calcBalance()
      console.log("this.fromAccounts"+JSON.stringify(this.fromAccounts));
    },

    clickToActionSheet(i){
      const {fromAccount,toAccounts} = this
      if(toAccounts[i].id == fromAccount.id){
        this.exchange()
      }else{
        this.toAccount = toAccounts[i]
      }
    },
    exchange(){
      let tmp = this.fromAccount
      this.fromAccount = this.toAccount
      this.toAccount = tmp;
      this.calcBalance();
    },
    tabsChange(index) {
      if(index != this.currentNav){
        let lang = uni.getStorageSync('lang') || 'en';
        if (lang ==="en"){
          uni.redirectTo({
            url:'/pages/fund/legal_convert_en_u'
          })
        }else{
          uni.redirectTo({
            url:'/pages/fund/legal_convert_u'
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
        return this.$utils.showToast(this.$t("fund.insufficientBalance"))
      }
    },
    fromNumberFocus(e) {
      const value = Number(e.detail.value)
      if(!value){
        this.from = null
      }
    },
    fromNumberBlur(e){
      const value = Number(e.detail.value)
      if(!value){
        this.from = 0
      }
    },
    clickCurrencyActionSheet(index){
      this.fromCurrency = this.transferCurrency[index]
	  // let balanceArr = this.wallet.find(item => item.currency === this.fromCurrency.id)
	  // if(balanceArr) {
		 //  this.balance = balanceArr.usdt_price
	  // }
      this.checkAccount()
      setTimeout(()=>{
        this.showCurrencyList = false
      },500)
    },
    submit(){
      this.$u.throttle(async ()=>{
        const {from,fromCurrency,fromAccount,toAccount,balance} = this
        if(!from || !this.$u.test.amount(from)){
          return this.$utils.showToast(this.$t("fund.plsIptCrtNumber"))
        }
        if (from > Number(balance)) {
          return this.$utils.showToast(this.$t("fund.insufficientBalance"))
        }

        const ret = await this.$utils.showModal(this.$t("common.hint"),this.$t("fund.c_transfer"))
        if(!ret) return
        //fundTransfer: (currency_id,number,from_field,to_field) => vm.$u.post("/wallet/change2",{currency_id,number,from_field,to_field}),
        //this.$u.api.wallet.fundTransfer(fromCurrency.id,from,fromAccount.name,toAccount.name).then(res=>{
        let data={currency_id:fromCurrency.id,number:from,from_field:fromAccount.name,
          lang:uni.getStorageSync("lang"),
          to_field:toAccount.name};
        this.$https.initDataToken({
          url: 'wallet/change2',
          type: 'POST',
          data
        }, (res, msg) => {
          this.from = 0
          this.getUserCurrencyList()
          this.$utils.showToast(this.$t("common.success"));
          ///pages/fund/assets


          setTimeout(() => {
           uni.switchTab({
             url: "/pages/fund/assets"
           })
          }, 1200)
        })

      },1000)
    },
  },
  computed: {
    i18n() {
      return this.$t("fund")
    },
    i18ncommon() {
      return this.$t("common")
    }
  },
  watch: {

  },
  onHide() {

  }
}
</script>

<style lang="scss" scoped>
page{
  background: #000000;
}
.transfer-input-group {

  .input {
    @extend .font-size-60;
    font-weight: bold;
    height: 100rpx;
    line-height: 100rpx;
    background-color: transparent;
    border: 1px solid #242424;
    padding: 0 30rpx;
  }

  .fixed-currency {
    @extend .font-size-32;
    font-weight: bold;
    position: absolute;
    right: 30rpx;
    bottom: 30rpx;
  }
}

.popup-list{
  padding-bottom: 50rpx;
  .popup-list-item{
    height: 96rpx;
    line-height: 96rpx;
    padding: 0 30rpx;
    font-size: 32rpx;
    position: relative;
    display: flex;
    align-items: center;
    color: #ffffff;
    &:before{
      content: "";
      position: absolute;
      left: 30rpx;
      right: 30rpx;
      bottom: 0;
      height: 2rpx;
      background-color: #242424;
    }
    &.active{
      background-color: #333333;
      &:after{
        content: "";
        width: 36rpx;
        height: 36rpx;
        background-image: url('../../static/uzx/icon_coin_select_yes.png');
        background-size: cover;
        position: absolute;
        right: 80rpx;
        top: 50%;
        margin-top: -10rpx;
      }
    }
  }
}
.connect_btn{
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
