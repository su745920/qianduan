<template>
  <view class="">
	  <l-common-navbar :title="i18n.delegateList" :isCustomBack="true" @back="$utils.jump('/pages/transaction/contract')" />
    <u-sticky>
      <view class="p-30 position-relative" style="background-color: #242424;">
        <view class="d-flex align-items-center">
         <!-- <text class="d-block font-size-22 opacity-75">{{ i18n.riskRate }}:</text> -->
          <text class="ml-12 font-weight-bold">

            <!--            {{(Number(info.hazard_rate) / 1000000).toFixed(2)}}%-->

          </text>
        </view>
        <view class="d-flex align-items-center">
          <text class="d-block font-size-22 opacity-75"> {{ i18n.totalPandL1 }} .
		  </text>

          <!--					<text class="ml-12 font-weight-bold" :style="{color:$utils.getColor(info.profits_all)}" >{{Number(info.profits_all).toFixed(4)}}</text>-->

        </view>
        <button class="error-button position-absolute font-size-22 py-0 px-70" style="right: 30rpx;top: 36rpx;"
                @click="showCoverAll=true">{{ i18n.oneClickCover }}
        </button>
      </view>
      <view class="p-30" style="background-color: #242424;">
        <u-subsection :list="nav" :current="current" @change="changeNav" bg-color="#000000"></u-subsection>
      </view>
    </u-sticky>
    <view class="list" style="padding-bottom: 100px;">
      <view class="p-20 text-black" v-for="item in list" style="background: #242424">
        <view style="padding:10px;background: #000000;border-radius: 6px;">
          <view class="d-flex">
            <view class="d-flex align-items-center">
              <text class="tag py-0" :class="item.type == 1 ? 'tag-success' : 'tag-error'">
                {{ item.type == 1 ? i18n.buy : i18n.sell }}
              </text>
              <text class="ml-8" style="color: #ffffff;">{{ item.symbol }}</text>
              <text class="ml-8" style="color: #ffffff;">x{{ Number(item.share).toFixed(8) + i18n.lots }}</text>
              <text class="ml-8" style="color: #ffffff;">x{{ item.multiple + i18n.multiple }}</text>
            </view>
          </view>
          <view class="d-grid-columns-3 mt-20">
            <view class="my-8">
              <text class="d-block font-size-22 opacity-50" style="color: #ffffff;">{{ i18n.open }}</text>
              <text class="d-block font-size-30 font-weight-bold mt-8 opacity-90" style="color: #ffffff;">
                {{ Number(item.price).toFixed(4) }}
              </text>
            </view>
            <view class="my-8">
              <text class="d-block font-size-22 opacity-50" style="color: #ffffff;">{{ i18n.targetProfitPrice }}</text>
              <text class="d-block font-size-30 font-weight-bold mt-8  opacity-90" style="color: #ffffff;">
                {{ Number(item.target_profit_price).toFixed(4) }}
              </text>
            </view>
            <view class="my-8">
              <text class="d-block font-size-22 opacity-50" style="color: #ffffff;">{{ i18n.updatePrice }}</text>
              <text class="d-block font-size-30 font-weight-bold mt-8  opacity-90" style="color: #ffffff;">
                {{ Number(item.update_price).toFixed(4) }}
              </text>
            </view>
            <view class="my-8">
              <text class="d-block font-size-22 opacity-50" style="color: #ffffff;">{{ i18n.stopLossPrice }}</text>
              <text class="d-block font-size-30 font-weight-bold mt-8  opacity-90" style="color: #ffffff;">
                {{ Number(item.stop_loss_price).toFixed(4) }}
              </text>
            </view>
            <view class="my-8">
              <text class="d-block font-size-22 opacity-50" style="color: #ffffff;">{{ i18n.margin }}</text>
              <text class="d-block font-size-30 font-weight-bold mt-8  opacity-90" style="color: #ffffff;">
                {{ Number(item.caution_money).toFixed(4) }}
              </text>
            </view>
            <view class="my-8">
              <text class="d-block font-size-22 opacity-50" style="color: #ffffff;">{{ i18n.overnightMoney }}</text>
              <text class="d-block font-size-30 font-weight-bold mt-8  opacity-90" style="color: #ffffff;">
                {{ Number(item.overnight_money).toFixed(4) }}
              </text>
            </view>
            <view class="my-8">
              <text class="d-block font-size-22 opacity-50" style="color: #ffffff;">{{ i18n.handlingFee }}</text>
              <text class="d-block font-size-30 font-weight-bold mt-8  opacity-90" style="color: #ffffff;">
                {{ Number(item.trade_fee).toFixed(4) }}
              </text>
            </view>
            <view class="my-8">
              <text class="d-block font-size-22 opacity-50" style="color: #ffffff;">{{ i18n.openTime }}</text>
              <view class="d-block font-size-26 font-weight-bold mt-8  opacity-90">
                <text class="d-block" style="color: #ffffff;">{{ item.transaction_time.slice(0, 10) }}</text>
                <text class="d-block" style="color: #ffffff;">{{ item.transaction_time.slice(10, 20) }}</text>
              </view>
            </view>
            <view class="my-8" v-if="item.status == 3">
              <text class="d-block font-size-22 opacity-50" style="color: #ffffff;">{{ i18n.totalPandL }}</text>
              <text class="d-block font-size-30 font-weight-bold mt-8 opacity-90"
                    :style="{color:$utils.getColor(item.fact_profits)}" style="color: #000;">
                {{ Number(item.fact_profits).toFixed(4) }}
              </text>
            </view>

          </view>
          <view class="d-flex align-items-center mt-20" style="flex-direction: row-reverse;" v-if="item.status == 1">
            <button class="error-button font-size-22 py-0 px-70 mx-0" v-if="item.order_type == 1"
                    @click="cover(item.id)" style="color: #ffffff;">{{ i18n.cover }}
            </button>
            <button class="warning-button font-size-22 py-0 px-70 mx-0" v-else-if="item.order_type == 2"
                    @click="selfHold(item.id)" style="color: #ffffff;">{{ i18n.transSelfHold }}
            </button>
            <button class="primary-button font-size-22 py-0 px-70 mr-0 mr-20" @click="editFunc(item)"
                    style="color: #ffffff;">{{ i18n.setProfitLoss }}
            </button>
          </view>
        </view>

      </view>

      <default-page v-if="!list.length"></default-page>

      <!-- 设置止盈止损 -->
      <u-popup v-model="showEdit" border-radius="10" length="90%">
        <view class="p-30"  style="background: #000;">
          <text class="d-block text-center font-size-32" style="color: #fff;">{{ i18n.setProfitLoss }}</text>
          <view class="d-flex-between-center mt-20">
            <text style="color: #fff;">{{ i18n.targetProfitPrice }}</text>
            <view class="">
              <u-number-box v-model="profitPrice" :positive-integer="false" input-width="140" size="22"></u-number-box>
              <text class="d-block font-size-22 mt-8 opacity-50" style="color: #fff;">
                {{ i18n.expectedProfit + ':' + expectedProfit }}
              </text>
            </view>

          </view>
          <view class="d-flex-between-center mt-20">
            <text style="color: #fff;">{{ i18n.stopLossPrice }}</text>
            <view class="">
              <u-number-box v-model="lossPrice" :positive-integer="false" input-width="140" size="22"></u-number-box>
              <text class="d-block font-size-22 mt-8 opacity-50" style="color: #ffffff;">
                {{ i18n.expectedLoss + ':' + expectedLoss }}
              </text>
            </view>
          </view>
          <view class="d-flex-between-center mt-30">
            <button class="secondary-button font-size-24 w-48 py-0" @click="showEdit = false" style="color: #ffffff;">
              {{ $t("common.cancel") }}
            </button>
            <button class="w-48 primary-button font-size-24 py-0" @click="confirm" style="color: #ffffff;">
              {{ $t("common.confirm") }}
            </button>
          </view>
        </view>
      </u-popup>

      <!-- 一键平仓 -->
      <u-action-sheet :list="coverNav" v-model="showCoverAll" @click="coverAllFunc"></u-action-sheet>

    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currency_id: 0,
      legal_id: 0,
      page: 1,
      canGet: true,
      list: [],
      info: {
        hazard_rate: 0,
        profits_all: 0
      },
      editId: 0,
      showEdit: false,
      currentItem: {},
      profitPrice: 0,//设置的止盈价
      expectedProfit: 0,//预期止盈价
      lossPrice: 0,//设置的止损价
      expectedLoss: 0,//预期亏损,
      showCoverAll: false,
      from: 1, //1需要navigateback，0，需要redirect
      current: 0,
      status: 1
    };
  },
  onLoad(options) {
    const {
      legal_id,
      currency_id,
      from
    } = options
    if (!legal_id || !currency_id) {
      this.$utils.showToast(this.$t("common.paramsWrong"))
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/trade/trade'
        })
      }, 1200)
      return
    }
    this.legal_id = legal_id || 3
    this.currency_id = currency_id || 1
    this.from = from || 0

    this.startSocket()
  },
  onShow() {
    this.canGet = true
    this.page = 1
    this.list = []
    this.getLeverDealByPage()
  },
  methods: {
    getLeverDealByPage() {
      if (!this.canGet) return
      const {currency_id, legal_id, page, status} = this
      //this.$u.api.market.getleverTrade(currency_id,legal_id,page,status).then(res=>{
      //getleverTrade: (currency_id,legal_id,page,status) => vm.$u.post("/lever/my_trade",{currency_id,legal_id,page,status}),
      let data = {legal_id: legal_id, page: page, status: status};
      this.$https.initDataToken({
        url: 'lever/my_trade',
        type: 'POST',
        data
      }, (res, msg) => {
			let order = res.data
		   this.info = res.rate_profits_total
		   if(order.length < res.per_page) {
			this.list = order
			this.canGet = false
		   }else {
			this.list = this.list.concat(order)
		   }
      })
    },
    changeNav(e) {
      this.current = e
      if (e == 0) this.status = 1
      if (e == 1) this.status = 3
      this.canGet = true
      this.page = 1
      this.list = []
      this.getLeverDealByPage()
    },
    async startSocket() {
      const _this = this
      let ret = await this.$u.api.setting.getUserInfo()
      ret = ret.message

      // this.$store.state.socket.emit('login', ret.id);
      // this.$store.state.socket.on('lever_trade', res => {
      //   this.info = {
      //     ...this.info,
      //     ...res
      //   }
      // });
      // this.$store.state.socket.on('lever_closed', res => {
      //   const ids = res.id || []
      //   ids.forEach(item => {
      //     const has = this.list.findIndex(el => el.id == item)
      //     if (has > -1) this.list.splice(has, 1)
      //   })
      // });
      // this.$store.state.socket.on('daymarket', data => {
      //   if (this.currency_id == data.currency_id && this.legal_id == data.legal_id) {
      //     this.list.forEach(item => {
      //       item.update_price = data.now_price
      //     })
      //   }
      // });
    },
    //平仓
    cover(id) {
      this.$u.throttle(async () => {
        const {i18n} = this
        const ret = await this.$utils.showModal(this.$t("common.hint"), i18n.confirmCover)
        if (!ret) return
        let data = {id: id}
        this.$https.initDataToken({
          url: 'lever/close',
          type: 'POST',
          data
        }, (res, msg) => {

          const has = this.list.findIndex(item => item.id == id)
          this.list.splice(has, 1)
          this.$utils.showToast(res)
        })
      }, 1200)
    },
    //转自持
    selfHold(id) {
      this.$u.throttle(async () => {
        const {i18n} = this
        const ret = await this.$utils.showModal(this.$t("common.hint"), i18n.confirmSelfHold)
        if (!ret) return
        let data = {transaction_id: id};
        this.$https.initDataToken({
          url: 'follow/selfHolding',
          type: 'POST',
          data
        }, (res, msg) => {

          const has = this.list.findIndex(item => item.id === id)
          let item = this.list[has]
          item.order_type = 1
          this.list.splice(has, 1, item)

          this.$utils.showToast(res)
        })
      }, 1200)
    },
    //设置止盈止损
    editFunc(item) {
      this.currentItem = item
      this.editId = item.id
      //设置止盈和预期盈利
      this.profitPrice = item.target_profit_price > 0 ? Number(item.target_profit_price) : Number(item.update_price);

      //设置止损和预期亏损
      this.lossPrice = item.stop_loss_price > 0 ? Number(item.stop_loss_price) : Number(item.update_price);

      this.showEdit = true
    },
    //提交修改止盈止损
    confirm() {
      const {currentItem, profitPrice, lossPrice} = this
      //this.$u.api.market.setStop(currentItem.id,profitPrice,lossPrice).then(res=>{
      let data = {
        id: currentItem.id,
        target_profit_price: profitPrice,
        stop_loss_price: lossPrice
      };
      this.$https.initDataToken({
        url: 'lever/setstop',
        type: 'POST',
        data
      }, (res, msg) => {
        this.$utils.showToast(res)
        const has = this.list.findIndex(item => item.id === currentItem.id)
        let item = this.list[has]
        item.target_profit_price = profitPrice
        item.stop_loss_price = lossPrice
        this.list.splice(has, 1, item)
        this.showEdit = false
      })
    },
    //全部平仓
    coverAllFunc(type) {
      this.$u.throttle(async () => {
        const {i18n} = this
        let str = this.$t("common.confirm") + i18n.coverAll + '?'
        if (type == 1) {
          str = this.$t("common.confirm") + i18n.onlyCoverMany + '?'
        } else if (type == 2) {
          str = this.$t("common.confirm") + i18n.onlyCoverEmpty + '?'
        }
        const ret = await this.$utils.showModal(this.$t("common.hint"), str)
        if (!ret) return

        let data = {type: type};
        this.$https.initDataToken({
          url: 'lever/batch_close',
          type: 'POST',
          data
        }, (res, msg) => {
          this.$utils.showToast(res)
          this.list = []
          this.canGet = true
          this.page = 1
          this.getLeverDealByPage()
        })
      }, 1200)
    },
    backTo() {
      if (this.from == 1) {
        uni.navigateBack({
          delta: 1
        })
      } else {
        uni.switchTab({
          url: '/pages/transaction/index'
        })
      }
    }
  },
  computed: {
    i18n() {
      return this.$t("transaction")
    },
    coverNav() {
      return [{
        text: this.$t("transaction.coverAll")
      }, {
        text: this.$t("transaction.onlyCoverMany")
      }, {
        text: this.$t("transaction.onlyCoverEmpty")
      }]
    },
    nav() {
      return [{
        name: this.$t("transaction.position")
      }, {
        name: this.$t("transaction.cover")
      }]
    }
  },
  onReachBottom() {
	  if(!this.canGet) return
	  this.page += 1
    this.getLeverDealByPage()
  },
  watch: {
    profitPrice() {
      let expectedProfit = 0
      const {currentItem, profitPrice} = this
      if (item.type == 1) {
        if (profitPrice > item.price) {
          expectedProfit = (profitPrice - item.price) * item.share;
        } else {
          expectedProfit = '0.00';
        }

      } else {
        if (item.price > profitPrice) {
          expectedProfit = (item.price - profitPrice) * item.share;
        } else {
          expectedProfit = '0.00';
        }

      }
      this.profitPrice = profitPrice.toFixed(4)
    },
    lossPrice() {
      let expectedLoss = 0
      const {currentItem, lossPrice} = this

      if (currentItem.type == 1) {
        if (currentItem.price > lossPrice) {
          expectedLoss = (currentItem.price - lossPrice) * currentItem.share;
        } else {
          expectedLoss = '0.00';
        }

      } else {
        if (lossPrice > currentItem.price) {
          expectedLoss = (lossPrice - currentItem.price) * currentItem.share;
        } else {
          expectedLoss = '0.00';
        }
      }
      this.expectedLoss = expectedLoss.toFixed(4)
    }
  },
  onHide() {

  },
  onUnload() {

  }
}
</script>

<style lang="scss">
page {
  background: #242424;
}
</style>
