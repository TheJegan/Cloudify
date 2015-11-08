var express = require('express');
var router = express.Router();
var env = require('../env/config');

/* GET users listing. */
router.get('/me', env.isAuthenticated, function(req, res, next) {
  // res.send('respond with a resource');
  res.send({username: req.user});

});

module.exports = router;
