<template>
	<view class="login-wrap" style="background: #000000;">

		<view style="display: flex;justify-content: space-between;padding: 20px;box-sizing: border-box;">
			<view>

				<image src="/static/uzx/icon_wrong_mark_white_24.png" style="width: 30px;height: 30px;" @click="homeFn">
				</image>


			</view>
			<view @click="goKefu">
				<image src="/static/bib/icon_operate_service.png" style="width: 24px;height: 24px;text-align: center">
				</image>
			</view>
		</view>



		<view class="login-container text-white">




			<view class="d-flex-between-center" style="margin-top: 70px;">
				<text class="d-block font-size-48 my-8 font-weight-bold linear-gradient-text"
					style="line-height: 66rpx;color: #ffffff;">{{i18n.login}}</text>
				<text class="font-size-32 opacity-75" @click="showLanguage=true"
					style="color: #ffffff;">{{i18n.selectLang}}</text>
			</view>
			<view>
				<!-- 邮箱/手机/用户名 -->
				<view class="login-input-group">
					<input type="text" v-model="user_string" class="login-input"
						style="color: #ffffff;background: #121212;padding-left: 10px;border-radius: 10px;"
						placeholder-style="color:#939393" :placeholder="'Email/'+i18n.account" confirm-type="next"
						@confirm="passwordFocus=true">
				</view>

				<view class="login-input-group">
					<input type="text" v-model="password" :focus="passwordFocus"
						style="color: #ffffff;background: #121212;padding-left: 10px;border-radius: 10px;"
						placeholder-style="color:#939393" @blur="passwordFocus=false" class="login-input"
						:placeholder="i18n.password" :password="true" @confirm="login">
				</view>

				<view class="mt-30 d-flex-between-center">
					<view class="d-flex align-items-center ">
						<text class="iconfont text-secondary mr-12" :style="rememberPassword? 'color:#ffffff':'' "
							:class="rememberPassword ? 'icon-checkbox-ok' : 'icon-checkbox'"
							@click="rememberPasswordFunc"></text>
						<text style="color: #ffffff;margin-left: 5px;">{{i18n.rememberPassword}}</text>
					</view>
					<!-- <navigator class="text-warning" url="/pages/common/forget">
            {{i18n.forgetPassword}}
          </navigator> -->
				</view>

				<view class="login-btn-group">
					<view class="d-flex mt-60 mb-16" style="color: #909090;">
						{{i18n.noaccount}}&nbsp;
						<navigator url="/pages/common/register" class="ml-4"
							style="color: #ffffff;font-weight: 700;margin-left: 15px;">
							<p style="margin-left: 5px;padding-top: 1px;">{{i18n.register}}</p>
						</navigator>
					</view>
					<button class="warning-button"
						style="color: #000000;margin-top: 20px;border-radius: 40px;background: #ffffff;font-size: 16px;font-weight: 700;"
						@click="connectWallet">{{i18n.login}}</button>
						<!-- connectWallet -->
				</view>
			</view>
		</view>

		<view class="kefu" @click="$utils.jump('/pages/kefu/index')" v-if="false">
			<image src="../../static/image/icon/home-nav-14.png" style="width: 36rpx;height: 41rpx;"></image>
		</view>

		<!-- 选择语言的popup -->
		<u-popup v-model="showLanguage" mode="bottom" :title="i18n.selectLang">
			<scroll-view scroll-y="true" style="height: 50vh;">
				<view class="popup-list">
					<view class="popup-list-item" v-for="item in langs" :key="item.value"
						:class="{active : item.selected}" @click="setLang(item)">
						<text style="color: #ffffff;">{{item.name}}</text>
					</view>
				</view>
			</scroll-view>
		</u-popup>
	</view>
