<template>
  <view class="text-white">
    <u-navbar :title="$t('follow.becomeATrader')" showback="true"></u-navbar>
    <view class="list">
      <view class="item" @click="uploadAvatar">
        <text style="color: #000;opacity: 0.6;">{{$t("setting.avatar")}}</text>
        <view class="right">
          <image :src="$store.state.user.head_portrait || retImageUrl" class="avatar" mode="aspectFill"></image>
          <text class="iconfont icon-gengduo1 ml-20" style="color: #000;"></text>
        </view>
      </view>
      <view class="item" @click="showPopupFunc('nickname')" style="color: #000;">
        <text style="color: #000;opacity: 0.6;">{{$t("setting.nickname")}}</text>
        <view class="right">
          <text>{{$store.state.user.nickname || i18n.nonickname }}</text>
          <text class="iconfont icon-gengduo1 ml-20"></text>
        </view>
      </view>
     <view class="item">
       <text style="color: #000;opacity: 0.6;">项目描述</text>
     </view>

      <view class="uni-textarea">
        <textarea placeholder-style="color:#929292"  style="color: #000;background: #f7f7f7;width: 100%;border-radius: 8px;"
                  placeholder="向跟单社区介绍自己"/>
      </view>


      <!-- <view class="item">
        <text>{{$t("setting.authentication2")}}</text>
        <view class="right">
          <text v-if="real.advanced_review_status == 0" class="text-error">{{i18n.noaudit}}</text>
          <text v-else-if="real.advanced_review_status == 1" class="text-warning">{{i18n.auditing}}</text>
          <text v-else-if="real.advanced_review_status == 2" class="text-success">{{i18n.hasaudit}}</text>
          <text class="iconfont icon-gengduo1 ml-20"></text>
        </view>
      </view> -->
    </view>

    <u-popup v-model="showPopup" mode="bottom" length="28%" >
      <view class="m-30">
        <view class="d-flex-between-center font-size-32">
          <text>{{showOptions.title}}</text>
          <text class="opacity-50" @click="showPopup = false">{{$t("common.cancel")}}</text>
        </view>
        <view class="mt-30">
          <input type="text" class="input" v-model="value" :placeholder="showOptions.placeholder">
          <text class="d-block font-size-22 opacity-50 pl-26 mt-20">{{showOptions.desc}}</text>
        </view>
        <button class="error-button mt-40" @click="edit" style="background: #2A64FD;">{{$t("common.confirm")}}</button>
      </view>
    </u-popup>

    <!-- <u-action-sheet :list="photoTypes" v-model="showPhotoTypeSelect" :title="$t('setting.xxtx')" @click="showPhotoFunc"></u-action-sheet> -->


  </view>
</template>

<script>
export default {
  data() {
    return {
      retImageUrl:'',
      signature:'signature',
      showPopup:false,
      showOptions:{},
      value:'',
      //展示选择相册还是相机
      showPhotoTypeSelect:false,
      real:{},
      showPopName:null
    };
  },
  onShow() {

  },
  methods:{

    showPopupFunc(name){
      this.showPopName = name
      const options = this.$t("setting.grxxOptions")
      this.showOptions = options[name]
      this.showPopup = true
    },
    showPhotoFunc(index){
      const sourceType = index == 0 ? ['camera'] : ['album']
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType, //从相册选择
        success: function (res) {

        }
      });
    },
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
    //修改昵称或者个性签名
    edit(){
      const {showPopName,value,showOptions} = this
      if(showPopName == 'nickname'){
        if(!value.length){
          return this.$utils.showToast(showOptions.placeholder)
        }
        if(this.$utils.charTest(value)){
          return this.$utils.showToast(this.$t("common.specialChart"))
        }
        if(value.length > 10){
          return this.$utils.showToast(this.$t("common.toLong"))
        }
        const lang = uni.getStorageSync('lang') || 'en';
        let type=2;
        let user = this.$u.deepClone(this.$store.state.user);

        let data={account:user.account_number,
          nickname:value,
          type:type,
          lang:lang
        };
        this.$https.initDataToken({
          url: 'user/updateNickname',
          type: 'POST',
          data
        }, (res, msg) => {

          let user = this.$u.deepClone(this.$store.state.user)
          user.nickname = value
          this.$store.commit('refreshUser',user)

          this.$utils.showToast(this.$t("common.success"))
          this.showPopup = false
        })
      }
    }
  },
  computed:{
    i18n(){
      return this.$t("setting")
    },
    photoTypes(){
      const lang = this.$t("setting")
      return [
        // #ifdef APP-PLUS
        {
          text:lang.photograph,
        },
        // #endif
        {
          text:lang.selectFromAlbum,
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.list{
  margin: 0 30rpx;
  .item{
    @extend .d-flex-between-center;
    height: 110rpx;
    line-height: 110rpx;
    border-bottom: 1px solid #f7f7f7;
    font-size: 32rpx;
    .right{
      @extend .d-flex-between-center;

      .avatar{
        height: 68rpx;
        width: 68rpx;
        border-radius: 50%;
      }

      text{
        font-size: 28rpx !important;
        opacity: .5;
      }
    }
  }
}
</style>
