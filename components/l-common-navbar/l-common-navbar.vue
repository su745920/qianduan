<template>
	<u-navbar :title="title" showback="true" :customBack="customBack">
		<template slot="right">
			<slot name="right">
				<view class="right-btn" @click="goHome">
				  <image class="right-btn_icon" src="@/static/bib/icon_home_menu.png"></image>
				</view>
			</slot>
		</template>
	</u-navbar>
</template>

<script>
	export default {
		name:"l-common-navbar",
		props: {
			title: {
				type: String,
				default: ''
			},
			isCustomBack: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			goHome() {
				uni.reLaunch({
					url: '/pages/setting/left_menu'
				})
			},
			customBack() {
				if(this.isCustomBack) {
					console.log('ss')
					this.$emit('back')
				}else {
					// #ifdef H5
					history.back()
					// #endif
					// #ifndef H5
					uni.navigateBack();
					// #endif
				}
			}
		}
	}
</script>

<style lang="scss" scope>
.right-btn {
	&_icon {
		width: 28px;
		height: 28px;
	}
}
</style>