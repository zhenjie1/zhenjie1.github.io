/**
 * 判断是不是开发环境
 *
 * @returns {boolean} 返回是不是开发环境
 */
export const isDev = process.env.NODE_ENV === 'development'

// 是否是对象类型
export const isObject = (val: any): val is object =>
	val !== null && typeof val === 'object'

// 是否是 FormData 类型
export const isFormData = (val: any): val is FormData => val instanceof FormData

// 是不是不存在的值
export const isEmpty = (val: any) => [null, undefined].includes(val)
