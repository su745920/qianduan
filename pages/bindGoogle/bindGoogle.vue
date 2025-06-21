<template>
	<view>
		<l-common-navbar :isCustomBack="true" @back="$utils.jump('/pages/setting/left_menu')" />
		<view class="content">
			<view class="title">{{$t('sdscrz')}}(2FA)</view>
			<view class="desc">{{$t('smewm')}}</view>
			<view class="box">
				<view class="d-flex align-items-center justify-content-center mt-80">
					<image class="code-image" :src="codeUrl" mode=""></image>
				</view>
				<view class="d-flex mt-40">
					<text class="code-text">{{ secret }}</text>
					<view class="copy" @click="onCopy">
						<image class="copy_icon" src="@/static/icon_copy.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="submit" @click="goAuth">{{$t('qwyz')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				secret: '',
				codeUrl: ''
			}
		},
		onLoad() {
			this.getGoogleAuth()
		},
		methods: {
			getGoogleAuth() {
				this.$https.initDataToken({
				  url: 'getGInfo',
				  type: 'GET'
				}, (res, msg) => {
					this.codeUrl = res.qrcode
					this.secret = res.secret
				})
			},
			onCopy() {
				uni.setClipboardData({
					data: this.secret,
					showToast: false
				})
				uni.showToast({
					title: this.$t('bind.copyokin'),
					icon: 'none'
				})
			},
			goAuth() {
				uni.navigateTo({
					url: '/pages/googleAuth/googleAuth?secret=' + this.secret
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding-top: 60rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		box-sizing: border-box;
	}
.title {
	font-size: 42rpx;
	color: #ffffff;
	font-weight: 700;
}
.desc {
	font-size: 28rpx;
	color: #ffffff;
	margin-top: 60rpx;
}
.box {
	width: 500rpx;
	margin: auto;
}
.code-image {
 width: 500rpx;
 height: 500rpx;
}
.code-text {
	flex: 1;
	font-size: 28rpx;
	color: #999999;
}
.copy {
	&_icon {
		width: 40rpx;
		height: 40rpx;
	}
}
.submit {
	margin-top: 120rpx;
	background: linear-gradient(90deg, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
	font-size: 32rpx;
	color: #ffffff;
	height: 100rpx;
	line-height: 100rpx;
	border-radius: 12rpx;
	text-align: center;
}
</style>
