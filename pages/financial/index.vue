<template>
	<view style="background: #000000;">
		<l-common-navbar :isCustomBack="true" @back="onBack" />

		<view style="display: flex;height: 220rpx;">
			<view style="display: flex;flex-direction: column;flex: 1;margin: 20rpx;">
				<text style="color: #ffffff;font-weight: 700;font-size: 40rpx;">{{$t("earn")}}</text>
				<text style="color: #939393;font-size: 13px;margin-top: 10rpx;">{{$t("earn1")}}</text>
				<text @click="goDesc"
					style="color: #1FA2FF;font-size: 13px;margin-top: 20rpx;">{{$t("earn2")}}</text>
			</view>
			<view>
				<image src="/static/ucoin/image_finances_save_coin.png" style="width: 220rpx;height: 200rpx;"></image>
			</view>
		</view>

		<view class="m-20" style="background: #000000;" v-if="currentTab == 0">
			<view
				style="background:#242424;background-size:100% 100%;background-repeat: no-repeat;border-radius: 8px;border:1px solid #666;">

				<view class="d-grid-columns-3 pt-24 mb-24 mx-0" style="height: 82px;padding: 15px;">

					<view class="text-left">
						<text class="d-block font-size-22 mt-8 text-black">
							<span style="color: #ffffff;font-weight: 700;font-size: 14px;opacity: 1;">{{lockAllMoney}}</span>
						</text>
						<text class="d-block font-size-22 mt-12 text-black">
							<span
								style="color: #939393;font-weight:500;font-size: 12px;opacity: 1;">{{$t("total_Investment")}}</span>
						</text>
						<text class="d-block font-size-22 mt-4 text-black">
							<span style="color: #939393;font-weight:500;font-size: 12px;opacity: 1;">(USDT)</span>
						</text>
					</view>

					<view class="text-center ">
						<text class="d-block font-size-22 mt-8 text-black">
							<span style="color: #ffffff;font-weight: 700;font-size: 14px;opacity: 1;">{{ yesterdayShouyi }}</span>
						</text>
						<text class="d-block font-size-22 mt-12 text-black">
							<span
								style="color: #939393;font-weight:500;font-size: 12px;opacity: 1;">{{$t("yesterday_Earnings")}}</span>
						</text>
						<text class="d-block font-size-22 mt-4 text-black">
							<span style="color: #939393;font-weight:500;font-size: 12px;opacity: 1;">(USDT)</span>
						</text>
					</view>

					<view class="text-right">
						<text class="d-block font-size-22 mt-8 text-black">
							<span style="color: #ffffff;font-weight: 700;font-size: 14px;opacity: 1;">{{allShouyi}}</span>
						</text>
						<text class="d-block font-size-22 mt-12 text-black">
							<span
								style="color: #939393;font-weight:500;font-size: 12px;opacity: 1;">{{$t("total_Earnings")}}</span>
						</text>
						<text class="d-block font-size-22 mt-4 text-black">
							<span style="color: #939393;font-weight:500;font-size: 12px;opacity: 1;">(USDT)</span>
						</text>
					</view>
				</view>
			</view>
		</view>
		<view
		class="d-flex align-items-center justify-content-between"
			style="background: #000000;padding-bottom: 8px;padding-left: 30rpx;box-sizing: border-box;">
			<view class="d-flex align-items-center">
				<view style="font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;" @click="changeTab(0)">
					<span :class="currentTab==0 ?'activeTab':'normalTab' ">{{$t('home.lockming')}}</span>
				
					<view v-if="currentTab==0" style="height: 2px;margin-top: 4px;" class="connect_btn"></view>
				</view>
				<!-- <view style="font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;" :style="{marginLeft:mx+'px'}"
					@click="changeTab(1)">
					<span :class="currentTab==1 ?'activeTab':'normalTab' ">{{$t('leftmenu.loan')}}</span>
					<view v-if="currentTab==1" style="height: 2px;margin-top: 4px;" class="connect_btn"></view>
				</view> -->
			</view>
			<view class="mr-20">
				<navigator v-if="currentTab == 0" url="/pages/lockming/order">
					<image src="/static/icon_to_all.png" style="width: 52rpx; height: 52rpx;"></image>
				</navigator>
				<navigator v-if="currentTab == 1" url="/pages/loanRecords/loanRecords">
					<image src="/static/icon_to_all.png" style="width: 52rpx; height: 52rpx;"></image>
				</navigator>
			</view>
		</view>
		<view v-if="currentTab == 0" style="background: #000000;padding-bottom: 100px;">
			<view class="m-30">
				<view class="p-30  border-radius-20 mb-20" style="background: #242424;" v-for="item in list">
					<view class="d-flex-between-center">
						<text class="font-size-32 font-weight-bold" style="color: #ffffff;">{{item.title}}</text>
						<text class="font-size-28 px-20 connect_btn" style="border-radius: 10rpx;color: #000000;"
							@click="jump(item)">{{i18n.lockedPositions}}</text>
					</view>
					<view class="d-grid-columns-3 mt-30">
						<view class="">
							<text class="d-block font-size-28 opacity-50"
								style="color: #ffffff;">{{i18n.minimumSingleTransaction}}</text>
							<text class="d-block font-size-28 mt-10 font-weight-bold"
								style="color: #ffffff;">{{parseFloat(item.min_money)}}</text>
						</view>
						<view class="">
							<text class="d-block font-size-28 opacity-50"
								style="color: #ffffff;">{{i18n.dailyYield}}</text>
							<text class="d-block font-size-28 mt-10 font-weight-bold">
								<text v-if="item.intro" style="color: #ffffff;">{{item.intro}}</text>
								<text v-else style="color: #ffffff;">{{parseFloat(item.rate_max)}}%</text>
							</text>
						</view>
						<view class="">
							<text class="d-block font-size-28 opacity-50"
								style="color: #ffffff;">{{i18n.lockUpPeriod}}</text>
							<text class="d-block font-size-28 mt-10 font-weight-bold"
								style="color: #ffffff;">{{item.day}}({{i18n.day}})</text>
						</view>
					</view>
				</view>
				<view style="margin-top: 200rpx;" v-if="list.length === 0">
					<default-page ></default-page>
				</view>
			</view>
		</view>
		<!-- <view v-if="currentTab == 1" style="background: #000000;padding-bottom: 100px">
			<view class="m-30">
				<view class="p-30 box-shadow border-radius-20 mb-20 text-white" style="background: #242424;"
					v-for="item in ieoList">
					<text class="d-block font-size-30" style="color: #ffffff;">{{item.title}}</text>
					<view class="d-flex-between-center mt-20">
						<view class="d-flex align-items-baseline">
							<text class="opacity-50 font-size-24"
								style="color: #ffffff;">{{$t("ieo.lockPeriod")}}:</text>
							<text class="font-weight-bold font-weight-bold ml-12"
								style="color: #ffffff;">{{item.day + i18n.day}}</text>
						</view>
						<text class="tag tag-success" v-if="item.time_status === 2">{{$t("ieo.ing")}}</text>
						<text class="tag tag-error" v-else-if="item.time_status === 3">{{$t("ieo.done")}}</text>
					</view>
					<view class="d-grid-columns-2 mt-20">
						<view class="d-flex align-items-baseline">
							<text class="opacity-50 font-size-24"
								style="color: #ffffff;">{{$t("ieo.subscribed")}}({{item.currency_name}}):</text>
							<text class="font-weight-bold font-weight-bold ml-12"
								style="color: #ffffff;">{{parseFloat(item.total_sell)}}</text>
						</view>
						<view class="d-flex align-items-baseline">
							<text class="opacity-50 font-size-24"
								style="color: #ffffff;">{{$t("ieo.total")}}({{item.currency_name}}):</text>
							<text class="font-weight-bold font-weight-bold ml-12"
								style="color: #ffffff;">{{parseFloat(item.amount)}}</text>
						</view>
					</view>
					<view class="d-grid align-items-baseline" style="grid-template-columns:2fr 1fr">
						<u-line-progress :show-percent="false" :percent="Number(item.percentage)" class="mt-20"
							v-if="item.percentage > 0"></u-line-progress>
						<u-line-progress :show-percent="false" :percent="0" class="mt-20" v-else></u-line-progress>
						<view class="d-flex align-items-baseline justify-content-end">
							<text class="opacity-50 font-size-24"
								style="color: #ffffff;">{{$t("ieo.remaining")}}:</text>
							<text class="font-weight-bold font-weight-bold ml-12"
								style="color: #ffffff;">{{parseFloat(item.percentage)}}%</text>
						</view>
					</view>
					<button class="warning-button mt-20 font-size-24 py-0 connect_btn" v-if="item.time_status === 2"
						style="color: #000000;"
						@click="$utils.jump('/pages/ieo/subscribe?project_id=' + item.id)">{{$t("ieo.applySubscription")}}</button>
				</view>
				<view style="margin-top: 200rpx;" v-if="ieoList.length === 0">
					<default-page ></default-page>
				</view>
			</view>
		</view> -->
		<!-- <view v-if="currentTab == 1" style="background: #000000;padding-bottom: 100px">
			<LoanForm />
		</view> -->
	</view>
