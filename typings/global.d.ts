import SocketListener from '@/plugins/socket/socket'
import { UseStore } from '@/store/type'

export {}
declare global {
	interface Window {
		JSEncrypt: any
		pako: any
		store: UseStore

		socketObj: SocketListener
	}
}
