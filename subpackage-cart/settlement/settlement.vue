<template>
	<view class="d-flex j-center">
		<view class="settlement p-1 text-center">
			<view class="font-md">请扫描二维码进行结算</view>
			<image
				src="https://qr.api.cli.im/newqr/create?data=%25E6%25B5%258B%25E8%25AF%2595%25E4%25B8%2593%25E7%2594%25A8%25E4%25BA%258C%25E7%25BB%25B4%25E7%25A0%2581&level=H&transparent=false&bgcolor=%23FFFFFF&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&logoshape=no&size=500&kid=cliim&key=b177f1c094e4914d27480b9a62fa47b2"
				mode="widthFix"
				style="width: 600rpx;"
			></image>
			<view>
			  <text class="text-muted">	共{{info.total}}本 合计</text><text class="font-md font-weight pl-1" style="color: #d0332f;">¥ {{info.totalPrice}}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: {}
		};
	},
	onLoad(options) {
		this.info = {
			total: parseInt(options.total),
			totalPrice: parseInt(options.totalPrice).toFixed(2)
		};
	},
	methods: {}
};
</script>

<style scoped lang="scss">
.settlement {
	margin-top: 60rpx;
	border: 2rpx solid #f1f1f1;
	border-radius: 20rpx;
}
</style>
