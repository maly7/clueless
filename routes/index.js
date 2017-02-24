var express = require('express');
var server = require('http').Server(express());
var router = express.Router();
var io = require('socket.io')(server);

var messageService = require('../src/js/message/MessageService');
var socketService = require('../src/js/socket/SocketService')(io);

/* GET home page. */
router.get('/', function (req, res, next) {
  var socket = socketService.connect('http://localhost:3000');

  socket.on('news', function (data) {
    console.log('user connected');
  });

  var messages = messageService.getMessages();

  res.render('index', {
    title: 'Clueless',
    messages: messages
  });
});

module.exports = router;