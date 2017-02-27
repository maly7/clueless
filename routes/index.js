var express = require('express');
var server = require('http').Server(express());
var router = express.Router();
var io = require('socket.io')(server);

var messageService = require('../src/js/message/MessageService');

/* GET home page. */
router.get('/', function (req, res, next) {
  var messages = messageService.getMessages();

  res.render('index', {
    title: 'Clueless',
    messages: messages
  });
});

io.on('connection', function (socket) {
  console.log('a user connected');
});

module.exports = router;