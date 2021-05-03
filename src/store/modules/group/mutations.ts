import { MutationTree } from 'vuex'
import { State } from './state'

export type Mutations<S = State> = {
	testMutations(state: S, payload: string): void
}

const groupMutations: MutationTree<State> & Mutations = {
	testMutations(state, value: string): void {
		console.log('modContact', value)
	},
}

export default groupMutations
