<template>
	<view style="background: #000000;">
		<l-common-navbar :title="i18n.authentication" :isCustomBack="true" @back="backFn" />
		<view class="status_bar" style="background: #000000;height:10px;"></view>
		<view>
			<swiper style="height:60px;margin-left: 10px;" :acceleration="true" :display-multiple-items="5"
				:indicator-dots="false" indicator-color="rgba(255, 255, 255, 0.6)"
				indicator-active-color="rgba(7, 193, 96, 0.7)" :autoplay="false" :circular="false">
				<swiper-item v-for="(item,index) in tabList" class="swiper-item8">
					<view class="text-left text-white" style="margin-top:30rpx;background: #000000;white-space: nowrap;"
						@click="changeTab(item.id)">
						<view style="display: flex;" :class=" currentTab == item.id ? 'activeTab':'normalTab' ">
							<text class="font-size-28 d-block" v-if="lang=='zh' "
								style="height: 20px;line-height: 20px;font-weight: 700;text-align: center;width: 400px;flex:1;">
								{{ item.name}}
							</text>

							<text class="font-size-30 d-block" v-else
								style="flex:1;height: 20px;line-height: 20px;font-weight: 700;text-align: center;">
								{{ item.name}}
							</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="m-20" style="background: #000000;" v-if="currentTab == 0">
			<view
				style="background: #c0dd2b;background-size:100% 100%;background-repeat: no-repeat;border-radius: 10px;">
				<view class="d-flex align-items-center" style="padding: 10px;margin-left: 10px;">
					<text class="d-block font-size-24 mr-10"
						style="color: #000;margin-top: -6px;flex: 1;">{{ i18n.convert }}</text>
					<view class="iconfont  font-size-36"
						style="background: #ffffff;border-radius: 12px;display: flex;flex-direction: row;padding: 5px;">
						<image src="/static/icon_asset_analysis.png" style="width: 16px;height: 16px;margin-left: 5px;">
						</image>
						<view
							style="color: #000000;font-size: 12px;margin-left: 5px;margin-right: 3px;line-height: 16px;">
							{{$t('asset_analysis')}}</view>
					</view>
				</view>
				<view style="margin-top:-5px;margin-left: 20px;">
					<view class="d-flex align-items-baseline">
						<text class="font-size-40 mr-20 font-weight-bold" style="color: #000;">{{allUsdt}}</text>
						<text class="font-size-22" style="color: #000;font-weight: 700">USDT</text>
					</view>
				</view>
				<view class="d-block font-size-22 mt-8" style="color: #ffffff;margin-left: 20px;display: flex;">
					<view style="color: #000;line-height: 20px;">{{$t('today_pnl')}}</view>
					<view style="color:#01c698;line-height: 20px;margin-left: 3px;">{{todayProfitLoss}}</view>
				</view>
				<view class="d-grid-columns-5 pt-38 mb-40 mx-0" style="height: 86px;">
					<view class="text-center " v-for="(item,index) in subNav" @click="$utils.jump(item.url)">
						<image :src="item.icon" style="width:46rpx;height: 46rpx;"></image>

						<text class="d-block font-size-22 mt-12 text-black">
							<span
								style="color: #000;font-weight: 700;font-size: 12px;opacity: 1;">{{ item.name }}</span>
						</text>
					</view>
				</view>
			</view>

		</view>
		<view style="background: #000000;border-top: 6px solid #121212;padding-bottom: 100px;" v-if="currentTab == 0">

			<view class="p-20">

				<view class="p-20 text-white" style="display: flex;justify-content: space-between;">
					<view style="display: flex;display: flex;flex-direction: column;">
						<view
							style="color: #ffffff;line-height: 30px;height: 30px;font-weight: 700;font-size:18px;text-align: left;">
							{{$t('my_account')}}
						</view>

					</view>
					<view style="display: flex;justify-content: center;">
					</view>
				</view>
				<view class="p-20 text-white"
					style="display: flex;justify-content: space-between;border-bottom: 1px solid #181818;margin-top: -10px;">
					<view style="display: flex;display: flex;flex-direction: column;">
						<view
							style="color: #939393;line-height: 30px;height: 30px;font-weight: 500;font-size: 15px;text-align: left;">
							{{$t('assets.fundingAccount')}}
						</view>
						<view
							style="color: #ffffff;font-weight: 700;font-size: 15px;height: 30px;margin-top: 5px;text-align: left;">
							{{legal_walletUSDT}} USDT</view>
					</view>
					<view style="display: flex;justify-content: center;" @click="changeTab(1)">
						<view
							style="color: #ffffff;font-weight: 700;font-size: 15px;height: 30px;margin-top: 5px;justify-content: center;align-items: center;vertical-align: center;margin-top: 20px;">
							<image src="/static/icon_arrow_right_white_16.png"
								style="width: 16px;height: 16px;margin-left: 5px;"></image>
						</view>

					</view>
				</view>

				<view class="p-20 text-white"
					style="display: flex;justify-content: space-between;border-bottom: 1px solid #181818;">
					<view style="display: flex;display: flex;flex-direction: column;">
						<view
							style="color: #939393;line-height: 30px;height: 30px;font-weight: 500;font-size: 15px;text-align: left;">
							{{$t('assets.spotAccount')}}
						</view>
						<view
							style="color: #ffffff;font-weight: 700;font-size: 15px;height: 30px;margin-top: 5px;text-align: left;">
							{{change_walletUSDT}} USDT</view>
					</view>
					<view style="display: flex;justify-content: center;" @click="changeTab(2)">
						<view
							style="color: #ffffff;font-weight: 700;font-size: 15px;height: 30px;margin-top: 5px;justify-content: center;align-items: center;vertical-align: center;margin-top: 20px;">
							<image src="/static/icon_arrow_right_white_16.png"
								style="width: 16px;height: 16px;margin-left: 5px;"></image>
						</view>

					</view>
				</view>

				<view class="p-20 text-white"
					style="display: flex;justify-content: space-between;border-bottom: 1px solid #181818;">
					<view style="display: flex;flex-direction: column;">
						<view
							style="color: #939393;line-height: 30px;height: 30px;font-weight: 500;font-size: 15px;text-align: left;">
							{{$t('assets.futuresAccount')}}
						</view>
						<view
							style="color: #ffffff;font-weight: 700;font-size: 15px;height: 30px;margin-top: 5px;text-align: left;">
							{{lever_walletUSDT}} USDT</view>
					</view>
					<view style="display: flex;justify-content: center;" @click="changeTab(3)">
						<view
							style="color: #ffffff;font-weight: 700;font-size: 15px;height: 30px;margin-top: 5px;justify-content: center;align-items: center;vertical-align: center;margin-top: 20px;">
							<image src="/static/icon_arrow_right_white_16.png"
								style="width: 16px;height: 16px;margin-left: 5px;"></image>
						</view>

					</view>
				</view>

				<view class="p-20 text-white"
					style="display: flex;justify-content: space-between;border-bottom: 1px solid #181818;">
					<view style="display: flex;flex-direction: column;">

						<view
							style="color: #939393;line-height: 30px;height: 30px;font-weight: 500;font-size: 15px;text-align: left;">
							{{$t('assets.optionsAccount')}}
						</view>
						<view
							style="color: #ffffff;font-weight: 700;font-size: 15px;height: 30px;margin-top: 5px;text-align: left;">
							{{micro_walletUSDT}} USDT</view>
					</view>
					<view style="display: flex;justify-content: center;" @click="changeTab(4)">
						<view
							style="color: #ffffff;font-weight: 700;font-size: 15px;height: 30px;margin-top: 5px;justify-content: center;align-items: center;vertical-align: center;margin-top: 20px;">
							<image src="/static/icon_arrow_right_white_16.png"
								style="width: 16px;height: 16px;margin-left: 5px;"></image>
						</view>

					</view>
				</view>


				<view class="p-20 text-white"
					style="display: flex;justify-content: space-between;border-bottom: 1px solid #181818;">
					<view style="display: flex;flex-direction: column;">

						<view
							style="color: #939393;line-height: 32px;height: 32px;font-weight: 500;font-size: 15px;text-align: left;">
							{{$t('assets.earnAccount')}}
						</view>
						<view
							style="color: #ffffff;font-weight: 700;font-size: 15px;height: 30px;margin-top: 5px;text-align: left;">
							{{earn_walletUSDT}} USDT</view>
					</view>
					<view style="display: flex;justify-content: center;" @click="changeTab(5)">
						<view
							style="color: #ffffff;font-weight: 700;font-size: 15px;height: 30px;margin-top: 5px;justify-content: center;align-items: center;vertical-align: center;margin-top: 20px;">
							<image src="/static/icon_arrow_right_white_16.png"
								style="width: 16px;height: 16px;margin-left: 5px;"></image>
						</view>

					</view>
				</view>
			</view>
		</view>
		<view v-if="currentTab == 1" style="background: #000000;">
			<AssetsFunding :key="key" :profitLoss="fundProfitLoss"></AssetsFunding>
		</view>
		<view v-if="currentTab == 2" style="background: #000000;">
			<AssetsSpot :key="key" :profitLoss="changeProfitLoss"></AssetsSpot>
		</view>
		<view v-if="currentTab == 3" style="background: #000000;">
			<AssetsFutures :key="key" :profitLoss="leverProfitLoss"></AssetsFutures>
		</view>
		<view v-if="currentTab == 4" style="background: #000000;">
			<AssetsOptions :key="key" :profitLoss="microProfitLoss"></AssetsOptions>
		</view>
		<view v-if="currentTab == 5" style="background: #000000;">
			<AssetsEarn :key="key" :profitLoss="earnProfitLoss"></AssetsEarn>
		</view>
	</view>
