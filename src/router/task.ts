import { RouteRecordRaw } from 'vue-router'

const taskRouter: RouteRecordRaw[] = [
	{
		path: 'pageFriendList',
		component: () => import('page/task/pageFriendList/pageFriendList.vue'),
		meta: { title: '好友列表' },
	},
	{
		path: 'friendTask',
		component: () => import('page/task/friendTask/friendTask.vue'),
		meta: { title: '好友任务' },
	},
	{
		path: 'fansOutbreak',
		component: () => import('page/task/fansOutbreak/fansOutbreak.vue'),
		meta: { title: '爆粉配置' },
	},
	{
		path: 'fansTotal',
		component: () => import('page/task/fansTotal/fansTotal.vue'),
		meta: { title: '接粉统计' },
	},

	{
		path: 'pageGroupList',
		component: () => import('page/task/pageGroupList/pageGroupList.vue'),
		meta: { title: '群聊列表' },
	},
	{
		path: 'groupTask',
		component: () => import('page/task/groupTask/groupTask.vue'),
		meta: { title: '群聊任务' },
	},
	{
		path: 'groupScenario',
		component: () => import('page/task/groupScenario/groupScenario.vue'),
		meta: { title: '群聊剧本' },
	},
]

export default taskRouter
