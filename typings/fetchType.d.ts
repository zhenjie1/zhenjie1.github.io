import { AxiosRequestConfig } from 'axios'
declare global {
	namespace Fetch {
		export interface config {
			dataPath?: string // 接口返回后的取值路径
			token?: boolean // 是否验证 accessToken
			file?: boolean // 是否上传文件
			isCode?: boolean // 当 code 异常时是否在控制台抛出错误, 默认 true
			codeErrorMessage?: boolean // code 异常时是否显示警告弹框
			storePath: StorePath // 接口结果存储的路径
		}

		export type all = AxiosRequestConfig & config

		// 接口结果存储的路径
		type StorePath =
			| string
			| false
			| {
					[key: string]:
						| string
						| {
								path: string
								handler: (val: string) => any
						  }
			  }
	}
}
