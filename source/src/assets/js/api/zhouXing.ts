import { fetchRun } from './fetch'

export const activeId = 1
/**
 * 周星榜
 */
export const weekRank = () => fetchRun({
  url: '/zhibo/gift_week_rank',
  method: 'post',
  defaultValue: {},
  version: 'v4',
})
/**
 * 名人榜
 */
export const celebrityRank = () => fetchRun({
  url: '/zhibo/gift_week_users_rank',
  method: 'post',
  defaultValue: {},
  version: 'v4',
})

/**
 * 获取某一榜单的用户列表
 */
export const weekRankList = () => fetchRun({
  url: '/zhibo/gift_week_showers_rank',
  method: 'post',
  defaultValue: {},
  version: 'v4',
})

/**
 * 规则
 */
export const rule = () => fetchRun({
  url: '/zhibo/gift_week_rules',
  method: 'post',
  defaultValue: {},
  version: 'v4',
})
