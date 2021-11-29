<template>
	<view class="c-container">

		<view v-if="hasLogin === true">
			<u-dropdown active-color="#FF2626">
				<u-dropdown-item v-model="orderRule" title="排序" :options="orderRuleList"></u-dropdown-item>
				<u-dropdown-item v-model="pickupCodeRule" title="取件码" :options="pickupCodeRuleList"></u-dropdown-item>
				<u-dropdown-item v-model="timeRule" title="时间" :options="timeRuleList"></u-dropdown-item>
			</u-dropdown>
			<view class="c-list">
				<uni-swipe-action>
					<uni-swipe-action-item :index="index" v-for="(item, index) in fileList" :key="item.id"
						@change="swipeChange($event, item.id)">
						<view class="c-item" @tap="showDownloadPopup(item)">
							<view class="c-item-box">
								<view class="c-item-miansu">
									<view class="c-item-filename">
										{{item.filename}}
									</view>
									<view class="c-item-detail">
										<view class="c-item-filetype">
											大小：{{renderSize(item.fileSize)}}
										</view>
										<!-- <view class="c-item-createor">
											创建者： EATMANS
										</view> -->
										<view class="c-item-time">
											失效时间： 永不失效
										</view>
									</view>
								</view>
							</view>
						</view>
						<template v-slot:right>
							<view class="c-sa-right-box">
								<view class="c-right-item" @click="deletaFileById(item.id)">
									<u-icon name="trash" color="#FF2626" size="40"></u-icon>
								</view>
							</view>
						</template>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			<u-back-top :scroll-top="scrollTop"></u-back-top>
			<view class="c-nocontent" v-if="fileList.length == 0">
				<image class="c-nofile" src="../../static/nofile.png"></image>
				<text class="c-nocontent-desc">什么都没有</text>
			</view>
		</view>

		<u-popup v-model="showOperation" mode="bottom" border-radius="14" length="40%">

			<view class="c-option-area">
				<view class="c-grip">
				</view>
				<view class="c-button" @tap="downloadFile()">
					下载与分享到聊天框
				</view>

				<view class="c-button" @tap="copyFileURL()">
					查看下载URL
				</view>

				<view class="c-button" @tap="showPickupCode()">
					查看组取件码
				</view>

				<view class="c-button" @tap="deletaFile()">
					删除记录
				</view>
			</view>
		</u-popup>

		<view class="c-area" v-if="hasLogin === false">
			<image class="c-icon" src="../../static/tabber/star.png" mode=""></image>
			<text class="c-tips">该功能需要完成登录后才可以使用，现在去登录吧！</text>
			<button class="c-sign-in" @click="userAuthorized()">授权登录</button>
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
				orderRule: 1,
				pickupCodeRule: 1,
				timeRule: 2,
				orderRuleList: [{
						label: '降序',
						value: 1,
					},
					{
						label: '升序',
						value: 2,
					}
				],
				pickupCodeRuleList: [{
						label: '默认',
						value: 1,
					}, {
						label: '是否失效',
						value: 2,
					},
					{
						label: '剩余次数',
						value: 3,
					},
					{
						label: '文件组取件码',
						value: 4,
					},
				],
				timeRuleList: [{
						label: '创建时间',
						value: 1,
					},
					{
						label: '修改时间',
						value: 2,
					},
				],
				scrollTop: 0,
				
			}
		},
		watch: {
			orderRule: function(val, oldVal) {
				// console.log('new: %s, old: %s', val, oldVal)
				this.init()
			},
			pickupCodeRule: function(val, oldVal) {
				// console.log('new: %s, old: %s', val, oldVal)
				this.init()
			},
			timeRule: function(val, oldVal) {
				// console.log('new: %s, old: %s', val, oldVal)
				this.init()
			},
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		computed: {
			...mapState(['hasLogin', "serverUrl", "userInfo"]),
		},
		onShow() {
			this.init()
		},
		onShareAppMessage() {
			return {
				title: '可得快传',
				path: '/pages/index/index',
				imageUrl: 'https://transfer.rjxh.cloud/transfer/pMqn7LitId1p37dcd02e6e5856125fbc1597fa38db9b.png'
			}
		},

		methods: {
			...mapMutations(['login', "logout"]),
			swipeChange(e, index) {
				// console.log('当前状态：' + e + '，下标：' + index)
			},
			getFile(uid) {
				var that = this
				this.$u.get('history/order', {
					uid: uid,
					orderRule: this.orderRule,
					pickupCodeRule: this.pickupCodeRule,
					timeRule: this.timeRule
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						try {
							this.fileList = res.data;
						} catch (e) {
							console.log("出错了")
						}
					} else {
						// console.log(res);
						uni.showToast({
							title: res.desc,
							icon: 'none'
						});
					}
				}).catch(error => console.log(error));
			},
			// getFile(uid) {
			// 	var that = this
			// 	this.$u.get('history/', {
			// 		uid: uid
			// 	}).then(res => {
			// 		console.log(res)
			// 		if (res.code == 200) {
			// 			try {
			// 				this.fileList = res.data;
			// 			} catch (e) {
			// 				console.log("出错了")
			// 			}
			// 		} else {
			// 			console.log(res);
			// 			uni.showToast({
			// 				title: res.desc,
			// 				icon: 'none'
			// 			});
			// 		}
			// 	}).catch(error => console.log(error));
			// },
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

			init() {
				let user = uni.getStorageSync("userInfo");
				if (user != "") {
					this.login(user)
					this.getFile(user.id);
				};
				wx.showShareMenu({
					withShareTicket: true,
					menus: ['shareAppMessage', 'shareTimeline']
				})

			},

			// 通过在传值提前设置好可能下载的内容
			showDownloadPopup(content) {
				this.needToDownload = content;
				this.showOperation = true;
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
			deletaFileById(id) {
				this.$u.get('file/delete', {
					id: id,
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
					}
					this.showOperation = false
				});
			},
			deletaFile() {
				this.$u.get('file/deleteByIdAndUid', {
					id: this.needToDownload.id,
					uid: this.userInfo.id
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
					}
					this.showOperation = false
				});
			},
			copyFileURL() {
				uni.showModal({
					title: '该文件的URL',
					content: 'https://transfer.rjxh.cloud/transfer/' + this.needToDownload.saveAddress,
					showCancel: false,
					confirmText: '复制',
					success: res => {
						if (res.confirm) {
							uni.setClipboardData({
								data: 'https://transfer.rjxh.cloud/transfer/' + this.needToDownload
									.saveAddress,
								success: function() {
									console.log('设置粘贴板数据成功');
								}
							});
						}
					},

				});

			},

			showPickupCode() {
				this.$u.get('group/gid', {
					gid: this.needToDownload.groupId
				}).then(res => {
					if (res.code == 200) {
						uni.showModal({
							title: '取件码',
							content: res.data,
							showCancel: false,
							// cancelText: '关闭',
							confirmText: '复制',
							success: res2 => {
								if (res2.confirm) {
									uni.setClipboardData({
										data: res.data,
										success: function() {
											console.log('设置粘贴板数据成功');
										}
									});
								}
							},
						});
					} else {
						uni.showToast({
							icon: "none",
							title: res.desc
						});
					}
				});

			},
			userAuthorized() {
				wx.getUserProfile({
					desc: '用于完善会员资料',
					success: res => {
						this.userProfile = res;
						this.onGetUserInfo();
					}
				})

			},
			getUserInfo() {
				let user = uni.getStorageSync("userInfo");
				if (user != "") {
					this.login(user)
				}

			},
			onGetUserInfo() {
				var that = this
				wx.login({
					success: login_res => {
						wx.request({
							url: this.serverUrl + 'user/login',
							method: 'POST',
							header: {
								'content-type': 'application/json'
							},
							data: {
								code: login_res.code, //临时登录凭证
								rawData: that.userProfile.rawData, //用户非敏感信息
								signature: that.userProfile.signature, //签名
								encrypteData: that.userProfile.encryptedData, //用户敏感信息
								iv: that.userProfile.iv //解密算法的向量
							},
							success: res => {
								if (res.data.code == 200) {
									this.login(res.data.data)
									uni.showToast({
										title: '登录成功'
									});
									this.init()
								} else if (res.data.code == 500) {
									that.userStatus = '签名失败,请退出重新授权！';
									uni.showToast({
										title: '签名失败,请退出重新授权！',
										icon: "none",
										duration: 5000
									});
								} else {
									uni.showToast({
										title: '服务器异常',
										icon: "none",
										duration: 3000
									});
								}
							},
							fail: function(error) {
								uni.showToast({
									title: '网络错误',
									icon: "none",
									duration: 3000
								});
								console.log(error);
							}

						})
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F5F0F0;
	}

	.c-box {
		background-color: #FFFFFF;
		padding: 30rpx;
		margin: 10rpx 20rpx;
		border-radius: 25rpx;
		animation: boingInUp;
		animation-duration: 1s;
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
		/* width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center; */
	}

	.c-item {
		display: flex;
		margin: 5rpx 20rpx;
		border-radius: 25rpx;
		background-color: #ffffff;
	}

	.c-item-box {
		display: flex;
		margin: 10rpx;
		width: 96%;
	}

	.c-right-box {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100rpx;
	}


	.c-item-miansu {
		width: 100%;
		color: #FFF;
		padding: 10rpx;
		border-radius: 45rpx;
	}

	.c-item-filename {
		/* width: 570rpx; */
		font-size: 35rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #2b2b2b;
	}

	.c-item-filetype {
		width: 40%;
		font-size: 25rpx;
		color: #888;
	}

	.c-item-createor {
		width: 35%;
	}


	.c-item-time {
		width: 60%;
		/* background-color: #000000; */
	}

	.c-item-detail {
		display: flex;
		justify-content: space-around;
		flex-direction: row;
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



	.c-sa-right-box {
		width: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}


	.c-task-item {
		display: flex;
		align-items: center;
		/* margin: 20rpx 0; */
	}


	.c-right-item {
		background-color: #fefeff;
		margin: 10rpx;
		border-radius: 20rpx;
		padding: 10rpx;
	}
</style>
