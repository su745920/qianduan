<template>
  <view class="pb-30 text-white">
    <u-navbar :title="$t('c2c.merchantOrder')" showback="true">
      <navigator url="/pages/transaction/contract" slot="right" style="color: #2A64FB;">
        <image src="../../static/msg.png" style="width: 20px;height: 20px;"></image>
      </navigator>
    </u-navbar>
    <!-- 内容 -->
    <view class="mx-30 mt-30">


      <view class="mt-6">


        <!-- 已完成订单 -->
        <view class="list mt-20" style="background: #ffffff;">
          <view  style="background: #ffffff;">
            <view style="background: #ffffff;border-bottom: 1px solid #f7f7f7;padding-bottom: 5px;">
              <view style="display: flex;justify-content: space-between;color: #000;margin-top: 18px;">
                <view>

                  <view class="d-flex align-items-center">

                    <text class="font-size-32 mr-12" style="color: #000;display: flex">
                      <span v-if="item.type == 'buy' " style="font-weight: 500;">出售{{ item.currency_name }}</span>
                      <span v-if="item.type == 'sell' "><span
                          style="color: #EB4B6D;font-weight: 500;">购买</span>{{ item.currency_name }}</span>
                    </text>

                    <view class="user-num" style="background: transparent">

                    </view>
                  </view>


                </view>
                <view style="display: flex;justify-content: space-between">
                  <view style="flex: 1;">

                  </view>
                  <view style="text-align: right;justify-content: right;display: flex;margin-top: 10px;margin-right: -5px;">
                    <view style="font-size: 12px;line-height: 15px;height: 15px;" v-if=" item.is_sure == 1 ">交易完成

                    </view>
                    <image src="../../static/jt.png" mode="aspectFit" style="width:17px;height:17px;text-align: right;"></image>

                  </view>



                </view>
              </view>


              <view style="display: flex;justify-content: space-between;color: #000;">
                <view>
                  <view style="color: #000000;opacity: 1.0;font-size: 14px;margin-top: 5px;">
                    <text style="font-size: 12px;line-height: 20px;height: 20px;">价格</text>
                    <text style="font-size: 12px;line-height: 20px;height: 20px;">{{ item.price }} CNY</text>
                  </view>
                  <view style="display: flex;margin-top: 10px;">
                    <text style="font-size: 12px;line-height: 20px;height: 20px;">数量</text>
                    <text style="font-size: 12px;line-height: 20px;height: 20px;">{{ item.number }} USDT</text>
                  </view>

                </view>
                <view>

                  <view style="margin-top: 22px;font-weight: 700;height: 24px;line-height: 24px;">
                    {{ Number(item.price * item.number).toFixed(2) }}CNY
                  </view>
                </view>
              </view>

              <view style="display: flex;justify-content: space-between;color: #000;margin-top: 15px;">
                <view style="display: flex;height: 30px;margin-top: 2px;">

                  <view style="line-height: 14px;height: 14px;margin-left: 2px;display: flex;">
                    <text class="font-size-18 mr-12" style="color: #000;height: 15px;line-height: 15px;">
                      {{ item.c2c_name }}
                    </text>
                    <view class="user-num" style="background: transparent">
                      <image src="../../static/c2c/q.webp" mode="aspectFit" style="width:15px;height:15px;"></image>
                    </view>
                  </view>
                </view>

                <view>
                  {{ item.create_date }}
                </view>

              </view>

              <view style="display: flex;justify-content: space-between;">
                <view style="color: #000;">
                     收款账号
                </view>
                <view style="color: #000;">
                  {{item.userCashInfo.bank_name}}({{item.userCashInfo.bank_account}})
                </view>
              </view>

              <view style="display: flex;justify-content: space-between;margin-top: 15px;">
                <view style="color: #000;">
                  订单编号
                </view>
                <view style="color: #000;">
                  {{item.order_no}}
                </view>
              </view>

              <view style="margin-top: 20px;">

                <u-button  @click="$utils.jump('/pages/c2c/appeal')">我要申诉</u-button>

              </view>


            </view>


          </view>

        </view>



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
      item:{},
      id:0,
      buyDirection: "",
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
      is_sure: '0',
      currency_id: 23,
    };
  },
  onLoad (option){
      let id=option.id;
      this.id=id;

  },
  onShow() {

  },
  mounted() {
    this.page = 1;
    this.canGet = true;
    this.list = []
    this.merchantOrderList();
  },
  methods: {
    //购买下单请求
    confirmReceiveMoney(id) {
      let that = this;
      this.$u.api.c2c.confirmReceiveMoney(id).then(res => {
        if (res.type == "ok") {
          that.$utils.showToast(res.message);
          that.page = 1;
          that.merchantOrderList();

        } else {
          that.$utils.showToast(res.message)
        }
      })


    },

    confirmPay(id) {
      let that = this;
      this.$u.api.c2c.confirmPay(id).then(res => {
        if (res.type == "ok") {
          that.$utils.showToast(res.message);
          that.page = 1;
          that.merchantOrderList();

        } else {
          that.$utils.showToast(res.message)
        }
      })


    },
    // 下单
    order(item) {
      let that = this;
      that.modalShow = true;
      this.alertInfo = item;
    },
    changeTab(val) {
      this.currentTab = val;
      if (val == 0) {
        this.is_sure = "0";
      }
      if (val == 1) {
        this.is_sure = "1";
      }
      this.merchantOrderList();

    },
    merchantOrderList() {
      
      this.$u.api.c2c.userOrderDetail(this.id).then(res => {
         let message=res.message;
         //console.log(JSON.stringify(message));
         this.item=message;
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
