<template>
  <view style="background: #000000;padding-bottom: 200px;">
    <view class="status_bar"></view>
    <view class="mx-10 pt-10">
      <view class="d-flex-between-center">


      </view>

      <view class="d-flex-between-center mt-10 text-white ">

        <view class="d-flex align-items-center font-weight-bold" @click="showSelectCoin=true" style="text-align: left;">
          <text class="font-size-40" style="color: #ffffff;margin-left: 0px;text-align: left">
            {{ currency_name + '/' + legal_name }}
          </text>
          <!--          <text v-if="symbolQuotation1.change" class="tag"-->
          <!--                :class="symbolQuotation1.change > 0 ? 'tag-success' : 'tag-error'">{{ symbolQuotation1.change }}%-->
          <!--          </text>-->
          <image src="/static/icon_triangle_down_white_16.png" style="width:20px;height:20px;margin-left:2px;"></image>
        </view>
        <view class="d-flex align-items-center" style="width:80px;display: flex;">
          <view style="flex: 1;">
            <image src="/static/icon_to_all.png" style="width: 20px;height: 20px;"
                   @click="$utils.jump('/pages/transaction/seconds_order?match_id='+matchId+'&currency_id='+currency_id,'redirectTo')"></image>
          </view>


          <view style="flex: 1;">
            <image src="/static/icon_trade_more.png" @click="showMoreBottomMenu=true"
                   style="width: 20px;height: 20px;"></image>


          </view>


        </view>
      </view>
    </view>
    <!-- 所有行情列表 -->
    <u-popup v-model="showSelectCoin" mode="bottom" length="760" contentBackgroundColor="#000000"
             :mask-custom-style="{background: 'rgba(0, 0, 0, 0.6)'}" :border-radius="0">
      <view class="px-30 market" style="background: #121212;margin-top:0px;padding-top: 10px;">
        <view class="search d-flex align-items-center py-20"
              style="background: #242424;height: 32px;border-radius: 12px;line-height: 32px;">
          <image src="/static/bib/icon_common_search.png"
                 style="width: 15px;height: 15px;margin-left: 10px;margin-top:2px;">
            <input type="text" class="input" :placeholder="$t('common.search')" confirm-type="search"
                   placeholder-style="font-size:13px;"
                   @input="filterQuotation">
        </view>

        <view class="d-grid py-20" style="grid-template-columns:1.1fr 1fr 1fr;">
          <view class="d-flex align-items-center font-size-22 opacity-50" v-for="(item,index) in quotationNav"
                :class="item.align">
            <text>{{ item.name }}</text>
          </view>
        </view>
        <scroll-view scroll-y="true" style="height: 600rpx;">
          <view class="market-item" v-for="item in quotation"
                @click="jump(item.currencyName,32,item.id)">
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
                  stroke="white" stroke-width="1.4" stroke-linejoin="round"/>
              <path
                  d="M9.5013 14C11.6874 14 13.4596 12.6568 13.4596 11C13.4596 9.34315 11.6874 8 9.5013 8C7.31519 8 5.54297 9.34315 5.54297 11C5.54297 12.6568 7.31519 14 9.5013 14Z"
                  stroke="white" stroke-width="1.4" stroke-linejoin="round"/>
              <path d="M9.5 8V4" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.668 9C12.668 9 13.707 7 15.4388 7" stroke="white" stroke-width="1.4" stroke-linecap="round"
                    stroke-linejoin="round"/>
              <path d="M6.33333 9C6.33333 9 5.54167 7 3.5625 7" stroke="white" stroke-width="1.4" stroke-linecap="round"
                    stroke-linejoin="round"/>
              <path d="M7.1263 13.5C7.1263 13.5 4.7513 14.5 4.35547 18" stroke="white" stroke-width="1.4"
                    stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11.875 13.5C11.875 13.5 14.4479 14.5 14.6458 18" stroke="white" stroke-width="1.4"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <text style="text-align: center;color: #ffffff;width: 100%;">{{ $t("beginner_tutorial") }}</text>
          </view>


          <view
              style="flex: 1;margin-top: 0px;display: flex;flex-direction: column;text-align: center;align-items: center;"
              @click="$utils.jump('/pages/fund/transfer2')">

            <image src="/static/icon_no_asset_transfer.png"
                   style="width: 20px;height: 20px;text-align: center;align-items: center;"></image>

            <text style="text-align: center;color: #ffffff;width: 100%;margin-top: 3px;">{{ $t("fund.fundTransfer") }}
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
            <text class="font-size-22 opacity-30 text-white">
              {{ (symbolQuotation1.close * $store.state.fiat.rate).toFixed(2) }}{{ $store.state.fiat.currency_code }}
            </text>
            <text class="font-size-22 ml-12"
                  :style="{color:$utils.getColor(symbolQuotation1.change)}">{{ symbolQuotation1.change }}%
            </text>
          </view>
        </view>
        <view class="">
          <view class="d-flex">
            <text class="d-block opacity-60 text-white font-size-22">{{ i18n.dayHigh }}</text>
            <text class="d-block font-size-22 text-white ml-20" style="font-weight: 700;">{{ symbolQuotation1.high }}</text>
          </view>
          <view class="d-flex mt-8">
            <text class="d-block opacity-60 text-white font-size-22">{{ i18n.dayLow }}</text>
            <text class="d-block font-size-22 text-white ml-20" style="font-weight: 700;">{{ symbolQuotation1.low }}</text>
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
        <span :class="currentTab==0 ?'activeTab':'normalTab' " style="white-space: nowrap;">{{ $t('nav[2]') }}</span>
      </div>

      <div
          style="font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;margin: 20px;width: auto;margin-left: 10px;"
          @click="changeTab(1)">
        <span :class="currentTab==1 ?'activeTab':'normalTab' "
              style="white-space: nowrap;">{{ $t('transaction.currentEntrust') }}</span>
      </div>

      <div
          style="font-size: 14px;color: #bbbbbb;font-family:'NotoSansSC-Bold';cursor: pointer;margin: 20px;width: auto;margin-left: 10px;"
          @click="changeTab(2)">
        <span :class="currentTab==2 ?'activeTab':'normalTab' "
              style="white-space: nowrap;">{{ $t('transaction.historyEntrust') }}</span>
      </div>
      <view style="flex: 1;">

      </view>
      <view
          style="justify-content: flex-end;align-items: flex-end;text-align: right;margin-right: 30px;margin-top: 17px;">
        <image src="/static/icon_to_all.png" style="width: 20px;height: 20px;"
               @click="$utils.jump('/pages/transaction/seconds_order?match_id='+matchId+'&currency_id='+currency_id,'redirectTo')"></image>
      </view>


    </div>


    <view class="p-30"  v-if="currentTab==0">
      <view style="display: flex;">
        <view style="flex: 1;color: #939393;font-size:14px;justify-content: flex-start">
          {{$t('current_price')}}
        </view>
        <view style="flex: 1;color: #f5f5f5;font-size:16px;justify-content: flex-end">
          <view style="text-align: right;color: #939393;font-size: 14px;">
            {{$t('market_fee')}}
          </view>
        </view>
      </view>
      <view style="display: flex;margin-top: 5px;">
        <view style="flex: 1;color: #1DAEFE;font-size:16px;justify-content: flex-start">
          {{ Number(symbolQuotation1.close).toFixed(4) }}
        </view>
        <view style="flex: 1;color: #1DAEFE;font-size:16px;justify-content: flex-end">
          <view style="text-align: right;">
            20%/00:00:37
          </view>
        </view>
      </view>


      <view class="d-flex-between-center py-40">
        <text style="font-weight: 700;">{{$t('trading_crypto')}}</text>
        <!--        <text class="font-weight-bold">{{ currency_name + '/' + legal_name }}</text>-->
      </view>


      <view class="d-flex-between-center py-0" style="display: flex;margin-top: -20px;">
        <view :class="currentPayCoin==0 ?'tran_btn':'tran_btn_normal' " style="flex: 1;margin: 7px;"  @click="currentPayCoin=0">
          <view
              style="font-weight: 700;font-size: 18px;margin-top: 6px;margin-bottom: 6px;margin-left: 12px;margin-right: 12px;">
            USDT
          </view>
        </view>
        <view  style="flex: 1;margin: 7px;"  >
          <view
              style="font-weight: 700;font-size: 18px;margin-top: 6px;margin-bottom: 6px;margin-left: 12px;margin-right: 12px;">

          </view>
        </view>
        <view  style="flex: 1;margin: 7px;" >
          <view
              style="font-weight: 700;font-size: 18px;margin-top: 6px;margin-bottom: 6px;margin-left: 12px;margin-right: 12px;">

          </view>
        </view>
        <view  style="flex: 1;margin: 7px;"  >
          <view
              style="font-weight: 700;font-size: 18px;margin-top: 6px;margin-bottom: 6px;margin-left: 12px;margin-right: 12px;">

          </view>
        </view>
      </view>

      <view class="d-flex-between-center py-10" style="display: flex;">
        <view :class="currentTime==0 ?'tran_btn':'tran_btn_normal' " style="flex: 1;margin: 7px;display: flex;flex-direction: column;"  @click="currentTimerFn(0,timeList[0].seconds)">

          <view
              style="font-weight: 700;font-size: 18px;margin-top: 3px;margin-bottom: 3px;margin-left: 12px;margin-right: 12px;">
            {{timeList[0].seconds}}s
          </view>
          <view
              style="font-weight: 700;font-size: 14px;margin-top: 0px;margin-bottom: 3px;margin-left: 12px;margin-right: 12px;color: #1DAEFE;">
            {{ Number(timeList[0].profit_ratio).toFixed(0) }}%
          </view>

        </view>
        <view :class="currentTime==1 ?'tran_btn':'tran_btn_normal' " style="flex: 1;margin: 7px;display: flex;flex-direction: column;"  @click="currentTimerFn(1,timeList[1].seconds)">

          <view
              style="font-weight: 700;font-size: 18px;margin-top: 3px;margin-bottom: 3px;margin-left: 12px;margin-right: 12px;">
            {{timeList[1].seconds}}s
          </view>
          <view
              style="font-weight: 700;font-size: 14px;margin-top: 0px;margin-bottom: 3px;margin-left: 12px;margin-right: 12px;color: #1DAEFE;">
            {{ Number(timeList[1].profit_ratio).toFixed(0) }}%
          </view>

        </view>
        <view :class="currentTime==2 ?'tran_btn':'tran_btn_normal' " style="flex: 1;margin: 7px;display: flex;flex-direction: column;"  @click="currentTimerFn(2,timeList[2].seconds)">

          <view
              style="font-weight: 700;font-size: 18px;margin-top: 3px;margin-bottom: 3px;margin-left: 12px;margin-right: 12px;">
            {{timeList[2].seconds}}s
          </view>
          <view
              style="font-weight: 700;font-size: 14px;margin-top: 0px;margin-bottom: 3px;margin-left: 12px;margin-right: 12px;color: #1DAEFE;">
            {{ Number(timeList[2].profit_ratio).toFixed(0) }}%
          </view>

        </view>
        <view :class="currentTime==3 ?'tran_btn':'tran_btn_normal' " style="flex: 1;margin: 7px;display: flex;flex-direction: column;"  @click="currentTimerFn(3,timeList[3].seconds)">

          <view
              style="font-weight: 700;font-size: 18px;margin-top: 3px;margin-bottom: 3px;margin-left: 12px;margin-right: 12px;">
            {{timeList[3].seconds}}s
          </view>
          <view
              style="font-weight: 700;font-size: 14px;margin-top: 0px;margin-bottom: 3px;margin-left: 12px;margin-right: 12px;color: #1DAEFE;">
            {{ Number(timeList[3].profit_ratio).toFixed(0) }}%
          </view>

        </view>
      </view>

      <view class="d-flex-between-center py-10" style="display: flex;">
        <view :class="currentTime==4 ?'tran_btn':'tran_btn_normal' " style="flex: 1;margin: 7px;display: flex;flex-direction: column;"  @click="currentTimerFn(4,timeList[4].seconds)">

          <view
              style="font-weight: 700;font-size: 18px;margin-top: 3px;margin-bottom: 3px;margin-left: 12px;margin-right: 12px;">
            {{timeList[4].seconds}}s
          </view>
          <view
              style="font-weight: 700;font-size: 14px;margin-top: 0px;margin-bottom: 3px;margin-left: 12px;margin-right: 12px;color: #1DAEFE;">
            {{ Number(timeList[4].profit_ratio).toFixed(0) }}%
          </view>

        </view>
        <view  style="flex: 1;margin: 7px;display: flex;flex-direction: column;"  @click="currentTimerFn(1,timeList[1].seconds)">


        </view>
        <view  style="flex: 1;margin: 7px;display: flex;flex-direction: column;"  @click="currentTimerFn(2,timeList[2].seconds)">



        </view>
        <view  style="flex: 1;margin: 7px;display: flex;flex-direction: column;"  @click="currentTimerFn(3,timeList[3].seconds)">


        </view>
      </view>





      <!--      <view class="d-flex-between-center border-bottom-white py-16">-->
      <!--        <text class="opacity-50">{{ i18n.direction }}</text>-->
      <!--        <text class="font-weight-bold" :class="buyDirection == 1 ? 'text-success' : 'text-error'">-->
      <!--          {{ buyDirection == 1 ? i18n.buyUp : i18n.buyDown }}-->
      <!--        </text>-->
      <!--      </view>-->
      <!--      <view class="d-flex-between-center border-bottom-white py-16">-->
      <!--        <text class="opacity-50">{{ i18n.currentPrice }}</text>-->
      <!--        <text class="font-weight-bold">{{ symbolQuotation1.close }}</text>-->
      <!--      </view>-->
      <!--      <view class="border-bottom-white py-16">-->
      <!--        <text class="opacity-50">{{ i18n.selectTime }}</text>-->

      <!--        <view class="d-flex-between-center mt-16" v-if="buyDirection == 1">-->

      <!--          <text v-for="item in timeList" class="tag w-20 text-center font-size-30 d-block"-->
      <!--                :class="currentTimer == item.seconds ? 'tag-success py-12' : 'tag-plain-success py-10'"-->

      <!--                @click="currentTimerFn(item.seconds)">{{ item.seconds }}s-->

      <!--            <span style="font-size: 16rpx">win{{ Number(item.profit_ratio).toFixed(0) }}%</span>-->

      <!--          </text>-->

      <!--        </view>-->


      <!--        <view class="d-flex-between-center mt-16" v-else-if="buyDirection == 2">-->
      <!--          <text v-for="item in timeList" class="tag w-20 text-center font-size-30 d-block"-->
      <!--                :class="currentTimer == item.seconds ? 'tag-error py-12' : 'tag-plain-error py-10'"-->
      <!--                @click="currentTimerFn(item.seconds)">{{ item.seconds }}s-->
      <!--            <span style="font-size: 16rpx">win{{ Number(item.profit_ratio).toFixed(0) }}%</span>-->


      <!--          </text>-->

      <!--        </view>-->
      <!--      </view>-->

      </br>

      <text class="py-16" style="width: 100px;">{{ $t("quantity") }}</text>

      <view class="py-10" style="border:1px solid #333;margin-top: 8px;display: flex;border-radius: 8px;">
        <input type="number" v-model="amountNum" class="trade-input mt-10 " :placeholder="amountTip" placeholder-style="color:#939393;"
               style="flex: 1;padding-left: 5px;">
      </view>

      <text class="d-block mt-8 font-size-24">
        {{ i18n.balance + ':' + Number(microInsurance).toFixed(4) + 'USDT' }}
      </text>

      <text class="d-block mt-8 font-size-24" style="color: #939393;">
        {{$t("actual_purchase")}}0.00USDT&nbsp;&nbsp;&nbsp;{{$t("fee")}}0.00USDT
      </text>

      <!--      <view class="d-flex-between-center mt-30">-->

      <!--        <button class="w-80 font-size-28 py-0" @click="submit" :disabled="disabled"-->
      <!--                :class="buyDirection == 1 ? 'success-button' : 'error-button'">{{ $t("common.confirm") }}-->
      <!--        </button>-->
      <!--      </view>-->

    </view>

    <view class="p-30"  v-if="currentTab==1">
      <view class="p-20 box-shadow border-radius-20 mb-20"  style="background: #242424;"
            v-for="item in list">
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

          <text class="font-weight-bold font-size-30"  v-if="item.profit_result==1"
                :style="{color:$utils.getColor(item.fact_profits)}">+{{Number(item.fact_profits)}}</text>

          <text class="font-weight-bold font-size-30"  v-if="item.profit_result==-1"
                :style="{color:$utils.getColor(-item.fact_profits)}">-{{Number(item.fact_profits)}}</text>

        </view>
      </view>
      <default-page  :length="list.length" v-if="list.length === 0"
                     :total="total"></default-page>
    </view>
    <view class="p-30"  v-if="currentTab==2">
      <view class="p-20 box-shadow border-radius-20 mb-20"  style="background: #242424;"
            v-for="item in list">
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

          <text class="font-weight-bold font-size-30"  v-if="item.profit_result==1"
                :style="{color:$utils.getColor(item.fact_profits)}">+{{Number(item.fact_profits)}}</text>

          <text class="font-weight-bold font-size-30"  v-if="item.profit_result==-1"
                :style="{color:$utils.getColor(-item.fact_profits)}">-{{Number(item.fact_profits)}}</text>

        </view>
      </view>
      <default-page  :length="list.length" v-if="list.length === 0"
                     :total="total"></default-page>
    </view>



    <!-- 秒合约 -->
    <block v-if="currentTab==0">
      <!-- 浮动的按钮工具 -->
      <view class="footer font-size-22" v-if="symbolQuotation1.close">

        <view class="btn btn1" @click="funA" :disabled="disabled"
              style="background: #01c698;margin: 20px;height: 40px;border-radius: 26px;">
          <!--          <text class="">{{ Number(symbolQuotation1.close).toFixed(4) }}</text>-->
          <text class="d-block" style="font-weight: 700;font-size: 18px;">{{ i18n.buyUp }}</text>
        </view>

        <view class="btn btn2" @click="funB" :disabled="disabled"
              style="background: #DE4a56;margin: 20px;height: 40px;border-radius: 26px;">
          <!--          <text class="">{{ Number(symbolQuotation1.close).toFixed(4) }}</text>-->
          <text class="d-block" style="font-weight: 700;font-size: 18px;">{{ i18n.buyDown }}</text>
        </view>

      </view>

      <!-- 弹出秒合约购买 -->
      <!--      <u-popup v-model="showBuyConfirm" mode="bottom" length="52%" contentBackgroundColor="rgba(255, 255, 255,1)"-->
      <!--               :border-radius="10">-->
      <!--        <view class="p-30">-->
      <!--          <view style="display: flex;">-->
      <!--            <text class="d-block font-size-30 font-weight-bold" style="flex: 1">{{ i18n.orderConfirm }}</text>-->
      <!--            <view>-->
      <!--              <view @click="showBuyConfirm = false">-->
      <!--                {{ $t("common.cancel") }}-->
      <!--              </view>-->
      <!--            </view>-->
      <!--          </view>-->


      <!--          <view class="d-flex-between-center border-bottom-white py-40">-->
      <!--            <text class="opacity-50">{{ i18n.tradingPair }}</text>-->
      <!--            <text class="font-weight-bold">{{ currency_name + '/' + legal_name }}</text>-->
      <!--          </view>-->
      <!--          <view class="d-flex-between-center border-bottom-white py-16">-->
      <!--            <text class="opacity-50">{{ i18n.direction }}</text>-->
      <!--            <text class="font-weight-bold" :class="buyDirection == 1 ? 'text-success' : 'text-error'">-->
      <!--              {{ buyDirection == 1 ? i18n.buyUp : i18n.buyDown }}-->
      <!--            </text>-->
      <!--          </view>-->
      <!--          <view class="d-flex-between-center border-bottom-white py-16">-->
      <!--            <text class="opacity-50">{{ i18n.currentPrice }}</text>-->
      <!--            <text class="font-weight-bold">{{ symbolQuotation1.close }}</text>-->
      <!--          </view>-->
      <!--          <view class="border-bottom-white py-16">-->
      <!--            <text class="opacity-50">{{ i18n.selectTime }}</text>-->

      <!--            <view class="d-flex-between-center mt-16" v-if="buyDirection == 1">-->

      <!--              <text v-for="item in timeList" class="tag w-20 text-center font-size-30 d-block"-->
      <!--                    :class="currentTimer == item.seconds ? 'tag-success py-12' : 'tag-plain-success py-10'"-->

      <!--                    @click="currentTimerFn(item.seconds)">{{ item.seconds }}s-->

      <!--                <span style="font-size: 16rpx">win{{ Number(item.profit_ratio).toFixed(0) }}%</span>-->

      <!--              </text>-->

      <!--            </view>-->


      <!--            <view class="d-flex-between-center mt-16" v-else-if="buyDirection == 2">-->
      <!--              <text v-for="item in timeList" class="tag w-20 text-center font-size-30 d-block"-->
      <!--                    :class="currentTimer == item.seconds ? 'tag-error py-12' : 'tag-plain-error py-10'"-->
      <!--                    @click="currentTimerFn(item.seconds)">{{ item.seconds }}s-->
      <!--                <span style="font-size: 16rpx">win{{ Number(item.profit_ratio).toFixed(0) }}%</span>-->


      <!--              </text>-->

      <!--            </view>-->
      <!--          </view>-->

      <!--          </br>-->

      <!--          <text class="opacity-50 py-16" style="width: 100px;">{{ i18n.number1 }}</text>-->

      <!--          <view class="py-16" style="border:1px solid #f1f1f1;margin-top: 5px;display: flex;">-->
      <!--            <input type="number" v-model="number" class="trade-input mt-10 " :placeholder="amountTip"-->
      <!--                   style="flex: 1;padding-left: 5px;">-->
      <!--          </view>-->

      <!--          <text class="d-block mt-8 font-size-24 opacity-75">-->
      <!--            {{ i18n.balance + ':' + Number(microInsurance).toFixed(4) + 'USDT' }}-->
      <!--          </text>-->

      <!--          <view class="d-flex-between-center mt-30">-->

      <!--            <button class="w-80 font-size-28 py-0" @click="submit" :disabled="disabled"-->
      <!--                    :class="buyDirection == 1 ? 'success-button' : 'error-button'">{{ $t("common.confirm") }}-->
      <!--            </button>-->
      <!--          </view>-->

      <!--        </view>-->
      <!--      </u-popup>-->

      <!-- 秒合约购买后的计时弹窗 -->
      <u-popup v-model="showCountDown" mode="bottom" length="52%" contentBackgroundColor="#000000"
               :mask-custom-style="{background: 'rgba(0, 0, 0, 0.6)'}"
               @close="showCountDown = false" :closeable="true" :closeOnClickOverlay="true"
               :border-radius="2" :mask-close-able="true">
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
            <text class="font-weight-bold"  style="color: #ffffff;">{{ currency_name + '/' + legal_name }}</text>
          </view>
          <view class="d-flex-between-center border-bottom-white py-16">
            <text class="opacity-50"  style="color: #ffffff;">{{ i18n.direction }}</text>
            <text class="font-weight-bold" :class="buyInfo.type == 1 ? 'text-success' : 'text-error'">
              {{ buyInfo.type == 1 ? i18n.buyUp : i18n.buyDown }}
            </text>
          </view>
          <view class="d-flex-between-center border-bottom-white py-16">
            <text class="opacity-50"  style="color: #ffffff;">{{ i18n.buyPrice }}</text>
            <text class="font-weight-bold"  style="color: #ffffff;">{{ Number(buyInfo.open_price).toFixed(4) }}</text>
          </view>
          <view class="d-flex-between-center border-bottom-white py-16" v-if="showCurrentPrice == true">
            <text class="opacity-50"  style="color: #ffffff;">{{ i18n.currentPrice }}</text>
            <text class="font-weight-bold"  style="color: #ffffff;">{{ symbolQuotation1.close }}</text>
          </view>
          <view class="d-flex-between-center border-bottom-white py-16">
            <text class="opacity-50"  style="color: #ffffff;">{{ i18n.number }}</text>
            <text class="font-weight-bold"  style="color: #ffffff;">{{ amountNum }}USDT</text>
          </view>

          <view class="d-flex-between-center border-bottom-white py-16 font-weight-bold" v-if="actualPL==null">
            <text class="opacity-50"  style="color: #ffffff;">{{ i18n.expectedPL }}</text>
            <text :style="{color:$utils.getColor(expectedPL)}">{{ expectedPL }}</text>
          </view>
          <view class="d-flex-between-center border-bottom-white py-16 font-weight-bold" v-else>
            <text class="opacity-50" style="color: #ffffff;">{{ i18n.actualPL }}</text>
            <text :style="{color:$utils.getColor(actualPL)}">{{ actualPL }}</text>
          </view>

          <button class="mt-36 font-size-28 py-0 primary-button connect_btn" @click="continueTrade" style="color: #000000;">{{ i18n.continueTrade }}
          </button>
        </view>
      </u-popup>
      <!-- 如还有倒计时，则显示 -->
      <view class="fixed-count-down" v-if="countDownTime && !showCountDown"
            :style="{backgroundColor:$utils.getColor(expectedPL)}" @click="showCountDown=true">
        <text class="font-size-28">{{ countDownTime }}s</text>
        <text class="font-size-36">{{ expectedPL }}</text>
      </view>
    </block>



  </view>
