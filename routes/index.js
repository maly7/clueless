var express = require('express');
var router = express.Router();

var messageService = require('../src/js/message/MessageService');

/* GET home page. */
router.get('/', function (req, res, next) {
  var messages = messageService.getMessages();
  var userService = req.app.get('userService');

  res.render('index', {
    title: 'Clueless',
    messages: messages,
    characters: userService.getAvailableCharacters()
  });
});

module.exports = router;