<template>
	<view>
		<view class="weui-msg">
			<view class="weui-msg__icon-area">
				<icon type="success" size="93"></icon>
			</view>
			<view class="weui-msg__text-area">
				<view class="weui-msg__title">借阅成功</view>
				<view class="weui-msg__desc">
					<view>取书时间: 2022-06-01</view>
					<view>取书地点: 清华大学图书馆</view>
				</view>
			</view>
			<view class="weui-msg__opr-area">
				<view class="weui-btn-area">
					<button class="weui-btn" type="primary" @click="onBack">确定</button>
					<button class="weui-btn" type="default" @click="goIndex">回到主页</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			onBack() {
				uni.redirectTo({
					url: '/subpackage-index/bookDetail/bookDetail'
				})
			},
			goIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.weui-msg {
		padding-top: 36px;
		text-align: center;
	}

	.weui-msg__icon-area {
		margin-bottom: 30px;
	}

	.weui-msg__text-area {
		margin-bottom: 25px;
		padding: 0 20px;
	}

	.weui-msg__title {
		margin-bottom: 5px;
		font-weight: 400;
		font-size: 20px;
	}

	.weui-msg__desc {
		font-size: 14px;
		color: #999999;
	}

	.weui-msg__opr-area {
		margin-bottom: 25px;
	}

	.weui-btn-area {
		margin: 1.17647059em 15px 0.3em;
	}

	.weui-btn {
		margin-top: 15px;
	}
</style>
