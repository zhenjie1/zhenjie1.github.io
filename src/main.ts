import { createApp } from 'vue'
import AppTemp from '@/App.vue'
import 'js/test'

import 'js/rxjs/index'

// import 'js/reload'
import '@/plugins/socket/index'

import initGlobalDirective from './assets/js/directive'
import store from '@/store'
import initElementUi from '@/plugins/element'
import initGlobalComponent from '@/plugins/globalComponents/globalComponents'

// 引入的 css 资源
import 'css/clear.scss'
import 'css/common.scss'
import 'css/theme/blackTheme.css'
// import 'css/theme/defaultTheme.css'
import 'css/wechat.scss'

import router from './router/index'

async function createVue() {
	const app = createApp(AppTemp as any)

	app.config.performance = true

	app.use(router).use(store)

	initGlobalDirective(app)
	initElementUi(app)
	initGlobalComponent(app)

	app.mount('#app')
}

createVue()
