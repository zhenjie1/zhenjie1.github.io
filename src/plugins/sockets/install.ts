import { App } from 'vue'
import globalSocketMixin from './MixinSocket'
import MyEvents from 'utils/Events'

interface IGlobalSocket {
	[key: string]: {
		[key: string]: Function
	}
}

interface ISocketOptions {
	globalSocket?: IGlobalSocket
}

export default class Socket {
	globalSocket?: IGlobalSocket
	emitter: MyEvents

	constructor(options: ISocketOptions = {}) {
		this.emitter = new MyEvents()

		if (options.globalSocket) {
			this.globalSocket = options.globalSocket
			this.globalAdd(options.globalSocket)
		}
	}

	install(app: App<any>): void {
		app.mixin(globalSocketMixin())

		app.config.globalProperties.$sockets = this
	}

	/**
	 * 全局监听的 socket 事件
	 *
	 * @param {IGlobalSocket} socketsConfig .ts 文件中导出的事件监听
	 * @returns {void}
	 */
	globalAdd(socketsConfig: IGlobalSocket): void {
		if (typeof socketsConfig !== 'object') return

		for (const filename in socketsConfig) {
			const content = socketsConfig[filename]

			if (!content) continue

			for (const socketName in content) {
				const cb = content[socketName]
				if (typeof cb !== 'function') continue

				this.emitter.on(socketName, {
					immediate: false,
					handler: cb,
					component: undefined,
				})
			}
		}
	}
}
