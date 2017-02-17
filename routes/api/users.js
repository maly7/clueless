var router = require('express').Router();
var userController = require('../../src/js/users/UserController')();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  userController.get(id);
  res.send('requested user with id: ' + id);
});

module.exports = router;
