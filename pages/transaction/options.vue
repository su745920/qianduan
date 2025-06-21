<template>
	<view style="background: #000000;padding-bottom: 120rpx;overflow-x: hidden;">
		<u-navbar showback="true" :custom-back="backFn" style="background: #FFFFFF">
			<view class="d-flex align-items-center font-weight-bold" @click="showSelectCoin=true"
				style="text-align: left;">
				<text class="font-size-40" style="color: #ffffff;margin-left: 0px;text-align: left">
					{{ currency_name + '/' + legal_name }}
				</text>
				<image src="/static/icon_triangle_down_white_16.png" style="width:20px;height:20px;margin-left:2px;">
				</image>
			</view>
			<image slot="right" src="/static/icon_to_all.png" style="width: 20px;height: 20px;"
				@click="$utils.jump('/pages/transaction/seconds_order?match_id='+matchId+'&currency_id='+currency_id)">
			</image>
			<image src="@/static/bib/icon_home_menu.png" slot="right" size="42" @click="goHome"
				style="width: 20px;height:20px;margin-left: 20px;margin-right: 10px;"></image>
		</u-navbar>
		<!-- 所有行情列表 -->
		<u-popup v-model="showSelectCoin" mode="bottom" length="850" contentBackgroundColor="#000000"
			:mask-custom-style="{background: 'rgba(0, 0, 0, 0.6)'}" :border-radius="0">
			<view class="px-30 market" style="background: #121212;margin-top:0px;padding-top: 10px;">
				<view class="search d-flex align-items-center py-20"
					style="background: #242424;height: 32px;border-radius: 12px;line-height: 32px;">
					<image src="/static/bib/icon_common_search.png"
						style="width: 15px;height: 15px;margin-left: 10px;margin-top:2px;">
						<input type="text" class="input" :placeholder="$t('common.search')" confirm-type="search"
							placeholder-style="font-size:13px;" @input="filterQuotation">
				</view>
				<!-- 切换 -->
				<scroll-view scroll-x style="width: 100%;">
					<view class="d-flex c-nav">
						<view @click="typeChange(index)" class="c-nav_item"
							:class="currentIndex === index ? 'c-nav_item-active' : ''" v-for="(item,index) in tabList"
							:key="index">{{item.name}}</view>
					</view>
				</scroll-view>
				<view class="d-grid py-20" style="grid-template-columns:1.1fr 1fr 1fr;">
					<view class="d-flex align-items-center font-size-22 opacity-50" v-for="(item,index) in quotationNav"
						:class="item.align">
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
								{{ item.change + '%' }}
							</view>
						</view>
					</view>
				</scroll-view>

			</view>
		</u-popup>
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

						<svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M9.4987 20C13.871 20 17.4154 16.4183 17.4154 12C17.4154 7.5817 13.871 4 9.4987 4C5.12644 4 1.58203 7.5817 1.58203 12C1.58203 16.4183 5.12644 20 9.4987 20Z"
								stroke="white" stroke-width="1.4" stroke-linejoin="round" />
							<path
								d="M9.5013 14C11.6874 14 13.4596 12.6568 13.4596 11C13.4596 9.34315 11.6874 8 9.5013 8C7.31519 8 5.54297 9.34315 5.54297 11C5.54297 12.6568 7.31519 14 9.5013 14Z"
								stroke="white" stroke-width="1.4" stroke-linejoin="round" />
							<path d="M9.5 8V4" stroke="white" stroke-width="1.4" stroke-linecap="round"
								stroke-linejoin="round" />
							<path d="M12.668 9C12.668 9 13.707 7 15.4388 7" stroke="white" stroke-width="1.4"
								stroke-linecap="round" stroke-linejoin="round" />
							<path d="M6.33333 9C6.33333 9 5.54167 7 3.5625 7" stroke="white" stroke-width="1.4"
								stroke-linecap="round" stroke-linejoin="round" />
							<path d="M7.1263 13.5C7.1263 13.5 4.7513 14.5 4.35547 18" stroke="white" stroke-width="1.4"
								stroke-linecap="round" stroke-linejoin="round" />
							<path d="M11.875 13.5C11.875 13.5 14.4479 14.5 14.6458 18" stroke="white" stroke-width="1.4"
								stroke-linecap="round" stroke-linejoin="round" />
						</svg>

						<text
							style="text-align: center;color: #ffffff;width: 100%;">{{ $t("beginner_tutorial") }}</text>
					</view>


					<view
						style="flex: 1;margin-top: 0px;display: flex;flex-direction: column;text-align: center;align-items: center;"
						@click="$utils.jump('/pages/fund/transfer2')">

						<image src="/static/icon_no_asset_transfer.png"
							style="width: 20px;height: 20px;text-align: center;align-items: center;"></image>

						<text
							style="text-align: center;color: #ffffff;width: 100%;margin-top: 3px;">{{ $t("fund.fundTransfer") }}
						</text>
					</view>


					<view
						style="flex: 2;margin-top:0px;display: flex;flex-direction: column;text-align: center;align-items: center;">

					</view>


				</view>


			</view>
		</u-popup>
		<!-- 一些数据 -->
		<view class="d-flex-between-center p-10" style="height: 152rpx;">
			<block v-if="symbolQuotation.close">
				<view class="">
					<text class="d-block font-size-40 font-weight-bold"
						:style="{color:$utils.getColor(symbolQuotation1.change)}">
						{{ Number(symbolQuotation1.close).toFixed(4) }}
					</text>
					<view class="d-flex align-items-baseline mt-10">
						<!-- <text class="font-size-22 opacity-30 text-white">
              {{ (symbolQuotation1.close * $store.state.fiat.rate).toFixed(2) }}{{ $store.state.fiat.currency_code }}
            </text> -->
						<text
							class="font-size-22 text-white">≈&nbsp;{{(symbolQuotation1.close*0.99).toFixed(2)}}&nbsp;USD</text>
						<text class="font-size-22 ml-12"
							:style="{color:$utils.getColor(symbolQuotation1.change)}">{{ symbolQuotation1.change }}%
						</text>
					</view>
				</view>
				<view class="">
					<view class="d-flex">
						<text class="d-block opacity-60 text-white font-size-22">{{ i18n.dayHigh }}</text>
						<text class="d-block font-size-22 text-white ml-20"
							style="font-weight: 700;">{{ symbolQuotation1.high }}</text>
					</view>
					<view class="d-flex mt-8">
						<text class="d-block opacity-60 text-white font-size-22">{{ i18n.dayLow }}</text>
						<text class="d-block font-size-22 text-white ml-20"
							style="font-weight: 700;">{{ symbolQuotation1.low }}</text>
					</view>
				</view>
			</block>
			<data-loading v-else></data-loading>
		</view>
		<!-- k线图 -->
		<optionsklinechart :currency_name="currency_name" :legal_name="legal_name" ref="child" style="margin: 0px;"
			@getSocketData="getSocketData" @buyListFn="buyListFn" @sellListFn="sellListFn"
			@buyListCountFn="buyListCountFn" @sellListCountFn="sellListCountFn"
			:precision="symbolQuotation.precision_length">
		</optionsklinechart>

		<!-- 委托挂单 -->
		<!-- <u-gap height="20" bg-color="#333333"></u-gap> -->
		<div style="display: flex;width:100%;margin: 12px;padding-bottom: 8px;">

			<div style="font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;margin: 20px;margin-left: 10px;"
				@click="changeTab(0)">
				<span :class="currentTab==0 ?'activeTab':'normalTab' "
					style="white-space: nowrap;">{{ $t('nav[2]') }}</span>
			</div>

			<div style="font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;margin: 20px;width: auto;margin-left: 10px;"
				@click="changeTab(1)">
				<span :class="currentTab==1 ?'activeTab':'normalTab' "
					style="white-space: nowrap;">{{ $t('transaction.currentEntrust') }}</span>
			</div>

			<div style="font-size: 14px;color: #bbbbbb;font-family:'NotoSansSC-Bold';cursor: pointer;margin: 20px;width: auto;margin-left: 10px;"
				@click="changeTab(2)">
				<span :class="currentTab==2 ?'activeTab':'normalTab' "
					style="white-space: nowrap;">{{ $t('transaction.historyEntrust') }}</span>
			</div>
			<view style="flex: 1;">

			</view>
			<view
				style="justify-content: flex-end;align-items: flex-end;text-align: right;margin-right: 30px;margin-top: 17px;">
				<image src="/static/icon_to_all.png" style="width: 20px;height: 20px;"
					@click="$utils.jump('/pages/transaction/seconds_order?match_id='+matchId+'&currency_id='+currency_id,'redirectTo')">
				</image>
			</view>


		</div>


		<view class="p-30" v-if="currentTab==0">
			<view style="display: flex;">
				<view style="flex: 1;color: #939393;font-size:14px;justify-content: flex-start">
					{{$t('current_price')}}
				</view>
				<view style="flex: 1;color: #f5f5f5;font-size:16px;justify-content: flex-end">
					<view style="text-align: right;color: #939393;font-size: 14px;">
						<!--            {{$t('market_fee')}}-->
					</view>
				</view>
			</view>
			<view style="display: flex;margin-top: 5px;">
				<view style="flex: 1;font-size:16px;justify-content: flex-start"
					:style="{color:$utils.getColor(symbolQuotation1.change)}">
					{{ Number(symbolQuotation1.close).toFixed(4) }}
				</view>
				<view style="flex: 1;color: #1DAEFE;font-size:16px;justify-content: flex-end">
					<view style="text-align: right;">
						<!--            20%/00:00:37-->
					</view>
				</view>
			</view>


			<view class="d-flex-between-center py-40">
				<text style="font-weight: 700;">{{$t('trading_crypto')}}</text>
				<!--        <text class="font-weight-bold">{{ currency_name + '/' + legal_name }}</text>-->
			</view>


			<view class="d-flex-between-center py-0" style="display: flex;margin-top: -20px;">
				<view :class="currentPayCoin==0 ?'tran_btn':'tran_btn_normal' " style="flex: 1;margin: 7px;"
					@click="currentPayCoin=0">
					<view
						style="font-weight: 700;font-size: 18px;margin-top: 6px;margin-bottom: 6px;margin-left: 12px;margin-right: 12px;">
						USDT
					</view>
				</view>
				<view style="flex: 1;margin: 7px;">
					<view
						style="font-weight: 700;font-size: 18px;margin-top: 6px;margin-bottom: 6px;margin-left: 12px;margin-right: 12px;">
					</view>
				</view>
				<view style="flex: 1;margin: 7px;">
					<view
						style="font-weight: 700;font-size: 18px;margin-top: 6px;margin-bottom: 6px;margin-left: 12px;margin-right: 12px;">
					</view>
				</view>
				<view style="flex: 1;margin: 7px;">
					<view
						style="font-weight: 700;font-size: 18px;margin-top: 6px;margin-bottom: 6px;margin-left: 12px;margin-right: 12px;">
					</view>
				</view>
			</view>

			<view class="d-flex flex-wrap py-10 seconds-box">
				<view v-for="(item,index) in timeList" :key="index" class="seconds-box_item"
					:class="currentTime == index ?'tran_btn':'tran_btn_normal' " @click="currentTimerFn(index,item)">
					<view class="seconds-box_item_label">{{item.seconds}}s</view>
					<view class="seconds-box_item_value">{{ Number(item.profit_ratio) }}%</view>
				</view>
			</view>
			</br>
			<text class="py-16" style="width: 100px;">{{ $t("quantity") }}</text>

			<view class="py-10" style="margin-top: 8px;display: flex;border-radius: 8px;position: relative;"
				id="amountNumId">
				<input type="digit" @input="amountNumber" v-model="amountNum" class="trade-input mt-10 "
					:placeholder="amountTip" placeholder-style="color:#939393;" style="flex: 1;padding-left: 5px;">
				<view @click.stop="amountNum = microInsurance"
					style="font-size: 28rpx;color: #1DAEFE;position: absolute;right: 0;width: 100rpx;text-align: center;height: 60rpx;line-height: 60rpx;">
					{{$t('transaction.all')}}</view>
			</view>

			<text class="d-block mt-8 font-size-24">
				{{ i18n.balance + ':' + valFormat(microInsurance) + 'USDT' }}
			</text>

			<!-- <text class="d-block mt-8 font-size-24" style="color: #939393;">
        {{$t("actual_purchase")}}0.00USDT&nbsp;&nbsp;&nbsp;{{$t("fee")}}0.00USDT
      </text> -->

			<!--      <view class="d-flex-between-center mt-30">-->

			<!--        <button class="w-80 font-size-28 py-0" @click="submit" :disabled="disabled"-->
			<!--                :class="buyDirection == 1 ? 'success-button' : 'error-button'">{{ $t("common.confirm") }}-->
			<!--        </button>-->
			<!--      </view>-->

		</view>

		<view class="p-30" v-if="currentTab==1">
			<view class="p-20 box-shadow border-radius-20 mb-20" style="background: #242424;" v-for="item in list">
				<view class="d-flex-between-center py-10 ">
					<text class="opacity-50" style="color: #ffffff;">{{i18n.tradingPair}}</text>
					<text class="font-weight-bold" style="color: #ffffff;">{{item.symbol_name}}</text>
				</view>
				<view class="d-flex-between-center py-10">
					<text class="opacity-50" style="color: #ffffff;">{{i18n.direction}}</text>
					<text class="font-weight-bold"
						:class="item.type == 1 ? 'text-success' : 'text-error'">{{item.type == 1 ? i18n.buyUp : i18n.buyDown}}</text>
				</view>
				<view class="d-flex-between-center py-10">
					<text class="opacity-50" style="color: #ffffff;">{{i18n.buyPrice}}</text>
					<text class="font-weight-bold" style="color: #ffffff;">{{Number(item.open_price).toFixed(4)}}</text>
				</view>
				<view class="d-flex-between-center py-10">
					<text class="opacity-50" style="color: #ffffff;">{{i18n.number}}</text>
					<text class="font-weight-bold" style="color: #ffffff;">{{Number(item.u)}}</text>
				</view>
				<view class="d-flex-between-center py-10">
					<text class="opacity-50" style="color: #ffffff;">{{i18n.orderTimes}}</text>
					<text class="font-weight-bold" style="color: #ffffff;">{{Number(item.seconds)}}s</text>
				</view>
				<view class="d-flex-between-center py-10" v-if="currentNav == 1">
					<text class="opacity-50" style="color: #ffffff;">{{i18n.sellTime}}</text>
					<text class="font-weight-bold" style="color: #ffffff;">{{item.handled_at}}</text>
				</view>
				<view class="d-flex-between-center py-10" v-if="currentNav == 1">
					<text class="opacity-50" style="color: #ffffff;">{{i18n.pl}}</text>

					<text class="font-weight-bold font-size-30" v-if="item.profit_result==1"
						:style="{color:$utils.getColor(item.fact_profits)}">+{{Number(item.fact_profits)}}</text>

					<text class="font-weight-bold font-size-30" v-if="item.profit_result==-1"
						:style="{color:$utils.getColor(-item.fact_profits)}">-{{Number(item.fact_profits)}}</text>

				</view>
			</view>
			<default-page :length="list.length" v-if="list.length === 0" :total="total"></default-page>
		</view>
		<view class="p-30" v-if="currentTab==2">
			<view class="p-20 box-shadow border-radius-20 mb-20" style="background: #242424;" v-for="item in list">
				<view class="d-flex-between-center py-10 ">
					<text class="opacity-50" style="color: #ffffff;">{{i18n.tradingPair}}</text>
					<text class="font-weight-bold" style="color: #ffffff;">{{item.symbol_name}}</text>
				</view>
				<view class="d-flex-between-center py-10">
					<text class="opacity-50" style="color: #ffffff;">{{i18n.direction}}</text>
					<text class="font-weight-bold"
						:class="item.type == 1 ? 'text-success' : 'text-error'">{{item.type == 1 ? i18n.buyUp : i18n.buyDown}}</text>
				</view>
				<view class="d-flex-between-center py-10">
					<text class="opacity-50" style="color: #ffffff;">{{i18n.buyPrice}}</text>
					<text class="font-weight-bold" style="color: #ffffff;">{{Number(item.open_price).toFixed(4)}}</text>
				</view>
				<view class="d-flex-between-center py-10">
					<text class="opacity-50" style="color: #ffffff;">{{i18n.number}}</text>
					<text class="font-weight-bold" style="color: #ffffff;">{{Number(item.u)}}</text>
				</view>
				<view class="d-flex-between-center py-10">
					<text class="opacity-50" style="color: #ffffff;">{{i18n.orderTimes}}</text>
					<text class="font-weight-bold" style="color: #ffffff;">{{Number(item.seconds)}}s</text>
				</view>
				<view class="d-flex-between-center py-10" v-if="currentNav == 1">
					<text class="opacity-50" style="color: #ffffff;">{{i18n.sellTime}}</text>
					<text class="font-weight-bold" style="color: #ffffff;">{{item.handled_at}}</text>
				</view>
				<view class="d-flex-between-center py-10" v-if="currentNav == 1">
					<text class="opacity-50" style="color: #ffffff;">{{i18n.pl}}</text>

					<text class="font-weight-bold font-size-30" v-if="item.profit_result==1"
						:style="{color:$utils.getColor(item.fact_profits)}">+{{Number(item.fact_profits)}}</text>

					<text class="font-weight-bold font-size-30" v-if="item.profit_result==-1"
						:style="{color:$utils.getColor(-item.fact_profits)}">-{{Number(item.fact_profits)}}</text>

				</view>
			</view>
			<default-page :length="list.length" v-if="list.length === 0" :total="total"></default-page>
		</view>



		<!-- 秒合约 -->
		<block v-if="currentTab==0"> 
			<!-- 浮动的按钮工具 -->
			<view class="footer font-size-22" v-if="symbolQuotation1.close">

				<view class="btn btn1" @click="funA" :disabled="disabled"
					style="background: #25A750;margin: 20px;height: 40px;border-radius: 26px;">
					<!--          <text class="">{{ Number(symbolQuotation1.close).toFixed(4) }}</text>-->
					<text class="d-block" style="font-weight: 700;font-size: 18px;">{{ i18n.buyUp }}</text>
				</view>

				<view class="btn btn2" @click="funB" :disabled="disabled"
					style="background: #ca3f64;margin: 20px;height: 40px;border-radius: 26px;">
					<!--          <text class="">{{ Number(symbolQuotation1.close).toFixed(4) }}</text>-->
					<text class="d-block" style="font-weight: 700;font-size: 18px;">{{ i18n.buyDown }}</text>
				</view>

			</view>

			<!-- 秒合约购买后的计时弹窗 -->
			<u-popup v-model="showCountDown" mode="center" length="80%" contentBackgroundColor="transparent"
				:mask-custom-style="{background: 'rgba(0, 0, 0, 0.6)'}" @close="showCountDown = false" :closeable="false"
				:closeOnClickOverlay="true" :border-radius="2" :mask-close-able="false">
				<view class="p-30" style="background: #121212;margin-top:0px;padding-top: 10px;">

					<view class="" v-if="actualPL==null">
						<text class="count-down bg-primary connect_btn">{{ countDownTime }}</text>
					</view>

					<view class="" v-else>
						<text class="actualPL bg-primary  connect_btn" :class="actualPL>0?'green':'red'">
							{{ actualPL > 0 ? '+' : '' }}{{ actualPL }}
						</text>
					</view>
					<view class="d-flex-between-center border-bottom-white py-16 mt-40">
						<text class="opacity-50" style="color: #ffffff;">{{ i18n.tradingPair }}</text>
						<text class="font-weight-bold"
							style="color: #ffffff;">{{ currency_name + '/' + legal_name }}</text>
					</view>
					<view class="d-flex-between-center border-bottom-white py-16">
						<text class="opacity-50" style="color: #ffffff;">{{ i18n.direction }}</text>
						<text class="font-weight-bold" :class="buyInfo.type == 1 ? 'text-success' : 'text-error'">
							{{ buyInfo.type == 1 ? i18n.buyUp : i18n.buyDown }}
						</text>
					</view>
					<view class="d-flex-between-center border-bottom-white py-16">
						<text class="opacity-50" style="color: #ffffff;">{{ i18n.buyPrice }}</text>
						<text class="font-weight-bold"
							style="color: #ffffff;">{{ Number(buyInfo.open_price).toFixed(4) }}</text>
					</view>
					<view class="d-flex-between-center border-bottom-white py-16" v-if="showCurrentPrice == true">
						<text class="opacity-50" style="color: #ffffff;">{{ i18n.currentPrice }}</text>
						<text class="font-weight-bold" style="color: #ffffff;">{{ symbolQuotation1.close }}</text>
					</view>
					<view class="d-flex-between-center border-bottom-white py-16">
						<text class="opacity-50" style="color: #ffffff;">{{ i18n.number }}</text>
						<text class="font-weight-bold" style="color: #ffffff;">{{ amountNum }}USDT</text>
					</view>

					<view class="d-flex-between-center border-bottom-white py-16 font-weight-bold"
						v-if="actualPL==null">
						<text class="opacity-50" style="color: #ffffff;">{{ i18n.expectedPL }}</text>
						<text :style="{color:$utils.getColor(expectedPL)}">{{ expectedPL }}</text>
					</view>
					<view class="d-flex-between-center border-bottom-white py-16 font-weight-bold" v-else>
						<text class="opacity-50" style="color: #ffffff;">{{ i18n.actualPL }}</text>
						<text :style="{color:$utils.getColor(actualPL)}">{{ actualPL }}</text>
					</view>

					<button class="mt-36 font-size-28 py-0 primary-button connect_btn" @click="continueTrade"
						style="color: #000000;">{{ i18n.continueTrade }}
					</button>
				</view>
			</u-popup>
			<!-- 如还有倒计时，则显示 -->
			<view class="fixed-count-down" v-if="countDownTime && !showCountDown"
				:style="{backgroundColor:$utils.getColor(expectedPL)}" @click="showCountDown=true">
				<text class="font-size-28">{{ countDownTime }}s</text>
				<text class="font-size-36">{{ expectedPL }}</text>
			</view>

			<u-popup v-model="showResult" mode="center" length="80%" contentBackgroundColor="transparent"
				:mask-custom-style="{background: 'rgba(0, 0, 0, 0.7)'}" @close="showResult = false" :closeable="true"
				:closeOnClickOverlay="true" :border-radius="2" :mask-close-able="true">
				<view class="p-30" style="background: #121212;margin-top:0px;padding-top: 10px;">

					<view
						style="display: flex;justify-content: center;align-items: center;flex-direction: column;margin-top: 10px;color: #ffffff;border-bottom: 1px solid #333;padding-bottom: 15px;">
						{{orderDetail.symbol_name}}
					</view>
					<view
						style="display: flex;justify-content: center;align-items: center;flex-direction: column;margin-top:20px;">
						<view class="">
							<text class="text-success" v-if="orderDetail.profit_result > 0">
								+{{orderDetail.fact_profits}}USDT
							</text>
							<text class="text-error" v-else>
								-{{orderDetail.fact_profits}}USDT
							</text>
						</view>


						<view style="color: #999;">
							Expiry settlement completed
						</view>
					</view>


					<view style="padding: 10px;background: #000000;border-radius: 6px;margin-top: 10px;">
						<view class="d-flex-between-center py-16 mt-10">
							<text class="opacity-50" style="color: #ffffff;">Direction</text>
							<text class="font-weight-bold" style="color: #ffffff;">{{buyDirection == 1 ? 'Long' : 'Short'}}</text>
						</view>
						<view class="d-flex-between-center py-16">
							<text class="opacity-50" style="color: #ffffff;">Quantity</text>
							<text class="font-weight-bold" style="color: #ffffff;">
								{{orderDetail.u}}USDT
							</text>
						</view>

						<view class="d-flex-between-center py-16">
							<text class="opacity-50" style="color: #ffffff;">Execution price</text>
							<text class="font-weight-bold" style="color: #ffffff;">
								{{orderDetail.end_price}}USDT
							</text>
						</view>
					</view>

					<button class="mt-36 font-size-28 py-0 primary-button connect_btn" @click="showResult = false"
						style="color: #000000;border-radius: 20px;margin-left: 10px;margin-right: 10px;">{{
              i18n.continueTrade
            }}
					</button>

				</view>
			</u-popup>


		</block>

	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				orderDetail: {},
				orderID: 0, //秒合约订单ID
				showResult: false,
				list: [],
				total: 0,

				currentTime: 0,
				currentPayCoin: 0,
				currentTab: 0,
				showMoreBottomMenu: false,
				disabled: false,
				oldPrice: 0, //下单那一刻价格
				tVal: 0,
				closeVal: 0,
				openVal: 0,

				currentVal: [],
				matchId: 32,
				timeList: [],
				amountTip: this.$t("amountTip"),
				showCurrentPrice: true,
				currency_name: '',
				legal_name: '',
				currency_id: 0,
				showSelectCoin: false,
				originalQuotation: [],
				quotation: [],
				symbolQuotation: {},
				symbolQuotation1: {},
				// 交易数据
				buyList: [],
				sellList: [],
				buyListCount: 0,
				sellListCount: 0,
				optionalId: 0,
				//买张买跌,
				showBuyConfirm: false,
				buyDirection: 1, // 1买涨，2：买跌
				timers: [],
				currentTimer: {}, //当前选择的
				amountNum: '', // 数量,
				microInsurance: 0, //秒合约账户余额,
				//倒计时
				showCountDown: false,
				actualPL: null, // 實際盈虧，為null時顯示倒計時
				buyInfo: {},
				countDown: null, //倒计时的interval
				countDownTime: 0, //倒计时的总时间,
				showNav: true,
				currentNav: 1,
				from: "index",
				roomId: '',
				platform: '',
				pageVisible: false,
				socketOpen: false,
				pushUUID: "",
				timeId: null,
				currentIndex: 0,
				start_time: 0
			};
		},
		onLoad(options) {
			const {
				from,
				currency_name,
				legal_name,
				currency_id
			} = options
			this.from = from || ''
			this.currency_name = currency_name || "BTC"
			this.legal_name = legal_name || "USDT"
			this.currency_id = currency_id || 32
			//this.getMarketDepthData()

			const _this = this
			// uni.setNavigationBarTitle({
			//   title: _this.$t("home.market")
			// });

			this.getLeverDeal(this.currency_id, 23);

			let pushUUID = uni.getStorageSync("pushUUID");
			if (pushUUID == null || pushUUID.length < 10) {
				pushUUID = this.uuid();

				uni.setStorageSync('pushUUID', pushUUID)
			}
			this.pushUUID = pushUUID;
		},
		onShow() {
			//uni.showTabBar();
			//uni.hideTabBar()
			this.showNav = false
			setTimeout(() => {
				this.showNav = true
			}, 100)

			//获取秒合约的秒数
			this.getSecondsSeconds()

			this.getQuotation()
			//查看是否已添加自选
			this.checkOptional()

			//获取易购列表和余额
			this.getPayable();
			this.getCoinData()
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
			clearTimeout(this.timeId)
			this.timeId = setInterval(() => {
				this.getSecondsListFn()
			}, 2500)
			this.okxWS()
			this.onMessage()
			if(this.countDownTime > 0) {
				// 1741313905 => 120
				// 1741313925 => 100
				// 1741313935 => 100(90)  1741313935 - 1741313905 = 30  120 - 30 = 90
				let end_time = new Date();
				end_time = end_time.getTime();
				this.countDownTime = Number(this.buyInfo.seconds) - Math.floor((end_time - this.start_time) / 1000);
				if (this.countDownTime <= 0) {
				  this.countDownTime = 0;
				  clearInterval(this.countDown)
				  this.countDown = null
				  // 獲取交易結果
				  this.showCountDown = false;
				  this.disabled = false;
				  this.orderInfo();
				  this.getLeverDeal(this.currency_id, 23);
				  this.getSecondsListFn()
				}
			}
		},
		methods: {
			valFormat(val) {
							let newVal = val +''
							try {
								// 1.最多显示4位小数(不四舍五入: 1.6758796 -> 1.675879)
								// 2.小数点后面多余的0去除(1.230000 -> 1.23)
								// 3.整数后面显示.00
								// 先保留6位
								let numberVal = newVal.substring(0,newVal.indexOf(".") + 5)
								numberVal = Number(numberVal)
								// 判断是否为整数
								if(numberVal % 1 === 0) {
									numberVal = numberVal.toFixed(2)
								}
								// 判断是否只有一位小数
								if (newVal.indexOf('.') !== -1) {
									// 分割整数部分和小数部分
									let sVal = numberVal + ''
									let parts = sVal.split('.');
									if(parts[1].length === 1) {
										numberVal = numberVal.toFixed(2)
									}
								}
								newVal = numberVal
							} catch (error) {
								console.log('数字转化错误:',error) 
							}
							return newVal
						},
						backFn() {
							this.$utils.jump('/pages/setting/left_menu')
						},
						goHome() {
							uni.reLaunch({
								url: '/pages/setting/left_menu'
							})
						},
						amountNumber(e) {
							this.amountNum = Math.abs(Number(e.detail.value))
						},
			okxWS() {
				// 订阅k
				let currencyName = this.currency_name.toUpperCase()
				this.$store.dispatch('onWebScoketSub', [`kline.${currencyName}/USDT`])
				// 订阅一天
				this.$store.dispatch('onWebScoketSub', ['daymarket'])
				// 订阅价格浮动
				this.$store.dispatch('onWebScoketSub',['message'])
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
				})
			},
			getCoinData() {
				this.$https.initData({
					url: 'getHbDetail?coin=' + this.currency_name.toUpperCase(),
					type: 'GET'
				}, (res, msg) => {
					let close = Number(res.close);
					this.symbolQuotation.close = close;
					this.symbolQuotation1.close = close;
					this.symbolQuotation.currency_id = res.currency_id;
					this.symbolQuotation.legal_id = 23;
				})
			},
			getSecondsListFn() {
				const {
					matchId,
					status,
					page,
					currency_id
				} = this

				let data = {
					currency_id: currency_id,
					match_id: matchId,
					status: status,
					page: page,
					limit: 10
				};
				this.$https.initDataToken({
					url: 'microtrade/listsV2',
					data,
					type: 'GET'
				}, (res, msg) => {
					this.total = res.total
					const list = res.list.data
					// this.symbol=res.currencyName+"/USDT";
					if (list && list.length) {
						// this.symbol = list[0].symbol_name
						this.list = list;
						//this.page++
					} else {
						this.canGet = false
					}
				})
			},
			changeTab(currentTab) {
				this.currentTab = currentTab;
				if (currentTab == 1) {
					this.status = 1;
					this.list = [];
					this.getSecondsListFn();
				}
				if (currentTab == 2) {
					this.status = 3;
					this.list = [];
					this.getSecondsListFn();
				}


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


			funA() {
				//this.amountNum="";
				this.buyDirection = 1;
				//this.showBuyConfirm=true;
				this.getLeverDeal(this.currency_id, 23);
				this.submit();

			},
			funB() {
				//this.amountNum="";
				this.buyDirection = 2;
				//this.showBuyConfirm=true;
				this.getLeverDeal(this.currency_id, 23);
				this.submit();

			},
			currentTimerFn(pos, item) {
				this.currentTime = pos;
				this.currentTimer = item;
				this.amountTip = Number(item.min_amount).toFixed(0) + "-" + Number(item.max_amount).toFixed(0) + "usdt";
			},
			//获取杠杆的一些信息和持仓列表
			getLeverDeal(currency_id, legal_id) {
				//getMicroDeal: (currency_id,legal_id) => vm.$u.post("/microtrade/micro_deal",{currency_id,legal_id}),
				//this.$u.api.market.getMicroDeal(currency_id, legal_id).then(res => {
				let data = {
					currency_id: currency_id,
					legal_id: legal_id
				};
				this.$https.initDataToken({
					url: 'microtrade/micro_deal',
					type: 'POST',
					data
				}, (res, msg) => {
					let user_lever = res.user_lever || 0
					//this.user_lever = Number(user_lever).toFixed(4)
					this.microInsurance =  this.valFormat(user_lever)
					this.matchId = res.matchId;
				})
			},

			orderInfo() {
				this.$https.initDataToken({
					url: 'microtrade/getOrder?id=' + this.orderID,
					type: 'GET'

				}, (res, msg) => {
					if(res && res[0].status === 3) {
						this.showResult = true;
						this.orderDetail = res[0]
						uni.hideLoading()
						this.getLeverDeal(this.currency_id, 23)
					}else {
						uni.showLoading()
						// 没有平仓继续请求
						setTimeout(() => {
							this.orderInfo()
						},2000)
					}
					console.log("秒合约盈利结果==>" + JSON.stringify(res));
				})
			},

			//获取秒合约的秒数
			getSecondsSeconds() {
				let that = this;
				this.$https.initDataToken({
					url: 'microtrade/seconds',
					type: 'GET'
				}, (res, msg) => {
					that.timers = res.map(item => item.seconds)
					if(this.currentTime) {
					                        that.currentTimer = res[this.currentTime];
					                    }else {
					                        that.currentTimer = res[0];
					                    }
					that.timeList = res;
					let po = res[0];
					let min_amount = po.min_amount;
					min_amount = Number(min_amount).toFixed(0);
					let max_amount = po.max_amount;
					max_amount = Number(max_amount).toFixed(0);
					that.amountTip = min_amount + "-" + max_amount + "usdt";

				})
			},
			typeChange(index) {
				this.currentIndex = index
				this.getQuotation()
			},
			getQuotation() {
				this.$https.initData({
					url: 'getHbList?type=' + this.tabList[this.currentIndex].id,
					type: 'GET'
				}, (res, msg) => {
					let quotationList = res
					for (let i = 0; i < quotationList.length; i++) {
						quotationList[i].precision_length = 4;
						quotationList[i].change = Number(quotationList[i].change).toFixed(2)
						quotationList[i].currencyName = quotationList[i].currency_name
					}
					this.originalQuotation = quotationList;
					this.quotation = quotationList;
				})
			},

			getSocketData(data, isItem = false) {
				let change = data.change;

				change = Number(change).toFixed(2);
				if (!isItem) {
					this.symbolQuotation1 = data;
					this.symbolQuotation1.change = change;
				}
			},
			filterQuotation(e) {
				let val = e.detail.value
				if (!val) {
					this.quotation = this.originalQuotation
				} else {
					this.quotation = this.originalQuotation.filter(el => {
						val = val.toLowerCase()
						let currency_name = el.currency_name.toLowerCase()
						let legal_name = el.legal_name.toLowerCase()
						if (currency_name.indexOf(val) > -1 || legal_name.indexOf(val) > -1) {
							return el
						}
					})
				}
			},
			// 跳转
			jump(currency_name, legal_name, currency_id) {
				if (currency_name === this.currency_name && currency_id === this.currency_id) this.showSelectCoin = false
				const url =
					`/pages/transaction/options?currency_name=${currency_name}&legal_name=USDT&currency_id=${currency_id}`
				this.showSelectCoin = false
				uni.redirectTo({
					url: url
				})
			},


			//查看是否已添加自选
			async checkOptional() {
				const token = this.$store.state.token
				if (!token) return
				//getOptionalList: () => vm.$u.get("/optional/list"),
				//const ret = await this.$u.api.market.getOptionalList()
				this.$https.initDataToken({
					url: 'optional/list',
					type: 'GET'
				}, (res, msg) => {
					const item = res.find(item => item.currency_id === this.currency_id)
					if (item) {
						this.optionalId = item.id
					}
				});
			},
			//添加自选
			addOptional() {
				this.$u.throttle(() => {
					const {
						currency_id,
						i18n
					} = this
					let data = {
						currency_id: currency_id
					};
					this.$https.initDataToken({
						url: 'optional/add',
						type: 'POST',
						data
					}, (res, msg) => {
						this.optionalId = res.id
						this.$utils.showToast(i18n.addOptionalSuccess)
					})
				}, 1200)
			},
			// 删除自选
			delOptional() {
				this.$u.throttle(() => {
					const {
						optionalId,
						i18n
					} = this

					let data = {
						id: optionalId
					};
					this.$https.initDataToken({
						url: 'optional/del',
						type: 'POST',
						data
					}, (res, msg) => {
						this.optionalId = 0
						this.$utils.showToast(i18n.delOptionalSuccess)
					})
				}, 1200)
			},
			// 获取已购买的秒合约列表和余额
			getPayable() {
				// const token = this.$store.state.token
				// if (!token) return
				// this.$u.api.market.getPayable().then(res => {
				//   const data = res.message.find(item => item.id == this.currency_id)
				//   //this.microInsurance = data.user_wallet.micro_with_insurance
				// })
			},
			//提交购买
			async submit() {
				this.disabled = true;
				this.oldPrice = this.symbolQuotation1.close;
				this.actualPL = null;
				let amountTipStr = this.$t("amountTip");
				this.amountNum = Number(this.amountNum);
				console.log(this.amountNum)
				if (this.amountNum == null || this.amountNum === "" || this.amountNum <= 0) {
					this.disabled = false;
					this.$utils.showToast(amountTipStr);
					return false;
				}
				
				let po = this.currentTimer;
				let min_amount = Number(po.min_amount).toFixed(0);
				let max_amount = Number(po.max_amount).toFixed(0);
				
				if (this.amountNum < min_amount || this.amountNum > max_amount) {
					amountTipStr = amountTipStr + "[" + min_amount + "-" + max_amount + "USDT]";
					this.$utils.showToast(amountTipStr);
					return false;
				}

				const ret = await this.$utils.showModal(this.$t("common.hint"), this.$t("confirm_place_order"))
				if (!ret) return;

				this.$u.throttle(() => {
					const {
						buyDirection,
						symbolQuotation,
						currentTimer,
						amountNum,
						i18n
					} = this
					// match_id,currency_id,type,seconds,amountNum
					const {
						id,
						legal_id
					} = symbolQuotation;
					if (!amountNum || !this.$u.test.amount(amountNum)) {
						this.disabled = false;
						this.$utils.showToast(i18n.plsIptCrtNumber)
						return false
					}
					let currencyName = this.currency_name;


					let data = {
						currencyName: currencyName,
						currency_id: symbolQuotation.currency_id,
						type: buyDirection,
						seconds: currentTimer.seconds,
						lang: uni.getStorageSync("lang") || "en",
						number: amountNum
					};


					this.$https.initDataToken({
						url: 'microtrade/submitV2',
						type: 'POST',
						data
					}, (res, msg) => {

						this.showBuyConfirm = false;
						this.buyInfo = res;
						this.orderID = res.id;
						this.showCountDown = true

						this.showCurrentPrice = false;

						this.countDownTime = Number(this.buyInfo.seconds)
						if (this.countDown) clearInterval(this.countDown)
						let start_time = new Date();
						this.start_time = start_time.getTime();
						
						this.countDown = setInterval(() => {

							if (this.countDownTime >= 1) {
								this.countDownTime--
							} else {
								this.countDownTime = 0;
								clearInterval(this.countDown)
								this.countDown = null
								// 獲取交易結果
								this.showCountDown = false;
								this.disabled = false;

								let data = {
									id: this.buyInfo.id
								};

								//this.$utils.showToast(this.$t("common.success"));

								this.orderInfo();

								this.getLeverDeal(this.currency_id, 23);

								this.getSecondsListFn()

								// this.$https.initDataToken({
								//   url: 'microtrade/get_result',
								//   type: 'GET',
								//   data
								// }, (res, msg) => {
								//   this.actualPL = Number(res.fact_profits)
								//   //console.log(res);
								// });
								// this.continueTrade()
							}
						}, 1000)
						//

					})
				}, 3000)

			},
			//接收seconds信息
			getSecondsList(data) {

			},
			//继续交易
			continueTrade() {
				// 关闭所有弹窗
				this.showBuyConfirm = false
				this.showCountDown = false
			},
			//返回
			back() {
				const from = this.from || 'index'
				const url = `/pages/${from}/${from}`
				uni.reLaunch({
					url
				})

			}
		},
		computed: {
			...mapState(['token','isConnect']),
			tabList() {
				return [{
						name: this.$t("tabA0"),
						id: 0
					},
					{
						name: this.$t("tabA3"),
						id: 3
					},
					{
						name: this.$t("tabA1"),
						id: 1
					},
					{
						name: this.$t("tabA2"),
						id: 2
					}
				]
			},
			i18n() {
				return this.$t("transaction")
			},
			symbol() {
				return this.currency_name + '/' + this.legal_name
			},
			nav() {
				const i18n = this.$t("transaction")
				return [{
					name: i18n.futures
				}, {
					name: i18n.seconds
				}, {
					name: i18n.coins
				}]
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
			//预计盈亏，
			expectedPL() {
				// 计算方法
				// open_price 购买时的价格，newprice实时价格

				const {
					symbolQuotation1,
					buyInfo,
					countDownTime
				} = this
				const amountNum = Number(this.amountNum);
				const profit_ratio = Number(buyInfo.profit_ratio);
				if (this.oldPrice > 0) {
					const open_price = buyInfo.open_price ? Number(buyInfo.open_price) : 0
					//如果countDownTime==0，就不用计算了
					//如果还没下单，也不用计算
					if (!countDownTime) {
						return parseFloat((amountNum * (profit_ratio/100) * -1).toFixed(4))
					}

					const newprice = Number(symbolQuotation1.close); //最新价

					const buyDirection = Number(buyInfo.type)

					// open_price == newprice ，盈亏为0
					if (this.oldPrice === newprice) {
						return parseFloat((amountNum * (profit_ratio/100) * -1).toFixed(4))
					}

					// 如果购买方向和当前涨跌情况相同,则计算结果为 (number * profit_ratio) / 100
					
					console.log("预测结果==> profit_ratio=>" + profit_ratio + "  amountNum==>" + amountNum + " newprice=" +
						newprice + " oldPrice=" + this.oldPrice);
					if ((buyDirection === 1 && Number(newprice) > Number(this.oldPrice)) || (buyDirection === 2 && Number(
							this.oldPrice) > Number(newprice))) {
						return parseFloat(((amountNum * profit_ratio) / 100).toFixed(4))
					} else {
						// 如果购买方向和当前涨跌情况相反,则计算结果为 - amountNum
						return parseFloat((amountNum * (profit_ratio/100) * -1).toFixed(4))
					}
				} else {
					// return 0;
					return parseFloat((amountNum * (profit_ratio/100) * -1).toFixed(4))
				}

			}
		},
		watch: {
			isConnect(val) {
				  if(val) {
					  this.onMessage()
				  }
			},
		},
		onHide() {
			// 取消订阅
			this.$store.dispatch('onWebScoketUnSub', [])
			clearTimeout(this.timeId)
		},
		onUnload() {
			clearTimeout(this.timeId)
		}

	}
