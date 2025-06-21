<template>
	<view class="upload">
		<view class="upload_card" @click="onUpload">
			<image v-if="src" class="upload_card_image" :src="src" mode=""></image>
			<u-icon v-else name="camera-fill" size="60rpx" color="#666666"></u-icon>
		</view>
		<view v-if="title" class="upload_desc">{{title}}</view>
	</view>
</template>

<script>
	export default {
		name:"l-upload",
		props: {
			title: {
				type: String,
				default: ''
			},
			src: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			onUpload() {
				this.$utils.uploadImage().then(res => {
					if(res.type === 'error') {
						this.$utils.showToast(this.$t(res.message))
						return
					}
					this.$emit('change',res)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.upload {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: stretch;
	justify-content: center;
	flex-direction: column;
	&_card {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #2e2c2c;
		border-radius: 12rpx;
		&_image {
			width: 100%;
			height: 100%;
		}
	}
	&_desc {
		font-size: 24rpx;
		color: #ffffff;
		text-align: center;
		height: 80rpx;
		line-height: 32rpx;
		margin-top: 10rpx;
	}
}
</style>