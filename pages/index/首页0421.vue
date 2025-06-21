<template>
	<view class="home">
		<view class="px-36 d-flex justify-content-between py-24 align-items-center overflow-hidden box-shadow position-relative" style="z-index: 1;">
			<!-- 我的 -->
			<navigator url="/pages/setting/setting">
				<!-- <image src="/static/image/home-icon-1.png" style="width: 43rpx; height: 39rpx;"></image> -->
				<text class="iconfont icon-wode2 font-size-36 text-white font-weight-bold"></text>
			</navigator>
			<!-- 网站标题 -->
      <!--
			<text class="font-size-36 w-75 text-center line-1 linear-gradient-text">{{$store.state.site_name}}</text>
			-->
      <!--
      <svg width="160" height="24" viewBox="0 0 132 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-white"><path d="M108.035 20.3233C107.778 20.3233 107.562 20.2359 107.387 20.0611C107.221 19.8772 107.138 19.6656 107.138 19.4265C107.138 19.1781 107.221 18.9665 107.387 18.7918C107.562 18.617 107.778 18.5296 108.035 18.5296C108.293 18.5296 108.504 18.617 108.67 18.7918C108.845 18.9665 108.932 19.1781 108.932 19.4265C108.932 19.6748 108.845 19.8864 108.67 20.0611C108.504 20.2359 108.293 20.3233 108.035 20.3233Z" fill="currentColor"></path><path d="M110.861 20.1853V12.3132H113.67C114.272 12.3132 114.772 12.4373 115.17 12.6855C115.574 12.9337 115.875 13.2564 116.074 13.6536C116.28 14.0436 116.382 14.4514 116.382 14.8769C116.382 15.3095 116.28 15.7244 116.074 16.1216C115.875 16.5116 115.574 16.8343 115.17 17.0896C114.772 17.3379 114.272 17.462 113.67 17.462H111.904V20.1853H110.861ZM113.67 13.228H111.904V16.5471H113.67C114.046 16.5471 114.358 16.4656 114.606 16.3024C114.854 16.1393 115.038 15.9336 115.159 15.6854C115.287 15.4301 115.35 15.1642 115.35 14.8876C115.35 14.611 115.287 14.345 115.159 14.0897C115.038 13.8344 114.854 13.6287 114.606 13.4727C114.358 13.3096 114.046 13.228 113.67 13.228Z" fill="currentColor"></path><path d="M117.301 20.1853V12.3132H120.088C120.648 12.3132 121.113 12.4231 121.481 12.6429C121.85 12.8628 122.127 13.1465 122.311 13.494C122.496 13.8415 122.588 14.2067 122.588 14.5897C122.588 14.9088 122.524 15.2174 122.396 15.5152C122.269 15.8131 122.077 16.0755 121.822 16.3024C121.574 16.5223 121.258 16.6819 120.875 16.7811L122.864 20.1853H121.684L119.779 16.8769H118.343V20.1853H117.301ZM120.077 13.228H118.343V15.9833H120.077C120.404 15.9833 120.673 15.9159 120.886 15.7812C121.099 15.6464 121.258 15.4762 121.364 15.2705C121.471 15.0578 121.524 14.8379 121.524 14.611C121.524 14.3769 121.471 14.1571 121.364 13.9514C121.258 13.7387 121.099 13.5649 120.886 13.4302C120.673 13.2954 120.404 13.228 120.077 13.228Z" fill="currentColor"></path><path d="M127.335 20.2917C126.711 20.2917 126.161 20.1782 125.686 19.9513C125.211 19.7172 124.813 19.4087 124.494 19.0258C124.175 18.6357 123.934 18.1996 123.771 17.7173C123.608 17.235 123.526 16.7421 123.526 16.2386C123.526 15.7351 123.608 15.2457 123.771 14.7706C123.934 14.2883 124.175 13.8557 124.494 13.4727C124.813 13.0897 125.211 12.7848 125.686 12.5578C126.161 12.3238 126.711 12.2068 127.335 12.2068C127.959 12.2068 128.508 12.3238 128.984 12.5578C129.459 12.7848 129.856 13.0897 130.175 13.4727C130.494 13.8557 130.735 14.2883 130.898 14.7706C131.062 15.2457 131.143 15.7351 131.143 16.2386C131.143 16.7421 131.062 17.235 130.898 17.7173C130.735 18.1996 130.494 18.6357 130.175 19.0258C129.856 19.4087 129.459 19.7172 128.984 19.9513C128.508 20.1782 127.959 20.2917 127.335 20.2917ZM127.335 19.3236C127.782 19.3236 128.175 19.2385 128.516 19.0683C128.856 18.8981 129.14 18.6676 129.367 18.3769C129.601 18.0861 129.778 17.7563 129.898 17.3875C130.019 17.0187 130.079 16.6358 130.079 16.2386C130.079 15.8485 130.019 15.4727 129.898 15.111C129.778 14.7422 129.601 14.4124 129.367 14.1216C129.14 13.8309 128.856 13.6004 128.516 13.4302C128.175 13.26 127.782 13.1748 127.335 13.1748C126.888 13.1748 126.494 13.26 126.154 13.4302C125.813 13.6004 125.526 13.8309 125.292 14.1216C125.065 14.4124 124.892 14.7422 124.771 15.111C124.65 15.4727 124.59 15.8485 124.59 16.2386C124.59 16.6358 124.65 17.0187 124.771 17.3875C124.892 17.7563 125.065 18.0861 125.292 18.3769C125.526 18.6676 125.813 18.8981 126.154 19.0683C126.494 19.2385 126.888 19.3236 127.335 19.3236Z" fill="currentColor"></path><path d="M38.9758 20.3837C37.8355 20.4085 36.7036 20.1833 35.6596 19.7239C34.7604 19.2968 33.9604 18.6864 33.311 17.9319C32.6837 17.1831 32.2017 16.3237 31.8901 15.3978C31.2577 13.5481 31.2577 11.5407 31.8901 9.691C32.1989 8.77026 32.6812 7.91721 33.311 7.178C33.9531 6.41575 34.7549 5.80398 35.6596 5.386C37.5741 4.60338 39.7022 4.51609 41.6743 5.13929C42.3588 5.36102 42.9948 5.71084 43.5486 6.17012C44.0255 6.54579 44.4365 6.99822 44.7649 7.50886C45.0538 7.92376 45.289 8.37359 45.4649 8.84759C45.594 9.1805 45.6907 9.52506 45.7537 9.87651L45.8359 10.259H42.6841C42.6841 10.259 42.6574 10.1691 42.6019 9.99126C42.543 9.75413 42.4529 9.52584 42.3341 9.31233C42.1763 9.01084 41.9673 8.73905 41.7164 8.50908C41.4085 8.21792 41.0439 7.99332 40.6454 7.84928C40.1209 7.64417 39.5597 7.54913 38.9969 7.57005C38.1398 7.54121 37.2981 7.80269 36.6082 8.3121C35.9764 8.79438 35.4813 9.43315 35.1719 10.1653C34.8561 10.9152 34.6948 11.7212 34.6976 12.5349C34.6961 13.3546 34.8573 14.1665 35.1719 14.9236C35.4864 15.6607 35.9825 16.3061 36.6139 16.7997C37.308 17.294 38.1452 17.5467 38.9969 17.5188C39.5585 17.5361 40.1182 17.4452 40.6454 17.251C41.0435 17.1069 41.4079 16.883 41.7164 16.5932C41.9604 16.357 42.1685 16.0863 42.3341 15.7899C42.4486 15.5737 42.5385 15.3453 42.6019 15.1091C42.6574 14.9312 42.6841 14.8413 42.6841 14.8413H45.8359L45.7537 15.2544C45.6872 15.6051 45.5906 15.9493 45.4649 16.2833C45.2834 16.7548 45.0485 17.204 44.7649 17.6221C44.4294 18.1272 44.0193 18.5786 43.5486 18.9608C42.9882 19.4104 42.3541 19.7592 41.6743 19.9916C40.8031 20.2722 39.8909 20.4047 38.9758 20.3837V20.3837Z" fill="currentColor"></path><path d="M53.0267 20.3836C51.8027 20.3836 50.7655 20.1223 49.9151 19.5995C49.0897 19.092 48.4144 18.3738 47.9586 17.5187C47.5181 16.6516 47.2919 15.6915 47.2988 14.7189C47.2901 13.7522 47.5165 12.7978 47.9586 11.9381C48.4069 11.0777 49.0839 10.3576 49.9151 9.85732C50.7668 9.32182 51.804 9.05408 53.0267 9.05408C54.2494 9.05408 55.286 9.32182 56.1364 9.85732C56.9652 10.3541 57.6362 11.0756 58.0718 11.9381C58.5268 12.7939 58.7608 13.7497 58.7527 14.7189C58.759 15.6939 58.5251 16.6555 58.0718 17.5187C57.6287 18.376 56.9594 19.0956 56.1364 19.5995C55.286 20.1223 54.2494 20.3836 53.0267 20.3836ZM53.0267 17.8285C53.5222 17.8459 54.0087 17.6934 54.4056 17.3963C54.7952 17.1025 55.1005 16.7114 55.2911 16.2622C55.4992 15.7745 55.6047 15.2491 55.6009 14.7189C55.6076 14.1877 55.502 13.6611 55.2911 13.1736C55.1 12.7247 54.7947 12.3337 54.4056 12.0395C54.0083 11.7432 53.5221 11.5908 53.0267 11.6072C52.5226 11.5915 52.0275 11.7435 51.6191 12.0395C51.2305 12.3342 50.9254 12.7251 50.7336 13.1736C50.5361 13.6645 50.438 14.1897 50.4449 14.7189C50.4407 15.2471 50.5387 15.7712 50.7336 16.2622C50.9249 16.711 51.2302 17.1019 51.6191 17.3963C52.0261 17.6959 52.5216 17.8508 53.0267 17.8362V17.8285Z" fill="currentColor"></path><path d="M62.4379 8.5186C62.1914 8.52826 61.9454 8.48744 61.7152 8.39865C61.485 8.30985 61.2754 8.17496 61.0992 8.00223C60.7691 7.66304 60.5845 7.20847 60.5845 6.73521C60.5845 6.26196 60.7691 5.80738 61.0992 5.46819C61.2726 5.29052 61.4813 5.15109 61.7119 5.05887C61.9425 4.96665 62.1898 4.92367 62.4379 4.9327C62.6827 4.92748 62.926 4.97228 63.1529 5.06436C63.3798 5.15644 63.5856 5.29385 63.7575 5.46819C63.9269 5.63288 64.0616 5.82986 64.1535 6.04748C64.2454 6.26511 64.2928 6.49896 64.2928 6.73521C64.2928 6.97146 64.2454 7.20531 64.1535 7.42294C64.0616 7.64057 63.9269 7.83755 63.7575 8.00223C63.5829 8.1717 63.3763 8.30465 63.1497 8.39331C62.9231 8.48197 62.6811 8.52457 62.4379 8.5186Z" fill="currentColor"></path><path d="M64.0045 9.25879H60.8738V20.1772H64.0045V9.25879Z" fill="currentColor"></path><path d="M66.2632 20.1772V9.25882H69.3939V10.8251H69.4972C69.6524 10.5618 69.8317 10.3134 70.0327 10.0831C70.3096 9.78684 70.6373 9.54264 71.0004 9.3621C71.4918 9.13998 72.0279 9.03459 72.5667 9.05419C73.4184 9.05419 74.112 9.25309 74.6475 9.65088C75.1768 10.027 75.5849 10.5495 75.8218 11.1541C76.0691 11.7613 76.1951 12.411 76.1928 13.0666V20.1734H73.0621V13.6059C73.0701 13.1108 72.9178 12.6265 72.6279 12.2251C72.3544 11.8273 71.9069 11.6284 71.2892 11.6284C70.8893 11.6045 70.4937 11.7208 70.1704 11.9573C69.8952 12.1771 69.6877 12.4701 69.5718 12.8027C69.4455 13.1529 69.3808 13.5224 69.3805 13.8947V20.1772H66.2632Z" fill="currentColor"></path><path d="M82.4426 20.1773V7.70022H77.7666V4.93286H90.2915V7.70022H85.6154V20.183L82.4426 20.1773Z" fill="#00D770"></path><path d="M92.0681 20.1771V4.93273H98.2493C99.2441 4.90458 100.232 5.10958 101.133 5.53133C101.898 5.88908 102.541 6.46115 102.986 7.17798C103.433 7.91032 103.659 8.75534 103.639 9.61257C103.658 10.549 103.391 11.469 102.874 12.2499C102.343 13.0078 101.586 13.5778 100.711 13.8774L104.027 20.1886H100.514L97.4862 14.3173H95.2409V20.1886L92.0681 20.1771ZM98.2072 7.67332H95.2409V11.7163H98.2072C98.9072 11.7163 99.4579 11.5251 99.8557 11.1426C100.049 10.9607 100.202 10.7403 100.305 10.4955C100.408 10.2507 100.458 9.98702 100.452 9.72159C100.46 9.45192 100.411 9.18368 100.308 8.93426C100.205 8.68484 100.051 8.45983 99.8557 8.27384C99.4579 7.87221 98.9072 7.67332 98.2072 7.67332Z" fill="#00D770"></path><path opacity="0.6" d="M12.5901 6.14868C13.5978 6.34204 14.5449 6.77243 15.3534 7.40428C16.1618 8.03612 16.8083 8.85129 17.2393 9.7824C17.3082 9.92584 17.3713 10.075 17.4306 10.228L23.168 8.14149C22.9947 7.67715 22.7936 7.22371 22.5656 6.78363L18.0464 9.38652L18.0101 9.32532C17.4572 8.37347 16.6676 7.58076 15.7179 7.02415C14.7682 6.46754 13.6907 6.16596 12.5901 6.14868V6.14868Z" fill="#00D770"></path><path opacity="0.6" d="M23.1641 16.872L17.4267 14.7855C17.3693 14.9366 17.3062 15.0858 17.2354 15.2311C16.8038 16.1619 16.1572 16.9767 15.3489 17.6085C14.5405 18.2403 13.5936 18.6709 12.5862 18.8649C13.6881 18.8478 14.7668 18.5458 15.7173 17.9881C16.6677 17.4304 17.4576 16.6361 18.01 15.6825L18.0463 15.6194L22.5674 18.2299C22.7937 17.7898 22.993 17.3364 23.1641 16.872V16.872Z" fill="#00D770"></path><path opacity="0.2" d="M16.5695 14.3935C16.5294 14.5292 16.4873 14.6516 16.4433 14.7664C16.1136 15.6553 15.5917 16.4606 14.915 17.1247C14.2383 17.7889 13.4234 18.2955 12.5285 18.6086C12.2901 18.6934 12.0467 18.7636 11.7998 18.8189C12.0318 18.8059 12.2629 18.7804 12.4921 18.7424C13.4923 18.5618 14.4343 18.143 15.2386 17.5215C16.0428 16.9001 16.6856 16.0941 17.1127 15.1718C17.1873 15.0093 17.258 14.8391 17.3192 14.6708L17.3441 14.6038L22.2687 16.3958C22.4445 15.8564 22.5831 15.3056 22.6837 14.7473L16.7397 13.6992C16.6963 13.9337 16.6395 14.1655 16.5695 14.3935V14.3935Z" fill="#00D770"></path><path opacity="0.2" d="M22.2668 8.60626L17.3441 10.4059L17.3192 10.339C17.2583 10.1685 17.1888 10.0013 17.1108 9.8379C16.6834 8.9169 16.0406 8.11231 15.2367 7.49215C14.4328 6.872 13.4914 6.4545 12.4921 6.27495C12.263 6.23444 12.0319 6.20634 11.7998 6.1908C12.0467 6.24609 12.2901 6.31634 12.5285 6.40117C13.4242 6.71373 14.2398 7.22016 14.9172 7.88432C15.5946 8.54848 16.117 9.35399 16.4471 10.2433C16.4911 10.3581 16.5332 10.4805 16.5734 10.6163C16.6429 10.8444 16.6997 11.0761 16.7436 11.3105L22.6876 10.2644C22.5859 9.70261 22.4453 9.14857 22.2668 8.60626Z" fill="#00D770"></path><path d="M23.2998 6.19071C22.1986 4.30503 20.6222 2.74105 18.7279 1.65479C16.8335 0.568529 14.6875 -0.00203807 12.5038 5.47008e-06C12.324 5.47008e-06 12.1462 5.47067e-06 11.976 0.0114804C11.8058 0.0229553 11.6336 0.0286927 11.4443 0.0439926H11.3774C11.0522 0.0726798 10.7195 0.116667 10.3924 0.172129C7.78992 0.616276 5.39499 1.87341 3.55129 3.76316C1.70758 5.6529 0.509887 8.07811 0.130054 10.6908C-0.0433514 11.8907 -0.0433514 13.1093 0.130054 14.3092C0.511569 16.9212 1.70982 19.3455 3.55322 21.2349C5.39663 23.1244 7.79064 24.3821 10.3924 24.8279C10.7195 24.8852 11.0503 24.9273 11.3774 24.956H11.4481C11.6279 24.9713 11.8058 24.9828 11.976 24.9885C12.1462 24.9943 12.324 25 12.5038 25C14.6866 25.003 16.832 24.4339 18.7262 23.3493C20.6205 22.2648 22.1974 20.7027 23.2998 18.8188L18.0978 15.8162C17.5202 16.7854 16.7012 17.5883 15.7208 18.1467C14.7404 18.7051 13.6321 18.9999 12.5038 19.0024C12.2584 19.0027 12.0132 18.9886 11.7694 18.9604C11.6356 18.947 11.4959 18.9259 11.3582 18.9011H11.3449C11.0087 18.8415 10.6781 18.7545 10.3561 18.641C9.38479 18.3018 8.5081 17.7365 7.79846 16.9916C7.08881 16.2467 6.56657 15.3436 6.27486 14.357C6.16807 14.0004 6.09318 13.6349 6.0511 13.265C5.99245 12.7612 5.99245 12.2522 6.0511 11.7484C6.15412 10.872 6.43528 10.0259 6.87729 9.26216C7.34841 8.44445 7.99252 7.73955 8.76454 7.19679C9.53656 6.65402 10.4179 6.28651 11.3468 6.11995H11.3582C11.4979 6.09509 11.6356 6.07405 11.7694 6.06067C12.0132 6.03241 12.2584 6.01836 12.5038 6.01859C13.631 6.01953 14.7388 6.31245 15.7192 6.86883C16.6995 7.4252 17.519 8.22604 18.0978 9.19331L23.2998 6.19071Z" fill="#00D770"></path></svg>
      -->

      <!-- 扫一扫，站内信，联系客服 -->
			<text class="iconfont icon-icon_A text-white font-size-36" @click="showLanguage=true"></text>
		</view>



		<!-- 导航 -->
		<view class="mt-24 position-relative" style="z-index: 1;margin: 0;padding: 0;">
			<view class="d-flex align-items-center text-white px-36" style="opacity: .3;">
				<text class="mr-16">{{i18n.totalAssetsEquivaleng}}</text>
				<text class="mr-26">({{$store.state.fiat.currency_code}})</text>
				<!-- <text class="iconfont icon-yanjing_xianshi" style="position: relative;top: 4rpx;"></text> -->
			</view>
			<view class="d-flex justify-content-between text-white align-items-center mt-6 px-36">
				<text class="font-size-56">{{(convert * $store.state.fiat.rate).toFixed(2)}}</text>
				<text class="iconfont icon-gengduo1"></text>
			</view>

      <!-- 广告 -->
      <view class="mt-22" v-if="swiper.length">
        <swiper :indicator-dots="false" :autoplay="true" :interval="4000" style="height: 200rpx;">
          <swiper-item v-for="item in swiper" >
            <image :src="item.image" style="width: 100%;height: 200rpx;" mode="aspectFill"></image>
          </swiper-item>
        </swiper>
        <!-- <u-swiper :list="swiper" border-radius="20" height="200" indicator-pos="bottomRight" :interval="3000" img-mode="aspectFill">
        </u-swiper> -->
      </view>
      <!-- 公告 -->
      <view class="mt-22">
        <u-notice-bar mode="vertical" :list="news" bg-color="#222222" color="#ffffff" border-radius="0" :duration="3000" @click="clickNoticeBar">
        </u-notice-bar>
      </view>

			<swiper style="height: 312rpx;width: 100%;margin: 0;padding: 0;" class="bg-black text-white  mt-18"
              :autoplay="false" :indicator-dots="false" :indicator-active-color="$downColor">
				<swiper-item v-for="(el,index) in homeNav">
					<view class="py-10" style="height: 312rpx;width: 100%;">
						<view class="d-flex flex-wrap" style="width: 100%;">
							<view v-for="item in homeNav[index]" @click="homeNavJump(item.url,item.open_type)"
								class="w-25 text-center py-22" :key="item.icon">
								<image :src="`../../static/image/icon/${item.icon}.png`" class="d-block mx-auto" style="width: 46rpx;height: 46rpx;" mode="">
								</image>
								<text class="d-block font-size-22 mt-16">{{item.name}}</text>
							</view>
						</view>
					</view>
				</swiper-item>
				<data-loading v-if="!homeNav.length"></data-loading>
			</swiper>
		</view>





    <!-- 行情二 -->
    <view class="mt-20 px-36" style="background: #222222;">

      <view class="mt-20 high-quality-project">
        <swiper style="height: 360rpx;" :acceleration="true" :display-multiple-items="3" :indicator-dots="false"
                @change="gupiaoSwiperChange"
                indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="rgba(7, 193, 96, 0.7)"
                :autoplay="false" :circular="false">
          <swiper-item v-for="(item,index) in quotation">
            <navigator class="high-quality-project-item text-center overflow-hidden w-100 pt-40"
                       style="box-sizing: border-box;" open-type="reLaunch"
                       :url="`/pages/transaction/index?from=index&currency_name=${item.currency_name}&legal_name=${item.legal_name}&currency_id=${item.currency_id}`">

              <view class="text-left pl-30 text-white" style="margin-top: -30rpx;">
                <view style="display: flex;">
                  <text class="font-size-26 d-block " style="flex: 1;height: 20px;line-height: 20px;">{{item.currency_name + '/' + item.legal_name}}</text>
                  <text class="d-block font-size-18 mt-6" :style="{color:$utils.getColor(item.change)}"
                        style="width: 80px;height:16px;line-height:16px;margin-top: 2px;font-weight: 300;">{{item.change + '%'}}</text>
                </view>


                <text class="d-block font-size-44 font-weight-bold mt-16 " :style="{color:$utils.getColor(item.change)}">{{item.now_price}}</text>
              </view>
              <view class="" style="height: 100rpx;margin-top: 16px;margin: 10px;padding:0px;">
                <qiun-data-charts type="area" :chartData="item.chartData"
                                  fontColor="#ffffff"
                                  :errorShow="false" background="none" :tooltipShow="false" :tapLegend="false" />
              </view>
            </navigator>
          </swiper-item>
        </swiper>
        <view class="gupiao-swiper-dots" style="margin-top: -60px;padding-bottom: 10px;">
          <text v-for="(item,index) in hqNums" class="gupiao-swiper-dot"
                :class="{'active' : activeGupiaoDot == index}"></text>
        </view>
      </view>
    </view>

		<!-- 快捷买币 -->
		<view
			class="mt-20 box-shadow bg-black text-white border-radius-10 py-20 px-40 d-flex align-items-center justify-content-between"
			@click="$utils.jump('/pages/fund/select?url=receive')">
			<view class="d-flex align-items-center">
				<image src="/static/image/icon/home-icon-6.png" style="width: 81rpx; height: 59rpx;"></image>
				<view class="ml-10">
					<text class="d-block font-size-32">{{i18n.quicklyBuyCoins}}</text>
					<text class="d-block font-size-22"
						style="opacity: .5;">{{$t("common.quickly") + ' ' + $t("common.buy")}} USDT</text>
				</view>
			</view>
			<view class="bg-333 d-flex" style="width: 44rpx;height: 44rpx;border-radius: 50%;align-items: center;justify-content: center;">
				<text class="iconfont icon-yanzhengma text-warning font-size-28"></text>
			</view>
		</view>

		<!-- 优质项目 -->
		<view class="mt-20" style="background: #222222;">
			<view class="d-flex justify-content-between align-items-center">
				<view class="d-flex px-36">
					<view class="home-title-item active text-warning">
						<text style="color: #ffffff;">{{i18n.lockming}}</text>
					</view>
				</view>
				<view class="d-flex align-items-center px-36" @click="$utils.jump('/pages/lockming/welcome')">
					<text class="font-size-32" style="color: #999999;">{{$t("common.more")}}</text>
					<text class="iconfont icon-gengduo1 ml-10" style="color: #999;position: relative;top: .5px;"></text>
				</view>
			</view>
			<view class="mt-20 high-quality-project2 px-36">
				<swiper style="height: 405rpx;" :acceleration="true" :display-multiple-items="2" :indicator-dots="false"
					:autoplay="false" :circular="false">
					<swiper-item v-for="(item,index) in lockming.slice(0,5)">
						<view class="high-quality-project-item" @click="jump2Lockming(item)"  style="border: 1px solid #00c070;padding-bottom: 10px;margin-bottom: 10px;">
							<text class="hige-quality-project-sskc">{{item.day + i18n.day}}</text>
							<view class="mx-auto border-radius-50per d-flex align-items-center justify-content-center" style="width: 80rpx;height: 80rpx;" :style="{backgroundColor:$utils.getCurrencyColor(item.from_name)}">
								<text class="iconfont font-size-48 text-white" :class="`icon-${item.from_name}`" ></text>
							</view>

							<text class="d-block font-size-32 mt-20">{{item.from_name + ' ' +i18n.mining}}</text>
							<text
								class="d-block font-size-28 opacity-50 mt-4">{{Number(item.min_money) + 'USDT' + i18n.minimum}}</text>
							<text
								class="d-block font-size-40 text-error mt-30 font-weight-bold">{{item.intro?item.intro:Number(item.rate_max)+'%'}}</text>
							<text class="d-block font-size-28 mt-2">{{i18n.dailyReturnRate}}</text>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<!-- 超级杠杆 -->

		<!-- 股票 -->
		<view class="mt-32" v-if="false">
			<view class="d-flex justify-content-between align-items-center">
				<view class="d-flex align-items-center">
					<text class="font-size-32 d-block mr-20" style="color: #ffffff;">{{i18n.stock}}</text>
					<text class="font-size-28 d-block opacity-50" v-if="lang == 'zh'"  style="color: #ffffff;">{{i18n.stock_info}}</text>
				</view>
				<view class="d-flex align-items-center">
					<text class="font-size-32">{{i18n.more}}</text>
					<text class="iconfont icon-gengduo1 ml-10" style="color: #999;position: relative;top: .5px;"></text>
				</view>
			</view>

			<swiper style="height: 188rpx;" @change="gupiaoSwiperChange" class="mt-20 gupiao" :acceleration="true"
				:display-multiple-items="3" :indicator-dots="false" :autoplay="false" :circular="false">
				<swiper-item v-for="(item,index) in gupiao" :key="index">
					<view class="gupiao-item" :class="item.num2 >= 0 ? 'up' : 'down'">
						<view class="d-flex justify-content-center align-items-center">
							<text class="code">{{item.code}}</text>
							<text class="font-size-28">{{item.name}}{{index}}</text>
						</view>
						<text class="d-block font-size-36 mt-24 mb-18 font-weight-bold color">
							{{item.num1}}
						</text>
						<view class="d-flex font-weight-bold color">
							<text class="w-50 font-size-22">{{item.num2}}</text>
							<text class="w-50 font-size-22">{{item.num3}}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>

			<view class="gupiao-swiper-dots">
				<text v-for="(item,index) in gupiaoNums" class="gupiao-swiper-dot"
					:class="{'active' : activeGupiaoDot == index}"></text>
			</view>
		</view>



		<!-- 币币行情 -->
		<view class="mt-20 market ">
			<view class="d-flex justify-content-between align-items-center  px-36">
				<view class="d-flex align-items-center ">
					<text class="font-size-32 d-block mr-20 text-warning" style="color: #ffffff;">{{i18n.market}}</text>
				</view>
				<view class="d-flex align-items-center">
					<text class="font-size-32" style="color: #999999;">{{i18n.more}}</text>
					<text class="iconfont icon-gengduo1 ml-10" @click="$utils.jump('/pages/market/market','switchTab')"
						style="color: #999;position: relative;top: .5px;"></text>
				</view>
			</view>
			<view class="px-30 mt-30 box-shadow border-radius-10 p-30 mt-22 text-white bg-black">
				<view class="title d-grid justify-content-between opacity-50 font-size-22"
					style="grid-template-columns:1.2fr 1.2fr .8fr">
					<view class="d-flex align-items-center">
						<text>{{i18n.tradingPair}}</text>
					</view>
					<view class="d-flex align-items-center justify-content-center">
						<text>{{i18n.lastPrice}}</text>
					</view>
					<view class="d-flex align-items-center justify-content-end">
						<text>{{i18n.todayChange}}</text>
						<!-- <image :src="quotationNav[2].sort | sort2Icon" class="ml-8" style="width: 13.6rpx; height: 25.6rpx;">
						</image> -->
					</view>

				</view>
				<navigator class="market-item" v-for="item in quotation.slice(2,7)" open-type="reLaunch"
					:url="`/pages/transaction/index?from=index&currency_name=${item.currency_name}&legal_name=${item.legal_name}&currency_id=${item.currency_id}`">
					<view class="left">
						<text class="d-block">
							<text class="font-size-28 font-weight-bold">{{item.currency_name}}</text>
							<text class="font-size-22 opacity-50">/{{item.legal_name}}</text>
						</text>
						<text class="d-block font-size-22">24H: {{item.volume}}</text>
					</view>
					<view class="center">
						<text class="d-block font-size-28 font-weight-bold"
							:style="{color:$utils.getColor(item.change)}">{{item.now_price}}</text>
						<text class="d-block font-size-22" v-if="$store.state.fiat.currency_code != 'USD'">
							{{(item.now_price * $store.state.fiat.rate).toFixed(2)}} {{$store.state.fiat.currency_code}}
						</text>

					</view>
					<view class="right" :style="{backgroundColor:$utils.getColor(item.change)}">
						{{item.change + '%'}}
					</view>
				</navigator>
			</view>
		</view>

		<!-- 极速汇兑 -->
		<view class="mt-32 jshd" v-if="false">
			<view class="d-flex justify-content-between align-items-center">
				<view class="d-flex align-items-center">
					<text class="font-size-32 d-block mr-10">极速汇兑</text>
					<text class="font-size-28 d-block opacity-50">一键法币汇兑</text>
				</view>
				<view class="d-flex align-items-center">
					<text class="font-size-32">更多</text>
					<text class="iconfont icon-gengduo1 ml-10" style="color: #999;position: relative;top: .5px;"></text>
				</view>
			</view>
			<view class="d-flex my-22 flex-wrap">
				<view class="d-flex jshd-btn">
					<text class="num">1</text>
					<text class="text">一键兑换</text>
				</view>
				<view class="d-flex jshd-btn">
					<text class="num">1</text>
					<text class="text">法币充值</text>
				</view>
				<view class="d-flex jshd-btn">
					<text class="num">1</text>
					<text class="text">法币充值</text>
				</view>
			</view>
			<view class="p-30 box-shadow border-radius-10 p-30 mt-22 jshd-table font-size-22 font-weight-bold">
				<view class="d-flex jshd-table-tr jshd-table-td">
					<view class="w-26">
						<image src="/static/image/icon/national-icon.png"></image>
					</view>
					<view class="w-18_5 text-center">
						<image src="/static/image/icon/national-flag-1.gif"></image>
					</view>
					<view class="w-18_5 text-center">
						<image src="/static/image/icon/national-flag-2.gif"></image>
					</view>
					<view class="w-18_5 text-center">
						<image src="/static/image/icon/national-flag-3.gif"></image>
					</view>
					<view class="w-18_5 text-center">
						<image src="/static/image/icon/national-flag-4.gif"></image>
					</view>
				</view>
				<view class="d-flex align-items-center jshd-table-td">
					<view class="w-26 d-flex align-items-center">
						<image src="/static/image/icon/national-flag-1.gif"></image>
						<text class="ml-8">CNYE</text>
					</view>
					<view class="w-18_5 text-center text-333 ">
						1000
					</view>
					<view class="w-18_5 text-center text-primar">
						1234
					</view>
					<view class="w-18_5 text-center text-primary">
						1567
					</view>
					<view class="w-18_5 text-center text-primary">
						2346
					</view>
				</view>
				<view class="d-flex align-items-center jshd-table-td">
					<view class="w-26 d-flex align-items-center">
						<image src="/static/image/icon/national-flag-2.gif"></image>
						<text class="ml-8">CNYE</text>
					</view>
					<view class="w-18_5 text-center text-333 ">
						1000
					</view>
					<view class="w-18_5 text-center text-primar">
						1234
					</view>
					<view class="w-18_5 text-center text-primary">
						1567
					</view>
					<view class="w-18_5 text-center text-primary">
						2346
					</view>
				</view>
				<view class="d-flex align-items-center jshd-table-td">
					<view class="w-26 d-flex align-items-center">
						<image src="/static/image/icon/national-flag-3.gif"></image>
						<text class="ml-8">CNYE</text>
					</view>
					<view class="w-18_5 text-center text-333 ">
						1000
					</view>
					<view class="w-18_5 text-center text-primar">
						1234
					</view>
					<view class="w-18_5 text-center text-primary">
						1567
					</view>
					<view class="w-18_5 text-center text-primary">
						2346
					</view>
				</view>
			</view>
		</view>

		<!-- 弹出语言选择 -->
		<u-popup v-model="showLanguage" mode="bottom" length="66%" :title="$t('setting.selectLang')">
			<view class="popup-list">
				<view class="popup-list-item" v-for="item in langs" :key="item.value" :class="{active : item.selected}"
					@click="setLang(item)">
					<text>{{item.name}}</text>
				</view>
			</view>
		</u-popup>

		<!-- 客服 -->
		<view class="kefu" @click="$utils.jump('/pages/kefu/index')">
			<image src="../../static/image/icon/home-nav-14.png" style="width: 36rpx;height: 41rpx;"></image>
		</view>

		<!-- 弹窗广告 -->
		<view class="notice-popup">
			<u-popup v-model="showPopAd" width="80%" ref="noticePopup" :mask-close-able="false">
				<view class="notice position-relative">
					<view class="d-flex justify-content-center align-items-center heading">
						<text class="font-size-34 text-white ml-20">{{popupAd.title}}</text>
					</view>
					<view class="p-30">
						<scroll-view class="mt-20 mb-50" :scroll-y="true" style="max-height:350px;">
							<view v-html="popupAd.content"></view>
						</scroll-view>
					</view>
				</view>
				<view class="notice-close">
					<image @click="closeNotice(popupAd.id)" src="../../static/image/icon/close.png" mode="aspectFit" style="width:40px;height:40px"></image>
				</view>
			</u-popup>
		</view>

		<u-popup v-model="showUpdate" border-radius="30" length="500" :mask-close-able="false">
			<view class="update overflow-hidden position-relative">
				<view class="d-flex justify-content-center align-items-center update-bg">
					<image src="../../static/image/icon/update.png" style="width: 74rpx;height: 70rpx;"></image>
					<text class="font-size-34 text-white ml-20">发现新版本</text>
				</view>
				<view class="mx-40 my-30 font-size-22">
					<text class="d-block py-3">1.修复了一些BUG；</text>
					<text class="d-block py-3">2.优化了一部分页面；</text>
				</view>
				<view class="buttons">
					<u-line-progress active-color="#ef324c" class="mb-20" :percent="downProgress" v-if="downProgress"></u-line-progress>
					<view class="d-flex justify-content-between" v-else>
						<button class="btn btn1" @click="showUpdate = false">下次提示</button>
						<button class="btn btn2" @click="downFile">立即更新</button>
					</view>
					<view v-if="downProgress == 100">
						<button class="btn btn2" style="width: 100%;" @click="downInstall">立即安装</button>
					</view>
				</view>

			</view>
		</u-popup>

		<!-- #ifdef H5 -->
		<view class="index-download box-shadow" v-if="showDownload && !hasClickDown" @click="jumpDown">
      <!--
			<image :src="$store.state.logo" style="width: 80rpx;height: 80rpx;border-radius: 20rpx;" mode="aspectFill"></image>
     -->
      <svg width="80" height="13" viewBox="0 0 132 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-white"><path d="M108.035 20.3233C107.778 20.3233 107.562 20.2359 107.387 20.0611C107.221 19.8772 107.138 19.6656 107.138 19.4265C107.138 19.1781 107.221 18.9665 107.387 18.7918C107.562 18.617 107.778 18.5296 108.035 18.5296C108.293 18.5296 108.504 18.617 108.67 18.7918C108.845 18.9665 108.932 19.1781 108.932 19.4265C108.932 19.6748 108.845 19.8864 108.67 20.0611C108.504 20.2359 108.293 20.3233 108.035 20.3233Z" fill="currentColor"></path><path d="M110.861 20.1853V12.3132H113.67C114.272 12.3132 114.772 12.4373 115.17 12.6855C115.574 12.9337 115.875 13.2564 116.074 13.6536C116.28 14.0436 116.382 14.4514 116.382 14.8769C116.382 15.3095 116.28 15.7244 116.074 16.1216C115.875 16.5116 115.574 16.8343 115.17 17.0896C114.772 17.3379 114.272 17.462 113.67 17.462H111.904V20.1853H110.861ZM113.67 13.228H111.904V16.5471H113.67C114.046 16.5471 114.358 16.4656 114.606 16.3024C114.854 16.1393 115.038 15.9336 115.159 15.6854C115.287 15.4301 115.35 15.1642 115.35 14.8876C115.35 14.611 115.287 14.345 115.159 14.0897C115.038 13.8344 114.854 13.6287 114.606 13.4727C114.358 13.3096 114.046 13.228 113.67 13.228Z" fill="currentColor"></path><path d="M117.301 20.1853V12.3132H120.088C120.648 12.3132 121.113 12.4231 121.481 12.6429C121.85 12.8628 122.127 13.1465 122.311 13.494C122.496 13.8415 122.588 14.2067 122.588 14.5897C122.588 14.9088 122.524 15.2174 122.396 15.5152C122.269 15.8131 122.077 16.0755 121.822 16.3024C121.574 16.5223 121.258 16.6819 120.875 16.7811L122.864 20.1853H121.684L119.779 16.8769H118.343V20.1853H117.301ZM120.077 13.228H118.343V15.9833H120.077C120.404 15.9833 120.673 15.9159 120.886 15.7812C121.099 15.6464 121.258 15.4762 121.364 15.2705C121.471 15.0578 121.524 14.8379 121.524 14.611C121.524 14.3769 121.471 14.1571 121.364 13.9514C121.258 13.7387 121.099 13.5649 120.886 13.4302C120.673 13.2954 120.404 13.228 120.077 13.228Z" fill="currentColor"></path><path d="M127.335 20.2917C126.711 20.2917 126.161 20.1782 125.686 19.9513C125.211 19.7172 124.813 19.4087 124.494 19.0258C124.175 18.6357 123.934 18.1996 123.771 17.7173C123.608 17.235 123.526 16.7421 123.526 16.2386C123.526 15.7351 123.608 15.2457 123.771 14.7706C123.934 14.2883 124.175 13.8557 124.494 13.4727C124.813 13.0897 125.211 12.7848 125.686 12.5578C126.161 12.3238 126.711 12.2068 127.335 12.2068C127.959 12.2068 128.508 12.3238 128.984 12.5578C129.459 12.7848 129.856 13.0897 130.175 13.4727C130.494 13.8557 130.735 14.2883 130.898 14.7706C131.062 15.2457 131.143 15.7351 131.143 16.2386C131.143 16.7421 131.062 17.235 130.898 17.7173C130.735 18.1996 130.494 18.6357 130.175 19.0258C129.856 19.4087 129.459 19.7172 128.984 19.9513C128.508 20.1782 127.959 20.2917 127.335 20.2917ZM127.335 19.3236C127.782 19.3236 128.175 19.2385 128.516 19.0683C128.856 18.8981 129.14 18.6676 129.367 18.3769C129.601 18.0861 129.778 17.7563 129.898 17.3875C130.019 17.0187 130.079 16.6358 130.079 16.2386C130.079 15.8485 130.019 15.4727 129.898 15.111C129.778 14.7422 129.601 14.4124 129.367 14.1216C129.14 13.8309 128.856 13.6004 128.516 13.4302C128.175 13.26 127.782 13.1748 127.335 13.1748C126.888 13.1748 126.494 13.26 126.154 13.4302C125.813 13.6004 125.526 13.8309 125.292 14.1216C125.065 14.4124 124.892 14.7422 124.771 15.111C124.65 15.4727 124.59 15.8485 124.59 16.2386C124.59 16.6358 124.65 17.0187 124.771 17.3875C124.892 17.7563 125.065 18.0861 125.292 18.3769C125.526 18.6676 125.813 18.8981 126.154 19.0683C126.494 19.2385 126.888 19.3236 127.335 19.3236Z" fill="currentColor"></path><path d="M38.9758 20.3837C37.8355 20.4085 36.7036 20.1833 35.6596 19.7239C34.7604 19.2968 33.9604 18.6864 33.311 17.9319C32.6837 17.1831 32.2017 16.3237 31.8901 15.3978C31.2577 13.5481 31.2577 11.5407 31.8901 9.691C32.1989 8.77026 32.6812 7.91721 33.311 7.178C33.9531 6.41575 34.7549 5.80398 35.6596 5.386C37.5741 4.60338 39.7022 4.51609 41.6743 5.13929C42.3588 5.36102 42.9948 5.71084 43.5486 6.17012C44.0255 6.54579 44.4365 6.99822 44.7649 7.50886C45.0538 7.92376 45.289 8.37359 45.4649 8.84759C45.594 9.1805 45.6907 9.52506 45.7537 9.87651L45.8359 10.259H42.6841C42.6841 10.259 42.6574 10.1691 42.6019 9.99126C42.543 9.75413 42.4529 9.52584 42.3341 9.31233C42.1763 9.01084 41.9673 8.73905 41.7164 8.50908C41.4085 8.21792 41.0439 7.99332 40.6454 7.84928C40.1209 7.64417 39.5597 7.54913 38.9969 7.57005C38.1398 7.54121 37.2981 7.80269 36.6082 8.3121C35.9764 8.79438 35.4813 9.43315 35.1719 10.1653C34.8561 10.9152 34.6948 11.7212 34.6976 12.5349C34.6961 13.3546 34.8573 14.1665 35.1719 14.9236C35.4864 15.6607 35.9825 16.3061 36.6139 16.7997C37.308 17.294 38.1452 17.5467 38.9969 17.5188C39.5585 17.5361 40.1182 17.4452 40.6454 17.251C41.0435 17.1069 41.4079 16.883 41.7164 16.5932C41.9604 16.357 42.1685 16.0863 42.3341 15.7899C42.4486 15.5737 42.5385 15.3453 42.6019 15.1091C42.6574 14.9312 42.6841 14.8413 42.6841 14.8413H45.8359L45.7537 15.2544C45.6872 15.6051 45.5906 15.9493 45.4649 16.2833C45.2834 16.7548 45.0485 17.204 44.7649 17.6221C44.4294 18.1272 44.0193 18.5786 43.5486 18.9608C42.9882 19.4104 42.3541 19.7592 41.6743 19.9916C40.8031 20.2722 39.8909 20.4047 38.9758 20.3837V20.3837Z" fill="currentColor"></path><path d="M53.0267 20.3836C51.8027 20.3836 50.7655 20.1223 49.9151 19.5995C49.0897 19.092 48.4144 18.3738 47.9586 17.5187C47.5181 16.6516 47.2919 15.6915 47.2988 14.7189C47.2901 13.7522 47.5165 12.7978 47.9586 11.9381C48.4069 11.0777 49.0839 10.3576 49.9151 9.85732C50.7668 9.32182 51.804 9.05408 53.0267 9.05408C54.2494 9.05408 55.286 9.32182 56.1364 9.85732C56.9652 10.3541 57.6362 11.0756 58.0718 11.9381C58.5268 12.7939 58.7608 13.7497 58.7527 14.7189C58.759 15.6939 58.5251 16.6555 58.0718 17.5187C57.6287 18.376 56.9594 19.0956 56.1364 19.5995C55.286 20.1223 54.2494 20.3836 53.0267 20.3836ZM53.0267 17.8285C53.5222 17.8459 54.0087 17.6934 54.4056 17.3963C54.7952 17.1025 55.1005 16.7114 55.2911 16.2622C55.4992 15.7745 55.6047 15.2491 55.6009 14.7189C55.6076 14.1877 55.502 13.6611 55.2911 13.1736C55.1 12.7247 54.7947 12.3337 54.4056 12.0395C54.0083 11.7432 53.5221 11.5908 53.0267 11.6072C52.5226 11.5915 52.0275 11.7435 51.6191 12.0395C51.2305 12.3342 50.9254 12.7251 50.7336 13.1736C50.5361 13.6645 50.438 14.1897 50.4449 14.7189C50.4407 15.2471 50.5387 15.7712 50.7336 16.2622C50.9249 16.711 51.2302 17.1019 51.6191 17.3963C52.0261 17.6959 52.5216 17.8508 53.0267 17.8362V17.8285Z" fill="currentColor"></path><path d="M62.4379 8.5186C62.1914 8.52826 61.9454 8.48744 61.7152 8.39865C61.485 8.30985 61.2754 8.17496 61.0992 8.00223C60.7691 7.66304 60.5845 7.20847 60.5845 6.73521C60.5845 6.26196 60.7691 5.80738 61.0992 5.46819C61.2726 5.29052 61.4813 5.15109 61.7119 5.05887C61.9425 4.96665 62.1898 4.92367 62.4379 4.9327C62.6827 4.92748 62.926 4.97228 63.1529 5.06436C63.3798 5.15644 63.5856 5.29385 63.7575 5.46819C63.9269 5.63288 64.0616 5.82986 64.1535 6.04748C64.2454 6.26511 64.2928 6.49896 64.2928 6.73521C64.2928 6.97146 64.2454 7.20531 64.1535 7.42294C64.0616 7.64057 63.9269 7.83755 63.7575 8.00223C63.5829 8.1717 63.3763 8.30465 63.1497 8.39331C62.9231 8.48197 62.6811 8.52457 62.4379 8.5186Z" fill="currentColor"></path><path d="M64.0045 9.25879H60.8738V20.1772H64.0045V9.25879Z" fill="currentColor"></path><path d="M66.2632 20.1772V9.25882H69.3939V10.8251H69.4972C69.6524 10.5618 69.8317 10.3134 70.0327 10.0831C70.3096 9.78684 70.6373 9.54264 71.0004 9.3621C71.4918 9.13998 72.0279 9.03459 72.5667 9.05419C73.4184 9.05419 74.112 9.25309 74.6475 9.65088C75.1768 10.027 75.5849 10.5495 75.8218 11.1541C76.0691 11.7613 76.1951 12.411 76.1928 13.0666V20.1734H73.0621V13.6059C73.0701 13.1108 72.9178 12.6265 72.6279 12.2251C72.3544 11.8273 71.9069 11.6284 71.2892 11.6284C70.8893 11.6045 70.4937 11.7208 70.1704 11.9573C69.8952 12.1771 69.6877 12.4701 69.5718 12.8027C69.4455 13.1529 69.3808 13.5224 69.3805 13.8947V20.1772H66.2632Z" fill="currentColor"></path><path d="M82.4426 20.1773V7.70022H77.7666V4.93286H90.2915V7.70022H85.6154V20.183L82.4426 20.1773Z" fill="#00D770"></path><path d="M92.0681 20.1771V4.93273H98.2493C99.2441 4.90458 100.232 5.10958 101.133 5.53133C101.898 5.88908 102.541 6.46115 102.986 7.17798C103.433 7.91032 103.659 8.75534 103.639 9.61257C103.658 10.549 103.391 11.469 102.874 12.2499C102.343 13.0078 101.586 13.5778 100.711 13.8774L104.027 20.1886H100.514L97.4862 14.3173H95.2409V20.1886L92.0681 20.1771ZM98.2072 7.67332H95.2409V11.7163H98.2072C98.9072 11.7163 99.4579 11.5251 99.8557 11.1426C100.049 10.9607 100.202 10.7403 100.305 10.4955C100.408 10.2507 100.458 9.98702 100.452 9.72159C100.46 9.45192 100.411 9.18368 100.308 8.93426C100.205 8.68484 100.051 8.45983 99.8557 8.27384C99.4579 7.87221 98.9072 7.67332 98.2072 7.67332Z" fill="#00D770"></path><path opacity="0.6" d="M12.5901 6.14868C13.5978 6.34204 14.5449 6.77243 15.3534 7.40428C16.1618 8.03612 16.8083 8.85129 17.2393 9.7824C17.3082 9.92584 17.3713 10.075 17.4306 10.228L23.168 8.14149C22.9947 7.67715 22.7936 7.22371 22.5656 6.78363L18.0464 9.38652L18.0101 9.32532C17.4572 8.37347 16.6676 7.58076 15.7179 7.02415C14.7682 6.46754 13.6907 6.16596 12.5901 6.14868V6.14868Z" fill="#00D770"></path><path opacity="0.6" d="M23.1641 16.872L17.4267 14.7855C17.3693 14.9366 17.3062 15.0858 17.2354 15.2311C16.8038 16.1619 16.1572 16.9767 15.3489 17.6085C14.5405 18.2403 13.5936 18.6709 12.5862 18.8649C13.6881 18.8478 14.7668 18.5458 15.7173 17.9881C16.6677 17.4304 17.4576 16.6361 18.01 15.6825L18.0463 15.6194L22.5674 18.2299C22.7937 17.7898 22.993 17.3364 23.1641 16.872V16.872Z" fill="#00D770"></path><path opacity="0.2" d="M16.5695 14.3935C16.5294 14.5292 16.4873 14.6516 16.4433 14.7664C16.1136 15.6553 15.5917 16.4606 14.915 17.1247C14.2383 17.7889 13.4234 18.2955 12.5285 18.6086C12.2901 18.6934 12.0467 18.7636 11.7998 18.8189C12.0318 18.8059 12.2629 18.7804 12.4921 18.7424C13.4923 18.5618 14.4343 18.143 15.2386 17.5215C16.0428 16.9001 16.6856 16.0941 17.1127 15.1718C17.1873 15.0093 17.258 14.8391 17.3192 14.6708L17.3441 14.6038L22.2687 16.3958C22.4445 15.8564 22.5831 15.3056 22.6837 14.7473L16.7397 13.6992C16.6963 13.9337 16.6395 14.1655 16.5695 14.3935V14.3935Z" fill="#00D770"></path><path opacity="0.2" d="M22.2668 8.60626L17.3441 10.4059L17.3192 10.339C17.2583 10.1685 17.1888 10.0013 17.1108 9.8379C16.6834 8.9169 16.0406 8.11231 15.2367 7.49215C14.4328 6.872 13.4914 6.4545 12.4921 6.27495C12.263 6.23444 12.0319 6.20634 11.7998 6.1908C12.0467 6.24609 12.2901 6.31634 12.5285 6.40117C13.4242 6.71373 14.2398 7.22016 14.9172 7.88432C15.5946 8.54848 16.117 9.35399 16.4471 10.2433C16.4911 10.3581 16.5332 10.4805 16.5734 10.6163C16.6429 10.8444 16.6997 11.0761 16.7436 11.3105L22.6876 10.2644C22.5859 9.70261 22.4453 9.14857 22.2668 8.60626Z" fill="#00D770"></path><path d="M23.2998 6.19071C22.1986 4.30503 20.6222 2.74105 18.7279 1.65479C16.8335 0.568529 14.6875 -0.00203807 12.5038 5.47008e-06C12.324 5.47008e-06 12.1462 5.47067e-06 11.976 0.0114804C11.8058 0.0229553 11.6336 0.0286927 11.4443 0.0439926H11.3774C11.0522 0.0726798 10.7195 0.116667 10.3924 0.172129C7.78992 0.616276 5.39499 1.87341 3.55129 3.76316C1.70758 5.6529 0.509887 8.07811 0.130054 10.6908C-0.0433514 11.8907 -0.0433514 13.1093 0.130054 14.3092C0.511569 16.9212 1.70982 19.3455 3.55322 21.2349C5.39663 23.1244 7.79064 24.3821 10.3924 24.8279C10.7195 24.8852 11.0503 24.9273 11.3774 24.956H11.4481C11.6279 24.9713 11.8058 24.9828 11.976 24.9885C12.1462 24.9943 12.324 25 12.5038 25C14.6866 25.003 16.832 24.4339 18.7262 23.3493C20.6205 22.2648 22.1974 20.7027 23.2998 18.8188L18.0978 15.8162C17.5202 16.7854 16.7012 17.5883 15.7208 18.1467C14.7404 18.7051 13.6321 18.9999 12.5038 19.0024C12.2584 19.0027 12.0132 18.9886 11.7694 18.9604C11.6356 18.947 11.4959 18.9259 11.3582 18.9011H11.3449C11.0087 18.8415 10.6781 18.7545 10.3561 18.641C9.38479 18.3018 8.5081 17.7365 7.79846 16.9916C7.08881 16.2467 6.56657 15.3436 6.27486 14.357C6.16807 14.0004 6.09318 13.6349 6.0511 13.265C5.99245 12.7612 5.99245 12.2522 6.0511 11.7484C6.15412 10.872 6.43528 10.0259 6.87729 9.26216C7.34841 8.44445 7.99252 7.73955 8.76454 7.19679C9.53656 6.65402 10.4179 6.28651 11.3468 6.11995H11.3582C11.4979 6.09509 11.6356 6.07405 11.7694 6.06067C12.0132 6.03241 12.2584 6.01836 12.5038 6.01859C13.631 6.01953 14.7388 6.31245 15.7192 6.86883C16.6995 7.4252 17.519 8.22604 18.0978 9.19331L23.2998 6.19071Z" fill="#00D770"></path></svg>


      <view class="flex-1 ml-20">
				<text class="d-block font-weight-bold font-size-32">{{$store.state.site_name}} APP</text>
				<text class="d-block mt-10">{{i18n.app_text}}</text>
			</view>
			<button class="warning-button py-0 px-30 font-size-26 text-white ml-20">{{i18n.download}}</button>
			<u-icon name="close" class="close ml-20" @click="showDownload=false"></u-icon>
		</view>
		<!-- #endif -->

	</view>
