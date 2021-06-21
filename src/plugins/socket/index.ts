import { onUnmounted } from 'vue'
import SocketListener from './socket'

export const sockets = new SocketListener()
sockets.startConnect()
window.socketObj = sockets

export function useSocket() {
	// receive 添加的事件监听在此存储一份, 方便 onUnmounted 时删除事件监听
	const receivePools: [string | number, Function][] = []

	// 页面卸载时清除添加的事件监听
	onUnmounted(() => {
		receivePools.map((v) => {
			sockets.event.remove(v[0], v[1])
		})
	})

	return {
		ready: sockets.ready,
		reconnectCount: sockets.reconnectCount,
		send: (name: SocketNameKeys, data: any) => sockets.send(name, data),
		receive(key: SocketNameKeys | TagKeys, cb: SocketNameData) {
			sockets.event.add(key, cb)
			receivePools.push([key, cb])
		},
	}
}

// 公共参数
type socketParamPublic<T = any> = {
	code: number
	data: T
}

// 定义 tag keys (全剧刷新的 tag)
type TagKeys = 311

// 定义 socket 接收的  key, value
type SocketContext = {
	login(data: socketParamPublic): void
}

export type SocketNameKeys = keyof SocketContext
export type SocketNameData = SocketContext[SocketNameKeys]
