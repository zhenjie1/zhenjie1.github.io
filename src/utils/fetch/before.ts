import { tokenKey } from '@/assets/js/keys'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ajaxGetNewToken } from './after'

axios.interceptors.request.use((config) => {
	const configs = config as Fetch.all

	if (configs.token) {
		const token = Cookies.get(tokenKey.access)
		if (token) return config

		return ajaxGetNewToken(config)
	}

	return config
})
