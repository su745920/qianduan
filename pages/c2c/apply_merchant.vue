<template>
  <view class="pb-30 text-white">
    <u-navbar :title="$t('c2c.becomeMerchant')" showback="true">


      <button class="warning-button connect_btn"  style="color: #000000;height: 30px;line-height: 30px;font-size: 14px;padding-left: 5px;padding-right: 5px;padding-top: -3px;"  slot="right"
              @click="formSubmit">提交申请</button>

    </u-navbar>
    <!-- 内容 -->
    <view class="mx-30 mt-30" style="background: #000000;">
      <view class="deposit bg-black" v-if="false">
        <view class="d-flex align-items-center">
          <text class="d-block font-size-28 mr-10" style="color: #ffffff;">{{ i18n.positionValuation }}</text>
          <text class="iconfont icon-yanjing_xianshi text-white font-size-36"></text>
        </view>
        <view class="mt-30">
          <view class="d-flex align-items-baseline">
            <text class="font-size-40 mr-20">0.00</text>
            <text class="font-size-22" style="color: #ffffff;opacity: .6;">CNY</text>
          </view>
        </view>
        <view class="d-block font-size-22 opacity-50 mt-8" style="color: #FFFFFF;opacity: .6;"> ≈0.00 USDT</view>
        <view class="earnings-wrap">
          <view class="earnings font-size-22">
            <view class="d-flex justify-content-between opacity-50 font-size-22">
              <text style="color: #ffffff;opacity: .6;">{{ i18n.estimatedProfitToday }}（USDT）</text>
              <text style="color: #FFFFFF;opacity: .6;">{{ i18n.rateOfReturn }}</text>
            </view>
            <view class="d-flex justify-content-between font-size-22 mt-16">
              <text style="color: #FFFFFF;">0.00</text>
              <text style="color: #FFFFFF;">0%</text>
            </view>
          </view>
        </view>
        <view class="dealer" style="margin-top: -146px;">
          <text class="mr-10" style="color: #000;opacity: 0.8;padding-left: 4px;">{{ $t('c2c.becomeMerchant') }}</text>
          <image src="/static/image/icon/copytrade-icon-1.png" style="width: 19rpx;height: 24rpx;"></image>
        </view>
      </view>


      <view class="mt-6" style="background: #000000;">
        <view class="d-flex align-items-center justify-content-between" style="margin-top: 30px;" v-if="false">
          <text class="font-size-32 font-weight-bold">{{ i18n.traderList }}</text>
          <view class="d-flex align-items-center" v-if="false">
            <image :src="`/static/image/icon/copytrade-icon-${showOnlyHasLocation ? '3' : '2'}.png`"
                   style="width: 22rpx;height: 22rpx;" @click="showOnlyHasLocation = !showOnlyHasLocation">
            </image>
            <text class="font-size-22 ml-10">{{ i18n.onlyShowsThePosition }}</text>
          </view>
        </view>
        <text class="font-size-22 opacity-50 mt-10 d-block" v-if="false">{{ i18n.theDataIsUpdatedEveryHour }}</text>

        <block v-if="false">
          <view class="sort-nav">
            <text v-for="(item,index) in sortNav.slice(0,4)" :key="item.name" class="item"
                  :class="{active:index == activeSotrNav}" @click="activeSotrNav=index">{{ item.name }}
            </text>
            <text class="item" style="padding-left: 16rpx;padding-right: 16rpx;"
                  @click="showSelectSortNav=true">...
            </text>
          </view>
          <u-action-sheet :list="actionSheetSortNav" v-model="showSelectSortNav"></u-action-sheet>
        </block>






        <view class="list mt-20" style="background: #000000;">
          <form @submit="formSubmit" @reset="formReset">


            <view class="uni-form-item uni-column">
              <view class="title" style="color: #ffffff;">商家名称</view>
              <input class="uni-input" name="input" placeholder="商家名称" v-model="name"
                     style="color: #000;border: 1px solid #939393;height: 40px;border-radius: 4px;"/>
            </view>
            <view class="uni-form-item uni-column">
              <view class="title" style="color: #ffffff;">手机号</view>
              <input class="uni-input" name="input" placeholder="手机号" v-model="mobile"
                     style="color: #000;border: 1px solid #939393;height: 40px;border-radius: 4px;"/>
            </view>
            <view class="uni-form-item uni-column">
              <view class="title" style="color: #ffffff;">微信账号</view>
              <input class="uni-input" name="input" placeholder="微信账号" v-model="wechat_account"
                     style="color: #000;border: 1px solid #939393;height: 40px;border-radius: 4px;"/>
            </view>
            <view class="uni-form-item uni-column">
              <view class="title" style="color: #ffffff;">支付宝账号</view>
              <input class="uni-input" name="input" placeholder="支付宝账号" v-model="ali_account"
                     style="color: #000;border: 1px solid #939393;height: 40px;border-radius: 4px;"/>
            </view>
            <view class="uni-form-item uni-column">
              <view class="title" style="color: #ffffff;">银行名称</view>
              <input class="uni-input" name="input" placeholder="银行名称" v-model="bank_name"
                     style="color: #000;border: 1px solid #939393;height: 40px;border-radius: 4px;"/>
            </view>
            <view class="uni-form-item uni-column">
              <view class="title" style="color: #ffffff;">银行账号</view>
              <input class="uni-input" name="input" placeholder="银行账号" v-model="bank_account"
                     style="color: #000;border: 1px solid #939393;height: 40px;border-radius: 4px;"/>
            </view>

            <view class="uni-form-item uni-column">
              <view class="title" style="color: #ffffff;">真实姓名</view>
              <input class="uni-input" name="input" placeholder="真实姓名" v-model="true_name"
                     style="color: #000;border: 1px solid #939393;height: 40px;border-radius: 4px;"/>
            </view>



          </form>

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
      name:'',
      mobile:'',
      wechat_nickname:'',
      wechat_account:'',
      ali_nickname:'',
      ali_account:'',
      bank_account:'',
      true_name:'',
      bank_name:'',


      pay:{},
      payMethodList:[],
      showSelectPayMethod:false,
      alertSellInfo: {},//出售弹出框字段数组
      alertInfo:{},//购买弹出框字段数组
      modalShow:false,
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
    };
  },
  onShow() {

  },
  mounted() {
    this.page = 1;
    this.canGet = true;
    this.list = []
    this.getBySellList();
    const token = uni.getStorageSync('token') || "";
    //console.log("token====>"+token);
    if (token!=null&&token.length>6){
      //this.getCashInfo();
    }
  },
  methods: {
    formSubmit: function(e) {
      let that =this;
      const lang = uni.getStorageSync('lang') || 'en';
      //saveApplyMerchant: (lang,name,mobile,wechat_account,ali_account,bank_account,true_name,bank_name) => vm.$u.post("/seller/seller_add",{lang,name,mobile,wechat_account,ali_account,bank_account,true_name,bank_name}),
      // that.$u.api.c2c.saveApplyMerchant(
      //     lang,
      //     that.name,
      //     that.mobile,
      //     that.wechat_account,
      //     that.ali_account,
      //     that.bank_account,
      //     that.true_name,
      //     that.bank_name).then(res => {
      let data={lang:lang,
        name:that.name,
        mobile:that.mobile,
        wechat_account:that.wechat_account,
        ali_account:that.ali_account,
        bank_account:that.bank_account,
        true_name:that.true_name,
        bank_name:that.bank_name
      };

      that.$https.initDataToken({
        url: "c2c/saveMerchantApply",
        type: "POST",
        data
      }, (res, msg) => {
        console.log("申请返回==>"+JSON.stringify(res));

        that.$utils.showToast(res);
        setTimeout(() => {
          uni.reLaunch({
            url: "/pages/index/index"
          })
        }, 1200)

      });



    },
    formReset: function(e) {
      console.log('清空数据')
    },

    confirmPay(index){

      this.pay = this.payMethodList[index]

    },


    confirmSellOrder(){
      let that =this;
      this.$u.api.c2c.buyCoin(this.alertInfo.id,this.alertInfo.amount,this.type).then(res => {
        console.log("sureOrder==>"+JSON.stringify(res));
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
      let that =this;
      this.$u.api.c2c.buyCoin(this.alertInfo.id,this.alertInfo.amount,this.type).then(res => {
        console.log("sureOrder==>"+JSON.stringify(res));
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
      this.alertInfo=item;
    },
    sellOrder(item){
      let that = this;
      that.modalSellShow = true;
      this.alertSellInfo=item;
    },
    changeTab(val){
      this.currentTab = val;
      if (val==0){
        this.type= "buy";
      }
      if (val==1){
        this.type= "sell";
      }
      this.getBySellList();

    },
    getBySellList() {
      //if(!this.canGet) return
      //page,type,currency_id
      this.$u.api.c2c.getBySellList(this.page, this.type, this.currency_id).then(res => {
        const list = res.message.data
        if (list.length) {
          this.list = list;
          this.page=1;
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
page{
  background: #000000;
}
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

.uni-form-item .title {
  padding: 20rpx 0;
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
