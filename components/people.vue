<template>
  <view>
    <uni-icons
      type="person"
      size="48rpx"
      color="#fff"
      class="person"
      @click="tapMy"
    >
    </uni-icons>
    <uni-popup ref="popup" background-color="#252525">
      <view class="popup-content">
        <image src="/static/logo.png" class="logo-img"></image>
        <view class="logo-text">欢迎进入月光宝盒</view>
        <view class="send-phone" v-show="showLogin"
          >验证码已发送至<span style="margin-left: 20rpx">{{
            phoneNumber
          }}</span></view
        >
        <view class="invitation-text" v-show="showInvitation"
          >*有邀请码才能使用此软件，解锁任意资源</view
        >
        <view class="input-container" v-show="showInvitation">
          <input
            class="uni-input"
            type="number"
            placeholder="邀请码"
            v-model="invitationCode"
          />
        </view>
        <view class="input-container" v-show="showPhoneNumber">
          <input
            class="uni-input"
            type="number"
            placeholder="请输入手机号"
            @input="telInput"
            v-model="phoneNumber"
            maxlength="11"
          />
        </view>
        <view class="input-container code-input" v-show="showLogin">
          <input
            class="uni-input"
            type="number"
            placeholder="请输入验证码"
            v-model="code"
            style="width: 250rpx"
          />
          <span class="resend-text" @click="resend"
            >重新发送({{ sendCodeTime }}s)</span
          >
        </view>

        <view
          class="active-btn"
          v-show="canSendCode && showPhoneNumber"
          @click="send"
        >
          发送验证码
        </view>
        <view class="disable-btn" v-show="!canSendCode && showPhoneNumber">
          发送验证码
        </view>
        <view class="active-btn" @click="login" v-show="showLogin">
          登录/注册
        </view>

        <view
          class="active-btn"
          @click="bindInvitation"
          v-show="showInvitation"
        >
          进入月光宝盒
        </view>

        <view class="tips">未注册手机号验证通过后将自动注册</view>
      </view>
      <view class="close-btn" @click="close"></view>
    </uni-popup>
  </view>
</template>

<script>
import { sendCode, bindUserCode, login, getUserInfo } from "./../api/user.js";
import { regexTel } from "./../utils/regex.js";
export default {
  name: "CardList",
  data() {
    return {
      time: null,
      phoneNumber: "",
      code: "", // 验证码 1234
      invitationCode: "", // 邀请码 888888
      sendCodeTime: 60,
      showPhoneNumber: true, //输入手机号 发送验证码
      canSendCode: false, // 发送验证码高亮
      showLogin: false, // 输入验证码 登录/注册
      showInvitation: false, // 输入邀请码 进入月光宝盒
    };
  },
  methods: {
    /** 登录接口，存token */
    async login() {
      const { phoneNumber: mobile, code } = this;
      try {
        const res = await login({ mobile, code });
        if (res.data.token) {
          await uni.setStorageSync("TOKEN", res.data.token);
        }
        // avatar: ""
        // invitationSaved: true
        // nickname: "15267863181"
        // userId: 11
        const userRes = await getUserInfo();
        uni.setStorageSync("USERINFO", JSON.stringify(userRes.data));
        console.log(userRes);
        // 未绑定邀请码则显示绑定邀请码
        if (!userRes.data.invitationSaved) {
          this.showInvitation = true;
          this.showLogin = false;
        } else {
          this.close(); //关闭弹窗
        }
      } catch (error) {
        console.log(error);
      }
    },
    /** 倒计时时间到了 重新执行发送验证码 */
    resend() {
      if (this.sendCodeTime > 0) {
        return;
      }
      this.send();
    },
    /** 发送验证码 */
    async send() {
      let { phoneNumber } = this;
      let res = await sendCode({ mobile: phoneNumber });
      if (res.code === 0) {
        this.sendCodeTime = 60; // 之后改60
        this.timer = setInterval(() => {
          if (this.sendCodeTime > 0) {
            this.sendCodeTime = this.sendCodeTime - 1;
          }
        }, 1000);
        this.showPhoneNumber = false;
        this.showLogin = true;
      }
    },
    /** 首次登录之后执行绑定邀请码 */
    async bindInvitation() {
      try {
        let { invitationCode } = this;
        let res = await bindUserCode({ code: invitationCode });
        if (res.code === 0) {
          uni.showToast({
            title: "绑定成功",
            icon: "success",
          });
          this.close();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /** 判断手机号是否能发送验证码 */
    telInput(e) {
      if (regexTel.test(e.target.value)) {
        this.canSendCode = true;
      } else {
        this.canSendCode = false;
      }
    },
    /** 显示登录弹窗 */
    open() {
      this.$refs.popup.open("bottom");
    },
    /** 关闭登录弹窗 */
    close() {
      this.$refs.popup.close();
    },
    /** 点击个人信息 */
    async tapMy() {
      // token过期或者token不存在 显示登录弹窗，否则直接进入我的页面
      let token = uni.getStorageSync("TOKEN");
      if (token) {
        console.log(token);
        const userRes = await getUserInfo();
        // code===0 表示token未过期，
        if (userRes.code === 0 && userRes.data.invitationSaved) {
          uni.navigateTo({
            url: "/pages/my/my",
          });
        } else if (userRes.code === 0 && !userRes.data.invitationSaved) {
          this.showInvitation = true;
          this.showLogin = false;
          this.showPhoneNumber = false;
          this.open();
        }
      } else {
        this.showInvitation = false;
        this.showLogin = false;
        this.showPhoneNumber = true;
        this.open();
      }
    },
  },
};
</script>

<style lang="scss">
.person {
  position: absolute;
  top: 114rpx;
  right: 32rpx;
}
.invitation-text {
  font-size: 30rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ef0ec9;
  margin-bottom: 24rpx;
}
.code-input {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.resend-text {
  font-size: 30rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ef0ec9;
}
.send-phone {
  font-size: 30rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 24rpx;
}
.close-btn {
  width: 64rpx;
  height: 64rpx;
  background-image: url("/static/closebtn.png");
  background-size: cover;
  position: absolute;
  top: 32rpx;
  right: 32rpx;
}
.popup-content {
  display: flex;
  flex-flow: column;
  align-items: center;
}
.disable-btn {
  background-image: url("/static/disablebtn.png");
  background-size: cover;
  height: 96rpx;
  width: 640rpx;
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  line-height: 96rpx;
  text-align: center;
  color: rgba(255, 255, 255, 0.2);
  margin-bottom: 68rpx;
}
.active-btn {
  background-image: url("/static/activebtn.png");
  background-size: cover;
  height: 96rpx;
  width: 640rpx;
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  line-height: 96rpx;
  text-align: center;
  color: rgb(255, 255, 255);
  margin-bottom: 68rpx;
}
.logo-img {
  width: 352rpx;
  height: 352rpx;
}
.logo-text {
  font-size: 40rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  position: relative;
  top: -40rpx;
}
.input-container {
  width: 640rpx;
  height: 96rpx;
  background: rgba(255, 255, 255, 0.09);
  border-radius: 48rpx;
  margin-bottom: 32rpx;
}
.uni-input {
  height: 96rpx;
  font-size: 30rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  width: 500rpx;
  margin-left: 112rpx;
}
.tips {
  font-size: 30rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 90rpx;
}
</style>