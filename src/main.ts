import { createApp } from 'vue'
import AppTemp from '@/App.vue'
import 'js/test'

// import 'js/reload'

import globalDirective from './assets/js/directive'
import Socket from '@/plugins/sockets/install'
import socketGlobalListen from 'js/globalSocketListen/index'
import store from '@/store'
import initElement from '@/plugins/element'
import initGlobalComponent from '@/plugins/globalComponents/globalComponents'

// 引入的 css 资源
import 'css/clear.scss'
import 'css/common.scss'
// import 'css/theme/blackTheme.css'
import 'css/theme/defaultTheme.css'
import 'css/wechat.scss'

import router from './router/index'
import { testApi } from './api'

const app = createApp(AppTemp as any)

app.config.performance = true

const sockets = new Socket({ globalSocket: socketGlobalListen })
app.use(router).use(store).use(sockets)
globalDirective(app)
initElement(app)
initGlobalComponent(app)

app.mount('#app')

testApi()
