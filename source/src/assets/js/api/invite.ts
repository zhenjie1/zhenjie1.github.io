import { fetchRun } from './fetch'

// 邀约数据
export const detail = () => fetchRun<{
  'activity_info': {
    'invite_info': string
    'invite_switch': null
    'share_code': string
  }
  'total_income': number
  'balance': string
}>({
  url: '/activity/invite_detail',
  defaultValue: {
    activity_info: {},
    total_income: 0,
    balance: '0',
  },
  version: 'v4',
  method: 'post',
  // handler: (res) => {
  //   res.activity_info.invite_switch = '0'
  //   return res
  // },
})

// 邀约好友列表
export const list = () => fetchRun<{
  list: Data[]
  total_count: number
  total_page: number
  total_task: number
}>({
  url: '/activity/invite_friend_list',
  defaultValue: {
    list: [],
  },
  version: 'v4',
  method: 'post',
})

// 邀约轮播显示信息
export const rollList = () => fetchRun<{
  list: Data[]
}>({
  url: '/activity/invite_roll_list',
  version: 'v4',
  method: 'post',
})

// invitationGift 接口
export const share_click_task = () => fetchRun({
  url: '/zhibo_play/share_click_task',
  version: 'v4',
  method: 'post',
  showMsg: false,
})
