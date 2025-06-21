<template>
  <view class="page">
	<l-common-navbar :title="title" :isCustomBack="true" @back="$utils.jump('/pages/setting/left_menu')" />
	<view class="list" v-if="list.length > 0">
		<view @click="$utils.jump('/pages/common/article?id=' + item.id + '&backUrl=' + backUrl)" class="list_item" v-for="(item,index) in list" :key="item.id">
			<view class="list_item_left" v-if="item.cover">
				<image class="list_item_left_cover" :src="item.cover" mode="scaleToFill"></image>
			</view>
			<view class="list_item_right">
				<view class="list_item_right_title">{{item.title}}</view>
				<view class="list_item_right_time">{{item.create_time}}</view>
			</view>
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
      canGet: true,
	  c_id: '',
	  title: '',
	  backUrl: ''
    };
  },
  onLoad({c_id,title}) {
	  this.c_id = c_id
	  this.title = title
	  this.backUrl = encodeURIComponent(`/pages/newList/newList?c_id=${c_id}&title=${title}`) 
      this.getListData()
  },
  methods: {
    getListData() {
      if (!this.canGet) return;
      let data={
		  c_id: this.c_id,
		  page: this.page,
		  lang: this.$store.state.lang || 'en'
		};
      this.$https.initData({
        url: 'news/list',
        data,
        type: 'POST'
      }, (res, msg) => {
        const list = res.list
        if (list.length > 0) {
          this.list = this.list.concat(list)
        } else {
          this.canGet = false
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
		display: flex;
		border: 1rpx solid #cccccc;
		border-radius: 12rpx;
		padding: 30rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;
		position: relative;
		box-shadow: 0 0 10rpx 2rpx rgba(255,255,255,.5);
		&_left {
			margin-right: 20rpx;
			&_cover {
				width: 180rpx;
				height: 130rpx;
			}
		}
		&_right {
			flex: 1;
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
		}
	}
}
</style>
