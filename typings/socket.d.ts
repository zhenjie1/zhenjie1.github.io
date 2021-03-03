// import { App } from 'vue'

declare namespace ISocket {
	type options = {
		immediate: boolean
		handler: Function
		component?: Record<string, any>
	}

	type stateOption = {
		[key: string]: options[]
	}
}
