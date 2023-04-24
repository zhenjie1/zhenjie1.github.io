import { fetchRun } from './fetch'

/**
 * 获取首冲配置
 */
export const getList = () => fetchRun<{
  lottery_records: {
    award_name: string
    nickname: string
    nums: string
    validate: string
  }
  awards: {
    award_effect: string
    award_img: string
    award_name: string
    id: string
    nums: string
    percent: string
    type_id: string
    type_name: string
    validate: string
  }[]
}[]>({
  url: '/charge_activity/lottery_awards',
  defaultValue: {},
})

/**
 * 抽奖
 */
export const lottery = () => fetchRun<{
  award_effect: string
  award_id: string
  award_img: string
  award_name: string
  nums: string
  relate_id: string
  type_id: string
  validate: string
}>({
  url: '/charge_activity/do_lottery',
  defaultValue: {},
})

/**
 * 每周任务
 */
export const weekTask = () => fetchRun<{
  awards: {
    award_effect: string
    award_img: string
    award_name: string
    id: string
    is_award: string
    money: string
    nums: string
    relate_id: string
    type_id: string
    type_name: string
    validate: string
  }[]
  user_charge_amount: string
}>({
  url: '/charge_activity/charge_awards_weekly',
  defaultValue: {},
})

/**
 * 每周任务 - 领取
 */
export const weekReceive = (award_id: string) => fetchRun<{
  awards: {
    award_effect: string
    award_img: string
    award_name: string
    id: string
    is_award: string
    money: string
    nums: string
    relate_id: string
    type_id: string
    type_name: string
    validate: string
  }[]
  user_charge_amount: string
}>({
  url: '/charge_activity/receive_weekly_charge_award',
  defaultValue: {},
  method: 'post',
  data: { award_id },
})

/**
 * 每周任务 - 领取
 * type = 1:首充有礼
 * type = 2:充值乐享
 */
export const rules = (type: 1 | 2) => fetchRun<Data>({
  url: `/charge_activity/activity_rules?type=${type}`,
  defaultValue: {},
  method: 'post',
  data: {
    type,
  },
})

