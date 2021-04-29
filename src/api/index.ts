import APIFetch from 'utils/fetch'
import { stringify } from 'qs'

export const testApi = () =>
	APIFetch({
		url: 'http://localhost:3000',
		method: 'get',
	})
