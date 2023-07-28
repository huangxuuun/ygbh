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
    <!-- <uni-list>
      <uni-list-item direction="column" :border="false" clickable>
        <template v-slot:header>
          <view></view>
        </template>
        <template v-slot:body>
          <view class="recommend-container">
            <swiper
              style="height: 100%; width: 100%"
              circular
              :indicator-dots="indicatorDots"
              :autoplay="autoplay"
              :interval="interval"
              indicator-color="rgba(255,255,255,0.2)"
              indicator-active-color="linear-gradient(315deg, #8B3FFF 0%, #EF0EC9 100%)"
              :duration="duration"
            >
              <swiper-item v-for="banner in item.bannerList" :key="banner">
                <image
                  style="width: 100%; height: 100%"
                  mode="aspectFit"
                  :src="banner"
                ></image>
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
                    <text style="min-width: 120rpx; display: inline-block"
                      >密码：</text
                    >
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
                  <view
                    class="lock-btn"
                    @click="unlockItem"
                    v-if="!item.unlocked"
                  >
                    VIP解锁
                  </view>
                  <view class="lock-btn" v-else> 已解锁 </view>
                </view>
              </view>
              <view class="recommend-detail__tips" v-if="!item.unlocked">
                解锁后可查看和保存全部资源！
              </view>
            </view>
          </view>
        </template>
      </uni-list-item>
    </uni-list> -->
    <swiper :vertical="true" style="width: 100%; height: calc(100vh - 176rpx)">
      <swiper-item v-for="item in list" :key="item.id">
        <view class="recommend-container">
          <swiper
            style="height: calc(100vh - 500rpx); width: 100%"
            circular
            :indicator-dots="indicatorDots"
            :autoplay="autoplay"
            :interval="interval"
            indicator-color="rgba(255,255,255,0.2)"
            indicator-active-color="linear-gradient(315deg, #8B3FFF 0%, #EF0EC9 100%)"
            :duration="duration"
          >
            <swiper-item v-for="banner in item.bannerList" :key="banner">
              <image
                style="width: 100%; height: 100%"
                mode="aspectFit"
                :src="banner"
              ></image>
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
              <view>
                <text style="display: block">资源地址：</text>
                <text style="display: block">密码：</text>
              </view>
              <view class="recommend-detail__tips" v-if="!item.unlocked">
                解锁可查看和保存全部资源！
              </view>
              <view v-else>
                <view style="display: flex; align-items: center">
                  <text class="value-text">{{ item.url }}</text>
                  <image
                    src="/static/copy.png"
                    alt=""
                    class="icon"
                    @click="copyText(item.url)"
                  />
                </view>
                <view style="display: flex; align-items: center">
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
                <view
                  class="lock-btn"
                  @click="unlockItem"
                  v-if="!item.unlocked"
                >
                  VIP解锁
                </view>
                <view class="lock-btn" v-else> 已解锁 </view>
              </view>
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { uuid } from "./../../utils/uuid.js";
import {
  resourceDetail,
  likeItem,
  unlockItem,
  getList,
} from "./../../api/resource.js";
export default {
  data() {
    return {
      background: ["color1", "color2", "color3"],
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
      page: {
        sort: "",
        pageOffset: "",
        pageSize: 10,
        sessionId: uuid(),
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
      item: {
        id: 0,
        bannerList: [],
        title: "",
        publishAt: "",
        unlockNum: 0,
        likeNum: 0,
        liked: false,
        unlocked: false,
        url: "",
        password: "",
      },
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
      this.item = this.list[5];
    },
    copyText(t) {
      uni.setClipboardData({
        data: t,
        success: function () {
          console.log("success");
        },
      });
    },
    async unlockItem() {
      let { item } = this;
      if (item.id) {
        let res = await unlockItem({ id: item.id });
        let { url, password } = res.data;
        this.item.url = url;
        this.item.url = password;
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
    tapMy() {
      uni.navigateTo({
        url: "/pages/my/my",
      });
    },
    tapTab() {
      uni.navigateBack();
    },
  },
  onShow() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
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

  // .swiper {
  //   height: 900rpx;
  // }

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
      justify-content: space-between;
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
      // position: absolute;
      // bottom: 26rpx;
      // left: 150rpx;
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
    width: 320rpx;
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
}
</style>