<template>
  <view style="background: #000000;">
    <view class="m-20" style="background: #000000;">
      <view
          style="background: #c0dd2b;background-size:100% 100%;background-repeat: no-repeat;border-radius: 10px;">
        <view class="d-flex align-items-center" style="padding: 10px;margin-left: 10px;">
          <text class="d-block font-size-24 mr-10" style="color: #000;margin-top: -6px;flex: 1;">{{ i18n.convert }}</text>
        </view>
        <view style="margin-top:-5px;margin-left: 20px;">
          <view class="d-flex align-items-baseline">
            <text class="font-size-40 mr-20 font-weight-bold" style="color: #000;">{{convert}}</text>
            <!-- <text class="font-size-22" style="color: #000;font-weight: 700;">USDT</text> -->
          </view>
        </view>
        <view class="d-block font-size-22 mt-8" style="color: #ffffff;margin-left: 20px;display: flex;">
          <view style="color: #000;line-height: 20px;">{{$t('today_pnl')}}</view>
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
    <view class="m-30"  style="background: #000000;">
      <view class="mt-30">
        <view  v-for="item in showList">
          <view class="p-30 mb-10 text-white" style="display: flex;justify-content: space-between;border-bottom: 1px solid #121212;">
            <view style="display: flex;">
              <image v-if="item.currency_name==='CNY' "
                  src="https://admin.coinbmex.com/coin/cny.png" style="width: 32px;height: 32px;margin-left: -2px;"></image>
              <image v-else-if=" item.currency_name==='THB' "
                     :src="'https://admin.coinbmex.com'+item.logo" style="width: 32px;height: 32px;margin-left: -2px;"></image>
              <image v-else-if="item.currency_name==='IDR' "
                     :src="'https://admin.coinbmex.com'+item.logo" style="width: 32px;height: 32px;margin-left: -2px;"></image>
              <image v-else-if="item.currency_name==='VND' "
                     :src="'https://admin.coinbmex.com'+item.logo" style="width: 32px;height: 32px;margin-left: -2px;"></image>
              <image v-else-if="item.currency_name==='USDT' "
                     src="https://admin.coinbmex.com/coin/icon-USDT.png" style="width: 32px;height: 32px;margin-left: -2px;"></image>
			  <image v-else-if="item.currency_name==='USDC' "
					        src="@/static/image/icon/icon-USDC.png" style="width: 32px;height: 32px;margin-left: -2px;"></image>
              <image v-else
                     :src="'https://admin.coinbmex.com'+item.logo" style="width: 32px;height: 32px;margin-left: -2px;"></image>

              <view style="color: #ffffff;line-height: 32px;height: 32px;margin-left: 8px;font-weight: 500;font-size: 15px">
                <view style="color: #ffffff;font-weight: 500;font-size: 15px;margin-top: 5px;"  v-if=" item.currency_name==='CNY' ">CNY</view>
                <view style="color: #ffffff;font-weight: 500;font-size: 15px;margin-top: 5px;"  v-else-if=" item.currency_name==='THB' ">THB</view>
                <view style="color: #ffffff;font-weight: 500;font-size: 15px;margin-top: 5px;"  v-else-if=" item.currency_name==='IDR' ">IDR</view>
                <view style="color: #ffffff;font-weight: 500;font-size: 15px;margin-top: 5px;"  v-else-if=" item.currency_name==='VND' ">VND</view>
                <view style="color: #ffffff;font-weight: 500;font-size: 15px;margin-top: 5px;"  v-else> {{item.currency_name}}</view>
              </view>
            </view>
            <view style="display: flex;flex-direction: column;">
              <view style="color: #ffffff;font-weight: 500;font-size: 15px;margin-top: 5px;"  v-if="item.currency_name==='CNY' "> {{Number(item.legal_balance).toFixed(6)}} CNY</view>
              <view style="color: #ffffff;font-weight: 500;font-size: 15px;margin-top: 5px;"  v-else-if=" item.currency_name==='THB' "> {{item.legal_balance}} THB</view>
              <view style="color: #ffffff;font-weight: 500;font-size: 15px;margin-top: 5px;"  v-else-if=" item.currency_name==='IDR' "> {{item.legal_balance}} IDR</view>
              <view style="color: #ffffff;font-weight: 500;font-size: 15px;margin-top: 5px;"  v-else-if=" item.currency_name==='VND' "> {{Number(item.legal_balance).toFixed(6)}} VND</view>
              <view style="color: #ffffff;font-weight: 500;font-size: 15px;margin-top: 5px;"
                    v-else-if=" item.currency_name==='USD' "> {{Number(item.legal_balance).toFixed(6)}} USD</view>
              <view style="color: #ffffff;font-weight: 500;font-size: 15px;margin-top: 5px;"  v-else-if=" item.currency_name==='EUR' "> {{Number(item.legal_balance).toFixed(6)}} EUR</view>
              <view style="color: #ffffff;font-weight: 500;font-size: 15px;margin-top: 5px;"  v-else-if=" item.currency_name==='GBP' "> {{Number(item.legal_balance).toFixed(6)}} GBP</view>
			  <view style="color: #ffffff;font-weight: 500;font-size: 15px;margin-top: 5px;"  v-else-if=" item.currency_name==='USDT' ">
			  {{Number(item.legal_balance).toFixed(6)}} </view>
              <view style="color: #ffffff;font-weight: 500;font-size: 15px;margin-top: 5px;"  v-else> {{Number(item.usdt_balance-0).toFixed(6)}} </view>

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
      langA:'',
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
    //console.log("资金模块mounted-----");
    this.getWalletList();
  },
  onShow() {
    //console.log("资金模块onShow-----");


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
      this.langA = uni.getStorageSync('lang') || 'en';
      console.log("资金模块onShow-----"+this.langA);


      this.$https.initDataToken({
        url: 'wallet/legalWalletList?lang='+this.langA,
        type: 'POST'
      }, (res, msg) => {
        this.originalList = res
        const convert = Number(res.legal_wallet.totle);


        let legal_walletUSDT = Number(res.legal_wallet.totle);

        //console.log("change_walletUSDT=>" + change_walletUSDT);
        //console.log("lever_walletUSDT=>" + lever_walletUSDT);
        //console.log("legal_walletUSDT=>" + legal_walletUSDT);
        //console.log("micro_walletUSDT=>" + micro_walletUSDT);

        this.originalList.legal_wallet.balance.forEach(item => {
          item.balance = Number(item.legal_balance)
          item.lock_balance = Number(item.lock_legal_balance)
          let currency_name=item.currency_name;
          if (currency_name==="USDT" || currency_name==="USDC"){
            item.usdt_balance = (Number(item.legal_balance).toFixed(2))
          }else if (currency_name==="BTC"||currency_name==="ETH"){
            console.log("ETH数量==>"+item.legal_balance+" 价格==>"+item
                .usdt_price);
            // item.usdt_balance = parseFloat((Number(item.legal_balance) * Number(item
            //     .usdt_price)).toFixed(2));
			item.usdt_balance = Number(item.legal_balance)
            console.log("item.usdt_balance==>"+item.usdt_balance);
          }

        });

        console.log("this.originalList.legal_wallet.balance==>"+JSON.stringify(this.originalList.legal_wallet.balance));


        this.convert = convert.toFixed(6)
        this.setShowList()
      })
    },
    setShowList() {

          this.showList = this.originalList.legal_wallet.balance;
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
page{
  background: #000000;
}
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
