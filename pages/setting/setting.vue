<template>
	<view class="" style="background: #000000;">
		<l-common-navbar :title="$t('settingV2024')" :isCustomBack="true" @back="$utils.jump('/pages/setting/left_menu')" />
		<view class="pb-60 px-30" style="background: #000000;">

			<view class="fanli text-black mt-40" v-if="false">
				<view class="d-flex justify-content-between align-items-center">
					<text class="font-size-30 " style="color: #ffffff;">{{i18n.inviteDesc}}</text>
					<text class="haoyou"  style="color: #ffffff;">{{i18n.inviteDesc2}}</text>
					<text class="iconfont text-black icon-gengduo1 font-size-32 text-white" style="color: #939393;"></text>
				</view>
				<view class="data">
					<view class="w-33">
						<text class="d-block font-size-22 opacity-75" style="color: #ffffff;">{{i18n.inviteNumber}}</text>
						<text class="d-block font-size-32 mt-24 font-weight-bold">0人</text>
					</view>
					<view class="w-33 text-center">
						<text class="d-block font-size-22 opacity-75" style="color: #000;">{{i18n.inviteTransNumber}}</text>
						<text class="d-block font-size-32 mt-24 font-weight-bold">0人</text>
					</view>
					<view class="w-33 text-right">
						<text class="d-block font-size-22 opacity-75" style="color: #000;">{{i18n.myRebate}}</text>
						<text class="d-block font-size-32 mt-24 font-weight-bold">0.00 USDT</text>
					</view>
				</view>
			</view>



			<view class="setting-nav text-white mt-40" style="background: #000000;">
			<view class="item">
			  <view class="d-flex align-items-center">
				<text class="opacity-90" style="color: #ffffff;">UID</text>
			  </view>
			  <view class="d-flex align-items-center opacity-90"></view>
			
			  <view class="opacity-90" style="display: flex;">
				<text style="color: #707070;line-height: 16px;height: 16px;margin-right: 10px;">{{user.id}}</text>
				<view style="height: 16px;line-height: 16px;">
				  <image src="/static/icon_copy.png" style="width: 16px;height: 16px;" @click="copy"></image>
				</view>
			  </view>
			</view>
			<view class="item" @click="bindEmail">
			  <view class="d-flex align-items-center">
			    <text class="opacity-90" style="color: #ffffff;">{{i18n.email}} </text>
			  </view>
			  <view class="d-flex align-items-center opacity-90"></view>
			  <view class="opacity-90" style="display: flex;">
			    <text style="color: #707070;line-height: 16px;height: 16px;">{{user.email ? user.email : i18n.unbound }}</text>
			    <view style="height: 16px;line-height: 16px;">
			      <image src="/static/icon_arrow_right_white_16.png" style="width: 16px;height: 16px;"></image>
			    </view>
			  </view>
			</view>
        <view class="item" @click="$utils.jump('/pages/vipDesc/vipDesc');">
          <view class="d-flex align-items-center">
            <text class="opacity-90" style="color: #ffffff;">VIP </text>
          </view>
          <view class="d-flex align-items-center opacity-90"></view>
          <view class="opacity-90" style="display: flex;">
            <text style="color: #707070;line-height: 16px;height: 16px;">{{user.vip}}</text>
            <view style="height: 16px;line-height: 16px;">
              <image src="/static/icon_arrow_right_white_16.png" style="width: 16px;height: 16px;"></image>
            </view>
          </view>
        </view>
        

        <view class="item" @click="uploadAvatar">
          <text style="color: #ffffff;">{{$t("setting.avatar")}}</text>
          <view class="d-flex align-items-center opacity-90"></view>
          <view class="right" style="display: flex;">
            <image :src="$store.state.user.head_portrait || retImageUrl" class="avatar" mode="aspectFill"></image>
            <view style="height: 16px;line-height: 16px;">
              <image src="/static/icon_arrow_right_white_16.png" style="width: 16px;height: 16px;margin-top: 12px;"></image>
            </view>
          </view>
        </view>


        <!-- <navigator class="item" url="/pages/setting/real_mark">
          <view class="d-flex align-items-center">

            <svg t="1715464069803" class="icon"  style="margin-left: 3px;"
                 viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5250" width="200" height="200"><path d="M862.208 58.88H161.792C72.704 58.88 0 131.584 0 220.672v595.456c0 89.088 72.704 161.792 161.792 161.792h700.416c89.088 0 161.792-72.704 161.792-161.792V220.672c0-89.088-72.704-161.792-161.792-161.792zM331.264 299.008c51.2 0 91.648 40.448 91.648 91.648s-40.448 91.648-91.648 91.648-91.648-40.448-91.648-91.648 40.448-91.648 91.648-91.648z m0 438.784c-108.032 0-194.048 2.56-194.048-86.016s86.016-161.792 194.048-161.792 194.048 72.704 194.048 161.792c0 91.648-86.016 86.016-194.048 86.016z m498.688-104.96h-137.216c-29.696 0-51.2-24.064-51.2-51.2 0-29.696 24.064-51.2 51.2-51.2h137.216c29.696 0 51.2 24.064 51.2 51.2 0 29.696-21.504 51.2-51.2 51.2z m0-166.912h-204.8c-29.696 0-51.2-24.064-51.2-51.2 0-29.696 24.064-51.2 51.2-51.2h204.8c29.696 0 51.2 24.064 51.2 51.2 2.56 27.136-21.504 51.2-51.2 51.2z" p-id="5251" fill="#2A64FB"></path></svg>
            <text style="color: #ffffff;margin-left: 16px;">{{$t("setting.authentication")}}</text>
          </view>


          <view class="right">
            <text class="iconfont icon-gengduo1 ml-20" style="color: #000;"></text>
          </view>
        </navigator> -->


				<!-- <view class="item" v-for="item in navs" :key="item.value" @click="navFunc(item)">
					<view class="d-flex align-items-center">
						<image :src="item.image" class="image" style="border: none;"></image>
						<text class="opacity-90" style="color: #ffffff;">{{item.name}}</text>
					</view>

					<view class="d-flex align-items-center opacity-90" v-if="item.value == 'Default fiat currency' && false">
						<text style="color: #ffffff;">1USD {{$store.state.fiat.currency_code == 'USD' ? '=' : '≈'}} {{$store.state.fiat.rate + $store.state.fiat.currency_code}}</text>
						<u-icon name="arrow-down" class="ml-12"></u-icon>
					</view>

					<view class="opacity-90" v-else-if="item.value == 'Language'">
						<text style="color: #ffffff;">{{lang.name}}</text>
					</view>
				</view> -->
			</view>

