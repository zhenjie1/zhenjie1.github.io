import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import loginRouter from './login'
import settingRouter from './setting'
import siteRouter from './site'
import taskRouter from './task'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('page/home/home.vue'),
		meta: { title: '首页', authority: true },
	},
	{
		path: '/chat',
		component: () => import('page/chat/chat.vue'),
		meta: { title: '聊天', authority: 'customerChat' },
	},
	{
		path: '/task',
		component: () => import('page/task/task.vue'),
		redirect: '/task/pageFriendList',
		meta: { title: '任务', authority: true },
		children: taskRouter,
	},
	{
		path: '/site',
		component: () => import('page/site/site.vue'),
		children: siteRouter,
		redirect: '/site/pageWechatList',
		meta: { title: '运营', authority: true },
	},
	{
		path: '/setting',
		component: () => import('page/setting/setting.vue'),
		meta: { fullScreen: true, title: '设置', authority: true },
		redirect: '/setting/notify',
		children: settingRouter,
	},
	...loginRouter,
]

const router = createRouter({
	history: createWebHashHistory('/folder/'),
	routes,
})

export default router

router.beforeEach((to, from, next) => {
	document.title = (to.meta.title as string) || '项目名称'

	if (to.path === '/') {
		next('/chat')
		return
	}

	next()
})
