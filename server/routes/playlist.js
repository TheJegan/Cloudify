var express = require('express');
var router = express.Router();
var env = require('../env/config');
var mongoose = require('mongoose');
var playlistSchema = require('../model/playlist');
var trackSchema = require('../model/track');
var Playlist = mongoose.model('Playlist', playlistSchema);
var Track = mongoose.model('Track', trackSchema);
var vasync = require('vasync');

/* GET home page. */
router.get('/',  function(req, res, next) {
    	var queue = vasync.queue(function(task, callback) {
        task(callback, data);
    }, 1);

   	var number = 0;

	queue.push(function(callback, data) {
		number +=1;
		data.number = number;
		console.log("#1 number: " + number)
		callback(data)
	});

	queue.push(function(callback, data) {
		number +=1;
		console.log("#2 number: " + number)
		console.log()
	});
});

router.post('/', env.isAuthenticated, function(req, res, next) {
	var title = req.body.title;

	// var playlist = new Playlist({
	// 	title: title
	// });

	// playlist.save(function(err)
	// {
	// 	res.send(Playlist);
	// });

	Playlist.create({ title: title, _user: req.user._id }, function (err, playlist) {
	  if (err) res.send(err);
	  // saved!
	  res.send(playlist)
	})
});


router.post('/:playlistId/tracks/', env.isAuthenticated, function(req, res, next){
	var playlistId = req.params.playlistId;
	var trackName = req.body.name;

	//save track
	//update playlist with new track
	Track.create({title: trackName}, function(err, track)
	{
		if(err) res.send(err);

		Playlist.findOne({_id: playlistId}, function(err, pl){
			if(err)
			{
				res.send(err);
			}

			if(pl)
			{
				pl.tracks.push(track._id);
				pl.save(function(err)
				{
					if(err)
					{
						res.send(err);
					}
					res.send(pl);
				})
			}
		});
	});
});

router.put('/:playlistId/tracks/', env.isAuthenticated, function(req, res, next){

});


module.exports = router;