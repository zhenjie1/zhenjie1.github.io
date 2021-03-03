import { RouteRecordRaw } from 'vue-router'

const siteRouter: RouteRecordRaw[] = [
	{
		path: 'pageWechatList',
		component: () => import('page/site/pageWechatList/pageWechatList.vue'),
		meta: { title: '微信号列表' },
	},

	{
		path: 'wechatChangeInfo',
		component: () => import('page/site/wechatChangeInfo/wechatChangeInfo.vue'),
		meta: { title: '修改资料' },
	},
	{
		path: 'wechatGroup',
		component: () => import('page/site/wechatGroup/wechatGroup.vue'),
		meta: { title: '微信分组' },
	},

	{
		path: 'chatHistory',
		component: () => import('page/site/chatHistory/chatHistory.vue'),
		meta: { title: '聊天记录' },
	},
	{
		path: 'materialLibrary',
		component: () => import('page/site/materialLibrary/materialLibrary.vue'),
		meta: { title: '图文音视频' },
	},
	{
		path: 'keyword',
		component: () => import('page/site/keyword/keyword.vue'),
		meta: { title: '关键字模版' },
	},
	{
		path: 'hello',
		component: () => import('page/site/hello/hello.vue'),
		meta: { title: '欢迎与模版' },
	},
]

export default siteRouter
