<script>
export default {
  onLaunch: function () {
    console.warn(
      "当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！"
    );
    console.log("App Launch");

    uni.loadFontFace({
      family: "PingFangSC-Regular",
      source: 'url("/static/DingTalk_JinBuTi_Regular.ttf")',
      success() {
        console.log("success");
      },
    });
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "@/uni_modules/uni-scss/index.scss";
/* #ifndef APP-NVUE */
@import "@/static/customicons.css";
@import "@/static/font.css";

// 设置整个项目的背景色
page {
  background-color: #171616;
}

/* #endif */
.example-info {
  font-size: 14px;
  color: #333;
  padding: 10px;
}
</style>
