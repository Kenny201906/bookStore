<template>
 <view class="">
          <!--  <u-input type="text" value="" v-model="info.account" />
			  <u-input type="text" value="" v-model="info.password" />
	          <button @click="submit">提交</button> -->
 </view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
				account: "",
				password: ""	
				}
			
			}
		},
		onLoad() {
  
		},
		methods: {
		// async submit(){
		// 	   const db = uniCloud.database();
	 //           const res = await db.collection('login').where({_id: '629322bc9b54e30001adb8f6'}).update({
		// 		   account: this.info.account,
		// 		   password: this.info.password
		// 	   })
		//  }
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
