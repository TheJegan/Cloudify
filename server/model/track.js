var mongoose = require('mongoose');

var trackSchema = mongoose.Schema({
	title: {type: String, unique:true},
	artist: String
});

module.exports = trackSchema;