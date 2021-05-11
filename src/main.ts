import { get, set } from 'idb-keyval'
import Cookie from 'js-cookie'
import { createApp } from 'vue'
import AppTemp from '@/App.vue'
import 'js/test'

// Cookie.set('refreshToken', '123321312')
// import 'js/reload'

import initGlobalDirective from './assets/js/directive'
import store from '@/store'
import initElementUi from '@/plugins/element'
import initGlobalComponent from '@/plugins/globalComponents/globalComponents'

// 引入的 css 资源
import 'css/clear.scss'
import 'css/common.scss'
// import 'css/theme/blackTheme.css'
import 'css/theme/defaultTheme.css'
import 'css/wechat.scss'

import router from './router/index'

const app = createApp(AppTemp as any)

app.config.performance = true

app.use(router).use(store)

initGlobalDirective(app)
initElementUi(app)
initGlobalComponent(app)

app.mount('#app')

set('kkk', {
	a: 1,
	b: 2,
})
