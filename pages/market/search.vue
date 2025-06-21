<template>
  <view class="text-white" style="background: #000000;">
    <view class="status_bar"  style="background: #000000;"></view>
    <view class="d-flex px-30 pt-30 align-items-center"  style="background: #000000;">

      <u-search :placeholder="i18n.searchPlaceholder" v-model="keyword" border-color="#242424;"
                :show-action="false" @change="search"></u-search>
      <navigator open-type="navigateBack" :delta="1" style="color: #ffffff;width: 50px;height: 100%;">
        <view style="margin: 5px;color: #ffffff;text-align: center">取消</view>
      </navigator>

    </view>
    <view class="m-30"  style="background: #000000;">
      <view style="color: #000000;font-weight: 600;">热门搜索</view>


      <view v-for="item in quotation"  style="display: flex;justify-content: space-between;border-bottom: none;height: 60px;background: #000000;">
        <view style="width:30px;padding-top: 10px;">
          <image src="/static/bib/no_favorite.png" @click="favFn(item.currency_id)"
                 style="width: 20px;height: 20px;"></image>
        </view>
        <navigator open-type="reLaunch"
                   style="flex: 1;display: flex;justify-content: space-between;border-bottom: none;background: #000000;"
                   :url="`/pages/transaction/index?from=market&currency_name=${item.currency_name}&legal_name=${item.legal_name}&currency_id=${item.currency_id}`">
          <view style="display: flex;padding-top: 10px;">
            <text class="font-size-30" style="color: #000;line-height: 20px;height: 20px;font-weight: 600;margin-left:0px;">{{item.currency_name}}</text>
            <text class="font-size-30 opacity-50" style="color: #666;line-height: 20px;height: 20px;">/USDT</text>

            <image src="/static/bib/hot.png" style="width:14px;height:14px;margin-top: 3px;" v-if="item.currency_name == 'BTC'||item.currency_name == 'ETH'  "></image>
            <image src="/static/bib/hot.png" style="width:14px;height:14px;margin-top: 3px;"  v-if="item.currency_name == 'BTC'||item.currency_name == 'ETH'"></image>
            <image src="/static/bib/hot.png" style="width:14px;height:14px;margin-top: 3px;"  v-if="item.currency_name == 'BTC' "></image>
          </view>

          <view>
            <view style="color: #000;font-weight: 600;"  :style="{color:$utils.getColor(item.change)}">
              {{item.close}}
            </view>
            <view :style="{color:$utils.getColor(item.change)}" style="text-align: right;">
              {{item.rose}}
            </view>
          </view>
        </navigator>

      </view>






    </view>
  </view>
</template>

<script>
import UImage from "../../uview-ui/components/u-image/u-image.vue";
export default {
  components: {UImage},
  data() {
    return {
      keyword:'',
      quotation:[],
      origin:[]
    };
  },
  onLoad() {
    let quotation = uni.getStorageSync('quotation') || []
    this.origin = quotation
    this.quotation = quotation

    this.okxWS();
  },
  methods:{
    favFn(idVal){
      let that= this;
      that.$u.throttle(()=>{
        that.$u.api.market.addOptional(idVal).then(res => {
          that.optionalId = res.message.id
          that.$utils.showToast(that.i18n.addOptionalSuccess)
        })
      },1200)
    },
    okxWS(){
      let url="wss://ws.okx.com:8443/ws/v5/public";
      let ws = new WebSocket(url);
      ws.onopen = function (evt) {

        let param= {
          "op":"subscribe",
          "args":[
            {
              "channel":"tickers",
              "instId":"BTC-USDT",
              "instType":"SPOT"
            },
            {
              "channel":"tickers",
              "instId":"ETH-USDT",
              "instType":"SPOT"
            },
            {
              "channel":"tickers",
              "instId":"XRP-USDT",
              "instType":"SPOT"
            },
            {
              "channel":"tickers",
              "instId":"BCH-USDT",
              "instType":"SPOT"
            },
            {
              "channel":"tickers",
              "instId":"BSV-USDT",
              "instType":"SPOT"
            },
            {
              "channel":"tickers",
              "instId":"LTC-USDT",
              "instType":"SPOT"
            },
            {
              "channel":"tickers",
              "instId":"DOGE-USDT",
              "instType":"SPOT"
            },
            {
              "channel":"tickers",
              "instId":"EOS-USDT",
              "instType":"SPOT"
            },
            {
              "channel":"tickers",
              "instId":"FIL-USDT",
              "instType":"SPOT"
            },
            {
              "channel":"tickers",
              "instId":"DOT-USDT",
              "instType":"SPOT"
            },
            {
              "channel":"tickers",
              "instId":"SHIB-USDT",
              "instType":"SPOT"
            },
            {
              "channel":"tickers",
              "instId":"SOL-USDT",
              "instType":"SPOT"
            },
            {
              "channel":"tickers",
              "instId":"TRX-USDT",
              "instType":"SPOT"
            },
            {
              "channel":"tickers",
              "instId":"LINK-USDT",
              "instType":"SPOT"
            }
          ]
        };
        ws.send(JSON.stringify(param));
      };
      let that=this;

      ws.onmessage = function (evt) {
        let blob = evt.data;

        if(blob.indexOf("event")==-1){
          blob=JSON.parse(blob);
          let data=blob.data;

          //欧意返回实际=[{"instType":"SPOT","instId":"LTC-USDT","last":"97.62","lastSz":"0.901116","askPx":"97.62","askSz":"11.733404","bidPx":"97.6","bidSz":"34.130769","open24h":"103.18","high24h":"105.95","low24h":"96.05","sodUtc0":"102.55","sodUtc8":"100.08","volCcy24h":"90154097.75835732","vol24h":"887091.656632","ts":"1688653544503"}]

          let resultVO = data[0];
          let instId = resultVO.instId;
          let close = resultVO.last;
          let high = resultVO.high24h;
          let low = resultVO.low24h;
          let vol = resultVO.vol24h;

          let open=resultVO.open24h;
          let chg = (close - open) / open;
          chg=parseFloat (chg);

          //
          if (that.quotation != null && that.quotation.length > 0) {
            for (let i = 0; i < that.quotation.length; i++) {
              let jo = that.quotation[i];
              let symbol = jo.currency_name;


              symbol=symbol.toLowerCase()+"usdt";
              let instIdStr=instId
              instIdStr=instIdStr.replace("-","");
              instIdStr=instIdStr.toLowerCase();


              if (symbol === instIdStr) {
                jo.price = close;


                jo.close = close;
                jo.high = high;
                jo.low = low;
                jo.volume = vol;
                jo.usdRate=close;


                let chg100=chg*100;
                chg100=parseFloat(chg100);
                jo.change=chg100;

                if(chg100<0){
                  let chg100B=-chg100;
                  jo.rose =  -chg100B.toFixed(2) + "%";
                }else{
                  jo.rose =  chg100.toFixed(2) + "%";
                }


              }


            }
          }



          //

        }

      }
      ws.onclose = function (evt) {

        ws.open();
      };

    },




    search(e){
      this.quotation = this.origin.filter(item => {
        if(item.currency_name.indexOf(e) > -1) return item
      })
    }
  },
  computed:{
    i18n(){
      return this.$t("transaction")
    }
  }
}
</script>

<style lang="scss" scoped>
page{
  background: #000000;
}
.hot-search{
  .item{
    display: block;
    font-size: 32rpx;
    padding: 4rpx 20rpx;
    color: rgba(0,0,0,.5);
    border-radius: 6rpx;
    background-color: #f2f2f2;
    margin: 20rpx 20rpx 0 0;
  }
}
</style>
