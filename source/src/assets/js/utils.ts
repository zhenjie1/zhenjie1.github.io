// import CryptoJS from 'crypto-js/crypto-js.js'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import CryptoJS from 'crypto-js'
import Qs from 'qs'

import { showFailToast, showToast } from 'vant'
dayjs.extend(duration)

// 是否是开发环境
export const isDev = localStorage.getItem('isDev') === 'true' || ['development', 'test'].includes(process.env.NODE_ENV as any)

const u = navigator.userAgent // 获取设备信息
export const isAndroid = u.includes('android') || u.includes('Android') || u.includes('Linux') // android终端或者uc浏览器
export const isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
export const isWeixin = u.includes('MicroMessenger') // 是否是微信

export const setNewToken = () => {
  const token = getQueryString('token')
  // eslint-disable-next-line no-console
  console.log('token', token || localStorage.getItem('token'))
  if (token) localStorage.setItem('token', token)
}

/**
 * 调用原生函数
 * @param {string} name 函数名称
 */
export function runNativeFun(name: string, ...args: any[]) {
  if (!name) return console.error('调用原生函数失败，缺少 name 字段')

  const win: any = window

  // 赋予默认参数，方式bug出现
  if (args.length === 0) args = ['test']

  // eslint-disable-next-line no-console
  if (isDev) console.log('原生事件', name, '参数：', ...args)

  if (isAndroid) {
    win.liveapp?.[name]?.(...args)
    // console.log(win.liveapp)
    if (!win.liveapp?.[name]) console.error('调用异常', 'android')
  }
  else if (isIos) {
    win?.webkit?.messageHandlers[name]?.postMessage?.(...args)
    if (!win?.webkit?.messageHandlers[name]) console.error('调用异常', 'ios')
  }
}

/**
 * 获取地址栏参数
 * @param {string} name 名字
 * @param {string} url 地址，默认读取地址栏
 */
export function getQueryString(name: string, url?: string): string | undefined {
  url = url || location.href
  const path = url.split('?')

  if (path.length >= 2) {
    const data = Qs.parse(path[1].split('#')[0])
    return data[name] as string
  }
}

/**
 * 转对象
 */
export const tryParse = (object: string | Record<string, any>) => {
  try {
    if (typeof object === 'string') return JSON.parse(object)
    if (typeof object === 'object') return JSON.parse(JSON.stringify(object))
  }
  catch {}
  return object
}

const k1 = 'ZjG5IL9yC64Lablm'
const k2 = 'W6MASgKZPz3w5kC6'
/**
 * 解密
 */
export function decrypt(word: string, key1 = k1, key2 = k2) {
  const k = CryptoJS.enc.Utf8.parse(key1)
  const i = CryptoJS.enc.Utf8.parse(key2)
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypted = CryptoJS.AES.decrypt(srcs, k, {
    iv: i,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

window.decrypt = (text: any) => JSON.parse(decrypt(text))
/**
 * 加密
 */
export function encrypt(word: string, key1 = k1, key2 = k2) {
  const k = CryptoJS.enc.Utf8.parse(key1)
  const i = CryptoJS.enc.Utf8.parse(key2)
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, k, {
    iv: i,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.ciphertext.toString().toUpperCase()
}

/**
 * 礼包、道具 天数转换
 */
export const daysTrans = (num: string | number) => {
  num = typeof num === 'number' ? num : parseFloat(num)
  if (num === 0) return '永久'
  return `${num}天`
}

/**
 * 转日期格式
 */
export const timeTrans = (date: any, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) return ''
  if (typeof date === 'string' && date.length === 10) {
    date = parseFloat(date) * 1000
  }

  return dayjs(date).format(format)
}

export const useHtmlBg = (color = 'white', path?: string) => {
  // const id = `htmlStyle-${Math.random().toString()}`
  // const url = path ? `url("${path}") no-repeat` : ''

  // const { css } = useStyleTag(`html{background: ${color} ${url};background-size: 100% auto;}`, { id })
  // tryOnUnmounted(() => {
  //   css.value = ''
  // })
}

/**
 * copy 文字
 */
export function copyWord(sWord: string, showMessage = true) {
  const { body } = document
  const oInput = Object.assign(document.createElement('input'), {
    value: sWord, // 把文字放进 input 中，供复制
  })
  body.appendChild(oInput)
  oInput.select() // 选中创建的input
  // ▼执行复制方法，该方法返回布尔值，表示复制的成功性
  const isCopyOk = document.execCommand('copy')
  if (isCopyOk) {
    if (showMessage) showToast('已复制到粘贴板')
  }
  else showFailToast('复制失败')
  body.removeChild(oInput) // 操作中完成后 从Dom中删除创建的input
}

/**
 * 等待一段时间
 */
export const sleep = (time = 1000) => new Promise(resolve => setTimeout(resolve, time))

/**
 * 加载 script 标签
 */
export const useScriptAdd = (url: string) => {
  return new Promise((resolve) => {
    useScriptTag(url, () => {
      resolve(true)
    })
  })
}

/**
 * 秒数转换为时分秒
 */
export function formatDuration(seconds: number, format = 'HH:mm:ss') {
  const duration = dayjs.duration(seconds, 'seconds')
  return duration.format(format)
}

/**
 * input 聚焦，并滚动到可视区域
 */
export function inputFocus(input: any) {
  if (!input) return

  if (input.$el) {
    let input1 = input.$el.querySelector('input')
    if (!input1) input1 = input.$el.querySelector('textarea')
    if (input1) input = input1
  }
  input.focus?.()

  if (isAndroid) {
    setTimeout(() => {
      input.scrollIntoView(false)
    }, 400)
  }
}

/**
 * 下载图片
 */
export function downloadImage(link: string, picName?: string) {
  const img = new Image()
  img.setAttribute('crossOrigin', 'Anonymous')
  img.onload = function () {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')!
    canvas.width = img.width
    canvas.height = img.height
    context.drawImage(img, 0, 0, img.width, img.height)
    const url = canvas.toDataURL('images/png')
    const a = document.createElement('a')
    const event = new MouseEvent('click')
    a.download = picName || 'default.png'
    a.href = url
    a.dispatchEvent(event)
  }
  img.src = `${link}?v=${Date.now()}`
}
