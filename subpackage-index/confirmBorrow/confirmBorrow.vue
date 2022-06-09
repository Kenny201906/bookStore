<template>
	<view style="">
		<view class="desc">
			<view class="" style="background-color: #f0eff5; font-size: 30rpx; padding: 15rpx 32rpx 15rpx 0rpx;">
				<text class="ui-label">图书信息</text>
			</view>
			<view class="ui-panel d-flex">
				<image class="ui-book-card__img mx-1" style="margin-left: -30rpx;"
					:src="bookData.cover" mode="widthFix" ></image>
				<view class="infoContent mt-2 font-gray-26">
					<view class="bookTitle">{{bookData.name}}</view>

					<view>评分：<span class="color-yellow">{{bookData.score}}</span></view>
					<view>作者:
						<text class="ui-book-card__info-name">{{bookData.author}} </text>
					</view>
					<view>出版社: {{bookData.press}}</view>
					<view>出版时间: {{bookData.createTime}}</view>
					<view>ISBN:  {{bookData.isbn}}</view>
				</view>
			</view>
		</view>

		<view class="desc">
			<view class="" style="background-color: #f0eff5; font-size: 30rpx; padding: 15rpx 32rpx 15rpx 0rpx;">
				<text class="ui-label">请选择取书日期(最晚日期:{{lastestDate}})</text>
			</view>
			<view class="border-bottom" style="padding: 30rpx;">
				<view class="d-flex j-sb" style="font-size: 32rpx;" @click="showPicker">
					取书日期: {{ value2}}<text style="#888888">></text>
				</view>
			</view>
		</view>
		<divider></divider>
		<view class="" style="padding: 30rpx; margin-top: 20rpx ;height: 100%;">
			<button type="primary" @click="confirmBorrow" style="background-color: #ff8319;">确认借阅</button>
		</view>
		<u-datetime-picker :show="show" v-model="value" mode="date" closeOnClickOverlay @confirm="confirm"
			@cancel="cancel" @change="change" @close="close"></u-datetime-picker>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				// 订单最晚取书日期：一个月后
				bookData: {},
				lastestDate: '',
				bookId: '',
				show: false,
				value: new Date().getTime(),
				value2: ''
			}
		},
		onShow() {
			this.lastestDate = this.formatDate(this.dateAdd('M', 1, new Date()))
		},
		
	    onLoad(options) {
		    this.bookId = parseInt(options.bookId)
			this.bookData = JSON.parse(options.bookData)
			console.log(this.bookData );
	    },
		methods: {
			...mapActions(['borrowOrderAction']),
			dateAdd(interval, number, date) {
				switch (interval) {
					case 'y': {
						date.setFullYear(date.getFullYear() + number)
						return date
					}
					case 'q': {
						date.setMonth(date.getMonth() + number * 3)
						return date
					}
					case 'M': {
						date.setMonth(date.getMonth() + number)
						return date
					}
					case 'w': {
						date.setDate(date.getDate() + number * 7)
						return date
					}
					case 'd': {
						date.setDate(date.getDate() + number)
						return date
					}
					case 'h': {
						date.setHours(date.getHours() + number)
						return date
					}
					case 'm': {
						date.setMinutes(date.getMinutes() + number)
						return date
					}
					case 's': {
						date.setSeconds(date.getSeconds() + number)
						return date
					}
				}
			},
			formatDate(date, glue = '-') {
				var year = date.getFullYear()
				var month = date.getMonth() + 1
				var day = date.getDate()
				return [year, month, day].map(n => {
					n = n.toString()
					return n[1] ? n : '0' + n
				}).join(glue)
			},
			close() {
				this.show = false
			},
			cancel() {
				this.show = false
			},
			confirm(e) {
				
				this.show = false
				console.log(e.value);
				this.value2 = uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM:ss')
				console.log(this.value);

			},
			change(e) {
				// console.log('change', e)
			},
			showPicker() {
				this.show = true
			},
			confirmBorrow() {
				if (this.value2 == '') {
					return this.$u.toast('请选择取书日期')
				}
				const isLegitimate = new Date().getTime()-24*60*60*1000 < new Date(this.value).getTime() && new Date(this.value).getTime() < new Date(this.lastestDate).getTime(); 
				if(!isLegitimate){
					return this.$u.toast('借阅时间不合法')
				}
               this.borrowOrderAction({
				   bookId: this.bookId,
				   userId: uni.getStorageSync('userInfo').id,
				   businessId: uni.getStorageSync('bookStore').id,
				   unitPrice: this.bookData.unitPrice,
				   count: 1,
				   type: 0,
				   borrowTime: this.value2
			   })
				// 发请求
				uni.navigateTo({
					url: '/subpackage-index/result/result'
				})
			}
		}

	}
</script>

<style scoped lang="scss">
	.ui-panel {
		padding: 30rpx;
	}

	.ui-label {
		font-size: 28rpx;
		margin-top: .77em;
		margin-bottom: .3em;
		padding-left: 30rpx;
		padding-right: 30rpx;
		color: #999999;
	}

	.ui-book-card__img {
		width: 300rpx;
	}

	.color-yellow {
		color: #FFBF00;
	}

	.bookTitle {
		font-weight: 400;
		font-size: 32rpx;

		color: #353535;
	}

	.font-gray-26 {
		color: #888;
		font-size: 26rpx;
	}
</style>