</template>

<script>
	import AssetsFunding from "../assets/AssetsFunding";
	import AssetsFutures from "../assets/AssetsFutures";
	import AssetsSpot from "../assets/AssetsSpot";
	import AssetsOptions from "../assets/AssetsOptions";
	import AssetsEarn from "../assets/AssetsEarn";
	import Invite from "../invite/invite.vue";
	export default {
		data() {
			return {
				lang: '',
				tabList: [{
						name: this.$t('assets.overview'),
						id: 0
					},
					{
						name: this.$t('assets.funding'),
						id: 1
					},
					{
						name: this.$t('assets.spot'),
						id: 2
					},
					{
						name: this.$t('assets.futures'),
						id: 3
					},
					{
						name: this.$t('assets.options'),
						id: 4
					},
					{
						name: this.$t('assets.earn'),
						id: 5
					},
				],
				todayProfitLoss: 0.00,
				fundProfitLoss: 0.00,
				changeProfitLoss: 0.00,
				leverProfitLoss: 0.00,
				microProfitLoss: 0.00,
				earnProfitLoss: 0.00,
				allUsdt: 0,
				earn_walletUSDT: 0,
				legal_walletUSDT: 0,
				currentTab: 0,
				// 0:change,1:lever,2:legal,3:micro
				current: 0,
				convert: 0,
				showList: [],
				originalList: {},
				currentAssetsType: {},
				showNav: true,
				change_walletUSDT: 0,
				lever_walletUSDT: 0,
				micro_walletUSDT: 0,

				// overviewLen:0,
				// fundingLen:0,
				// spotLen:0,
				// futuresLen:0,
				// optionsLen:0,
				// earnLen:0,
				mx: 13,
				key: 0
			};
		},
		components: {
			Invite,
			AssetsFunding,
			AssetsFutures,
			AssetsSpot,
			AssetsOptions,
			AssetsEarn
		},
		onLoad() {
			const _this = this
			// uni.setNavigationBarTitle({
			//   title: _this.$t("nav")[4]
			// });


			const lang = uni.getStorageSync('lang') || 'en';
			this.lang = lang;

			if (lang == "zh") {
				this.mx = 28;
			} else {
				this.mx = 14;
			}
			let token = uni.getStorageSync("token");
			if (token != null && token.length > 10) {
				this.todayProfitLossFn();
			}

		},
		mounted() {
			const lang = uni.getStorageSync('lang') || 'en';

			if (lang == "zh") {
				this.mx = 28;
			} else {
				this.mx = 14;
			}
		},
		onShow() {
			this.key++
			let token = uni.getStorageSync("token");
			if (token == null || token.length < 10) {
				uni.redirectTo({
					url: '/pages/setting/left_menu'
				})
			} else {
				const i18n = this.$t("fund")
				this.nav = [{
						name: i18n.exchange
					}, {
						name: i18n.leverage
					},
					// {
					// 	name: i18n.fiat
					// }, {
					// 	name: i18n.second
					// }

				]
				this.showNav = false
				setTimeout(() => {
					this.showNav = true
				}, 100)

				this.$utils.setTabbar(this)
				//uni.showTabBar()
				this.getWalletList();
				const lang = uni.getStorageSync('lang') || 'en';

				if (lang === "zh") {
					this.mx = 28;
				} else {
					this.mx = 14;
				}

				//
				let token = uni.getStorageSync("token");
				if (token && token.length > 10) {
					this.$https.initDataToken({
						url: 'setOnline',
						type: 'POST',
					}, (res, msg) => {
						console.log("设置在线" + JSON.stringify(res));
					});
				}
			}
		},
		methods: {
			backFn() {
				uni.redirectTo({
					url: '/pages/setting/left_menu'
				})
			},
			todayProfitLossFn() {
				let that = this;
				that.$https.initDataToken({
					url: 'todayProfitLoss',
					type: 'GET'

				}, (res, msg) => {
					console.log("今日盈亏==>" + JSON.stringify(res));
					// that.todayProfitLoss=Number(res.p).toFixed(2);

				});

			},
			changeTab(val) {
				this.currentTab = val;
				this.setShowList()
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.current = index
				this.setShowList()
			},
			getWalletList() {
				//wallet/list
				//this.$u.api.wallet.getWalletList().then(res => {
				let data = {
					lang: uni.getStorageSync("lang") || "en"
				};
				this.$https.initDataToken({
					url: 'walletList2024',
					type: 'GET',
					data
				}, (res, msg) => {
					let allUsdt = Number(res.allUsdt).toFixed(2);
					this.allUsdt = allUsdt;
					this.change_walletUSDT = Number(res.change_balance).toFixed(2);
					this.lever_walletUSDT = Number(res.lever_balance).toFixed(2);
					this.legal_walletUSDT = Number(res.legal_balance).toFixed(2);
					this.micro_walletUSDT = Number(res.micro_balance).toFixed(2);
					this.earn_walletUSDT = Number(res.earn_balance).toFixed(2);
					this.todayProfitLoss = Number(res.total_profit_loss).toFixed(2)
					this.fundProfitLoss = Number(res.fund_profit_loss).toFixed(2)
					this.changeProfitLoss = Number(res.change_profit_loss).toFixed(2)
					this.leverProfitLoss = Number(res.lever_profit_loss).toFixed(2)
					this.microProfitLoss = Number(res.micro_profit_loss).toFixed(2)
					this.earnProfitLoss = Number(res.earn_profit_loss).toFixed(2)
					//this.setShowList()
				})
			},
			setShowList() {
				switch (this.current) {
					case 0:
						this.showList = this.originalList.change_wallet.balance;
						this.currentAssetsType = this.$store.state.assetsType[1];
						break;
					case 1:
						this.showList = this.originalList.lever_wallet.balance;
						this.currentAssetsType = this.$store.state.assetsType[2];
						break;
					case 2:
						this.showList = this.originalList.legal_wallet.balance;
						this.currentAssetsType = this.$store.state.assetsType[0];
						break;
					case 3:
						this.showList = this.originalList.micro_wallet.balance;
						this.currentAssetsType = this.$store.state.assetsType[3];
						break;
				}
			}
		},
		computed: {
			i18n() {
				return this.$t("fund")
			},
			subNav() {
				const i18n = this.$t("fund")
				return [{
						name: i18n.receive,
						icon: require('static/bib/icon_charge.png'),

						url: '/pages/fund/select?url=receive'
					}, {
						name: i18n.withdraw,
						icon: require('static/image/icon/icon_mention.png'),
						url: '/pages/fund/withdraw'
					},
					{
						name: i18n.transfer,
						icon: require('static/image/icon/icon_overturn.png'),
						url: '/pages/fund/transfer2'
					},
					{
						name: this.$t("leftmenu.convert"),
						icon: require('static/image/icon/icon_flash.png'),
						url: '/pages/tx/flashexchange'
					},
					{
						name: i18n.record,
						icon: require('static/image/icon/icon_bill.png'),
						url: '/pages/fund/assets_all_record'
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,
	body,
	html {
		background: #000000;
	}

	.nav {
		background: url(../../static/image/icon/nav-shadow.png), #ff0000;
		background-size: auto 100%;
		background-position: 606 rpx;
	}

	.dealer {
		position: absolute;
		top: 26 rpx;
		right: 0;
		color: #2A64FB;
		border-radius: 31 rpx 0 0 31 rpx;
		background-image: linear-gradient(to right, #ffffff, #ffffff, #ffffff);
		padding: 14 rpx 44 rpx;
		display: flex;
		align-items: center;
	}

	.activeTab {
		color: #ffffff;
		width: 50px;
		border-width: 12px;
		padding-bottom: 8px;
		font-weight: 700;

	}

	.normalTab {
		width: 50px;
		border-width: 12px;
		padding-bottom: 8px;
		color: #939393;
		font-weight: 700;
	}

	menuBg {
		background: url('https://admin.coinbmex.com/image_asset_top_bg_219.png');
		background-size: contain;
		background-position: center 30vh;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}
</style>