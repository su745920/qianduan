<template>
	<view class="pb-50 text-white">
		<u-navbar :title="i18n.lockming" showback="true"></u-navbar>
		<view class="deposit mt-30 mx-30">
			<view class="d-flex align-items-center">
				<text class="d-block font-size-28 mr-10"  style="color: #e1e1e1;">{{i18n.fundsUnderCustody}}</text>
			</view>
			<view class="mt-30">
				<view class="d-flex align-items-baseline">
					<text class="font-size-44 mr-20" style="color: #ffffff;">{{lockAllMoney}}</text>
					<text class="font-size-24"  style="color: #e1e1e1;">USDT</text>
				</view>
			</view>
			<view class="earnings-wrap">
				<view class="earnings d-grid-columns-3" style="display: flex;">
					<view class="" style="flex: 1;">
						<text class="d-block opacity-50" style="color: #f1f1f1;justify-content: center;text-align: center;">{{i18n.estimatedTodayIncome}}</text>
						<text class="d-block mt-10"  style="color: #FFFFFF;text-align: center;">{{todyShouyi}}%</text>
					</view>
					<view class=""  style="flex: 1;">
						<text class="d-block opacity-50" style="color: #f1f1f1;justify-content: center;text-align: center;">{{i18n.cumulativeIncome}}</text>
						<text class="d-block mt-10" style="color: #FFFFFF;text-align: center;">{{allShouyi}}</text>
					</view>
					<view class=""  style="flex: 1;">
						<text class="d-block opacity-50"  style="color: #f1f1f1;justify-content: center;text-align: center;">{{i18n.ordersInCustody}}</text>
						<text class="d-block mt-10" style="color: #FFFFFF;text-align: center;">{{orderCnt}}</text>
					</view>
				</view>
			</view>
			<view class="dealer" @click="$utils.jump('/pages/lockming/order')" style="opacity: 0.9;">
				<text class="mr-10">{{i18n.entrustedOrders}}</text>
			</view>
		</view>
		<view class="m-30">
			<view class="p-30  border-radius-20 mb-20" style="background: #242424;"  v-for="item in list">
				<view class="d-flex-between-center">
					<text class="font-size-32 font-weight-bold" style="color: #ffffff;">{{item.from_name + i18n.lockedPositionsToEarnCoins}}</text>
					<text class="font-size-28 px-20 connect_btn"
                style="border-radius: 10rpx;color: #000000;" @click="jump(item)"  >{{i18n.lockedPositions}}</text>
				</view>
				<view class="d-grid-columns-3 mt-30">
					<view class="">
						<text class="d-block font-size-28 opacity-50"  style="color: #ffffff;">{{i18n.minimumSingleTransaction}}</text>
						<text class="d-block font-size-28 mt-10 font-weight-bold"  style="color: #ffffff;">{{parseFloat(item.min_money)}}</text>
					</view>
					<view class="">
						<text class="d-block font-size-28 opacity-50" style="color: #ffffff;">{{i18n.dailyYield}}</text>
						<text class="d-block font-size-28 mt-10 font-weight-bold">
						  <text v-if="item.intro"  style="color: #ffffff;">{{item.intro}}</text>
							<text v-else  style="color: #ffffff;">{{parseFloat(item.rate_max)}}%</text>
						</text>
					</view>
					<view class="">
						<text class="d-block font-size-28 opacity-50"  style="color: #ffffff;">{{i18n.lockUpPeriod}}</text>
						<text class="d-block font-size-28 mt-10 font-weight-bold"  style="color: #ffffff;">{{item.day}}({{i18n.day}})</text>
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
				list: [],
				order:[],
				totalAmount:0,//正在托管的资金
				orderCount:0,//托管中的订单,
				day_rate:0,//日收益率
				total_interest:0,//累计收益


        orderCnt:0,
        lock_shouyi:0,
        lockAllMoney:0,
        todyShouyi:0,
			};
		},
		onShow() {
			// 获取锁仓挖矿列表
			this.getLockming()
			// 获取锁仓挖矿的订单
			this.getLockmingOrder()
		},
    onLoad() {
      this.getBigData();
    },
		methods: {
      getBigData() {
        let that = this;
        that.$https.initDataToken({
          url: 'lock_mining/bigData',
          type: 'GET'
        }, (res, msg) => {

          that.orderCnt = res.orderCnt;
          that.lock_shouyi= res.lock_shouyi;
          that.lockAllMoney=res.lockAllMoney;
          that.allShouyi=res.allShouyi;
          that.todyShouyi=res.todyShouyi;




        })
      },
			getLockming(){
				let that= this;
        that.$https.initDataToken({
          url: 'lockorder/getorder',
          type: 'GET'
        }, (res, msg) => {
          that.list = res;
				})
			},
			getLockmingOrder(){
        let that = this;
        let data={page:1,limit:9999};
        that.$https.initDataToken({
          url: 'lockorder/lists',
          type: 'GET',
          data
        }, (res, msg) => {
					let list = res.order_list || []
					this.totalAmount = list.reduce((total,item)=>{
						return total + Number(item.amount)
					},0)
					this.day_rate = list.reduce((total,item)=>{
						return total + Number(item.day_rate)
					},0)
					this.day_rate = Number(this.day_rate.toFixed(4))
					this.total_interest = list.reduce((total,item)=>{
						return total + Number(item.total_interest)
					},0)
					this.orderCount = list.length
				})
			},
			jump(item){
				uni.setStorageSync('lockming',item)
				uni.navigateTo({
					url:'/pages/lockming/buy'
				})
			}
		},
		computed: {
			i18n() {
				return this.$t("lockming")
			}
		}
	}
</script>

<style lang="scss" scoped>
page{
  background: #000000;
}
.dealer {
		position: absolute;
		top: 26rpx;
		right: 0;
		color: #2A64FB;
		border-radius: 31rpx 0 0 31rpx;
		background-image: linear-gradient(to right, #ffffff, #ffffff);
		padding: 14rpx 44rpx;
		display: flex;
		align-items: center;
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
