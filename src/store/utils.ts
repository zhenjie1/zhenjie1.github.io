import {
	ActionTree,
	Action,
	ActionObject,
	ActionContext,
	CommitOptions,
	DispatchOptions,
	GetterTree,
	MutationTree,
} from 'vuex'
import * as friend from './modules/friend'
import * as group from './modules/group'

type Modules = {
	friend: [friend.State, friend.Getters, friend.Actions, friend.Mutations]
	group: [group.State, group.Getters, group.Actions, group.Mutations]
}

type PrefiexedModules = {
	[K in keyof Modules]: PrefixEach<K, Modules[K]>
}

export type PrefixEach<P extends string, T> = {
	[Key in keyof T]: Prefix<P, T[Key]>
}

export type Prefix<Name extends string, T> = {
	[Key in keyof T as `${Name}/${Key extends string ? Key : never}`]: T[Key]
}

// 全局
export type RootState = { [K in keyof Modules]: Modules[K][0] }
export type RootGetters = FlatIntersection<
	UnionToIntersection<ValueOf<PrefiexedModules>[1]>
>
export type RootActions = FlatIntersection<
	UnionToIntersection<ValueOf<PrefiexedModules>[2]>
>
export type RootMutations = FlatIntersection<
	UnionToIntersection<ValueOf<PrefiexedModules>[3]>
>
export type RootGettersParams = {
	[K in keyof RootGetters]: ReturnType<RootGetters[K]>
}

// 辅助函数
export type ValueOf<T> = T[keyof T]
export type UnionToIntersection<U> = (
	U extends any ? (k: U) => void : never
) extends (k: infer I) => void
	? I
	: never
export type FlatIntersection<T> = { [Key in keyof T]: T[Key] } extends infer O
	? O
	: never
export type PayloadAndOptionsTuple<
	Payload,
	Options extends CommitOptions | DispatchOptions
> = Payload extends undefined ? [undefined?, Options?] : [Payload, Options?]

type ExtractActionHandler<A> = A extends Action<infer S, infer R>
	? A extends ActionObject<S, R>
		? A['handler']
		: A
	: never

export type AugmentedModuleActionContext<
	State,
	Mutations extends MutationTree<State>,
	Actions extends ActionTree<State, RootState>,
	Getters extends GetterTree<State, RootState>
> = {
	commit<
		K extends keyof RootMutations,
		P extends Parameters<RootMutations[K]>[1],
		O extends CommitOptions & { root: true }
	>(
		key: K,
		payload: P,
		options: O
	): ReturnType<RootMutations[K]>
	commit<
		K extends keyof Mutations,
		P extends Parameters<Mutations[K]>[1],
		O extends CommitOptions & { root: false }
	>(
		key: K,
		...params: PayloadAndOptionsTuple<P, O>
	): ReturnType<Mutations[K]>
	dispatch<
		K extends keyof RootActions,
		P extends Parameters<RootActions[K]>[1],
		O extends DispatchOptions & { root: true }
	>(
		key: K,
		payload: P,
		options: O
	): ReturnType<RootActions[K]>
	dispatch<
		K extends keyof Actions,
		P extends Parameters<ExtractActionHandler<Actions[K]>>[1],
		O extends DispatchOptions & { root: false }
	>(
		key: K,
		...params: PayloadAndOptionsTuple<P, O>
	): ReturnType<ExtractActionHandler<Actions[K]>>
	getters: {
		[K in keyof Getters]: ReturnType<Getters[K]>
	}
	rootGetters: {
		[K in keyof RootGetters]: ReturnType<RootGetters[K]>
	}
} & Omit<
	ActionContext<State, RootState>,
	'commit' | 'dispatch' | 'getters' | 'rootGetters'
>
