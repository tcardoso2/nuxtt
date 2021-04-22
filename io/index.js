import http from 'http'
import socketIO from 'socket.io'
import cookie from 'cookie';

const storage = require('node-persist');

console.log("======== SOCKET.io ========")

export default function () {
  this.persistMsgs = {
    'game-status' : {}
  }
  this.nuxt.hook('render:before', (renderer) => {
    const server = http.createServer(this.nuxt.renderer.app)
    const io = socketIO(server, {
      cors: {
        origin: process.env.WS_URL,
        //"https://expressive.ap.ngrok.io",
        methods: ["GET", "POST"]
      }
    })
    console.log(">> Socket.io:: Setting up socket.io server...")
    //console.log(server)
    
    //TODO: Persist on disk as well, besides memory?
    /*try {
      console.log(storage.getItem());
      console.log('>> Node-persist:: No need to start as it already exists')
    } catch (e) {
      storage.init( ).then(async () => {
        console.log('>> Node-persist:: Started, Testing if persisted storage is ready...')
        await storage.setItem('default_ready','>> Node-persist:: Storage is ready!')
      });    
    }*/

    // overwrite nuxt.server.listen()
    this.nuxt.server.listen = (port, host) => new Promise(resolve => server.listen(port || 3000, host || 'localhost', resolve))
    // close this server on 'close' event
    this.nuxt.hook('close', () => new Promise(server.close))

    // Add socket.io events
    const messages = [] //Do I need storage persistance if this already exists?
    let that = this;
    io.on('connection', async (socket) => {
      
      console.log(`>> Socket.io:: In-mem session Persistent storage has ${Object.keys(that.persistMsgs).length} item(s)`)
      //console.log(await storage.getItem('default_ready'));
      let referer = socket.handshake.headers.referer
      console.log(`>> Socket.io:: [${referer}]\n
            Received new connection`)
      console.log();
      
      socket.on('last-messages', function (fn) {
        console.log(`>> Socket.io:: [${referer}]\n
            Received 'last-messages'`)
        fn(messages.slice(-50))
      })
      
      socket.on('last-status', function (fn) {
        let sessionId = cookie.parse(socket.request.headers.cookie)["authentication-cookie"].game_code;
        console.log(`>> Socket.io:: [${referer}]\n
            Received 'last-status', session Id exists? (${sessionId}). Will respond with ${JSON.stringify(that.persistMsgs["game-status"])}`)
        //socket.broadcast.emit('update-status', that.persistMsgs["game-status"]) // Will always be null?
        if(that.persistMsgs["game-status"]) {
          return fn(that.persistMsgs["game-status"][sessionId])
        }
        fn()
      })
      
      socket.on('reset-game', async function (message) {
        //Removes all messages except the game-status - not used for the moment?
        console.log(`>> Socket.io:: [${referer}]\n
            Received 'reset-game', will erase all messages except game-status (but set it to reset)`)
        //let _gs = that.persistMsgs['game-status']
        that.persistMsgs['game-status'][message.sessionId].text = 'reset'
        //TODO: Reset only the session messages
        //that.persistMsgs = {}
        /*if(_gs) {
          _gs.text = 'reset'
          console.log(_gs)
          that.persistMsgs['game-status'] = _gs
        }*/
      })

      socket.on('message-facilitator', async function (message, persist) {
        console.log(`>> Socket.io:: [${referer}]\n
            Received 'message-facilitator' = ${JSON.stringify(message)}`)
        messages.push(message)
        socket.broadcast.emit('message-facilitator', message)
        if(message.persist) {
            //await storage.setItem(message.persist, message)
            //Not working the above...
            that.persistMsgs[message.persist] = message;
        }
        console.log(`>> Socket.io:: In-mem session Persistent storage has ${Object.keys(that.persistMsgs).length} item(s)`)
        console.log(`>> Socket.io:: Emited message to all facilitator listeners`)
      })
      
      socket.on('message-players', async function (message, persist) {
        console.log(`>> Socket.io:: [${referer}]\n
            Received 'message-players' = ${JSON.stringify(message)}`)
        messages.push(message)
        socket.broadcast.emit('message-players', message) //TODO: Create room concept instead of sending to all!, only send to players in same rrom as Session Id (game code)
        if(message.persist && that.persistMsgs[message.persist]) {
          //TODO: Use the Hash instead to persist?
          //await storage.setItem(message.persist, message)
          //Not working the above...
          that.persistMsgs[message.persist][message.sessionId] = message
        }
        console.log(that.persistMsgs)
        console.log(`>> Socket.io:: In-mem session Persistent storage has ${Object.keys(that.persistMsgs).length} item(s)`)
        console.log(`>> Socket.io:: Emited message to all player listeners`)
      })
      
      //console.log(`>> Socket.io:: Sending last known game-status (${that.persistMsgs["game-status"]})`)
      //socket.broadcast.emit('update-status', that.persistMsgs["game-status"]) // Will always be null?
    })
  })
}