import { fetchRun } from './fetch'

/**
 * 检查状态
 */
export const checkStatus = () => fetchRun({
  url: '/scout/get_apply_status',
  defaultValue: {},
  method: 'post',
})

/**
 * 申请入驻
 */
export const signApply = () => fetchRun({
  url: '/scout/sign_apply',
  defaultValue: {},
  method: 'post',
  showMsg: true,
})

/**
 * 搜索
 */
export const searchGuild = () => fetchRun({
  url: '/union_shower/get_union_name',
  defaultValue: {},
  version: 'v4',
  method: 'post',
})

/**
 * 通过
 */
export const passApply = () => fetchRun({
  url: '/scout/shower_apply_adopt',
  defaultValue: {},
  method: 'post',
})

/**
 * 拒绝
 */
export const refuseApply = () => fetchRun({
  url: '/scout/shower_apply_refuse',
  defaultValue: {},
  method: 'post',
})

/**
 * 主播列表
 */
export const getAnchorList = () => fetchRun<Data[]>({
  url: '/scout/shower_list',
  defaultValue: {},
  method: 'post',
  handler: res => res.list,
})

/**
 * 主播签约申请列表
 */
export const getAnchorApplyList = () => fetchRun<Data[]>({
  url: '/scout/shower_apply_list',
  defaultValue: [],
  method: 'post',
  handler: res => res.list,
})

/**
 * 数据总览
 */
export const getDataOverview = () => fetchRun<Data[]>({
  url: '/scout/orders_data_all',
  defaultValue: [],
  method: 'post',
})

/**
 * 收益详情
 */
export const getIncomeDetail = () => fetchRun<Data[]>({
  url: '/scout/beneficial_data',
  defaultValue: {},
  method: 'post',
})

/**
 * 家族中心
 */
export const getTalentCenter = () => fetchRun<Data[]>({
  url: '/scout/scout_center',
  defaultValue: {
    info: {},
    list: [],
  },
  method: 'post',
})

/**
 * 调整分成比
 */
export const adjustRatio = () => fetchRun({
  url: '/scout/shower_edit_profit_ratio',
  defaultValue: {},
  method: 'post',
})

/**
 * 移除主播
 */
export const removeAnchor = () => fetchRun({
  url: '/scout/shower_remove',
  defaultValue: {},
  method: 'post',
})

/**
 * 强制下播
 */
export const forceOffline = () => fetchRun({
  url: '/scout/shower_off',
  defaultValue: {},
  method: 'post',
})

/**
 * 主播转出
 */
export const anchorTransfer = () => fetchRun({
  url: '/scout/shower_transfer_apply',
  defaultValue: {},
  method: 'post',
})

/**
 * 分成比调整区间
 */
export const getRatioRange = () => fetchRun({
  url: '/scout/shower_profit_ratio_options',
  defaultValue: {},
  method: 'post',
})

/**
 * 主播详情
 */
export const getAnchorDetail = () => fetchRun({
  url: '/scout/shower_info',
  defaultValue: {},
  method: 'post',
})

/**
 * 撤销申请
 */
export const cancelApply = () => fetchRun({
  url: '/scout/apply_revoke',
  defaultValue: {},
  method: 'post',
})

/**
 * 修改家族名称
 */
export const changeFamilyName = () => fetchRun({
  url: '/scout/scout_name_edit',
  defaultValue: {},
  method: 'post',
})

/**
 * 获取家族详情
 */
export const getDetail = () => fetchRun({
  url: '/scout/apply_detail',
  defaultValue: {},
  showMsg: false,
  method: 'post',
})
