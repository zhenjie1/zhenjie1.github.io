import * as taskRun from './allTask'
import taskState from './core'

interface ITaskData {
	[key: string]: Function | undefined
}

const taskRunObj: ITaskData = taskRun

/**
 * 扫描所有可执行的任务并开始执行(相当于重启任务)
 *
 * @returns {void}
 */
export function taskExamineStart(): void {
	console.log('\n')

	let taskArr: Task.taskAllType[] = []
	for (const set of taskState.values()) {
		for (const data of set) {
			taskArr.push(data)
		}
	}

	// 将可执行的任务过滤出来
	taskArr = taskArr.filter((task) => task.status === 'run')

	taskArr.map((task) => {
		const funName = 'task' + task.type.charAt(0).toUpperCase() + task.type.slice(1)

		const callback = taskRunObj[funName]
		if (callback) callback(task)
	})
}