</template>
<script>

export default {
  data() {
    return {
      list: [],
      total:0,

      currentTime:0,
      currentPayCoin:0,
      currentTab: 0,
      showMoreBottomMenu: false,
      disabled: false,
      oldPrice: 0,//下单那一刻价格
      tVal: 0,
      closeVal: 0,
      openVal: 0,

      currentVal: [],
      matchId: 32,
      timeList: [],
      amountTip:this.$t("amountTip"),
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
      currentTimer: 0, //当前选择的时间
      amountNum: '', // 数量,
      microInsurance: 0,//秒合约账户余额,
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
    };
  },
  onLoad(options) {
    const {
      from,
      currency_name,
      legal_name,
      currency_id,
      token
    } = options
    this.from = from || ''
    this.currency_name = currency_name || "BTC"
    this.legal_name = legal_name || "USDT"
    this.currency_id = currency_id || 32
    //this.getMarketDepthData()

    uni.setStorageSync('token', token);
    this.$store.commit('setToken', token);

    const _this = this
    // uni.setNavigationBarTitle({
    //   title: _this.$t("home.market")
    // });

    this.getLeverDeal(this.currency_id, 23);
    this.getDepthFn();


    let url = "https://api.coinonebtc.xyz/market/binance/redis/getLatestQuotation?coin="+this.currency_name.toLowerCase();
    let data = [];
    let that=this;
    uni.request({
      url: url,
      method: "GET",
      dataType: "json",  //指定服务器返回的数据类型
      //jsonpCallback: "showData",  //指定回调函数名称
      success: function (response) {
        data = response.data;

        data=data.data;
        let close=data.close;
        that.symbolQuotation.close=close;
        that.symbolQuotation1.close=close;
        let currency_id=data.id;
        that.symbolQuotation.currency_id=currency_id;
        that.symbolQuotation.legal_id=23;


      }
    });

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
    //
    let token=uni.getStorageSync("token");
    if (token&&token.length>10) {
      this.$https.initDataToken({
        url: 'setOnline',
        type: 'POST',
      }, (res, msg) => {
        console.log("设置在线" + JSON.stringify(res));
      });
    }



  },
  mounted() {

  },
  methods: {
    getSecondsListFn() {
      const {
        matchId,
        status,
        page,
        currency_id
      } = this

      let  data= {currency_id:currency_id,match_id:matchId,status:status,page:page,limit:10};
      this.$https.initDataToken({
        url: 'microtrade/listsV2',
        data,
        type: 'GET'
      }, (res, msg) => {
        this.total = res.total
        const list = res.list.data
        this.symbol=res.currencyName+"/USDT";
        if (list&&list.length) {
          this.symbol = list[0].symbol_name
          this.list = list;
          //this.page++
        } else {
          this.canGet = false
        }
      })
    },
    changeTab(currentTab){
      this.currentTab = currentTab;
      if (currentTab==1){
        this.status=1;
        this.list= [];
        this.getSecondsListFn();
      }
      if (currentTab==2){
        this.status=3;
        this.list= [];
        this.getSecondsListFn();
      }


    },
    sellListCountFn(sellListCount){
      this.sellListCount= sellListCount;
    },
    buyListCountFn(buyListCount){
      this.buyListCount= buyListCount;
    },
    buyListFn(buyList){

      this.buyList=buyList;
    },
    sellListFn(sellList){

      this.sellList=sellList;

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
    getDepthFn(){
      let that=this;
      let url = "https://api.coinonebtc.xyz/market/binance/spot/depth2?symbol=BTCUSDT";
      let data = [];
      uni.request({
        url: url,
        method: "GET",
        dataType: "json",  //指定服务器返回的数据类型
        //jsonpCallback: "showData",  //指定回调函数名称
        success: function (response) {
          data = response.data;


          let inData=data.data.asks;
          let outData=data.data.bids;

          let[inlist,outList] = [inData,outData];
          let [max, max1] = [0, 0];
          for (let i in inData) {

            inlist[i].price = inlist[i][0];
            inlist[i].number = inlist[i][1];
            //inlist[i].all = that.getRandom;
            max = inlist[i].number > max ? inlist[i].number : max;
          }

          that.inMaxValue = max;
          that.buyList = inlist.slice(0,6);

          for (let i in outList) {
            outList[i].price = outList[i][0];
            outList[i].number = outList[i][1];
            max1 = outList[i].number > max1 ? outList[i].number : max;
            that.sellMaxValue = outList[i].number;
            //outList[i].all = that.getRandom;
          }
          that.sellMaxValue = max1;
          that.sellList = outList.slice(0,6);

          that.buyListCount = that.buyList.reduce((total, item) => {
            return total + item[1] * 1
          }, 0);

          that.sellListCount = that.sellList.reduce((total, item) => {
            return total + item[1] * 1
          }, 0);





        }
      });
    },


    funA(){
      //this.amountNum="";
      this.buyDirection=1;
      //this.showBuyConfirm=true;
      this.getLeverDeal(this.currency_id, 23);
      this.submit();

    },
    funB(){
      //this.amountNum="";
      this.buyDirection=2;
      //this.showBuyConfirm=true;
      this.getLeverDeal(this.currency_id, 23);
      this.submit();

    },
    currentTimerFn(pos,item) {
      this.currentTime=pos;
      this.currentTimer = item;


      if (item === 30){
        let po=this.timeList[0];
        let min_amount=po.min_amount;
        min_amount=Number(min_amount).toFixed(0);
        let max_amount=po.max_amount;
        max_amount=Number(max_amount).toFixed(0);
        this.amountTip= min_amount+"-"+max_amount+"usdt";
      }
      if (item === 60){
        let po=this.timeList[1];
        let min_amount=po.min_amount;
        min_amount=Number(min_amount).toFixed(0);
        let max_amount=po.max_amount;
        max_amount=Number(max_amount).toFixed(0);
        this.amountTip= min_amount+"-"+max_amount+"usdt";
      }
      if (item === 120){
        let po=this.timeList[2];
        let min_amount=po.min_amount;
        min_amount=Number(min_amount).toFixed(0);
        let max_amount=po.max_amount;
        max_amount=Number(max_amount).toFixed(0);
        this.amountTip= min_amount+"-"+max_amount+"usdt";
      }
      if (item === 180){
        let po=this.timeList[3];
        let min_amount=po.min_amount;
        min_amount=Number(min_amount).toFixed(0);
        let max_amount=po.max_amount;
        max_amount=Number(max_amount).toFixed(0);
        this.amountTip= min_amount+"-"+max_amount+"usdt";
      }

    },
    //获取杠杆的一些信息和持仓列表
    getLeverDeal(currency_id, legal_id) {
      //getMicroDeal: (currency_id,legal_id) => vm.$u.post("/microtrade/micro_deal",{currency_id,legal_id}),
      //this.$u.api.market.getMicroDeal(currency_id, legal_id).then(res => {
      let data={currency_id:currency_id,legal_id:legal_id};
      this.$https.initDataToken({
        url: 'microtrade/micro_deal',
        type: 'POST',
        data
      }, (res, msg) => {
        let user_lever = res.user_lever || 0
        //this.user_lever = Number(user_lever).toFixed(4)
        this.microInsurance = Number(user_lever).toFixed(4);
        this.matchId=res.matchId;
      })
    },

    //获取秒合约的秒数
    getSecondsSeconds() {
      let that= this;
      //getSecondsSeconds: () => vm.$u.get("/microtrade/seconds"),
      //that.$u.api.market.getSecondsSeconds().then(res => {
      this.$https.initDataToken({
        url: 'microtrade/seconds',
        type: 'GET'
      }, (res, msg) => {
        that.timers = res.map(item => item.seconds)
        that.currentTimer = that.timers[0];

        that.timeList=res;
        let po=res[0];
        let min_amount=po.min_amount;
        min_amount=Number(min_amount).toFixed(0);
        let max_amount=po.max_amount;
        max_amount=Number(max_amount).toFixed(0);
        that.amountTip= min_amount+"-"+max_amount+"usdt";

      })
    },

    subMarketDepth() {
      let that = this;

      let pushUUID = uni.getStorageSync("pushUUID");
      if (pushUUID == null || pushUUID.length < 10) {
        pushUUID = this.uuid();

        uni.setStorageSync('pushUUID', pushUUID)
      }
      that.pushUUID = pushUUID;
      let userId = that.pushUUID;
      let url = 'wss://api.coinonebtc.xyz/market/websocket2/' + userId;


      let currencyNameStr=this.currency_name.toLowerCase();

      uni.connectSocket({
        url: url
      });
      uni.onSocketOpen(function (res) {

        that.socketOpen = true;
        //that.sendSocketMessage();

      });
      uni.onSocketError(function (res) {

      });
      uni.onSocketMessage(function (res) {
        try {
          let data = res.data;

          data = JSON.parse(data);
          //
          let coin = data.coin;
          coin=coin.toLowerCase();
          //
          let cmd = data.cmd;

          if (cmd === "depth"&&coin===currencyNameStr) {
            let msgTxt = data.msgTxt;

            msgTxt = JSON.parse(msgTxt);

            let bids = msgTxt.bids;
            if (bids) {

              //bids=JSON.parse(bids);

            }
            let asks = msgTxt.asks;
            if (asks) {
              //asks=JSON.parse(asks);

            }

            if (bids == null) {
              bids = [];
            }
            let inData = bids;
            if (asks == null) {
              asks = [];
            }
            let outData = asks.reverse();
            let [inlist, outList] = [inData, outData];
            let [max, max1] = [0, 0];


            if (inData && inData.length > 0) {
              for (let i in inData) {
                inlist[i].price = inlist[i][0];
                inlist[i].number = inlist[i][1];
                //inlist[i].all = that.getRandom;
                max = inlist[i].number > max ? inlist[i].number : max;
              }
              that.inMaxValue = max;
              that.buyList = inlist.slice(0, 6);
            }


            if (outList && outList.length > 0) {
              for (let i in outList) {
                outList[i].price = outList[i][0];
                outList[i].number = outList[i][1];
                max1 = outList[i].number > max1 ? outList[i].number : max;
                that.sellMaxValue = outList[i].number;
                //outList[i].all = that.getRandom;
              }
              that.sellMaxValue = max1;
              that.sellList = outList.slice(0, 6);
            }


            if (that.buyList && that.buyList.length > 0) {
              that.buyListCount = that.buyList.reduce((total, item) => {
                return total + item[1] * 1
              }, 0);
            }
            if (that.sellList && that.sellList.length > 0) {
              that.sellListCount = that.sellList.reduce((total, item) => {
                return total + item[1] * 1
              }, 0);
            }
          }

          if (cmd === "kline") {
            let msgTxt = data.msgTxt;
            msgTxt = JSON.parse(msgTxt);
            let k = msgTxt.k;

            let symbol = currencyNameStr;


            let close = k.c;
            let high = k.h;
            let vol = k.v;
            let low = k.l;
            let open = k.o;

            let symbolStr = currencyNameStr + "USDT";

            if (currencyNameStr == coin) {
              close = Number(close).toFixed(2);
              that.symbolQuotation1.now_price=close;
              that.symbolQuotation1.close=close;

              let chg = (close - open) / open;
              let chg100 = chg * 100;
              chg100 = parseFloat(chg100);
              //jo.change = chg100;

              if (chg100 < 0) {
                let chg100B = -chg100;
                //jo.change = -chg100B.toFixed(2);
              } else {
                //jo.change = chg100.toFixed(2);
              }

              const currentVal = {
                id: Number(k.t),
                timestamp: Number(k.t),
                open: Number(k.o),
                high: Number(k.h),
                low: Number(k.l),
                close: Number(k.c),
                volume: Number(k.v),
              }

              //that.currentVal = currentVal;
              //:tVal="tVal" :closeVal="closeVal" :openVal="openVal"
              that.tVal=Number(k.t);
              that.closeVal=Number(k.c);
              that.openVal=Number(k.o);

              //that.$emit('getKlineData',Number(k.t));
              //that.$refs.child.updateKlineData(currentVal);

              that.symbolQuotation.now_price = close;
              that.symbolQuotation.close = close;

              that.symbolQuotation1.now_price = close;
              that.symbolQuotation1.close = close;


            }




          }


          //////


        } catch (e) {
          console.log(e);
        }


      });

    },


    getQuotation() {
      const optionalList = [];
      let that = this;
      uni.request({
        url: "https://api.coinonebtc.xyz/market/binance/redis/getLatestQuotations",
        type: "GET",
        dataType: "json",
        success: function (response) {

          let quotationList = response.data.data;


          that.quotation = quotationList.map(item => {
            item.precision_length = 4;
            let change= Number(100*(item.close - item.open)/item.open);
            change=change.toFixed(2);
            item.change=change;
            if (item.currencyName==="SHIB"){
              item.change="0.52";
            }
            if (item.currencyName==="DOGE"){
              item.change="-0.67";
            }
            if (item.currencyName==="TESLA"){
              item.change="0.1";
            }

            return item
          })

          if (optionalList.length) {
            let optional = []
            optionalList.forEach(item => {
              const has = that.quotation.find(el => item.id === el.currency_id)
              if (has) optional.push(has)
            })
            that.optionalList = optional
          } else {
            that.currentNav = 1
            that.optionalList = []
          }

          //对quotation进行排序检测
          //this.quotation = this.quotationOriginal;

          //that.setData(that.quotation);

          uni.setStorageSync('quotation', this.quotation);





        }

      });

    },

    getSocketData(data) {
      let change = 100 * (data.close - data.open) / data.open;

      change = Number(change).toFixed(2);

      this.symbolQuotation1 = data;
      this.symbolQuotation1.change = change;


    },
    //获取子组件socket返回的data
    // getSocketData(data) {
    //   if (this.currency_name == data.currency_name && this.legal_name == data.legal_name) {
    //     this.symbolQuotation = {
    //       ...this.symbolQuotation,
    //       ...data
    //     }
    //   }
    //
    //   const has = this.originalQuotation.findIndex(item => item.currency_name == data.currency_name && item
    //       .legal_name == data.legal_name)
    //   if (has > -1) {
    //     let obj = {
    //       ...this.originalQuotation[has],
    //       ...data,
    //     }
    //     this.originalQuotation.splice(has, 1, obj)
    //   }
    // },
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
      if (currency_name === this.currency_name  && currency_id === this.currency_id) this.showSelectCoin = false
      const url = `/pages/transaction/options?currency_name=${currency_name}&legal_name=USDT&currency_id=${currency_id}`
      uni.reLaunch({
        url
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
        let data={currency_id:currency_id};
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

        let data={id:optionalId};
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
    submit() {
      this.disabled=true;
      this.oldPrice= this.symbolQuotation1.close;
      this.actualPL = null;
      let amountTipStr = this.$t("amountTip");
      this.amountNum=Number(this.amountNum);
      if (this.amountNum==null||this.amountNum===""||this.amountNum<=0){
        this.disabled=false;
        this.$utils.showToast(amountTipStr);
        return false;
      }

      if (this.currentTimer === 30) {
        this.disabled=false;
        let po=this.timeList[0];
        let min_amount=po.min_amount;
        min_amount=Number(min_amount).toFixed(0);
        let max_amount=po.max_amount;
        max_amount=Number(max_amount).toFixed(0);

        let amountTipStr = amountTipStr+"["+min_amount+"-"+max_amount+"USDT]";
        if (this.number<min_amount||this.amountNum>max_amount){
          this.$utils.showToast(amountTipStr);
          return false;
        }
      }
      if (this.currentTimer === 60) {
        this.disabled=false;
        let po=this.timeList[1];
        let min_amount=po.min_amount;
        min_amount=Number(min_amount).toFixed(0);
        let max_amount=po.max_amount;
        max_amount=Number(max_amount).toFixed(0);
        amountTipStr = amountTipStr+"["+min_amount+"-"+max_amount+"USDT]";
        if (this.amountNum<min_amount||this.amountNum>max_amount){
          this.$utils.showToast(amountTipStr);
          return false;
        }
      }
      if (this.currentTimer === 120) {
        this.disabled=false;
        let po=this.timeList[2];
        let min_amount=po.min_amount;
        min_amount=Number(min_amount).toFixed(0);
        let max_amount=po.max_amount;
        max_amount=Number(max_amount).toFixed(0);

        amountTipStr = amountTipStr+"["+min_amount+"-"+max_amount+"USDT]";
        if (this.amountNum<min_amount||this.amountNum>max_amount){
          this.$utils.showToast(amountTipStr);
          return false;
        }
      }
      if (this.currentTimer === 180) {
        this.disabled=false;
        let po=this.timeList[3];
        let min_amount=po.min_amount;
        min_amount=Number(min_amount).toFixed(0);
        let max_amount=po.max_amount;
        max_amount=Number(max_amount).toFixed(0);

        amountTipStr = amountTipStr+"["+min_amount+"-"+max_amount+"USDT]";
        if (this.amountNum<min_amount||this.amountNum>max_amount){
          this.$utils.showToast(amountTipStr);
          return false;
        }
      }

      this.$u.throttle(() => {
        const {buyDirection, symbolQuotation, currentTimer, amountNum, i18n} = this
        // match_id,currency_id,type,seconds,amountNum
        const {id, legal_id} = symbolQuotation;
        if (!amountNum || !this.$u.test.amount(amountNum)) {
          this.disabled=false;
          this.$utils.showToast(i18n.plsIptCrtNumber)
          return false
        }
        let  currencyName=this.currency_name;


        let data={currencyName:currencyName,
          currency_id:symbolQuotation.currency_id,
          type:buyDirection,
          seconds:currentTimer,
          lang:uni.getStorageSync("lang")||"en",
          number:amountNum};



        this.$https.initDataToken({
          url: 'microtrade/submitV2',
          type: 'POST',
          data
        }, (res, msg) => {


          this.showBuyConfirm = false;
          this.buyInfo = res;
          this.showCountDown = true

          this.showCurrentPrice = false;

          this.countDownTime = Number(this.buyInfo.seconds)
          if (this.countDown) clearInterval(this.countDown)
          this.countDown = setInterval(() => {

            if (this.countDownTime >= 1) {
              this.countDownTime--
            } else {
              this.countDownTime = 0;
              clearInterval(this.countDown)
              this.countDown = null
              // 獲取交易結果
              this.showCountDown=false;
              this.disabled=false;

              let data={id:this.buyInfo.id};
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
      }, 1200)

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
        }]
    },
    //预计盈亏，
    expectedPL() {
      // 计算方法
      // open_price 购买时的价格，newprice实时价格

      const {symbolQuotation1, buyInfo, countDownTime} = this
      if (this.oldPrice>0) {
        const open_price = buyInfo.open_price ? Number(buyInfo.open_price) : 0
        //如果countDownTime==0，就不用计算了
        //如果还没下单，也不用计算
        if (!countDownTime) return 0

        const newprice = Number(symbolQuotation1.close);//最新价

        const buyDirection = Number(buyInfo.type)

        // open_price == newprice ，盈亏为0
        if (this.oldPrice === newprice) return 0

        // 如果购买方向和当前涨跌情况相同,则计算结果为 (number * profit_ratio) / 100
        const amountNum = Number(this.amountNum);

        const profit_ratio = Number(buyInfo.profit_ratio);
        console.log("预测结果==> profit_ratio=>"+profit_ratio+"  amountNum==>"+amountNum+" newprice="+newprice+" oldPrice="+this.oldPrice);
        if ((buyDirection === 1 && Number(newprice) > Number(this.oldPrice)) || (buyDirection === 2 && Number(this.oldPrice) > Number(newprice))) {
          return parseFloat(((amountNum * profit_ratio) / 100).toFixed(4))
        }else {
          // 如果购买方向和当前涨跌情况相反,则计算结果为 - amountNum
          return parseFloat((amountNum * -1).toFixed(4))
        }
      }else{
        return 0;
      }

    }
  },
  onHide() {
    // if(this.countDown){
    // 	clearInterval(this.countDown)
    // }
  },
  onUnload() {

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
page,
body,
html {
  padding-bottom: 120 rpx;

}

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
    background: #FF5c51 !important;
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
  position: fixed;
  left: 0;
  right: 0;
  bottom: 60px;
  z-index: 20;
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
.connect_btn{
  background: -webkit-gradient(linear, left top, right top, color-stop(10%, #1FA2FF), color-stop(55.21%, #12D8FA), to(#A6FFCB));
  background: -webkit-linear-gradient(left, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
  background: -o-linear-gradient(left, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
  background: linear-gradient(90deg, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
}

</style>

