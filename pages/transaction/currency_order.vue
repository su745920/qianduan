<template>
  <view>
	<l-common-navbar :title="i18n.entrust" :isCustomBack="true" @back="$utils.jump('/pages/transaction/currency')" />
    <view class="p-30">
      <u-subsection :list="nav" :current="type" v-if="showNav" bg-color="#000000"
                    @change="changeNav"></u-subsection>
      <view class="mt-30">
        <view class="p-20 box-shadow border-radius-20 mb-20 bg-black text-white" v-for="item in list">
          <view class="d-flex-between-center py-10 ">
            <text class="opacity-50" style="color: #ffffff;">{{ i18n.tradingPair }}</text>
            <text class="font-weight-bold" style="color: #ffffff;">
              {{ item.currency_name }}/{{ item.legal_name }}
            </text>
          </view>
          <view class="d-flex-between-center py-10">
            <text class="opacity-50" style="color: #ffffff;">{{ i18n.direction }}</text>
            <text class="font-weight-bold" :class="item.way === 2 ? 'text-error' : 'text-success'">
              <!-- {{ item.way === 0 ? '' : item.type === 'out' ? i18n.sell : i18n.buy }} -->
			  {{item.way === 0 ? '' : item.way === 2 ? i18n.sell : i18n.buy}}
            </text>
          </view>
          <view class="d-flex-between-center py-10">
            <text class="opacity-50" style="color: #ffffff;">{{ i18n.price }}</text>
            <text class="font-weight-bold  opacity-90" style="color: #ffffff;">{{ Number(item.price).toFixed(4) }}</text>
          </view>
          <view class="d-flex-between-center py-10">
            <text class="opacity-50" style="color: #ffffff;">{{ i18n.number }}</text>
            <text class="font-weight-bold  opacity-90" style="color: #ffffff;">{{ Number(item.number) }}</text>
          </view>
          <view class="d-flex-between-center py-10">
            <text class="opacity-50" style="color: #ffffff;">{{ i18n.entrustTime }}</text>
            <text class="font-weight-bold  opacity-90" style="color: #ffffff;">{{ item.time }}</text>
          </view>
          <view class="d-flex-between-center py-10">
            <text class="opacity-50" style="color: #ffffff;">{{ i18n.status }}</text>
            <text class="tag-primary font-size-20" v-if="item.status == 1">{{ i18n.doing }}</text>
            <text class="tag-success font-size-20" v-else>{{ i18n.complete }}</text>
          </view>
        </view>
      </view>
      <default-page v-if="!list.length"></default-page>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      canGet: true,
      originalList: [],
      list: [],
      limit: 10,
      type: 0, // 0全部，1买入，2卖出,
      showNav: true,
      from: 1, //1需要navigateback，0，需要redirect
	  isLoadEnd: false
    };
  },
  onLoad(options) {
    this.from = options.from || 0
  },
  onShow() {
    this.page = 1
    this.canGet = true
    this.originalList = []
    this.list = []

    this.showNav = false
    setTimeout(() => {
      this.showNav = true
    }, 100)
	this.getAllCoinTradeList()
    
  },
  methods: {
    getAllCoinTradeList() {
      const {page, limit} = this
      //getAllCoinTradeList: (object) => vm.$u.post("/transaction_complete",object),
      //this.$u.api.market.getAllCoinTradeList({page,limit}).then(res=>{
      let data = {page: page, limit: limit};
      this.$https.initDataToken({
        url: 'transaction_complete',
        type: 'POST',
        data
      }, (res, msg) => {
        const list = res.list;
        if (list.length) {
          for (const listElement of list) {
            listElement.tab = 1;
          }
          if(page === 1) {
          		this.originalList = list;
          }else {
          		this.originalList = this.originalList.concat(list);
          }
          this.isLoadEnd = list.length < limit ? true : false
          this.filterList()
          //this.page++
        } else {
          this.canGet = false
        }

      })
    },

    getCoinTradeList() {
      const {page, limit} = this

            let data = {page: page, limit: limit};
            this.$https.initDataToken({
              url: 'all_transaction_in',
              type: 'POST',
              data
            }, (res, msg) => {
        const list = res.list;
        if (list.length) {
          for (const listElement of list) {
            listElement.tab = 1;
          }
		  if(page === 1) {
			  this.originalList = list;
		  }else {
			  this.originalList = this.originalList.concat(list);
		  }
		  this.isLoadEnd = list.length < limit ? true : false
          
          this.filterList()
          //this.page++
        } else {
          this.canGet = false
        }

      })
    },
    getAllTransactionOutList() {
      const {page, limit} = this
      //getAllTransactionOutList: (object) => vm.$u.post("/all_transaction_out",object),
      //this.$u.api.market.getAllTransactionOutList({page, limit}).then(res => {
      let data = {page: page, limit: limit};
      this.$https.initDataToken({
        url: 'all_transaction_out',
        type: 'POST',
        data
      }, (res, msg) => {
        const list = res.list;
        if (list.length) {
          for (const listElement of list) {
            listElement.tab = 2;
          }
         if(page === 1) {
         	this.originalList = list;
         }else {
         	this.originalList = this.originalList.concat(list);
         }
         this.isLoadEnd = list.length < limit ? true : false
          this.filterList()
          //this.page++
        } else {
          this.canGet = false
        }

      })
    },


    filterList() {
      const {type} = this
      if (type === 0) {
        this.list = this.originalList
      } else {
        this.list = this.originalList.filter(item => {
			if(type === 1) return item.way === 1
			if(type === 2) return item.way === 2
		})
      }
    },
    changeNav(val) {
      this.type = val
      this.filterList()
    },
    backTo() {
      uni.switchTab({
          url: '/pages/transaction/currency'
        })
    }


  },
  onReachBottom() {
	if(this.isLoadEnd) return
	this.page ++
    this.getAllCoinTradeList()
  },
  computed: {
    i18n() {
      return this.$t("transaction")
    },
    nav() {
      const i18n = this.$t("transaction")
      return [{
        name: i18n.all
      }, {
        name: i18n.buy
      }, {
        name: i18n.sell
      }]
    }
  }

}
</script>

<style lang="scss">
page{
  background: #242424;
}
</style>
