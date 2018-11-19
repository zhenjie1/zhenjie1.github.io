import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const Test = () => import('../components/common/test')

//救援
const Task = () => import('../components/Rescue/task/Index');
const Air = () => import('../components/air')
const Mapp = () => import('../components/common/mapp/mapp')
const Personal = () => import('../components/Rescue/personal/')
const TaskDetails = () => import('../components/Rescue/task/orders/children/Details')
const Player = () => import('../components/Rescue/personal/children/Player')
const Update = () => import('../components/Rescue/task/orders/update')
const report = () => import('../components/Rescue/task/orders/report')
const postal = () => import('../components/Rescue/personal/children/postal')
const bindbank = () => import('../components/Rescue/personal/children/bindBank')
const bank = () => import('../components/Rescue/personal/children/Bank')
const cp = () => import('../components/user/personal/children/basic/cphoto')

//公共组件
const Setting = () => import('../components/common/settiog')
const LoginPass = () => import('../components/common/loginPass/loginPass')

const Payment = () => import('../components/common/paymentPass/payment')
const success = () => import('../components/common/success/success')
const verification = () => import('../components/common/paymentPass/modify')
const forget = () => import('../components/common/paymentPass/forget')

//user
const userHome = () => import('../components/user/home/Home')				//首页
const article = () => import('../components/user/home/children/article')	//小贴士详情
const userRescue = () => import('../components/user/home/children/rescue/rescue')

const personal = () => import('../components/user/personal/index')			//个人中心
const remind = () => import('../components/user/personal/children/remind')

const userProgress = () => import('../components/Rescue/task/orders/children/Progress')

//基本信息
const Basic = () => import('../components/user/personal/children/basic/basic')
const Verified = () => import('../components/user/personal/children/basic/verified')


//用户个人中心
const money = () => import('../components/user/personal/children/money')	//钱包

//登录注册
const login = () => import('../components/login/login')
const newUser = () => import('../components/login/newUser/phone');
const ForgetPass = () => import('../components/login/ForgetPass');
const agree = () => import('../components/common/Agreement/Agreement');

//保险
//const insurance = () =>import('../components/insurance/insurance')//保险

const insuranceList = () => import('../components/insurance/insuranceList') //保险列表


const insuranceDet = () => import('../components/insurance/insuranceDet/insuranceDet') //保险列表详情

const claims = () => import('../components/insurance/insuranceDet/claims')//保险理赔流程

const insurImgUp = () => import('../components/insurance/insuranceDet/imagesFlie')//保险图片上传

const insPay = () => import('../components/insurance/pay')//保险支付

const buyRecord = () => import('../components/insurance/buy/buyRecord')//保险购买记录

const retreat = () => import('../components/insurance/buy/retreat')//申请退保

const recordDet = () => import('../components/insurance/buy/recordDet')//保险购买记录详情

const cardInfo = () => import('../components/insurance/buy/cordInfo')

const rePhoto = () => import('../components/insurance/buy/photo')//保险图片
// 队员资料
const playInfo = () => import('../components/Rescue/personal/children/playinfo')

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/user'
		},
		{
			path: '/Date',
			component: Date,
			meta: { title: '日期' }
		},
		{
			path: '/setting',
			component: Setting,
			meta: { title: '设置' },
			children: [
				{
					path: 'loginPass',
					component: LoginPass,
					meta: { title: '修改密码' },
				},
				{
					path: 'payment',
					component: Payment,
					meta: { title: '支付密码' },
					children: [
						{
							path: 'verification',
							component: verification,
							meta: { title: '修改支付密码' }
						}, {
							path: 'forget',
							component: forget,
							meta: { title: '忘记支付密码' }
						}
					]
				}
			]
		},
		{
			path: '/user',
			component: Air,
			children: [
				{
					path: '',
					redirect: '/user/home'
				},
				{
					path: 'buyRecord/:status?',
					name: 'buyRecord',
					component: buyRecord
				},
				{//退保
					path: 'recordDet/:id?',
					component: recordDet,
					meta: { title: '购买记录详情' }
				},
				{//退保详情
					path: 'recordDet/retreat/:id?',
					component: retreat,
					meta: { title: '申请退保' }
				},
				{
					path: 'photo',
					component: rePhoto,
					meta: { title: '查看图片' }
				},
				{
					path: 'insuranceList',
					component: insuranceList,
					meta: { title: '保险' },
					children: [
						{
							path: 'insuranceDet/:id?',
							component: insuranceDet,
							meta: { title: '保险详情' },
							children: [
								{
									path: 'insurImgUp',
									component: insurImgUp,
									meta: { title: '保险图片上传' }
								}
							]
						},
						{
							path: 'claims/:data?',
							component: claims,
							meta: { title: '保险理赔流程' }
						},

					]
				},
				{
					path: 'login',
					component: login,
					meta: { title: '登录' }
				},
				{
					path: 'forgetPass',
					component: ForgetPass,
					meta: { title: '忘记密码' }
				},
				{
					path: 'newUser/:status?/:phone?/:token?/:code?',
					component: newUser,
					meta: { title: '新用户注册' }
				},
				{
					path: 'agree/:type?',
					component: agree,
					meta: { title: '协议' }
				},
				{
					path: 'personal',
					component: personal,
					meta: { title: '个人中心' },
					children: [
						{
							path: 'money',
							component: money,
							meta: { title: '钱包' }
						},
						{
							path: 'basic',
							component: Basic,
							meta: { title: '基本信息' },
							children: [
							]
						},
						{
							path: 'cp',
							component: cp,
							meta: { title: '查看证书' },
							children: [
							]
						},
						{
							path: 'verified',
							component: Verified,
							meta: { title: '实名认证' }
						},
						{
							path: 'remind',
							component: remind,
						}
					]
				},
				{
					path: 'home/:enter?',
					component: userHome,
					meta: { title: '天佑' },
					children: [

						{
							path: 'userRescue',
							component: userRescue,
							meta: { title: '救援卡' }
						},
						{
							path: 'article/:id',
							component: article,
							meta: { title: '小常识' }
						}
					]
				}
			]
		},
		{
			path: '/rescue',
			component: Air,
			children: [
				{
					path: '',
					redirect: '/rescue/task'
				},
				{
					path: 'report/:id?/:sta?',
					component: report,
					meta: { title: '查看报告' },
				},
				{
					path: 'task',
					component: Task,
					meta: { title: '任务中心' },
					children: [
						{
							path: 'update/:id?/:sta?',
							component: Update,
							meta: { title: '上传报告' },
						},

						{
							path: 'Details',
							component: TaskDetails,
							meta: { title: '任务详情' },
						},
						{
							path: 'progress',
							component: userProgress,
							meta: { title: '救援进展' }
						}
					]
				},
				{
					path: 'map',
					component: Mapp,
					meta: { title: '导航' },
				}
			]
		},
		{
			path: '/personal',
			component: Personal,
			meta: { title: '设置' },
			children: [
				{
					path: 'bank',
					component: bank,
					meta: { title: '银行卡' }
				},
				{
					path: 'bindbank',
					component: bindbank,
					meta: { title: '绑定银行卡' }
				},
				{
					path: 'postal',
					component: postal,
					meta: { title: '提现申请' }
				},
				{
					path: 'player',
					component: Player,
					meta: { title: '队员列表' }
				},
				{
					path: 'playInfo',
					component: playInfo,
					meta: { title: '队员资料' }
				}
			]
		},
		{
			path: '/test/:html?',
			component: Test
		}
	]
})


