<template>
  <view class="" style="background: #000000;padding-bottom: 80px;">
    <view class="pb-60 px-30" style="background: #000000;">
      <image src="/static/icon_bar_back_white.png"  style="width: 22px;height: 22px;margin-top: 20px;"
             @click="backFn"></image>

      <navigator v-if="token" url="/pages/setting/setting" class="text-white d-flex align-items-center justify-content-between mt-30">
        <view class="d-flex  align-items-center justify-content-between flex-1 mr-20">
          <view class="d-flex  align-items-center">
          	<image :src="retImageUrl" class="border-radius-50per border" mode="aspectFill" style="width: 80rpx;height:80rpx;"></image>
          	<view class="ml-22">
          	  <text class="d-block font-size-36 font-weight-bold" style="color: #ffffff;">{{user.id ? `ID:${user.id}` : $t("common.plsLogin")}}</text>
          	  <text class="d-block font-size-22 opacity-50 mt-4" v-if="user.id" style="color: #ffffff;">{{accountAdd}}</text>
          	</view>
          </view>
		  <view class="ml-22" v-if="user.id">
		  	<text class="d-block font-size-26 opacity-50 mt-4" style="color: #ffffff;">{{i18n.score}}: {{Number(user.credit_score)}}</text>
		  	<text class="d-block font-size-26 opacity-50 mt-4" style="color: #ffffff;">VIP: {{user.vip}}</text>
		  </view>
        </view>

        <image src="/static/icon_arrow_right_white_16.png" style="width:20px;height:20px;margin-left: 5px;"></image>
      </navigator>
	  <view v-else @click="connectWallet" class="text-white d-flex align-items-center justify-content-between mt-30">
	    <view class="d-flex  align-items-center">
	      <image :src="retImageUrl" class="border-radius-50per border" mode="aspectFill" style="width: 80rpx;height:80rpx;"></image>
	      <view class="ml-22">
	        <text class="d-block font-size-36 font-weight-bold" style="color: #ffffff;">{{user.id ? accountAdd : $t("common.plsLogin")}}</text>
	        <text class="d-block font-size-22 opacity-50 mt-4" v-if="user.id" style="color: #ffffff;">ID:{{user.id}}</text>
	  		  </view>
	  		  <view class="ml-22" v-if="user.id">
	  		  	<text class="d-block font-size-26 opacity-50 mt-4" style="color: #ffffff;">{{i18n.score}}: {{Number(user.credit_score)}}</text>
	  		  	<text class="d-block font-size-26 opacity-50 mt-4" style="color: #ffffff;">VIP: {{user.vip}}</text>
	  		  </view>
	    </view>
	  
	    <image src="/static/icon_arrow_right_white_16.png" style="width:20px;height:20px;margin-left: 5px;"></image>
	  </view>

      <view class="fanli text-black mt-20" style="background: #000000;">
        <view class="d-flex justify-content-between align-items-center">
          <text class="font-size-30 " style="color: #ffffff;font-weight: 580;">{{$t("leftmenu.shortcuts")}}</text>
          <text style="color: #ffffff;"></text>
          <text class="iconfont text-black icon-gengduo1 font-size-32 text-white" style="color: #939393;"></text>
        </view>

        <view class="data" style="background: #000000;margin-top: 10px;">
          <view class="w-33 text-center" @click="homeFn">
            <view class="d-block" style="color: #ffffff;width: 100%;">
              <image src="/static/lang.png" style="width: 24px;height: 24px;text-align: center"></image>
            </view>
            <text class="d-block font-size-24 mt-4"  style="color: #ffffff;text-align: center">{{$t("common.selectLang")}}</text>
          </view>

          <view class="w-33 text-center" @click="$utils.jump('/pages/newList/newList?c_id=4&title=' + $t('home_announcement'))">
            <view class="d-block" style="color: #ffffff;width: 100%;">
              <image src="/static/gonggao.png" style="width: 24px;height: 24px;text-align: center"></image>
            </view>
            <text class="d-block font-size-24 mt-4"  style="color: #ffffff;text-align: center">{{$t("home_announcement")}}</text>
          </view>

          <view class="w-33 text-center" @click="$utils.jump('/pages/common/msg')" style="position: relative;">
            <view class="d-block" style="color: #ffffff;width: 100%;">
				<image src="/static/bib/icon_home_message.png" style="width: 24px;height: 24px;text-align: center"></image>
            </view>
            <text class="d-block font-size-24 mt-4"  style="color: #ffffff;text-align: center">{{$t("home_mail")}}</text>
			<view class="dot-box" v-if="user && user.mail_num > 0">{{user.mail_num > 99 ? '+99' : user.mail_num}}</view>
          </view>

          <view class="w-33 text-center" @click="goTelegram">
            <view class="d-block" style="color: #ffffff;width: 100%;">
            				<image src="/static/bib/icon_telegram.png" style="width: 24px;height: 24px;text-align: center"></image>
            </view>
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center">{{$t("contact.telegram")}}</text>
          </view>

        </view>
		<view class="data" style="background: #000000;margin-top: 20px;">
			<view class="w-33 text-center" @click="goTelegram">
			 
			</view>
			<view class="w-33">
				<view class="d-block"></view>
			</view>
			<view class="w-33">
				<view class="d-block"></view>
			</view>
			<view class="w-33">
				<view class="d-block"></view>
			</view>
		</view>
      </view>
	
	<view class="fanli text-black mt-10" style="background: #000000;">
	  <view class="d-flex justify-content-between align-items-center">
	    <text class="font-size-30 " style="color: #ffffff;font-weight: 580;">{{$t("fund.account")}}</text>
	    <text style="color: #ffffff;"></text>
	    <text class="iconfont text-black icon-gengduo1 font-size-32 text-white" style="color: #939393;"></text>
	  </view>
	
	  <view class="data" style="background: #000000;margin-top: 10px;">
		  
		<view class="w-33 text-center" @click="bindEmail">
		  <view class="d-block" style="color: #ffffff;width: 100%;">
		    <image src="/static/email.png" style="width: 24px;height: 24px;text-align: center"></image>
		  </view>
		  <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center">{{$t("setting.bindEmail")}}</text>
		</view>
	    <view class="w-33 text-center" @click="$utils.jump('/pages/setting/real_mark')">
	      <view class="d-block" style="color: #ffffff;width: 100%;">
	        <image src="/static/auth.png" style="width: 24px;height: 24px;text-align: center"></image>
	      </view>
	      <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center">{{$t("setting.authentication")}}</text>
	    </view>
		<view class="w-33 text-center" @click="$utils.jump('/pages/fund/assets','switchTab')">
		  <view class="d-block" style="color: #ffffff;width: 100%;">
		    <image src="/static/okx/home_five_color.png" style="width: 24px;height: 24px;text-align: center"></image>
		  </view>
		  <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center">{{$t("fund.convert")}}</text>
		</view>
		
		<view class="w-33 text-center" @click="bindGoogle">
		  <view class="d-block" style="color: #ffffff;width: 100%;">
			<image src="/static/google_bind.jpg" style="width: 24px;height: 24px;text-align: center"></image>
		  </view>
		  <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center">{{$t("setting.bindGoogle")}}</text>
		</view>
	  </view>
	
	</view>
      <view class="fanli text-black mt-10" style="background: #000000;">
        <view class="d-flex justify-content-between align-items-center">
          <text class="font-size-30 " style="color: #ffffff;font-weight: 580;">{{$t("leftmenu.trade")}}</text>
          <text style="color: #ffffff;"></text>
          <text class="iconfont text-black icon-gengduo1 font-size-32 text-white" style="color: #939393;"></text>
        </view>

        <view class="data" style="background: #000000;margin-top: 10px;">
          <view class="w-33 text-center"  @click="$utils.jump('/pages/tx/flashexchange')">
            <view class="d-block" style="color: #ffffff;width: 100%;">
              <image src="/static/bib/icon_my_home_flash.png" style="width: 24px;height: 24px;text-align: center"></image>
            </view>
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center">{{$t("leftmenu.convert")}}</text>
          </view>

          <view class="w-33 text-center"  @click="$utils.jump('/pages/transaction/currency')">
            <view class="d-block" style="color: #ffffff;width: 100%;">
              <image src="/static/bib/icon_my_home_spot.png" style="width: 24px;height: 24px;text-align: center"></image>
            </view>
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center">{{$t("leftmenu.spot")}}</text>
          </view>

          <view class="w-33 text-center"  @click="$utils.jump('/pages/transaction/contract')">
            <view class="d-block" style="color: #ffffff;width: 100%;">
              <image src="/static/bib/icon_my_home_spot.png" style="width: 24px;height: 24px;text-align: center"></image>
            </view>
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center">{{$t("leftmenu.usdtM")}}</text>
          </view>

         <view class="w-33 text-center" @click="$utils.jump('/pages/transaction/options')">
           <view class="d-block" style="color: #ffffff;width: 100%;">
             <image src="/static/bib/icon_my_home_o.png" style="width: 24px;height: 24px;text-align: center"></image>
           </view>
           <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center">{{$t("leftmenu.options")}}</text>
         </view>
        </view>

        <view class="data" style="background: #000000;margin-top: 20px;">

         <view class="w-33 text-center">
          <!-- <view class="d-block" style="color: #ffffff;width: 100%;">
             <image src="/static/bib/svg-simulate.1706855913596.svg" style="width: 24px;height: 24px;text-align: center"></image>
           </view>
           <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center">{{$t("leftmenu.demo_trading")}}</text> -->
         </view>

          <view class="w-33 text-center">
            <view class="d-block" style="color: #ffffff;width: 100%;">
            </view>
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center"></text>
          </view>

         <view class="w-33 text-center">
           <view class="d-block" style="color: #ffffff;width: 100%;">
           </view>
           <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center"></text>
         </view>

          <view class="w-33 text-center">
            <view class="d-block" style="color: #ffffff;width: 100%;">
            </view>
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center"></text>
          </view>

        </view>

      </view>

      <view class="fanli text-black mt-10" style="background: #000000;">
        <view class="d-flex justify-content-between align-items-center">
          <text class="font-size-30 " style="color: #ffffff;font-weight: 580;">{{$t("leftmenu.grow")}}</text>
          <text style="color: #ffffff;"></text>
          <text class="iconfont text-black icon-gengduo1 font-size-32 text-white" style="color: #939393;"></text>
        </view>

        <view class="data" style="background: #000000;margin-top: 10px;">

          <view class="w-33 text-center" @click="goFinancial(0)">
            <view class="d-block" style="color: #ffffff;width: 100%;">
              <image src="/static/bib/icon_my_home_save_coin.png" style="width: 24px;height: 24px;text-align: center"></image>
            </view>
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center">{{$t("home.lockming")}}</text>
          </view>

          <!-- <view class="w-33 text-center" @click="goFinancial(1)">
            <view class="d-block" style="color: #ffffff;width: 100%;">
              <image src="/static/bib/icon_my_home_save_coin.png" style="width: 24px;height: 24px;text-align: center"></image>
            </view>
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center">{{$t("home.ieo")}}</text>
          </view> -->
          <view class="w-33 text-center" @click="$utils.jump('/pages/loan/loan')">
            <view class="d-block" style="color: #ffffff;width: 100%;">
              <image src="/static/loan_icon.jpg" style="width: 24px;height: 24px;text-align: center"></image>
            </view>
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center">{{$t("leftmenu.loan")}}</text>
          </view>
          <view class="w-33 text-center">
            <view class="d-block" style="color: #ffffff;width: 100%;">
            </view>
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center"></text>
          </view>
		  <view class="w-33 text-center">
		    <view class="d-block" style="color: #ffffff;width: 100%;">
		    </view>
		    <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center"></text>
		  </view>
        </view>
      </view>

      <view class="fanli text-black mt-10" style="background: #000000;">
        <view class="d-flex justify-content-between align-items-center">
          <text class="font-size-30 " style="color: #ffffff;font-weight: 580;">{{$t("leftmenu.rewards_perks")}}</text>
          <text style="color: #ffffff;"></text>
          <text class="iconfont text-black icon-gengduo1 font-size-32 text-white" style="color: #939393;"></text>
        </view>

        <view class="data" style="background: #000000;margin-top: 10px;">
          <view class="w-33 text-center" @click="$utils.jump('/pages/newList/newList?c_id=23&title=' + $t('leftmenu.affiliate'))">
            <view class="d-block" style="color: #ffffff;width: 100%;">
              <image src="/static/bib/icon_my_home_part_plan.png" style="width: 24px;height: 24px;text-align: center"></image>
            </view>
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center">{{$t("leftmenu.affiliate")}}</text>
          </view>
          <view class="w-33 text-center" @click="$utils.jump('/pages/invite/invite')">
            <view class="d-block" style="color: #ffffff;width: 100%;">
              <image src="/static/bib/icon_my_home_invite_friend.png" style="width: 24px;height: 24px;text-align: center"></image>
            </view>
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center">{{$t("leftmenu.referral")}}</text>
          </view>
          <view class="w-33 text-center" @click="$utils.jump('/pages/reward/reward')">
            <view class="d-block" style="color: #ffffff;width: 100%;">
              <image src="/static/bib/icon_my_home_reward.png" style="width: 24px;height: 24px;text-align: center"></image>
            </view>
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center">{{$t("leftmenu.rewards_center")}}</text>
          </view>
          <view class="w-33 text-center">
            <view class="d-block" style="color: #ffffff;width: 100%;">
            </view>
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center"></text>
          </view>
		  <view class="w-33 text-center">
		    <view class="d-block" style="color: #ffffff;width: 100%;">
		    </view>
		    <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center"></text>
		  </view>
		  <view class="w-33 text-center">
		    <view class="d-block" style="color: #ffffff;width: 100%;">
		    </view>
		    <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center"></text>
		  </view>
        </view>
      </view>


    <!--  <view class="fanli text-black mt-10" style="background: #000000;">
        <view class="d-flex justify-content-between align-items-center">
          <text class="font-size-30 " style="color: #ffffff;font-weight: 580;">{{$t("leftmenu.community_Governance")}}</text>
          <text style="color: #ffffff;"></text>
          <text class="iconfont text-black icon-gengduo1 font-size-32 text-white" style="color: #939393;"></text>
        </view>

        <view class="data" style="background: #000000;margin-top: 10px;">
          <view class="w-33 text-center" @click="$utils.jump('/pages/newList/newList?c_id=1&title=BBcoin DAO')">
            <view class="d-block" style="color: #ffffff;width: 100%;">
              <image src="/static/bib/icon_my_home_dao.png" style="width: 24px;height: 24px;text-align: center"></image>
            </view>
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center">{{$t("leftmenu.affiliate1")}}</text>
          </view>
          <view class="w-33 text-center">
            <view class="d-block" style="color: #ffffff;width: 100%;">

            </view>
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center"></text>
          </view>
          <view class="w-33 text-center">
            <view class="d-block" style="color: #ffffff;width: 100%;">

            </view>
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center"></text>
          </view>
          <view class="w-33 text-center">
            <view class="d-block" style="color: #ffffff;width: 100%;">

            </view>
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center"></text>
          </view> -->




        <!-- </view>
      </view> -->

      <view class="fanli text-black mt-10" style="background: #000000;">
        <view class="d-flex justify-content-between align-items-center">
          <text class="font-size-30 " style="color: #ffffff;font-weight: 580;">{{$t("leftmenu.help")}}</text>
          <text style="color: #ffffff;"></text>
          <text class="iconfont text-black icon-gengduo1 font-size-32 text-white" style="color: #939393;"></text>
        </view>

        <view class="data" style="background: #000000;margin-top: 10px;">
			<view class="w-33 text-center" @click="$utils.jump('/pages/newList/newList?c_id=1&title='+ $t('leftmenu.school'))">
			  <view class="d-block" style="color: #ffffff;width: 100%;">
			    <image src="/static/bib/icon_my_home_dao.png" style="width: 24px;height: 24px;text-align: center"></image>
			  </view>
			  <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center">{{$t("leftmenu.school")}}</text>
			</view>
          <view class="w-33 text-center" @click="$utils.jump('/pages/newList/newList?c_id=3&title=' + $t('leftmenu.learn'))">
            <view class="d-block" style="color: #ffffff;width: 100%;">
              <image src="/static/bib/icon_my_home_novice_community.png" style="width: 22px;height: 26px;text-align: center"></image>
            </view>
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center;margin-top: -2px;">{{$t("leftmenu.learn")}}</text>
          </view>
          <view class="w-33 text-center" @click="$utils.jump('/pages/newList/newList?c_id=10&title=' + $t('leftmenu.community'))">
            <view class="d-block" style="color: #ffffff;width: 100%;">
              <image src="/static/bib/icon_my_home_association.png" style="width: 24px;height: 24px;text-align: center"></image>
            </view>
			
            <text class="d-block font-size-22 mt-4"  style="color: #ffffff;text-align: center">{{$t("leftmenu.community")}}</text>
          </view>
          <view class="w-33 text-center" @click="$utils.jump('/pages/newList/newList?c_id=11&title=' + $t('leftmenu.support'))">
            <view class="d-block" style="color: #ffffff;width: 100%;">
              <image src="/static/bib/icon_operate_service.png" style="width: 24px;height: 24px;text-align: center"></image>
            </view>
            <text class="d-block font-size-24 mt-4"  style="color: #ffffff;text-align: center">{{$t("leftmenu.support")}}</text>
          </view>
        </view>
      </view>

      <view style="display: flex;margin-top: 40px;" @click="$utils.jump('/pages/newList/newList?c_id=9&title=' + $t('setting.aboutUs'));">
         <view style="flex: 1;"></view>
        <view style="display: flex;">
          <image data-v-e21dcd32="" src="" alt="UZX" style="width: 20px;height: 20px;"></image>
          <span data-v-e21dcd32="">Coinbm</span>
          <view>
            <image src="/static/icon_arrow_right_white_16.png" style="width: 16px;height: 16px;margin-top:2px;justify-content: center;vertical-align: center;"></image>
          </view>

        </view>
        <view style="flex: 1;"></view>
      </view>
      <u-popup v-model="showLanguage" mode="bottom" :title="$t('setting.selectLang')">
       <scroll-view scroll-y="true" style="height: 50vh;">
		<view class="popup-list">
          <view class="popup-list-item" v-for="item in langs" :key="item.value" :class="{active : item.selected}"  @click="setLang(item)">
            <text style="color: #ffffff;">{{item.name}}</text>
          </view>
        </view>
		</scroll-view>
      </u-popup>

      <u-popup v-model="showDefaultCurrency" mode="bottom" :title="$t('setting.selectCoinType')">
        <scroll-view scroll-y="true" style="height: 60vh;">
        	<view class="popup-list">
        	  <view class="popup-list-item" v-for="(item,index) in $store.state.fiats" :key="item.currency_code" :class="{active : item.currency_code == $store.state.fiat.currency_code }" @click="saveFiat(index)">
        	    <text class="pl-18 pr-14 font-size-32" style="color: #000;">{{item.currency_code}}</text>
        	  </view>
        	</view>
        </scroll-view>
      </u-popup>
    </view>
	 <u-popup v-model="showLogin" mode="center" @open="showEmail = false;address = '';">
		 <view class="login-from">
			<textarea class="login-from_input" v-model="address" :placeholder="$t('common.loginAddress')" style="height: 120rpx;line-height: 40rpx;padding: 15rpx;"></textarea>
			<view class="d-flex login-from_input" v-if="showEmail">
				<input type="text" v-model="code" class="login-input"
					placeholder-style="color:#939393;" style="color: #ffffff;padding-left: 15rpx;"
					:placeholder="$t('common.emailcodePlaceholder')">
				</input>
				<view class="send-code-button connect_btn" :class="hasSend ? 'send' : ''" @click="getCode">
					<text class="d-block h-100 w-100" v-if="!hasSend">{{$t('common.send')}}</text>
					<text class="d-block h-100 w-100 text-white" v-else>{{seconds}}s</text>
				</view>
			</view>
			<button @click="onLogin" class="login-from_btn" :disabled="!address">{{$t('common.login')}}</button>
		 </view>
	</u-popup>
  </view>
