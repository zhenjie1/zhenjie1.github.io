import { AxiosRequestConfig } from 'axios'

declare global {
	namespace Fetch {
		export interface config {
			store?: boolean // 是否先响应上一次的结果
			dataPath?: string // 接口返回后的取值路径
			file?: boolean // 是否上传文件
			isCode?: boolean // 当 code 异常时是否在控制台抛出错误, 默认 true
			codeErrorMessage?: boolean // code 异常时是否显示警告弹框
		}

		export type all = AxiosRequestConfig & config
	}
}
