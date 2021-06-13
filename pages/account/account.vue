<template>
	<view class="c-box">
		<view class="c-area">
			<view class="c-title">头像</view>
			<view class="c-desc">稍后我们会支持更新头像</view>
			<image class="c-avatar" src="../../static/logo.png"></image>
			<u-gap height="2" bg-color="#ebebeb"></u-gap>
		</view>

		<view class="c-area">
			<view class="c-title">登录方式设置</view>
			<view class="c-bind-title">电子邮箱</view>
			<button class="c-button">绑定邮箱</button>
			<u-gap height="2" bg-color="#ebebeb"></u-gap>

			<view class="c-bind-title">微信账号</view>
			<button class="c-button">绑定微信</button>
			<u-gap height="2" bg-color="#ebebeb"></u-gap>

			<view class="c-bind-title">手机号码</view>
			<view class="c-bind">
				1101010101001
			</view>
			<u-gap height="2" bg-color="#ebebeb"></u-gap>
		</view>

		<view class="c-area">
			<view class="c-title">PRO 账号设置</view>
			<view class="c-bind-title">设置个性域名</view>
			<input class="c-input" type="text" value="eatmans.codetramsfer.com" />
			<view class="c-desc">定制属于你的专属传输工具，首先从个性化的定制域名开始,设置成功后暂不支持二次修改</view>
			<button class="c-button">立即升级</button>
			<u-gap height="2" bg-color="#ebebeb"></u-gap>

			<view class="c-bind-title">定制专属传输背景</view>
			<view class="c-desc">定制图片或者视频背景来增加访问者对您或者您团队、产品的认知，奶牛快传不止是工具，也是您的推广营销平台</view>
			<button class="c-button">立即升级</button>
			<u-gap height="2" bg-color="#ebebeb"></u-gap>

			<view class="c-bind-title">PRO 成员设置</view>
			<view class="c-desc">需成为团队账号</view>
			<view class="c-desc">团队成员 3TB 云盘空间(每个账号)</view>
			<button class="c-button">立即升级</button>
			<u-gap height="2" bg-color="#ebebeb"></u-gap>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.c-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 45rpx 0 45rpx;
	}

	.c-area {
		display: flex;
		flex-direction: column;
		margin-top: 40rpx;
	}

	.c-title {
		color: #3f3f3f;
		font-size: 40rpx;
		margin-bottom: 10rpx;
	}

	.c-desc {
		color: #888888;
	}

	.c-avatar {
		width: 100rpx;
		height: 100rpx;
		margin: 45rpx 0;
		background-color: #e6e6e6;
		padding: 20rpx;
		border-radius: 25rpx;
	}

	.c-bind {
		margin: 30rpx 0 30rpx 0;
		font-size: 30rpx;
		color: #888888;
	}

	.c-bind-title {
		color: #2C405A;
		margin-top: 20rpx;
		font-size: 30rpx;
	}

	.c-button {
		width: 200rpx;
		/* padding: 5rpx; */
		color: #FFFFFF;
		font-size: 30rpx;
		margin-left: 0rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		background-color: #CD0A0A;
	}

	.c-input {
		background-color: #F8F8F8;
	}
</style>
