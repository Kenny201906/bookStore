<template>
	<view>
		<image src="https://img2.baidu.com/it/u=372769992,179618338&fm=253&fmt=auto&app=138&f=JPEG?w=1920&h=494" mode="widthFix"></image>
		<view class="border-bottom pb-1 font-md px-1" @click="phone"><text>联系电话: 18976329982(点击拨打)</text></view>
		<view class="border-bottom pt-1 pb-2 font-md px-1">地址：海南省海口市海南师范大学桂林洋校区信息院图灵社</view>
		
		<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: 0, // 使用 marker点击事件 需要填写id
			title: 'map',
			latitude: 19.98,
			longitude: 110.51 ,
			covers: [
				{
					id: 0,
					width: '40px',
					height: '40px',
					latitude: 19.98,
					longitude: 110.51,
					iconPath: '/static/images/location.png'
				}
			]
		};
	},
	methods: {
		phone(){
			uni.makePhoneCall({
				phoneNumber: '18976329982'
			})
		}
	}
};
</script>

<style>
</style>
