<template>
  <view class="my">
    <view class="y-header">
      <view class="y-header-back" @click="tapBack">
        <image src="/static/back.png" class="y-header-back__img"></image>
      </view>
      <view class="y-header-info">
        <image
          src="/static/touxiang.webp"
          mode=""
          class="y-header-info__avator"
        ></image>
        <view class="y-header-info__detail">
          <view class="y-header-info__detail__phone">15267863184</view>
          <view>会员到期时间：<text class="value-text">永久</text></view>
          <view class="y-header-info__detail__describe">
            <view>今日可解锁: <text class="value-text">10</text></view>
            <view>已用: <text class="value-text">10</text></view>
            <view>剩余: <text class="value-text">10</text></view>
          </view>
        </view>
      </view>
      <view class="y-header-logout" @click="logout"> 退出登录 </view>
    </view>
    <view class="my-container">
      <view class="my-container__tab">
        <v-tabs
          v-model="current"
          :scroll="false"
          :tabs="tabs"
          @change="changeTab"
          activeColor="#EF0EC9"
          lineColor="linear-gradient(315deg, #8B3FFF 0%, #EF0EC9 100%)"
          :lineScale="0.2"
          lineHeight="6rpx"
          bgColor="#171616"
          color="rgba(255,255,255,0.8)"
          :lineAnimation="false"
        ></v-tabs>
      </view>
      <swiper
        class="my-container__swiper"
        :current="swiperCurrent"
        @animationfinish="animationFinished"
      >
        <swiper-item class="swiper-item">
          <view class="y-section">选择会员套餐</view>
          <view class="pay-card-container">
            <view
              class="pay-card"
              v-for="(card, index) in cards"
              :key="card.title"
              :class="{ 'pay-card-active': card.isActive }"
              @click="tapCard(index)"
            >
              <view class="pay-card__header">
                {{ card.title }}
              </view>
              <view class="pay-card__body">
                <view>
                  <text class="big-price">{{ card.bigPrice }}</text>
                  <text class="small-price">{{ card.smallPrice }}</text>
                </view>
                <view class="save-text">
                  {{ card.saveText }}
                </view>
                <view class="count-text">
                  {{ card.countText }}
                </view>
                <view class="describe-text" v-show="card.describeText">
                  {{ card.describeText }}
                </view>
              </view>
            </view>
          </view>
          <view class="y-section">注意事项</view>
          <view class="detail-text">
            <view>1.购买会员套餐之后，可解锁任意资源</view>
            <view
              >2.购买月卡VIP后，再购买年卡VIP或永久VIP，会员时间可以累积，每日解锁次数按照高等级会员次数计算</view
            >
            <view>3.不支持补差价购买更高等级会员套餐</view>
            <view>4.会员套餐一经购买，不支持退款</view>
          </view>
        </swiper-item>
        <swiper-item class="swiper-item">2</swiper-item>
        <swiper-item class="swiper-item">3</swiper-item>
      </swiper>
    </view>
    <view class="pay-container" v-show="current === 0">
      <view class="pay-item pay-wechat">
        <image src="/static/wechat.png" mode="" class="pay-item-image"></image>
        <view> 微信充值 </view>
      </view>
      <view class="pay-item pay-zfb">
        <image src="/static/zfb.png" mode="" class="pay-item-image"></image>
        <view> 支付宝充值 </view>
      </view>
    </view>
  </view>
</template>

