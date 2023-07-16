<template>
  <view class="detail">
    <view class="y-header-back" @click="tapBack">
      <image src="/static/back.png" class="y-header-back__img"></image>
    </view>
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
      <swiper-item v-for="banner in item.bannerList" :key="banner">
        <view
          class="swiper-item"
          :style="{ 'background-image': 'url(' + banner + ')' }"
        ></view>
      </swiper-item>
    </swiper>
    <view class="recommend-detail">
      <view class="recommend-detail__title">{{ item.title }}</view>
      <view class="recommend-detail-tool">
        <view class="time"> {{ item.publishAt }} </view>
        <view class="recommend-detail-tool-item">
          <image
            src="/static/starfill.png"
            alt=""
            class="recommend-detail-tool-item__image"
            v-if="item.liked"
            @click="collectItem(2)"
          />
          <image
            src="/static/star.png"
            alt=""
            class="recommend-detail-tool-item__image"
            v-else
            @click="collectItem(1)"
          />
          <text class="recommend-detail-tool-item__text">{{
            item.likeNum
          }}</text>
        </view>
        <view class="recommend-detail-tool-item">
          <image
            src="/static/lock.png"
            alt=""
            class="recommend-detail-tool-item__image"
          />
          <text class="recommend-detail-tool-item__text">{{
            item.unlockNum
          }}</text>
        </view>
      </view>
      <view class="recommend-detail__line"> </view>
      <view class="recommend-detail__action">
        <view class="recommend-detail__action-left">
          <view style="display: flex; align-items: center">
            <text style="min-width: 120rpx; display: inline-block"
              >资源地址：</text
            >
            <text class="value-text">{{ item.url }}</text>
            <image
              src="/static/copy.png"
              alt=""
              class="icon"
              @click="copyText(item.url)"
            />
          </view>
          <view style="display: flex; align-items: center">
            <text style="min-width: 120rpx; display: inline-block">密码：</text>
            <text class="value-text">{{ item.password }}</text>
            <image
              src="/static/copy.png"
              alt=""
              class="icon"
              @click="copyText(item.password)"
            />
          </view>
        </view>
        <view class="recommend-detail__action-right">
          <view class="lock-btn" @click="unlockItem"> VIP解锁 </view>
        </view>
      </view>
      <!-- <view class="recommend-detail__tips"> 解锁后可查看和保存全部资源！ </view> -->
    </view>
    <view class="info-content">
      <view class="y-section">写真集介绍</view>
      <view>
        {{ item.info }}
      </view>
      <view class="y-section">写真集介绍</view>
      <view>
        {{ item.menu }}
      </view>
      <view class="y-section">写真集介绍</view>
    </view>
    <view>
      <image
        v-for="img in item.previewImageList"
        :key="img"
        :src="img"
        style="width: 100vw"
      ></image>
    </view>
  </view>
</template>

<script>
import { resourceDetail, likeItem, unlockItem } from "./../../api/resource.js";
export default {
  data() {
    return {
      background: ["color1", "color2", "color3"],
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
      item: {
        bannerList: [],
        id: null,
        info: "",
        likeNum: 1,
        liked: false,
        menu: "菜单1",
        previewImageList: [],
        publishAt: "",
        title: "",
        unlockNum: "",
        unlocked: false,
        password: "",
        url: "",
      },
    };
  },
  methods: {
    copyText(t) {
      uni.setClipboardData({
        data: t,
        success: function () {
          console.log("success");
        },
      });
    },
    tapBack() {
      uni.navigateBack();
    },
    async unlockItem() {
      let { item } = this;
      if (item.id) {
        let res = await unlockItem({ id: item.id });
        console.log(res);
      }
    },
    async collectItem(action) {
      let { item } = this;
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
  },
  onLoad: async function (option) {
    if (option.id) {
      let res = await resourceDetail({ id: option.id });
      this.item = res.data;
    }
  },
};
</script>

<style lang="scss">
.pages-detail-detail {
  background-color: #171616;
}
.y-header-back {
  &__img {
    width: 48rpx;
    height: 48rpx;
    margin-top: 120rpx;
    position: relative;
    left: 30rpx;
  }
}

.detail {
  background-color: #171616;
  .swiper {
    height: 500rpx;
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
    display: inline-block;
    width: 250rpx;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
  .info-content {
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.6);
    padding: 0 32rpx;
  }
}
</style>
