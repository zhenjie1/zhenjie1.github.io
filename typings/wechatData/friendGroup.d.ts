/**
 * 此文件表示好友和群聊数据共有的类型
 */

export {}

declare global {
	type FriendItem = Friend.data | Group.data
}
