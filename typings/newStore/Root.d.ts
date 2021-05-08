import { UnionToIntersection, $ElementType } from 'utility-types'
import { ModuleTree, Module } from 'vuex'
import { ValueOf, FlatIntersection } from './utils'

export type Modules = ModuleTree<{}>

type PrefiexedModules<T extends Modules> = {
	[Key in keyof T]: Key extends string ? PrefixEach<Key, T[Key]> : never
}

type PrefixEach<K extends string, T extends Module<{}, {}>> = {
	[Key in keyof T]: Prefix<K, T[Key]>
}

type Prefix<K extends string, T> = {
	[Key in keyof T as `${K}/${Key extends string ? Key : never}`]: T[Key]
}

type RootGetValue<T extends Modules, K extends ModuleKeys> = FlatIntersection<
	UnionToIntersection<ValueOf<PrefiexedModules<T>>[K]>
>

export type RootState<T extends Modules> = { [K in keyof T]: T[K]['state'] }
export type RootState1<T extends Modules> = RootGetValue<T, 'state'>
export type RootMutations<T extends Modules> = RootGetValue<T, 'mutations'>
export type RootActions<T extends Modules> = RootGetValue<T, 'actions'>
export type RootGetters<T extends Modules> = RootGetValue<T, 'getters'>
export type RootGettersReturn<T extends Modules, G = RootGetters<T>> = {
	[K in keyof G]: ReturnType<G[K]>
}

export type ModuleKeys = Exclude<keyof Omit<$ElementType<Modules, string>, ''>, ''>

type AA = RootState<Props>
type AA1 = RootState1<Props>
type BB = RootMutations<Props>
type CC = RootActions<Props>
type DD = RootGetters<Props>
type EE = RootGettersReturn<Props>

export type Props = {
	friend: {
		state: {
			a: string
			b: number
		}
		actions: {
			getFriendBook(context: any, string: string): Promise<void>
		}
		mutations: {
			friendMutat(state: any, val: string): string
		}
		getters: {
			getFriend(): string
		}
	}
	group: {
		state: {
			aa: () => any
			bb: undefined
		}
		actions: {
			getGroupBook(context: any, string: string): Promise<void>
		}
		// mutations: {
		// 	groupMutat(state: any, val: Function): string
		// }
		getters: {
			getGroup(): void
		}
	}
}
// function aa() {}
