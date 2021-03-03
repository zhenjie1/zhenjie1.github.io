import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import loginRouter from './login'
import settingRouter from './setting'
import siteRouter from './site'
import taskRouter from './task'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('page/home/home.vue'),
		meta: { title: '首页' },
	},
	{
		path: '/chat',
		component: () => import('page/chat/chat.vue'),
		meta: { title: '聊天' },
	},
	{
		path: '/task',
		component: () => import('page/task/task.vue'),
		meta: { title: '任务' },
		children: taskRouter,
	},
	{
		path: '/site',
		component: () => import('page/site/site.vue'),
		children: siteRouter,
		meta: { title: '运营' },
	},
	{
		path: '/setting',
		component: () => import('page/setting/setting.vue'),
		meta: { fullScreen: true, title: '设置' },
		redirect: '/setting/notify',
		children: settingRouter,
	},
	...loginRouter,
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router

router.beforeEach((to, from, next) => {
	document.title = to.meta.title
	next()
})
