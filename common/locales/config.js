import Vue from "vue"
// i18n部分的配置
// 引入语言包，注意路径
import zh from './zh.js';
import en from './en.js';
import hk from './hk.js';
import th from './th.js';
import jp from './jp.js';
import kor from './kor.js';
import fra from './fra.js';
import spa from './spa.js';


import vi from './vi.js';
import id from './id.js';

import de from './de.js';
import ydl from './ydl.js';
import yn from './yn.js';

// VueI18n
import VueI18n from '@/common/vue-i18n.min.js';

// VueI18n
Vue.use(VueI18n);

const i18n = new VueI18n({
	// 默认语言
	locale: uni.getStorageSync('lang') || 'en',
	// 引入语言文件
	messages: {
		'zh':zh,
		'en':en,
		'hk':hk,
		'th':th,
		'jp':jp,
		'kor':kor,
		'fra':fra,
		'spa':spa,
		'vi':vi,
		'id':id,
		'de':de,
		'ydl':ydl,
		'yn':yn
	}
});

export default i18n
