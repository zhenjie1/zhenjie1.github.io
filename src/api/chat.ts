import APIFetch from '@/utils/fetch'

// 获取微信分组列表
export const chhatWechatGroup = () =>
	APIFetch({
		url: '/wechat.wx.list',
		method: 'get',
		dataPath: 'data.data',
		storePath: 'chat.wxList',
	})
