import APIFetch from 'utils/fetch'

// 获取图形码
export const getImageCode = () =>
	APIFetch({
		url: '/secret.graphcode.get',
		method: 'get',
		dataPath: 'data.data',
		storePath: 'login.codeImg',
	})

// 登录接口
export const startLogin = (data: any) =>
	APIFetch({
		url: '/product.user.login',
		data,
		dataPath: 'data.data',
		storePath: {
			accessToken: 'login.login.accessToken',
			refreshToken: 'login.login.refreshToken',
			permissionList: {
				path: 'login.login.permissionList',
				handler: (list: string) => list.split(','),
			},
			userInfo: 'login.login.userInfo',
		},
		isCode: false,
	})
