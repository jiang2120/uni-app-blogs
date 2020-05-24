import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
/* 接口地址 */
Vue.prototype.serverUrl = "https://x.dreamxiao.cn/api/v1/";
/* 图片地址 */
Vue.prototype.fileUrl   = "https://x.dreamxiao.cn/uploads/";
  
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
