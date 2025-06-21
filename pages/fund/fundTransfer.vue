<template>
  <view class="pb-50">
    <u-navbar :title="i18n.fundTransfer" showback="true">
      <u-icon name="order" slot="right" size="38"  style="color: #2A64FB"
              @click="$utils.jump('/pages/fund/transfer_history')">
      </u-icon>
    </u-navbar>
    <view class="m-30">
      <u-subsection :list="nav" :current="currentNav"  bg-color="#f7f7f7"
                    @change="tabsChange" :button-color="$downColor"></u-subsection>

        <u-popup v-model="showCurrencyList" mode="bottom" length="60%" :title="i18n.selectCurrency">
          <view class="popup-list">
            <view class="popup-list-item" v-for="(item,index) in transferCurrency" :key="item.text" :class="{active : fromCurrency.id == item.id}" @click="clickCurrencyActionSheet(index)"  >
              <text>{{item.text}}</text>
            </view>
          </view>
        </u-popup>



      <view class="bg-black text-white border-radius-10 p-30 mt-30">
        <view class="d-flex-between-center pb-30">
          <text class="opacity-75 font-size-32"  style="color: #000;">{{i18n.from}}</text>
          <view class="" @click="showFromList=true">
            <text class="font-weight-bold font-size-32 mr-10" style="color: #000;">{{fromAccount.text}}</text>
            <u-icon name="arrow-down" size="32" style="color: #929292;"></u-icon>
          </view>
        </view>
        <u-action-sheet :list="fromAccounts" v-model="showFromList" @click="clickFromActionSheet"
                        :cancelText="i18ncommon.cancel">
        </u-action-sheet>
        <view class="mt-30 transfer-input-group" v-if="false">
          <text class="d-block opacity-75 font-size-28"  style="color: #000;">{{i18n.transferNumber}}</text>
          <view class="position-relative mt-20">
            <input type="number" v-model="from" class="input" @input="fromNumberChange" @blur="fromNumberBlur" style="color: #000;"
                   @focus="fromNumberFocus">
            <text class="fixed-currency"  style="color: #000;">{{fromCurrency.name}}</text>
          </view>
        </view>
      </view>






      <view class="text-center my-30">
        <text class="iconfont icon-zhuanhuan1 text-warning font-size-70" @click="exchange"></text>
      </view>
      <view class="bg-black text-white border-radius-10 p-30 mt-30">
        <view class="d-flex-between-center pb-30 u-border-bottom">
          <text class="opacity-75 font-size-32" style="color: #000;">{{i18n.to}}</text>
          <view class="" @click="showToList=true">
            <text class="font-weight-bold font-size-32 mr-10"  style="color: #000;">{{toAccount.text}}</text>
            <u-icon name="arrow-down" size="32"  style="color: #929292;"></u-icon>
          </view>
        </view>
        <u-action-sheet :list="toAccounts" v-model="showToList" @click="clickToActionSheet" :cancelText="i18ncommon.cancel">
        </u-action-sheet>

      </view>

      <view class="bg-black text-white border-radius-10 p-30 mt-30 d-flex-between-center">
        <text class="opacity-75 font-size-22" style="color: #000;">{{i18n.selectCurrency}}</text>
        <view class="" @click="showCurrencyList=true">
          <text class="font-weight-bold font-size-32 mr-10"  style="color: #000;">{{fromCurrency.name}}</text>
          <u-icon name="arrow-down" size="32" style="color: #929292"></u-icon>
        </view>
      </view>
      <view class="bg-black text-white p-30 mt-0">
      <view class="mt-30 transfer-input-group">

        <view style="display: flex;" class="d-flex-between-center">
          <text class="d-block opacity-75 font-size-28"  style="color: #000;">{{i18n.transferNumber}}</text>
          <view class="">
            <text class="opacity-75 font-size-22" style="color: #000;">{{i18n.availableQuota}}</text>
            <text class="font-weight-bold font-size-28" style="color: #000;">{{Number(balance)}}</text>
          </view>
        </view>



        <view class="position-relative mt-20">
          <input type="number" v-model="from" class="input" @input="fromNumberChange" @blur="fromNumberBlur" style="color: #000;"
                 @focus="fromNumberFocus">
          <text class="fixed-currency"  style="color: #000;">{{fromCurrency.name}}</text>
        </view>
      </view>
      </view>

      <button class="warning-button mt-50"  style="color: #FFFFFF;"
              @click="submit">{{this.$t("common.confirm")}}</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
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
    this.accounts = this.$store.state.assetsType.map(item=>{
      item.text = item.type
      return item
    })
  },
  onShow() {

    this.getUserCurrencyList()

  },
  methods: {

    getUserCurrencyList(){
      //currency/user_currency_list
      this.$https.initDataToken({
        url: 'account/record',
        data: {
          dianhui:0,
          address:this.address,
          money:amount,
          voucher:account,
          currency:currency,
          truename:'',
          channel:selectCoin.subName,
          usdt_type:selectCoin.name,
          lang:uni.getStorageSync('lang') || 'en'
        },
        type: 'GET'
      }, (res, msg) => {
        let _transferCurrency = res.map(item=>{
          item.text = item.name
            return item
        });
        this.transferCurrency=[];
        for(let i=0;i<_transferCurrency.length;i++){
              let item=_transferCurrency[i];
              if (item.name === "USDT"||item.name === "BTC" ||item.name === "ETH"){
                this.transferCurrency.push(item);
              }
        }


        this.fromCurrency = this.transferCurrency[0]

        this.checkAccount()

        // 获取币币划转的可用列表
        this.$https.initDataToken({
          url: 'user/getTransferList',
          data: {
            lang:uni.getStorageSync('lang') || 'en'
          },
          type: 'GET'
        }, (res, msg) => {
          this.wallet  = res.wallet
        })


      })
    },
    checkAccount(){
      const {fromCurrency,accounts} = this
      let account = []
      // if(fromCurrency.is_legal){
      // 	account.push(accounts[0])
      // }
      if(fromCurrency.is_lever){
        account.push(accounts[2])
      }
      if(fromCurrency.is_match){
        account.push(accounts[1])
      }
      // if(fromCurrency.is_micro){
      // 	account.push(accounts[3])
      // }

      this.fromAccounts = this.accounts;
      this.toAccounts = this.accounts;

      if(account.length){
        this.fromAccount = account[0]
        if(account.length > 1){
          this.toAccount = account[1]
        }else{
          this.toAccount = account[0]
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
        uni.redirectTo({
          url:'/pages/fund/transfer2'
        })
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
      this.balance = this.wallet.find(item => item.currency == this.fromCurrency.id)
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

        this.$https.initDataToken({
          url: 'wallet/change2',
          data: {
            currency_id:fromCurrency.id,
            number:from,
            from_field:fromAccount.name,
            to_field:toAccount.name,
            lang:uni.getStorageSync('lang') || 'en'
          },
          type: 'POST'
        }, (res, msg) => {
          this.from = 0
          this.getUserCurrencyList()
          this.$utils.showToast(this.$t("common.success"))
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
.transfer-input-group {

  .input {
    @extend .font-size-60;
    font-weight: bold;
    height: 100rpx;
    line-height: 100rpx;
    background-color: $uni-color-333;
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
    &:before{
      content: "";
      position: absolute;
      left: 30rpx;
      right: 30rpx;
      bottom: 0;
      height: 2rpx;
      background-color: #efefef;
    }
    &.active{
      background-color: #f2f6ff;
      &:after{
        content: "";
        width: 36rpx;
        height: 20rpx;
        background-image: url('../../static/image/icon/setting-icon-20.png');
        background-size: cover;
        position: absolute;
        right: 80rpx;
        top: 50%;
        margin-top: -10rpx;
      }
    }
  }
}
</style>
