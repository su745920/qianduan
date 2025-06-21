<template>
	<view class="pb-30 text-white">
		<u-navbar :title="i18n.traderList" showback="true" :custom-back="backFn">
			<navigator url="/pages/transaction/contract" slot="right" style="color: #2A64FB;">
        <image src="/static/icon_to_all.png" style="width: 52rpx; height: 52rpx;"></image>
			</navigator>
		</u-navbar>
		<!-- 内容 -->
		<view class="mx-30 mt-30" >
			<view class="deposit bg-black" v-if="true">
				<view class="d-flex align-items-center">
					<text class="d-block font-size-28 mr-10" style="color: #ffffff;">{{i18n.positionValuation}}</text>
					<text class="iconfont icon-yanjing_xianshi text-white font-size-36"></text>
				</view>
				<view class="mt-30">
					<view class="d-flex align-items-baseline">
						<text class="font-size-40 mr-20">0.00</text>
						<text class="font-size-22" style="color: #ffffff;opacity: .6;"></text>
					</view>
				</view>
				<view class="d-block font-size-22 opacity-50 mt-8" style="color: #FFFFFF;opacity: .6;"> ≈0.00 USDT </view>
				<view class="earnings-wrap">
					<view class="earnings font-size-22">
						<view class="d-flex justify-content-between opacity-50 font-size-22">
							<text style="color: #ffffff;opacity: .6;">{{i18n.estimatedProfitToday}}（USDT）</text>
							<text style="color: #FFFFFF;opacity: .6;">{{i18n.rateOfReturn}}</text>
						</view>
						<view class="d-flex justify-content-between font-size-22 mt-16">
							<text style="color: #FFFFFF;">0.00</text>
							<text style="color: #FFFFFF;">0%</text>
						</view>
					</view>
				</view>

				<view class="dealer"  @click="$utils.jump('/pages/follow/apply_trader');">
					<text class="mr-10" style="color: #000;opacity: 0.8;">{{i18n.becomeATrader}}</text>
					<image src="/static/image/icon/copytrade-icon-1.png" style="width: 19rpx;height: 24rpx;"></image>
				</view>


			</view>

			<view class="mt-60"  >
				<view class="d-flex align-items-center justify-content-between" style="margin-top: -30px;">
					<text class="font-size-32 font-weight-bold">{{i18n.traderList}}</text>
					<view class="d-flex align-items-center" v-if="false">
						<image :src="`/static/image/icon/copytrade-icon-${showOnlyHasLocation ? '3' : '2'}.png`"
							style="width: 22rpx;height: 22rpx;" @click="showOnlyHasLocation = !showOnlyHasLocation">
						</image>
						<text class="font-size-22 ml-10">{{i18n.onlyShowsThePosition}}</text>
					</view>
				</view>
				<text class="font-size-22 opacity-50 mt-10 d-block">{{i18n.theDataIsUpdatedEveryHour}}</text>

				<block v-if="false">
					<view class="sort-nav">
						<text v-for="(item,index) in sortNav.slice(0,4)" :key="item.name" class="item"
							:class="{active:index == activeSotrNav}" @click="activeSotrNav=index">{{item.name}}</text>
						<text class="item" style="padding-left: 16rpx;padding-right: 16rpx;"
							@click="showSelectSortNav=true">...</text>
					</view>
					<u-action-sheet :list="actionSheetSortNav" v-model="showSelectSortNav"></u-action-sheet>
				</block>

				<!-- 交易员列表 -->
				<view class="list mt-20" >
					<view class="item" v-for="item in list" @click="$utils.jump('/pages/follow/trader?uid='+item.id)">

            <view style="background: #242424;margin: 0px;padding: 10px;">
						<view class="d-flex align-items-center justify-content-between">
							<view class="d-flex align-items-center">
								<u-image :src="item.head_portrait | retImageUrl" width="88" height="88" :border-radius="500">
									<u-image slot="error" src="../../static/image/icon/nft-product-bg.png" width="100%" height="100%"></u-image>
								</u-image>
								<view class="ml-14">
									<view class="d-flex align-items-center">
										<text class="font-size-32 mr-12" style="color: #ffffff;">{{item.nickname}}</text>
										<view class="user-num">
											<text class="iconfont icon-wode1 font-size-26"></text>
											<text
												class="font-size-22 ml-8" style="color: #ffffff;">{{item.follow_num}}</text>
										</view>
									</view>
