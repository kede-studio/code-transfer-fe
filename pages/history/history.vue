<template>
	<view class="c-box">

		<view v-if="hasLogin === true">
			<view class="c-list">
				<view class="c-tiem" v-for="(item,index) in fileList" :key="index" @tap="showDownloadPopup(item)">
					<!-- 					<view class="c-item-icon">
						<u-icon name="file-text-fill" color="#3b3b3b" size="50"></u-icon>
					</view> -->
					<view class="c-item-miansu">
						<view class="c-item-filename">
							{{item.filename}}
						</view>
						<view class="c-item-filetype">
							大小：{{renderSize(item.fileSize)}}
						</view>
					</view>
					<view class="c-item-controller">
						<u-icon name="more-dot-fill" color="#000000" size="40"></u-icon>
					</view>

				</view>
			</view>

			<view class="c-nocontent" v-if="fileList.length == 0">
				<image class="c-nofile" src="../../static/nofile.png"></image>
				<text class="c-nocontent-desc">什么都没有</text>
			</view>
		</view>

		<u-popup v-model="showOperation" mode="bottom" border-radius="14" length="30%">

			<view class="c-option-area">
				<view class="c-grip">
				</view>
				<view class="c-button" @tap="downloadFile()">
					下载与分享到聊天框
				</view>

				<view class="c-button" @tap="showPickupCode()">
					查看取件码
				</view>

				<view class="c-button" @tap="deletaFile()">
					删除记录
				</view>
			</view>
		</u-popup>

		<view class="c-area" v-if="hasLogin === false">
			<image class="c-icon" src="../../static/tabber/star.png" mode=""></image>
			<text class="c-tips">该功能需要完成登录后才可以使用，现在去登录吧！</text>
			<button class="c-sign-in" @click="gotoLogin()">立即登录</button>
			<!-- <button class="c-sign-in" @click="switchLogin()">测试登录</button> -->
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
				fileList: [],
				showOperation: false, //展开下载popup
				needToDownload: [],
				userInfo: [],
				username: ""
			}
		},
		computed: {
			...mapState(['hasLogin']),
			...mapGetters(["userToken"])
		},
		onShow() {
			this.init()
		},

		methods: {
			...mapMutations(['login', "logout", "setUserInfo"]),
			getFile(username) {
				var that = this
				this.$u.get('history/', {
					username: username
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						try {
							this.fileList = res.data;
						} catch (e) {
							console.log("出错了")
						}
					} else {
						console.log(res);
						uni.showToast({
							title: res.desc,
							icon: 'none'
						});
					}
				}).catch(error => console.log(error));
			},
			//  格式化文件大小
			renderSize(value) {
				if (null == value || value == '') {
					return "0 Bytes";
				}
				var unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
				var index = 0,
					srcsize = parseFloat(value);
				index = Math.floor(Math.log(srcsize) / Math.log(1024));
				var size = srcsize / Math.pow(1024, index);
				//  保留的小数位数
				size = size.toFixed(2);
				return size + unitArr[index];
			},
			// 用于测试
			switchLogin() {
				// 更新保存在 store 中的登录状态
				this.login("123");
			},
			init() {
				uni.getStorage({
					key: 'userInfo',
					success: res => {
						if (this.userInfo != null) {
							this.login(this.userInfo)
						}

						this.username = res.data.username;
						this.getFile(res.data.username);
						console.log(res.data.username);
					}
				});

			},

			// 通过在传值提前设置好可能下载的内容
			showDownloadPopup(content) {
				this.needToDownload = content;
				// console.log(this.needToDownload);
				this.showOperation = true;
			},
			switchLogout() {
				this.logout();
			},

			downloadFile() {
				uni.showLoading({
					title: '文件下载中'
				});
				const downloadTask = wx.downloadFile({
					url: 'https://transfer.rjxh.cloud/transfer/' + this.needToDownload.saveAddress,
					success: res => {
						console.log(res)
						if (res.statusCode === 200) {

							wx.shareFileMessage({
								filePath: res.tempFilePath,
								fileName: this.needToDownload.filename,
								success() {},
								fail: console.error,
							})

						}
					}
				});

				downloadTask.onProgressUpdate((res) => {
					if (res.progress == 100) {
						uni.hideLoading();
					}

				})

			},


			deletaFile() {
				console.log(this.needToDownload.id)
				this.$u.get('file/delete', {
					id: this.needToDownload.id
				}).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: '删除成功'
						});
						this.init();
					} else {
						uni.showToast({
							icon: "none",
							title: res.desc
						});
						console.log(res.desc);
					}
					this.showOperation = false
					console.log(res);
				});


			},

			showPickupCode() {
				uni.showModal({
					title: '取件码',
					content: this.needToDownload.pickupCode,
					showCancel: false,
					// cancelText: '关闭',
					confirmText: '复制',
					success: res => {
						if (res.confirm) {
							uni.setClipboardData({
								data: this.needToDownload.pickupCode,
								success: function() {
									console.log('设置粘贴板数据成功');
								}
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			gotoLogin() {
				uni.navigateTo({
					url: '../login/login'
				});
			}
		}
	}
</script>

<style>
	.c-box {
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		align-items: center;
		height: 100vh;
		/* background-color: #F5F0F0; */
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

	.c-nocontent {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 50rpx;

	}

	.c-nofile {
		width: 250rpx;
		height: 250rpx;
	}

	.c-nocontent-desc {
		font-size: 25rpx;
		color: #C8C7CC;

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

	.c-list {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.c-tiem {
		display: flex;
		flex-direction: row;
		background-color: #F5F0F0;
		justify-content: center;
		align-items: center;
		margin: 5rpx;
		width: 96%;
		height: 125rpx;
		border-radius: 20rpx;
	}

	.c-item-icon {
		width: 50rpx;
	}

	.c-item-miansu {
		width: 580rpx;
	}

	.c-item-filename {
		width: 570rpx;
		font-size: 35rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #2b2b2b;
	}

	.c-item-filetype {
		font-size: 25rpx;
		color: #888;
	}

	.c-item-controller {
		width: 60rpx;
	}

	.c-option-area {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.c-button {
		width: 90%;
		padding: 20rpx;
		background-color: #F0AD4E;
		text-align: center;
		margin: 10rpx;
		border-radius: 25rpx;
		color: #FFFFFF;
	}

	.c-grip {
		width: 75rpx;
		height: 15rpx;
		margin-top: 20rpx;
		background-color: #C0C0C0;
		border-radius: 45rpx;
	}
</style>
