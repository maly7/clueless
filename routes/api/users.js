var router = require('express').Router();
var userService = require('../../src/js/users/UserService')();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', function (req, res) {
  var id = req.params.id;
  userService.getUser(id);
  res.send('requested user with id: ' + id);
});

module.exports = router;