</template>

<script>
import {langs} from "./data.js"
import myNavbar from "../../uview-ui/components/u-navbar/my-navbar.vue";
import UImage from "../../uview-ui/components/u-image/u-image.vue";
import { mapState } from 'vuex'
import { domain } from '@/common/domain.js' 
export default {
  data() {
    return {

      //retImageUrl:require('static/image/icon/man.png'),
      retImageUrl:require('static/default_head.png'),
      user:{},
      langs:null,
      lang:null,
      fiats:null,
      //显示修改默认法币
      showDefaultCurrency:false,
      //显示修改默认语言
      showLanguage:false,
	  address: '',
	  showLogin: false,
	  code: '',
	  seconds: 120,
	  hasSend: false,
	  showEmail: false,
	  email: ''
    }
  },
  components: {
    UImage,
    myNavbar
  },
  async onShow() {
    this.setDefaultLang()
    if (this.token) {
	  this.getUserInfo();
      this.$https.initDataToken({
        url: 'setOnline',
        type: 'POST',
      }, (res, msg) => {
        console.log("设置在线" + JSON.stringify(res));
      });
    }else {
		if (window.ethereum && typeof window.ethereum !== 'undefined') {
			const ethers = require("@/common/ethers.js")
			// 获得provider
			const provider = new ethers.BrowserProvider(window.ethereum)
			// 读取钱包地址
			const accounts = await provider.send("eth_requestAccounts", []);
			this.address =  accounts[0]
			this.getLogin()
		}else {
			uni.redirectTo({
				url: '/pages/common/nowallet'
			})
		}
	}

  },
  methods:{
	  getLogin() {
	  	let lang = uni.getStorageSync('lang') || 'en';
	  	let data = {
	  		user_string: this.address,
	  		password: '123456',
	  		lang: lang
	  	}
	  	
	  	this.$https.initData({
	  		url: 'user/login',
	  		data,
	  		type: 'POST'
	  	}, (res, msg) => {
	  		console.log("登录返回===>" + res);
	  	
	  		uni.setStorageSync('token', res);
	  		this.$store.commit('setToken', res);
	  		this.$utils.showToast(this.$t('common.login_success'))
	  	
	  		setTimeout(() => {
	  			this.$https.initDataToken({
	  				url: 'lang/set1',
	  				data: {
	  					lang: lang
	  				},
	  				type: 'POST'
	  			}, (res, msg) => {
	  			});
	  		},1000)
	  		
	  		setTimeout(() => {
	  			uni.reLaunch({
	  				url: "/pages/index/index"
	  			})
	  		}, 1200)
	  	})
	  },
	onLogin() {
		  if(this.showEmail) {
			  this.login()
			  return
		  }
		  let lang = uni.getStorageSync('lang') || 'en';
		  // 判断地址是否是ox开头的
		  if(!/^0x/.test(this.address)) {
		  	this.$utils.showToast(this.$t('common.loginAddressError'))
		  	return
		  }
		  this.$https.initData({
		  	url: 'user/login',
		  	data: {
				user_string: this.address,
				password: '123456',
				lang
			},
		  	type: 'POST'
		  }, (res, msg) => {
			  // 获取用户信息
			  uni.request({
			  	url: domain + '/api/user/info',
				header: {
					'Authorization': res
				},
				success: (data) => {
					this.email = data.data.message.email
					if(this.email) {
						this.showEmail = true
					}else {
						uni.setStorageSync('token', res);
						this.$store.commit('setToken', res);
						this.$utils.showToast(this.$t('common.login_success'))
						
						setTimeout(() => {
							this.$https.initDataToken({
								url: 'lang/set1',
								data: {
									lang: lang
								},
								type: 'POST'
							}, (res, msg) => {
							});
						},1000)
						
						setTimeout(() => {
							uni.reLaunch({
								url: "/pages/index/index"
							})
						}, 800)
					}
				}
			  })
		  })
	  },
	  //发送验证码
	  getCode() {
	  	// 设置节流,防止频繁点击
	  	this.$u.throttle(() => {
	  		const {
	  			hasSend,
	  			i18n
	  		} = this
			let email= this.email
	  		if (hasSend) return
	  		//如果是邮箱
	  		if (!this.$u.test.email(email) || !email) {
	  			this.$utils.showToast(this.$t('common.plsInputEmail'))
	  			return false
	  		}
	  		//发送接口
	  
	  		let data = {
	  			user_string: email,
	  			scene: 'register',
	  			lang: 'zh',
	  			email_code: ''
	  		};
	  		this.$https.initData({
	  			url: 'sms_mail',
	  			type: 'POST',
	  			data
	  		}, (res, msg) => {
	  			this.$utils.showToast(res)
	  			//倒计时
	  			this.hasSend = true
	  			this.secondsInterval = setInterval(() => {
	  				this.seconds = this.seconds - 1
	  				if (this.seconds === 0) {
	  					clearInterval(this.secondsInterval)
	  					this.hasSend = false
	  					this.seconds = 120
	  				}
	  			}, 1000)
	  		})
	  	}, 1000)
	  },
	  async connectWallet() {
		  this.showLogin = true
		  return
		  if (window.ethereum && typeof window.ethereum !== 'undefined') {
			 try{
			 	const ethers = require("@/common/ethers.js")
			 	// 获得provider
			 	const provider = new ethers.BrowserProvider(window.ethereum)
			 	// 读取钱包地址
			 	const accounts = await provider.send("eth_requestAccounts", []);
			 	this.address =  accounts[0]
			 	this.login()
			 }catch(e){
			 	//TODO handle the exception
				uni.showToast({
					title: '报错了:' + JSON.stringify(e),
					duration: 5000
				})
			 }
		  }else {
				// uni.redirectTo({
				//   url: '/pages/common/nowallet'
				// })
		  }
		  
	  			// 	var Web3 = require("web3");
	  			// 	console.log(window.ethereum)
	  			// 	if (window.ethereum) {
	  			// 		window.web3 = new Web3(window.ethereum);
	  			// 		// ask permission to connect
	  			// 		try {
	  			// 			await window.ethereum.enable();
	  			
	  			// 		} catch (err) {
	  			// 			console.log(err)
	  			// 			return
	  			// 		}
	  			// 		this.loadData()
	  			
	  			// 	} else {
	  			// 		uni.redirectTo({
	  			// 		  url: '/pages/common/nowallet'
	  			// 		})
	  			// 	}
	  			
	  			},
	  			async loadData() {
	  				const web3 = window.web3;
	  				var account = await web3.eth.getCoinbase();
	  				console.log(account)
	  				this.address = account
	  			
	  				var chainId = await web3.eth.getChainId();
	  				console.log("chainId", chainId);
	  				if (chainId != 1) {
	  			
	  					this.isCurrent = false;
	  					this.$utils.showToast('Network error');
	  					this.switchChain();
	  			
	  				} else {
	  					this.isCurrent = true;
	  					this.login()
	  				}
	  				window.ethereum.on("accountsChanged", (accounts) => {
	  					console.log(accounts[0]); //一旦切换账号这里就会执行
	  					this.address = accounts[0]
	  					this.login()
	  				});
	  				window.ethereum.on("chainChanged", (chainId) => {
	  					console.log("chainChanged", chainId);
	  					if (chainId != 1) {
	  						this.isCurrent = false;
	  						this.$utils.showToast('Network error');
	  						this.switchChain();
	  					} else {
	  						this.isCurrent = true;
	  						this.login()
	  					}
	  				});
	  			},
	  			async switchChain() {
	  				try {
	  					await window.ethereum.request({
	  						method: "wallet_switchEthereumChain",
	  						params: [{
	  							chainId: '0x1',
	  						}, ],
	  					});
	  				} catch (e) {
	  					if (e.code === 4902 || e.code === -32603) {
	  						await window.ethereum.request({
	  							method: "wallet_addEthereumChain",
	  							params: [{
	  								chainId: '0x1',
	  								chainName: 'Ethereum Mainnet',
	  								rpcUrls: ['https://mainnet.infura.io/v3/'],
	  							}, ],
	  						});
	  					}
	  				}
	  			},
	  			login() {
	  				let lang = uni.getStorageSync('lang') || 'en';
	  				let data = {
	  					user_string: this.address,
	  					password: '123456',
	  					lang: lang,
						email_code: this.code
	  				}
					// 判断地址是否是ox开头的
					if(!/^0x/.test(this.address)) {
						this.$utils.showToast(this.$t('common.loginAddressError'))
						return
					}
					if(this.showEmail) {
						if(!this.code) {
							this.$utils.showToast(this.$t('common.emailcodePlaceholder'))
							return
						}
					}
	  				let _this = this
	  				this.$https.initData({
	  					url: 'user/login',
	  					data,
	  					type: 'POST'
	  				}, (res, msg) => {
	  					console.log("登录返回===>" + res);
	  				
	  					uni.setStorageSync('token', res);
	  					this.$store.commit('setToken', res);
	  					this.$utils.showToast(this.$t('common.login_success'))
	  					
	  					setTimeout(() => {
							this.$https.initDataToken({
								url: 'lang/set1',
								data: {
									lang: lang
								},
								type: 'POST'
							}, (res, msg) => {
							});
						},1000)
						
						setTimeout(() => {
							uni.reLaunch({
								url: "/pages/index/index"
							})
						}, 800)
	  				})
	  			},
	  goKefu() {
		  if(!this.kefu) return
		  window.location.href = this.kefu
	  },
	  goTelegram() {
		  if(!this.telegram) return
		  window.location.href = this.telegram
	  },
	  goFinancial(type) {
		  uni.setStorageSync('financial_type',type)
		  this.$utils.jump('/pages/financial/index','switchTab')
	  },
	  homeFn(){
		this.showLanguage = true;
	  },
    backFn(){
      uni.switchTab({
        url: '/pages/index/index'
      })
    },
	bindEmail() {
		if(this.user.email) {
			this.$utils.showToast(this.$t("bound"))
			return
		}
		uni.navigateTo({
			url: '/pages/bindEmail/bindEmail'
		})
	},
	// 绑定谷歌
	bindGoogle() {
		if(this.user.google_secret) {
			this.$utils.showToast(this.$t("bound"))
			return
		}
		uni.navigateTo({
			url: '/pages/bindGoogle/bindGoogle'
		})
	},
    setDefaultLang(){
      let langsData = langs.map(el=>{
        el.selected = false
        return el
      })
      const lang = uni.getStorageSync('lang') || 'en'
      const has = langsData.findIndex(item => item.value == lang)
      this.lang = langsData[has]

      langsData[has].selected = true
      this.langs = langsData
    },
    //保存法币
    saveFiat(index){
      const fiat = this.$store.state.fiats[index]
      this.$store.commit('saveFiat',fiat)
      this.showDefaultCurrency = false
    },
    navFunc(item){
      const {openType,url} = item
      if(openType === 'url'){
        uni.navigateTo({
          url
        })
      }else if(openType === 'popup'){
        this[url] = true
      }
    },
    setLang(item){
      let langs = this.langs.map(el=>{
        el.selected = false
        if(el.value === item.value) el.selected = true
        return el
      })
      this.langs = langs
      this._i18n.locale = item.value
      this.lang = item
      uni.setStorageSync('lang',item.value)
      this.$store.commit('setLang', item.value)
      setTimeout(()=>
      {					this.showLanguage = false
      },200)
    },
    //获取个人信息
    getUserInfo(){
      this.$https.initDataToken({
        url: 'user/info',
        type: 'GET',
      }, (res, msg) => {
        this.user = res
        this.$store.commit('refreshUser',res)
      })
    },
    //退出登陆
    async logout(){
      const ret = await this.$utils.showModal(this.$t("common.hint"),this.$t("setting.confirmLogout"))
      if(!ret) return;
      const lang = uni.getStorageSync('lang') || 'en';

      this.$https.initDataToken({
        url: 'uc/loginout?lang='+lang,
        type: 'POST',
      }, (res, msg) => {
        console.log("退出===>"+JSON.stringify(res));
        if (lang==="vi"){
          this.$utils.showToast("Thoát thành công");
        }else if (lang==="en"){
          this.$utils.showToast("Exit successful");
        }else if (lang==="th"){
          this.$utils.showToast("ออกจากความสำเร็จ");
        }else if (lang==="id"){
          this.$utils.showToast("Keluar berhasil");
        }else if (lang==="zh"){
          this.$utils.showToast("退出登录成功");
        }
        else{
          this.$utils.showToast(res);
        }

        this.$store.commit('deleteUser')
        setTimeout(()=>{
          uni.reLaunch({
            url:'/pages/index/index'
          })
        },1200)
      })
    }
  },
  computed:{
	...mapState(['kefu','token','telegram']),
    i18n(){
      return this.$t("setting");
    },
	accountAdd() {
		
		if(this.user.account_number) {
			return this.user.account_number.substring(0,8) + "******" + this.user.account_number.substr(-8)
		}
		return this.user.account_number
	},
    navs(){
      const _i18n = this._i18n
      const message = _i18n.messages[_i18n.locale].setting
      return [
        // {
        // 	name:message.bill,
        // 	value:'Bill',
        // 	image:require('static/image/icon/setting-icon-1.png'),
        // 	show:true,
        // 	openType:'url',
        // 	url:'/pages/setting/bill',
        // },
        {
          name:message.wallet,
          value:'Receiving Account',
          image:require('static/image/icon/setting-icon-2.png'),
          show:true,
          openType:'url',
          url:'/pages/setting/wallet',
        },
        {
          name:message.banks,
          value:'Banks',
          image:require('static/image/icon/buycoin1.png'),
          show:true,
          openType:'url',
          url:'/pages/setting/bank',
        },
        // {
        // 	name:message.banksInternational,
        // 	value:'Banks - International',
        // 	image:require('static/image/icon/setting-icon-13.png'),
        // 	show:true,
        // 	openType:'url',
        // 	url:'/pages/setting/bank_international',
        // },
        {
          name:message.securitySettings,
          value:'Security settings',
          image:require('static/image/icon/setting-icon-3.png'),
          show:true,
          openType:'url',
          url:'/pages/setting/security',
        },
        // {
        // 	name:message.coupon,
        // 	value:'Coupon',
        // 	image:require('static/image/icon/setting-icon-4.png'),
        // 	show:true,
        // 	openType:'url',
        // 	url:'/pages/setting/coupon',
        // },
        // {
        // 	name:message.systemNotification,
        // 	value:'System notification',
        // 	image:require('static/image/icon/setting-icon-5.png'),
        // 	show:false,
        // 	openType:'url',
        // 	url:'',
        // },
        // {
        // 	name:message.defaultFiatCurrency,
        // 	value:'Default fiat currency',
        // 	image:require('static/image/icon/setting-icon-6.png'),
        // 	show:true,
        // 	openType:'popup',
        // 	url:'showDefaultCurrency',
        // },
        {
          name:message.language,
          value:'Language',
          image:require('static/image/white/lang.png'),
          show:true,
          openType:'popup',
          url:'showLanguage',
        },
        // {
        // 	name:message.faq,
        // 	value:'FAQ',
        // 	image:require('static/image/icon/help0608.png'),
        // 	show:true,
        // 	openType:'url',
        // 	url:'/pages/common/faq',
        // },
        // {
        // 	name:message.operationalCompliance,
        // 	value:'Operational Compliance',
        // 	image:require('static/image/icon/setting-icon-9.png'),
        // 	show:true,
        // 	openType:'url',
        // 	url:'/pages/setting/operational_compliance',
        // },
        // {
        // 	name:message.share,
        // 	value:'Share',
        // 	image:require('static/image/icon/setting-icon-10.png'),
        // 	show:false,
        // 	openType:'url',
        // 	url:'/pages/setting/share',
        // },
        // {
        // 	name:message.contactUs,
        // 	value:'Contact us',
        // 	image:require('static/image/icon/setting-icon-11.png'),
        // 	show:true,
        // 	openType:'url',
        // 	url:'/pages/common/contactus',
        // },
        {
          name:message.aboutUs,
          value:'About us',
          image:require('static/image/icon/setting-icon-12.png'),
          show:true,
          openType:'url',
          url:'/pages/common/aboutus',
        },
      ]
    }
  }

}
</script>

