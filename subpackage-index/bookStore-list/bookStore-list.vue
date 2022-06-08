<template>
	<view class="p-2">
		<view class="d-flex a-center font-md font-weight title">
			书店列表
		</view>
		<block v-for="(item,index) in bookStoreList" :key="index">
			<view class="mt-2 d-flex a-center card p-2" @click="chooseBookStore(index)">
				<view  style="width:200rpx;border-radius:20rpx;">
			<image :src="item.src" style="width:200rpx;border-radius:20rpx;" mode="widthFix"></image>
				</view>

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
				uni.showLoading({
					title: '加载中...'
				})
				let distance = 8;
				const res = await this.$http.get('/business/list')
				this.bookStoreList = res.data.records.map(item => {
					distance ++ 
					return {
						id:item.id,
						src: item.logo,
						name: item.name,
						userId:item.userId,
						bookList:item.bookList,
						address: item.address,
						distance: distance
					}
				})
		        uni.hideLoading();
			},
			chooseBookStore(id) {
				// 保存店铺信息
				if(this.bookStoreList[id].bookList.length <= 0 ) {
					uni.showToast({
						title:'店铺暂无书籍',
						icon: 'none'
					})
					return false
				}
				uni.setStorageSync('bookStore',this.bookStoreList[id]);
				uni.$emit('chooseBookStore',this.bookStoreList[id].bookList);
                  uni.switchTab({
                  	url: `/pages/index/index`
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
