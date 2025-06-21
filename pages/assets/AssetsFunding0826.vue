<template>
  <view style="background: #ffffff;">



    <view class="m-20" style="background: #ffffff;">
      <view class="deposit ">
        <view class="d-flex align-items-center">
          <text class="d-block font-size-18 mr-10" style="color: #eeeeee;">{{ i18n.convert }}</text>
          <text class="iconfont  font-size-36 text-333"></text>
        </view>
        <view class="mt-30">
          <view class="d-flex align-items-baseline">
            <text class="font-size-40 mr-20 font-weight-bold" style="color: #ffffff;">{{ convert }}</text>
            <text class="font-size-22" style="color: #e1e1e1">USDT</text>
          </view>
        </view>
        <view class="d-block font-size-22 opacity-50 mt-8" style="color: #ffffff"> ≈
          {{ (convert * $store.state.fiat.rate).toFixed(4) }} {{ $store.state.fiat.currency_code }}
        </view>
        <view class="earnings-wrap" style="height: 20px;">

        </view>

      </view>
      <view class="d-grid-columns-4 pt-38 mb-24 mx-30">
        <view class="text-center " v-for="(item,index) in subNav" @click="$utils.jump(item.url)">
          <image :src="item.icon" style="width:55rpx;height: 55rpx;margin-top: -5px;" v-if="index == 3"></image>
          <image :src="item.icon" style="width:46rpx;height: 46rpx;" v-else></image>

          <text class="d-block font-size-22 mt-12 text-black">
            <span style="color: #000;font-weight: 500;font-size: 12px">{{ item.name }}</span>
          </text>
        </view>
      </view>
    </view>


    <view class="m-30"  style="background: #ffffff;">

      <view class="mt-30">

        <view  v-for="item in showList">
          <view class="p-30 mb-10 text-white" style="display: flex;justify-content: space-between;">
            <view style="display: flex;">
              <image :src="'https://admin.coinbmex.com'+item.logo" style="width: 32px;height: 32px;margin-left: -2px;"></image>
              <view style="color: #000;line-height: 32px;height: 32px;margin-left: 8px;font-weight: 500;font-size: 15px">
                {{item.currency_name }}
              </view>
            </view>
            <view style="display: flex;flex-direction: column;">
              <view style="color: #000;font-weight: 500;font-size: 15px;"> {{item.usdt_balance}} USDT</view>
              <view style="color: #888888;margin-top: 3px;font-size: 12px;">= ¥0.00</view>
            </view>
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
      currentTab: 0,
      // 0:change,1:lever,2:legal,3:micro
      current: 0,
      convert: 0,
      showList: [],
      originalList: {},
      currentAssetsType: {},
      showNav: true,
    };
  },
  onLoad() {
    const _this = this
    // uni.setNavigationBarTitle({
    //   title: _this.$t("nav")[4]
    // });

  },
  mounted() {

    this.getWalletList();
  },
  onShow() {


    const i18n = this.$t("fund")
    this.nav = [{
      name: i18n.exchange
    }, {
      name: i18n.leverage
    },
      // {
      // 	name: i18n.fiat
      // }, {
      // 	name: i18n.second
      // }

    ]

    this.showNav = false
    setTimeout(() => {
      this.showNav = true
    }, 100)

    //this.$utils.setTabbar(this)
    //uni.showTabBar()


  },
  methods: {
    changeTab(val) {
      this.currentTab = val;
    },
    // tabs通知swiper切换

    getWalletList() {

      this.$u.api.wallet.getWalletList().then(res => {
        this.originalList = res.message
        const convert = Number(res.message.change_wallet.totle) + Number(res.message.lever_wallet
            .totle) + Number(res.message.legal_wallet.totle) + Number(res.message
            .micro_wallet.totle);

        let change_walletUSDT = Number(res.message.change_wallet.totle);
        let lever_walletUSDT = Number(res.message.lever_wallet
            .totle);
        let legal_walletUSDT = Number(res.message.legal_wallet.totle);
        let micro_walletUSDT = Number(res.message
            .micro_wallet.totle);




        this.originalList.change_wallet.balance.forEach(item => {
          item.balance = Number(item.change_balance)
          item.lock_balance = Number(item.lock_change_balance)
          item.usdt_balance = parseFloat((Number(item.change_balance) * Number(item
              .usdt_price)).toFixed(4))
        });

        this.originalList.lever_wallet.balance.forEach(item => {
          item.balance = Number(item.lever_balance)
          item.lock_balance = Number(item.lock_lever_balance)
          item.usdt_balance = parseFloat((Number(item.lever_balance) * Number(item
              .usdt_price)).toFixed(4))
        });

        this.originalList.legal_wallet.balance.forEach(item => {
          item.balance = Number(item.legal_balance)
          item.lock_balance = Number(item.lock_legal_balance)
          item.usdt_balance = parseFloat((Number(item.legal_balance) * Number(item
              .usdt_price)).toFixed(4))
        });

        this.originalList.micro_wallet.balance.forEach(item => {
          item.balance = Number(item.micro_balance)
          item.lock_balance = Number(item.lock_micro_balance)
          item.usdt_balance = parseFloat((Number(item.micro_balance) * Number(item
              .usdt_price)).toFixed(4))
        });

        this.convert = convert.toFixed(4)
        this.setShowList()
      })
    },
    setShowList() {

      this.showList = this.originalList.change_wallet.balance;
      this.currentAssetsType = this.$store.state.assetsType[1];

    }
  },
  computed: {
    i18n() {
      return this.$t("fund")
    },
    subNav() {
      const i18n = this.$t("fund")
      return [{
        name: i18n.receive,
        icon: require('static/image/icon/cz.png'),

        url: '/pages/fund/select?url=receive'
      }, {
        name: i18n.withdraw,
        icon: require('static/image/icon/tx.png'),
        url: '/pages/fund/withdraw'
      },
        {
          name: i18n.transfer,
          icon: require('static/image/icon/exchange.png'),
          url: '/pages/fund/transfer2'
        },
        {
          name: i18n.record,
          icon: require('static/bib/zijin_liushui.png'),
          url: '/pages/fund/assets_all_record?currentTab=0'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  background: url(../../static/image/icon/nav-shadow.png), #ff0000;
  background-size: auto 100%;
  background-position: 606 rpx;
}

.dealer {
  position: absolute;
  top: 26 rpx;
  right: 0;
  color: #2A64FB;
  border-radius: 31 rpx 0 0 31 rpx;
  background-image: linear-gradient(to right, #ffffff, #ffffff, #ffffff);
  padding: 14 rpx 44 rpx;
  display: flex;
  align-items: center;
}

.activeTab {
  color: #000;
  width: 30px;
  border-width: 12px;
  padding-bottom: 8px;
  font-weight: 600;

}

.normalTab {
  width: 30px;
  border-width: 12px;
  padding-bottom: 8px;
  color: #888888;
  font-weight: 600;
}

</style>
