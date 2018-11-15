import {
	findMissedlist,
	findlistok,
	findMyListOk,
	userWaitAccept,
	userSearchAllRescue,
	userRescue,
	userRescueOk,
	findListTask//救援用户查询
} from '../../config/getData'
import {
	getStore
} from '../../config/mUtils'
var userType;

try{
	userType = parseInt(getStore('userInfo')['userType']);
}catch(e){

}
function jinzhan(infoData) {
	for(let v of infoData) {
		if(v.orderStautsList.length == 0) {
				v.orderStautsList.push({'content':'暂无进展'});
		}
	}
}
//页面初始化调用
export const initFun = (that, type) => {
	type = parseInt(type);

	switch (type) {
		case 2: //救援队长
			findMissedlist().then(res => {
				// console.log(res)
				res = res.rows
				that.infoData = res
				that.originalData = res
				jinzhan(that.infoData)
			}).then(() => {
				that.isShow();
			})
			break;
		case 3: //普通用户
			userSearchAllRescue(1).then(res => {
				that.total = res.total
				res = res.rows
				that.infoData = res
				that.originalData = res
				that.liLength = res.length
				jinzhan(that.infoData)
			})
			break;
		case 4: //救援用户
			findListTask(1).then(res => {
				// console.log(res)
				res = res.rows
				that.infoData = res
				that.originalData = res
				jinzhan(that.infoData)
			}).then(() => {
				that.isShow();
			})
			break;
	}
}


/*点击订单下面的按钮
 *
 *	that: this
 *	type: 用户类型
 *	item: 订单json
 *	ind : 按钮的index
 *	name: 按钮的内容
 *
 */
export const orderBtnFun = (that, type, item, ind, name) => {
	type = parseInt(type);

	that.clickObj = item
	that.originaId = item.id

	if (type === 2) {
		leaderBtnEv(that, item, ind, name)
	}else if(type === 3){
		if(ind == 0 && name == '救援进展') {
			that.$router.push('/rescue/task/progress')
		}
		if(ind == 0 && name.indexOf('取消') !== -1){	//点击取消订单
			//拒绝理由
			that.showCancel = true;
		}
	}else if( type === 4) {
		leaderBtnEv(that, item, ind, name)
	}

}

//点击顶部导航
export const topNavMenuFun = (that) => {
	var navIndex = that.navIndex;
	// if (userType == 2) {
	// 	leaderAjax(that, navIndex)
	// } else if (userType == 3) {
	// 	userAjax(that, navIndex)
	// }
	if(userType == 3) {
		userAjax(that, navIndex)
	}else {
		leaderAjax(that, navIndex)
	}
}


