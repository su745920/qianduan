<template>
  <view class="">
    <view class="pb-60 px-30">
      <myNavbar :title="i18n.mine" style="color: #000;" url="/pages/index/index" v-on:pCustomBack="backFn"
                showback="true">
        <u-icon slot="right" name="server-man" color="#000" size="38"
                @click="$utils.jump('/pages/kefu/index')" v-if="false"></u-icon>
      </myNavbar>

      <navigator :url="$store.state.token ? '/pages/setting/userInfo' : '/pages/setting/left_menu'" class="text-white d-flex align-items-center justify-content-between mt-30">
        <view class="d-flex  align-items-center">
          <image :src="retImageUrl" class="border-radius-50per border" mode="aspectFill" style="width: 120rpx;height:120rpx;"></image>
          <view class="ml-22">
            <text class="d-block font-size-36 font-weight-bold" style="color: #000;">{{user.id ? user.account_number : $t("common.plsLogin")}}</text>
            <text class="d-block font-size-22 opacity-50 mt-4" v-if="user.id" style="color: #000;">ID:{{user.id}}</text>
            <text class="d-block font-size-22 opacity-50 mt-4" v-if="user.score" style="color: #000;">{{i18n.score}}:{{Number(user.score)}}</text>
          </view>
        </view>
        <text class="iconfont icon-gengduo1 font-size-40"  style="color: #666;"></text>
      </navigator>
      <view class="fanli text-black mt-40" v-if="false">
        <view class="d-flex justify-content-between align-items-center">
          <text class="font-size-30 " style="color: #000;">{{i18n.inviteDesc}}</text>
          <text class="haoyou"  style="color: #000;">{{i18n.inviteDesc2}}</text>
          <text class="iconfont text-black icon-gengduo1 font-size-32 text-white" style="color: #666;"></text>
        </view>
        <view class="data">
          <view class="w-33">
            <text class="d-block font-size-22 opacity-75" style="color: #000;">{{i18n.inviteNumber}}</text>
            <text class="d-block font-size-32 mt-24 font-weight-bold">0人</text>
          </view>
          <view class="w-33 text-center">
            <text class="d-block font-size-22 opacity-75" style="color: #000;">{{i18n.inviteTransNumber}}</text>
            <text class="d-block font-size-32 mt-24 font-weight-bold">0人</text>
          </view>
          <view class="w-33 text-right">
            <text class="d-block font-size-22 opacity-75" style="color: #000;">{{i18n.myRebate}}</text>
            <text class="d-block font-size-32 mt-24 font-weight-bold">0.00 USDT</text>
          </view>
        </view>
      </view>

      <view class="setting-nav text-white mt-40">
        <view class="item" v-for="item in navs" :key="item.value" @click="navFunc(item)">
          <view class="d-flex align-items-center">
            <image :src="item.image" class="image" style="border: none;"></image>
            <text class="opacity-90" style="color: #000;">{{item.name}}</text>
          </view>

          <view class="d-flex align-items-center opacity-90" v-if="item.value == 'Default fiat currency' && false">
            <text style="color: #000;">1USD {{$store.state.fiat.currency_code == 'USD' ? '=' : '≈'}} {{$store.state.fiat.rate + $store.state.fiat.currency_code}}</text>
            <u-icon name="arrow-down" class="ml-12"></u-icon>
          </view>

        </view>
      </view>






      <u-popup v-model="showDefaultCurrency" mode="bottom" length="80%" :title="$t('setting.selectCoinType')">
        <view class="popup-list">
          <view class="popup-list-item" v-for="(item,index) in $store.state.fiats" :key="item.currency_code" :class="{active : item.currency_code == $store.state.fiat.currency_code }" @click="saveFiat(index)">
            <text class="pl-18 pr-14 font-size-32" style="color: #000;">{{item.currency_code}}</text>
          </view>
        </view>
      </u-popup>
    </view>
  </view>
</template>

<script>

