<template>
  <view style="background: #000000;">
    <view class="m-20" style="background: #000000;">
      <view
          style="background: url('https://admin.coinbmex.com/image_asset_top_bg_219.png') no-repeat;background-size:100% 100%;background-repeat: no-repeat;">
        <view class="d-flex align-items-center" style="padding: 10px;margin-left: 10px;">
          <text class="d-block font-size-24 mr-10" style="color: #000;margin-top: -6px;flex: 1;">{{ i18n.convert }}</text>
        </view>
        <view style="margin-top:-5px;margin-left: 20px;">
          <view class="d-flex align-items-baseline">
            <text class="font-size-40 mr-20 font-weight-bold" style="color: #000;">{{convert}}</text>
            <text class="font-size-22" style="color: #000;font-weight: 700;">USDT</text>
          </view>
        </view>
        <view class="d-block font-size-22 mt-8" style="color: #ffffff;margin-left: 20px;display: flex;">
          <view style="color: #ffffff;line-height: 20px;">{{$t('today_pnl')}}</view>
          <view style="color:#01c698;line-height: 20px;margin-left: 3px;">{{profitLoss}}</view>
        </view>
        <view class="d-grid-columns-5 pt-38 mb-40 mx-0" style="height: 86px;">
          <view class="text-center " v-for="(item,index) in subNav" @click="$utils.jump(item.url)">
            <image :src="item.icon" style="width:55rpx;height: 55rpx;margin-top: -5px;" v-if="index == 3"></image>
            <image :src="item.icon" style="width:46rpx;height: 46rpx;" v-else></image>

            <text class="d-block font-size-22 mt-12 text-black">
              <span style="color: #000;font-weight: 700;font-size: 12px;opacity: 1;">{{ item.name }}</span>
            </text>
          </view>
        </view>
      </view>
    </view>
    <view style="background: #000000;border-top: 6px solid #121212;">
      <view class="mt-30">
        <view  v-for="item in showList">
          <view v-if="item.currency_name ==='USDT'" class="p-30 mb-10 text-white"
                @click="$utils.jump(`/pages/fund/assets_record?currency=${item.currency}&type_id=${currentAssetsType.id}&type_name=${currentAssetsType.name}`)"
                style="display: flex;justify-content: space-between;">
            <view style="display: flex;">

              <image v-if="item.currency_name==='USDT' "
                     src="https://admin.coinbmex.com/coin/icon-USDT.png" style="width: 32px;height: 32px;margin-left: -2px;"></image>
              <image  v-else-if="item.logo && item.logo.includes('http')" :src="item.logo" style="width: 32px;height: 32px;margin-left: -2px;"></image>
			  <image v-else
                     :src="'https://admin.coinbmex.com'+item.logo" style="width: 32px;height: 32px;margin-left: -2px;"></image>
              <view style="color: #ffffff;line-height: 32px;height: 32px;margin-left: 8px;font-weight: 500;font-size: 15px">
                {{item.currency_name }}
              </view>
            </view>
            <view style="display: flex;flex-direction: column;">
              <view style="color: #ffffff;font-weight: 500;font-size: 15px;margin-top: 5px;"> {{Number(item.usdt_balance2).toFixed(2)}} USDT</view>

            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
	props: {
		 profitLoss: {
			 type: Number | String,
			 default: 0.00
		 }
	},
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
    // })
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
  mounted() {
    //console.log("资金模块mounted-----");
    this.getWalletList();
  },
  methods: {
    changeTab(val) {
      this.currentTab = val;
    },
    // tabs通知swiper切换
    tabsChange(index) {
      this.current = index
      this.setShowList()
    },
    getWalletList() {
      let lang=uni.getStorageSync("lang")||"en";
      this.$https.initDataToken({
        url: 'wallet/earnWalletList?lang='+lang,
        type: 'POST'
      }, (res, msg) => {

        this.originalList = res
        const convert = Number(res.earn_wallet.totle);

        let earn_walletUSDT = Number(res.earn_wallet.totle);

       // console.log("earn_walletUSDT=>" + earn_walletUSDT);



        this.originalList.earn_wallet.balance.forEach(item => {
          item.balance = Number(item.earn_balance)
          item.lock_balance = Number(item.lock_earn_balance)
          let currency_name=item.currency_name;
          if (currency_name==="USDT"){
            item.usdt_balance2 = Number(item.earn_balance).toFixed(2);
          }else {
            item.usdt_balance2 = parseFloat((Number(item.earn_balance) * Number(item
                .usdt_price)).toFixed(2))
          }
        });




        this.convert = convert.toFixed(2)
        this.setShowList()
      })
    },
    setShowList() {

          this.showList = this.originalList.earn_wallet.balance;
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
        icon: require('static/bib/icon_charge.png'),

        url: '/pages/fund/select?url=receive'
      }, {
        name: i18n.withdraw,
        icon: require('static/image/icon/icon_mention.png'),
        url: '/pages/fund/withdraw'
      },
        {
          name: i18n.transfer,
          icon: require('static/image/icon/icon_overturn.png'),
          url: '/pages/fund/transfer2'
        },
        {
          name: this.$t("leftmenu.convert"),
          icon: require('static/image/icon/icon_flash.png'),
          url: '/pages/tx/flashexchange'
        },
        {
          name: i18n.record,
          icon: require('static/image/icon/icon_bill.png'),
          url: '/pages/fund/assets_all_record'
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
