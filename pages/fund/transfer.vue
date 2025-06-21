<template>
	<view class="pb-50">
		<u-navbar :title="i18n.transfer" showback="true">

      <image src="/static/bib/order.webp" style="width: 58rpx; height: 58rpx;"   @click="$utils.jump('/pages/fund/transfer_history')"  slot="right"></image>
		</u-navbar>
		<view class="m-30">

			<u-subsection :list="nav" :current="currentNav" @change="tabsChange"
                    :button-color="$upColor"  bg-color="#f7f7f7"></u-subsection>

			<view class="bg-black text-white border-radius-10 p-30 mt-30">
				<view class="d-flex-between-center pb-30 u-border-bottom">
					<text class="opacity-75 font-size-32" style="color: #000;">{{i18n.from}}</text>
					<view class="" @click="showFromList=true">
						<text class="font-weight-bold font-size-32 mr-10"  style="color: #000;">{{fromCurrency.name}}</text>
						<u-icon name="arrow-down" size="32" style="color: #999999;"></u-icon>
					</view>
				</view>
				<u-action-sheet :list="transferCurrency" v-model="showFromList" @click="clickFromActionSheet" :cancelText="i18ncommon.cancel">
				</u-action-sheet>
				<view class="mt-30 transfer-input-group">
					<text class="d-block opacity-75 font-size-28"  style="color: #000;">{{i18n.transferNumber}}</text>
					<view class="position-relative mt-20">
						<input type="digit" v-model="from" class="input" @input="fromNumberChange" @blur="fromNumberBlur"
                   style="color: #000;"
							@focus="fromNumberFocus">
						<text class="fixed-currency"  style="color: #000;">{{fromCurrency.name}}</text>
					</view>
				</view>
				<view class="d-flex-between-center mt-20">
					<text class="opacity-75 font-size-22"  style="color: #000;">{{i18n.needHandlingFee}}</text>
					<text class="font-weight-bold font-size-28"  style="color: #000;">0 {{fromCurrency.name}}</text>
				</view>
			</view>
			<view class="text-center my-30">
				<text class="iconfont icon-zhuanhuan1 text-warning font-size-70" @click="exchange"></text>
			</view>
			<view class="bg-black text-white border-radius-10 p-30">
				<view class="d-flex-between-center pb-30 u-border-bottom">
					<text class="opacity-75 font-size-32"  style="color: #000;">{{i18n.to}}</text>
					<view class="" @click="showToList=true">
						<text class="font-weight-bold font-size-24 mr-10"  style="color: #000;">{{toCurrency.name}}</text>
						<u-icon name="arrow-down" size="32" style="color: #999999"></u-icon>
					</view>
				</view>
				<u-action-sheet :list="transferCurrency" v-model="showToList" @click="clickToActionSheet" :cancelText="i18ncommon.cancel">
				</u-action-sheet>
				<view class="mt-30 transfer-input-group">
					<text class="d-block opacity-75 font-size-32"  style="color: #000;">{{i18n.youGet}}</text>
					<view class="position-relative mt-20">
						<input type="text" v-model="to" class="input" disabled  style="color: #000;">
						<text class="fixed-currency"  style="color: #000;">{{toCurrency.name}}</text>
					</view>
				</view>
			</view>
			<view class="bg-black text-white border-radius-10 p-30 mt-30">
				<view class="d-flex-between-center pb-30">
					<text class="opacity-75 font-size-24"  style="color: #000;">{{i18n.availableQuota}}</text>
					<text class="font-weight-bold font-size-30"  style="color: #000;">{{balance.change_balance}} {{fromCurrency.name}}</text>
				</view>
				<view class="d-flex-between-center pb-30">
					<text class="opacity-75 font-size-24"  style="color: #000;">{{i18n.exchangeRate}}</text>
					<text class="font-weight-bold font-size-30"  style="color: #000;">{{ huilv }}</text>
				</view>
				<view class="d-flex-between-center pb-30">
					<text class="opacity-75 font-size-24"  style="color: #000;">{{i18n.handlingFee}}</text>
					<text class="font-weight-bold font-size-30"  style="color: #000;">0</text>
				</view>
			</view>
			<button class="warning-button mt-50"  style="color: #FFFFFF;"
              @click="submit">{{this.$t("common.confirm")}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentNav:0,
				nav: [{
					name: this.$t("fund.transfer")
				}, {
					name: this.$t("fund.fundTransfer")
				}],
				wallet: [],
				transferCurrency: [],
				from: 0,
				to: 0,
				fromCurrency: {
					id: 0
				},
				toCurrency: {
					id: 0
				},
				fee: {},
				balance: {},
				showFromList: false,
				showToList: false,
				handlingFee: 0,
				getInterval:null,
        //
        btcPrice:'',
        ethPrice:'',
        huilv:'0.00004340',

        usdt_btc:'',
        usdt_eth:'',
        btc_eth:'',
        eth_btc:'',

        usdtBalance:0,
        btcBalance:0,
        ethBalance:0,
        avaliableAmount:0,
			};
		},
		onShow() {
			// 获取币币划转的可用列表
			this.getTransferList()

			// this.getInterval = setInterval(()=>{
			// 	this.getTransferFee()
			// },3000)
		},
    onLoad: function (option) {
      this.getHq();
    },
		methods: {
      flushExamination(){
        let that= this;
        if (that.fromCurrency.name==="USDT"){
          that.avaliableAmount=that.usdtBalance;
        }
        if (that.fromCurrency.name==="BTC"){
          that.avaliableAmount=that.btcBalance;
        }
        if (that.fromCurrency.name==="ETH"){
          that.avaliableAmount=that.ethBalance;
        }
        if (that.fromCurrency.name==="USD"){
          that.avaliableAmount=that.usdBalance;
        }
        if (that.fromCurrency.name==="CNY"){
          that.avaliableAmount=that.cnyBalance;
        }
        that.b_usdcny = false;
        console.log(that.fromCurrency.name+" vs "+that.toCurrency.name);
        console.log("usdt:"+that.usdtBalance+",usd:"+that.usdBalance)
        if (that.fromCurrency.name==="USDT"&&that.toCurrency.name==="BTC"){
          that.huilv=that.usdt_btc;
        }
        else if (that.fromCurrency.name==="BTC"&&that.toCurrency.name==="USDT"){
          that.huilv=that.btcPrice;
        }
        else if (that.fromCurrency.name==="USD"&&that.toCurrency.name==="USDT"){
          that.huilv=that.usdPrice;
        }
        else if (that.fromCurrency.name==="CNY"&&that.toCurrency.name==="USDT"){
          that.huilv=that.cnyPrice;
        }
        else if (that.fromCurrency.name==="ETH"&&that.toCurrency.name==="BTC"){
          that.huilv=that.eth_btc;
        }
        else if (that.fromCurrency.name==="BTC"&&that.toCurrency.name==="ETH"){
          that.huilv=that.btc_eth;
        }
        else if (that.fromCurrency.name==="USDT"&&that.toCurrency.name==="USD"){
          that.huilv=that.usdt_usd;
        }
        else if (that.fromCurrency.name==="USDT"&&that.toCurrency.name==="CNY"){
          that.huilv=that.usdt_cny;
        }
        else if (that.fromCurrency.name==="USDC"&&that.toCurrency.name==="USDT"){
          that.huilv=that.usdcPrice;
        }
        else if (that.fromCurrency.name==="USDT"&&that.toCurrency.name==="USDC"){
          that.huilv=that.usdt_usdc;
        }
        else if (that.fromCurrency.name==="USDT"&&that.toCurrency.name==="ETH"){
          that.huilv=that.usdt_eth;
        }
        else if (that.fromCurrency.name==="ETH"&&that.toCurrency.name==="USDT"){
          that.huilv=that.ethPrice;
        }
        else {
          that.b_usdcny=true;
          that.huilv = 0;
        }
      },
      getHq() {
        let that = this;
        //uni.showLoading();
        this.$https.initDataToken({
          url: 'hb/hq',
          type: 'GET'
        }, (res, msg) => {
          //uni.hideLoading();

          //console.log("行情返回==" + JSON.stringify(res));
          that.btcPrice=res.btcPrice;
          that.ethPrice =res.ethPrice;

          that.btc_eth=res.btc_eth;
          that.eth_btc=res.eth_btc;

          that.usdt_eth=res.usdt_eth;
          that.usdt_btc=res.usdt_btc;

          that.usdtBalance=res.usdtBalance;
          that.btcBalance=res.btcBalance;
          that.ethBalance=res.ethBalance;
          that.usdBalance = res.usdBalance;
          that.cnyPrice = res.cnyPrice;
          that.usdPrice = res.usdPrice;
          that.usdcPrice = res.usdcPrice;
          that.usdt_cny = res.usdt_cny;
          that.usdt_usd = res.usdt_usd;
          that.usdt_usdc = res.usdt_usdc;
          that.huilv = res.usdt_btc;
        })


      },




			getTransferList() {
        let data={lang:uni.getStorageSync("lang")||"en"};
        this.$https.initDataToken({
          url: 'user/getTransferList',
          type: 'POST',
          data
        }, (res, msg) => {
          this.transferCurrency = res.transfer.map(item => {
						item.text = item.name
						return item
					})
					this.wallet = res.wallet

					this.fromCurrency = this.transferCurrency[0]
					this.balance = this.wallet.find(item => item.currency === this.fromCurrency.id)
					this.toCurrency = this.transferCurrency[1]
				})
			},
			getTransferFee() {
				// const {
				// 	fromCurrency,
				// 	toCurrency
				// } = this
				// if(!fromCurrency.id || !toCurrency.id) return
				// this.$u.api.wallet.getTransferFee(fromCurrency.id, toCurrency.id).then(res => {
				// 	let fee = res.message
				// 	fee.rate = parseFloat((Number(fee.form_price) / Number(fee.to_price)).toFixed(10))
				// 	this.fee = fee
				// })
			},




			//点击了from的操作菜单
			clickFromActionSheet(index) {
				this.fromCurrency = this.transferCurrency[index];
        this.flushExamination();
			},
			//点击了from的操作菜单
			clickToActionSheet(index) {
				this.toCurrency = this.transferCurrency[index];
        this.flushExamination();
			},
			//交换from和to
			exchange() {
				const change = this.fromCurrency
				this.fromCurrency = this.toCurrency
				this.toCurrency = change;
        this.flushExamination();
			},
			fromNumberChange(e) {
				const {
					balance,
					fee
				} = this
				const value = Number(e.detail.value)
				if (value > Number(balance.change_balance)) {
					this.from = Number(balance.change_balance)
					return this.$utils.showToast(this.$t("fund.insufficientBalance"))
				}
				this.to = Number((value * this.huilv).toFixed(10))
				this.handlingFee = Number((value * fee.fee).toFixed(10))
			},
			fromNumberFocus(e) {
				const value = Number(e.detail.value)
				if(!value){
					this.from = null
				}
			},
			fromNumberBlur(e){
				const value = Number(e.detail.value)
				if(!value){
					this.from = 0
				}
			},
			submit(){
				this.$u.throttle(async ()=>{
					const {from,fromCurrency,toCurrency,balance} = this
					if(!from || !this.$u.test.amount(from)){
						return this.$utils.showToast(this.$t("fund.plsIptCrtNumber"))
					}
					if (from > Number(balance.change_balance)) {
						return this.$utils.showToast(this.$t("fund.insufficientBalance"))
					}

					const ret = await this.$utils.showModal(this.$t("common.hint"),this.$t("fund.c_transfer"))
					if(!ret) return

          let data= {number:from,
            from_currency_id:fromCurrency.id,
            to_currency_id:toCurrency.id,
            lang:uni.getStorageSync("lang")||"en"
          }
          this.$https.initDataToken({
            url: 'user/Transfer',
            type: 'POST',
            data
          }, (res, msg) => {
						this.from = 0
						this.to = 0
						this.getTransferList()
						this.$utils.showToast(this.$t("common.success"))
					})

				},1000)
			},
			tabsChange(index) {
				if(index != this.currentNav){
					uni.redirectTo({
						url:'/pages/fund/fundTransfer'
					})
				}
			}
		},
		computed: {
			i18n() {
				return this.$t("fund")
			},
			i18ncommon() {
				return this.$t("common")
			}
		},
		watch: {
			'fromCurrency.id'(id) {
				this.getTransferFee()
				const {
					wallet
				} = this
				this.balance = wallet.find(item => item.currency == id)
			},
			'toCurrency.id'() {
				this.getTransferFee()
			},
		},

		onHide() {
			clearInterval(this.getInterval)
			this.getInterval = null
		},
	}
</script>
<style lang="scss" scoped>
	.transfer-input-group {

		.input {
			@extend .font-size-60;
			font-weight: bold;
			height: 100rpx;
			line-height: 100rpx;
			background-color: $uni-color-333;
			padding: 0 30rpx;
		}

		.fixed-currency {
			@extend .font-size-32;
			font-weight: bold;
			position: absolute;
			right: 30rpx;
			bottom: 30rpx;
		}
	}
</style>
