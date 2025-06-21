<template>
  <view class="">

    <view>
      <img src="../../static/toobit/back.png" style="width: 30px;height: 30px;margin-top: 20px;margin-left: 20px;"
           @click="back">

    <LuckyWheel
        style="margin-top: 50px;"
        ref="myLucky"
        width="600rpx"
        height="600rpx"
        :blocks="blocks"
        :prizes="prizes"
        :buttons="buttons"
        :defaultStyle="defaultStyle"
        @start="startCallBack"
        @end="endCallBack"
    />
    </view>
  </view>
</template>

<script>

export default {
  components: { LuckyWheel },
  data () {
    return {
      blocks: [{ padding: '13px', background: '#617df2' }],
      prizes: [
        { imgs: [{ src: 'https://admin.coinbmex.com/coin/new_icon_btc_64.png',//D:\wwwroot_bak\wwwroot\192.168.1.6\public\coin\new_icon_btc_64.png
            width:'40px',height:'40px', top: '37%' }],
          background: '#e9e8fe',
          fonts: [{ text: '0.1BTC', top: '10%' }]
        },
        { fonts: [{ text: '100TRX', top: '10%' }], background: '#b8c5f2' },
        { fonts: [{ text: '1BTC', top: '10%' }], background: '#e9e8fe' },
        { fonts: [{ text: '1ETH', top: '10%' }], background: '#b8c5f2' },
        { fonts: [{ text: '0BTC', top: '10%' }], background: '#e9e8fe' },
        { fonts: [{ text: '1USDT', top: '10%' }], background: '#b8c5f2' },
      ],
      buttons: [
        { radius: '50px', background: '#617df2' },
        { radius: '45px', background: '#afc8ff' },
        {
          radius: '40px', background: '#869cfa',
          pointer: true,
          fonts: [{ text: '开始\n抽奖', top: '-20px' }]

        },
      ],
    }
  },
  methods: {
    back() {
      //uni.navigateBack()//默认delta:1
      uni.navigateBack({
        delta: 1,//返回层数，2则上上页
      })
    },
    // 点击抽奖按钮触发回调
    startCallBack () {
      // 先开始旋转
      this.$refs.myLucky.play()
      // 使用定时器来模拟请求接口
      setTimeout(() => {
        // 假设后端返回的中奖索引是0
        const index = 1;
        // 调用stop停止旋转并传递中奖索引
        this.$refs.myLucky.stop(index)
      }, 3000)
    },
    // 抽奖结束触发回调
    endCallBack (prize) {
      // 奖品详情
      console.log(prize)
    }
  }
}
</script>
