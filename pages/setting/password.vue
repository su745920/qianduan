<template>
	<view class="text-white">
		<u-navbar :title="$t('setting.xgdlmm')"  showback="true"></u-navbar>
		<view class="mx-30" style="color: #ffffff;">
			<view class="mt-36 input-item" >
				<text class="d-block font-weight-bold font-size-28" style="color: #939393">{{i18n.email}}</text>
				<input type="text" class="input" disabled :value="$store.state.user.email"  placeholder-style="solid #939393;"
               style="color: #ffffff;border: 1px solid #242424;">
			</view>
			<view class="mt-36 input-item" >
				<text class="d-block font-weight-bold font-size-28" style="color: #939393">{{i18n.emailVerificationCode}}</text>
				<input type="digit" class="input" maxlength="6" v-model="code" :placeholder="i18n.plsiptEmailCode" placeholder-style="solid #939393;"
               style="border: 1px solid #242424;">
				<view class="send-code-button" :class="hasSend ? 'send' : ''" @click="getCode">
					<text class="d-block h-100 w-100" v-if="!hasSend">{{i18n.getVerificationCode}}</text>
					<text class="d-block h-100 w-100" v-else style="color: #ffffff;">{{seconds}}s</text>
				</view>
			</view>
			<view class="mt-36 input-item" v-for="(item,index) in passwordItem" :key="item.name">
				<text class="d-block font-weight-bold font-size-28" style="color: #939393">{{item.title}}</text>
				<input type="password" class="input" v-if="!item.showText"  style="color: #ffffff;border: 1px solid #242424;"
               v-model="item.value" :placeholder="item.placeholder">
				<input type="text" class="input" v-else v-model="item.value" style="color: #ffffff;border: 1px solid #242424;" placeholder-style="solid #939393;"
               :placeholder="item.placeholder">
				<text class="iconfont font-size-40  eye" :class="item.showText ? 'icon-yanjing_yincang'
				: 'icon-yanjing_xianshi'" @click="changeShowText(index)"  style="color: #939393;"></text>
			</view>
			<button class="mt-40 connect_btn" @click="submit" style="color: #000000;">{{$t("common.confirm")}}</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				passwordItem:null,
				hasSend:false,
				seconds:120,
				secondsInterval:null,
				code:''
			};
		},
		onShow() {
			const i18n = this.$t("setting")
			const passwordItem = [
				{
					name:'new_password',
					title:i18n.newPassword,
					placeholder:i18n.newPasswordPlaceholder,
					value:'',
					showText:false
				},
				{
					name:'new_password_confirm',
					title:i18n.confirmNewPassword,
					placeholder:i18n.confirmNewPasswordPlaceholder,
					value:'',
					showText:false
				}
			]
			this.passwordItem = passwordItem
		},
		methods:{
			changeShowText(index){
				let passwordItem = this.$u.deepClone(this.passwordItem)
				const showText = passwordItem[index].showText
				passwordItem[index].showText = !showText
				this.passwordItem = passwordItem
			},
			//发送验证码
			getCode(){
				// 设置节流,防止频繁点击
				this.$u.throttle(()=>{
					const {hasSend,i18n} = this

					if(hasSend) return

					//发送接口
					this.$u.api.setting.sendEmailCode(this.$store.state.user.email).then(res => {
						this.$utils.showToast(res.message)
						//倒计时
						this.hasSend = true
						this.secondsInterval = setInterval(() => {
							this.seconds = this.seconds - 1
							if (this.seconds == 0) {
								clearInterval(this.secondsInterval)
								this.hasSend = false
								this.seconds = 120
							}
						}, 1000)
					})
				},1000)
			},
			async submit(){
				const {code,passwordItem} = this
				const password = passwordItem[0].value
				const repassword = passwordItem[1].value
				const user_string = this.$store.state.user.account_number
				const i18n = this.$t("common")
				//判断验证码
				if(code.length < 6){
					this.$utils.showToast(i18n.plsInputCode)
					return false
				}
				//判断密码
				if(password.length < 6){
					this.$utils.showToast(i18n.pwdMoreThen6)
					return false
				}
				if(this.$utils.charTest(password)){
					this.$utils.showToast(i18n.specialChart)
					return false
				}
				//判断确认密码
				if(repassword.length < 6){
					this.$utils.showToast(i18n.rePwdMoreThen6)
					return false
				}
				if(this.$utils.charTest(repassword)){
					this.$utils.showToast(i18n.specialChart)
					return false
				}
				if(password != repassword){
					this.$utils.showToast(i18n.pwdInconsistent)
					return false
				}
				//先验证验证码
				try{
					const res = await this.$u.api.setting.verifyMailCode(user_string,code)
					this.$u.api.setting.editLoginPassword(user_string,password,repassword,code).then(res=>{
						this.$utils.showToast(res.message)
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1200)
					})

				}catch(e){
					//TODO handle the exception
				}
			}
		},
		computed:{
			i18n(){
				return this.$t("setting")
			},
		}
	}
</script>

<style lang="scss" scoped>
page{
  background: #000000;
}
.button-base{
	height: 76rpx;
	line-height: 76rpx;
}

.input-item{

	.send-code-button{
		position: absolute;
		@extend .font-size-22;
		right: 30rpx;
		top: 78rpx;
		height: 50rpx;
		line-height: 50rpx;
		padding: 0 20rpx;
		background-color: #2A64FD;
		border-radius: 10rpx;
		color: #ffffff;
		&.send{
			background-color: #939393;
		}
	}
}
.input{
	background-color: $uni-color-black;
}
input::placeholder {
  color: #929292 !important; //修改placeholder颜色
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
