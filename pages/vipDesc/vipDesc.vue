<template>
	<view>
		<l-common-navbar title="VIP" />
		<view class="content" :isCustomBack="true" @back="$utils.jump('/pages/setting/setting')">
			<!-- <view class="content_title">{{title}}</view> -->
			<u-parse class="mt-20" :html="content"></u-parse>
			<view class="table mt-50">
				<view class="table_row d-flex align-items-center">
					<view class="table_row_col">{{$t('member_level')}}</view>
					<view class="table_row_col">{{$t('recharge_amount')}}</view>
				</view>
				<view class="table_row d-flex align-items-center" v-for="(item,index) in listData" :key="index">
					<view class="table_row_col">{{item.label}}</view>
					<view class="table_row_col">{{item.value}} USDT</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: [],
				title: '',
				content: ''
			}
		},
		onLoad() {
			this.getVipDesc()
			this.getVipList()
		},
		methods: {
			getVipList(){
				this.$https.initData({
				  url: 'news/level_list',
				  type: 'GET'
				}, (res, msg) => {
					let arr = []
					for (let i = 0; i <= 10; i++) {
						if(i > 0) {
							arr.push({
								label: 'VIP' + i,
								value: res['lv' + i]
							})
						}
					}
					this.listData = arr
				})
			},
			getVipDesc() {
				let data={
				  c_id: 24,
				  page: 1,
				  lang: this.$store.state.lang || 'en'
				};
				this.$https.initData({
				  url: 'news/list',
				  data,
				  type: 'POST'
				}, (res, msg) => {
				  const list = res.list
				  if (list.length > 0) {
					this.title = list[0].title
				    this.content = list[0].content
				  }
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0 30rpx;
		box-sizing: border-box;
		&_title {
			font-size: 32rpx;
			font-weight: 700;
			text-align: center;
		}
		.table {
			border-top: 1rpx solid #999999;
			border-left: 1rpx solid #999999;
			&_row {
				border-bottom: 1rpx solid #999999;
				&_col {
					flex: 1;
					font-size: 28rpx;
					color: #ffffff;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					border-right: 1rpx solid #999999;
				}
			}
		}
	}
</style>
