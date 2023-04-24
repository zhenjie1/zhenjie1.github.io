import { fetchRun } from './fetch'

/**
 * 上传图片
 */
export const uploadImage = () => fetchRun({
  url: '/upload/upload_image',
  defaultValue: {},
  method: 'post',
  version: 'v4',
})

/**
 * 识别证件
 */
export const identify = () => fetchRun({
  url: '/union/get_id_card_info',
  defaultValue: {},
  method: 'post',
})

/**
 * 识别营业执照
 */
export const license = () => fetchRun({
  url: '/union/get_licence_info',
  defaultValue: {},
  method: 'post',
})

/**
 * wx js sdk
 */
export const wxConfig = () => fetchRun({
  url: '/user/wx_jssdk_config',
  defaultValue: {},
  method: 'post',
})
