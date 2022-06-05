<template>
  <view class="register d-flex j-center">
    <view class="card mt-4 p-4 d-flex flex-column a-center">
      <view>
        <image src="https://oss-augustrush.oss-cn-shenzhen.aliyuncs.com/yayiImage/111.png" style="width: 376upx;height: 230upx;margin-bottom: 40upx;margin-left: 50upx;" mode=""></image>
      </view>

      <u--form ref="userRef" labelPosition="left" :model="userInfo" :rules="rules" labelWidth="auto">
        <u-form-item label="账号:" prop="userName" borderBottom>
          <u--input v-model="userInfo.userName" border="none"  placeholder="请输入账号"></u--input>
        </u-form-item>
        <u-form-item label="密码:" prop="password" borderBottom>
          <u--input v-model="userInfo.password" border="none" type="password" placeholder="请输入密码"></u--input>
        </u-form-item>
        <u-form-item label="确认密码:" prop="repeatPassword"  borderBottom>
          <u--input v-model="userInfo.repeatPassword" type="password" border="none" placeholder="请再次输入密码"></u--input>
        </u-form-item>
      </u--form>
      <view
       class="py-2 w-100 d-flex a-center j-center  text-white rounded font-md mb-4 mt-3"
       style="background: linear-gradient(to right,#ff8319, #ffa940)"
        @click="submit"
      >
        注册
      </view>
      <view class="text-light-muted">
        已有账号?
        <text style="color: #4a7cee" @click="goToLogin">去登录</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        userName: '',
        password: '',
        repeatPassword: '',
        code: '',
        nickName: '',
        photo: ''
      },
      rules: {
        userName: [
          {
            type: 'string',
            required: true,
            message: '请输入账号',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^[a-zA-Z]\w{5,17}$/,
            message: '账号必须字母开头，长度在6~18之间，只能包含字母、数字和下划线'
          }
        ],
        password: [
          {
            type: 'string',
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^.{5,20}$/,
            message: '密码长度必须为5-20个字符'
          }
        ],
        repeatPassword: [
          {
            type: 'string',
            required: true,
            message: '请再次输入密码',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^.{5,20}$/,
            message: '密码长度必须为5-20个字符'
          }
        ]
      }
    };
  },
  methods: {
    goToLogin() {
      uni.navigateBack({
        delta: 1
      });
    },
    submit() {
      let _this = this;
      this.$refs.userRef
        .validate()
        .then(async res => {
          let flag = true;
          for (const key in this.rules) {
            if (!this.rules[key][1].pattern.test(this.userInfo[key])) {
              uni.$u.toast(`${this.rules[key][1].message}`);
              flag = false;
              return false;
            }
          }
          if (flag) {
            if (res && this.userInfo.password === this.userInfo.repeatPassword) {
              uni.showLoading({
                mask: true,
                title: '注册中'
              });
              const userRes = await uni.getUserProfile({
                desc: '用于存储用户数据'
              });
              uni.hideLoading();
              console.log(userRes[1]);
              if (userRes[0]) {
                _this.$message.toast('获取失败', 'text');
                return;
              }
              uni.login({
                provider: 'weixin',
                success(resp) {
                  _this.userInfo.code = resp.code;
                  uni.getUserInfo({
                    provider: 'weixin',
                    async success(resp) {
                      _this.userInfo.photo = userRes[1].userInfo.avatarUrl;
                      _this.userInfo.nickName = userRes[1].userInfo.nickName;
                      const res = await _this.$http.post('/user/registerByWx', _this.userInfo);
                      if (res.code == 0) {
                        uni.navigateBack({
                          delta: 1
                        });
                        uni.$u.toast('注册成功');
                      } else {
                        uni.$u.toast('一个用户只能注册一个账号');
                      }
                    }
                  });
                }
              });
            } else if (this.userInfo.password !== this.userInfo.repeatPassword) {
              uni.$u.toast('两次密码不一致');
            } else {
              uni.$u.toast('注册失败');
            }
          }
        })
        .catch(errors => {
          uni.$u.toast('注册失败');
        });
    }
  }
};
</script>

<style scoped>
.register {
  height: 100%;
}
.register >>> .u-form {
  width: 660upx;
}
.card >>> .u-form {
  width: 650upx;
}
</style>
