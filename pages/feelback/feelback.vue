<template>
	<view class="c-box">
		<image class="c-icon" src="../../static/tabber/star.png" mode=""></image>
		<text class="c-tips">暂时不接受任何反馈！</text>
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
		align-items: center;
	}
	.c-icon {
		margin-top: 250rpx;
		width: 125rpx;
		height: 125rpx;
	}
	
	.c-tips {
		margin-top: 50rpx;
		font-size: 40rpx;
	}
</style>
