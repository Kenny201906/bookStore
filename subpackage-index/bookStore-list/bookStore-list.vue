<template>
	<view class="p-2">
		<view class="d-flex a-center font-md font-weight title">
			书店列表
		</view>
		<block v-for="(item,index) in bookStoreList" :key="index">
			<view class="mt-2 d-flex a-center card p-2" @click="chooseBookStore(index)">
				<image :src="item.src" mode="widthFix" style="width: 200rpx;border-radius: 20rpx;"></image>
				<view class="ml-2">
					<view class="font-md font-weight">
						{{item.name}}
					</view>
					<view class="uni-text-small text-muted" style="padding: 4rpx 0; ">
						{{item.address}}
					</view>
					<view class="uni-text-small text-muted">
						{{item.distance}}km
					</view>
				</view>
			</view>
		</block>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				bookStoreList: []
			}
		},
		onShow() {
			this.getBookStore()
		},
		methods: {
			// 获取书店列表
			async getBookStore() {
				const res = await this.$http.get('/business/list')
				this.bookStoreList = res.data.records.map(item => {
					return {
						id:item.id,
						src: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.ABIxsqLL4RL3KP9Q1-XAowHaE7?w=227&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7',
						name: item.name,
						userId:item.userId,
						bookList:item.bookList,
						address: item.address,
						distance: 999
					}
				})
				console.log(res);
			},
			chooseBookStore(id) {
				// 保存店铺信息
				uni.setStorageSync('bookStore', this.bookStoreList[id])
				uni.navigateBack({

				})
			}
		}

	}
</script>

<style sccoped lang="scss">
	.title::before {
		content: '';
		display: inline-block;
		width: 10rpx;
		height: 40rpx;
		margin-right: 10rpx;
		border-radius: 5rpx;
		background-color: #ff8319;
	}

	.card {
		border-radius: 20rpx;
		box-shadow: 0 0 4rpx 4rpx #efefef;
	}
</style>
