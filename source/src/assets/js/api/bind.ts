import { fetchRun, guildUrl } from './fetch'

/**
 * 绑定公会后台
 */
export const bind = () => fetchRun({
  url: `${guildUrl}/login/bind_user`,
  defaultValue: {},
  method: 'post',
  token: 'guildToken',
  handler(res) {
    localStorage.setItem('guildToken', res.access_token)
    return res
  },
})

/**
 * app token 换取 公会 token
 */
export const transformGuildToken = () => fetchRun({
  url: `${guildUrl}/login/get_access_token`,
  defaultValue: {},
  method: 'post',
  showMsg: false,
  handler(res) {
    localStorage.setItem('guildToken', res.access_token)
    return res
  },
})

/**
 * 检查公会状态
 */
export const checkGuildStatus = () => fetchRun({
  url: `${guildUrl}/union/union_check_status`,
  defaultValue: {},
  token: 'guildToken',
  method: 'post',
})
