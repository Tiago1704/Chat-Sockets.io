// index.js
const server = require('server');
const { get, socket } = server.router;
const { file } = server.reply;
const chat = require('./chat');

// Lanzar el servidor en el puerto 3000
server([

  // Mostrar el archivo principal a todo el mundo
  get('/', file('./public/index.html')),

  // Rutas para el chat
  socket('login',      chat.login),
  socket('message',    chat.message),
  socket('logout',     chat.logout),  // Manual
  socket('disconnect', chat.logout),  // Accidental/cerrar ventana

  // En caso que haya alguna petición sin responder
  get('*', ctx => 404)
]);
