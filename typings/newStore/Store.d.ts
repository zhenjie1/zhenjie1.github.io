import {
	CommitOptions,
	DispatchOptions,
	Store as VuexStore,
	useStore as baseUseStore,
} from 'vuex'
import { PayloadAndOptionsTuple } from './utils'
import {
	Modules,
	RootState,
	RootGetters,
	RootMutations,
	RootActions,
} from 'typings/store/index'

export type Store<T extends Modules> = Omit<
	VuexStore<RootState<T>>,
	'getters' | 'commit' | 'dispatch'
> & {
	commit<
		K extends keyof RootMutations<T>,
		P extends Parameters<RootMutations<T>[K]>[1]
	>(
		key: K,
		...params: PayloadAndOptionsTuple<P, CommitOptions>
	): ReturnType<RootMutations<T>[K]>
	dispatch<
		K extends keyof RootActions<T>,
		P extends Parameters<RootActions<T>[K]>[1]
	>(
		key: K,
		...params: PayloadAndOptionsTuple<P, DispatchOptions>
	): ReturnType<RootActions<T>[K]>
	getters: {
		[K in keyof RootGetters<T>]: ReturnType<RootGetters<T>[K]>
	}
}
