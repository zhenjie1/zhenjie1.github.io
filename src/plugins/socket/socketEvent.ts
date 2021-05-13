import { isObject, strToJson, strToJsonDeep } from '@/utils'
import SocketListener from './socket'
import { ElMessage } from 'element-plus'

/**
 * 初始化 socket 的事件
 *
 * @param {Sockets} socketListener Sockets 类
 * @returns {void} 无返回值
 */
export default function initSocketEvent(socketListener: SocketListener) {
	const socket: WebSocket = socketListener.sockets!

	socket.onmessage = function socketMessage(event) {
		let data = strToJsonDeep(strToJson(event.data))

		// 将 data 处理为 data.data, 减少嵌套
		if (Object.keys(data).length > 1 && isObject(data.data)) {
			for (const i in data) if (i !== 'data') data.data[i] = data[i]
		}
		data = isObject(data) && isObject(data.data) ? data.data : data

		// 是不是心跳
		const isHeartbeat = data.code === 1

		if (data.code !== 100000 && !isHeartbeat) {
			if (data.msg) {
				ElMessage.error(data.msg)
			}
			socketListener.event.emit('codeError', data)

			// 检查是否是存在 tag (全局刷新事件)
			data.tag && socketListener.event.emit(data.tag, data.data, data)
		}

		const name = data?.data?.msgType || 'emptyName'
		socketListener.event.emit(name, data)
	}

	socket.onopen = function open() {
		console.log('连接成功')

		socketListener.sendPools.map((val) => {
			socketListener.send(val.name, val.data)
		})
	}

	/**
	 * 每次 close、error 后立即开始重连
	 * 而由于重连会检查是否满足连接的条件,以此来防止死循环
	 */
	socket.onclose = function close(e) {
		console.error('连接已断开', e.code, e)

		socketListener.reconnect()
	}

	/**
	 * 每次 close、error 后立即开始重连
	 * 而由于重连会检查是否满足连接的条件,以此来防止死循环
	 */
	socket.onerror = function error() {
		console.error('报错了')
		socketListener.reconnect()
	}
}
