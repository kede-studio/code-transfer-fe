<template>
	<view class="c-box">
		<image class="c-icon" src="../../static/tabber/star.png" mode=""></image>
		<text class="c-tips">需要成为 PRO 用户，才能使用此功能</text>
		<button class="c-sign-in" @tap="upgradeToPro()">立即升级</button>
		
		<!-- 模态窗 -->
		<u-modal v-model="show" :title-style="{color: 'red'}" :mask-close-able="true">
			<view class="c-slot-content">
				<image class="c-mask-iamge" src="../../static/logo.png"></image>
				<text>暂时不开放升级功能</text>
			</view>
		</u-modal>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				content: `
						空山新雨后<br>
						天气晚来秋
					`
			}
		},
		methods: {
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
	
	.c-slot-content{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
	}
	
	.c-mask-iamge{
		margin: 30rpx 0;
		width: 200rpx;
		height: 200rpx;
	}
</style>
