<template>
  <view style="background: #000000">

    <view style="background: #000000;margin-left: 10px;margin-right: 8px;">
      <u-navbar showback="true" :custom-back="backFn" style="background: #FFFFFF">
        <view class="d-flex font-weight-bold" @click="showSelectCoin=true" style="text-align: left">
          <text class="font-size-36 mx-30" style="color: #ffffff;">{{ currency_name + '/USDT' }}</text>
          <image src="/static/icon_triangle_down_white_16.png" style="width:20px;height:20px;margin-left:2px;"></image>
        </view>
        <image src="/static/icon_my_home_paper_trade.png" slot="right" size="42" style="width: 20px;height: 20px;"
               @click="$utils.jump(`/pages/transaction/contract_kline?currency_name=${currency_name}&currency_id=${currency_id}&legal_name=USDT`)"></image>
       <image src="@/static/bib/icon_home_menu.png" slot="right" size="42"  @click="goHome"
              style="width: 20px;height:20px;margin-left: 20px;margin-right: 10px;"></image>


      </u-navbar>

      <view style="background: #000000;width: 100%;border: none;margin: 0;padding: 0;height: 200px;"
            v-if="showKlineChart">
        <topklinechart :currency_name="currency_name" legal_name="USDT"
                       @getSocketData="getSocketData" @buyListFn="buyListFn" @sellListFn="sellListFn"
                       @buyListCountFn="buyListCountFn" @sellListCountFn="sellListCountFn"
                       @closeTopKlineFn="closeTopKlineFn"
                       ref="child" style="margin-top:4px;width:100%;height: 200px;">
        </topklinechart>
      </view>

      <view class="px-10 py-10">
        <view class="d-flex-between-center" style="background: #000000;display: flex;flex-direction: row;"
              v-if="!showKlineChart">
          <view style="width:480rpx;">
            <timeKline :currency_name="currency_name" legal_name="USDT"
                       @getSocketData="getSocketData" @buyListFn="buyListFn" @sellListFn="sellListFn"
                       @buyListCountFn="buyListCountFn" @sellListCountFn="sellListCountFn"
                       ref="child" style="margin-top: -44px;width: 480rpx;">
            </timeKline>
          </view>
          <view style="color: #ffffff;text-align: left;margin-left: -40px;">
            {{ Number(symbolQuotation.now_price).toFixed(2) }}
          </view>
          <view style="flex:1;display: flex;">
          </view>
          <view style="display: flex;">
            <view
                style="justify-content: flex-end;align-items: flex-end;text-align: right;display: flex;flex-direction: row;"
                @click="showKlineChart=true;">
              <text style="color: #939393;font-size: 13px;line-height: 20px;height: 20px;">{{$t("more")}}</text>
              <image src="/static/icon_arrow_down_16.png" style="width: 20px;height: 20px;z-index: 99999;"></image>
            </view>
          </view>
        </view>

      <u-popup v-model="showSelectCoin" mode="bottom" length="850" contentBackgroundColor="#000000"
               :mask-custom-style="{background: 'rgba(0, 0, 0, 0.6)'}" :border-radius="0">
        <view class="status_bar"></view>
        <view class="px-30 market"  style="background: #121212;margin-top: 20px;">
          <view style="height: 10px;"></view>
          <view style="text-align: center;margin-top: -18px;">
            <image src="/static/icon_slide_handle.png"
                   style="width:30px;height:4px;margin-top: 0px;padding-top: 0px;"></image>
          </view>
 
          <view class="search d-flex align-items-center py-20" style="background: #242424;height: 32px;border-radius: 12px;line-height: 32px;">
               <image src="/static/bib/icon_common_search.png" style="width: 15px;height: 15px;margin-left: 10px;margin-top:2px;">
              <input type="text" class="input" :placeholder="$t('common.search')" confirm-type="search" placeholder-style="font-size:13px;"
                     @input="filterQuotation">
          </view>
		  <!-- 切换 -->
		  <scroll-view scroll-x style="width: 100%;">
		  	<view class="d-flex c-nav">
		  		<view @click="typeChange(index)" class="c-nav_item" :class="currentIndex === index ? 'c-nav_item-active' : ''" v-for="(item,index) in tabList" :key="index">{{item.name}}</view>
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
                  @click="jump(item.currencyName,'USDT',item.currency_id)">
              <view class="left">
                <text class="d-block">
                  <text class="font-size-28 font-weight-bold" style="color: #ffffff;">{{ item.currencyName }}</text>
                  <text class="font-size-22 opacity-50">/USDT</text>
                </text>
                <text class="d-block font-size-22 opacity-50">24H:{{ Number(item.volume) | setPrecision(2) }}
                </text>
              </view>
              <view class="text-center">
                <text class="d-block font-size-30 font-weight-bold">
                  {{ item.close | setPrecision(2) }}
                </text>
              </view>
              <view class="">
                <view class="right" :style="{backgroundColor:$utils.getColor(item.change)}" style="border-radius:4px;width: 60px;font-size: 12px;height: 20px;line-height: 20px;">
                  {{ Number(item.change).toFixed(2) + '%' }}
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
                <image src="/static/bib/icon_my_home_novice_community.png"
                       style="width: 22px;height: 22px;text-align: center;align-items: center;"
                       @click="delOptional"></image>

                <text style="text-align: center;color: #ffffff;width: 100%;">{{$t('leftmenu.learn')}}</text>
              </view>

              <view
                  style="flex: 1;margin-top: 0px;display: flex;flex-direction: column;text-align: center;align-items: center;">
                <image src="/static/icon_operate_rate.png"
                       style="width: 22px;height: 22px;text-align: center;align-items: center;"
                       @click="delOptional"></image>

                <text style="text-align: center;color: #ffffff;width: 100%;">{{$t('trading_Fee')}}</text>
              </view>

              <view
                  style="flex: 1;margin-top: 0px;display: flex;flex-direction: column;text-align: center;align-items: center;">

                <image src="/static/icon_collect_yes.png"
                       style="width: 22px;height: 22px;text-align: center;align-items: center;" v-if="optionalId>0"
                       @click="delOptional"></image>
                <image src="/static/icon_collect_no.png" v-else @click="addOptional"
                       style="width: 20px;height: 20px;text-align: center;align-items: center;"></image>

                <text style="text-align: center;color: #ffffff;width: 100%;">{{$t('add_favorities')}}</text>
              </view>


            </view>


          </view>
        </u-popup>

      <!-- 买入卖出和实时买卖 -->
      <view class="d-grid mt-0 align-items-center" style="grid-template-columns:2fr 1.2fr;background: #000000;">

        <!-- 买入卖出 -->
        <view class="pr-20 position-relative opacity-90" style="height: 820rpx;margin-top: -40px;">


          <view style="display: flex;width: 160px;display: flex"  v-if="lang === 'th' ">
            <view style="background:transparent;flex: 2;display: flex;border-radius: 4px;background: #222;"
                  @click="showWarehousePopFn">
              <view style="color: #ffffff;margin: 5px;font-weight: 500;margin-left: 8px;">{{warehouseText}}</view>
              <view><image src="/static/icon_triangle_down_white_16.png"  style="width: 20px;height:20px;margin: 5px;margin-top:5px;"></image></view>
            </view>
            <view style="background: #f1f1f1;flex: 1;display: flex;border-radius: 4px;margin-left: 10px;" @click="showLeverPopFn">
              <view style="color: #ffffff;margin: 5px;font-weight: 500;margin-left: 8px;">{{leverNumber}}X</view>
              <view><image src="/static/icon_triangle_down_white_16.png"  style="width: 20px;height:20px;margin: 5px;margin-top:5px;"></image></view>
            </view>
          </view>

          <view style="display: flex;width: 170px;display: flex"  v-else-if="lang === 'vi' ">
            <view style="background: #222;flex: 2;display: flex;border-radius: 4px;" @click="showWarehousePopFn">
              <view style="color: #ffffff;margin: 5px;font-weight: 500;margin-left: 8px;">{{warehouseText}}</view>
              <view><image src="/static/icon_triangle_down_white_16.png"  style="width: 20px;height:20px;margin: 5px;margin-top:5px;"></image></view>
            </view>
            <view style="background: #f1f1f1;flex: 1;display: flex;border-radius: 4px;margin-left: 10px;" @click="showLeverPopFn">
              <view style="color: #ffffff;margin: 5px;font-weight: 500;margin-left: 8px;">{{leverNumber}}X</view>
              <view><image src="/static/icon_triangle_down_white_16.png"  style="width: 20px;height:20px;margin: 5px;margin-top:5px;"></image></view>
            </view>
          </view>
          <view style="display: flex;width: 210px;display: flex"  v-else-if="lang === 'id' ">
            <view style="background: #222;flex: 2;display: flex;border-radius: 4px;" @click="showWarehousePopFn">
              <view style="color: #ffffff;margin: 5px;font-weight: 500;margin-left: 8px;">{{warehouseText}}</view>
              <view><image src="/static/icon_triangle_down_white_16.png"  style="width: 20px;height:20px;margin: 5px;margin-top:5px;"></image></view>
            </view>
            <view style="background: #f1f1f1;flex: 1;display: flex;border-radius: 4px;margin-left: 10px;" @click="showLeverPopFn">
              <view style="color: #ffffff;margin: 5px;font-weight: 500;margin-left: 8px;">{{leverNumber}}X</view>
              <view><image src="/static/icon_triangle_down_white_16.png"  style="width: 20px;height:20px;margin: 5px;margin-top:5px;"></image></view>
            </view>
          </view>

          <view style="display: flex;width: 180px;display: flex;height: 30px;line-height: 30px;"  v-else>
            <view style="background: #222;flex: 1;display: flex;border-radius: 4px;border: 1px solid #242424;" @click="showWarehousePopFn">
              <view style="color: #ffffff;margin:auto;font-weight: 500;margin-left: 8px;">{{warehouseText}}</view>
              <view><image src="/static/icon_triangle_down_white_16.png"  style="width: 20px;height:20px;margin: 5px;margin-top:5px;"></image></view>
            </view>
            <view style="background:transparent;flex: 1;display: flex;border-radius: 4px;margin-left: 10px;background: #222;" @click="showLeverPopFn">
              <view style="color: #ffffff;margin:auto;font-weight: 500;margin-left: 8px;">{{leverNumber}}X</view>
              <view><image src="/static/icon_triangle_down_white_16.png"  style="width: 20px;height:20px;margin: 5px;margin-top:5px;"></image></view>
            </view>
          </view>



          <view class="d-grid-columns-2" style="margin-top: 7px;">
            <view class="btn btn1" :class="buyDirection == 0 ? 'active' : 'inActiveBtn'" @click="buyDirection=0">
              <text class="d-block">{{$t('kaicang')}}</text>
            </view>
            <view class="btn btn2" :class="buyDirection == 1 ? 'active' : 'inActiveBtn'" @click="buyDirection=1">
              <text class="d-block">{{$t('pingcang')}}</text>
            </view>
          </view>

          <view class="d-flex mt-20 buy-type font-size-30 d-flex-between-center" @click="showLimitMarketPopUp=true;"
                style="border: 0rpx solid #444;background: #222;height: 35px;line-height: 35px;border-radius: 4px;">
            <text style="color: #ffffff;margin-left: 6px;" v-if="buyType===0">
              {{ i18n.marketPrice }}
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
                style="border: 1rpx solid #444;background: #222;height: 35px;border-radius: 4px;display: flex;line-height: 35px;">
            <div style="background:transparent;width: 35px;height: 35px;" @click="reduceFn">
              <u-image src="/static/icon_sum.png"
                       style="width: 20px;height: 20px;margin: 6px;"/>
            </div>
            <input type="digit" @input="priceNumber" v-model="price" class="" :placeholder="i18n.price"
                   placeholder-style="color:#939393;"
                   style="color: #ffffff;border: 0rpx solid #444;background: #222;text-align: center;line-height: 35px;height: 35px;">

            <div style="background:transparent;width: 35px;height: 35px;margin-left: 5px;" @click="addFn"
            >
              <u-image src="/static/icon_add.png"
                       style="width: 20px;height: 20px;margin: 6px;background: transparent"/>
            </div>

          </view>

          <view class="mt-20 " style="border: 0rpx solid #444;background: #222;height: 35px;line-height: 35px;
          border-radius: 4px;display: flex;color: #ffffff;text-align: center;justify-content: center;align-items: center;"
                v-else>
            {{ $t("transaction.coinBuyPrice") }}
          </view>


          <view class="mt-20">
            <view class="d-flex-between-center">
              <text class="d-block" style="color: #939393;">{{i18n.number}}</text>
              <input type="digit" @input="changeNumber" v-model="number"
                     class="trade-input mt-10"
                     style="color: #ffffff;width: 90px;background: #222;">

              <text class="d-block" style="color: #939393;">USDT</text>
            </view>

            <uv-slider v-model="number" :min="0" :max="user_lever*0.98" block-size="12"
                       block-color="#1DAEFE" class="mt-32"
                       style="margin-left: -10px;padding-left: 0;margin-right: -10px;"
                       :activeColor="buyDirection==1 ? $downColor : $upColor" :use-slot="true">



              <view class="">
                <view class="slide-button">
                  <text></text>
                  <text></text>
                  <text></text>
                </view>
              </view>
            </uv-slider>
          </view>
          <view class="mt-46">
            <!--
            <text class="d-block"  style="color: #666666;">{{i18n.multiple}}</text>
            <view class="d-flex mt-16" v-if="buyDirection==0">
              <view class="" v-for="item in muit">
                <text class="tag  mr-16 px-20 font-size-30" :class="multiple == item ? 'tag-success' : 'tag-plain-success'"
                      @click="multiple=item">{{item}}</text>
              </view>
            </view>


            <view class="d-flex mt-16" v-else>
              <view class="" v-for="item in muit">
                <text class="tag  mr-16 px-20 font-size-30" :class="multiple == item ? 'tag-error' : 'tag-plain-error'" @click="multiple=item">{{item}}</text>
              </view>
            </view>
            -->


            <view class="mt-20 d-flex-between-center">
              <view class="d-flex align-items-center " @click="rememberPasswordFunc">

                <u-image :src="zyzsIv"
                         style="width: 20px;height: 20px;margin: 6px;background: transparent"/>
                <text style="color: #939393;">{{ $t('transaction.setProfitLoss') }}</text>
              </view>

              <u-image src="/static/uzx/icon_i_gray_16.png"
                       style="width: 20px;height: 20px;margin-left: 10px;background: transparent"/>
              <view style="flex: 1;"></view>
            </view>

            <!-- 设置止盈止损  -->
            <div class="mt10 input-item clear priceID" v-if="zyzs == true"
                 style="display: flex;background:transparent;margin-top: 8px;
                 width: 240px;
                 display: flex;height:35px;border-radius: 3px;">


              <input
                  type="digit" @input="targetProfitPriceChange"  id="target_profit_price"
                  v-model="target_profit_price"
                  :placeholder="$t('transaction.targetProfitPrice')"
                  placeholder-style="color:#939393;font-size:14px;"
                  style="color: #ffffff;font-size: 14px;
                    background: #222;flex: 1;line-height: 35px;margin: 5px;height: 35px;padding-left: 10px;border-radius: 4px;"
              >


              <input
                  type="digit"
				  @input="stopLossPriceChange"
                  id="stop_loss_price"
                  v-model="stop_loss_price"
                  :placeholder="$t('transaction.stopLossPrice')"
                  placeholder-style="color:#939393;font-size:14px;"
                  style="font-size:14px;flex: 1;color: #ffffff;line-height: 35px;margin: 5px;background: #222;margin-left: 10px;height: 35px;padding-left: 10px;border-radius: 4px;"
              >


            </div>


          </view>

          <view class="mt-26" style="justify-content: left;display: flex;line-height: 20px;">
            <text class="d-block" style="color: #939393;font-size: 14px;line-height: 20px;">{{ i18n.balance }}</text>
            <view class="d-flex">
              <text style="color: #ffffff;text-align: left;margin-left: 3px;line-height: 20px;font-size: 14px;">
                {{ user_lever }}USDT
              </text> <!--合约余额-->
            </view>
            <view style="flex: 1;"></view>
            <view style="text-align: right;justify-content: right;align-items: flex-end">
              <u-image src="/static/uzx/icon_balance_transfer.png" @click="$utils.jump('/pages/fund/transfer2')"
                       style="width: 20px;height: 20px;background: transparent;margin-right: 10px;"/>

            </view>
          </view>

          <view class="mt-16" style="justify-content: left;display: flex;line-height: 20px;">
            <text class="d-block" style="color: #939393;font-size: 14px;line-height: 20px;">{{ i18n.margin }}
              <!-- 保证金 --></text>
            <text style="color: #ffffff;text-align: left;margin-left: 3px;line-height: 20px;font-size: 14px;">
              {{ number }}
            </text>
          </view>
          <view class="mt-16" style="justify-content: left;display: flex;line-height: 20px;">
            <text class="d-block" style="color: #939393;font-size: 14px;line-height: 20px;">{{ i18n.handlingFee }}
            </text>
            <text style="color: #ffffff;text-align: left;margin-left: 3px;line-height: 20px;font-size: 14px;">
              {{ handlingFee }}<!-- 手续费 --></text>
          </view>

          <!-- <number-box :precision="4"></number-box> -->


        </view>
        <!-- 实时购买 -->
        <view class="overflow-hidden" style="height: 900rpx;" v-if="buyList.length">
          <view class="d-flex-between-center font-size-22 py-0">
            <text  style="color: #939393;">{{i18n.price}}(USDT)</text>
            <text style="color: #939393;">{{i18n.amount}}({{legal_name}})</text>
          </view>
          <view class="">
            <view class="d-flex-between-center px-10 py-6 position-relative font-size-22"
                  v-for="item in buyList.slice(0,10)">
              <text :style="{color:$downColor}">{{Number(item[0]).toFixed(5)}}</text>
              <text style="color: #ffffff;"> {{Number(item[1]).toFixed(5)}} </text>

              <view class="position-absolute opacity-20" style="top: 0;bottom: 0;right: 0;"
                    :style="{background:$downColor,width:(item[1]/buyListCount*100*10+'%')}"></view>
            </view>
          </view>
          <view>
            <text class="d-block font-size-28 mr-12 font-weight-bold" style="margin-top: 8px;text-align: center"
                  :style="{color:$utils.getColor(symbolQuotation.change)}">{{symbolQuotation.now_price | setPrecision(symbolQuotation.precision_length)}}</text>
          </view>
          <view class="" style="margin-top: 12px;">
            <view class="d-flex-between-center px-10 py-6 position-relative font-size-22"
                  v-for="item in sellList.slice(0,10)">
              <text :style="{color:$upColor}">{{Number(item[0]).toFixed(5)}}</text>
              <text style="color: #ffffff;">{{Number(item[1]).toFixed(5)}}</text>
              <view class="position-absolute opacity-20" style="top: 0;bottom: 0;right: 0;"
                    :style="{background:$upColor,width:(item[1]/sellListCount*100*10+'%')}"></view>
            </view>
          </view>
        </view>
        <view v-else class="text-center w-100 d-flex align-items-center justify-content-center" style="height: 804rpx;">
          <u-loading class="mx-auto" mode="flower" color="rgba(255,255,255,.8)" size="50"></u-loading>
        </view>

      </view>


        <u-popup v-model="showConfirmPop"   border-radius="10" length="96%" contentBackgroundColor="#000000"
                 :mask-custom-style="{background: 'rgba(0, 0, 0, 0.6)'}" >
        <view class="p-30">
          <text class="d-block font-size-30 font-weight-bold" style="color: #ffffff;">{{buyDirection ? i18n.sell : i18n.buy}}</text>
          <view class="d-flex-between-center border-bottom-white py-16">
            <text class="opacity-50" style="color: #ffffff;">{{i18n.tradingPair}}</text>
            <text class="font-weight-bold"  style="color: #ffffff">{{currency_name + '/' + legal_name}}</text>
          </view>
          <view class="d-flex-between-center border-bottom-white py-16">
            <text class="opacity-50" style="color: #ffffff;">{{i18n.direction}}</text>
            <text class="font-weight-bold" :class="buyDirection ? 'text-error' : 'text-success'">{{buyDirection ? i18n.sell : i18n.buy}}</text>
          </view>
          <view class="d-flex-between-center border-bottom-white py-16">
            <text class="opacity-50" style="color: #ffffff;">{{i18n.number}}</text>
            <text class="font-weight-bold" style="color: #ffffff;">{{number}}</text>
          </view>
          <view class="d-flex-between-center border-bottom-white py-16">
            <text class="opacity-50" style="color: #ffffff;">{{i18n.multiple}}</text>
            <text class="font-weight-bold" style="color: #ffffff;">{{leverNumber}}</text>
          </view>
          <view class="d-flex-between-center border-bottom-white py-16">
            <text class="opacity-50" style="color: #ffffff;">{{i18n.handlingFee}}</text>
            <text class="font-weight-bold" style="color: #ffffff;">{{handlingFee}}</text>
          </view>
          <view class="d-flex-between-center border-bottom-white py-16">
            <text class="opacity-50" style="color: #ffffff;">{{i18n.margin}}</text>
            <text class="font-weight-bold" style="color: #ffffff;">{{number}}</text>
          </view>
          <view class="d-flex-between-center mt-30">
            <button class="secondary-button font-size-28 w-48 py-0" @click="showConfirmPop = false">{{$t("common.cancel")}}</button>
            <button class="w-48 font-size-28 py-0"  :disabled="disabledBtn"
                    @click="confirm"  :class="buyDirection ? 'error-button' : 'success-button'">{{$t("common.confirm")}}</button>
          </view>
        </view>
      </u-popup>

        <u-popup v-model="showLeverPop" mode="bottom" contentBackgroundColor="#242424"
                 @close="showLeverPop = false" :closeable="true" :closeOnClickOverlay="true"
                 border-radius="10" length="30%" :mask-custom-style="{background: 'rgba(0, 0, 0, 0.6)'}" :border-radius="0">

          <view class="p-30" style="background: #121212;border-top: 1px solid #111111;">
            <view style="text-align: center;margin-top: -26px;">
              <image src="/static/icon_slide_handle.png"
                     style="width:30px;height:4px;margin-top: 0px;padding-top: 0px;"></image>
            </view>
            <text class="d-block font-size-30 font-weight-bold" style="color: #ffffff;text-align: center;margin-top: 5px;">
              {{ $t('lever00') }}
            </text>


            <div class="flex btn-wrap" style="display: flex;margin-top: 16px;">



              <div style="background:transparent;width: 40px;height: 40px;margin-left: 5px;" @click="reduceLeverFn"
              >
                <u-image src="/static/icon_add.png"
                         style="width: 20px;height: 20px;margin: 10px;background: transparent"/>
              </div>


              <div style="flex: 1;height: 40px;line-height: 40px;margin-left: 5px;">
                <input
                    disabled
                    type="text"
                    readonly="readonly"
                    :placeholder='$t("lever.pprice")'
                    style="width:100%;color:#ffffff;background: #242424;
                  border-bottom: none;
                  flex: 1;
                  line-height: 40px;
                  margin-top: 0px;
                  height: 40px;text-align: center;"
                    :value="value2">

              </div>
              <div style="background:transparent;width: 40px;height: 40px;" @click="addLeverFn">
                <u-image src="/static/icon_sum.png"
                         style="width: 20px;height: 20px;margin: 10px;background: #ffffff;"/>
              </div>


            </div>
            <u-slider v-model="value1" :min="1" :max="100" class="mt-32"
                      :use-slot="true"></u-slider>

            <view class="d-flex-between-center mt-30">

              <button class="font-size-28 py-0  connect_btn"
                      style="width: 100%;margin: 5px;border-radius: 18px;color: #000000;font-weight: 500;"
                      @click="confirmLeverFn" :class="buyDirection ? 'error-button' : 'success-button'">
                {{ $t("common.confirm") }}
              </button>
            </view>

          </view>
        </u-popup>

      <!-- 保证金模式2023-08-28  -->
      <u-popup v-model="showWarehousePop"   mode="bottom"
               @close="showLeverPop = false" :closeable="true" :closeOnClickOverlay="true"
               border-radius="10" length="20%">
        <view class="p-30" style="background: #121212;border-top: 1px solid #111111;">
          <view style="text-align: center;margin-top: -26px;">
            <image src="/static/icon_slide_handle.png"
                   style="width:30px;height:4px;margin-top: 0px;padding-top: 0px;"></image>
          </view>

          <text class="d-block font-size-30 font-weight-bold" style="color: #ffffff;text-align: center">{{$t('margin_model')}}</text>


          <view class="d-flex-between-center mt-30">

            <button class="font-size-28 w-48 py-0" @click="warehouse = 0"
                    :class="warehouse == 0 ? 'box2024' : 'error-button inActiveModel'"  style="color: #ffffff;border-radius: 0px;"

            >{{$t("isolated")}}</button>

            <button  class="font-size-28 w-48 py-0"   @click="warehouse = 1"
                     :class="warehouse == 1 ? 'box2024' : 'error-button inActiveModel'"  style="color: #ffffff;border-radius: 0px;">{{$t("cross")}}</button>
          </view>


          <view class="d-flex-between-center mt-30">

            <button class="font-size-28 py-0 connect_btn"  style="width: 100%;margin: 5px;border-radius: 18px;color: #000000;font-weight: 500;"
                    @click="confirmMarginFn"  :class="buyDirection ? 'error-button' : 'success-button'">{{$t("common.confirm")}}</button>
          </view>
          <view style="height: 12px;background: #000000;"></view>

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
                    @click="buyType=0;showLimitMarketPopUp=false;">{{$t('market_order')}}
              </view>

            </view>

            <view style="height: 20px;width: 100%;display: flex;flex-direction: column;
          margin-top: 20px;background: transparent;justify-content:center;text-align: center;">

              <view style="color: #ffffff;font-weight: 700;"
                    @click="buyType=1;showLimitMarketPopUp=false;">{{$t('limit_order')}}
              </view>

            </view>

            <view style="height: 20px;width: 100%;display: flex;flex-direction: column;
          margin-top: 20px;background: transparent;justify-content:center;text-align: center;">

              <view style="color: #ffffff;font-weight: 700;"
                    @click="showLimitMarketPopUp=false;">{{$t('c2c.cancel')}}
              </view>
            </view>


          </view>
        </u-popup>
    </view>

      <view style="margin-top: -40px;">
        <view style="left: 20rpx;right: 20rpx;display: flex;">
          <button class="success-button mt-60 py-0 font-size-28"
                  @click="openLong"
                  style="height: 70rpx;line-height: 70rpx;flex: 1;margin: 10px;background: #25A750;border-radius: 20px;">
            {{$t("kaiduo")}}
          </button>
          <button class="error-button mt-60 py-0 font-size-28"  @click="openShort"
                  style="height: 70rpx;line-height: 70rpx;flex: 1;margin: 10px;background: #ca3f64;border-radius: 20px;">
            {{$t("kaikong")}}
          </button>
        </view>

      </view>

