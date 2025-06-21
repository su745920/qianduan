<template>
  <view class="text-white">
    <u-navbar :title="i18n.withdraw2" showback="true">
      <navigator url="/pages/fund/withdraw_logs" slot="right">
        <image src="/static/icon_to_all.png" style="width: 52rpx; height: 52rpx;"></image>
      </navigator>
    </u-navbar>
    <u-subsection :list="nav" :current="currentNav" @change="tabsChange" style="margin: 20px;"
                  :button-color="$upColor" bg-color="#242424"></u-subsection>

    <view class="mx-36 py-20">
      <view class="bg-black px-30 py-16  border-radius-10">
        <view class="select-coin" @click="showSelect=true">
          <view class="d-flex align-items-center">
            <text class="font-size-32" style="color: #939393;">{{ selectCoin.text + i18n.withdraw2 }}</text>
          </view>
          <view class="">
            <text class="iconfont icon-xiala text-ddd font-size-22 ml-16" style="color: #666;"></text>
          </view>
        </view>
      </view>

      <u-action-sheet :list="coins" v-model="showSelect"
                      @click="confirmSelect" :cancelText="i18ncommon.cancel"></u-action-sheet>


      <view class="d-flex font-size-34 mt-28 withdraw_type" v-if="false">
        <text class="mr-20 item" :class="type == 0 ? 'active' : ''" @click="type=0">{{ i18n.withdrawToAddress }}</text>
        <!--
        <text class="mr-20 item" :class="type == 1 ? 'active' : ''" @click="type=1">{{i18n.withdrawToCard}}</text>
        <text class="item" :class="type == 2 ? 'active' : ''"  style="color: #FFFFFF;"
              @click="type=2">{{i18n.withdrawToCardInternational}}</text>
        -->

      </view>

      <!-- 体现到银行卡 -->
      <view class="u-border-bottom  pb-16 withdraw-input-wrap pb-16 pt-28 ">
        <view class="d-flex-between-center">
          <text class="d-block font-size-32" style="color: #666;">{{ $t('c2c.bankcard') }}</text>
        </view>
        <view class="input-group">
          <input type="text" v-if="card && card.bank_account" :value="card.bank_account" disabled class="input"
                 style="color: #ffffff;">

          <button v-else class="warning-button py-0 font-size-22 w-50 mx-auto" style="color: #FFFFFF;"
                  @click="$utils.jump('/pages/setting/bank')">{{ i18n.addCard }}
          </button>
        </view>
      </view>
      <!-- 体現到银行卡 國際 -->
      <template v-if="type == 2">
        <view class="u-border-bottom  pb-16 withdraw-input-wrap pb-16 pt-28 ">
          <view class="d-flex-between-center">
            <text class="d-block font-size-32">{{ i18n.card }}</text>
          </view>
          <view class="input-group">
            <input type="text" v-if="card_international && card_international.data[0]"
                   :value="card_international.data[0]" disabled class="input">
            <button v-else class="warning-button py-0 font-size-22 w-50 mx-auto" style="color: #FFFFFF"
                    @click="$utils.jump('/pages/setting/bank_international')">{{ i18n.addCard }}
            </button>
          </view>
        </view>
      </template>
      <!-- 转账数量 -->
      <view class="u-border-bottom  pb-16 withdraw-input-wrap pb-16 pt-28 ">
        <view class="d-flex-between-center">
          <text class="d-block font-size-32" style="color: #939393;">{{ i18n.withdrawNumber }}</text>
          <text style="color: #666;">{{ i18n.canUse }} {{ legal_balance }} {{ selectCoin.text }}</text>
        </view>
        <view class="input-group">
          <input type="digit" v-model="number" class="input" :placeholder="i18n.plsIptWithdrawNumber"
                 style="color: #ffffff;"
                 placeholder-style="color:#939393;font-size:14px"
                 @blur="checkNumber">
          <text class="absolute-text" style="color: #ffffff;" @click="number=legal_balance;">{{ i18n.all }}</text>
        </view>
      </view>
      <!-- 手续费 -->
      <text class="d-block text-right" style="height: 70rpx;line-height: 70rpx;">
        <text style="color: #939393;">{{ i18n.leastNumber }}</text>
        <text class="ml-26" style="color: #ffffff;opacity: 1;">{{ min_number }} {{ selectCoin.text }}</text>
      </text>
      <!-- 到账数量 -->
      <view class="u-border-bottom  pb-16 withdraw-input-wrap pb-16 pt-28 ">
        <view class="d-flex-between-center">
          <text class="d-block font-size-32" style="color: #939393;">{{ i18n.canGetNumber }}</text>
        </view>
        <view class="input-group">
          <input type="text" class="input" disabled :value="canGetNumber" style="color: #ffffff;">
        </view>
      </view>
      <!-- 手续费 -->
      <text class="d-block text-right" style="height: 70rpx;line-height: 70rpx;">
        <text style="color: #939393;">{{ i18n.handlingFee }}</text>
        <text class="ml-26" style="color: #ffffff;">{{ rate }} {{ selectCoin.text }}</text>
      </text>

      <button class="warning-button mt-70 connect_btn" style="color: #000000;"
              @click="withdraw">{{ $t("common.confirm") }}
      </button>

      <view style="color: #777;margin-top: 20px;">
        Dear user, if you need a bank card to withdraw funds, please contact online customer service
      </view>

      <u-popup v-model="showSelectAddress" mode="bottom">
        <view class="p-30">
          <block v-if="walletAddress.length">
            <view class="item" v-for="item in walletAddress" :key="item.id" @click="selectAddressFunc(item)">
              <view class="d-flex align-items-center">
                <image :src="item.qrcode | retImageUrl" class="border-radius-20 "
                       style="width: 170rpx;height: 170rpx;"></image>
                <view style="flex: 1;" class="mx-20">
                  <text class="font-size-28 font-weight-bold d-block">{{ i18n.coinType }}: {{ item.coin }}</text>
                  <text class="font-size-28 text-warning font-weight-bold d-block" style="word-wrap:break-word;">
                    {{ i18n.address }}: {{ item.address }}
                  </text>
                  <text class="font-size-28 font-weight-bold d-block">{{ i18n.date }}: {{ item.created_at }}</text>
                </view>
                <text class="iconfont icon-checkbox-ok text-warning" v-if="selectAddress.id == item.id"></text>
                <text v-else class="iconfont icon-checkbox"></text>
              </view>
            </view>
          </block>
          <default-page v-else>
            <button class="w-50 mx-auto warning-button py-0 border-radius-20 text-white" style="color: #FFFFFF;"
                    @click="$utils.jump('/pages/setting/addWallet')">{{ $t('add_withdrawal_address') }}
            </button>
          </default-page>
        </view>
      </u-popup>
    </view>
  </view>
