<template>
  <view class="pb-50">
    <u-navbar :title="$t('noticeList')" showback="true"></u-navbar>
    <view class="m-30">
      <view class="mt-30">
        <block v-if="list.length">


          <view v-for="item in list">
            <view class="py-10"  style="display: flex;justify-content: center;">
              <text class="opacity-50" style="color: #000;text-align: center;">{{ item.create_date }}</text>
            </view>
            <view class="p-30 box-shadow border-radius-20 mb-30 bg-black text-white" style="margin-top: 4px;">

              <view class="py-10">
                <text class="font-weight-bold" style="color: #000;">{{ item.title }}</text>
              </view>
              <view class="py-10 font-size-30" style="color: #000;" v-html=" item.content ">

              </view>
            </view>
          </view>







        </block>
        <!--
        <default-page v-else></default-page>
        -->
      </view>
    </view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      currency: 0,
      type_id: 0,
      type_name: '',
      balance: {},
      page: 1,
      list: [],
      canGet: true,
      assetsType: {}
    };
  },
  onShow() {
    // 获取特定币种特定方式的帐变记录
    this.getLegalLog()
  },
  methods: {

    getLegalLog() {
      if (!this.canGet) return;
      this.list=[];
      const {currency, type_id: type, page} = this;

      let data={c_id:4};
      this.$https.initData({
        url: 'news/list',
        data,
        type: 'POST'
      }, (res, msg) => {
        const list = res.list
        if (list.length) {
          this.list = list;
          this.page++
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
    this.getLegalLog()
  }
}
</script>

<style lang="scss">

</style>
