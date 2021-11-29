<template>
	<view class="c-box">
		<image class="c-icon" src="../../static/tabber/star.png" mode=""></image>
		<text class="c-tips">开发者努力编写中，目前只能靠你自己！</text>
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
		margin: 20rpx;
		font-size: 40rpx;
	}

</style>