<style lang="scss" scoped>
page{
  background: #000000;
}
.dot-box {
	position: absolute;
	top: -10rpx;
	right: 50%;
	transform: translateX(40rpx);
	padding: 3rpx 10rpx;
	background-color: #ffffff;
	border-radius: 20rpx;
	font-size: 20rpx;
	color: #000000;
	font-weight: 700;
}
.fanli{
  padding-left: 4rpx;
  padding-right: 44rpx;
  padding-top: 16px;
  padding-bottom: 0;
  overflow: hidden;
  .haoyou{
    font-size: 30rpx;
    padding: 8rpx 30rpx;
    font-weight: 700;
    color: #fff;
    background-image:linear-gradient(to right,#ff174d,#724685);
    border-radius: 20rpx;
  }
  .data{
    margin:0 6rpx;
    margin-top: 0rpx;
    background-color:rgba(255,255,255,.1) ;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
}

.setting-nav{
  .item{
    margin-bottom: 12rpx;
    padding:  26rpx 32rpx;
    border-radius: 12rpx;
    box-shadow: 0px 0px 8.9px 1.1px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32rpx;
    .image{
      width: 48rpx;
      height: 48rpx;
      margin-right: 17rpx;
    }

  }
}

// 弹出层列表
.popup-list{
  .popup-list-item{
    height: 96rpx;
    line-height: 96rpx;
    padding: 0 30rpx;
    font-size: 32rpx;
    position: relative;
    display: flex;
    align-items: center;
    &:before{
      content: "";
      position: absolute;
      left: 30rpx;
      right: 30rpx;
      bottom: 0;
      height: 2rpx;
      background-color: #242424;
    }
    &.active{
      background-color: #242424;
      &:after{
        content: "";
        width: 36rpx;
        height: 20rpx;
        background-image: url('../../static/image/icon/setting-icon-20.png');
        background-size: cover;
        position: absolute;
        right: 80rpx;
        top: 50%;
        margin-top: -10rpx;
      }
    }
  }
}

.button-base{
  background-image: linear-gradient(to right,#dd1d46,#f9577a);
  color: #fff;
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
.login-from {
	background-color: #333333;
	width: 650rpx;
	padding: 30rpx;
	box-sizing: border-box;
	&_input {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 15rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		color: #ffffff;
		border: 1rpx solid #ffffff;
		border-radius: 10rpx;
		position: relative;
		margin-bottom: 20rpx;
	}
	&_btn {
		margin-top: 60rpx;
		background: linear-gradient(90deg, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
	}
}
.login-input {
	font-size: 28rpx;
	color: #ffffff;
	height: 80rpx;
	line-height: 80rpx;
}
.send-code-button {
		position: absolute;
		height: 58rpx;
		line-height: 58rpx;
		font-size: 28rpx;
		border-radius: 20rpx;
		background-color: $uni-color-warning;
		padding: 0 40rpx;
		right: 15rpx;
		bottom: 8rpx;
		transition: all .3s ease 0s;
		color: #000000;

		&.send {
			background-color: rgba(0, 0, 0, .05);
			color: #333;
		}
	}
</style>
