import io from 'socket.io-client'

let socket;
if(process.browser) {
  console.log(`Starting client socket on URL ${window.location.origin}...`)
  socket = io(window.location.origin)
} else {
  socket = io(process.env.WS_URL)
}


export default socket
