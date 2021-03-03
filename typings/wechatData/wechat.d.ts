declare type FriendItem = Friend.data | Group.data

declare namespace Wechat {
	type data = {
		id: string
		headImgUrl: string // 头像
		nickName: string // 昵称
		groupId: number // 所在分组的分组 ID
		status: 0 | 1 | 2 | 3 // 0: '离线', 1: '在线', 2: '异常', 3: '封号', 4: '登录中', 5: '重连中'
		uin: number // 微信号唯一标识
		wxId: string // 微信号 wxId
		[key: string]: any
	}

	type state = {
		checkedWechat: data | undefined
		badge: {
			[key: string]: number
		}
	}
}
