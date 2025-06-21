<template>
	<view class="login-wrap" style="background: #000000;">


		<view style="display: flex;justify-content: space-between;margin: 20px;">
			<view>

				<image src="/static/uzx/icon_wrong_mark_white_24.png" style="width: 30px;height: 30px;" @click="homeFn">
				</image>


			</view>
			<view @click="goKefu">
				<image src="/static/bib/icon_operate_service.png" style="width: 24px;height: 24px;text-align: center">
				</image>
			</view>
		</view>

		<view class="login-container text-white" style="margin-top: -20px;">


			<view class="d-flex-between-center" style="margin-top: 20px;">
				<text class="d-block font-size-48 my-8 font-weight-bold linear-gradient-text"
					style="line-height: 66rpx;color: #ffffff;">{{i18n.register0}}</text>
				<text class="font-size-32 opacity-75" @click="showLanguage=true"
					style="color: #ffffff;">{{i18n.selectLang}}</text>
			</view>








			<view class="">
				<!-- 手机和邮箱 -->
				<view class="login-input-group d-flex" style="background: #121212;border-radius: 10px;">
					<navigator url="/pages/common/area" class="d-flex-between-center font-weight-bold mr-30"
						style="width: 90rpx;" v-if="false">
						<text>{{area_code}}</text>
						<text class="iconfont icon-xiala font-size-20"></text>
					</navigator>

					<input type="text" v-model="usestring" class="login-input" v-if="loginActive==0"
						placeholder-style="color:#939393" style="color: #ffffff;padding-left: 10px;"
						:placeholder="i18n.account">

					<input type="text" v-model="usestring" class="login-input" v-else-if="loginActive==1"
						placeholder-style="color:#939393" style="color: #ffffff;padding-left: 10px;"
						:placeholder="i18n.email">

				</view>
				<!-- 验证码 -->
				<block v-if="loginActive==1">
					<view class="login-input-group" v-if="loginActive != 2"
						style="background: #121212;border-radius: 10px;">
						<input type="digit" v-if="loginActive==0" v-model="code" class="login-input"
							placeholder-style="color:#939393" style="color: #ffffff;padding-left: 5px;"
							:placeholder="i18n.mobilecodePlaceholder">
						<input type="text" v-else-if="loginActive == 1" v-model="code" class="login-input"
							placeholder-style="color:#939393" style="color: #ffffff;padding-left: 5px;"
							:placeholder="i18n.emailcodePlaceholder">

						<view class="send-code-button connect_btn" :class="hasSend ? 'send' : ''" @click="getCode">
							<text class="d-block h-100 w-100" v-if="!hasSend">{{i18n.send}}</text>
							<text class="d-block h-100 w-100 text-white" v-else>{{seconds}}s</text>
						</view>
					</view>
				</block>


				<!-- 密码 -->
				<view class="login-input-group" style="background: #121212;border-radius: 4px;">
					<input type="password" v-model="password" class="login-input" placeholder-style="color:#939393"
						style="color: #ffffff;padding-left: 5px;background: #121212;" :placeholder="i18n.password">
				</view>

				<!-- 重复密码 -->
				<view class="login-input-group" style="background: #121212;border-radius: 4px;">
					<input type="password" v-model="re_password" class="login-input" placeholder-style="color:#939393"
						style="color: #ffffff;padding-left: 5px;background: #121212;"
						:placeholder="i18n.confirmPassword">
				</view>

				<!-- 邀请码 -->
				<view class="login-input-group" style="background: #121212;border-radius: 4px;">
					<input type="text" v-model="invitecode" class="login-input" placeholder-style="color:#929292"
						style="color: #ffffff;padding-left: 5px;width: 100%;background: #121212;margin: auto"
						:placeholder="i18n.invitecode">
				</view>

				<!--        <view class="login-input-group" v-if="mobile_must&&mobile_must==='1' " style="display: flex;">-->
				<!--          <view class="d-flex-between-center pb-30 u-border-bottom" style="width: 100px;">-->

				<!--            <view class="" @click="showFromList=true">-->
				<!--              <text class="login-input font-size-16 mr-10"  style="color: #939393;">{{area}}</text>-->
				<!--              <u-icon name="arrow-down" size="32"  style="color: #939393;"></u-icon>-->
				<!--            </view>-->
				<!--          </view>-->

				<!--          <input type="text" v-model="phone" class="login-input"  placeholder-style="color:#939393"-->
				<!--                 style="color: #ffffff;padding-left: 5px;"-->
				<!--                 :placeholder="$t('common.mobile')">-->
				<!--        </view>-->




				<view class="login-btn-group" style="margin-top: 10px;">
					<view class="d-flex mb-20" style="color: #909090;">
						{{i18n.hasaccount + i18n.go}}
						<navigator url="/pages/setting/left_menu" class="ml-4 text-warning" style="color: #ffffff;">
							{{i18n.login}}
						</navigator>
					</view>
					<button class="warning-button connect_btn"
						style="color: #000000;margin-top: 30px;border-radius: 40px;background: #ffffff;"
						@click="register">{{i18n.register}}</button>
				</view>
			</view>
		</view>

		<u-action-sheet :list="fromAccounts" v-model="showFromList" @click="clickFromActionSheet"
			:cancelText="i18ncommon.cancel">
		</u-action-sheet>

		<view class="kefu" @click="$utils.jump('/pages/kefu/index')" v-if="false">
			<image src="../../static/image/icon/kefu.png" style="width: 36rpx;height: 41rpx;"></image>
		</view>

		<!-- 选择语言的popup -->
		<u-popup v-model="showLanguage" mode="bottom" length="74%" :title="i18n.selectLang">
			<view class="popup-list">
				<view class="popup-list-item" v-for="item in langs" :key="item.value" :class="{active : item.selected}"
					@click="setLang(item)">
					<text>{{item.name}}</text>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import {
		langs
	} from "./../setting/data.js"

	import USelect from "../../uview-ui/components/u-select/u-select.vue";
	import { mapState } from 'vuex'
	export default {
		components: {
			USelect
		},
		data() {
			return {
				phone: '',
				showFromList: false,
				area: "+1",
				fromAccounts: [{
					text: '1'
				}, {
					text: '86'
				}, {
					text: '84'
				}, {
					text: '66'
				}, {
					text: '62'
				}],
				mobile_must: "",
				invite_code_must: "",
				logo1: "",
				logo2: "",
				langNew: '',
				usestring: '',
				password: '',
				re_password: "",
				invitecode: "",
				code: "",
				// 当前是那种注册方式
				loginActive: 1,
				// 是否已发送验证码
				hasSend: false,
				area_code: null,
				seconds: 120,
				secondsInterval: null,
				showLanguage: false,
				langs: null,
				regNavList2: [],
			};
		},
		onLoad(options) {
			const {
				extension_code
			} = options;
			//console.log("extension_code=>"+extension_code);
			if (extension_code) {
				this.invitecode = extension_code;
			}


			//getAppConfig: () => vm.$u.get("/getAppConfig?key=invite_code_must"),
			this.$https.initData({
				url: 'getRegConfig',
				type: 'GET'
			}, (res, msg) => {

				this.mobile_must = res.mobile_must;

				this.invite_code_must = res.invite_code_must;
				if (this.invite_code_must == 1) {
					this.invitecodePlaceholder = this.$t('common.invitecode');
				}



			})



			const _this = this
			// uni.setNavigationBarTitle({
			// 	title: _this.$t("common.register")
			// })

			const systemInfo = uni.getSystemInfoSync();
			if (systemInfo.platform === 'h5' || systemInfo.platform === 'webview') {
				console.log('当前运行环境是H5');
				let lang = "en";
				var lang0 = navigator.language;
				if (lang0 == "zh-CN" || lang0 == "zh") {
					lang = "zh";
				}
				if (lang0 == "en-US" || lang0 == "en") {
					lang = "en";
				}
				if (lang0 == "vi-VN" || lang0 == "vi") { //越南
					lang = "vi";
				}
				if (lang0 == "th-TH" || lang0 == "th") { //泰国
					lang = "th";
				}
				if (lang0 == "id-ID" || lang0 == "id") { //泰国
					lang = "id";
				}
				this._i18n.locale = lang;

				uni.setStorageSync('lang', lang);
				this.$store.commit('setLang', lang);
			}


			this.langNew = uni.getStorageSync("lang") || "en";

			this.$https.initData({
				url: 'logo',
				type: 'GET'
			}, (res, msg) => {
				//console.log(JSON.stringify(res));
				let message = res;
				this.logo1 = message[0].value;
				this.logo2 = message[1].value;
			})

		},
		onShow() {
			this.area_code = uni.getStorageSync('area_code') || "+86"
			this.setDefaultLang()
		},
		methods: {
			goKefu() {
				  if(!this.kefu) return
				  window.location.href = this.kefu
			},
			homeFn() {
				uni.reLaunch({
					url: "/pages/index/index"
				})
			},
			clickFromActionSheet(i) {
				this.area = this.fromAccounts[i].text;
				console.log("i==>" + i);
			},
			setDefaultLang() {
				let langsData = langs.map(el => {
					el.selected = false
					return el
				})
				const lang = this.$store.state.lang || 'en'
				const has = langsData.findIndex(item => item.value === lang)
				langsData[has].selected = true
				this.langs = langsData;

				if (lang === "zh") {
					this.area = this.fromAccounts[1].text;
				}
				if (lang === "vi") {
					this.area = this.fromAccounts[2].text;
				}
				if (lang === "th") {
					this.area = this.fromAccounts[3].text;
				}
				if (lang === "id") {
					this.area = this.fromAccounts[4].text;
				}

			},
			//设置语言
			setLang(item) {
				let langs = this.langs.map(el => {
					el.selected = false
					if (el.value == item.value) el.selected = true
					return el
				})
				this.langs = langs
				this._i18n.locale = item.value
				//this.lang = item
				uni.setStorageSync('lang', item.value)
				this.$store.commit('setLang', item.value)

				this.langNew = item.value;

				//location.reload();

				setTimeout(() => {
					this.showLanguage = false
				}, 200);

				//
				const lang = this.$store.state.lang || 'en'
				if (lang === "en") {
					this.area = this.fromAccounts[0].text;
				}
				if (lang === "zh") {
					this.area = this.fromAccounts[1].text;
				}
				if (lang === "vi") {
					this.area = this.fromAccounts[2].text;
				}
				if (lang === "th") {
					this.area = this.fromAccounts[3].text;
				}
				if (lang === "id") {
					this.area = this.fromAccounts[4].text;
				}



			},
			//发送验证码
			getCode() {
				// 设置节流,防止频繁点击
				this.$u.throttle(() => {
					const {
						loginActive,
						usestring,
						hasSend,
						i18n
					} = this

					if (hasSend) return
					//如果是手机
					if (loginActive == 0) {
						if (!this.$u.test.number(usestring) || !usestring) {
							this.$utils.showToast(i18n.plsInputMobile)
							return false
						}
					} else {
						//如果是邮箱
						if (!this.$u.test.email(usestring) || !usestring) {
							this.$utils.showToast(i18n.plsInputEmail)
							return false
						}
					}
					//发送接口

					let data = {
						user_string: usestring,
						scene: 'register',
						area_code_id: 1,
						country_code: 86,
						lang: 'zh',
						email_code: ''
					};
					this.$https.initData({
						url: 'sms_mail',
						type: 'POST',
						data
					}, (res, msg) => {
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


				}, 1000)
			},
			async register() {
				let {
					loginActive,
					usestring,
					code,
					invitecode,
					password,
					re_password,
					i18n
				} = this
				if (loginActive === 0) {
					if (!usestring) {
						this.$utils.showToast(i18n.plsInputMobile)
						return false
					}
				} else if (loginActive === 1) {
					//如果是邮箱
					if (!this.$u.test.email(usestring) || !usestring) {
						this.$utils.showToast(i18n.plsInputEmail)
						return false
					}
				} else {
					if (usestring.length < 6) {
						this.$utils.showToast(i18n.plsInputUsername)
						return false
					}
				}
				//判断验证码
				// if(loginActive != 2 && code.length < 4){
				// 	this.$utils.showToast(i18n.plsInputCode)
				// 	return false
				// }
				//判断密码
				if (password.length < 6) {
					this.$utils.showToast(i18n.passwordPlaceholder)
					return false
				}
				if (re_password.length < 6) {
					this.$utils.showToast(i18n.passwordPlaceholder)
					return false
				}
				if (this.$utils.charTest(password)) {
					this.$utils.showToast(this.$t("common.specialChart"))
					return false
				}
				//判断两次密码是否一致
				if (password != re_password) {
					this.$utils.showToast(i18n.pwdInconsistent)
					return false
				}
				invitecode = this.$utils.charFilter(invitecode)
				//判断邀请码
				if (this.invite_code_must == 1) {
					if (invitecode.length < 4) {
						this.$utils.showToast(i18n.plsInputInviteCode)
						return false
					}
				}
				const lang = uni.getStorageSync('lang') || 'en';

				if (this.mobile_must && this.mobile_must === '1') {
					if (this.phone === "") {
						this.$utils.showToast(this.$t("common.plsInputMobile"));
						return false;
					}
				}

				let data = {
					lang: lang,
					user_string: usestring,
					code: code,
					password: password,
					re_password: re_password,
					extension_code: invitecode,
					type: 'email',
					area: this.area,
					phone: this.phone,
				}
				this.$https.initData({
					url: 'user/register',
					type: 'POST',
					data
				}, (res, msg) => {
					this.$utils.showToast(res.msg)
					uni.setStorageSync('token', res.token);
					this.$store.commit('setToken', res.token);
					//跳转至登录页面
					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/index/index"
						})
					}, 1200)


				})

				// try{
				// 	await this.$u.api.user.verifyMailCode(usestring,code)
				// 	//进行ajax
				// 	this.$u.api.user.register(
				// 		usestring,
				// 		code,
				// 		password,
				// 		re_password,
				// 		invitecode,
				// 		'email'
				// 	).then(res=>{
				// 		this.$utils.showToast(res.message)
				// 		// 跳转至登录页面
				// 		setTimeout(()=>{
				// 			uni.redirectTo({
				// 				url:'/pages/setting/left_menu'
				// 			})
				// 		})
				// 	})
				// }catch(e){
				// 	//TODO handle the exception
				// }
			}
		},
		computed: {
			...mapState(['kefu']),
			i18ncommon() {
				return this.$t("common")
			},
			lang() {
				return lang
			},
			i18n() {
				return this.$t("common")
			},

			regNavList() {
				return [{
						name: this.$t('common').account
					},
					{
						name: this.$t('common').email
					}
				]
			}








		}
	}
</script>
<style lang="scss">
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

	// 弹出层列表
	.popup-list {
		.popup-list-item {
			height: 96rpx;
			line-height: 96rpx;
			padding: 0 30rpx;
			@extend .font-size-32;
			position: relative;
			display: flex;
			align-items: center;
			color: #939393;

			&:before {
				content: "";
				position: absolute;
				left: 30rpx;
				right: 30rpx;
				bottom: 0;
				height: 2rpx;
				//background-color: #000000;
			}

			&.active {
				background-color: #000000;
				color: #ffffff;

				&:after {
					content: "";
					width: 36rpx;
					height: 36rpx;
					background-image: url('./../../static/uzx/icon_coin_select_yes.png');
					background-size: cover;
					position: absolute;
					right: 80rpx;
					top: 50%;
					margin-top: -10rpx;

				}
			}
		}
	}

	.connect_btn {
		background: #c0dd2b;

		//-webkit-background-clip: text;
		//-webkit-text-fill-color: transparent;
		//background-clip: text;
		//text-fill-color: transparent;
		//text-align: center;
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