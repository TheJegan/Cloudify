var mongoose = require('mongoose')


var profileSchema = new mongoose.Schema({
    _user: {type: String, ref: 'user'},
    _profile: {type: String, ref: 'user'},
    description: String
});


module.exports = profileSchema;