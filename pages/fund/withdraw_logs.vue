<template>
	<view>
		<l-common-navbar :title="$t('common.log')" showback="true" :isCustomBack="true" @back="$utils.jump('/pages/fund/withdraw')" />
		<view class="mx-36 pb-60">
			<view class="text-white border-radius-10 my-30 " style="display: flex;align-items: center;background: #242424;" v-for="item in data"
				:key="item.id" @click="$utils.jump('/pages/fund/withdraw_detail?id=' + item.id)">
				<view class="p-20 " style="flex: 1;">
					<view class="d-flex justify-content-between align-items-center">
						<view class="d-flex align-items-center">
							<text class="font-size-32"
								style="color: #ffffff;font-weight: 700;">{{item.currency_name}}</text>
						</view>
						<text class="font-size-32"
							style="opacity: 1;color: #ffffff;font-weight: 700;">{{item.amount}}</text>
					</view>
					<view class="text-right font-size-22 my-4">
						{{item.name}}
					</view>
					<view class="d-flex justify-content-between" style="margin-top: 5px;">
						<text
							style="color: #ffffff;opacity: 0.6">{{item.type == -1 ? $t("home.withdraw") : $t("home.recharge")}}</text>
						<text style="color: #939393;">{{item.created_at}}</text>
					</view>
					<view class="d-flex justify-content-between" style="margin-top: 4px;">
						<text style="color: #ffffff;opacity: 0.6">{{ $t("transaction.status")}}</text>
						<text style="color: #ffffff;opacity: 0.6"
							v-if="item.status== 1 ">{{$t('withdraw_loading')}}</text>
						<text style="color: #25A750;" v-if="item.status== 2 ">{{$t('withdraw_success')}}</text>
						<text style="color: #ca3f64;" v-if="item.status== 3 ">{{$t('withdraw_fail')}}</text>
					</view>
				</view>
				<image src="@/static/icon_arrow_right_white_16.png" mode="widthFix"
					style="width: 40rpx;height: 40rpx;margin: 0 20rpx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				page: 1,
				limit: 99999999,
				canGet: true,
				withdrawList: []
			};
		},
		onShow() {
			this.data = []
			this.getList()
		},
		methods: {
			async getList() {


				let data = {
					page: this.page,
					limit: this.limit,
					lang: uni.getStorageSync("lang") || "en"
				};
				this.$https.initDataToken({
					url: 'wallet/withdrawLogList',
					type: 'POST',
					data
				}, (res, msg) => {
					let arr2 = res.map(item => {
						item.type = -1
						item.created_at = item.create_time
						item.amount = item.number
						return item
					})
					let arr = [...arr2]
					this.data = arr.sort((a, b) => a.created_at - b.created_at);
				});





			},
			// getRechargeLog() {
			// 	const coins = this.$store.state.coins
			// 	if (!this.canGet) return
			// 	this.$u.api.wallet.getRechargeLog(this.page, this.limit).then(res => {
			// 		const data = res.message
			// 		if (data.total == this.data.length) {
			// 			this.canGet = false
			// 		} else {
			// 			let list = data.data.map(item => {
			// 				const obj = coins.find(el => item.currency_id == el.id)
			// 				item.amount = Number(item.amount).toFixed(2)
			// 				item.currency_image = obj.image,
			// 					item.type = 1
			// 				return item
			// 			})

			// 			this.data = this.data.concat(list)
			// 		}
			// 	})
			// },
			// getWithdrawList() {
			// 	const coins = this.$store.state.coins
			// 	if (!this.canGet) return
			// 	this.$u.api.wallet.getWithdrawList(this.page, this.limit).then(res => {
			// 		const data = res.message
			// 		if (data.total == this.data.length) {
			// 			this.canGet = false
			// 		} else {
			// 			let list = data.data.map(item => {
			// 				const obj = coins.find(el => item.currency_id == el.id)
			// 				item.amount = Number(item.amount).toFixed(2)
			// 				item.currency_image = obj.image,
			// 					item.type = 0
			// 				return item
			// 			})

			// 			this.withdrawList = this.withdrawList.concat(list)
			// 		}
			// 	})
			// },
		},
		onReachBottom() {
			//this.getRechargeLog()
		},
		filters: {

		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #000000;
	}
	.type {
		background-color: rgba(33, 193, 146, .2);
		border-radius: 18rpx;
		color: #028a62;
		font-size: 20rpx;
		height: 36rpx;
		line-height: 36rpx;
		padding: 0 24rpx;
	}
</style>