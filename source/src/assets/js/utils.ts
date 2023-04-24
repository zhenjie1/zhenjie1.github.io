// import CryptoJS from 'crypto-js/crypto-js.js'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

// 是否是开发环境
export const isDev = localStorage.getItem('isDev') === 'true' || ['development', 'test'].includes(process.env.NODE_ENV as any)

// 生成唯一标识
export const uuid = () => {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

// 获取uuid
export function useUuid() {
  let id = sessionStorage.getItem('uuid')
  if (id) return id
  else {
    id = uuid()
    sessionStorage.setItem('uuid', id)
    return id
  }
}
