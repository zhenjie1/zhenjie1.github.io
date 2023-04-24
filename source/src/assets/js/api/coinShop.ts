import { fetchRun } from './fetch'

export const list = () => fetchRun({
  url: '/coin_shop/goods_list',
  method: 'post',
  version: 'v2',
  defaultValue: [],
})

export const pay = () => fetchRun({
  url: '/coin_shop/goods_buy',
  method: 'post',
  version: 'v2',
  isDecrypt: true,
})

// 金币商城 - 兑换明细
export const exchangeList = () => fetchRun({
  url: '/coin_shop/buy_list',
  method: 'post',
  version: 'v2',
})
