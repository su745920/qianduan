<template>
	<view class="pb-50">
		<navbar2024 :title="'IEO'+i18n.subscribe" showback="true" :custom-back="backFn">
      <image src="/static/icon_to_all.png" style="width: 20px; height: 20px;"  @click="$utils.jump('/pages/ieo/order')"  slot="right"></image>
    </navbar2024>

		<view class="m-30">
			<view class="p-30 box-shadow border-radius-20 mb-20 text-white"  style="background: #242424;"   v-for="item in list">
				<text class="d-block font-size-30" style="color: #ffffff;">{{item.title}}</text>
				<view class="d-flex-between-center mt-20">
					<view class="d-flex align-items-baseline">
						<text class="opacity-50 font-size-24"  style="color: #ffffff;">{{i18n.lockPeriod}}:</text>
						<text class="font-weight-bold font-weight-bold ml-12"  style="color: #ffffff;">{{item.day + i18n.day}}</text>
					</view>
					<text class="tag tag-success" v-if="item.time_status === 2"  >{{i18n.ing}}</text>
					<text class="tag tag-error" v-else-if="item.time_status === 3"  >{{i18n.done}}</text>
				</view>
				<view class="d-grid-columns-2 mt-20">
					<view class="d-flex align-items-baseline">
						<text class="opacity-50 font-size-24"  style="color: #ffffff;">{{i18n.subscribed}}({{item.currency_name}}):</text>
						<text class="font-weight-bold font-weight-bold ml-12"  style="color: #ffffff;">{{parseFloat(item.total_sell)}}</text>
					</view>
					<view class="d-flex align-items-baseline">
						<text class="opacity-50 font-size-24"  style="color: #ffffff;">{{i18n.total}}({{item.currency_name}}):</text>
						<text class="font-weight-bold font-weight-bold ml-12"  style="color: #ffffff;">{{parseFloat(item.amount)}}</text>
					</view>
				</view>
				<view class="d-grid align-items-baseline" style="grid-template-columns:2fr 1fr">
					<u-line-progress  :show-percent="false" :percent="Number(item.percentage)" class="mt-20" v-if="item.percentage > 0"></u-line-progress>
					<u-line-progress  :show-percent="false" :percent="0" class="mt-20" v-else></u-line-progress>
					<view class="d-flex align-items-baseline justify-content-end">
						<text class="opacity-50 font-size-24"  style="color: #ffffff;">{{i18n.remaining}}:</text>
						<text class="font-weight-bold font-weight-bold ml-12"  style="color: #ffffff;">{{parseFloat(item.percentage)}}%</text>
					</view>
				</view>
				<button class="warning-button mt-20 font-size-24 py-0 connect_btn" v-if="item.time_status === 2"  style="color: #000000;"
                @click="$utils.jump('/pages/ieo/subscribe?project_id=' + item.id)">{{i18n.applySubscription}}</button>
			</view>
		</view>
	</view>
</template>

<script>
  import navbar2024 from "@/components/navbar2024.vue";
	export default {
    components:{
      navbar2024
    },
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
			this.getIEOProject()
		},
		methods:{
      backFn(){
        uni.switchTab({
          url: '/pages/index/index'
        })
      },
			getIEOProject(){
				if(!this.canGet) return
				const data = {page:this.page,limit:this.limit};

        this.$https.initData({
          url: 'project',
          data,
          type: 'GET'
        }, (res, msg) => {

          const list = res.list
					if(list.length){
						this.list = list;
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
			this.getIEOProject()
		}
	}
</script>

<style lang="scss">
page{
  background: #000000;
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
