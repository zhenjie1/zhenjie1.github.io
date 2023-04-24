const stack: ((data: Data) => void)[] = []

export function onSocketMessage(cb: (data: Data) => void) {
  stack.push(cb)
}

let socket: WebSocket
export function createSocket() {
  // socket = new WebSocket('ws://localhost:9000')
  socket = new WebSocket('wss://service-09b9300w-1304747704.gz.apigw.tencentcs.com/release/')

  socket.onmessage = (e) => {
    const data = JSON.parse(e.data)
    stack.forEach(cb => cb(data))
  }

  setTimeout(() => {
    sendMessage('login', { token: '123' })
  }, 1000)

  initHeartbeat()
}

const sendPools: string[] = []

export function sendMessage(action: string, params: Data = {}) {
  if (!action) return

  if (socket) {
    const sendData = JSON.stringify({ action, data: params })
    if (socket.readyState === 1) socket.send(sendData)
    else sendPools.push(sendData)

    // 异常状态, 开始进行重连
    if (![0, 1].includes(socket.readyState)) reconnect()
  }
  else reconnect()
}

function reconnect() {
  if (socket) socket.close()
  createSocket()
}

let heartbeatTime: NodeJS.Timeout
// 心跳检测
function initHeartbeat() {
  if (heartbeatTime) clearInterval(heartbeatTime)
  heartbeatTime = setInterval(() => {
    if (socket.readyState !== 1) return

    sendMessage('ping')
  }, 1000 * 3)
}
