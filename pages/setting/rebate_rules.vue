<template>
  <view class="">
    <u-navbar :title="$t('rebate_rules')" showback="true"></u-navbar>
    <view class="mx-30 mt-30 border-radius-20 text-white" style="background: #242424;" >


      <view class="login-input-group" style="padding: 10px;">
        <text class="label" style="color: #ffffff;font-weight: 700;line-height: 30px;">{{$t('inviteFriends.titleA')}}</text>
        </br>
        <text class="label"  style="color: #ffffff;">{{list[0].title}}</text>
        </br>
        <text class="label"  style="color: #ffffff;">{{list[1].title}}</text>
        </br>
        <text class="label"  style="color: #ffffff;">{{list[2].title}}</text>
        </br>
        <text class="label"  style="color: #ffffff;">{{list[3].title}}</text>

        </br>
        </br>
        </br>
        <text class="label" style="color: #ffffff;font-weight: 700;line-height: 30px;">{{$t('inviteFriends.titleB')}}</text>
        </br>
        <text class="label"  style="color: #ffffff;">{{list[4].title}}</text>
        </br>
        <text class="label"  style="color: #ffffff;">{{list[5].title}}</text>
        </br>
        <text class="label"  style="color: #ffffff;">{{list[6].title}}</text>
        </br>





      </view>


    </view>


  </view>
</template>

<script>
export default {
  data() {
    return {
      list:[],

      real_name:'',
      bank_name:'',
      bank_account:'',
      address:'',
      alipay_account:'',
      wechat_nickname:'',
      wechat_account:'',
    };
  },
  onShow() {
    this.rebateRulesList()
  },
  methods: {
    rebateRulesList(){

      this.$https.initDataToken({
        url: 'rebateRulesList',
        type: 'GET',
      }, (message, msg) => {
        this.list=message;

      })
    },
    submit() {
      let {
        i18n,real_name,bank_name,bank_account,address,alipay_account,wechat_account,wechat_nickname
      } = this
      if(!real_name || !bank_name || !bank_account || !address){
        this.$utils.showToast(i18n.allNeed)
      }
      this.$u.api.setting.saveCard({
        real_name,bank_name,bank_account,address,alipay_account,wechat_account,wechat_nickname
      }).then(res=>{
        this.$utils.showToast(res.message);

        setTimeout(() => {
          //this.$utils.jump('/pages/setting/setting');
          uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
            delta: 1
          });

        }, 1000);


      })
    },

  },
  computed: {
    i18n() {
      return this.$t("setting")
    },
  }
}
</script>

<style lang="scss" scoped>
page{
  background: #000000;
}
</style>
