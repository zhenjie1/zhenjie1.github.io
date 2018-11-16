import axios from 'axios'
import qs from 'qs'
import { URL } from './url'

axios.defaults.withCredentials = true
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

export default async function (url = '', data = {}, type = 'POST', urlAll = null, config = {}) {

	url = URL + url;

	if (urlAll === null) data = qs.stringify(data);
	type = type.toUpperCase()

	var ajax = type == 'POST' ? axios.post(url, data, config) : axios.get(url, data, config);

	ajax = ajax.then(res => res.data)
		.then(res => {

			return res
			if (res.code == 102) {
				alert('请先登录！')
				window.location.href = '/mobile/#/user/login'
			} else if (res.code != 2 && res.code != 101) {
				console.log('\n')
				console.log('接口错误详情')
				console.log(res)
				console.log('\n')
				alert(res.msg)
				return res
			}else if(res.code == 101){
				alert(res.msg)
				return res
			} else {
				return res
			}

		})
		.catch(e => {
			console.log('报错了，快去看看代码吧！ -- ', e)
			//			window.location.href = '/#/user/login'
		});
	return ajax
}
