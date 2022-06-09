<template>
	<view >
		<view class="px-2 py-1">
			<!-- 商品-->
			<block v-for="(item,index) in goodsInfo" :key="index">
				<view class="d-flex a-center">
					<view @click="changeState(index)">
						<template v-if="!item.state">
						<view class="circle"></view>
						</template>
						<template v-else>
						<u-icon name="checkmark-circle-fill" color="#ff8319" size="25"></u-icon>
						</template>
					</view>
				
					
					<image :src="item.cover" style="width: 140rpx" mode="widthFix" class="mx-1"></image>
					<view style="flex: 1;margin-top: 80rpx;">
				 	<view class="font-weight">{{item.name}}</view>
						<view class="text-light-muted pb-1" style="font-size: 26rpx;">{{item.author}} · {{item.category}}</view>
						<view class="d-flex j-sb">
							<view style="color: #e8362d;" class="font-weight">¥ {{(item.unitPrice * item.count).toFixed(2)}}</view>
							<view class="numberBox">
								<view class="numberBtn" @click="decrease(index)">-</view>
								<view class="numberText">{{item.count}}</view>
								<view class="numberBtn" @click="increase(index)">+</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>

       <!-- 管理购物车 -->
	      <view class="d-flex j-center a-center edit" :style="{'right': editRight + 'px','bottom': editBottom + 'px'}"  @touchstart="editTouch"  @click.native="edit" @touchmove.stop="editMove">
	      	<u-icon name="edit-pen" color="white" size="40"></u-icon>
	      </view>
		<!-- 底部结算 -->
		<view class="d-flex a-center j-sb pageBottom px-3 py-1">
			<view class="d-flex a-center">
				<view @click="changeAll">
					<template v-if="!selectAll">
					<view class="circle"></view>
					</template>
					<template v-else>
					<u-icon name="checkmark-circle-fill" color="#ff8319" size="25"></u-icon>
					</template>
				</view>
				<view class="font-weight pl-2">
					全选
				</view>
			</view>
			<view class="d-flex a-center">
				<template v-if="!isEdit">
				<view class="d-flex a-center">
					<text class="text-muted uni-text-small pr-1">合计</text>  <text  style="color: #e8362d" class="font-weight" >¥ {{totalPrice.toFixed(2)}}</text>
				</view>
				 <view class="buyBtn" @click="buy">
				 	 结算({{total}})
				 </view>
				</template>

				 <template v-else>
				<view class="buyBtn" @click="deleteGoods">
					删除
				</view>
				 </template>
		
			</view>

		</view>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
