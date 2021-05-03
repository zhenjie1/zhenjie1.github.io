export type FriendMutations<S = Friend.state> = {
	saveCheckedFriend(state: S, payload: Friend.data): void
}

const friendMutations: FriendMutations = {
	/**
	 * 首页, 保存选中的好友
	 *
	 * @param state
	 * @param friend
	 * @param state
	 * @param friend
	 */
	saveCheckedFriend(state, friend) {
		state.checkedFriend = friend
	},
}

export default friendMutations
