
const langs = [
	{
		name:'English',
		value:'en'
	},
	{
		name:'简体中文',
		value:'zh'
	},
	{
		name:'繁体中文',
		value:'hk'
	},

	{
		name:'ไทย',//泰语
		value:'th'
	},
	{
		name:'Tiếng Việt',//越南语
		value:'vi'
	},
	{
		name:'Bahasa Indonesia',//印尼语
		value:'id'
	},
	{
		name:'日本語',
		value:'jp'
	},
	{
		name:'한국어',
		value:'kor'
	},
	{
		name:'Français',
		value:'fra'
	},
	{
		name:'Español',
		value:'spa'
	},
]

const currencys = [
	{
		name:'CNY',
		image:require('static/image/icon/national-flag-1.gif'),
		symbol:'￥'
	},
	{
		name:'HKD',
		image:require('static/image/icon/national-flag-3.gif'),
		symbol:'HK$'
	},
	{
		name:'USD',
		image:require('static/image/icon/national-flag-2.gif'),
		symbol:'$'
	},
	{
		name:'AED',
		image:require('static/image/icon/national-flag-4.gif'),
		symbol:'￥'
	}
]



export {
	langs,
	currencys
}
