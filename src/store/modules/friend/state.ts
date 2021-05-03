export type State = {
	checkedFriend: FriendItem | undefined
	badge: {
		// uin + wxId
		[key: string]: Message.badge
	}
	friends: {
		[key: string]:
			| {
					[key: string]: Friend.data | undefined
			  }
			| undefined
	}
}

const friendState: State = {
	checkedFriend: undefined,
	// 锚点数据 (消息个数, 消息内容, 消息类型, 消息时间)
	badge: {},
	/**
	 * 所有的微信好友数据
	 * 存储方式:
	 * {
	 * 		['微信号唯一标识']: {
	 * 			['好友唯一标识']: Friend.data
	 * 		}
	 * }
	 */
	friends: {},
}

export default friendState
