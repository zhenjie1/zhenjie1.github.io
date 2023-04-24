import { fetchRun } from './fetch'

/**
 * 统计
 */
export const statistics = () => fetchRun({
  url: '/activity/sms_invite_sta',
  method: 'post',
  version: 'v4',
})
