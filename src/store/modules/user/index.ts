import friendState from './state'
import * as actions from './actions'
import mutations from './mutations'

const friendStore = {
	namespaced: true,
	state: friendState,
	actions,
	mutations,
}
export default friendStore
