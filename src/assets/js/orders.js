import { findMissedlist, findlistok, findMyListOk, userWaitAccept, userSearchAllRescue, userRescue, userRescueOk, findListTask, addEntity } from '../../config/getData'
var userType;

function getUserType() {
	try {
		return this.$store.state.userInfo.userType
	} catch (e) {
		setTimeout(() => getUserType(), 100)
	}
}

function jinzhan(infoData) {
	for (let v of infoData) {
		if (v.orderStautsList.length == 0) {
			v.orderStautsList.push({ 'content': '暂无进展' });
		}
	}
}
//页面初始化调用
export const initFun = function () {
	userType = getUserType.call(this);

	const type = parseInt(this.userType);
	switch (type) {
		case 2: //救援队长
			findMissedlist().then(res => {
				res = res.rows
				this.infoData = res
				this.originalData = res
				jinzhan(this.infoData)
			}).then(() => {
				topNavMenuFun.call(this)
			})
			break;
		case 3: //普通用户
			userSearchAllRescue(1).then(res => {
				this.total = res.total
				res = res.rows
				this.infoData = res
				this.originalData = res
				this.liLength = res.length
				jinzhan(this.infoData)


				//上传设备
				// console.log(this.infoData[0].uuid)
				addEntity(this.infoData[0].uuid).then(res => {
					console.log(res)
				})
				//更新位置
			})
			break;
		case 4: //救援用户
			findListTask(1).then(res => {
				res = res.rows
				this.infoData = res
				this.originalData = res
				jinzhan(this.infoData)
			}).then(() => {
				topNavMenuFun.call(this)
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
	} else if (type === 3) {
		if (ind == 0 && name == '救援进展') {
			that.$router.push('/rescue/task/progress')
		}
		if (ind == 0 && name.indexOf('取消') !== -1) {	//点击取消订单
			//拒绝理由
			that.showCancel = true;
		}
	} else if (type === 4) {
		leaderBtnEv(that, item, ind, name)
	}

}

//点击顶部导航
export const topNavMenuFun = function () {
	var navIndex = this.navIndex;
	if (userType == 3) {
		userAjax.call(this, navIndex)
	} else {
		leaderAjax.call(this, navIndex)
	}
}

//设置按钮文字 和 上面的状态
export const setBtnTxtFun = function (str, item) {
	const status = ['等待接单', '等待出发', '已到达救援地点', '施救中', '完成']
	status[99] = '已取消'

	var statusId4Txt1 = item.typeReport === '0' ? '上传报告' : '查看报告';
	var statusId4Txt2 = item.typeReturn === '0' ? '上传回访' : '查看回访';

	let btn = [
		[{ name: '拒绝接单', type: 'button' }, { name: '确认接单', type: 'button' }],
		[{ name: '确认出发', type: 'button' }],
		[{ name: '拍摄', type: 'file' }, { name: '确认到达', type: 'button' }],
		[{ name: '拍摄', type: 'file' }, { name: '完成', type: 'button' }],
		[{ name: statusId4Txt1, type: 'button' }, { name: statusId4Txt2, type: 'button' }]
	]

	str = parseInt(str)

	//队长
	if (userType == 2) {
		item.btn = btn[str];
	} else if (userType == 3) {
		btn = [
			[{ name: '取消订单', type: 'button' }],
			[{ name: '救援进展', type: 'button' }],
		]
		item.btn = str == 0 ? btn[0] : btn[1];

	} else if (userType == 4) {
		item.btn = btn[str]
	}

	return status[str]

}
//获取用户数据
async function userAjax(navIndex) {
	switch (navIndex) {
		case 1: //全部
			await userSearchAllRescue(1).then(res => {
				this.total = res.total
				res = res.rows
				this.infoData = res
				this.originalData = res
				jinzhan(this.infoData)
			})
			break;
		case 2: //等待接单
			await userWaitAccept().then(res => {
				res = res.rows
				this.infoData = res
				this.originalData = res
				jinzhan(this.infoData)
			})
			break;
		case 3: //施救中
			await userRescue().then(res => {
				res = res.rows
				this.infoData = res
				this.originalData = res
				jinzhan(this.infoData)
			})
			break;
		case 4: //已完成
			await userRescueOk(1).then(res => {
				res = res.rows;
				this.infoData = res
				this.originalData = res
				jinzhan(this.infoData)
			})
			break;
		case 5: //已取消
			await userSearchAllRescue(1, '99').then(res => {
				res = res.rows;
				this.infoData = res
				this.originalData = res
				jinzhan(this.infoData)
			})
			break;
	}
	if (this.$refs.li) {
		this.liLength = this.$refs.li.length;
	}
}

//获取队长订单数据
function leaderAjax(navIndex) {
	new Promise((resolve, reject) => {
		if (navIndex != 4) {

			if (Array.isArray(this.originalData)) {
				this.infoData = this.originalData.filter(v => {
					if (navIndex == 1) return v.stateId == 0 || v.stateId == 1
					else return navIndex == v.stateId
				})
				jinzhan(this.infoData)
				resolve();
			}

			reject('this.originalData 不是一个数组')
		} else {
			findMyListOk(1, 10).then(res => {
				res = res.rows;
				this.infoData = res;
				jinzhan(this.infoData)
				resolve();
			})
		}
	}).then(() => {
		this.total = this.infoData.length
		setTimeout(() => this.liLength = this.$refs.li == undefined ? 0 : this.$refs.li.length, 0)
	})

}

//队长
function leaderBtnEv(that, item, ind, name) {
	item.stateId = parseInt(item.stateId)
	switch (item.stateId) {
		case 0:
			if (ind == 1) {
				that.originaId = item.id
				that.isShowPer = true;
			} else {
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
			if (ind == 0) {
				if (name == '上传报告') {
					that.$router.push('/rescue/task/update/' + item.id + '/' + 1)
				} else if (name == '查看报告') {
					that.$router.push('/rescue/report/' + item.id + '/' + 1)
				}
			} else {
				if (name == '上传回访') {
					that.$router.push('/rescue/task/update/' + item.id + '/' + 0)
				} else if (name == '查看回访') {
					that.$router.push('/rescue/report/' + item.id + '/' + 0)
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
