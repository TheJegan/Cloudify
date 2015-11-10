var mongoose = require('mongoose');

var musicProfileSchema = mongoose.Schema({
    ExternalId: String,
    username: String,
    accountName: String,
    createdDateTime: {type: Date, default: Date.now}
});


var usersSchema = new mongoose.Schema({
    oauthID: String,
    name: String,
    displayName: String,
    createdBy: String,
    createdDateTime: {
        type: Date,
        default: Date.now
    },
    externalAccountName: String,
    musicProfile: [musicProfileSchema],
    playlist: [{type: mongoose.Schema.Types.ObjectId, ref: 'playlist'}]
});


module.exports = usersSchema;