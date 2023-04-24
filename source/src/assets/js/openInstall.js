import { useScriptTag } from '@vueuse/core'
import { isIos } from './utils'
import yindao from '~/assets/images/invitationGift/yindao.png'

function initOpenInstall(btnClass) {
  // <script type="text/javascript" charset="UTF-8" src="https://web.openinstall.io/web/banner.js?id=5967045300759369616"></script> <!--替换id后方的xxxxxx部分为应用控制台中banner集成对应的id即可-->
  return new Promise((resolve) => {
    useScriptTag('https://web.cdn.openinstall.io/openinstall.js', () => {
      const data = window.OpenInstall.parseUrlParams()
      // eslint-disable-next-line no-new
      new window.OpenInstall({
        appKey: 'l27e1x', // appkey参数配置,需要自行替换对应的appkey
        /* 自定义遮罩的html */
        mask() {
          return isIos ? '<div></div>' : `<img src="${yindao}" style="position: fixed; top: 0; left: 0; height: 100vh;width: 100vw;"/>`
        },
        onready() {
          resolve(this)
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          const m = this
          const u = navigator.userAgent
          const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

          if (isIOS) {
            // 苹果端
            // isWeixin && m.wakeupOrInstall()
          }
          else {
            // 安卓端
            m.schemeWakeup()
          }

          // 进入页面直接运行
          const button = document.getElementById(btnClass)
          if (button) {
            button.onclick = function () {
              m.wakeupOrInstall()
              return false
            }
          }
        },
      }, data)
    })
  })
}

export default initOpenInstall
