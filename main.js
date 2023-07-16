
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import CardList from './componets/cardLise.vue'
Vue.component('CardList',CardList)
// import orangeUtil from './js_sdk/orange-util/orange-util.js
// Vue.use(orangeUtil);
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif