<template>
  <view class="text-white">
    <u-navbar title="我要申诉"  showback="true">
      <navigator url="/pages/fund/receive_withdraw_record" slot="right" style="color: #2A64FB;display: none">
        <u-icon name="order" size="38"></u-icon>
      </navigator>
    </u-navbar>
    <view class="mx-36 py-20">
      <view class="mt-30 p-30 border-radius-20 bg-black">
        <view class="mt-30">
          <text class="d-block" style="color: #666;font-size: 14px;">如果您在交易过程中发现欺诈行为可以进行申诉</text>
          <text class="d-block mt-30" style="color: #666">证据(请上传图片截屏)</text>
          <view class="border-radius-20 mt-20 d-flex justify-content-center align-items-center bg-333" style="idth: 400rpx;height: 400rpx;" @click="uploadImage">
            <image :src="account | retImageUrl" style="width: 100%;height: 100%;" v-if="account" class="border border-radius-20"></image>
            <u-icon name="plus" size="50" color="#666" v-else></u-icon>
          </view>

          <text class="d-block" style="color: #666;margin-top: 10px;">具体陈述</text>
          <view class="uni-textarea" style="border: 1px solid #f7f7f7;background: #ffffff;border-radius: 6px;margin-top: 5px;">
            <textarea placeholder-style="color:#929292" v-model="content"
                      style="color: #000;padding: 5px;"
                      placeholder="请输入申诉内容"/>
          </view>


          <button class="warning-button mt-70" @click="submit" style="color: #ffffff;">{{$t("common.submit")}}</button>
        </view>
      </view>

    </view>

  </view>
</template>

<script>
// 收款
export default {
  data() {
    return {
      content:'',
      selectCoin: '',
      activeAddressList: 0,
      rechargeChannel: null,
      //增加地址
      showAddNewAddress: false,
      addNewAddressValue: '',
      //修改备注名
      showUpdateAddress: false,
      updateAddressValue: '',
      //删除地址
      showDeleteAddress: false,
      //钱包一些数据
      info: {},
      user: {},
      address: '',
      addressImage:'',
      showQrcode:true,
      step:1,
      //充值数量
      amount:'',
      //充值凭证
      account:''
    };
  },
  onLoad() {
    this.selectCoin = uni.getStorageSync('selectCoin')
    this.getInfo()
  },
  onShow() {
  },
  methods: {
    // 钱包,用户的一些相关信息
    async getInfo() {
      //uni.showLoading()
      const _this =this
      const {
        selectCoin,
        activeAddressList
      } = this

      const retUser = await this.$u.api.setting.getUserInfo()
      this.user = retUser.message

      const retInfo = await this.$u.api.wallet.getWalletInfo(selectCoin.id)
      this.info = retInfo.message

      this.address = selectCoin.address
      // const addressInfo = await this.$u.api.wallet.getInAddress(selectCoin.id, retUser.message.id)

      // // USDT
      // if (selectCoin.id == 3) {
      // 	if(selectCoin.subName == "ERC20"){
      // 		this.address = addressInfo.message.erc20
      // 	}else if(selectCoin.subName == "TRC20"){
      // 		this.address = addressInfo.message.trc20
      // 	}
      // } else {
      // 	this.address = addressInfo.message
      // }
      this.$refs.uqrcode.make({
        canvasId: 'qrcode',
        mode: 'canvas', // 默认为view
        size: 200,
        text: this.address
      }).then(res=>{
        this.addressImage = res.tempFilePath
        //uni.hideLoading()
      })
    },
    saveQrcode(){
      const {addressImage} = this
      const _this = this
      // #ifdef H5
      uni.previewImage({
        urls:[addressImage]
      })
      // #endif

      // #ifdef APP-PLUS
      uni.saveImageToPhotosAlbum({
        filePath: addressImage,
        success: function () {
          _this.$utils.showToast(_this.$t("common.saveSuccess"))
        }
      });
      // #endif
    },
    copy() {
      uni.setClipboardData({
        data:this.address,
      });
    },
    //弹出新增地址
    showAddNewAddressFunc() {
      const name = `新地址` + this.$u.random(100000, 999999)
      this.addNewAddressValue = name
      this.showAddNewAddress = true
    },
    //弹出修改地址
    updateNewAddressFunc(item) {
      const updateAddressValue = item.name
      this.updateAddressValue = updateAddressValue
      this.showUpdateAddress = true
    },
    //弹出删除地址
    showDeleteAddressFunc(item) {
      this.showDeleteAddress = true
    },
    uploadImage(){
      this.$utils.uploadImage().then(res=>{
        this.account = res
      })
    },
    //提交
    submit(){
      const {amount,account,selectCoin,i18n} = this
      if(this.content==""){
        this.$utils.showToast("请输入申诉内容")
        return
      }
      if(!account||account==""){
        this.$utils.showToast("请上传证据截屏")
        return
      }

      const {id:currency} = selectCoin
      //dianhui,address,money,voucher-上传凭证-account,currency,twd,channel,usdt_type--selectCoin.name
      //console.log("address=>"+this.address+"  money=>"+amount+" account=>"+account+" currency=>"+currency+"  channel=>"+selectCoin.subName+"selectCoin=>"+JSON.stringify(selectCoin));
      this.$u.api.c2c.saveAppeal(account,this.content).then(res=>{
        this.$utils.showToast(res.message)
        this.account="";
        this.content="";
      })
    }
  },
  filters: {
    substring(value, start, end) {
      if (value) {
        value = value + ''
        return value.substring(start, end)
      } else {
        return ''
      }
    }
  },
  watch:{

  },
  computed:{
    i18n(){
      return this.$t("fund")
    }
  }
}
</script>

