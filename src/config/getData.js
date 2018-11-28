import fetch from './index.js'

//发送验证码
export const phoneSendCode = phone => fetch('/sms/send', {
	phone
})

//登出 退出
export const logout = () => fetch('/logout')

//验证 验证码 是否正确
export const checkCode = (validateCode) => fetch('/sms/checkCode', {
	validateCode
})

//注册
export const registered = (mobile, password, validateCode) => fetch('/mobile/registered', {
	mobile,
	password,
	validateCode
})

//登录
export const login = (username, password, mobileLogin) => fetch('/a/login', {
	username,
	password,
	mobileLogin
})
// 获取用户信息
export const userInf = () => fetch('/a/mobile/user', {})

//修改密码
export const updatePas = (password,newPassword) => fetch('/a/mobile/updatePassword',{
	password,
	newPassword
})

// 验证个人信息
export const verifMessage = (name,idNumber,mobile) => fetch('/a/Payment/verifMessage',{
	name,
	idNumber,
	mobile
})

// 设置新支付密码
export const settingsPayPass = (token,newpay) => fetch('/a/Payment/settingsPayPass',{
	token,
	newpay
})

//救援队长 拒绝订单
export const cancelOffice = (id, remarks) => fetch('/a/mobile/order/cancelOffice', {
	id,
	remarks
})

//出勤人员查询
export const findMyJUserList = () => fetch('/a/mobile/findMyJUserList', )

//等待接单
export const findMissedlist = stateId => fetch('/a/mobile/order/findMissedlist', {
	stateId
})

//查询正在营救
export const findlistok = () => fetch('/a/mobile/order/findlistok')

//查询完成的订单
export const findMyListOk = (pageNo, pageSize = 100) => fetch('/a/mobile/order/findMyListOk', {
	pageNo,
	pageSize
})
// 救援人员查询订单详情
export const jiuorder = (id) => fetch('/a/mobile/order/jiuorderFindById',{
	id
})

//接受订单
export const acceptOrders = (id, usersId) => fetch('/a/mobile/order/acceptOrders', {
	id,
	usersId
})

//改变订单状态
export const orderBtn = (id, state) => fetch('/a/mobile/order/orderBtn', {
	id,
	state
})


//用户 - 一键呼救
export const sosOrders = (longitude, dimensions) => fetch('/a/mobile/order/sosOrders', {
	longitude,
	dimensions
})

//队长 - 查询所有订单
export const userSearchAllRescue = (pageNo, type) => fetch('/a/mobile/order/findUserOrderListAdIos', {
	pageNo,
	state: type,
	pageSize: 10
})
//用户 - 救援人员查询任务
export const findListTask = (pageNo,pageSize,state) => fetch('/a/ordersTask/findListTask',{
	pageNo,
	pageSize: 10,
	state
})

//用户 - 查询附近救援点
export const findlist = () => fetch('/mobile/office/findlist')

//用户 - 未接单数据
export const userWaitAccept = () => fetch('/a/mobile/order/findlist')

//用户 - 正在施救数据
export const userRescue = () => fetch('/a/mobile/order/findSos')

//用户 - 已完成订单
export const userRescueOk = pageNo => fetch('/a/mobile/order/findOk', {
	pageNo,
	pageSize: 10
})

//用户 - 取消订单
export const cancelOrder = (id, remarks) => fetch('/a/mobile/order/cancelOrder', {
	id,
	remarks
})

//用户 - 上传头像
export const updateAvatar = (data, type, config) => fetch('/a/alioss/uploadFile', data, 'POST', type, config)

//用户 - 获取用户信息
export const getUserInfo = () => fetch('/a/mobile/user')

//修改个人资料
export const editUserInfo = userInfo => fetch('/a/mobile/userModify', userInfo)

//用户 - 小常识 / 公告  state = 1 : 常识  --  state = 2 : 公告
export const commonSense = (pageNo, state) => fetch('/article/findPage', {
	pageNo,
	pageSize: 10,
	state
})

//用户 - 文章详情
export const articleDetails = id => fetch('/article/view', {
	id
})

//用户 - 购买救援卡  充值 支付宝
export const recharge = price => fetch('/a/pay/MobilePay', {
	price
})





//用户 - 救援进展
export const userProgress = id => fetch('/a/orderStauts/findByOrderId', {
	id
})

//查询钱包金额
export const allMoney = () => fetch('/a/tyMoney/findMoney')

