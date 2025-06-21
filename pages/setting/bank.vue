<template>
	<view class="">
		<u-navbar :title="i18n.addBank" showback="true"></u-navbar>
		<view class="mx-30 mt-30 box-shadow p-30 border-radius-20 text-white" style="background: #242424;">
			<!-- 真实姓名 -->
      <view class="login-input-group" style="margin-top:0px;">
				<text class="label" style="color: #ffffff;">{{i18n.real_name}}</text>
				<input type="text" v-model="real_name" class="login-input" style="color: #ffffff;border: 1px solid #333;margin-top:10px;">
			</view>

			<!-- 银行名称 -->
      <view class="login-input-group" style="margin-top: 10px;">
				<text class="label" style="color: #ffffff;">{{i18n.bank_name}}</text>
				<input type="text" v-model="bank_name" class="login-input" style="color: #ffffff;border: 1px solid #333;margin-top:10px;">
			</view>

			<!-- 开户省市 -->
			<view class="login-input-group" style="margin-top: 10px;">
				<text class="label" style="color: #ffffff;">{{i18n.bank_dizhi}}</text>
				<input type="text" v-model="address" class="login-input" style="color: #ffffff;border: 1px solid #333;margin-top: 8px;">
			</view>

			<!-- 银行卡号 -->
      <view class="login-input-group" style="margin-top: 10px;">
				<text class="label" style="color: #ffffff;">{{i18n.bank_account}}</text>
				<input type="digit" v-model="bank_account" class="login-input"  style="color: #ffffff;border: 1px solid #333;margin-top: 8px;">
			</view>

			<!-- 地址 -->
			<!-- <view class="login-input-group">
				<text class="label">{{i18n.address}}</text>
				<input type="text" v-model="personal_address" class="login-input">
			</view> -->

			<!-- SWIFT -->
			<!-- <view class="login-input-group">
				<text class="label">{{i18n.alipay_account}}</text>
				<input type="text" v-model="alipay_account" class="login-input">
			</view> -->

			<!-- SWIFT -->
			<!-- <view class="login-input-group">
				<text class="label">{{i18n.wechat_nickname}}</text>
				<input type="text" v-model="wechat_nickname" class="login-input">
			</view> -->



			<!-- SWIFT -->
			<!-- <view class="login-input-group">
				<text class="label">{{i18n.wechat_account}}</text>
				<input type="text" v-model="wechat_account" class="login-input">
			</view> -->


		</view>


		<view class="m-30">
			<button class="warning-button py-0 connect_btn"  style="color: #000000;"
              @click="submit" >{{$t("common.confirm")}}</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				real_name:'',
				bank_name:'',
				bank_account:'',
        address:'',
				alipay_account:'',
				wechat_nickname:'',
				wechat_account:'',
			};
		},
		onShow() {
			this.getCard()
		},
		methods: {
			getCard(){
        this.$https.initDataToken({
          url: 'user/cash_info',
          type: 'POST',

        }, (message, msg) => {
          if (message) {
            this.real_name = message.real_name
            this.bank_name = message.bank_name
            this.bank_account = message.bank_account
            this.address = message.address
            this.alipay_account = message.alipay_account
            this.wechat_account = message.wechat_account
            this.wechat_nickname = message.wechat_nickname
          }
				})
			},
			submit() {
				let {
					i18n,real_name,bank_name,bank_account,address,alipay_account,wechat_account,wechat_nickname
				} = this
				if(!real_name || !bank_name || !bank_account || !address){
					this.$utils.showToast(i18n.allNeed)
				}

				let data= {
          lang:uni.getStorageSync("lang")||"en",
          real_name:real_name,
          bank_name:bank_name,
          bank_account:bank_account,
          address:address,
          alipay_account:alipay_account,
          wechat_account:wechat_account,
          wechat_nickname:wechat_nickname
        };
        this.$https.initDataToken({
          url: 'user/cash_save',
          type: 'POST',
          data
        }, (res, msg) => {
					this.$utils.showToast(res);
          setTimeout(() => {
            //this.$utils.jump('/pages/setting/setting');
            uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
              delta: 1
            });

            }, 1000);


				})
			},

		},
		computed: {
			i18n() {
				return this.$t("setting")
			},
		}
	}
</script>

<style lang="scss" scoped>
page{
  background: #000000;
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
