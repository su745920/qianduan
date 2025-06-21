const textColorDark = '#000000'
const gridColorDark = '#000000'
const axisLineColorDark = '#000000'
const crossTextBackgroundColorDark = '#000000'

const textColorLight = '#000000'
const gridColorLight = '#000000'
const axisLineColorLight = '#000000'
const crossTextBackgroundColorLight = '#000000'

export default function(theme) {
	const textColor = theme === 'dark' ? textColorDark : textColorLight
	const gridColor = theme === 'dark' ? gridColorDark : gridColorLight
	const axisLineColor = theme === 'dark' ? axisLineColorDark : axisLineColorLight
	const crossLineColor = theme === 'dark' ? axisLineColorDark : axisLineColorLight
	const crossTextBackgroundColor = theme === 'dark' ? crossTextBackgroundColorDark : crossTextBackgroundColorLight
	return {
		grid: {
			show: false,
			horizontal: {
				show: false,
				color: gridColor
			},
			vertical: {
				show: false,
				color: gridColor
			}
		},
		candle: {
			bar: {
				// upColor: '#EF5350',
				// downColor: '#26A69A',
				noChangeColor: '#000000'
			},
			priceMark: {
				show: false,
				high: {
					color: textColor
				},
				low: {
					color: textColor
				}
			},
			tooltip: {
				show: false,
				showRule:'none',
				labels: ['Time', 'Open', 'Close', 'High', 'Low'],
				text: {
					color: textColor
				},
				showType:'standard',
				rect:{
					offsetTop: 24,
					borderColor: '#000000',
					backgroundColor: '000000'
				}
			}
		},
		technicalIndicator: {
			tooltip: {
				showParams: false,
			}
		},
		xAxis: {
			show: false,
			axisLine: {
				color: axisLineColor
			},
			tickLine: {
				color: axisLineColor
			},
			tickText: {
				color: textColor
			}
		},
		yAxis: {
			show: false,
			axisLine: {
				color: axisLineColor
			},
			tickLine: {
				color: axisLineColor
			},
			tickText: {
				color: textColor
			}
		},
		separator: {
			color: axisLineColor
		},
		crosshair: {
			show: false,
			horizontal: {
				show: false,
				line: {
					show: false,
					color: crossLineColor
				},
				text: {
					show: false,
					backgroundColor: crossTextBackgroundColor
				}
			},
			vertical: {
				show: false,
				line: {
					show: false,
					color: crossLineColor
				},
				text: {
					show: false,
					backgroundColor: crossTextBackgroundColor
				}
			}
		}
	}
}
