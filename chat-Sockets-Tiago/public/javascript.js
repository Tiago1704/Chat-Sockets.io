// UTILS
// Conectamos al servidor con socket.io
var socket = io();

// Evitar XSS usando escape()
var escape = function(html) {
  return $('<div>').text(html).html();
};



// AUTH

// Usar el modal de login con el usuario al entrar
$('#login').modal({ dismissible: false }).submit(function (e) {
  e.preventDefault();
  var user = $('#login input').val();

  // Continuar sólo si sí que hay usuario
  if (!user) return;
  cookies({ user });
  $('#login').modal('close');
  socket.emit('login', user);
  setTimeout(function(){ $('#message').focus(); }, 500);
});

if (cookies('user')) {
  socket.emit('login', cookies('user'));
  setTimeout(function(){ $('#message').focus(); }, 500);
} else {
  $('#login').modal('open');
}

$('.logout').click(function(){
  cookies({ user: null });
  window.location.reload();
});



// MENSAJES

// Añadir un mensaje a la lista y hacer scroll
var add = function(html) {
  var toScroll = $('.messages').prop("scrollHeight") - 50 < $('.messages').scrollTop() + $('.messages').height();
  $('.messages').append(html);

  // Hacer scroll sólo si mantenemos la conversación abajo, si hemos subido no scrollear
  if (toScroll) {
    $('.messages').stop(true).animate({
      scrollTop: $('.messages').prop("scrollHeight")
    }, 500);
  }
};

// El usuario envía un mensaje
$('form.message').submit(function(e){
  e.preventDefault();
  var $input = $(e.target).find('input');
  var text = $input.val();

  // Borrar el mensaje del input
  $input.val('');

  // Enviar el mensaje a todos
  socket.emit('message', text);
});


socket.on('login', function(message) {
  add('<div class="msg login">\
    <span class="user">' + escape(message.user) + '</span> logged in.\
  </div>');
});

socket.on('message', function(message) {
  add('<div class="msg">\
    <span class="user">' + escape(message.user) + ':</span> \
    <span class="msg">' + escape(message.text) + '</span>\
  </div>');
});

socket.on('logout', function(message) {
  add('<div class="msg logout">\
    <span class="user">' + escape(message.user) + '</span> logged out.\
  </div>');
});
