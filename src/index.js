const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { config } = require('dotenv');
const cors = require('cors');
const path = require('path');
const { setTimeout } = require('timers/promises');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const socketsOnline = [];

config();
app.use(cors());
app.use(express.static(path.join(__dirname, 'views')));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

const PORT = process.env.PORT || 3000

io.on('connection', socket => {
  // console.log('id socket connected ->', socket.id);
  // console.log('clients connected ->', io.engine.clientsCount);
  // socket.on('disconnect', () => {
  //   console.log('the socket ' + socket.id + ' has disconnect');
  // });
  // socket.conn.once('upgrade', () => {
  //   console.log('we have passed of HTTP Long-Polling to ', socket.conn.transport.name);
  // });

  socketsOnline.push(socket.id);

  // emit basic events

  socket.emit('welcome', 'Now you are connected');
 
  socket.on('server', data => {
    console.log(data);
  });

  socket.on('submit', data => {
    socket.emit('welcome-user', data);
  });

  // emit to everyone

  io.emit('everyone', socket.id + ' has connected');

  // emit to one

  socket.on('last', message => {
    const lastSocket = socketsOnline[socketsOnline.length - 1];
    io.to(lastSocket).emit('greeting', `${message} ${lastSocket}`);
  });

  // on, once, off

  // on

  socket.emit('on', 'hello');
  socket.emit('on', 'hello');

  // once

  socket.emit('once', 'hello');
  socket.emit('once', 'hello');

  // off

  socket.emit('off', 'hello');

  setTimeout(() => {
    socket.emit('off', 'hello');
  }, 3000);

});

httpServer.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`);
});