import { sendJsonp } from '../../config/mUtils'
import { ak, service_id } from '../../config/url'
import globalVal from './globalVar'
import store from '../../store/index'

var allTimeArr = []
export default function (res) {
	if (!Array.isArray(res)) return;
	if (store.state.userInfo.userType != '3') return; //判断是不是客户

	res.map(val => {
		if (val.stateId == '2') { //如果有订单的状态为 2，说明是救援人员已接单

			let entity_name = val.id,
				start_time = parseInt(new Date(val.acceptDate.toString().replace(/-/g, '/')).getTime() / 1000),
				end_time = parseInt(start_time + 60 * 60 * 24),
				currentTime = parseInt(new Date().getTime() / 1000),
				searchNumber = 7;	//默认最多查询7天的数据


			allTimeArr = [start_time, end_time];
			let [endTime, searchNum] = [end_time, 0]
			while (searchNum + 1 < searchNumber && endTime < currentTime) {	//如果结束时间小于当前时间，说明还没有查到底
				searchNum++
				endTime = endTime + 60 * 60 * 24
				allTimeArr.push(endTime)
			}
			// console.log(allTimeArr)

			for (let i = 1; i < allTimeArr.length; i++) {
				var data = {
					ak,
					service_id,
					entity_name,
					start_time: allTimeArr[i - 1],
					end_time: allTimeArr[i],
					is_processed: 1,
					page_size: 500
				}
				sendJsonp('http://yingyan.baidu.com/api/v3/track/gettrack', data, 'getRescusTrack')
			}
		}
	})
}

function executionOrder() {
	var num = 0;
	var allData = []	//保存查询到的所有数据
	return function (res) {
		num++;
		if (num >= allTimeArr.length - 1) {	//保证查询完只执行一次
			getRescusTrackFn(allData, res)
			allData = []
			num = 0;
		}
		allData.push(...res.points)
	}
}

var polyline = {};
function getRescusTrackFn(data) {
	// console.info(data)
	globalVal.map.removeOverlay(polyline)	//先清除上次画的路线
	if (data && data.length == 0) return;	//空数组，救援人员还未开始上传位置

	var polylineArr = []	//用来存储百度返回的数据

	//请求成功，开始绘制救援人员走过的路线
	globalVal.clientSearchPoint = data
	globalVal.clientSearchPoint.map(v => polylineArr.push(new globalVal.BMap.Point(v.longitude, v.latitude)))

	// globalVal.map.panTo(new globalVal.BMap.Point(polylineArr[0].lng, polylineArr[0].lat))

	polyline = new globalVal.BMap.Polyline(polylineArr, { strokeColor: "red", strokeWeight: 2, strokeOpacity: 0.6  });
	globalVal.map.addOverlay(polyline)
}

window.getRescusTrack = executionOrder()
