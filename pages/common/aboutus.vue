<template>
	<view>
		<u-navbar title="About Us" showback="true"></u-navbar>
  <view style="background: #000;width: 100%;margin-top: -40px;">
    <div style="background: #000;width: 100%;height: 1000px;margin: auto;">
      <div data-v-d03b5ee4="" class="detail-box" style="margin:auto;color: #f1f1f1;
    width: 100%;height: 1000px;">
        <div data-v-d03b5ee4="" class="detail-text" style="margin-top: 40px;width: 100%;">
          <h1 data-v-d03b5ee4="" class="content-title f-1-cl" style="color: #ffffff;margin-top:0px;width: 100%;">About Us</h1>
          <p data-v-d03b5ee4="" class="time f-2-cl">2023-06-24 21:49:36</p>
          <div data-v-d03b5ee4="" class="ql-container ql-snow" style="height: 1000px;width: 100%;">
            <div data-v-d03b5ee4="" class="ql-editor" style="height: 1000px;width: 100%;">
              <div data-v-d03b5ee4="" class="main-text f-1-cl" style="height: 1000px;width: 100%;margin:auto;">
                <p>Binancbcoins&nbsp;Exchange,&nbsp;established&nbsp;in&nbsp;September&nbsp;2021,&nbsp;is&nbsp;a&nbsp;subsidiary&nbsp;of&nbsp;Cayman&nbsp;Islands-based&nbsp;InDex&nbsp;Trending&nbsp;Inc.&nbsp;and&nbsp;is&nbsp;registered&nbsp;in&nbsp;the&nbsp;British&nbsp;Virgin&nbsp;Islands.&nbsp;It&nbsp;is&nbsp;a&nbsp;premium&nbsp;trading&nbsp;platform&nbsp;dedicated&nbsp;to&nbsp;global&nbsp;cryptocurrency&nbsp;investors.&nbsp;Upholding&nbsp;the&nbsp;principles&nbsp;of&nbsp;Boundless,&nbsp;Innovative,&nbsp;and&nbsp;Boosting,&nbsp;BICN&nbsp;Exchange&nbsp;is&nbsp;committed&nbsp;to&nbsp;providing&nbsp;users&nbsp;with&nbsp;secure,&nbsp;convenient,&nbsp;and&nbsp;efficient&nbsp;cryptocurrency&nbsp;trading&nbsp;services.</p>
                <p>Binancbcoins&nbsp;Exchange&nbsp;has&nbsp;successfully&nbsp;obtained&nbsp;dual&nbsp;MSB&nbsp;licenses&nbsp;in&nbsp;the&nbsp;United&nbsp;States&nbsp;and&nbsp;Canada,&nbsp;and&nbsp;its&nbsp;BICN&nbsp;token&nbsp;has&nbsp;been&nbsp;listed&nbsp;on&nbsp;Coinmarketcap&nbsp;and&nbsp;Coingecko&nbsp;platforms.&nbsp;To&nbsp;ensure&nbsp;user&nbsp;asset&nbsp;security,&nbsp;BICN&nbsp;Exchange&nbsp;has&nbsp;passed&nbsp;the&nbsp;stringent&nbsp;audit&nbsp;by&nbsp;Armors&nbsp;Labs,&nbsp;a&nbsp;top-tier&nbsp;blockchain&nbsp;industry&nbsp;audit&nbsp;firm.</p>
                <p>&nbsp;The&nbsp;core&nbsp;team&nbsp;members&nbsp;of&nbsp;Binancbcoins&nbsp;Exchange&nbsp;are&nbsp;blockchain&nbsp;industry&nbsp;experts&nbsp;from&nbsp;all&nbsp;over&nbsp;the&nbsp;world,&nbsp;boasting&nbsp;extensive&nbsp;experience&nbsp;in&nbsp;blockchain&nbsp;technology&nbsp;and&nbsp;financial&nbsp;industry&nbsp;research&nbsp;and&nbsp;services.&nbsp;BICN&nbsp;Exchange&nbsp;offers&nbsp;a&nbsp;wide&nbsp;range&nbsp;of&nbsp;products,&nbsp;including&nbsp;spot&nbsp;trading,&nbsp;futures&nbsp;contracts,&nbsp;entertainment,&nbsp;and&nbsp;asset&nbsp;management,&nbsp;catering&nbsp;to&nbsp;the&nbsp;needs&nbsp;of&nbsp;different&nbsp;investors.</p>
                <p>As&nbsp;a&nbsp;professional&nbsp;cryptocurrency&nbsp;trading&nbsp;platform,&nbsp;Binancbcoins&nbsp;Exchange&nbsp;is&nbsp;committed&nbsp;to&nbsp;becoming&nbsp;the&nbsp;preferred&nbsp;trading&nbsp;platform&nbsp;for&nbsp;global&nbsp;cryptocurrency&nbsp;investors,&nbsp;with&nbsp;safety,&nbsp;innovation,&nbsp;and&nbsp;efficiency&nbsp;at&nbsp;its&nbsp;core.</p>
                <p>click&nbsp;query：<a href="https://www.fincen.gov/msb-state-selector" target="_blank">US&nbsp;MSB&nbsp;license</a>（Enter&nbsp;"ADWISE&nbsp;TRADING&nbsp;INC."&nbsp;in&nbsp;the&nbsp;LEGAL&nbsp;NAME&nbsp;to&nbsp;query）
                </p>
                <p style="text-align: center;"><img
                    src="https://bibvip-prod.s3.ap-northeast-1.amazonaws.com/upload/1681889344435.png" alt="" data-href=""
                    style="width: 100%;"></p>
                <p>click&nbsp;query：<a
                    href="https://www10.fintrac-canafe.gc.ca/msb-esm/public/detailed-information/msb-details/7b226d73624f72674e756d626572223a3136393533362c227072696d617279536561726368223a7b226f72674e616d65223a224164776973652054726164696e6720496e632e222c2273656172636854797065223a337d7d/"
                    target="_blank">Canadian&nbsp;MSB&nbsp;license</a></p>
                <p style="text-align: center;"><img
                    src="https://bibvip-prod.s3.ap-northeast-1.amazonaws.com/upload/1681889246567.png" alt="1"
                    data-href="https://bibvip-prod.s3.ap-northeast-1.amazonaws.com/upload/1681889246567.png"
                    style="width: 100%;"></p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article:{}
			};
		},
		onLoad(options) {
			const {id} = options
			this.id = id
		},
		onShow() {
			this.getNewsDetail()
		},
		methods:{
			getNewsDetail(){
				this.$u.api.index.getAboutUs().then(res=>{
					this.article = res.message
				})
			}
		}
	}
</script>

<style scoped>
[data-v-d03b5ee4] .main-text p {
  word-wrap: break-word;
}
[data-v-d03b5ee4] .main-text * {
  margin: revert;
  padding: revert;
}
b, button, em, h1, h2, h3, h4, h5, h6, input, p, select, strong, textarea {
  font-weight: 400;
}
body, button, dd, dl, dt, form, h1, h2, h3, h4, h5, h6, html, img, input, li, ol, p, select, table, tbody, td, textarea, th, tr, ul {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  word-wrap: break-word;
  word-break: break-word;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.notice-info .detail-text .main-text[data-v-d03b5ee4] {
  margin-top: 30px;
  line-height: 24px;
  font-size: 14px;
}

.f-1-cl[data-v-d03b5ee4] {
  color: #edf4f8;
}
.f-1-cl {
  color: #edf4f8;
}
.f-1-cl {
  color: #edf4f8;
}
</style>
