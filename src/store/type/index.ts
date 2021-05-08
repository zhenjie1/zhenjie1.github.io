import { UnionToIntersection } from 'utility-types'
import { InjectionKey } from 'vue'
import {
	Action,
	ActionContext,
	ActionObject,
	ActionTree,
	CommitOptions,
	DispatchOptions,
	GetterTree,
	MutationTree,
	useStore as baseUseStore,
	Store as VuexStore,
	Module,
} from 'vuex'
import * as friend from '../modules/friend'
import * as group from '../modules/group'

export type Fn = Record<string, (...args: any) => any>

type Prop = {
	[key: string]: Module<{}, {}>
}

type ModulesValue = PrefiexedModules<Prop>

type PrefiexedModules<T> = {
	[K in keyof T]: PrefixEach<K, T[K]>
}

type PrefixEach<K extends string, T> = {
	[Key in keyof T]: Prefix<K, T[Key]>
}

type Prefix<Space extends string, T> = {
	[Key in keyof T as `${Space}/${Key extends string ? Key : never}`]: T[Key]
}

export type RootState = { [K in keyof Prop]: Prop[K]['state'] }
export type RootGetters = FlatIntersection<
	UnionToIntersection<ValueOf<ModulesValue>['getters']>
>
export type RootGettersParams = {
	[K in keyof RootGetters]: ReturnType<RootGetters[K]>
}
export type RootActions = FlatIntersection<
	UnionToIntersection<ValueOf<ModulesValue>['actions']>
>
export type RootMutations = FlatIntersection<
	UnionToIntersection<ValueOf<ModulesValue>['mutations']>
>

export type ValueOf<T> = T[keyof T]
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

type GetPropValue<
	Space extends keyof Prop,
	V extends 'state' | 'getters' | 'actions' | 'mutations'
> = Prop[Space][V]

type A1 = ActionsParams<'friend'>

export type ActionsParams<
	Space extends keyof Prop,
	State = GetPropValue<Space, 'state'>,
	Mutations extends Fn = GetPropValue<Space, 'mutations'>,
	Actions extends Fn = GetPropValue<Space, 'actions'>,
	Getters extends { [key: string]: any } = GetPropValue<Space, 'getters'>
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
export type Store = Omit<VuexStore<RootState>, 'getters' | 'commit' | 'dispatch'> & {
	commit<K extends keyof RootMutations, P extends Parameters<RootMutations[K]>[1]>(
		key: K,
		...params: PayloadAndOptionsTuple<P, CommitOptions>
	): ReturnType<RootMutations[K]>
	dispatch<K extends keyof RootActions, P extends Parameters<RootActions[K]>[1]>(
		key: K,
		...params: PayloadAndOptionsTuple<P, DispatchOptions>
	): ReturnType<RootActions[K]>
	getters: RootGettersParams
}

export const key: InjectionKey<Store> = Symbol('store')
export function useStore(): Store {
	return baseUseStore()
}
