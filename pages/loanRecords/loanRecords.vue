<template>
	<view>
		<l-common-navbar :isCustomBack="true" @back="$utils.jump('/pages/loan/loan')" />
		<view class="list">
			<view class="list_item" v-for="(item,index) in listData" :key="item.id">
				<view class="d-flex align-items-center">
					<view class="list_item_label">{{$t('loan.c8')}}: </view>
					<view class="list_item_value">{{item.order_no}}</view>
					<view class="list_item_copy" @click="onCopy(item.order_no)">
						<image class="list_item_copy_icon" src="@/static/icon_copy.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="d-flex align-items-center mt-20">
					<view class="list_item_label">{{$t('loan.c9')}}: </view>
					<view class="list_item_value">{{item.created_at}}</view>
				</view>
				<view class="d-flex align-items-center mt-20">
					<view class="list_item_label">{{$t('loan.c10')}}: </view>
					<view class="list_item_value">{{ item.status === 0 ? $t('loan.d1') : item.updated_at }}</view>
				</view>
				<view class="d-flex align-items-center justify-content-between mt-20">
					<view class="d-flex align-items-center">
						<view class="list_item_label">{{$t('loan.d2')}}: </view>
						<view class="list_item_value">{{item.loan_money}}USDT</view>
					</view>
					<view class="d-flex align-items-center">
						<view class="list_item_label">{{$t('loan.d3')}}: </view>
						<view class="list_item_value">{{item.loan_days}}{{$t('loan.a5')}}</view>
					</view>
				</view>
				<view class="d-flex align-items-center justify-content-between mt-20">
					<view class="d-flex align-items-center">
						<view class="list_item_label">{{$t('loan.a7')}}: </view>
						<view class="list_item_value">{{item.loan_rate}}%</view>
					</view>
					<view class="d-flex align-items-center">
						<view class="list_item_label">{{$t('loan.d4')}}: </view>
						<view class="list_item_value">{{item.interest}}USDT</view>
					</view>
				</view>
				<view class="d-flex align-items-center justify-content-between mt-20">
					<view class="d-flex align-items-center">
						<view class="list_item_label">{{$t('loan.b1')}}: </view>
						<view class="list_item_value">{{item.loan_fee}}%</view>
					</view>
					<view class="d-flex align-items-center">
						<view class="list_item_label">{{$t('loan.b2')}}: </view>
						<view class="list_item_value">{{item.commission}}USDT</view>
					</view>
				</view>
				<view class="d-flex align-items-center mt-20">
					<view class="list_item_label">{{$t('loan.b3')}}: </view>
					<view class="list_item_value">{{item.loan_institution}}</view>
				</view>
				<view class="d-flex align-items-center justify-content-between mt-20 grid-gap-20">
					<view class="d-flex align-items-center">
						<!-- 本金+利息+手续费 -->
						<view class="list_item_label">{{$t('loan.d5')}}: </view>
						<view class="list_item_value">{{getTotalMoney(item,1)}}USDT</view>
					</view>
					<view class="d-flex align-items-center">
						<view class="list_item_label">{{$t('loan.d6')}}: </view>
						<view class="list_item_value">{{getTotalMoney(item,2)}}USDT</view>
					</view>
				</view>
				<view class="d-flex align-items-center mt-20">
					<view class="list_item_label">{{$t('loan.d7')}}: </view>
					<view class="list_item_value">{{getStatus(item.status)}}</view>
				</view>
				<view class="d-flex align-items-center justify-content-end mt-40" v-if="item.status === 1 || item.status === 3 || item.status === 5">
					<view class="list_item_btn" @click="onRepayment(item.id)">{{$t('loan.d8')}}</view>
				</view>
			</view>
		</view>
		<default-page v-if="isLoadEnd && listData.length === 0" ></default-page>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: [],
				page: 1,
				isLoadEnd: false
			};
		},
		onShow() {
			this.getListData()
		},
		onReachBottom() {
			if(this.isLoadEnd) return
			this.page ++
			this.getListData()
		},
		methods: {
			onRepayment(id) {
				uni.setStorageSync('loan_id',id)
				this.$utils.jump('/pages/repayment/repayment?id=' + id)
			},
			getListData() {
				this.$https.initDataToken({
					url: 'loan/list',
					type: 'GET',
					data: {
						page: this.page,
						limit: 10
					}
				},(res,msg) => {
					if(res) {
						const {total = 0,data = []} = res
						if(this.page === 1) {
							this.listData = data
						}else {
							this.listData = this.listData.concat(data)
						}
						if(this.listData.length >= total) {
							this.isLoadEnd = true
						}
					}
				})
			},
			getStatus(status) {
				switch(status) {
					case 0: return this.$t('loan.d1')
					case 1: return this.$t('loan.d9')
					case 2: return this.$t('loan.d10')
					case 3: return this.$t('loan.e1')
					case 4: return this.$t('loan.e2')
					case 5: return this.$t('loan.e3')
					case 6: return this.$t('loan.e4')
				}
			},
			getTotalMoney(item,type = 1) {
				let total = item.loan_money + item.interest + item.commission
				let result = 0
				if(type === 1) {
					result = total
				}else
				if(type === 2) {
					result = total - item.already_money
				}
				return result >= 0 ? result : 0
			},
			onCopy(value) {
				uni.setClipboardData({
					data: value,
					showToast: false
				})
				uni.showToast({
					title: this.$t('bind.copyokin'),
					icon: 'none'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.list {
	padding-top: 30rpx;
	padding-right: 30rpx;
	padding-left: 30rpx;
	padding-bottom: 60rpx;
	box-sizing: border-box;
	&_item {
		padding: 30rpx;
		box-sizing: border-box;
		box-shadow: 0 0 10rpx 4rpx rgba(255, 255, 255, .5);
		margin-bottom: 40rpx;
		border-radius: 12rpx;
		&_label {
			font-size: 28rpx;
			color: #ffffff;
		}
		&_value {
			font-size: 28rpx;
			color: #ffffff;
			margin-left: 20rpx;
		}
		&_btn {
			font-size: 28rpx;
			color: #ffffff;
			background-color: #1FA2FF;
			padding: 0 60rpx;
			height: 70rpx;
			line-height: 70rpx;
			border-radius: 35rpx;
			text-align: center;
		}
		&_copy {
			padding: 10rpx;
			box-sizing: border-box;
			&_icon {
				width: 30rpx;
				height: 30rpx;
			}
		}
	}
}
</style>