<!--      <view>-->
<!--        <slider-->
<!--            ref="slider"-->
<!--            :value="sliderValue"-->
<!--            @change="onChange"-->
<!--            :min="0"-->
<!--            :max="100"-->
<!--            :step="1"-->
<!--        />-->
<!--        <view class="scale-container">-->
<!--          <view v-for="(scale, index) in scales" :key="index" :style="{ left: `${scale}%` }"></view>-->
<!--        </view>-->
<!--      </view>-->




<!--    &lt;!&ndash; 持仓列表 &ndash;&gt;-->
<!--    <u-gap height="16" bg-color="#242424" style="opacity: 0.6;"></u-gap>-->

      <div class="inblock"
           style="display: flex;border-bottom: 1px solid #242424;padding-bottom: 11px;padding-top: 10px;background: #000000;">
        <div style="margin-left: 15px;">
          <span @click="load(0)" :class="{'active': load_type == 0,'inactive': load_type != 0  }">{{
              $t("lever.lvchi")
            }}</span>
        </div>
       <div style="margin-left: 20px;">
         <span @click="load(1)" :class="{'active': load_type == 1,'inactive': load_type != 1  }">{{
             $t("lever.nowentrust")
           }}</span>
       </div>

        <!-- <div style="margin-left: 20px;">
          <span @click="load(2)" :class="{'active': load_type == 2,'inactive': load_type != 2  }">{{
              $t("spont_assets")
            }}</span>
        </div> -->
        <!--
        <div style="margin-left: 10px;">
            <span @click="load(3)"   :class="{'active': load_type == 3,'inactive': load_type != 3  }"  >{{
                $t("lever.closed")
              }}({{tabCCount}})</span>
        </div>
        <div style="margin-left: 10px;">
            <span
                @click="load(4)"  style="margin-right: 0;"
                :class="{'active': load_type == 4,'inactive': load_type != 4  }"

            >{{ $t("lever.revoked") }}({{tabDCount}})</span
            >
        </div>
        -->
        <div style="flex: 1;text-align: right;justify-content: right;margin-right:5px;">

          <image src="/static/icon_to_all.png"
                 @click="$utils.jump(`/pages/transaction/contract_order?currency_id=${currency_id}&legal_id=23`,'navigateTo')"
                 style="width:20px;height:20px;text-align: right;"></image>
        </div>


      </div>



    <view class="" style="background: #000000;padding-bottom: 100px;">
      <view class="mx-20" style="background: #000000;margin-top:20px;padding-bottom:90px;" v-if="load_type == 2">
        <view v-for="item in swapAssetsList">
          <view class="p-30 mb-10 text-white" style="display: flex;justify-content: space-between;">
            <view style="display: flex;">

              <image v-if="item.currency_name ==='USDT' "
                     src="https://admin.coinbmex.com/coin/icon-USDT.png"
                     style="width: 32px;height: 32px;margin-left: -2px;"></image>

              <image :src="'https://admin.coinbmex.com'+item.logo" v-else
                     style="width: 32px;height: 32px;margin-left: -2px;"></image>

              <view
                  style="color: #ffffff;line-height: 32px;height: 32px;margin-left: 8px;font-weight: 500;font-size: 15px">
                {{ item.currency_name }}
              </view>
            </view>
            <view style="display: flex;flex-direction: column;">
              <view style="color: #ffffff;font-weight: 500;font-size: 15px;margin-top: 5px;">
                {{ Number(item.lever_balance).toFixed(2) }} USDT
              </view>

              <view style="color: #939393;margin-top: 3px;font-size: 12px;text-align: right">= {{ Number(cnyusdt*Number(item.lever_balance)).toFixed(2) }}</view>

            </view>
          </view>
        </view>
        <default-page v-if="!swapAssetsList&&swapAssetsList.length==0" style="background: #000000;"></default-page>
      </view>
      <view v-else>
        <view v-if="positionList.length" class="p-30 border-bottom text-black" v-for="item in positionList">
          <view class="d-flex">
            <view class="d-flex align-items-center">
              <text class="tag py-0" :class="item.type == 1 ? 'tag-success' : 'tag-error'">{{item.type == 1 ? i18n.buy : i18n.sell}}</text>
              <text class="ml-8" style="color: #ffffff;">{{item.symbol}}</text>
              <text class="ml-8"  style="color: #ffffff;">x{{item.share + i18n.lots}}</text>
              <text class="ml-8" style="color: #ffffff;">x{{item.multiple+i18n.multiple}}</text>
            </view>
          </view>

          <view class="d-grid-columns-3" style="justify-content: space-between;display: flex;">
            <view class="my-8">
              <text class="d-block font-size-22 opacity-50" style="color: #ffffff;">{{i18n.open}}</text>
              <text class="d-block font-size-30 font-weight-bold mt-8" style="color: #ffffff;">{{Number(item.price).toFixed(4)}}</text>
            </view>
            <view class="my-8">
              <text class="d-block font-size-22 opacity-50" style="color: #ffffff;">{{i18n.targetProfitPrice}}</text>
              <text class="d-block font-size-30 font-weight-bold mt-8" style="color: #ffffff;">{{Number(item.target_profit_price).toFixed(4)}}</text>
            </view>
            <view class="my-8">
              <text class="d-block font-size-22 opacity-50" style="color: #ffffff;text-align: right;">{{i18n.updatePrice}}</text>
              <text class="d-block font-size-30 font-weight-bold mt-8" style="color: #ffffff;">{{item.now_price ? Number(item.now_price).toFixed(4) : '0.000'}}</text>
            </view>

          </view>
          <view class="d-grid-columns-3" style="justify-content: space-between;display: flex;">

            <view class="my-8">
              <text class="d-block font-size-22 opacity-50" style="color: #ffffff;">{{i18n.stopLossPrice}}</text>
              <text class="d-block font-size-30 font-weight-bold mt-8" style="color: #ffffff;">{{Number(item.stop_loss_price).toFixed(4)}}</text>
            </view>
            <view class="my-8">
              <text class="d-block font-size-22 opacity-50" style="color: #ffffff;">{{i18n.margin}}(USDT)</text>
              <text class="d-block font-size-30 font-weight-bold mt-8" style="color: #ffffff;">{{!isNaN(item.caution_money)&&Number(item.caution_money).toFixed(4)}}</text>
            </view>
            <view class="my-8">
              <text class="d-block font-size-22 opacity-50" style="color: #ffffff;">{{i18n.overnightMoney}}</text>
              <text class="d-block font-size-30 font-weight-bold mt-8" style="color: #ffffff;">{{Number(item.overnight_money).toFixed(4)}}</text>
            </view>

          </view>
          <view class="d-grid-columns-3" style="justify-content: space-between;display: flex;">

            <view class="my-8">
              <text class="d-block font-size-22 opacity-50" style="color: #ffffff;">{{i18n.handlingFee}}</text>
              <text class="d-block font-size-30 font-weight-bold mt-8" style="color: #ffffff;">{{Number(item.trade_fee).toFixed(4)}}</text>
            </view>
            <view class="my-8">
              <text class="d-block font-size-22 opacity-50" style="color: #ffffff;text-align: right;">{{i18n.openTime}}</text>
              <view class="d-block font-size-26 font-weight-bold mt-8  opacity-90">
                <text class="d-block" style="color: #ffffff;">{{item.transaction_time.slice(0,10)}}</text>
                <text class="d-block" style="color: #ffffff;text-align: right;">{{item.transaction_time.slice(10,20)}}</text>
              </view>
            </view>
			
            <view class="my-8" v-if="item.status == 1">
              <text class="d-block font-size-22 opacity-50" style="color: #ffffff;">{{$t('invest.estimatedIncome')}}</text>
              <text class="d-block font-size-30 font-weight-bold mt-8" :style="{color:$utils.getColor(item.profits)}" style="color: #ffffff;">{{Number(item.profits).toFixed(4)}}</text>
            </view>
            <view class="my-8" v-if="item.status == 3">
              <text class="d-block font-size-22 opacity-50" style="color: #ffffff;">{{i18n.totalPandL}}</text>
              <text class="d-block font-size-30 font-weight-bold mt-8" :style="{color:$utils.getColor(item.profits)}" style="color: #ffffff;">{{Number(item.profits).toFixed(4)}}</text>
            </view>

          </view>
		  <view class="d-flex align-items-center justify-content-end mt-20" v-if="item.status === 0">
		  	<button class="primary-button font-size-22 py-0 px-30 mr-0 mr-20" @click="onCancel(item)"
		  	        style="color: #000000;background: #f7f7f7;border-radius: 20px;opacity: 1;font-size: 16px;font-weight: 700;min-width: 250rpx;">{{$t("transaction.cancelEntrust") }}</button>
		  </view>
          <view class="d-flex align-items-center mt-20" style="flex-direction: row-reverse;" v-if="item.status == 1">
            <button class="error-button font-size-22 py-0 px-30 mx-0" v-if="item.order_type == 1" @click="cover(item.id)"
                    style="color: #000000;background: #f7f7f7;border-radius: 20px;opacity: 1;font-size: 16px;font-weight: 700;min-width: 250rpx;">{{i18n.cover}}</button>
            <button class="warning-button font-size-22 py-0 px-30 mx-0" v-else-if="item.order_type == 2" @click="selfHold(item.id)"
                    style="color: #000000;background: #f7f7f7;border-radius: 20px;opacity: 1;font-size: 16px;font-weight: 700;min-width: 250rpx;">{{i18n.transSelfHold}}</button>
            <button class="primary-button font-size-22 py-0 px-30 mr-0 mr-20" @click="editFunc(item)"
                    style="color: #000000;background: #f7f7f7;border-radius: 20px;opacity: 1;font-size: 16px;font-weight: 700;min-width: 250rpx;">{{i18n.setProfitLossV2}}</button>
          </view>
        </view>
        <default-page v-if="!positionList||positionList.length==0" style="background: #000000;"></default-page>
      </view>
    </view>

    <!-- 设置止盈止损 -->
    <u-popup v-model="showEdit" border-radius="10" length="90%">
      <view class="p-30"  style="background: #000;">
        <text class="d-block text-center font-size-32"  style="color: #000;">{{i18n.setProfitLoss}}</text>
        <view class="d-flex-between-center mt-20">
          <text style="color: #fff;">{{i18n.targetProfitPrice}}</text>
          <view class="">
            <u-number-box v-model="profitPrice" :positive-integer="false" input-width="140" size="22"></u-number-box>
            <text class="d-block font-size-22 mt-8 opacity-50" style="color: #000;">{{i18n.expectedProfit + ':' + expectedProfit}}</text>
          </view>

        </view>
        <view class="d-flex-between-center mt-20">
          <text style="color: #fff;">{{i18n.stopLossPrice}}</text>
          <view class="">
            <u-number-box v-model="lossPrice" :positive-integer="false" input-width="140" size="22"></u-number-box>
            <text class="d-block font-size-22 mt-8 opacity-50"  style="color: #ffffff;">{{i18n.expectedLoss + ':' + expectedLoss}}</text>
          </view>
        </view>
        <view class="d-flex-between-center mt-30">
          <button class="secondary-button font-size-24 w-48 py-0" @click="showEdit = false"  style="color: #ffffff;">{{$t("common.cancel")}}</button>
          <button class="w-48 primary-button font-size-24 py-0" @click="setStopFn"   style="color: #ffffff;">{{$t("common.confirm")}}</button>
        </view>
      </view>
    </u-popup>
    </view>
  </view>
