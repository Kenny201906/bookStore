<template>
	<view>
		<u-empty v-if="orderList.length == 0" mode="order" icon="http://cdn.uviewui.com/uview/empty/order.png"
			text="您还没有相关订单" marginTop="150"></u-empty>
		<view class="card-wrap">
		<block v-for="(order,index) in orderList" :key="index">
	        <uni-card>
				<view class="d-flex j-sb py-1 border-bottom">
					<view class="">
						订单状态:
					</view>
					<view class="">
						<u-tag text="支付成功" type="success" plain></u-tag>
					</view>
				</view>
				<view class="d-flex j-sb py-1 border-bottom">
					<view class="">
						书名:
					</view>
					<view class="">
						{{order.bookname}}
					</view>
				</view>
				<view class="d-flex j-sb py-1 border-bottom">
					<view class="">
						订单号:
					</view>
					<view class="">
						{{order.orderNum}}
					</view>
				</view>
				<view class="d-flex j-sb py-1 border-bottom">
					<view class="">
						支付时间:
					</view>
					<view class="">
						{{order.createTime}}
					</view>
				</view>
				<view class="d-flex j-sb py-1">
					<view class="">
						金额:
					</view>
					<view class="">
						{{order.money}}
					</view>
				</view>
			</uni-card>
		</block>
		</view>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
                    orderList: [],
					pageInfo: {
						pageSize: 10,
						pageNum: 1,
					}
			};
		},
		async onLoad() {
			uni.showLoading({
				title:'加载中...'
			})
		   const res = 	await this.getOrderAction({
					...this.pageInfo,
					userId: uni.getStorageSync('userInfo').id
				})
			this.orderList = res.records.map(item => {
					return {
						bookname: item.orderDetails.book.name,
						orderNum: item.orderNo,
						createTime: item.createTime,
						money: item.payPrice
					}
				})
				uni.hideLoading()
		},
		onShow() {
		},
		methods: {
			...mapActions(['getOrderAction'])
		}
	};
</script>

<style lang="scss" scoped>

</style>