//设置按钮文字 和 上面的状态
export const setBtnTxtFun = (str, item) => {
	str = parseInt(str)

	// console.log(str)

	//队长
	if (userType == 2) {

		var statusId4Txt1 = item.typeReport === '0' ? '上传报告' : '查看报告';
		var statusId4Txt2 = item.typeReturn === '0' ? '上传回访' : '查看回访';

		var btn = [
			[{name: '拒绝接单',type: 'button'},{name: '确认接单',type: 'button'}],
			[{name: '确认出发',type: 'button'}],
			[{name: '拍摄',type: 'file'},{name: '确认到达',type: 'button'}],
			[{name: '拍摄',type: 'file'},{name: '完成',type: 'button'}],
			[{name: statusId4Txt1,type: 'button'},{	name: statusId4Txt2,type: 'button'}]
		]

		switch (str) {
			case 0:
				str = '等待接单', item.btn = btn[0];
				break;
			case 1:
				str = '等待出发', item.btn = btn[1];
				break;
			case 2:
				str = '已到达救援地点', item.btn = btn[2];
				break;
			case 3:
				str = '施救中', item.btn = btn[3];
				break;
			case 4:
				str = '完成', item.btn = btn[4];
				break;
			default:
				str = '未知状态'
		}
	} else if (userType == 3) {

		var btn = [
			[{name: '取消订单',type: 'button'} ],
			[{name: '救援进展',type: 'button'}],
			[{name: '救援进展',type: 'button'}],
			[{name: '救援进展',type: 'button'}],
			[{name: '救援进展',type: 'button'}],
		]

		switch (str) {
			case 0:
				str = '等待接单', item.btn = btn[0];
				break;
			case 1:
				str = '等待出发', item.btn = btn[1];
				break;
			case 2:
				str = '已到达救援地点', item.btn = btn[2];
				break;
			case 3:
				str = '施救中', item.btn = btn[2];
				break;
			case 4:
				str = '已完成', item.btn = btn[3];
				break;
			case 99:
				str = '已取消', item.btn = btn[4];
				break;
			default:
				str = '未知状态'
		}

	} else if (userType == 4) {
		var statusId4Txt1 = item.typeReport === '0' ? '上传报告' : '查看报告';
		var statusId4Txt2 = item.typeReturn === '0' ? '上传回访' : '查看回访';

		var btn = [
			[{name: '拒绝接单',type: 'button'},{name: '确认接单',type: 'button'}],
			[{name: '确认出发',type: 'button'}],
			[{name: '拍摄',type: 'file'},{name: '确认到达',type: 'button'}],
			[{name: '拍摄',type: 'file'},{name: '完成',type: 'button'}],
			[{name: statusId4Txt1,type: 'button'},{	name: statusId4Txt2,type: 'button'}]
		]

		switch (str) {
			case 0:
				str = '等待接单', item.btn = btn[0];
				break;
			case 1:
				str = '等待出发', item.btn = btn[1];
				break;
			case 2:
				str = '已到达救援地点', item.btn = btn[2];
				break;
			case 3:
				str = '施救中', item.btn = btn[3];
				break;
			case 4:
				str = '完成', item.btn = btn[4];
				break;
			default:
				str = '未知状态'
		}
	}

	return str

}
//获取用户数据
async function userAjax(that, navIndex) {
	switch (navIndex) {
		case 1: //全部
			userSearchAllRescue(1).then(res => {
				that.total = res.total
				res = res.rows
				that.infoData = res
				that.originalData = res
				jinzhan(that.infoData)
			})
			break;
		case 2: //等待接单
			await userWaitAccept().then(res => {
				res = res.rows
				that.infoData = res
				that.originalData = res
				jinzhan(that.infoData)
			})
			break;
		case 3: //施救中
			await userRescue().then(res => {
				res = res.rows
				that.infoData = res
				that.originalData = res
				jinzhan(that.infoData)
			})
			break;
		case 4: //已完成
			await userRescueOk(1).then(res => {
				res = res.rows;
				that.infoData = res
				that.originalData = res
				jinzhan(that.infoData)
			})
			break;
		case 5: //已取消
			await userSearchAllRescue(1,'99').then( res => {
				res = res.rows;
				that.infoData = res
				that.originalData = res
				jinzhan(that.infoData)
			})
			break;
	}
	if(that.$refs.li) {
		that.liLength = that.$refs.li.length;
	}
}

//获取队长订单数据
function leaderAjax(that, navIndex) {
	new Promise((resolve, reject) => {
		if (navIndex != 4) {

			let dataArr = [];
			if (Array.isArray(that.originalData)) {
				that.originalData.forEach((v, i) => {
					if (navIndex == 1) {
						if (v.stateId == 0 || v.stateId == 1) {
							dataArr.push(v)
						}
					} else {
						if (navIndex == v.stateId) {
							dataArr.push(v)
						}
					}
				})
				that.infoData = dataArr
				jinzhan(that.infoData)
				resolve();
			}
		} else {
			findMyListOk(1, 10).then(res => {
				res = res.rows;
				that.infoData = res;
				jinzhan(that.infoData)
				resolve();
			})
		}
	}).then(() => {
		setTimeout(function () {
			that.liLength = that.$refs.li == undefined ? 0 : that.$refs.li.length;
		}, 0)
	})

}

//队长
function leaderBtnEv(that, item, ind, name) {
	console.log(name)
	item.stateId = parseInt(item.stateId)
	switch (item.stateId) {
		case 0:
			if(ind == 1){
				that.originaId = item.id
				that.isShowPer = true;
			}else{
				that.showCancelRefuse = true
			}
			break;
		case 2:
		case 3:
			if (ind == 1) {
				that.statusSet(item)
			} //完成
			break;
		case 4:
			if(ind == 0) {
				if(name == '上传报告') {
					that.$router.push('/rescue/task/update/'+item.id+'/'+1)
				}else if(name == '查看报告') {
					that.$router.push('/rescue/report/'+item.id+'/'+1)
				}
			}else {
				if(name == '上传回访') {
					that.$router.push('/rescue/task/update/'+item.id+'/'+0)
				}else if(name == '查看回访') {
					that.$router.push('/rescue/report/'+item.id+'/'+0)
				}

			}
			console.log(`不请求，而是跳转页面 --- 点击的是第 ${ind} 个`)
			if (name.indexOf('上传') !== -1) {
				console.log('点击的是上传·')
			}
			break;

		default:
			console.log('报错了，快去看看代码吧！')
			that.statusSet(item);
	}
}
