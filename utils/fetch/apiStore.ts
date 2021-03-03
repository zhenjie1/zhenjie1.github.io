import { Fetch } from 'typings/fetchType'

/**
 * @description
 * 用来存储请求过的接口结果
 * key: url+data 拼接
 * value: 接口返回结果
 */
export const apiStore = new Map([])

/**
 *
 * @param params
 */
export default function getApiCache(params: any) {}
