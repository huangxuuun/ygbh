<template>
  <view class="recommend">
    <view class="y-header">
      <view class="y-header-tab">
        <view @click="tapTab">首页</view>
        <view style="margin-left: 142rpx" :class="{ 'y-tab-active': true }"
          >推荐</view
        >
      </view>
      <uni-icons
        type="person"
        size="48rpx"
        color="#fff"
        class="person"
        @click="tapMy"
      ></uni-icons>
    </view>
    <view class="recommend-container">
      <swiper
        class="swiper"
        circular
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        indicator-color="rgba(255,255,255,0.2)"
        indicator-active-color="linear-gradient(315deg, #8B3FFF 0%, #EF0EC9 100%)"
        :duration="duration"
      >
        <swiper-item>
          <view class="swiper-item uni-bg-red">A</view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item uni-bg-green">B</view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item uni-bg-blue">C</view>
        </swiper-item>
      </swiper>
      <view class="recommend-detail">
        <view class="recommend-detail__title"
          >【8G】虎牙直播雅雅主播10套合集下载</view
        >
        <view class="recommend-detail-tool">
          <view class="time"> 2022.2.2 </view>
          <view class="recommend-detail-tool-item">
            <image
              src="/static/star.png"
              class="recommend-detail-tool-item__image"
            />
            <text class="recommend-detail-tool-item__text">1221</text>
          </view>
          <view class="recommend-detail-tool-item">
            <image
              src="/static/lock.png"
              alt=""
              class="recommend-detail-tool-item__image"
            />
            <text class="recommend-detail-tool-item__text">1223</text>
          </view>
        </view>
        <view class="recommend-detail__line"> </view>
        <view class="recommend-detail__action">
          <view class="recommend-detail__action-left">
            <view>
              <text style="min-width: 120rpx; display: inline-block"
                >资源地址：</text
              >
              <text class="value-text">https://h57omr.axshare.com</text>
              <image src="/static/copy.png" alt="" class="icon" />
            </view>
            <view>
              <text style="min-width: 120rpx; display: inline-block"
                >密码：</text
              >
              <text class="value-text">123456</text>
              <image src="/static/copy.png" alt="" class="icon" />
            </view>
          </view>
          <view class="recommend-detail__action-right">
            <view class="lock-btn"> VIP解锁 </view>
          </view>
        </view>
        <view class="recommend-detail__tips">
          解锁后可查看和保存全部资源！
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      background: ["color1", "color2", "color3"],
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
    };
  },
  methods: {
    tapMy() {
      uni.navigateTo({
        url: "/pages/my/my",
      });
    },
    tapTab() {
      uni.navigateBack();
    },
  },
};
</script>

<style lang="scss">
.recommend {
  .y-header {
    height: 176rpx;
    background-image: url("/static/headerBg2.png");
    background-size: cover;
    color: #fff;
    font-size: 28rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    overflow: hidden;
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
  .recommend-container {
    background-color: #171616;
    height: calc(100vh - 176rpx);
    padding: 8rpx;
    box-sizing: border-box;
    overflow: scroll;
  }

  .swiper {
    height: 900rpx;
  }

  .recommend-detail {
    padding: 30rpx;
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.79);
    position: relative;
    &__title {
      font-size: 28rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.79);
      line-height: 36rpx;
    }

    &__line {
      height: 2rpx;
      background-color: #383838;
      margin-top: 30rpx;
      margin-bottom: 20rpx;
    }

    &__action {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    &__tips {
      width: 380rpx;
      height: 95rpx;
      line-height: 90rpx;
      text-align: center;
      background: rgba(178, 0, 254, 0.22);
      border-radius: 8rpx;
      backdrop-filter: blur(3px);
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ef0ec9;
      position: absolute;
      top: 170rpx;
      left: 150rpx;
    }
  }

  .recommend-detail-tool {
    margin-top: 28rpx;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.45);

    &-item {
      display: flex;
      align-items: center;
      margin-left: 24rpx;

      &__image {
        width: 28rpx;
        height: 28rpx;
      }

      &__text {
        margin-left: 8rpx;
      }
    }
  }

  .time {
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    line-height: 32rpx;
  }

  .icon {
    height: 24rpx;
    width: 24rpx;
    margin-left: 16rpx;
  }

  .value-text {
    color: #ef0ec9;
  }

  .lock-btn {
    background-image: url("/static/lockBg.png");
    background-size: cover;
    height: 64rpx;
    line-height: 64rpx;
    width: 160rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
  }
}
</style>