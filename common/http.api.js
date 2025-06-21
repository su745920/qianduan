// 此处第二个参数vm，就是我们在页面使用的this
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	//通用页面,如登陆，注册，等api
	const common = {
		//检查更新
		getSetting: (keyword) => vm.$u.get("/getSetting",{keyword}),
		getSiteConfig: () => vm.$u.get("/getSiteConfig"),

	    getOnlineService: () => vm.$u.post("/news/online"),

		getlogo: () => vm.$u.get("/logo"),
		getAppConfig: () => vm.$u.get("/getAppConfig?key=invite_code_must"),

		rebateRulesList: () => vm.$u.get("/rebateRulesList"),

	}

	const c2c = {
		saveAppeal: (img,content) => vm.$u.post("/c2c/saveAppeal",{img,content}),
		sellCoin: (id,amount,type) => vm.$u.post("/c2c/sellCoin",{id,amount,type}),


		getBankCard: () => vm.$u.post("/c2c/myUserCashInfo"),
		//获取法币余额
		getLegalWalletList: (currency_name) => vm.$u.post("/c2c/legalWalletList?currency_name="+currency_name),

		userOrderDetail: (id) => vm.$u.post("/c2c/userOrderDetail?id="+id),
		//商家订单列表
		merchantOrderList: (page,is_sure) => vm.$u.get("/c2c_seller_deal?page="+page+"&is_sure="+is_sure),


		savePublishInfo: (min_number,coin_code,currency_id,total_number,price,way,type,max_number) => vm.$u.post("/savePublishInfo",{min_number,coin_code,currency_id,total_number,price,way,type,max_number}),

		getCurrentUserInfo: () => vm.$u.post("/c2c/getCurrentUserInfo",{}),//当前登录信息
		getMerchantPublishList: (page, type, currency_id) => vm.$u.post("/c2c/merchantPublishList",{page, type, currency_id}),//已经发布信息

		saveApplyMerchant: (lang,name,mobile,wechat_account,ali_account,bank_account,true_name,bank_name) => vm.$u.post("/seller/seller_add",{lang,name,mobile,wechat_account,ali_account,bank_account,true_name,bank_name}),

		confirmPay: (id) => vm.$u.post("/c2c/user_legal_pay",{id}),//确认付款

		confirmReceiveMoney: (id) => vm.$u.post("/c2c/legal_deal_sure",{id}),//确认收到款项

		userOrderList: (page,is_sure) => vm.$u.get("/c2c/userOrderList?page="+page+"&is_sure="+is_sure),
		buyCoin: (id,amount,type) => vm.$u.post("/c2c/buyCoin",{id,amount,type}),
		getBySellList: (page,type,currency_id) => vm.$u.get("/c2c_deal_platform?page="+page+"&type="+type+"&currency_id="+currency_id),
	}

	const user = {
		//发送邮箱验证码
		sendMailCode: (user_string) => vm.$u.post("/sms_mail", {user_string,scene:'register',area_code_id: 1,country_code: 86,lang: 'zh',email_code:''}),
		//邮箱验证码验证
		verifyMailCode: (user_string,email_code) => vm.$u.post("/user/check_email", {user_string,scene:'register',email_code,country_code: '+86',lang: 'zh'}),
		//邮箱注册
		register: (lang,user_string,code,password,re_password,extension_code,type = 'email') => vm.$u.post("/user/register", {user_string,code,password,re_password,extension_code,type}),
		//登陆
		login: (params = {}) => vm.$u.post("/user/login", params),
		//退出登陆
		logout: (lang) => vm.$u.get("/user/logout?lang="+lang),
		myTeam:()=>vm.$u.get("/team/index"),
		czRewardFn:()=>vm.$u.get("/czRewardList"),
	}

	const setting = {
		//刷新用户信息
		getUserInfo: () => vm.$u.get("/user/info"),
		//获取身份认证信息
		getUserRealState: () => vm.$u.get("/user/real/state"),
		//提交初级认证信息
		postRealState1: (id_type, name,card_id,lang) => vm.$u.post("/user/primary_certification", {id_type, name,card_id,real_type:1,lang}),
		//提交高级认证信息
		postRealState2: (front_pic,reverse_pic) => vm.$u.post("/user/real_name", {front_pic,reverse_pic,real_type:2}),
		//获取修改交易/登陆密码的邮箱验证码
		sendEmailCode: (user_string) => vm.$u.post("/sms_mail", {user_string,type:'forget'}),
		//验证邮箱验证码
		verifyMailCode: (user_string,email_code) => vm.$u.post("/user/check_email", {user_string,email_code}),
		//修改密码
		editLoginPassword: (account,password,repassword,code) => vm.$u.post("/user/forget", {account,password,repassword,code}),
		//修改交易密码
		editPayPassword: (password,re_password,code) => vm.$u.post("/safe/update_password", {password,re_password,code}),
		//获取币种列表
		getCurrencyList: () => vm.$u.get("/currency/list"),
		// 保存钱包地址
		saveWalletAddress: (currency,coin,address,upload_pic) => vm.$u.post("/user/savePaymentMethod", {currency,coin,address,upload_pic}),

		//获取钱包地址列表
		getWalletAddressList: (coin) => vm.$u.post("/user/getList?coin="+coin),



		//上传头像
		uploadAvatar: (head_portrait) => vm.$u.post("/user/uploadHeadPortrait",{head_portrait}),
		// 修改用户昵称
		editNickname: (account,nickname,type,lang) => vm.$u.post("/user/updateNickname",{account,nickname,type,lang}),
		//添加银行卡
		saveCard: (params) => vm.$u.post("/user/cash_save",params),
		//添加银行卡國際
		saveCardInternational: (params) => vm.$u.post("/user/cash_save_international",params),
		//获取银行卡信息
		getCard: () => vm.$u.post("/user/cash_info"),
		//获取银行卡信息國際
		getCardInternational: () => vm.$u.post("/user/cash_info_international"),
		//发送短信
		sendSmsCode: (area_code,mobile) => vm.$u.post("/sms_send",{area_code,mobile}),
		//绑定手机号
		bindMobile: (mobile,code) => vm.$u.post("/safe/mobile",{mobile,code}),
	}

	const index = {
		getNoticeList:() => vm.$u.post("news/list?c_id=4"),
		//获取首页的弹窗广告
		getPopupAd: () => vm.$u.get("/news/index_pop"),
		// 获取首页公告
		getNews: () => vm.$u.post("/news/list",{c_id:4}),
		//获取公告详情
		getNewsDetail: (id) => vm.$u.post("/news/detail",{id}),
		// 获取首页轮播图
		getBanner: () => vm.$u.post("/news/list",{c_id:5}),
		//获取首页行情
		getQuotation: () => vm.$u.get("/currency/quotation_new"),
		getMicroQuotation: () => vm.$u.get("/currency/quotation_new?force_key=simple"),
		getQuotationHome: () => vm.$u.get("/currency/quotation_new_home"),

		//获取首页的菜单
		getMenu: () => vm.$u.get("/menu2"),
		getFAQ: () => vm.$u.get("/faq"),
		getContactUs: () => vm.$u.get("/contactus"),
		getAboutUs: () => vm.$u.get("/aboutus"),
		getOperationalCompliance: () => vm.$u.get('/operational_compliance')
	}

	const wallet = {
		getLegalAssets: (lang) => vm.$u.post("/wallet/getLegalAssets",{lang}),

		legalConvertEn2USDT: (currency,number) => vm.$u.post("/wallet/legalConvertEn2USDT?currency="+currency+"&number="+number),
		legalConvertEn2GBP: (currency,number) => vm.$u.post("/wallet/legalConvertEn2GBP?currency="+currency+"&number="+number),

		legalConvert2USDT: (lang,number,from) => vm.$u.post("/wallet/legalConvert2USDT?lang="+lang+"&number="+number),
		legalConvert2CNY: (lang,number,from) => vm.$u.post("/wallet/legalConvert2CNY?lang="+lang+"&number="+number),


		getLegalVal: (lang) => vm.$u.post("/wallet/getLegalVal?lang="+lang),

		getEnLegalVal: (currency) => vm.$u.post("/wallet/getEnLegalVal?currency="+currency),

		getCZAddress2: (lang) => vm.$u.get("/getCZAddressV2?lang="+lang),

		getCZAddressEn: (lang,cashType="") => vm.$u.get("/getCZAddressEn?lang="+lang+"&cashType="+cashType),

		getCZAddress: (currency) => vm.$u.get("/getCZAddress",{currency}),

		// 获取转换成人民币的汇率
		getRateCurrency: (id) => vm.$u.get("/wallet/getRateCurrency",{id}),
		// 钱包一些相关信息
		getWalletInfo: (currency) => vm.$u.post("/wallet/get_info",{currency}),
		// 获取钱包充值地址
		getInAddress: (currency,user_id) => vm.$u.post("/wallet/get_in_address",{currency,user_id}),
		//充值
		//recharge: (account,amount,currency,type=0) => vm.$u.post("/wallet/charge_req",{account,amount,currency,type}),
		recharge: ( dianhui,address,money,voucher,currency,twd,channel,usdt_type) => vm.$u.post("/account/record",{dianhui,address,money,voucher,currency,twd,channel,usdt_type}),
		czV2: ( dianhui,address,money,voucher,currency,truename,channel,usdt_type,lang) => vm.$u.post("/rechargeRecordV2",{dianhui,address,money,voucher,currency,truename,channel,usdt_type,lang}),
		// 获取充值明细
		getRechargeLog: (page = 1,limit = 10) => vm.$u.post("/account/recordlist",{page,limit}),




		// 总资产列表
		getWalletList: () => vm.$u.post("/wallet/list"),

		legalWalletList: () => vm.$u.post("/wallet/legalWalletList"),
		spotWalletList: (no) => vm.$u.post("/wallet/spotWalletList?show0="+no),
		contractsWalletList: () => vm.$u.post("/wallet/contractsWalletList"),
		optionWalletList: () => vm.$u.post("/wallet/optionWalletList"),
		earnWalletList: () => vm.$u.post("/wallet/earnWalletList"),

		// 获取特定币种在币币合约法币秒合约中的余额
		getDetail: (currency,type) => vm.$u.post("/wallet/detail",{currency,type}),
		// 获取特定币种特定方式的帐变记录
		getLegalLog: (currency,type,page) => vm.$u.post("/wallet/legal_log",{currency,type,page}),





		// 获取币币划转的可用列表
		getTransferList: () => vm.$u.post("/user/getTransferList"),

		getTransferFee: (from_currency_id,to_currency_id) => vm.$u.post("/user/getTransferFee",{from_currency_id,to_currency_id}),

		// 获取币币划转的费率
		getHq: () => vm.$u.get("/hb/hq",{}),
		// 币币划转
		transfer: (number,from_currency_id,to_currency_id) => vm.$u.post("/user/Transfer",{number,from_currency_id,to_currency_id}),
		//闪兑
		transferV2: (fromCoin,toCoin,fromAmount) => vm.$u.post("/ex_v2",{fromCoin,toCoin,fromAmount}),


		// 个人币种列表
		getUserCurrencyList: () => vm.$u.get("/currency/user_currency_list"),

		// 资金划转
		fundTransfer: (currency_id,number,from_field,to_field) => vm.$u.post("/wallet/change2",{currency_id,number,from_field,to_field}),
		// 获取划转财务记录
		getTransferHistory: (page) => vm.$u.get("/wallet/hzhistory?page=",{page}),
		//提现
		withdraw: (params) => vm.$u.post("/wallet/out",params),
		//提现记录
		getWithdrawList: (page = 1,limit = 10) => vm.$u.post("/wallet/withdrawLogList",{page,limit}),

	}

	const market = {

		getMicroDeal: (currency_id,legal_id) => vm.$u.post("/microtrade/micro_deal",{currency_id,legal_id}),

		getContractFee: () => vm.$u.get("/contractFee"),

		getHistoryDataV2: (size,symbol,period) => vm.$u.get("/currency/huobiKlineV6?size=200&symbol="+symbol+"&period="+period),


		//获取行情的历史数据，x天前的时间戳
		//getHistoryData: (from,to,symbol,period) => vm.$u.get("/currency/new_timeshar_v2",{from,to,symbol,period}),


		//添加自选
		addOptional: (currency_id) => vm.$u.post("/optional/add",{currency_id}),
		//删除自选
		delOptional: (id) => vm.$u.post("/optional/del",{id}),
		//获取自选列表
		getOptionalList: () => vm.$u.get("/optional/list"),
		//获取杠杆的一些信息吗，及持仓列表
		getLeverDeal: (currency_id,legal_id) => vm.$u.post("/lever/deal",{currency_id,legal_id}),
		//提交合约交易,share:0,
		submitLever: (obj) => vm.$u.post("lever/submit",obj),
		//获取固定币种的持仓列表,按分页显示
		getLeverDealByPage: (currency_id,legal_id,page) => vm.$u.post("/lever/dealall",{currency_id,legal_id,page}),
		//平仓
		cover: (id) => vm.$u.post("/lever/close",{id}),
		//设置止盈止损
		setStop: (id,target_profit_price,stop_loss_price) => vm.$u.post("/lever/setstop",{id,target_profit_price,stop_loss_price}),
		//全部平仓，0：全部，1：只平多单，2：只平空单
		coverAll: (type) => vm.$u.post("/lever/batch_close",{type}),
		// 获取已购买的秒合约列表和余额
		getPayable: () => vm.$u.get("/microtrade/payable_currencies"),
		//获取已购买的秒合约列表
		getSecondsList: (currency_id,match_id,status,page = 1,limit = 5) => vm.$u.get("/microtrade/listsV2",{currency_id,match_id,status,page,limit}),
		//获取秒合约的秒数
		getSecondsSeconds: () => vm.$u.get("/microtrade/seconds"),
		//购买秒合约
		buySeconds: (currencyName,currency_id,type,seconds,number) => vm.$u.post("/microtrade/submitV2",{currencyName,currency_id,type,seconds,number}),
		getResult: (id) => vm.$u.get('/microtrade/get_result', {id}),
		// 获取币币交易中的资产
		getWalletDetail: (currency,type = "change") => vm.$u.post("/wallet/detail",{currency,type}),

		getLockMingDetail:(id)=>vm.$u.get("/lock_mining/detail?id="+id),

		submitOption: (type,currency_id,seconds,number,match_id) => vm.$u.post("/microtrade/submit",{type,currency_id,seconds,number,match_id}),


		// 币币交易
		//coinTrade: (amount,target_price,currency_id,legal_id,type) => vm.$u.post("/coin/trade",{amount,target_price,currency_id,legal_id,type}),

		transactionOut: (price,num,legal_id,currency_id,password) => vm.$u.post("/transaction/out",{price,num,legal_id,currency_id,password}),
		transactionIn: (price,num,legal_id,currency_id,password) => vm.$u.post("/transaction/in",{price,num,legal_id,currency_id,password}),

		//获取币币交易列表
		getTransactionInList: (object) => vm.$u.post("/transaction_in",object),

		getAllTransactionInList: (object) => vm.$u.post("/all_transaction_in",object),
		getAllTransactionOutList: (object) => vm.$u.post("/all_transaction_out",object),

		getAllCoinTradeList: (object) => vm.$u.post("/transaction_complete",object),

		//获取合约交易的订单
		getleverTrade: (currency_id,legal_id,page,status) => vm.$u.post("/lever/my_trade",{currency_id,legal_id,page,status}),

	}

	const ieo = {
		// 获取ieo认购列表
		getIEOProject: (page,limit) => vm.$u.get("/project",{page,limit}),
		// 获取ieo认购详情
		getIEOProjectDetail: (project_id) => vm.$u.get("/project/detail",{project_id}),
		// 申请认购
		subscribeIEO: (project_id,amount,pay_currency,price) => vm.$u.post("/project/order",{project_id,amount,pay_currency,price}),
		// 已申购列表
		getIEOOrder: (page,limit) => vm.$u.get("/user/project/order",{page,limit}),
	}

	const lockming = {
		getBigData: () => vm.$u.get("/lock_mining/bigData"),

		// 获取锁仓挖矿列表
		getLockming: () => vm.$u.get("/lh/deposit/config"),
		getLockmingPage: () => vm.$u.get("/lockorder/getorder"),
		// 获取锁仓挖矿的订单
		getLockmingOrder: (page,limit) => vm.$u.get("/lockorder/lists",{page,limit}),
		// 认购锁仓挖矿
		lockming: (id,number) => vm.$u.post("/lockorder/submit",{id,number}),
		// 提前赎回
		redemption: (id) => vm.$u.post("/financial/earlyRedemption",{id}),
	}

	const follow = {
		//获取交易员列表
		getTraderList: (page) => vm.$u.get("/follow/index?page="+page),
		//跟随,type:1固定比例跟随，2固定手数跟随
		follow: (trader_user_id,number,type) => vm.$u.post("/follow/follow",{trader_user_id,number,type}),
		//取消跟随
		cancelFollow: (follow_user_id) => vm.$u.post("/follow/cancel",{follow_user_id}),
		//获取交易员详情
		getTraderInfo: (trader_user_id) => vm.$u.get("/follow/traderDetail",{trader_user_id}),
		//转自持
		selfHold: (transaction_id) => vm.$u.post("/follow/selfHolding",{transaction_id}),
		//获取历史订单
		getHistoryTrade: (trader_user_id) => vm.$u.get("/follow/historyTrade",{trader_user_id}),
	}

	const invest = {
		//获取产品列表,currency_id :1BTC,2ETH,type:callBTC理财，put：USDT理财
		getList: (currency_id = 1,type = 'call') => vm.$u.get("/dual/index",{currency_id,type}),
		//获取产品详情
		getDetail: (id) => vm.$u.get("/dual/detail",{id}),
		//购买理财产品
		purchase: (id,num) => vm.$u.post("/dual/buyDual",{id,num}),
		//已购买列表
		order: (params) => vm.$u.post("/dual/dual_list",params),
	}

	const nft = {
		//获取nft的产品列表
		getArtwork: (params) => vm.$u.get("/bind_box/getBoxList",params),
		//获取产品详情
		getArtworkDetail: (id) => vm.$u.get("/bind_box/getBoxDetail",{id}),
		//获取艺术家列表
		getArtist: (params) => vm.$u.get("/bind_box/getArtist",params),
		//获取艺术家详情
		getArtistDetail: (uid) => vm.$u.get("/bind_box/getArtistDetail",{uid}),
		//收藏取消收藏艺术品
		collect: (code) => vm.$u.post("/bind_box/collect",{code}),
		// 获取nft中的currency
		getNftCurrency: () => vm.$u.get("/bind_box/getNftCurrency"),
		//获取已收藏的列表
		getCollection: () => vm.$u.get("/bind_box/getCollection"),
		//购买一口价
		purchase: (code) => vm.$u.post("/bind_box/buyNFT",{code}),
		//竞拍时，扣除保证金
		deductMargin: (code) => vm.$u.post("/bind_box/marginNFT",{code}),
		//竞拍
		placeABid: (code,price) => vm.$u.post("/bind_box/auctionNFT",{code,price}),
		//获取出价记录
		getPurchaseOrder: (code) => vm.$u.post("/bind_box/getBindBoxQuotationLog",{code}),
		//我持有的nft
		getMyNFTs: () => vm.$u.post("/bind_box/getMyNFTs"),
		//我的出价记录
		getMyOrder:(page) => vm.$u.post("/bind_box/getMyBindBoxQuotationLog",{page}),
		//开启盲盒
		openBindBox: (code) => vm.$u.post("/bind_box/openBlindBox",{code}),
		//转卖
		resell: (params) => vm.$u.post("/bind_box/resellNFT",params),
		// 获取需要支付的订单
		getNeedPayNFTOrder: () => vm.$u.post("/bind_box/getNeedPayNFTOrder"),
		//已读消息
		readMessage: (id) => vm.$u.post("/bind_box/readNFTOrderMessage",{id}),
		//支付订单
		payOrder: (id) => vm.$u.post("/bind_box/payNFTOrder",{id}),
	}

	const game = {

	}

	vm.$u.api = {
		c2c,
		common,
		user,
		setting,
		index,
		wallet,
		market,
		ieo,
		lockming,
		follow,
		invest,
		nft
	};
}
export default {
	install
}
