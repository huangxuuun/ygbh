<template>
  <view class="home">
    <view class="y-header">
      <view class="y-header-tab">
        <view :class="{ 'y-tab-active': true }">首页</view>
        <view style="margin-left: 142rpx" @click="tapTab">推荐</view>
      </view>
      <People></People>
      <view class="y-tag-container">
        <view
          v-for="(tag, index) in tagList"
          :key="tag.text"
          class="y-tag"
          :class="{ 'y-tag-active': tag.active }"
          @click="tapTag(index)"
        >
          {{ tag.text }}
        </view>
      </view>
    </view>

    <uni-list class="uni-list--waterfall home-container">
      <uni-list-item
        direction="column"
        :border="false"
        class="uni-list-item--waterfall"
        v-for="(item, index) in list"
        :key="index"
        clickable
      >
        <!-- 自定义 header -->
        <template v-slot:header>
          <view
            class="y-card-image"
            @click="tapDetail(item)"
            :style="{ 'background-image': 'url(' + item.bannerList[0] + ')' }"
          >
            <!-- <view class="y-card-time"> {{ item.publishAt }} </view> -->
          </view>
        </template>
        <!-- 自定义 body -->
        <template v-slot:body>
          <view class="y-card-content">
            <view class="y-card-title">
              {{ item.title }}
            </view>
            <view class="y-card-tool">
              <view class="y-card-tool-item">
                <image
                  src="/static/starfill.png"
                  alt=""
                  class="y-card-tool-item__image"
                  v-if="item.liked"
                  @click="collectItem(2, item)"
                />
                <image
                  src="/static/star.png"
                  alt=""
                  class="y-card-tool-item__image"
                  v-else
                  @click="collectItem(1, item)"
                />
                <text class="y-card-tool-item__text">{{ item.likeNum }}</text>
              </view>
              <view class="y-card-tool-item">
                <image
                  src="/static/lock.png"
                  alt=""
                  class="y-card-tool-item__image"
                />
                <text class="y-card-tool-item__text">{{ item.unlockNum }}</text>
              </view>
            </view>
          </view>
        </template>
      </uni-list-item>
      <image
        src="/static/empty.png"
        style="width: 320rpx; height: 320rpx; margin: 0 auto"
        v-if="list.length === 0"
      ></image>
    </uni-list>
    <uni-load-more
      :status="loadType"
      style="top: 236rpx; position: relative; background-color: #171616"
    ></uni-load-more>
  </view>
</template>