</template>

<script>
	import {
		langs,
		currencys
	} from "./../setting/data.js"
	import {
		gupiao,
		coinCurrencyMarket
	} from './data.js'
	export default {
		data() {
			return {
				lang: '',
				swiper: [],
				activeHighQualityProject: 0,
				gupiao,
				activeGupiaoDot: 0,
				coinCurrencyMarket,
				quotationNav: [{
						name: this.$t("home.tradingPair"),
						sort: 'none',
						align: 'text-left'
					},
					{
						name: this.$t("home.lastPrice"),
						sort: 'none',
						align: 'justify-content-center',
					},
					{
						name: this.$t("home.todayChange"),
						sort: 'none',
						align: 'justify-content-end'
					}
				],
				quotation: [],
				quotationOriginal: [],
				langs: null,
				showLanguage: false,
				originalNew: [],
				news: [],
				getQuotationInterval: null,
				popupAd: {},
				showPopAd: false,
				convert: 0, //总资产折合,
				lockming: [], //锁仓挖矿的项目,
				showUpdate:false,
				downProgress:0,
				tempFilePath:null,
				downType:'wgt',
				homeNav:[],
				showDownload:true,
				hasClickDown:false,//是否已经点击过下载
			};
		},

		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$store.state.site_name
			})

			// #ifdef APP-PLUS
				//检查更新
				this.checkUpdate()
			// #endif


			// 获取首页公告
			this.getNews()

			// 获取首页公告
			this.getBanner()

			//获取弹窗广告
			this.getPopupAd()

			//获取首页行情
			this.getQuotation()

			//获取首页菜单
			this.getMenu()

			//设置默认语言
			this.setDefaultLang()

			//获取锁仓挖矿的项目
			this.getLockming()

			//刷新个人用户
			this.$store.state.token && this.getUserInfo()

		},
		onShow() {
			this.hasClickDown = uni.getStorageSync('hasClickDown') || false

			//uni.showTabBar()
			this.$utils.setTabbar(this)

			//获取总资产
			this.getWalletList()

			this.lang = this.$store.state.lang || 'en'
		},
		methods: {

			//检查更新
			checkUpdate(){
				this.$u.api.common.getSetting('version').then(res=>{
					const version = res.message.value.split(',')
					// version[0]:更新方式,wgt还是apk,version[1]:最新的版本号
					this.checkHotUpdate(version[0],version[1])
				})
			},
			//获取个人信息
			getUserInfo(){
				this.$u.api.setting.getUserInfo().then(res=>{
					this.$store.commit('refreshUser',res.message)
				})
			},
			//获取首页菜单
			getMenu(){
				const {i18n} = this
				this.$u.api.index.getMenu().then(res=>{
					let list = res.message
					list.forEach(item => {
						item.name = i18n[item.title]
					})
					let newList = [],index = 0
					for(let i = 0; i < list.length ; i++){
						// console.log(0 * index , 8 * index + 8);
						newList[index] = list.slice( 8 * index, 8 * index + 8)
						index = index + 1
						i = (i + 1) * 8 -1
					}
					//将list已8个为一组分组

					this.homeNav = newList

				})
			},
			//检测更新
			checkHotUpdate(type,version) {
				plus.runtime.getProperty(plus.runtime.appid, async (widgetInfo) => {
					const appVersion = widgetInfo.versionCode
					//如果线上的版本号高于此app的版本号，则提示下载更新
					if(version > appVersion){
						this.showUpdate = true
						this.downType = type
					}
				})
			},
			downFile(){
				this.$u.throttle(()=>{
					const _this = this
					const downUrl = `https://exchange.jinyun.io/ff/app.${this.downType}`
					const downloadTask  = uni.downloadFile({
						url: downUrl,
						success: (downloadResult) => {
							if (downloadResult.statusCode === 200) {
								this.tempFilePath = downloadResult.tempFilePath
							}
						}
					});

					downloadTask.onProgressUpdate((res) => {
						this.downProgress = res.progress
					});
				},1200)
			},
			downInstall(){
				const tempFilePath = this.tempFilePath
				plus.runtime.install(tempFilePath, {
					force: true
				}, function() {
					console.log('install success...');
					plus.runtime.restart();
				}, function(e) {
					console.log(e);
					console.error('install fail...');
				});
			},

			getLockming() {
				this.$u.api.lockming.getLockming().then(res => {
					this.lockming = res.message
				})
			},
			//获取总资产
			getWalletList() {
				const token = this.$store.state.token
				if(!token) return
				this.$u.api.wallet.getWalletList().then(res => {
          const convert = Number(res.message.change_wallet.totle) + Number(res.message.lever_wallet
              .totle) + Number(res.message.legal_wallet.totle) + Number(res.message
              .micro_wallet.totle);
					this.convert = convert.toFixed(4)
				})
			},
			// 获取弹窗广告
			getPopupAd() {
				this.$u.api.index.getPopupAd().then(res => {
					if (res.message) {
						let hasCloseNotice = uni.getStorageSync('hasCloseNotice_' + res.message.id) || false;
						if (!hasCloseNotice) {
							this.popupAd = res.message
							this.showPopAd = true
						}
					}
				})
			},
			// 获取首页公告
			getNews() {
				this.$u.api.index.getNews().then(res => {
					this.originalNew = res.message.list
					this.news = res.message.list.map(el => el.title)

				})
			},
			// 获取首页轮播图
			getBanner() {
				this.$u.api.index.getBanner().then(res => {
					this.swiper = res.message.list.map(el => {
						el.image =   el.cover
						return el
					})
				})
			},
			// 获取行情
			getQuotation() {
				const from = Date.parse(new Date()) / 1000 - 1 * 60 * 60
				const to = Date.parse(new Date()) / 1000

				this.$u.api.index.getQuotation().then(async res => {
					this.quotationOriginal = res.message[0].quotation.slice(0, 7)
					//对quotation进行排序检测
					let quotation = this.quotationOriginal.sort((a, b) => Number(a.sort) - Number(b.sort))

					for(let i = 0; i < quotation.length; i++){
						let item = quotation[i]
						const ret = await this.$u.api.market.getHistoryData(from, to, item.currency_name + '/' + item.legal_name, '1min')
						item.chartData = {
							series:[{
								name:'area',
								data: ret.data.map(item => item.close)
							}],
							categories:ret.data.map(item => item.time)
						}
					}
					this.quotation = quotation
					//this.sort('quotation')
					this.startSocket()
				})
			},
			//接收socket数据
			startSocket() {
				const _this = this
				let quotation = this.quotation
				this.$store.state.socket.on('daymarket', res => {
					const has = quotation.findIndex(item => item.currency_id == res.currency_id)
					if (has > -1) {
						res.volume = Number(res.volume).toFixed(5)
						const item = {
							...quotation[has],
							...res
						}
						quotation.splice(has, 1, item)
					}
					this.quotation = quotation

				});
			},
			//设置默认语言
			setDefaultLang() {
				let langsData = langs.map(el => {
					el.selected = false
					return el
				})
				const lang = uni.getStorageSync('lang') || 'en'
				const has = langsData.findIndex(item => item.value == lang)
				langsData[has].selected = true
				this.langs = langsData
				this.getMenu()
				this.getNews()
				this.getBanner()
			},
			setLang(item) {
				let langs = this.langs.map(el => {
					el.selected = false
					if (el.value == item.value) el.selected = true
					return el
				})
				this.langs = langs
				this._i18n.locale = item.value
				this.lang = item.value
				uni.setStorageSync('lang', item.value)
				this.$store.commit('setLang',item.value)
				this.$utils.setTabbar(this)

				// 獲取通知
				this.getPopupAd();
				setTimeout(() => {
					this.showLanguage = false
				}, 200)
			},
			gupiaoSwiperChange(e) {
				this.activeGupiaoDot = e.detail.current;
			},
			changeNavSort(opt, index, listName) {
				let data = JSON.parse(JSON.stringify(this[opt]))
				//先将其所有的都置为none
				data.forEach((el, ii) => {
					if (ii != index) el.sort = 'none'
				})
				if (data[index].sort == 'none') {
					data[index].sort = 'up'
				} else if (data[index].sort == 'up') {
					data[index].sort = 'down'
				} else if (data[index].sort == 'down') {
					data[index].sort = 'none'
				}
				this[opt] = data
				this.sort(listName)

			},
			sort(listName) {
				const navName = `${listName}Nav`
				const nav = this[navName]

				const originalName = `${listName}Original`
				const original = this[originalName]

				let sort, index = -1
				//查询nav中是否有排序
				nav.forEach((item, ind) => {
					if (item.sort != 'none') {
						sort = item.sort
						index = ind
					}
				})

				let sortMethod = null
				if (index == -1) {
					this[listName] = original
				} else if (index == 0) {
					//对交易对做排序
					if (sort == 'up') {
						sortMethod = (a, b) => (a.currency_name + '').localeCompare(b.currency_name + '')
					} else {
						sortMethod = (a, b) => (b.currency_name + '').localeCompare(a.currency_name + '')
					}
					this[listName] = this[listName].sort(sortMethod)
				} else if (index == 1) {
					if (sort == 'up') {
						sortMethod = (a, b) => Number(a.now_price) - Number(b.now_price)
					} else {
						sortMethod = (a, b) => Number(b.now_price) - Number(a.now_price)
					}
					this[listName] = this[listName].sort(sortMethod)
				} else if (index == 2) {

					if (sort == 'up') {
						sortMethod = (a, b) => Number(a.change) - Number(b.change)
					} else {
						sortMethod = (a, b) => Number(b.change) - Number(a.change)
					}
					this[listName] = this[listName].sort(sortMethod)
				}

			},
			//根据数字政府判断颜色
			num2Color(num) {
				num = num + ''
				if (num.includes("%")) {
					num = num.slice(0, num.length - 1)
				}
				num = +num
				if (num >= 0) {
					return '#15be97'
				} else {
					return '#ff415b'
				}
			},
			//点击公告
			clickNoticeBar(index) {
				const item = this.originalNew[index]
				uni.navigateTo({
					url: '/pages/common/article?id=' + item.id
				})
			},
			//跳转至锁仓挖矿详情
			jump2Lockming(item) {
				uni.setStorageSync('lockming', item)
				uni.navigateTo({
					url: '/pages/lockming/welcome'
				})
			},
			//点击首页菜单的跳转
			homeNavJump(url,openType){
				if(url){
					this.$utils.jump(url,openType)
				}else{
					this.$utils.showToast(this.$t("common.functionLoading"))
				}
			},
			jumpDown(){
				uni.setStorageSync('hasClickDown',true)
				this.$u.api.common.getSetting('apk_download_url').then((res) => {
					if (res.type == 'ok') {
						window.open(res.message.value)
					}
				});
			},
			closeNotice(id) {
				uni.setStorageSync('hasCloseNotice_' + id, true);
				this.$refs.noticePopup.close();
			}
		},
		computed: {
			i18n() {
				return this.$t("home")
			},

			gupiaoNums() {
				return gupiao.length - 2
			},
      hqNums() {
        return this.quotation.length - 2
      }
		},
		watch:{
			//当语言发生变化时
			'$store.state.lang'(val){
				const {i18n} = this

				this.$utils.setTabbar(this)
				this.setDefaultLang()

				this.homeNav.forEach(item=>{
					item.name = i18n[item.title]
				})
			}
		},
		filters: {
			sort2Icon(sort) {
				switch (sort) {
					case 'none':
						return require('static/image/icon/sort.png');
						break;
					case 'up':
						return require('static/image/icon/sort-up.png');
						break;
					case 'down':
						return require('static/image/icon/sort-down.png');
						break;
				}
			},
		},
		onHide() {
			this.$store.state.socket.removeListener('daymarket')
		},
		onUnload() {
			this.$store.state.socket.removeListener('daymarket')
		}
	}
