import { UseStore } from '@/store/type'

export {}
declare global {
	interface Window {
		JSEncrypt: any
		pako: any
		store: UseStore
	}
}
