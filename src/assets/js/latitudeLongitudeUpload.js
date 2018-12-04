import { sendJsonp } from '../../config/mUtils'
import { ak, service_id } from '../../config/url'
import Vue from 'vue'
import globalVal from './globalVar'

export default function (res) {
	if (!Array.isArray(res)) return;
	if (this.userInfo.userType != '3') return; //判断是不是客户

	res.map(val => {
		if (val.stateId == '2') { //如果有订单的状态为 2，说明是救援人员已接单
			let entity_name = 'da1dd45e6f384a8a971e1b37896cf963' || val.id,
				start_time = 1543554000 || parseInt(new Date(val.acceptDate.toString().replace(/-/g, '/')).getTime() / 1000),
				end_time = 1543593600 || parseInt((new Date().getTime() - 1000 * 60 * 60 * 23) / 1000)

			var data = {
				ak,
				service_id,
				entity_name,
				start_time,
				end_time,
				is_processed: 1,
				page_size: 500
			}
			sendJsonp('http://yingyan.baidu.com/api/v3/track/gettrack', data, 'getRescusTrack')
		}
	})
}


window.getRescusTrack = function (res) {
	console.log(res)
	if (res.status !== 0) return Vue.$vux.toast.show(res.message)

	globalVal.clientSearchPoint = res.points
	console.log(globalVal.clientSearchPoint)

}
