<template>
  <view class="page">
	  <l-common-navbar :title="$t('home_mail')" :isCustomBack="true" @back="$utils.jump('/pages/setting/left_menu')" />
	   <view class="list" v-if="list.length > 0">
		<view @click="$utils.jump('/pages/common/msgDetail?id=' + item.id)" class="list_item" v-for="(item,index) in list" :key="item.id">
			<view class="list_item_title">{{item.title}}</view>
			<view class="list_item_time">{{item.created_at}}</view>
			<view class="list_item_dot" v-if="item.is_read == 0"></view>
		</view>
	   </view>
	   <default-page v-else></default-page>
  </view>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      list: [],
      canGet: true
    };
  },
  onShow() {
  	this.getListData()
  },
  methods: {
    getListData() {
      let data={
		  page: this.page,
		  lang: this.$store.state.lang || 'en'
		};
      this.$https.initDataToken({
        url: 'user/mailList',
        data,
        type: 'GET'
      }, (res, msg) => {
        const list = res.list
		if(list.length < res.limit) {
			this.canGet = false
		}
		if(this.page === 1) {
			this.list = list
		}else {
			this.list = this.list.concat(list)
		}
      })
    }
  },
  computed: {
    i18n() {
      return this.$t("fund")
    }
  },
  onReachBottom() {
	if(!this.canGet) return
	this.page ++
    this.getListData()
  }
}
</script>

<style lang="scss" scoped>
.page {
	padding: 30rpx;
	box-sizing: border-box;
}
.list {
	&_item {
		border: 1rpx solid #cccccc;
		border-radius: 12rpx;
		padding: 30rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;
		position: relative;
		box-shadow: 0 0 10rpx 2rpx rgba(255,255,255,.5);
		&_title {
			font-size: 28rpx;
			color: #ffffff;
			font-weight: 700;
			line-height: 56rpx;
		}
		&_time {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}
		&_dot {
			position: absolute;
			top: 15rpx;
			right: 15rpx;
			width: 15rpx;
			height: 15rpx;
			background-color: #66ffff;
			border-radius: 50%;
		}
	}
}
</style>
