<template>
	<view>
		<view class="title px-2">
			<view class="d-flex j-sb text-white">
				<view class="d-flex a-center ">
					<image src="../../static/images/定位.png" mode="widthFix" style="width:40rpx;"></image>
					<text class="uni-text-small pl-1">{{ location }}</text>
				</view>
				<view class="font-md">></view>
			</view>
			<view class="mt-2">
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

			<swiper :duration="500" style="height: 1700rpx;" :current="currentIndex" @change="swiperChange">
				<block v-for="(item3,index3) in cate" :key="index3">
					<swiper-item style="height: 1700rpx;">
						<block v-for="(item2,index2) in goodsInfo" :key="index2">
							<view class="d-flex a-center mt-4" @click="goDetails">
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
				location: '',
				currentIndex: 0,
				blockleft: -2,
				banner: [
					'https://img.sj33.cn/uploads/202105/0943513S4-51.jpg',
					'https://img.zcool.cn/community/01a4fb5916c3d1a801216a3e1f7c6e.jpg@1280w_1l_2o_100sh.jpg',
					'https://static.fotor.com.cn/assets/projects/pages/5fee5cf0-eb99-11e7-a8e5-e15db9e88c7a_69f55ce3-da17-4fab-ae9f-f4f4aee25f8f_new_thumb.jpg'
				],
				cate: ['日榜', '周榜', '月榜'],
				goodsInfo: [{
						src: 'https://img.welan.com/s/2767/10822767/10822767.jpg',
						name: '火种—寻找中国复兴之路',
						author: '刘统',
						type: '政党读物',
						salesCount: 12000
					},
					{
						src: 'https://img.welan.com/s/2767/10822767/10822767.jpg',
						name: '火种—寻找中国复兴之路',
						state: true,
						author: '刘统',
						type: '政党读物',
				 	salesCount: 19720
					},
					{
						src: 'https://img.welan.com/s/2767/10822767/10822767.jpg',
						name: '火种—寻找中国复兴之路',
						state: true,
						author: '刘统',
						type: '政党读物',
						salesCount: 39720
					},
					{
						src: 'https://img.welan.com/s/2767/10822767/10822767.jpg',
						name: '火种—寻找中国复兴之路',
						state: true,
						author: '刘统',
						type: '政党读物',
						salesCount: 9720
					},
					{
						src: 'https://img.welan.com/s/2767/10822767/10822767.jpg',
						name: '火种—寻找中国复兴之路',
						state: true,
						author: '刘统',
						type: '政党读物',
				 	salesCount: 9720
					},
					{
						src: 'https://img.welan.com/s/2767/10822767/10822767.jpg',
						name: '火种—寻找中国复兴之路',
						state: true,
						author: '刘统',
						type: '政党读物',
						salesCount: 9720
					},
				],
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
						}
					});
				}
			});
		},
		methods: {
			blockMove(index) {
				this.blockleft = index * 130 - 2;
				this.currentIndex = index;
			},
			swiperChange(e) {
				this.blockMove(e.detail.current);
			},
			goDetails() {
				this.$u.route({
					url:'/subpackage-index/bookDetail/bookDetail'
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
	};
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
