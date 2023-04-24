import { fetchRun } from './fetch'

export const activeId = 3
/**
 * 获取活动详情
 */
export const detail = () => fetchRun({
  url: '/play_activity/activity_detail',
  method: 'post',
  defaultValue: {},
  version: 'v4',
})

/**
 * 跑马灯
 */
export const turntable = () => fetchRun({
  url: '/play_activity/turntable_win_list',
  defaultValue: {},
  method: 'post',
  version: 'v4',
})

// 抽奖
export const lottert = () => fetchRun({
  url: '/play_activity/luck_draw',
  defaultValue: {},
  method: 'post',
  version: 'v4',
})

/**
 * 获取余额
 */
export const getBalance = () => fetchRun({
  url: '/user/get_mine_balance',
  defaultValue: 0,
  method: 'post',
  version: 'v4',
  handler: res => res.balance,
})

/**
 * 中奖记录
 */
export const getWinList = () => fetchRun({
  url: '/play_activity/luck_win_list',
  defaultValue: {},
  method: 'post',
  version: 'v4',
})

/**
 * 排行榜
 */
export const getRankList = () => fetchRun({
  url: '/play_activity/luck_win_day_list',
  defaultValue: {},
  method: 'post',
  version: 'v4',
})

/**
 * 详情
 */
export const getDetail = () => fetchRun({
  url: '/play_activity/activity_detail',
  defaultValue: {},
  method: 'post',
  version: 'v4',
})

/**
 * 规则
 */
export const getRule = () => fetchRun({
  url: '/play_activity/luck_intro',
  defaultValue: {},
  method: 'post',
  version: 'v4',
})