</template>

<script>

//import UImage from "../../uview-ui/components/u-image/u-image.vue";
// import {isNumeric} from "echarts/lib/util/number";
// import {makeBackground} from "echarts/lib/component/helper/listComponent";
import timeKline from "./timeKline.vue";
import { mapState } from 'vuex'
export default {
  components: {timeKline},
  data() {
    return {
      disabledBtn:false,
      sliderValue: 0,
      scales: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],


      swapAssetsList: [],
      showLimitMarketPopUp: false,
      showKlineChart: true,
      showMoreBottomMenu: false,

      btnStrA0:'',
      btnStrA1:'',

      showWarehousePop: false,
      warehouseText: this.$t('cross'),
      warehouse: 1,// 0:逐仓 1：全仓
      value1: 1,
      leverNumber: 100,
      showLeverPop: false,//杠杆倍数
      target_profit_price: "",//止盈
      stop_loss_price: "",//止损
      lang: 'en',
      zyzs: true,
      zyzsIv: "/static/uzx/icon_coin_select_yes.png",
      expectedProfit: "",
      expectedLoss: "",

      currentItem:{},
      showEdit:false,
      editId:0,
      profitPrice:0,//设置的止盈价
      lossPrice:0,//设置的止损价

      tabACount:0,
      tabBCount:0,
      tabCCount:0,
      tabDCount:0,

      page: 1,
      load_type: 0,
      contract_fee:0,
      currency_name: 'BTC',
      legal_name: 'USDT',
      currency_id: 32,
      symbolQuotation: {now_price:0,close:0,change:0},
      symbolQuotation1:{now_price:0,close:0,change:0},
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
      number: 0, //交易手数,
      numTmp:1,
      buyType: 0, //0市价，1限价,
      multiple:100, //倍数
      balance:0,//余额
      margin:0,//保证金
      share:0,
      handlingFee:0,//手续费,
      user_lever:0,// 个人的资金
      showConfirmPop:false,
      price:'',
      positionList:[],
      muit:[100,150,200], //倍数

      platform: '',
      pageVisible: false,
      socketOpen: false,
      pushUUID: "",
      cnyusdt:7.21,
	  currentIndex: 0,
	  timeId: null
    };
  },
  onLoad(options) {
	  this.$https.initDataToken({
	    url: 'lever/getList',
	    type: 'GET',
	  }, (res, msg) => {
	    console.log(res)
	  });
	  
    let {
      currency_name,
      legal_name,
      currency_id,
      buy_direction
    } = options
    this.currency_name = currency_name || 'BTC';

    let url = "https://admin.coinbmex.com/getCNYFn";
    let data = [];
    let that = this;
    uni.request({
      url: url,
      method: "GET",
      dataType: "json",  //指定服务器返回的数据类型
      //jsonpCallback: "showData",  //指定回调函数名称
      success: function (response) {

        that.cnyusdt=Number(response.data.message);

      }
    });


    this.legal_name = legal_name || 'USDT'
    this.currency_id = currency_id ||32
    buy_direction = buy_direction || 0
    this.buyDirection = Number(buy_direction);

    //
    this.$https.initDataToken({
      url: 'lever/getMatchInfo?currency_id='+this.currency_id,
      type: 'GET',
      data
    }, (res, msg) => {
		console.log(res)
      let matchInfo=res.matchInfo;
      this.symbolQuotation.lever_share_num=matchInfo.lever_share_num;
      console.log("张数信息==>"+this.symbolQuotation.lever_share_num);
    });
    //


    const _this = this
    // uni.setNavigationBarTitle({
    //   title:_this.$t("home.futures")
    // });
    this.contractFeeFn();

    this.getMySwapAssetsFn();

    this.load(0);
  },
  onShow() {
    let token=uni.getStorageSync("token");
    if (token==null||token.length<10){
      uni.redirectTo({
        url:'/pages/setting/left_menu'
      })
    }else {
      let pushUUID = uni.getStorageSync("pushUUID");
      if (pushUUID == null || pushUUID.length < 10) {
        pushUUID = this.uuid();

        uni.setStorageSync('pushUUID', pushUUID)
      }
      this.pushUUID = pushUUID;

      this.lang = this.$store.state.lang || 'en';
      if (this.lang === "vi") {
        this.btnStrA0 = this.$t("kaicang");
        this.btnStrA1 = this.$t("pingcang");
      } else {
        this.btnStrA0 = this.i18n.buy + '/' + this.i18n.long;
        this.btnStrA1 = this.i18n.sell + '/' + this.i18n.short;
      }
	  this.getCoinData()
      //uni.showTabBar()
      //this.startSocket()
      //查看是否已添加自选
      this.checkOptional()
      this.getQuotation();
      this.getClosedOrderList();
      setTimeout(()=> {
      	this.getDepthFn();
      },1200)

      this.lang = this.$store.state.lang || 'en'
      //this.subMarketDepth();

      let token=uni.getStorageSync("token");
      if (token&&token.length>10) {
        this.$https.initDataToken({
          url: 'setOnline',
          type: 'POST',
        }, (res, msg) => {
          console.log("设置在线" + JSON.stringify(res));
        });
      }
    }
	clearInterval(this.timeId)
	this.timeId = setInterval(() => {
		this.getLeverDeal({
			isRefresh: false
		})
		this.getContractWalletList()
		this.getMySwapAssetsFn()
	},2500)
	
	this.okxWS()
	this.onMessage()
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
	  // 取消委托
	  onCancel(item) {
	  	let lang = uni.getStorageSync("lang") || "en";
	  	this.$https.initDataToken({
	  		url: 'lever/cancel',
	  		type: 'POST',
	  		data: {
	  			lang,
	  			id: item.id
	  		}
	  	}, (res, msg) => {
	  		this.$utils.showToast(this.$t("cancelSuccess"))
	  		this.getLeverDeal({
				isRefresh: true
			});
			this.getContractWalletList()
	  	});
	  },
	  
	  priceNumber(e) {
	  	this.price = Math.abs(Number(e.detail.value))
	  },
	  changeNumber(e) {
	  	this.number = Math.abs(Number(e.detail.value))
	  },
	  targetProfitPriceChange(e) {
		  this.target_profit_price = Math.abs(Number(e.detail.value))
	  },
	  stopLossPriceChange(e) {
	  	this.stop_loss_price = Math.abs(Number(e.detail.value))
	  },
    openLong(){
      if (this.number==0||this.number==""){
        this.$utils.showToast(this.$t("transaction.p_jine"))
      }else {
        this.showConfirmPop = true;
        this.buyDirection = 0;
        this.disabledBtn = false;
      }
    },
    openShort(){
      if (this.number==0||this.number==""){
        this.$utils.showToast(this.$t("transaction.p_jine"))
      }else {
        this.showConfirmPop = true;
        this.buyDirection = 1;

        this.disabledBtn = false;
      }
    },

    onChange(value) {
      this.$toast('当前值：' + value);
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
		  this.symbolQuotation.now_price = data.close;
		  for (let i = 0; i < this.positionList.length; i++) {
		  	if(this.positionList[i].currency == this.symbolQuotation.currency_id) {
				this.$set(this.positionList[i],'now_price',data.close)
				break
		  	}
		  }
	 }
	 
      //this.symbolQuotation1 = data;
      //this.symbolQuotation1.change = change;

      if (this.positionList&&this.positionList.length>0){
          for(let po of this.positionList){
			  if(po.symbol === data.symbol) {
				    let origin_price=po.origin_price;
				     let type= po.type; //== 1
				     if (type==1){
				        let cha=data.close-origin_price;
				        cha=Number(cha);
				        let multiple=po.multiple;
				         multiple=Number(multiple);
				         let num=po.number;
				         num=Number(num);
				         // let profit=cha*multiple*num;
				         // po.profits = profit;
						 // 改 盈亏 =（当前价-开仓价）×手数×杠杆
						 po.profits = (Number(data.close) - Number(po.origin_price)) * Number(po.share) * Number(po.multiple);
				  				 
				     }else{
				       let cha=origin_price- data.close;
				       cha=Number(cha);
				       let multiple=po.multiple;
				       multiple=Number(multiple);
				       let num=po.number;
				       num=Number(num);
				       // let profit=cha*multiple*num;
				       // po.profits = profit;
				  		// 改 盈亏 =（当前价-开仓价）×手数×杠杆
				  		po.profits = (Number(po.origin_price) - Number(data.close)) * Number(po.share) * Number(po.multiple);
				     }
					 po.now_price = Number(data.close)
					 // break
			  }
		  }
      }
    },

    closeTopKlineFn() {
      this.showKlineChart = false;
    },
    getDepthFn(){
		let coin = this.currency_name.toUpperCase() + '-USDT'
		this.$https.initData({
			  url: 'getHbDepth?coin=' + coin,
			  type: 'GET'
		},(res,msg)=> {
			  let data = res
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
    		 if(k.symbol?.toUpperCase() === coin && k.type === 'market_depth') {
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

    confirmMarginFn(){
      if (this.warehouse===0){
         this.warehouseText= this.$t("isolated");
      }else{
        this.warehouseText= this.$t("cross");
      }
      this.showWarehousePop=false;
    },
    confirmLeverFn(){
      let str=this.value2+"";
      str=str.replace("x","")
      this.leverNumber= str;
      this.showLeverPop = false;

      this.calc();

    },
    reduceFn() {
      this.price = Number(this.price) - 0.01;
      this.price = Number(this.price).toFixed(2);
    },
    addFn() {
      this.price = Number(this.price) + 0.01;
      this.price = Number(this.price).toFixed(2);
    },

    addLeverFn(){
      this.value1=this.value1+1;
      if (this.value1>=100){
        this.value1= 100;
      }
    },
    reduceLeverFn(){
      this.value1=this.value1-1;
      if (this.value1 <=1){
        this.value1= 1;
      }
    },
    showLeverPopFn(){
       this.showLeverPop = true;
    },
    showWarehousePopFn(){
      this.showWarehousePop = true;
    },

    getContractWalletList() {
      let lang = uni.getStorageSync("lang") || "en";
      this.$https.initDataToken({
        url: 'wallet/contractsWalletList?lang='+lang,
        type: 'POST'
      }, (res, msg) => {


        this.swapAssetsList = res.lever_wallet.balance;
        const convert = 0;

        let change_walletUSDT = 0;
        this.convert = convert.toFixed(4)

      })
    },
    getMySwapAssetsFn(){
      //legal_id: 23
      //currency_id: 32
      let that= this;
      //that.$u.api.market.getLeverDeal(that.currency_id,23).then(res=>{
      //getLeverDeal: (currency_id,legal_id) => vm.$u.post("/lever/deal",{currency_id,legal_id}),
      let data={currency_id:that.currency_id,legal_id:23};
      this.$https.initDataToken({
        url: 'lever/deal',
        type: 'POST',
        data
      }, (res, msg) => {

        let message=res;

          that.user_lever=message.user_lever;
          that.user_lever=Number(that.user_lever).toFixed(6);
      });
    },
    rememberPasswordFunc() {

      this.zyzs = !this.zyzs;
      if (this.zyzs) {
        this.zyzsIv = "/static/uzx/icon_coin_select_yes.png";
      } else {
        this.zyzsIv = "/static/uzx/icon_coin_select_no.png";
      }

    },
    checkboxChange: function (e) {

    },
    //获取交易手续费
    contractFeeFn(){
      let that = this;
      this.$https.initDataToken({
        url: 'contractFee',
        type: 'GET'
      }, (res, msg) => {
        that.contract_fee=res.contract_fee;

        that.calc();

      });
    },
    //设置止盈止损
    editFunc(item){
      this.currentItem = item
      this.editId = item.id
      //设置止盈和预期盈利
      this.profitPrice = item.target_profit_price > 0 ? Number(item.target_profit_price)  : Number(item.update_price);

      //设置止损和预期亏损
      this.lossPrice = item.stop_loss_price > 0 ? Number(item.stop_loss_price)  : Number(item.update_price);

      this.showEdit = true
    },
    //查询更多订单
    moreOrderFn(){
      this.$utils.jump("pages/transaction/contract_order?currency_id="+this.currency_id+"&legal_id=23","navigateTo");
    },
    //订单栏目 切换
    load(val){
      this.load_type = val;
	  switch(val) {
		  case 0:
		  case 1:
		  this.positionList=[];
		  this.getLeverDeal({
			  isRefresh: true
		  });
		  break
		  case 2:
		  this.swapAssetsList = []
		  this.getContractWalletList();
		  break
	  }
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
    //获取杠杆的一些信息和持仓列表
    async getLeverDeal({
		currency_id,
		legal_id,
		isRefresh = true
	}){
      //this.$u.api.market.getleverTrade(this.currency_id,23,this.page,this.load_type).then(res=>{
      //getleverTrade: (currency_id,legal_id,page,status) => vm.$u.post("/lever/my_trade",{currency_id,legal_id,page,status}),
	  let status = ''
	  switch(this.load_type) {
		  case 0:
		  status = 1
		  break
		  case 1:
		  status = 0
		  break
	  }
      let data={
		// currency_id,
  //       legal_id,
        page:this.page,
		status
      };
	  let quotationList = []
	  if(isRefresh) {
		quotationList = await this.getQuotationList()
	  }
	  
      this.$https.initDataToken({ 
        url: 'lever/my_trade',
        type: 'POST',
        data
      }, (res, msg) => {
        let order = res.data
        this.info = res.rate_profits_total
        //this.info.profits_all = this.info.profits_total
		if(isRefresh) {
			quotationList.forEach(item => {
				order.forEach(oItem => {
					if(oItem.symbol == item.currency_name + '/' + item.legal_name) {
						if (oItem.type==1){
							 //盈亏 =（当前价-开仓价）×手数×杠杆
							 oItem.profits = (Number(item.close) - Number(oItem.origin_price)) * Number(oItem.share) * Number(oItem.multiple);		  				 
						}else{
							//盈亏 =（开仓价-当前价）×手数×杠杆
							oItem.profits = (Number(oItem.origin_price) - Number(item.close)) * Number(oItem.share) * Number(oItem.multiple);
						}
						oItem.now_price = item.now_price
					}
				})
			})
		}else {
			for (let i = 0; i < this.positionList.length; i++) {
				  try{
					  if(order[i].id == this.positionList[i].id) {
						  order[i].profits = this.positionList[i].profits
						  order[i].now_price = this.positionList[i].now_price
					  }
				  }catch(e){
					//TODO handle the exception
				  }
			}
		}
		  let positionList = order
		  this.positionList = positionList
		  if (this.load_type === 1){
			this.tabACount = this.positionList.length;
		  }
		  if (this.load_type === 0){
			this.tabBCount = this.positionList.length;
		  }
		  if (this.load_type === 3){
			this.tabCCount = this.positionList.length;
		  }
		  if (this.load_type === 4){
			this.tabDCount = this.positionList.length;
		  }
      })
    },
	getQuotationList() {
		return new Promise((resolve,reject) => {
			this.$https.initData({
			  url: 'getHbList',
			  type: 'GET'
			},(res,msg) => {
				resolve(res)
			})
		})
	},
    getClosedOrderList(){
      //this.$u.api.market.getleverTrade(this.currency_id,23,this.page,3).then(res=>{
      let data={currency_id:this.currency_id,
        legal_id:23,
        page:this.page,
        status:3
      };
      this.$https.initDataToken({
        url: 'lever/my_trade',
        type: 'POST',
        data
      }, (res, msg) => {
        let order = res.data
        if(order.length) {
          this.tabCCount = order.length;
        }

      })
    },

    filterQuotation(e) {
      let val = e.detail.value
      if (!val) {
        this.quotation = this.originalQuotation
      } else {
        this.quotation = this.originalQuotation.filter(el => {
          val = val.toLowerCase()
          let currency_name = el.currencyName.toLowerCase()
          if (currency_name && currency_name.indexOf(val) > -1) {
            return el
          }
        })
      }
    },

    //查看是否已添加自选
    async checkOptional() {
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
      this.$u.throttle(()=>{
        const {
          currency_id,
          i18n
        } = this
        let data={currency_id:currency_id};
        this.$https.initDataToken({
          url: 'optional/add',
          type: 'POST',
          data
        }, (res, msg) => {
          this.optionalId = res.id
          this.$utils.showToast(i18n.addOptionalSuccess)
        })
      },3000)
    },
    // 删除自选
    delOptional() {
      this.$u.throttle(()=>{
        const {
          optionalId,
          i18n
        } = this
        let data={id:optionalId};
        this.$https.initDataToken({
          url: 'optional/del',
          type: 'POST',
          data
        }, (res, msg) => {
          this.optionalId = 0
          this.$utils.showToast(i18n.delOptionalSuccess)
        })
      },3000)
    },
    // 跳转
    jump(currency_name, legal_name, currency_id) {
      if (currency_name === this.currency_name && legal_name === this.legal_name && currency_id === this
          .currency_id) this.showSelectCoin = false
      const url =
          `/pages/transaction/contract?currency_name=${currency_name}&legal_name=${legal_name}&currency_id=${currency_id}`
      this.showSelectCoin = false
	  uni.redirectTo({
      	url: url
      })
    },
    //提交修改止盈止损
    setStopFn(){
      let that = this;
      const {currentItem,profitPrice,lossPrice} = that;
      //that.$u.api.market.setStop(currentItem.id,profitPrice,lossPrice).then(res=>{
      //setStop: (id,target_profit_price,stop_loss_price) => vm.$u.post("/lever/setstop",{id,target_profit_price,stop_loss_price}),
      let data={id:currentItem.id,
        target_profit_price:profitPrice,
        stop_loss_price:lossPrice
      };

      this.$https.initDataToken({
        url: 'lever/setstop',
        type: 'POST',
        data
      }, (res, msg) => {
        that.showEdit = false;

        that.$utils.showToast(res);

        that.getLeverDeal({
			currency_id: that.symbolQuotation.currency_id,
			legal_id: that.symbolQuotation.legal_id,
			isRefresh: true
		});

        // const has = that.list.findIndex(item => item.id == currentItem.id)
        // let item = that.list[has]
        // item.target_profit_price = profitPrice
        // item.stop_loss_price = lossPrice
        // that.list.splice(has,1,item)

      })
    },
    confirm(){
	  let lang=uni.getStorageSync("lang")||"en";
      if (this.number==0||this.number==""){
        //please_input_amount
        this.$utils.showToast(this.$t("please_input_amount"),'error')
      }else {
        this.$u.throttle(() => {
          const {number, multiple, symbolQuotation, buyDirection, buyType, i18n, warehouse} = this
          const {currency_id, legal_id} = symbolQuotation
          let price = this.price
          // if (buyType === 0) {
          //   price = '999'
          // }
          if ((!price || !this.$u.test.amount(price)) && buyType === 1) {

            this.$utils.showToast(i18n.plsIptCrtPrice)
            return false
          }
          //submitLever: (obj) => vm.$u.post("lever/submit",obj),
          //this.$u.api.market.submitLever({
          let data = {
            u: this.number,
            share: this.number,
            multiple: multiple,
            legal_id: legal_id,
            currency_id: currency_id,
            type: buyDirection === 0 ? 1 : 2,
            status: buyType === 0 ? 1 : 0,
            target_price: price,
            password: '',
            target_profit_price: this.target_profit_price,
            stop_loss_price: this.stop_loss_price,
			lang,
			warehouse_type: warehouse,
			currency_name: this.currency_name + '/USDT'
          };
          this.disabledBtn = true;
          this.$https.initDataToken({
            url: 'lever/submit',
            type: 'POST',
            data
          }, (res, msg) => {

            this.showConfirmPop = false
            this.$utils.showToast(res, 'success')

            this.getLeverDeal(
			{
				currency_id: this.symbolQuotation.currency_id,
				legal_id: this.symbolQuotation.legal_id,
				isRefresh: true
			}
			)
            this.getMySwapAssetsFn();
          })
        }, 3000)
      }
    },
    //平仓
    cover(id){
      let that=this;
      that.$u.throttle(async ()=>{
        const {i18n} = that
        const ret = await that.$utils.showModal(that.$t("common.hint"),i18n.confirmCover)
        if(!ret) return
        let data={id:id}
        this.$https.initDataToken({
          url: 'lever/close',
          type: 'POST',
          data
        }, (res, msg) => {
          that.$utils.showToast(res)
          that.getLeverDeal(
		  {
			  currency_id: that.symbolQuotation.currency_id,
			  legal_id: that.symbolQuotation.legal_id,
			  isRefresh: true
		  }
		  )
          that.tabACount=that.tabACount-1;
          if (that.tabACount<0){
            that.tabACount=0;
          }
		  that.getContractWalletList()
          that.tabCCount=this.tabCCount+1;

        })
      },3000)
    },
    //转自持
    selfHold(id){
      this.$u.throttle(async ()=>{
        const {i18n} = this
        const ret = await this.$utils.showModal(this.$t("common.hint"),i18n.confirmSelfHold)
        if(!ret) return

        let data={transaction_id:id};
        this.$https.initDataToken({
          url: 'follow/selfHolding',
          type: 'POST',
          data
        }, (res, msg) => {
          this.$utils.showToast(res)
          this.getLeverDeal({
			  currency_id: this.symbolQuotation.currency_id,
			  legal_id: this.symbolQuotation.legal_id,
			  isRefresh: true
		  })
        })
      },3000)
    },
    //计算保证金手续费
    calc(){
      this.multiple=this.leverNumber;

      const {symbolQuotation,buyDirection,multiple,number} = this
      let spread = Number(symbolQuotation.spread);
      spread=0;
	  console.log(symbolQuotation)
      let lever_share_num = Number(symbolQuotation.lever_share_num);
      console.log("每张面值==>"+lever_share_num);

      const lever_trade_fee = Number(symbolQuotation.lever_trade_fee)
      const prices  = Number(symbolQuotation.now_price);


      try {
        if (!isNaN(symbolQuotation.now_price) && prices > 0) {

          let spreadPrices = parseFloat((prices * 1) / 100);

          let pricesTotal = 0;
          if (buyDirection === 0) {
            // 如果方向是买
            pricesTotal = parseFloat(prices + 0);//pricesTotal = parseFloat(prices + spreadPrices);
          } else {
            pricesTotal = parseFloat(prices - 0);//pricesTotal = parseFloat(prices - spreadPrices);
          }
          //
          let val4Sheet= lever_share_num*Number(this.symbolQuotation.now_price).toFixed(2);//一张面值多少U
		  let sheetAmount=number/val4Sheet;
          if (sheetAmount<2){
            //return  this.$utils.showToast(this.$t("lever_amount_min")+2*val4Sheet+"USDT", 'error');
          }
		  console.log(this.$t("lever_amount_min")+2*val4Sheet+"USDT")
		  console.log('sheetAmount',sheetAmount)
          sheetAmount=sheetAmount.toFixed(0);
          this.share=sheetAmount;

          let totalPrice = parseFloat(pricesTotal * lever_share_num * sheetAmount);
          this.margin = (totalPrice / multiple).toFixed(4);
          //this.handlingFee = parseFloat((totalPrice * lever_trade_fee) / 100).toFixed(4);
          this.handlingFee = parseFloat((this.number * this.contract_fee) / 100).toFixed(4);//2023-05-15 19:57修改

        }
      }catch (e){
        console.log(e);
      }


    },
  },
  computed: {
	  ...mapState(['isConnect']),
    // number(){
    //    if (this.numTmp==1){
    //      return 100;
    //    }
    //   else if (this.numTmp==0){
    //     return 1;
    //   }else {
    //      let tmp= 100 - this.numTmp;
    //      if (tmp==0){
    //        tmp=1;
    //      }
    //      return tmp;
    //
    //    }
    // },
	tabList() {
		return [
			{name:this.$t("tabA0"),id:0},
			{name:this.$t("tabA3"),id:3},
			{name:this.$t("tabA1"),id:1},
			{name:this.$t("tabA2"),id:2}
		]
	},
    value2() {

      if (this.value1 === 0||this.value1 === 1) {
        return "100x";
      }
      if (this.value1 === 100) {
        return "1x";
      }
      let num = Math.ceil(100-this.value1 * 1);



      return num + "x";

    },
    i18n() {
      return this.$t("transaction")
    },
    symbol() {
      return this.currency_name + '/' + this.legal_name
    },
    quotationNav(){
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
        }]
    },

  },
  watch:{
	  isConnect(val) {
	  		  if(val) {
	  			  this.onMessage()
	  		  }
	  },
    multiple(){
      this.calc()
    },
    number(){
      this.calc()
    },
    'symbolQuotation.now_price'(){
      this.calc()
    }
  },
  onHide(){
// 取消订阅
	this.$store.dispatch('onWebScoketUnSub',[])
	clearInterval(this.timeId)
  },
  onUnload() {

  }
}
</script>

<style lang="scss" scoped>
page{
  background: #000000;
}
.market {
  color: rgba(255, 255, 255, .7);

  .search {
    //border-bottom: 2rpx solid rgba(255, 255, 255, .1);

    .input {
      height: 38rpx;
      flex: 1;

      .input-placeholder {
        color: #fff;
      }
    }
  }

  .market-item {
    overflow: hidden;
    padding: 20rpx 0;
    border-top: 2rpx solid rgba(0, 0, 0, .04);
    align-items: center;
    display: grid;
    grid-template-columns: 1.1fr 1fr 1fr;

    .right {
      margin-left: auto;
      width: 120rpx;
      height: 50rpx;
      line-height: 50rpx;
      text-align: center;
      border-radius: 10rpx;
      background-color: #15be97;
      color: #fff;
      font-size: 24rpx;
    }
  }
}

.btn {

  text-align: center;
  padding: 14rpx 0;
  background-size: 100% 100%;
  color: rgba(255, 255, 255, .9);
  border-radius: 8rpx;

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
      background-color: #ffffff;
      margin: 0 auto;
      height: 4rpx;
      border-radius: 6rpx;
      margin-top: 4rpx;
      transition: all .3s ease 0s;

    }

    &.active {
      &::after {
        background-color: #000000;

      }
    }
  }
}

