var express = require('express');
var router = express.Router();

var messageService = require('../src/js/message/MessageService');

/* GET home page. */
router.get('/', function (req, res, next) {
  var messages = messageService.getMessages();

  res.render('index', {
    title: 'Clueless',
    messages: messages
  });
});

module.exports = router;