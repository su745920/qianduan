import Vue from '@/main'
import {domain} from './domain.js'
import store from '@/store/index.js'
var mainName=domain;
// var laravel_api='https://www.gotbybit.com/api/';
// var laravel_api='http://106.15.197.53/api/';
// var laravel_api='http://47.242.49.177/api/';
var laravel_api='/api/';
laravel_api=domain+'/api/';
// #ifdef APP-PLUS
laravel_api=domain+'/api/';
// #endif
function checkMobile(phone){
    var reg=/^1[34578]\d{9}$/;
    return reg.test(phone);
}
function checkEmail(emial){
    var reg= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // var reg= /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    let str = emial.trim();
    return reg.test(str);
}

function showLayer(con,icon){
    uni.showToast({
        icon: icon ||'none',
        title: con,
        // duration:10000
    });
}
function initData(params,callback){
    var url=laravel_api+params.url;
    var mytype=params.type||'GET';
    var data=params.data || {};
    // uni.showLoading({
    // 	title: '加载中',
    // 	mask: true
    // });
    uni.request({
        url,
        method: mytype,
        data,
        header: {
            'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
        },
        success: res => {
            // uni.hideLoading();
            var resdata=res.data;
            // console.log(resdata);
            if(resdata.type=='ok'){
                callback&&callback(resdata.message,resdata.message);
            }else if(resdata.type=='999'){
                uni.removeStorageSync('token');
                uni.navigateTo({
                    url:'/pages/mine/login'
                })
            }else{
                // uni.hideLoading();
                showLayer(resdata.message);
            }
        },
        fail: (err) => {
            // console.log(err)
        },
        complete: () => {
            setTimeout(function() {
                uni.hideLoading();
            }, 1000);
        }
    });
}
function initDataToken(params,callback){
    var that = this
    var token=uni.getStorageSync('token');
    // var lang=uni.getStorageSync('lang');
    var url=laravel_api+params.url;
    var mytype=params.type||'GET';
    var data=params.data || {};
    // uni.showLoading({
    // 	// title: '请求中...'
    // });
    store.commit('request_show_loading');
    // this.$showLoading()
    uni.request({
        url,
        method: mytype,
        data,
        header: {
            'AUTHORIZATION':token
        },
        success: res => {
            // uni.hideLoading();
            store.commit('request_hide_loading');
            var resdata=res.data;
            if(resdata.type == 999){
                uni.removeStorageSync('token');
                uni.navigateTo({
                    url:'/pages/mine/login'
                })
            }else if(resdata.type == '998'){
                uni.navigateTo({
                    url:'/pages/i/primary_certification'
                })
            }else if(resdata.type == '997'){
                uni.navigateTo({
                    url:'/pages/mine/collect_money'
                })
            }else if(resdata.type == 'ok'){
                callback&&callback(resdata.message,resdata.message)
            }
            else{
                if(resdata.message.indexOf("Incorrect payment password") != -1){
                    showLayer(Vue.$t("a_fkmmcw"));
                }else if(resdata.message.indexOf("The minimum subscription amount is") != -1){
                    showLayer(resdata.message.replace("The minimum subscription amount is",Vue.$t("a_zdsgjew")));
                }else{
                    showLayer(resdata.message);
                }
            }
        },
        fail: () => {
        },
        complete: (err) => {
            uni.hideLoading();
            if(err.statusCode == 500){
                showLayer('The server is out of order, it is being repaired, please be patient');
            }
            if(err.statusCode == 401){
                // uni.showModal({
                // 	title: '',
                // 	content: '暂无交易密码，是否立即设置',
                // 	showCancel: true,
                // 	cancelText: '取消',
                // 	confirmText: '确定',
                // 	success: res => {
                // 		// console.log(res)
                // 		if(res.confirm){
                // 			uni.navigateTo({
                // 				url:'/pages/mine/resetLegalPwd'
                // 			})
                // 		}

                // 	},
                // 	fail: () => {},
                // 	complete: () => {}
                // });
            }
        }
    });
}
function noshowToken(params,callback){
    var token=uni.getStorageSync('token');
    var url=laravel_api+params.url;
    var mytype=params.type||'GET';
    var data=params.data || {};
    uni.request({
        url,
        method: mytype,
        data,
        header: {
            'AUTHORIZATION':token
        },

        success: res => {
            var resdata=res.data;
            if(resdata.type==999){
                uni.removeStorageSync('token');
                uni.navigateTo({
                    url:'/pages/mine/login'
                })
            }else if(resdata.type=='998'){
                uni.navigateTo({
                    url:'/pages/mine/real_authentication'
                })
            }else if(resdata.type=='997'){
                uni.navigateTo({
                    url:'/pages/mine/collect_money'
                })
            }else if(resdata.type=='ok'){
                callback&&callback(resdata.message,resdata.message)
            }
            else{
                showLayer(resdata.message);
            }
        },
        fail: () => {
        },
        complete: (err) => {
            if(err.statusCode == 500){
                showLayer('The server is out of order, it is being repaired, please be patient');
            }
        }
    });
}

