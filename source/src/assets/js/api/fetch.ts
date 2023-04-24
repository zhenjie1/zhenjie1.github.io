/* eslint-disable no-console */
import { showToast } from 'vant'
import Qs, { parse } from 'qs'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { decrypt, encrypt, getQueryString, isDev, tryParse } from '../utils'

const baseUrl = import.meta.env.VITE_API_URL
export const guildUrl = `${import.meta.env.VITE_API_URL_GUILD}union`

interface FetchRunOption extends AxiosRequestConfig {
  url: string
  defaultValue?: any
  method?: 'get' | 'post'
  data?: Data
  version?: 'v2' | 'v4'
  showMsg?: boolean
  token?: 'token' | 'guildToken'

  isDecrypt?: boolean
  k1?: string
  k2?: string
  time?: boolean

  handler?: (ctx: Data) => any
}

axios.interceptors.request.use((ctx) => {
  const version = ctx.version || 'v2'
  ctx.url = ctx.url!.startsWith('http') ? ctx.url : `${version}${ctx.url}`

  const time = Math.floor(Date.now() / 1000)
  const headerTime = btoa(encodeURI(time.toString()))

  if (ctx.data && !(ctx.data instanceof FormData)) {
    if (ctx.time) ctx.data.time = time
    ctx.data = Qs.stringify(ctx.data)
    ctx.sourceData = ctx.data
  }

  ctx.headers = {
    AUTHORIZATION: localStorage.getItem(ctx.token),
  } as Data
  if (ctx.time) ctx.headers.Nonce = headerTime
  return ctx
})

const k1 = 'ZjG5IL9yC64Lablm'
const k2 = 'W6MASgKZPz3w5kC6'
axios.interceptors.response.use((ctx) => {
  const config = ctx.config as Data
  if (typeof ctx.data === 'string') {
    try {
      ctx.data = tryParse(decrypt(ctx.data, config.k1 || k1, config.k2 || k2))
    }
    catch (err) {
      console.log('decode err', err)
    }
    // }
  }

  if (isDev) {
    const code = ctx.data.code
    const isSuccess = code === 200

    console[isSuccess ? 'groupCollapsed' : 'group'](`%c ${printUrl(ctx.config.url)}`, isSuccess ? '' : 'color:red;')
    console.log('params', config.sourceData)
    console.log('result', isSuccess ? ctx.data.data || ctx.data : ctx.data)
    console.groupEnd()
  }

  // console.log(ctx.data)
  // console.log(decrypt(ctx.data))

  if (ctx.data.code !== 200)
    return Promise.reject(ctx)

  return ctx
})

export function fetchRun<T = Data>(options: FetchRunOption) {
  const resultOptions = {
    request: ref({} as AxiosResponse<T>),
    data: ref(options.defaultValue ?? {} as T),
    loading: ref(false),
    run,
  }

  const handler = options.handler || ((res: any) => res)
  function run(data?: any) {
    options.data = data || {}
    resultOptions.loading.value = true

    options.showMsg = options.showMsg ?? true
    options.token = options.token ?? 'token'

    // 公会的地址
    if (options.url.startsWith(guildUrl)) {
      console.log('this is guild url', options.url)
      options.k1 = 'Open2020Open8888'
      options.k2 = '2020Open8888Open'
      options.time = true
      options.transformRequest = (data) => {
        return encrypt(JSON.stringify(parse(data)), 'Open2020Open8888', '2020Open8888Open')
      }
    }

    return axios({
      ...options,
      baseURL: baseUrl,
      url: options.url,
      method: options.method,
      data: options.data,
    })
      .then((data) => {
        resultOptions.request.value = data
        resultOptions.data.value = data.data.code === 200 ? handler(data.data.data) : data

        return resultOptions.data.value
      }).catch((ctx) => {
        if (ctx.data?.msg && ctx.config.showMsg)
          showToast(ctx.data.msg)

        throw ctx
      }).finally(() => resultOptions.loading.value = false)
  }

  return resultOptions
}

function printUrl(url?: string) {
  if (!url)
    return 'url 异常'
  const urls = url.split('/')
  return urls.slice(urls.length - 2).join('/')
}
