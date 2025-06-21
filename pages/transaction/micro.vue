<template>
  <view style="background: #000000;">
    <u-navbar :title="$t('home.option')"  showback="true"
              titleColor="#ffffff"
              backIconColor="#ffffff"
              background="#000000">
      <navigator url="pages/index/index" slot="right" style="color: #000000;">

      </navigator>
    </u-navbar>

    <web-view :src="url"></web-view>
  </view>
</template>

<script>


export default {
  data() {
    return {
      url:"https://admin.coinbmex.com/mobile/#/pages/transaction/app_options?token="+uni.getStorageSync("token"),
      statusBarHeight:0,
      pdfUrl: '',
      title: "主坝",
      navbg: {
        backgroundColor: "#000000"
      },
    };
  },
  onLoad(options) {
    //https://www.cnblogs.com/auto123-num/p/17855701.html




  },
  onReady() {
    // #ifdef APP-PLUS
    var currentWebview = this.$scope.$getAppWebview() //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
    setTimeout(function() {
      let wv = currentWebview.children()[0]
      //wv.setStyle({top:78,height:5000})
    }, 1000); //如果是页面初始化调用时，需要延时一下
    // #endif
  }
}
</script>

<style lang="scss">

</style>
