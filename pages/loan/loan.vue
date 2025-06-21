<template>
	<view>
		<l-common-navbar :title="$t('leftmenu.loan')" :isCustomBack="true" @back="$utils.jump('/pages/setting/left_menu')">
			<navigator slot="right" url="/pages/loanRecords/loanRecords">
				<image src="/static/icon_to_all.png" style="width: 52rpx; height: 52rpx;"></image>
			</navigator>
		</l-common-navbar>
		<view class="desc d-flex align-items-center">
			<u-icon name="info-circle" color="#ffffff" size="28"></u-icon>
			<text class="desc_label">{{$t('loan.a1')}}</text>
		</view>
		<view class="page">
			<view class="card">
				<view class="card_item d-flex align-items-center justify-content-between">
					<view class="card_item_label">{{$t('loan.a2')}}(USDT)</view>
					<input @input="onInput" class="card_item_value" type="digit" v-model="formData.loan_money" :placeholder="$t('loan.a3')" placeholder-style="font-size: 32rpx;color: #999999;" />
				</view>
				<view class="card_item d-flex align-items-center justify-content-between">
					<view class="card_item_label">{{$t('loan.a4')}}</view>
					<picker mode="selector" :range="daysList" range-key="loan_days_str" @change="daysChange">
						<view class="d-flex align-items-center">
							<view class="card_item_value" :class="currentDaysIndex > -1 ? '' : 'card_item_place'">{{currentDaysIndex > -1 ? formData.loan_days + $t('loan.a5') : $t('loan.a6')}}</view>
							<u-icon name="arrow-right" color="#999999" size="28"></u-icon>
						</view>
					</picker>
				</view>
			</view>
			<view class="card">
				<view class="card_item card_item-border d-flex align-items-center justify-content-between">
					<view class="card_item_label">{{$t('loan.a7')}}</view>
					<view class="card_item_value">{{formData.loan_rate}}%</view>
				</view>
				<view class="card_item card_item-border d-flex align-items-center justify-content-between">
					<view class="card_item_label">{{$t('loan.a8')}}</view>
					<view class="card_item_value">{{$t('loan.a9')}}</view>
				</view>
				<view class="card_item card_item-border d-flex align-items-center justify-content-between">
					<view class="card_item_label">{{$t('loan.a10')}}</view>
					<view class="card_item_value">{{formData.interest}} USDT</view>
				</view>
				<view class="card_item card_item-border d-flex align-items-center justify-content-between">
					<view class="card_item_label">{{$t('loan.b1')}}</view>
					<view class="card_item_value">{{loan_fee}}%</view>
				</view>
				<view class="card_item card_item-border d-flex align-items-center justify-content-between">
					<view class="card_item_label">{{$t('loan.b1')}}</view>
					<view class="card_item_value">{{formData.commission}} USDT</view>
				</view>
				<view class="card_item d-flex align-items-center justify-content-between">
					<view class="card_item_label">{{$t('loan.b3')}}</view>
					<view class="card_item_value">{{formData.loan_institution}}</view>
				</view>
			</view>
			<view class="card">
				<view class="card_item">
					<view class="card_item_label">{{$t('loan.b4')}}</view>
				</view>
				<view class="images">
					<view class="images_item">
						<l-upload :title="$t('loan.b5')" :src="formData.house_prove" @change="imageChange($event,1)"></l-upload>
					</view>
					<view class="images_item">
						<l-upload :title="$t('loan.b6')" :src="formData.income_prove" @change="imageChange($event,2)"></l-upload>
					</view>
					<view class="images_item">
						<l-upload :title="$t('loan.b7')" :src="formData.bank_records" @change="imageChange($event,3)"></l-upload>
					</view>
					<view class="images_item">
						<l-upload :title="$t('loan.b8')" :src="formData.photo" @change="imageChange($event,4)"></l-upload>
					</view>
				</view>
			</view>
			<view class="xiyi">
				<label @click="isChecked = !isChecked" class="d-flex align-items-center">
					<checkbox :checked="isChecked" style="transform: scale(.7);" /><view >{{$t('loan.b9')}} <text class="xiyi_desc" @click.stop="goXy">《{{$t('loan.b10')}}》</text> </view>
				</label>
			</view>
			<button class="warning-button mt-70 submit-btn" 
				@click="submit">{{$t("common.confirm")}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isChecked: false,
				formData: {
					loan_money: null,
					loan_days: 0, // 贷款天数
					loan_rate: 0, // 日利率
					interest: 0, // 贷款利息
					commission: 0, // 手续费
					loan_institution: '', // 放款机构
					house_prove: '',
					income_prove: '',
					bank_records: '',
					photo: ''
				},
				currentDaysIndex: -1,
				daysList: [], // 还款周期
				loan_fee: 0, // 手续费率
				xyId: 0 // 协议id
			}
		},
		onLoad() {
			this.getLoanSettingList()
			this.getXieyiListData()
		},
		methods: {
			goXy() {
				this.$utils.jump(`/pages/common/article?id=${this.xyId}&backUrl=/pages/loan/loan`)
			},
			onInput() {
				if(this.formData.loan_money) {
					this.interestComputed()
				}
			},
			// 计算利息和手续费
			interestComputed() {
				// 我设置3天的周期是1%的日利率，那么前端选择贷款3天，金额输入10000，日利率显示1%，利息金额一栏显示的是300，金额10000乘以1%的日利率乘以3天
				this.formData.interest =  (Number(this.formData.loan_money) * Number(this.formData.loan_rate) * Number(this.formData.loan_days) / 100).toFixed(6)
				this.formData.commission = (Number(this.formData.loan_money) * Number(this.loan_fee) / 100).toFixed(6)
			},
			daysChange(e) {
				let index = e.detail.value
				this.currentDaysIndex = index
				const { loan_days, loan_institution, loan_rate } = this.daysList[index]
				this.formData.loan_days = loan_days
				this.formData.loan_institution = loan_institution
				this.formData.loan_rate = loan_rate
				this.interestComputed()
			},
			imageChange(url,type) {
				switch(type) {
					case 1:
					this.formData.house_prove = url
					break
					case 2:
					this.formData.income_prove = url
					break
					case 3:
					this.formData.bank_records = url
					break
					case 4:
					this.formData.photo = url
					break
				}
			},
			submit() {
				// 判空
				if(!this.formData.loan_money) {
					uni.showToast({
						title: this.$t('loan.c1'),
						icon: 'none'
					})
					return
				}
				if(!this.formData.loan_days) {
					uni.showToast({
						title: this.$t('loan.c2'),
						icon: 'none'
					})
					return
				}
				if(!this.formData.house_prove) {
					uni.showToast({
						title: this.$t('loan.c3'),
						icon: 'none'
					})
					return
				}
				if(!this.formData.income_prove) {
					uni.showToast({
						title: this.$t('loan.c4'),
						icon: 'none'
					})
					return
				}
				if(!this.formData.bank_records) {
					uni.showToast({
						title: this.$t('loan.c5'),
						icon: 'none'
					})
					return
				}
				if(!this.formData.photo) {
					uni.showToast({
						title: this.$t('loan.c6'),
						icon: 'none'
					})
					return
				}
				if(!this.isChecked) {
					uni.showToast({
						title: this.$t('loan.c7'),
						icon: 'none'
					})
					return
				}
				this.$u.throttle(() => {
					uni.showLoading({
						mask: true
					})
					setTimeout(()=> {
						uni.hideLoading()
					},5000)
					this.$https.initDataToken({
						url: 'loan/submit',
						type: 'POST',
						data: {
							...this.formData,
							loan_setting_id: this.daysList[this.currentDaysIndex].id,
							lang: this.$store.state.lang || 'en'
						}
					},(res,msg) => {
						uni.hideLoading()
						this.$utils.showToast(this.$t(msg))
						if(res) {
							// 清空数据
							this.formData.loan_money = null
							this.formData.loan_days = 0
							this.formData.loan_rate = 0
							this.formData.interest = 0
							this.formData.commission = 0
							this.formData.loan_institution = ''
							this.formData.house_prove = ''
							this.formData.income_prove = ''
							this.formData.bank_records = ''
							this.formData.photo = ''
							// 跳转记录页面
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/loanRecords/loanRecords'
								})
							},800)
						}
					})
				},3000)
				
			},
			// 获取贷款设置
			getLoanSettingList() {
				this.$https.initDataToken({
				  url: 'loan/setting_list',
				  type: 'GET'
				}, (res, msg) => {
					let daysList = res
					for (let i = 0; i < daysList.length; i++) {
						daysList[i].loan_days_str = daysList[i].loan_days + this.$t('loan.a5')
					}
					this.daysList = daysList
				});
				this.$https.initDataToken({
					url: 'loan/fee',
					type: 'GET'
				},(res,msg) => {
					this.loan_fee = res
				})
			},
			// 获取贷款协议
			getXieyiListData() {
			  let data={
				  c_id: 25,
				  page: 1,
				  lang: this.$store.state.lang || 'en'
				};
			  this.$https.initData({
			    url: 'news/list',
			    data,
			    type: 'POST'
			  }, (res, msg) => {
			    const list = res.list
			    if (list.length > 0) {
					this.xyId = list[0].id
			    }
			  })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		padding: 30rpx;
		padding-bottom: 60rpx;
		box-sizing: border-box;
	}
	.desc {
		background-color: #4b7b97;
		padding: 20rpx 20rpx;
		box-sizing: border-box;
		&_label {
			font-size: 28rpx;
			color: #ffffff;
			margin-left: 20rpx;
		}
	}
	.card {
		padding: 10rpx 30rpx;
		box-sizing: border-box;
		box-shadow: 0 0 10rpx 4rpx rgba(255, 255, 255, .5);
		margin-bottom: 40rpx;
		border-radius: 12rpx;
		&_item {
			height: 80rpx;
			line-height: 80rpx;
			&_label {
				font-size: 28rpx;
				color: #ffffff;
			}
			&_value {
				font-size: 28rpx;
				color: #ffffff;
				flex: 1;
				height: 80rpx;
				line-height: 80rpx;
				text-align: right;
				padding-left: 30rpx;
				box-sizing: border-box;
			}
			&_place {
				color: #999999;
			}
		}
		&_item-border {
			border-bottom: 1rpx solid #999999;
		}
	}
.images {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 20rpx;
	&_item {
		width: 304rpx;
		height: 280rpx;
		min-width: 0;
	}
}
.xiyi {
	font-size: 28rpx;
	&_desc {
		color: #1FA2FF;
	}
}
.submit-btn {
	background: linear-gradient(90deg, #1FA2FF 10%, #12D8FA 55.21%, #A6FFCB 100%);
	color: #ffffff;
	font-size: 32rpx;
}
</style>
