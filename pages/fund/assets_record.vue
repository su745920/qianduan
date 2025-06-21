<template>
	<view class="pb-50">
		<u-navbar :title="assetsType.type" showback="true"></u-navbar>
		<view class="deposit m-30">
			<view class="d-flex align-items-center">
				<text class="d-block font-size-28 mr-10" style="color: #e1e1e1;">{{i18n.convert2}}</text>
				<text class="iconfont icon-yanjing_xianshi text-white font-size-36"></text>
			</view>
			<view class="mt-30">
				<view class="d-flex align-items-baseline">
					<text class="font-size-40 mr-20" style="color: #FFFFFF">{{(balance.usdt_total*1).toFixed(6)}}</text>
					<text class="font-size-22" style="color: #e1e1e1">USDT</text>
				</view>
			</view>
			<view class="d-block font-size-22 opacity-50 mt-8" style="color: #ffffff;">
				≈ {{(balance.usdt_total * $store.state.fiat.rate).toFixed(6)}} {{$store.state.fiat.currency_code}}
			</view>
			<view class="earnings-wrap">
				<view class="earnings font-size-22 d-grid-columns-2">
					<view class="">
						<text class="d-block font-size-22 opacity-50"
							style="color: #FFFFFF">{{i18n.availableQuota}}({{balance.currency_name}})</text>
						<text class="d-block font-size-22 mt-10"
							style="color: #FFFFFF">{{parseFloat(balance.balance)}}</text>
					</view>
					<view class="">
						<text class="d-block font-size-22 opacity-50"
							style="color: #FFFFFF">{{i18n.locked}}({{balance.currency_name}})</text>
						<text class="d-block font-size-22 mt-10"
							style="color: #FFFFFF">{{parseFloat(balance.lock_balance)}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="m-30">
			<view style="color: #666666">{{$t("fund.financialRecords")}}</view>
			<view class="mt-30">
				<block v-if="list.length">
					<view class="p-30 box-shadow border-radius-20 mb-30 bg-black text-white" v-for="item in list">
						<view class="d-flex-between-center py-10">
							<text class="opacity-50">{{i18n.number}}</text>
							<text class="font-weight-bold"
								:style="{color:$utils.getColor(item.value)}">{{Number(item.value) + " " +item.currency_name}}</text>
						</view>
						<view class="d-flex-between-center py-10">
							<text class="opacity-50">{{i18n.time}}</text>
							<text class="font-weight-bold">{{item.created_time}}</text>
						</view>
						<view class="py-10 font-size-30">
							{{item.info}}
						</view>
					</view>

				</block>
				<default-page v-else></default-page>
			</view>
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				nav: [{
					name: this.$t("fund.financialRecords")
				}],
				currency: 0,
				type_id: 0,
				type_name: '',
				balance: {},
				page: 1,
				list: [],
				canGet: true,
			};
		},
		onLoad(options) {
			const {
				currency,
				type_id,
				type_name
			} = options
			if (!currency || !type_id || !type_name) {
				this.$utils.showToast(this.$t("common.paramsWrong"))
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 1200)
				return
			}
			this.currency = currency
			this.type_id = type_id
			this.type_name = type_name
		},
		onShow() {

			// 获取特定币种在币币合约法币秒合约中的余额
			this.getDetail()
			// 获取特定币种特定方式的帐变记录
			this.getLegalLog()
		},
		methods: {
			getDetail() {
				const {
					currency,
					type_name: type
				} = this;
				let data = {
					currency: currency,
					type: type
				};
				this.$https.initDataToken({
					url: 'wallet/detail',
					type: 'POST',
					data
				}, (res, msg) => {
					let balance = res
					if (this.type_id == 1) {
						balance.balance = Number(res.legal_balance);
						balance.lock_balance = Number(res.lock_legal_balance);
					} else if (this.type_id == 2) {
						balance.balance = Number(res.change_balance);
						balance.lock_balance = Number(res.lock_change_balance);
					} else if (this.type_id == 3) {
						balance.balance = Number(res.lever_balance);
						balance.lock_balance = Number(res.lock_lever_balance);
					} else if (this.type_id == 4) {
						balance.balance = Number(res.micro_balance);
						balance.lock_balance = Number(res.lock_micro_balance);
					}
					this.balance = balance

				})
			},
			getLegalLog() {
				if (!this.canGet) return
				const {
					currency,
					type_id: type,
					page
				} = this;

				let data = {
					currency: currency,
					type: type,
					page: page,
					lang: uni.getStorageSync('lang') || 'en'
				};
				this.$https.initDataToken({
					url: 'wallet/legal_log',
					type: 'POST',
					data
				}, (res, msg) => {
					const list = res.list
					if (list.length) {
						this.list = [...this.list, ...list]
						this.page++
					} else {
						this.canGet = false
					}
				})
			}
		},
		computed: {
			i18n() {
				return this.$t("fund")
			},
			assetsType() {
				const i18n = this.$t("fund")
				const assetsTypes = [{
					id: 1,
					name: 'legal',
					type: i18n.fiat + i18n.account,
				}, {
					id: 2,
					name: 'change',
					type: i18n.exchange + i18n.account,
				}, {
					id: 3,
					name: 'lever',
					type: i18n.leverage + i18n.account,
				}, {
					id: 4,
					name: 'micro',
					type: i18n.second + i18n.account,
				}]

				return assetsTypes.find(item => item.id == this.type_id)
			}
		},
		onReachBottom() {
			this.getLegalLog()
		}
	}
</script>

<style lang="scss">

</style>