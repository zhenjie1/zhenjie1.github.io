/**
 * 任务类型
 */
type taskType =
	| 'friendBatch'
	| 'groupBatch'
	| 'zombieClear'
	| 'addFan'
	| 'pullGroup'
	| 'autoSendGroup'
	| 'scanCode'
	| 'friendCirle'
	| 'commentStar'
/**
 * 任务 - 所有的任务都存在这里
 */
const taskState = new Map<taskType, Set<Task.taskAllType>>()
export default taskState

// 任务类型对应的意思
export enum taskTypeKey {
	friendBatch = '好友群发',
	groupBatch = '群聊群发',
	zombieClear = '僵尸粉',
	addFan = '加粉',
	pullGroup = '拉群',
	autoSendGroup = '炒群',
	scanCode = '扫码进群',
	friendCirle = '群发朋友圈',
	commentStar = '评论点赞',
}

// 任务执行状态对应的意思
export enum taskStatusKey {
	run = '执行中',
	pause = '已暂停',
	cancel = '已取消',
	restart = '正在重启',
}

/**
 * 将一个任务添加的队列中`
 *
 * @param {taskType} type 任务类型
 * @param {Task.taskAllType} data 相关数据
 * @returns {void}
 */
export function addTaskQueue(type: taskType, data: Task.taskAllType): void {
	let state = taskState.get(type)
	if (!state) taskState.set(type, (state = new Set()))

	state.add(data)

	console.log(
		`添加 ${taskTypeKey[type]} 任务`,
		`状态: ${taskStatusKey[data.status]}`
	)
}

addTaskQueue('friendBatch', {
	type: 'friendBatch',
	taskName: 'name',
	data: {
		wechats: [123, 456],
		sendContent: [
			{ type: 'text', value: '你好!' },
			{ type: 'audio', value: 'http://dizhi.com' },
		],
		interval: [2, 5],
	},
	status: 'run',
	runTime: 123321321,
})

console.log(taskState)
