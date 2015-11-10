var mongoose = require('mongoose');

var playlistSchema = mongoose.Schema({
	title: String,
	tracks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}],
	_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = playlistSchema;
