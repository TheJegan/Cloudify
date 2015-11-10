var mongoose = require('mongoose');

var playlistSchema = mongoose.Schema({
	title: String,
	tracks: [{type: mongoose.Schema.Types.ObjectId, ref: 'track'}],
	_user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
});

module.exports = playlistSchema;
