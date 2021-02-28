const io = require('socket.io')();
io.on('connection', client => {
  console.log("Client connected!")
  console.log(client)
});
io.listen(3001);
console.log("=====================================")
console.log("Socket.io - Listening on port 3001...")
console.log("=====================================")