<template>
  <view class="pb-30 text-white">
    <u-navbar :title="$t('c2c.merchantInfo')" showback="true">
      <navigator url="/pages/c2c/c2c_merchant_order" slot="right" style="color: #2A64FB;">
        <image src="/static/bib/order.webp" style="width: 58rpx; height: 58rpx;"></image>
      </navigator>
    </u-navbar>
    <!-- 内容 -->
    <view class="mx-30 mt-30">



      <view class="mt-6">




        <view style="display: flex;width:100%;margin: 12px;border-bottom: 1px solid #f7f7f7;padding-bottom: 8px;">
          <view style="width:80px;font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;"
                @click="changeTab(0)">
            <span :class="currentTab==0 ?'activeTab':'normalTab' ">{{ $t('c2c.buy') }}</span>
          </view>
          <view style="width: 80px;font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;"
                @click="changeTab(1)">
            <span :class="currentTab==1 ?'activeTab':'normalTab' ">{{ $t('c2c.sell') }}</span>
          </view>

          <view style="width: 80px;font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;"
                @click="changeTab(2)">
            <span :class="currentTab==2 ?'activeTab':'normalTab' ">{{ $t('setting.mine') }}</span>
          </view>

          <view
              style="flex: 1;font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;display: flex;justify-content: right;">
            <navigator url="/pages/c2c/publish_c2c">
              <view
                  style="border: 1px solid #2A64FB;color: #2A64FB;width:80px;text-align: center;border-radius: 4px;margin-right: 5px;">
                发布信息
              </view>
            </navigator>

          </view>


        </view>


        <!-- 交易员列表 -->
        <block v-if="list.length">
        <view class="list mt-20" style="background: #ffffff;">
          <view v-for="item in list" style="background: #ffffff;">
            <view style="background: #ffffff;border-bottom: 1px solid #f7f7f7;">
              <view style="display: flex;justify-content: space-between;color: #000;margin-top: 18px;">
                <view>
                  <view class="d-flex align-items-center">
                    <text class="font-size-32 mr-12" style="color: #000;">{{ item.c2c_name }}</text>
                    <view class="user-num" style="background: transparent">
                      <image @click="closeNotice(popupAd.id)" src="../../static/c2c/q.webp" mode="aspectFit"
                             style="width:15px;height:15px;margin-top: 2px;"></image>
                    </view>
                  </view>


                </view>
                <view style="display: flex;">

                  <view style="font-size: 12px;line-height: 15px;height: 15px;">成交量 38</view>
                  <view
                      style="font-size: 12px;line-height: 15px;height: 15px;border-left: 1px solid #999;margin-left: 5px;padding-left: 5px;">
                    97%
                  </view>


                </view>
              </view>


              <view style="display: flex;justify-content: space-between;color: #000;">
                <view>
                  <view style="color: #000000;opacity: 1.0;font-weight: 700;font-size: 14px;margin-top: 5px;">
                    ￥{{ item.price }}
                  </view>
                  <view style="display: flex;">
                    <text style="font-size: 12px;line-height: 20px;height: 20px;">数量</text>
                    <text style="font-size: 12px;line-height: 20px;height: 20px;">{{ item.surplus_number }} USDT</text>
                  </view>
                  <view style="display: flex;">
                    <text style="font-size: 12px;line-height: 20px;height: 20px;">{{ $t('c2c.max') }}</text>
                    <text style="font-size: 12px;line-height: 20px;height: 20px;">{{ item.min_number }}-{{item.max_number}} CNY</text>
                  </view>
                </view>
                <view>
                  <view></view>
                  <view></view>
                </view>
              </view>

              <view style="display: flex;justify-content: space-between;color: #000;margin-top: 15px;">
                <view style="display: flex;height: 30px;margin-top: 2px;">
                  <view>
                    <view style="width: 3px;height: 14px;background: #0ba360"></view>
                  </view>
                  <view style="line-height: 14px;height: 14px;margin-left: 2px;">银行卡</view>
                </view>

                <view>

                  <u-button @click="order(item)"
                            style="background: #31bd65;border-radius: 18px;line-height: 30px;height: 30px;color: #ffffff;margin-bottom: 18px;"
                           >编辑
                  </u-button>

                </view>

              </view>


            </view>


          </view>
        </view>
        </block>
        <view v-else>
          <image src="/static/image/svg/empty.png"
                 class="mx-auto d-block my-30"
                 style="width: 230rpx;height: 252rpx;margin-top: 120px;"></image>
          <text class="text-center opacity-50 font-size-22 py-0 d-block"
                style="margin-top:0px;color: #929292;">{{$t("common.hasNoData")}}</text>
        </view>

        <u-popup v-model="modalShow" border-radius="10" length="90%">
          <view class="p-30">
            <text class="d-block font-size-30 font-weight-bold" style="color: #000;">
              {{ buyDirection ? i18n.sell : i18n.buy }}
            </text>
            <view class="d-flex-between-center border-bottom-white py-16">
              <text class="opacity-50" style="color: #000;">{{ $t('c2c.buy_amount') }}</text>
              <text class="font-weight-bold">
                <input type="number" placeholder="请输入购买数量" v-model="alertInfo.amount"
                       style="color: #000;text-align: right" placeholder-style="color:#929292;font-weight:300;"/>
              </text>
            </view>
            <view class="d-flex-between-center border-bottom-white py-16">
              <text class="opacity-50" style="color: #000;">{{ $t('c2c.onePrice') }}</text>
              <text class="font-weight-bold" :class="buyDirection ? 'text-error' : 'text-success'">
                ￥{{ alertInfo.price }}
              </text>
            </view>
            <view class="d-flex-between-center border-bottom-white py-16">
              <text class="opacity-50" style="color: #000;">{{ $t('c2c.pay_info') }}</text>
              <text class="font-weight-bold" style="color: #000;display: flex;flex-direction: column;">
                <view style="display: flex;flex-direction: row;">
                  <text style="height: 20px;line-height: 20px;">6214111111111111</text>

                </view>
                <view>孙悟空</view>
                <view>中国邮政储蓄银行</view>
              </text>
            </view>

            <view class="d-flex-between-center mt-30">
              <button class="secondary-button font-size-28 w-48 py-0"
                      style="background: #ffffff;border: 1px solid #e1e1e1;"
                      @click="modalShow = false">{{ $t("common.cancel") }}
              </button>
              <button class="w-48 font-size-28 py-0" @click="sureOrder(alertInfo)"
                      :class="buyDirection ? 'error-button' : 'success-button'">{{ $t("common.confirm") }}
              </button>
            </view>
          </view>
        </u-popup>

        <u-popup v-model="modalSellShow" border-radius="10" length="90%">
          <view class="p-30">
            <text class="d-block font-size-30 font-weight-bold" style="color: #000;">
              {{ buyDirection ? i18n.sell : i18n.buy }}
            </text>
            <view class="d-flex-between-center border-bottom-white py-16">
              <text class="opacity-50" style="color: #000;">{{ $t('c2c.sell_amount') }}</text>
              <text class="font-weight-bold">
                <input type="number" placeholder="请输入出售数量" v-model="alertSellInfo.amount"
                       style="color: #000;text-align: right" placeholder-style="color:#929292;font-weight:300;"/>
              </text>
            </view>
            <view class="d-flex-between-center border-bottom-white py-16">
              <text class="opacity-50" style="color: #000;">{{ $t('c2c.onePrice') }}</text>
              <text class="font-weight-bold text-success">￥{{ alertSellInfo.price }}</text>
            </view>
            <view class="d-flex-between-center border-bottom-white py-16">
              <text class="opacity-50" style="color: #000;">{{ $t('c2c.shoukuan_info') }}</text>
              <text class="font-weight-bold" style="color: #000;display: flex;flex-direction: column;">
                <input type="text" class="input" disabled @click="showSelectPayMethod=true" style="color: #000;"
                       :placeholder="i18n.plsSelectCurrency" v-model="pay.text">
              </text>
            </view>

            <view class="d-flex-between-center mt-30">
              <button class="secondary-button font-size-28 w-48 py-0"
                      style="background: #ffffff;border: 1px solid #e1e1e1;"
                      @click="modalSellShow = false">{{ $t("common.cancel") }}
              </button>
              <button class="w-48 font-size-28 py-0 success-button" @click="confirmSellOrder(alertSellInfo)">
                {{ $t("common.confirm") }}
              </button>
            </view>
          </view>
        </u-popup>

        <u-action-sheet :list="payMethodList" v-model="showSelectPayMethod" @click="confirmPay"></u-action-sheet>


      </view>
    </view>
  </view>
