<template>
	<view class="login-wrap" style="background: #000000;">
		<l-common-navbar :isCustomBack="true" @back="$utils.jump('/pages/setting/setting')" />
		<view class="login-container text-white" style="margin-top: -20px;">
			<view class="d-flex-between-center" style="margin-top: 20px;">
				<text class="d-block font-size-48 my-8 font-weight-bold linear-gradient-text"
					style="line-height: 66rpx;color: #ffffff;">{{$t('setting.bindEmail')}}</text>
			</view>
			<view class="">
				<!-- 手机和邮箱 -->
				<view class="login-input-group d-flex" style="background: #121212;border-radius: 10px;">
					<input type="text" v-model="usestring" class="login-input"
						placeholder-style="color:#939393" style="color: #ffffff;padding-left: 10px;"
						:placeholder="i18n.email">
				</view>
				<!-- 验证码 -->
				<view class="login-input-group"
					style="background: #121212;border-radius: 10px;">
					<input type="text"  v-model="code" class="login-input"
						placeholder-style="color:#939393" style="color: #ffffff;padding-left: 5px;"
						:placeholder="i18n.emailcodePlaceholder">
				
					<view class="send-code-button connect_btn" :class="hasSend ? 'send' : ''" @click="getCode">
						<text class="d-block h-100 w-100" v-if="!hasSend">{{i18n.send}}</text>
						<text class="d-block h-100 w-100 text-white" v-else>{{seconds}}s</text>
					</view>
				</view>
				<view class="login-btn-group" style="margin-top: 10px;">
					<button class="warning-button connect_btn"
						style="color: #000000;margin-top: 30px;border-radius: 40px;background: #ffffff;"
						@click="submit">{{$t('common.confirm')}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				usestring: '',
				code: "",
				// 是否已发送验证码
				hasSend: false,
				seconds: 120,
				secondsInterval: null
			};
		},
		methods: {
			//发送验证码
			getCode() {
				// 设置节流,防止频繁点击
				this.$u.throttle(() => {
					const {
						usestring,
						hasSend,
						i18n
					} = this
					uni.showLoading({
						mask: true
					})
					setTimeout(()=> {
						uni.hideLoading()
					},5000)
					if (hasSend) return
					//如果是邮箱
					if (!this.$u.test.email(usestring) || !usestring) {
						this.$utils.showToast(i18n.plsInputEmail)
						return false
					}
					//发送接口
					const lang = uni.getStorageSync('lang') || 'en';
					let data = {
						user_string: usestring,
						lang: lang,
						type: 'bind'
					};
					this.$https.initData({
						url: 'sms_mail',
						type: 'POST',
						data
					}, (res, msg) => {
						uni.hideLoading()
						this.$utils.showToast(res)
						//倒计时
						this.hasSend = true
						this.secondsInterval = setInterval(() => {
							this.seconds = this.seconds - 1
							if (this.seconds === 0) {
								clearInterval(this.secondsInterval)
								this.hasSend = false
								this.seconds = 120
							}
						}, 1000)
					})
				}, 3000)
			},
			async submit() {
				let {
					usestring,
					code,
					i18n
				} = this
				//如果是邮箱
				if (!this.$u.test.email(usestring) || !usestring) {
					this.$utils.showToast(i18n.plsInputEmail)
					return false
				}
				const lang = uni.getStorageSync('lang') || 'en';

				let data = {
					lang: lang,
					email: usestring,
					code: code
				}
				this.$https.initDataToken({
					url: 'safe/email',
					type: 'POST',
					data
				}, (res, msg) => {
					this.$utils.showToast(msg)
					//返回
					setTimeout(() => {
						uni.navigateBack()
					}, 1200)
				})
			}
		},
		computed: {
			i18ncommon() {
				return this.$t("common")
			},
			lang() {
				return lang
			},
			i18n() {
				return this.$t("common")
			}
		}
	}
</script>
<style lang="scss" scoped>
	page {
		background: #000000;
	}

	.login-wrap {
		height: 240vh;
		background-color: #ffffff;

		.login-container {
			position: fixed;
			left: 10px;
			right: 10px;
			bottom: 20px;
			top: 100px;
			padding: 40rpx;
			padding-bottom: 20rpx;
			//background-color: $uni-color-black;
			border-radius: 10px;
			min-height: 55vh;
		}
	}

	.send-code-button {
		position: absolute;
		height: 58rpx;
		line-height: 58rpx;
		@extend .font-size-28;
		border-radius: 20rpx;
		background-color: $uni-color-warning;
		padding: 0 40rpx;
		right: 0;
		bottom: 8rpx;
		transition: all .3s ease 0s;
		color: #000000;

		&.send {
			background-color: rgba(0, 0, 0, .05);
			color: #333;
		}
	}

	.connect_btn {
		background: #c0dd2b;
	}

	.tran_btn {
		background: #c0dd2b;
		border-radius: 20px;
		text-align: center;
		color: #000000;


	}

	.login-input:hover,
	.login-input:focus {
		border: 1px solid #ffffff;
		border-radius: 4px;
	}

	.login-input {
		border: 1px solid #242424;
		border-radius: 4px;
	}
</style>