function getGlobalSettting(params,callback){
    var url=laravel_api+params.url;
    var mytype=params.type||'GET';
    var data=params.data || {};

    uni.request({
        url,
        method: mytype,
        data,
        header: {
            'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
        },
        success: res => {
            // uni.hideLoading();
            var resdata=res.data;
            // console.log(res);
            callback&&callback(resdata);
        },
        fail: (err) => {
            // console.log(err)
        },
        complete: () => {
            setTimeout(function() {
                uni.hideLoading();
            }, 1000);
        }
    });
}
function getAddressOnline(params,callback){
    var token=uni.getStorageSync('token');
    // var lang=uni.getStorageSync('lang');
    var url=domain+'/'+params.url;
    var mytype=params.type||'GET';
    var data=params.data || {};
    // console.log(url)
    // console.log(data);
    uni.request({
        url,
        method: mytype,
        data,
        header: {
            'content-type':'application/x-www-form-urlencoded'
        },
        success: res => {
            // uni.hideLoading();
            var resdata=res.data;
            // console.log(JSON.stringify(res));
            callback&&callback(resdata);
        },
        fail: (err) => {
            // console.log(err)
        },
        complete: () => {

        }
    });
}
const addNewAddr=(data)=>{
    var addrList=JSON.parse(uni.getStorageSync('address_list'));
    addrList.push(data);
    uni.setStorageSync('address_list',JSON.stringify(addrList))
}
const getLocalAddrs=(filterName,flag=true)=>{
    var addrList=JSON.parse(uni.getStorageSync('address_list')) ;
    return addrList.filter(item=>{
        return item[filterName]==flag;
    });
}
const accMul=(arg1, arg2) =>{
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
const filterDecimals=(value,number=2)=>{
    let val=value-0;
    let num=number-0;
    let base='1';
    let decimal=base.padEnd(num+1,0)-0;
    let result=accMul(val,decimal);
    return (Math.floor(result)/decimal).toFixed(num);
}
const setThemeTop=(theme)=>{
    if(theme=='dark'){
        uni.setNavigationBarColor({
            frontColor:"#ffffff",
            backgroundColor:"#0F0E13"
        })
    }else{
        uni.setNavigationBarColor({
            frontColor:"#000000",
            backgroundColor:"#ffffff"
        })
    }
}

const setThemeBottom=(theme)=>{
    if(theme=='dark'){
        uni.setTabBarStyle({
            color: '#999999',
            selectedColor: '#EFA505',
            backgroundColor: '#0F0E13',
            borderStyle: 'black'
        })
    }else{
        uni.setTabBarStyle({
            color: '#999999',
            selectedColor: '#EFA505',
            backgroundColor: '#0F0E13',
            borderStyle: 'black'
        })
    }
}


export default{
    checkMobile,
    checkEmail,
    showLayer,
    initData,
    initDataToken,
    addNewAddr,
    getLocalAddrs,
    filterDecimals,
    mainName,
    noshowToken,
    getGlobalSettting,
    getAddressOnline,
    accMul,
    setThemeTop,
    setThemeBottom,
}