</template>
<script>
// 收款
export default {
  data() {
    return {
      nav: [{
        name: this.$t("withdraw_wallet")
      }, {
        name: this.$t("withdraw_bankcard")
      }],
      currentNav: 1,

      coins: [
        {
          id: 58,
          text: this.$t('c2c.bankcard21')
        }
      ],
      selectCoin: {},
      showSelect: false,
      min_number: 0, //最低提现金额
      legal_balance: 0,//余额
      rate: 0,//手续费,
      number: null,
      showSelectAddress: false,
      originWalletAddress: [],
      walletAddress: [],
      selectAddress: {},
      type: 0, //0地址，1银行卡,
      card: {},
      card_international: {}
    };
  },
  onLoad() {
    this.selectCoin = this.coins[0]
  },
  onShow() {
    this.getWalletAddressList()
    this.getCard()
    this.getCardInternational();

  },
  methods: {
    tabsChange(index) {
      this.currentNav = index;

      if (index === 0) {
        uni.redirectTo({
          url: '/pages/fund/withdraw'
        })
      }

    },
    confirmSelect(index) {
      const lang = localStorage.getItem("lang");
      console.log("lang==>" + lang);
      if (index === 3) {
        this.type = 1;
        this.getCard();
        if (lang === "zh") {
          this.selectCoin.text = "CNY";
          this.selectCoin.id = 63;
        }
        if (lang === "vi") {
          this.selectCoin.text = "VND";
          this.selectCoin.id = 81;
        }
        if (lang === "th") {
          this.selectCoin.text = "THB";
          this.selectCoin.id = 82;
        }
        if (lang === "id") {
          this.selectCoin.text = "IDR";
          this.selectCoin.id = 84;
        }

        let data = {lang: lang}
        this.$https.initDataToken({
          url: 'wallet/getLegalAssets',
          type: 'POST',
          data
        }, (res, msg) => {
          this.legal_balance = Number(res.total_legal).toFixed(2);
          console.log("this.total_legal==>" + this.legal_balance);
        })


      } else {
        this.type = 0;
        this.selectCoin = this.coins[index];
        console.log("选中的币种==>" + JSON.stringify(this.selectCoin) + "  index==>" + index);
        this.getWalletAddressList()
      }

    },
    getWalletInfo() {
      let {id: currency} = this.selectCoin
      const lang = localStorage.getItem("lang");
      console.log("lang==>" + lang);

      if (lang === "zh") {

        currency = 63;
      }
      if (lang === "vi") {

        currency = 81;
      }
      if (lang === "th") {

        currency = 82;
      }
      if (lang === "id") {
        currency = 84;
      }

      if (currency > 0) {
        let lang=uni.getStorageSync("lang")||"en";
        let data = {currency: currency,lang:lang}
        this.$https.initDataToken({
          url: 'wallet/get_info',
          type: 'POST',
          data
        }, (res, msg) => {
          const data = res
          this.legal_balance = Number(data.legal_balance)
          this.min_number = Number(data.min_number)
          this.rate = Number(data.withdraw_fee)
        })
      }


    },
    checkNumber(e) {
      const {i18n, min_number, selectCoin} = this
      const value = Number(e.detail.value)

      if (value < min_number && value != 0) {
        // this.number = min_number
        return this.$utils.showToast(i18n.leastNumber + min_number + selectCoin.text)
      }
    },
    getWalletAddressList() {
      let coin = this.selectCoin.text;
      console.log("币种==>" + coin);
      let lang=uni.getStorageSync("lang")||"en";
      let data = {coin: coin,lang:lang};
      this.$https.initDataToken({
        url: 'user/getList',
        type: 'POST',
        data
      }, (res, msg) => {
        this.walletAddress = res.list;
        console.log("查询钱包地址==>" + JSON.stringify(this.walletAddress));
        if (this.walletAddress.length == 0) {
          if (this.currentNav === 0) {
            this.showSelectAddress = true;//提示新增银行卡
          }
        } else {

          //this.walletAddress = this.originWalletAddress.filter(item=>item.currency == this.selectCoin.id)
          this.selectAddress = this.walletAddress[0];
        }

      })
    },
    selectAddressFunc(item) {
      this.selectAddress = item
      setTimeout(() => {
        this.showSelectAddress = false
      }, 300);

      console.log("选中的币种CNY=>" + JSON.stringify(item));


    },
    withdraw() {
      if (this.card && this.card.bank_account) {

      } else {
        this.$utils.jump('/pages/setting/bank')
        return false;
      }

      let {i18n, selectAddress, number, rate, selectCoin, type, card, card_international} = this
      if (selectAddress && !selectAddress.address && type == 0) {
        //没有提币地址
        return this.$utils.showToast(i18n.plsSelectWithdrawAddress)
      }
      if (!card.bank_account && type == 1) {
        //没有银行卡
        return this.$utils.showToast(i18n.plsAddCard)
      }
      if (!card_international.bank_account && type == 2) {
        //没有银行卡
        return this.$utils.showToast(i18n.plsAddCard)
      }
      const address = selectAddress ? selectAddress.address : ''
      if (!number) {
        //没有金额
        return this.$utils.showToast(i18n.plsIptWithdrawNumber)
      }
      let currency = selectCoin.id
      //
      const lang = localStorage.getItem("lang");
      console.log("lang==>" + lang);

      if (lang === "zh") {
        currency = 63;
      }
      if (lang === "vi") {
        currency = 81;
      }
      if (lang === "th") {
        currency = 82;
      }
      if (lang === "id") {
        currency = 84;
      }


      let data = {
        address,
        currency: currency,
        number: number,
        rate: rate,
        type: type,
        lang: localStorage.getItem("lang")||"en"
      };
      this.$https.initDataToken({
        url: 'wallet/out',
        type: 'POST',
        data
      }, (res, msg) => {


        this.$utils.showToast(res)
        this.number = 0;

        setTimeout(() => {
          uni.reLaunch({
            url: "/pages/index/index"
          })
        }, 1200)
      })

    },
    getCard() {
      let lang=uni.getStorageSync("lang")||"en";
      let data={lang:lang};
      this.$https.initDataToken({
        url: 'user/cash_info',
        type: 'POST',
        data
      }, (res, msg) => {
        this.card = res;
        console.log(JSON.stringify(this.card));

      })
    },
    getCardInternational() {
      let data={lang:uni.getStorageSync("lang")||"en"}
      this.$https.initDataToken({
        url: 'user/cash_info_international',
        type: 'POST'
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
    canGetNumber() {
      const value = this.number - this.rate
      if (value > 0) return value
      return 0
    }
  },
  watch: {
    'selectCoin.id'() {
      this.getWalletInfo()
      this.walletAddress = this.originWalletAddress.filter(item => item.currency === this.selectCoin.id)
      this.selectAddress = this.walletAddress.length ? this.walletAddress[0] : {}
    },
  },
}
</script>
<style lang="scss" scoped>
page{
  background: #000000;
}
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
    border-radius: 22 rpx;
    color: #fff;
    padding: 6 rpx 18 rpx;
    font-size: 20 rpx;
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
  margin-top: 16 rpx;

  .item {
    font-size: 28 rpx;
    height: 46 rpx;
    line-height: 46 rpx;
    padding: 0 30 rpx;
    border-radius: 24 rpx;
    border: 1px solid #333;
    color: #333;
    opacity: .5;
    margin-right: 18 rpx;

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
      height: 80 rpx;
      line-height: 80 rpx;
      font-size: 28 rpx;
      background: none;
      padding: 0;
    }

    .absolute-btn {
      position: absolute;
      font-size: 22 rpx;
      height: 42 rpx;
      line-height: 42 rpx;
      color: #9fa3ab;
      border-radius: 22 rpx;
      background-color: #f2f5fc;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }

    .absolute-text {
      position: absolute;
      font-size: 28 rpx;
      color: #296acf;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.withdraw-alert {
  font-size: 22 rpx !important;
  padding: 22 rpx 34 rpx;
  background-color: #4D4D4D;
  margin-top: 54 rpx;
  border-radius: 10 rpx;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 28 rpx;
    height: 18 rpx;
    background: url("/static/image/icon/withdraw-icon-1.png");
    background-size: cover;
    position: absolute;
    top: -18rpx;
    left: 80 rpx;
  }

  text {
    line-height: 32 rpx;
    display: block;
    color: #ccc !important;
  }
}

.withdraw_type {
  .item {
    position: relative;
    padding-bottom: 8 rpx;

    &:after {
      display: block;
      position: absolute;
      content: "";
      left: 30%;
      bottom: 0;
      right: 30%;
      height: 4 rpx;
      border-radius: 6 rpx;
      background-color: $uni-color-333;
    }

    &.active:after {
      background-color: $uni-color-warning;
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
