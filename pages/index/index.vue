<template>
	<view class="c-box">
		<!-- 顶部操作栏 -->
		<view class="c-top-bar">
			<image class="c-logo" src="../../static/logo.png" mode=""></image>
			<view class="c-text" v-for="(item,index) in tools" @click="switchTabs(index)" :key="index">
				<text :class="tabIndex == index ?'c-act' :''">{{item}}</text>
			</view>
		</view>

		<!-- 背景图片 -->
		<image class="c-image" src="../../static/bg1.jpg"></image>

		<!-- 添加文件面板 -->
		<u-popup v-model="showAdd" mode="bottom" border-radius="14" length="80%">
			<view class="c-upload-box">
				<view class="c-grip-add">
				</view>
				<view class="c-upload-top">
					<text class="c-title">添加文件</text>
					<u-icon @click="show = true" name="plus-circle-fill" color="#cd0a0a" size="70"></u-icon>
				</view>

				<view class="c-upload-content">
					<view class="c-list-item" v-for="item in tempFiles" :key="item.time">
						<u-icon class="c-list-item-filetype" name="file-text" color="#b4b4b4" size="50"></u-icon>
						<text class="c-list-item-filename">{{item.name}}</text>
						<text class="c-list-item-filesize">{{renderSize(item.size)}}</text>
						<u-icon class="c-list-item-del" name="trash-fill" color="#cbcbcb" size="50"
							@click="deleteFile(tempFiles,item.name)"></u-icon>
					</view>
					<view class="c-nocontent" v-if="tempFiles.length == 0">
						<image class="c-nofile" src="../../static/nofile.png"></image>
						<text class="c-nocontent-desc">什么都没有</text>
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

		<!-- 接收面板 -->
		<u-popup v-model="showAccept" mode="bottom" border-radius="14" length="50%">
			<view class="c-accept">
				<view class="c-grip">
				</view>
				<text class="c-accept-text">输入取件码</text>
				<u-message-input @change="change" @finish="finish" :maxlength="6"></u-message-input>
			</view>
		</u-popup>

		<!-- 发送成功 -->
		<u-popup v-model="sendOK" mode="bottom" border-radius="14" length="60%">
			<view class="c-accept">
				<view class="c-grip">
				</view>
				<image class="c-success" src="../../static/suceess.png" mode=""></image>
				<text>链接过期时间：2021-6-13 20:37:51</text>
				<view class="c-url">
					hhhhhhhhhhhhhhh
				</view>
				<button class="c-button-copy">复制链接</button>
				<button class="c-button-share">分享</button>

				<view class="c-copy-area">
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

		<!-- 上传文件方式 -->
		<u-action-sheet :list="list" @click="click" v-model="show"></u-action-sheet>
		<!-- 下面的按键 -->
		<view v-if="tabIndex == 0" class="c-button" @click="showAdd = true">
			<u-icon class="c-plus" name="plus" color="#cd0a0a" size="45"></u-icon>
			<text class="c-add">添加文件</text>
		</view>
		<view v-else class="c-button" @click="showAccept = true">
			<u-icon class="c-plus" name="arrow-downward" color="#cd0a0a" size="45"></u-icon>
			<text class="c-add">下载</text>
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
				tabIndex: 0, // 
				show: false, // 操作上传文件的类型
				showInputModal: false, // 展示modal窗
				desc: "",
				showAdd: false, // 展示添加抽屉
				showAccept: false, // 展示接收抽屉
				sendOK: false,
				checked: false, // 是否已经接受协议
				tempFiles: [], // 临时文件列表
				tempFilePaths: [],
				pickupCode: "121231"

			}
		},
		computed: {
			...mapState(['hasLogin', 'isUniverifyLogin', 'univerifyErrorMsg'])
		},
		onLoad() {

		},
		methods: {
			...mapMutations(['login', 'setUniverifyLogin', "logout"]),
			...mapActions(['getPhoneNumber']),

			showInput() {
				this.showInputModal = true
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
				// console.log(index)
			},
			// 删除文件
			deleteFile(fileList, name) {
				this.tempFiles = fileList.filter(item => item.name != name);
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
				} else {
					console.log(this.tempFiles)
					this.uploadImg();
					console.log("调用成功")
				}

				// 
			},

			// 点击获取文件方式
			click(index) {
				// 获取文件
				if (index == 0) {
					wx.chooseMessageFile({
						type: "file",
						success: res => {
							this.tempFilePaths = res.tempFilePaths;
							this.tempFiles = this.tempFiles.concat(res.tempFiles);
							// console.log("res.tempFiles", res.tempFiles)
							// console.log("this.tempFiles", this.tempFiles)
							// console.log("选择了", res.tempFiles);
						},
						fail: err => {
							console.log("错误了", err)
						}
					})
				}

				// 获取视频
				if (index == 1) {
					wx.chooseMessageFile({
						type: "video",
						success: res => {
							this.tempFiles = this.tempFiles.concat(res.tempFiles);
							// console.log("res.tempFiles", res.tempFiles)
							// console.log("this.tempFiles", this.tempFiles)
							// console.log("选择了", res.tempFiles);
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
							// console.log("res.tempFiles", res.tempFiles)
							// console.log("this.tempFiles", this.tempFiles)
							// console.log("选择了", res.tempFiles);
						},
						fail: err => {
							console.log("错误了", err)
						}
					})
				}

				if (index == 3) {
					var that = this;
					wx.chooseImage({
						success: res => {
							that.tempFilePaths = res.tempFilePaths;
							console.log("tempFilePaths", that.tempFilePaths)
							wx.uploadFile({
								url: 'http://192.168.123.105:9999/upload',
								filePath: that.tempFilePaths[0],
								name: 'file',
								formData: {
									'user': 'eatmans'
								},
								success: res => {
									console.log(res.data)
									uni.showToast({
										icon: "success",
										title: '文件上传成功！'
									});
									that.showAdd = false;
									that.sendOK = true;
								},
								fail: err => {
									uni.showToast({
										icon: "success",
										title: '文件上传成功！'
									});
									that.showAdd = false;
									console.log("图片上传失败", err)
								}
							})
						}
					})
				}
				// console.log(`点击了第${index + 1}项，内容为：${this.list[index].text}`)
			},

			// 监控用户输入的接收码
			change(e) {
				console.log('内容改变，当前值为：' + e);
			},
			// 
			finish(e) {
				console.log('输入结束，当前值为：' + e);
				if (e == 123456) {
					uni.showToast({
						icon: "none",
						title: '你获得了一坨屎！'
					});
				} else {
					uni.showToast({
						icon: "none",
						title: '等待后端的接口'
					});
				}
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
		align-items: center;
		position: absolute;
		width: 100%;
		top: 100rpx;
	}

	.c-logo {
		margin-left: 50rpx;
		width: 50rpx;
		height: 50rpx;
	}

	.c-text {
		margin-left: 25rpx;
		font-size: 35rpx;
		color: #FFFFFF;
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

	.c-button {
		position: absolute;
		bottom: 150rpx;
		width: 250rpx;
		line-height: 75rpx;
		color: #cd0a0a;
		border: 2px solid transparent;
		border-radius: 40rpx;
		background-color: transparent;
		border-color: #cd0a0a;
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

	.c-grip-add {
		width: 75rpx;
		height: 15rpx;
		margin-top: 20rpx;
		background-color: #C0C0C0;
		border-radius: 45rpx;
		margin-left: 350rpx;
	}

	.c-plus {
		margin-right: 10rpx;
	}

	.c-add {
		font-size: 35rpx;
	}

	.c-upload-box {}

	.c-upload-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 20rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	.c-title {
		font-size: 50rpx;
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
		margin-left: 10rpx;
		margin-right: 20rpx;
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
		position: absolute;
		bottom: 0rpx;
		/* height: 300rpx; */
		width: 100%;
		background-color: #f0f0f0;
		border-radius: 45rpx 45rpx 0 0;
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
		color: #C8C7CC;

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
