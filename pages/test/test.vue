<template>
	<view>
		<button @tap="uploadFileFun()">上传文件</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			uploadFileFun() {
				wx.chooseImage({
					success(res) {
						const tempFilePaths = res.tempFilePaths
						wx.uploadFile({
							url: 'http://192.168.123.105:9999/upload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'username': "test",
							},
							success(res) {
								const data = res.data
								console.log(data)
								//do something
							}
						})
					}
				})
				
			}
		}
	}
</script>

<style>

</style>
