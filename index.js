const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://cane.nip.io:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
  }
});


const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket, second) => {
  console.log(`my-custom-header`, socket.handshake.headers['my-custom-header'], )
  
  socket.on('chat message', msg => {
    console.log(`chat message: ${msg}`)
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
