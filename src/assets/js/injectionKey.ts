import { inject, InjectionKey, Ref } from 'vue'

export function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
	const resolved = inject(key, fallback)
	if (!resolved) {
		throw new Error(`Could not resolve ${key.description}`)
	}

	return resolved
}

// 被选中的微信号
export const checkWechatKey: InjectionKey<Ref<Wechat.data | undefined>> = Symbol('checkWechat')

// 被选中的好友或群聊
export const checkFriendKey: InjectionKey<Ref<FriendItem | undefined>> = Symbol('checkFriend')
