import io from 'socket.io-client'

let socket;
if(process.browser) {
  let args = {
    reconnectionDelayMax: 10000,
    auth: {
      token: "123"
    },
    query: {
      "my-key": "my-value"
    }  
  }

  console.log(`Starting client socket on URL ${window.location.origin}...`)
  socket = io(window.location.origin, args)
  socket.on('connect',function(){
    if(sessionStorage) {
      console.log(socket.id)
      if(!sessionStorage.__suid) {
        sessionStorage.__suid = socket.id  //The first socket id becomes persisted in same window
        socket.emit('join', { clientId: sessionStorage.__suid, rejoin: false});
      } else {
        //Re-joining from same window
        socket.emit('join', { clientId: sessionStorage.__suid, rejoin: true});
      }
    }
    console.log("Client connected to socket.io server!")
   });

} else {
  socket = io(process.env.WS_URL)
}

export default socket
