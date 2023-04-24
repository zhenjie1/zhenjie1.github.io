import { fetchRun } from './fetch'

export interface ApiSnaInfo {
  activity_desc: string
  last_award_id?: string
  award: {
    award_type: string
    gift_id: string
    giftimage: string
    giftname: string
    giftprice: string
    id: string
    num: string
    prob: string
    tag: string
  }[]
  rules: {
    rule: { money: string; times: string }[]
    type: string
  }
  end_time: string
  id: string
  free_draw: string
  is_shelve: string
  issuer: string
  official_desc: string
  start_time: string
  status: number
  surplus_time: number
  title: string
  type: string
  user_gold_coin: string
  user_looting_value: number
}
/**
 * 规则
 */
export const info = () => fetchRun<ApiSnaInfo>({
  url: '/play_activity/activity_detail',
  method: 'post',
  defaultValue: [],
  version: 'v4',
  k1: 'ZjG5IL9yC64Lablm',
  k2: 'W6MASgKZPz3w5kC6',
  isDecrypt: true,
})

export interface LotteryList {
  giftimage: string
  giftname: string
  giftprice: string
  id: string
  num: string
  tag: string
}
/**
 * 抽奖
 */
export const lottery = () => fetchRun<{ list: LotteryList[] }>({
  url: '/play_activity/gold_coin_luck_draw',
  version: 'v4',
  method: 'post',
})

/**
 * 抽奖
 */
export const notice = () => fetchRun<{ list: { award: Data[]; nickname: string; id: string }[] }>({
  url: '/play_activity/turntable_win_list',
  version: 'v4',
  method: 'post',
})

/**
 * 中奖记录
 */
export const lotteryRecord = () => fetchRun<{
  list: {
    award_type: string
    create_time: string
    giftimage: string
    giftname: string
    num: string
  }[]
  total_count: number
  total_page: number
}>({
  url: '/play_activity/luck_win_list',
  version: 'v4',
  method: 'post',
})

