<template>
	<view>
		<l-common-navbar :isCustomBack="true" @back="$utils.jump('/pages/bindGoogle/bindGoogle')" />
		<view class="content">
			<view class="content_title">{{$t('srqrm')}}</view>
			<view class="content_desc">{{$t('srqrm1')}}</view>
			<view class="code">
				<input @input="bindGoogle" class="code_input" type="number" v-model="code" />
				<view class="code_list">
					<view class="code_list_item" v-for="(item,index) in 6" :key="index">{{codeList[index]}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			codeList: function(){
				let list = this.code.toString().split('')
				return list
			}
		},
		data() {
			return {
				secret: '',
				code: ''
			}
		},
		onLoad({secret = ''}) {
			this.secret = secret
		},
		methods: {
			bindGoogle() {
				// 判断
				if(this.code.length < 6) return
				this.$https.initDataToken({
				  url: 'bindGoogle',
				  type: 'POST',
				  data: {
					  secret: this.secret,
					  code: this.code,
					  lang: this.$store.state.lang || 'en'
				  }
				}, (res, msg) => {
					// 你已成功关联谷歌验证器
					uni.showToast({
						title: msg,
						icon: 'none'
					})
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/setting/left_menu'
						})
					},800)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding-top: 60rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		box-sizing: border-box;
		&_title {
			font-size: 44rpx;
			color: #ffffff;
			font-weight: 700;
		}
		&_desc {
			font-size: 28rpx;
			color: #ffffff;
			margin-top: 60rpx;
		}
	}
	.code {
		position: relative;
		margin-top: 200rpx;
		height: 86rpx;
		&_input {
			height: 86rpx;
			width: 1000rpx;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 2;
			opacity: 0;
		}
		&_list {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 20rpx;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			z-index: 1;
			&_item {
				width: 86rpx;
				height: 86rpx;
				border: 4rpx solid #999999;
				font-size: 42rpx;
				font-weight: 700;
				color: #ffffff;
				text-align: center;
				line-height: 86rpx;
			}
		}
	}
</style>
