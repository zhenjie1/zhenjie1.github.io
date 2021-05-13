import { api } from '@/api'

export const friendTools = {
	// 初始化某微信号的所有好友
	initAllFriendGroup(wechat: Wechat.data) {
		const friend = api.friend.friendList(wechat)
		const group = api.group.groupList(wechat)
		this.initConver(wechat)
		console.log(friend, group)
	},
	initConver(wechat: Wechat.data) {
		api.conver.getConver(wechat)
	},
}

const p1 = new Promise((resolve) => resolve('赢了'))
const p2 = new Promise((_, reject) => reject('错了'))

Promise.allSettled([p1, p2])
	.then((res) => {
		console.log('log', res)
	})
	.catch((err) => {
		console.log('拨错了', err)
	})

export default friendTools