export default {
	data() {
		return {
			editRight: 15,
			editBottom: 80,
			windowHeight: 555,
			maxBottom: 0,
			maxRight: 0,
			fingerInnerX: 0,
			fingerInnerY: 0,
			windowWidth: 0,
			isEdit: false,
			goodsInfo: [
			],
			selectAll: false,
		};
	},
 async onShow() {
	 const _this = this;
	 
	 this.selectAll = false;
	 uni.showLoading({
	 	title:'加载中...'
	 })
	 const userId = uni.getStorageSync('userInfo').id;

	 const res = await this.getCartAction({
		 userId: userId,
		 pageNum: 1,
		 pageSize: 99
	 });
	 console.log(res);
   this.goodsInfo =  res.records.map(item => {
		 return {
			 ...item.book,
			 cartId: item.id,
			 businessId: item.businessId,
			 state: false,
			 count: item.quantity
		 }
	 })
	 uni.hideLoading()
     uni.getSystemInfo({
	 success: function (res) {
		_this.windowWidth = res.windowWidth;
	   _this.windowHeight = res.windowHeight;
	}
});
	},
	computed: {
		total(){
			let count = 0;
			this.goodsInfo.forEach((item)=>{
			   if(item.state){
				   count = item.count + count;
			   }
			})
			return count
		},
		totalPrice(){
		    let price = 0;
			this.goodsInfo.forEach((item)=>{
				if(item.state){
					price = price + item.count * item.unitPrice 
				}
			})
			return price
		}
	},
	methods: {
		...mapActions(['getCartAction','deleteCartAction','settlementCartAction']),
		decrease(index){
			const count = this.goodsInfo[index].count
			if(count <= 1){
				return false
			}
			this.goodsInfo[index].count--
		},
		increase(index){
			this.goodsInfo[index].count++
		},
		changeState(index){
		 this.goodsInfo[index].state = !this.goodsInfo[index].state
		 const findItem = this.goodsInfo.find(item => {
			 return item.state === false
		 })
		 if(findItem === undefined){
			 this.selectAll = true
		 }else{
			this.selectAll = false
		 }
		},
		changeAll() {
			this.selectAll = !this.selectAll
			if(this.selectAll){
				this.goodsInfo.forEach(item =>{
					item.state = true
				})
			}else{
				this.goodsInfo.forEach(item =>{
					item.state = false
				})
			}
		},
		editTouch(e){
		const maxBottom = this.windowHeight - 60;
		this.maxBottom = maxBottom;
		const maxRight = this.windowWidth - 60;
		this.maxRight = maxRight;
          this.fingerInnerX = e.changedTouches[0].clientX - (this.windowWidth - this.editRight - 60);
		  this.fingerInnerY = e.changedTouches[0].clientY - (this.windowHeight - this.editBottom - 60);
		},
		editMove(e) {		
	
		 const editBottom = (this.windowHeight - e.touches[0].clientY - 60 ) + this.fingerInnerY;
		 if(editBottom >= 51 && editBottom <=  this.maxBottom) {
			 this.editBottom = editBottom
		 }
		const editRight = (this.windowWidth - e.touches[0].clientX - 60) +  this.fingerInnerX;
		 if(editRight >= 0 && editRight <= this.maxRight) {
			 this.editRight = editRight
		 }
		},
		edit(){
			this.isEdit = !this.isEdit
		},
		deleteGoods(){
			const _this = this;
			uni.showModal({
				title: '提示',
				content: '您是否要删除选中的商品？',
				success: function (res) {
					if (res.confirm) {
						const ids = []
						_this.goodsInfo.forEach(item => {
							if(item.state){
						     ids.push(item.cartId)
							}
						})
						_this.deleteCartAction(ids)
					}
				}
			});
		},
	async buy(){
			if(this.total <=0 ){
				uni.showToast({
					title: '请至少选择一件商品',
					icon: 'none'
				})
			}else{
			const _this = this;
			  uni.showModal({
			  	title: '提示',
			  	content: '您是否要结算物品？',
			  	success: function (res) {
			  	  if (res.confirm) {
			  	  	const cartList = [];
			  	  	_this.goodsInfo.forEach(item => {
			  	  		if(item.state){
			  	  	    cartList.push({
			  	  			id: item.cartId,
			  	  			bookId: item.id,
			  	  			userId: uni.getStorageSync('userInfo').id,
			  	  			quantity: item.count,
			  	  	        businessId: item.businessId
			  	  		})
			  	  		}
			  	  	})
			  	  	_this.settlementCartAction({
			  	  		cartList: cartList,
			  	  		price: _this.totalPrice.toFixed(2),
			  	  		userId: uni.getStorageSync('userInfo').id
			  	  	})
					uni.showToast({
						title: '结算成功'
					});
			  	  }
			  	}
			  });
				// uni.navigateTo({
				// 	url: `/subpackage-cart/settlement/settlement?total=${this.total}&totalPrice=${this.totalPrice.toFixed(2)}`
				// })
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.circle {
	width: 50rpx;
	height: 50rpx;
	border-radius: 50%;
	border: 2rpx solid #f1f1f1;
}
.numberBox {
	display: flex;
	width: 200rpx;
	height: 60rpx;
	line-height: 60rpx;
	border-radius: 15rpx;
	border: 2rpx solid #f1f1f1;
	.numberBtn {
		width: 65rpx;
		line-height: 60rpx;
		font-size: 36rpx;
		text-align: center;
		background-color: #f7f7f7;
		color: #cccccc;
	}
	.numberText {
		flex: 1;
		text-align: center;
		line-height: 60rpx;
		border: 0 2rpx 0 2rpx;
		border-color: #f1f1f1;
	}
}
.edit {
	position: fixed;
	width: 120rpx;
	height: 120rpx;
	box-sizing: border-box;
	background: linear-gradient(135deg,#f89045 30%,#ff720d);
	box-shadow: 2rpx 4rpx 10rpx #f89045;
	border-radius: 50%;
}
.pageBottom {
	position: fixed;
	bottom: 0;
	width: 750rpx;
	border-top: 2rpx solid #f1f1f1;
	.buyBtn {
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #ff720d;
		text-align: center;
		border-radius: 40rpx;
		color: white;
		margin-left: 30rpx;
	}
}
</style>
