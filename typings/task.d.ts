declare namespace Task {
	type ITaskMessageType = 'text' | 'img' | 'audio' | 'video'

	// 文字类型
	type ITaskBatchSend = {
		type: ITaskMessageType
	} & ({ materialId: number } | { value: string })

	// 任务 - 群发详情
	type ITaskBatchDetail = {
		wechats: number[]
		sendContent: ITaskBatchSend[]
		interval: [number, number]
	}

	//  任务类型
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
	type taskStatus = 'run' | 'pause' | 'cancel' | 'restart'

	interface taskData<T> {
		type: taskType // 任务类型
		taskName: string // 任务名称
		data: T // 具体所需参数
		status: taskStatus // 状态
		runTime: number // 执行时间
	}

	type taskAllType = taskData<ITaskBatchDetail>
}
