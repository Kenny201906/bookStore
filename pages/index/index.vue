<template>
	<view>
		<view class="title px-2">
			<view class="d-flex j-sb text-white" @click.native="goToBookStore">
				<view class="d-flex a-center ">
					<image src="@/static/images/indexLocation.png" mode="widthFix" style="width:40rpx;"></image>
					<text class="uni-text-small pl-1">{{ location }}</text>
				</view>
				<view class="font-md">></view>
			</view>
			<view class="mt-2" @click="goToSearch">
				<u-input placeholder="选择分类或搜索查找" :disabled="true" disabledColor="#ffffff" shape="circle"
					placeholderStyle="font-size: 26rpx;" clearable>
					<template slot="prefix">
						<view style="padding-left: 190rpx;">
							<u-icon name="search" color="#808080" size="20"></u-icon>
						</view>
					</template>
				</u-input>
			</view>
		</view>
		<view class="ellipsis px-3 ">
			<u-swiper :list="banner" indicator indicatorMode="line" circular></u-swiper>
		</view>
		<view class="d-flex j-sb a-center px-3 font-md" style="margin-top: 100rpx;">
			<view class="font-weight">畅销TOP10</view>
			<view class="d-flex cate">
				<block v-for="(item, index) in cate" :key="index">
					<view class="cateItem" :class="currentIndex === index ? 'cateItemActive' : ''"
						@click="blockMove(index)">{{ item }}</view>
					<view class="block" :style="{ left: blockleft + 'rpx' }"></view>
				</block>
			</view>
		</view>

		<view class="mt-1 px-3 mb-4">
			<swiper :duration="500" style="height: 2500rpx;" :current="currentIndex" @change="swiperChange">
				<block v-for="(item3,index3) in goodsInfo" :key="index3">
					<swiper-item style="height: 2500rpx;">
						<block v-for="(item2,index2) in item3" :key="index2">
							<view class="d-flex a-center mt-4" @click="goDetails(item2.id)">
								<view style="position: relative;">
									<template v-if="index2 <= 2">
										<view :class="['imgBadge','imgBadge' + index2]">No.{{index2 + 1}}</view>
									</template>

									<image :src="item2.src" mode="widthFix" style="width: 150rpx;"></image>
								</view>


								<view class="ml-2" style="flex: 1;">
									<view class="font-weight">
										{{item2.name}}
									</view>
									<view class="text-light-muted uni-text-small">
										{{item2.author}}·{{item2.type}}
									</view>
								</view>
								<view style="width: 7em;color: #cd9157;text-align: end;">
									{{numberFormat(item2.salesCount)}}
								</view>
							</view>
						</block>
					</swiper-item>
				</block>

			</swiper>


		</view>
	</view>
</template>

<script>
	const QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
	let qqmapsdk;
	export default {
		data() {
			return {
				location: uni.getStorageSync('bookStore').name || '',
				currentIndex: 0,
				blockleft: -2,
				banner: [
					'https://img.sj33.cn/uploads/202105/0943513S4-51.jpg',
					'https://img.zcool.cn/community/01a4fb5916c3d1a801216a3e1f7c6e.jpg@1280w_1l_2o_100sh.jpg',
					'https://static.fotor.com.cn/assets/projects/pages/5fee5cf0-eb99-11e7-a8e5-e15db9e88c7a_69f55ce3-da17-4fab-ae9f-f4f4aee25f8f_new_thumb.jpg'
				],
				cate: ['日榜', '周榜', '月榜'],
				goodsInfo: [1, 2, 3],
			};
		},
		onLoad() {

			const _this = this;
			qqmapsdk = new QQMapWX({
				key: 'LZYBZ-XI2L4-7I7UB-XXZKJ-QJEEH-VNBEH'
			});
			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					qqmapsdk.reverseGeocoder({
						location: {
							latitude: res.latitude,
							longitude: res.longitude
						},
						success: function(res2) {
							_this.location = res2.result.formatted_addresses.recommend;
						},
					});
				},
				fail: () => {
					uni.showToast({
						title: '获取定位失败,请打开手机定位',
						icon: 'none'
					})
				}
			});
			let goodsInfoLength = this.cate.length
			let goodsInfos = uni.getStorageSync('bookStore').bookList.map(item => {
				return {
					...item,
					src: item.cover,
					name: item.name,
					author: item.author,
					type: item.category,
					salesCount: Math.floor(Math.random() * (9999 - 1000) + 1000)
				}
			})
			goodsInfos = this.sortByField(goodsInfos, 'salesCount')
			this.goodsInfo[0] = goodsInfos
			this.goodsInfo[1] = goodsInfos
			this.goodsInfo[2] = goodsInfos
			console.log(goodsInfos);
		},
		onShow() {


		},
		methods: {
			sortByField(arr, field) {
				return arr.sort((a, b) => {
					return b[field] - a[field]
				})
			},
			swiperChange(e) {
				this.blockMove(e.detail.current);
			},
			goToBookStore() {
				uni.navigateTo({
					url: '/subpackage-index/bookStore-list/bookStore-list'
				})
			},
			goToSearch() {
				uni.navigateTo({
					url: '/subpackage-index/search/search'
				})
			},
			blockMove(index) {
				this.blockleft = index * 130 - 2;
				this.currentIndex = index;
			},
			goDetails(bookId) {
				console.log(bookId);
				this.$u.route({
					url: '/subpackage-index/bookDetail/bookDetail',
					params: {
						id: bookId
					}
				})
			}
		},
		computed: {
			// 数字转化
			numberFormat() {
				return function(value) {
					const k = 10000;
					const unitArray = ['', '万', '亿', '万亿'];
					const i = Math.floor(Math.log(value) / Math.log(k));
					const floatNumber = value >= 10000 ? (value / Math.pow(k, i)).toFixed(2) : value;
					const fomatString = floatNumber + unitArray[i] + '热销'
					return fomatString
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.title {
		height: 290rpx;
		background-color: #ff8319;
	}

	.ellipsis {
		width: 750rpx;
		height: 210rpx;
		margin-top: -105rpx;
		background: #ff8319;
		border-radius: 50% / 50%;
	}

	.cate {
		position: relative;
		width: 390rpx;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 35rpx;
		border: 2upx solid #ff8319;

		.cateItem {
			width: 130rpx;
			text-align: center;
			color: #ff8319;
			transition: all 0.5s ease;
		}

		.cateItemActive {
			color: white;
		}

		.block {
			position: absolute;
			width: 130rpx;
			height: 70rpx;
			border-radius: 35rpx;
			z-index: -1;
			top: 0;
			transition: all 0.5s ease;
			background-color: #ff8319;
		}
	}

	.imgBadge {
		position: absolute;
		left: 0;
		top: 0;
		width: 50rpx;
		height: 60rpx;
		text-align: center;
		color: white;
		font-size: 20rpx;
		z-index: 1;
		clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%);
	}

	.imgBadge0 {
		background-color: #f43628;
	}

	.imgBadge1 {
		background-color: #ff7c14;
	}

	.imgBadge2 {
		background-color: #fead5b;
	}
</style>
