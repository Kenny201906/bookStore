<template>
	<view>
		<u-empty v-if="orderList.length == 0" mode="order" icon="http://cdn.uviewui.com/uview/empty/order.png"
			text="您还没有相关订单" marginTop="150"></u-empty>
			<template v-if="type === 0">
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
			</template>
		<template v-if="type === 1">
			<view class="card-wrap">
			
			<block v-for="(order,index) in orderList" :key="index">
						<template v-if="order.status === 1">
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
					<view class="d-flex j-sb py-1 border-bottom">
						<view class="">
							金额:
						</view>
						<view class="">
							{{order.money}}
						</view>
					</view>
				   <view class="d-flex a-center j-sb py-1">
					   <view class="">
					   	归还书籍:
					   </view>
					   <view style="width: 150rpx;">
					   		<u-button color="#ff8319" text="归还" size="mini" @click="backBook(order.id)"></u-button>
					   </view>
				   
				   </view>
					
				</uni-card>
					</template>
			</block>
			</view>
		</template>
<template v-if="type === 2">
			<view class="card-wrap">
			
			<block v-for="(order,index) in orderList" :key="index">
						<template v-if="order.status === 2">
			    <uni-card>
					
			
					<view class="d-flex j-sb py-1 border-bottom">
						<view class="">
							借阅状态:
						</view>
						<view class="">
							<u-tag text="已归还" type="success" plain></u-tag>
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
								</template>
			</block>
			</view>
		</template>
		<template v-if="type === 3">
					<view class="card-wrap">
					
					<block v-for="(order,index) in orderList" :key="index">
								<template v-if="order.status === 3">
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
									</template>
					</block>
					</view>
				</template>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
                    orderList: [],
					type: '',
					pageInfo: {
						pageSize: 99,
						pageNum: 1,
					}
			};
		},
		async onLoad(options) {
			this.type = parseInt(options.id);
			uni.showLoading({
				title:'加载中...'
			})
		   const res = 	await this.getOrderAction({
					...this.pageInfo,
					userId: uni.getStorageSync('userInfo').id
				})
			this.orderList = res.records.map(item => {
					return {
						id: item.id,
						bookname: item.orderDetails.book.name,
						orderNum: item.orderNo,
						createTime: item.createTime,
						money: item.payPrice,
						status: item.status
					}
				})
				uni.hideLoading()
		},
		onShow() {
		},
		methods: {
			...mapActions(['getOrderAction','backBookAction']),
			backBook(id){
				this.backBookAction(id);
				uni.showToast({
					title: '归还成功'
				});
			}
		}
	};
</script>

<style lang="scss" scoped>

</style>
