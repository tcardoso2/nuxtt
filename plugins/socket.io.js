import io from 'socket.io-client'

console.log(`Starting client socket on URL ${process.env.WS_URL}...`)

const socket = io(process.env.WS_URL)

export default socket
