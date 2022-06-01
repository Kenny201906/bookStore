<template>
	<view>
		<!-- 图书信息 -->
		<view class="ui-panel d-flex">
			<view class="ui-book-card__info font-gray-26">
				<view class="bookTitle">火种-寻求中的复兴之路</view>
				<view>评分：<span class="color-yellow">8.8</span></view>
				<view>作者:
					<text class="ui-book-card__info-name">刘统</text>
				</view>
				<view>译者:
					<text class="ui-book-card__info-name">暂无</text>
				</view>
				<view>出版社: 新华出版社</view>
				<view>出版时间: 2000-09-15</view>
				<view>分类号: A11</view>
				<view>索书号: TP128.4</view>
				<view>页数: 74页</view>
				<view>字数: 约126万字</view>
				<view>ISBN: 97835108561644</view>
			</view>
			<image class="ui-book-card__img " src="https://img.welan.com/s/2767/10822767/10822767.jpg" mode="widthFix"
				bindtap="onPreview"></image>
		</view>
		<view class="desc">
			<view class="" style="background-color: #f0eff5; font-size: 30rpx; padding: 15rpx 32rpx 15rpx 0rpx;">
				<text class="ui-label">内容简介</text>
			</view>
			<view class="ui-card font-black-26 pre-wrap">
				<text class=""
					:user-select="true">12岁的阿富汗富家少爷阿米尔与仆人哈桑情同手足。然而，在一场风筝比赛后，发生了一件悲惨不堪的事，阿米尔为自己的懦弱感到自责和痛苦，逼走了哈桑，不久，自己也跟随父亲逃往美国。
					成年后的阿米尔始终无法原谅自己当年对哈桑的背叛。为了赎罪，阿米尔再度踏上暌违二十多年的故乡，希望能为不幸的好友尽最后一点心力，却发现一个惊天谎言，儿时的噩梦再度重演，阿米尔该如何抉择？
					故事如此残忍而又美丽，作者以温暖细腻的笔法勾勒人性的本质与救赎，读来令人荡气回肠。</text>
			</view>
		</view>
		<view class="desc">
			<view class="" style="background-color: #f0eff5; font-size: 30rpx; padding: 15rpx 32rpx 15rpx 0rpx;">
				<text class="ui-label">作者简介</text>
			</view>
			<view class="ui-card font-black-26 pre-wrap">
				<text class="" :user-select="true">
					卡勒德·胡赛尼（Khaled Hosseini），1965年生于阿富汗喀布尔市，后随父亲迁往美国。胡赛尼毕业于加州大学圣地亚哥医学系，现居加州。“立志拂去蒙在阿富汗普通...</text>
			</view>
		</view>
		<view class="desc">
			<view class="" style="background-color: #f0eff5; font-size: 30rpx; padding: 15rpx 32rpx 15rpx 0rpx;">
				<text class="ui-label">译者简介</text>
			</view>
			<view class="ui-card font-black-26 pre-wrap">
				<text class="">暂无译者简介</text>
			</view>
		</view>
		<view class="desc">
			<view class="" style="background-color: #f0eff5; font-size: 30rpx; padding: 15rpx 32rpx 15rpx 0rpx;">
				<text class="ui-label">试读</text>
			</view>
			<view class="ui-card font-black-26 pre-wrap">
				<text :user-select="true">谨以此书献给哈里斯和法拉，他们为我启蒙。献给所有阿富汗的孩子。 我成为今天的我，是在1975年某个阴云密布的寒冷冬日，那年我十二岁。我清楚地记得
					…</text>
			</view>
		</view>
		<view class="desc">
			<view class="" style="background-color: #f0eff5; font-size: 30rpx; padding: 15rpx 32rpx 15rpx 0rpx;">
				<text class="ui-label">相关图书</text>
			</view>
			<view class="p-3">
				<u-scroll-list @right="right" @left="left" :indicator="false">
					<view class="scroll-list" style="flex-direction: row;">
						<view class="scroll-list__goods-item" v-for="(item, index) in list" :key="index"
							:class="[(index === 9) && 'scroll-list__goods-item--no-margin-right']">
							<view class="" @click="goDetails">
								<image class="scroll-list__goods-item__image" :src="item.thumb" mode="aspectFill">
								</image>
								<view class="scroll-list__goods-item__text">{{ item.author }}</view>
								<text class="info-name ellipsis font-gray-28">{{item.infoName}}</text>
							</view>

						</view>

					</view>
				</u-scroll-list>
			</view>
		</view>

		<view class=""
			style="background-color: #f0eff5; font-size: 30rpx; padding: 15rpx 32rpx 15rpx 0rpx; height: 100rpx;">

		</view>
		<view class="menubar">
			<!-- <u-button text="加入购物车"></u-button> -->
			<view class="d-flex j-sb p-3">
				<button type="primary" class="menubar__btn_give mr-3" @click="borrowBook">借阅此书</button>
				<button type="warn" class="menubar__btn_give ">加入购物车</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					author: '泰戈尔',
					infoName: '[哥]加西亚·马尔克斯',
					thumb: 'https://yisheng-ovo.oss-cn-shanghai.aliyuncs.com/2022/05/20/4a05b9602f1243c49ecbe54f7781a1c4-10飞鸟集.png'
				}, {
					author: '泰戈尔',
					infoName: '[哥]加西亚·马尔克斯',
					thumb: 'https://yisheng-ovo.oss-cn-shanghai.aliyuncs.com/2022/05/20/d358ff23ca064b4ea3bd1c3deb982b52-5活着.png'
				}, {
					author: '泰戈尔',
					infoName: '[哥]加西亚·马尔克斯',
					thumb: 'https://yisheng-ovo.oss-cn-shanghai.aliyuncs.com/2022/05/20/cbf105ef835d4293a8fb8a34576e4855-1平凡的世界.jpg'
				}, {
					author: '泰戈尔',
					infoName: '[哥]加西亚·马尔克斯',
					thumb: 'https://yisheng-ovo.oss-cn-shanghai.aliyuncs.com/2022/05/20/554d8149474e419796753fcc58f92291-7起风了.png'
				}, {
					author: '泰戈尔',
					infoName: '[哥]加西亚·马尔克斯',
					thumb: 'https://yisheng-ovo.oss-cn-shanghai.aliyuncs.com/2022/05/20/1c6a6aa8ecc44be38f2df96fe2461d7a-12挪威的森林.png'
				}, {
					author: '泰戈尔',
					infoName: '[哥]加西亚·马尔克斯',
					thumb: 'https://yisheng-ovo.oss-cn-shanghai.aliyuncs.com/2022/05/20/fe18b792d1f24eb2b91006dfa0d57b14-13蛙.png'
				}, ]
			}
		},
		methods: {
			left() {
				console.log('left');
			},
			right() {
				console.log('right');
			},
			goDetails() {
				console.log(111111);
				uni.redirectTo({
					url: '/subpackage-index/bookDetail/bookDetail'
				})
				// this.$u.route({
				// 	url: ,
				// 	type:'redirect'
				// })
			},
			borrowBook(){
				console.log(1111);
				uni.navigateTo({
					url:'/subpackage-index/confirmBorrow/confirmBorrow'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.ui-panel {
		padding: 30rpx;
	}

	.bookTitle {
		font-weight: 400;
		font-size: 32rpx;

		color: #353535;
	}

	.font-gray-26 {
		color: #888888;
	}

	.color-yellow {
		color: #FFBF00;
	}

	.ui-book-card__img {
		width: 50%;
		margin-right: -40rpx;
	}

	.font-gray-28 {
		color: #888;
		font-size: 28rpx;
	}

	.ui-label {
		font-size: 28rpx;
		margin-top: .77em;
		margin-bottom: .3em;
		padding-left: 30rpx;
		padding-right: 30rpx;
		color: #999999;
	}

	.pre-wrap {
		// white-space: pre-wrap;
	}

	.ui-card {
		position: relative;
		padding: 10px 15px;
		background-color: #fff;
	}

	.font-black-26 {
		color: #353535;
		font-size: 24rpx;
	}

	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-wrap: normal;
	}

	.scroll-list {
		@include flex(column);

		&__goods-item {
			margin-right: 20px;

			&__image {
				width: 200rpx;
				height: 285rpx;
				border-radius: 4px;
			}

			&__text {
				color: #353535;
				// text-align: center;
				font-size: 30rpx;
				// margin-top: 5px;
			}
		}


	}

	.menubar {
		position: fixed;
		display: flex;
		bottom: 0rpx;
		width: 100%;
		border-top: 1px solid #e5e5e5;
		background-color: #f8f8f8;
	}

	.menubar__btn_give {
		width: 330rpx;
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 26rpx;
		border-radius: 10rpx;
	}

	// .menubar {
	// 	position: fixed;
	// 	bottom: 0;
	// 	display: flex;
	// 	display: -webkit-flex;
	// 	flex-direction: row;
	// 	align-items: stretch;
	// 	width: 100%;
	// 	height: 100rpx;
	// 	border-top: 1px solid #e5e5e5;
	// 	background-color: #f8f8f8;
	// }

	// .menubar__btn {
	// 	height: 100rpx;
	// 	font-size: 36rpx;
	// 	line-height: 100rpx;
	// 	border: none;
	// 	border-radius: 0;
	// 	padding-left: 15px;
	// 	padding-right: 15px;
	// }
</style>
