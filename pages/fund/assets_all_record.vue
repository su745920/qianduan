<template>
	<view class="pb-50">
		<l-common-navbar :title="i18n.financialRecords"  :isCustomBack="true" @back="$utils.jump('/pages/fund/assets','switchTab')" />

		<!-- 顶部导航栏 -->
		<div class="nav-box" style="display: flex;justify-content: space-around">
			<div style="flex: 1;font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;text-align: center;" @click="changeTab(0)">
				<span :class="currentTab==0 ?'activeTab':'normalTab' ">{{ $t('assets.funding') }}</span>
			</div>

			<div style="flex: 1;font-size: 14px;color: #bbbbbb;font-family:'NotoSansSC-Bold';cursor: pointer;text-align: center;"
				@click="changeTab(1)">
				<span :class="currentTab==1 ?'activeTab':'normalTab' ">{{ $t('assets.spot') }}</span>
			</div>
			<div style="flex: 1;font-size: 14px;color: #bbbbbb;font-family:'NotoSansSC-Bold';cursor: pointer;text-align: center;"
				@click="changeTab(2)">
				<span :class="currentTab==2 ?'activeTab':'normalTab' ">{{ $t('assets.futures') }}</span>
			</div>
			<div style="flex: 1;font-size: 14px;color: #bbbbbb;font-family:'NotoSansSC-Bold';cursor: pointer;text-align: center;"
				@click="changeTab(3)">
				<span :class="currentTab==3 ?'activeTab':'normalTab' ">{{ $t('assets.options') }}</span>
			</div>
			<div style="flex: 1;font-size: 14px;color: #bbbbbb;font-family:'NotoSansSC-Bold';cursor: pointer;text-align: center;"
				@click="changeTab(4)">
				<span :class="currentTab==4 ?'activeTab':'normalTab' ">{{ $t('assets.earn') }}</span>
			</div>
		</div>


		<view class="m-30">
			<view class="mt-30">
				<block v-if="list.length">
					<view class=" box-shadow mb-30 bg-black text-white" v-for="item in list">
						<view class="p-30 border-radius-20" style="background: #242424;">
							<view class="d-flex-between-center py-10">
								<text class="opacity-50" style="color: #ffffff;">{{i18n.number}}</text>
								<text class="font-weight-bold font-size-32" style="color: #ffffff;"
									:style="{color:$utils.getColor(item.value)}">{{Number(item.value) + " " +item.currency_name}}</text>
							</view>
							<view class="d-flex-between-center py-10">
								<text class="opacity-50" style="color: #ffffff;">{{i18n.time}}</text>
								<text class="font-weight-bold" style="color: #ffffff;">{{item.created_time}}</text>
							</view>
							<view class="py-10 font-size-30" style="color: #ffffff;">
								{{item.info}}
							</view>
						</view>
					</view>

				</block>
				<view>
					<default-page :length="list.length" v-if="list.length === 0" :total="list.length"></default-page>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTab: 0,
				currency: 0,
				type_id: 0, //默认是资金账户
				type_name: '',
				balance: {},
				page: 1,
				list: [],
				isLoadEnd: false,
				assetsType: {}
			};
		},
		onLoad(e) {
			if (e != null) {
				let currentTab = e.currentTab;
				if (currentTab != null) {
					this.currentTab = e.currentTab;
					this.type_id = e.currentTab;
				}
			}

			this.getLegalLog();
		},
		methods: {
			changeTab(val) {
				this.type_id = val;
				this.currentTab = val;
				this.list = [];
				this.getLegalLog();
			},
			getLegalLog() {
				const {
					currency,
					type_id: type,
					page
				} = this
				let lang = uni.getStorageSync('lang') || 'en';
				let data = {
					currency: currency,
					type: type,
					page: page,
					lang: lang
				};
				this.$https.initDataToken({
					url: 'wallet/legal_log',
					type: 'POST',
					data
				}, (res, msg) => {
					const list = res.list
					this.isLoadEnd = list.length < res.limit ? true : false
					if(this.page === 1) {
						this.list = list
					}else {
						this.list = this.list.concat(list)
					}
				})
			}
		},
		computed: {
			i18n() {
				return this.$t("fund")
			}
		},
		onReachBottom() {
			if(this.isLoadEnd) return
			this.page++
			this.getLegalLog()
		}
	}
</script>

<style lang="scss">
	page {
		background: #000000;
	}

	.activeTab {
		color: #ffffff;
		width: 28px;
		border-width: 12px;
		padding-bottom: 8px;
		font-weight: 600;

	}

	.normalTab {
		width: 28px;
		border-width: 12px;
		padding-bottom: 8px;
		color: #939393;
		font-weight: 600;
	}
	.nav-box {
		position: sticky;
		top: 88rpx;
		left: 0;
		right: 0;
		z-index: 10;
		background-color: #000000;
		padding: 30rpx 20rpx;
		box-sizing: border-box;
	}
</style>