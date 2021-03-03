import axios from 'axios'

axios.interceptors.response.use(
	(config) => config,
	(err) => {
		console.warn(err.response)
	}
)
