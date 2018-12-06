import { sendJsonp } from '../../config/mUtils'
import { ak, service_id } from '../../config/url'
import Vue from 'vue'
import globalVal from './globalVar'
import store from '../../store/index'

export default function (res) {
	// console.log(globalVal.BMap)
	if (!Array.isArray(res)) return;
	if (store.state.userInfo.userType != '3') return; //判断是不是客户

	// setInterval(() => {

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
	// }, 5000)
}


window.getRescusTrack = function (res) {
	if (res.status !== 0) return Vue.$vux.toast.show(res.message)
	var polylineArr = []

	//请求成功，开始绘制救援人员走过的路线
	globalVal.clientSearchPoint = res.points
	globalVal.clientSearchPoint.map( v =>{
		var pointObj = new globalVal.BMap.Point( v.longitude, v.latitude )
		polylineArr.push(pointObj)
	})
	var polyline = new globalVal.BMap.Polyline( polylineArr, {strokeColor:"red", strokeWeight:2, strokeOpacity:0.5});
	globalVal.map.addOverlay(polyline)

	setTimeout( () => {
		globalVal.map.removeOverlay(polyline)
	},2000)

	console.log(globalVal.clientSearchPoint)

}
