var express = require('express');
var router = express.Router();
const userController = require('../controller/user.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',userController.register)

router.post('/login', userController.login)

router.get('/profile', userController.profile)

router.put('/edit', userController.update)

router.delete('/delete', userController.delete)

module.exports = router;
