<template>
	<view class="text-white">
		<l-common-navbar :title="$t('setting.wallet')" />
		<view class="mx-30">
			<button class="add-new-account-btn" @click="$utils.navigateTo('/pages/setting/addWallet')"
				style="background: #2A64FD;color: #ffffff;">
				<text class="iconfont icon-jia1 mr-20"></text>
				<text>{{$t("setting.addNewAccount")}}</text>
			</button>

			<view class="list">
				<!-- <view class="d-flex opacity-50">
					<text class="font-size-32">{{$t("common.edit")}}</text>
					<text class="font-size-32 ml-30">{{$t("common.delete") | removeSpace}}</text>
				</view> -->
				<block v-if="list.length">
					<view class="item" v-for="item in list" :key="item.id">
						<view class="d-flex align-items-center">
							<image :src="item.upload_pic | retImageUrl" class="image"></image>
							<view style="flex: 1;width: 500rpx;">
								<text class="font-size-32 font-weight-bold d-block"
									style="color: #000;">{{$t('fund.coinType')}}: {{item.coin}}

								</text>

								<text class="font-size-28 text-error font-weight-bold d-block mt-8"
									style="word-wrap:break-word;color: #000;">
									{{$t('fund.address')}}:{{item.address}}</text>
							</view>
						</view>
						<view class="d-flex-between-center pt-20 mt-20 u-border-top">
							<view class="d-flex w-50 justify-content-center" @click="onEdit(item)">
								<view class="font-size-28" style="color: #2A64FD;">{{$t("common.edit")}}</view>
							</view>
							<view class="d-flex w-50 justify-content-center" @click="onDel(item)">
								<view class="font-size-28" style="color: #f66f6a;">{{$t("common.delete")}}</view>
							</view>
						</view>
					</view>
				</block>
				<default-page v-else></default-page>
			</view>
		</view>

		<!-- <u-popup v-model="showFilter"  mode="right" length="86%" border-radius="0" :title="$t('common.filter')">
			<view class="mx-30 popup-filter">
				<view class="">
					<text class="d-block font-size-28 mb-20">币种选择</text>
					<view class="d-flex flex-wrap">
						<text class="item" :class="currentCurrency == 0 ? 'active' : ''" @click="selectCurrencyFunc({id:0,name:'全部'})">全部</text>
						<text class="item" v-for="item in currencyList" :class="currentCurrency == item.id ? 'active' : ''" @click="selectCurrencyFunc(item)">{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="popup-filter-btns">
				<button class="secondary-button btn">{{$t("common.reset")}}</button>
				<button class="error-button btn">{{$t("common.confirm")}}</button>
			</view>
		</u-popup> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showFilter: false,
				legal: [],
				list: [{
					id: 1,
					coinType: "CNY",
					receiveType: "微信",
					username: "迷糊先生",
					account: "qlwelqje222",
					todayIncome: 0,
					totalIncome: 100.0
				}],
				showAdd: false,
				canGet: true,
				page: 1,
				currencyList: [],
				currentCurrency: 0,
				originalList: [],
			};
		},
		onShow() {
			this.list = []
			this.originalList = []
			this.canGet = true
			//获取币种列表
			this.getWalletAddressList()
			this.getCurrencyList()
		},
		methods: {
			// 编辑
			onEdit(item) {
				uni.navigateTo({
					url: '/pages/setting/addWallet?id=' + item.id
				})
			},
			// 删除
			onDel(item) {
				uni.showModal({
					title: this.$t('common.hint'),
					content: this.$t('common.deleteConfirm'),
					cancelText: this.$t('common.cancel'),
					confirmText: this.$t('common.confirm'),
					success: (e) => {
						if(e.confirm) {
							this.$https.initDataToken({
								url: 'user/delPaymentMethod',
								type: 'POST',
								data: {
									id: item.id,
									lang: uni.getStorageSync("lang") || "en",
								}
							}, (res, msg) => {
								this.$utils.showToast(res)
								this.getWalletAddressList()
							})
						}
					}
				})
			},
			getCurrencyList() {
				this.$u.api.setting.getCurrencyList().then(res => {
					this.currencyList = res.message.legal
				})
			},
			getWalletAddressList() {
				if (!this.canGet) return
				//this.$u.api.setting.getWalletAddressList(this.page,99999).then(res=>{
				///user/getList?coin=
				this.$https.initDataToken({
					url: 'user/getList',
					type: 'POST'
				}, (res, msg) => {
					this.originalList = res.list;
					if (this.originalList.length == res.total) {
						this.canGet = false
					} else {
						this.page++
					}
					if (this.currentCurrency == 0) {
						this.list = this.originalList
					}
				})
			},
			selectCurrencyFunc(item) {
				this.$u.throttle(() => {
					this.currentCurrency = item.id
					this.currentCurrencyName = item.name
					setTimeout(() => {
						this.showFilter = false
					}, 300)
				}, 600)
			}
		},
		watch: {
			currentCurrency(val) {
				if (val == 0) {
					this.list = this.originalList
				} else {
					this.list = this.originalList.filter(item => item.currency == val)
				}

			}
		},
		onReachBottom() {
			this.getWalletAddressList()
		}
	}
</script>

<style lang="scss" scoped>
	.nav-right {
		display: flex;
		align-items: center;
		border-radius: 24rpx;
		background-color: #f2f2f9;
		height: 48rpx;
		line-height: 48rpx;
		font-size: 22rpx;
		padding: 0 20rpx;

		.iconfont {
			margin-left: 8rpx;
			font-weight: bold;
			font-size: 22rpx;
		}
	}

	.add-new-account-btn {
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 70rpx;
		line-height: 70rpx;
		background-color: #f2f2f9;
		margin: 0 56rpx;
		border-radius: 35rpx;
		margin-top: 30rpx;

		&::after {
			border: none;
		}
	}

	.list {
		margin-top: 40rpx;

		.item {
			margin-bottom: 20rpx;
			padding: 30rpx;
			border-radius: 16rpx;
			box-shadow: 0px 0px 8.9px 1.1px rgba(0, 0, 0, 0.05);
			background-color: #ffffff;

			.image {
				width: 120rpx;
				height: 120rpx;
				margin-right: 20rpx;
				border-radius: 10rpx;
				border: 2rpx solid $uni-color-secondary;
			}
		}
	}

	.popup-filter {
		.item {
			display: flex;
			align-items: center;
			font-size: 28rpx !important;
			background-color: #ffffff;
			height: 46rpx;
			line-height: 48rpx;
			border: 1px solid #f2f2fa;
			border-radius: 8rpx;
			margin-right: 18rpx;
			margin-bottom: 12rpx;
			padding: 0 12rpx;

			&.active {
				border-color: #c00028;
				color: #c00028;
				background-color: #fff;
			}

			.image {
				width: 28rpx;
				height: 28rpx;
				margin-right: 12rpx;
			}
		}
	}

	.popup-filter-btns {
		margin: 0 22rpx;
		display: flex;
		justify-content: space-between;
		margin-top: 50rpx;

		.btn {
			width: 47%;
			font-size: 24rpx;
		}
	}
</style>