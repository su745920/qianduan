<template>

  <view class="tabbar-container">
    <block>

      <view class="tabbar-item" v-for="(item, index) in tabbarList" :key="index"
            :class="[item.centerItem ? ' center-item' : '']" @click="changeItem(item)">
        <view class="item-top">
          <image :src="currentItem == item.id ? item.selectIcon : item.icon"></image>
        </view>



        <view class="item-bottom" :class="[currentItem == item.id ? 'item-active' : '']">
          <text style="font-size: 13px;">{{ item.text }}</text>
        </view>
      </view>


    </block>

    <!-- 所有行情列表 -->
    <u-popup v-model="showMenu" mode="bottom" length="620" contentBackgroundColor="#242424"
             style="margin: 5px;"
             :mask-custom-style="{background: '#24242'}" :border-radius="20">

      <view class="px-30 market"  style="background: #242424;margin-top:10px;">

        <scroll-view scroll-y="true" style="height: 620rpx;">
          <view class="market-item" v-for="(item,index) in menuList" :key="index"
                @click="jump(item)">
            <view class="left">

              <view class="d-block" style="display: flex;margin-top: 15px;">
                <view class="font-size-28 font-weight-bold" style="color: #ffffff;width: 60px;">
                   <image :src="item.icon" style="width: 30px;height: 30px;"></image>
                </view>
                <text class="font-size-28" style="color: #ffffff;margin-left:0px;line-height: 30px;height: 30px;">{{ item.text }}</text>

              </view>

            </view>


          </view>
        </scroll-view>

      </view>
    </u-popup>

  </view>

</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      menuList:[
        {
          icon: "/static/bib/icon_my_home_spot.png",
          path: "/pages/transaction/currency",
          text:this.$t("home4")
        },
        {
          icon: "/static/icon_type_b_20.png",
          path: "/pages/transaction/contract",
          text:this.$t("nav")[3]
        },
        {
          icon: "/static/bib/icon_my_home_s.png",
          path: "/pages/transaction/options",
          text:this.$t("home.option")
        },
        // {
        //   icon: "/static/bib/icon_my_home_s.png",
        //   path: "/pages/transaction/options",
        //   text:this.$t("home.qiquan"),
        // },
        {
          icon: "/static/icon_type_f.png",
          path: "/pages/tx/flashexchange",
          text:this.$t("flash_exchange"),
        },


      ],
      showMenu:false,
      currentItem: 0,
      tabbarList: [
        {
          id: 0,
          path: "/pages/index/index",
          icon: "/static/okx/home_one_no_color.png",
          selectIcon: "/static/okx/home_one_color.png",
          text:this.$t("nav")[0],
          centerItem: false
        },
        {
          id: 1,
          path: "/pages/market/market",
          icon: "/static/okx/home_two_no_color.png",
          selectIcon: "/static/okx/home_two_color.png",
          text:this.$t("nav")[1],
          centerItem: false
        },

        {
          id: 2,
          path: "/pages/transaction/currency",
          icon: "",
          selectIcon: '',
          text:this.$t("nav")[2],
          centerItem: true
        },
        {
          id: 3,
          path: "/pages/financial/index",
          icon: "/static/okx/home_four_no_color.png",
          selectIcon: "/static/okx/home_four_color.png",
          text:this.$t("nav")[4],
          centerItem: false
        },
        {
          id: 4,
          path: "/pages/fund/assets",
          icon: "/static/okx/home_five_no_color.png",
          selectIcon: "/static/okx/home_five_color.png",
          text:this.$t("nav")[5],
          centerItem: false
        }
      ]

    };
  },
  mounted() {
    this.currentItem = this.currentPage;
    uni.hideTabBar();
  },
  methods: {
    jump(item){
      this.showMenu = false;
      uni.navigateTo({
        url: item.path
      })
    },
    changeItem(item) {
      console.log("当前==this.currentItem=>"+this.currentItem);
      if (this.currentItem===2){
           this.showMenu=true;
      }

      if (item.id === 2) {
        let _this = this;
        //_this.currentItem = item.id;
        uni.navigateTo({
          url: item.path
        });
      } else {

        let _this = this;
        //_this.currentItem = item.id;
        this.showMenu=false;
        uni.switchTab({
          url: item.path
        });
        console.log(item.path)
      }
    }
  }
}
</script>
<style>
view {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.tabbar-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100rpx;
  /* box-shadow: 0 0 5px #999;  */
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.16);
  border-top: 1px;
  display: flex;
  align-items: center;
  /* padding: 5rpx 0; */
  color: #999999;
  z-index: 200;
  background-color: #121212;
  /* padding-bottom: 20rpx; */
}

.tabbar-container .tabbar-item {
  padding-top: 16rpx;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  text-align: center;
}

.tabbar-container .item-active {
  color: #ffffff;
}

.tabbar-container .center-item {
  display: block;
  position: relative;
}

.tabbar-container .tabbar-item .item-top {
  width: 36rpx;
  height: 36rpx;
  /* padding: 10rpx; */
}

.tabbar-container .center-item .item-top {
  flex-shrink: 0;
  width: 80rpx;
  height:80rpx;
  position: absolute;
  top: -20rpx;
  left: calc(50% - 40rpx);
  border-radius: 50%;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.16);
  /* box-shadow: 0 0 5px #999;  */

  background: url("../../../static/okx/home_three_color.png") no-repeat;
  background-size: contain;
}

.tabbar-container .center-item .item-top_selected {
  flex-shrink: 0;
  width: 80rpx;
  height:80rpx;
  position: absolute;
  top: -20rpx;
  left: calc(50% - 40rpx);
  border-radius: 50%;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.16);
  /* box-shadow: 0 0 5px #999;  */

  background: url("../../../static/image/black/home_three_color.png") no-repeat;
  background-size: contain;
}





.tabbar-container .tabbar-item .item-top image {
  width: 36rpx;
  height: 36rpx;
}

tabbar-container .tabbar-item:nth-child(3) .item-top image {
  background: #121212;
}

.tabbar-container .tabbar-item .item-bottom {
  margin-top: 8rpx;
  font-size: 13px;
  width: 100%;
}

.tabbar-container .center-item .item-bottom {
  position: absolute;
  bottom: 5rpx;
}
</style>
