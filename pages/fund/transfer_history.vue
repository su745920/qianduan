<template>
	<view>
		<l-common-navbar :title="i18n.financialRecords" showback="true" :isCustomBack="true" @back="$utils.jump('/pages/fund/transfer2')" />
		<view class="m-30">
			<view class="p-20 box-shadow border-radius-20 mb-20 bg-black text-white" v-for="item in list">
				<view class="d-flex-between-center py-10 ">
					<text class="opacity-50" style="color: #ffffff;">{{i18n.currencyName}}</text>
					<text class="font-weight-bold" style="color: #ffffff;">{{item.currency_name}}</text>
				</view>
				<view class="d-flex-between-center py-10 ">
					<text class="opacity-50" style="color: #ffffff;">{{i18n.transactionInfo}}</text>
					<text class="font-weight-bold"  style="color: #ffffff;">{{item.transaction_info}}</text>
				</view>
				<view class="d-flex-between-center py-10 ">
					<text class="opacity-50" style="color: #ffffff;">{{i18n.number}}</text>
					<text class="font-weight-bold" :style="{color:$utils.getColor(item.value)}" style="color: #ffffff;">{{Number(item.value)}}</text>
				</view>
				<view class="d-flex-between-center py-10">
					<text class="opacity-50" style="color: #ffffff;">{{i18n.time}}</text>
					<text class="font-weight-bold" style="color: #ffffff;">{{item.created_time}}</text>
				</view>
				<view class="d-flex-between-center py-10">

					<text class="font-weight-bold" style="color: #ffffff;" v-if="lang==='vi'&&item.info==='funding划转Exchange' ">Tiền quỹ chuyển sang giao ngay</text>
          <text class="font-weight-bold" style="color: #ffffff;" v-else-if="lang==='vi'&&item.info==='funding划转Contracts' ">Tiền quỹ chuyển sang hợp đồng</text>
          <text class="font-weight-bold" style="color: #ffffff;" v-else-if="lang==='vi'&&item.info==='funding划转Option' ">Tiền quỹ chuyển sang tùy chọn</text>
          <text class="font-weight-bold" style="color: #ffffff;" v-else-if="lang==='vi'&&item.info==='funding划转Minging' ">Tiền quỹ chuyển sang tài chính</text>


          <text class="font-weight-bold" style="color: #ffffff;" v-else>{{item.info}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        lang:'',
				page:1,
				canGet:true,
				list:[]
			};
		},
		onShow() {
			this.page = 1
			this.canGet = true
			this.list = []
			this.getTransferHistory();
      this.lang = uni.getStorageSync('lang') || 'en';
		},
		methods:{
			getTransferHistory(){
				if(!this.canGet) return
        let data={page:this.page};
        this.$https.initDataToken({
          url: 'wallet/hzhistory',
          data,
          type: 'GET'
        }, (res, msg) => {
					const list = res.data || []
					//console.log(list);
					if(list.length){
						this.list = [...this.list,...list]
						this.page++
					}else{
						this.canGet = false
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
			this.getTransferHistory()
		}
	}
</script>

<style lang="scss">
page{
  background: #000000;
}
</style>
