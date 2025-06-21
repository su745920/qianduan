<template>
  <view class="">
	  <l-common-navbar  />
    <view
        style="background-image: url('https://admin.coinbmex.com/toobit/invite-bg.98193318.png');height: 320px;width: 100%;background-size: cover;">
      <view style="display: flex;flex-direction: column;padding-top: 30px;">
        <view style="color: #ffffff;font-size: 18px;font-weight: 500;padding-left: 20px;">{{ $t('invite.a') }}</view>
        <view
            style="color: #ffffff;font-size: 24px;font-weight: 700;padding-left: 20px;display: flex;justify-content: flex-start;margin-top: 20px;">
          <span style="color: #ffffff;line-height: 30px;height: 30px;">{{ $t('invite.b') }}</span>
          <span style="color: #1FA2FF;line-height: 30px;height: 30px;">40%</span>
          <span style="color: #ffffff;line-height: 30px;height: 30px;">{{ $t('invite.c') }}</span>
        </view>
        <view @click="$utils.jump('/pages/setting/rebate_rules')"
              style="color: #1FA2FF;font-size: 12px;font-weight: 300;padding-left: 20px;margin-top: 40px;">
          {{ $t('invite.d') }}

        </view>
      </view>

      <view style="display: flex;justify-content: flex-end;margin-top: -70px;padding: 20px;">
        <img src="@/static/toobit/image_invite_top.png" style="width: 200px;height:200px;">
      </view>
    </view>
    <view style="padding: 20px;margin-top: 40px;">
      <view style="border: 1px solid #292929;margin: 0 auto;height: 210px;width: 100%;border-radius: 4px;background: #242424;">
        <view style="text-align: center;color: #ffffff;margin-top: 15px;">{{ $t('invite.e') }}</view>
        <view style="padding: 10px;display: flex;">
          <view
              style="border: 1px solid #343434;margin: 0 auto;height: 30px;width: 100%;border-radius: 4px;display:flex;align-items: center;">
            <view style="margin: 5px;color: #A8ABA2;font-size: 12px;">{{ $t('invite.f') }}</view>
            <view style="flex: 1;color: #ffffff;font-weight: 700;font-size: 16px;">
              {{ userInfo.extension_code }}
            </view>
            <view>
              <img src="@/static/toobit/icon_copy_blue.png" @click="copy2();"
                   style="width: 16px;height: 16px;">
            </view>
          </view>
        </view>

        <view style="padding: 10px;display: flex;">
          <view
              style="border: 1px solid #343434;margin: 0 auto;height: 30px;width: 100%;border-radius: 4px;display:flex;align-items: center;">
            <view style="margin: 5px;color: #A8ABA2;font-size: 12px;">{{ $t('invite.g') }}</view>
            <view style="flex: 1;color: #ffffff;font-weight: 700;font-size: 16px;">

              https://admin.coinbmex.com/#/pages...
            </view>
            <view>
              <img src="@/static/toobit/icon_copy_blue.png" @click="copy1();"
                   style="width: 16px;height: 16px;">
            </view>
          </view>
        </view>

        <view style="padding: 10px;display: flex;">
          <button class="connect_btn"
              style="width: 100%;margin: 10px;height: 40px;color: #000000;font-size: 16px;font-weight: 500;">
            {{ $t('invite.share_posters') }}
          </button>
        </view>

      </view>
    </view>


    <u-sticky style="background: #000000;">

      <div class="title fColor1 flex;" style="line-height: 51px;background: #000000;">
        <div class="inblock" style="display: flex">
          <div>
          <span @click="load(1)" :class="{'active': load_type == 1,'inactive': load_type != 1  }">
            {{ $t('invite.remittance_records') }}
          </span>
          </div>
          <div>
          <span @click="load(0)" :class="{'active': load_type == 0,'inactive': load_type != 0  }">
            {{ $t('invite.invitation_details') }}
          </span>
          </div>

          <div style="flex: 1"></div>


        </div>
      </div>

    </u-sticky>
    <view class="list" style="background: #000000;width: 100%;margin: 0;padding: 0;">

      <view class="p-30 border-bottom text-black" style="width: 100%;" v-if="load_type === 0">
        <view class="d-flex" style="width: 100%;">
          <view class="d-flex align-items-center" style="display: flex;justify-content: space-between;width: 100%;">
            <text style="color: #939393;width: 140px;">UID</text>
            <text style="color: #939393;flex: 2;"> {{ $t('invite.invitation_time') }}</text>
            <text style="color: #939393;flex: 1;text-align: right;">{{ $t('invite.subordinate_account') }}</text>
          </view>
        </view>
      </view>

      <view class="p-30 border-bottom text-black" style="width: 100%;" v-else>
        <view class="d-flex" style="width: 100%;">
          <view class="d-flex align-items-center" style="display: flex;justify-content: space-between;width: 100%;">
            <text style="color: #939393;width: 140px;">{{ $t('invite.subordinate_account') }}</text>
            <text style="color: #939393;flex: 2;"> {{ $t('invite.invitation_time') }}</text>
            <text style="color: #939393;flex: 1;text-align: right;">{{ $t('invite.commission') }}</text>
          </view>
        </view>
      </view>


      <view class="p-30 border-bottom text-black" style="width: 100%;" v-for="item in list" v-if="load_type === 0">
        <view class="d-flex" style="width: 100%;">
          <view class="d-flex align-items-center" style="display: flex;justify-content: space-between;width: 100%;">
            <text style="color: #ffffff;width: 140px;">{{ item.id }}</text>
            <text style="color: #ffffff;flex: 2;">{{ item.time }}</text>
            <text style="color: #ffffff;flex: 1;text-align: right;">{{ item.account_number }}</text>
          </view>
        </view>
      </view>


      <view class="p-30 border-bottom text-black" style="width: 100%;" v-for="item in czRewardList"  v-if="load_type === 1">
        <view class="d-flex" style="width: 100%;">
          <view class="d-flex align-items-center" style="display: flex;justify-content: space-between;width: 100%;">
            <text style="color: #ffffff;width: 140px;">{{ item.deposit_username }}</text>
            <text style="color: #ffffff;flex: 2;">{{ item.audit_date }}</text>
            <text style="color: #ffffff;flex: 1;text-align: right;">{{ item.reward_amount }}</text>
          </view>
        </view>
      </view>


      <default-page v-if="!list.length"></default-page>


    </view>
  </view>
