<template>
	<view class="u-flex u-flex-col">
		<image class="logo" src="../../static/logo.png"></image>
		<u-toast ref="uToast" />
		<u-form :model="form" ref="uForm" class="c-container">
			<u-form-item prop="phoneNumber">

				<u-input v-model="form.phoneNumber" :type="form.type" :border="form.border" placeholder="请输入手机号码" />

			</u-form-item>
			<u-form-item prop="inputPassword">

				<u-input v-model="form.inputPassword" type="password" :border="form.border"
					:password-icon="form.passwordIcon" placeholder="请输入密码" />

			</u-form-item>
			<view class="c-tool">
				<a class="c-a" href="#" @click="gotoFindPassword()">忘记密码</a>
				<a class="c-a" href="#" @tap="register()">注册账号</a>
			</view>

		</u-form>
		<u-button class="c-container-button" type="primary" :ripple="true" @click="submit()">登录</u-button>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions,
		mapGetters
	} from 'vuex'
	import axios from 'axios'
	export default {
		data() {
			return {
				form: {
					phoneNumber: '',
					inputPassword: '',
					type: 'text',
					passwordIcon: true
				},
				rules: {
					phoneNumber: [
						// 必填规则
						{
							required: true,
							message: '请输入正确手机号码',
							trigger: ['change', 'blur'],

						},
						// {
						// 	validator: (rule, value, callback) => {
						// 		return this.$u.test.mobile(value);
						// 	},
						// 	message: '手机号码不正确',
						// 	trigger: ['change', 'blur'],
						// }
					],
					inputPassword: [
						// 必填规则
						{
							required: true,
							message: '此为必填字段',
							// blur和change事件触发检验
							trigger: ['blur', 'change'],
						}
					]
				},

			}
		},
		computed: {
			...mapState(['hasLogin']),
			...mapGetters(["userInfoGet", "userToken"])
		},
		methods: {
			...mapMutations(['login', "logout"]),
			...mapActions(['getPhoneNumber']),
			Toast(data, duration = 1000) {
				uni.showToast(Object.assign({}, data, {
					duration
				}))
			},
			register() {
				uni.navigateTo({
					url: '../register/register'
				});
			},
			gotoFindPassword() {
				uni.navigateTo({
					url: '../findPassword/findPassword'
				});
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.$u.post('login/', {
							phone: this.form.phoneNumber,
							password: this.form.inputPassword
						}).then(res => {
							console.log(res)
							if (res.code == 200) {
								try {
									uni.setStorage({
									    key: 'token',
									    data: res.data.token,
									    success: function () {
									        console.log('token');
									    }
									});
									uni.setStorage({
									    key: 'userInfo',
									    data: res.data.userInfo,
									    success: function () {
									        console.log('userInfo');
									    }
									});
									this.login(res.data.token, res.data.userInfo);
									
								} catch (e) {
									console.log("出错了")
								}

								uni.switchTab({
									url: "../index/index",
									success: () => {
										uni.showToast({
											title: '登录成功，跳转中~'
										});
									}
								});

							} else {
								console.log(res);
								uni.showToast({
									title: res.desc,
									icon: 'none'
								});
							}
						}).catch(error => console.log(error));
					} else {
						console.log('验证失败');
					}
				});

			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.c-container {
		/* margin-top: 20rpx; */
		width: 500rpx;
	}

	.c-container-button {
		margin-top: 20rpx;
		width: 500rpx;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 150rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.c-tool {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* 两端对齐 */
		margin-top: 20rpx;

	}

	.c-a {
		text-decoration: none;
		cursor: pointer;
		color: #007AFF;
	}

	.title {
		padding: 20rpx 0;
	}
</style>
