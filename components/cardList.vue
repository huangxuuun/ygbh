<template>
  <!-- scroll-view版本只给my.vue里面用否则无法触发滚动加载 -->
  <scroll-view class="card-list" :style="{ top: ListTop }"  @scrolltolower="scrolltolower"	:lower-threshold="10" style="height:900rpx" :scroll-y="true">
    <uni-list class="uni-list--waterfall">
      <uni-list-item
        direction="column"
        :border="false"
        class="uni-list-item--waterfall"
        v-for="(item) in list"
        :key="item.id"
        clickable
      >
        <!-- 自定义 header -->
        <template v-slot:header>
          <view
            class="y-card-image"
            @click="tapDetail(item)"
            :style="{ 'background-image': 'url(' + item.bannerList[0] + ')' }"
          >
            <view class="y-card-time"> {{ item.publishAt }} </view>
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
        v-if="list.length===0"
      ></image>
    </uni-list>
    <uni-load-more
      :status="loadType"
      style="position: relative; background-color: #171616"
      :style="{ top: loadMoreTop }"
    ></uni-load-more>
  </scroll-view>
</template>

<script>
import { likeItem } from "./../api/resource.js";
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: [],
    },
    loadType: {
      type: String,
      required: true,
      default: [],
    },
    ListTop: {
      type: String,
      required: false,
      default: "-2rpx",
    },
    loadMoreTop: {
      type: String,
      required: false,
      default: "-4rpx",
    },
  },
  name: "CardList",
  data() {
    return {};
  },
  methods: {
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
    scrolltolower(){
      console.log('scrolltolower')
      this.$emit('scrolltolower')
    },
    tapDetail(listItem) {
      console.log("tapDetail");
      uni.navigateTo({
        url: `/pages/detail/detail?id=${listItem.id}`,
      });
    },
  },
};
</script>

<style lang="scss">
.card-list {
  position: relative;
}
.uni-list--waterfall {
  background-color: #171616;
  padding: 8rpx;
  /* #ifndef H5 || APP-VUE */
  // 小程序 编译后会多一层标签，而其他平台没有，所以需要特殊处理一下
  ::v-deep .uni-list {
    /* #endif */
    // position: relative;
    // top: 240rpx;
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
</style>