import { RouteRecordRaw } from 'vue-router'

const settingRouter: RouteRecordRaw[] = [
	{
		path: 'notify',
		component: () => import('page/setting/notify/notify.vue'),
		meta: { title: '设置-通知', authority: true },
	},
	{
		path: 'general',
		component: () => import('page/setting/general/general.vue'),
		meta: { title: '设置-通用', authority: true },
	},
	{
		path: 'key',
		component: () => import('page/setting/key/key.vue'),
		meta: { title: '设置-快捷键', authority: true },
	},
]

export default settingRouter
