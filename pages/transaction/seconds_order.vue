<template>
	<view class="text-white">
		 <l-common-navbar :title="`${i18n.secondsPosition}(${symbol})`" :isCustomBack="true" @back="$utils.jump('/pages/transaction/options')" />
		<view class="p-30">
			<u-subsection :list="nav" :current="0" bg-color="#242424" @change="changeNav"></u-subsection>
			<view class="mt-30">
				<view class="p-20 box-shadow border-radius-20 mb-20" style="background: #242424;" v-for="item in list">
					<view class="d-flex-between-center py-10 ">
						<text class="opacity-50" style="color: #ffffff;">{{i18n.tradingPair}}</text>
						<text class="font-weight-bold" style="color: #ffffff;">{{item.symbol_name}}</text>
					</view>
					<view class="d-flex-between-center py-10">
						<text class="opacity-50" style="color: #ffffff;">{{i18n.direction}}</text>
						<text class="font-weight-bold"
							:class="item.type == 1 ? 'text-success' : 'text-error'">{{item.type == 1 ? i18n.buyUp : i18n.buyDown}}</text>
					</view>
					<view class="d-flex-between-center py-10">
						<text class="opacity-50" style="color: #ffffff;">{{i18n.buyPrice}}</text>
						<text class="font-weight-bold"
							style="color: #ffffff;">{{Number(item.open_price).toFixed(4)}}</text>
					</view>
					<view class="d-flex-between-center py-10">
						<text class="opacity-50" style="color: #ffffff;">{{i18n.number}}</text>
						<text class="font-weight-bold" style="color: #ffffff;">{{Number(item.u)}}</text>
					</view>
					<view class="d-flex-between-center py-10">
						<text class="opacity-50" style="color: #ffffff;">{{i18n.orderTimes}}</text>
						<text class="font-weight-bold" style="color: #ffffff;">{{Number(item.seconds)}}s</text>
					</view>
					<view class="d-flex-between-center py-10" v-if="currentNav == 1">
						<text class="opacity-50" style="color: #ffffff;">{{i18n.sellTime}}</text>
						<text class="font-weight-bold" style="color: #ffffff;">{{item.handled_at}}</text>
					</view>
					<view class="d-flex-between-center py-10" v-if="currentNav == 1">
						<text class="opacity-50" style="color: #ffffff;">{{i18n.pl}}</text>

						<text class="font-weight-bold font-size-30" v-if="item.profit_result==1"
							:style="{color:$utils.getColor(item.fact_profits)}">+{{Number(item.fact_profits)}}</text>

						<text class="font-weight-bold font-size-30" v-else-if="item.profit_result==-1"
							:style="{color:$utils.getColor(-item.fact_profits)}">-{{Number(item.fact_profits)}}</text>
							
						<text class="font-weight-bold font-size-30" v-else style="color: #ffffff;">0.00</text>

					</view>
				</view>
				<default-page :length="list.length" v-if="list.length === 0" :total="total"></default-page>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currency_id: 32,
				match_id: 2,
				page: 1,
				canGet: true,
				list: [],
				symbol: '',
				currentNav: 0,
				showNav: true,
				total: 0
			};
		},
		onLoad(options) {
			const {
				match_id,
				currency_id
			} = options
			this.match_id = match_id || 2;
			this.currency_id = currency_id || 32;
		},
		onShow() {
			this.showNav = false
			setTimeout(() => {
				this.showNav = true
			}, 100)

			this.page = 1
			this.canGet = true
			this.list = []
			this.getSecondsList()
		},
		methods: {
			backFn() {
				uni.navigateBack()
			},
			getSecondsList() {
				if (!this.canGet) return
				const {
					match_id,
					status,
					page,
					currency_id
				} = this
				//getSecondsList: (currency_id,match_id,status,page = 1,limit = 5) => vm.$u.get("/microtrade/listsV2",{currency_id,match_id,status,page,limit}),
				//this.$u.api.market.getSecondsList(currency_id,match_id, status, page).then(res => {
				let data = {
					currency_id: currency_id,
					match_id: match_id,
					status: status,
					page: page,
					limit: 10
				};
				this.$https.initDataToken({
					url: 'microtrade/listsV2',
					data,
					type: 'GET'
				}, (res, msg) => {
					this.total = res.total
					const list = res.list.data
					this.symbol = res.currencyName + "/USDT";
					if (list && list.length) {
						this.symbol = list[0].symbol_name
						this.list = list;
						//this.page++
					} else {
						this.canGet = false
					}
				})
			},
			changeNav(val) {
				this.currentNav = val
				this.page = 1
				this.canGet = true
				this.list = []
				this.getSecondsList()

			}
		},
		computed: {
			i18n() {
				return this.$t("transaction")
			},

			status() {
				// 1:在持，3：历史
				return this.currentNav === 0 ? 1 : 3
			},
			nav() {
				const i18n = this.$t("transaction")
				return [{
					name: i18n.position
				}, {
					name: i18n.history
				}]
			}
		},
		onReachBottom() {
			this.getSecondsList()
		}
	}
</script>

<style lang="scss">
	page {
		background: #000000;
	}
</style>