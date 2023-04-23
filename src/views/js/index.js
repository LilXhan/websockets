const socket = io();

socket.on('welcome', data => {
  const p = document.querySelector('#text');
  p.textContent = data;
});

const emitToServer = document.querySelector('#emit-to-server');
emitToServer.addEventListener('click', () => {
  socket.emit('server', 'hello, server');
});

const form = document.querySelector('#form')
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  socket.emit('submit', formData.get('name'));
})

socket.on('welcome-user', data => {
  greeting.textContent = `Welcome, ${data}`;
});

socket.on('everyone', message => {
  console.log(message);
});

const emitToLast = document.querySelector('#emit-to-last');
emitToLast.addEventListener('click', () => {
  socket.emit('last', 'hello');
});

socket.on('greeting', message => {
  console.log(message);
});


// on, once, off

// on

socket.on('on', () => {
  console.log('se emite varias veces');
});

// once

socket.once('once', () => {
  console.log('se emite una sola vez');
});

// off 

const listener = () => {
  console.log('se apaga el evento');
}

socket.on('off', listener);

setTimeout(() => {
  socket.off('off', listener);
}, 2000);

// const checkSocketStatus = () => {
//   console.log('Status socket', socket.connected);
// };

// socket.on('connect', () => {
//   console.log('the socket has connect', socket.id);
//   checkSocketStatus();
// });

// socket.on('disconnect', () => {
//   console.log('the socket has disconnect', socket.id)
//   checkSocketStatus();
// });

// socket.on('connect_error', () => {
//   console.log("i'm couldn't reconnect")
// });

// socket.io.on('reconnect_attempt', () => {
//   console.log("i'm trying to reconnect");
// });

// socket.io.on('reconnect', () => {
//   console.log('i have reconnected');
// });