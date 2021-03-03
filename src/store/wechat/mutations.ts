declare type WechatMutations<S = Wechat.state> = {
	saveCheckedWechat(state: S, payload: Wechat.data): void
}

const wechatMutations: WechatMutations = {
	/**
	 * 首页, 保存选中的好友
	 *
	 * @param {object} state vuex wechat/state
	 * @param {Wechat.data} wechat 微信号数据
	 * @returns {void}
	 */
	saveCheckedWechat(state, wechat) {
		state.checkedWechat = wechat
	},
}

export default wechatMutations
