// 事件
export default class SocketEvent {
	// 存储器
	socketPools = new Map<string | number, Function[]>()

	// 添加一个
	add(key: string | number, cb: Function) {
		const target = this.socketPools.get(key)

		if (target) {
			if (!target.includes(cb)) target.push(cb)
		} else {
			this.socketPools.set(key, [cb])
		}
	}

	// 删除一个
	remove(key: string | number, cb: Function) {
		const target = this.socketPools.get(key)
		if (!target) return

		const index = target.findIndex((v) => v === cb)
		if (index === -1) return

		target.splice(index, 1)
	}

	// 循环执行
	emit(key: string | number, ...data: any[]) {
		const target = this.socketPools.get(key)
		if (!target) return

		target.map((cb) => {
			if (typeof cb !== 'function') return

			cb(...data)
		})
	}
}
