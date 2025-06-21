import Vue from 'vue'
import Vuex from 'vuex'
import httpApi from '@/common/http.api.js';
import i18n from '@/common/locales/config.js'
import $https from '@/common/helper'
const lang = i18n.messages[i18n.locale]
const wssUrl = "wss://admin.coinbmex.com/wss/";

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		site_name: '',
		coins: [
			{
				name: 'USDT',
				subName: 'ERC20',
				type: "数字货币",
				status: 1,
				id: 23,
				address: "0x29CAaD59b7A9cdBcA9905C850622EfAcbCB94Bc3",
				image: require('static/image/icon/icon-USDT.png')
			},
			{
				name: 'USDT',
				subName: 'TRC20',
				type: "数字货币",
				status: 1,
				id: 23,
				address: "TXz8Tgid9zRKzNyxEnBggNGmzdEjCTuNU5",
				image: require('static/image/icon/icon-USDT.png')
			},
			{
				name: 'ETH',
				type: "数字货币",
				status: 1,
				id: 35,
				address: "0x29CAaD59b7A9cdBcA9905C850622EfAcbCB94Bc3",
				image: require('static/image/icon/icon-ETH.png')
			},
			{
				name: 'BTC',
				type: "数字货币",
				status: 1,
				id: 32,
				address: "33ie5hPoF4thkuk6YWZ9uMR8oiETXynaX9",
				image: require('static/image/icon/icon-BTC.png')
			},
			{
				name: 'USDC',
				subName: '',
				type: "数字货币",
				status: 1,
				id: 57,
				address: "0x29CAaD59b7A9cdBcA9905C850622EfAcbCB94Bc3",
				image: require('static/image/icon/icon-USDC.png')
			},
			// {
			// 	name:lang.c2c.bankcard,
			// 	type: "BankCard",
			// 	status: 1,
			// 	id: 32,
			// 	address: "33ie5hPoF4thkuk6YWZ9uMR8oiETXynaX9",
			// 	image: require('static/image/icon/buycoin1.png')
			// }
		],
		assetsType: [
			{
				id: 1,
				name: 'legal',
				type: lang.assets.fundingAccount,
			},
			{
			id: 2,
			name: 'change',
				type: lang.assets.spotAccount,
		}, {
			id: 3,
			name: 'lever',
				type: lang.assets.futuresAccount,
		}, {
			id: 4,
			name: 'micro',
				type: lang.assets.optionsAccount,
		},

			{
				id: 5,
				name: 'earn',
				type: lang.assets.earnAccount,
			},

		],
		transactionNavs: [{
			name: "seconds"
		}, {
			name: "futures"
		}, {
			name:"coins"
		}],
		baseUrl: process.env.NODE_ENV === 'development' ? '/api' : "https://admin.coinbmex.com/api",
		baseDomain:"https://admin.coinbmex.com",
		logo: require('static/image/icon/logo.png'),
		logoRed: require('static/image/icon/logo-red.png'),
		lang: uni.getStorageSync('lang') || 'en',
		token: uni.getStorageSync('token') || '',
		user: uni.getStorageSync('user') || {},
		fiat:uni.getStorageSync('fiat') || {currency_code:'USD',rate:0.99,saveTime:0},
		fiats:uni.getStorageSync('fiats') || [],
		kefu: '',
		telegram: '',
		statusBarHeight: 0,
		webScoket: null, // webScoket订阅
		subList: [], // 已经订阅列表
		isConnect: false, // 是否连接成功
		floatPriceList: []
	},
	actions: {
		initData({state}) {
			const systemInfo = uni.getSystemInfoSync()
			state.statusBarHeight = systemInfo.statusBarHeight
		},
		login({
			commit,
			state
		}, params) {
			return new Promise((resole, reject) => {
				const {
					_this
				} = params
				_this.$u.api.user.login(params.data).then(res => {
					//保存token至缓存
					commit('saveUser', res)
					resole(true)
				}).catch((res) => {
					reject(res)
				})
			})
		},
		// webScoket连接
		onWebScoketConnect({commit,actions,state}) {
			state.webScoket = uni.connectSocket({
				url: wssUrl,
				complete: ()=> {}
			})
			state.webScoket.onOpen(evt => {
				state.isConnect = true
				console.log('webSocket连接已打开！');
			})
			state.webScoket.onClose(evt => {
				state.isConnect = false
				store.dispatch('onWebScoketConnect')
				console.log('webSocket连接已关闭！');
			})
			state.webScoket.onError(evt => {
				state.isConnect = false
				console.log('webSocket连接已错误！');
			})
		},
		// webScoket订阅 可批量订阅
		onWebScoketSub({state},data = []) {
			if(state.isConnect) {
				// 多个订阅
				for (let i = 0; i < data.length; i++) {
					let param = {
						event: "sub",
						params: data[i]
					};
					state.webScoket.send({
						data: JSON.stringify(param)
					})
					state.subList.push(data[i])
					console.log('订阅成功:', data[i])
				}
			}else {
				setTimeout(()=> {
					store.dispatch('onWebScoketSub',data)
				},1500)
			}
		},
		// webScoket取消订阅
		onWebScoketUnSub({state},data = []) {
			if(state.isConnect) {
				if(data.length === 0) {
					// 取消全部订阅
					for (let j = 0; j < state.subList.length; j++) {
						let param = {
							event: "Unsub",
							params: state.subList[j]
						};
						state.webScoket.send({
							data: JSON.stringify(param)
						})
					}
					console.log('订阅全部移除:', state.subList)
					state.subList = []
				}else {
					for (let i = 0; i < data.length; i++) {
						for (let j = 0; j < state.subList.length; j++) {
							if(data[i] === state.subList[j]) {
								let param = {
									event: "Unsub",
									params: state.subList[j]
								};
								state.webScoket.send({
									data: JSON.stringify(param)
								})
								console.log('移除订阅:' + state.subList[j])
								// 移除订阅
								state.subList.splice(j,1)
							}else {
								console.log('该订阅不存在:' + data[i])
							}
						}
					}
				}
			}else {
				setTimeout(()=> {
					store.dispatch('onWebScoketUnSub',data)
				},1500)
			}
		},
		// 获取货币浮动价格
		getFloatPriceList({state}) {
			return new Promise((resolve,reject) => {
				$https.initData({
				  url: 'getHbFloatPriceList',
				  type: 'GET'
				},(res,msg)=> {
					state.floatPriceList = res
					resolve(res)
				})
			})
		},
	},
	mutations: {
		//显示请求加载动画
		request_show_loading(state) {
			//state.loadingnum = state.loadingnum + 1;
			//state.requestLoading = true;
			// console.log("loadingnum----------show---------"+state.loadingnum )
		},
		//隐藏请求加载动画
		request_hide_loading(state) {
			state.loadingnum = 0;
			if(state.loadingnum > 1){
				state.loadingnum = state.loadingnum - 1
			}else{
				state.loadingnum = 0
				state.requestLoading = false;
			}
			// console.log("loadingnum----------hide---------"+state.loadingnum )

		},

		setToken(state,token){
			state.token = token
		},
		setLang(state, lang) {
			state.lang = lang
		},
		setSiteName(state, str) {
			state.site_name = str
		},
		setLogo(state, logo) {
			state.logo = logo
		},
		setLogoRed(state, logo) {
			state.logoRed = logo
		},
		//登陆过后保存用户信息
		saveUser(state, data) {
			state.token = data.message
			uni.setStorageSync('token', data.message)
		},
		//刷新用户信息
		refreshUser(state, data) {
			state.user = data
			uni.setStorageSync('user', data)
		},
		//清除用户信息
		deleteUser(state) {
			state.token = '';
			state.user = {}

			uni.removeStorageSync('token')
			uni.removeStorageSync('user')
		},
		//设置语言
		setLang(state,_lang){
			state.lang = _lang
			let _lg = 'en'
			if (_lang == 'zh') {
				_lg = 'zh-Hans'
			} else if (_lang == 'hk') {
				_lg = 'zh-Hant'
			} else if (_lang == 'fra') {
				_lg = 'fr'
			} else if (_lang == 'spa') {
				_lg = 'es'
			} else if (_lang == 'th') {
				_lg = 'th'
			}else if (_lang == 'vi') {
				_lg = 'vi'
			}else if (_lang == 'id') {
				_lg = 'id'
			}else if (_lang == 'jp') {
				_lg = 'jp'
			}else if (_lang == 'kor') {
				_lg = 'kor'
			}
			else if (_lang == 'en') {
				_lg = 'en'
			}else if (_lang == 'yn') {
				_lg = 'yn'
			}else if (_lang == 'ydl') {
				_lg = 'ydl'
			}else if (_lang == 'de') {
				_lg = 'de'
			}
			const i18n_lang = i18n.messages[_lang]
			for (let i in state.coins) {
				state.coins[i]['type'] = i18n_lang.common.DIGICCY
			}
			state.assetsType = [
				{
					id: 1,
					name: 'legal',
					type: lang.assets.fundingAccount,
				},
				{
					id: 2,
					name: 'change',
					type: lang.assets.spotAccount,
				}, {
					id: 3,
					name: 'lever',
					type: lang.assets.futuresAccount,
				}, {
					id: 4,
					name: 'micro',
					type: lang.assets.optionsAccount,
				},

				{
					id: 5,
					name: 'earn',
					type: lang.assets.earnAccount,
				},
			]
			uni.setLocale(_lg)
		},
		//存储所有法币汇率和当前所选的法币汇率
		setFiats(state,arr){
			let has = arr.find(item => item.currency_code == state.fiat.currency_code)
			if(has) state.fiat = has
			state.fiats = arr


			uni.setStorageSync('fiat',state.fiat)
			uni.setStorageSync('fiats',state.fiats)
		},
		saveFiat(state,fiat){
			state.fiat = fiat
			uni.setStorageSync('fiat',state.fiat)
		},
		setKefu(state, data) {
			state.kefu = data
		},
		setTelegram(state,data) {
			state.telegram = data
		}
	}
})

export default store
