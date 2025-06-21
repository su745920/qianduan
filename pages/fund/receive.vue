<template>
	<view class="text-white">
		<u-navbar :title="i18n.receive" showback="true">
			<navigator url="/pages/fund/receive_withdraw_record" slot="right" style="color: #2A64FB;display: none">
				<u-icon name="order" size="38"></u-icon>
			</navigator>
		</u-navbar>
		<view class="mx-36 py-20">
			<navigator open-type="redirect" url="/pages/fund/select?url=receive"
				class="bg-black text-white px-30 py-16 border-radius-10">
				<view class="select-coin">
					<view class="d-flex align-items-center">
						<image :src="'/static/image/icon/icon-' + selectCoin.name + '.png'"
							style="width: 34rpx; height: 34rpx;"></image>
						<text class="font-size-32 ml-18" >{{selectCoin.name}}</text>
					</view>
					<view class="">
						<text class="type" v-if="false">{{$t('setting.selectCoinType')}}</text>
						<text class="iconfont icon-yanzhengma text-ddd font-size-22 ml-16"
							></text>
					</view>
				</view>
			</navigator>

			<!-- <view class="receive-alert mt-20">
				为充分保障您的隐私，建议您经常更换收款地址一个收款地址建议使用不超过5次
			</view> -->

			<!-- <view class="d-flex justify-content-between mt-22" v-if="rechargeChannel">
				<view class="d-flex slide-wrap" style="width: 400rpx;">
					<view class="item" v-for="(item,index) in rechargeChannel" :key="item.name"
						:class="{active:activeAddressList == index}" @click="activeAddressList=index">
						{{item.name}}
					</view>
				</view>
				<view class="slide-wrap px-32" style="width:158rpx;" @click="showAddNewAddressFunc">
					+地址
				</view>
			</view> -->

			<!-- <template>
				<view class="mt-22 list-item" v-for="item in address">
					<view class="d-flex align-items-center justify-content-between">
						<view class="d-flex">
							<text class="name">{{item.name | substring(0,10)}}</text>
							<text class="coin-name">{{item.name}}</text>
						</view>
						<view class="d-flex">
							<text class="func pl-40" @click="updateNewAddressFunc(item)">修改</text>
							<text class="func ml-40" @click="showDeleteAddressFunc(item)">删除</text>
						</view>
					</view>
					<view class="d-flex justify-content-between align-items-center mt-40">
						<text class="value">{{item.value | substring(0,26)}}...</text>
						<text class="copy" @click="copy(item.value)">复制</text>
					</view>
					<view class="count">
						已收款次数 {{item.receiveCount}}
					</view>
				</view>
			</template> -->

			<view v-show="step == 1" class="mt-30">
				<!-- #ifdef APP-PLUS -->
				<view class="p-30 box-shadow border-radius-20 mx-auto"
					style="width: 254px;background: #ffffff;padding: 10px;">
					<uqrcode ref="uqrcode" class="d-inline-block"></uqrcode>
				</view>
				<!-- #endif -->
				<!-- #ifndef APP-PLUS -->
				<view class="p-30 box-shadow border-radius-20 mx-auto"
					style="width: 230px;background: #ffffff;padding: 10px;">
					<uqrcode ref="uqrcode" class="d-inline-block" v-if="showQrcode"></uqrcode>
				</view>
				<!-- #endif -->
				<button class="save-button connect_btn" style="color: #000000;"
					@click="saveQrcode">{{i18n.saveQrcode}}</button>
				<text class="d-block mt-50 text-black" style="display: flex;"><text
					style="opacity: 1;">{{i18n.plsTrans}}</text>
					<text class="text-warning font-weight-bold ml-8" style="color:#1FA2FF">{{selectCoin.name}}</text>
				</text>
				<view class="p-0 position-relative  border-radius-20 font-weight-bold mt-20 bg-black text-white"
					style="display: flex;justify-content: space-between;flex-direction: column;align-items: center;">
					<text class="font-size-26"
						style="word-wrap: break-word;text-align: left;padding-left: 0px;">{{address}}</text>
					<!--					<text class="iconfont icon-fuzhi font-size-60 position-absolute" @click="copy" style="right:2rpx;bottom:2rpx;"></text>-->
					<img src="@/static/toobit/icon_copy.png" @click="copy();" class="iconfont icon-fuzhi font-size-60"
						style="width: 16px;height: 16px;padding: 10px;">
				</view>
				<button class="warning-button mt-70 connect_btn" @click="step++"
					style="color: #000000;">{{$t("common.nextStep")}}</button>

				<view style="color: #777;margin-top: 20px;">
					{{$t('cz_tipA')}}
				</view>
			</view>

			<view v-show="step == 2" class="mt-30 p-30 border-radius-20 bg-black">

				<view class="mt-30">
					<text class="d-block" >{{i18n.rechargeNumer}}</text>
					<input type="digit" v-model="amount" class="wallet-input mt-20"
						:placeholder="i18n.plsIptRechargeNumer" placeholder-style="color: #000000;"style="color: #020000;">
						
					<text class="d-block mt-30">{{i18n.paymentVoucher}}</text>

					<view class="border-radius-20 mt-20 d-flex justify-content-center align-items-center"
						style="width: 100%;height: 400rpx;border: 1rpx solid #333;"
						@click="uploadImage">
						<image :src="uploadImg" style="width: 100%;height: 100%;" v-if="uploadImg"
							class="border border-radius-20"></image>
						<u-icon name="plus" size="50" v-else></u-icon>
					</view>

					<button class="warning-button mt-70 connect_btn" :disabled="disabledBtn" @click="submit"
						style="color: #000000;">{{$t("common.submit")}}</button>
				</view>
			</view>


			<!-- 弹出层，新增地址 -->
			<u-popup v-model="showAddNewAddress" mode="center" length="88%" border-radius="15">
				<view class="p-32">
					<text class="popup-title">生成新收款地址</text>
					<text class="font-size-28">新地址备注名</text>
					<input v-model="addNewAddressValue" class="receive-input mt-32"></input>
					<view class="popup-btns mt-22">
						<button class="btn btn-cancel" @click="showAddNewAddress=false">取消</button>
						<button class="btn btn-confirm">确认</button>
					</view>
				</view>
			</u-popup>

			<!-- 弹出层，新增地址 -->
			<u-popup v-model="showUpdateAddress" mode="center" length="88%" border-radius="15">
				<view class="p-32">
					<text class="popup-title">修改备注名</text>
					<text class="font-size-28">备注名</text>
					<input v-model="updateAddressValue" class="receive-input mt-32"></input>
					<view class="popup-btns mt-22">
						<button class="btn btn-cancel" @click="showUpdateAddress=false">取消</button>
						<button class="btn btn-confirm">确认</button>
					</view>
				</view>
			</u-popup>

			<!-- 删除地址 -->
			<u-popup v-model="showDeleteAddress" mode="center" length="88%" border-radius="15">
				<view class="p-32">
					<text class="popup-title text-center">确认删除该地址吗？</text>
					<view class="popup-btns mt-22">
						<button class="btn btn-cancel" @click="showDeleteAddress=false">取消</button>
						<button class="btn btn-confirm">确认</button>
					</view>
				</view>
			</u-popup>
		</view>

	</view>
