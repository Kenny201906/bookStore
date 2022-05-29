<template>
	<view>
			<u-popup :show="show" :closeable="true">
		            <view class="p-3 d-flex j-center a-center">
		            <template v-if="type === 'input' || type === 'password'">
						  <u--input
						    :placeholder="placeholder"
						    border="surround"
						    clearable
							:password="type === 'password' ? true : false"
						  ></u--input>
		            </template>
					<template v-else-if="type === 'textArea'">
						<u--textarea v-model="textArea" placeholder="请输入内容" count ></u--textarea>
					</template>
					
					<template v-else-if="type === 'select'">
						<block v-for="(item,index) in options" :key="index">
							<view class="text-center" :class="defaultIndex === index ? 'font-weight' : ''" @click="select(index)">
								{{item}}
							</view>
						</block>
					</template>
		            </view>
					<view class="confirmBtn" @click="confirm">
						确定
					</view>
				</u-popup>
	</view>
</template>

<script>
	export default {
		props: {
			type: String,
			placeholder: String,
			rule:  {
				type: Object,
				default: ()=>{
               return {}
         }
			},
			options: {
				type: Array,
				 default() {
				        return [];
				      }
			}
		},
		name:"ke-popup",
		data() {
			return {
			 show: false,
			 defaultIndex: 0,
			};
		},
		methods: {
			show(){
				this.show = true
			},
			confirm() {
				this.show =false;
			},
			select(index){
				this.defaultIndex = index;
			}
		}
	}
</script>

<style scoped lang="scss">
	.confirmBtn {
		margin-top: 20rpx;
		width:  200rpx;
		height: 60rpx;
		line-height: 60rpx;
	    text-align: center;
        border-radius: 30rpx;
		background: linear-gradient(to right, #20dab4, #22b1ac);
		color: white;
	}

</style>