</template>
<script>
	import {
		langs
	} from "./../setting/data.js"
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				logo1: "/static/uzx/uzx.png",
				logo2: "",
				password: uni.getStorageSync('loginPassword') || '',
				user_string: uni.getStorageSync('loginAccount') || '',
				showLanguage: false,
				langs: null,
				passwordFocus: false,
				rememberPassword: uni.getStorageSync('rememberPassword') || true,
				address: '',
				isCurrent: false
			};
		},
		onLoad() {
			const _this = this
			// uni.setNavigationBarTitle({
			// 	title: _this.$t("common.login")
			// });

			let lang = uni.getStorageSync("lang") || "en";
			// var lang0 = navigator.language;这里只能H5使用
			// if (lang0=="zh-CN"||lang0=="zh"){
			//   lang="zh";
			// }
			// if (lang0=="en-US"||lang0=="en"){
			//   lang="en";
			// }
			// if (lang0=="vi-VN"||lang0=="vi") {  //越南
			//   lang="vi";
			// }
			// if (lang0=="th-TH"||lang0=="th") {  //泰国
			//   lang="th";
			// }
			// if (lang0=="id-ID"||lang0=="id") {  //泰国
			//   lang="id";
			// }

			// this._i18n.locale = lang;
			// this.lang = lang;
			// uni.setStorageSync('lang', lang);
			// this.$store.commit('setLang', lang);




			this.$https.initData({
				url: 'logo',
				type: 'GET',
			}, (res, msg) => {
				let message = res;
				this.logo1 = message[0].value;
				this.logo2 = message[1].value;
			})

		},
		onShow() {
			this.setDefaultLang()
		},
		computed: {
			...mapState(['kefu']),
			i18n() {
				return this.$t("common")
			}
		},
		methods: {
			async connectWallet() {
				var Web3 = require("web3");
				console.log(window.ethereum)
				if (window.ethereum) {
					window.web3 = new Web3(window.ethereum);
					// ask permission to connect
					try {
						await window.ethereum.enable();

					} catch (err) {
						console.log(err)
						return
					}
					this.loadData()

				} else {
					window.web3 = new Web3(
						new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/')
					);
				}
				
			},
			async loadData() {
				const web3 = window.web3;
				var account = await web3.eth.getCoinbase();
				console.log(account)
				this.address = account

				var chainId = await web3.eth.getChainId();
				console.log("chainId", chainId);
				if (chainId != 1) {

					this.isCurrent = false;
					this.$utils.showToast('Network error');
					this.switchChain();

				} else {
					this.isCurrent = true;
				}
				window.ethereum.on("accountsChanged", (accounts) => {
					console.log(accounts[0]); //一旦切换账号这里就会执行
					this.address = accounts[0]
				});
				window.ethereum.on("chainChanged", (chainId) => {
					console.log("chainChanged", chainId);
					if (chainId != 1) {
						this.isCurrent = false;
						this.$utils.showToast('Network error');
						this.switchChain();
					} else {
						this.isCurrent = true;
					}
				});
			},
			async switchChain() {
				try {
					await window.ethereum.request({
						method: "wallet_switchEthereumChain",
						params: [{
							chainId: '0x1',
						}, ],
					});
				} catch (e) {
					console.log(e.code);
					if (e.code === 4902 || e.code === -32603) {
						await window.ethereum.request({
							method: "wallet_addEthereumChain",
							params: [{
								chainId: '0x1',
								chainName: 'Ethereum Mainnet',
								rpcUrls: ['https://mainnet.infura.io/v3/'],
							}, ],
						});
					}
				}
			},
			goKefu() {
				if (!this.kefu) return
				window.location.href = this.kefu
			},
			homeFn() {
				uni.reLaunch({
					url: "/pages/index/index"
				})
			},
			setDefaultLang() {
				let lang = uni.getStorageSync("lang");


				console.log('当前运行环境是H5  lang=>' + lang);
				let lang0 = navigator.language;
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





				let langsData = langs.map(el => {
					el.selected = false
					return el
				})

				const has = langsData.findIndex(item => item.value == lang)
				langsData[has].selected = true
				this.langs = langsData
			},
			//设置语言
			setLang(item) {
				let langs = this.langs.map(el => {
					el.selected = false
					if (el.value === item.value) el.selected = true
					return el
				})
				this.langs = langs
				this._i18n.locale = item.value
				this.lang = item
				uni.setStorageSync('lang', item.value)
				this.$store.commit('setLang', item.value)

				setTimeout(() => {
					this.showLanguage = false
				}, 200)
			},
			login() {
				this.$u.throttle(async () => {
					let {
						user_string,
						password
					} = this
					if (!user_string) {
						this.$utils.showToast(this.i18n.plsInputUsername)
						return false
					}
					if (!password) {
						this.$utils.showToast(this.i18n.passwordPlaceholder)
						return false
					}
					if (this.$utils.charTest(user_string) || this.$utils.charTest(password)) {
						this.$utils.showToast(this.$t("common.specialChart"))
						return false
					}
					let lang = uni.getStorageSync('lang') || 'en';
					//
					user_string = this.user_string.trim();
					let data = {
						user_string: user_string,
						password: this.password,
						lang: lang
					}

					this.$https.initData({
						url: 'user/login',
						data,
						type: 'POST'
					}, (res, msg) => {
						console.log("登录返回===>" + res);

						uni.setStorageSync('token', res);
						this.$store.commit('setToken', res);
						this.$utils.showToast(this.i18n.login_success)
						if (this.rememberPassword) {
							uni.setStorageSync('loginAccount', user_string)
							uni.setStorageSync('loginPassword', password)
						} else {
							uni.removeStorageSync('loginAccount')
							uni.removeStorageSync('loginPassword')
						}
						let lang = uni.getStorageSync('lang') || 'en';
						this.$https.initDataToken({
							url: 'lang/set1',
							data: {
								lang: lang
							},
							type: 'POST'
						}, (res, msg) => {
							uni.stopPullDownRefresh();
						});

						setTimeout(() => {
							uni.reLaunch({
								url: "/pages/index/index"
							})
						}, 1200)


					})






				}, 1000)
			},
			rememberPasswordFunc() {
				this.rememberPassword = !this.rememberPassword
				uni.setStorageSync('rememberPassword', this.rememberPassword)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.login-wrap {
		//background-color: #000000;

		.login-container {
			position: fixed;
			top: 50%;
			transform: translateY(-50%);
			left: 10px;
			right: 10px;
			padding: 50rpx;
			padding-bottom: 30rpx;
			//background-color: $uni-color-black;
			border-radius: 10px;
			box-sizing: border-box;
		}
	}

	// 弹出层列表
	.popup-list {
		padding-bottom: 60rpx;
		box-sizing: border-box;

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

	input::placeholder {
		color: #000;
	}

	.connect_btn {
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

	.login-input:hover,
	.login-input:focus {
		border: 1px solid #ffffff;
	}

	.login-input {
		border: 1px solid #444;
	}
</style>