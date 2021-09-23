import { RouteRecordRaw } from 'vue-router'

const loginRouter: RouteRecordRaw[] = [
	{
		path: '/login',
		component: () => import('page/login/login.vue'),
		meta: {
			authority: true,
			fullScreen: true,
			title: '登陆',
		},
	},
]

export default loginRouter