</template>

<script>
import Index from "../../components/page-animation/index.vue";

export default {
  components: {Index},
  data() {
    return {
      czRewardList: [],
      userInfo: {},
      load_type: 1,
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

  },
  onShow() {
    this.canGet = true
    this.page = 1
    this.list = []
    this.getMyTeamPage()
  },
  methods: {
    copy2() {
      let val = this.userInfo.extension_code;
      uni.setClipboardData({
        data: val,
      });
    },
    copy1() {
      let url = "https://admin.coinbmex.com/mobile/#/pages/common/register?extension_code=" + this.userInfo.extension_code;
      uni.setClipboardData({
        data: url,
      });
    },
    back() {
      uni.switchTab({
        url: '/pages/index/index'
      })
    },

    load(type) {
      if (this.load_type !== type) {
        this.load_type = type;

      } else {
      }
    },
    getMyTeamPage() {
      //team/index
      this.$https.initDataToken({
        url: 'team/index',
        type: 'GET'
      }, (res, msg) => {
        let order = res.list1;
        this.list = order;
        // this.page++;


      });

      this.$https.initDataToken({
        url: 'user/info',
        type: 'GET'
      }, (res, msg) => {

        this.userInfo = res;

      });
      let that = this;
      this.$https.initDataToken({
        url: 'czRewardList',
        type: 'GET'
      }, (res, msg) => {


        that.czRewardList = res;
        // let order = res.list1;
        // this.list = order;
        // this.page++;


      });

    },
    changeNav(e) {
      this.current = e
      if (e === 0) this.status = 1
      if (e === 1) this.status = 3
      this.canGet = true
      this.page = 1
      this.list = []
      this.getLeverDealByPage()
    },


    //转自持
    selfHold(id) {
      this.$u.throttle(async () => {
        const {i18n} = this
        const ret = await this.$utils.showModal(this.$t("common.hint"), i18n.confirmSelfHold)
        if (!ret) return
        this.$u.api.follow.selfHold(id).then(res => {
          const has = this.list.findIndex(item => item.id == id)
          let item = this.list[has]
          item.order_type = 1
          this.list.splice(has, 1, item)

          this.$utils.showToast(res.message)
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
      this.$u.api.market.setStop(currentItem.id, profitPrice, lossPrice).then(res => {
        this.$utils.showToast(res.message)
        const has = this.list.findIndex(item => item.id == currentItem.id)
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

        this.$u.api.market.coverAll(type).then(res => {
          this.$utils.showToast(res.message)
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
page{
  background: #000000;
}
.title {
  height: 48px;
  line-height: 46px;
  padding: 0 40px 0 30px;
  padding-left: 20px;
  padding-right: 20px;

  span {
    margin-right: 20px;
    cursor: pointer;
  }

  span:hover {
    color: #FAFAFA;
    //border-bottom: 1px solid #2A64FB;
  }
}

.inblock {
  span.active {
    font-weight: 700;
    color: #ffffff;
    border-bottom: 1px solid #ffffff;
    padding-bottom: 12px;
    border-bottom-width: 2px;
  }
}

.inblock {
  span.inactive {
    color: #939393;
    font-weight: 350;
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
