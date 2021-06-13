<template>
	<view class="c-box">

		<view v-if="hasLogin === true">
			我是已经登录的状态
			<button class="c-sign-in" @click="switchLogout()">测试退出</button>
		</view>
		<view class="c-area" v-if="hasLogin === false">
			<image class="c-icon" src="../../static/tabber/star.png" mode=""></image>
			<text class="c-tips">该功能需要完成登录后才可以使用，现在去登录吧！</text>
			<button class="c-sign-in" @click="gotoLogin()">立即注册</button>
			<button class="c-sign-in" @click="switchLogin()">测试登录</button>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState(['hasLogin', 'isUniverifyLogin', 'univerifyErrorMsg'])
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods: {
			...mapMutations(['login', 'setUniverifyLogin', "logout"]),
			...mapActions(['getPhoneNumber']),
			Toast(data, duration = 1000) {
				uni.showToast(Object.assign({}, data, {
					duration
				}))
			},
			
			// 用于测试
			switchLogin(){
				// 更新保存在 store 中的登录状态
				this.login("123");
			},
			switchLogout(){
				this.logout();
			},
			gotoLogin() {
				uni.navigateTo({
					url: '../login/login',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
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

	.c-area {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.c-icon {
		margin-top: 250rpx;
		width: 125rpx;
		height: 125rpx;
	}

	.c-tips {
		margin-top: 50rpx;
		font-size: 30rpx;
	}

	.c-sign-in {
		margin-top: 50rpx;
		width: 300rpx;
		font-size: 30rpx;
		padding: 5rpx;
		border-radius: 45rpx;
		color: #FFFFFF;
		background-color: #425e92;
	}
</style>
