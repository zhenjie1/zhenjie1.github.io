export namespace Fetch {
	interface config {
		method?: 'get' | 'post'
		store?: boolean // 是否先响应上一次的结果
		dataPath?: string // 接口返回后的取值路径
		headers?: {
			[key: string]: string
		}
		file?: boolean // 是否上传文件
		isCode?: boolean // 当 code 异常时是否在控制台抛出错误, 默认 true
		codeErrorMessage?: boolean // code 异常时是否显示警告弹框
	}

	type all = RequestInit & config & { url: string; body?: FormData | object }
}
