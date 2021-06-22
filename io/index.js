import http from 'http'
import socketIO from 'socket.io'
import cookie from 'cookie'
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import querystring from 'querystring'
import util from 'util'
import customIO from './customIO.js'
//import ioHooks from './custom.io/xy.io/hooks.js' //Make this dynamic depending on the arg passed or another configuration in nuxt or package.json
var ioHooks //Dynamically loaded

//import { isArguments } from 'cypress/types/lodash';

const storage = require('node-persist');

console.log("======== SOCKET.io ========")

//To-do: Separate this function into a different module?
/**
 * Gets the socket request session info necessary for the io server to know what to return.
 * For that it inspects 2 elements: The socket and the url of the request and returns 2 main attributes:
 * - authInfo: The cookie portion which identifies the user as per the cookies on the browser. This is called the authentication cookie
 * - qString: The URL query string of the request converted into a JSON object 
 * @param {*} socket 
 * @param {*} referer 
 * @returns {Object} An object with 'authInfo' and 'qString' attributes. See the description for more details on those.
 */
function getSessionInfo(socket, referer) {
  let cookieObj = socket.request ? cookie.parse(socket.request.headers.cookie) : null
  let _url = referer.split('?')
  let qString = querystring.parse(_url[_url.length-1])
  let authInfo = cookieObj ? cookieObj["authentication-cookie"] : "{}"
  if(authInfo && authInfo.length > 0) {
    authInfo = JSON.parse(authInfo)
  }
  //To retrieve the game code, first attempts to fetch from the Query String, only then from Cookie
  let gameCode = qString.gameCode ? qString.gameCode : authInfo && authInfo.auth && authInfo.auth.game_code
  
  //console.log("AuthInfo.auth: ", authInfo.auth)
  return { authInfo, qString, gameCode }
}

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
    this.nuxt.hook('close', (a,b) => {
      console.log(">> Socket.io:: Received 'close' event, closing the server...")
      new Promise(server.close)
    })

    // Add socket.io events
    const messages = [] //Do I need storage persistance if this already exists?
    let that = this;

    io.on('connection', async (socket) => {
      
      let referer = socket.handshake.headers.referer
      console.log(`>> Socket.io:: [${referer}]\n
            ######## SOCKET.IO: Received new connection!`)
      console.log();
      console.log(`Socket Client Id: ${socket.client.id}`)
      console.log("Socket handshake query:")

      console.log(socket.handshake.query)

      console.log(`>> Socket.io:: In-mem session Persistent storage has ${Object.keys(that.persistMsgs).length} item(s)`)
      //console.log(await storage.getItem('default_ready'));
      console.log("Existing socket connections", socket.adapter.rooms)
    
      socket.on('last-messages', function (fn) {
        console.log(`>> Socket.io:: [${referer}]\n
            Received 'last-messages'`)
        fn(messages.slice(-50))
      })
      
      socket.on('join',function(cid){
        console.log(`>> Socket.io:: [${referer}]\n
            Received 'join'`)
        console.log(cid)
        console.log(`Socket Client Id: ${socket.client.id}, user id: ${cid.clientId}`)
        return "OK!"
      });
    
      socket.on('disconnect',function(reason){
        console.log(">> Socket.io! User disconnected!", reason)
        console.log(`Socket Client Id: ${socket.client.id}`)
        console.log("Existing socket connections", socket.adapter.rooms)
      });

      socket.on('last-status', function (fn) {

        let { authInfo, qString, gameCode } = getSessionInfo(socket, referer)
        //console.log("AuthInfo.auth: ", authInfo.auth)

        console.log(`>> Socket.io:: [${referer}]\n
            Received 'last-status', session Id (Cookie) exists? (${authInfo && authInfo.auth && authInfo.auth.game_code}). Will respond with ${JSON.stringify(that.persistMsgs["game-status"])}`)
        console.log(`>> Socket.io:: [${referer}]\n
            Session Id (Query String) exists? (${qString.gameCode})`)

        //console.log(qString, referer)
        //socket.broadcast.emit('update-status', that.persistMsgs["game-status"]) // Will always be null?
        //IMPORTANT: Fix me later!
        //Workaround (Mockup only!), for now it responds all sessions if no session is presented
        //Existing sessions should be provided by an actual service (wait for Gaminar ws or implement own?)
        if(that.persistMsgs["game-status"]) {
          return fn(gameCode ? that.persistMsgs["game-status"][gameCode] : that.persistMsgs["game-status"])
        }
        fn()
      })
      
      socket.on('my-record', function (fn) {
        let { authInfo, qString, gameCode } = getSessionInfo(socket, referer)

        console.log(`>> Socket.io:: [${referer}]\n
            Received 'my-record', game code exists? ${gameCode}`)

        if(gameCode && that.persistMsgs[gameCode] && that.persistMsgs[gameCode][qString.u]) {
          //Checks authenticity of request (WIP), basically the cookie with player id must match the value on the user record
          //TODO: Put this in generic code?
          if(authInfo && that.persistMsgs[gameCode][qString.u].code != authInfo.auth.player_ids[qString.u]) {
            console.warn("ATTENTION! player code does not match (WIP) For now this is an experimental feature and I'll let it go...")
          }
          return fn(that.persistMsgs[gameCode][qString.u])
        }
        fn()
      })

      socket.on('team-record', function (fn) {
        let { authInfo, qString, gameCode } = getSessionInfo(socket, referer)

        console.log(`>> Socket.io:: [${referer}]\n
            Received 'team-record', game code exists? ${gameCode}, from user: ${qString.u}, auth info is: `, authInfo)

        let gameUsersRecord = that.persistMsgs[gameCode]
        let me = gameUsersRecord ? gameUsersRecord[qString.u] : 'anonymous'
        let myTeam = me == 'anonymous' ? '?' : me.main.team

        console.log(gameUsersRecord, me, myTeam)
        if(gameCode && that.persistMsgs[gameCode] && me != 'anonymous') {
          //These checks might not be enough for security sake...
          let teamPlayers = []
          for(let p in gameUsersRecord) {
            if(gameUsersRecord[p].main.team == myTeam) {
              teamPlayers.push({ email: p })
            }
          }
          return fn(teamPlayers)
          
          fn([
            {
              email: user.value
            }
          ])
        }
        fn()
      })

      socket.on('users', function (fn) {
        let authInfo = cookie.parse(socket.request.headers.cookie)["authentication-cookie"];
        if(authInfo && authInfo.length > 0) {
          authInfo = JSON.parse(authInfo)
        }
        //console.log("AuthInfo.auth: ", authInfo.auth)
        let users = []
        if(authInfo && authInfo.auth && authInfo.auth.game_code) {
          let usersDict = that.persistMsgs[authInfo.auth.game_code]
          if(usersDict) {
            let keys = Object.keys(usersDict)
            for(var i = 0; i < keys.length; i++) {
              users.push(usersDict[keys[i]])
            }  
          }
        }
        console.log(`>> Socket.io:: [${referer}]\n
            Received 'users', session Id exists? (${authInfo && authInfo.auth && authInfo.auth.game_code}). Will respond with ${users.length} users.`)
        //socket.broadcast.emit('update-status', that.persistMsgs["game-status"]) // Will always be null?
        //IMPORTANT: Fix me later!
        //Workaround (Mockup only!), for now it responds all sessions if no session is presented
        //Existing sessions should be provided by an actual service (wait for Gaminar ws or implement own?)
        fn(users)
      })

      socket.on('validate-session', function (fn) {
        let sessionId = cookie.parse(socket.request.headers.cookie)["authentication-cookie"].game_code;
        console.log(`>> Socket.io:: [${referer}]\n
            Received 'validate-session', session Id exists? (${sessionId}).`)
        let result = fn(sessionId)
        console.log(result)
        return //TODO Comparar com sessoes ja iniciadas pelos facilitators
      })

      socket.on('reset-game', async function (message) {
        //Removes all messages except the game-status - not used for the moment?
        console.log(`>> Socket.io:: [${referer}]\n
            Received 'reset-game', will erase all messages except game-status (but set it to reset)`)
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
        let { authInfo, qString, gameCode } = getSessionInfo(socket.request.headers.cookie, referer)

        console.log(`>> Socket.io:: [${referer}]\n
            Received 'message-facilitator' = ${JSON.stringify(message)}`)
        messages.push(message)
        socket.broadcast.emit('message-facilitator', message) //Make sure does not go to other players?
        // TODO!!!!! Should emit to specific room only! Of the session
        // to all clients in room1 except the sender
        //socket.to("room1").emit(/* ... */);
        
        //TODO: Manage in-memory with another separate module!
        if(message.persist) {
          console.log('Message is set to persist...')
          //Will persist this message
          if(typeof message.persist === 'object') {
            console.log('Hierarchy of keys found, will iterate...', message.persist)
            //Will persist this message in the order of it's keys (should be alphabetically ordered)
            let keys = Object.keys(message.persist)
            let persistObj = that.persistMsgs
            let key = ''
            //Quite tricky piece of code this for loop. Basically builds the keys hierarchy object taking the keys 
            //in alphabetic order one by one
            for(let i=0; i < keys.length; i++){
              if(key) {
                process.stdout.write(`${key} -> `);
                persistObj = persistObj[key]  
              }
              key = message.persist[keys[i]]
              console.log(key)
              if(!persistObj[key]) {
                persistObj[key] = {}
              }
            }
            console.log() //Needed after stdout.write to force a new line
            //Assumes also the status is online
            message.online = true
            if(!persistObj[key]) {
              console.log('Will add a new persisted message!')
              //It's a new message
              persistObj[key] = message
              message.cid = []
            } else {
              //Already exists: Assign to the target the properties of the new message
              console.log('Persisted object already exists... updating')
              //console.log(persistObj[key])
              //console.log(message)
              Object.assign(persistObj[key], message)
            }
            //Adds into the message the client socket id for audit purposes
            if(!persistObj[key].cid) persistObj[key].cid = [] 
            persistObj[key].cid.push(socket.client.id)
          } else {
            //Simple object, assuming it's a string, in practice could be also a bool or a integer, but that would be weird...
            that.persistMsgs[message.persist] = message
          }
        }
        console.log("(Listing persisted messages FYI...)")
        console.log(util.inspect(that.persistMsgs, false, null, true /* enable colors */))
        console.log(`>> Socket.io:: In-mem session Persistent storage has ${Object.keys(that.persistMsgs).length} item(s)`)
        console.log(`>> Socket.io:: Emited message to all facilitator listeners`)
      })
      
      socket.on('message-players', async function (message, persist) {
        console.log(`>> Socket.io:: [${referer}]\n
            Received 'message-players' = ${JSON.stringify(message)}`)
        if(message.persist) {
          //TODO: Use the Hash instead to persist?
          //await storage.setItem(message.persist, message)
          //Not working the above...
          //Do extra handling here
          let u //TODO, u is retrieved differently dependin on the type of message persist, align in future!
          switch(message.persist) {
            case 'game-update-points':
              u = that.persistMsgs[message.sessionId][message.main.status]
              //Add the actual points to the user records!
              console.log(`will update points for player ${u.from}, current points: ${u.points}`)
              if(!u.points) u.points = 0
              message.oldValue = u.points
              u.points += message.value
              break;
            case 'game-update-team':
              u = that.persistMsgs[message.sessionId][message.main]
              console.log(`will update team for player ${u.from}, current team: ${u.main.team}`)
              message.oldValue = u.main.team
              u.main.team = message.value
              break;
            case 'game-update-teammates':
              console.log(message)
              break;
            default:  
              that.persistMsgs[message.persist][message.sessionId] = message
              break
          }
        }
        messages.push(message)
        socket.broadcast.emit('message-players', message) //TODO: Create room concept instead of sending to all!, only send to players in same rrom as Session Id (game code)
        console.log(util.inspect(that.persistMsgs, false, null, true /* enable colors */))
        console.log(`>> Socket.io:: In-mem session Persistent storage has ${Object.keys(that.persistMsgs).length} item(s)`)
        console.log(`>> Socket.io:: Emited message to all player listeners`)
      })
      
      socket.on('import-custom-hook', function (fn) {
        console.log(`>> Socket.io:: Importing custom hook file from ${referer}`)
        let code
        if(referer.indexOf('/custom.pages/') > 0) {
          let code = referer.split('/custom.pages/')[1]
          code = code.split('.pages/')
          console.log(`Project code is ${code}`)
          if(code[0]) {
            //import ioHooks from `./custom.io/${code}.io/hooks.js`
            ioHooks = require(`./custom.io/${code[0]}.io/hooks.js`)
            if(ioHooks.load && typeof ioHooks.load === 'function') {
              ioHooks.load(socket)
              console.log(`ioHooks loaded: '${code[0]}'`)
              fn()
            } else {
              console.warn(`custom hook does not have a 'load' function! Ignoring...`)
            }
          }
        } else {
          console.warn(`import-custom-hook did not find a file to import! Ignoring...`)
        }
        console.log(referer)
      })
      //customIO jobs
      customIO(socket)
      //console.log(`>> Socket.io:: Sending last known game-status (${that.persistMsgs["game-status"]})`)
      //socket.broadcast.emit('update-status', that.persistMsgs["game-status"]) // Will always be null?
    })
  })
}