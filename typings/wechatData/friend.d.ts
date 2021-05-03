export {}

declare global {
	namespace Friend {
		type commit = {
			alias: string // 用户设置的微信号
			city: string // 城市
			headImgUrl: string // 头像地址
			nickName: string // 昵称
			pyInitial: string // 拼音
			pyQuanPin: string // 拼音全拼
			sex: 0 | 1 // 性别
			signature: string // 个性签名
			wxId: string // 微信id(唯一标识)
		}

		type data = commit & {
			uin: number
			isFriend: true
			createTime: string // 成为好友时间
			op: 0 | 1 // 是否置顶
			remarkName: string // 备注名
			remarkPyInitial: string // 备注名拼音
			remarkPyQuanPin: string // 备注名全拼

			[key: string]: any
		}

		type state = {
			checkedFriend: FriendItem | undefined
			badge: {
				// uin + wxId
				[key: string]: Message.badge
			}
			friends: {
				[key: string]:
					| {
							[key: string]: data | undefined
					  }
					| undefined
			}
		}
	}
}
