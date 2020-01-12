// Guardar el nombre del usuario en el back-end y comunicarlo a todos
exports.login = ctx => {
  ctx.socket.user = ctx.data;
  console.log('Login:', ctx.socket.user);
  return ctx.io.emit('login', {
    user: ctx.socket.user,
    time: new Date()
  });
};

// Cuando alguien envía un mensaje, reenviarlo a todo el mundo
exports.message = ctx => {
  console.log('Message:', ctx.data);
  ctx.io.emit('message', {
    user: ctx.socket.user,
    text: ctx.data,
    time: new Date()
  });
};

// Cuando alguien hace logout mostrarselo también a todo el mundo
exports.logout = ctx => {
  console.log('Logout:', ctx.socket.user);
  if (!ctx.socket.user) return; // Para los que entran y salen sin hacer login
  return ctx.io.emit('logout', {
    user: ctx.socket.user,
    time: new Date()
  });
};
