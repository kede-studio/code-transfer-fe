<template>
	<view class="c-box">

		<!-- 顶部操作栏 -->
		<view class="c-top-bar">
			<image class="c-logo" src="../../static/logo.png" mode=""></image>
			<view class="c-top-bar-area">
				<view class="c-text" v-for="(item,index) in tools" @tap="switchTabs(index)" :key="index">
					<text :class="tabIndex == index ?'c-act' :''">{{item}}</text>
				</view>
			</view>

		</view>

		<!-- 背景图片 -->
		<image class="c-image" src="../../static/bg.jpg"></image>

		<!-- 添加文件面板 -->
		<u-popup v-model="showAdd" mode="bottom" border-radius="14" length="80%">
			<view class="c-upload-box">
				<view class="c-grip">
				</view>
				<view class="c-upload-top">
					<text class="c-title">添加文件</text>
				</view>

				<view class="c-upload-content">
					<view class="c-list-item" v-for="item in tempFiles" :key="item.time">
						<!-- <text class="c-list-item-progress">{{item.progress ? item.progress : "0" }}</text> -->
						<u-icon class="c-list-item-filetype" name="file-text" color="#b4b4b4" size="50"></u-icon>
						<text class="c-list-item-filename">{{item.name}}</text>
						<text class="c-list-item-filesize">{{renderSize(item.size)}}</text>
						<u-icon class="c-list-item-del" name="trash-fill" color="#cbcbcb" size="50"
							@tap="deleteFile(tempFiles,item.name)"></u-icon>
					</view>
					<view class="c-nocontent" v-if="tempFiles.length == 0">
						<image class="c-nofile" src="../../static/nofile.png"></image>
						<text class="c-nocontent-desc">什么都没有</text>
					</view>
					<view class="c-add-file-area">
						<u-icon @tap="show = true" name="plus-circle-fill" color="#cd0a0a" size="70"></u-icon>
					</view>
				</view>

				<view class="c-upload-bottom">
					<button :class="[checked ? 'c-upload-button' : 'c-upload-button-unagree']"
						@tap="uploadFile">开始上传</button>
					<view class="c-option">
						<u-icon class="c-option-icon" name="tags-fill" size="45" color="#de0a0a"></u-icon>
						<text class="c-option-desc">内容描述</text>
						<text class="c-option-add" @tap="showInput()">立即添加</text>
					</view>
					<view class="c-option">
						<u-icon class="c-option-icon" name="lock-opened-fill" size="45" color="#de0a0a"></u-icon>

						<view class="c-option-box">
							<text class="c-option-desc">我已经阅读且同意</text>
							<text class="c-option-desc">可得快传<text class="c-argeement">《服务协议》</text>和<text
									class="c-argeement">《隐私协议》</text></text>
						</view>
						<u-switch class="c-option-choose" v-model="checked" active-color="red" inactive-color="#eee">
						</u-switch>
					</view>
					<view class="c-option">
						<u-icon class="c-option-icon" name="fingerprint" size="45" color="#de0a0a"></u-icon>
						<text class="c-option-desc">收件密码</text>
						<view class="c-option-subsection-mid">
							<view class="c-input-pwd-box" v-if="showSetPwd">
								<view class="c-input-pwd">
									<input type="text" value="" placeholder="请输入四位密码" auto-focus="true" focus="true"
										maxlength="4" v-model="pwd" />
								</view>
								<view class="c-chancl" @click="chanclFilePwd">
									取消
								</view>
							</view>
							<view class="" v-else>
								<u-subsection mode="button" :list="selectShareDaySub" bgColor="#eaeaea"
									buttonColor="#ffffff" active-color="#de0a0a" font-size="25" height="60"
									:current="curPwdNow" @change="sectionChangeFilePassword">
								</u-subsection>
							</view>

						</view>
					</view>

					<view class="c-option">
						<u-icon class="c-option-icon" name="hourglass-half-fill" size="45" color="#de0a0a"></u-icon>
						<text class="c-option-desc">收件限量</text>
						<view class="c-option-subsection">
							<u-subsection mode="button" :list="canDownloadNumList" bgColor="#eaeaea"
								buttonColor="#ffffff" :current="canDownloadNumNow" active-color="#de0a0a" font-size="25"
								height="60" @change="changeCanDownloadNum">
							</u-subsection>
						</view>
					</view>
					<!-- <view class="c-option">
						<u-icon class="c-option-icon" name="tags-fill" size="45" color="#de0a0a"></u-icon>

						<text class="c-option-desc">收件实名</text>
						<view class="c-option-subsection-mid">
							<u-subsection mode="button" :list="selectShareDaySub" bgColor="#eaeaea"
								buttonColor="#ffffff" active-color="#de0a0a" font-size="25" height="60"></u-subsection>
						</view>
					</view> -->
					<!-- 
					<view class="c-option">
						<u-icon class="c-option-icon" name="play-circle-fill" size="45" color="#de0a0a"></u-icon>
						<text class="c-option-desc">仅开始收件时间</text>
						<view class="c-option-subsection-mid">
							<u-subsection mode="button" :list="selectShareDaySub" bgColor="#eaeaea"
								buttonColor="#ffffff" active-color="#de0a0a" font-size="25" height="60"></u-subsection>
						</view>

					</view>
					<view class="c-option">
						<u-icon class="c-option-icon" name="pause-circle-fill" size="45" color="#de0a0a"></u-icon>
						<text class="c-option-desc">仅停止收件时间</text>
						<view class="c-option-subsection-mid">
							<u-subsection mode="button" :list="selectShareDaySub" bgColor="#eaeaea"
								buttonColor="#ffffff" active-color="#de0a0a" font-size="25" height="60"></u-subsection>
						</view>
					</view>
					<view class="c-option">
						<u-icon class="c-option-icon" name="pause-circle-fill" size="45" color="#de0a0a"></u-icon>
						<text class="c-option-desc">设置收件时间范围</text>
						<view class="c-option-subsection-mid">
							<u-subsection mode="button" :list="selectShareDaySub" bgColor="#eaeaea"
								buttonColor="#ffffff" active-color="#de0a0a" font-size="25" height="60"></u-subsection>
						</view>
						<u-calendar v-model="showSelectShareDay" :mode="mode" @change="selectShareDay"></u-calendar>
					</view> -->
				</view>
			</view>
		</u-popup>

		<!-- 接收面板 -->
		<u-popup v-model="showAccept" mode="bottom" border-radius="14" length="50%">
			<view class="c-accept">
				<view class="c-grip">
				</view>
				<text class="c-accept-text">输入取件码</text>
				<u-message-input @change="change" @finish="finish" :maxlength="6"></u-message-input>
			</view>
		</u-popup>

		<!-- 接收面板 -->
		<u-popup v-model="showInputPwd" mode="bottom" border-radius="14" length="50%">
			<view class="c-accept">
				<view class="c-grip">
				</view>
				<text class="c-accept-text">输入密码</text>
				<u-message-input @change="change" @finish="finishInputPwd" :maxlength="4"></u-message-input>
			</view>
		</u-popup>

		<!-- 发送成功 -->
		<u-popup v-model="sendOK" mode="bottom" border-radius="14" length="60%">
			<view class="c-accept">
				<view class="c-grip">
				</view>
				<image class="c-success" src="../../static/suceess.png" mode=""></image>
				<!-- 				<text>链接过期时间：2021-6-13 20:37:51</text>
				<view class="c-url">
					{{shareUrl}}
				</view> -->
				<!-- 				<button class="c-button-copy">复制链接</button>
				<button class="c-button-share">分享</button> -->

				<view class="c-copy-area" @tap="copyPickupCode()">
					<text class="c-pickupcode-text">点击复制6位取件码</text>
					<view class=" ">
						<view class="c-number" v-for="(item, index) in pickupCode" :key="index">
							{{item}}
						</view>
					</view>
				</view>
			</view>
		</u-popup>

		<!-- 模态窗 -->
		<u-modal v-model="showInputModal" :mask-close-able="true">
			<view class="c-slot-content">
				<input class="c-input" type="text" value="" v-model="desc" placeholder="输入你想要的描述" />
			</view>
		</u-modal>

		<!-- 下载模态窗 -->
		<u-popup v-model="showDownloadModal" mode="bottom" border-radius="14" length="80%">
			<view class="c-accept">
				<view class="c-grip">
				</view>
				<view class="c-upload-top">
					<text class="c-title">下载或保存</text>
				</view>

				<view class="c-list-item" v-for="item in downloadFileList" :key="item.id">
					<u-icon class="c-list-item-filetype" name="file-text" color="#b4b4b4" size="50"></u-icon>
					<text class="c-list-item-filename">{{item.filename}}</text>
					<text class="c-list-item-filesize">{{renderSize(item.fileSize)}}</text>
					<u-icon class="c-list-item-del" name="download" color="#cbcbcb" size="50" @tap="downloadFile(item)">
					</u-icon>
				</view>

				<view class="c-download-bottom">
					<button class="c-download-button"
						@tap="downloadAllFile(downloadFileList[0].groupId, uid)">转存全部到云盘</button>
					<view class="c-tips-area">
						下载文件将通过转发到聊天框中进行下载，保存文件会保存到云盘中。
					</view>
				</view>
			</view>
		</u-popup>

		<!-- 创建收集面板 -->
		<u-popup v-model="showCollect" mode="bottom" border-radius="14" length="80%">
			<view class="c-upload-box">
				<view class="c-grip">
				</view>
				<view class="c-upload-top">
					<text class="c-title">创建收集</text>
				</view>

				<view class="c-upload-content">
					<view class="c-list-item" v-for="item in tempFiles" :key="item.time">
						<!-- <text class="c-list-item-progress">{{item.progress ? item.progress : "0" }}</text> -->
						<u-icon class="c-list-item-filetype" name="file-text" color="#b4b4b4" size="50"></u-icon>
						<text class="c-list-item-filename">{{item.name}}</text>
						<text class="c-list-item-filesize">{{renderSize(item.size)}}</text>
						<u-icon class="c-list-item-del" name="trash-fill" color="#cbcbcb" size="50"
							@tap="deleteFile(tempFiles,item.name)"></u-icon>
					</view>
					<view class="c-nocontent" v-if="tempFiles.length == 0">
						<image class="c-nofile" src="../../static/nofile.png"></image>
						<text class="c-nocontent-desc">什么都没有</text>
					</view>
					<view class="c-add-file-area">
						<u-icon @tap="show = true" name="plus-circle-fill" color="#cd0a0a" size="70"></u-icon>
					</view>
				</view>

				<view class="c-upload-bottom">
					<button :class="[checked ? 'c-upload-button' : 'c-upload-button-unagree']"
						@tap="uploadFile">开始上传</button>
					<view class="c-option">
						<u-icon class="c-option-icon" name="tags-fill" size="40" color="#de0a0a"></u-icon>
						<text class="c-option-desc">内容描述</text>
						<text class="c-option-add" @tap="showInput()">立即添加</text>
					</view>
					<view class="c-option">
						<u-icon class="c-option-icon" name="lock-opened-fill" size="40" color="#de0a0a"></u-icon>

						<view class="c-option-box">
							<text class="c-option-desc">我已经阅读且同意</text>
							<text class="c-option-desc">可得快传<text class="c-argeement">《服务协议》</text>和<text
									class="c-argeement">《隐私协议》</text></text>
						</view>
						<u-switch class="c-option-choose" v-model="checked" active-color="red" inactive-color="#eee">
						</u-switch>
					</view>
				</view>
			</view>
		</u-popup>

		<!-- 上传文件方式 -->
		<u-action-sheet :list="list" @click="chooseButton" v-model="show"></u-action-sheet>
		<!-- 下面的按键 -->
		<view v-if="tabIndex == 0" class="c-button" @tap="showAdd = true">
			<u-icon class="c-plus" name="plus" color="#cd0a0a" size="45"></u-icon>
			<text class="c-add">添加文件</text>
		</view>
		<view v-if="tabIndex == 1" class="c-button" @tap="showAccept = true">
			<u-icon class="c-plus" name="arrow-downward" color="#cd0a0a" size="45"></u-icon>
			<text class="c-add">下载</text>
		</view>
		<view v-if="tabIndex == 2" class="c-button" @tap="showCollect = true">
			<u-icon class="c-plus" name="plus-circle" color="#cd0a0a" size="45"></u-icon>
			<text class="c-add">创建收集</text>
		</view>
		<view v-if="tabIndex == 2" class="c-button2" @tap="showAccept = true">
			<u-icon class="c-plus" name="checkmark-circle" color="#f87d09" size="45"></u-icon>
			<text class="c-add">填写收集</text>
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
				tools: ["上传", "接收"],
				list: [{
					text: '从对话框中选择文件'
				}, {
					text: '从对话框中选择视频'
				}, {
					text: '从对话框中选择图片'
				}, {
					text: '从相册或相机中选择图片'
				}],
				canDownloadNumList: [{
						name: '无限'
					}, {
						name: '20'
					},
					{
						name: '50'
					},

				],
				selectShareDaySub: [{
					name: '关闭'
				}, {
					name: '设置'
				}, ],
				tabIndex: 0, // 
				show: false, // 操作上传文件的类型
				showInputModal: false, // 展示modal窗
				desc: "",
				showAdd: false, // 展示添加抽屉
				showAccept: false, // 展示接收抽屉
				sendOK: false,
				checked: true, // 是否已经接受协议
				showDownloadModal: false, // 下载页面的dowmloadModal
				tempFiles: [], // 临时文件列表
				tempFilePaths: [],
				pickupCode: "000000",
				showCollect: false,
				uid: 1,
				shareUrl: "http://tf.rjxh.cloud/sh34ffs",
				downloadFileList: [], //根据pickupcode获取到文件列表
				curPwdNow: 0,
				canDownloadNumNow: 0,
				showSetPwd: false,
				pwd: "",
				showInputPwd: false,

			}
		},
		watch: {
			curPwdNow: function(val, oldVal) {
				if (val == 1) {
					this.showSetPwd = true
					console.log("展开输入密码")
				} else {
					this.showSetPwd = false
				}
			},
			canDownloadNumNow: function(val, oldVal) {
				console.log(val)
			},
		},
		computed: {
			...mapState(['hasLogin', "userInfo", "serverUrl", "openId"]),
		},
		onLoad() {
			// this.init()
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
			Toast(data, duration = 1000) {
				uni.showToast(Object.assign({}, data, {
					duration
				}))
			},
			showInput() {
				this.showInputModal = true
				this.getPickupCode();
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

			// 切换tabs
			switchTabs(index) {
				this.tabIndex = index;
			},

			// 删除文件
			deleteFile(fileList, name) {
				this.tempFiles = fileList.filter(item => item.name != name);
			},

			init() {
				let user = uni.getStorageSync("userInfo");
				if (user != "") {
					this.login(user);
					this.uid = user.id;
				}
				wx.showShareMenu({
					withShareTicket: true,
					menus: ['shareAppMessage', 'shareTimeline'],
				})
			},

			uploadFileNew(fileTemp, index, groupId) {
				const uploadTask = wx.uploadFile({
					// url: 'http://172.20.21.155:29999/upload',
					url: 'https://tf.rjxh.cloud/upload',
					filePath: fileTemp[index].path,
					name: 'file',
					formData: {
						'uid': this.uid,
						"groupId": groupId,
						"filename": fileTemp[index].name,
						"fileType": fileTemp[index].type,
						"fileSize": fileTemp[index].size,
						"description": this.desc
					},
					success: res => {
						if (index + 1 == fileTemp.length) {
							uni.hideLoading();
							this.showAdd = false;
							this.sendOK = true;
							this.tempFiles = [];
							uni.showToast({
								title: '上传成功'
							});
						} else {
							this.uploadFileNew(fileTemp, index + 1, groupId);
						}
					},

					fail: err => {
						this.showAdd = false;
						this.Toast({
							icon: "none",
							title: '上传失败'
						});
						console.log("上传失败", err)
					}
				});

				uploadTask.onProgressUpdate((res) => {
					console.log('上传进度' + res.progress);
					this.tempFiles[index].progress = res.progress;
				});

			},
			sectionChangeFilePassword(index) {
				this.curPwdNow = index;
			},
			changeCanDownloadNum(index) {
				this.canDownloadNumNow = index;
			},
			// 上传文件
			uploadFile() {
				// 判断是否勾选同意协议
				if (!this.checked) {
					uni.showToast({
						icon: "none",
						title: '请阅读且同意我们的协议！'
					});
				} else if (this.tempFiles.length == 0) {
					uni.showToast({
						icon: "none",
						title: '还没有添加文件哦！'
					});
				} else if (!this.hasLogin) {
					uni.showToast({
						icon: "none",
						title: '请先登录！'
					});
				} else {
					uni.showLoading({
						title: '上传中'
					});
					this.getGroupInfo(this.uid)
				}
			},
			// 获取分组的信息
			getGroupInfo(uid) {
				wx.request({
					// url: 'http://172.20.21.155:9999/group/',
					url: this.serverUrl + 'group/',
					data: {
						uid: this.uid,
						hasPwd: this.curPwdNow,
						downloadNum: this.canDownloadNumNow,
						pwd: this.pwd
					},
					method: 'POST',
					success: res => {
						console.log("获取分组的信息", res.data)
						if (res.data.code == 200) {
							this.pickupCode = res.data.data.pickupCode;
							this.uploadFileNew(this.tempFiles, 0, res.data.data.id);
						} else {
							uni.showToast({
								title: '获取分组异常，请重试',
								icon: "none",
								duration: 3000
							});
						}
					}
				})
			},

			// 获取带密码收件码的信息
			getPickupCodeInfoWithPwd(pwd) {
				this.$u.get('file/downloadWithPwd', {
					"pickupCode": this.pickupCode,
					"pwd": pwd
				}).then(res => {
					console.log("通过pickupcode从服务端获取的数据", res);
					if (res.code == 200) {
						uni.showToast({
							title: '有效的收件码'
						});
						this.showInputPwd = false;
						this.downloadFileList = res.data;
						this.showDownloadModal = true;
					} else {
						uni.showToast({
							icon: "none",
							title: res.desc
						});
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 获取收件码的信息
			getPickupCodeInfo(code) {
				var imcode = code
				this.pickupCode = code
				this.$u.get('file/download/', {
					"pickupCode": imcode
				}).then(res => {
					console.log("通过pickupcode从服务端获取的数据", res);
					if (res.code == 200) {
						uni.showToast({
							title: '有效的收件码'
						});
						this.downloadFileList = res.data;
						this.showDownloadModal = true;
					} else if (res.code == 40001) {
						this.showAccept = false;
						this.showInputPwd = true;
					} else {
						uni.showToast({
							icon: "none",
							title: res.desc
						});
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 点击获取文件方式
			chooseButton(index) {
				// 获取文件
				if (index == 0) {
					// #ifdef MP-QQ
					qq.chooseMessageFile({
						type: "file",
						success: res => {
							this.tempFiles = this.tempFiles.concat(res.tempFiles);
						},
						fail: err => {
							console.log("错误了", err)
						}
					})
					// #endif
					wx.chooseMessageFile({
						type: "file",
						success: res => {
							this.tempFiles = this.tempFiles.concat(res.tempFiles);
						},
						fail: err => {
							console.log("错误了", err)
						}
					})
				}
				// 获取视频
				if (index == 1) {
					// #ifdef MP-QQ
					qq.chooseMessageFile({
						type: "video",
						success: res => {
							this.tempFiles = this.tempFiles.concat(res.tempFiles);
						},
						fail: err => {
							console.log("错误了", err)
						}
					})
					// #endif
					wx.chooseMessageFile({
						type: "video",
						success: res => {
							this.tempFiles = this.tempFiles.concat(res.tempFiles);
						},
						fail: err => {
							console.log("错误了", err)
						}
					})
				}

				// 获取图片
				if (index == 2) {
					wx.chooseMessageFile({
						type: "image",
						success: res => {
							this.tempFiles = this.tempFiles.concat(res.tempFiles);
						},
						fail: err => {
							console.log("错误了", err)
						}
					})
				}
				// 从相册或相机中选
				if (index == 3) {
					this.$u.toast('暂不支持');
				}
			},

			// 单文件上传
			uploadFileImpl() {
				var that = this;
				console.log("this.tempFiles[0]", this.tempFiles[0])
				uni.showLoading({
					title: '上传中'
				});
				const uploadTask = wx.uploadFile({
					// url: 'http://172.20.21.155:9999/upload',
					url: 'https://tf.rjxh.cloud/upload',
					filePath: this.tempFiles[0].path,
					name: 'file',
					formData: {
						'uid': this.uid,
						"filename": this.tempFiles[0].name,
						"fileType": this.tempFiles[0].type,
						"fileSize": this.tempFiles[0].size,
						"description": this.desc
					},
					success: res => {
						// 获取服务器发来的内容
						var result = JSON.parse(res.data);
						console.log(result)
						console.log("获得的数据", result.data)
						that.pickupCode = result.data;

						that.showAdd = false;
						that.sendOK = true;
						that.tempFiles = [];
					},
					fail: err => {
						that.Toast({
							icon: "none",
							title: '上传失败'
						});
						that.showAdd = false;
						console.log("上传失败", err)
					}
				});

				uploadTask.onProgressUpdate((res) => {
					console.log('上传进度' + res.progress);
					if (res.progress == 100) {
						uni.hideLoading();
						uni.showToast({
							icon: "success",
							title: '上传成功！'
						});
					}
					console.log('已经上传的数据长度' + res.totalBytesSent);
					console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
				});

			},
			// 设置粘贴板数据
			copyPickupCode() {
				uni.setClipboardData({
					data: this.pickupCode,
					success: function() {
						console.log('success');
					}
				});
			},
			// 根据index来下载
			downloadFile(index) {
				console.log(index);
				wx.downloadFile({
					url: 'https://transfer.rjxh.cloud/transfer/' + index.saveAddress,
					success(res) {
						console.log(res)
						if (res.statusCode === 200) {
							uni.showToast({
								title: '文件下载中',
								icon: 'success'
							});
							wx.shareFileMessage({
								filePath: res.tempFilePath,
								fileName: index.filename,
								success() {},
								fail: console.error,
							})

						}
					}
				})
			},

			chanclFilePwd() {
				this.curPwdNow = 0;
				this.showSetPwd = false;
				this.pwd = "";
			},

			// 保存全部文件
			downloadAllFile(gid, uid) {
				if (this.hasLogin) {
					wx.request({
						url: this.serverUrl + 'file/save?uid=' + uid + "&gid=" + gid,
						method: 'POST',
						success: res => {
							if (res.data.code == 200) {
								uni.showToast({
									title: '保存文件成功',
									icon: "none",
									duration: 3000
								});
							} else {
								uni.showToast({
									title: '保存文件失败，请重试',
									icon: "none",
									duration: 3000
								});
							}
						}
					})
				} else {
					uni.showToast({
						title: '该功能要登录才能使用',
						icon: "none",
						duration: 3000
					});
				}

			},

			selectShareDay(e) {
				console.log(e);
			},
			// 获取粘贴数据
			getPickupCode() {
				uni.getClipboardData({
					success: function(res) {
						console.log("粘贴板数据", res.data);
					}
				});
			},
			// 监控用户输入的接收码
			change(e) {
				// console.log('内容改变，当前值为：' + e);
			},
			// 
			finish(e) {
				this.getPickupCodeInfo(e);
			},

			finishInputPwd(e) {
				this.getPickupCodeInfoWithPwd(e);
			}

		}
	}
</script>

<style>
	.c-box {
		display: flex;
		justify-content: center;
	}

	.c-top-bar {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		width: 100%;
		top: 30%;
	}

	.c-top-bar-area {
		display: flex;
		background-color: rgba(231, 231, 231, 0.3);
		padding: 10rpx;
		border-radius: 25rpx;
	}

	.c-logo {
		width: 100rpx;
		height: 100rpx;
		margin: 20rpx;
	}

	.c-text {
		margin: 25rpx;
		font-size: 35rpx;
		color: #FFFFFF;
	}

	.c-add-file-area {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 20rpx;
		padding: 20rpx 40rpx;
		border-radius: 20rpx;
		background-color: #e8e8e8;
	}

	.c-list-item-progress {
		background-color: #e5e5e5;
		color: #2e2b2b;
		padding: 10rpx;
		margin: 5rpx;
		border-radius: 10rpx;
	}

	.c-option-subsection {
		width: 350rpx;
		margin: 0 20rpx;

	}

	.c-option-subsection-mid {
		width: 300rpx;
		margin: 0 20rpx
	}

	.c-act {
		color: #cd0a0a;
		border-bottom: 5rpx solid #cd0a0a;

	}

	.c-image {
		width: 750rpx;
		height: 100vh;
		z-index: -1;
	}

	.c-input-pwd-box {
		display: flex;
	}

	.c-input-pwd {
		background-color: #F0F0F0;
		width: 250rpx;
		padding: 5rpx;
		margin: 5rpx;
		border-radius: 10rpx;
	}

	.c-chancl {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #de0a0a;
		color: #FFFFFF;
		width: 100rpx;
		padding: 5rpx;
		margin: 5rpx;
		border-radius: 10rpx;
	}

	.c-button {
		position: absolute;
		bottom: 150rpx;
		width: 250rpx;
		line-height: 75rpx;
		color: #cd0a0a;
		border: 2px solid transparent;
		border-radius: 40rpx;
		background-color: transparent;
		background-color: rgba(255, 255, 255, 0.2);
		border-color: #cd0a0a;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.c-button2 {
		position: absolute;
		bottom: 240rpx;
		width: 250rpx;
		line-height: 75rpx;
		color: #f87d09;
		border: 2px solid transparent;
		border-radius: 40rpx;
		background-color: transparent;
		background-color: rgba(255, 255, 255, 0.2);
		border-color: #f87d09;
		display: flex;
		justify-content: center;
		align-items: center;
	}


	.c-grip {
		width: 75rpx;
		height: 15rpx;
		margin-top: 20rpx;
		background-color: #C0C0C0;
		border-radius: 45rpx;

	}

	.c-plus {
		margin-right: 10rpx;
	}

	.c-add {
		font-size: 35rpx;
	}

	.c-upload-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.c-upload-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 20rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	.c-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 50rpx;
		/* margin-right: 400rpx; */
	}

	.c-upload-content {
		margin-left: 25rpx;
		margin-right: 25rpx;
	}

	.c-list-item {
		margin-top: 20rpx;
		padding: 25rpx;
		border-radius: 20rpx;
		background-color: #F8F8F8;
		display: flex;
		align-items: center;
	}

	.c-list-item-filetype {
		margin: 0 5rpx;
	}

	.c-list-item-filename {
		width: 450rpx;
		font-size: 35rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.c-list-item-filesize {
		width: 80rpx;
		color: #c3c3c3;
	}

	.c-list-item-del {
		margin-left: 50rpx;
		margin-right: 20rpx;
		width: 30rpx;
	}

	.c-upload-bottom {
		/* position: absolute;
		bottom: 0rpx; */
		/* height: 300rpx; */
		width: 100%;
		/* background-color: #f0f0f0; */
		border-radius: 45rpx 45rpx 0 0;
	}

	.c-download-bottom {
		position: absolute;
		bottom: 0rpx;
		height: 300rpx;
		width: 100%;
		background-color: #f0f0f0;
		border-radius: 45rpx 45rpx 0 0;
	}

	.c-tips-area {
		/* width: 100%; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 20rpx;
		color: #888888;
	}

	.c-upload-button {
		margin-top: 50rpx;
		width: 580rpx;
		font-size: 30rpx;
		padding: 5rpx;
		border-radius: 45rpx;
		color: #FFFFFF;
		background-color: #cd0a0a;
	}

	.c-upload-button-unagree {
		margin-top: 50rpx;
		width: 580rpx;
		font-size: 30rpx;
		padding: 5rpx;
		border-radius: 45rpx;
		color: #FFFFFF;
		background-color: #888;
	}

	.c-upload-tips {
		color: #555555;
	}

	.c-download-button {
		margin-top: 50rpx;
		width: 580rpx;
		font-size: 30rpx;
		padding: 5rpx;
		border-radius: 45rpx;
		color: #FFFFFF;
		background-color: #cd0a0a;
	}

	.c-option {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 25rpx;
		margin-top: 10rpx;
		padding: 15rpx;
	}

	.c-option-desc {
		margin-left: 20rpx;
		color: #C0C0C0;
	}

	.c-option-box {
		display: flex;
		flex-direction: column;
	}

	.c-argeement {
		color: #ff2a4a;
	}

	.c-option-add {
		margin-left: 400rpx;
		font-size: 30rpx;
		color: #808080;
	}

	.c-option-choose {
		margin-left: 50rpx;
	}

	.c-accept {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.c-accept-text {
		margin-top: 80rpx;
		font-size: 40rpx;
		color: #C8C7CC;
		margin-bottom: 25rpx;
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
		color: #888888;

	}

	.c-input {
		margin: 25rpx;
		padding: 10rpx;
		height: 40rpx;
		border-radius: 10rpx;
		background-color: #E6E6E6;
	}

	.c-success {
		width: 350rpx;
		height: 250rpx;
	}

	.c-url {
		margin: 10rpx;
		padding: 20rpx;
		background-color: #F5F0F0;
		border-radius: 10rpx;

	}

	.c-button-copy {
		width: 80%;
		border-radius: 25rpx;
		background-color: #000048;
		color: #FFFFFF;
		font-size: 30rpx;
		margin: 10rpx;
	}

	.c-copy-area {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20rpx;
	}

	.c-button-share {
		width: 80%;
		border-radius: 25rpx;
		font-size: 30rpx;
		background-color: #f7aa00;
		margin: 10rpx;
	}

	.c-pickupcode-text {
		font-size: 35rpx;
		color: #888888;
	}

	.c-number {
		display: inline-block;
		margin: 5rpx;
		background-color: #ffae00;
		border-radius: 25rpx;
		padding: 20rpx;
	}
</style>
