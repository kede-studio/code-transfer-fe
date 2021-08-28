<template>
	<view class="container">
		<button @tap="userAuthorized()">授权登录</button>
		<view class="">
			<image :src="userInfo.avatarUrl" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hasUserInfo: false,
				userInfo: null,
				userProfile: null
			}
		},
		onShow() {

		},

		methods: {
			
			userAuthorized() {
				wx.getUserProfile({
					desc: '用于完善会员资料',
					success: res => {
						this.hasUserInfo = true
						this.userInfo = res.userInfo
						this.userProfile = res
						this.onGetUserInfo();
					}
				})


			},

			onGetUserInfo() {
				var that = this
				wx.login({
					success: function(login_res) {
						wx.request({
							url: 'http://localhost:8879/wx/login',
							method: 'POST',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							data: {
								code: login_res.code, //临时登录凭证
								rawData: that.userProfile.rawData, //用户非敏感信息
								signature: that.userProfile.signature, //签名
								encrypteData: that.userProfile.encryptedData, //用户敏感信息
								iv: that.userProfile.iv //解密算法的向量
							},
							success: function(res) {
								console.log("res", res)
								if (res.data.status == 200) {
									// 7.小程序存储skey（自定义登录状态）到本地
									uni.setStorageSync('userInfo',
										that.userInfo);
									uni.setStorageSync('skey', res.data
										.data);
								} else {
									console.log('服务器异常');
								}
							},
							fail: function(error) {
								//调用服务端登录接口失败
								console.log(error);
							}

						})
					}
				})

				this.hasUserInfo = true
			}

		}
	}
</script>

<style>

</style>
