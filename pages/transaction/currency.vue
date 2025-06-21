<template>
	<view style="background: #000000;padding:0px;">
		<view style="margin: 5px;">
			<u-navbar showback="true" :custom-back="backFn" is-back="false"
				style="background: #000000;border-bottom: none;">
				<view class="d-flex font-weight-bold" @click="showSelectCoin=true"
					style="text-align: left;background: #000000;">

					<text class="font-size-36 mx-20"
						style="color: #ffffff;">{{ currency_name + '/' + legal_name }}</text>
					<image src="/static/icon_triangle_down_white_16.png"
						style="width:26px;height:26px;margin-left:-10px;margin-top: 0px;"></image>
				</view>


				<image src="/static/icon_my_home_paper_trade.png" slot="right" size="42"
					style="width: 20px;height:20px;"
					@click="$utils.jump(`/pages/transaction/spot_kline?currency_name=${currency_name}&currency_id=${currency_id}&legal_name=USDT`)">
				</image>

				<image src="@/static/bib/icon_home_menu.png" slot="right" size="42" @click="goHome"
					style="width: 20px;height:20px;margin-left: 20px;margin-right: 10px;"></image>


			</u-navbar>

			<view style="background: #000000;width: 100%;border: none;margin: 0;padding: 0;height: 200px;"
				v-if="showKlineChart">
				<topklinechart :currency_name="currency_name" :legal_name="legal_name" @getSocketData="getSocketData"
					@buyListFn="buyListFn" @sellListFn="sellListFn" @buyListCountFn="buyListCountFn"
					@sellListCountFn="sellListCountFn" @closeTopKlineFn="closeTopKlineFn" ref="child"
					style="margin-top:4px;width:100%;height: 200px;">
				</topklinechart>
			</view>


			<view class="px-10 py-10">
				<view class="d-flex-between-center" style="background: #000000;display: flex;flex-direction: row;"
					v-if="!showKlineChart">
					<view style="width:480rpx;">
						<timeKline :currency_name="currency_name" :legal_name="legal_name"
							@getSocketData="getSocketData" @buyListFn="buyListFn" @sellListFn="sellListFn"
							@buyListCountFn="buyListCountFn" @sellListCountFn="sellListCountFn" ref="child"
							style="margin-top: -44px;width: 480rpx;">
						</timeKline>
					</view>
					<view style="color: #ffffff;text-align: left;margin-left: -40px;">
						{{Number(symbolQuotation.now_price).toFixed(2)}}
					</view>
					<view style="flex:1;display: flex;">
					</view>
					<view style="display: flex;">
						<view
							style="justify-content: flex-end;align-items: flex-end;text-align: right;display: flex;flex-direction: row;"
							@click="showKlineChart=true;">
							<text
								style="color: #939393;font-size: 13px;line-height: 20px;height: 20px;">{{$t("more")}}</text>
							<image src="/static/icon_arrow_down_16.png"
								style="width: 20px;height: 20px;z-index: 99999;"></image>
						</view>
					</view>
				</view>

				<u-popup v-model="showMoreBottomMenu" mode="bottom" length="240" contentBackgroundColor="#000000"
					:mask-custom-style="{background: 'rgba(0, 0, 0, 0.6)'}" :border-radius="0">

					<view class="px-30 market" style="background: #121212;margin-top:0px;padding-top: 10px;">
						<view style="text-align: center;margin-top: -18px;">
							<image src="/static/icon_slide_handle.png"
								style="width:30px;height:4px;margin-top: 0px;padding-top: 0px;"></image>
						</view>

						<view
							style="height: 360px;width: 100%;display: flex;margin-top: 20px;background: transparent;justify-content:center;text-align: center;">

							<view
								style="flex: 1;margin-top: 0px;display: flex;flex-direction: column;text-align: center;align-items: center;">
								<image src="/static/bib/icon_my_home_novice_community.png"
									style="width: 22px;height: 22px;text-align: center;align-items: center;"
									@click="delOptional"></image>

								<text style="text-align: center;color: #ffffff;width: 100%;">{{$t("learn")}}</text>
							</view>

							<view
								style="flex: 1;margin-top: 0px;display: flex;flex-direction: column;text-align: center;align-items: center;">
								<image src="/static/icon_operate_rate.png"
									style="width: 22px;height: 22px;text-align: center;align-items: center;"
									@click="delOptional"></image>

								<text
									style="text-align: center;color: #ffffff;width: 100%;">{{$t("trading_Fee")}}</text>
							</view>

							<view
								style="flex: 1;margin-top: 0px;display: flex;flex-direction: column;text-align: center;align-items: center;">

								<image src="/static/icon_collect_yes.png"
									style="width: 22px;height: 22px;text-align: center;align-items: center;"
									v-if="optionalId>0" @click="delOptional"></image>
								<image src="/static/icon_collect_no.png" v-else @click="addOptional"
									style="width: 20px;height: 20px;text-align: center;align-items: center;"></image>

								<text
									style="text-align: center;color: #ffffff;width: 100%;">{{$t('add_favorities')}}</text>
							</view>
						</view>
					</view>
				</u-popup>

				<u-popup v-model="showLimitMarketPopUp" mode="bottom" length="240" contentBackgroundColor="#000000"
					:mask-custom-style="{background: 'rgba(0, 0, 0, 0.6)'}" :border-radius="0">

					<view class="px-30 market" style="background: #121212;margin-top:0px;padding-top: 10px;">
						<view style="text-align: center;margin-top: -18px;">
							<image src="/static/icon_slide_handle.png"
								style="width:30px;height:4px;margin-top: 0px;padding-top: 0px;"></image>
						</view>

						<view style="height: 20px;width: 100%;display: flex;flex-direction: column;
          margin-top: 10px;background: transparent;justify-content:center;text-align: center;">
							<view style="color: #ffffff;font-weight: 700;"
								@click="buyType=0;showLimitMarketPopUp=false;">{{$t('market_order')}}</view>

						</view>

						<view style="height: 20px;width: 100%;display: flex;flex-direction: column;
          margin-top: 20px;background: transparent;justify-content:center;text-align: center;">

							<view style="color: #ffffff;font-weight: 700;"
								@click="buyType=1;showLimitMarketPopUp=false;">{{$t('limit_order')}}</view>

						</view>

						<view style="height: 20px;width: 100%;display: flex;flex-direction: column;
          margin-top: 20px;background: transparent;justify-content:center;text-align: center;">

							<view style="color: #ffffff;font-weight: 700;" @click="showLimitMarketPopUp=false;">
								{{$t('c2c.cancel')}}</view>
						</view>



					</view>
				</u-popup>

				<u-popup v-model="showSelectCoin" mode="bottom" length="850" contentBackgroundColor="#000000"
					:mask-custom-style="{background: 'rgba(0, 0, 0, 0.6)'}" :border-radius="0">
					<view class="status_bar"></view>
					<view class="px-30 market" style="background: #121212;margin-top: 20px;">
						<view style="height: 10px;"></view>
						<view style="text-align: center;margin-top: -18px;">
							<image src="/static/icon_slide_handle.png"
								style="width:30px;height:4px;margin-top: 0px;padding-top: 0px;"></image>
						</view>

						<view class="search d-flex align-items-center py-20"
							style="background: #242424;height: 32px;border-radius: 12px;line-height: 32px;">
							<image src="/static/bib/icon_common_search.png"
								style="width: 15px;height: 15px;margin-left: 10px;margin-top:2px;">
								<input type="text" class="input" :placeholder="$t('common.search')"
									confirm-type="search" placeholder-style="font-size:13px;" @input="filterQuotation">
						</view>
						<!-- 切换 -->
						<scroll-view scroll-x style="width: 100%;">
							<view class="d-flex c-nav">
								<view @click="typeChange(index)" class="c-nav_item" :class="currentIndex === index ? 'c-nav_item-active' : ''" v-for="(item,index) in tabList" :key="index">{{item.name}}</view>
							</view>
						</scroll-view>
						<view class="d-grid py-20" style="grid-template-columns:1.1fr 1fr 1fr;">
							<view class="d-flex align-items-center font-size-22 opacity-50"
								v-for="(item,index) in quotationNav" :class="item.align">
								<text>{{ item.name }}</text>
							</view>
						</view>
						<scroll-view scroll-y="true" style="height: 600rpx;">
							<view class="market-item" v-for="item in quotation"
								@click="jump(item.currencyName,32,item.currency_id)">
								<view class="left">
									<text class="d-block">
										<text class="font-size-28 font-weight-bold"
											style="color: #ffffff;">{{ item.currencyName }}</text>
										<text class="font-size-22 opacity-50">/USDT</text>
									</text>
									<text
										class="d-block font-size-22 opacity-50">24H:{{ Number(item.volume) | setPrecision(2) }}
									</text>
								</view>
								<view class="text-center">
									<text class="d-block font-size-30 font-weight-bold">
										{{ item.close | setPrecision(2) }}
									</text>
								</view>
								<view class="">
									<view class="right" :style="{backgroundColor:$utils.getColor(item.change)}"
										style="border-radius:4px;width: 60px;font-size: 12px;height: 20px;line-height: 20px;">
										{{ Number(item.change).toFixed(2) + '%' }}
									</view>
								</view>
							</view>
						</scroll-view>

					</view>
				</u-popup>


				<view class="d-grid mt-0 align-items-center" style="grid-template-columns:1.2fr 2fr">
					<!-- 左侧交易行情 -->
					<view class="overflow-hidden" style="height: 690rpx;margin-top: -7px;" v-if="buyList.length">
						<view class="d-flex-between-center font-size-22 pb-10">
							<text style="color: #939393;">{{ i18n.price }}({{ currency_name }})</text>
							<text style="color: #939393;">{{ i18n.amount }}({{ legal_name }})</text>
						</view>
						<view class="">
							<view class="d-flex-between-center px-10 py-6 position-relative font-size-22"
								v-for="item in buyList.slice(0,10)">
								<text :style="{color:$downColor}">{{ Number(item[0]).toFixed(5) }}</text>
								<text class="opacity-75" style="color: #ffffff;">{{ Number(item[1]).toFixed(5) }}</text>

								<view class="position-absolute opacity-20" style="top: 0;bottom: 0;right: 0;"
									:style="{background:$downColor,width:(item[1]/buyListCount*100*10+'%')}"></view>
							</view>
						</view>
						<view class="">
							<view class="d-flex-between-center px-10 py-6 position-relative font-size-22"
								v-for="item in sellList.slice(0,10)">
								<text :style="{color:$upColor}">{{ Number(item[0]).toFixed(5) }}</text>
								<text class="opacity-75" style="color: #ffffff;">{{ Number(item[1]).toFixed(5) }}</text>
								<view class="position-absolute opacity-20" style="top: 0;bottom: 0;right: 0;"
									:style="{background:$upColor,width:(item[1]/sellListCount*100*10+'%')}"></view>
							</view>
						</view>
					</view>
					<view v-else class="text-center w-100 d-flex align-items-center justify-content-center"
						style="height: 704rpx;">
						<u-loading class="mx-auto" mode="flower" color="rgba(255,255,255,.8)" size="50"></u-loading>
					</view>

					<!-- 右侧输入框 -->
					<view class="pl-20 position-relative" style="height: 690rpx;">
						<view class="d-grid-columns-2">
							<view class="btn btn1" :class="buyDirection == 0 ? 'active' : ''"
								@click="$u.throttle(()=>{buyDirection=0;number=0},500)">
								<text class="d-block" style="margin-top: 3px;">{{ i18n.buy }}</text>
							</view>
							<view class="btn btn2" :class="buyDirection == 1 ? 'active' : ''"
								@click="$u.throttle(()=>{buyDirection=1;number=0},500)">
								<text class="d-block  opacity-0" style="margin-top: 3px;">{{ i18n.sell }}</text>
							</view>
						</view>

						<view class="d-flex mt-20 buy-type font-size-30 d-flex-between-center"
							@click="showLimitMarketPopUp=true;"
							style="background: #222;height: 35px;line-height: 35px;border-radius: 4px;">
							<text style="color: #ffffff;margin-left: 6px;" v-if="buyType===0">
								{{$t('market_order')}}
							</text>
							<text style="color: #ffffff;margin-left: 6px;" v-else>
								{{ i18n.limitPrice }}
							</text>
							<view>
								<image src="/static/icon_arrow_down_16.png"
									style="width: 20px;height: 20px;margin-right: 3px;margin-top: 10px;"></image>
							</view>
						</view>

						<view class="mt-20 " v-if="buyType==1"
							style="background: #222;height: 35px;border-radius: 4px;display: flex;line-height: 35px;">
							<div style="width: 35px;height: 35px;" @click="reduceFn">
								<u-image src="/static/icon_sum.png" style="width: 20px;height: 20px;margin: 6px;" />
							</div>
							<input type="digit" @input="priceNumber" v-model="price" class="" :placeholder="i18n.price"
								placeholder-style="color:#939393;"
								style="color: #ffffff;background:transparent;text-align: center;line-height: 35px;height: 35px;">

							<div style="background:transparent;width: 35px;height: 35px;margin-left: 5px;"
								@click="addFn">
								<u-image src="/static/icon_add.png"
									style="width: 20px;height: 20px;margin: 6px;background: transparent" />
							</div>

						</view>

						<view class="mt-20 "
							style="background: #222;height: 35px;line-height: 35px;
          border-radius: 4px;display: flex;color: #ffffff;text-align: center;justify-content: center;align-items: center;" v-else>
							{{ $t("transaction.coinBuyPrice") }}
						</view>




						<view class="mt-20 position-relative">
							<text class="d-block" style="color: #939393;">{{ i18n.jine }}</text>
							<input type="digit" v-model="number" class="trade-input mt-10 " :placeholder="i18n.jine"
								placeholder-style="color:#939393"
								style="color: #ffffff;height: 35px;border-radius: 4px;padding-left: 3px;background: #222;line-height: 35px;"
								@input="changeNumber">
							<text class="position-absolute" style="bottom: 13rpx;right: 20rpx;color: #939393;">
								{{ currency_name }}
							</text>
						</view>
						<view class="mt-20 d-grid-columns-5 text-center grid-gap-10">
							<text v-for="item in [10,25,50,75,100]"
								class="border-white border-radius-10 font-size-22 py-6" style="color: #ffffff;"
								@click="setPercent(item)">{{ item }}%
							</text>
						</view>
						<view class="mt-20 d-flex-between-center">
							<text class="d-block" style="color: #939393;">{{ i18n.balance }}</text>
							<text class="font-weight-bold" style="color: #ffffff;" v-if="buyDirection==0">
								{{ Number(balance.change_balance).toFixed(6) }}(USDT)
							</text>

							<text class="font-weight-bold" style="color: #ffffff;" v-if="buyDirection==1">
								{{ Number(balance.btc_change_balance).toFixed(6) }}({{ currency_name }})
							</text>

						</view>
						<view class="position-absolute" style="left: 20rpx;right: 0;bottom: 30px;">
							<view style="display: flex;justify-content: space-between;margin-top: 0;">
								<text class="d-block mb-20" style="color: #939393;">{{ i18n.jye }}:</text>
								<text class="d-block mb-20" style="color: #ffffff;">{{ jiaoyie}}</text>
							</view>


							<button class="success-button py-0 font-size-28" v-if="buyDirection == 0" @click="confirm"
								style="height: 70rpx;line-height: 70rpx;background: #25A750;border-radius: 20px;">{{ btnStrA0 }}
							</button>
							<button class="error-button  py-0 font-size-28" v-else @click="confirm"
								style="height: 70rpx;line-height: 70rpx;background: #ca3f64;border-radius: 20px;">{{ btnStrA1 }}
							</button>


						</view>
					</view>
				</view>

			</view>
			<!-- 持仓列表 -->
			<u-gap height="16" class="mt-0" bg-color="#242424" style="margin-top: -50px;"></u-gap>
			<div class="inblock1"
				style="display: flex;border-bottom: 1px solid #242424;padding-bottom: 11px;padding-top: 10px;">
				<!-- <div>
          <span @click="load(1)" :class="{'active1': load_type == 1,'inactive1': load_type != 1  }">{{
              $t("lever.lvchi")
            }}</span>
      </div> -->
				<div>
					<span @click="load(0)" :class="{'active1': load_type == 0,'inactive1': load_type != 0  }">{{
	          $t("lever.nowentrust")
	        }}</span>
				</div>
				<!-- <div style="margin-left: 20px;">
					<span @click="load(1)" :class="{'active1': load_type == 1,'inactive1': load_type != 1  }">{{
              $t("spont_assets")
            }}</span>
				</div> -->

				<div style="flex: 1;text-align: right;justify-content: right;margin-right:5px;">

					<image src="/static/icon_to_all.png"
						@click="$utils.jump('/pages/transaction/currency_order?from=1')"
						style="width: 20px;height:20px;text-align: right;"></image>
				</div>


			</div>


			<!--  持仓 -->
			<view class="mx-20" style="background: #000000;padding-bottom: 100px;" v-if="load_type == 0">
				<view class="d-grid py-20 font-size-22 opacity-50"
					style="grid-template-columns:.8fr 1fr 1.4fr 1.3fr .7fr;">
					<text class="d-block text-center">{{ i18n.type }}</text>
					<text class="d-block text-center">{{ i18n.price }}</text>
					<text class="d-block text-center">{{ i18n.number }}</text>
					<text class="d-block text-center">{{ i18n.time }}</text>
					<text class="d-block text-center">{{ i18n.status }}</text>
				</view>
				<block v-if="coinTradeList.length">
					<view class="d-grid py-20 text-center align-items-center border-bottom"
						style="grid-template-columns:.8fr 1fr 1.4fr 1.3fr 1fr;" v-for="item in coinTradeList">
						<text class="d-block text-center font-size-24"
							:class="item.category == 2 ? 'text-success' : 'text-error'">{{item.category == 1 ? i18n.buy : i18n.sell}}
						</text>

						<text class="font-weight-bold opacity-90">{{ Number(item.price).toFixed(4) }}</text>
						<text class="font-weight-bold opacity-90">{{ Number(item.number) }}</text>
						<view class="font-size-22">
							<text class="d-block">{{ item.create_time.slice(0, 10) }}</text>
							<text class="d-block">{{ item.create_time.slice(10, 20) }}</text>
						</view>
						<view @click="onCancel(item)" class="tag-primary font-size-20" v-if="load_type == 0 ">
							{{$t("transaction.cancelEntrust") }}
						</view>
						<text class="tag-primary font-size-20" v-else>{{ item.currency_name }}/{{ item.legal_name }}
						</text>

					</view>
				</block>
				<default-page v-else></default-page>
			</view>

			<!-- 资产列表 -->
			<view class="mx-20" style="background: #000000;padding-bottom: 100px" v-if="load_type == 1 ">
				<view v-for="item in spotAssetsList">
					<view class="p-30 mb-10 text-white" v-if="item.usdt_balance > 0 || item.currency == 23"
						style="display: flex;justify-content: space-between;">
						<view style="display: flex;">

							<image src="https://admin.coinbmex.com/coin/icon-USDT.png"
								style="width: 32px;height: 32px;margin-left: -2px;" v-if="item.currency == 23"></image>
							<image :src="'https://admin.coinbmex.com'+item.logo"
								style="width: 32px;height: 32px;margin-left: -2px;" v-else></image>
							<view
								style="color: #ffffff;line-height: 32px;height: 32px;margin-left: 8px;font-weight: 500;font-size: 15px">
								{{ item.currency_name }}
							</view>
						</view>
						<view style="display: flex;flex-direction: column;">
							<view style="color: #ffffff;font-weight: 500;font-size: 15px;"
								v-if="item.currency_name==='USDT' ">
								{{ item.change_balance }} USDT
							</view>
							<view style="color: #ffffff;font-weight: 500;font-size: 15px;" v-else>
								{{ item.usdt_balance }} USDT</view>

							<view style="color: #939393;margin-top: 3px;font-size: 12px;text-align: right;"
								v-if="item.currency_name==='USDT' ">=
								¥{{ Number(cnyusdt*Number(item.change_balance)).toFixed(2) }}</view>
							<view style="color: #939393;margin-top: 3px;font-size: 12px;text-align: right;" v-else>=
								¥{{ Number(cnyusdt*Number(item.usdt_balance)).toFixed(2) }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import timeKline from "./timeKline.vue"
	import Klinechart from "../../components/klinechart/klinechart.vue";
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				showLimitMarketPopUp: false,
				showKlineChart: true,
				showMoreBottomMenu: false,

				btnStrA0: '',
				btnStrA1: '',
				lang: '',
				load_type: 0,
				tabACount: 0,
				spotAssetsList: [],
				originalList: {},
				convert: 0,


				timer: '',
				currency_name: 'BTC',
				legal_name: 'USDT',
				currency_id: 32,
				symbolQuotation1: {
					now_price: 0,
					close: 0,
					change: 0
				},
				symbolQuotation: {
					now_price: 0,
					close: 0,
					change: 0
				},
				// 交易数据
				buyList: [],
				sellList: [],
				buyListCount: 0,
				sellListCount: 0,
				optionalId: 0,
				showSelectCoin: false,
				//行情
				originalQuotation: [],
				quotation: [],
				buyDirection: 0, //0买入，1卖出
				number: null, //交易手数,
				buyType: 0, //0市价，1限价,
				multiple: 100, //倍数
				margin: 0, //保证金
				handlingFee: 0, //手续费,
				user_lever: 0, // 个人的资金
				showConfirmPop: false,
				price: '',
				balance: {
					change_balance: 0,
					btc_change_balance: 0
				}, //余额
				percent: 0, // 百分比,
				coinTradeList: [],
				platform: '',
				pageVisible: false,
				socketOpen: false,
				pushUUID: "",
				cnyusdt: 7.21,
				timeId: null,
				currentIndex: 0,
			};
		},
		onLoad(options) {
			let {
				currency_name,
				legal_name,
				currency_id,
				buy_direction
			} = options
			this.currency_name = currency_name || 'BTC';
			this.legal_name = legal_name || 'USDT';
			this.currency_id = currency_id || 32;

			buy_direction = buy_direction || 0
			this.buyDirection = Number(buy_direction)

			const _this = this
			
			this.getCoinTradeList();

			let url = "https://admin.coinbmex.com/getCNYFn";
			let data = [];
			let that = this;
			uni.request({
				url: url,
				method: "GET",
				dataType: "json", //指定服务器返回的数据类型
				//jsonpCallback: "showData",  //指定回调函数名称
				success: function(response) {
					that.cnyusdt = Number(response.data.message);
				}
			});
			this.timeId = setInterval(() => {
				this.getCoinTradeList()
				this.getSpotWalletList()
			}, 2500)
		},
		onShow() {
			this.getSpotWalletList()

			let token = uni.getStorageSync("token");
			if (token == null || token.length < 10) {
				uni.redirectTo({
				  url:'/pages/common/login'
				})
			} else {
				this.lang = this.$store.state.lang || 'en';
				if (this.lang === "vi") {
					this.btnStrA0 = this.i18n.buy;
					this.btnStrA1 = this.i18n.sell;
				} else {
					this.btnStrA0 = this.i18n.buy + '/' + this.i18n.long;
					this.btnStrA1 = this.i18n.sell + '/' + this.i18n.short;
				}
				this.getCoinData()
				//查看是否已添加自选
				this.checkOptional()

				this.getQuotation();
				setTimeout(()=> {
					this.getDepthFn();
				},1200)
				
				//
				let token = uni.getStorageSync("token");
				if (token && token.length > 10) {
					this.$https.initDataToken({
						url: 'setOnline',
						type: 'POST',
					}, (res, msg) => {
						console.log("设置在线" + JSON.stringify(res));
					});
				}
			}
			this.okxWS()
			this.onMessage()
		},
		beforeDestroy() {
			clearTimeout(this.timer);
			clearTimeout(this.timeId)
		},
		components: {
			Klinechart,
			timeKline
		},
		methods: {
			backFn() {
				this.$utils.jump('/pages/setting/left_menu')
			},
			goHome() {
				uni.reLaunch({
					url: '/pages/setting/left_menu'
				})
			},
			okxWS() {
			  // 订阅k
			  let currencyName = this.currency_name.toUpperCase()
			  this.$store.dispatch('onWebScoketSub',[`kline.${currencyName}/USDT`])
			  // 订阅一天
			  this.$store.dispatch('onWebScoketSub',['daymarket'])
			  // 订阅深度的
			  this.$store.dispatch('onWebScoketSub',[`market_depth.${currencyName}/USDT`])
			  // 订阅价格浮动
			  this.$store.dispatch('onWebScoketSub',['message'])
			},
			getCoinData() {
			  this.$https.initData({
					  url: 'getHbDetail?coin=' + this.currency_name.toUpperCase(),
					  type: 'GET'
			  },(res,msg)=> {
					let close= Number(res.close);
					this.symbolQuotation.now_price=close;
					this.symbolQuotation.close=close;
					this.symbolQuotation.currency_id=res.currency_id;
					this.symbolQuotation.legal_id=23;
					this.symbolQuotation.change = res.change
					if (this.price == null || this.price == 0) {
					  this.price = close
					}
			  })
			},
			priceNumber(e) {
				this.price = Math.abs(Number(e.detail.value))
			},
			// 取消委托
			onCancel(item) {
				let lang = uni.getStorageSync("lang") || "en";
				let type = ''
				if (item.category === 1) {
					type = 'in'
				}
				if (item.category === 2) {
					type = 'out'
				}
				this.$https.initDataToken({
					url: 'transaction_del',
					type: 'POST',
					data: {
						lang,
						id: item.id,
						type
					}
				}, (res, msg) => {
					this.$utils.showToast(this.$t("cancelSuccess"))
					this.getSpotWalletList();
					this.getCoinTradeList()
				});
			},
			sellListCountFn(sellListCount) {
				this.sellListCount = sellListCount;
			},
			buyListCountFn(buyListCount) {
				this.buyListCount = buyListCount;
			},
			buyListFn(buyList) {

				this.buyList = buyList;
			},
			sellListFn(sellList) {

				this.sellList = sellList;

			},

			getSocketData(data,isItem = false) {
				let change = 100 * (data.close - data.open) / data.open;

				change = Number(change).toFixed(2);
				if(!isItem) {
					this.symbolQuotation.now_price = Number(data.close);
				}
				//this.symbolQuotation1 = data;
				//this.symbolQuotation1.change = change;


			},
			reduceFn() {
				this.price = Number(this.price) - 0.01;
				this.price = Number(this.price).toFixed(2);
			},
			addFn() {
				this.price = Number(this.price) + 0.01;
				this.price = Number(this.price).toFixed(2);
			},
			closeTopKlineFn() {
				this.showKlineChart = false;
			},
			uuid() {
				var s = [];
				var hexDigits = "0123456789abcdef";
				for (var i = 0; i < 36; i++) {
					s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
				}
				s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
				s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
				s[8] = s[13] = s[18] = s[23] = "-";

				var uuid = s.join("");
				return uuid;
			},
			getDepthFn() {
				let coin = this.currency_name.toUpperCase() + '-USDT'
				this.$https.initData({
					  url: 'getHbDepth?coin=' + coin,
					  type: 'GET'
				},(res,msg)=> {
					  let data = res
					  if(data.length === 0) return
					  let inData = data.asks;
					  let outData = data.bids;
					  let[inlist,outList] = [inData,outData];
					  let [max, max1] = [0, 0];
					  for (let i in inData) {
					    inlist[i].price = inlist[i][0];
					    inlist[i].number = inlist[i][1];
					    //inlist[i].all = this.getRandom;
					    max = inlist[i].number > max ? inlist[i].number : max;
					  }
					  this.inMaxValue = max;
					  this.buyList = inlist.slice(0,10);
					  for (let i in outList) {
					    outList[i].price = outList[i][0];
					    outList[i].number = outList[i][1];
					    max1 = outList[i].number > max1 ? outList[i].number : max;
					    this.sellMaxValue = outList[i].number;
					    //outList[i].all = this.getRandom;
					  }
					  this.sellMaxValue = max1;
					  this.sellList = outList.slice(0,10);
					  this.buyListCount = this.buyList.reduce((total, item) => {
					    return total + item[1] * 1
					  }, 0);
					  this.sellListCount = this.sellList.reduce((total, item) => {
					    return total + item[1] * 1
					  }, 0);
				})
			},
			onMessage() {
				let coin = this.currency_name.toUpperCase() + '/USDT'
				this.$store.state.webScoket?.onMessage(evt => {
					 let k = JSON.parse(evt.data)
					 if(k.type === 'daymarket' && k.self === 1) {
						 if (this.quotation != null && this.quotation.length > 0) {
						   for (let i = 0; i < this.quotation.length; i++) {
								let jo = this.quotation[i];
								let symbol = jo.currencyName;
								try{
									symbol = symbol.toUpperCase();
								}catch(e){
									//TODO handle the exception
								}
								let close = Number(k.close);
								let high = Number(k.high);
								let vol = Number(k.volume);
								let low = Number(k.low);
								let open = Number(k.open);
								let change = Number(k.change)
								let symbolStr = symbol + "/USDT"
								if (symbolStr == k.symbol) {
									jo.price = close;
									jo.close = close;
									jo.high = high;
									jo.low = low;
									jo.volume = vol;
									jo.usdRate = close;
									jo.change = change;
								}
						   }
						 }
					 }
					 if(k.symbol?.toUpperCase() === coin &&  k.type === 'market_depth') {
						 let inData = k.bids;
						 let outData = k.asks.reverse();
						   let[inlist,outList] = [inData,outData];
						   for (let i in inData) {
							 inlist[i].price = inlist[i][0];
							 inlist[i].number = inlist[i][1];
						   }
						   this.buyList = inlist.slice(0,10);
						   for (let i in outList) {
							 outList[i].price = outList[i][0];
							 outList[i].number = outList[i][1];
						   }
						   this.sellList = outList.slice(0,10);
						   this.buyListCount = this.buyList.reduce((total, item) => {
							 return total + item[1] * 1
						   }, 0);
						   this.sellListCount = this.sellList.reduce((total, item) => {
							 return total + item[1] * 1
						   }, 0);
					 }
				})
			},
			getSpotWalletList() {
				let lang = uni.getStorageSync("lang") || "en";
				this.$https.initDataToken({
					url: 'wallet/spotWalletList?lang=' + lang + '&show0=',
					type: 'POST'
				}, (res, msg) => {
					this.originalList = res;
					const convert = Number(res.change_wallet.totle);
					let change_walletUSDT = Number(res.change_wallet.totle);
					this.originalList.change_wallet.balance.forEach(item => {
						let currency_name = item.currency_name;
						if (currency_name === "USDT") {
							this.balance.change_balance = Number(item.change_balance);
						}
						if (currency_name === this.currency_name) {
							this.balance.btc_change_balance = Number(item.change_balance);
						}

						item.balance = Number(item.change_balance)
						item.lock_balance = Number(item.lock_change_balance)
						item.usdt_balance = parseFloat((Number(item.change_balance) * Number(item
							.usdt_price)).toFixed(6))
					});


					this.convert = convert.toFixed(6)
					this.setShowList()
				})
			},
			setShowList() {
				this.spotAssetsList = this.originalList.change_wallet.balance;
				//this.currentAssetsType = this.$store.state.assetsType[1];
			},
			load(val) {
				this.load_type = val;
				switch (val) {
					case 0:
						this.getCoinTradeList()
						break
					case 1:
						this.getSpotWalletList();
						break
				}
			},
			startTimer() {
				this.timer = setTimeout(this.sendMsg_GetAddressList, 1000);
			},
			sendMsg_GetAddressList() {
				alert("延时1秒后执行的");
			},

			typeChange(index) {
					this.currentIndex = index
					this.getQuotation()
				},
			// 获取所有行情
			getQuotation() {
				this.$https.initData({
				  url: 'getHbList?type=' + this.tabList[this.currentIndex].id,
				  type: 'GET'
				},(res,msg)=> {
					let quotationList = res
					for (let i = 0; i < quotationList.length; i++) {
						quotationList[i].precision_length = 4;
						quotationList[i].change = Number(quotationList[i].change).toFixed(2)
						quotationList[i].currencyName = quotationList[i].currency_name
					}
					this.originalQuotation= quotationList;
					this.quotation = quotationList;
				})
			},
			//获取余额等
			getWalletDetail(currency_id) {

				let data = {
					currency: currency_id,
					type: "change"
				};
				this.$https.initDataToken({
					url: 'wallet/detail',
					type: 'POST',
					data
				}, (res, msg) => {
					this.balance = res;
					//alert("查询余额===>"+this.balance.btc_change_balance);
					this.balance.btc_change_balance = Number(this.balance.change_balance);
				})
			},
			startSocket() {
				const _this = this
				const {
					currency_id,
				} = this

				this.$store.state.socket.on('daymarket', res => {
					let data = res
					const has = this.originalQuotation.findIndex(item => item.currency_name == data
						.currency_name && item
						.legal_name == data.legal_name)
					if (has > -1) {
						let obj = {
							...this.originalQuotation[has],
							...data,
						}
						this.originalQuotation.splice(has, 1, obj)
					}

					if (this.currency_name == res.currency_name && this.legal_name == res.legal_name) {
						this.symbolQuotation = {
							...this.symbolQuotation,
							...res
						}
					}
				});
				this.$store.state.socket.on('market_depth', res => {
					this.getMarketDepthData(res)
				});
			},
			filterQuotation(e) {
				let val = e.detail.value
				if (!val) {
					this.quotation = this.originalQuotation
				} else {
					this.quotation = this.originalQuotation.filter(el => {
						val = val.toLowerCase()
						let currency_name = el.currencyName.toLowerCase()

						if (currency_name.indexOf(val) > -1) {
							return el
						}
					})
				}
			},
			//接受市场数据
			getMarketDepthData(data) {
				if (this.currency_name === data.currency_name && this.legal_name === data.legal_name) {
					if (typeof(data.bids) === 'string') {
						this.buyList = JSON.parse(data.bids);
						this.sellList = JSON.parse(data.asks).reverse();
					} else {
						this.buyList = data.bids;
						this.sellList = data.asks.reverse();
					}

					this.buyListCount = this.buyList.reduce((total, item) => {
						return total + item[1] * 1
					}, 0);

					this.sellListCount = this.sellList.reduce((total, item) => {
						return total + item[1] * 1
					}, 0);
				}
			},
			//查看是否已添加自选
			checkOptional() {
				let token = uni.getStorageSync("token");
				if (token && token.length > 10) {
					let that = this;
					that.$https.initDataToken({
						url: 'optional/list',
						type: 'GET',
					}, (res, msg) => {
						console.log("收藏列表==>" + JSON.stringify(res) + " that.currency_id=>" + that.currency_id);
						//const item = res.find(item => item.currency_id === that.currency_id)
						for (let i = 0; i < res.length; i++) {
							let item = res[i];
							console.log("item.currency_id=" + item.currency_id + "that.currency_id=>" + that
								.currency_id);
							if (item.currency_id == that.currency_id) {
								that.optionalId = item.id;
							}
						}
					});
				}
			},
			//添加自选
			addOptional() {
				let token = uni.getStorageSync("token");
				if (token && token.length > 10) {
					let that = this;
					that.$https.initDataToken({
						url: 'optional/add?currency_id=' + that.currency_id,
						type: 'POST',
					}, (res, msg) => {
						that.optionalId = res.id;
						that.$utils.showToast(that.$t("transaction.addOptionalSuccess"));
					});
				}
			},
			// 删除自选
			delOptional() {
				let token = uni.getStorageSync("token");
				if (token && token.length > 10) {
					let that = this;
					that.$https.initDataToken({
						url: 'optional/del?id=' + that.optionalId,
						type: 'POST',
					}, (res, msg) => {
						//alert("收藏" + JSON.stringify(res));
						that.optionalId = 0;
						that.$utils.showToast(that.$t("transaction.delOptionalSuccess"));
					});
				}
			},
			// 跳转
			jump(currency_name, legal_name, currency_id) {
				if (currency_name === this.currency_name && currency_id === this
					.currency_id) this.showSelectCoin = false
				const url =
					//`pages/transaction/currency?currency_name=${currency_name}&legal_name=${legal_name}&currency_id=${currency_id}`;
					`/pages/transaction/currency?currency_name=${currency_name}&legal_name=USDT&currency_id=${currency_id}`
				this.showSelectCoin = false
				uni.redirectTo({
					url: url
				})
				// location.href = "/mobile/#" + url;
			},
			//提交
			confirm() {
				this.$u.throttle(async () => {
					const {
						buyDirection,
						buyType,
						price,
						number,
						symbolQuotation,
						i18n
					} = this
					if (!number || !this.$u.test.amount(number)) {
						return this.$utils.showToast(i18n.p_jine)
					}
					//如果是限价，则判断价格

					let str = ''
					let buyDirectionName = buyDirection === 0 ? i18n.buy : i18n.sell;
					let submitPrice = "";
					if (buyType === 0) { //市价
						str = i18n.p_confirm_sj;
						submitPrice = symbolQuotation.now_price;
					} else {
						str = `${i18n.p_confirm_xj_1 + price}`;
						submitPrice = this.price;
						if (this.price === "") {
							return this.$utils.showToast(i18n.p_price)
						}
					}
					str = str + buyDirectionName + i18n.p_confirm_ma

					const ret = await this.$utils.showModal(this.$t("common.hint"), str)
					if (!ret) return
					const amount = number
					//const type = buyDirection == 0 ? 1 : 2;
					//currency_name + '/' + legal_name
					let symbolStr = this.currency_name + "USDT";
					if (buyDirection === 0) {
						let data = {
							price: submitPrice,
							num: amount,
							legal_id: 23,
							currency_id: this.currency_id,
							password: "",
							market_limit: buyType,
							symbol: symbolStr,
							type: buyType == 0 ? 1 : 2,
							lang: uni.getStorageSync("lang") || "en"
						};
						this.$https.initDataToken({
							url: 'transaction/in',
							type: 'POST',
							data
						}, (res, msg) => {
							this.number = 0
							this.$utils.showToast(this.$t("common.success"))
							this.getCoinTradeList()
							const iddd = this.buyDirection === 1 ? this.currency_id : 23
							//this.getWalletDetail(iddd);
							this.getSpotWalletList();
						})
					} else {
						let data = {
							price: submitPrice,
							num: amount,
							legal_id: 23,
							currency_id: this.currency_id,
							password: "",
							market_limit: buyType,
							symbol: symbolStr,
							type: buyType == 0 ? 1 : 2
						};
						this.$https.initDataToken({
							url: 'transaction/out',
							type: 'POST',
							data
						}, (res, msg) => {
							this.number = 0
							this.$utils.showToast(this.$t("common.success"))
							this.getCoinTradeList()

							const iddd = this.buyDirection === 1 ? this.currency_id : 23
							//this.getWalletDetail(iddd);
							this.getSpotWalletList();
						})
					}


				}, 3000)

			},

			//输入的数量变化
			changeNumber(e) {
					const {
						buyDirection,
						symbolQuotation,
						bal,
						buyType,
						price
					} = this
					let balance = Number(this.balance.change_balance)
					let number = Math.abs(Number(e.detail.value))
					if (buyDirection === 0) {
						//买入
						const totalPrice = number * symbolQuotation.now_price
						if (totalPrice >= balance) {
							balance = balance * 0.95
							number = (balance / symbolQuotation.now_price).toFixed(6)
						}
					} else if (buyDirection === 1) {
						balance = Number(this.balance.btc_change_balance)
						if (number >= balance) {
							number = balance
						}
					}
					this.$nextTick(() => {
					    this.number=  Number(number)
						this.percent = number / balance * 100
					})
			},
			//获取交易列表
			getCoinTradeList(currency_id, legal_id) {
				let coinTradeList = []
				let data = {
					currency_id: currency_id,
					legal_id: legal_id,
					page: 1,
					limit: 10
				};
				// 获取买入的
				this.$https.initDataToken({
					url: 'transaction_in',
					type: 'POST',
					data
				}, (res, msg) => {
					let buyList = res.list || [];
					for (let i = 0; i < buyList.length; i++) {
						buyList[i].category = 1
						buyList[i].timestamp = this.getTimeStamp(buyList[i].create_time)
					}
					coinTradeList = buyList;
					// 获取卖出的
					this.$https.initDataToken({
						url: 'transaction_out',
						type: 'POST',
						data
					}, (res, msg) => {
						let sellList = res.list || [];
						for (let i = 0; i < sellList.length; i++) {
							sellList[i].category = 2
							sellList[i].timestamp = this.getTimeStamp(sellList[i].create_time)
						}
						coinTradeList = coinTradeList.concat(sellList)
						// 按时间戳排序
						coinTradeList.sort((a, b) => b.timestamp - a.timestamp)
						this.coinTradeList = coinTradeList.length === this.coinTradeList.length ? this
							.coinTradeList : coinTradeList
					})
				})
			},
			getTimeStamp(timeStr) {
				let timestamp = Date.parse(new Date(timeStr));
				return timestamp / 1000
			},
			setPercent(percent) {
				const {
					buyDirection,
					symbolQuotation,
					bal,
					buyType,
					price
				} = this
				let balance = Number(this.balance.change_balance)
				if (percent === 100) {
					balance = balance * 0.95
				}
				if (this.buyDirection === 1) {
					balance = Number(this.balance.btc_change_balance)
				}
				let number = 0
				if (buyDirection === 0) {
					if (buyType === 0) {
						number = balance * percent / 100 / symbolQuotation.now_price
						console.log(balance,percent,symbolQuotation.now_price)
					} else if (buyType === 1) {
						number = balance * percent / 100 / price
					}
				} else if (buyDirection === 1) {
					number = balance * percent / 100
				}
				console.log(balance)

				this.number = Number(number.toFixed(6))
			}
		},
		computed: {
			...mapState(['isConnect']),
			tabList() {
				return [
					{name:this.$t("tabA0"),id:0},
					{name:this.$t("tabA3"),id:3},
					{name:this.$t("tabA1"),id:1},
					{name:this.$t("tabA2"),id:2} 
				]
			},
			i18n() {
				return this.$t("transaction")
			},
			symbol() {
				return this.currency_name + '/' + this.legal_name
			},
			quotationNav() {
				const i18n = this.$t("transaction")
				return [{
						name: i18n.tradingPair,
						align: ''
					},
					{
						name: i18n.lastPrice,
						align: 'justify-content-center'
					},
					{
						name: i18n.todayChange,
						align: 'justify-content-end'
					}
				]
			},
			jiaoyie() {
				//that.symbolQuotation.close=close;
				let {
					number,
					symbolQuotation,
					buyType,
					price
				} = this
				number = Number(number)
				if (number <= 0 || !number) number = 0;

				//买入
				let ret = 0
				if (buyType === 0) {
					ret = (number * symbolQuotation.close).toFixed(2) + 'USDT'
				} else {
					ret = (number * price).toFixed(2) + 'USDT'
				}
				return ret
			}
		},
		watch: {
			isConnect(val) {
				  if(val) {
					  this.onMessage()
				  }
			},
			buyDirection(val) {
				//如果是0，则是买入，获取currency_id
				//如果是1，则是卖出，获取legal_id
				if (this.symbolQuotation.currency_id || this.symbolQuotation.legal_id) {
					const id = val === 1 ? this.symbolQuotation.currency_id : this.symbolQuotation.legal_id
					this.getWalletDetail(id)
				}

			},

		},
		onHide() {
			// 取消订阅
			this.$store.dispatch('onWebScoketUnSub',[])
		},
		onUnload() {
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #000000;
	}

	.market {
		color: rgba(255, 255, 255, .7);

		.search {
			border-bottom: 0 rpx solid rgba(255, 255, 255, .1);

			.input {
				height: 38 rpx;
				flex: 1;

				.input-placeholder {
					color: #fff;
				}
			}
		}

		.market-item {
			overflow: hidden;
			padding: 7px;
			padding-left: 0px;
			border-top: 2 rpx solid rgba(255, 255, 255, .1);
			align-items: center;
			display: grid;
			grid-template-columns: 1.1fr 1fr 1fr;

			.right {
				margin-left: auto;
				width: 80 rpx;
				height: 50 rpx;
				line-height: 50 rpx;
				text-align: center;
				border-radius: 18 rpx;
				background-color: #15be97;
				color: #fff;
				font-size: 24 rpx;
			}
		}
	}

	.btn {
		height: 30px;
		text-align: center;

		background-size: 100% 100%;
		color: rgba(255, 255, 255, .9);
		border-radius: 8 rpx;

		&.btn1 {
			background-image: url('../../static/image/icon/k-icon-1-none.png');

			&.active {
				background-image: url('../../static/image/icon/k-icon-1.png');
			}
		}

		&.btn2 {
			background-image: url('../../static/image/icon/k-icon-2-none.png');

			&.active {
				background-image: url('../../static/image/icon/k-icon-2.png');
			}
		}
	}

	.buy-type {
		.item {
			&::after {
				display: block;
				content: "";
				width: 70%;
				background-color: $uni-color-333;
				margin: 0 auto;
				height: 4 rpx;
				border-radius: 6 rpx;
				margin-top: 4 rpx;
				transition: all .3s ease 0s;
				border-bottom: none;
			}

			&.active {
				&::after {
					background-color: #ffffff;
					//border-bottom: 2px solid #ffffff;
				}
			}
		}
	}

	.slide-button {
		width: 33 rpx;
		height: 46 rpx;
		border: 2 rpx solid rgba(51, 51, 51, .2);
		background-color: #fff;
		border-radius: 6 rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 20;

		text {
			display: block;
			width: 2 rpx;
			height: 60%;
			margin: 0 2 rpx;
			background-color: rgba(51, 51, 51, .2);
		}
	}

	.trade-input {
		border: 2 rpx solid #eee;
		border-radius: 10 rpx;
		display: block;
		padding: 10 rpx 20 rpx;
		font-weight: bold;

		.input-placeholder {
			color: rgba(51, 51, 51, 0.4);
			font-weight: normal;
		}
	}

	.border-white {
		border: 0 rpx solid #999;
	}

	.activeTab {
		color: #ffffff;
		font-weight: 700;
		border-bottom: 2px solid #ffffff;
	}

	.inActiveTab {
		color: #939393;
		border-bottom: none;
	}

	.activeTab1 {
		color: #2A64FB;
	}

	.inActiveTab1 {
		color: #000;
		border-bottom: none;
	}

	.inblock1 {
		margin: 4px;

		span.active1 {
			font-weight: 700;
			color: #ffffff;
			font-size: 16px;
			//border-bottom: 1px solid #2A64FB;
			padding-bottom: 6px;
			border-bottom-width: 2px;
		}
	}

	.inblock1 {
		span.inactive1 {
			font-size: 16px;
			color: #939393;
			font-weight: 350;
		}
	}

	.trade-input:hover,
	.trade-input:focus {
		border: 1px solid #ffffff;
	}
	.c-nav {
		padding: 20rpx 0;
		box-sizing: border-box;
		flex-wrap: nowrap;
		&_item {
			font-size: 28rpx;
			color: #ffffff;
			background-color: #1f1f1f;
			transition: all .3s;
			padding: 0 30rpx;
			box-sizing: border-box;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 30rpx;
			margin: 0 15rpx;
			white-space: nowrap;
		}
		&_item-active {
			color: #000000;
			background-color: #ffffff;
		}
	}
</style>