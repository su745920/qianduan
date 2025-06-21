<template>
	<view>
		<l-common-navbar />
		<view class="page">
			<view class="list">
				<view class="list_item d-flex align-items-center justify-content-between">
					<view class="list_item_label">{{$t('loan.d6')}}: </view>
					<view class="list_item_value">{{ totalRepaymentMoney }} USDT</view>
				</view>
				<view class="list_item d-flex align-items-center justify-content-between">
					<view class="list_item_label">{{$t('loan.e5')}}: </view>
					<view class="d-flex align-items-center">
						<input @input="onInput" v-model="formData.repayment_amount" class="list_item_input" type="digit" :placeholder="$t('loan.e6')" />
						<view class="list_item_value">USDT</view>
					</view>
				</view>
				<view class="list_item d-flex align-items-center justify-content-between">
					<view class="list_item_label">{{$t('loan.a8')}}: </view>
					<view class="d-flex align-items-center" @click="showSelect = true">
						<image :src="'/static/image/icon/icon-' + selectCoin.text + '.png'"
							style="width: 34rpx; height: 34rpx;"></image>
						<text class="font-size-32 ml-18" style="color: #ffffff;">{{selectCoin.text}}{{selectCoin.subText ? ` (${selectCoin.subText})` : ''}}</text>
						<u-icon name="arrow-right" size="30rpx" color="#ffffff"></u-icon>
					</view>
				</view>
				<view class="list_item d-flex align-items-center justify-content-between">
					<view class="list_item_label">{{$t('loan.e8')}}: </view>
					<view class="list_item_value">{{ formData.repayment_number }}</view>
				</view>
				<view class="list_item">
					<view class="p-30 box-shadow border-radius-20 mx-auto"
						style="width: 230px;background: #ffffff;padding: 10px;">
						<uqrcode ref="uqrcode" class="d-inline-block"></uqrcode>
					</view>
					<button class="save-button connect_btn" style="color: #000000;"
						@click="saveQrcode">{{$t('fund.saveQrcode')}}</button>
					<view class="p-0 position-relative  border-radius-20 font-weight-bold mt-20 bg-black text-white"
						style="display: flex;justify-content: space-between;flex-direction: column;align-items: center;">
						<text class="font-size-26"
							style="word-wrap: break-word;color: #ffffff;text-align: left;padding-left: 0px;">{{address}}</text>
						<img src="@/static/toobit/icon_copy.png" @click="onCopy" class="iconfont icon-fuzhi font-size-60"
							style="width: 16px;height: 16px;padding: 10px;">
					</view>
				</view>
				<view class="list_item">
					<view class="list_item_label">{{$t('loan.e9')}}: </view>
					<view class="voucher">
						<l-upload :src="formData.repayment_voucher" @change="imageChange"></l-upload>
					</view>
				</view>
				<button :disabled="disabled" class="warning-button mt-70 connect_btn" @click="submit">{{$t('loan.e10')}}</button>
			</view>
		</view>
		<u-action-sheet :list="coins" v-model="showSelect" :safe="true"  @click="confirmSelect"
			:cancelText="$t('common.cancel')"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailId: null,
				addressImage: '',
				address: '',
				selectCoin: {
					id: 23,
					text: 'USDT',
					subText: 'TRC20'
				},
				detailObj: {},
				formData: {
					repayment_voucher: '',
					repayment_amount: null
				},
				totalRepaymentMoney: 0, // 待还金额
				close: 1, // 最新市价
				showSelect: false,
				coins: [
					{
						id: 23,
						text: 'USDT',
						subText: 'TRC20'
					},
					{
						id: 231,
						text: 'USDT',
						subText: 'ERC20'
					},
					{
						id: 57,
						text: 'USDC',
						subText: ''
					},
					{
						id: 35,
						text: 'ETH',
						subText: ''
					},
					{
						id: 32,
						text: 'BTC',
						subText: ''
					},
				],
				currentCoinIndex: 0,
				disabled: false
			};
		},
		onLoad({ id = null}) {
			this.detailId =  id
			this.getDetail()
			this.getRepaymentAddress();
			this.getRepaymentAddressList()
		},
		methods: {
			submit() {
				if(!this.formData.repayment_amount) {
					uni.showToast({
						title: this.$t('loan.e6'),
						icon: 'none'
					})
					return
				}
				if(!this.formData.repayment_voucher) {
					uni.showToast({
						title: this.$t('loan.f1'),
						icon: 'none'
					})
					return
				}
				this.$https.initDataToken({
					url: 'loan/repayment',
					type: 'POST',
					data: {
						id: this.detailId,
						currency: this.selectCoin.id,
						currency_name: this.selectCoin.text,
						payable_amount: this.detailObj.loan_money,
						repayment_amount: this.formData.repayment_amount,
						repayment_number: this.formData.repayment_number,
						repayment_voucher: this.formData.repayment_voucher,
						lang: this.$store.state.lang || 'en'
					}
				},(res,msg) => {
					if(res) {
						this.$utils.showToast(this.$t(msg))
						// 清空数据
						this.formData.repayment_voucher = ''
						this.formData.repayment_amount = null
						setTimeout(() => {
							uni.navigateBack()
						},800)
					}
				})
			},
			onInput() {
				this.formData.repayment_number = (Number(this.formData.repayment_amount) / Number(this.close)).toFixed(6)
			},
			getDetail() {
				this.$https.initDataToken({
					url: 'loan/detail',
					type: 'GET',
					data: {
						id: this.detailId
					}
				},(res,msg) => {
					if(res) {
						this.detailObj = res
						let total = (res.loan_money + res.interest + res.commission - res.already_money).toFixed(6)
						this.totalRepaymentMoney = total >= 0 ? total : 0
					}
				})
			},
			confirmSelect(index) {
				this.currentCoinIndex = index
				this.selectCoin = this.coins[index]
				this.getRepaymentAddress()
				if(this.selectCoin.text === 'USDT' || this.selectCoin.text === 'USDC') {
					this.close = 1
				}else {
					this.getLastPrice()
				}
			},
			imageChange(url) {
				this.formData.repayment_voucher = url
			},
			// 获取还款地址列表
			async getRepaymentAddressList() {
				this.$https.initDataToken({
					url: 'getRepaymentAddress',
					data: {
						currency: '',
						lang: uni.getStorageSync('lang')
					},
					type: 'POST'
				}, (res, msg) => {
					let list = res.address
					list = list.map(item => Number(item))
					for (let i = 0; i < this.coins.length; i++) {
						if(!list.includes(this.coins[i].id)){
							this.coins.splice(i,1)
						}
					}
					
				});
			},
			// 获取还款地址
			async getRepaymentAddress() {
				let {id,text,subText} = this.selectCoin;
				this.address = this.selectCoin.address;
	
				this.$https.initDataToken({
					url: 'getRepaymentAddress',
					data: {
						currency: id,
						lang: uni.getStorageSync('lang')
					},
					type: 'POST'
				}, (res, msg) => {
					this.address = res.address
					this.$refs.uqrcode.make({
						canvasId: 'qrcode',
						mode: 'canvas', // 默认为view
						size: 200,
						text: this.address
					}).then(res => {
						this.addressImage = res.tempFilePath
					})
				});
			},
			// 获取币种最新市价
			getLastPrice() {
				this.disabled = true
				this.$https.initData({
				  url: 'getHbDetail?coin=' + this.selectCoin.text.toUpperCase(),
				  type: 'GET'
				},(res,msg)=> {
					let close= Number(res.close);
					this.close = close
					this.disabled = false
					this.onInput()
				})
			},
			saveQrcode() {
				const {
					addressImage
				} = this
				const _this = this
				// #ifdef H5
				uni.previewImage({
					urls: [addressImage]
				})
				// #endif
			
				// #ifdef APP-PLUS
				uni.saveImageToPhotosAlbum({
					filePath: addressImage,
					success: function() {
						_this.$utils.showToast(_this.$t("common.saveSuccess"))
					}
				});
				// #endif
			},
			onCopy(value) {
					uni.setClipboardData({
							data: this.address,
						});
						//
						uni.setClipboardData({
							data: this.address,
							success: () => {
								uni.hideToast();
								this.$nextTick(() => {
									const lang = uni.getStorageSync('lang') || 'en'
									if (lang == "zh" || lang == "zh_cn") {
										this.$u.toast("复制成功");
									} else {
										this.$u.toast("Success");
									}
					
								})
							}
						});
					
					},
				}
			}
