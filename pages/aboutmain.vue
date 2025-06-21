<template>
  <view class="" style="background: #000000;">
    <view class="pb-60 px-30" style="background: #000000;">
      <u-navbar  showback="true" :custom-back="backFn">
        <!-- <view slot="right" class="nav-right text-333" @click="showFilter=true">
          <text>全部</text>
          <text class="iconfont icon-shaixuan"></text>
        </view> -->
      </u-navbar>

      <view style="display: flex;flex-direction: column;">
        <view style="justify-content: center;align-items: center;text-align: center;">
          <image src="/static/default_head.png" style="width: 100px;height: 100px;"></image>
        </view>
        <view style="justify-content: center;align-items: center;text-align: center;font-size: 23px;font-weight: 550;">Coinbm</view>
      </view>




      <view class="setting-nav text-white mt-40" style="background: #000000;">
        <view class="item">
          <view class="d-flex align-items-center">
            <text  style="color: #ffffff;">Coinbm</text>
          </view>
          <view class="d-flex align-items-center opacity-90"></view>
          <view  style="display: flex;">
            <text style="color: #707070;line-height: 16px;height: 16px;"></text>
            <view style="height: 16px;line-height: 16px;">
              <image src="/static/icon_arrow_right_white_16.png" style="width: 16px;height: 16px;"></image>
            </view>
          </view>
        </view>
        <view class="item">
          <view class="d-flex align-items-center">
            <text  style="color: #ffffff;">Privacy policy</text>
          </view>
          <view class="d-flex align-items-center opacity-90"></view>
          <view style="display: flex;">
            <text style="color: #707070;line-height: 16px;height: 16px;"></text>
            <view style="height: 16px;line-height: 16px;">
              <image src="/static/icon_arrow_right_white_16.png" style="width: 16px;height: 16px;"></image>
            </view>
          </view>
        </view>


        <view class="item">
          <view class="d-flex align-items-center">
            <text  style="color: #ffffff;">Disclaimer</text>
          </view>
          <view class="d-flex align-items-center opacity-90"></view>
          <view  style="display: flex;">
            <text style="color: #707070;line-height: 16px;height: 16px;"></text>
            <view style="height: 16px;line-height: 16px;">
              <image src="/static/icon_arrow_right_white_16.png" style="width: 16px;height: 16px;"></image>
            </view>
          </view>
        </view>

      </view>







    </view>
  </view>
</template>

<script>


export default {
  data() {
    return {

      retImageUrl:require('static/bib/user.png'),
      user:{},
      langs:null,
      lang:null,
      fiats:null,
      //显示修改默认法币
      showDefaultCurrency:false,
      //显示修改默认语言
      showLanguage:false,
    }
  },
  components: {
  },
  onShow() {
    this.setDefaultLang()
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
    async uploadAvatar(){
      const ret = await this.$utils.uploadImage();

      this.retImageUrl=ret;

      let data={head_portrait:ret};
      this.$https.initDataToken({
        url: 'user/uploadHeadPortrait',
        type: 'POST',
        data
      }, (res, msg) => {
        console.log("上传头像返回==>"+JSON.stringify(res));

        let user = this.$u.deepClone(this.$store.state.user)
        user.head_portrait = ret
        this.$store.commit('refreshUser',user)
        this.$utils.showToast(this.$t("common.success"))
      })
    },
    backFn(){
      uni.navigateTo({
        url: '/pages/setting/left_menu'
      })
    },
    setDefaultLang(){
      let langsData = langs.map(el=>{
        el.selected = false
        return el
      })
      const lang = uni.getStorageSync('lang') || 'en'
      const has = langsData.findIndex(item => item.value == lang)
      this.lang = langsData[has]

      langsData[has].selected = true
      this.langs = langsData
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
    setLang(item){
      let langs = this.langs.map(el=>{
        el.selected = false
        if(el.value === item.value) el.selected = true
        return el
      })
      this.langs = langs
      this._i18n.locale = item.value
      this.lang = item
      uni.setStorageSync('lang',item.value)
      this.$store.commit('setLang', item.value)
      setTimeout(()=>
      {
        this.showLanguage = false;
        uni.reLaunch({
          url: "/pages/index/index"
        })
      },200)
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
    //退出登陆
    async logout(){
      const ret = await this.$utils.showModal(this.$t("common.hint"),this.$t("setting.confirmLogout"))
      if(!ret) return;
      const lang = uni.getStorageSync('lang') || 'en';

      this.$https.initDataToken({
        url: 'user/logout?lang='+lang,
        type: 'GET',
      }, (res, msg) => {

        if (lang==="vi"){
          this.$utils.showToast("Thoát thành công");
        }else if (lang==="en"){
          this.$utils.showToast("Exit successful");
        }else if (lang==="th"){
          this.$utils.showToast("ออกจากความสำเร็จ");
        }else if (lang==="id"){
          this.$utils.showToast("Keluar berhasil");
        }else if (lang==="zh"){
          this.$utils.showToast("退出登录成功");
        }
        else{
          this.$utils.showToast(res);
        }

        this.$store.commit('deleteUser')
        setTimeout(()=>{
          uni.reLaunch({
            url:'/pages/setting/left_menu'
          })
        },1200)
      })
    }
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
        {
          name:message.securitySettings,
          value:'Security settings',
          image:require('static/image/icon/setting-icon-3.png'),
          show:true,
          openType:'url',
          url:'/pages/setting/security',
        },
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
        {
          name:message.language,
          value:'Language',
          image:require('static/image/white/lang.png'),
          show:true,
          openType:'popup',
          url:'showLanguage',
        },
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
        // {
        // 	name:message.contactUs,
        // 	value:'Contact us',
        // 	image:require('static/image/icon/setting-icon-11.png'),
        // 	show:true,
        // 	openType:'url',
        // 	url:'/pages/common/contactus',
        // },
        {
          name:message.aboutUs,
          value:'About us',
          image:require('static/image/icon/setting-icon-12.png'),
          show:true,
          openType:'url',
          url:'/pages/common/aboutus',
        },
      ]
    }
  }

}
</script>

<style lang="scss" scoped>
page{
  background: #000000;
}
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

    padding: 32rpx 36rpx 26rpx 36rpx;
    display: flex;
    justify-content: space-between;
  }
}

.setting-nav{
  .item{
    margin-bottom: 12rpx;
    padding:  16rpx 20rpx;
    border-radius: 12rpx;

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
      height: 1rpx;
      background-color: #2f2f2f;
    }
    &.active{
      background-color: #242424;
      &:after{
        content: "";
        width: 40rpx;
        height: 40rpx;
        //background-image: url('../../static/uzx/icon_coin_select_yes.png');
        background-size: cover;
        position: absolute;
        right: 80rpx;
        top: 50%;
        margin-top:-20rpx;
      }
    }
  }
}

.button-base{
  background-image: linear-gradient(to right,#dd1d46,#f9577a);
  color: #fff;
}
.connect_btn{
  background: -webkit-gradient(linear, left top, right top, color-stop(10%, #1FA2FF), color-stop(55.21%, #12D8FA), to(#A6FFCB));
  background: -webkit-linear-gradient(left, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
  background: -o-linear-gradient(left, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
  background: linear-gradient(90deg, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
  border-radius: 32px;
  margin-left: 30px;
  margin-right: 30px;
}
.avatar{
  height: 68rpx;
  width: 68rpx;
  border-radius: 50%;
}
</style>
