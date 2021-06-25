<template>
	<view class="c-box">

		<view class="c-top">
			<view class="c-header" @tap="gotoAccount()">
				<image class="c-image" src="../../static/logo.png" mode=""></image>
			</view>
			<text class="c-nickname">{{username}}</text>
		</view>

		<!-- 模态窗 -->
		<u-modal v-model="show" :title-style="{color: 'red'}" :mask-close-able="true">
			<view class="c-slot-content">
				<image class="c-mask-iamge" src="../../static/logo.png"></image>
				<text>暂时不开放升级功能</text>
			</view>
		</u-modal>

		<!-- 操作列表 -->
		<view class="c-lists">
			<view class="c-list" @tap="switchLanguage()">
				<text class="c-item-text">Language</text>
				<u-icon class="c-item-icon" name="arrow-right" color="#d3dbe2" size="28"></u-icon>
			</view>
			<view class="c-list" @tap="gotoFeelBack()">
				<text class="c-item-text">意见反馈</text>
				<u-icon class="c-item-icon" name="arrow-right" color="#d3dbe2" size="28"></u-icon>
			</view>
			<view class="c-list" @tap="gotoHelp()">
				<text class="c-item-text">寻求帮助</text>
				<u-icon name="arrow-right" color="#d3dbe2" size="28"></u-icon>
			</view>
		
			<view class="c-list" @tap="gotoAboutUs()">
				<text class="c-item-text">关于我们</text>
				<u-icon class="c-item-icon" name="arrow-right" color="#d3dbe2" size="28"></u-icon>
			</view>
			
<!-- 			<view class="c-list" @tap="gotoTest()">
				<text class="c-item-text">测试中心</text>
				<u-icon class="c-item-icon" name="arrow-right" color="#d3dbe2" size="28"></u-icon>
			</view> -->
		</view>

		<view class="c-upgrade-pro" @tap="upgradeToPro()">
			<view class="c-left">
				<u-icon class="c-icon" name="star-fill" size="50" color="#f7aa00"></u-icon>
			</view>
			<view class="c-righte">
				<text>立即更新</text>
				<text class="c-gray">发送更大的文件还有更多功能</text>
			</view>
		</view>

		<view class="c-welcome" v-if="!hasLogin" @tap="gotoLogin()">
			<button class="c-sign-in">注册/登录</button>
		</view>
		<view class="c-welcome" v-if="hasLogin" @tap="logoutFun()">
			<button class="c-sign-in">退出登录</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				show: false,
				username: ""
			}
		},
		onLoad() {},
		onShow() {
			this.username = "可得快传";
		},
		computed: {
			...mapState(['hasLogin']),
			...mapGetters(["userInfoGet", "userToken"])
		},
		methods: {
			...mapMutations(['login', "logout"]),
			Toast(data, duration = 1000) {
				uni.showToast(Object.assign({}, data, {
					duration
				}))
			},
			logoutFun(){
				this.logout()
			},

			gotoAccount() {
				uni.navigateTo({
					url: '../account/account',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			switchLanguage() {
				uni.showToast({
					title: '中文不香吗？',
					icon: 'none'
				});
			},
			gotoFeelBack() {
				uni.navigateTo({
					url: '../feelback/feelback',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			gotoHelp() {
				uni.navigateTo({
					url: '../help/help',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			gotoAboutUs() {
				uni.navigateTo({
					url: '../aboutus/aboutus',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			gotoLogin() {
				uni.navigateTo({
					url: '../login/login',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			
			gotoTest(){
				uni.navigateTo({
					url: '../test/test',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

			// 升级到专业版
			upgradeToPro() {
				this.show = true;
			}
		}
	}
</script>

<style>
	.c-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.c-top {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 400rpx;
		width: 100%;
		background-color: #f5f0f0;
		border-radius: 0 0 45rpx 45rpx;
	}

	.c-header {
		width: 200rpx;
		height: 200rpx;
		padding: 40rpx;
		border-radius: 50rpx;
		background-color: #FFFFFF;

	}

	.c-image {
		height: 100%;
		width: 100%;
	}

	.c-nickname {
		margin-top: 20rpx;
	}

	.c-lists {
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
	}

	.c-list {
		display: flex;
		justify-content: space-between;
	}

	.c-item-text {
		margin-top: 20rpx;
		margin-right: 400rpx;
		font-size: 35rpx;
	}

	.c-item-icon {}

	.c-upgrade-pro {
		margin-top: 40rpx;
		display: flex;
		border: 2px solid transparent;
		border-radius: 30rpx;
		background-color: transparent;
		border-color: #f7aa00;
		padding: 10rpx;

	}

	.c-left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 175rpx;
	}

	.c-righte {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.c-sign-in {
		margin-top: 50rpx;
		width: 580rpx;
		font-size: 30rpx;
		padding: 5rpx;
		border-radius: 45rpx;
		color: #FFFFFF;
		background-color: #425e92;
	}

	.c-slot-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
	}

	.c-mask-iamge {
		margin: 30rpx 0;
		width: 200rpx;
		height: 200rpx;
	}

	.c-gray {
		color: gray;
	}
</style>