</script>

<style>
	page {
		padding-bottom: 120 rpx;
		background: #000000;
	}
</style>
<style lang="scss" scoped>


	.actualPL {
		width: 200 rpx;
		height: 200 rpx;
		display: flex;
		margin: 0 auto;
		justify-content: center;
		align-items: center;
		font-size: 66 rpx;
		color: #fff;
		border-radius: 50%;

		&.green {
			background: #35AD7A !important;
		}

		&.red {
			background: #ca3f64 !important;
		}
	}

	.market {
		color: rgba(255, 255, 255, .7);

		.search {
			border-bottom: 2 rpx solid rgba(255, 255, 255, .1);

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

	.footer {
		// position: fixed;
		// left: 0;
		// right: 0;
		// bottom: 60px;
		// z-index: 20;
		border-radius: 20 rpx 20 rpx 0 0;
		padding: 20 rpx 30 rpx;
		color: rgba(255, 255, 255, .5);
		display: flex;
		align-items: center;
		justify-content: space-between;

		.btn {
			color: rgba(255, 255, 255, .9);
			text-align: center;
			width: 49.8%;
			background-size: 100% 100%;
			height: 80 rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			&.btn1 {
				//background-image: url('../../static/image/icon/k-icon-1.png');

			}

			&.btn2 {
				//background-image: url('../../static/image/icon/k-icon-2.png');
				position: relative;
				//left: -20rpx;
			}
		}
	}

	.trade-input {
		border: 2 rpx solid #eee;
		border-radius: 10 rpx;
		display: block;
		padding: 14 rpx 20 rpx;
		font-weight: bold;

		.input-placeholder {
			color: rgba(51, 51, 51, 0.4);
			font-weight: normal;
		}
	}

	.count-down {
		width: 100px;
		height: 100px;
		display: flex;
		margin: 0 auto;
		justify-content: center;
		align-items: center;
		font-size: 66 rpx;
		color: #000;
		font-weight: 700;
		border-radius: 50px;
	}

	.fixed-count-down {
		position: fixed;
		left: 30 rpx;
		width: 80px;
		height: 80px;
		border-radius: 60px;
		bottom: 30vh;
		z-index: 10;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #000;
		font-weight: 700;
		flex-direction: column;
	}

	.activeTab {
		color: #ffffff;
		width: 20px;
		border-width: 12px;
		padding-bottom: 8px;
		border-bottom: 3px solid #ffffff;
		border-bottom-right-radius: 1rpx;
		-webkit-border-bottom-right-radius: 1rpx;

		border-bottom-left-radius: 1rpx;
		-webkit-border-bottom-left-radius: 1rpx;

		font-weight: 700;
	}

	.normalTab {
		width: auto;

		border-width: 12px;
		padding-bottom: 8px;
		color: #939393;
		font-weight: 700;
	}

	.tran_btn {
		--bg: linear-gradient(180deg, #000000 0%, #000000 100%);
		--border: linear-gradient(to right, #1FA2FF, #12D8FA 50%, #A6FFCB);
		border: 1px solid transparent;
		/* var(--bg)背景色  var(--border)边框色 */
		background-image: var(--bg), var(--border);
		background-origin: border-box;
		background-clip: content-box, border-box;
		border-radius: 6px;
		text-align: center;


	}

	.tran_btn_normal {
		background: #242424;
		background-origin: border-box;
		background-clip: content-box, border-box;
		border-radius: 6px;
		text-align: center;
		color: #aaaaaa;


	}

	.connect_btn {
		background: -webkit-gradient(linear, left top, right top, color-stop(10%, #1FA2FF), color-stop(55.21%, #12D8FA), to(#A6FFCB));
		background: -webkit-linear-gradient(left, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
		background: -o-linear-gradient(left, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
		background: linear-gradient(90deg, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
	}

	#amountNumId:hover,
	#amountNumId:focus {
		border: 1px solid #ffffff;
	}

	#amountNumId {
		border: 1px solid #333;
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

	.seconds-box {
		&_item {
			display: flex;
			flex-direction: column;
			flex: 0 0 24%;
			margin-right: calc(4% / 4);
			margin-bottom: calc(4% / 4);
			margin-bottom: 15rpx;

			/* 去除每行尾的多余边距 */
			&_item:nth-child(4n) {
				margin-right: 0;
			}

			/* 使最后一个元素的边距填满剩余空间 */
			&_item:last-child {
				margin-right: auto;
			}

			&_label {
				font-size: 36rpx;
				color: #939393;
				font-weight: 700;
				padding-top: 6rpx;
				padding-bottom: 3rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;
				box-sizing: border-box;
			}

			&_value {
				color: #1DAEFE;
				font-size: 28rpx;
				font-weight: 700;
				padding-bottom: 6rpx;
				padding-top: 3rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;
				box-sizing: border-box;
			}
		}
	}
</style>