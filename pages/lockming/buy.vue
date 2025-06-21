<template>
	<view class="pb-50 text-white">
		<l-common-navbar :title="project.from_name + i18n.lockedPositionsToEarnCoins" :isCustomBack="true" @back="$utils.jump('/pages/financial/index','switchTab')" />
		<view class="deposit mt-30 mx-30" style="background-image:linear-gradient(1deg, #2A64FB 0%, #2A64FB 100%);">
			<view class="d-flex align-items-center">
				<text class="d-block font-size-28 mr-10"
					style="color: #eeeeee">{{project.from_name + i18n.lockedPositionsToEarnCoins}}</text>
			</view>
			<view class="mt-10">
				<view class="d-flex align-items-baseline">
					<text class="font-size-32 mr-20" style="color: #eeeeee">{{i18n.get + project.from_name}}</text>
				</view>
			</view>
			<view class="earnings-wrap">
				<view class="earnings d-grid-columns-3">
					<view class="">
						<text class="d-block opacity-50" style="color: #eeeeee">{{i18n.minimumSingleTransaction}}</text>
						<text class="d-block mt-10" style="color: #ffffff">{{parseFloat(project.min_money)}}</text>
					</view>
					<view class="">
						<text class="d-block opacity-50" style="color: #eeeeee">{{i18n.dailyYield}}</text>
						<text class="d-block mt-10"
							style="color: #ffffff">{{project.rate}}%-{{project.rate_max}}%</text>
					</view>
					<view class="">
						<text class="d-block opacity-50" style="color: #eeeeee">{{i18n.lockUpPeriod}}</text>
						<text class="d-block mt-10" style="color: #ffffff">{{project.day}}({{i18n.day}})</text>
					</view>
				</view>
			</view>
		</view>
		<view class="m-30">
			<view class="p-30 box-shadow border-radius-20" style="background: #242424;">
				<view class="d-flex-between-center">
					<text class="d-block opacity-50" style="color: #ffffff;">{{i18n.dividendTime}}</text>
					<text class="text-warning font-weight-bold" style="color: #ffffff">{{i18n.expiredDistribution}}</text>
				</view>
				<view class="d-flex-between-center mt-20">
					<text class="d-block opacity-50" style="color: #ffffff;">{{i18n.escrowFunds}}</text>
					<text class="text-warning font-weight-bold"
						style="color: #ffffff">{{i18n.returnOnExpiration}}</text>
				</view>
				<view class="d-flex-between-center mt-20">
					<text class="d-block opacity-50" style="color: #ffffff;">{{i18n.redemptionInAdvance}}</text>
					<text class="text-warning font-weight-bold"
						style="color: #ffffff">{{project.adance_redeem_falsify}}%</text>
				</view>
			</view>
			<view class="p-30 box-shadow border-radius-20 mt-30" style="background:#242424;">
				<view class="position-relative">
					<text class="d-block opacity-50"
						style="color: #ffffff;">{{i18n.numberOfCoinsDeposited}}(USDT)</text>
					<input type="number" v-model="amount" class="lockming-input mt-10" style="color: #ffffff;">
					<text class="tag tag-warning position-absolute connect_btn" @click="setAll"
						style="right: 20rpx;bottom: 14rpx;color: #000000;">{{i18n.all}}</text>
				</view>
				<view class="d-flex-between-center mt-20">
					<text class="d-block opacity-50" style="color: #ffffff;">{{i18n.estimatedIncome}}(USDT)</text>
					<text class="text-warning font-weight-bold"
						style="color: #ffffff;">{{project.rate}}%-{{project.rate_max}}%</text>
				</view>
				<view class="d-flex-between-center mt-20">
					<text class="d-block opacity-50" style="color: #ffffff;">{{i18n.availableAssets}}(USDT)</text>
					<text class="text-warning font-weight-bold" style="color: #ffffff">{{usdt}}</text>
				</view>
			</view>
		</view>
		<view class="footer">
			<button class="warning-button font-size-28 connect_btn" style="color: #000000;"
				@click="submit">{{i18n.subscribe}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailId: '',
				usdt: 0,
				balance: {},
				project: {},
				amount: null
			};
		},
		onLoad({
			id = ''
		}) {
			this.detailId = id
			const project = uni.getStorageSync('lockming') || {}
			// 清除storage
			// uni.removeStorageSync('lockming')
			// if (!project.currency_id) {
			// 	this.$utils.showToast(this.$t("common.paramsWrong"))
			// 	setTimeout(() => {
			// 		uni.navigateBack({
			// 			delta: 1
			// 		})
			// 	}, 1000)
			// 	return
			// }
			this.project = project

			this.getWalletDetail()
		},
		methods: {
			getWalletDetail() {
				this.$https.initDataToken({
					url: 'lock_mining/detail?id=' + this.detailId,
					type: 'GET'
				}, (res, msg) => {

					this.usdt = res.usdt
				})
			},
			submit() {
				this.$u.throttle(() => {
					const {
						amount,
						balance,
						project,
						i18n
					} = this
					if (!amount || !this.$u.test.amount(amount)) {
						return this.$utils.showToast(i18n.p_number)
					}
					if (amount < Number(project.min_money)) {
						return this.$utils.showToast(i18n.leastSingle + Number(project.min_money))
					}
					if (amount > Number(balance.change_balance)) {
						return this.$utils.showToast(i18n.insufficientBalance)
					}
					uni.showLoading({
						mask: true
					})
					setTimeout(()=> {
						uni.hideLoading()
					},5000)
					let data = {
						id: project.id,
						number: amount,
						lang: uni.getStorageSync('lang') || 'en'
					};
					this.$https.initDataToken({
						url: 'lockorder/submit',
						type: 'POST',
						data
					}, (res, msg) => {
						uni.hideLoading()
						this.$utils.showToast(res)
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1200)
					})
				}, 3000)

			},
			setAll() {
				this.amount = this.usdt;
			}
		},
		computed: {
			i18n() {
				return this.$t("lockming")
			},
			estimatedIncome() {
				const {
					balance,
					project,
					i18n
				} = this
				const amount = this.amount ? Number(this.amount) : 0

				return amount * project.day * Number(project.interest_rate) / 100
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #000000;
	}

	.lockming-input {
		border: 2rpx solid #444;
		border-radius: 10rpx;
		display: block;
		padding: 10rpx 20rpx;
		font-weight: bold;

		.input-placeholder {
			font-size: 22rpx;
			color: #939393;
			font-weight: normal;
		}
	}

	.footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		@extend .box-shadow;
		padding: 30rpx;
		border-radius: 20rpx 20rpx 0 0;
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