<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import '@/uni_modules/uview-ui/index.scss';
	/* 每个页面的公共css */
	@import url('/common/uni.css');
	/* 自定义图标库 */
	/* 公共样式库 */
	@import url('/common/common.css');
	/* 基础样式 */
	@import url('/common/zcm-main.css');
	@import url('/common/common.scss');
</style>