<!--      <button class="warning-button mt-28 connect_btn"  style="color: #000000;" v-if="$store.state.token"
              @click="logout">{{$t("common.logout")}}</button>


      <button class="warning-button mt-28 connect_btn"  style="color: #000000;" v-else
              @click="$utils.jump('/pages/setting/left_menu','redirectTo')"
      >{{$t("common.login")}}</button> -->



			<u-popup v-model="showLanguage" mode="bottom" length="70%" :title="$t('setting.selectLang')">
				<view class="popup-list">
					<view class="popup-list-item" v-for="item in langs" :key="item.value" :class="{active : item.selected}"  @click="setLang(item)">
						<text style="color: #ffffff;">{{item.name}}</text>
					</view>
				</view>
			</u-popup>

			<u-popup v-model="showDefaultCurrency" mode="bottom" length="80%" :title="$t('setting.selectCoinType')">
				<view class="popup-list">
					<view class="popup-list-item" v-for="(item,index) in $store.state.fiats" :key="item.currency_code" :class="{active : item.currency_code == $store.state.fiat.currency_code }" @click="saveFiat(index)">
						<text class="pl-18 pr-14 font-size-32" style="color: #000;">{{item.currency_code}}</text>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {langs} from "./data.js"
  import myNavbar from "../../uview-ui/components/u-navbar/my-navbar.vue";
  import UImage from "../../uview-ui/components/u-image/u-image.vue";
	export default {
		data() {
			return {

        retImageUrl:require('static/bib/user.png'),
				user:{},
				langs:null,
				lang:null,
				fiats:null,
				//显示修改默认法币
				showDefaultCurrency:false,
				//显示修改默认语言
				showLanguage:false,
			}
		},
    components: {
      UImage,
      myNavbar
    },
		onShow() {
			this.setDefaultLang()
			this.getUserInfo();

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
    methods: {
		bindEmail() {
			if(this.user.email) {
				this.$utils.showToast(this.$t("bound"))
				return
			}
			uni.navigateTo({
				url: '/pages/bindEmail/bindEmail'
			})
		},
      copy() {

        let val= this.user.id;
		uni.setClipboardData({
			data: this.user.id + '',
			showToast: false
		})

      },
      async uploadAvatar(){
        const ret = await this.$utils.uploadImage();

        this.retImageUrl=ret;

        let data={head_portrait:ret};
        this.$https.initDataToken({
          url: 'user/uploadHeadPortrait',
          type: 'POST',
          data
        }, (res, msg) => {
          console.log("上传头像返回==>"+JSON.stringify(res));

          let user = this.$u.deepClone(this.$store.state.user)
          user.head_portrait = ret
          this.$store.commit('refreshUser',user)
          this.$utils.showToast(this.$t("common.success"))
        })
      },
      backFn(){
        uni.navigateTo({
          url: '/pages/setting/left_menu'
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
        {
          this.showLanguage = false;
          uni.reLaunch({
            url: "/pages/index/index"
          })
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
          url: 'user/logout?lang='+lang,
          type: 'GET',
        }, (res, msg) => {

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
							url:'/pages/setting/left_menu'
						})
					},1200)
				})
			}
		},
		computed:{
			i18n(){
				return this.$t("setting");
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
.fanli{
	@extend .linear-gradient-button;
	border-radius: 60rpx 20rpx 60rpx 20rpx;
	// background-image:linear-gradient(60deg,#ff174d,#724685);
	padding: 36rpx;
	padding-bottom: 0;
	overflow: hidden;
	.haoyou{
		font-size: 22rpx;
		padding: 8rpx 30rpx;
		color: #fff;
		background-image:linear-gradient(to right,#ff174d,#724685);
		border-radius: 20rpx;
	}
	.data{
		margin:0 -36rpx;
		margin-top: 36rpx;
		background-color:rgba(255,255,255,.1) ;
		padding: 32rpx 36rpx 26rpx 36rpx;
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
			height: 1rpx;
			background-color: #2f2f2f;
		}
		&.active{
			background-color: #242424;
			&:after{
				content: "";
				width: 40rpx;
				height: 40rpx;
				background-image: url('../../static/uzx/icon_coin_select_yes.png');
				background-size: cover;
				position: absolute;
				right: 80rpx;
				top: 50%;
				margin-top:-20rpx;
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
  border-radius: 32px;
  margin-left: 30px;
  margin-right: 30px;
}
.avatar{
  height: 68rpx;
  width: 68rpx;
  border-radius: 50%;
}
</style>
