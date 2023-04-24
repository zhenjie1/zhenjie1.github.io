import { fetchRun } from './fetch'

const guildUrl = `${import.meta.env.VITE_API_URL_GUILD}union`

/**
 * 上传图片
 */
export const sendCode = () => fetchRun({
  url: `${guildUrl}/login/mobile_send_code`,
  defaultValue: {},
  method: 'post',
})
