
// import VConsole from 'vconsole'
// new VConsole();

import Vue from 'vue'
import App from './App'
import store from './store/index'
import './assets/js/filter'
import router from './router'
// import { MessageBox } from 'mint-ui'
import 'mint-ui/lib/style.css'
import "../src/assets/js/back.js";

import Toast from 'vux/src/plugins/toast/index'
Vue.use(Toast)

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
