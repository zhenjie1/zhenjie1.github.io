import { fetchRun } from './fetch'

// 盲盒活动详情页
export const getBlindBoxInfo = () => fetchRun<{
  activity_id: string
}>({
  url: '/play_activity/activity_detail',
  method: 'post',
  defaultValue: [],
  version: 'v4',
})
// 开始盲盒抽奖
export const startBlindBox = () => fetchRun<{
  activity_id: string
  money: string
}>({
  url: '/play_activity/blindbox_draw',
  method: 'post',
  defaultValue: [],
  version: 'v4',
  showMsg: false,
})
// 用户当日中奖排行
export const getRank = () => fetchRun({
  url: '/play_activity/blindbox_day_user_gift_rank',
  method: 'post',
  defaultValue: [],
  version: 'v4',
})
// 盲盒跑马灯
export const getMarquee = () => fetchRun<{
  activity_id: string
}>({
  url: '/play_activity/turntable_win_list',
  method: 'post',
  defaultValue: [],
  version: 'v4',
})
// 抽奖记录
export const getRecord = () => fetchRun<{
  page: number
  page_limit: number
}>({
  url: '/play_activity/blindbox_draw_list',
  method: 'post',
  defaultValue: [],
  version: 'v4',
})
// 某次抽奖奖品详情
export const getRecordDetail = () => fetchRun<{
  id: string
}>({
  url: '/play_activity/blindbox_win_list',
  method: 'post',
  defaultValue: [],
  version: 'v4',
})
// 奖池记录
export const getPoolRecord = () => fetchRun<{
  page: number
  page_limit: number
}>({
  url: '/play_activity/blindbox_pool_list',
  method: 'post',
  defaultValue: [],
  version: 'v4',
})

// 盲盒活动规则
export const rule = () => fetchRun({
  url: '/play_activity/blindbox_intro',
  method: 'post',
  defaultValue: {},
  version: 'v4',
})
