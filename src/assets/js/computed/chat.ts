import { computed } from 'vue'

// 微信在线状态
export const status = computed(() => (status: Wechat.status) => {
	// 转为 string 类型
	if (typeof status === 'number') status = (status.toString() as any) as Wechat.status

	const data = {
		0: ['离线', 'gray'],
		1: ['在线', 'main'],
		2: ['异常', 'yellow'],
		3: ['封号', 'red'],
		4: ['登录中', 'gray'],
		5: ['重连中', 'gray'],
	}

	return data[status]
})
