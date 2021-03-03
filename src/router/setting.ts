import { RouteRecordRaw } from 'vue-router'

const settingRouter: RouteRecordRaw[] = [
	{
		path: 'notify',
		component: () => import('page/setting/notify/notify.vue'),
		meta: { title: '设置-通知' },
	},
	{
		path: 'general',
		component: () => import('page/setting/general/general.vue'),
		meta: { title: '设置-通用' },
	},
	{
		path: 'key',
		component: () => import('page/setting/key/key.vue'),
		meta: { title: '设置-快捷键' },
	},
]

export default settingRouter
