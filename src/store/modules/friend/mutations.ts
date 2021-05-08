import { MutationTree } from 'vuex'

export type Mutations<S = Friend.state> = {
	saveCheckedFriend(state: S, payload: Friend.data): void
	testMutations(state: S, payload: string): string
}

const friendMutations: MutationTree<Friend.state> & Mutations = {
	/**
	 * 首页, 保存选中的好友
	 *
	 * @param state
	 * @param friend
	 */
	saveCheckedFriend(state, friend) {
		state.checkedFriend = friend
	},
	testMutations(state, p) {
		console.log('测试 mutations', p)
		return '123321'
	},
}

export default friendMutations
