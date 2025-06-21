<template>
	<view class="pb-50 text-white">
		<l-common-navbar :title="i18n.lockedPositionList" :isCustomBack="true" @back="$utils.jump('/pages/financial/index','switchTab')" />
		<view class="m-30">
			<view class="p-30 border-radius-20 box-shadow mb-30" style="background: #242424;" v-for="item in list">
				<view class="d-flex-between-center">
					<view class="d-flex align-items-center">
						<text class="tag tag-success" v-if="item.status == 1"
							style="color: #ffffff;">{{i18n.inProgress}}</text>

						<text class="d-block font-size-32 ml-12"
							style="color: #ffffff;">{{item.from_name + i18n.lockedPositionsToEarnCoins}}</text>
					</view>
					<u-button type="error" @click="redemption(item.id)" :disabled="hasClick?true:false" class="mr-0"
						v-if="item.status==='进行中'" size="mini" style="color: #f1f1f1;">{{i18n.redemption}}</u-button>
					<text v-if="item.status === 7 || item.status ==='提前赎回'" style="color:red;">{{i18n.redeemed}}</text>
				</view>

				<view class="d-grid-columns-3 mt-30" style="margin-top: 100px;">
					<view class="">
						<text class="d-block font-size-24 opacity-50"
							style="color: #ffffff;">{{i18n.numberOfCoinsDeposited}}(USDT)</text>
						<text class="d-block font-size-28 mt-10 font-weight-bold"
							style="color: #ffffff;">{{parseFloat(item.money)}}</text>
					</view>
					<view class="">
						<text class="d-block font-size-24 opacity-50" style="color: #ffffff;">{{i18n.dailyYield}}</text>
						<text class="d-block font-size-28 mt-10 font-weight-bold"
							style="color: #ffffff;">{{parseFloat(item.rate)}}%</text>
					</view>
					<view class="">
						<text class="d-block font-size-24 opacity-50" style="color: #ffffff;">{{i18n.lockUpTime}}</text>
						<text class="d-block font-size-28 mt-10 font-weight-bold"
							style="color: #ffffff;">{{item.created_at}}</text>
					</view>
					<view class="mt-20">
						<text class="d-block font-size-24 opacity-50" style="color: #ffffff;">{{i18n.expiryTime}}</text>
						<text class="d-block font-size-28 mt-10 font-weight-bold"
							style="color: #ffffff;">{{item.complete_at}}</text>
					</view>
					<view class="mt-20">
						<text class="d-block font-size-24 opacity-50"
							style="color: #ffffff;">{{i18n.earlyRedemptionPenalty}}</text>
						<text
							class="d-block font-size-28 mt-10 font-weight-bold text-error">{{(0.01*parseFloat(item.money)*parseFloat(item.adance_redeem_falsify)).toFixed(4)}}USDT</text>
					</view>
				</view>
			</view>
			<default-page v-if="!list.length"></default-page>
		</view>
	</view>
</template>

<script>
	import {
		list
	} from "../../common/index.list";

	export default {
		data() {
			return {
				hasClick: false,
				page: 1,
				canGet: true,
				limit: 5,
				list: []
			};
		},
		onShow() {
			this.page = 1
			this.canGet = true
			this.list = []
			this.getLockmingOrder()
		},
		methods: {
			getLockmingOrder() {
				if (!this.canGet) return;
				let data = {
					page: this.page,
					limit: this.limit
				};
				this.$https.initDataToken({
					url: 'lockorder/lists',
					type: 'GET',
					data
				}, (res, msg) => {
					let list = res || [];
					if(list.length < this.limit) {
						this.canGet = false
					}
					if(this.page === 1) {
						this.list = list;
					}else {
						this.list = this.list.concat(list)
					}
				})
			},
			async redemption(id) {
				this.hasClick = true;
				const ret = await this.$utils.showModal(this.$t("common.hint"), this.$t("lockming.c_redemption"))
				if (!ret) return
				let data = {
					id: id
				};
				this.$https.initDataToken({
					url: 'financial/earlyRedemption',
					type: 'POST',
					data
				}, (res, msg) => {
					this.$utils.showToast(res)
					this.getLockmingOrder()
				})
			}
		},
		computed: {
			i18n() {
				return this.$t("lockming")
			}
		},
		onReachBottom() {
			if(!this.canGet) return
			this.page++
			this.getLockmingOrder()
		}
	}
</script>

<style lang="scss">
	page {
		background: #000000;
	}
</style>