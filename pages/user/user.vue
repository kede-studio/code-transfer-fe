<template>
	<view class="">
		<view v-for="(item,index) in userList" :key="index">
			<view class="c-box">
				<view class="">
					{{item.id}}
				</view>
				<view class="">
					<image class="c-tx" :src="item.avatarUrl" mode=""></image>
				</view>
				<view class="c-info">
					<view class="">
						{{item.nickName}}
					</view>
					<view class="">
						{{item.createTime}}
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userList: []
			}
		},
		onLoad() {
			this.getUserList()
		},
		methods: {
			getUserList() {
				uni.request({
					url: 'https://tf.rjxh.cloud/user/list',
					method: 'GET',
					success: res => {
						this.userList = res.data.data;
						// console.log(res.data.data)
					},
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
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 10rpx;
		padding: 10rpx;
		border-radius: 20rpx;
		background-color: #F0F0F0;
	}

	.c-tx {
		width: 100rpx;
		height: 100rpx;
		margin: 10rpx;
	}

	.c-tips {
		margin: 20rpx;
		font-size: 40rpx;
	}
	
	.c-info{
		display: flex;
		flex-direction: column;
	}
</style>
