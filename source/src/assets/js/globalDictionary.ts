// 全局字典 select 数据

export interface Options {
  label: string
  value: string
  color?: string

  [key: string]: any
}

export type DictionaryValue<T, k extends keyof T> = T[k]

export const globalDictionary = {
  /**
  * 申请状态
  */
  applyForStatus: [
    { label: '待公会审核', value: '1', color: 'gray' },
    { label: '公会驳回', value: '2', color: 'red' },
    { label: '待主播确认', value: '3', color: '' },
    { label: '待主播确认', value: '2', color: '' },
    { label: '公会驳回', value: '3', color: 'red' },
    { label: '主播同意', value: '4', color: 'main' },
    { label: '主播驳回', value: '5', color: 'red' },
    { label: '主播撤销', value: '6', color: 'gray' },
  ] as Options[],
}

/**
 * 解析字典 - label
 */
export const dictionaryLabel = (key: keyof typeof globalDictionary, value: string | number) => {
  const data = globalDictionary[key]
  const val = typeof value === 'string' ? value : value?.toString?.()

  if (!data) return ''
  // eslint-disable-next-line eqeqeq
  const target = data.find(v => v.value == val)
  if (target) return target.label
  return ''
}

/**
 * 解析字典 - Options
 */
export const dictionaryParse = (key: keyof typeof globalDictionary, value: string | number): Options => {
  const data = globalDictionary[key]
  const val = typeof value === 'string' ? value : value?.toString?.()

  const defaultValue = {} as Options
  if (!data) return defaultValue
  // eslint-disable-next-line eqeqeq
  const target = data.find(v => v.value == val)
  return target || defaultValue
}

/**
 * 解析字典 - field
 */
export const dictField = (key: keyof typeof globalDictionary, value: string | number, field: keyof Options) => {
  return dictionaryParse(key, value)[field]
}

export interface RenderStatusOption {
  labelField?: string
  valueField?: string
  colorField?: string
}
/**
 * 解析普通数组 - label
 */
export const dictionaryStatusLabel = (value: string, data: Data[], options = {} as RenderStatusOption) => {
  if (!data) return ''
  const { labelField = 'label', valueField = 'value' } = options
  // eslint-disable-next-line eqeqeq
  const target = data.find(v => v[valueField] == value)
  if (target) return target[labelField]
  return ''
}

/**
 * 解析普通数组 - Options
 */
export const dictionaryStatusParse = (value: string, data: Data[], options = {} as RenderStatusOption) => {
  const defaultValue = {} as Options
  if (!data) return defaultValue

  const { valueField = 'value' } = options
  // eslint-disable-next-line eqeqeq
  const target = data.find(v => v[valueField] == value)

  return target || defaultValue
}

/**
 * 字典的key
 */
export const getDictionaryKey = (str: string) => `${str}Key`
/**
 * 字典的 source key
 */
export const getDictionarySourceKey = (str: string) => `${str}Source`
