import { RECORD_USERINFO } from './mutation-types'

export default {
	//记录用户信息
	userInfo(state,info){
		state.userInfo = info
	},
	saveGeographicLocation(state, info){
		state.geographicLocation = info
	},
	saveHomeUrl(state, url){
		state.homeUrl = url
	}
}
