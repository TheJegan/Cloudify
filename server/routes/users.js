var express = require('express');
var router = express.Router();
var env = require('../env/config');
var mongoose = require('mongoose');
var userSchema = require('../model/user');
var relationshipSchema = require('../model/relationship');
var User = mongoose.model('User', userSchema);
var Relationship = mongoose.model('Relationship', relationshipSchema);

/* GET users listing. */
router.get('/me', env.isAuthenticated, function(req, res, next) {
  // res.send('respond with a resource');
  res.send({username: req.user});

});

router.post('/spotify/add', env.isAuthenticated, function(req, res, next)
{
	var OAuthToken = req.body.oauth_token;
	var userId = req.user._id;
	var response = [];

	var newUser = new User({
		oauthID: OAuthToken,
		createdBy: userId,
		externalAccountName: 'spotify'
	});

	response = req.user;
	response.accounts = [];

	newUser.save(function(user)
	{
		var relationship = new Relationship({
			_user: userId,
			_profile: user._id,
		});

		relationship.save(function(u)
		{
			response.accounts = u;

			res.send(response);
		});
	});
});

router.put('/spotify/update/:spotifyId', env.isAuthenticated, function(req, res, next)
{

});

module.exports = router;
