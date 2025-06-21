<template>
  <view class="pb-30 text-white">
    <u-navbar :title="$t('c2c.c2c_publish')" showback="true">
      <button class="warning-button"
              style="color: #FFFFFF;height: 30px;line-height: 30px;font-size: 14px;padding-left: 5px;padding-right: 5px;padding-top: -3px;"
              slot="right"
              @click="savePublishInfo">提交
      </button>
    </u-navbar>
    <!-- 内容 -->
    <view class="mx-30 mt-30">


      <view class="mt-6">


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

        <view
            style="display: flex;width:100%;margin: 12px;margin-top: 20px;
            border-bottom: 1px solid #f7f7f7;padding-bottom: 8px;">
          <view style="width:80px;font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;"
                @click="changeTab(0)">
            <span :class="currentTab==0 ?'activeTab':'normalTab' ">{{ $t('c2c.buy') }}</span>
          </view>
          <view style="width: 80px;font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;"
                @click="changeTab(1)">
            <span :class="currentTab==1 ?'activeTab':'normalTab' ">{{ $t('c2c.sell') }}</span>
          </view>
          <!--
          <view style="flex: 1;font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;display: flex;justify-content: right;">
            <view style="border: 1px solid #2A64FB;color: #2A64FB;width:80px;text-align: center;border-radius: 4px;margin-right: 5px;">
              发布信息
            </view>
          </view>
          -->

        </view>


        <view class="list mt-20" style="background: #ffffff;">
          <form @submit="formSubmit" @reset="formReset">


            <view class="uni-form-item uni-column" v-if="false">
              <view class="title" style="color: #000;">发布方向</view>
              <radio-group name="radio">
                <label>
                  <radio value="sell"/>
                  <text style="color: #000;">出售</text>
                </label>
                <label style="margin-left: 30px;">
                  <radio value="buy"/>
                  <text style="color: #000;">购买</text>
                </label>
              </radio-group>
            </view>

            <!--
            <view class="uni-form-item uni-column"  style="margin-top: 10px;">
              <view class="title" style="color: #000;">{{ i18n.selectCurrency }}</view>
              <input type="text" class="input" disabled @click="showSelectCurrency=true"
                     style="color: #000;border: 1px solid #f7f7f7;height: 40px;border-radius: 4px;background: #ffffff;font-size: 12px;padding-left: 5px;"
                     placeholder-style="color:#333;"
                     :placeholder="i18n.plsSelectCurrency" v-model="currency.name">
            </view>
            -->


            <view class="bg-black text-white border-radius-10 p-30 mt-30 d-flex-between-center"  @click="showSelectCurrency=true">
              <text class="opacity-75 font-size-28" style="color: #929292;">{{i18n.selectCurrency}}</text>
              <view class="">
                <text class="font-weight-bold font-size-32 mr-10"  style="color: #000;">{{currency.name}}</text>
                <u-icon name="arrow-down" size="32" style="color: #929292"></u-icon>
              </view>
            </view>





            <view class="uni-form-item uni-column" style="margin-top: 10px;">
              <view class="title" style="color: #000;">单价(CNY)</view>
              <input class="uni-input" name="input" placeholder="请输入单价" v-model="price"
                     placeholder-style="color:#929292;"
                     style="color: #000;border: 1px solid #f7f7f7;height: 40px;border-radius: 4px;padding-left: 5px;background: #33333308;"/>
            </view>

            <view class="uni-form-item uni-column" style="margin-top: 10px;">
              <view class="title" style="color: #000;">总量</view>
              <input class="uni-input" name="input" placeholder="请输入总量" v-model="total_number"
                     placeholder-style="color:#929292;"
                     style="color: #000;border: 1px solid #f7f7f7;height: 40px;border-radius: 4px;padding-left: 5px;background: #33333308;"/>
            </view>
            <view class="uni-form-item uni-column"  style="margin-top: 10px;">
              <view class="title" style="color: #000;">最小购买量(CNY)</view>
              <input class="uni-input" name="input"
                     placeholder-style="color:#929292;"
                     placeholder="请输入最小购买量" v-model="min_number"
                     style="color: #000;border: 1px solid #f7f7f7;height: 40px;border-radius: 4px;padding-left: 5px;background: #33333308;"/>
            </view>

            <view class="uni-form-item uni-column" style="margin-top: 10px;">
              <view class="title" style="color: #000;">最大购买量(CNY)</view>
              <input class="uni-input" name="input"
                     placeholder-style="color:#929292;"
                     placeholder="请输入最大购买量" v-model="max_number"
                     style="color: #000;border: 1px solid #f7f7f7;height: 40px;border-radius: 4px;padding-left: 5px;background: #33333308;"/>
            </view>


            <view class="uni-form-item uni-column" style="margin-top: 10px;">
              <view class="title" style="color: #000;">付款方式</view>
              <view class="d-flex align-items-center " style="margin-top: 5px;">
                <text class="iconfont text-secondary mr-12" :class="zyzs0 ? 'icon-checkbox-ok' : 'icon-checkbox'" @click="cardFn"></text>
                <text style="color: #666666;">{{$t('fund.card')}}</text>

                <text class="iconfont text-secondary mr-12" :class="zyzs1 ? 'icon-checkbox-ok' : 'icon-checkbox'"  style="margin-left: 10px;"
                      @click="alipayFn"></text>
                <text style="color: #666666;">支付宝</text>

                <text class="iconfont text-secondary mr-12" :class="zyzs2 ? 'icon-checkbox-ok' : 'icon-checkbox'"  style="margin-left: 10px;"
                      @click="wxFn"></text>
                <text style="color: #666666;">微信</text>




              </view>

            </view>



            <view class="uni-form-item uni-column" v-if="currentTab == 1">
              <view class="title" style="color: #000;">银行名称</view>
              <input class="uni-input" name="input" placeholder="请输入银行名称" v-model="bank_name"
                     disabled
                     style="color: #000;border: 1px solid #f7f7f7;height: 40px;border-radius: 4px;padding-left: 5px;background: #33333308;"/>
            </view>
            <view class="uni-form-item uni-column" v-if="currentTab == 1">
              <view class="title" style="color: #000;">银行账号</view>
              <input class="uni-input" name="input" placeholder="请输入银行账号" v-model="bank_account"
                     disabled
                     style="color: #000;border: 1px solid #f7f7f7;height: 40px;border-radius: 4px;padding-left: 5px;background: #33333308;"/>
            </view>
            <view class="uni-form-item uni-column" v-if="currentTab == 1">
              <view class="title" style="color: #000;">真实姓名</view>
              <input class="uni-input" name="input" placeholder="请输入真实姓名" v-model="real_name"
                     disabled
                     style="color: #000;border: 1px solid #f7f7f7;height: 40px;border-radius: 4px;padding-left: 5px;background: #33333308;"/>
            </view>

          </form>

        </view>


        <!-- 弹出币种选择 -->
        <u-action-sheet :list="currencyList" v-model="showSelectCurrency" @click="confirmCurrency"></u-action-sheet>


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
      zyzs0: false,
      zyzs1: false,
      zyzs2: false,
      fromCurrency:{},
      currency: {name:"USDT"},
      currencyList: [{text:"USDT"},{text:"BTC"},{text:"ETH"}],
      showSelectCurrency: false,
      max_number:0,
      name: '',
      price: '',//单价
      total_number: '',//总量
      surplus_number: '',//剩余
      min_number: '',//最小购买量
      ali_account: '',
      bank_account: '',
      truename: '',
      bank_name: '',

      //银行卡
      real_name: '',


      address: '',


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
    console.log("token====>" + token);
    if (token != null && token.length > 6) {
      this.getCashInfo();
    }
    this.getCurrencyList();

  },
  methods: {
    cardFn(){
      this.zyzs0= !this.zyzs0;
    },
    alipayFn(){
      this.zyzs1= !this.zyzs1;
    },
    wxFn(){
      this.zyzs2= !this.zyzs2;
    },

    //获取收款银行卡
    getCard() {
      let that = this;
      that.$u.api.setting.getCard().then(({message}) => {
        if (message == null || message.bank_account == null||message.bank_account =="") {
          that.$utils.showToast("您尚未设置收款方式，请去个人中心绑定银行卡信息");
        }
        this.real_name = message.real_name
        this.bank_name = message.bank_name
        this.bank_account = message.bank_account
        this.address = message.address

      })
    },
    confirmCurrency(index) {
      this.currency = this.currencyList[index]
    },
    getCurrencyList() {
      let that = this;
      const lang = uni.getStorageSync('lang') || 'en';
      that.$https.initDataToken({
        url: "currency/list?lang=" + lang,
        type: "GET"
      }, (res, msg) => {

        that.currencyList = res.legal.map(el => {
          el.text = el.name
          return el
        });
        console.log("币种==>"+JSON.stringify(that.currencyList));

      })
    },
    formSubmit: function (e) {
      console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
      var formdata = e.detail.value
      uni.showModal({
        content: '表单数据内容：' + JSON.stringify(formdata),
        showCancel: false
      });
    },
    formReset: function (e) {
      console.log('清空数据')
    },

    confirmPay(index) {

      this.pay = this.payMethodList[index]

    },
    //获取收款信息
    getCashInfo() {
      let that = this;

      const lang = uni.getStorageSync('lang') || 'en';
      that.$https.initDataToken({
        url: "user/cash_info?lang=" + lang,
        type: "POST"
      }, (data, msg) => {
        console.log("获取收款信息=>" + JSON.stringify(data));

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





      });
    },
    savePublishInfo() {
      let that = this;
      let typeStr="";//这里的方向 以用户角度来定义 商家发布卖 在用户那里就显示购买
      if (that.currentTab ==0){
        typeStr="buy";
      }else{
        typeStr="sell";
      }
      let bankcard="0";
      if (that.zyzs0){
        bankcard="1";
      }

      let alipay="0";
      if (that.zyzs1){
        alipay="1";
      }

      let wechat="0";
      if (that.zyzs2){
        wechat="1";
      }
      const lang = uni.getStorageSync('lang') || 'en';
      if (that.currency.name==="BTC"){
        that.currency_id=32;
      }
      if (that.currency.name==="ETH"){
        that.currency_id=35;
      }

      let data={min_number:that.min_number,
        coin_code:"CNY",
        currency_id:that.currency_id,
        total_number:that.total_number,
        price:that.price,
        way:bankcard,
        alipay:alipay,
        wechat:wechat,
        type:typeStr,
        max_number:this.max_number,
        lang:lang
      }
      that.$https.initDataToken({
        url: "savePublishInfo",
        type: "POST",
        data
      }, (res, msg) => {
          console.log("信息发布返回==>" + JSON.stringify(res));
          that.$utils.showToast(res);
          setTimeout(function (){
            uni.navigateBack();
          },1000);



      })
    },
    //购买下单请求
    sureOrder() {
      let that = this;
      //this.$u.api.c2c.buyCoin(this.alertInfo.id, this.alertInfo.amount, this.type).then(res => {
      //buyCoin: (id,amount,type) => vm.$u.post("/c2c/buyCoin",{id,amount,type}),
      let data={id:this.alertInfo.id,
        amount:this.alertInfo.amount,
        type:this.type};
      that.$https.initDataToken({
        url: "c2c/buyCoin",
        type: "POST",
        data
      }, (res, msg) => {

        console.log("sureOrder==>" + JSON.stringify(res));

          that.modalShow = false;
          that.$utils.showToast(res.msg);
          that.page = 1;
          //that.getList();


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
      this.currentTab = val;
      if (val == 0) {
        this.type = "buy";
      }
      if (val == 1) {
        this.type = "sell";
        this.getCard();
      }
      this.getBySellList();

    },
    getBySellList() {
      //if(!this.canGet) return
      //page,type,currency_id
      //this.$u.api.c2c.getBySellList(this.page, this.type, this.currency_id).then(res => {
        //getBySellList: (page,type,currency_id) => vm.$u.get("/c2c_deal_platform?page="+page+"&type="+type+"&currency_id="+currency_id),
      let that=this;
      that.$https.initDataToken({
        url: "c2c_deal_platform?page="+that.page+"&type="+that.type+"&currency_id="+that.currency_id,
        type: "GET",

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
      return this.$t("setting")
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

.uni-form-item .title {
  padding: 20 rpx 0;
}
</style>