import myNavbar from "../../uview-ui/components/u-navbar/my-navbar.vue";
export default {
  data() {
    return {

      //retImageUrl:require('static/image/icon/man.png'),
      retImageUrl:require('static/bib/user.png'),
      user:{},

      lang:null,
      fiats:null,
      //显示修改默认法币
      showDefaultCurrency:false,
      //显示修改默认语言
      showLanguage:false,
    }
  },
  components: {
    myNavbar
  },
  onShow() {

    this.getUserInfo();

    let token=uni.getStorageSync("token");
    if (token&&token.length>10) {
      this.$https.initDataToken({
        url: 'setOnline',
        type: 'POST',
      }, (res, msg) => {
        console.log("设置在线" + JSON.stringify(res));
      });
    }

  },
  methods:{
    backFn(){
      //console.log("-----");
      //this.$utils.jump('/pages/index/index','redirectTo');
      //location.href="/h5";

      uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
        delta: 1
      });

    },

    //保存法币
    saveFiat(index){
      const fiat = this.$store.state.fiats[index]
      this.$store.commit('saveFiat',fiat)
      this.showDefaultCurrency = false
    },
    navFunc(item){
      const {openType,url} = item
      if(openType === 'url'){
        uni.navigateTo({
          url
        })
      }else if(openType === 'popup'){
        this[url] = true
      }
    },

    //获取个人信息
    getUserInfo(){
      this.$https.initDataToken({
        url: 'user/info',
        type: 'GET',
      }, (res, msg) => {
        this.user = res
        this.$store.commit('refreshUser',res)
      })
    },

  },
  computed:{
    i18n(){
      return this.$t("setting");
    },
    navs(){
      const _i18n = this._i18n
      const message = _i18n.messages[_i18n.locale].setting
      return [
        // {
        // 	name:message.bill,
        // 	value:'Bill',
        // 	image:require('static/image/icon/setting-icon-1.png'),
        // 	show:true,
        // 	openType:'url',
        // 	url:'/pages/setting/bill',
        // },
        {
          name:message.wallet,
          value:'Receiving Account',
          image:require('static/image/icon/setting-icon-2.png'),
          show:true,
          openType:'url',
          url:'/pages/setting/wallet',
        },
        {
          name:message.banks,
          value:'Banks',
          image:require('static/image/icon/buycoin1.png'),
          show:true,
          openType:'url',
          url:'/pages/setting/bank',
        },
        // {
        // 	name:message.banksInternational,
        // 	value:'Banks - International',
        // 	image:require('static/image/icon/setting-icon-13.png'),
        // 	show:true,
        // 	openType:'url',
        // 	url:'/pages/setting/bank_international',
        // },

        // {
        // 	name:message.coupon,
        // 	value:'Coupon',
        // 	image:require('static/image/icon/setting-icon-4.png'),
        // 	show:true,
        // 	openType:'url',
        // 	url:'/pages/setting/coupon',
        // },
        // {
        // 	name:message.systemNotification,
        // 	value:'System notification',
        // 	image:require('static/image/icon/setting-icon-5.png'),
        // 	show:false,
        // 	openType:'url',
        // 	url:'',
        // },
        // {
        // 	name:message.defaultFiatCurrency,
        // 	value:'Default fiat currency',
        // 	image:require('static/image/icon/setting-icon-6.png'),
        // 	show:true,
        // 	openType:'popup',
        // 	url:'showDefaultCurrency',
        // },

        // {
        // 	name:message.faq,
        // 	value:'FAQ',
        // 	image:require('static/image/icon/help0608.png'),
        // 	show:true,
        // 	openType:'url',
        // 	url:'/pages/common/faq',
        // },
        // {
        // 	name:message.operationalCompliance,
        // 	value:'Operational Compliance',
        // 	image:require('static/image/icon/setting-icon-9.png'),
        // 	show:true,
        // 	openType:'url',
        // 	url:'/pages/setting/operational_compliance',
        // },
        // {
        // 	name:message.share,
        // 	value:'Share',
        // 	image:require('static/image/icon/setting-icon-10.png'),
        // 	show:false,
        // 	openType:'url',
        // 	url:'/pages/setting/share',
        // },
        {
        	name:message.bind_alipay,
        	value:'Contact us',
        	image:require('static/image/icon/zhi.png'),
        	show:true,
        	openType:'url',
        	url:'/pages/common/contactus',
        },

      ]
    }
  }

}
</script>

<style lang="scss" scoped>
.fanli{
  @extend .linear-gradient-button;
  border-radius: 60rpx 20rpx 60rpx 20rpx;
  // background-image:linear-gradient(60deg,#ff174d,#724685);
  padding: 36rpx;
  padding-bottom: 0;
  overflow: hidden;
  .haoyou{
    font-size: 22rpx;
    padding: 8rpx 30rpx;
    color: #fff;
    background-image:linear-gradient(to right,#ff174d,#724685);
    border-radius: 20rpx;
  }
  .data{
    margin:0 -36rpx;
    margin-top: 36rpx;
    background-color:rgba(255,255,255,.1) ;
    padding: 32rpx 36rpx 26rpx 36rpx;
    display: flex;
    justify-content: space-between;
  }
}

.setting-nav{
  .item{
    margin-bottom: 12rpx;
    padding:  26rpx 32rpx;
    border-radius: 12rpx;
    box-shadow: 0px 0px 8.9px 1.1px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32rpx;
    .image{
      width: 48rpx;
      height: 48rpx;
      margin-right: 17rpx;
    }

  }
}

// 弹出层列表
.popup-list{
  .popup-list-item{
    height: 96rpx;
    line-height: 96rpx;
    padding: 0 30rpx;
    font-size: 32rpx;
    position: relative;
    display: flex;
    align-items: center;
    &:before{
      content: "";
      position: absolute;
      left: 30rpx;
      right: 30rpx;
      bottom: 0;
      height: 2rpx;
      background-color: #efefef;
    }
    &.active{
      background-color: #f2f6ff;
      &:after{
        content: "";
        width: 36rpx;
        height: 20rpx;
        background-image: url('../../static/image/icon/setting-icon-20.png');
        background-size: cover;
        position: absolute;
        right: 80rpx;
        top: 50%;
        margin-top: -10rpx;
      }
    }
  }
}

.button-base{
  background-image: linear-gradient(to right,#dd1d46,#f9577a);
  color: #fff;
}
</style>
