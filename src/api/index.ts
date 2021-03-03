import APIFetch from 'utils/fetch'
import { stringify } from 'qs'

export const testApi = () =>
	APIFetch({
		url:
			'http://localhost:3000?qqq=32222&' +
			stringify({
				q: '123',
				b: '456',
			}),
		method: 'get',
	})
