<template>
	<view>
		<u-navbar :title="$t('c2c.detail')" showback="true"></u-navbar>
		<view class="m-30">
			<text class="d-block font-size-32 text-center" style="color: #ffffff">{{article.title}}</text>
			<view class="font-size-24 text-center mt-10" style="color: #999999;">{{article.created_at}}</view>
			<u-parse class="mt-20"  :html="article.content"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article:{}
			};
		},
		onLoad(options) {
			const {id} = options
			this.id = id
			this.getNewsDetail()
		},
		methods:{
			getNewsDetail(){
				this.$https.initDataToken({
				  url: 'user/mailDetail',
				  data: {
					  id: this.id
				  },
				  type: 'GET'
				}, (res, msg) => {
					this.article = res
					if(res.is_read == 0) {
						this.onReadMail()
					}
				})
			},
			onReadMail() {
				this.$https.initDataToken({
				  url: 'user/mailRead',
				  data: {
					  id: this.id
				  },
				  type: 'POST'
				}, (res, msg) => {
				})
			},
		}
	}
</script>

<style lang="scss">

</style>