</template>

<script>
	import AssetsFunding from "../assets/AssetsFunding";
	import AssetsFutures from "../assets/AssetsFutures";
	import AssetsSpot from "../assets/AssetsSpot";
	import AssetsOptions from "../assets/AssetsOptions";
	import AssetsEarn from "../assets/AssetsEarn";
	import Invite from "../invite/invite.vue";
	import LoanForm from './components/LoanForm/index.vue'
	
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				page: 1,
				limit: 10,
				ieoList: [],
				list: [],
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
				financialBalance: 0,
				mx: 13,
				articleId: '',
				
				orderCnt: 0,
				lock_shouyi: '0.00',
				lockAllMoney: '0.00',
				todyShouyi: '0.00',
				yesterdayShouyi: '0.00',
				allShouyi: '0.00',
			};
		},
		components: {
			Invite,
			AssetsFunding,
			AssetsFutures,
			AssetsSpot,
			AssetsOptions,
			AssetsEarn,
			LoanForm
		},
		onLoad() {
			const _this = this
			// uni.setNavigationBarTitle({
			//   title: _this.$t("nav")[4]
			// });


			const lang = uni.getStorageSync('lang') || 'en';

			if (lang == "zh") {
				this.mx = 28;
			} else {
				this.mx = 14;
			}
			this.getLockmingProductList();
			this.getIEOProject();
			this.getNewsListData()
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

			let type = uni.getStorageSync('financial_type') || 0
			this.currentTab = type
			uni.setStorageSync('financial_type', 0)

			this.page = 1;
			let token = uni.getStorageSync("token");
			if (token == null || token.length < 10) {
				uni.redirectTo({
					url: '/pages/common/login'
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

				//this.$utils.setTabbar(this)
				//uni.showTabBar()
				//this.getWalletList();
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
			if(this.token) {
				this.getBigData()
			}
		},
		methods: {
			goDesc() {
				this.$utils.jump(`/pages/common/article?id=${this.articleId}&isSwitchTab=1&backUrl=/pages/financial/index` )
			},
			onBack() {
				uni.redirectTo({
					url: '/pages/setting/left_menu'
				})
			},
			getBigData() {
				let that = this;
				that.$https.initDataToken({
					url: 'lock_mining/bigData',
					type: 'GET'
				}, (res, msg) => {
					that.orderCnt = res.orderCnt;
					that.lock_shouyi = res.lock_shouyi;
					that.lockAllMoney = res.lockAllMoney;
					that.allShouyi = res.allShouyi;
					that.todyShouyi = res.todyShouyi;
					that.yesterdayShouyi = res.yesterdayShouyi
				})
			},
			// 获取存币生息文章
			getNewsListData() {
				let data = {
					c_id: 26,
					page: 1,
					lang: this.$store.state.lang || 'en'
				};
				this.$https.initData({
					url: 'news/list',
					data,
					type: 'POST'
				}, (res, msg) => {
					const list = res.list
					if (list.length > 0) {
						this.articleId = list[0].id
					}
				})
			},
			getIEOProject() {

				const data = {
					page: this.page,
					limit: this.limit
				};
				this.$https.initData({
					url: 'project',
					data,
					type: 'GET'
				}, (res, msg) => {

					const ieoList = res.list
					if (ieoList.length) {
						this.ieoList = ieoList;
						//this.page++
					} else {
						this.canGet = false
					}
				})
			},
			jump(item) {
				uni.setStorageSync('lockming', item)
				uni.navigateTo({
					url: '/pages/lockming/buy?id=' + item.id
				})
			},
			getLockmingProductList() {
				let that = this;
				that.$https.initDataToken({
					url: 'lockorder/getorder',
					type: 'GET'
				}, (res, msg) => {
					that.list = res;
				})
			},

			changeTab(val) {
				this.currentTab = val;

			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.current = index
				this.setShowList()
			},
			getWalletList() {

				let data = {
					lang: uni.getStorageSync("lang") || "en"
				};
				this.$https.initDataToken({
					url: 'uc/v2/asset/bigData',
					type: 'GET',
					data
				}, (res, msg) => {

					let result = res.data;
					let data = result.data;

					this.change_walletUSDT = data.spotBalance;
					this.lever_walletUSDT = data.swapBalance;
					this.micro_walletUSDT = 0;

					this.financialBalance = data.financialBalance;

					//let allUsdt=Number(res.allUsdt).toFixed(2);
					//this.allUsdt = allUsdt;


					this.change_walletUSDT = Number(this.change_walletUSDT).toFixed(2);
					this.lever_walletUSDT = Number(this.lever_walletUSDT).toFixed(2);
					this.legal_walletUSDT = Number(this.legal_walletUSDT).toFixed(2);


					this.micro_walletUSDT = Number(this.micro_walletUSDT).toFixed(2);

					this.financialBalance = Number(this.financialBalance).toFixed(2);





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
			...mapState(['token']),
			i18n() {
				return this.$t("lockming")
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
		background-position: 606rpx;
	}

	.dealer {
		position: absolute;
		top: 26rpx;
		right: 0;
		color: #2A64FB;
		border-radius: 31rpx 0 0 31rpx;
		background-image: linear-gradient(to right, #ffffff, #ffffff, #ffffff);
		padding: 14rpx 44rpx;
		display: flex;
		align-items: center;
	}

	.activeTab {
		color: #ffffff;
		width: 30px;
		border-width: 12px;
		padding-bottom: 8px;
		font-weight: 700;


	}

	.normalTab {
		width: 30px;
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
</style>