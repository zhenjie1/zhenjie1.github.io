// import eruda from 'eruda'
// eruda.init()

import Vue from 'vue'
import App from './App'
import store from './store/index'
import './assets/js/filter'
import router from './router'
import 'mint-ui/lib/style.css'
import "../src/assets/js/back.js";

import Toast from 'vux/src/plugins/toast/index'
import loading from 'vux/src/plugins/loading/'
Vue.use(Toast)
Vue.use(loading)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	store,
	template: '<App/>',
})

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title
	}
	next()
})

// // alert(window.location.href)


