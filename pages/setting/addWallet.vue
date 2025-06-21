<template>
	<view class="text-white">
		<u-navbar :title="i18n.addWallet" showback="true"></u-navbar>
		<view class="mx-30">
			<view class="mt-36 input-item" @click="showSelectCurrency=true">
				<text class="d-block font-weight-bold font-size-28"
					style="color: #ffffff;">{{i18n.selectCurrency}}</text>
				<input type="hidden" class="input" style="color: #ffffff;border: 1px solid #666;"
					:placeholder="i18n.plsSelectCurrency" v-model="currency.name">
			</view>
			<view class="mt-36 input-item">
				<text class="d-block font-weight-bold font-size-28" style="color: #000;">{{i18n.walletAddress}}</text>
				<input type="text" class="input" style="color: #ffffff;border: 1px solid #666;"
					:placeholder="i18n.plsIptAddress" v-model="address">
			</view>
			<view class="mt-36 input-item">
				<text class="d-block font-weight-bold font-size-28" style="color: #ffffff;">{{i18n.walletQrcode}}</text>
				<view class="text-center" style="border: 1px solid #666;margin-top: 10px;">
					<view class="upload-wrap mt-30 ml-0" @click="uploadImage">
						<u-icon name="plus" size="40" v-if="!qrcode" style="color: #2A64FD;"></u-icon>
						<image class="w-100 h-100" :src="qrcode | retImageUrl" mode="aspectFill" v-else></image>
					</view>
				</view>
			</view>
			<button class="warning-button mt-70 connect_btn" style="color: #000000;"
				@click="submit">{{$t("common.submit")}}</button>
		</view>

		<!-- 弹出币种选择 -->
		<u-action-sheet :list="currencyList" v-model="showSelectCurrency" @click="confirmCurrency"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currency: {},
				currencyList: [{
						"id": 23,
						"name": "USDT(TRC20)",
						"text": "USDT(TRC20)",
					},
					{
						"id": 23,
						"name": "USDT(ERC20)",
						"text": "USDT(ERC20)",
					},
					{
						"id": 32,
						"name": "BTC",
						"text": "BTC",
					},
					{
						"id": 35,
						"name": "ETH",
						"text": "ETH",
					},
					{
						"id": 57,
						"name": "USDC",
						"text": "USDC",
					},
				],
				showSelectCurrency: false,
				address: '',
				qrcode: '',
				detailId: ''
			};
		},
		onLoad({id = ''}) {
			this.detailId = id
			if(id) {
				this.getDetail()
			}
		},
		onShow() {
			if(!this.detailId) {
				this.showSelectCurrency = true;
			}
		},
		methods: {
			// 获取详情
			getDetail() {
				this.$https.initDataToken({
					url: 'user/getPaymentMethod',
					type: 'GET',
					data: {
						id: this.detailId,
						lang: uni.getStorageSync("lang") || "en",
					}
				}, (res, msg) => {
					this.qrcode = res.upload_pic
					this.currency.name = res.coin 
					this.address = res.address
				})
			},
			getCurrencyList() {

				this.$https.initDataToken({
					url: 'currency/list',
					type: 'GET'
				}, (res, msg) => {
					this.currencyList = res.legal.map(el => {
						el.text = el.name
						return el
					})
				})
			},
			confirmCurrency(index) {
				this.currency = this.currencyList[index]
			},
			uploadImage() {
				this.$utils.uploadImage().then(res => {
					this.qrcode = res;

				})
			},
			submit() {
				this.$u.throttle(() => {
					const {
						qrcode,
						currency,
						address,
						i18n
					} = this
					if (!currency.name) {
						this.$utils.showToast(i18n.plsSelectCurrency)
						return false
					}

					if (!address) {
						this.$utils.showToast(i18n.plsIptWalletAddress)
						return false
					}

					if (this.$utils.charTest(address)) {
						this.$utils.showToast(this.$t("common.specialChart"))
						return false
					}

					// if (!qrcode) {
					// 	this.$utils.showToast(i18n.plsUploadWalletQrcode)
					// 	return false
					// }
					let data = {
						currency: currency.id,
						coin: currency.name,
						address: address,
						lang: uni.getStorageSync("lang") || "en",
						upload_pic: qrcode
					};
					let url = 'user/savePaymentMethod'
					if(this.detailId) {
						// 编辑
						url = 'user/editPaymentMethod'
						data.id = this.detailId
					}
					this.$https.initDataToken({
						url,
						type: 'POST',
						data
					}, (res, msg) => {
						console.log("上传钱包地址返回===>" + JSON.stringify(res));
						this.$utils.showToast(res)
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1200)
					})
				}, 1200)
			}
		},
		computed: {
			i18n() {
				return this.$t("setting")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.input {
		background-color: $uni-color-black;
	}

	.connect_btn {
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