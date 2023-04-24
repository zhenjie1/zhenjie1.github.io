import { fetchRun } from './fetch'

const id = 1

/**
 * 列表
 */
export const getList = () => fetchRun<{
  avatar: string
  fav_rank: Data[]
  gender: string
  is_follow: number
  is_live: number
  level: string
  money: string
  nickname: string
  shower_level: string
  totalcost: string
  totalpoint: string
  user_level: string
  userid: string
  usernumber: string
  usertype: string
}[]>({
  url: `/zhibo_play/activity_rank?type=show&activity_id=${id}&encrypt=1`,
  version: 'v4',
  // url: `https://live.jxdkj.com/v4/zhibo_play/activity_rank?type=show&activity_id=${id}&encrypt=1`,
  method: 'get',
  defaultValue: [],
  k1: 'ZjG5IL9yC64Lablm',
  k2: 'W6MASgKZPz3w5kC6',
  isDecrypt: true,
})

/**
 * 规则
 */
export const getRule = () => fetchRun<{
  activity_intro: string
  activity_name: string
  end_time: string
  gift_ids: string
  gift_info: Data[]
  id: string
  image: string
  reward_info: string
  rules: string
  start_time: string
  status: string
}>({
  url: `/zhibo_play/activity_info?activity_id=${id}&encrypt=1`,
  version: 'v4',
  // url: `https://live.jxdkj.com/v4/zhibo_play/activity_info?activity_id=${id}&encrypt=1`,
  method: 'get',
  defaultValue: [],
  k1: 'ZjG5IL9yC64Lablm',
  k2: 'W6MASgKZPz3w5kC6',
  isDecrypt: true,
})
