var twitterStrategy = {
	consumerKey: "15k4F26hVvP0F6vjvDCVkw",
	consumerSecret: "MGdqxBUI0lLoLc7KZYnW0xRNPAfpUL9diWFLU559lA",
	callback: 'http://localhost:3000/auth/twitter/callback'
}
  

var config = {
	twitter: twitterStrategy,
	mongooseURL: 'mongodb://localhost/plus_one',
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