import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from 'store' // 引入vuex
Vue.use(uView);

Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
