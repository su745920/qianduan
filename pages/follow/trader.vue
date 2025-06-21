<template>
	<view class="pb-60 text-white">
		<u-navbar :title="i18n.traderList" showback="true"></u-navbar>
		<view class="mx-30 mt-30">
			<view class="box-shadow border-radius-20 pt-30 pb-40 px-28 mb-12" style="background: #242424;">
				<view class="d-flex align-items-center justify-content-between">
					<view class="d-flex align-items-center">
						<u-image :src="trader.head_portrait | retImageUrl" width="88" height="88" border-radius="50%"></u-image>
						<view class="ml-14">
							<view class="d-flex align-items-center">
								<text class="font-size-32 mr-8" style="color: #ffffff;">{{trader.nickname}}</text>
							</view>
							<text class="d-block font-size-22 opacity-50 mt-10" v-if="trader.signature" style="color: #ffffff;">{{trader.signature}}</text>
						</view>
					</view>
					<view class="d-flex align-items-baseline py-14 px-20 mt-20 border-radius-20 bg-333">
						<text class="font-size-22" style="color: #ffffff;">{{i18n.currentFollowerNumber}}:</text>
						<text class="font-weight-bold ml-10" :style="{color:$upColor}">{{data.follow_num}}</text>
					</view>
				</view>



				<view class="d-flex flex-wrap justify-content-between mt-8 text-center">
					<view class="nums-item">
						<text class="text-1" style="color: #ffffff;">{{i18n.totalProfitAndLoss}}</text>
						<text class="text-2" style="color: #ffffff;">{{Number(data.total_profits).toFixed(2)}}</text>
					</view>
					<view class="nums-item">
						<text class="text-1" style="color: #ffffff;">{{i18n.totalReturn}}</text>
						<text class="text-2" style="color: #ffffff;">{{Number(data.total_income_rate)}}%</text>
					</view>
					<view class="nums-item">
						<text class="text-1" style="color: #ffffff;">{{i18n.accuracy}}</text>
						<text class="text-2" style="color: #ffffff;">{{Number(data.correct_rate)}}%</text>
					</view>
					<view class="nums-item ">
						<text class="text-1" style="color: #ffffff;">{{i18n.profitableOrders}}</text>
						<text class="text-2" style="color: #ffffff;">{{data.profitCount}}</text>
					</view>
					<view class="nums-item">
						<text class="text-1" style="color: #ffffff;">{{i18n.successfulShortTrades}}</text>
						<text class="text-2" style="color: #ffffff;">{{data.fallCount}}</text>
					</view>
					<view class="nums-item">
						<text class="text-1" style="color: #ffffff;">{{i18n.successfulLongTrades}}</text>
						<text class="text-2" style="color: #ffffff;">{{data.riseCount}}</text>
					</view>
					<view class="nums-item ">
						<text class="text-1" style="color: #ffffff;">{{i18n.yesterdaysTradingStatus}}</text>
						<text class="text-2" style="color: #ffffff;">{{data.yesterday_profits}}</text>
					</view>
					<view class="nums-item">
						<text class="text-1" style="color: #ffffff;">{{i18n.currentPositions}}</text>
						<text class="text-2" style="color: #ffffff;">{{data.position_count}}</text>
					</view>
					<view class="nums-item">
						<text class="text-1" style="color: #ffffff;">{{i18n.totalOrders}}</text>
						<text class="text-2" style="color: #ffffff;">{{data.total_count}}</text>
					</view>

				</view>
			</view>

			<view class="product" style="color: #ffffff;">
				<text class="mt-40 active d-block font-weight-bold font-size-32" style="color: #000;">{{i18n.historicalCopy}}</text>
				<view class="d-grid text-center opacity-50 font-size-22 py-20 u-border-bottom align-items-center" style="grid-template-columns:1.2fr .5fr 1fr 1fr 1.2fr;grid-column-gap:10rpx">
					<text style="color: #ffffff;">{{i18n.tradingPair}}</text>
					<text>{{i18n.direction}}</text>
					<text>{{i18n.open}}</text>
					<text>{{i18n.lots}}</text>
					<text>{{i18n.time}}</text>
				</view>
				<view class="d-grid text-center py-20 u-border-bottom align-items-center" style="grid-template-columns:1.2fr .5fr 1fr 1fr 1.2fr;grid-column-gap:10rpx" v-for="item in historyOrder">
					<text style="color: #ffffff;">{{item.symbol}}</text>
					<text class="tag" :class="item.type == 1 ? 'tag-success' : 'tag-error'"> {{item.type == 1 ? i18n.buyIn : i18n.buyOut}} </text>
					<text>{{+item.price}}</text>
					<text>{{+item.share}}</text>
					<view class="font-size-24" v-if="item.transaction_time">
						<text class="d-block">{{item.transaction_time.slice(0,10)}}</text>
						<text class="d-block">{{item.transaction_time.slice(10,19)}}</text>
					</view>
				</view>
			</view>



			<button class="warning-button py-10 footer connect_btn" v-if="!is_followed" @click="$utils.jump('/pages/follow/follow?uid='+uid)" style="color: #000000;margin: 10px;border-radius: 4px;">{{i18n.followTrader}}</button>
			<button class="error-button py-10 footer connect_btn" v-else @click="cancelFollow" style="color: #000000;margin: 10px;border-radius: 4px;">{{i18n.cancelFollow}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid:0,
				page:1,
				canGet:true,
				trader:{},
				data:{},
				currentTraderNav:'current',
				is_followed:false,
				historyOrder:[]
			};
		},
		onLoad(options) {
			const {uid} = options
			if(!uid){
				this.$utils.showToast(this.$t("common.paramsWrong"))
				setTimeout(()=>{
					uni.navigateBack({
						delta:1
					})
				},1200)
				return
			}
			this.uid = uid
		},
		onShow() {
			this.getTraderInfo()
			this.getHistoryTrade()
		},
		methods:{
			getTraderInfo(){
        this.$https.initDataToken({
          url: "follow/traderDetail?trader_user_id="+this.uid,
          type: "GET"
        }, (res, msg) => {
					this.trader = res.trader_info
					this.data = res.data
					this.is_followed = res.is_followed
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
			cancelFollow(){
				this.$u.throttle(async ()=>{
					const ret = await this.$utils.showModal(this.$t("common.hint"),'确定取消跟随该交易员吗？')
					if(!ret) return

          let data={follow_user_id:this.uid};
          this.$https.initDataToken({
            url: "follow/cancel",
            type: "POST",
            data
          }, (res, msg) => {
						this.$utils.showToast(res)
						this.is_followed = false;

            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/index/index"
              })
            }, 1200)

					})

				},1000)


			}
		},
		computed:{
			i18n(){
				return this.$t("follow")
			}
		},
		filters:{
			getApy(item){
				switch(item.type){
					case 'regular':
						return item.value[item.activeValue].apy;
						break;
					case 'current':
						return item.apy;
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
  page{
    background: #000000;
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
			margin-top: 16rpx;
			font-weight: bold;
		}
	}

	.my-nav{
		display: flex;
		align-items: center;
		.item{
			font-size: 32rpx;
			margin-right: 42rpx;
			padding-bottom: 15rpx;
			position: relative;
			&::after{
				position: absolute;
				content: "";
				display: block;
				width: 42rpx;
				height: 6rpx;
				background-color: #fff;
				bottom: 0;
				left: 50%;
				margin-left: -21rpx;
				border-radius: 3rpx;
				transition: all .3s ease 0s;
			}
			&.active::after{
				background-color: #FF0000;
			}
		}
	}

	.product {
		margin-top: 20rpx;

		.item {
			@extend .border-radius-20,
			.box-shadow;
			padding: 20rpx;
			margin-bottom: 12rpx;
			display: flex;

			&.cannot{
				filter: grayscale(1);
				opacity: .5;
			}

			.image {
				width: 48rpx;
				height: 48rpx;
				margin-right: 20rpx;
			}

			.content {
				flex: 1;
			}

			.tag {
				height: 36rpx;
				line-height: 36rpx;
				border-radius: 8rpx 0 8rpx 0;
				color: #fff;
				padding: 0 8rpx;
				font-size: 22rpx;
			}

			.tag0 {
				@extend .tag;
				background-image: linear-gradient(#0270fb, #4b9cff);
			}

			.tag1 {
				@extend .tag;
				background-image: linear-gradient(#00e2c6, #00d285);
			}

			.remaining-day{
				border-radius: 8rpx;
				border:1px solid rgba(51,51,51,.3);
				margin-left: 20rpx;
				padding: 4rpx 10rpx;
				font-size: 22rpx;
			}

			.regular-values{
				flex: 1;
				border-radius: 8rpx;
				border: 2rpx solid rgba(51,51,51,.2);
				height: 52rpx;
				line-height: 52rpx;
				font-size: 28rpx;
				.value-item{
					width: 25%;
					text-align: center;
					border-radius: 8rpx;
					height: 100%;
					&.active{
						border: 2rpx solid rgb(249,32,77);
						background-color: rgb(255,236,242);
						color: #d91337;
						position: relative;
						left: -2rpx;
						right: -2rpx;
						top: -2rpx;
						height: calc(100% + 4rpx);
					}
				}
			}

			.buy{
				width: 120rpx;
				height: 52rpx;
				line-height: 52rpx;
				text-align: center;
				color: #fff;
				background-color: #f9204d;
				border-radius: 8rpx;
				font-size: 28rpx;
				margin-left: 10rpx;
			}
		}
	}

	.followers{
		.item{
			@extend .border-radius-20,
			.box-shadow;
			padding: 20rpx;
			margin-bottom: 12rpx;
			display: flex;
		}
	}

	.footer{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 10rpx 10rpx 0 0 ;
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
