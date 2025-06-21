<template>
	<view class="text-white">
		<l-common-navbar :title="i18n.authentication" :isCustomBack="true" @back="$utils.jump('/pages/setting/left_menu')" />
		<view class="p-30 bg-black" style="color: #ffffff;">
			<text class="d-block font-weight-bold font-size-32">{{i18n.authentication_text_1}}</text>
			<text class="d-block font-size-28 opacity-60 mt-20">{{i18n.authentication_text_2}}</text>
			<!-- <view class="mt-26">
				<text class="d-block font-size-28 opacity-60">{{i18n.authentication_text_3}}</text>
				<text class="d-block font-size-28 opacity-60 pl-48">{{i18n.authentication_text_4}}</text>
				<text class="d-block font-size-28 opacity-60 pl-48">{{i18n.authentication_text_5}}</text>
			</view> -->
			<view class="mt-26">
				<!-- <text class="d-block font-size-28 opacity-60">{{i18n.authentication_text_6}}</text> -->
				<text class="d-block font-size-28 opacity-60 pl-48">{{i18n.authentication_text_7}}</text>
				<text class="d-block font-size-28 opacity-60 pl-48">{{i18n.authentication_text_8}}</text>
			</view>
		</view>
		<view class="p-30" style="color: #ffffff;">
			<text class="d-block font-size-28 opacity-60">{{i18n.authentication_text_9}}</text>
		</view>
		<view class="m-30" style="color: #ffffff;">
			<!-- <text class="d-block font-size-32 opacity-60 mb-20">{{i18n.authentication1}}</text> -->
			<!-- 未认证 -->
			<!-- <button class="warning-button connect_btn" v-if="review_status == 0" @click="$utils.jump('/pages/setting/real?type=1')">{{i18n.goAudit}}</button> -->
			<!-- 待审核 -->
			<!-- <button class="primary-button connect_btn" v-else-if="review_status == 1">{{i18n.auditing}}</button> -->
			<!-- 审核成功 -->
			<!-- <button class="success-button connect_btn" v-else-if="review_status == 2">{{i18n.hasaudit}}</button> -->
			
			
			<button class="warning-button" v-if="advanced_review_status == 0"  style="color: #ffffff;"
			  @click="$utils.jump('/pages/setting/real?type=1')">{{i18n.goAudit}}</button>
			<button class="secondary-button" v-else-if="review_status < 2">{{i18n.goAudit}}</button>
			<!-- 待审核 -->
			<button class="primary-button" v-else-if="advanced_review_status == 1">{{i18n.auditing}}</button>
			<!-- 审核成功 -->
			<button class="success-button" v-else-if="advanced_review_status == 2">{{i18n.hasaudit}}</button>
			
		</view>
		<view class="m-30" style="color: #ffffff;">
			<!-- <text class="d-block font-size-32 opacity-60 mb-20">{{i18n.authentication2}}</text> -->
			<!-- 未认证 -->
			<!-- <button class="secondary-button" v-if="review_status < 2">{{i18n.goAudit}}</button>
			<button class="warning-button" v-else-if="advanced_review_status == 0 "  style="color: #ffffff;"
              @click="$utils.jump('/pages/setting/real?type=2')">{{i18n.goAudit}}</button> -->
			<!-- 待审核 -->
			<!-- <button class="primary-button" v-else-if="advanced_review_status == 1">{{i18n.auditing}}</button> -->
			<!-- 审核成功 -->
			<!-- <button class="success-button" v-else-if="advanced_review_status == 2">{{i18n.hasaudit}}</button> -->
		</view>
		<view class="m-30 remark" v-if="advanced_review_status !== 2 && remark">
			<view class="remark_label">{{$t('fund.remark')}}</view>
			<view class="remark_value">{{remark}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				review_status:0,//基础认证，
				advanced_review_status:0,//高级认证
				remark: ''
			};
		},
		onShow() {
			//检查认证状态
			this.getUserRealState()
		},
		methods:{
			getUserRealState(){
        this.$https.initDataToken({
          url: 'user/real/state',
          type: 'GET'
        }, (res, msg) => {
					const {review_status,advanced_review_status,real_data} = res
					this.review_status = review_status
					this.advanced_review_status = advanced_review_status
					this.remark = real_data.remark
				})
			},
		},
		computed:{
			i18n(){
				return this.$t("setting")
			}
		}
	}
</script>

<style lang="scss">
page{
  background: #000000;
}
.connect_btn{
  color: #000000;
  background: -webkit-gradient(linear, left top, right top, color-stop(10%, #1FA2FF), color-stop(55.21%, #12D8FA), to(#A6FFCB));
  background: -webkit-linear-gradient(left, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
  background: -o-linear-gradient(left, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
  background: linear-gradient(90deg, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
}
.remark {
	&_label {
		font-size: 32rpx;
		color: #999999;
		margin-bottom: 20rpx;
	}
	&_value {
		background-color: #242424;
		padding: 30rpx;
		box-sizing: border-box;
		border-radius: 12rpx;
		color: #f66f6a;
		font-size: 32rpx;
	}
}
</style>
