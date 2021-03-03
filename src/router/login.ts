import { RouteRecordRaw } from 'vue-router'

const loginRouter: RouteRecordRaw[] = [
	{
		path: '/login',
		component: () => import('page/login/login.vue'),
		meta: { fullScreen: true },
	},
]

export default loginRouter
