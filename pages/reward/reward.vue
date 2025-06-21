<template>
  <view class="">
	  <l-common-navbar :title="$t('leftmenu.rewards_center')"  />
    <view class="list" style="background: #000000;width: 100%;margin: 0;padding: 0;">

      <view class="p-30 border-bottom text-black" style="width: 100%;">
        <view class="d-flex" style="width: 100%;">
          <view class="d-flex align-items-center" style="display: flex;justify-content: space-between;width: 100%;">
            <text style="color: #939393;width: 140px;">{{ $t('invite.subordinate_account') }}</text>
            <text style="color: #939393;flex: 2;"> {{ $t('invite.invitation_time') }}</text>
            <text style="color: #939393;flex: 1;text-align: right;">{{ $t('invite.commission') }}</text>
          </view>
        </view>
      </view>
      <view class="p-30 border-bottom text-black" style="width: 100%;" v-for="item in czRewardList" >
        <view class="d-flex" style="width: 100%;">
          <view class="d-flex align-items-center" style="display: flex;justify-content: space-between;width: 100%;">
            <text style="color: #ffffff;width: 140px;">{{ item.deposit_username }}</text>
            <text style="color: #ffffff;flex: 2;">{{ item.audit_date }}</text>
            <text style="color: #ffffff;flex: 1;text-align: right;">{{ item.reward_amount }}</text>
          </view>
        </view>
      </view>


      <default-page v-if="!list.length"></default-page>


    </view>
  </view>
</template>

<script>
import Index from "../../components/page-animation/index.vue";

export default {
  components: {Index},
  data() {
    return {
      czRewardList: [],
      userInfo: {},
      load_type: 1,
      currency_id: 0,
      legal_id: 0,
      page: 1,
      canGet: true,
      list: [],
      from: 1, //1需要navigateback，0，需要redirect
      current: 0,
      status: 1
    };
  },
  onLoad(options) {

  },
  onShow() {
    this.canGet = true
    this.page = 1
    this.list = []
    this.getMyTeamPage()
  },
  methods: {
    back() {
      uni.switchTab({
        url: '/pages/index/index'
      })
    },
    getMyTeamPage() {
      this.$https.initDataToken({
        url: 'user/info',
        type: 'GET'
      }, (res, msg) => {
        this.userInfo = res;
      });
      let that = this;
      this.$https.initDataToken({
        url: 'czRewardList',
        type: 'GET'
      }, (res, msg) => {
        that.czRewardList = res;
      });

    },
    backTo() {
      if (this.from == 1) {
        uni.navigateBack({
          delta: 1
        })
      } else {
        uni.switchTab({
          url: '/pages/transaction/index'
        })
      }
    }
  },
  computed: {
    i18n() {
      return this.$t("transaction")
    },
    coverNav() {
      return [{
        text: this.$t("transaction.coverAll")
      }, {
        text: this.$t("transaction.onlyCoverMany")
      }, {
        text: this.$t("transaction.onlyCoverEmpty")
      }]
    },
    nav() {
      return [{
        name: this.$t("transaction.position")
      }, {
        name: this.$t("transaction.cover")
      }]
    }
  },
  onReachBottom() {
    this.getLeverDealByPage()
  }
}
</script>

<style lang="scss">
page{
  background: #000000;
}
.title {
  height: 48px;
  line-height: 46px;
  padding: 0 40px 0 30px;
  padding-left: 20px;
  padding-right: 20px;

  span {
    margin-right: 20px;
    cursor: pointer;
  }

  span:hover {
    color: #FAFAFA;
    //border-bottom: 1px solid #2A64FB;
  }
}

.inblock {
  span.active {
    font-weight: 700;
    color: #ffffff;
    border-bottom: 1px solid #ffffff;
    padding-bottom: 12px;
    border-bottom-width: 2px;
  }
}

.inblock {
  span.inactive {
    color: #939393;
    font-weight: 350;
  }
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
</style>
