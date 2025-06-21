<template>
	<view class="">
		<u-navbar :title="url === 'repayment' ? '' : $t('home.recharge')" showback="true" :customBack="onBack">
			<navigator v-if="url !== 'repayment'"  url="/pages/fund/recharge_logs" slot="right" style="color: #2A64FB;">
				<image src="/static/icon_to_all.png" style="width: 52rpx; height: 52rpx;"></image>
			</navigator>
		</u-navbar>
		<view class="px-36 py-30">
			<u-search placeholder="" input-align="left" :show-action="false" @change="search"
				v-model="keyword"></u-search>
		</view>
		<view class="mx-36">
			<view class="item" style="border-bottom: none;" v-for="item in coinList" :key="Math.random()" @click="jump(item)">
				<view class="d-flex text-white align-items-center">
					<image v-if="item.currency_logo && item.currency_logo.includes('http')" :src="item.currency_logo"   style="width: 58rpx; height: 58rpx;"></image>
					<image v-else :src="domain + item.currency_logo" style="width: 58rpx; height: 58rpx;"></image>
					<text class="font-size-32 ml-18"
						style="color: #ffffff;">{{item.name}}{{item.subName && `(${item.subName})`}}</text>
				</view>
				<text class="type" v-if="false">{{item.type}}</text>
			</view>
			<view class="item" style="border-bottom: none;" @click="jump({type:'BankCard'})">
				<view class="d-flex text-white align-items-center">
					<image src="/static/image/icon/buycoin1.png" style="width: 58rpx; height: 58rpx;"></image>
					<text class="font-size-32 ml-18" style="color: #ffffff;">{{$t('c2c.bankcard')}}</text>
				</view>
				<text class="type" v-if="false"></text>
			</view>
			<view style="color:red;margin-top: 20px;">
				{{$t('cz_tipA')}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import { domain } from '@/common/domain.js'
	// 选择币种
	export default {
		computed: {
			...mapState(['kefu','telegram']),
		},
		data() {
			return {
				lang: '',
				url: '',
				keyword: '',
				coinList: [],
				domain
			};
		},
		onLoad(options) {
			this.url = options.url;
			// this.coinList = this.$store.state.coins;
			this.lang = uni.getStorageSync('lang') || 'en';
			this.getRechargeAddressList()
		},
		methods: {
			onBack() {
				this.$utils.jump('/pages/fund/assets','switchTab')
			},
			goKefu() {
			  if(!this.kefu) return
			  window.location.href = this.kefu
			},
			goTelegram() {
			  if(!this.telegram) return
			  window.location.href = this.telegram
			},
			// 获取充值地址
			getRechargeAddressList() {
				this.$https.initDataToken({
					url: 'user/recharge_address_list',
					data: {},
					type: 'GET'
				}, (res, msg) => {
					this.coinList = res
				})
			},
			search(e) {
				if (e === "") {
					this.coinList = this.getRechargeAddressList()
				} else {
					this.coinList = this.coinList.filter(item => {
						if (item.name.indexOf(e) > -1) return item
					})
				}
			},
			jump(item) {
				if (item.type === "BankCard") {
					// uni.setStorageSync('selectCoin', item)
					// let url = '/pages/dianhui/dianhui2';
					// uni.navigateTo({
					// 	url
					// })
					// this.goKefu()
					this.goTelegram()
				} else
				{
					uni.setStorageSync('selectCoin', item)
					let url = `/pages/fund/${this.url}`
					if(this.url === 'repayment') {
						url = '/pages/repayment/repayment'
					}
 					uni.navigateTo({
						url
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #000000;
	}

	.item {
		@extend .d-flex, .align-items-center, .justify-content-between, .py-20;
		border-bottom: 1px solid $uni-color-black;

		&:last-child {
			border-bottom: none;
		}

		.type {
			background-color: $uni-color-success;
			border-radius: 22rpx;
			color: #fff;
			padding: 6rpx 18rpx;
			font-size: 20rpx;
		}

		&.cannot {
			view {
				opacity: .3;
			}

			.type {
				background-color: #d6d6d6;
			}
		}
	}
</style>