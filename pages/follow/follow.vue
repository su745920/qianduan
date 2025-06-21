<template>
  <view class="text-white">
    <u-navbar :title="i18n.editCopy" showback="true">
      <u-icon name="trash" style="margin-right: 30rpx;color: #000;" size="40" slot="right" @click="cancelCopytrade"
              v-if="showCancel"></u-icon>
    </u-navbar>
    <view class="px-30">
      <view class="py-30 u-border-bottom">
        <text>{{ i18n.copyType }}</text>
        <view class="d-flex mt-20">
          <u-button class="mx-0 mr-16 px-40" :type="activeCopyType == item.id ? 'warning' : ''"
                    v-for="item in copyType" size="medium" @click="activeCopyType = item.id">{{ item.name }}
          </u-button>
        </view>
        <view class="mt-20 opacity-75 font-size-24">
          {{ i18n.copyAlert1 }}
        </view>
        <view class="mt-20 opacity-75 font-size-24" v-if="activeCopyType != 2">
          {{ i18n.copyAlert2 }}
        </view>
      </view>
      <view class="d-flex-between-center py-30 u-border-bottom">
        <text class="" v-if="activeCopyType == 1">{{ i18n.orderfollow_multiple }}</text>
        <text class="" v-else-if="activeCopyType == 2">{{ i18n.orderfollow_hand }}</text>
        <u-number-box v-model="number" :min="1" :disabled-input="true"></u-number-box>
      </view>

      <view class="uni-form-item uni-column  position-relative" style="margin-top: 10px;">
        <view class="title" style="color: #000000;font-weight: 500;">单笔跟单</view>
        <input class="uni-input" name="input" placeholder="10-100000" v-model="singleOpeningAmount"
               placeholder-style="color:#929292;"
               style="color: #000;border: 1px solid #f7f7f7;height: 40px;border-radius: 4px;padding-left: 5px;background: #ffffff;margin-top: 10px;"/>
        <text class="position-absolute"
              style="bottom: 21rpx;right: 20rpx;color: #000000;">
          USDT
        </text>
      </view>
      <view class="uni-form-item uni-column  position-relative" style="margin-top: 10px;display: flex;">
        <view class="title" style="color: #929292;">合约钱包可用余额</view>
        <view class="title" style="color: #000000;margin-top:0px;margin-left: 2px;font-weight: 700;display: flex;">
             <text style="line-height: 25px;height: 25px;margin-left: 4px;">{{lever_balance}}USDT</text>
             <image src="../../static/hz0111.png" @click="$utils.jump('/pages/fund/transfer2')"
                    style="width: 25px;height: 25px;margin-left: 4px;"></image>
        </view>
      </view>



      <view class="uni-form-item uni-column  position-relative" style="margin-top: 30px;">
        <view class="title" style="color: #000000;font-weight: 500;">最大跟单金额</view>
        <input class="uni-input" name="input" placeholder="10-100000" v-model="totalInvestmentAmount"
               placeholder-style="color:#929292;"
               style="color: #000;border: 1px solid #f7f7f7;height: 40px;border-radius: 4px;padding-left: 5px;background: #ffffff;margin-top: 10px;"/>
        <text class="position-absolute"
              style="bottom: 21rpx;right: 20rpx;color: #000000;">
          USDT
        </text>
      </view>








      <view class="mt-30">
        <button class="warning-button py-0 font-size-28 mb-20" @click="submit" style="color: #ffffff;">
          {{ $t("common.confirm") }}
        </button>
        <text class="iconfont icon-checkbox-full font-size-24" v-if="!hasRead" style="opacity: .6;color: #929292;"
              @click="hasRead = !hasRead"></text>
        <text class="iconfont icon-checkbox-ok-full text-warning font-size-24" v-else
              @click="hasRead = !hasRead"></text>
        <text class="ml-8 " style="color: #000;opacity: 0.6;">
          {{ i18n.beforeCopy }}
          <text class="text-warning" @click="jump">《{{ i18n.copyAgreement }}》</text>
        </text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      lever_balance:0,
      singleOpeningAmount:"",
      totalInvestmentAmount:"",
      activeCopyType: 1,
      number: 1,
      hasRead: false,
      showCancel: false,
      follow_user_id: 0
    };
  },
  onLoad(options) {
    const {uid} = options
    if (!uid) {
      this.$utils.showToast(this.$t("common.paramsWrong"))
      setTimeout(() => {
        uni.navigateBack({
          delta: 1
        })
      }, 1200)
      return
    }
    this.uid = uid
  },
  onShow() {
    //this.getCopytradeOrder()
    let that = this;
    that.$https.initDataToken({
      url: 'lever/getLeverBalance',
      type: 'POST',
    }, (res, msg) => {

      let message=res;
      that.lever_balance=message.lever_balance;
      that.lever_balance=Number(that.lever_balance).toFixed(2);
    });

  },
  methods: {
    getCopytradeOrder() {
      this.$u.api.copytrade.getCopytradeOrder(this.uid).then(res => {

      })
    },
    submit() {
      this.$u.throttle(() => {
        const {activeCopyType: type, number: numerical, uid, hasRead, i18n} = this
        if (!hasRead) {
          this.$utils.showToast(`${i18n.beforeCopy}《${i18n.copyAgreement}》`)
          return
        }
        ////跟随,type:1固定比例跟随，2固定手数跟随
        //follow: (trader_user_id,number,type) => vm.$u.post("/follow/follow",{trader_user_id,number,type}),
        //this.$u.api.follow.follow(uid,numerical,type).then(res=>{
        let lang = uni.getStorageSync('lang');
        let data = {
          singleOpeningAmount:this.singleOpeningAmount,
          totalInvestmentAmount:this.totalInvestmentAmount,
          trader_user_id: uid,
          number: numerical,
          type: type,
          lang: lang};
        this.$https.initDataToken({
          url: "follow/follow",
          type: "POST",
          data
        }, (res, msg) => {
          this.$utils.showToast(res)

          setTimeout(() => {
            uni.reLaunch({
              url: "/pages/index/index"
            })
          }, 1200)

        })
      }, 1000)
    },
    async cancelCopytrade() {
      const res = await this.$utils.showModal(this.$t("common.hint"), this.$t("copytrade.confirmCancelFollow"))
      if (!res) return
      //cancelFollow: (follow_user_id) => vm.$u.post("/follow/cancel",{follow_user_id}),
      //this.$u.api.copytrade.cancelFollow(this.uid).then(res=>{
      let data = {follow_user_id: this.uid};
      this.$https.initDataToken({
        url: "follow/cancel",
        type: "POST",
        data
      }, (res, msg) => {
        this.$utils.showToast(res)
        this.showCancel = false
      })
    },
    jump() {
      const lang = this.$store.state.lang
      const url = '/pages/follow/agreement_' + lang
      uni.navigateTo({
        url
      })
    }
  },
  computed: {
    i18n() {
      return this.$t("follow")
    },
    copyType() {
      const i18n = this.$t("follow")
      return [
        {
          id: 2,
          name: i18n.copyType2
        },
          {
        id: 1,
        name: i18n.copyType1
      }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.px-40 {
  padding-left: 40 rpx !important;
  padding-right: 40 rpx !important;
}
</style>
