<template>
	<view>
		<uni-status-bar />
		<view class="d-flex a-center j-sb py-2 px-3 text-light-muted">
			<view class="iconfont icon-shanchu1" @click="goBack"></view>
			<!--     <view class="font-md" @click="forget">忘记密码</view> -->
		</view>

		<view class="p-5">
			<view class="font-big mb-3">账密登录</view>

			<input type="text" class="border-bottom mb-4  px-0" placeholder="请输入手机号/邮箱/账号(测试账号:a123456)"
				v-model="username" placeholder-class="text-light-muted"
				:class="focusClass.username ? 'input-border-color' : ''" />

			<input type="password" class="border-bottom mb-3  px-0" placeholder="请输入密码(测试密码:a123456)" v-model="password"
				placeholder-class="text-light-muted" :class="focusClass.password ? 'input-border-color' : ''" />

			<view class="d-flex j-center">
				<view :class="['loginBtn',active ? 'active' : '']" @click="submit">
					{{loginText}}
					<template v-if="active &&  fail">
						<view class="loadingIcon" :class="active ? 'rotation' : '' ">
						</view>
					</template>

					<template v-if="!fail">
						<view class="success">
							<view class="successHeight" :class="!fail ? 'sucessHeightAnimation ' : ''">
							</view>
							<view class="successWidth" :class="!fail ? 'successWidthAnimation' : ''">
							</view>
						</view>
					</template>


				</view>
			</view>

			<view class="d-flex j-sb mt-2">
				<label class="checkbox d-flex a-center" @click="check = !check">
					<checkbox :checked="check" />
					<text class="text-light-muted font">已阅读并同意XXXXX协议</text>
				</label>
				<view class="text-light-muted">
					没有账号?
					<text style="color: #4a7cee" @click="goToRegester">立即注册</text>
				</view>
			</view>
			<view class="d-flex j-center mt-3">
				<view class="d-flex a-center" @click="loginByWx">
					<u-icon name="weixin-fill" color="#2ddc72" size="28"></u-icon>
					微信登录
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni-ui/uni-status-bar/uni-status-bar.vue';
	import {
		mapActions
	} from 'vuex'
	export default {
		components: {
			uniStatusBar
		},
		data() {
			return {
				username: 'a123456',
				fail: true,
				active: false,
				loginText: '登录',
				password: 'a123456',
				check: true,
				// 验证规则
				rules: {
					username: [{
						rule: /^[a-zA-Z]\w{5,17}$/,
						msg: '账号必须字母开头，长度在6~18之间，只能包含字母、数字和下划线'
					}],
					password: [{
						rule: /^.{5,20}$/,
						msg: '密码长度必须为5-20个字符'
					}]
				},
				focusClass: {
					username: false,
					password: false
				}
			};
		},
		methods: {
			...mapActions(['loginByAccountAction']),
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 表单验证
			validate(key) {
				var check = true;
				this.rules[key].forEach(v => {
					// 验证失败
					if (!v.rule.test(this[key])) {
						uni.showToast({
							title: v.msg,
							icon: 'none'
						});
						check = false;
						return false;
					}
				});
				return check;
			},
			// 提交表单
			submit() {
				if (!this.check) {
					return uni.showToast({
						title: '请先同意XXXXX协议',
						icon: 'none'
					});
				}
				this.active = !this.active;
				this.loginText = ''
				let _this = this;

				// 验证用户名
				setTimeout(async () => {
					if (!_this.validate('username') || !_this.validate('password')) {
						_this.active = !_this.active
						_this.loginText = '登录'
						return;
					}
					const res = await _this.loginByAccountAction({
						username: _this.username,
						password: _this.password
					});
					if (res.code !== 200) {
						_this.active = !_this.active
						_this.loginText = '登录'
						uni.$u.toast('登录失败')
					} else {
						_this.fail = false;
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/my/my'
							})
							uni.$u.toast('登录成功')
						}, 580)
					}
				}, 600);
			},
			//wx登录
			loginByWx() {
				let _this = this;
				uni.getUserProfile({
					desc: '用户登录',
					success: res => {
						uni.login({
							provider: 'weixin',
							async success(res) {

								const resp = await _this.$http.post('/user/loginByWx', {
									code: res.code
								});

							}
						});
					}
				});
			},
			//注册
			goToRegester() {
				uni.navigateTo({
					url: '/subpackage-my/register-account/register-account'
				});
			},
			forget() {}
		}
	};
</script>

<style scoped lang="scss">
	.loginBtn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 650rpx;
		cursor: pointer;
		border-radius: 40rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		transition: all .5s cubic-bezier(.2, 1, 0, 1);
		background: linear-gradient(to right, #ff8319, #ffa940);
		color: white;

		.loadingIcon {
			width: 50rpx;
			height: 50rpx;
			border-radius: 50%;
			border: 10rpx solid #ededef;
			border-bottom-color: white;
		}

		.success {
			position: relative;
			width: 20rpx;
			height: 40rpx;
			transform: rotate(45deg) translateY(-2px);
		}

		.successHeight {
			position: absolute;
			right: 0;
			bottom: 0;
			width: 6rpx;
			height: 0px;
			background-color: white;
		}

		.sucessHeightAnimation {
			animation: beHeight .3s ease forwards .1s;
		}

		.successWidthAnimation {
			animation: beWidth .2s ease forwards;
		}

		.successWidth {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 0px;
			height: 6rpx;
			background-color: white;
		}

		@keyframes beHeight {
			to {
				height: 40rpx;

			}
		}

		@keyframes beWidth {
			to {
				width: 20rpx;
			}
		}
	}

	.active {
		width: 80rpx !important;
	}

	.rotation {
		animation: rotation .5s ease-in infinite;
	}

	@keyframes rotation {
		to {
			transform: rotate(360deg);
		}
	}
</style>
