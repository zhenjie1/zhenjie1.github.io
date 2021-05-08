import { PayloadAndOptionsTuple } from './utils'
import { NonUndefined } from 'utility-types'
import {
	ActionTree,
	ActionContext,
	GetterTree,
	MutationTree,
	CommitOptions,
	DispatchOptions,
	Action,
	ActionObject,
} from 'vuex'
import {
	Modules,
	ModuleKeys,
	RootState,
	RootActions,
	RootMutations,
	RootGetters,
} from './Root'

type ModuleKey = Exclude<ModuleKeys, 'modules' | 'namespaced'>

export type GetPropValue<
	T extends Modules,
	Space extends keyof T,
	K extends ModuleKey
> = T[Space][K]

type A = GetPropValue<Modules, '', 'getters'>
export type ActionsContext<
	T extends Modules,
	Space extends keyof T,
	State extends Record<string, any> = GetPropValue<T, Space, 'state'>,
	Getters extends GetterTree<State, RootState<T>> = NonUndefined<
		GetPropValue<T, Space, 'getters'>
	>,
	Actions extends ActionTree<State, RootState<T>> = NonUndefined<
		GetPropValue<T, Space, 'actions'>
	>,
	Mutations extends MutationTree<State> = NonUndefined<
		GetPropValue<T, Space, 'mutations'>
	>
> = {
	commit<
		K extends keyof RootMutations<T>,
		P extends Parameters<RootMutations<T>[K]>[1],
		O extends CommitOptions & { root: true }
	>(
		key: K,
		payload: P,
		options: O
	): ReturnType<RootMutations<T>[K]>
	commit<
		K extends keyof Mutations,
		P extends Parameters<Mutations[K]>[1],
		O extends CommitOptions & { root: false }
	>(
		key: K,
		...params: PayloadAndOptionsTuple<P, O>
	): ReturnType<Mutations[K]>
	dispatch<
		K extends keyof RootActions<T>,
		P extends Parameters<RootActions<T>[K]>[1],
		O extends DispatchOptions & { root: true }
	>(
		key: K,
		payload: P,
		options: O
	): ReturnType<RootActions<T>[K]>
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
		[K in keyof RootGetters<T>]: ReturnType<RootGetters<T>[K]>
	}
} & Omit<
	ActionContext<State, RootState<T>>,
	'commit' | 'dispatch' | 'getters' | 'rootGetters'
>

type ExtractActionHandler<A> = A extends Action<infer S, infer R>
	? A extends ActionObject<S, R>
		? A['handler']
		: A
	: never
