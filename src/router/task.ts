import { RouteRecordRaw } from 'vue-router'

const taskRouter: RouteRecordRaw[] = [
	{
		path: 'pageFriendList',
		component: () => import('page/task/pageFriendList/pageFriendList.vue'),
		meta: { title: '好友列表', authority: 'friendList' },
	},
	{
		path: 'friendTask',
		component: () => import('page/task/friendTask/friendTask.vue'),
		meta: { title: '好友任务', authority: 'friendTask' },
	},
	{
		path: 'fansOutbreak',
		component: () => import('page/task/fansOutbreak/fansOutbreak.vue'),
		meta: { title: '爆粉配置', authority: 'friendPowderConfig' },
	},
	{
		path: 'fansTotal',
		component: () => import('page/task/fansTotal/fansTotal.vue'),
		meta: { title: '接粉统计', authority: 'friendReceiveTotal' },
	},

	{
		path: 'pageGroupList',
		component: () => import('page/task/pageGroupList/pageGroupList.vue'),
		meta: { title: '群聊列表', authority: 'groupList' },
	},
	{
		path: 'groupTask',
		component: () => import('page/task/groupTask/groupTask.vue'),
		meta: { title: '群聊任务', authority: 'groupTask' },
	},
	{
		path: 'groupScenario',
		component: () => import('page/task/groupScenario/groupScenario.vue'),
		meta: { title: '群聊剧本', authority: 'groupStirFry' },
	},
]

export default taskRouter
