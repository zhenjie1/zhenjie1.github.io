export {}

declare global {
	namespace Group {
		interface data {
			uin: number
			isGroup: true
			chatRoomOwner: string // 群主的 wxId
			chatRoomQrCode?: string // 群二维码
			chatroomAnnouncement: string // 群公告
			chatroomNotify: 0 | 1 // 是否开启免打扰
			op: 0 | 1 // 是否置顶
			createTime: string // 加入群聊时间
			headImgUrl: string // 群头像
			nickName: string // 群昵称
			wxId: string // 群唯一标识
			[key: string]: any
		}

		// vuex 数据
		type state = {
			badge: {
				[key: string]: Message.badge
			}
		}

		// 一个群成员的数据
		type member = {
			id: string
			wxId: string // 成员唯一标识
			nickName: string // 昵称
			headImgUrl: string // 头像
		}
	}
}
