<template>
  <view class="" style="background: #000000;">
    <view class="pb-60 px-30" style="background: #000000;">
      <u-navbar :title="$t('setting.mine')" showback="true">
        <!-- <view slot="right" class="nav-right text-333" @click="showFilter=true">
          <text>全部</text>
          <text class="iconfont icon-shaixuan"></text>
        </view> -->
      </u-navbar>



      <view class="setting-nav text-white mt-40" style="background: #000000;">
        <view class="item" v-for="item in navs" :key="item.value" @click="navFunc(item)">
          <view class="d-flex align-items-center">
            <image :src="item.image" class="image" style="border: none;"></image>
            <text class="opacity-90" style="color: #ffffff;">{{item.name}}</text>
          </view>

          <view class="d-flex align-items-center opacity-90" v-if="item.value == 'Default fiat currency' && false">
            <text style="color: #ffffff;">1USD {{$store.state.fiat.currency_code == 'USD' ? '=' : '≈'}} {{$store.state.fiat.rate + $store.state.fiat.currency_code}}</text>
            <u-icon name="arrow-down" class="ml-12"></u-icon>
          </view>

          <view class="opacity-90" v-else-if="item.value == 'Language'">
            <text style="color: #ffffff;">{{lang.name}}</text>
          </view>
        </view>
      </view>

      <button class="warning-button mt-28 connect_btn"  style="color: #000000;border-radius: 30px;margin: 50px;" v-if="$store.state.token"
              @click="logout">{{$t("common.logout")}}</button>


      <button class="warning-button mt-28 connect_btn"  style="color: #000000;border-radius: 30px;margin: 50px;" v-if="!$store.state.token"
              @click="$utils.jump('/pages/setting/left_menu','redirectTo')"
      >{{$t("common.login")}}</button>



      <u-popup v-model="showLanguage" mode="bottom" length="60%" :title="$t('setting.selectLang')">
        <view class="popup-list">
          <view class="popup-list-item" v-for="item in langs" :key="item.value" :class="{active : item.selected}"  @click="setLang(item)">
            <text style="color: #ffffff;">{{item.name}}</text>
          </view>
        </view>
      </u-popup>

      <u-popup v-model="showDefaultCurrency" mode="bottom" length="80%" :title="$t('setting.selectCoinType')">
        <view class="popup-list">
          <view class="popup-list-item" v-for="(item,index) in $store.state.fiats" :key="item.currency_code" :class="{active : item.currency_code == $store.state.fiat.currency_code }"
                @click="saveFiat(index)">
            <text class="pl-18 pr-14 font-size-32" style="color: #000;">{{item.currency_code}}</text>
          </view>
        </view>
      </u-popup>
    </view>
  </view>
</template>

<script>
import {langs} from "./data.js"
import myNavbar from "../../uview-ui/components/u-navbar/my-navbar.vue";
import UImage from "../../uview-ui/components/u-image/u-image.vue";
export default {
  data() {
    return {

      //retImageUrl:require('static/image/icon/man.png'),
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
    UImage,
    myNavbar
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
    backFn(){
      uni.switchTab({
        url: '/pages/index/index'
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
        url: 'uc/member/my-info',
        type: 'POST',
      }, (res, msg) => {
        console.log("用户信息setting.vue===>"+JSON.stringify(res.data.data));
        this.user = res.data.data;
        this.$store.commit('refreshUser',res.data)
      })
    },
    //退出登陆
    async logout(){
      const ret = await this.$utils.showModal(this.$t("common.hint"),this.$t("setting.confirmLogout"))
      if(!ret) return;
      const lang = uni.getStorageSync('lang') || 'en';

      this.$https.initDataToken({
        url: 'uc/loginout?lang='+lang,
        type: 'POST',
      }, (res, msg) => {
        console.log("退出===>"+JSON.stringify(res));
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
      background-color: #242424;
    }
    &.active{
      background-color: #242424;
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
