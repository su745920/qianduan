<template>
	<view>
		<u-navbar :title="i18n.mySubscribe" showback="true"></u-navbar>
		<view class="text-black">
			<view class="d-grid py-20 font-size-22 opacity-50" style="grid-template-columns:1.4fr .8fr 1fr 1fr 1.4fr;">
				<text class="d-block text-center" style="color: #ffffff;">{{i18n.subscriptionTime}}</text>
				<text class="d-block text-center"  style="color: #ffffff;">{{i18n.currency}}</text>
				<text class="d-block text-center"  style="color: #ffffff;">{{i18n.applicationsNumber}}</text>
				<text class="d-block text-center"  style="color: #ffffff;">{{i18n.passesNumber}}</text>
				<text class="d-block text-center"  style="color: #ffffff;">{{i18n.timeToMarket}}</text>
			</view>
			<block v-if="list.length">
				<view class="d-grid py-20 text-center align-items-center opacity-90"
					style="grid-template-columns:1.4fr .8fr 1fr 1fr 1.4fr;border-bottom: 1px solid #242424;" v-for="item in list">
					<view class="font-size-22">
						<text class="d-block" style="color: #ffffff;">{{item.created_at.slice(0,10)}}</text>
						<text class="d-block" style="color: #ffffff;">{{item.created_at.slice(10,20)}}</text>
					</view>
					<text class="font-weight-bold" style="color: #ffffff;">{{item.name}}</text>
					<text class="font-weight-bold" style="color: #ffffff;">{{Number(item.coin_amount)}}</text>
					<text class="font-weight-bold" style="color: #ffffff;">{{Number(item.give_amount)}}</text>
					<view class="font-size-22">
						<text class="d-block" style="color: #ffffff;">{{item.sell_begin.slice(0,10)}}</text>
						<text class="d-block" style="color: #ffffff;">{{item.sell_begin.slice(10,20)}}</text>
					</view>
				</view>
			</block>
			<default-page v-else></default-page>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				canGet:true,
				limit:10,
				list:[],
			};
		},
		onShow() {
			this.page = 1
			this.canGet = true
			this.list = []
			this.getIEOOrder()
		},
		methods:{
			getIEOOrder(){
				if(!this.canGet) return
				const {page,limit} = this
				// this.$u.api.ieo.getIEOOrder(page,limit).then(res=>{
        let data={page:this.page,limit:this.limit};
        this.$https.initDataToken({
          url: 'user/project/order',
          type: 'GET',
          data
        }, (res, msg) => {
          //console.log("订单===>"+JSON.stringify(res));
          const list = res.data
					if(list.length){
						this.list =list;
						//this.page++
					}else{
						this.canGet = false
					}
				})
			},
		},
		computed:{
			i18n(){
				return this.$t("ieo")
			}
		},
		onReachBottom() {
			this.getIEOOrder()
		}

	}
</script>

<style lang="scss">
page{
  background: #000000;
}
</style>