</template>
<script>
import UButton from "../../uview-ui/components/u-button/u-button.vue";
import Index from "../../components/page-animation/index.vue";

export default {
  components: {Index, UButton},
  data() {
    return {
      pay: {},
      payMethodList: [],
      showSelectPayMethod: false,
      alertSellInfo: {},//出售弹出框字段数组
      alertInfo: {},//购买弹出框字段数组
      modalShow: false,
      modalSellShow: false,
      currentTab: 0,
      page: 1,
      canGet: true,
      list: [],
      sortNav: [{
        name: '综合排名',
      }, {
        name: '近2周收益',
      }, {
        name: '累计收益',
      }, {
        name: '累计交易笔数',
      }, {
        name: '当前跟随人数',
      }, {
        name: '近2周胜率',
      }],
      activeSotrNav: 0,
      showOnlyHasLocation: false,
      showSelectSortNav: false,
      type: 'buy',
      currency_id: 23,
      isMerchant: 0
    };
  },
  onShow() {
    this.getMyPublishInfoList();
  },
  mounted() {
    this.page = 1;
    this.canGet = true;
    this.list = []

    const token = uni.getStorageSync('token') || "";

    if (token != null && token.length > 6) {
      this.getCashInfo();
      this.getCurrentUserInfo();
    }
  },
  methods: {
    getCurrentUserInfo() {
      let that = this;
      this.$u.api.c2c.getCurrentUserInfo().then(res => {

        let data = res.message;
        that.isMerchant = data.isMerchant;
        console.log("是否商家==>" + that.isMerchant);

      });
    },
    confirmPay(index) {

      this.pay = this.payMethodList[index]

    },
    //获取收款信息
    getCashInfo() {
      let that = this;
      this.$u.api.setting.getCard().then(res => {
        console.log("获取收款信息=>" + JSON.stringify(res));
        if (res.type == "ok") {

          if (res.message != null) {
            let data = res.message;

            that.trueName = data.real_name;
            that.bankName = data.bank_name;
            that.bankNum = data.bank_account;
            that.aliPayAccount = data.alipay_account;
            that.weChatAccount = data.wechat_account;
            that.weChatName = data.wechat_nickname;

            if (this.bankNum != null && this.bankNum.length > 0 && this.bankNum != "null") {

              that.payMethodList.push({value: "bank", text: "银行卡"});
            }
            if (this.aliPayAccount != null && this.aliPayAccount.length > 0 && this.aliPayAccount != "null") {
              that.payMethodList.push({value: "ali_pay", text: "支付宝"});
            }
            if (this.weChatAccount != null && this.weChatAccount.length > 0 && this.weChatAccount != "null") {
              that.payMethodList.push({value: "we_chat", text: "微信"});
            }
            if (that.payMethodList.length > 0) {
              that.pay = that.payMethodList[0];
            }


          }

        }
      });
    },
    confirmSellOrder() {
      let that = this;
      this.$u.api.c2c.buyCoin(this.alertInfo.id, this.alertInfo.amount, this.type).then(res => {
        console.log("sureOrder==>" + JSON.stringify(res));
        if (res.type == "ok") {
          that.modalShow = false;
          that.$utils.showToast(res.message.msg);
          that.page = 1;
          that.getList();

        } else {
          that.$utils.showToast(res.message.msg);
        }
      })
    },
    //购买下单请求
    sureOrder() {
      let that = this;
      this.$u.api.c2c.buyCoin(this.alertInfo.id, this.alertInfo.amount, this.type).then(res => {
        console.log("sureOrder==>" + JSON.stringify(res));
        if (res.type == "ok") {
          that.modalShow = false;
          that.$utils.showToast(res.message.msg);
          that.page = 1;
          that.getList();

        } else {
          that.$utils.showToast(res.message.msg);
        }
      })


    },
    // 下单
    order(item) {
      let that = this;
      that.modalShow = true;
      this.alertInfo = item;
    },
    sellOrder(item) {
      let that = this;
      that.modalSellShow = true;
      this.alertSellInfo = item;
    },
    changeTab(val) {
      if (val == 2) {
        this.$utils.jump("/pages/c2c/c2c_mine");
      }

      this.currentTab = val;
      if (val == 1) {
        this.type = "buy";
      }
      if (val == 0) {
        this.type = "sell";
      }
      this.getMyPublishInfoList();

    },
    getMyPublishInfoList() {
      //page,type,currency_id
      let that = this;
      that.list = [];
      //this.$u.api.c2c.getMerchantPublishList(this.page, this.type, this.currency_id).then(res => {
      //getMerchantPublishList: (page, type, currency_id) => vm.$u.post("/c2c/merchantPublishList",{page, type, currency_id}),//已经发布信息
      const lang = uni.getStorageSync('lang') || 'en';
      let data={page:that.page, type:that.type, currency_id:that.currency_id};
      that.$https.initDataToken({
        url: "c2c/merchantPublishList?lang=" + lang,
        type: "GET",
        data
      }, (res, msg) => {
        const list = res.data
        if (list.length) {
          that.list = list;
          that.page = 1;
        } else {
          that.canGet = false
        }
      })
    },
    async cancel(id) {
      const {i18n} = this
      const ret = this.$utils.showModal(this.$t("common.hint"), i18n.confirmCancel)
      if (!ret) return

    }
  },
  computed: {
    i18n() {
      return this.$t("follow")
    },
    actionSheetSortNav() {
      return this.sortNav.map((item, index) => {
        item.text = item.name;
        item.disabled = false;
        if (index == this.activeSotrNav) item.disabled = true;
        return item
      })
    }
  },
  onReachBottom() {
    this.getTraderList()
  }
}
</script>
<style lang="scss" scoped>
.deposit {
  @extend .border-radius-20;
  color: white;
  padding: 0 28 rpx;
  padding-top: 38 rpx;
  position: relative;

  .earnings-wrap {
    margin: 0 -28rpx;
    margin-top: 30 rpx;

    .earnings {
      padding: 30 rpx 28 rpx 28 rpx 28 rpx;
      background-color: rgba(255, 255, 255, .1);
    }
  }

  .dealer {
    position: absolute;
    top: 26 rpx;
    right: 0;
    color: #7f612e;
    border-radius: 31 rpx 0 0 31 rpx;
    background-image: linear-gradient(to right, #d9c39b, #fef8cb);
    padding: 14 rpx 44 rpx;
    display: flex;
    align-items: center;
  }
}

.sort-nav {
  margin-top: 16 rpx;
  display: flex;
  justify-content: space-between;

  .item {
    font-size: 26 rpx;
    color: rgba(51, 51, 51, .5);
    border: 1px solid #eff2fb;
    background-color: #eff2fb;
    border-radius: 8 rpx;
    padding: 2 rpx 7 rpx;
    margin-right: 12 rpx;

    &.active {
      background-color: #fff;
      border: 1px solid #d6173a;
      color: #d6173a;
    }
  }
}

.list {
  .item {
    @extend .box-shadow,
    .border-radius-20,
    .pt-30,
    .pb-40,
    .px-28,
    .bg-black,
    .mb-12;

    .user-num {
      @extend .d-flex,
      .align-items-center;
      border-radius: 6 rpx;
      background-color: #ecf2ff;
      color: #3084fa;
      padding: 2 rpx 8 rpx;
    }

    .status {
      font-size: 28 rpx;
      padding: 8 rpx 20 rpx;
      border-radius: 8 rpx;
      border: 2 rpx solid #fc7600;
    }

    .status-1 {
      @extend .status;
      color: #fc7600;
      border-color: #fc7600;
    }

    .status-2 {
      @extend .status;
      color: #fff;
      border-color: #3482fe;
      background-color: #3482fe;
    }

    .nums-item {
      width: 33.33%;
      margin-top: 20 rpx;

      text {
        display: block;
      }

      .text-1 {
        font-size: 22 rpx;
        opacity: .5;
      }

      .text-2 {
        font-size: 32 rpx;
        margin-top: 12 rpx;
      }
    }
  }
}

.activeTab {
  color: #000;
  width: 30px;
  border-width: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #2A64FB;
  font-weight: 700;
}

.normalTab {
  width: 30px;
  border-width: 12px;
  padding-bottom: 8px;
  color: #929292;
  font-weight: 700;
}
</style>
