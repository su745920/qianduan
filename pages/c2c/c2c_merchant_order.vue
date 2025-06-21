<template>
  <view class="pb-30 text-white">
    <u-navbar :title="$t('c2c.merchantOrder')" showback="true">
      <navigator url="/pages/transaction/contract" slot="right" style="color: #2A64FB;">

        <u-icon name="search" size="40" color="#666" class="ml-30"
                @click="$utils.jump('/pages/market/search')"></u-icon>
      </navigator>
    </u-navbar>
    <!-- 内容 -->
    <view class="mx-30 mt-30">


      <view class="mt-6">


        <div style="display: flex;width:100%;margin: 12px;border-bottom: 1px solid #f7f7f7;padding-bottom: 8px;">
          <div style="width:80px;font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;"
               @click="changeTab(0)">
            <span :class="currentTab==0 ?'activeTab':'normalTab' ">{{ $t('c2c.pending') }}</span>
          </div>
          <div style="width: 80px;font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;"
               @click="changeTab(1)">
            <span :class="currentTab==1 ?'activeTab':'normalTab' ">{{ $t('c2c.completed') }}</span>
          </div>
          <div style="flex: 1;font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;">
          </div>


        </div>
        <!-- 进行中订单 -->
        <view class="list mt-20" style="background: #ffffff;" v-if=" is_sure == 0 ">

          <view v-if="list.length > 0 " v-for="item in list" style="background: #ffffff;">
            <view style="background: #ffffff;border-bottom: 1px solid #f7f7f7;"
                  @click="detailFn(item.id);">
              <view style="display: flex;justify-content: space-between;color: #000;margin-top: 18px;">
                <view>


                  <view class="d-flex align-items-center">
                    <text class="font-size-32 mr-12" style="color: #000;" v-if=" item.is_sure == 0 ">
                      {{ item.c2c_name }}
                    </text>
                    <text class="font-size-32 mr-12" style="color: #000;" v-if=" item.is_sure == 3 ">
                      <span v-if="item.type == 'buy' "><span style="color: #31bd65;">出售</span>{{ item.currency_name }}</span>
                      <span v-if="item.type == 'sell' "><span
                          style="color: #EB4B6D;">购买</span>{{ item.currency_name }}</span>
                    </text>

                    <view class="user-num" style="background: transparent">
                      <image @click="closeNotice(popupAd.id)" src="../../static/c2c/q.webp" mode="aspectFit"
                             style="width:15px;height:15px;margin-top: 2px;"></image>
                    </view>
                  </view>


                </view>
                <view style="display: flex;">

                  <view style="font-size: 12px;line-height: 15px;height: 15px;" v-if=" item.is_sure == 0 ">成交量 38
                  </view>
                  <view
                      style="font-size: 12px;line-height: 15px;height: 15px;border-left: 1px solid #999;margin-left: 5px;padding-left: 5px;"
                      v-if=" item.is_sure == 0 ">97%
                  </view>

                  <view style="font-size: 12px;line-height: 15px;height: 15px;" v-if=" item.is_sure == 3 ">待放币</view>
                  <!-- 已经付款 则等待卖家放币 -->


                </view>
              </view>


              <view style="display: flex;justify-content: space-between;color: #000;">
                <view>
                  <view style="margin-top: 5px;color: #666666;font-size: 12px;">价格 ￥{{ item.price }}</view>
                  <view style="display: flex;">
                    <text style="font-size: 12px;line-height: 20px;height: 20px;color: #666666;">数量</text>
                    <text style="font-size: 12px;line-height: 20px;height: 20px;color: #666666;">{{ item.number }}
                      USDT
                    </text>
                  </view>
                  <view style="display: flex;">


                    <view
                        style="background: #f7f7f7;border-radius: 8px;border: 1px solid #e1e1e1;padding-left: 5px;padding-right: 5px;">
                      <text style="font-size: 12px;line-height: 20px;height: 20px;">
                        {{ item.c2c_name }}
                      </text>
                    </view>

                  </view>
                </view>
                <view>

                  <view></view>
                  <view style="margin-top: 25px;font-weight: 700;font-size: 20px;">
                    {{ Number(item.deal_money).toFixed(2) }}CNY
                  </view>
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

                  <u-button @click="confirmReceiveMoney(item.id)"
                            style="background: #31bd65;border-radius: 18px;line-height: 30px;height: 30px;color: #ffffff;margin-bottom: 18px;"
                            v-if="item.is_sure == '3' ">
                    {{ $t('c2c.conReceive') }} <!-- 确认付款 -->
                  </u-button>
                  <u-button
                      style="background: #eb4b6d;border-radius: 18px;line-height: 30px;height: 30px;color: #ffffff;margin-bottom: 18px;"
                      v-if="type == 'sell' ">出售
                  </u-button>
                </view>

              </view>


            </view>


          </view>

          <view v-if="list.length ===0 ">
            <image src="/static/image/svg/empty.png"
                   class="mx-auto d-block my-30"
                   style="width: 230rpx;height: 252rpx;margin-top: 120px;"></image>
            <text class="text-center opacity-50 font-size-22 py-0 d-block"
                  style="margin-top:0px;color: #929292;">{{ $t("common.hasNoData") }}
            </text>
          </view>

        </view>

        <!-- 已完成订单 -->
        <view class="list mt-20" style="background: #ffffff;" v-if=" is_sure == 1 ">
          <view v-if="list.length > 0 " v-for="item in list" style="background: #ffffff;">

            <view style="background: #ffffff;border-bottom: 1px solid #f7f7f7;" @click="detailFn(item.id);">
              <view style="display: flex;justify-content: space-between;color: #000;margin-top: 18px;">
                <view>

                  <view class="d-flex align-items-center">

                    <text class="font-size-32 mr-12" style="color: #000;display: flex">
                      <span v-if="item.type == 'buy' "><span style="color: #31bd65;">出售</span>{{ item.currency_name }}</span>
                      <span v-if="item.type == 'sell' "><span
                          style="color: #EB4B6D;">购买</span>{{ item.currency_name }}</span>
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
                  <view style="display: flex;">
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


            </view>


          </view>
          <view v-if="list.length ===0 ">
            <image src="/static/image/svg/empty.png"
                   class="mx-auto d-block my-30"
                   style="width: 230rpx;height: 252rpx;margin-top: 120px;"></image>
            <text class="text-center opacity-50 font-size-22 py-0 d-block"
                  style="margin-top:0px;color: #929292;">{{ $t("common.hasNoData") }}
            </text>
          </view>
        </view>


        <u-popup v-model="modalShow" border-radius="10" length="90%">
          <view class="p-30">
            <text class="d-block font-size-30 font-weight-bold" style="color: #000;">
              {{ buyDirection ? i18n.sell : i18n.buy }}
            </text>
            <view class="d-flex-between-center border-bottom-white py-16">
              <text class="opacity-50" style="color: #000;">{{ $t('c2c.buy_amount') }}</text>
              <text class="font-weight-bold">
                <input type="number" placeholder="请输入购买数量" style="color: #000;text-align: right"
                       placeholder-style="color:#929292;font-weight:300;"/>
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
              <text class="font-weight-bold" style="color: #000;">6214111111111111</br>孙悟空</br>中国邮政储蓄银行
              </text>
            </view>
            <view class="d-flex-between-center border-bottom-white py-16">
              <text class="opacity-50" style="color: #000;">{{ i18n.multiple }}</text>
              <text class="font-weight-bold" style="color: #000;">{{ multiple }}</text>
            </view>
            <view class="d-flex-between-center border-bottom-white py-16">
              <text class="opacity-50" style="color: #000;">{{ i18n.handlingFee }}</text>
              <text class="font-weight-bold" style="color: #000;">{{ handlingFee }}</text>
            </view>
            <view class="d-flex-between-center border-bottom-white py-16">
              <text class="opacity-50" style="color: #000;">{{ i18n.margin }}</text>
              <text class="font-weight-bold" style="color: #000;">{{ margin }}</text>
            </view>
            <view class="d-flex-between-center mt-30">
              <button class="secondary-button font-size-28 w-48 py-0" @click="modalShow = false">
                {{ $t("common.cancel") }}
              </button>
              <button class="w-48 font-size-28 py-0" @click="sureOrder(alertInfo)"
                      :class="buyDirection ? 'error-button' : 'success-button'">{{ $t("common.confirm") }}
              </button>
            </view>
          </view>
        </u-popup>
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
  onShow() {

  },
  mounted() {
    this.page = 1;
    this.canGet = true;
    this.list = []
    this.merchantOrderList();
  },
  methods: {
    detailFn(id){
      this.$utils.jump('/pages/c2c/c2c_order_detail?id='+id);
    },
    //购买下单请求
    confirmReceiveMoney(id) {
      let that = this;
      //confirmReceiveMoney: (id) => vm.$u.post("/c2c/legal_deal_sure",{id}),//确认收到款项
      //this.$u.api.c2c.confirmReceiveMoney(id).then(res => {
      let  data={id:id};
      that.$https.initDataToken({
        url: "c2c/legal_deal_sure",
        type: "POST",
        data
      }, (res, msg) => {

          that.$utils.showToast(res);
          that.page = 1;
          that.merchantOrderList();


      })


    },

    confirmPay(id) {
      let that = this;
      //confirmPay: (id) => vm.$u.post("/c2c/user_legal_pay",{id}),//确认付款
      //this.$u.api.c2c.confirmPay(id).then(res => {
      that.$https.initDataToken({
        url: "c2c/user_legal_pay",
        type: "POST",
        data
      }, (res, msg) => {
          that.$utils.showToast(res);
          that.page = 1;
          that.merchantOrderList();


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
      this.list = [];
      let is_sureVal = 0;
      if (this.currentTab == 1) {
        is_sureVal = 1;
      }
      //merchantOrderList: (page,is_sure) => vm.$u.get("/c2c_seller_deal?page="+page+"&is_sure="+is_sure),
      //this.$u.api.c2c.merchantOrderList(this.page, is_sureVal).then(res => {
      this.$https.initDataToken({
        url: "c2c_seller_deal?page="+this.page+"&is_sure="+is_sureVal,
        type: "GET"
      }, (res, msg) => {
        const list = res.data
        if (list.length >= 0) {
          this.list = list;
          this.page = 1;
        } else {
          this.canGet = false
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
