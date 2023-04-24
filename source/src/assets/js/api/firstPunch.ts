import { fetchRun } from './fetch'

/**
 * 获取首冲配置
 */
export const getList = () => fetchRun<{
  diamond: string
  high_price: string
  id: string
  low_price: string
  name: string
  items: {
    award_effect: string
    award_img: string
    award_name: string
    first_charge_id: string
    nums: string
    relate_id: string
    type_id: string
    type_name: string
    validate: string
  }[]
}[]>({
  url: '/charge_activity/first_charge_rewards',
  defaultValue: [],
})
