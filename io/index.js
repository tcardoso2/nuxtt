import http from 'http'
import socketIO from 'socket.io'

export default function () {
  this.nuxt.hook('render:before', (renderer) => {
    const server = http.createServer(this.nuxt.renderer.app)
    const io = socketIO(server)
    console.log(">> Socket.io:: Setting up socket.io server...")

    // overwrite nuxt.server.listen()
    this.nuxt.server.listen = (port, host) => new Promise(resolve => server.listen(port || 3000, host || 'localhost', resolve))
    // close this server on 'close' event
    this.nuxt.hook('close', () => new Promise(server.close))

    // Add socket.io events
    const messages = []
    io.on('connection', (socket) => {
      console.log(">> Socket.io:: Received new connection");
      socket.on('last-messages', function (fn) {
        console.log(">> Socket.io:: Received 'last-messages'")
        fn(messages.slice(-50))
      })
      socket.on('send-message', function (message) {
        console.log(`>> Socket.io:: Received 'send-message' = ${JSON.stringify(message)}`)
        messages.push(message)
        socket.broadcast.emit('new-message', message)
        console.log(`>> Socket.io:: Emited message to all listeners`)
      })
    })
  })
}