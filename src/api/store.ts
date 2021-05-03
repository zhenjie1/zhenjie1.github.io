// 将接口返回的数据统统放到这里
// 想此处的数据更新, 页面数据跟着变化

import { reactive } from 'vue'

type ApiData = {
	login: {
		login: {
			accessToken?: string
			refreshToken?: string
			permissionList?: string
			userInfo?: User.state
		}
		codeImg: {
			codeKey: string
			img: string
		}
	}
	chat: {
		wxList: any[]
	}
}

const loginPage = {
	login: {},
	codeImg: {
		codeKey: '',
		img: '',
	},
}

const chatPage = {
	wxList: [],
}

const apiData: ApiData = reactive({
	login: loginPage,
	chat: chatPage,
})

export default apiData