<script>
import { vipStatus, getVipList } from "./../../api/vip.js";
export default {
  data() {
    return {
      swiperCurrent: 0,
      current: 0,
      tabs: ["会员充值", "我的收藏", "我的资源"],
      cards: [
        {
          title: "永久VIP",
          bigPrice: "¥188",
          smallPrice: "¥268",
          saveText: "节省29.9%",
          countText: "20次解锁/天",
          describeText: "最优惠",
          isActive: true,
        },
        {
          title: "年卡VIP",
          bigPrice: "135",
          smallPrice: "158",
          saveText: "节省14.6%",
          countText: "15次解锁/天",
          describeText: "最多人选",
          isActive: false,
        },
        {
          title: "月卡VIP",
          bigPrice: "35",
          smallPrice: "40",
          saveText: "节省12.5%",
          countText: "10次解锁/天",
          describeText: "",
          isActive: false,
        },
      ],
      vipList:[

      ],
      vip: {
        enable: false,
        periodFlag: "",
        vipExpireAt: "",
        unlockQuote: "",
        used: "",
      },
    };
  },
  onLoad() {
    this.getVipStatus();
    this.getVipList();
  },
  methods: {
    /** 退出登录 */
    logout() {
      uni.showModal({
        title: "提示",
        content: "确定退出登录？",
        success: function (res) {
          if (res.confirm) {
            uni.removeStorageSync("TOKEN");
            uni.redirectTo({
              url: "/pages/home/home",
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
    /** 获取VIP状态 */
    async getVipStatus() {
      let res = await vipStatus();
      this.vip = res.data;
      console.log(res);
    },
    /** 获取套餐 */
    async getVipList() {
      let res = await getVipList();
      this.vipList = res.data.list
    },
    /** 挑选套餐 */
    tapCard(index) {
      this.cards.forEach((item, i) => {
        item.isActive = false;
        if (i === index) {
          item.isActive = true;
        }
      });
    },
    tapBack() {
      uni.navigateBack();
    },
    animationFinished(e) {
      this.current = e.detail.current;
      this.swiperCurrent = e.detail.current;

      // 填充数据
      // this.fillData()
    },
    changeTab(index) {
      this.swiperCurrent = index;

      console.log("当前选中的项：" + index);
    },
    upper: function (e) {
      console.log(e);
    },
    lower: function (e) {
      console.log(e);
    },
    scroll: function (e) {
      console.log(e);
      this.old.scrollTop = e.detail.scrollTop;
    },
  },
};
</script>

<style lang="scss">
.my {
  ::v-deep .v-tabs__container-item {
    font-family: PingFangSC-Regular, PingFang SC;
  }
}
.y-header {
  height: 360rpx;
  background-image: url("/static/headerBg3.png");
  background-size: cover;
  color: #fff;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  overflow: hidden;
  padding: 0 30rpx 0 30rpx;
  position: relative;
  &-back {
    &__img {
      width: 48rpx;
      height: 48rpx;
      margin-top: 120rpx;
    }
  }

  &-info {
    display: flex;
    align-items: center;

    &__avator {
      width: 132rpx;
      height: 132rpx;
      border: 4rpx solid #ef0ec9;
      border-radius: 50%;
    }

    &__detail {
      font-size: 28rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.6);
      margin-left: 40rpx;

      &__phone {
        font-size: 32rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.79);
      }

      &__describe {
        display: flex;
        align-items: center;
        // justify-content: space-around;
      }
    }
  }

  .value-text {
    margin: 0 20rpx;
    color: #ef0ec9;
  }
  &-logout {
    width: 128rpx;
    height: 48rpx;
    border-radius: 30rpx;
    border: 2rpx solid rgba(255, 255, 255, 0.45);
    text-align: center;
    line-height: 48rpx;
    position: absolute;
    top: 170rpx;
    right: 30rpx;
    color: rgba(255, 255, 255, 0.79);
  }
}

.my-container {
  background-color: #171616;
  height: calc(100vh - 360rpx);
  padding: 0 32rpx;

  &__tab {
    padding: 0 40rpx;
  }

  &__swiper {
    height: calc(100vh - 500rpx);
  }
}

.swiper-item {
  color: #fff;
  position: relative;
}

.y-section {
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  position: relative;
  text-indent: 20rpx;
  margin: 32rpx 0;
}

.y-section::before {
  content: "";
  display: block;
  width: 6rpx;
  height: 24rpx;
  background: linear-gradient(315deg, #8b3fff 0%, #ef0ec9 100%);
  border-radius: 4rpx;
  position: absolute;
  top: 10rpx;
}

.pay-card-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.pay-card {
  width: 220rpx;
  height: 340rpx;
  background: #1f1f1f;
  border-radius: 8rpx;

  &__header {
    height: 64rpx;
    line-height: 64rpx;
    text-align: center;
    background: #2e2e2e;
    border-radius: 8rpx 8rpx 0 0;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
  }

  &__body {
    height: 240rpx;
    padding-top: 25rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
}

.big-price {
  font-size: 36rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
}
.pay-card-active {
  border: 2rpx solid #ef0ec9;
}
.small-price {
  font-size: 20rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: line-through;
  margin-left: 4rpx;
}

.save-text {
  font-size: 20rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
}

.count-text {
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ef0ec9;
}

.describe-text {
  width: 184rpx;
  height: 36rpx;
  background: rgba(255, 147, 0, 0.24);
  border-radius: 8rpx;
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ef790e;
  line-height: 36rpx;
  text-align: center;
}

.detail-text {
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
}
.pay-container {
  height: 128rpx;
  background: #1f1f1f;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;
  bottom: 0;
}
.pay-item {
  width: 280rpx;
  height: 80rpx;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: PingFangSC-Regular, PingFang SC;
}
.pay-wechat {
  background: #00a53f;
}
.pay-zfb {
  background: #0058ff;
  margin-left: 40rpx;
}
.pay-item-image {
  width: 48rpx;
  height: 48rpx;
}
</style>