<script>
import { uuid } from "./../../utils/uuid.js";
import { likeItem, getList } from "./../../api/resource.js";
import People from "../../components/people.vue";
export default {
  components: {
    People,
  },
  data() {
    return {
      page: {
        sort: "",
        pageOffset: "",
        pageSize: 10,
        sessionId: "",
      },
      loadType: "more", // loading noMore
      list: [
        // {
        //   id: 0,
        //   bannerList: [
        //     "https://img2.baidu.com/it/u=1115987748,3793792879&fm=253&fmt=auto&app=138&f=JPEG?w=890&h=500",
        //   ],
        //   title: "【8G】虎牙直播雅雅主播10套合集下载",
        //   publishAt: "2022.12.22",
        //   unlockNum: 1231,
        //   likeNum: 1231,
        //   liked: true,
        //   unlocked: true,
        // },
      ],
      tagList: [
        {
          text: "全部",
          active: true,
          sort: "", // sort为空时，sessionId取随机值
        },
        {
          text: "最新",
          active: false,
          sort: "published",
        },
        {
          text: "最多收藏",
          active: false,
          sort: "like",
        },
        {
          text: "最多解锁",
          active: false,
          sort: "unlock",
        },
      ],
      tagIndex: 0,
    };
  },
  methods: {
    /**获取资源列表 */
    async getList() {
      const { sort, pageOffset, pageSize, sessionId } = this.page;
      let res = await getList({ sort, pageOffset, pageSize, sessionId });
      let { list, nextOffset } = res.data;
      list.forEach((item) => {
        this.list.push(item);
      });
      this.page.pageOffset = nextOffset;
      if (!this.page.pageOffset) {
        this.loadType = "noMore"; // 显示不再加载
      } else {
        this.loadType = "more"; // 显示还可加载
      }
    },

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
        // debugger
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
          this.close()
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

    /** 跳转详情 */
    tapDetail(listItem) {
      uni.navigateTo({
        url: `/pages/detail/detail?id=${listItem.id}`,
      });
    },
    tapTab() {
      uni.navigateTo({
        url: "/pages/recommend/recommend",
      });
    },
    async collectItem(action, item) {
      try {
        let res = await likeItem({ id: item.id, action });
        if (res.code === 0) {
          item.liked = !item.liked;
          if (action === 1) {
            item.likeNum++;
          } else {
            item.likeNum--;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    tapTag(index) {
      // if (this.tagIndex === index) return;
      this.tagIndex = index;
      this.page.pageOffset = "";
      this.list = [];
      this.tagList.forEach((item, i) => {
        item.active = false;
        if (index === i) {
          item.active = true;
          this.page.sort = item.sort;
          this.page.sessionId = "";
          console.log(item.sort);
          if (item.sort === "") {
            this.page.sessionId = uuid();
          }
        }
      });
      this.getList();
    },
    lower: function (e) {
      console.log(e);
    },
    changeTab(index) {
      console.log("当前选中的项：" + index);
    },
  },
  onReady: function () {},
  onLoad: function (options) {},
  onPullDownRefresh() {},
  onReachBottom() {
    if (this.loadType === "noMore") return;
    this.loadType = "loading";
    this.getList();
    // this.loadType = "loading";
    // setTimeout(() => {
    //   this.loadType = "noMore";
    // }, 1000);
  },
  onShow() {
    this.tapTag(this.tagIndex);
  },
};
</script>

<style lang="scss">
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
.home {
  min-height: 100vh;
  background-color: #171616;

  .y-header {
    height: 256rpx;
    background-image: url("/static/headerBg.png");
    background-size: cover;
    color: #fff;
    font-size: 28rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    overflow: hidden;

    width: 100vw;
    position: fixed;
    z-index: 100;
  }

  .y-header-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-top: 114rpx;
    padding-bottom: 38rpx;
  }

  .y-tab-active {
    color: #ef0ec9;
    position: relative;
  }

  .y-tab-active::after {
    content: "";
    display: block;
    z-index: 10;
    width: 24rpx;
    height: 6rpx;
    background: linear-gradient(315deg, #8b3fff 0%, #ef0ec9 100%);
    border-radius: 4rpx;
    position: absolute;
    top: 50rpx;
    left: 16rpx;
  }

  .person {
    position: absolute;
    top: 114rpx;
    right: 32rpx;
  }
  .status_bar {
    height: var(--status-bar-height);
    width: 100%;
  }

  .y-tag-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .y-tag {
    background: #1b1b1b;
    border-radius: 32rpx;
    color: rgba(255, 255, 255, 0.4);
    width: 144rpx;
    height: 48rpx;
    line-height: 48rpx;
    text-align: center;
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
  }

  .y-tag-active {
    background: linear-gradient(318deg, #ff00fd 0%, #1d00ff 100%);
    color: #fff;
    position: relative;
  }

  .y-card {
    width: 364rpx;

    &-image {
      width: 100%;
      border-radius: 8rpx 8rpx 0 0;
      height: 236rpx;
      background-size: cover;

      display: flex;
    }

    &-title {
      font-size: 24rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.79);
    }

    &-time {
      font-size: 24rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.79);
      position: absolute;
      left: 24rpx;
      top: 180rpx;
    }

    &-content {
      height: 172rpx;
      background: #1f1f1f;
      border-radius: 0rpx 0rpx 8rpx 8rpx;
      padding: 24rpx;
      color: #fff;
    }
  }

  .home-container {
    background-color: #171616;
    padding: 8rpx;
  }

  .y-card-tool {
    margin-top: 28rpx;
    display: flex;
    align-items: center;

    &-item {
      display: flex;
      align-items: center;
      margin-right: 24rpx;

      &__image {
        width: 28rpx;
        height: 28rpx;
      }

      &__text {
        margin-left: 8rpx;
        color: rgba(255, 255, 255, 0.45);
        font-size: 24rpx;
      }
    }
  }

  .slot-image {
    border-radius: 8rpx 8rpx 0 0;
    height: 236rpx;
  }

  .uni-list--waterfall {
    /* #ifndef H5 || APP-VUE */
    // 小程序 编译后会多一层标签，而其他平台没有，所以需要特殊处理一下
    ::v-deep .uni-list {
      /* #endif */
      position: relative;
      top: 240rpx;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 5px;
      box-sizing: border-box;

      /* #ifdef H5 || APP-VUE */
      // h5 和 app-vue 使用深度选择器，因为默认使用了 scoped ，所以样式会无法穿透
      ::v-deep

				/* #endif */
				.uni-list-item--waterfall {
        width: 50%;
        box-sizing: border-box;

        .uni-list-item__container {
          display: flex;
          padding: 5px;
          flex-direction: column;
          background-color: #171616;
        }
      }

      /* #ifndef H5 || APP-VUE */
    }

    /* #endif */
  }
}
</style>