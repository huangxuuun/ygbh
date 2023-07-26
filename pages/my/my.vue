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
          <view class="y-header-info__detail__phone">{{userData.nickname}}</view>
          <view
            >会员到期时间：<text class="value-text"
              >{{ vip.vipExpireAt }}</text
            ></view
          >
          <view class="y-header-info__detail__describe">
            <view>今日可解锁: <text class="value-text">{{ vip.unlockQuote }}</text></view>
            <view
              >已用: <text class="value-text">{{ vip.used }}</text></view
            >
            <view
              >剩余:
              <text class="value-text">{{ vip.unlockQuote - vip.used }}</text></view
            >
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
          <view class="y-section">
            <view class="y-section-line"></view>
            <text>选择会员套餐</text>
          </view>
          <view class="pay-card-container">
            <view
              class="pay-card"
              v-for="(card, index) in vipList"
              :key="card.name"
              :class="{ 'pay-card-active': card.isActive }"
              @click="tapCard(index)"
            >
              <view class="pay-card__header">
                {{ card.name }}
              </view>
              <view class="pay-card__body">
                <view>
                  <text class="big-price">{{ card.realPrice }}</text>
                  <text class="small-price">{{ card.originPrice }}</text>
                </view>
                <view class="save-text">
                  节省{{
                    (
                      (1 - Number(card.realPrice) / Number(card.originPrice)) *
                      100
                    ).toFixed(1)
                  }}%
                </view>
                <view class="count-text"> {{ card.quote }}次解锁/天 </view>
                <view class="describe-text" v-show="card.describeText">
                  {{ card.describeText }}
                </view>
              </view>
            </view>
          </view>
          <view class="y-section">
            <view class="y-section-line"></view>
            <text>注意事项</text>
          </view>
          <view class="detail-text">
            <view>1.购买会员套餐之后，可解锁任意资源</view>
            <view
              >2.购买月卡VIP后，再购买年卡VIP或永久VIP，会员时间可以累积，每日解锁次数按照高等级会员次数计算</view
            >
            <view>3.不支持补差价购买更高等级会员套餐</view>
            <view>4.会员套餐一经购买，不支持退款</view>
          </view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <card-list
            :list="collectPage.list"
            :loadType="collectPage.loadType"
            @scrolltolower="collectlower"
          ></card-list>
        </swiper-item>
        <swiper-item class="swiper-item">
          <card-list
            :list="resourcePage.list"
            :loadType="resourcePage.loadType"
            @scrolltolower="resourcelower"
          ></card-list>
        </swiper-item>
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
import { getLikeList, getUnlockedList } from "./../../api/resource";
import CardList from "./../../components/cardList.vue"
export default {
  components: {
    CardList
    // CardList: () => import("./../../components/cardList.vue"),
  },
  data() {
    return {
      userData:JSON.parse(uni.getStorageSync('USERINFO')),
      swiperCurrent: 0,
      current: 0,
      tabs: ["会员充值", "我的收藏", "我的资源"],
      // cards: [
      //   {
      //     title: "永久VIP",
      //     bigPrice: "¥188",
      //     smallPrice: "¥268",
      //     saveText: "节省29.9%",
      //     countText: "20次解锁/天",
      //     describeText: "最优惠",
      //     isActive: true,
      //   },
      //   {
      //     title: "年卡VIP",
      //     bigPrice: "135",
      //     smallPrice: "158",
      //     saveText: "节省14.6%",
      //     countText: "15次解锁/天",
      //     describeText: "最多人选",
      //     isActive: false,
      //   },
      //   {
      //     title: "月卡VIP",
      //     bigPrice: "35",
      //     smallPrice: "40",
      //     saveText: "节省12.5%",
      //     countText: "10次解锁/天",
      //     describeText: "",
      //     isActive: false,
      //   },
      // ],
      vipList: [
        // {
        //   id: 1,
        //   name: "月卡VIP",
        //   originPrice: "40",
        //   period: "30天",
        //   quote: 10,
        //   realPrice: "35",
        //   isActive: false,
        // },
      ],
      vip: {
        enable: false,
        periodFlag: "",
        vipExpireAt: "",
        unlockQuote: "",
        used: "",
      },
      collectPage: {
        pageOffset: "",
        pageSize: 10,
        loadType: "more", // loading noMore
        list: [],
      },
      resourcePage: {
        pageOffset: "",
        pageSize: 10,
        loadType: "more", // loading noMore
        list: [],
      },
    };
  },
  onReady() {
    this.getVipStatus();
    this.getVipList();
    this.getLikeList();
    this.getUnlockedList();
    console.log(uni.getStorageSync('USERINFO'),'userData')
  },
  methods: {
    async getLikeList() {
      const { pageOffset, pageSize } = this.collectPage;
      let res = await getLikeList({ pageOffset, pageSize });
      let { list, nextOffset } = res.data;
      list.forEach((item) => {
        this.collectPage.list.push(item);
      });
      this.collectPage.pageOffset = nextOffset;
      if (!this.collectPage.pageOffset) {
        this.collectPage.loadType = "noMore"; // 显示不再加载
      } else {
        this.collectPage.loadType = "more"; // 显示还可加载
      }
    },
    async getUnlockedList() {
      const { pageOffset, pageSize } = this.resourcePage;
      let res = await getUnlockedList({ pageOffset, pageSize });
      let { list, nextOffset } = res.data;
      list.forEach((item) => {
        this.resourcePage.list.push(item);
      });
      this.resourcePage.pageOffset = nextOffset;
      if (!this.resourcePage.pageOffset) {
        this.resourcePage.loadType = "noMore"; // 显示不再加载
      } else {
        this.resourcePage.loadType = "more"; // 显示还可加载
      }
    },
    collectlower() {
      if( this.collectPage.loadType === "noMore") return
      this.getLikeList()
      console.log("collectlower");
    },
    resourcelower() {
      if( this.resourcePage.loadType === "noMore") return
      this.getUnlockedList()
      console.log("resourcelower");
    },
    /** 退出登录 */
    logout() {
      uni.showModal({
        title: "提示",
        content: "确定退出登录？",
        success: function (res) {
          if (res.confirm) {
            uni.removeStorageSync("TOKEN");
            uni.removeStorageSync("USERINFO");
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
      let { list } = res.data;
      list.forEach((item) => {
        item.isActive = false;
      });
      this.vipList = list;
      this.vipList[0].isActive = true;
    },
    /** 挑选套餐 */
    tapCard(index) {
      this.vipList.forEach((item, i) => {
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
  overflow: scroll;
}

.y-section {
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  margin: 32rpx 0;
  display: flex;
  align-items: center;
}
.y-section-line {
    width: 6rpx;
    height: 24rpx;
    background: linear-gradient(315deg, #8b3fff 0%, #ef0ec9 100%);
    border-radius: 4rpx;
    margin-right: 20rpx;
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
</style>