.slide-button{
  width: 40rpx;
  height: 40rpx;
  background-color: #60B584;
  border-radius: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  opacity: 1;
  text{
    display: block;
    width: 2rpx;
    height: 60%;
    margin: 0 2rpx;
    background-color: #60B584;
  }
}

.trade-input{
  border: 2rpx solid #eee;
  border-radius: 10rpx;
  display: block;
  padding: 10rpx 20rpx;
  font-weight: bold;
  .input-placeholder{
    color: rgba(51, 51, 51, 0.4);
    font-weight: normal;
  }
}
.activeTabC{
  color: #ffffff;
  font-weight: 700;
  border-bottom: 2px solid #ffffff;
}
.inActiveTabC{
  color: #939393;
  border-bottom:0px solid #ffffff;
}

.inblock {
  margin: 4px;
  span.active {
    font-weight: 700;
    color: #ffffff;
    font-size: 16px;
    //border-bottom: 1px solid #2A64FB;
    padding-bottom: 6px;
    border-bottom-width: 2px;
  }
}

.inblock {
  span.inactive {
    font-size: 16px;
    color: #939393;
    font-weight: 700;
    border-bottom: none;
  }
}


.inActiveModel{
  background: transparent;
  color: #ffffff;
  border: 1px solid #333;
  border-radius: 8px;

}

.inActiveBtn{
  color: #ffffff;
  border-bottom: none;
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
.border_btn{
  border-color: -webkit-gradient(linear, left top, right top, color-stop(10%, #1FA2FF), color-stop(55.21%, #12D8FA), to(#A6FFCB));
  border-color: -webkit-linear-gradient(left, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
  border-color: -o-linear-gradient(left, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
  border-color: linear-gradient(90deg, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);

}
.box2024{

  color: #ffffff;
  background: transparent;
  border: 1px solid;
  border-image: radial-gradient(#1FA2FF 40%, #12D8FA 55.21%,#A6FFCB 100%) 1;
  border-radius: 8px;

}

.scale-container {
  position: relative;
  top: -25px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.scale-container view {
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #ccc;
}
.trade-input:focus,.trade-input:hover{
  border: 1px solid #ffffff;
}
.trade-input{
  border: 0rpx solid #444;

}
#target_profit_price:hover,#target_profit_price:focus{
  border: 1px solid #ffffff;
}
#stop_loss_price:hover,#stop_loss_price:focus{
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