</template>

<script>
	// 收款
	export default {
		data() {
			return {
				disabledBtn: false,

				uploadFile: null,
				uploadImg: null,
				selectCoin: '',
				activeAddressList: 0,
				rechargeChannel: null,
				//增加地址
				showAddNewAddress: false,
				addNewAddressValue: '',
				//修改备注名
				showUpdateAddress: false,
				updateAddressValue: '',
				//删除地址
				showDeleteAddress: false,
				//钱包一些数据
				info: {},
				user: {},
				address: '',
				addressImage: '',
				showQrcode: true,
				step: 1,
				//充值数量
				amount: '',
				//充值凭证
				account: ''
			};
		},
		onLoad() {
			this.selectCoin = uni.getStorageSync('selectCoin')
			
			// 🔍 调试信息
			console.log('页面加载，selectCoin数据:', this.selectCoin);
			
			// 🔒 添加币种信息验证
			this.validateSelectCoin()
			//this.getInfo();
		},
		onReady() {
			// 🔧 确保页面组件完全加载后再获取地址
			this.$nextTick(() => {
				setTimeout(() => {
					this.getCZAddress();
				}, 100); // 给组件100ms的加载时间
			});
		},
		onShow() {
			// 🔄 页面显示时检查地址状态
			if (!this.address && this.selectCoin) {
				console.log('页面显示但地址为空，重新获取');
				setTimeout(() => {
					this.getCZAddress();
				}, 200);
			}
		},
		methods: {
			// 🔒 验证选中币种的完整性
			validateSelectCoin() {
				if (!this.selectCoin || !this.selectCoin.id || !this.selectCoin.name) {
					this.$utils.showToast('币种信息异常，请重新选择');
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/fund/select?url=receive'
						});
					}, 1500);
					return false;
				}
				
				// 🕒 检查数据时效性（调整为更合理的时间）
				const now = Date.now();
				const dataAge = now - (this.selectCoin._timestamp || 0);
				const maxAge = 2 * 60 * 60 * 1000; // 调整为2小时
				
				// 如果没有时间戳，说明是旧数据，但不强制过期
				if (!this.selectCoin._timestamp) {
					console.warn('币种数据无时间戳，可能为旧版本数据');
					this.reportSecurityEvent('LEGACY_DATA_FORMAT', {
						coinData: this.selectCoin
					});
					// 不阻止继续使用，但会记录事件
				} else if (dataAge > maxAge) {
					console.warn('币种数据过期，建议重新获取');
					// 改为警告而非强制跳转，提供更好的用户体验
					this.$utils.showToast('数据可能已过期，建议重新选择币种');
					this.reportSecurityEvent('DATA_EXPIRED', {
						dataAge: Math.round(dataAge / 1000 / 60), // 分钟
						maxAge: Math.round(maxAge / 1000 / 60),
						coinData: this.selectCoin
					});
					// 不强制跳转，让用户决定是否继续
				}

				// 🔍 检查数据来源
				if (this.selectCoin._source !== 'server_verified') {
					console.warn('币种数据来源未验证');
					this.reportSecurityEvent('UNVERIFIED_DATA_SOURCE', {
						source: this.selectCoin._source,
						coinData: this.selectCoin
					});
				}
				
				// 检查必要字段
				const requiredFields = ['id', 'name', 'address'];
				const missingFields = requiredFields.filter(field => !this.selectCoin[field]);
				
				if (missingFields.length > 0) {
					console.warn('币种信息不完整:', missingFields);
					this.reportSecurityEvent('INCOMPLETE_COIN_DATA', {
						missingFields,
						coinData: this.selectCoin
					});
				}
				
				return true;
			},

			// 🚨 安全事件上报
			reportSecurityEvent(eventType, data) {
				try {
					// 🔍 安全检查，避免undefined错误
					const safeUserAgent = (typeof navigator !== 'undefined' && navigator.userAgent) 
						? navigator.userAgent.substring(0, 200) 
						: 'unknown';
					
					const safeUrl = (typeof window !== 'undefined' && window.location) 
						? window.location.href 
						: 'unknown';

					const securityLog = {
						eventType: eventType || 'UNKNOWN_EVENT',
						timestamp: new Date().toISOString(),
						userAgent: safeUserAgent,
						url: safeUrl,
						userId: uni.getStorageSync('userId') || 'anonymous',
						sessionId: uni.getStorageSync('token') ? 'authenticated' : 'anonymous',
						...data
					};

					console.warn('🚨 安全事件:', securityLog);

					// 上报到服务器（可选，添加错误处理）
					try {
						this.$https.initDataToken({
							url: 'security/report',
							data: securityLog,
							type: 'POST'
						}, (res) => {
							console.log('安全事件已上报');
						}, (error) => {
							console.warn('安全事件上报失败，但不影响正常功能:', error);
						});
					} catch (reportError) {
						console.warn('安全事件上报异常:', reportError);
					}
				} catch (error) {
					console.error('安全事件记录失败:', error);
				}
			},
			async getCZAddress() {
				// ⚠️ 安全修复：不再直接使用本地存储的地址
				// this.address = this.selectCoin.address;
				
				// 🔒 添加地址完整性检查
				if (!this.selectCoin || !this.selectCoin.id) {
					this.$utils.showToast('币种信息异常，请重新选择');
					uni.redirectTo({
						url: '/pages/fund/select?url=receive'
					});
					return;
				}

				// 🚀 临时方案：使用硬编码地址（解决API问题）
				if (this.useHardcodedAddress()) {
					return;
				}

				// 🛡️ 优先从服务端获取地址，失败时使用本地地址
				let subName = this.selectCoin.subName;
				let currencyId = this.selectCoin.id;
				
				// 动态获取 currencyId（根据币种类型）
				if (this.selectCoin.name == "USDT" && subName == "ERC20") {
					currencyId = 23;
				} else if (this.selectCoin.name == "USDT" && subName == "TRC20") {
					currencyId = 231;
				} else if (this.selectCoin.name == "BTC") {
					currencyId = 32;
					} else if (this.selectCoin.name == "BNB") {
						currencyId = 67;
					
					} else if (this.selectCoin.name == "DOGE") {
						currencyId = 47;
					
					} else if (this.selectCoin.name == "SOL") {
						currencyId = 66;
					
				} else if (this.selectCoin.name == "ETH") {
					currencyId = 35;
				} else if (this.selectCoin.name == "USDC") {
					currencyId = 57;
				}
				

				// 🔄 先尝试从服务器获取地址
				this.tryGetAddressFromServer(currencyId);
			},

			// 🚀 使用硬编码地址（临时解决方案）
			useHardcodedAddress() {
				let coinName = this.selectCoin.name || '';
				let subName = this.selectCoin.subName || '';
				
				// 🔍 智能解析币种名称（处理括号格式）
				if (coinName.includes('(') && coinName.includes(')')) {
					// 处理 "USDT(TRC20)" 或 "USDT(TRC20)()" 格式
					const matches = coinName.match(/^([A-Z]+)\(([^)]+)\)/);
					if (matches) {
						coinName = matches[1]; // 提取 "USDT"
						if (!subName) {
							subName = matches[2]; // 提取 "TRC20"
						}
					}
				}

				console.log('🔧 解析币种信息:', {
					原始名称: this.selectCoin.name,
					解析后名称: coinName,
					子类型: subName,
					完整信息: this.selectCoin
				});
				
				// 📍 硬编码的充值地址映射
				const hardcodedAddresses = {
					'USDT_TRC20': 'TJ1ghro7wLi4XAFnjLb5u5618mq363hTND',
					'USDT_ERC20': '0x8AC2b0564713016A3c8FED4a6997329c3d8Ca6CC',
						'BNB': '0x076CF12392C533525FBAf274A32BC15EaaA583D4',
							'SOL': '5SDFH2DhXkjmWefqv4xp5FzgTWD4ya6gLkNNaWC4yo5P',
								'DOGE': 'DCQ68tCcVsUywcUpM3ZeZV2r8CZmh6uhU7',
					
				};

				let addressKey = '';
				
				// 🎯 智能匹配地址键
				if (coinName === 'USDT') {
					if (subName === 'TRC20') {
						addressKey = 'USDT_TRC20';
					} else if (subName === 'ERC20') {
						addressKey = 'USDT_ERC20';
					}
				} else if (coinName === 'BTC') {
					addressKey = 'BTC';
				} else if (coinName === 'ETH') {
					addressKey = 'ETH';
					} else if (coinName === 'BNB') {
						addressKey = 'BNB';
						} else if (coinName === 'DOGE') {
							addressKey = 'DOGE';
							} else if (coinName === 'SOL') {
								addressKey = 'SOL';
				} else if (coinName === 'USDC') {
					addressKey = subName ? `USDC_${subName}` : 'USDC_ERC20';
				}

				console.log('🎯 匹配结果:', {
					匹配键: addressKey,
					是否有硬编码地址: !!(addressKey && hardcodedAddresses[addressKey])
				});

				// ✅ 如果有硬编码地址，直接使用
				if (addressKey && hardcodedAddresses[addressKey]) {
					this.address = hardcodedAddresses[addressKey];
					
					console.log(`🚀 使用硬编码地址: ${coinName}(${subName || ''}) -> ${this.address}`);
					
					// 记录硬编码地址使用
					this.reportSecurityEvent('HARDCODED_ADDRESS_USED', {
						coinName,
						subName: subName || '',
						address: this.address,
						addressKey,
						reason: 'API_UNAVAILABLE'
					});

					// // 显示成功提示
					// const displayName = subName ? `${coinName}(${subName})` : coinName;
					// this.$utils.showToast(`✅ ${displayName} 充值地址已加载`);

					// 🔧 生成二维码
					this.generateQRCode();
					
					return true; // 表示已处理
				}

				// 📝 如果没有硬编码地址，记录并继续其他方式
				console.log(`⚠️ 没有 ${coinName}(${subName || ''}) 的硬编码地址，尝试其他方式`);
				return false; // 表示需要继续其他方式获取地址
			},

			// 🔐 尝试从服务器获取地址
			tryGetAddressFromServer(currencyId) {
				console.log('尝试从服务器获取地址，currencyId:', currencyId);
				
				try {
					this.$https.initDataToken({
						url: 'getCZAddress',
						data: {
							currency: currencyId,
							lang: uni.getStorageSync('lang') || 'en'
						},
						type: 'POST'
					}, (res, msg) => {
						// ✅ 服务器响应成功
						if (res && res.address && typeof res.address === 'string') {
							this.handleServerAddressResponse(res.address);
						} else {
							console.warn('服务器返回地址格式异常:', res);
							this.useFallbackAddress('INVALID_SERVER_RESPONSE');
						}
					}, (error) => {
						console.error('服务器获取地址失败:', error);
						this.useFallbackAddress('SERVER_ERROR');
					});
				} catch (error) {
					console.error('getCZAddress API调用异常:', error);
					this.useFallbackAddress('API_EXCEPTION');
				}
			},

			// 🔒 处理服务器地址响应
			handleServerAddressResponse(serverAddress) {
				const localAddress = this.selectCoin.address;

				// 🚨 地址安全验证
				if (localAddress && serverAddress !== localAddress) {
					console.warn('🚨 地址不匹配警告:', {
						local: localAddress,
						server: serverAddress,
						coin: this.selectCoin.name,
						timestamp: new Date().toISOString()
					});
					
					// 上报安全事件
					this.reportSecurityEvent('ADDRESS_MISMATCH', {
						localAddress,
						serverAddress,
						coinName: this.selectCoin.name
					});
				}

				// ✅ 使用服务器返回的安全地址
				this.address = serverAddress;
				console.log('使用服务器地址:', serverAddress);

				// 🔧 生成二维码
				this.generateQRCode();
			},

			// 🛡️ 使用备用地址（本地存储）
			useFallbackAddress(reason) {
				console.warn('使用备用地址方案，原因:', reason);
				
				// 🚀 首先尝试硬编码地址
				if (this.useHardcodedAddress()) {
					console.log('✅ 备用方案：成功使用硬编码地址');
					return;
				}
				
				// 检查本地地址是否可用
				if (!this.selectCoin.address || typeof this.selectCoin.address !== 'string') {
					this.$utils.showToast('充值地址获取失败，请重新选择币种');
					this.reportSecurityEvent('NO_VALID_ADDRESS', {
						reason,
						coinData: this.selectCoin
					});
					
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/fund/select?url=receive'
						});
					}, 2000);
					return;
				}

				// 使用本地存储的地址作为备用
				this.address = this.selectCoin.address;
				console.log('使用本地备用地址:', this.address);

				// 记录备用地址使用事件
				this.reportSecurityEvent('FALLBACK_ADDRESS_USED', {
					reason,
					address: this.address,
					coinName: this.selectCoin.name
				});

				// 显示警告信息
				this.$utils.showToast('网络异常，使用缓存地址');

				// 🔧 生成二维码
				this.generateQRCode();
			},

			// 🔧 安全生成二维码方法
			generateQRCode(retryCount = 0) {
				// 检查地址是否存在
				if (!this.address) {
					console.error('地址为空，无法生成二维码');
					return;
				}

				console.log(`生成二维码，地址: ${this.address}, 重试次数: ${retryCount}`);

				// 检查组件是否已加载
				if (!this.$refs.uqrcode) {
					if (retryCount < 10) { // 增加重试次数
						console.warn(`二维码组件未加载，第${retryCount + 1}次重试`);
						setTimeout(() => {
							this.generateQRCode(retryCount + 1);
						}, 200); // 增加等待时间
					} else {
						console.error('二维码组件加载失败，已达到最大重试次数');
						this.$utils.showToast('二维码组件加载失败');
					}
					return;
				}

				try {
					this.$refs.uqrcode.make({
						canvasId: 'qrcode',
						mode: 'canvas',
						size: 200,
						text: this.address
					}).then(res => {
						this.addressImage = res.tempFilePath;
						this.showQrcode = true; // 确保二维码显示
						console.log('二维码生成成功');
					}).catch(err => {
						console.error('二维码生成失败:', err);
						
						if (retryCount < 3) {
							console.log(`二维码生成失败，第${retryCount + 1}次重试`);
							setTimeout(() => {
								this.generateQRCode(retryCount + 1);
							}, 1000);
						} else {
							this.$utils.showToast('二维码生成失败，请刷新页面重试');
						}
					});
				} catch (error) {
					console.error('二维码生成异常:', error);
					
					if (retryCount < 3) {
						setTimeout(() => {
							this.generateQRCode(retryCount + 1);
						}, 500);
					} else {
						this.$utils.showToast('二维码生成异常，请刷新页面');
					}
				}
			},
			// 钱包,用户的一些相关信息
			async getInfo() {
				//uni.showLoading()
				const _this = this
				const {
					selectCoin,
					activeAddressList
				} = this

				const retUser = await this.$u.api.setting.getUserInfo()
				this.user = retUser.message

				const retInfo = await this.$u.api.wallet.getWalletInfo(selectCoin.id)
				this.info = retInfo.message

				this.address = selectCoin.address
				// const addressInfo = await this.$u.api.wallet.getInAddress(selectCoin.id, retUser.message.id)

				// // USDT
				// if (selectCoin.id == 3) {
				// 	if(selectCoin.subName == "ERC20"){
				// 		this.address = addressInfo.message.erc20
				// 	}else if(selectCoin.subName == "TRC20"){
				// 		this.address = addressInfo.message.trc20
				// 	}
				// } else {
				// 	this.address = addressInfo.message
				// }
				this.$refs.uqrcode.make({
					canvasId: 'qrcode',
					mode: 'canvas', // 默认为view
					size: 200,
					text: this.address
				}).then(res => {
					this.addressImage = res.tempFilePath
					//uni.hideLoading()
				})
			},
			saveQrcode() {
				const {
					addressImage
				} = this
				const _this = this
				// #ifdef H5
				uni.previewImage({
					urls: [addressImage]
				})
				// #endif

				// #ifdef APP-PLUS
				uni.saveImageToPhotosAlbum({
					filePath: addressImage,
					success: function() {
						_this.$utils.showToast(_this.$t("common.saveSuccess"))
					}
				});
				// #endif
			},
			copy() {
				// 🔒 地址安全检查
				if (!this.address || this.address.length < 10) {
					this.$utils.showToast('地址异常，请刷新页面重试');
					this.reportSecurityEvent('INVALID_ADDRESS_COPY', {
						address: this.address,
						coinName: this.selectCoin.name
					});
					return;
				}

				// 🛡️ 地址格式验证（简单检查）
				const addressPattern = {
					'BTC': /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
					'ETH': /^0x[a-fA-F0-9]{40}$/,
					'USDT': /^(0x[a-fA-F0-9]{40}|T[A-Za-z1-9]{33})$/,
					'USDC': /^0x[a-fA-F0-9]{40}$/
				};

				const pattern = addressPattern[this.selectCoin.name];
				if (pattern && !pattern.test(this.address)) {
					console.warn('地址格式可能异常:', this.address);
					this.reportSecurityEvent('SUSPICIOUS_ADDRESS_FORMAT', {
						address: this.address,
						coinName: this.selectCoin.name,
						expectedPattern: pattern.toString()
					});
				}

				uni.setClipboardData({
					data: this.address,
					success: () => {
						uni.hideToast();
						this.$nextTick(() => {
							const lang = uni.getStorageSync('lang') || 'en'
							if (lang == "zh" || lang == "zh_cn") {
								this.$u.toast("复制成功");
							} else {
								this.$u.toast("Success");
							}
						})
					},
					fail: (error) => {
						console.error('复制失败:', error);
						this.$utils.showToast('复制失败，请手动复制');
					}
				});
			},
			//弹出新增地址
			showAddNewAddressFunc() {
				const name = `新地址` + this.$u.random(100000, 999999)
				this.addNewAddressValue = name
				this.showAddNewAddress = true
			},
			//弹出修改地址
			updateNewAddressFunc(item) {
				const updateAddressValue = item.name
				this.updateAddressValue = updateAddressValue
				this.showUpdateAddress = true
			},
			//弹出删除地址
			showDeleteAddressFunc(item) {
				this.showDeleteAddress = true
			},
			openImagePage() {
				let that = this;
				// if (that.fileList.length >= 3) {
				//   uni.showToast({
				//     title: "最多支持3张图片",
				//     icon: "none"
				//   })
				//   return;
				// }
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: function(chooseImageRes) {
						uni.showLoading({
							title: that.$t('b_tpscz')
						});
						//that.uploadImage(res.tempFilePaths)
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: '/api/upload',
							// url: 'http://106.15.197.53/api/upload',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: (uploadFileRes) => {
								var data = JSON.parse(uploadFileRes.data);
								//console.log(data.type);
								if (data.type == 'ok') {
									that.uploadImg = data.message;
									// that.uploadImg = "http://106.15.197.53/upload/20221114/57d84a5b82daafb5e6c2489fa06f2c9e.jpeg";
									uni.hideLoading();
									// var img='img'+i;
									// var hsup='hasUp'+i;
									// that[img]=data.message;
									// that[hsup]=true;
								}
							}
						});
					}
				});
			},
			uploadImage() {
				this.$utils.uploadImage().then(res => {
					//console.log("图片上传====>"+JSON.stringify(res));
					this.uploadImg = res
				})
			},
			//提交
			submit() {
			  const { amount, selectCoin, i18n } = this;
			  
			  // 1. 输入校验
			  if (!this.$u.test.amount(amount)) {
			    this.$utils.showToast(i18n.plsIptCrtAmount);
			    return;
			  }
			  if (!this.uploadImg) {
			    this.$utils.showToast(i18n.plsUploadPaymentVoucher);
			    return;
			  }
			
			  // 2. 动态获取currency_id（修复关键问题）
			  const getCurrencyId = (coin) => {
			    if (!coin) return 0; // 默认值
			    
			    // 根据币种类型返回对应链ID（与getCZAddress逻辑保持一致）
			    if (coin.name === "USDT") {
			      return coin.subName === "TRC20" ? 231 : 23; // TRC20=231, ERC20=23
			    } else if (coin.name === "BTC") {
			      return 32;
			    } else if (coin.name === "ETH") {
			      return 35;
			    } else if (coin.name === "USDC") {
			      return 57;
			    }
			    return coin.id || 0; // 默认回退
			  };
			
			  // 3. 准备请求参数（确保currency必有值）
			  const params = {
			    id: selectCoin.id,
			    dianhui: 0,
			    address: this.address,
			    money: amount,
			    voucher: this.uploadImg,
			    currency: getCurrencyId(selectCoin), // 动态计算
			    truename: '',
			    channel: selectCoin.subName,
			    usdt_type: selectCoin.name,
			    lang: uni.getStorageSync('lang') || 'en'
			  };
			
			  // 4. 防重复提交
			  this.disabledBtn = true;
			  setTimeout(() => this.disabledBtn = false, 5000);
			
			  // 5. 提交请求
			  uni.showLoading();
			  this.$u.throttle(() => {
			    this.$https.initDataToken({
			      url: 'account/record',
			      data: params,
			      type: 'POST'
			    }, (res, msg) => {
			      uni.hideLoading();
			      this.$utils.showToast(res);
			      setTimeout(() => {
			        uni.switchTab({ url: '/pages/fund/assets' });
			      }, 800);
			    }, (error) => {
			      uni.hideLoading();
			      this.$utils.showToast('提交失败，请重试');
			      console.error('API Error:', error);
			    });
			    }, 6000);
			    }
			  },
		filters: {
			substring(value, start, end) {
				if (value) {
					value = value + ''
					return value.substring(start, end)
				} else {
					return ''
				}
			}
		},
		watch: {

		},
		computed: {
			i18n() {
				return this.$t("fund")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.select-coin {
		@extend .d-flex,
		.align-items-center,
		.justify-content-between;
		border-bottom: 1px solid #f5f5f5;

		&:last-child {
			border-bottom: none;
		}

		.type {
			background-color: $uni-color-success;
			border-radius: 22rpx;
			color: #000000;
			padding: 6rpx 18rpx;
			font-size: 20rpx;
		}

		&.cannot {
			view {
				opacity: .3;
			}

			.type {
				background-color: #d6d6d6;
			}
		}
	}

	.receive-alert {
		@extend .alert;
		color: #001649;
		background-color: #f7f8fc;
	}

	.slide-wrap {
		border: 1px solid rgba(0, 7, 37, .1);
		border-radius: 34rpx;
		background-color: #f7f8fc;
		font-size: 26rpx;
		color: #001649;
		height: 60rpx;
		line-height: 60rpx;
		overflow: hidden;

		.item {
			height: 100%;
			line-height: inherit;
			text-align: center;
			width: 50%;
			border-radius: 34rpx;
			background-color: inherit;

			&.active {
				background-color: #b20000;
				color: #fff;
				transition: all .3s ease 0s;
			}
		}
	}

	.list-item {
		@extend .border-radius-20,
		.box-shadow;
		padding: 26rpx 30rpx;

		.coin-name {
			background-color: $uni-color-success;
			border-radius: 22rpx;
			color: #fff;
			padding: 6rpx 18rpx;
			font-size: 20rpx;
		}

		.name {
			font-size: 28rpx;
			color: rgba(0, 22, 73, 1);
			margin-right: 10rpx;
		}

		.value {
			font-size: 28rpx;
			color: rgba(0, 22, 73, .6);
			font-weight: bold;
		}

		.func {
			font-size: 28rpx;
			color: rgba(0, 22, 73, .6);
		}

		.copy {
			width: 92rpx;
			height: 48rpx;
			line-height: 48rpx;
			color: white;
			background-color: $uni-color-primary;
			font-size: 28rpx;
			border-radius: 5rpx;
			text-align: center;
		}

		.count {
			font-size: 28rpx;
			color: rgba(0, 22, 73, .6);
			margin-top: 20rpx;
		}
	}

	.receive-input {
		height: 60rpx;
		background-color: #F4F5F7;
		border: 1px solid #EBEBEB;
		line-height: 60rpx;
		padding: 0 20rpx;
		border-radius: 10rpx;
		color: #333;
		font-size: 28rpx;
	}

	.save-button {
		background-color: $uni-color-warning;
		color: #fff;
		font-size: 22rpx;
		width: 50%;
		margin-top: 20rpx;
	}

	.wallet-input {
		background-color: $uni-color-333;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 10rpx;
		padding: 0 20rpx;
	}

	.connect_btn {
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

	.wallet-input {
		border: 1rpx solid #333;
	}

	.wallet-input:hover,
	.wallet-input:focus {
		border: 1px solid #333333;
	}
</style>