import type { Router } from 'vue-router'
import type { ECharts } from 'echarts'

// export {}
declare global {
  interface Data<T = any> {
    [key: string]: T
  }

  interface Window {
    router: Router
    wx: Data
    Fingerprint2: any
    echarts: ECharts
  }
}