</script>

<style lang="scss" scoped>
.page {
	padding-top: 30rpx;
	padding-right: 50rpx;
	padding-left: 50rpx;
	padding-bottom: 60rpx;
	box-sizing: border-box;
}
.list {
	&_item {
		margin-bottom: 40rpx;
		border-radius: 12rpx;
		&_label {
			font-size: 28rpx;
			color: #ffffff;
		}
		&_value {
			font-size: 28rpx;
			color: #ffffff;
			margin-left: 20rpx;
		}
		&_input {
			font-size: 28rpx;
			color: #ffffff;
			text-align: right;
			font-weight: 700;
		}
		&_btn {
			font-size: 28rpx;
			color: #ffffff;
			background-color: #1FA2FF;
			padding: 0 60rpx;
			height: 70rpx;
			line-height: 70rpx;
			border-radius: 35rpx;
			text-align: center;
		}
	}
}
.voucher {
	margin-top: 20rpx;
	height: 350rpx;
}
.save-button {
	background-color: $uni-color-warning;
	color: #fff;
	font-size: 22rpx;
	width: 50%;
	margin-top: 20rpx;
}
.connect_btn {
	background: -webkit-gradient(linear, left top, right top, color-stop(10%, #1FA2FF), color-stop(55.21%, #12D8FA), to(#A6FFCB));
	background: -webkit-linear-gradient(left, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
	background: -o-linear-gradient(left, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
	background: linear-gradient(90deg, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
}
</style>
