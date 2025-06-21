<template>
  <view class="pb-30 text-white">
    <u-navbar :title="$t('c2c.c2c')" showback="true">

      <navigator url="/pages/c2c/c2c_order" slot="right" style="color: #2A64FB;" v-if="isMerchant == 0">
        <image src="/static/icon_to_all.png" style="width: 52rpx; height: 52rpx;"></image>
      </navigator>

      <navigator url="/pages/c2c/c2c_merchant_order" slot="right" style="color: #2A64FB;" v-if="isMerchant == 1">
        <image src="/static/icon_to_all.png" style="width: 52rpx; height: 52rpx;"></image>
      </navigator>


    </u-navbar>
    <!-- 内容 -->
    <view class="mx-30 mt-10" style="background: #000000;">
      <view class="deposit" style="background: #242424;">
        <view class="d-flex align-items-center">
          <text class="d-block font-size-28 mr-10" style="color: #ffffff;">C2C总交易量</text>
          <text class="iconfont icon-yanjing_xianshi text-white font-size-36"></text>
        </view>
        <view class="mt-30">
          <view class="d-flex align-items-baseline">
            <text class="font-size-40 mr-20">0.00</text>
            <text class="font-size-22" style="color: #ffffff;opacity: .6;">CNY</text>
          </view>
        </view>
        <view class="d-block font-size-22 opacity-50 mt-8" style="color: #FFFFFF;opacity: .6;"> ≈0.00 USDT</view>
        <view class="earnings-wrap">
          <view class="earnings font-size-22">
            <view class="d-flex justify-content-between opacity-50 font-size-22">
              <text style="color: #ffffff;opacity: .6;">今日接收订单</text>
              <text style="color: #FFFFFF;opacity: .6;">接收订单总量</text>
            </view>
            <view class="d-flex justify-content-between font-size-22 mt-16">
              <text style="color: #FFFFFF;">0</text>
              <text style="color: #FFFFFF;">0</text>
            </view>
          </view>
        </view>
        <navigator url="/pages/c2c/apply_merchant" v-if="isMerchant ==0">
          <view class="dealer" style="margin-top: -140px;">
            <text class="mr-10" style="color: #000;opacity: 0.8;padding-left: 4px;">{{
                $t('c2c.becomeMerchant')
              }}
            </text>
            <image src="/static/image/icon/copytrade-icon-1.png" style="width: 19rpx;height: 24rpx;"></image>
          </view>
        </navigator>

        <navigator url="/pages/c2c/my_publish_info" v-if="isMerchant ==1">
          <view class="dealer" style="margin-top: -140px;">
            <text class="mr-10" style="color: #000;opacity: 0.8;padding-left: 4px;">{{
                $t('c2c.merchantInfo')
              }}
            </text>
            <image src="/static/image/icon/copytrade-icon-1.png" style="width: 19rpx;height: 24rpx;"></image>
          </view>
        </navigator>


      </view>


      <view class="mt-6" style="background: #000000;">
        <view class="d-flex align-items-center justify-content-between" style="margin-top: -30px;">
          <text class="font-size-32 font-weight-bold">{{ i18n.traderList }}</text>
          <view class="d-flex align-items-center" v-if="false">
            <image :src="`/static/image/icon/copytrade-icon-${showOnlyHasLocation ? '3' : '2'}.png`"
                   style="width: 22rpx;height: 22rpx;" @click="showOnlyHasLocation = !showOnlyHasLocation">
            </image>
            <text class="font-size-22 ml-10">{{ i18n.onlyShowsThePosition }}</text>
          </view>
        </view>
        <text class="font-size-22 opacity-50 mt-10 d-block" v-if="false">{{ i18n.theDataIsUpdatedEveryHour }}</text>

        <block v-if="false">
          <view class="sort-nav">
            <text v-for="(item,index) in sortNav.slice(0,4)" :key="item.name" class="item"
                  :class="{active:index == activeSotrNav}" @click="activeSotrNav=index">{{ item.name }}
            </text>
            <text class="item" style="padding-left: 16rpx;padding-right: 16rpx;"
                  @click="showSelectSortNav=true">...
            </text>
          </view>
          <u-action-sheet :list="actionSheetSortNav" v-model="showSelectSortNav"></u-action-sheet>
        </block>

        <view style="display: flex;width:100%;margin: 12px;border-bottom: 1px solid #000000;padding-bottom: 8px;">
          <view style="width:80px;font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;"
                @click="changeTab(0)">
            <span :class="currentTab==0 ?'activeTab':'normalTab' ">{{ $t('c2c.buy') }}</span>
          </view>
          <view style="width: 80px;font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;"
                @click="changeTab(1)">
            <span :class="currentTab==1 ?'activeTab':'normalTab' ">{{ $t('c2c.sell') }}</span>
          </view>

          <view
              style="flex: 1;font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;display: flex;justify-content: right;">
            <navigator url="/pages/c2c/publish_c2c" v-if="isMerchant ==1">
              <view
                  style="border: 1px solid #2A64FB;color: #2A64FB;width:80px;text-align: center;border-radius: 4px;margin-right: 5px;">
                发布信息
              </view>
            </navigator>

          </view>


        </view>

        <view class="uni-form-item uni-column" style="margin-top: 10px;
        display: flex;
        border: 1px solid #939393;height: 40px;border-radius: 4px;z-index: 9999;">


          <!--          <input type="text" class="input" disabled @click="showSelectCurrency=true"-->
          <!--                 style="color: #000;height: 35px;border-radius: 4px;-->
          <!--                 width:60px;background: #ffffff;font-size: 12px;padding-left: 10px;"-->
          <!--                 placeholder-style="color:#333;"-->
          <!--                 :placeholder="i18n.plsSelectCurrency" v-model="currency.name"  readonly>-->


          <view type="text" class="input" disabled @click="showSelectCurrency=true"
                style="color: #ffffff;height: 35px;border-radius: 4px;
                 width:60px;background:transparent;font-size: 12px;padding-left: 10px;"
                placeholder-style="color:#333;">{{currency.name}}</view>








          <view>
            <image src="../../static/bib/H0.png" @click="showSelectCurrency=true"
                   style="width:20px;height:20px;margin-top: 10px;"></image>
          </view>

          <input type="text" class="input"
                 style="color: #ffffff;height: 35px;border-radius: 4px;flex: 1;
                 background:transparent;font-size: 12px;padding-left: 10px;"
                 placeholder-style="color:#939393;"
                 :placeholder="$t('c2c.min_amount')" v-model="minMoney">

        </view>


        <!-- 求购出售列表 -->
        <view class="list mt-20" style="background: #000000;">

          <view v-if="type == 'buy'" v-for="item in list" style="background: #000000;">
            <view style="background: #000000;border-bottom: 1px solid #939393;">
              <view style="display: flex;justify-content: space-between;color: #000;margin-top: 18px;">
                <view>


                  <view class="d-flex align-items-center">
                    <text class="font-size-32 mr-12" style="color: #ffffff;">{{ item.c2c_name }}</text>
                    <view class="user-num" style="background: transparent">
                      <image @click="closeNotice(popupAd.id)" src="../../static/c2c/q.webp" mode="aspectFit"
                             style="width:15px;height:15px;margin-top: 2px;"></image>
                    </view>
                  </view>


                </view>
                <view style="display: flex;">

                  <view style="font-size: 12px;line-height: 15px;height: 15px;color: #ffffff;">成交量 38</view>
                  <view
                      style="font-size: 12px;line-height: 15px;height: 15px;border-left: 1px solid #939393;margin-left: 5px;padding-left: 5px;color: #ffffff;">
                    97%
                  </view>


                </view>
              </view>


              <view style="display: flex;justify-content: space-between;color: #ffffff;">
                <view>
                  <view style="color: #ffffff;opacity: 1.0;font-weight: 700;font-size: 14px;margin-top: 5px;">
                    ￥{{ item.price }}
                  </view>
                  <view style="display: flex;">
                    <text style="font-size: 12px;line-height: 20px;height: 20px;color: #ffffff;">数量</text>
                    <text style="font-size: 12px;line-height: 20px;height: 20px;color: #ffffff;">{{ item.surplus_number }} USDT</text>
                  </view>
                  <view style="display: flex;">
                    <text style="font-size: 12px;line-height: 20px;height: 20px;color: #ffffff;">{{ $t('c2c.max') }}</text>
                    <text style="font-size: 12px;line-height: 20px;height: 20px;color: #ffffff;">{{
                        item.min_number
                      }}-{{ item.max_number }} USDT
                    </text>
                  </view>
                </view>
                <view>
                  <view></view>
                  <view></view>
                </view>
              </view>

              <view style="display: flex;justify-content: space-between;color: #ffffff;margin-top: 15px;">
                <view style="display: flex;height: 30px;margin-top: 2px;">
                  <view>
                    <view style="width: 3px;height: 14px;background: #0ba360"></view>
                  </view>
                  <view style="line-height: 14px;height: 14px;margin-left: 2px;color: #ffffff;">{{ $t('c2c.bankcard') }}</view>
                </view>

                <view>

                  <button @click="order(item)"
                          style="background: #31bd65;border-radius: 18px;line-height: 30px;height: 30px;color: #ffffff;margin-bottom: 18px;"
                          v-if="type == 'buy' ">购买
                  </button>
                  <u-button @click="sellOrder(item)"
                            style="background: #eb4b6d;border-radius: 18px;line-height: 30px;height: 30px;color: #ffffff;margin-bottom: 18px;"
                            v-if="type == 'sell' ">出售
                  </u-button>
                </view>

              </view>


            </view>


          </view>
          <view v-if="type == 'sell'" v-for="item in list" style="background: #000000;">
            <view style="background: #000000;border-bottom: 1px solid #939393;">
              <view style="display: flex;justify-content: space-between;color: #ffffff;margin-top: 18px;">
                <view>


                  <view class="d-flex align-items-center">
                    <text class="font-size-32 mr-12" style="color: #ffffff;">{{ item.c2c_name }}</text>
                    <view class="user-num" style="background: transparent">
                      <image @click="closeNotice(popupAd.id)" src="../../static/c2c/q.webp" mode="aspectFit"
                             style="width:15px;height:15px;margin-top: 2px;"></image>
                    </view>
                  </view>


                </view>
                <view style="display: flex;">

                  <view style="font-size: 12px;line-height: 15px;height: 15px;color: #ffffff;">成交量 {{ item.success_order }}</view>
                  <view
                      style="font-size: 12px;line-height: 15px;height: 15px;border-left: 1px solid #939393;margin-left: 5px;padding-left: 5px;">
                    {{ item.success_rate }}
                  </view>


                </view>
              </view>


              <view style="display: flex;justify-content: space-between;color: #000;">
                <view>
                  <view style="color: #ffffff;opacity: 1.0;font-weight: 700;font-size: 14px;margin-top: 5px;">
                    ￥{{ item.price }}
                  </view>
                  <view style="display: flex;">
                    <text style="font-size: 12px;line-height: 20px;height: 20px;color: #ffffff;">数量</text>
                    <text style="font-size: 12px;line-height: 20px;height: 20px;color: #ffffff;">{{ item.surplus_number }} USDT</text>
                  </view>
                  <view style="display: flex;">
                    <text style="font-size: 12px;line-height: 20px;height: 20px;color: #ffffff;">{{ $t('c2c.max') }}</text>
                    <text style="font-size: 12px;line-height: 20px;height: 20px;color: #ffffff;">{{
                        item.min_number
                      }}-{{ item.max_number }} USDT
                    </text>
                  </view>
                </view>
                <view>
                  <view></view>
                  <view></view>
                </view>
              </view>

              <view style="display: flex;justify-content: space-between;color: #ffffff;margin-top: 15px;">
                <view style="display: flex;height: 30px;margin-top: 2px;">
                  <view>
                    <view style="width: 3px;height: 14px;background: #0ba360"></view>
                  </view>
                  <view style="line-height: 14px;height: 14px;margin-left: 2px;color: #ffffff;">{{ $t('c2c.bankcard') }}</view>
                </view>

                <view>

                  <button @click="order(item)"
                          style="background: #31bd65;border-radius: 18px;line-height: 30px;height: 30px;color: #ffffff;margin-bottom: 18px;border: none"
                          v-if="type == 'buy' ">购买
                  </button>
                  <button @click="sellOrder(item)"
                          style="background: #eb4b6d;border-radius: 18px;line-height: 30px;height: 30px;color: #ffffff;margin-bottom: 18px;"
                          v-if="type == 'sell' ">出售
                  </button>
                </view>

              </view>


            </view>


          </view>

          <view v-if="list.length ===0 ">
            <image src="/static/image/svg/empty.png"
                   class="mx-auto d-block my-30"
                   style="width: 184rpx;height: 201rpx;margin-top: 140px;"></image>
            <text class="text-center opacity-50 font-size-20 py-0 d-block"
                  style="margin-top:-20px;color: #929292;">{{ $t("common.hasNoData") }}
            </text>
          </view>

        </view>

        <u-popup v-model="modalShow" border-radius="10" length="90%">
          <view class="p-30">

            <view style="display: flex;width:100%;margin: 12px;border-bottom: 1px solid #f7f7f7;padding-bottom: 8px;">
              <view style="width:80px;font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;"
                    @click="changeMoneyAmountTab(0)">
                <span :class="moneyAmountTab==0 ?'activeTab':'normalTab' ">按金额购买</span>
              </view>
              <view style="width: 80px;font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;margin-left: 15px;"
                    @click="changeMoneyAmountTab(1)">
                <span :class="moneyAmountTab==1 ?'activeTab':'normalTab' ">按数量购买</span>
              </view>
            </view>


            <view v-if="moneyAmountTab == 0 " class="border-bottom-white" style="display:flex;">
              <view class="d-flex-between-center py-16" style="flex: 1;">
                <view class="font-weight-bold">
                  <input type="number" placeholder="0.00" v-model="alertInfoAmount"
                         style="color: #000;text-align: left;font-weight: 700;font-size: 20px;padding-left: 6px;"
                         placeholder-style="color:#929292;font-weight: 700;font-size: 20px;"/>
                </view>
              </view>
              <view class="d-block font-size-30" style="color: #000;display: flex;width: 100px;justify-content: right;">
                <view style="flex: 1;font-weight: 500;padding-top: 6px;">CNY</view>
                <view style="flex: 1;justify-content: right;text-align: right;border-left: 1px solid #f7f7f7;
               margin-bottom: 15px;
               font-weight: 500;color: #2A64FB;padding-top: 6px;" @click="maxFn(alertInfo);">最大
                </view>
              </view>
            </view>
            <view v-if="moneyAmountTab == 1 " class="border-bottom-white" style="display:flex;">
              <view class="d-flex-between-center py-16" style="flex: 1;">
                <view class="font-weight-bold">
                  <input type="number" placeholder="0.00" v-model="alertInfoAmount"
                         style="color: #000;text-align: left;font-weight: 700;font-size: 20px;padding-left: 6px;"
                         placeholder-style="color:#929292;font-weight: 700;font-size: 20px;"/>
                </view>
              </view>
              <view class="d-block font-size-30" style="color: #000;display: flex;width: 100px;justify-content: right;">
                <view style="flex: 1;font-weight: 500;padding-top: 6px;">{{ alertInfo.currency_name }}</view>
                <view style="flex: 1;justify-content: right;text-align: right;border-left: 1px solid #f7f7f7;
               margin-bottom: 15px;
               font-weight: 500;color: #2A64FB;padding-top: 6px;" @click="maxFn(alertInfo);">最大
                </view>
              </view>
            </view>


            <view class="d-flex-between-center border-bottom-white py-16">
              <text class="opacity-50" style="color: #000;">{{ $t('c2c.onePrice') }}</text>
              <text class="font-weight-bold" :class="buyDirection ? 'text-error' : 'text-success'">
                ￥{{ alertInfo.price }}
              </text>
            </view>
            <view class="d-flex-between-center border-bottom-white py-16" v-if="moneyAmountTab == 0">
              <text class="opacity-50" style="color: #000;">可得{{ amount }}</text>
              <text class="font-weight-bold">
                {{ alertInfo.currency_name }}
              </text>
            </view>

            <view class="d-flex-between-center border-bottom-white py-16" v-if="moneyAmountTab == 1">
              <text class="opacity-50" style="color: #000;">应付{{ cnyVal }}</text>
              <text class="font-weight-bold">
                CNY
              </text>
            </view>


            <view class="d-flex-between-center border-bottom-white py-16">
              <text class="opacity-50" style="color: #000;">{{ $t('c2c.pay_info') }}</text>
              <view class="font-weight-bold" style="color: #000;display: flex;flex-direction: column;">
                <view style="display: flex;flex-direction: row;">
                  <text style="height: 20px;line-height: 20px;">{{ userCashInfo.bank_account }}</text>
                  <view>
                    <text class="iconfont icon-fuzhi font-size-30" @click="copy(userCashInfo.bank_account)"
                          style="right:2rpx;bottom:2rpx;color: #000;"></text>
                  </view>

                </view>

                <view style="text-align: right;display: flex;justify-content: right;margin-top: 5px;">
                  {{ userCashInfo.real_name }}
                  <view style="margin-top:3px;">
                    <text class="iconfont icon-fuzhi font-size-30" @click="copy(userCashInfo.real_name)"
                          style="right:2rpx;color: #000;"></text>
                  </view>
                </view>

                <view style="text-align: right;margin-top: 5px;">{{ userCashInfo.bank_name }}</view>
              </view>
            </view>

            <view class="d-flex-between-center mt-30">
              <button class="secondary-button font-size-28 w-48 py-0"
                      style="background: #ffffff;border: 1px solid #e1e1e1;"
                      @click="modalShow = false">{{ $t("common.cancel") }}
              </button>
              <button class="w-48 font-size-28 py-0" @click="sureOrder(alertInfo)" v-if="hasOrder == false"
                      :class="buyDirection ? 'error-button' : 'success-button'">{{ $t("common.confirm") }}
              </button>

              <button class="w-48 font-size-28 py-0" @click="hasPayOrder(alertInfo)" v-if="hasOrder == true"
                      :class="buyDirection ? 'error-button' : 'success-button'">
                我已付款
              </button>


            </view>
          </view>
        </u-popup>


        <u-popup v-model="modalSellShow" border-radius="10" length="90%">
          <view class="p-30">
            <view style="display: flex;width:100%;margin: 12px;border-bottom: 1px solid #f7f7f7;padding-bottom: 8px;">
              <view style="width:80px;font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;"
                    @click="changeMoneyAmountTab(0)">
                <span :class="moneyAmountTab==0 ?'activeTab':'normalTab' ">按金额出售</span>
              </view>
              <view style="width: 80px;font-size: 14px;font-family:'NotoSansSC-Bold';cursor: pointer;margin-left: 15px;"
                    @click="changeMoneyAmountTab(1)">
                <span :class="moneyAmountTab==1 ?'activeTab':'normalTab' ">按数量出售</span>
              </view>
            </view>


            <view v-if="moneyAmountTab == 0 " class="border-bottom-white" style="display:flex;">
              <view class="d-flex-between-center py-16" style="flex: 1;">
                <view class="font-weight-bold">
                  <input type="number" placeholder="0.00" v-model="alertInfoAmount"
                         style="color: #000;text-align: left;font-weight: 700;font-size: 20px;padding-left: 6px;"
                         placeholder-style="color:#929292;font-weight: 700;font-size: 20px;"/>
                </view>
              </view>
              <view class="d-block font-size-30" style="color: #000;display: flex;width: 100px;justify-content: right;">
                <view style="flex: 1;font-weight: 500;padding-top: 6px;">CNY</view>
                <view style="flex: 1;justify-content: right;text-align: right;border-left: 1px solid #f7f7f7;
               margin-bottom: 15px;
               font-weight: 500;color: #2A64FB;padding-top: 6px;" @click="maxSellFn(alertInfo);">最大
                </view>
              </view>
            </view>
            <view v-if="moneyAmountTab == 1 " class="border-bottom-white" style="display:flex;">
              <view class="d-flex-between-center py-16" style="flex: 1;">
                <view class="font-weight-bold">
                  <input type="number" placeholder="0.00" v-model="alertInfoAmount"
                         style="color: #000;text-align: left;font-weight: 700;font-size: 20px;padding-left: 6px;"
                         placeholder-style="color:#929292;font-weight: 700;font-size: 20px;"/>
                </view>
              </view>
              <view class="d-block font-size-30" style="color: #000;display: flex;width: 100px;justify-content: right;">
                <view style="flex: 1;font-weight: 500;padding-top: 6px;">{{ alertInfo.currency_name }}</view>
                <view style="flex: 1;justify-content: right;text-align: right;border-left: 1px solid #f7f7f7;
               margin-bottom: 15px;
               font-weight: 500;color: #2A64FB;padding-top: 6px;" @click="maxFn(alertInfo);">最大
                </view>
              </view>
            </view>


            <view class="d-flex-between-center border-bottom-white py-16">
              <text class="opacity-0" style="color: #000;font-weight: 700;">{{ $t('c2c.onePrice') }}</text>
              <text class="font-weight-bold" :class="buyDirection ? 'text-error' : 'text-success'">
                ￥{{ alertInfo.price }}
              </text>
            </view>
            <view class="d-flex-between-center border-bottom-white py-16" v-if="moneyAmountTab == 0">
              <text class="opacity-0" style="color: #000;font-weight: 700;">出售{{ amount }}</text>
              <text class="font-weight-bold">
                {{ alertInfo.currency_name }}
              </text>
            </view>

            <view class="d-flex-between-center border-bottom-white py-16" v-if="moneyAmountTab == 1">
              <text class="opacity-0" style="color: #000;font-weight: 700">出售{{ cnyVal }}</text>
              <text class="font-weight-bold">
                CNY
              </text>
            </view>


            <view class="d-flex-between-center border-bottom-white py-16">
              <text class="opacity-50" style="color: #000;">{{ $t('c2c.pay_info') }}</text>
              <view class="font-weight-bold" style="color: #000;display: flex;flex-direction: column;">
                <view style="display: flex;flex-direction: row;">
                  <text style="height: 20px;line-height: 20px;">{{ bankNum }}</text>
                  <view>
                    <text class="iconfont icon-fuzhi font-size-30" @click="copy(userCashInfo.bank_account)"
                          style="right:2rpx;bottom:2rpx;color: #000;"></text>
                  </view>

                </view>

                <view style="text-align: right;display: flex;justify-content: right;margin-top: 5px;">
                  {{ trueName }}
                  <view style="margin-top:3px;">
                    <text class="iconfont icon-fuzhi font-size-30" @click="copy(userCashInfo.real_name)"
                          style="right:2rpx;color: #000;"></text>
                  </view>
                </view>

                <view style="text-align: right;margin-top: 5px;">{{ bankName }}</view>
              </view>
            </view>

            <view class="d-flex-between-center mt-30">
              <button class="secondary-button font-size-28 w-48 py-0"
                      style="background: #ffffff;border: 1px solid #e1e1e1;"
                      @click="modalSellShow = false">{{ $t("common.cancel") }}
              </button>
              <button class="w-48 font-size-28 py-0" @click="sureSellOrder(alertInfo)" v-if="hasOrder == false"
                      :class="buyDirection ? 'error-button' : 'success-button'">{{ $t("common.confirm") }}
              </button>

              <button class="w-48 font-size-28 py-0" @click="confirmReceiveMoney(alertInfo.id)" v-if="hasOrder == true"
                      :class="buyDirection ? 'error-button' : 'success-button'">
                我已收到款
              </button>


            </view>
          </view>
        </u-popup>

        <u-action-sheet :list="payMethodList" v-model="showSelectPayMethod" @click="confirmPay"></u-action-sheet>

        <!-- 弹出币种选择 -->
        <u-action-sheet :list="currencyList" v-model="showSelectCurrency" @click="confirmCurrency"></u-action-sheet>


      </view>
    </view>
  </view>
