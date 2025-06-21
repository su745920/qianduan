<template>
	<view>
		<l-common-navbar :title="$t('transaction.recharge') + $t('c2c.detail')" showback="true" :isCustomBack="true" @back="$utils.jump('/pages/fund/recharge_logs')" />
		<view class="container" v-if="isLoadEnd">
			<view class="container_item">
				<view class="container_item_label">{{$t('transaction.recharge')}}{{$t('fund.time')}}:</view>
				<view class="container_item_value">{{detailObj.created_at}}</view>
			</view>
			<view class="container_item">
				<view class="container_item_label">{{$t('recharge_amount')}}:</view>
				<view class="container_item_value">{{detailObj.money}} {{detailObj.usdt_type}}</view>
			</view>
			<view class="container_item" style="display: block;">
				<view class="container_item_label">{{$t('home.recharge')}}{{$t('fund.address')}}:</view>
				<view class="container_item_address" @click="copy">
					<text class="container_item_value" selectable>{{detailObj.address}}</text>
				</view>
			</view>
			<view class="container_item">
				<view class="container_item_label">{{$t('fund.reason')}}:</view>
				<view v-if="detailObj.status === 0" class="container_item_value">{{$t('recharge_loading')}}</view>
				<view v-if="detailObj.status === 1" class="container_item_value">{{$t('recharge_success')}}</view>
				<view v-if="detailObj.status === 2" class="container_item_value">{{$t('recharge_fail')}}</view>
			</view>
			<view class="container_item" v-if="detailObj.notes">
				<view class="container_item_label">{{$t('fund.remark')}}:</view>
				<view class="container_item_value" 
				style="background-color: #666666;min-height: 150rpx;width: 100%;padding: 20rpx;box-sizing: border-box;border-radius: 20rpx;">{{detailObj.notes}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailId: null,
				detailObj: {},
				isLoadEnd: false
			};
		},
		onLoad({id}) {
			this.detailId = id
			this.getDetail()
		},
		methods: {
			getDetail() {
				  this.isLoadEnd = false
				  uni.showLoading()
				  this.$https.initDataToken({
				    url: 'account/record_detail',
				    data: {
				      id: this.detailId,
				      lang: uni.getStorageSync('lang') || 'en'
				    },
				    type: 'POST'
				  }, (res, msg) => {
					  this.isLoadEnd = true
					  uni.hideLoading()
					  this.detailObj = res
				  });
			},
			copy() {
				uni.setClipboardData({
					data: 'hello',
					success: () => {
						this.$nextTick(() => {
							const lang = uni.getStorageSync('lang') || 'en'
							if (lang == "zh" || lang == "zh_cn") {
								this.$u.toast("复制成功");
							} else {
								this.$u.toast("Success");
							}
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.container {
	margin-top: 60rpx;
	padding: 70rpx 60rpx;
	box-sizing: border-box;
	background-color: #242424;
	min-height: 80vh;
	margin-left: 30rpx;
	margin-right: 30rpx;
	border-radius: 20rpx;
	&_item {
		align-items: center;
		margin-bottom: 50rpx;
		&_label {
			font-size: 36rpx;
			color: #999999;
			white-space: nowrap;
		}
		&_value {
			font-size: 36rpx;
			color: #ffffff;
			margin-top: 20rpx;
			word-wrap: break-word;
		}
		&_address {
			margin-top: 20rpx;
			line-height: 42rpx;
			margin-left: 0;
		}
	}
}
</style>
