<template>
	<view class="p-2">
		<view class="d-flex a-center">
			<u-input
			  placeholder="请输入内容"
			  border="surround"
						shape="circle"
			  v-model="value"
			   clearable
			>
			<template slot="prefix">
				<u-icon name="search" color="#808080" size="20"></u-icon>
			</template>
			</u-input>
			<view class="ml-1 searchBtn">
				搜索
			</view>
		</view>
		
		<view class="mt-3">
			<view class="font-md font-weight">
				历史搜索
			</view>
			
			<template v-if="historyList.length <= 0">
			<view class="mt-2 text-muted">
				暂无搜索记录
			</view>
			</template>
	       <template v-else>
			<block v-for="(item,index) in historyList" :key="index">
				 	<view class="historyItem mt-2 mr-2" @click="itemClick(index)">{{item}}</view>
			</block>
	      
	       </template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				historyList: [
					'新华书店',
					'余华书店'
				]
			}
		},
		methods: {
		itemClick(index){
			this.value = this.historyList[index] 
		}
		}
	}
</script>

<style scoped lang="scss">
.searchBtn{
	width: 120rpx;
	height: 60rpx;
	line-height: 60rpx;
	border-radius: 30rpx;
	text-align: center;
	background-color: #ff8319;
	color: white;
}
.historyItem{
	display: inline-block;
	height: 60rpx;
	line-height: 60rpx;
	padding: 0 20rpx;
	border-radius: 30rpx;
	text-align: center;
	background-color: #f5f5f5;
	color: #8f8484;;
}
</style>