</script>
<style lang="scss" scoped>
	// .home {
	// 	background-image: url('./../../static/image/icon/home-bg.png');
	// 	background-repeat: no-repeat;
	// 	background-size: 100% 375rpx;
	// 	padding-bottom: 50rpx;
	// 	width: 100vw;
	// 	overflow: hidden;
	// 	padding-top: var(--status-bar-height);
	// }

	.home {
		overflow: hidden;
		padding-top: var(--status-bar-height);
		position: relative;
		background:#000000;
		background-repeat: no-repeat;
		background-size: 100% 530rpx;
		background-position: left top;
		padding-bottom: 180rpx;
	}

	.home-nav {
		border-radius: 20rpx;
		box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}

	.home-title-item {
		font-size: 16px;
		margin-right: 40rpx;

		&::after {
			display: block;
			content: '';
			width: 50%;
			//background-color: #fff;
			height: 6rpx;
			border-radius: 10rpx;
			margin: 0 auto;
			margin-top: 8rpx;
			overflow: hidden;
			transition: all .3s ease 0s;
		}

	}

	.linear-gradient-green {
		background-image: linear-gradient(to right, #00d789, #00e1cc);
	}


	//.high-quality-project {
	//	.high-quality-project-item {
	//		//border-radius: 20rpx;
	//		width: 96%;
	//		text-align: center;
	//		padding-top: 40rpx;
	//		height: 390rpx;
	//		//background-color: $uni-color-black;
	//		color: white;
  //
	//		.hige-quality-project-sskc {
	//			@extend .linear-gradient-green;
	//			font-size: 24rpx;
	//			color: #fff;
	//			height: 40rpx;
	//			line-height: 40rpx;
	//			padding: 0 18rpx;
	//			border-radius: 10rpx 0 10rpx 0;
	//			display: block;
	//			position: absolute;
	//			left: 0;
	//			top: 0;
	//		}
	//	}
	//}


  .high-quality-project2 {
    .high-quality-project-item {
      border-radius: 20rpx;
      width: 96%;
      text-align: center;
      padding-top: 40rpx;
      height: 390rpx;
      background-color: $uni-color-black;
      color: white;

      .hige-quality-project-sskc {
        @extend .linear-gradient-green;
        font-size: 24rpx;
        color: #fff;
        height: 40rpx;
        line-height: 40rpx;
        padding: 0 18rpx;
        border-radius: 10rpx 0 10rpx 0;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }


	.swiper-container {
		overflow: visible;
	}

	.swiper-wrapper {
		/* 通过改变animation-timing-function 制作弹性切换效果 */
		transition: .2s cubic-bezier(0.68, -0.2, 0.27, 1.34) .05s;
	}

	// 股票
	.gupiao-item {
		background-color: #95e2d0;
		border-radius: 8rpx;
		overflow: hidden;
		width: 214rpx;
		padding: 24rpx 0 20rpx;
		text-align: center;

		.code {
			font-size: 10px;
			color: white;
			border-radius: 4rpx;
			background-color: #80AEFB;
			margin-right: 7rpx;
			padding: 0 4rpx;
		}

		&.up {
			background-color: #95e2d0;

			.color {
				color: $uni-color-success;
			}
		}

		&.down {
			background-color: #fbe7eb;

			.color {
				color: $uni-color-error;
			}
		}
	}

	.gupiao-swiper-dots {
		margin-top: 0px;
		display: flex;
		justify-content: center;

		.gupiao-swiper-dot {
			width: 36rpx;
			height: 10rpx;
			background-color: #999999;
			opacity: .5;
			border-radius: 5px;
			margin-right: 4rpx;

			&.active {
				opacity: 1;
        background-color: #15be97;
			}
		}
	}

	.market {
		.market-item {
			overflow: hidden;
			padding: 32rpx 0;
			border-bottom: 1px solid rgba(0,0,0,.05 );
			align-items: center;
			display: grid;
			grid-template-columns: 1.2fr 1.2fr .8fr;

			.left {
				overflow: hidden;
			}

			.center {
				flex: 1;
				text-align: center;
			}

			.right {
				width: 100%;
				height: 50rpx;
				line-height: 50rpx;
				text-align: center;
				border-radius: 10rpx;
				background-color: #15be97;
				color: #fff;
			}
		}
	}

	.jshd {
		.jshd-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 56rpx;
			background-image: linear-gradient(to right, rgba(237, 241, 250, 0), rgba(237, 241, 250, 1));
			border-radius: 27.5rpx;
			padding-right: 24rpx;
			margin-right: 30rpx;

			.num {
				background-image: url('./../../static/image/icon/home-icon-4.png');
				background-size: cover;
				width: 38rpx;
				height: 38rpx;
				border-radius: 50%;
				color: #fff;
				text-align: center;
				line-height: 38rpx;
				font-size: 28rpx;
			}

			.text {
				font-size: 28rpx;
				margin-left: 16rpx;
			}
		}

		.jshd-table {

			image,
			img {
				width: 50rpx;
				height: 50rpx;
			}

			.jshd-table-td {
				padding: 14rpx 0;
			}

		}
	}

	.w-26 {
		width: 26%;
	}

	.w-18_5 {
		width: 18.5%;
	}

	// 弹出层列表
	.popup-list {
		.popup-list-item {
			height: 96rpx;
			line-height: 96rpx;
			padding: 0 30rpx;
			font-size: 32rpx;
			position: relative;
			display: flex;
			align-items: center;

			&:before {
				content: "";
				position: absolute;
				left: 30rpx;
				right: 30rpx;
				bottom: 0;
				height: 2rpx;
				background-color: #efefef;
			}

			&.active {
				background-color: #f2f6ff;

				&:after {
					content: "";
					width: 36rpx;
					height: 20rpx;
					background-image: url('/static/image/icon/setting-icon-20.png');
					background-size: cover;
					position: absolute;
					right: 80rpx;
					top: 50%;
					margin-top: -10rpx;
				}
			}
		}
	}

	.notice {
		background: #4D4D4D;
		color: #fff;
		border-radius: 20px;
		.heading {
			background: url('../../static/image/icon/bg-notice-heading.png') center no-repeat;
			background-size: 155px 60px;
			height: 60px;
			line-height: 60px;
		}
	}
	.notice-close {
		position:absolute;
		left: 50%;
		transform:translateX(-50%);
		bottom: -80px;
		text-align: center;
	}
	.uni-scroll-view {
		overflow: inherit!important;
	}

	.update{
		padding-bottom: 200rpx;
		.update-bg{
			height: 96rpx;
			background-image: url('./../../static/image/icon/update-bg.png');
			background-repeat: no-repeat;
			background-size: cover;
		}
		.buttons{
			position: absolute;
			left: 40rpx;
			right: 40rpx;
			bottom: 46rpx;
			.btn{
				width: 47%;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 26rpx;
				border: 2rpx solid #ef324c;
				margin: 0;
				&.btn2{
					background-color: #ef324c;
					color: #fff;
				}
			}
		}

	}

	.index-download{
		background-color: $uni-color-black;
		position: fixed;
		left: 0;
		right: 0;
		bottom:96rpx;
		padding: 30rpx;
		z-index: 10;
		color: #fff;
		display: flex;
		align-items: center;

	}

	.kefu{
		/* #ifdef APP-PLUS */
		bottom: 60rpx;
		/* #endif */
		/* #ifdef H5 */
		bottom: 260rpx;
		/* #endif */
	}
</style>
