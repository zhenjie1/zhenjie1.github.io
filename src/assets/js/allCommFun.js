import {
	findMyListOk,
	userSearchAllRescue,
	userRescueOk,
	commonSense
} from '../../config/getData.js'
import {
	getStore
} from '../../config/mUtils'

//救援人员，已完成订单，接收参数 pageNum 第几页
export const taskLoad = async function (that, pageNum) {
	var userType = getStore('userInfo')['userType']
	var ind = that.navIndex;

	var data = [];

	if (userType == 3) {
		if (ind == 1) {
			await userSearchAllRescue(pageNum).then(res => {
				data = res.rows
			})
		} else if (ind == 4) {
			await userRescueOk(pageNum).then(res => {
				data = res.rows
			})
		}
	} else if (userType == 2) {
		await findMyListOk(pageNum).then(res => {
			data = res.rows
		})
	}

	dataPush(that, data, 'infoData');
}

export const commonSenseLoad = async function (that, pageNum, pageType) {
	var data = [];
	await commonSense(pageNum, pageType).then(res => {
		data = res.rows
		that.isShowLoading = false;
	})

	dataPush(that, data, 'data')
}

function dataPush(that, data, name) {
	data.forEach(v => {
		// that.originalData.push(v)
		that[name].push(v)
	});
}


//日期转时间戳
export const getTime = function (str) {
	str = str.toString();

	return new Date(str).getTime();
}