</template>
<script>
import UButton from "../../uview-ui/components/u-button/u-button.vue";
import Index from "../../components/page-animation/index.vue";

export default {
  components: {Index, UButton},
  data() {
    return {
      bankName: "",
      bankNum: "",
      trueName: "",
      myWalletBalance: 0,
      currencyList: [],
      minMoney: '',
      currency: {
        name: 'USDT',
        currency_id: 23
      },
      showSelectCurrency: false,
      hasOrder: false,
      buyDirection: "",
      originalList: {},
      alertInfoAmount: "",
      moneyAmountTab: 0,
      userCashInfo: {},
      pay: {},
      payMethodList: [],
      showSelectPayMethod: false,
      alertSellInfo: {},//出售弹出框字段数组
      alertInfo: {},//购买弹出框字段数组
      modalShow: false,
      modalSellShow: false,
      currentTab: 0,
      page: 1,
      canGet: true,
      list: [],
      sortNav: [{
        name: '综合排名',
      }, {
        name: '近2周收益',
      }, {
        name: '累计收益',
      }, {
        name: '累计交易笔数',
      }, {
        name: '当前跟随人数',
      }, {
        name: '近2周胜率',
      }],
      activeSotrNav: 0,
      showOnlyHasLocation: false,
      showSelectSortNav: false,
      type: 'buy',
      currency_id: 23,
      isMerchant: 0
    };
  },
  onShow() {

  },
  mounted() {
    this.getCurrencyList();
    this.page = 1;
    this.canGet = true;
    this.list = []
    this.getBySellList();
    const token = uni.getStorageSync('token') || "";
    console.log("token====>" + token);
    if (token != null && token.length > 6) {
      this.getCashInfo();
      this.getCurrentUserInfo();
      this.getLegalWalletList();
    }
  },
  methods: {
    confirmReceiveMoney(id) {
      let that = this;
      const lang = uni.getStorageSync('lang') || 'en';
      that.$https.initDataToken({
        url: "c2c/legal_deal_sure?lang=" + lang + "&id=" + id,
        type: "POST"
      }, (res, msg) => {
        if (res.type == "ok") {
          that.$utils.showToast(res);
          that.page = 1;
          that.merchantOrderList();

        } else {
          that.$utils.showToast(res)
        }
      })
    },


    getCurrencyList() {
      let that = this;
      const lang = uni.getStorageSync('lang') || 'en';
      that.$https.initDataToken({
        url: "currency/list?lang=" + lang,
        type: "GET"
      }, (res, msg) => {
        that.currencyList = res.legal.map(el => {
          el.text = el.name
          return el
        })
      })
    },
    confirmCurrency(index) {
      this.currency = this.currencyList[index];
      console.log("选中的币种==>" + this.currency.id);
      this.currency_id = this.currency.id;
      //重新加载出售还是购买
      this.getBySellList();
      const token = uni.getStorageSync('token') || "";
      if (token != null && token.length > 6) {
        this.getLegalWalletList();
      }

    },
    //查询用户资金账户余额
    getLegalWalletList() {

      let that = this;
      const lang = uni.getStorageSync('lang') || "en";
      that.$https.initDataToken({
        url: "c2c/legalWalletList?currency_name="+this.currency.name+"&lang="+lang,
        type: "POST"
      }, (res, msg) => {

        this.originalList = res;
        console.log(JSON.stringify(this.originalList));


        const convert = Number(res.legal_wallet.totle);


        let legal_walletUSDT = Number(res.legal_wallet.totle);


        console.log("legal_walletUSDT=>" + legal_walletUSDT);
        if (this.originalList.legal_wallet.balance.length == 1) {
          let item = this.originalList.legal_wallet.balance[0];
          this.myWalletBalance = Number(item.legal_balance);

        }
        this.convert = convert.toFixed(4)
        //this.setShowList()
      })
    },

    copy(val) {
      uni.setClipboardData({
        data: val,
      });
    },
    hasPayOrder(alertInfo) {
      let id = alertInfo.id;
      that.modalShow = false;
    },
    maxFn(alertInfo) {
      console.log(this.alertInfo.surplus_number);
      this.alertInfoAmount = this.alertInfo.surplus_number;
    },

    maxSellFn(alertInfo) {
      console.log(this.alertInfo.surplus_number);
      let surplus_number = this.alertInfo.surplus_number;
      if (this.moneyAmountTab == 0) {
        let price = this.alertInfo.price;
        if (surplus_number > this.myWalletBalance) {
          this.alertInfoAmount = this.myWalletBalance * price;
        } else {
          this.alertInfoAmount = this.alertInfo.surplus_number * price;
        }
      } else {
        if (surplus_number > this.myWalletBalance) {
          this.alertInfoAmount = this.myWalletBalance;
        } else {
          this.alertInfoAmount = this.alertInfo.surplus_number;
        }
      }


    },


    changeMoneyAmountTab(val) {
      this.alertInfoAmount = "";
      this.moneyAmountTab = val;
    },
    getCurrentUserInfo() {
      let that = this;
      const lang = uni.getStorageSync('lang') || "en";
      that.$https.initDataToken({
        url: "c2c/getCurrentUserInfo?lang=" + lang,
        type: "POST"
      }, (res, msg) => {

        let data = res;
        that.isMerchant = data.isMerchant;
        console.log("是否商家==>" + that.isMerchant);

      });
    },
    confirmPay(index) {

      this.pay = this.payMethodList[index]

    },
    //获取收款信息
    getCashInfo() {
      let that = this;
      const lang = uni.getStorageSync('lang') || "en";

      that.$https.initDataToken({
        url: "c2c/myUserCashInfo?lang=" + lang,
        type: "POST"
      }, (res, msg) => {

        console.log("获取收款信息=>" + JSON.stringify(res));
        if (res.type == "ok") {

          if (res.message != null) {
            let data = res;
            if (data == "") {
              that.$utils.showToast("您尚未设置收款方式，请去个人中心绑定银行卡信息");
              return;
            }

            that.trueName = data.real_name;
            that.bankName = data.bank_name;
            that.bankNum = data.bank_account;
            that.aliPayAccount = data.alipay_account;
            that.weChatAccount = data.wechat_account;
            that.weChatName = data.wechat_nickname;

            if (this.bankNum != null && this.bankNum.length > 0 && this.bankNum != "null") {

              that.payMethodList.push({value: "bank", text: this.$t('c2c.bankcard')});
            }
            if (this.aliPayAccount != null && this.aliPayAccount.length > 0 && this.aliPayAccount != "null") {
              that.payMethodList.push({value: "ali_pay", text: "支付宝"});
            }
            if (this.weChatAccount != null && this.weChatAccount.length > 0 && this.weChatAccount != "null") {
              that.payMethodList.push({value: "we_chat", text: "微信"});
            }
            if (that.payMethodList.length > 0) {
              that.pay = that.payMethodList[0];
            }


          }

        }
      });
    },
    confirmSellOrder() {
      let that = this;

      let data = {id: this.alertInfo.id, amount: this.alertInfo.amount, type: this.type};
      that.$https.initDataToken({
        url: "c2c/buyCoin",
        type: "POST",
        data
      }, (res, msg) => {


        console.log("sureOrder==>" + JSON.stringify(res));

        that.modalShow = false;
        that.$utils.showToast(res.msg);
        that.page = 1;
        that.getList();


      })
    },

    sureSellOrder() {
      let that = this;

      let data = {id: this.alertInfo.id, amount: this.amount, type: "sell"};
      that.$https.initDataToken({
        url: "c2c/sellCoin",
        type: "POST",
        data
      }, (res, msg) => {
        console.log("出售下单==>" + JSON.stringify(res));
        if (res.type == "ok") {
          //that.modalShow = false;
          that.hasOrder = true;
          that.$utils.showToast(res.msg);
          that.page = 1;
          that.getList();
        } else {
          that.$utils.showToast(res.msg);
        }
      })
    },

    //购买下单请求
    sureOrder() {
      let that = this;

      let data = {id: this.alertInfo.id, amount: this.amount, type: this.type};
      that.$https.initDataToken({
        url: "c2c/buyCoin",
        type: "POST",
        data
      }, (res, msg) => {
        if (res.type == "ok") {
          //that.modalShow = false;
          that.hasOrder = true;
          that.$utils.showToast(res.msg);
          that.page = 1;
          that.getList();
        } else {
          that.$utils.showToast(res.msg);
        }
      })
    },
    //点击打开购买页面
    order(item) {
      let token = uni.getStorageSync('token');
      if (token == null || token.length < 6) {
        uni.redirectTo({
          url: '/pages/setting/left_menu'
        })
      }

      let that = this;
      that.modalShow = true;
      that.userCashInfo = item.userCashInfo;
      this.alertInfoAmount = 0;
      console.log("收款信息===>" + JSON.stringify(that.userCashInfo));
      this.alertInfo = item;
    },
    sellOrder(item) {
      this.alertInfo = {};
      let token = uni.getStorageSync('token');
      if (token == null || token.length < 6) {
        uni.redirectTo({
          url: '/pages/setting/left_menu'
        })
      }
      if (this.bankNum == null || this.bankNum == "") {
        this.$utils.showToast("您尚未设置收款方式，请去个人中心绑定银行卡信息");
        return;
      }

      let that = this;
      that.modalSellShow = true;

      this.alertInfoAmount = 0;
      this.alertInfo = item;

    },

    changeTab(val) {
      this.currentTab = val;
      if (val == 0) {
        this.type = "buy";
      }
      if (val == 1) {
        this.type = "sell";
      }
      this.getBySellList();

    },
    getBySellList() {


      this.list = [];
      this.$https.initDataToken({
        url: "c2c_deal_platform?page=" + this.page + "&type=" + this.type + "&currency_id=" + this.currency_id,
        type: "GET"

      }, (res, msg) => {
        const list = res.data
        if (list.length) {
          this.list = list;
          this.page = 1;
        } else {
          this.canGet = false
        }
      })
    },
    async cancel(id) {
      const {i18n} = this
      const ret = this.$utils.showModal(this.$t("common.hint"), i18n.confirmCancel)
      if (!ret) return

    }
  },
  computed: {
    cnyVal() {
      if (this.moneyAmountTab == 1) {
        return this.alertInfoAmount * this.alertInfo.price;
      }
      return 0;
    },

    amount() {//计算属性 amount 不要在data里面重复定义 否则会一直显示 0
      console.log("this.alertInfoAmount=>" + this.alertInfoAmount);
      if (this.moneyAmountTab == 1) {
        return this.alertInfoAmount;
      }
      let num = this.alertInfoAmount / this.alertInfo.price;

      num = Number(num).toFixed(2);

      return num;

    },
    i18n() {
      return this.$t("follow")
    },
    actionSheetSortNav() {
      return this.sortNav.map((item, index) => {
        item.text = item.name;
        item.disabled = false;
        if (index == this.activeSotrNav) item.disabled = true;
        return item
      })
    }
    //alertInfoAmount


  },
  onReachBottom() {
    this.getTraderList()
  }
}
</script>
<style lang="scss" scoped>
page{
  background: #000000;
}
.deposit {
  @extend .border-radius-20;
  color: white;
  padding: 0 28 rpx;
  padding-top: 38 rpx;
  position: relative;

  .earnings-wrap {
    margin: 0 -28rpx;
    margin-top: 30 rpx;

    .earnings {
      padding: 30 rpx 28 rpx 28 rpx 28 rpx;
      background-color: rgba(255, 255, 255, .1);
    }
  }

  .dealer {
    position: absolute;
    top: 26 rpx;
    right: 0;
    color: #7f612e;
    border-radius: 31 rpx 0 0 31 rpx;
    background-image: linear-gradient(to right, #d9c39b, #fef8cb);
    padding: 14 rpx 44 rpx;
    display: flex;
    align-items: center;
  }
}

.sort-nav {
  margin-top: 16 rpx;
  display: flex;
  justify-content: space-between;

  .item {
    font-size: 26 rpx;
    color: rgba(51, 51, 51, .5);
    //border: 1px solid #eff2fb;
    background-color: #eff2fb;
    border-radius: 8 rpx;
    padding: 2 rpx 7 rpx;
    margin-right: 12 rpx;

    &.active {
      background-color: #fff;
      border: 1px solid #d6173a;
      color: #d6173a;
    }
  }
}

.list {
  .item {
    @extend .box-shadow,
    .border-radius-20,
    .pt-30,
    .pb-40,
    .px-28,
    .bg-black,
    .mb-12;

    .user-num {
      @extend .d-flex,
      .align-items-center;
      border-radius: 6 rpx;
      background-color: #ecf2ff;
      color: #3084fa;
      padding: 2 rpx 8 rpx;
    }

    .status {
      font-size: 28 rpx;
      padding: 8 rpx 20 rpx;
      border-radius: 8 rpx;
      border: 2 rpx solid #fc7600;
    }

    .status-1 {
      @extend .status;
      color: #fc7600;
      border-color: #fc7600;
    }

    .status-2 {
      @extend .status;
      color: #fff;
      border-color: #3482fe;
      background-color: #3482fe;
    }

    .nums-item {
      width: 33.33%;
      margin-top: 20 rpx;

      text {
        display: block;
      }

      .text-1 {
        font-size: 22 rpx;
        opacity: .5;
      }

      .text-2 {
        font-size: 32 rpx;
        margin-top: 12 rpx;
      }
    }
  }
}

.activeTab {
  color: #ffffff;
  width: 30px;
  border-width: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #ffffff;
  font-weight: 700;
}

.normalTab {
  width: 30px;
  border-width: 12px;
  padding-bottom: 8px;
  color: #929292;
  font-weight: 700;
}
</style>
