<template>
	<view>
		<l-common-navbar :title="$t('c2c.detail')" :isCustomBack="true" @back="onBack" />
		<view class="m-30">
			<text class="d-block font-size-32 text-center" style="color: #666666">{{article.title}}</text>
			<view class="font-size-28 text-center mt-10">{{article.create_time}}</view>
			<u-parse class="mt-20"  :html="article.content"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article:{},
				backUrl: '',
				isSwitchTab: 0
			};
		},
		onLoad(options) {
			const {id,backUrl,isSwitchTab = 0} = options
			this.id = id
			this.backUrl= backUrl
			this.isSwitchTab = isSwitchTab
		},
		onShow() {
			this.getNewsDetail()
		},
		methods:{
			onBack() {
				if(this.backUrl) {
					if(this.isSwitchTab == 1) {
						this.$utils.jump(this.backUrl,'switchTab')
					}else {
						this.$utils.jump(this.backUrl)
					}
				}else {
					this.$utils.jump('/pages/setting/left_menu')
				}
			},
			getNewsDetail(){
				this.$https.initData({
				  url: 'news/detail',
				  data: {
					  id: this.id
				  },
				  type: 'POST'
				}, (res, msg) => {
					this.article = res
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
