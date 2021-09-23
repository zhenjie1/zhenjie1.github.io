import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
	state() {
		return {
			count: 0,
			name: 'jack',
		}
	},
	actions: {
		increment() {
			this.count++
		},
	},
})

// useStore
