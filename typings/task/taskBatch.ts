/**
 * 群发任务
 *
 * @param {Task.taskAllType} options 参数
 * @returns {void}
 */
export default function friendGroupBatch(options: Task.taskAllType): void {
	console.log('执行群发任务')

	// 是不是群发任务
	if (!['friendBatch', 'groupBatch'].includes(options.type)) return
}