//实名认证
export const verified = (actualName,idNumber) => fetch('/a/mobile/actualName', {
	idNumber,
	actualName
})
//保险种类
export const insItmeNav = () =>fetch('/mobile/office/findSpecies')


//保险列表
export const insListing = (pageNo,pageSize,isType) => fetch('/a/mobile/insurance/findInsuranceList',{
	pageNo,
	pageSize,
	isType
})
//保险列表详情接收
export const  insListReceive = id => fetch('/a/mobile/insurance/findInsuranceById',{
	id
})

//保险购买
export const insListDet = (id,token) => fetch('/a/mobile/payInsurance/pay',{
	id,token
})


//保险记录
export const insRecord = (pageNo,pageSize,type) => fetch('/a/mobile/orderInsurance/findList',{
	pageNo,
	pageSize,
	type
},'POST')
//保险住院记录、医保图片上传

export const insUpImages = (data, type, config) => fetch('/a/alioss/uploadFile', data, 'POST', type, config)
// 保存购买保险信息
export const paySave = (id,dayId,typeMen,userName,user_id_number,isMc,isHospital,hospitalImgs,token,isUploadimg) => fetch('/a/mobile/payInsurance/save',{id,dayId,typeMen,userName,user_id_number,isMc,isHospital,hospitalImgs,token,isUploadimg})

//	查询理赔记录接口
export const queryIns = orderinsId => fetch('/a/mobile/ofclaimsInsurance/findOfclaimsByOrder',{
	orderinsId
})

//购买详情
export const insRecordDet = (id) => fetch('/a/mobile/orderInsurance/findOrderInsuranceById',{
	id
},'POST')
// 退保校验
export const checkR = (id) => fetch('/a/mobile/orderInsurance/checkInsOrderHesita',{
	id
})
// 退保
export const retreat = (id,remarks,cancelInsurImgs) => fetch('/a/mobile/orderInsurance/cancelOrderInsurance',{
	id,
	remarks,
	cancelInsurImgs
})
//用户
export const userJson = (username,password) => fetch('/a/login',{
	username,password
})
//用户密码提交
export const userPass = (newpass) =>fetch ('/a/Payment/checkPayPass',{
	newpass
})


//用户 - 救援卡信息
export const rescueInt =  () =>fetch ('/mobile/office/findMemberList')

//用户 - 购买救援卡  支付
export const rescueMoney = (id,token) =>fetch ('/a/tyMoney/buy',{
	id,
	token
})
// 修改新的支付密码
export const modifyPayPass = (paypass,newpaypass) => fetch('/a/Payment/modifyPayPass',{
	paypass,
	newpaypass
})

// 上传报告或者回访 0回访  1报告
export const dUpload = (orderId,content,contentImg,title,docuTyoe) => fetch('/document/upload',{
	orderId,
	content,
	contentImg,
	title,
	docuTyoe
})

// 查看报告
export const report = (orderId,type) => fetch('/document/viewDocument',{
	orderId,
	type
})

// 查询银行卡
export const dealForNJ = () => fetch('/a/tyMoney/AllDealForNJ',{})

// 提现
export const withdrawals = (applyMoney,bankName,bankCard,token) => fetch('/a/tyMoney/withdrawals',{
	applyMoney,
	bankName,
	bankCard,
	token
})

// 根据卡号获得银行卡名字
export const findCard = (card) => fetch('/a/bank/bank/findCard',{card})

// 绑定银行卡
export const bindingCard = (mobile,bankcard,realName, openingBank) => fetch('/a/tyMoney/bindingCard',{
	mobile,
	bankcard,
	realName,
	openingBank
})
// 确认银行卡
export const bindingOk = (yzm) => fetch('/a/tyMoney/bindingOk',{
	yzm
})

// 获得银行卡
export const AllDealForNJ = () => fetch('/a/tyMoney/AllDealForNJ',{})

// 解绑银行卡
export const releaseCard = (bankcard,token) => fetch('/a/tyMoney/releaseCard',{bankcard,token})

// 获得交易信息
export const jRecord = (pageNo,pageSize) => fetch('/a/tyMoney/transactionRecord',{pageNo,pageSize})

// 用户协议 0注册 1保险
export const view = (type) => fetch('/protocol/view',{type})

//保险 - 投保条约
export const getProtocol = id => fetch('/protocol/getProInfo', {
	id
})

//支付宝支付
export const zfbPay = (price) =>fetch('/a/pay/app',{ price })


//
export const zfbzftest = (price) => fetch('/a/pay/MobilePay',{ price })






