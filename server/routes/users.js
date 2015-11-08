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

	response = req.user;
	response.accounts = [];


	User.create({
		oauthID: OAuthToken,
		createdBy: userId,
		externalAccountName: 'spotify'
	}, function (err, user) {	 
	  if(err)
		{
			res.send(err);
		}

		Relationship.create({
			_user: userId,
			_profile: user._id,
		}, function(err, r)
		{
			User.find({_id: r._profile}, function(err, u){
				response.accounts = u;

				res.send(response);
			});
			
		});
	})
});

router.put('/spotify/update/:spotifyId', env.isAuthenticated, function(req, res, next)
{

});

module.exports = router;