<style lang="scss" scoped>
.select-coin {
  @extend .d-flex,
  .align-items-center,
  .justify-content-between;
  border-bottom: 1px solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }

  .type {
    background-color: $uni-color-success;
    border-radius: 22rpx;
    color: #fff;
    padding: 6rpx 18rpx;
    font-size: 20rpx;
  }

  &.cannot {
    view {
      opacity: .3;
    }

    .type {
      background-color: #d6d6d6;
    }
  }
}

.receive-alert {
  @extend .alert;
  color: #001649;
  background-color: #f7f8fc;
}

.slide-wrap {
  border: 1px solid rgba(0, 7, 37, .1);
  border-radius: 34rpx;
  background-color: #f7f8fc;
  font-size: 26rpx;
  color: #001649;
  height: 60rpx;
  line-height: 60rpx;
  overflow: hidden;

  .item {
    height: 100%;
    line-height: inherit;
    text-align: center;
    width: 50%;
    border-radius: 34rpx;
    background-color: inherit;

    &.active {
      background-color: #b20000;
      color: #fff;
      transition: all .3s ease 0s;
    }
  }
}

.list-item {
  @extend .border-radius-20,
  .box-shadow;
  padding: 26rpx 30rpx;

  .coin-name {
    background-color: $uni-color-success;
    border-radius: 22rpx;
    color: #fff;
    padding: 6rpx 18rpx;
    font-size: 20rpx;
  }

  .name {
    font-size: 28rpx;
    color: rgba(0, 22, 73, 1);
    margin-right: 10rpx;
  }

  .value {
    font-size: 28rpx;
    color: rgba(0, 22, 73, .6);
    font-weight: bold;
  }

  .func {
    font-size: 28rpx;
    color: rgba(0, 22, 73, .6);
  }

  .copy {
    width: 92rpx;
    height: 48rpx;
    line-height: 48rpx;
    color: white;
    background-color: $uni-color-primary;
    font-size: 28rpx;
    border-radius: 5rpx;
    text-align: center;
  }

  .count {
    font-size: 28rpx;
    color: rgba(0, 22, 73, .6);
    margin-top: 20rpx;
  }
}

.receive-input {
  height: 60rpx;
  background-color: #F4F5F7;
  border: 1px solid #EBEBEB;
  line-height: 60rpx;
  padding: 0 20rpx;
  border-radius: 10rpx;
  color: #333;
  font-size: 28rpx;
}

.save-button{
  background-color: $uni-color-warning;
  color: #fff;
  font-size: 22rpx;
  width: 50%;
  margin-top: 20rpx;
}

.wallet-input{
  background-color: $uni-color-333;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 10rpx;
  padding: 0 20rpx;
}
</style>