<!--								<text class="d-block font-size-22 opacity-50 mt-10">{{item.user.signature}}</text>-->
								</view>
							</view>

							<text v-if="item.is_followed == 1" class="status-1" @click="cancel(item.id)"  >{{i18n.following}}</text>
							<text v-else class="status-2 connect_btn"  >{{i18n.follow}}</text>

						</view>
						<view class="d-grid-columns-2">
							<view class="nums-item">
								<text class="text-1" style="color: #ffffff;">{{i18n.totalProfit}}</text>
								<text class="text-2"  style="color: #ffffff;">{{Number(item.total_profits).toFixed(2)}}%</text>
							</view>
							<view class="nums-item">
								<text class="text-1"  style="color: #ffffff;">{{i18n.correctRate}}</text>
								<text class="text-2" style="color: #ffffff;">{{item.correct_rate}}</text>
							</view>

						</view>
            </view>


					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				page:1,
				canGet:true,
				list:[],
				sortNav: [{
					name: '综合排名',
				}, {
					name: '近2周收益',
				}, {
					name: '累计收益',
				}, {
					name: '累计交易笔数',
				}, {
					name: '当前跟随人数',
				}, {
					name: '近2周胜率',
				}],
				activeSotrNav: 0,
				showOnlyHasLocation: false,
				showSelectSortNav: false,
			};
		},
		onShow() {
			this.page = 1;
			this.canGet = true;
			this.list = []
			this.getTraderList()
		},
		methods:{
      backFn(){
        uni.switchTab({
          url: '/pages/index/index'
        })
      },
      getHistoryTrade(){
        this.$https.initDataToken({
          url: "follow/historyTrade?trader_user_id="+this.uid,
          type: "GET"
        }, (res, msg) => {
          this.historyOrder = res.data || []
        })
      },

			getTraderList(){
				if(!this.canGet) return
        this.$https.initDataToken({
          url: "follow/index?page="+this.page,
          type: "GET"
        }, (res, msg) => {
					const list = res.data
					if(list.length){
						this.list = list;
						this.page++
					}else{
						this.canGet = false
					}
				})
			},
			async cancel(id){
				const {i18n} = this
				const ret = this.$utils.showModal(this.$t("common.hint"),i18n.confirmCancel)
				if(!ret) return

			}
		},
		computed: {
			i18n(){
				return this.$t("follow")
			},
			actionSheetSortNav() {
				return this.sortNav.map((item, index) => {
					item.text = item.name;
					item.disabled = false;
					if (index == this.activeSotrNav) item.disabled = true;
					return item
				})
			}
		},
		onReachBottom() {
			this.getTraderList()
		}
	}
</script>
<style lang="scss" scoped>
  page{
    background: #000000;
  }
	.deposit {
		@extend .border-radius-20;
		color: white;
		padding: 0 28rpx;
		padding-top: 38rpx;
		position: relative;

		.earnings-wrap {
			margin: 0 -28rpx;
			margin-top: 30rpx;

			.earnings {
				padding: 30rpx 28rpx 28rpx 28rpx;
				background-color: rgba(255, 255, 255, .1);
			}
		}

		.dealer {
			position: absolute;
			top: 26rpx;
			right: 0;
			color: #7f612e;
			border-radius: 31rpx 0 0 31rpx;
			background-image: linear-gradient(to right, #d9c39b, #fef8cb);
			padding: 14rpx 44rpx;
			display: flex;
			align-items: center;
		}
	}

	.sort-nav {
		margin-top: 16rpx;
		display: flex;
		justify-content: space-between;

		.item {
			font-size: 26rpx;
			color: rgba(51, 51, 51, .5);
			border: 1px solid #eff2fb;
			background-color: #eff2fb;
			border-radius: 8rpx;
			padding: 2rpx 7rpx;
			margin-right: 12rpx;

			&.active {
				background-color: #fff;
				border: 1px solid #d6173a;
				color: #d6173a;
			}
		}
	}

	.list {
		.item {

			@extend .box-shadow,
			.border-radius-20,
			.pt-2,
			.pb-2,
			.px-0,
			.bg-black,
			.mb-8;

			.user-num {
				@extend .d-flex,
				.align-items-center;
				border-radius: 6rpx;
				background-color: #242424;
				color: #ffffff;
				padding: 2rpx 8rpx;
			}

			.status {
				font-size: 28rpx;
				padding: 8rpx 20rpx;
				border-radius: 8rpx;
				//border: 2rpx solid #fc7600;
			}

			.status-1 {
				@extend .status;
				//color: #fc7600;
				//border-color: #fc7600;
			}

			.status-2 {
				@extend .status;
				color: #000000;
				//border-color:transparent;
				//background-color: transparent;
			}

			.nums-item {
				width: 33.33%;
				margin-top: 20rpx;

				text {
					display: block;
				}

				.text-1 {
					font-size: 22rpx;
					opacity: .5;
				}

				.text-2 {
					font-size: 32rpx;
					margin-top: 12rpx;
				}
			}
		}
	}
  .connect_btn{
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
