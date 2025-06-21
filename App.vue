<script>
	import pageAnimation from './components/page-animation'
	import TabBar from "./components/common/tabbar/tabbar.vue"
	// import { ethers } from "ethers";
	const ethers = require("./common/ethers.js")
	export default {
		data() {
			return {
				componentsName: ['TabBar'],
				address: ''
			}
		},
		mixins: [pageAnimation],
		// 此处globalData为了演示其作用，不是uView框架的一部分
		globalData: {},
		onLoad() {
			// 页面加载时绑定监听事件
			window.addEventListener('beforeunload', this.onClose);
			window.addEventListener('unload', this.onClose);
		},
		onUnload() {
			// 页面卸载时移除监听事件
			window.removeEventListener('beforeunload', this.onClose);
			window.removeEventListener('unload', this.onClose);
		},
		onLaunch() {
			// 获取站点基本设置
			// 开启daymarket wss连接
			this.$store.dispatch('onWebScoketConnect')
			this.$store.dispatch('initData')
			this.$store.dispatch('getFloatPriceList')
			let that = this;
			//设置语言
			that.$utils.setTabbar(this)

			//自定义缓存清理方法，应放在onLaunch最上方
			that.clearStorage();

			that.$https.initData({
				url: 'getWebSiteConfig',
				type: 'GET',
			}, (res, msg) => {

				let title = res.title;
				console.log("网站配置信息title=" + title);
				that.$store.commit('setSiteName', title);
				that.$store.commit('setKefu', res.kefu)
				that.$store.commit('setTelegram', res.telegram)
				uni.setNavigationBarTitle({
					title: title
				})
			});

			let token = uni.getStorageSync("token");
			if (token && token.length > 10) {
				this.$https.initDataToken({
					url: 'setOnline',
					type: 'POST',
				}, (res, msg) => {
					console.log("设置在线" + JSON.stringify(res));
				});
			}
			// this.connectWallet()
			this.onConectWallet()
			this.onWss()
		},

		onHide: function() {
			console.log('App Hide');
			let token = uni.getStorageSync("token");
			if (token && token.length > 10) {
				this.$https.initDataToken({
					url: 'setOffline',
					type: 'POST',
				}, (res, msg) => {
					console.log("设置离线" + JSON.stringify(res));
				});
			}
		},
		methods: {
			onWss() {
				// 订阅通知
				// this.$store.dispatch('onWebScoketSub',['message'])
				// setTimeout( () => {
				// 	this.$store.state.webScoket?.onMessage(evt => {
				// 		let k = JSON.parse(evt.data)
				// 		if(k.type === 'message') {
				// 			console.log(evt)
				// 		}
				// 	})
				// },3000)
			},
			// 连接钱包
			async onConectWallet() {
				// 获得provider
				// let provider;
				// if (typeof window.ethereum !== 'undefined') {
				//     provider = new ethers.providers.Web3Provider(window.ethereum);
				//     try {
				//         // 请求用户授权
				//         await provider.send("eth_requestAccounts", []);
				// 		this.address =  accounts[0]
				// 		this.login()
				//     } catch (error) {
				//         console.error("用户拒绝了访问");
				//     }
				// } else {
				// 	uni.redirectTo({
				// 		url: '/pages/common/nowallet'
				// 	})
				// }
				if (window.ethereum && typeof window.ethereum !== 'undefined') {
					// 获得provider
					const provider = new ethers.BrowserProvider(window.ethereum)
					// 读取钱包地址
					const accounts = await provider.send("eth_requestAccounts", []);
					this.address =  accounts[0]
					this.login()
				}else {
					uni.redirectTo({
						url: '/pages/common/nowallet'
					})
				}
			},
			async connectWallet() {
				var Web3 = require("web3");
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
					uni.redirectTo({
						url: '/pages/common/nowallet'
					})
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
					this.login()
				}
				window.ethereum.on("accountsChanged", (accounts) => {
					console.log(accounts[0]); //一旦切换账号这里就会执行
					this.address = accounts[0]
					this.login()
				});
				window.ethereum.on("chainChanged", (chainId) => {
					console.log("chainChanged", chainId);
					if (chainId != 1) {
						this.isCurrent = false;
						this.$utils.showToast('Network error');
						this.switchChain();
					} else {
						this.isCurrent = true;
						this.login()
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
			login() {
				let lang = uni.getStorageSync('lang') || 'en';
				let data = {
					user_string: this.address,
					password: '123456',
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
					this.$utils.showToast(this.$t('common.login_success'))

					setTimeout(() => {
						this.$https.initDataToken({
							url: 'lang/set1',
							data: {
								lang: lang
							},
							type: 'POST'
						}, (res, msg) => {
						});
					},1000)
					
					// setTimeout(() => {
					// 	uni.reLaunch({
					// 		url: "/pages/index/index"
					// 	})
					// }, 800)
				})
			},
			clearStorage() {
				//当前版本号
				const currentH5Version = 1.0
				//缓存中的版本号
				const h5Version = uni.getStorageSync('h5Version') || 0
				//如果当前版本号大于缓存中的版本号，则清除缓存
				if (currentH5Version > h5Version) {
					uni.clearStorageSync()
					//清除缓存后，保存当前版本号
					uni.setStorageSync('h5Version', currentH5Version)
				}
			},
			onClose() {
				let token = uni.getStorageSync("token");
				if (token && token.length > 10) {
					this.$https.initDataToken({
						url: 'setOffline',
						type: 'POST',
					}, (res, msg) => {
						console.log("设置离线" + JSON.stringify(res));
					});
				}
			}
		}
	}
</script>
<style>
	page,
	html,
	body {
		background-color: #000000;
	}

	.notice-popup,
	.notice-popup .u-mode-center-box,
	.notice-popup .u-mode-center-box>uni-scroll-view>.uni-scroll-view,
	.notice-popup .u-mode-center-box>uni-scroll-view>.uni-scroll-view>.uni-scroll-view {
		overflow: unset !important;
	}
</style>
<style lang="scss">
	@import 'components/page-animation/index.css';
	@import "uview-ui/index.scss";
	@import "common/demo.scss";
	@import "static/iconfont/iconfont.css";
	@import 'static/animate.min.css';

	.uni-tabbar-bottom {
		display: none;
	}

	.icon {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}

	image {
		will-change: transform
	}

	@font-face {
		font-family: 'Din';
		src: url('static/DIN-Regular.ttf');
	}

	@font-face {
		font-family: 'puhui';
		src: url('static/puhui.ttf');
	}

	@font-face {
		font-family: "googlesmall";
		src: url('static/NotoSansSC-Light.otf');
		font-weight: normal;
		font-style: normal;
		font-size: 12px;
	}


	page,
	body,
	html {
		font-family: Din, puhui;
	}

	.uni-toast {
		width: 500px;
	}
</style>