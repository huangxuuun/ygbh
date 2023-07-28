<template>
  <view>
    <web-view :src="payUrl" :onloading="loading" :webview-styles="styles"></web-view>
    <view>{{ aa }}</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        payUrl: '',
        styles: {
          progress: true
        },
        aa: ""
      }
    },
    onLoad: function(option) {
      uni.showLoading({
      })
      setTimeout(function() {
        uni.hideLoading()
      }, 2000)
      this.payUrl = option.payUrl
      // const authUrl = `alipays://platformapi/startapp?appId=20000067&url=${encodeURIComponent(option.payUrl)}`;
      // plus.runtime.openURL(authUrl, function () {
      //   aa = "start alipay failed"
      // })
    },
    methods: {
      loading() {
        uni.showLoading({
          
        })
      }
    }
  }
</script>

<style>
uni-page-head {
  display: none;
}
</style>
