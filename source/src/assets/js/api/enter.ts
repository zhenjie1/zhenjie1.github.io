import { fetchRun, guildUrl } from './fetch'

/**
 * 获取客户链接
 */
export const getCustomerLink = () => fetchRun({
  url: '/user/get_wx_customer_config',
  method: 'post',
  version: 'v4',
})

/**
 * 上传图片
 */
export const apply = () => fetchRun({
  url: `${guildUrl}/union/union_apply`,
  defaultValue: {},
  method: 'post',
  token: 'guildToken',
})

/**
 * 检查状态
 */
export const checkStatus = () => fetchRun({
  url: `${guildUrl}/union/union_check_status`,
  method: 'post',
  token: 'guildToken',
})

// 申请详情
export function checkDetail() {
  return fetchRun<Data>({
    url: `${guildUrl}/union/union_apply_detail`,
    method: 'post',
    token: 'guildToken',
  })
}
