<template>
	<view>
		<!-- 图书信息 -->
		<view class="ui-panel d-flex">
			<view class="ui-book-card__info font-gray-26">
				<view class="bookTitle">{{bookDetail.name}}</view>
				<view>评分：<span class="color-yellow">{{bookDetail.score}}</span></view>
				<view>作者:
					<text class="ui-book-card__info-name">{{bookDetail.author}}</text>
				</view>
				<view>译者:
					<text class="ui-book-card__info-name">暂无</text>
				</view>
				<view>出版社: 新华出版社</view>
				<view>出版时间: {{bookDetail.createTime}}</view>
				<view>分类号: {{bookDetail.classificationNumber}}</view>
				<view>索书号: {{bookDetail.callNumber }}</view>
				<view>页数: {{bookDetail.pagesNumber}}</view>
				<view>字数: {{bookDetail.wordsNumber}}</view>
				<view>ISBN: {{bookDetail.isbn}}</view>
			</view>
			<image class="ui-book-card__img " :src="bookDetail.cover" mode="widthFix" bindtap="onPreview"></image>
		</view>
		<view class="desc">
			<view class="" style="background-color: #f0eff5; font-size: 30rpx; padding: 15rpx 32rpx 15rpx 0rpx;">
				<text class="ui-label">内容简介</text>
			</view>
			<view class="ui-card font-black-26 pre-wrap">
				<text class="" :user-select="true">{{bookDetail.contentInfo}}</text>
			</view>
		</view>
		<view class="desc">
			<view class="" style="background-color: #f0eff5; font-size: 30rpx; padding: 15rpx 32rpx 15rpx 0rpx;">
				<text class="ui-label">作者简介</text>
			</view>
			<view class="ui-card font-black-26 pre-wrap">
				<text class="" :user-select="true">
					{{bookDetail.authorInfo}}</text>
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
				<text :user-select="true">{{bookDetail.trial}}</text>
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
							<view class="" @click="goDetails(item.id)">
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
				<button type="primary" class="menubar__btn_give mr-3" style="background-color: #ff8319;"
					@click="borrowBook">借阅此书</button>
				<button type="warn" class="menubar__btn_give" @click="addCart">加入购物车</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	import http from '@/service/request/index.js';
	export default {
		data() {
			return {
				bookId: '',
				bookDetail: {},
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
		onLoad(option) {
			this.bookId = option.id
		},
		async onShow() {
			const res = await http.post('/book/getById',{
				bookId: this.bookId,
				businessId: uni.getStorageSync('bookStore').id
			})
			this.bookDetail = res.data
		     console.log(res.data);
			let goodsInfos = uni.getStorageSync('bookStore').bookList.map(item => {
				return {
					...item,
					thumb: item.cover,
					name: item.name,
					author: item.author,
					type: item.category,
					infoName: '[哥]加西亚·马尔克斯',
					salesCount: Math.floor(Math.random() * (9999 - 1000) + 1000)
				}
			})
			
			this.list = this.sortByField(goodsInfos, 'salesCount')
		},
		methods: {
			...mapActions(['addCartAction']),
			sortByField(arr, field) {
				return arr.sort((a, b) => {
					return b[field] - a[field]
				})
			},
			left() {
				console.log('left');
			},
		 async addCart() {
				const businessId = uni.getStorageSync('bookStore').id;
			    const userId = uni.getStorageSync('userInfo').id;
				
			   await this.addCartAction({
					userId: userId,
					businessId: businessId,
					quantity: 1,
					book: {
						id: this.bookId
					}
				})
				uni.showToast({
					title: '加入购物车成功'
				});
			},
			right() {
				console.log('right');
			},
			goDetails(id) {
				console.log(111111);
				this.$u.route({
					url: '/subpackage-index/bookDetail/bookDetail',
					type: 'redirect',
					params: {
						id: id
					}
				})
				// this.$u.route({
				// 	url: ,
				// 	type:'redirect'
				// })
			},
			borrowBook() {
				console.log(1111);
				const bookData = JSON.stringify(this.bookDetail)
				uni.navigateTo({
					url: `/subpackage-index/confirmBorrow/confirmBorrow?bookData=${
						bookData
					}&bookId=${this.bookId}`
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
