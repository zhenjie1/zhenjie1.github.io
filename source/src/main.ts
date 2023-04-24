import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router'
import CodeBlock from 'vue3-code-block'

import App from './App.vue'

import piniaInstall from './stores'
import generatedRoutes from '~pages'

import 'virtual:svg-icons-register'
import 'uno.css'
import '~/styles/main.scss'

export const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.afterEach(() => {
  const loadingEl = document.getElementById('loadingFull')
  if (loadingEl) {
    loadingEl.remove()
  }
})

window.router = router

const app = createApp(App)
app.use(router)
app.use(CodeBlock)
piniaInstall(app)

app.mount('#app')
