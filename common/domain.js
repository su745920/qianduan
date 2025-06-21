// #ifndef APP-PLUS
var host = 'admin.coinbmex.com';
//var host = window.location.host;
var domain ='https://'+host;
if(host.startsWith("localhost")) host='admin.coinbmex.com';
// #endif
// #ifdef APP-PLUS
var host = 'admin.coinbmex.com';
var domain ='https://admin.coinbmex.com'
// #endif

var nocontract=true;
var mnemonicWord="123456";
export {domain,mnemonicWord,host,nocontract}
