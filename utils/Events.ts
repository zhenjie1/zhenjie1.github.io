
type IType = ISocket.options // | IndexDB.options

export default class MyEvents {
	state: Map<string, IType[]>

	constructor() {
		this.state = new Map()
	}

	// 添加一个监听
	on(name: string, params: IType): void {

		let state = this.state.get(name)
		if (!state) {
			this.state.set(name, (state = []))
		}

		state.push(params)
	}

	// 执行监听
	emit (name: string, args: object): void {
		const store = this.state.get(name)

		if (!store) return

		store.map((item) => {
			item.handler.call(item.component, args)
		})
	}
}
// module.exports = Event
