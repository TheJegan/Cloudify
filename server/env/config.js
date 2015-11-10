var twitterStrategy = {
	consumerKey: "15k4F26hVvP0F6vjvDCVkw",
	consumerSecret: "MGdqxBUI0lLoLc7KZYnW0xRNPAfpUL9diWFLU559lA",
	// callback: 'http://localhost:3000/auth/twitter/callback',
	callback: 'http://localhost:3000/auth/twitter/callback'
}


var config = {
	twitter: twitterStrategy,
	// mongooseURL: 'mongodb://jegan:todo@ds035563.mongolab.com:35563/todo',
	mongooseURL: 'mongodb://localhost/cloudify',
	isAuthenticated: function(req, res, next)
	{
		 if (req.isAuthenticated()) {
		 	return next();
		 }
		console.log('is not isAuthenticated');
		res.status(401).send({'statusCode': '-1'})
	}
}
module.exports = config;
