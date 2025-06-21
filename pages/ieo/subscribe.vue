<template>
	<view class="text-white">
		<u-navbar :title="i18n.applySubscription"  showback="true"></u-navbar>
		<view class="m-30">
			<view class="p-30 box-shadow border-radius-20" style="background: #242424;">
				<text class="d-block font-size-32 pb-20" style="color: #ffffff;border-bottom: 1px solid #333;">{{project.title}}</text>
				<view class="d-flex-between-center mt-20">
					<text class="opacity-50 font-size-24"  style="color: #ffffff;">{{i18n.subscribeCurrency}}</text>
					<view class="d-flex align-items-center" @click="showSelectCurrency = true">
						<text
							class="font-weight-bold font-weight-bold mr-12"  style="color: #ffffff;">{{currencys[currentCurrencyIndex].name}}</text>
						<u-icon name="arrow-down"></u-icon>
					</view>
					<u-action-sheet :list="currencys" v-model="showSelectCurrency" @click="selectCurrency">
					</u-action-sheet>
				</view>
				<view class="d-flex-between-center mt-20">
					<text class="opacity-50 font-size-24"  style="color: #ffffff;">{{i18n.issuancePrice}}</text>
					<text class="font-weight-bold font-weight-bold"  style="color: #ffffff;">
						1 {{project.currency_name}} = {{issuancePrice + ' ' + currencys[currentCurrencyIndex].name}}
					</text>
				</view>
				<view class="d-flex-between-center mt-20">
					<text class="opacity-50 font-size-24"  style="color: #ffffff;">{{i18n.totalIssuance}}</text>
					<text
						class="font-weight-bold font-weight-bold"   style="color: #ffffff;">{{project.amount + ' ' + project.currency_name}}</text>
				</view>
				<view class="d-flex mt-20 justify-content-end">
					<navigator :url="`/pages/common/webView?url=${project.link}`" class="opacity-50 font-size-24">
						{{i18n.website}}</navigator>
					<navigator :url="`/pages/common/webView?url=${project.link}`" class="opacity-50 font-size-24 ml-20">
						{{i18n.whitePaper}}</navigator>
				</view>
			</view>
			<view class="p-30 box-shadow border-radius-20 mt-40"  style="background: #242424;">
				<text class="d-block font-size-32 pb-20"  style="color: #ffffff;border-bottom: 1px solid #333;">{{i18n.subscriptionCycle}}</text>
				<view class="d-flex-between-center mt-20">
					<text class="opacity-50 font-size-24"  style="color: #ffffff;">{{i18n.shengou}}</text>
					<text class="font-weight-bold font-weight-bold"  style="color: #ffffff;">{{project.start_at}}</text>
				</view>
				<view class="d-flex-between-center mt-20">
					<text class="opacity-50 font-size-24"  style="color: #ffffff;">{{i18n.finish}}</text>
					<text class="font-weight-bold font-weight-bold"  style="color: #ffffff;">{{project.end_at}}</text>
				</view>
			</view>
			<view class="p-30 box-shadow border-radius-20 mt-40"  style="background: #242424;">
				<text class="d-block font-size-32 pb-20"  style="color: #ffffff;border-bottom: 1px solid #333;">{{i18n.projectDetails}}</text>
				<view class="mt-20">
					<view class="" v-html="project.content"  style="color: #ffffff;"></view>
				</view>
			</view>
		</view>
		<view class="footer">
			<button class="warning-button font-size-28 connect_btn" @click="showSubscribe=true"  style="color: #000000;">{{i18n.applySubscription}}</button>
		</view>

		<u-popup v-model="showSubscribe" mode="center" length="80%" :border-radius="0"
             contentBackgroundColor="#000000"
             :mask-custom-style="{background: 'rgba(0, 0, 0, 0.6)'}">
			<view class="p-30" style="background: #242424;border: 1px solid #444;border-radius: 10px;">
				<input type="number" v-model="amount" class="ieo-input" style="color: #ffffff;" placeholder-style="color:#929292"
               :placeholder="i18n.p_applicationsNumber" @input="input">
				<view class="d-flex-between-center mt-20">
					<text class="opacity-50 font-size-24"   style="color: #ffffff;">{{i18n.needToPay + currencys[currentCurrencyIndex].name}}</text>
					<text class="font-weight-bold font-weight-bold"   style="color: #ffffff;">{{needPay}}</text>
				</view>
				<view class="d-flex-between-center mt-20">
					<text class="opacity-50 font-size-24"  style="color: #ffffff;">{{i18n.currentBalance}}</text>
					<text class="font-weight-bold font-weight-bold"  style="color: #ffffff;">{{balance.earn_balance}}</text>
				</view>
				<view class="d-flex-between-center mt-20">
					<text class="opacity-50 font-size-24"   style="color: #ffffff;">{{i18n.issuancePrice}}</text>
					<text class="font-weight-bold font-weight-bold"  style="color: #ffffff;">
						1 {{project.currency_name}} = {{issuancePrice + ' ' + currencys[currentCurrencyIndex].name}}
					</text>
				</view>
				<button class="warning-button font-size-24 mt-30 connect_btn" @click="submit"  style="color: #000000;">{{i18n.subscribe}}</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				project_id: 0,
				project: {},
				currentCurrencyIndex: 0,
				currencys: [],
				showSelectCurrency: false,
				showSubscribe: false,
				balance: {},
				needPay:0,
				amount:null,
			};
		},
		onLoad(options) {
			const {
				project_id
			} = options
			if (!project_id) {
				this.$utils.showToast(this.$t("common.paramsWrong"))
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 1000)
				return
			}
			this.project_id = project_id

			this.currencys = this.$store.state.coins.filter(item => item.subName != "OMNI").map(el => {
				el.text = el.name
				return el
			})
		},
		onShow() {
			this.getProjectDetail()
			this.getWalletDetail()
		},
		methods: {
			getProjectDetail() {
        this.$https.initDataToken({
                url: 'project/detail?project_id='+this.project_id,
                type: 'GET'
              }, (res, msg) => {
              //console.log(JSON.stringify(res));
					    this.project = res.info;
				})
			},
			selectCurrency(index) {
				this.currentCurrencyIndex = index
				this.getWalletDetail()
			},
			getWalletDetail() {
				const {
					project,
					currencys,
					currentCurrencyIndex
				} = this
				const currency_id = currencys[currentCurrencyIndex].id
				//this.$u.api.market.getWalletDetail(currency_id, 'change').then(res => {
        let data={currency:currency_id,type:'change'};
        this.$https.initDataToken({
          url: 'wallet/detail',
          type: 'POST',
          data
        }, (res, msg) => {
					this.balance = res
				})
			},
			input(e){
				const val = Number(e.detail.value)
				this.needPay = parseFloat((val * this.issuancePrice).toFixed(8))
			},
			submit(){
				this.$u.throttle(()=>{
					const {amount,currencys,currentCurrencyIndex,needPay:price,project_id,balance,i18n} = this
					if(!amount || !this.$u.test.amount(amount)){
						return this.$utils.showToast(i18n.p_number)
					}
					if(price > Number(balance.earn_balance)){
						return this.$utils.showToast(i18n.insufficientBalance)
					}
					const pay_currency = currencys[currentCurrencyIndex].id
					//this.$u.api.ieo.subscribeIEO(project_id,amount,pay_currency,price).then(res=>{
          let data={project_id:project_id,amount:amount,pay_currency:pay_currency,price:price,lang:uni.getStorageSync("lang")};
            this.$https.initDataToken({
              url: 'project/order',
              type: 'POST',
              data
            }, (res, msg) => {
            //console.log("订购返回==>"+JSON.stringify(res));
						this.$utils.showToast(res)
						this.showSubscribe = false
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1200)
					})
				},1200)

			}
		},
		computed: {
			i18n() {
				return this.$t("ieo")
			},
			issuancePrice() {
				const {
					project,
					currencys,
					currentCurrencyIndex
				} = this
				switch (currencys[currentCurrencyIndex].name) {
					case 'USDT':
						return project.price;
					case 'BTC':
						return project.btc_price || 0;
					case 'ETH':
						return project.eth_price || 0;
				}
				return project.price;
			}
		},
	}
</script>

<style lang="scss" scoped>
page{
  background: #000000;
}
	body,
	page,
	html {
		padding-bottom: 120rpx;
	}

	.footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		@extend .box-shadow;
		padding: 30rpx;
		border-radius: 20rpx 20rpx 0 0;
	}

	.ieo-input {
		border: 2rpx solid #eee;
		border-radius: 10rpx;
		display: block;
		padding: 10rpx 20rpx;
		font-weight: bold;

		.input-placeholder {
			font-size: 22rpx;
			color: rgba(51, 51, 51, 0.4);
			font-weight: normal;
		}
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
