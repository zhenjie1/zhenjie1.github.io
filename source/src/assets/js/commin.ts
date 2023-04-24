import { isIos, runNativeFun } from './utils'

interface GoInfoOrLiveRow {
  userid: string
  usernumber: string
}
/**
 * 跳转直播间或者详情页
 */
export function goInfoOrLive(type: 'live' | 'detail' | string, row: GoInfoOrLiveRow, options: Data) {
  if (type === 'live') {
    if (isIos) {
      if (options.live) {
        runNativeFun('goLiveRoom', {
          roomnumber: row.usernumber,
          userid: row.userid,
        })
      }
    }
    else {
      if (options.live) {
        runNativeAndroid('module.room.viewer.normal.NewFullScreenPullActivity', {
          ROOMNUMBER: row.usernumber,
        })
      }
    }
  }
  else if (type === 'detail') {
    if (options.detail) {
      runNativeFun('goDetail', row.userid)
    }
  }
}

/**
 * 跳转安卓页面
 */
export function runNativeAndroid(path: string, params: Data = {}) {
  const data = {
    values: {
      activity: `com.doulan.juxinding.${path}`,
      ...params,
    },
  }

  // eslint-disable-next-line no-console
  console.log('Android', data)

  runNativeFun('startActivity', encodeURIComponent(JSON.stringify(data)))
}
