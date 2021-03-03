import MyEvents from 'utils/Events'
import { ComponentOptions, defineComponent } from 'vue'

const MyEvent = new MyEvents()

/**
 * 全局的 socket 混入
 *
 * @returns {DefineComponent} 返回
 */
export default function globalSocketMixin(): ComponentOptions {
	return defineComponent({
		beforeCreate() {
			const sockets: Record<string, ISocket.options | Function> = this.$options
				.sockets

			if (typeof sockets !== 'object') return

			for (const name in sockets) {
				const options: ISocket.options = {
					immediate: false,
					handler: () => ({}),
				}

				const value: Function | ISocket.options = sockets[name]

				if (typeof value === 'function') {
					options.handler = value
				} else {
					options.immediate = value.immediate
					options.handler = value.handler
				}

				options.component = this

				MyEvent.on('key', options)
			}
		},
	})
}
